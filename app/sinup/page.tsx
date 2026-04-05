'use client'
import { useState,useEffect } from "react";
import { createClient } from "@/utils/supabase";
import NormalButton from "@/compornents/NormalButton";

export default function NewUser(){
    const [email,setEmail]=useState<string>('')
    const [password,setPassword]=useState<string>('')
    const [userName,setUserName]=useState<string>('')
    const [sendOK,setSendOK]=useState<boolean>(false);
    const supabase=createClient()

    useEffect(()=>{
        if(email==="" || password==="" || userName===""){
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
      }else{
      
        console.log("okay")
        const {data:{user}}=await supabase.auth.getUser()
        if(user){

        
          const { error } = await supabase
            .from('users')
            .insert([{ id:user?.id ,username:userName }]);
          console.log("error:",error)
        }
        window.location.href = '/dashboard'
      }
    }

    return (
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
          />(6文字以上)
        </div>
        <div>
          ユーザー名:<input type="text" className="border-2"
            value={userName}
            onChange={(e)=>setUserName(e.target.value)}/>
        </div>
        <NormalButton onClick={handleSinUp}
                  disabled={!sendOK}
                >新規登録</NormalButton>
      </div>
    )
}