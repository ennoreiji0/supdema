'use client'

import { useState } from "react"
import NormalButton from "./NormalButton"
import { useRouter } from "next/navigation"

export default function SearchForm({
  initialValue,
}:{
  initialValue:string
}){
  const [param,setParam]=useState<string>(initialValue)
  const router=useRouter()
  return (
    <div>
      <input 
        className="border-2"
        type="text"
        value={param}
        onChange={(e)=>{setParam(e.target.value)}}
      />
      <NormalButton
        onClick={()=>{
          router.push(`/search?tag=${param.trim()}`)
        }}
      >検索</NormalButton>
    </div>
  )
}