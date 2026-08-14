import { apiFetch } from "@/app/lib/api-client";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

export function useStat(){
  const query = useQuery({ 
    queryKey: ['get-stats'], 
    queryFn: () => apiFetch("/api/messages/stats")
  })

  return query
}

export function useMail(){
  const searchParams = useSearchParams();
  const category = searchParams.get("category") ?? "";

  const query = useQuery({ 
    // the key need to change depending on category to avoid fech conflict
    queryKey: [`get-mail-${category}`],
    queryFn: () => apiFetch(`/api/messages?category=${category}`)
  })

  return query
}