'use client'

import { useState } from "react"
import NormalButton from "./NormalButton"
import { createClient } from "@/utils/supabase"
import  TextareaAutosize  from "react-textarea-autosize"
export default function SendComment({
  postId,
  userId,
  username
}:{
  postId:string;
  userId:string|undefined;
  username:string
}){
  const [systemMessage,setSystemMessage]=useState<string>("")
  const [message,setMessage]=useState<string>('')
  const supabase=createClient()
  const sendMessage=async()=>{
    const nowMessage=message
    setMessage('')
    if(nowMessage.length>200){
      setSystemMessage("200文字以内にしてください")
      return;
    }
    const {error}=await supabase
      .from('comments')
      .insert([{post_id:postId,user_id:userId,username:username||'名無しさん',content:nowMessage}])
    
  }


  return (
    <div>
      <div className="flex">
        <TextareaAutosize 
          minRows={1}
          maxRows={3}
          className="border-2 w-full"
          value={message}
          onChange={(e)=>{setMessage(e.target.value)}}
        />
        <NormalButton
          onClick={()=>{
          
            sendMessage();

          }}
          disabled={!message.trim()}
          className="justify-end"
        >送信</NormalButton>
      </div>
      <p>{systemMessage}</p>
    </div>
  )
}