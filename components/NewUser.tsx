/*import { useState } from "react";
import { createClient } from "@/utils/supabase";
import NormalButton from "./NormalButton";

export default function NewUser(){
    const [email,setEmail]=useState<string>('')
    const [password,setPassword]=useState<string>('')
    const [userName,setUserName]=useState<string>('')
    const [sendOK,setSendOK]=useState<boolean>(false);
    const supabase=createClient()
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
          />
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
}*/