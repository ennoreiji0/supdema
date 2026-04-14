'use client'

import { useState } from "react"
import NormalButton from "./NormalButton"
import { createClient } from "@/utils/supabase"

export default function SendComment({
  postId,
  userId,
  username
}:{
  postId:string;
  userId:string|undefined;
  username:string
}){
  const [message,setMessage]=useState<string>('')
  const supabase=createClient()
  const sendMessage=async()=>{
    const {error}=await supabase
      .from('comments')
      .insert([{post_id:postId,user_id:userId,username:username,content:message}])
    setMessage('')
  }


  return (
    <div>
      <input 
        type="text" 
        className="border-2"
        value={message}
        onChange={(e)=>{setMessage(e.target.value)}}
      />
      <NormalButton
        onClick={sendMessage}
      >送信</NormalButton>
    </div>
  )
}