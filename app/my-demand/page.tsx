'use client'

import Header from "@/compornents/Header"
import NormalButton from "@/compornents/NormalButton"
import { createClient, getCurrentUser, getPosts } from "@/utils/supabase"
import {useState, useEffect } from "react"

type Post={
  id:string;
  content:string;
  created_at:string;
}

export default function MyDemand(){
  const [posts,setPosts]=useState<Post[]>([])
  const supabase=createClient()
  useEffect(()=>{
    const fetchUser=async ()=>{
      const user= await getCurrentUser()
      if(user){
        const newPosts=await getPosts('user_id',user.id)
        if(newPosts){
          setPosts(newPosts)
        }
      }
    }
    fetchUser()
    
  },[])
  return (
    <div>
      <Header/>
      <h1 className="text-3xl">自分のDemand</h1>
      <div className="mt-7">
        {posts?.map((post)=>(
          <div key={post.id} className="bg-[#f0f0f0] p-3">
            <p className="text-xl">{post.content}</p>
            <span className="text-base">
              {new Date(post.created_at).toLocaleString()}
            </span>
            <NormalButton 
              onClick={async()=>{
                const {error}=await supabase
                  .from('posts')
                  .delete()
                  .eq('id',post.id)

                if(error){
                  console.log(error)
                }else{
                  alert("削除しました")
                }
              }}
            >削除</NormalButton>
          </div>
        ))}
      </div>
    </div>
  )
}