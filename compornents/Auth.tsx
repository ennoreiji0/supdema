'use client'
import { createClient } from "@/utils/supabase"
import { useEffect, useReducer, useState } from "react"
import NormalButton from "./NormalButton"
import { useRouter } from "next/navigation"

interface Prop{
  onLogin:()=>void
}

export default function Auth({onLogin}:Prop){
  const [email,setEmail]=useState<string>('')
  const [password,setPassword]=useState<string>('')
  const [sendOK,setSendOK]=useState<boolean>(false);
  const supabase=createClient()
  

  useEffect(()=>{
    if(email==="" || password===""){
      setSendOK(false)
    }else{
      setSendOK(true)
    }
  },[email,password])

  const handleSinUp= async ()=>{
    if(!sendOK){
      return
    }
    setSendOK(false)
    const {error}=await supabase.auth.signUp({email,password})
    if(error){
      console.log(error)
    }else{
      
      console.log("okay")
      onLogin()
    }
  }

  const handleLogin=async ()=>{
    if(!sendOK){
      return
    }
    setSendOK(false)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    
    if(error){
      console.log(error)
    }else{
      
      console.log("okay")
      window.location.href = '/dashboard'
    }
  }

  return (
    <div>
      <div>
        <div>
          メールアドレス:<input type="text" className="border-2" 
            value={email} 
            onChange={(e)=>setEmail(e.target.value)}
          />
        </div>
        <div>
          　　パスワード:<input type="text" className="border-2" 
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />
        </div>
        <NormalButton onClick={handleLogin}
          disabled={!sendOK}
        >ログイン</NormalButton>
        <NormalButton onClick={handleSinUp}
          disabled={!sendOK}
        >新規登録</NormalButton>
      </div>
    </div>
  )
}