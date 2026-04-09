'use client'

import Em from "@/components/Em"
import Header from "@/components/Header"
import MyLink from "@/components/MyLink"
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
      </div>
      
      <p className="mt-7">新規登録をすると、利用規約に同意したものとみなされます</p>
      <div className="m-2 border-2 p-2">
        <h2 className="text-2xl">利用規約</h2>
        <p>1.当サイトに投稿した内容(テキスト、画像、アイデアなど)は、<Em>誰でも自由に、無償で、商用・非商用を問わず利用できます。</Em></p>
        <p>2.自分のアイデアが製品化などをされても、<Em>お金の請求などはできません</Em>。</p>
        <p>3.投稿によってトラブル等が起きても、運営は責任を負いかねます</p>
        <p>4.ほかの人を傷つけたり、権利(著作権等)を侵害したりする投稿はしないでください。万が一問題が起きたら、投稿した本人が解決してください。</p>
      </div>
    </div>
  )
}

//<h1 className="text-center text-7xl pt-20 pb-10 text-[#3333aa]">Supply Demand</h1>