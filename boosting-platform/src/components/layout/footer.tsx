import Link from "next/link"

const footerLinks = {
  services: [
    { label: "Rank Boost", href: "/services/rank-boost" },
    { label: "Coaching", href: "/services/coaching" },
    { label: "Character Training", href: "/services/character-training" }
  ],
  support: [
    { label: "FAQ", href: "/faq" },
    { label: "How It Works", href: "/how-it-works" },
    { label: "Contact", href: "/contact" }
  ],
  legal: [
    { label: "Terms of Service", href: "/terms" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Refund Policy", href: "/refund" }
  ]
}

export function Footer() {
  return (
    <footer className="border-t bg-background/95">
      <div className="container py-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
          {/* Brand Section */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Marvel Rivals Boost</h3>
            <p className="text-sm text-muted-foreground">
              Professional boosting services for Marvel Rivals players.
            </p>
          </div>

          {/* Services Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold">Services</h4>
            <ul className="space-y-2">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold">Support</h4>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold">Legal</h4>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t pt-8">
          <p className="text-sm text-muted-foreground text-center">
            © {new Date().getFullYear()} Marvel Rivals Boost. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
