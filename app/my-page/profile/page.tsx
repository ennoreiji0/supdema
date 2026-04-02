'use client'
import Header from "@/compornents/Header"
import NormalButton from "@/compornents/NormalButton"
import { createClient, getPosts } from "@/utils/supabase"
import { fetchExternalImage } from "next/dist/server/image-optimizer"
import { useEffect, useState } from "react"


export default function ProfileChange(){
  const [userName,setUserName]=useState<string>('')
  const [userID,setUserID]=useState<string>('')
  const [sendOK,setSendOK]=useState<boolean>(true)
  const supabase=createClient()
  useEffect(()=>{
    const fetchUser=async ()=>{
      const {data:{user}}=await supabase.auth.getUser()
      if(user){
        setUserID(user.id)
        const {data:profile}=await supabase
          .from('users')
          .select('username')
          .eq('id',user.id)
          .single()
        if(profile){
          setUserName(profile.username)
        }
        
      }
    }
    fetchUser()
  },[])

  useEffect(()=>{
    if(userName==""){
      setSendOK(false)
    }else{
      setSendOK(true)
    }
  },[userName])

  const handleSend=async ()=>{
    setSendOK(false)
    const {data,error}=await supabase
      .from('users')
      .update({username:userName})
      .eq('id',userID)
    window.location.href="/"
  }

  return (
    <div>
      <Header/>
      <h1>プロフィール変更</h1>
      <div>
        ユーザー名:
        <input type="text" 
          value={userName}
          onChange={(e)=>{
            setUserName(e.target.value)}}
          className="border-2"/>

      </div>
      <NormalButton
        onClick={handleSend}
        disabled={!sendOK}
      >送信</NormalButton>
    </div>
  )
}