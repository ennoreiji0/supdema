'use client'

import Header from "@/components/Header"
import NormalButton from "@/components/NormalButton"
import { createClient, getCurrentUser, getPosts } from "@/utils/supabase"
import { useRouter } from "next/navigation"
import {useState, useEffect } from "react"
import { Post } from "@/utils/types"
import PostCard from "@/components/PostCard"


export default function MyDemand(){
  const [posts,setPosts]=useState<Post[]>([])
  const [karappo,setKarappo]=useState<string>('読み込み中...')
  const [userId,setUserId]=useState<string>('')
  const supabase=createClient()
  //const router=useRouter()
  useEffect(()=>{
    const fetchUser=async ()=>{
      const user= await getCurrentUser()
      setUserId((user?.id)||'')
      if(user){
        const newPosts=await getPosts('user_id',user.id)
        if(newPosts){
          setKarappo('')
          setPosts(newPosts as any as Post[])
        
        }
        if(newPosts?.length===0){
          setKarappo('まだ投稿がありません')
        }
      }
    }
    fetchUser()
    
  },[])
  return (
    <div>
      <Header/>
      <h1 className="text-3xl">自分のDemand</h1>
      <p className="m-7 text-center">{karappo}</p>
      <div className="mt-7">
        {posts?.map((post)=>(
          <div key={post.id} className="flex bg-slate-700 p-3 text-slate-300">
            <PostCard
              post={post}
              userId={userId}
              cursor={true}
            />
            
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