"use client"

import { Button } from "@/components/ui/button"

export function CesiumSection() {
  return (
    <section className="flex flex-col gap-6 px-10 py-6 border-b border-border">
      <div className="flex flex-col gap-1 max-w-[570px]">
        <h3 className="text-base font-semibold">Cesium</h3>
        <div className="flex items-center gap-1 flex-wrap">
          <p className="text-sm text-muted-foreground">
            3D地图数据平台，添加 Access Token 后，团队可以在D5渲染器中使用。
          </p>
          <Button variant="link" size="sm" className="text-brand h-auto p-0">
            了解更多
          </Button>
        </div>
      </div>

      <div className="max-w-[570px]">
        <div className="flex items-center py-3 border-b border-border">
          <span className="flex-1 text-sm text-muted-foreground font-medium">
            Token Key (1/1)
          </span>
          <span className="w-28 text-sm text-muted-foreground font-medium text-center">
            Access Level
          </span>
          <span className="w-20 text-sm text-muted-foreground font-medium text-right">
            Option
          </span>
        </div>

        <div className="flex items-center gap-4 py-4">
          <div className="flex-1 min-w-0">
            <p className="text-xs text-muted-foreground font-mono break-all leading-relaxed">
              ey2hbGciUiJIUzI1NlIsInR5cCI6lkpXVCJ9.ey.IqaGxkZi3 NjIzZGVlYWdkM3ILTRhNjMTY1NjEGC4NjUzLCJNTh2 W5NHdGLCJlb2MlOl9fYWlpX0QF3kf7DNlMjQ MDFI.yvUN7W70fUYIO4A4clXURkIp3OOqyWtZRia3bU eCh6Tg
            </p>
          </div>
          <div className="w-28 text-center">
            <span className="text-xs text-muted-foreground">全部域名访问</span>
          </div>
          <div className="w-20 text-right">
            <Button variant="outline" size="sm">
              删除
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
