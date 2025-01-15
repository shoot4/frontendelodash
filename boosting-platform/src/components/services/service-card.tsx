import { FC } from 'react'
import { Button } from '../ui/button'
import { Service } from '@/types/service'
import { formatRank } from '@/lib/ranks'
import RankIcon from '../ranks/rank-icon'
import { rankUtils } from '@/lib/rank-utils'
import PriceCalculator from './price-calculator'

interface ServiceCardProps extends Omit<Service, 'id' | 'description' | 'category'> {}

const ServiceCard: FC<ServiceCardProps> = ({
  title,
  features,
  image,
  price,
  isNew,
  isPopular,
  fromRank,
  toRank,
  estimatedTime
}) => {
  const handlePurchase = (options: {
    urgentService: boolean
    withCoaching: boolean
    offlineMode: boolean
    streamingRights: boolean
  }) => {
    // Implement purchase logic
    console.log('Purchase with options:', options)
  }

  return (
    <div className="relative rounded-lg bg-gray-800 p-6 shadow-lg transition-transform hover:scale-105">
      {(isNew || isPopular) && (
        <div className="absolute -top-2 right-4 rounded-full bg-primary px-4 py-1 text-sm font-bold text-white">
          {isNew ? 'New' : 'Popular'}
        </div>
      )}
      
      <img 
        src={image} 
        alt={title}
        className="mb-4 h-48 w-full rounded-lg object-cover"
      />
      
      <h3 className="mb-4 text-xl font-bold text-white">{title}</h3>
      
      {fromRank && toRank && (
        <PriceCalculator
          fromRank={fromRank}
          toRank={toRank}
          onPurchase={handlePurchase}
        />
      )}

      <ul className="mb-6 space-y-2">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center text-gray-300">
            <svg
              className="mr-2 h-4 w-4 text-primary"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M5 13l4 4L19 7" />
            </svg>
            {feature}
          </li>
        ))}
      </ul>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-white">${price}</span>
          <span className="text-sm text-gray-400">{estimatedTime}</span>
        </div>
        
        <Button
          onClick={handlePurchase}
          className="w-full bg-primary hover:bg-primary/90"
        >
          Buy Now
        </Button>
      </div>
    </div>
  )
}

export default ServiceCard
