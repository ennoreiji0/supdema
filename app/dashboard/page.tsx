'use client'

import ButtonInHome from "@/components/ButtonInHome"
import MyLink from "@/components/MyLink"
import { createClient } from "@/utils/supabase"
import useRequireAuth from "@/utils/useRequireAuth"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function HomePage(){
  //useRequireAuth()
  const supabase=createClient()
  const [userOk,setUserOk]=useState<boolean>(false)
  useEffect(()=>{
    const fetchUser=async()=>{
      const {data:{user}}=await supabase.auth.getUser()
      if(user){
        setUserOk(true)
      }
    }
    fetchUser()
  },[])
  return (
    <div>
    <div className="flex justify-center p-7">
      <img src="/images/supdema.png" className="h-30"/>
    </div>
    {userOk?(<p className="text-2xl"><MyLink href="my-page">マイページ</MyLink></p>):""}
    <div className="flex space-x-5 text-center justify-center flex-col sm:flex-row gap-4">
      <ButtonInHome href="/post" label="Supply" description="投稿しよう"></ButtonInHome>
      <ButtonInHome href="/see" label="See" description="みんなのDemand"></ButtonInHome>
      <ButtonInHome href="/my-demand" label="Mine" description="自分のDemand" disabled={!userOk}></ButtonInHome>
      
    </div>
    
    </div>)
}