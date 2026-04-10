"use client"

import * as React from "react"
import {
  ChevronDownIcon,
  FolderIcon,
  LayoutListIcon,
  LayoutGridIcon,
  MoreHorizontalIcon,
  PenLineIcon,
  Share2Icon,
  Trash2Icon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

type ViewMode = "grid" | "list"

type FolderItem = {
  id: string
  name: string
  fileCount: number
  thumbnail: string
}

const MOCK_FOLDERS: FolderItem[] = [
  {
    id: "1",
    name: "Demo Project",
    fileCount: 1,
    thumbnail: "",
  },
]

function FolderActions() {
  return (
    <>
      <DropdownMenuItem>
        <PenLineIcon />
        重命名
      </DropdownMenuItem>
      <DropdownMenuItem>
        <Share2Icon />
        分享
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem variant="destructive">
        <Trash2Icon />
        删除
      </DropdownMenuItem>
    </>
  )
}

function ViewToggle({
  viewMode,
  setViewMode,
}: {
  viewMode: ViewMode
  setViewMode: (v: ViewMode) => void
}) {
  return (
    <div className="inline-flex rounded-md border border-white/[0.06] p-0.5">
      <button
        type="button"
        onClick={() => setViewMode("list")}
        className={cn(
          "flex items-center justify-center rounded-[4px] p-1.5 transition-colors",
          viewMode === "list"
            ? "bg-white/[0.10] text-white"
            : "text-white/40 hover:text-white/60"
        )}
      >
        <LayoutListIcon className="size-3.5" />
      </button>
      <button
        type="button"
        onClick={() => setViewMode("grid")}
        className={cn(
          "flex items-center justify-center rounded-[4px] p-1.5 transition-colors",
          viewMode === "grid"
            ? "bg-white/[0.10] text-white"
            : "text-white/40 hover:text-white/60"
        )}
      >
        <LayoutGridIcon className="size-3.5" />
      </button>
    </div>
  )
}

function FolderCard({ folder }: { folder: FolderItem }) {
  return (
    <Card className="group cursor-pointer gap-0 overflow-hidden rounded-lg py-0 transition-all hover:ring-foreground/30">
      <div className="relative aspect-[5/3] w-full p-3 pb-0">
        <div className="relative flex size-full items-center justify-center overflow-hidden rounded-sm bg-gradient-to-b from-[#3d3d3d] to-black">
          <Skeleton className="absolute inset-0 rounded-sm opacity-40" />
          <FolderIcon className="relative size-9 text-white/30" />
        </div>
      </div>

      <CardContent className="flex items-start justify-between gap-2 pt-4 pb-4">
        <div className="flex min-w-0 flex-col gap-0.5">
          <p className="truncate text-sm font-medium text-card-foreground">
            {folder.name}
          </p>
          <p className="text-xs text-muted-foreground">
            {folder.fileCount} 文件
          </p>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button
                variant="ghost"
                size="icon-xs"
                className="shrink-0 opacity-0 transition-opacity group-hover:opacity-100"
              />
            }
          >
            <MoreHorizontalIcon />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <FolderActions />
          </DropdownMenuContent>
        </DropdownMenu>
      </CardContent>
    </Card>
  )
}

function FolderListRow({ folder }: { folder: FolderItem }) {
  return (
    <div className="group flex cursor-pointer items-center gap-4 rounded-lg px-4 py-3 transition-colors hover:bg-accent">
      <div className="flex size-10 shrink-0 items-center justify-center rounded bg-gradient-to-b from-[#3d3d3d] to-black">
        <FolderIcon className="size-5 text-white/30" />
      </div>
      <div className="flex min-w-0 flex-1 flex-col">
        <p className="truncate text-sm font-medium text-foreground">
          {folder.name}
        </p>
        <p className="text-xs text-muted-foreground">
          {folder.fileCount} 文件
        </p>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button
              variant="ghost"
              size="icon-xs"
              className="shrink-0 opacity-0 transition-opacity group-hover:opacity-100"
            />
          }
        >
          <MoreHorizontalIcon />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <FolderActions />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export function TeamProjectsPage() {
  const [viewMode, setViewMode] = React.useState<ViewMode>("grid")

  return (
    <>
      <div className="px-10 py-4">
        <h1 className="text-xl font-semibold tracking-tight">团队项目</h1>
      </div>

      <div className="flex items-center justify-between px-10 pb-4">
        <p className="text-sm text-muted-foreground">
          {MOCK_FOLDERS.length} 文件夹
        </p>

        <div className="flex items-center gap-3">
          <Button variant="secondary" size="sm">
            排列方式
            <ChevronDownIcon />
          </Button>
          <Button variant="secondary" size="sm">
            类型
            <ChevronDownIcon />
          </Button>
          <Button variant="secondary" size="sm">
            我创建的
            <ChevronDownIcon />
          </Button>

          <ViewToggle viewMode={viewMode} setViewMode={setViewMode} />
        </div>
      </div>

      <div className="px-10 pb-10">
        {viewMode === "grid" ? (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-5">
            {MOCK_FOLDERS.map((folder) => (
              <FolderCard key={folder.id} folder={folder} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col">
            {MOCK_FOLDERS.map((folder) => (
              <FolderListRow key={folder.id} folder={folder} />
            ))}
          </div>
        )}
      </div>
    </>
  )
}
