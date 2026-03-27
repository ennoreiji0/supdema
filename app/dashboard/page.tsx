'use client'

import ButtonInHome from "@/compornents/ButtonInHome"
import MyLink from "@/compornents/MyLink"

export default function HomePage(){
  return (
    <div>
    <div className="flex justify-center p-7">
      <img src="/images/supdema.png" className="h-30"/>
    </div>
    <div className="flex space-x-5 text-center justify-center">
      <ButtonInHome href="/post" label="Supply" description="投稿しよう"></ButtonInHome>
      <ButtonInHome href="/see" label="見る" description="みんなのDemand"></ButtonInHome>
      <ButtonInHome href="/my-demand" label="メモ" description="自分のDemand"></ButtonInHome>
      
    </div>
    <MyLink href="my-page">マイページ</MyLink>
    </div>)
}