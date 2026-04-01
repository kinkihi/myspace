"use client"

import { Button } from "@/components/ui/button"
import {
  CloudIcon,
  HardDriveIcon,
  ShareIcon,
  LinkIcon,
  PenToolIcon,
} from "lucide-react"

const integrations = [
  {
    name: "OneDrive",
    desc: "未链接",
    status: "disconnected" as const,
    icon: CloudIcon,
  },
  {
    name: "Dropbox",
    desc: "未链接",
    status: "disconnected" as const,
    icon: HardDriveIcon,
  },
  {
    name: "Baidu",
    desc: "已链接",
    status: "connected" as const,
    icon: ShareIcon,
  },
  {
    name: "Sharepoint",
    desc: "已链接",
    status: "connected" as const,
    icon: LinkIcon,
  },
  {
    name: "Autodesk",
    desc: "已链接",
    status: "connected" as const,
    icon: PenToolIcon,
  },
]

export function Integrations() {
  return (
    <section className="flex flex-col gap-6 px-10 py-6 border-b border-border">
      <div className="flex flex-col gap-1 max-w-[570px]">
        <h3 className="text-base font-semibold">链接</h3>
        <div className="flex items-center gap-1 flex-wrap">
          <p className="text-sm text-muted-foreground">
            第三方网盘应用，可在 D5 渲染器中使用网盘资产
          </p>
          <Button variant="link" size="sm" className="text-brand h-auto p-0 text-sm">
            了解更多
          </Button>
        </div>
      </div>

      <div className="max-w-[570px]">
        <div className="flex items-center py-3 border-b border-border">
          <span className="flex-1 text-sm text-muted-foreground font-medium">
            链接
          </span>
          <span className="w-20 text-sm text-muted-foreground font-medium text-right">
            Option
          </span>
        </div>

        {integrations.map((item) => (
          <div
            key={item.name}
            className="flex items-center gap-4 py-4 border-b border-border last:border-0"
          >
            <div className="size-10 shrink-0 rounded-lg bg-secondary flex items-center justify-center">
              <item.icon className="size-5 text-muted-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium">{item.name}</p>
              <p className="text-xs text-muted-foreground">{item.desc}</p>
            </div>
            <Button variant="outline" size="sm">
              {item.status === "connected" ? "查看" : "管理"}
            </Button>
          </div>
        ))}
      </div>
    </section>
  )
}
