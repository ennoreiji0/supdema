'use client'

import { useState } from "react"
import NormalButton from "./NormalButton"
import { increaseLike } from "@/utils/handlePost";

export default function GoodButton({ 
  postId,
  likes
}: { 
  postId: string; 
  likes: number
}){
  const [like,setLike]=useState<boolean>(false)
  return (
    <div>
      <NormalButton
        className="disabled:text-yellow-100 disabled:bg-red-300"
        disabled={like}
        onClick={(e)=>{
          e.stopPropagation()
          setLike(true)
          increaseLike(postId)
        }}
      >わかる!</NormalButton>
      <span className="ml-2">{like? likes+1 : likes}</span>
    </div>
  )
}