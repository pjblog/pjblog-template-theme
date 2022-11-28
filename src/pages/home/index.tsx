import { useThemeConfigs } from "@pjblog/hooks"
import { ThemeConfigs } from "../../utils";

export default function HomePage() {
  const themeConfigs = useThemeConfigs<ThemeConfigs>();
  return <div>success, theme configs: {
    JSON.stringify(themeConfigs || {})  
  }</div>
}