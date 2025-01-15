import Link from "next/link"
import { Button } from "../ui/button"

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t bg-background">
      <div className="container py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-primary">GameBoost</h3>
            <p className="text-sm text-muted-foreground">
              Professional game boosting services for Marvel Rivals players.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 text-sm font-semibold">Quick Links</h4>
            <ul className="space-y-2">
              {["Home", "Services", "About", "Contact"].map((item) => (
                <li key={item}>
                  <Link 
                    href={`/${item.toLowerCase()}`}
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="mb-4 text-sm font-semibold">Legal</h4>
            <ul className="space-y-2">
              {["Privacy Policy", "Terms of Service", "Refund Policy"].map((item) => (
                <li key={item}>
                  <Link 
                    href={`/${item.toLowerCase().replace(/ /g, "-")}`}
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="mb-4 text-sm font-semibold">Stay Updated</h4>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Subscribe to our newsletter for updates and exclusive offers.
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                />
                <Button size="sm">Subscribe</Button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 border-t pt-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-muted-foreground">
              © {currentYear} GameBoost. All rights reserved.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {["Twitter", "Discord", "GitHub"].map((social) => (
                <Button key={social} variant="ghost" size="sm">
                  {social}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
