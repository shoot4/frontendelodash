"use client"

import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "../ui/button"

const Navigation = () => {
  const pathname = usePathname()
  
  const routes = [
    {
      href: "/",
      label: "Home",
    },
    {
      href: "/services",
      label: "Services",
    },
    {
      href: "/about",
      label: "About",
    },
    {
      href: "/contact",
      label: "Contact",
    },
  ]

  return (
    <nav className="flex items-center space-x-6">
      {/* Main Navigation */}
      <div className="hidden md:flex items-center space-x-6">
        {routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              pathname === route.href
                ? "text-primary"
                : "text-muted-foreground"
            )}
          >
            {route.label}
          </Link>
        ))}
      </div>

      {/* Auth Buttons */}
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="sm">
          Sign In
        </Button>
        <Button size="sm">Sign Up</Button>
      </div>
    </nav>
  )
}

export default Navigation
