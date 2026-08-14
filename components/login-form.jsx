'use client'
import { apiFetch, setToken } from "@/app/lib/api-client";
import { LoginForm as LoginValidation } from "@/app/lib/validation";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { z } from "zod";
import Button from "./button";
import InputLabel from "./input-label";

export default function LoginForm(){
  const router = useRouter()
  const [error, setError] = useState()

  const {mutate,isPending } = useMutation({
    mutationFn: (credentials) =>
      apiFetch("/api/auth/login", { method: "POST", body: JSON.stringify(credentials) }),
    onSuccess: (res) => {
      setToken(res.token);
      router.push("/dashboard");
    },
    onError: (e) => {
      console.log('error mutation', e)
    }
  });

  async function handleSubmit(e){
    e.preventDefault();

    const form = new FormData(e.target);
    const body = {
      email: form.get('email'),
      password: form.get('password')
    }

    const { data, error } = LoginValidation.safeParse(body);
    if(error){
      setError(z.flattenError(error).fieldErrors)

      return
    } else setError(undefined)

    mutate(data)
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <InputLabel type="email" label="Email:" inputId="email" name="email" errorMsg={error?.email?.join(', ')}/>
      <InputLabel type="password" label="Password:" inputId="password" name="password" errorMsg={error?.password?.join(', ')}/>
      <Button label={`${isPending ? 'loading...' : 'Se connecter'}`} type="submit"/>
    </form>
  )
}