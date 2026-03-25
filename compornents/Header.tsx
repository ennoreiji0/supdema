'use client'

import MyLink from "./MyLink"

export default function Header(){
  return (
    <div>
        <MyLink href="/" className="no-underline"><h1 className="text-xl pt-5 pb-5 mb-5 text-[#3333aa] font-bold">Supply Demand</h1></MyLink>
    </div>
  )
}