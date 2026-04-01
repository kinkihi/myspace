"use client"

import { Switch } from "@/components/ui/switch"
import { SparklesIcon, RefreshCwIcon } from "lucide-react"

const features = [
  {
    name: "AI Features",
    description:
      "Controls availability of AI features such as Post AI, AI Atmosphere Match, and AI Model Generation.",
    enabled: true,
    icon: SparklesIcon,
    iconBg: "bg-chart-3/20",
    iconColor: "text-chart-3",
  },
  {
    name: "Client Update",
    description:
      "When disabled, each member's D5 client remains on the current version and no longer receives update notifications.",
    enabled: true,
    icon: RefreshCwIcon,
    iconBg: "bg-secondary",
    iconColor: "text-muted-foreground",
  },
]

export function FeatureManagement() {
  return (
    <section className="flex flex-col gap-6 px-10 py-6 border-b border-border">
      <div className="flex flex-col gap-1 max-w-[570px]">
        <h3 className="text-base font-semibold">Feature Management</h3>
        <p className="text-sm text-muted-foreground">
          Manage team member access to client features.
        </p>
      </div>

      <div className="max-w-[570px]">
        <div className="flex items-center py-3 border-b border-border">
          <span className="flex-1 text-sm text-muted-foreground font-medium">
            Feature
          </span>
          <span className="w-20 text-sm text-muted-foreground font-medium text-right">
            Status
          </span>
        </div>

        {features.map((feature) => (
          <div
            key={feature.name}
            className="flex items-start gap-4 py-4 border-b border-border last:border-0"
          >
            <div
              className={`size-10 shrink-0 rounded-lg ${feature.iconBg} flex items-center justify-center`}
            >
              <feature.icon className={`size-5 ${feature.iconColor}`} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium">{feature.name}</p>
              <p className="text-xs text-muted-foreground leading-relaxed mt-1">
                {feature.description}
              </p>
            </div>
            <div className="w-20 flex justify-end pt-1">
              <Switch defaultChecked={feature.enabled} />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
