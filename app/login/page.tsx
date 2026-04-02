'use client'
import { createClient } from "@/utils/supabase"
import { useEffect, useReducer, useState } from "react"
import NormalButton from "@/compornents/NormalButton"
import { useRouter } from "next/navigation"



export default function Auth(){
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
        
      </div>
    </div>
  )
}