import Link from "next/link"
import Navigation from "./navigation"

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-primary">
            GameBoost
          </span>
        </Link>

        {/* Navigation */}
        <Navigation />
      </div>
    </header>
  )
}

export default Header
