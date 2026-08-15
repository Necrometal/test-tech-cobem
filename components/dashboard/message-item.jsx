'use client'

import { CATEGORY_TOUT, VALID_CATEGORIES } from "@/constantes";
import { formatDate } from "@/lib/date";
import { useSearchParams } from "next/navigation";
import Badge from "../badge";

export default function MessageItem({ message, isPending, updateCategory }){
  const searchParams = useSearchParams();
  const category = searchParams.get("category") ?? CATEGORY_TOUT;

  const handleChange = (id, category) => {
    if(window) {
      const useConfirm = window.confirm("Voulez vous changer la category?")
      if(useConfirm) updateCategory({ id, category})
    }
  }

  return (
    <div
      className={`w-full flex gap-2 items-center h-8 mb-1 ${message.read === true && 'bg-gray-300'}`}
    >
      <div className="flex gap-2 items-center justify-between flex-1">
        <div className="flex gap-2 items-center">
          <div>{message.from.name} - </div>
          <div>{message.subject}</div>
        </div>
        <div className="flex gap-4 items-center">
          { category === CATEGORY_TOUT && <Badge value={message.category}/>}
          <div>{formatDate(message.receivedAt, "medium")}</div>
          
        </div>
      </div>
      <select
        value={message.category}
        onChange={(e) => handleChange(message.id, e.target.value)}
        disabled={isPending}
      >
        {VALID_CATEGORIES.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>
    </div>
  )
}