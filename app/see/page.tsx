'use client'

import Header from "@/compornents/Header"
import NormalButton from "@/compornents/NormalButton"
import { createClient, getPosts, timeLine } from "@/utils/supabase"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { increaseLike } from "@/utils/handlePost"
import GoodButton from "@/compornents/GoodButton"

type Post={
  id:string;
  content:string;
  created_at:string;
  tags:{
    tag_name:string;
  }[]
  users:{
    username:string;
  }
  likes:number
}

export default function Search(){
  const [posts,setPosts]=useState<Post[]>([])
  const [likes,setLikes]=useState<Record<string,boolean>>({})
  const [message,setMessage]=useState<string>('読み込み中...')
  //const [tags,setTags]=useState<string[]>([])
  const supabase=createClient()
  const router=useRouter()

  const refresh=async()=>{
    setMessage('読み込み中...')
    const nowPosts=await timeLine()
    if(nowPosts){
      setMessage('')
      setPosts(nowPosts as any as Post[])
      console.log(nowPosts)
    }
    
    initializeLikes(posts)
  }

  /*const handleLike=async(postId:string)=>{
    if(likes[postId])return;
    setLikes((prev)=>({...prev,[postId]:true}))

    const result=await increaseLike(postId)
    if(result){
      setLikes((prev) => ({ ...prev, [postId]: false }));
    }
    /*const {error}=await supabase.rpc('increment_likes',{
      row_id:postId
    })
    if(error){
      console.log(error)
      setLikes((prev) => ({ ...prev, [postId]: false }));
    }
   
  }*/

const initializeLikes = (newPosts: Post[]) => {
  setLikes((prev) => {
    // 1. 新しい投稿の初期値オブジェクトを作成
    const newEntries = Object.fromEntries(
      newPosts.map((post) => [post.id, false])
    );

    // 2. 「今の状態」の上に「新しいデータ」を重ねる
    // ただし、すでにキーが存在する場合は `prev`（今の状態）を優先する
    return {
      ...newEntries, // まず全部 false で埋める
      ...prev        // その後、既存の true/false 状態で上書きする
    };
  });
};

  useEffect(()=>{
    refresh()
    
    
  },[])

  return (
    <div className="text-xl">
      <Header/>
      <NormalButton
        onClick={refresh}
        className="mb-5"
      >タイムラインを更新</NormalButton>
      <p className="m-7 text-center">{message}</p>
      <div className="space-y-3">
        {posts?.map((post)=>(
          <div 
            key={post.id} 
            className="bg-slate-700 p-3 text-slate-200"
            onClick={()=>{router.push(`/posts/${post.id}`)}}
          >
            <p className="text-sm font-bold text-slate-300">{post.users?.username}</p>
            <p>{post.content}</p>
            <div className="text-base text-[#77a9f8] space-x-1">
              {post.tags?.map((t) => (
                <span key={t.tag_name}>#{t.tag_name}</span>
              ))}
            </div>
            <span className="text-sm">
              {new Date(post.created_at).toLocaleString()}
            </span>
            <span className="ml-3 text-sm">
              <GoodButton 
                postId={post.id} 
                likes={post.likes}
              />
              
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}