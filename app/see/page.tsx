'use client'

import Header from "@/compornents/Header"
import NormalButton from "@/compornents/NormalButton"
import { timeLine } from "@/utils/supabase"
import { useSearchParams } from "next/navigation"
import { useState } from "react"

export default function Search(){
  const [posts,setPosts]=useState<string[]>([])
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
          <div key={post.id}>
            <p>{post.content}</p>
            <span className="text-base">
              {new Date(post.created_at).toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}