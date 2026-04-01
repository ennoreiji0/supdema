'use client'

import Header from "@/compornents/Header"
import NormalButton from "@/compornents/NormalButton"
import { createClient } from "@/utils/supabase"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function MyPage(){
  const [buttonOK,setButtonOK]=useState<boolean>(true)
  const supabase=createClient()
  const router=useRouter()

  const handleLogOut= async()=>{
    setButtonOK(false)
    const {error}=await supabase.auth.signOut()
    if(error){
      console.log("ログアウト失敗")
      setButtonOK(true)
      return
    }
    router.push("/")
    router.refresh()
  }

  const handleResetPassword= async()=>{
    setButtonOK(false)
    const {data:{user}}=await supabase.auth.getUser()
    if(user?.email){
      const {data,error}=await supabase.auth.resetPasswordForEmail(user.email,{
        redirectTo:"http://localhost:3000/password-change"
      })
      alert("パスワード変更メールを送信しました")
      setButtonOK(true)
    }
    
  }

  return (
    <div>
      <Header/>
      <h1>マイページ</h1>
      <NormalButton 
      disabled={!buttonOK}
      onClick={()=>{
        handleLogOut()
      }}>ログアウト</NormalButton>
      <br />
      <NormalButton 
      disabled={!buttonOK}
      onClick={()=>{
        handleResetPassword()
      }}
      
      >パスワード変更</NormalButton>
    </div>
    )
}