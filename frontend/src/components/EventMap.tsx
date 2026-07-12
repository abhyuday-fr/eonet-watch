import { useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import type { Event } from '../types/events'

interface Props {
  events: Event[]
}

function getLatLng(event: Event): [number, number] | null {
  for (let i = event.geometry.length - 1; i >= 0; i--) {
    const geo = event.geometry[i]
    if (geo.type === 'Point' && Array.isArray(geo.coordinates)) {
      const [lon, lat] = geo.coordinates as number[]
      return [lat, lon]
    }
  }
  return null
}

function MagnitudeInfo({ event }: { event: Event }) {
  const geo = event.geometry[event.geometry.length - 1]
  if (!geo || geo.magnitudeValue <= 0) return null
  return (
    <p className="mt-1">
      {geo.magnitudeValue} {geo.magnitudeUnit}
    </p>
  )
}

export function EventMap({ events }: Props) {
  const [isFullscreen, setIsFullscreen] = useState(false)

  const eventsWithCoords = events
    .map(event => ({ event, latlng: getLatLng(event) }))
    .filter((item): item is { event: Event; latlng: [number, number] } =>
      item.latlng !== null
    )

  return (
    <div className={
      isFullscreen
        ? 'fixed inset-0 z-[1000] bg-gray-950'
        : 'relative rounded-lg overflow-hidden'
    }>
      <MapContainer
        center={[20, 0]}
        zoom={2}
        style={{ height: isFullscreen ? '100vh' : '450px', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        {eventsWithCoords.map(({ event, latlng }) => (
          <Marker key={event.id} position={latlng}>
            <Popup>
              <div className="text-sm">
                <p className="font-semibold">{event.title}</p>
                <p className="text-gray-500">
                  {event.categories.map(c => c.title).join(', ')}
                </p>
                <MagnitudeInfo event={event} />
                
                  <a href={event.link}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-500 hover:underline mt-1 block"
                >
                  View on EONET →
                </a>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Fullscreen toggle button — sits on top of the map */}
      <button
        onClick={() => setIsFullscreen(prev => !prev)}
        className="absolute top-2 right-2 z-[1000] bg-white text-gray-800 rounded px-2 py-1 text-xs font-medium shadow hover:bg-gray-100 transition-colors"
      >
        {isFullscreen ? '✕ Exit' : '⛶ Fullscreen'}
      </button>
    </div>
  )
}
