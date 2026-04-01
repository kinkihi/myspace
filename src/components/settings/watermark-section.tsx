"use client"

import { UploadIcon } from "lucide-react"

export function WatermarkSection() {
  return (
    <section className="flex flex-col gap-6 px-10 py-6 border-b border-border">
      <div className="flex flex-col gap-1 max-w-[570px]">
        <h3 className="text-base font-semibold">水印</h3>
        <p className="text-sm text-muted-foreground">
          上传后可在D5渲染器中，选择渲染图片、视频时使用。
        </p>
      </div>

      <div className="flex items-start gap-4 max-w-[570px]">
        <label className="flex flex-col items-center justify-center w-36 h-[89px] rounded-lg border-2 border-dashed border-border hover:border-brand/50 transition-colors cursor-pointer bg-secondary/30">
          <UploadIcon className="size-5 text-muted-foreground mb-1" />
          <input type="file" className="hidden" accept=".jpg,.png" />
        </label>
        <div className="flex flex-col gap-1 text-xs text-muted-foreground">
          <p>支持.jpg，.png 格式</p>
          <p>图片不超过 20 MB</p>
        </div>
      </div>
    </section>
  )
}
