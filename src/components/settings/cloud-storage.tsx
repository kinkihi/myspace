"use client"

import { Button } from "@/components/ui/button"

const storageItems = [
  { name: "Studio", size: "4.21GB", desc: "全部团队原型及数据", color: "bg-brand" },
  { name: "Showreel", size: "18.6GB", desc: "全部 Showreel 项目及附件数据", color: "bg-chart-2" },
  { name: "AI", size: "4.7GB", desc: "全部 AI 生成内容及附件数据，高清照片D5渲染器中来源及备份管理", color: "bg-chart-3" },
]

export function CloudStorage() {
  const totalGB = 100
  const usedGB = 27.51
  const studioPercent = 33
  const showreelPercent = 55
  const aiPercent = 12

  return (
    <section className="flex flex-col gap-6 px-10 py-6 border-b border-border">
      <div className="flex flex-col gap-4 max-w-[570px]">
        <div className="flex flex-col gap-2">
          <h3 className="text-base font-semibold">团队云空间</h3>
          <p className="text-sm text-muted-foreground leading-5">
            团队拥有100GB云空间，容量计算范围包括所有成员的个人空间和团队空间。
            <br />
            管理员可查看并管理团队存储数据，也可联系我们的销售获得更多云储存空间。
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <span className="text-base font-semibold text-muted-foreground">
              已使用
            </span>
            <span className="text-xl font-semibold">{usedGB}GB</span>
            <span className="text-base font-semibold text-muted-foreground">
              / {totalGB}GB
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="size-2.5 rounded-full bg-brand" />
              <span className="text-sm font-semibold text-muted-foreground">
                Studio
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="size-2.5 rounded-full bg-chart-2" />
              <span className="text-sm font-semibold text-muted-foreground">
                Showreel
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="size-2.5 rounded-full bg-chart-3" />
              <span className="text-sm font-semibold text-muted-foreground">
                AI
              </span>
            </div>
          </div>

          <div className="flex h-2 w-full rounded-full overflow-hidden bg-secondary">
            <div
              className="bg-brand h-full"
              style={{ width: `${studioPercent}%` }}
            />
            <div
              className="bg-chart-2 h-full"
              style={{ width: `${showreelPercent}%` }}
            />
            <div
              className="bg-chart-3 h-full"
              style={{ width: `${aiPercent}%` }}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col max-w-[570px]">
        {storageItems.map((item) => (
          <div
            key={item.name}
            className="flex items-center justify-between py-5 border-b border-border last:border-0"
          >
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">
                  {item.name}
                </span>
                <span className="text-sm font-semibold">{item.size}</span>
              </div>
              <p className="text-xs text-muted-foreground">{item.desc}</p>
            </div>
            <Button variant="outline" size="sm">
              管理
            </Button>
          </div>
        ))}
      </div>
    </section>
  )
}
