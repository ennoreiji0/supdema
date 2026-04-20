'use client'

import { useRouter } from "next/navigation"
import { createClient } from "./supabase"
import { useEffect } from "react"

export default function useOkAuth(){
  const supabase=createClient()
  const router=useRouter()
  useEffect(()=>{
    const fetchUser=async()=>{
      const {data:{user}}=await supabase.auth.getUser()
      if(user){
        router.push('/dashboard')
      }
    }
    fetchUser()
  },[])
}