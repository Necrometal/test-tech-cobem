'use client'

import { useErrorContext } from "@/app/lib/context/use-error-context";
import { VALID_CATEGORIES } from "@/app/lib/store";
import Badge from "@/components/badge";
import { useStat } from "@/hooks/use-mail";
import Link from "next/link";

export default function Sidebar({category}){
  const { isFetching, data, error } = useStat()
  const setError = useErrorContext((state) => state.setError)

  if(error){
    setError(error)
  }

  return (
    <div className="py-2 border-r border-black">
      <div className="border-b border-black px-2 pb-2">
        <span className="text-xl">Dashboard</span>
      </div>
      <div className="flex flex-col gap-4 w-50 px-4 pt-4">
        <Link href={`/dashboard`} className="flex justify-between items-center gap-2">
          tout
          {
            data?.total && <Badge className="ml-2" value={data.total}/>
          }
        </Link>
        {
          VALID_CATEGORIES.map((c) => (
            <Link key={`c-${c}`} href={`/dashboard?category=${c}`} className="flex justify-between items-center gap-2">
              {c}
              {
                data?.byCategory?.[c] && <Badge className="ml-2" value={data?.byCategory?.[c]}/>
              }
            </Link>
          ))
        }
      </div>
    </div>
  )
}