'use client'

import Header from "@/compornents/Header"
import NormalButton from "@/compornents/NormalButton"
import { createClient } from "@/utils/supabase"
import { useRouter } from "next/navigation"

export default function MyPage(){
  const supabase=createClient()
  const router=useRouter()

  const handleLogOut= async()=>{
    const {error}=await supabase.auth.signOut()
    if(error){
      console.log("ログアウト失敗")
      return
    }
    router.push("/")
    router.refresh()
  }
  return (
    <div>
      <Header/>
      <h1>マイページ</h1>
      <NormalButton onClick={()=>{
        handleLogOut()
      }}>ログアウト</NormalButton>
    </div>
    )
}