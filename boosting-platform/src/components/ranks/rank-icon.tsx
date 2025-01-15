import { FC } from 'react'
import { Rank } from '@/lib/ranks'
import Image from 'next/image'

interface RankIconProps {
  rank: Rank
  size?: 'sm' | 'md' | 'lg'
  showLabel?: boolean
}

const RankIcon: FC<RankIconProps> = ({
  rank,
  size = 'md',
  showLabel = false,
}) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-16 h-16'
  }

  // This will be replaced with actual rank icons
  const getRankIconPath = (rank: Rank): string => {
    return `/ranks/${rank.tier.toLowerCase()}${rank.division ? `-${rank.division.toLowerCase()}` : ''}.png`
  }

  return (
    <div className="flex items-center gap-2">
      <div className={`relative ${sizeClasses[size]}`}>
        {/* Placeholder until we have actual icons */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gray-700 to-gray-900" />
        {/* This Image component will be used once we have the actual icons */}
        {/*
        <Image
          src={getRankIconPath(rank)}
          alt={`${rank.tier}${rank.division ? ` ${rank.division}` : ''} Rank`}
          fill
          className="object-contain"
        />
        */}
        <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white">
          {rank.tier.charAt(0)}
          {rank.division}
        </div>
      </div>
      
      {showLabel && (
        <span className="text-sm font-medium text-white">
          {rank.tier} {rank.division}
        </span>
      )}
    </div>
  )
}

export default RankIcon 