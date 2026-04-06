'use client'
import { useState,useEffect } from "react";
import { createClient } from "@/utils/supabase";
import NormalButton from "@/compornents/NormalButton";
import Em from "@/compornents/Em";

export default function NewUser(){
    const [email,setEmail]=useState<string>('')
    const [password,setPassword]=useState<string>('')
    const [userName,setUserName]=useState<string>('')
    const [sendOK,setSendOK]=useState<boolean>(false);
    const [errorAppear,setErrorAppear]=useState<string>('')
    const supabase=createClient()

    useEffect(()=>{
        if(email==="" || password.length<6 || userName===""){
          setSendOK(false)
        }else{
          setSendOK(true)
        }
      },[email,password,userName])

    const handleSinUp= async ()=>{
      if(!sendOK){
        return
      }
      setSendOK(false)
      const {error}=await supabase.auth.signUp({email,password})
      if(error){
        console.log(error)
        setErrorAppear(error.message)
      }else{
      
        console.log("okay")
        const {data:{user}}=await supabase.auth.getUser()
        if(user){

        
          const { error } = await supabase
            .from('users')
            .insert([{ id:user?.id ,username:userName }]);
          if(error)setErrorAppear(error.details)

        }
        window.location.href = '/dashboard'
      }
    }

    return (
      <form className="text-xl">
        <div className="m-4">
          <p>メールアドレス</p>
          <input type="email" required className="border-2" 
            value={email} 
            onChange={(e)=>setEmail(e.target.value)}
          />
        </div>
        <div className="m-4">
          <p>パスワード</p>
          <input type="text" className="border-2" 
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />
          <p><Em>(6文字以上)</Em></p>
        </div>
        <div className="m-4">
          <p>ユーザー名</p>
          <input type="text" className="border-2"
            value={userName}
            onChange={(e)=>setUserName(e.target.value)}/>
        </div>
        <p className="mt-4">ユーザー名はほかのユーザーにも見られるので、個人情報は書かないで下さい</p>
        <NormalButton type="submit" onClick={handleSinUp}
                  disabled={!sendOK}
                >新規登録</NormalButton>
        <div>{errorAppear}</div>
      </form>
    )
}