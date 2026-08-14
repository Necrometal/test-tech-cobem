'use client'

import MessageContainer from "@/components/dashboard/message-container"
import PageLoader from "@/components/layout/page-loader"
import { useMail } from "@/hooks/use-mail"
import { useEffect } from "react"
import { useErrorContext } from "../lib/context/use-error-context"

export default function Dashboard(){
  const { isFetching, data, error } = useMail()
  const setError = useErrorContext((state) => state.setError)

  useEffect(() => {
    if(error){
      setError(error)
    }
  }, [setError, error])

  return(
    <div className="w-full h-full">
      {
        isFetching 
          ? <PageLoader /> 
          : (
            <MessageContainer messages={data?.messages}/>
          )
      }
    </div>
  )
}