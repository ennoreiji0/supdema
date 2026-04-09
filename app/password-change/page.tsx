'use client'

import Header from "@/components/Header"
import NormalButton from "@/components/NormalButton"
import { createClient } from "@/utils/supabase"
import { useState } from "react"

export default function PasswordChange(){
  const [newPassword,setNewPassword]=useState<string>('')
  const supabase=createClient()
  const handleChange=async()=>{
    const { data, error } = await supabase.auth.updateUser({
      password: newPassword
    })
    if(!error){
      alert("パスワードを変更しました")
    }else{
      console.log(error)
    }
  }
  return (
    <div>
      <Header/>
      <h1>パスワード変更</h1>
      <input type="text" value={newPassword} 
        onChange={(e)=>setNewPassword(e.target.value)} className="border-2"/>
      <NormalButton onClick={handleChange}>送信</NormalButton>
    </div>
  )
}