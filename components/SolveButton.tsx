'use client'

import { createClient } from "@/utils/supabase"
import NormalButton from "./NormalButton"
import { setSolve } from "@/utils/supabase"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { FanWithUser } from "@/utils/types"

export function SolveButton(
  {postId,action,value,isPushed,isMyPost}:
  {
    postId:string,
    action:string,
    value:string,
    isPushed:boolean,
    isMyPost:boolean,
  }
  ){

  const [buttonOK,setButtonOK]=useState<boolean>(isPushed)
  const [nowCount,setNowCount]=useState<number>(0);  
  const [fans,setFans]=useState<FanWithUser[]|null>(null)
  const supabase=createClient()
  const router=useRouter()

  useEffect(()=>{
    const fetchFans=async()=>{
      const { data, count:countSolve } = await supabase
        .from('solve')
        .select(`
          id,
          user_id,
          post_id,
          action,
          users (
            username
          )
        `, { count: 'exact' })
        .eq('post_id', postId)
        .eq('action',action)
        .limit(10)
        .returns<FanWithUser[]>();
      setNowCount(countSolve||0);
      setFans(data)
    }
    fetchFans();
  },[])

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
          <div className="space-x-1">
            {fans?.map((fan) => (
              <span key={fan.id}>
                {fan.users?.username || '名無し'}
              </span>
            ))}
          </div>
        </div>
    )
}