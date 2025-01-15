import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface ServiceCardProps {
  title: string
  description: string
  price: string
  image: string
  href: string
}

export function ServiceCard({
  title,
  description,
  price,
  image,
  href,
}: ServiceCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <Link href={href}>
        <div className="relative aspect-[16/9] w-full">
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-background/0 z-10" />
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
            priority={false}
          />
        </div>
        <CardHeader>
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">{title}</h3>
            <p className="text-sm font-medium text-primary">{price}</p>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">{description}</p>
        </CardContent>
        <CardFooter>
          <Button className="w-full" variant="secondary">
            Learn More
            <span className="sr-only">Learn more about {title}</span>
          </Button>
        </CardFooter>
      </Link>
    </Card>
  )
}
