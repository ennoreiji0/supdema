'use client'

import Header from "@/components/Header"
import NormalButton from "@/components/NormalButton"
import { createClient, timeLine } from "@/utils/supabase"
import { useEffect, useState } from "react"
import { Post } from "@/utils/types"
import PostCard from "@/components/PostCard"
import { useRouter } from "next/navigation"



export default function Search(){
  const [posts,setPosts]=useState<Post[]>([])
  //const [likes,setLikes]=useState<Record<string,boolean>>({})
  const [message,setMessage]=useState<string>('読み込み中...')
  const [nowUser,setNowUser]=useState<string>('')
  const supabase=createClient()


  const refresh=async()=>{
    setMessage('読み込み中...')
    const {data:{user}}=await supabase.auth.getUser()
    if(user)setNowUser(user.id)
    const nowPosts=await timeLine()
    if(nowPosts){
      setMessage('')
      setPosts(nowPosts as any as Post[])
      console.log(nowPosts)
    }
    
    //initializeLikes(posts)
  }

  const router=useRouter()

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
      <NormalButton
        onClick={()=>{
          router.push("/search")
        }}
      >検索
      </NormalButton>
      <p className="m-7 text-center">{message}</p>
      <div className="space-y-3">
        {posts?.map(post=> 
          <div key={post.id}
            >
            <PostCard post={post}  userId={nowUser} cursor={true}/>
          </div>
        )}
      </div>
    </div>
  )
}