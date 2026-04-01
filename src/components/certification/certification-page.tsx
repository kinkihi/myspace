"use client"

import {
  BookOpenIcon,
  ExternalLinkIcon,
  LaptopIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const LEARN_MORE_URL =
  "https://www.d5render.com/certification/d5-certification-program"
const ABOUT_EXAM_URL =
  "https://www.d5render.com/certification/d5-certified-user"
const ABOUT_INSTRUCTOR_URL =
  "https://www.d5render.com/certification/d5-certified-instructor"

function OutlineLinkButton({
  href,
  children,
  className,
}: {
  href: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex h-6 items-center justify-center gap-1 rounded-md border border-white/[0.06] px-1 text-xs text-white transition-colors hover:bg-white/[0.04]",
        className
      )}
    >
      {children}
      <ExternalLinkIcon className="size-3.5 shrink-0 opacity-80" />
    </a>
  )
}

export function CertificationPage() {
  return (
    <div className="min-h-0 flex-1 bg-[#0c0c0c] pb-10">
      <div className="flex flex-col gap-6 px-10 py-4 md:flex-row md:items-start md:justify-between">
        <div className="max-w-2xl space-y-2">
          <h1 className="text-xl font-semibold tracking-tight text-white">
            D5 Certification
          </h1>
          <p className="text-xs leading-5 text-[#b4b4b4]">
            This Program is designed to help you showcase your skills,
            demonstrate your proficiency, and unlock new opportunities in the
            world.
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="shrink-0"
          nativeButton={false}
          render={
            <a href={LEARN_MORE_URL} target="_blank" rel="noopener noreferrer" />
          }
        >
          Learn More
          <ExternalLinkIcon className="size-4" />
        </Button>
      </div>

      <div className="mx-10 mb-6 rounded-lg bg-white/[0.03] px-10 py-6">
        <div className="mb-6 space-y-2">
          <h2 className="text-sm font-medium text-white">Certifying Criteria</h2>
          <p className="text-xs leading-5 text-[#b4b4b4]">
            We offer different certifications, each with its own evaluation
            criteria
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="flex flex-col gap-4 rounded-xl border border-[#232323] bg-[#191919] p-4">
            <div className="flex size-9 items-center justify-center rounded-lg bg-white/[0.06] p-1.5">
              <BookOpenIcon className="size-5 text-white" />
            </div>
            <div className="space-y-2">
              <h3 className="text-base font-medium text-[#eee]">
                Skill Certification Exam
              </h3>
              <p className="text-xs leading-4 text-[#b4b4b4]">
                Showcase Your Expertise
              </p>
              <OutlineLinkButton href={ABOUT_EXAM_URL}>About Exam</OutlineLinkButton>
            </div>
            <Button
              nativeButton={false}
              className="h-10 w-full rounded-md border-0 text-sm font-medium text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08)] transition-[background-image,box-shadow,filter] duration-300 ease-out !bg-gradient-to-r !from-[#5c35d6] !via-[#7549ff] !to-[#8f5cff] hover:!from-[#6d4ae8] hover:!via-[#9265ff] hover:!to-[#b892ff] hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.14),0_0_28px_rgba(130,85,255,0.45)] hover:brightness-[1.04]"
              render={
                <a href={ABOUT_EXAM_URL} target="_blank" rel="noopener noreferrer" />
              }
            >
              Exam
            </Button>
          </div>

          <div className="flex flex-col gap-4 rounded-xl border border-[#232323] bg-transparent p-4">
            <div className="flex size-9 items-center justify-center rounded-lg bg-white/[0.06] p-1.5">
              <LaptopIcon className="size-5 text-white" />
            </div>
            <div className="space-y-2">
              <h3 className="text-base font-medium text-[#eee]">
                Apply Certified Instructor
              </h3>
              <p className="text-xs leading-4 text-[#b4b4b4]">
                Showcase Your Expertise
              </p>
              <OutlineLinkButton href={ABOUT_INSTRUCTOR_URL}>
                About Instructor
              </OutlineLinkButton>
            </div>
            <Button
              variant="secondary"
              nativeButton={false}
              className="h-10 w-full rounded-md bg-black text-sm font-medium text-white hover:bg-black/90"
              render={
                <a
                  href={ABOUT_INSTRUCTOR_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                />
              }
            >
              Apply
            </Button>
          </div>
        </div>
      </div>

      <div className="mx-10 rounded-lg bg-white/[0.03] px-10 py-6">
        <div className="mb-1 px-1 py-2">
          <h2 className="text-sm font-medium text-white">My Certified</h2>
        </div>
        <div className="w-full">
          <div className="flex border-b border-[#2a2a2a]">
            <div className="flex-1 p-4">
              <span className="text-[13px] font-semibold text-[#b4b4b4]">
                Recorde
              </span>
            </div>
            <div className="w-[90px] p-4">
              <span className="text-[13px] font-semibold text-[#b4b4b4]">
                Option
              </span>
            </div>
          </div>
          <div className="flex flex-col items-center gap-4 py-10">
            <div className="size-[60px] rounded-full bg-white/[0.04]" />
            <p className="text-center text-[13px] text-white/60">
              Your certified will show here
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
