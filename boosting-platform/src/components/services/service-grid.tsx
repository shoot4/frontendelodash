import { FC } from 'react'
import { Service } from '@/types/service'
import ServiceCard from './service-card'

interface ServiceGridProps {
  services: Service[]
}

const ServiceGrid: FC<ServiceGridProps> = ({ services }) => {
  if (!services || services.length === 0) {
    return (
      <div className="text-center py-10">
        No services available
      </div>
    )
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {services.map((service) => (
        <ServiceCard
          key={service.id}
          title={service.title}
          description={service.description}
          price={service.price}
          image={service.image}
        />
      ))}
    </div>
  )
}

export default ServiceGrid
