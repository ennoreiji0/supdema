'use client'
import { Post } from "@/utils/types";
import { useRouter } from "next/navigation";
import GoodButton from "./GoodButton";
import { createClient } from "@/utils/supabase";

export default function PostCard(
  {
    post,
    userId,
    cursor
  }:
  {
    post:Post;
    userId:string|undefined;
    cursor:boolean
  }
){
  const router=useRouter()
  return (

    <div
      className={cursor?"bg-slate-700 p-3 text-slate-200 w-full block cursor-pointer":"bg-slate-700 p-3 text-slate-200 w-full block"}
      onClick={()=>{
        router.push(`/posts/${post.id}`)
      }}
    >
      <p className="text-sm font-bold text-slate-300">{post.users?.username}</p>
      <p>{post.content}</p>
      <div className="text-base text-[#77a9f8] space-x-1">
        {post.tags?.map((t) => (
          <span key={t.tag_name}
          className="hover:underline cursor-pointer"
          onClick={(e)=>{
            router.push(`/search?tag=${t.tag_name}`)
            e.stopPropagation()
          }}
          >#{t.tag_name}</span>
        ))}
      </div>
      <span className="text-sm">
        {new Date(post.created_at).toLocaleString()}
      </span>
      <span className="ml-3 text-sm">
        {
          <GoodButton
            postId={post.id} 
            likes={post.likes}
            isMine={userId===post.user_id}
          />
        }
      </span>
    </div>
    
  )   
}