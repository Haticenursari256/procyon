import React from 'react'

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="loader mb-4">⏳</div>
        <div>Yükleniyor...</div>
      </div>
    </div>
  )
}
