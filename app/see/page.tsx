'use client'

import Header from "@/compornents/Header"
import NormalButton from "@/compornents/NormalButton"
import { timeLine } from "@/utils/supabase"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

type Post={
  id:string;
  content:string;
  created_at:string;
  users:{
    username:string
  }
}

export default function Search(){
  const [posts,setPosts]=useState<Post[]>([])

  const refresh=async()=>{
    const nowPosts=await timeLine()
    if(nowPosts){
      setPosts(nowPosts as any as Post[])
      console.log(nowPosts)
    }
  }

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
          </div>
        ))}
      </div>
    </div>
  )
}