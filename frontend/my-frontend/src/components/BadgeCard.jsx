import React from 'react'
import PropTypes from 'prop-types'

export default function BadgeCard({ icon: Icon, title, subtitle, reward }) {
  return (
    <div className="flex items-center gap-4 rounded-lg p-4 bg-white/5 shadow-card">
      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center text-white">
        {Icon ? <Icon size={20} /> : <span className="font-bold">🏆</span>}
      </div>
      <div>
        <div className="text-sm font-semibold">{title}</div>
        <div className="text-xs text-gray-300">{subtitle}</div>
      </div>
      <div className="ml-auto text-sm font-semibold text-white">{reward}</div>
    </div>
  )
}

BadgeCard.propTypes = {
  icon: PropTypes.any,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  reward: PropTypes.string,
}
