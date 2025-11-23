import React from 'react'
import { FiMap, FiClock } from 'react-icons/fi'
import PropTypes from 'prop-types'

export default function TourCard({ title, location, description, duration = '3 gün', price = '450 XLM', onBuy }) {
  return (
    <div className="max-w-sm rounded-xl bg-white/5 p-6 shadow-card backdrop-blur-sm">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-sm text-gray-300 flex items-center gap-2 mt-1"><FiMap /> {location}</p>
        </div>
        <div className="text-right text-sm text-gray-400">
          <div className="flex items-center gap-2 justify-end">
            <FiClock /> <span>{duration}</span>
          </div>
          <div className="mt-2 font-bold text-white">{price}</div>
        </div>
      </div>

      <p className="mt-4 text-sm text-gray-300">{description}</p>

      <div className="mt-6 flex justify-end">
        <button
          onClick={onBuy}
          className="px-4 py-2 rounded-md text-white bg-gradient-to-r from-red-500 to-red-600 shadow-md hover:opacity-95"
        >
          Satın Al
        </button>
      </div>
    </div>
  )
}

TourCard.propTypes = {
  title: PropTypes.string.isRequired,
  location: PropTypes.string,
  description: PropTypes.string,
  duration: PropTypes.string,
  price: PropTypes.string,
  onBuy: PropTypes.func,
}
