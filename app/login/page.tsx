'use client'
import { createClient } from "@/utils/supabase"
import { useEffect, useReducer, useState } from "react"
import NormalButton from "@/components/NormalButton"
import { useRouter } from "next/navigation"
import useOkAuth from "@/utils/useOkAuth"
import BackButton from "@/components/BackButton"



export default function Auth(){
  useOkAuth()
  const [email,setEmail]=useState<string>('')
  const [password,setPassword]=useState<string>('')
  const [sendOK,setSendOK]=useState<boolean>(false);
  const [errorAppear,setErrorAppear]=useState<boolean>(false)
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
      setErrorAppear(true)
    }else{
      
      console.log("okay")
      window.location.href = '/dashboard'
    }
  }

  return (
    <div>
      <BackButton/>
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
        {errorAppear&&(<p>メールアドレスかパスワードが違います</p>)}
      </div>
    </div>
  )
}