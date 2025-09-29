import * as React from "react"
import styles from "@/components/Header/DesktopNavigation/Login/Login.module.css"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
type LoginProps = {
  className?: string;
};
export function Login({ className }: LoginProps) {
  return (
    <Select>
      <SelectTrigger className={`${styles.login_button} py-3 ${className ?? ""}`}>
        <SelectValue placeholder="Login" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="apple">Log Out</SelectItem>
          <SelectItem value="banana">Sign In</SelectItem>
          <SelectItem value="blueberry">Sign Out</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
