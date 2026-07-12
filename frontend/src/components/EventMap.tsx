import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import type { Event } from '../types/events'

interface Props {
  events: Event[]
}

// Extract the most recent Point coordinate from an event
function getLatLng(event: Event): [number, number] | null {
  // Iterate from most recent geometry backwards
  for (let i = event.geometry.length - 1; i >= 0; i--) {
    const geo = event.geometry[i]
    if (geo.type === 'Point' && Array.isArray(geo.coordinates)) {
      const [lon, lat] = geo.coordinates as number[]
      // GeoJSON is [longitude, latitude] — Leaflet wants [latitude, longitude]
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
  const eventsWithCoords = events
    .map(event => ({ event, latlng: getLatLng(event) }))
    .filter((item): item is { event: Event; latlng: [number, number] } =>
      item.latlng !== null
    )

  return (
    <MapContainer
      center={[20, 0]}
      zoom={2}
      className="w-full h-[450px] rounded-lg overflow-hidden"
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
      <p className="text-gray-500">{event.categories.map(c => c.title).join(', ')}</p>
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
  )
}
