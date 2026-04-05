'use client'

import Header from "@/compornents/Header"
import NormalButton from "@/compornents/NormalButton"
import { createClient, getPosts, timeLine } from "@/utils/supabase"
import { useEffect, useState } from "react"

type Post={
  id:string;
  content:string;
  created_at:string;
  users:{
    username:string
  }
  likes:number
}

export default function Search(){
  const [posts,setPosts]=useState<Post[]>([])
  const [likes,setLikes]=useState<Record<string,boolean>>({})
  const supabase=createClient()

  const refresh=async()=>{
    const nowPosts=await timeLine()
    if(nowPosts){
      setPosts(nowPosts as any as Post[])
      console.log(nowPosts)
    }
    initializeLikes(posts)
  }

  const handleLike=async(postId:string)=>{
    if(likes[postId])return;
    setLikes((prev)=>({...prev,[postId]:true}))

    const {error}=await supabase.rpc('increment_likes',{
      row_id:postId
    })
    if(error){
      console.log(error)
      setLikes((prev) => ({ ...prev, [postId]: false }));
    }
  }

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
      <div className="space-y-3">
        {posts?.map((post)=>(
          <div key={post.id} className="bg-slate-700 p-3 text-slate-300">
            <p className="text-sm font-bold">{post.users?.username}</p>
            <p>{post.content}</p>
            <span className="text-sm">
              {new Date(post.created_at).toLocaleString()}
            </span>
            <span className="ml-3 text-sm">
              <NormalButton
                className="disabled:text-yellow-100 disabled:bg-red-300"
                disabled={likes[post.id]}
                onClick={()=>{
                  handleLike(post.id)
                }}
              >★</NormalButton>
              <span className="ml-2">{likes[post.id]? post.likes+1 : post.likes}</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}