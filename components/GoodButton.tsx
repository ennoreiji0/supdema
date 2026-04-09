'use client'

import { useState } from "react"
import NormalButton from "./NormalButton"
import { increaseLike } from "@/utils/handlePost";

export default function GoodButton({ 
  postId,
  likes,
  isMine
}: { 
  postId: string; 
  likes: number;
  isMine:boolean
}){
  const [like,setLike]=useState<boolean>(false)
  return (
    <div>
      <NormalButton
        className="disabled:text-yellow-100 disabled:bg-red-300"
        disabled={like || isMine}
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