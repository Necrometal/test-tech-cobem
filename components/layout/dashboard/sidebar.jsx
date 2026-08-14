'use client'

import { CATEGORY_TOUT, VALID_CATEGORIES } from "@/app/constantes";
import { useErrorContext } from "@/app/lib/context/use-error-context";
import Badge from "@/components/badge";
import { useStat } from "@/hooks/use-mail";
import Link from "next/link";
import { useEffect } from "react";

export default function Sidebar({category}){
  const { isFetching, data, error } = useStat()
  const setError = useErrorContext((state) => state.setError)

  useEffect(() => {
    if (error) setError(error)
  }, [error, setError])

  return (
    <div className="py-2 border-r border-black">
      <div className="border-b border-black px-2 pb-2">
        <span className="text-xl">
          Dashboard 
          {
            isFetching && (<span className="ml-2">loading...</span>)
          }
        </span>
      </div>

      <div className="flex flex-col gap-4 w-50 px-4 pt-4">
        <Link href={`/dashboard`} className="flex justify-between items-center gap-2">
          { CATEGORY_TOUT }
          {
            data?.total && <Badge className="ml-2" value={data.total}/>
          }
        </Link>
        {
          VALID_CATEGORIES.map((c) => (
            <Link key={`c-${c}`} href={`/dashboard?category=${c}`} className="flex justify-between items-center gap-2">
              {c}
              {
                data?.byCategory?.[c] && data?.byCategory?.[c] > 0 && <Badge className="ml-2" value={data?.byCategory?.[c]}/>
              }
            </Link>
          ))
        }
      </div>
    </div>
  )
}