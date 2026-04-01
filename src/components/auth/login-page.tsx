"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { KeyRoundIcon } from "lucide-react"
import { useSettings } from "@/components/settings/settings-context"

function GoogleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
      <path
        d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
        fill="currentColor"
      />
    </svg>
  )
}

export function LoginPage({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { setActivePage } = useSettings()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setActivePage("settings")
  }

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center bg-[#0c0c0c] p-6 md:p-10",
        className
      )}
      {...props}
    >
      <div className="w-full max-w-md">
        <Card className="overflow-hidden border-white/[0.06] bg-[#111] shadow-xl">
          <CardContent className="p-8 md:p-10">
            <form onSubmit={handleLogin}>
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-2xl font-bold text-white">
                    Welcome back
                  </h1>
                  <p className="mt-1 text-sm text-white/50">
                    Login to your D5 Render account
                  </p>
                </div>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label
                      htmlFor="email"
                      className="text-sm text-white/70"
                    >
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                      className="border-white/[0.08] bg-white/[0.04] text-white placeholder:text-white/25 focus-visible:border-white/20 focus-visible:ring-white/10"
                    />
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label
                        htmlFor="password"
                        className="text-sm text-white/70"
                      >
                        Password
                      </Label>
                      <a
                        href="#"
                        className="ml-auto text-xs text-white/40 underline-offset-4 hover:text-white/60 hover:underline"
                      >
                        Forgot your password?
                      </a>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      className="border-white/[0.08] bg-white/[0.04] text-white placeholder:text-white/25 focus-visible:border-white/20 focus-visible:ring-white/10"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-[#7549ff] text-white hover:bg-[#6539e6]"
                  >
                    Login
                  </Button>
                </div>
                <div className="relative text-center text-xs text-white/30 after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-white/[0.06]">
                  <span className="relative z-10 bg-[#111] px-2">
                    Or continue with
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    className="border-white/[0.08] bg-transparent text-white hover:bg-white/[0.06]"
                  >
                    <KeyRoundIcon className="size-4" />
                    <span>SSO</span>
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="border-white/[0.08] bg-transparent text-white hover:bg-white/[0.06]"
                  >
                    <GoogleIcon className="size-4" />
                    <span>Google</span>
                  </Button>
                </div>
                <div className="text-center text-xs text-white/30">
                  Don&apos;t have an account?{" "}
                  <a
                    href="https://myspace.d5render.com/login"
                    className="text-white/50 underline underline-offset-4 hover:text-white/70"
                  >
                    Sign up
                  </a>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
        <div className="mt-4 text-center text-[10px] text-white/20">
          By clicking continue, you agree to our{" "}
          <a href="#" className="underline underline-offset-4 hover:text-white/40">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="underline underline-offset-4 hover:text-white/40">
            Privacy Policy
          </a>
          .
        </div>
      </div>
    </div>
  )
}
