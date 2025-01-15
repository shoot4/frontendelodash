import { FC } from 'react'
import ServiceCard from './service-card'
import { Service } from '@/types/service'

interface ServiceGridProps {
  services: Service[]
}

const ServiceGrid: FC<ServiceGridProps> = ({ services }) => {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {services.map((service) => (
        <ServiceCard
          key={service.id}
          title={service.title}
          features={service.features}
          image={service.image}
          price={service.price}
          isNew={service.isNew}
          isPopular={service.isPopular}
        />
      ))}
    </div>
  )
}

export default ServiceGrid
