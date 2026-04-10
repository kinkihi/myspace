"use client"

import * as React from "react"

type SettingsTab = "general" | "workspace"

export type AppPage = "settings" | "certification" | "teamData" | "login" | "recentProjects" | "teamProjects"

type SettingsContextProps = {
  activeTab: SettingsTab
  setActiveTab: (tab: SettingsTab) => void
  activePage: AppPage
  setActivePage: (page: AppPage) => void
  notificationOpen: boolean
  setNotificationOpen: (open: boolean) => void
  toggleNotification: () => void
}

const SettingsContext = React.createContext<SettingsContextProps | null>(null)

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [activeTab, setActiveTab] = React.useState<SettingsTab>("workspace")
  const [activePage, setActivePage] = React.useState<AppPage>("recentProjects")
  const [notificationOpen, setNotificationOpen] = React.useState(false)

  const toggleNotification = React.useCallback(() => {
    setNotificationOpen((prev) => !prev)
  }, [])

  const value = React.useMemo(
    () => ({
      activeTab,
      setActiveTab,
      activePage,
      setActivePage,
      notificationOpen,
      setNotificationOpen,
      toggleNotification,
    }),
    [activeTab, activePage, notificationOpen, toggleNotification]
  )

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  )
}

export function useSettings() {
  const context = React.useContext(SettingsContext)
  if (!context) {
    throw new Error("useSettings must be used within a SettingsProvider.")
  }
  return context
}
