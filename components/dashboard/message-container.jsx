'use client'

import { CATEGORY_TOUT } from "@/app/constantes";
import { useSearchParams } from "next/navigation";
import NoItem from "../layout/no-item";
import MessageItem from "./message-item";

export default function MessageContainer({ messages }){
  const searchParams = useSearchParams();
  const category = searchParams.get("category") ?? CATEGORY_TOUT;
  return (
    <div className="h-full w-full flex flex-col pt-1 gap-2">
      <div className="px-2 py-2 border-b border-black">Categorie: {category}</div>
      <div className="flex-1 w-full overflow-y-scroll px-4 py-6">
        {
          !messages || messages.length === 0
            ? <NoItem />
            : (
              messages.map((m) => <MessageItem key={`message-${m.id}`} message={m}/>)
            )
        }
      </div>
    </div>
  )
}