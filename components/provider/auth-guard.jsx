'use client'

import { getToken } from "@/app/lib/api-client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AuthGuard({ children, mode }) {
  const router = useRouter();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const hasToken = Boolean(getToken())
    console.log(hasToken)
    if (mode === "protected" && !hasToken) {
      router.replace("/login");
      return;
    }

    if (mode === "guest" && hasToken) {
      router.replace("/dashboard");
      return;
    }
    
    setChecked(true);
  }, [router, mode]);

  if (!checked) return null;
  return children;
}