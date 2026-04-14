'use client'

import RiyouKiyaku from "@/components/RiyouKiyaku"
import { useRouter } from "next/navigation"

export default function KiyakuPage(){
    const router=useRouter()
    return (
        <div>
          <div
            className="cursor-pointer"
            onClick={()=>{
              router.back()
            }}
          >＜
          </div>
          <RiyouKiyaku/>
        </div>
    )
}