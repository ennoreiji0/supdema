'use client'
import { useRouter } from "next/navigation"
import { useState } from "react"
import Header from "@/components/Header"
import NormalButton from "@/components/NormalButton"
import { saveDemand, setHashTags } from "@/utils/supabase"
import { send } from "process"

export default function Post(){
  const router=useRouter()
  const [content,setContent]=useState<string>('')
  const [buttonOK,setButtonOK]=useState<boolean>(true)
  const [tags,setTags]=useState<string[]>([])
  return (
    <div className="text-xl">
      <Header/>
      <div className="pt-5 pb-3">
        <p>Demand(困りごと・要望)をSupplyしよう！</p>
      </div>
      
      
        <textarea className="border-2" 
          value={content}
          onChange={(e)=>setContent(e.target.value)}/>
        <h2 className="mt-4">ハッシュタグ</h2>
        <input 
          type="text"
          placeholder="単語を入力してEnter!"  
          className="border-2"
          onKeyDown={(e)=>{
            if(e.key==="Enter"){
              if(e.nativeEvent.isComposing) return;
              const current=e.currentTarget.value.trim();
              if(current){
                setTags((prev)=>([...prev,current]))
                e.currentTarget.value="";
              }
            }
          }}  
        />
        <div className="flex flex-wrap mt-5">{tags?.map((tag,index)=>(
          <span key={index} className="bg-slate-500 p-2 m-1 flex items-center w-fit rounded-2xl gap-1">
            #{tag}
            <NormalButton 
              className="text-xs px-2"
              onClick={()=>{
                const newTags=tags.filter((_,i)=>i!==index);
                setTags(newTags)
              }}
            >×</NormalButton>　
          </span>
          
        ))}</div>
      <div className="text-right space-y-2">
        <NormalButton className="text-[#ffff00]"
          disabled={content==="" || !buttonOK}
          onClick={async ()=>{
            if(content===""){
              return;
            }
            setButtonOK(false)
            setContent('...')
            const result=await saveDemand(content)
            
            if(result){
              const sendTags=[...new Set(tags)]
              const tagsResult=await setHashTags(result[0].id,sendTags)
            }
            
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
      </div>
    </div>
  )
}