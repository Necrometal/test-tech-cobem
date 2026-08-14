'use client'

import { CATEGORY_TOUT } from "@/app/constantes";
import { formatDate } from "@/app/lib/date";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Badge from "../badge";

export default function MessageItem({ message }){
  const searchParams = useSearchParams();
  const category = searchParams.get("category") ?? CATEGORY_TOUT;

  return (
    <Link
      href={`/dashboard/${message.id}`} 
      className={`w-full flex gap-2 justify-between items-center h-8 mb-1 ${message.read && 'bg-gray-300'}`}
    >
      <div className="flex gap-2 items-center">
        <div>{message.from.name} - </div>
        <div>{message.subject}</div>
      </div>
      <div className="flex gap-4 items-center">
        { category === CATEGORY_TOUT && <Badge value={message.category}/>}
        <div>{formatDate(message.receivedAt, "medium")}</div>
        <div>action</div>
      </div>
    </Link>
  )
}