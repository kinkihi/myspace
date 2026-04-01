import { redirect } from "next/navigation"

/** 旧链接 /analytics 进入设置壳；团队数据请在应用内点侧边栏「团队数据」。 */
export default function AnalyticsPage() {
  redirect("/settings")
}
