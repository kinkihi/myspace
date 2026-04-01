"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

export function TeamProfile() {
  return (
    <section className="flex flex-col gap-8 px-10 py-6 border-b border-border">
      <h3 className="text-base font-semibold">团队资料</h3>
      <div className="flex items-start gap-4 max-w-[570px]">
        <div className="flex flex-1 gap-4 items-start">
          <Avatar className="size-10 rounded-full border-[2.5px] border-brand shrink-0">
            <AvatarFallback className="bg-transparent text-brand-foreground text-lg font-bold">
              T
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-2 min-w-0">
            <p className="text-sm font-medium text-secondary-foreground">
              Team Name
            </p>
            <p className="text-sm text-muted-foreground leading-5">
              Outlines keep you honest. They stop you from indulging in poorly
              thought-out metaphors about driving and keep you focused on the
              overall structure of your post Outlines keep you honest 200
              characters.
            </p>
          </div>
        </div>
        <Button variant="outline" size="sm" className="shrink-0">
          编辑
        </Button>
      </div>
    </section>
  )
}
