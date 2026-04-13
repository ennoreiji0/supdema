'use client'

import { createClient } from "@/utils/supabase"
import NormalButton from "./NormalButton"
import { setSolve } from "@/utils/supabase"
import { useRouter } from "next/navigation"
import { useState } from "react"

export function SolveButton(
  {postId,action,value,isPushed,isMyPost,count}:
  {
    postId:string,
    action:string,
    value:string,
    isPushed:boolean,
    isMyPost:boolean,
    count:number
  }
  ){

  const [buttonOK,setButtonOK]=useState<boolean>(isPushed)
  const [nowCount,setNowCount]=useState<number>(count);  

  const supabase=createClient()
  const router=useRouter()
  const handleSolve=async (action:string,postId:string)=>{
      if(isMyPost){
        return;
      }
  
      const {data:{user}}=await supabase.auth.getUser()
      if(user){
        setNowCount(buttonOK?nowCount-1:nowCount+1)
        setButtonOK(!buttonOK)
        const done=await setSolve(user.id,postId,action)

        if(!done){
          setButtonOK(!buttonOK)
          setNowCount(buttonOK?nowCount+1:nowCount-1)
        }
      }else{
        const ok=window.confirm("この操作にはログインが必要です。ログインしますか？")
        if(ok){
          router.push('/')
        }
      }
    }



    return (
        <div>
            <NormalButton
              className={buttonOK?"text-yellow-100 bg-red-300":""}
              onClick={async()=>{
                handleSolve(action,postId)
              }}
              disabled={isMyPost}
            >{value}
            </NormalButton>
            <span>{nowCount}</span>
        </div>
    )
}