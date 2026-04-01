import { AppSidebar } from "@/components/app-sidebar"
import { NotificationPanel } from "@/components/notification-panel"
import { SettingsInsetShell } from "@/components/settings/settings-inset-shell"
import { SettingsProvider } from "@/components/settings/settings-context"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SettingsProvider>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <SettingsInsetShell>{children}</SettingsInsetShell>
        </SidebarInset>
        <NotificationPanel />
      </SidebarProvider>
    </SettingsProvider>
  )
}
