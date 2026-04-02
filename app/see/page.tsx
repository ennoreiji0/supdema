'use client'

import Header from "@/compornents/Header"
import NormalButton from "@/compornents/NormalButton"
import { timeLine } from "@/utils/supabase"
import { useSearchParams } from "next/navigation"
import { useState } from "react"

type Post={
  id:string;
  content:string;
  created_at:string;
  users:{
    username:string
  }[]
}

export default function Search(){
  const [posts,setPosts]=useState<Post[]>([])
  return (
    <div className="text-xl">
      <Header/>
      <NormalButton
        onClick={async ()=>{
          const nowPosts=await timeLine()
          if(nowPosts){
            setPosts(nowPosts)
          }
        }}
        className="mb-5"
      >タイムラインを更新</NormalButton>
      <div className="space-y-3">
        {posts?.map((post)=>(
          <div key={post.id} className="bg-[#f0f0f0] p-3">
            <p className="text-sm font-bold">{post.users[0].username}</p>
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