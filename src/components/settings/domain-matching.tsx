"use client"

import { Switch } from "@/components/ui/switch"

export function DomainMatching() {
  return (
    <section className="flex items-start justify-between px-10 py-6">
      <div className="flex flex-col gap-1 max-w-[470px]">
        <h3 className="text-base font-semibold">域名匹配</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          用户邮箱域名与团队所有者邮箱域名一致时，系统将自动向其发送通知并允许其申请加入团队
        </p>
      </div>
      <Switch />
    </section>
  )
}
