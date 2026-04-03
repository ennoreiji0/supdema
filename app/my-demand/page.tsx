'use client'

import Header from "@/compornents/Header"
import NormalButton from "@/compornents/NormalButton"
import { createClient, getCurrentUser, getPosts } from "@/utils/supabase"
import { useRouter } from "next/navigation"
import {useState, useEffect } from "react"

type Post={
  id:string;
  content:string;
  created_at:string;
}

export default function MyDemand(){
  const [posts,setPosts]=useState<Post[]>([])
  const supabase=createClient()
  const router=useRouter()
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
          <div key={post.id} className="flex bg-slate-700 p-3 text-slate-300">
            <div>
              <p className="text-xl break-all">{post.content}</p>
              <span className="text-xs text-slate-400">
                {new Date(post.created_at).toLocaleString()}
              </span>
            </div>
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
                  window.location.reload()
                }
              }}
              className="ml-auto"
            >削除</NormalButton>
          </div>
        ))}
      </div>
    </div>
  )
}