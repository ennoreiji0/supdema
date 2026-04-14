'use client' // これが重要！

import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase' // 自分の環境に合わせてな
import { ChatInfo } from '@/utils/types';
import Fukidashi from './Fukidashi';

export default function ChatView({
  initialComments, postId, nowUserId 
}:{
  initialComments:ChatInfo[];
  postId:string;
  nowUserId:string|undefined
}) {
  const [comments, setComments] = useState<ChatInfo[]>(initialComments)
  const supabase = createClient()

  useEffect(() => {
    // リアルタイムの監視を開始
    const channel = supabase
      .channel('realtime_comments')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'comments',
          filter: `post_id=eq.${postId}`,
        },
        (payload) => {
          const newComment = payload.new as ChatInfo;
          setComments((prev) => [...prev, newComment]);
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [postId, supabase])

  return (
    <div className="flex flex-col w-full p-4 gap-y-1">
    
        {comments?.map((item)=>(
          <Fukidashi
            key={item.id}
            nowUserId={nowUserId} 
            content={item.content}
            username={item.username}
            postUserId={item.user_id}
          />
        ))}
      
    
    </div>
  )
}