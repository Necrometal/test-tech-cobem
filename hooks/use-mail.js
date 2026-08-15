import { apiFetch } from "@/lib/api-client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
    queryKey: ["get-mail", category],
    queryFn: () => apiFetch(`/api/messages?category=${category}`)
  })

  return query
}

export function useUpdateCategory(){
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, category }) =>
      apiFetch(`/api/messages/${id}/category`, {
        method: "PATCH",
        body: JSON.stringify({ category }),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-mail"] });
      queryClient.invalidateQueries({ queryKey: ["get-stats"] });
    },
  });
}
