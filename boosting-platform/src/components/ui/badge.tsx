import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        outline: "text-foreground",
        // Game-specific variants
        vanguard: "border-blue-500/20 bg-blue-500/10 text-blue-500 hover:bg-blue-500/20",
        duelist: "border-red-500/20 bg-red-500/10 text-red-500 hover:bg-red-500/20",
        strategist: "border-green-500/20 bg-green-500/10 text-green-500 hover:bg-green-500/20",
        // Status variants
        new: "border-purple-500/20 bg-purple-500/10 text-purple-500",
        popular: "border-yellow-500/20 bg-yellow-500/10 text-yellow-500",
        // Rank variants for displaying current/target ranks
        bronze: "border-amber-600/20 bg-amber-600/10 text-amber-600",
        silver: "border-slate-400/20 bg-slate-400/10 text-slate-400",
        gold: "border-yellow-400/20 bg-yellow-400/10 text-yellow-400",
        platinum: "border-cyan-400/20 bg-cyan-400/10 text-cyan-400",
        diamond: "border-blue-400/20 bg-blue-400/10 text-blue-400",
        grandmaster: "border-purple-400/20 bg-purple-400/10 text-purple-400",
        celestial: "border-red-400/20 bg-red-400/10 text-red-400",
        eternity: "border-orange-400/20 bg-orange-400/10 text-orange-400",
        oneaboveall: "border-white/20 bg-white/10 text-white",
      },
      size: {
        default: "px-2.5 py-0.5 text-xs",
        sm: "px-2 py-0.5 text-[10px]",
        lg: "px-3 py-1 text-sm",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant, size }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
