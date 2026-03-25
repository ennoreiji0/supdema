'use client'

import ButtonInHome from "@/compornents/ButtonInHome"
//import NormalButton from "@/compornents/NormalButton"

export default function Home(){
  return (
    <div>
      <h1 className="text-center text-7xl pt-20 pb-10 text-[#3333aa]">Supply Demand</h1>
      <div className="flex space-x-5 text-center justify-center">
        <ButtonInHome href="/post" label="Supply" description="投稿しよう"></ButtonInHome>
        <ButtonInHome href="/see" label="見る" description="みんなのDemand"></ButtonInHome>
        <ButtonInHome href="/my-demand" label="メモ" description="自分のDemand"></ButtonInHome>
        
      </div>
    </div>
  )
}