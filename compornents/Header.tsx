'use client'

import MyLink from "./MyLink"

export default function Header(){
  return (
    <div>
        <MyLink href="/" className="no-underline"><img src="/images/supdema.png" className="p-2 h-20"></img></MyLink>
    </div>
  )
}

//<h1 className="text-xl pt-5 pb-5 mb-5 text-[#3333aa] font-bold">Supply Demand</h1>