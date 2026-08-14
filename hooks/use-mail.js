import { apiFetch } from "@/app/lib/api-client";
import { useQuery } from "@tanstack/react-query";

export function useStat(){
  const query = useQuery({ 
    queryKey: ['get-stats'], 
    queryFn: () => apiFetch("/api/messages/stats")
  })

  return query
}