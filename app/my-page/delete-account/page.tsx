'use client'
import MyLink from "@/components/MyLink";
import NormalButton from "@/components/NormalButton";
import { createClient } from "@/utils/supabase";
import useRequireAuth from "@/utils/useRequireAuth";
import { useRouter } from "next/navigation";

export default function DeleteAccount(){
  useRequireAuth()
  const supabase=createClient()
  const router=useRouter()
  const deleteAccount=async()=>{
    const {error}=await supabase.rpc('delete_user_own_account')
    if(error){
      alert("削除に失敗しました")
    }else{
      alert("アカウントを削除しました")
      router.push("/")
    }
  }
  return (
    <div>
      <h1>アカウントを削除しますか？</h1>
      <NormalButton
        onClick={()=>{
          if(confirm("本当にアカウントを削除しますか？")){
            deleteAccount()
          }
        }}
      >はい</NormalButton>
      <MyLink href="/my-page">マイページに戻る</MyLink>
    </div>
  )
}