"use client"

import * as React from "react"
import * as ReactDOM from "react-dom"
import { useParams, useRouter } from "next/navigation"
import {
  ArrowLeftIcon,
  ChevronDownIcon,
  CropIcon,
  PlayIcon,
  PlusIcon,
  BoxIcon,
  LinkIcon,
  CopyIcon,
  QrCodeIcon,
  XIcon,
  UploadIcon,
  ApertureIcon,
  AppWindowIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Canvas, useThree } from "@react-three/fiber"
import { OrbitControls, Grid, GizmoHelper } from "@react-three/drei"
import * as THREE from "three"
import { cn } from "@/lib/utils"

type Scene = {
  id: string
  name: string
  active?: boolean
}

type ObjectItem = {
  id: string
  name: string
  icon?: "model"
}

const MOCK_SCENES: Scene[] = [
  { id: "1", name: "Scene 1" },
  { id: "2", name: "Scene 2" },
  { id: "3", name: "Scene 3", active: true },
]

const MOCK_OBJECTS: ObjectItem[] = [
  { id: "1", name: "Gaussian model", icon: "model" },
]

function ShareDialog({ onClose }: { onClose: () => void }) {
  const [copied, setCopied] = React.useState<"link" | "embed" | null>(null)
  const fileInputRef = React.useRef<HTMLInputElement>(null)
  const shareUrl = typeof window !== "undefined" ? window.location.href : ""
  const embedCode = `<iframe style="border: 1px solid rgba(0, 0, 0, 0.1);" width="800" height="450" src="${shareUrl}" allowfullscreen></iframe>`

  const copyToClipboard = async (text: string, type: "link" | "embed") => {
    await navigator.clipboard.writeText(text)
    setCopied(type)
    setTimeout(() => setCopied(null), 2000)
  }

  const handleThumbnailSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    // TODO: handle thumbnail upload
    e.target.value = ""
  }

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center" onClick={onClose}>
      <div className="absolute inset-0 bg-black/40" />
      <div
        className="relative flex w-[368px] flex-col overflow-clip rounded-[4px] border border-white/[0.06] bg-[#181a1f] shadow-[0_24px_54px_rgba(0,0,0,0.22),0_5px_14px_rgba(0,0,0,0.18)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-white/[0.06] pl-4 pr-2 py-2">
          <span className="text-xs font-medium text-white">Share</span>
          <button
            type="button"
            onClick={onClose}
            className="flex size-6 items-center justify-center rounded-[4px] text-white/60 hover:text-white"
          >
            <XIcon className="size-4" />
          </button>
        </div>

        <div className="flex flex-col gap-2 border-b border-white/[0.06] p-4">
          <span className="text-xs font-medium text-white/90">Copy link or get QR Code</span>
          <div className="flex gap-2">
            <div className="flex h-8 min-w-0 flex-1 items-center gap-1 rounded-[4px] border border-white/[0.06] px-2">
              <LinkIcon className="size-3.5 shrink-0 text-[#66aeff]" />
              <span className="min-w-0 flex-1 truncate text-[13px] text-[#66aeff]">{shareUrl}</span>
              <button
                type="button"
                onClick={() => copyToClipboard(shareUrl, "link")}
                className="shrink-0 text-white/60 hover:text-white"
              >
                <CopyIcon className="size-4" />
              </button>
            </div>
            <button
              type="button"
              className="flex size-8 shrink-0 items-center justify-center rounded-[4px] border border-white/[0.06] text-white/60 hover:text-white"
            >
              <QrCodeIcon className="size-4" />
            </button>
          </div>
          {copied === "link" && <span className="text-xs text-green-400">Copied!</span>}
        </div>

        <div className="flex flex-col gap-4 p-4">
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-white/90">Copy embed code</span>
              <button
                type="button"
                onClick={() => copyToClipboard(embedCode, "embed")}
                className="flex size-6 items-center justify-center text-white/60 hover:text-white"
              >
                <CopyIcon className="size-3" />
              </button>
            </div>
            <div className="rounded-[4px] bg-white/[0.03] p-3">
              <p className="break-all text-xs leading-4 text-white/90">{embedCode}</p>
            </div>
            {copied === "embed" && <span className="text-xs text-green-400">Copied!</span>}
          </div>

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex h-fit cursor-pointer flex-col items-center justify-center gap-1 rounded-[4px] border border-dashed border-white/10 py-3 transition-colors hover:border-white/25 hover:bg-white/[0.04]"
          >
            <UploadIcon className="size-4 text-white/40" />
            <span className="text-xs font-medium text-white/90">Upload Open Graph Thumbnail</span>
            <span className="text-center text-xs text-white/40">
              Supported formats : .png, .jpg, .jpeg
            </span>
            <span className="text-xs text-white/40">Max Size : 20MB</span>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".png,.jpg,.jpeg"
            className="hidden"
            onChange={handleThumbnailSelect}
          />
        </div>
      </div>
    </div>,
    document.body
  )
}

function EditorTopBar({ projectName }: { projectName: string }) {
  const router = useRouter()
  const [showShare, setShowShare] = React.useState(false)
  const [showProjectMenu, setShowProjectMenu] = React.useState(false)
  const projectBtnRef = React.useRef<HTMLButtonElement>(null)
  const projectMenuRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (!showProjectMenu) return
    const handleClickOutside = (e: MouseEvent) => {
      if (
        projectMenuRef.current && !projectMenuRef.current.contains(e.target as Node) &&
        projectBtnRef.current && !projectBtnRef.current.contains(e.target as Node)
      ) {
        setShowProjectMenu(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [showProjectMenu])

  return (
    <header className="flex h-12 shrink-0 items-center justify-between border-b border-white/[0.06] bg-[#181a1f]" onClick={(e) => e.stopPropagation()}>
      <div className="flex h-full items-center">
        <div className="flex h-full items-center border-r border-white/[0.06] px-2">
          <Button
            variant="ghost"
            size="icon-xs"
            className="size-8 rounded hover:bg-white/[0.06]"
            onClick={() => router.back()}
          >
            <ArrowLeftIcon className="size-4" />
          </Button>
        </div>
        <div className="relative flex h-full items-center gap-1 px-2">
          <button
            ref={projectBtnRef}
            type="button"
            className="flex items-center gap-0.5 rounded px-1 py-1 text-xs text-white/60 transition-colors hover:text-white/80"
            onClick={() => setShowProjectMenu((v) => !v)}
          >
            <span>{projectName}</span>
            <ChevronDownIcon className="size-3" />
          </button>
          {showProjectMenu && (
            <div
              ref={projectMenuRef}
              className="absolute left-2 top-full z-50 flex min-w-[100px] flex-col rounded-[4px] border border-white/[0.06] bg-[#15171c] p-1 shadow-[0_24px_54px_rgba(0,0,0,0.22),0_5px_14px_rgba(0,0,0,0.18)]"
            >
              <div className="flex flex-col gap-0.5">
                {[
                  { label: "保存项目", onClick: () => {} },
                  { label: "分享项目", onClick: () => { setShowShare(true) } },
                  { label: "退出", onClick: () => { router.back() } },
                ].map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      setShowProjectMenu(false)
                      item.onClick()
                    }}
                    className="flex h-6 items-center rounded-[4px] px-2 transition-colors hover:bg-white/[0.06]"
                  >
                    <span className="whitespace-nowrap text-xs font-medium text-white">
                      {item.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center gap-2 p-2">
        <Button variant="ghost" size="icon-xs" className="size-8 rounded">
          <PlayIcon className="size-4" />
        </Button>
        <Button
          size="sm"
          className="h-8 rounded bg-[#0078ff] px-3 text-[13px] font-normal text-white hover:bg-[#0078ff]/80"
          onClick={() => setShowShare(true)}
        >
          Share
        </Button>
      </div>
      {showShare && <ShareDialog onClose={() => setShowShare(false)} />}
    </header>
  )
}

function PanelHeader({
  title,
  onAdd,
  menuItems,
}: {
  title: string
  onAdd?: () => void
  menuItems?: { label: string; icon?: React.ReactNode; onClick: () => void }[]
}) {
  const [menuOpen, setMenuOpen] = React.useState(false)
  const btnRef = React.useRef<HTMLButtonElement>(null)
  const menuRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    if (!menuOpen) return
    const handleClickOutside = (e: MouseEvent) => {
      if (
        menuRef.current && !menuRef.current.contains(e.target as Node) &&
        btnRef.current && !btnRef.current.contains(e.target as Node)
      ) {
        setMenuOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [menuOpen])

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (menuItems) {
      setMenuOpen((v) => !v)
    } else {
      onAdd?.()
    }
  }

  return (
    <div className="relative flex h-10 items-center justify-between px-2">
      <span className="px-2 text-[13px] font-semibold text-white">
        {title}
      </span>
      {(onAdd || menuItems) && (
        <button
          ref={btnRef}
          type="button"
          onClick={handleClick}
          className="flex size-6 items-center justify-center rounded text-white/60 transition-colors hover:bg-white/[0.06] hover:text-white"
        >
          <PlusIcon className="size-4" />
        </button>
      )}
      {menuOpen && menuItems && (
        <div
          ref={menuRef}
          className="absolute right-2 top-full z-50 flex flex-col rounded-[4px] border border-white/[0.06] bg-[#15171c] p-1 shadow-[0_24px_54px_rgba(0,0,0,0.22),0_5px_14px_rgba(0,0,0,0.18)]"
        >
          <div className="flex flex-col gap-0.5">
            {menuItems.map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  setMenuOpen(false)
                  item.onClick()
                }}
                className="flex h-6 items-center gap-0 rounded-[4px] pl-1 pr-2 transition-colors hover:bg-white/[0.06]"
              >
                {item.icon && (
                  <span className="flex size-6 items-center justify-center">
                    {item.icon}
                  </span>
                )}
                <span className="whitespace-nowrap px-1 text-xs font-medium text-white">
                  {item.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function SceneList({
  activeId,
  onActiveChange,
  scenes,
  onAddScene,
}: {
  activeId: string | null
  onActiveChange: (id: string | null) => void
  scenes: Scene[]
  onAddScene: () => void
}) {
  return (
    <div className="flex shrink-0 flex-col border-b border-white/[0.06]">
      <PanelHeader title="Scene" onAdd={onAddScene} />
      <div className="flex flex-col gap-1 px-2 pb-2">
        {scenes.map((scene) => (
          <button
            key={scene.id}
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onActiveChange(activeId === scene.id ? null : scene.id)
            }}
            className={cn(
              "flex items-center gap-2 rounded p-1 text-left transition-colors",
              activeId === scene.id
                ? "bg-[rgba(0,120,255,0.48)]"
                : "hover:bg-white/[0.03]"
            )}
          >
            <div className="h-10 w-[70px] shrink-0 rounded-sm bg-white/[0.06]" />
            <span className="text-xs font-medium text-white/90">
              {scene.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}

function ObjectList({
  selectedId,
  onSelectedChange,
}: {
  selectedId: string | null
  onSelectedChange: (id: string | null) => void
}) {
  return (
    <div className="flex flex-col">
      <PanelHeader
        title="Object"
        menuItems={[
          { label: "多媒体热点", icon: <ApertureIcon className="size-4 text-white" />, onClick: () => {} },
          { label: "网页热点", icon: <AppWindowIcon className="size-4 text-white" />, onClick: () => {} },
        ]}
      />
      <div className="flex flex-col px-2 pb-2 pt-2">
        {MOCK_OBJECTS.map((obj) => (
          <button
            key={obj.id}
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onSelectedChange(selectedId === obj.id ? null : obj.id)
            }}
            className={cn(
              "flex h-8 items-center gap-1.5 rounded pl-2 pr-1 text-left transition-colors",
              selectedId === obj.id
                ? "bg-[rgba(0,120,255,0.48)] text-white"
                : "hover:bg-white/[0.06]"
            )}
          >
            <BoxIcon className="size-4 shrink-0 text-white/60" />
            <span className="truncate text-xs font-medium">
              {obj.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}

function AxisInput({
  label,
  value,
  onChange,
}: {
  label: string
  value: number
  onChange: (v: number) => void
}) {
  const [editing, setEditing] = React.useState(false)
  const [draft, setDraft] = React.useState(String(value))
  const inputRef = React.useRef<HTMLInputElement>(null)
  const dragRef = React.useRef({ startX: 0, startVal: 0, dragging: false })

  React.useEffect(() => {
    if (!editing) setDraft(String(value))
  }, [value, editing])

  React.useEffect(() => {
    if (editing) {
      inputRef.current?.focus()
      inputRef.current?.select()
    }
  }, [editing])

  const commitDraft = () => {
    setEditing(false)
    const n = parseFloat(draft)
    if (!Number.isNaN(n)) onChange(n)
    else setDraft(String(value))
  }

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (editing) return
    dragRef.current = { startX: e.clientX, startVal: value, dragging: false }
    const el = e.currentTarget
    el.setPointerCapture(e.pointerId)

    const onMove = (ev: PointerEvent) => {
      const dx = ev.clientX - dragRef.current.startX
      if (!dragRef.current.dragging && Math.abs(dx) > 2) {
        dragRef.current.dragging = true
      }
      if (dragRef.current.dragging) {
        const step = ev.shiftKey ? 0.1 : 1
        onChange(Math.round((dragRef.current.startVal + dx * step) * 100) / 100)
      }
    }
    const onUp = () => {
      el.removeEventListener("pointermove", onMove)
      el.removeEventListener("pointerup", onUp)
      if (!dragRef.current.dragging) setEditing(true)
    }
    el.addEventListener("pointermove", onMove)
    el.addEventListener("pointerup", onUp)
  }

  return (
    <div
      className={cn(
        "flex h-6 min-w-0 flex-1 items-center rounded-[4px] bg-white/[0.03] backdrop-blur-[50px]",
        !editing && "cursor-ew-resize"
      )}
      onPointerDown={handlePointerDown}
    >
      <div className="flex h-full w-5 shrink-0 items-center justify-center px-1">
        <span className="text-xs font-medium leading-4 text-white/40">{label}</span>
      </div>
      {editing ? (
        <input
          ref={inputRef}
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={commitDraft}
          onKeyDown={(e) => {
            if (e.key === "Enter") commitDraft()
            if (e.key === "Escape") { setEditing(false); setDraft(String(value)) }
          }}
          className="h-5 min-w-0 flex-1 border-0 bg-transparent px-1 text-xs leading-4 text-white outline-none"
        />
      ) : (
        <span className="min-w-0 flex-1 truncate px-1 text-xs leading-4 text-white">
          {value}
        </span>
      )}
    </div>
  )
}

function LinkOnIcon({ className }: { className?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M4.49768 6.50232V5.50232C4.49768 3.56932 6.06468 2.00232 7.99768 2.00232C9.86624 2.00232 11.3928 3.46659 11.4925 5.3082L11.4977 5.50002L11.5023 6.50002C11.5035 6.77616 11.2807 7.00104 11.0046 7.00232C10.7591 7.00344 10.5542 6.8275 10.5107 6.59445L10.5023 6.50461L10.4977 5.50232C10.4977 4.1216 9.37839 3.00232 7.99768 3.00232C6.6722 3.00232 5.58764 4.03385 5.503 5.33794L5.49768 5.50232V6.50232C5.49768 6.77846 5.27382 7.00232 4.99768 7.00232C4.75222 7.00232 4.54807 6.82544 4.50574 6.59219L4.49768 6.50232ZM4.49768 10.5023V9.50231C4.49768 9.22617 4.72154 9.00231 4.99768 9.00231C5.24314 9.00231 5.44729 9.17919 5.48962 9.41244L5.49768 9.50231V10.5023C5.49768 11.883 6.61697 13.0023 7.99768 13.0023C9.32316 13.0023 10.4077 11.9708 10.4924 10.6667L10.4977 10.5023V9.50231C10.4977 9.22617 10.7215 9.00231 10.9977 9.00231C11.2431 9.00231 11.4473 9.17919 11.4896 9.41244L11.4977 9.50231V10.5023C11.4977 12.4353 9.93068 14.0023 7.99768 14.0023C6.12912 14.0023 4.60255 12.538 4.50286 10.6943L4.49768 10.5023ZM7.49768 10.5021L7.49998 5.50208C7.5001 5.22594 7.72406 5.00219 8.00021 5.00231C8.24567 5.00243 8.44973 5.17939 8.49196 5.41266L8.49998 5.50254L8.49768 10.5025C8.49755 10.7787 8.27359 11.0024 7.99745 11.0023C7.75199 11.0022 7.54792 10.8252 7.50569 10.592L7.49768 10.5021Z" fill="currentColor" />
    </svg>
  )
}

function LinkOffIcon({ className }: { className?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M5 8.99979C5.24539 8.99979 5.44977 9.17679 5.49219 9.40994L5.5 9.49979V10.4998C5.5 11.8805 6.61929 12.9998 8 12.9998C9.22718 12.9998 10.2461 12.1151 10.458 10.949L11.2217 11.866C10.6893 13.1199 9.4481 13.9998 8 13.9998C6.13155 13.9998 4.60474 12.5357 4.50488 10.6922L4.5 10.4998V9.49979C4.50011 9.22374 4.72392 8.99979 5 8.99979ZM8.5 8.60037V10.4998C8.49987 10.7759 8.27604 10.9998 8 10.9998C7.7546 10.9997 7.5501 10.8228 7.50781 10.5896L7.5 10.4998L7.50098 7.40115L8.5 8.60037ZM5.54102 5.04959C5.52394 5.14331 5.51119 5.23868 5.50488 5.33572L5.5 5.49979V6.49979C5.5 6.77592 5.27614 6.99979 5 6.99979C4.75454 6.99979 4.55015 6.82288 4.50781 6.58963L4.5 6.49979V5.49979C4.50003 5.01465 4.5989 4.55263 4.77734 4.1326L5.54102 5.04959Z" fill="currentColor" />
      <path d="M10.4482 13C9.81703 13.6182 8.95333 14 8 14C7.04696 14 6.18398 13.6179 5.55273 13H10.4482ZM5 12.3027C4.71384 11.8277 4.53668 11.2795 4.50488 10.6924L4.5 10.5V9.5C4.5 9.22386 4.72386 9 5 9V12.3027ZM5 7C4.75454 7 4.55015 6.82309 4.50781 6.58984L4.5 6.5V5.5C4.5 4.84049 4.68288 4.22387 5 3.69727V7ZM8 2C9.86849 2 11.3953 3.46415 11.4951 5.30566L11.5 5.49805L11.5049 6.49805C11.506 6.77403 11.2829 6.99872 11.0068 7C10.7614 7.00109 10.5561 6.82483 10.5127 6.5918L10.5049 6.50195L10.5 5.5C10.5 4.11928 9.38071 3 8 3C7.59947 3 7.22139 3.09521 6.88574 3.2627L6.23242 2.47949C6.75128 2.17521 7.35504 2 8 2Z" fill="currentColor" />
      <path fillRule="evenodd" clipRule="evenodd" d="M2.7958 1.43597C3.00794 1.25918 3.32322 1.28785 3.5 1.49998L13.5 13.5C13.6768 13.7121 13.6481 14.0274 13.436 14.2042C13.2238 14.381 12.9086 14.3523 12.7318 14.1402L2.73178 2.14017C2.555 1.92803 2.58366 1.61275 2.7958 1.43597Z" fill="currentColor" />
    </svg>
  )
}

type Vec3 = [number, number, number]

function PropertySection({
  label,
  showLinkIcon = false,
  values,
  onValuesChange,
}: {
  label: string
  showLinkIcon?: boolean
  values: Vec3
  onValuesChange: (v: Vec3) => void
}) {
  const [linked, setLinked] = React.useState(true)

  const handleAxisChange = (axis: 0 | 1 | 2, v: number) => {
    if (linked && showLinkIcon) {
      const delta = v - values[axis]
      onValuesChange([
        Math.round((values[0] + delta) * 100) / 100,
        Math.round((values[1] + delta) * 100) / 100,
        Math.round((values[2] + delta) * 100) / 100,
      ])
    } else {
      const next: Vec3 = [...values]
      next[axis] = v
      onValuesChange(next)
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex h-6 items-center gap-1">
        <span className="text-xs font-medium text-white/90">{label}</span>
        {showLinkIcon && (
          <button
            type="button"
            onClick={() => setLinked(!linked)}
            className="flex items-center justify-center"
          >
            {linked ? (
              <LinkOnIcon className="size-4 text-white/90" />
            ) : (
              <LinkOffIcon className="size-4 text-white/40" />
            )}
          </button>
        )}
      </div>
      <div className="flex w-full items-center gap-2">
        <AxisInput label="X" value={values[0]} onChange={(v) => handleAxisChange(0, v)} />
        <AxisInput label="Y" value={values[1]} onChange={(v) => handleAxisChange(1, v)} />
        <AxisInput label="Z" value={values[2]} onChange={(v) => handleAxisChange(2, v)} />
      </div>
    </div>
  )
}

function Toggle({
  checked,
  onChange,
}: {
  checked: boolean
  onChange: (v: boolean) => void
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={cn(
        "flex w-[26px] shrink-0 items-center rounded-[12px] border border-white/[0.06] p-0.5 transition-colors",
        checked ? "justify-end bg-[#0078ff]" : "justify-start bg-white/[0.06]"
      )}
    >
      <div className="size-2.5 rounded-full bg-white shadow-[0_0_4.5px_rgba(0,0,0,0.4)]" />
    </button>
  )
}

function SliderField({
  label,
  value,
  onChange,
  min = 0,
  max = 100,
}: {
  label: string
  value: number
  onChange: (v: number) => void
  min?: number
  max?: number
}) {
  const [editing, setEditing] = React.useState(false)
  const [draft, setDraft] = React.useState(String(value))
  const inputRef = React.useRef<HTMLInputElement>(null)
  const dragRef = React.useRef({ startX: 0, startVal: 0, dragging: false })

  React.useEffect(() => {
    if (!editing) setDraft(String(value))
  }, [value, editing])

  React.useEffect(() => {
    if (editing) {
      inputRef.current?.focus()
      inputRef.current?.select()
    }
  }, [editing])

  const commitDraft = () => {
    setEditing(false)
    const n = parseFloat(draft)
    if (!Number.isNaN(n)) onChange(n)
    else setDraft(String(value))
  }

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (editing) return
    dragRef.current = { startX: e.clientX, startVal: value, dragging: false }
    const el = e.currentTarget
    el.setPointerCapture(e.pointerId)
    const onMove = (ev: PointerEvent) => {
      const dx = ev.clientX - dragRef.current.startX
      if (!dragRef.current.dragging && Math.abs(dx) > 2) dragRef.current.dragging = true
      if (dragRef.current.dragging) {
        const step = ev.shiftKey ? 0.1 : 1
        onChange(Math.round((dragRef.current.startVal + dx * step) * 100) / 100)
      }
    }
    const onUp = () => {
      el.removeEventListener("pointermove", onMove)
      el.removeEventListener("pointerup", onUp)
      if (!dragRef.current.dragging) setEditing(true)
    }
    el.addEventListener("pointermove", onMove)
    el.addEventListener("pointerup", onUp)
  }

  return (
    <div className="flex flex-col gap-2">
      <span className="text-xs font-medium text-white/90">{label}</span>
      <div
        className={cn(
          "relative flex h-6 items-center overflow-clip rounded-[4px] bg-white/[0.03] backdrop-blur-[50px]",
          !editing && "cursor-ew-resize"
        )}
        onPointerDown={handlePointerDown}
      >
        <div
          className="absolute inset-y-0 left-0 bg-white/10"
          style={{ width: `${Math.max(0, Math.min(100, ((value - min) / (max - min)) * 100))}%` }}
        />
        {editing ? (
          <input
            ref={inputRef}
            type="text"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onBlur={commitDraft}
            onKeyDown={(e) => {
              if (e.key === "Enter") commitDraft()
              if (e.key === "Escape") { setEditing(false); setDraft(String(value)) }
            }}
            className="relative h-5 min-w-0 flex-1 border-0 bg-transparent px-1 text-xs leading-4 text-white outline-none"
          />
        ) : (
          <span className="relative px-1 text-xs leading-4 text-white">{value}</span>
        )}
      </div>
    </div>
  )
}

function hexToHsv(hex: string): { h: number; s: number; v: number } {
  const r = parseInt(hex.slice(1, 3), 16) / 255
  const g = parseInt(hex.slice(3, 5), 16) / 255
  const b = parseInt(hex.slice(5, 7), 16) / 255
  const max = Math.max(r, g, b), min = Math.min(r, g, b)
  const d = max - min
  let h = 0
  if (d !== 0) {
    if (max === r) h = ((g - b) / d + 6) % 6
    else if (max === g) h = (b - r) / d + 2
    else h = (r - g) / d + 4
    h *= 60
  }
  const s = max === 0 ? 0 : (d / max) * 100
  const v = max * 100
  return { h: Math.round(h), s: Math.round(s), v: Math.round(v) }
}

function hsvToHex(h: number, s: number, v: number) {
  const s1 = s / 100, v1 = v / 100
  const c = v1 * s1, x = c * (1 - Math.abs(((h / 60) % 2) - 1)), m = v1 - c
  let r = 0, g = 0, b = 0
  if (h < 60) { r = c; g = x }
  else if (h < 120) { r = x; g = c }
  else if (h < 180) { g = c; b = x }
  else if (h < 240) { g = x; b = c }
  else if (h < 300) { r = x; b = c }
  else { r = c; b = x }
  const toHex = (n: number) => Math.round((n + m) * 255).toString(16).padStart(2, "0")
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`
}

function hsvToRgbString(h: number) {
  return hsvToHex(h, 100, 100)
}

function ColorSliderRow({
  label,
  value,
  max,
  onChange,
  gradient,
}: {
  label: string
  value: number
  max: number
  onChange: (v: number) => void
  gradient: string
}) {
  const trackRef = React.useRef<HTMLDivElement>(null)

  const handlePointerDown = (e: React.PointerEvent) => {
    const track = trackRef.current
    if (!track) return
    track.setPointerCapture(e.pointerId)
    const update = (ev: React.PointerEvent | PointerEvent) => {
      const rect = track.getBoundingClientRect()
      const ratio = Math.max(0, Math.min(1, (ev.clientX - rect.left) / rect.width))
      onChange(Math.round(ratio * max))
    }
    update(e)
    const onMove = (ev: PointerEvent) => update(ev)
    const onUp = () => { track.removeEventListener("pointermove", onMove); track.removeEventListener("pointerup", onUp) }
    track.addEventListener("pointermove", onMove)
    track.addEventListener("pointerup", onUp)
  }

  return (
    <div className="flex items-center gap-2">
      <span className="w-4 shrink-0 text-center text-xs font-medium text-white">{label}</span>
      <div
        ref={trackRef}
        className="relative h-6 flex-1 cursor-pointer rounded-[4px]"
        style={{ background: gradient }}
        onPointerDown={handlePointerDown}
      >
        <div
          className="pointer-events-none absolute top-1/2 h-5 w-1 -translate-x-1/2 -translate-y-1/2 rounded-[2px] border border-black/20 bg-white/90 shadow-[0_8px_18px_rgba(0,0,0,0.22),0_2px_5px_rgba(0,0,0,0.18)]"
          style={{ left: `${(value / max) * 100}%` }}
        />
      </div>
      <div className="flex h-6 w-10 shrink-0 items-center justify-center rounded-[4px] bg-white/[0.03] text-xs text-white">
        {value}
      </div>
    </div>
  )
}

function ColorPicker({
  color,
  onChange,
  onClose,
  anchorRef,
}: {
  color: { h: number; s: number; v: number }
  onChange: (c: { h: number; s: number; v: number }) => void
  onClose: () => void
  anchorRef: React.RefObject<HTMLButtonElement | null>
}) {
  const areaRef = React.useRef<HTMLDivElement>(null)
  const panelRef = React.useRef<HTMLDivElement>(null)
  const [pos, setPos] = React.useState({ top: 0, left: 0 })
  const dragRef = React.useRef({ dragging: false, offsetX: 0, offsetY: 0 })

  React.useEffect(() => {
    const anchor = anchorRef.current
    if (!anchor) return
    const rect = anchor.getBoundingClientRect()
    setPos({
      top: rect.bottom + 8,
      left: Math.max(8, rect.right - 240),
    })
  }, [anchorRef])

  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node) &&
          anchorRef.current && !anchorRef.current.contains(e.target as Node)) {
        onClose()
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [onClose, anchorRef])

  const handleHeaderPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest("button")) return
    const panel = panelRef.current
    if (!panel) return
    dragRef.current = { dragging: true, offsetX: e.clientX - pos.left, offsetY: e.clientY - pos.top }
    panel.setPointerCapture(e.pointerId)
    const onMove = (ev: PointerEvent) => {
      if (!dragRef.current.dragging) return
      setPos({ top: ev.clientY - dragRef.current.offsetY, left: ev.clientX - dragRef.current.offsetX })
    }
    const onUp = () => {
      dragRef.current.dragging = false
      panel.removeEventListener("pointermove", onMove)
      panel.removeEventListener("pointerup", onUp)
    }
    panel.addEventListener("pointermove", onMove)
    panel.addEventListener("pointerup", onUp)
  }

  const handleAreaPointer = (e: React.PointerEvent) => {
    const area = areaRef.current
    if (!area) return
    area.setPointerCapture(e.pointerId)
    const update = (ev: React.PointerEvent | PointerEvent) => {
      const rect = area.getBoundingClientRect()
      const s = Math.round(Math.max(0, Math.min(1, (ev.clientX - rect.left) / rect.width)) * 100)
      const v = Math.round(Math.max(0, Math.min(1, 1 - (ev.clientY - rect.top) / rect.height)) * 100)
      onChange({ ...color, s, v })
    }
    update(e)
    const onMove = (ev: PointerEvent) => update(ev)
    const onUp = () => { area.removeEventListener("pointermove", onMove); area.removeEventListener("pointerup", onUp) }
    area.addEventListener("pointermove", onMove)
    area.addEventListener("pointerup", onUp)
  }

  const hueColor = hsvToRgbString(color.h)

  return ReactDOM.createPortal(
    <div
      ref={panelRef}
      className="fixed z-50 flex w-60 flex-col rounded-[4px] border border-white/[0.06] bg-[rgba(26,29,34,0.72)] shadow-[0_24px_54px_rgba(0,0,0,0.22),0_5px_14px_rgba(0,0,0,0.18)] backdrop-blur-[50px]"
      style={{ top: pos.top, left: pos.left }}
    >
      <div
        className="flex cursor-grab items-center justify-between border-b border-white/[0.06] p-2 active:cursor-grabbing"
        onPointerDown={handleHeaderPointerDown}
      >
        <div className="flex h-6 items-center rounded-[4px] bg-white/[0.06] px-2">
          <span className="text-xs font-medium text-white">Color</span>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="flex size-6 items-center justify-center rounded-[4px] text-white/60 hover:text-white"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
        </button>
      </div>

      <div className="flex flex-col gap-2 p-4">
        <div
          ref={areaRef}
          className="relative h-[120px] w-full cursor-crosshair rounded-[4px]"
          style={{ background: `linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, ${hueColor})` }}
          onPointerDown={handleAreaPointer}
        >
          <div
            className="pointer-events-none absolute size-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow-[0_0_4px_rgba(0,0,0,0.5)]"
            style={{ left: `${color.s}%`, top: `${100 - color.v}%` }}
          />
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="flex size-8 shrink-0 items-center justify-center rounded-[4px] bg-white/[0.03] transition-colors hover:bg-white/[0.06]"
            onClick={async () => {
              if (!("EyeDropper" in window)) return
              try {
                const dropper = new (window as unknown as { EyeDropper: new () => { open: () => Promise<{ sRGBHex: string }> } }).EyeDropper()
                const result = await dropper.open()
                onChange(hexToHsv(result.sRGBHex))
              } catch {
                /* user cancelled via Esc or right-click */
              }
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.4013 7.07308L11.7063 7.37871C11.7992 7.47157 11.8728 7.58182 11.9231 7.70316C11.9734 7.8245 11.9993 7.95456 11.9993 8.0859C11.9993 8.21724 11.9734 8.34729 11.9231 8.46863C11.8728 8.58997 11.7992 8.70022 11.7063 8.79308L11.1438 9.35558C11.05 9.44928 10.9229 9.50191 10.7903 9.50191C10.6578 9.50191 10.5307 9.44928 10.4369 9.35558L6.64566 5.56246C6.55196 5.4687 6.49933 5.34157 6.49933 5.20902C6.49933 5.07647 6.55196 4.94934 6.64566 4.85558L7.20816 4.29308C7.30102 4.2002 7.41127 4.12652 7.53261 4.07625C7.65395 4.02598 7.78401 4.00011 7.91535 4.00011C8.04669 4.00011 8.17674 4.02598 8.29808 4.07625C8.41942 4.12652 8.52967 4.2002 8.62253 4.29308L8.92816 4.59808L10.4907 3.02933C11.165 2.35496 12.2638 2.31371 12.9557 2.96683C13.1257 3.12753 13.2618 3.32069 13.356 3.53491C13.4501 3.74913 13.5003 3.98004 13.5036 4.214C13.5069 4.44795 13.4633 4.6802 13.3753 4.897C13.2873 5.1138 13.1567 5.31075 12.9913 5.47621L11.4013 7.07308Z" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M9.95704 8.87128L6.41454 12.4144C6.15764 12.6722 5.83528 12.8549 5.48219 12.943C5.12911 13.0312 4.75867 13.0212 4.41079 12.9144L3.16079 13.4607C3.06869 13.5009 2.96659 13.5125 2.86781 13.4939C2.76903 13.4753 2.67815 13.4273 2.60704 13.3563C2.55601 13.3053 2.52155 13.24 2.50817 13.1691C2.49479 13.0982 2.50311 13.0249 2.53204 12.9588L3.10642 11.6425C2.98717 11.2893 2.96905 10.9097 3.05408 10.5467C3.13912 10.1837 3.32394 9.85169 3.58767 9.58815L7.13079 6.04565" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <div className="flex h-8 flex-1 items-center justify-between rounded-[4px] bg-white/[0.03] px-2">
            <span className="text-[13px] text-white">HSV</span>
            <ChevronDownIcon className="size-4 text-white/60" />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <ColorSliderRow
            label="H"
            value={color.h}
            max={360}
            onChange={(h) => onChange({ ...color, h })}
            gradient="linear-gradient(to right, #ff0000, #ff00ff 16.67%, #0000ff 33.33%, #00ffff 50%, #00ff00 66.67%, #ffff00 83.33%, #ff0000)"
          />
          <ColorSliderRow
            label="S"
            value={color.s}
            max={100}
            onChange={(s) => onChange({ ...color, s })}
            gradient={`linear-gradient(to right, white, ${hueColor})`}
          />
          <ColorSliderRow
            label="V"
            value={color.v}
            max={100}
            onChange={(v) => onChange({ ...color, v })}
            gradient={`linear-gradient(to right, black, ${hueColor})`}
          />
        </div>
      </div>
    </div>,
    document.body
  )
}

type HsvColor = { h: number; s: number; v: number }

function ProjectInspector({
  projectName,
  bgColor,
  onBgColorChange,
}: {
  projectName: string
  bgColor: HsvColor
  onBgColorChange: (c: HsvColor) => void
}) {
  const [name, setName] = React.useState(projectName)
  const [description, setDescription] = React.useState("")
  const [allowComments, setAllowComments] = React.useState(true)
  const [showGrid, setShowGrid] = React.useState(true)
  const [show3DCoords, setShow3DCoords] = React.useState(true)
  const setBgColor = onBgColorChange
  const [showColorPicker, setShowColorPicker] = React.useState(false)
  const colorBtnRef = React.useRef<HTMLButtonElement>(null)

  const bgHex = hsvToHex(bgColor.h, bgColor.s, bgColor.v)

  return (
    <>
      <div className="flex flex-col gap-2 border-b border-white/[0.06] px-4 pb-4 pt-2">
        <div className="flex flex-col gap-2">
          <span className="text-xs font-medium text-white/90">Project Share Title</span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="rounded-[4px] border-0 bg-white/[0.03] p-2 text-xs leading-4 text-white outline-none backdrop-blur-[50px]"
          />
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-xs font-medium text-white/90">Description</span>
          <div className="flex h-28 flex-col justify-between rounded-[4px] bg-white/[0.03] p-2 backdrop-blur-[50px]">
            <textarea
              value={description}
              onChange={(e) => {
                if (e.target.value.length <= 500) setDescription(e.target.value)
              }}
              placeholder="Project description"
              className="min-h-0 flex-1 resize-none border-0 bg-transparent text-xs leading-4 text-white placeholder:text-white/60 outline-none"
            />
            <span className="self-end text-xs text-white/40">{description.length} / 500</span>
          </div>
        </div>
        <div className="flex h-6 items-center justify-between">
          <span className="text-xs font-medium text-white/90">Allow Comments</span>
          <Toggle checked={allowComments} onChange={setAllowComments} />
        </div>
      </div>
      <div className="flex flex-col gap-2 border-b border-white/[0.06] p-4">
        <div className="flex h-6 items-center justify-between">
          <span className="text-xs font-medium text-white/90">Show Grid</span>
          <Toggle checked={showGrid} onChange={setShowGrid} />
        </div>
        <div className="flex h-6 items-center justify-between">
          <span className="text-xs font-medium text-white/90">Show 3D Coordinates</span>
          <Toggle checked={show3DCoords} onChange={setShow3DCoords} />
        </div>
      </div>
      <div className="flex items-center justify-between border-b border-white/[0.06] p-4">
        <span className="text-xs font-medium text-white/90">Background Color</span>
        <button
          ref={colorBtnRef}
          type="button"
          onClick={() => setShowColorPicker(!showColorPicker)}
          className="size-6 rounded-[4px] ring-1 ring-inset ring-white/[0.06]"
          style={{ backgroundColor: bgHex }}
        />
        {showColorPicker && (
          <ColorPicker
            color={bgColor}
            onChange={setBgColor}
            onClose={() => setShowColorPicker(false)}
            anchorRef={colorBtnRef}
          />
        )}
      </div>
    </>
  )
}

function SceneInspector({ sceneName }: { sceneName: string }) {
  const [fov, setFov] = React.useState(25)
  const [near, setNear] = React.useState(25)
  const [far, setFar] = React.useState(25)

  return (
    <>
      <div className="flex h-10 items-center border-b border-white/[0.06] px-4">
        <span className="text-[13px] font-medium text-white">{sceneName}</span>
      </div>
      <div className="flex flex-col gap-2 p-4">
        <SliderField label="FOV" value={fov} onChange={setFov} />
        <SliderField label="Near" value={near} onChange={setNear} />
        <SliderField label="Far" value={far} onChange={setFar} />
      </div>
    </>
  )
}

function ObjectInspector({ objectName }: { objectName: string }) {
  const [location, setLocation] = React.useState<Vec3>([0, 0, 0])
  const [rotation, setRotation] = React.useState<Vec3>([0, 0, 0])
  const [scale, setScale] = React.useState<Vec3>([0, 0, 0])

  return (
    <>
      <div className="flex h-10 items-center px-4">
        <span className="text-[13px] font-medium text-white">{objectName}</span>
      </div>
      <div className="border-b border-white/[0.06] px-3 pb-3">
        <button
          type="button"
          className="flex h-8 w-full items-center justify-center gap-1 rounded bg-white/[0.03] text-[13px] text-white transition-colors hover:bg-white/[0.06]"
        >
          <CropIcon className="size-4" />
          裁剪文件
        </button>
      </div>
      <div className="flex flex-col gap-2 p-4">
        <PropertySection label="Location" values={location} onValuesChange={setLocation} />
        <PropertySection label="Rotation" values={rotation} onValuesChange={setRotation} />
        <PropertySection label="Scale" showLinkIcon values={scale} onValuesChange={setScale} />
      </div>
    </>
  )
}

function InspectorPanel({
  activeSceneId,
  selectedObjectId,
  scenes,
  projectName,
  bgColor,
  onBgColorChange,
}: {
  activeSceneId: string | null
  selectedObjectId: string | null
  scenes: Scene[]
  projectName: string
  bgColor: HsvColor
  onBgColorChange: (c: HsvColor) => void
}) {
  const selectedObject = selectedObjectId
    ? MOCK_OBJECTS.find((o) => o.id === selectedObjectId)
    : null
  const activeScene = activeSceneId
    ? scenes.find((s) => s.id === activeSceneId)
    : null

  return (
    <div className="flex w-60 shrink-0 flex-col border-l border-white/[0.06] bg-[#181a1f]" onClick={(e) => e.stopPropagation()}>
      <Tabs defaultValue="inspector">
        <div className="flex h-10 items-center border-b border-white/[0.06] px-3">
          <TabsList variant="line" className="h-full gap-0 bg-transparent p-0">
            <TabsTrigger
              value="inspector"
              className="h-full rounded-none border-none px-1 text-[13px] font-semibold after:hidden data-active:text-white"
            >
              Inspector
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="inspector" className="overflow-y-auto">
          {selectedObject ? (
            <ObjectInspector objectName={selectedObject.name} />
          ) : activeScene ? (
            <SceneInspector sceneName={activeScene.name} />
          ) : (
            <ProjectInspector projectName={projectName} bgColor={bgColor} onBgColorChange={onBgColorChange} />
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

function makeAxisHeadTexture(color: string, label?: string) {
  const size = 128
  const canvas = document.createElement("canvas")
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext("2d")!

  ctx.beginPath()
  ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2)
  ctx.closePath()
  ctx.fillStyle = color
  ctx.fill()

  if (label) {
    const fontSize = Math.round(size * 0.48)
    ctx.font = `bold ${fontSize}px -apple-system, "Helvetica Neue", Arial, sans-serif`
    ctx.textAlign = "center"
    ctx.textBaseline = "alphabetic"
    ctx.fillStyle = "#fff"
    const metrics = ctx.measureText(label)
    const asc = metrics.actualBoundingBoxAscent
    const desc = metrics.actualBoundingBoxDescent
    ctx.fillText(label, size / 2, size / 2 + (asc - desc) / 2)
  }

  const tex = new THREE.CanvasTexture(canvas)
  tex.colorSpace = THREE.SRGBColorSpace
  return tex
}

const AXIS_COLORS = ["#ff3653", "#0adb50", "#2c8fdf"] as const
const NEG_AXIS_COLORS = ["#942848", "#2d8a47", "#2c5a8f"] as const
const AXIS_LABELS = ["X", "Y", "Z"] as const
const AXIS_DIRS: [number, number, number][] = [[1, 0, 0], [0, 1, 0], [0, 0, 1]]

function AxisGizmoViewport() {
  const textures = React.useMemo(() => ({
    heads: AXIS_COLORS.map((c, i) => makeAxisHeadTexture(c, AXIS_LABELS[i])),
    dots: NEG_AXIS_COLORS.map((c) => makeAxisHeadTexture(c)),
  }), [])

  const lineGeo = React.useMemo(() => {
    const positions = new Float32Array([
      0, 0, 0, 1, 0, 0,
      0, 0, 0, 0, 1, 0,
      0, 0, 0, 0, 0, 1,
    ])
    const colors = new Float32Array([
      1, 0.21, 0.33, 1, 0.21, 0.33,
      0.04, 0.86, 0.31, 0.04, 0.86, 0.31,
      0.17, 0.56, 0.87, 0.17, 0.56, 0.87,
    ])
    const geo = new THREE.BufferGeometry()
    geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3))
    geo.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3))
    return geo
  }, [])

  const headScale = 0.32
  const dotScale = 0.16

  return (
    <group scale={40}>
      <lineSegments geometry={lineGeo}>
        <lineBasicMaterial vertexColors toneMapped={false} />
      </lineSegments>
      {AXIS_DIRS.map((dir, i) => (
        <React.Fragment key={AXIS_LABELS[i]}>
          <sprite position={dir} scale={[headScale, headScale, 1]}>
            <spriteMaterial map={textures.heads[i]} toneMapped={false} />
          </sprite>
          <sprite
            position={[dir[0] * -0.75, dir[1] * -0.75, dir[2] * -0.75]}
            scale={[dotScale, dotScale, 1]}
          >
            <spriteMaterial map={textures.dots[i]} toneMapped={false} />
          </sprite>
        </React.Fragment>
      ))}
    </group>
  )
}

function SceneBackground({ color }: { color: string }) {
  const { scene } = useThree()
  React.useEffect(() => {
    scene.background = new THREE.Color(color)
  }, [color, scene])
  return null
}

function Viewport3D({ bgColor }: { bgColor: string }) {
  return (
    <div className="relative flex flex-1 flex-col">
      <Canvas
        camera={{ position: [6, 4, 6], fov: 45, near: 0.1, far: 1000 }}
        gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1 }}
      >
        <SceneBackground color={bgColor} />
        <ambientLight intensity={0.4} />
        <directionalLight position={[8, 12, 5]} intensity={1} castShadow />
        <directionalLight position={[-4, 6, -3]} intensity={0.3} />
        <Grid
          infiniteGrid
          cellSize={1}
          sectionSize={5}
          cellColor="#444"
          sectionColor="#666"
          fadeDistance={40}
          fadeStrength={1.5}
        />
        <OrbitControls
          makeDefault
          enableDamping
          dampingFactor={0.08}
          minDistance={1}
          maxDistance={100}
          maxPolarAngle={Math.PI / 2 + 0.15}
        />
        <GizmoHelper alignment="bottom-right" margin={[64, 64]}>
          <AxisGizmoViewport />
        </GizmoHelper>
      </Canvas>
    </div>
  )
}

export default function EditorPage() {
  const params = useParams()
  const projectId = params.id as string

  const [scenes, setScenes] = React.useState(MOCK_SCENES)
  const [activeSceneId, setActiveSceneId] = React.useState<string | null>(null)
  const [selectedObjectId, setSelectedObjectId] = React.useState<string | null>(null)
  const [bgColor, setBgColor] = React.useState<HsvColor>({ h: 220, s: 13, v: 12 })

  const clearSelection = React.useCallback(() => {
    setActiveSceneId(null)
    setSelectedObjectId(null)
  }, [])

  const projectNames: Record<string, string> = {
    "1": "民宿公装项目",
    "2": "咖啡厅XR",
    "3": "酒店室内装修协作",
    "4": "别墅家装厨房通院子别墅家装厨房",
  }

  const projectName =
    projectNames[projectId] ?? "D5 Render XR Editor"

  return (
    <div className="flex h-dvh flex-col overflow-hidden bg-[#181a1f]" onClick={clearSelection}>
      <EditorTopBar projectName={projectName} />
      <div className="flex min-h-0 flex-1">
        <div className="flex w-60 shrink-0 flex-col overflow-y-auto border-r border-white/[0.06]">
          <SceneList
            activeId={activeSceneId}
            onActiveChange={(id) => {
              setActiveSceneId(id)
              if (id) setSelectedObjectId(null)
            }}
            scenes={scenes}
            onAddScene={() => {
              const newScene: Scene = {
                id: String(scenes.length + 1),
                name: `Scene ${scenes.length + 1}`,
              }
              setScenes([...scenes, newScene])
            }}
          />
          <ObjectList
            selectedId={selectedObjectId}
            onSelectedChange={(id) => {
              setSelectedObjectId(id)
              if (id) setActiveSceneId(null)
            }}
          />
        </div>
        <Viewport3D bgColor={hsvToHex(bgColor.h, bgColor.s, bgColor.v)} />
        <InspectorPanel
          activeSceneId={activeSceneId}
          selectedObjectId={selectedObjectId}
          scenes={scenes}
          projectName={projectName}
          bgColor={bgColor}
          onBgColorChange={setBgColor}
        />
      </div>
    </div>
  )
}
