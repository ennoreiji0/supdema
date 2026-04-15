'use client'

import Em from "@/components/Em"
import GoogleLoginButton from "@/components/GoogleLoginButton"
import Header from "@/components/Header"
import MyLink from "@/components/MyLink"
import RiyouKiyaku from "@/components/RiyouKiyaku"
/*import HomePage from "@/app/dashboard/page"
import { createClient } from "@/utils/supabase"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"*/

export default function Home(){
  /*const [users,setUsers]=useState<any>(null)
  const supabase=createClient()
  const router=useRouter()*/


  /*useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUsers(user)
    }
    checkUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("Auth Event:", event) 
      setUsers(session?.user ?? null)
    })

    return () => subscription.unsubscribe() 
  }, [])*/


  return (
    <div>  
      <Header/>
      <div className="text-2xl">
        <MyLink href="/login">ログイン</MyLink>
        <div className="h-4"></div>
        <MyLink href="/sinup">新規登録</MyLink>
        <GoogleLoginButton/>
      </div>
      
      <p className="mt-7">新規登録をすると、利用規約に同意したものとみなされます</p>
      <RiyouKiyaku/>
    </div>
  )
}

//<h1 className="text-center text-7xl pt-20 pb-10 text-[#3333aa]">Supply Demand</h1>