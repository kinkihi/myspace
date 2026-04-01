"use client"

import * as React from "react"
import { XIcon, BellIcon } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useSettings } from "@/components/settings/settings-context"

type NotificationTab = "all" | "unread" | "read"

type NotificationItem = {
  id: string
  type: "user" | "system"
  title: string
  description: string
  date: string
  avatarText?: string
  unread?: boolean
}

const mockNotifications: NotificationItem[] = [
  {
    id: "1",
    type: "user",
    title: "Username",
    description: "评论了 项目名称",
    date: "2025.01.24",
    avatarText: "S",
    unread: true,
  },
  {
    id: "2",
    type: "system",
    title: "您的专业版权益将于3天后到期",
    description: "点此继续订阅。",
    date: "2025.01.24",
  },
  {
    id: "3",
    type: "system",
    title: "因支付账户的可用余额不足，您的账号已变更为社区版",
    description: "点此重新订阅。",
    date: "2025.01.24",
  },
  {
    id: "4",
    type: "system",
    title: "已升级至D5学生版",
    description:
      "账号已升级至D5学生版，权益有效期至2025.09.06。请注意学生版只能在一台设备上使用且不可换绑。",
    date: "2025.01.24",
  },
  {
    id: "5",
    type: "system",
    title: "您的D5学生版申请未通过，原因：{{原因原因原因原因原因原因原因}}。",
    description: "点此查看申请指南了解问题解决方法。",
    date: "2025.01.24",
  },
  {
    id: "6",
    type: "user",
    title: "Username",
    description: "描述一",
    date: "2025.01.24",
    avatarText: "S",
  },
  {
    id: "7",
    type: "system",
    title: "标题",
    description: "描述一",
    date: "2025.01.24",
  },
  {
    id: "8",
    type: "user",
    title: "Username",
    description: "描述一",
    date: "2025.01.24",
    avatarText: "S",
  },
  {
    id: "9",
    type: "user",
    title: "Username",
    description: "描述一",
    date: "2025.01.24",
    avatarText: "S",
  },
]

function NotificationItemRow({ item }: { item: NotificationItem }) {
  return (
    <div className="relative flex items-start gap-4 border-b border-[#2a2a2a] p-4">
      {item.type === "user" && item.avatarText ? (
        <div className="shrink-0 p-1">
          <Avatar className="size-8 rounded-full border-2 border-[#4a4dc4]">
            <AvatarFallback className="bg-[#544aff] text-white text-sm font-semibold rounded-full">
              {item.avatarText}
            </AvatarFallback>
          </Avatar>
        </div>
      ) : (
        <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-white/[0.06]">
          <BellIcon className="size-5 text-white/60" />
        </div>
      )}
      <div className="flex flex-1 flex-col">
        <div className="flex items-start gap-2">
          <span className="flex-1 text-sm font-medium text-[#eee] leading-5">
            {item.title}
          </span>
          <span className="shrink-0 text-xs text-[#717171] w-[63px] text-right leading-5">
            {item.date}
          </span>
        </div>
        <div className="py-2">
          <span className="text-sm text-[#b4b4b4] leading-5">
            {item.description}
          </span>
        </div>
      </div>
      {item.unread && (
        <div className="absolute right-2 top-2 size-2 rounded-full bg-red-500" />
      )}
    </div>
  )
}

export function NotificationPanel() {
  const { notificationOpen, setNotificationOpen } = useSettings()
  const [activeTab, setActiveTab] = React.useState<NotificationTab>("all")

  if (!notificationOpen) return null

  const tabs: { id: NotificationTab; label: string }[] = [
    { id: "all", label: "全部" },
    { id: "unread", label: "未读" },
    { id: "read", label: "已读" },
  ]

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 hidden md:block"
        onClick={() => setNotificationOpen(false)}
      />
      {/* Panel */}
      <div className="fixed inset-y-0 left-[var(--sidebar-width)] z-50 hidden md:flex w-[448px] flex-col border-r border-[#2a2a2a] bg-[#191919] overflow-hidden shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#2a2a2a] px-4 py-4">
          <span className="text-base font-medium text-[#eee]">消息</span>
          <button
            onClick={() => setNotificationOpen(false)}
            className="flex size-6 items-center justify-center rounded hover:bg-white/[0.06] transition-colors"
          >
            <XIcon className="size-4 text-white/60" />
          </button>
        </div>

        {/* Tab bar */}
        <div className="flex items-center justify-between border-b border-[#2a2a2a] px-4">
          <div className="flex flex-1 items-center gap-1 py-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`rounded px-2 py-1 text-[13px] font-semibold transition-colors ${
                  activeTab === tab.id
                    ? "bg-white/[0.06] text-white"
                    : "text-white hover:text-white/80"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <button className="shrink-0 rounded border border-white/[0.06] px-2 py-1 text-xs text-white transition-colors hover:bg-white/[0.06]">
            全部已读
          </button>
        </div>

        {/* Notification list */}
        <div className="flex-1 overflow-y-auto opacity-90">
          {mockNotifications.map((item) => (
            <NotificationItemRow key={item.id} item={item} />
          ))}
        </div>
      </div>
    </>
  )
}
