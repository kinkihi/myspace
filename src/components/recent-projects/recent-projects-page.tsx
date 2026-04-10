"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import {
  ChevronDownIcon,
  DownloadIcon,
  EyeIcon,
  LayoutListIcon,
  LayoutGridIcon,
  MoreHorizontalIcon,
  PenLineIcon,
  Share2Icon,
  Trash2Icon,
} from "lucide-react"
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
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

type ProjectItem = {
  id: string
  name: string
  thumbnail: string
  updatedAt: string
  author: string
}

const MOCK_PROJECTS: ProjectItem[] = [
  {
    id: "1",
    name: "民宿公装项目",
    thumbnail: "/placeholder-1.jpg",
    updatedAt: "5 小时前",
    author: "OwenHu",
  },
  {
    id: "2",
    name: "咖啡厅XR",
    thumbnail: "/placeholder-2.jpg",
    updatedAt: "周一 14:23",
    author: "OwenHu",
  },
  {
    id: "3",
    name: "酒店室内装修协作",
    thumbnail: "/placeholder-3.jpg",
    updatedAt: "07-09 14:23",
    author: "OwenHu",
  },
  {
    id: "4",
    name: "别墅家装厨房通院子别墅家装厨房",
    thumbnail: "/placeholder-4.jpg",
    updatedAt: "2024-12-27 09:01",
    author: "Owen...",
  },
]

function ProjectActions({ projectId }: { projectId: string }) {
  const router = useRouter()

  return (
    <>
      <DropdownMenuItem>
        <EyeIcon />
        查看详情
      </DropdownMenuItem>
      <DropdownMenuItem onSelect={() => router.push(`/editor/${projectId}`)}>
        <PenLineIcon />
        编辑
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem>
        <Share2Icon />
        分享
      </DropdownMenuItem>
      <DropdownMenuItem>
        <DownloadIcon />
        下载 PLY
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

function ProjectCard({ project }: { project: ProjectItem }) {
  const router = useRouter()

  return (
    <Card
      className="group cursor-pointer gap-0 overflow-hidden rounded-lg py-0 transition-all hover:ring-foreground/30"
      onDoubleClick={() => router.push(`/editor/${project.id}`)}
    >
      <div className="relative aspect-[5/3] w-full p-3 pb-0">
        <Skeleton className="size-full rounded-sm" />
        <Button
          variant="secondary"
          size="icon-xs"
          className="absolute top-4 right-4 opacity-0 transition-opacity group-hover:opacity-100"
        >
          <Share2Icon className="size-3.5" />
        </Button>
      </div>

      <CardContent className="flex items-start justify-between gap-2 pt-4 pb-4">
        <div className="flex min-w-0 flex-col gap-0.5">
          <p className="truncate text-sm font-medium text-card-foreground">
            {project.name}
          </p>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <span className="whitespace-nowrap">{project.updatedAt}</span>
            <span className="size-1 shrink-0 rounded-full bg-muted-foreground/50" />
            <span className="truncate">{project.author}</span>
          </div>
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
            <ProjectActions projectId={project.id} />
          </DropdownMenuContent>
        </DropdownMenu>
      </CardContent>
    </Card>
  )
}

function ProjectListRow({ project }: { project: ProjectItem }) {
  const router = useRouter()

  return (
    <div
      className="group flex cursor-pointer items-center gap-4 rounded-lg px-4 py-3 transition-colors hover:bg-accent"
      onDoubleClick={() => router.push(`/editor/${project.id}`)}
    >
      <Skeleton className="size-10 shrink-0 rounded" />
      <div className="flex min-w-0 flex-1 flex-col">
        <p className="truncate text-sm font-medium text-foreground">
          {project.name}
        </p>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <span className="whitespace-nowrap">{project.updatedAt}</span>
          <span className="size-1 shrink-0 rounded-full bg-muted-foreground/50" />
          <span className="truncate">{project.author}</span>
        </div>
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
          <ProjectActions projectId={project.id} />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export function RecentProjectsPage() {
  const [viewMode, setViewMode] = React.useState<ViewMode>("grid")

  return (
    <>
      <div className="-mt-12 flex h-12 items-center px-10 hidden">
        <Breadcrumb>
          <BreadcrumbList className="text-xs">
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Showreel工作区</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>最近使用</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="px-10 py-4">
        <h1 className="text-xl font-semibold tracking-tight">最近使用</h1>
      </div>

      <div className="flex items-center justify-between px-10 pb-4">
        <p className="text-sm text-muted-foreground">
          {MOCK_PROJECTS.length} 文件
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
            {MOCK_PROJECTS.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col">
            {MOCK_PROJECTS.map((project) => (
              <ProjectListRow key={project.id} project={project} />
            ))}
          </div>
        )}
      </div>
    </>
  )
}
