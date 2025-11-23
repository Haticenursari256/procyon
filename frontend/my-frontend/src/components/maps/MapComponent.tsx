"use client"

import React from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Fix default icon paths for Leaflet (required in many bundlers)
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x.src || (markerIcon2x as unknown as string),
  iconUrl: markerIcon.src || (markerIcon as unknown as string),
  shadowUrl: markerShadow.src || (markerShadow as unknown as string),
})

export type MarkerPoint = {
  lat: number
  lng: number
  label?: string
}

type Props = {
  markers?: MarkerPoint[]
  height?: string
}

export default function MapComponent({
  markers = [
    { lat: 39.9334, lng: 32.8597, label: 'Ankara' },
    { lat: 41.0082, lng: 28.9784, label: 'İstanbul' },
  ],
  height = '420px',
}: Props) {
  const center: [number, number] = [39.9334, 32.8597]
  const zoom = 6

  return (
    <div className="w-full">
      <MapContainer center={center} zoom={zoom} scrollWheelZoom={false} style={{ height, width: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {markers.map((m, idx) => (
          <Marker key={idx} position={[m.lat, m.lng]}>
            <Popup>{m.label || `${m.lat}, ${m.lng}`}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}
