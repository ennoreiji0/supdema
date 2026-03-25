'use client'

import NormalButton from "@/compornents/NormalButton"

export default function Post(){
  return (
    <div className="text-xl">
      <div className="pt-5 pb-3">
        <p>Demand(困りごと・要望)をSupplyしよう！</p>
        <p>自分のメモとして保存することもできます</p>
      </div>
      
      
        <textarea className="border-2"/>
      <div className="text-right space-y-2">
        <NormalButton className="bg-[#2222bb] text-[#ffff00]">Supply!</NormalButton>
        <br />
        <NormalButton >メモとして保存</NormalButton>
      </div>
    </div>
  )
}