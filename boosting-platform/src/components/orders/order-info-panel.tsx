import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { 
  Clock, 
  Calendar,
  Trophy,
  Target,
  AlertCircle,
  CheckCircle2,
  Timer
} from "lucide-react"

interface OrderInfoPanelProps {
  orderId: string
  orderStatus: string
  orderType: string
  customerName: string
  boosterName: string
  startRank: string
  targetRank: string
  progress: number
  estimatedTime: string
  startDate: Date
  lastActive: Date
  specialRequirements?: string[]
}

export function OrderInfoPanel({
  orderId,
  orderStatus,
  orderType,
  customerName,
  boosterName,
  startRank,
  targetRank,
  progress,
  estimatedTime,
  startDate,
  lastActive,
  specialRequirements = []
}: OrderInfoPanelProps) {
  return (
    <div className="space-y-6 p-6">
      {/* Order Status */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="font-medium">Order Status</h3>
          <Badge variant={
            orderStatus === "In Progress" ? "default" :
            orderStatus === "Completed" ? "success" :
            "secondary"
          }>
            {orderStatus}
          </Badge>
        </div>
        <Progress value={progress} className="h-2" />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>{startRank}</span>
          <span>{targetRank}</span>
        </div>
      </div>

      {/* Order Details */}
      <div className="grid gap-4">
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2">
                <Trophy className="h-4 w-4 text-primary" />
                <span className="font-medium">Service Type</span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{orderType}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2">
                <Timer className="h-4 w-4 text-primary" />
                <span className="font-medium">Estimated Time</span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{estimatedTime}</p>
            </CardContent>
          </Card>
        </div>

        {/* Participants */}
        <Card>
          <CardContent className="pt-6 space-y-4">
            <h4 className="font-medium">Participants</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium">Customer</p>
                <p className="text-sm text-muted-foreground">{customerName}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Booster</p>
                <p className="text-sm text-muted-foreground">{boosterName}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Timestamps */}
        <Card>
          <CardContent className="pt-6 space-y-4">
            <h4 className="font-medium">Timeline</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span>Start Date</span>
                </div>
                <span className="text-muted-foreground">
                  {startDate.toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" />
                  <span>Last Active</span>
                </div>
                <span className="text-muted-foreground">
                  {lastActive.toLocaleDateString()}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Special Requirements */}
        {specialRequirements.length > 0 && (
          <Card>
            <CardContent className="pt-6 space-y-4">
              <h4 className="font-medium">Special Requirements</h4>
              <ul className="space-y-2">
                {specialRequirements.map((req, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    {req}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}