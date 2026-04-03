'use client'
import NormalButton from "./NormalButton"
import Link from "next/link"

type Props = {
  href: string;
  label: string;
  description: string;
}

export default function ButtonInHome({ href, label, description }: Props){
  return (
    <div className="bg-[#cece8d] p-3 w-full sm:w-auto">
      <Link href={href}>
        <NormalButton className="text-5xl py-4 my-7">
          {label}
        </NormalButton>
      </Link>
      <p className="text-3xl text-slate-700">{description}</p>
    </div>
  )
}