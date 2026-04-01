"use client"

import { Button } from "@/components/ui/button"

export function SSOSection() {
  return (
    <section className="flex items-center justify-between px-10 py-6 border-b border-border">
      <div className="flex flex-col gap-1 max-w-[500px]">
        <h3 className="text-base font-semibold">SSO & Provisioning</h3>
        <p className="text-sm text-muted-foreground">
          配置团队使用SSO单点登录D5
        </p>
      </div>
      <Button variant="outline" size="sm">
        配置
      </Button>
    </section>
  )
}
