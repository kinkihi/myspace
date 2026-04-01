"use client"

import * as React from "react"
import {
  ClockIcon,
  BoxIcon,
  UsersIcon,
  UserIcon,
  BarChart3Icon,
  SettingsIcon,
  HelpCircleIcon,
  BellIcon,
  BookOpenIcon,
  CameraIcon,
  PlayIcon,
  Link2Icon,
  GlobeIcon,
  LifeBuoyIcon,
  HeadphonesIcon,
  MessagesSquareIcon,
} from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import {
  useSettings,
  type AppPage,
} from "@/components/settings/settings-context"

const navShowreel = [
  { title: "最近使用", url: "#", icon: ClockIcon },
  { title: "团队项目", url: "#", icon: BoxIcon },
]

const navOrganization: (
  | {
      title: string
      url: string
      icon: React.ComponentType<{ className?: string }>
      page?: never
    }
  | {
      title: string
      page: "teamData"
      icon: React.ComponentType<{ className?: string }>
      url?: never
    }
)[] = [
  { title: "成员管理", url: "/members", icon: UsersIcon },
  { title: "分组管理", url: "/groups", icon: UserIcon },
  { title: "团队数据", page: "teamData", icon: BarChart3Icon },
]

const navActivity: {
  title: string
  icon: typeof BookOpenIcon
  page: AppPage
}[] = [{ title: "D5 认证", icon: BookOpenIcon, page: "certification" }]

const navBottom: {
  title: string
  icon: typeof SettingsIcon
  page: AppPage
}[] = [{ title: "设置", icon: SettingsIcon, page: "settings" }]

const helpSocialLinks = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/d5render/",
    icon: CameraIcon,
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@D5Render",
    icon: PlayIcon,
  },
  {
    label: "Linkedin",
    href: "https://www.linkedin.com/company/d5render",
    icon: Link2Icon,
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/D5Render",
    icon: GlobeIcon,
  },
] as const

const helpSupportLinks = [
  {
    label: "Help Center",
    href: "https://www.d5render.com/support",
    icon: LifeBuoyIcon,
  },
  {
    label: "Contact Support",
    href: "https://www.d5render.com/contact",
    icon: HeadphonesIcon,
  },
  {
    label: "Forum",
    href: "https://forum.d5render.com",
    icon: MessagesSquareIcon,
  },
] as const

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const {
    setActiveTab,
    toggleNotification,
    notificationOpen,
    activePage,
    setActivePage,
  } = useSettings()

  const goToGeneralSettings = React.useCallback(() => {
    setActivePage("settings")
    setActiveTab("general")
  }, [setActivePage, setActiveTab])

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center gap-0 group-data-[collapsible=icon]:justify-center">
            <SidebarMenuButton
              size="lg"
              tooltip="Team Name"
              className="min-w-0 flex-1 group-data-[collapsible=icon]:hidden"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-full border-2 border-brand">
                <span className="text-brand-foreground text-xs font-semibold">
                  T
                </span>
              </div>
              <div className="grid min-w-0 flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">Team Name</span>
              </div>
            </SidebarMenuButton>
            <SidebarTrigger className="size-8 shrink-0" />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Showreel</SidebarGroupLabel>
          <SidebarMenu>
            {navShowreel.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  tooltip={item.title}
                  render={<a href={item.url} />}
                >
                  <item.icon className="size-4" />
                  <span>{item.title}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>组织管理</SidebarGroupLabel>
          <SidebarMenu>
            {navOrganization.map((item) => (
              <SidebarMenuItem key={item.title}>
                {"page" in item ? (
                  <SidebarMenuButton
                    tooltip={item.title}
                    isActive={activePage === item.page}
                    onClick={() => setActivePage(item.page as AppPage)}
                  >
                    <item.icon className="size-4" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                ) : (
                  <SidebarMenuButton
                    tooltip={item.title}
                    render={<a href={item.url} />}
                  >
                    <item.icon className="size-4" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                )}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>活动</SidebarGroupLabel>
          <SidebarMenu>
            {navActivity.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  tooltip={item.title}
                  isActive={activePage === item.page}
                  onClick={() => setActivePage(item.page)}
                >
                  <item.icon className="size-4" />
                  <span>{item.title}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarSeparator />
        <SidebarMenu>
          {navBottom.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                tooltip={item.title}
                isActive={activePage === item.page}
                onClick={() => setActivePage(item.page)}
              >
                <item.icon className="size-4" />
                <span>{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
          <DropdownMenu>
            <SidebarMenuItem>
              <DropdownMenuTrigger
                render={
                  <SidebarMenuButton tooltip="帮助">
                    <HelpCircleIcon className="size-4" />
                    <span>帮助</span>
                  </SidebarMenuButton>
                }
              />
            </SidebarMenuItem>
            <DropdownMenuContent
              side="top"
              align="start"
              sideOffset={8}
              className="w-56 rounded border border-white/[0.06] bg-[#191919] p-1 text-white shadow-[0px_24px_54px_rgba(0,0,0,0.22),0px_5px_14px_rgba(0,0,0,0.18)] ring-0"
            >
              {helpSocialLinks.map((link) => (
                <DropdownMenuItem
                  key={link.label}
                  className="h-8 cursor-pointer gap-2 rounded px-2 py-1 text-xs text-white/60 focus:bg-white/[0.06] focus:text-white/80"
                  nativeButton={false}
                  render={
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    />
                  }
                >
                  <link.icon className="size-4 shrink-0 opacity-80" />
                  {link.label}
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator className="my-1 bg-white/[0.06]" />
              {helpSupportLinks.map((link) => (
                <DropdownMenuItem
                  key={link.label}
                  className="h-8 cursor-pointer gap-2 rounded px-2 py-1 text-xs text-white focus:bg-white/[0.06] focus:text-white"
                  nativeButton={false}
                  render={
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    />
                  }
                >
                  <link.icon className="size-4 shrink-0" />
                  {link.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenu>
        <SidebarSeparator />
        <div className="flex items-center justify-between px-2 pb-1 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0">
          <button
            type="button"
            onClick={goToGeneralSettings}
            className="flex flex-1 items-center gap-2 rounded-md p-2 hover:bg-sidebar-accent transition-colors group-data-[collapsible=icon]:flex-none group-data-[collapsible=icon]:justify-center"
          >
            <Avatar className="size-6 shrink-0 rounded-full border border-white/10">
              <AvatarFallback className="bg-[#544aff] text-white text-xs font-semibold rounded-full">
                O
              </AvatarFallback>
            </Avatar>
            <span className="truncate text-xs text-white/80 group-data-[collapsible=icon]:hidden">
              OwenBalance
            </span>
          </button>
          <button
            type="button"
            onClick={toggleNotification}
            className={`flex shrink-0 items-center justify-center rounded-md p-2.5 transition-colors group-data-[collapsible=icon]:hidden ${
              notificationOpen
                ? "bg-white/[0.03]"
                : "hover:bg-sidebar-accent"
            }`}
          >
            <BellIcon className="size-4 text-muted-foreground" />
          </button>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
