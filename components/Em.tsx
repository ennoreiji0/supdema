'use client';
import { twMerge } from "tailwind-merge";

type Props=React.ComponentPropsWithoutRef<"em">

export default function Em({children, className, ...props}:Props){
  return (
    <em className={twMerge(`
      text-[#f98282]
      not-italic`
      ,className)}
      {...props}>{children}
    </em>
  )
}