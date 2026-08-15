'use client'

import { useErrorContext } from "@/lib/context/use-error-context"

export default function ErrorPanel(){
  const error = useErrorContext((state) => state.error)
  const clear = useErrorContext((state) => state.clear)

  return !error ? <></>
    : (
      <div 
        className="fixed z-1 border rounded-sm border-red-500 bg-red-200 text-red-500 px-6 flex gap-2 items-center bottom-2.5 right-2.5"
      >
        An error occured
        <button onClick={() => clear()} type="button" className="cursor-pointer">x</button>
      </div>
    )
}