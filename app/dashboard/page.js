'use client'

import MessageContainer from "@/components/dashboard/message-container"
import PageLoader from "@/components/layout/page-loader"
import { useMail } from "@/hooks/use-mail"

export default function Dashboard(){
  const { isFetching, data, error } = useMail()

  if(error){
    setError(error)
  }

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