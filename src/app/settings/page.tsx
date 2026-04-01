"use client"

import { CertificationPage } from "@/components/certification/certification-page"
import { TeamDataPage } from "@/components/team-data/team-data-page"
import { LoginPage } from "@/components/auth/login-page"
import { TeamProfile } from "@/components/settings/team-profile"
import { CloudStorage } from "@/components/settings/cloud-storage"
import { FeatureManagement } from "@/components/settings/feature-management"
import { Integrations } from "@/components/settings/integrations"
import { CesiumSection } from "@/components/settings/cesium-section"
import { WatermarkSection } from "@/components/settings/watermark-section"
import { SSOSection } from "@/components/settings/sso-section"
import { DomainMatching } from "@/components/settings/domain-matching"
import { SettingsTabs } from "@/components/settings/settings-tabs"
import { GeneralTab } from "@/components/settings/general-tab"
import { useSettings } from "@/components/settings/settings-context"

export default function SettingsPage() {
  const { activeTab, activePage } = useSettings()

  if (activePage === "certification") {
    return <CertificationPage />
  }

  if (activePage === "teamData") {
    return <TeamDataPage />
  }

  if (activePage === "login") {
    return <LoginPage />
  }

  return (
    <>
      <div className="px-10 py-4">
        <h1 className="text-xl font-semibold tracking-tight">设置</h1>
      </div>

      <div className="px-8 py-4 sticky top-0 z-10 bg-background/80 backdrop-blur-sm">
        <SettingsTabs />
      </div>

      {activeTab === "general" ? (
        <GeneralTab />
      ) : (
        <div className="pb-10">
          <TeamProfile />
          <CloudStorage />
          <FeatureManagement />
          <Integrations />
          <CesiumSection />
          <WatermarkSection />
          <SSOSection />
          <DomainMatching />
        </div>
      )}
    </>
  )
}
