'use client'

import BackButton from "@/components/BackButton"
import RiyouKiyaku from "@/components/RiyouKiyaku"
import { useRouter } from "next/navigation"

export default function KiyakuPage(){
    const router=useRouter()
    return (
        <div>
          <BackButton/>
          <RiyouKiyaku/>
        </div>
    )
}