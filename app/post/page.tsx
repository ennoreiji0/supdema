'use client'
import { useRouter } from "next/navigation"
import { useState } from "react"
import Header from "@/compornents/Header"
import NormalButton from "@/compornents/NormalButton"
import { saveDemand } from "@/utils/supabase"

export default function Post(){
  const router=useRouter()
  const [content,setContent]=useState<string>('')
  const [buttonOK,setButtonOK]=useState<boolean>(true)
  return (
    <div className="text-xl">
      <Header/>
      <div className="pt-5 pb-3">
        <p>Demand(困りごと・要望)をSupplyしよう！</p>
        <p>自分のメモとして保存することもできます</p>
      </div>
      
      
        <textarea className="border-2" 
          value={content}
          onChange={(e)=>setContent(e.target.value)}/>
      <div className="text-right space-y-2">
        <NormalButton className="bg-[#2222bb] text-[#ffff00]"
          disabled={content==="" || !buttonOK}
          onClick={async ()=>{
            if(content===""){
              return;
            }
            setButtonOK(false)
            setContent('...')
            const result=await saveDemand(content)
            
            setTimeout(()=>{
              if(result){
                setContent("投稿完了！")
              }else{
                setContent("投稿失敗・・・。")
              }
              setTimeout(()=>{
                router.replace('/')
              },1000)
              
            },1000)
            
          }}
        >Supply!</NormalButton>
        <br />
        <NormalButton 
          disabled={content==="" || !buttonOK}>メモとして保存</NormalButton>
      </div>
    </div>
  )
}