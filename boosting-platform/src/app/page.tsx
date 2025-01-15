import Hero from "@/components/layout/hero"
import ServiceGrid from "@/components/services/service-grid"

// Import the mock services data
import { services } from "./services/page"

export default function Home() {
  return (
    <>
      <Hero />
      <section className="container py-16">
        <ServiceGrid services={services} />
      </section>
    </>
  )
}
