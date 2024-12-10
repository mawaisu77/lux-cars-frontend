'use client'

import { useEffect, useState } from 'react'

export default function CircularCountdown({ 
  initialSeconds, 
  onComplete
}) {
  const [seconds, setSeconds] = useState(initialSeconds)
  const [isActive, setIsActive] = useState(true)

  // Calculate the progress percentage
  const progress = (seconds / initialSeconds) * 100
  
  // Generate segments for the circle
  const totalSegments = 40
  const activeSegments = Math.floor((progress / 100) * totalSegments)

  useEffect(() => {
    let interval = null

    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((prev) => {
          if (prev <= 1) {
            setIsActive(false)
            if (onComplete) onComplete()
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isActive, seconds, onComplete])

  // Reset countdown when initialSeconds changes
  useEffect(() => {
    setSeconds(initialSeconds)
    setIsActive(true)
  }, [initialSeconds])

  return (
    <div className="relative w-64 h-64">
      {/* Segments */}
      <div className="absolute inset-0">
        {Array.from({ length: totalSegments }).map((_, index) => {
          const rotation = (index * 360) / totalSegments
          const isActive = index < activeSegments
          
          return (
            <div
              key={index}
              className={`absolute w-1 h-4 origin-bottom left-1/2 -translate-x-1/2 -translate-y-1/2 
                         ${isActive ? 'bg-purple-500' : 'bg-gray-200'}`}
              style={{
                top: '0%',
                transform: `rotate(${rotation}deg) translateY(-140%)`,
                transformOrigin: '50% 140%',
              }}
            />
          )
        })}
      </div>

        <span className="text-3xl font-bold my-2">{initialSeconds}</span>
    </div>
  )
}



