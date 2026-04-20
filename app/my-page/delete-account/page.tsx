'use client'
import MyLink from "@/components/MyLink";
import useRequireAuth from "@/utils/useRequireAuth";

export default function DeleteAccount(){
  useRequireAuth()
  return (
    <div>
      <h1>アカウント削除について</h1>
      <p>お手数ですが、当サイト管理者に直接お申し出下さい。</p>
      <MyLink href="/">トップへ</MyLink>
    </div>
  )
}