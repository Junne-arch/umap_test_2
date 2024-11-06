"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Mail } from "lucide-react"
import Image from "next/image"
import UMAPLogo from '@/components/UMAPLogo'
import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { toast } from "sonner"
import Link from "next/link"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams?.get("callbackUrl") || "/app/dashboard"

  const handleEmailSignIn = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simple test credentials check
    if (email === 'test@test.de' && password === '1234') {
      // Simulate successful login
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('user', JSON.stringify({
          id: '1',
          name: 'Test User',
          email: 'test@test.de',
          image: 'https://avatars.githubusercontent.com/u/1234567'
        }))
      }
      router.push(callbackUrl)
      return
    }

    toast.error("Invalid email or password")
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 flex flex-col items-center">
          <Link href="/" className="mb-4">
            <UMAPLogo className="h-12" />
          </Link>
          <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
          <CardDescription>
            Use test credentials: test@test.de / 1234
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleEmailSignIn} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="test@test.de"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              <Mail className="mr-2 h-4 w-4" />
              Sign in with Email
            </Button>
          </form>
          
          <div className="text-center text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary transition-colors">
              Back to Home
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}