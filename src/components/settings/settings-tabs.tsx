"use client"

import { useSettings } from "@/components/settings/settings-context"

const tabs = [
  { id: "general" as const, label: "通用" },
  { id: "workspace" as const, label: "工作空间" },
]

export function SettingsTabs() {
  const { activeTab, setActiveTab } = useSettings()

  return (
    <div className="flex items-center gap-2">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`px-3 py-1.5 rounded text-base font-semibold transition-colors ${
            activeTab === tab.id
              ? "bg-white/10 text-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}
