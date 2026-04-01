"use client"

import { SidebarTrigger } from "@/components/ui/sidebar"

/** 保留与侧边栏收起按钮对齐的顶部间距；主区不显示该按钮（按钮在侧边栏 Header）。 */
export function SettingsInsetShell({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <header className="flex h-12 shrink-0 items-center justify-end px-2">
        <SidebarTrigger
          className="invisible pointer-events-none"
          aria-hidden
          tabIndex={-1}
        />
      </header>
      {children}
    </>
  )
}
