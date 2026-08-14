import { format } from "@formkit/tempo";

export function formatDate(date){
  return format(date, "short", "fr")
}