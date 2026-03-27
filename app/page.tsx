'use client'

import Auth from "@/compornents/Auth"
import HomePage from "@/app/dashboard/page"
import { createClient } from "@/utils/supabase"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function Home(){
  const [users,setUsers]=useState<any>(null)
  const supabase=createClient()
  const router=useRouter()


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
      

      <Auth onLogin={()=>{
        console.log("onLogin");
        window.location.href = '/dashboard'

      }}/>
      
      
    </div>
  )
}

//<h1 className="text-center text-7xl pt-20 pb-10 text-[#3333aa]">Supply Demand</h1>