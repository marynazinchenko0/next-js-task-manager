"use client"
import {Button} from "@/components/ui/button";
import {createClient} from "@/utils/supabase/client";
import {useRouter} from "next/navigation";
import {useState} from 'react'
import {useToast} from "@/components/ui/use-toast";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";

export default function LoginPage() {
  const supabase = createClient()
  const router = useRouter()
  const {toast} = useToast();

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function logIn() {
    const {error, data} = await supabase.auth.signInWithPassword({email, password})
    if (error) {
      toast({
        title: "Uh oh! Something went wrong.",
        description: error.message,
      })
    }

    if (data.user) {
      router.push('/tasks')
    }
  }

  async function signUp() {
    const {error, data} = await supabase.auth.signUp({email, password})

    if (error) {
      toast({
        title: "Uh oh! Something went wrong.",
        description: error.message,
      })
    }

    if (data.user) {
      toast({
        title: "Signed up successfully.",
        description: `You can now log in with ${data.user.email}.`,
      })
      setEmail(data.user.email as string)
    }
  }

  return (
    <Card className="w-full max-w-sm mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <form className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                   placeholder="m@example.com" required/>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password"
                   type="password"
                   value={password}
                   onChange={(e) => setPassword(e.target.value)} required/>
          </div>
          <Button type="button" onClick={logIn}>
            Log in
          </Button>
          <Button variant="secondary" type="button" onClick={signUp} disabled>
            TODO Sign up
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
