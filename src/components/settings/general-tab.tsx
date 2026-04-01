"use client"

import {
  MailIcon,
  SmartphoneIcon,
  LogOutIcon,
  ChevronRightIcon,
} from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useSettings } from "@/components/settings/settings-context"

function SectionDivider() {
  return <div className="border-b border-[#2a2a2a]" />
}

function ActionButton({ children }: { children: React.ReactNode }) {
  return (
    <button className="shrink-0 rounded border border-white/[0.06] px-3 h-8 text-[13px] text-white transition-colors hover:bg-white/[0.06]">
      {children}
    </button>
  )
}

function AccountSection() {
  return (
    <div className="flex flex-col gap-8 px-10 py-6">
      <div className="px-1">
        <span className="text-base font-semibold text-[#ebebeb]">账号</span>
      </div>

      <div className="flex items-center gap-4 w-[370px]">
        <Avatar className="size-10 rounded-full border-2 border-[#4a4dc4]">
          <AvatarFallback className="bg-[#544aff] text-white text-xl font-semibold rounded-full">
            O
          </AvatarFallback>
        </Avatar>
        <span className="flex-1 text-sm font-medium text-[#ebebeb]">
          OwnBalance
        </span>
        <ActionButton>编辑</ActionButton>
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-4 h-9 w-[370px]">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-white/10">
            <MailIcon className="size-5 text-white/70" />
          </div>
          <div className="flex flex-1 flex-col gap-1 text-sm">
            <span className="font-medium text-[#ebebeb]">邮箱</span>
            <span className="text-[#717171]">owenbalance@email.com</span>
          </div>
        </div>

        <div className="flex items-center gap-4 h-9 w-[370px]">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-white/10">
            <SmartphoneIcon className="size-5 text-white/70" />
          </div>
          <div className="flex flex-1 flex-col gap-1 text-sm">
            <span className="font-medium text-[#ebebeb]">手机号</span>
            <span className="text-[#717171]">未绑定</span>
          </div>
          <ActionButton>绑定</ActionButton>
        </div>

        <div className="flex items-center gap-4 h-9 w-[370px]">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#52bd20]">
            <WeChatIcon />
          </div>
          <div className="flex flex-1 flex-col gap-1 text-sm">
            <span className="font-medium text-[#ebebeb]">微信</span>
            <span className="text-[#717171]">未绑定</span>
          </div>
          <ActionButton>绑定</ActionButton>
        </div>
      </div>

      <div className="flex items-center gap-4 w-[370px]">
        <div className="flex flex-1 flex-col gap-1 text-sm">
          <span className="font-medium text-[#ebebeb]">密码</span>
          <span className="text-[#7b7b7b]">更改登录密码</span>
        </div>
        <ActionButton>更改</ActionButton>
      </div>
    </div>
  )
}

function DataManagementSection() {
  return (
    <div className="flex flex-col gap-6 px-10 py-6">
      <div className="flex flex-col gap-4">
        <span className="text-base font-semibold text-[#ebebeb]">
          数据管理
        </span>
      </div>

      <div className="w-[370px] rounded-lg border border-[#2a2a2a]">
        <div className="border-b border-[#2a2a2a] p-4">
          <div className="flex flex-col gap-2">
            <span className="text-base font-semibold text-[#ebebeb]">
              拷贝 Studio 预设到团队
            </span>
            <span className="text-sm text-[#b4b4b4]">
              从个人身份账户拷贝到团队身份账户
            </span>
          </div>
        </div>
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-2 text-sm font-medium">
            <span className="text-[#b4b4b4]">我的</span>
            <span className="text-[#ebebeb]">6</span>
            <span className="text-[#b4b4b4]">团队预设</span>
            <span className="text-[#ebebeb]">32</span>
          </div>
          <ActionButton>拷贝</ActionButton>
        </div>
      </div>
    </div>
  )
}

function SubscriptionSection() {
  return (
    <div className="flex flex-col gap-4 px-10 py-6">
      <span className="text-base font-semibold text-[#ebebeb]">订阅方案</span>

      <div className="w-[370px] rounded-lg border border-[#2a2a2a] bg-white/[0.03]">
        <div className="border-b border-[#2a2a2a] p-4">
          <div className="flex flex-col gap-2 mb-3">
            <span className="text-base font-medium text-[#eee]">
              D5 团队版
            </span>
            <span className="text-base font-medium text-[#eee]">按年购买</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-medium">
              <span className="text-[#b4b4b4]">下个账单日</span>
              <span className="text-[#ebebeb]">2026.01.01</span>
            </div>
            <ActionButton>联系销售</ActionButton>
          </div>
        </div>
        <div className="border-b border-[#2a2a2a] px-4 py-3">
          <div className="flex items-center gap-2 text-sm font-medium">
            <span className="text-[#b4b4b4]">团队席位数</span>
            <span className="text-[#ebebeb]">10</span>
          </div>
        </div>
        <div className="p-2">
          <button className="flex w-full items-center justify-between rounded px-2 h-8 text-[13px] text-white hover:bg-white/[0.06] transition-colors">
            <span>订阅详情</span>
            <ChevronRightIcon className="size-4 text-white/60" />
          </button>
        </div>
      </div>
    </div>
  )
}

function LogoutSection() {
  const { setActivePage } = useSettings()
  return (
    <div className="px-10 py-6">
      <button
        onClick={() => setActivePage("login")}
        className="flex items-center gap-1 rounded px-2 h-8 text-[13px] text-white hover:bg-white/[0.06] transition-colors"
      >
        <LogOutIcon className="size-4" />
        <span>登出</span>
      </button>
    </div>
  )
}

function WeChatIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.5 4C5.91 4 3 6.46 3 9.5c0 1.7.88 3.22 2.27 4.24L4.5 16l2.59-1.29c.78.25 1.6.38 2.41.38.34 0 .67-.02 1-.07A5.44 5.44 0 0 1 10 13c0-3.04 2.69-5.5 6-5.5.34 0 .67.03 1 .07C16.36 5.49 13.2 4 9.5 4Zm-2.38 3a.88.88 0 1 1 0 1.75.88.88 0 0 1 0-1.75Zm4.76 0a.88.88 0 1 1 0 1.75.88.88 0 0 1 0-1.75ZM16 9c-2.76 0-5 1.79-5 4s2.24 4 5 4c.63 0 1.23-.1 1.78-.28L20 18l-.56-1.68C20.44 15.36 21 14.24 21 13c0-2.21-2.24-4-5-4Zm-1.75 2.25a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5Zm3.5 0a.75.75 0 1 1 0 1.5.75.75 0 0 1 0-1.5Z"
        fill="white"
      />
    </svg>
  )
}

export function GeneralTab() {
  return (
    <div className="pb-10">
      <AccountSection />
      <SectionDivider />
      <DataManagementSection />
      <SectionDivider />
      <SubscriptionSection />
      <SectionDivider />
      <LogoutSection />
    </div>
  )
}
