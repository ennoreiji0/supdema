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
    <div className="bg-[#fcfcaa] p-3">
      <Link href={href}>
        <NormalButton className="text-5xl py-4 my-7">
          {label}
        </NormalButton>
      </Link>
      <p className="text-3xl">{description}</p>
    </div>
  )
}