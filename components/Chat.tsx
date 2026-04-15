'use client'
import { createClient } from "@/utils/supabase"
import NormalButton from "./NormalButton"
import Fukidashi from "./Fukidashi"
import SendComment from "./SendComment";
import { ChatInfo } from "@/utils/types";
import ChatView from "./ChatView";
import { useEffect, useState } from "react";
import MyLink from "./MyLink";


export default function Chat({
  postId,
  sendOK
}:{
  postId:string
  sendOK:boolean
}){
  const [userId,setUserId]=useState<string|undefined>('')
  const [userName,setUserName]=useState<string>('')
  const [chatData,setChatData]=useState<ChatInfo[]|null>(null)
  const supabase=createClient()
  useEffect(()=>{
    const fetchComments=async()=>{
      const {data:{user}}=await supabase.auth.getUser()
      setUserId(user?.id)
      const {data}=await supabase
        .from('comments')
        .select(`id,user_id,username,content`)
        .eq('post_id',postId)
        .order('created_at',{ascending:true})
        .returns<ChatInfo[]>()
      setChatData(data)
      const {data:test}=await supabase
        .from('comments')
        .select('*')
        .eq('post_id',postId)

      const {data:username}=await supabase
        .from('users')
        .select(`username`)
        .eq('id',user?.id)
        .single()
      setUserName(username?.username)
      console.log("comment",data,postId)
    }
    fetchComments();
  },[])

  if (!chatData) {
    return <div className="p-4 text-gray-500">読み込み中...</div>;
  }

  return (
    <div>
      <ChatView
        postId={postId}
        nowUserId={userId}
        initialComments={chatData??[]}
      />
      {sendOK?(
        <SendComment
          username={userName}
          postId={postId}
          userId={userId}
        />
      ):(
        <p><MyLink href="/">ログイン</MyLink>してチャットに参加しよう</p>
      )}
      
    </div>
  )
}