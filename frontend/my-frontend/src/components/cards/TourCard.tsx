"use client"

/* eslint-disable no-unused-vars */
import React from 'react'

export interface TourData {
  title: string
  location: string
  duration: number
  price: number
  description: string
  icon: string // emoji or image path
}

type Props = {
  tour: TourData
  onBuy?: (tour: TourData) => void
}

export default function TourCard({ tour, onBuy }: Props) {
  const { title, location, duration, price, description, icon } = tour

  const renderIcon = () => {
    if (!icon) return <div className="w-10 h-10 rounded-full bg-white/6 flex items-center justify-center">🏷️</div>

    // If icon looks like an emoji (1-3 chars), render as text, otherwise render an <img>
    if (Array.from(icon).length <= 2) {
      return (
        <div className="w-10 h-10 rounded-full bg-white/6 flex items-center justify-center text-xl">{icon}</div>
      )
    }

    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={icon} alt={title} className="w-10 h-10 rounded-full object-cover" />
    )
  }

  return (
    <article className="flex flex-col justify-between rounded-xl bg-white/5 p-4 shadow-card h-full">
      <div>
        <div className="flex items-center gap-3">
          {renderIcon()}
          <div>
            <h3 className="text-lg font-semibold">{title}</h3>
            <div className="text-sm text-white/80">{location}</div>
          </div>
        </div>

        <p className="mt-3 text-sm text-white/70">{description}</p>
      </div>

      <div className="mt-4 flex items-center justify-between gap-4">
        <div className="text-sm text-white/80">{duration} gün</div>
        <div className="text-lg font-bold text-white">{price} XLM</div>
      </div>

      <button
        onClick={() => onBuy && onBuy(tour)}
        className="mt-4 w-full rounded-md px-4 py-2 text-white bg-gradient-to-r from-red-500 to-red-600 hover:opacity-95"
        aria-label={`Satın al ${title}`}
      >
        Satın Al
      </button>
    </article>
  )
}
