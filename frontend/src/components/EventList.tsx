import { EventCard } from './EventCard'
import type { Event } from '../types/events'

interface Props {
  events: Event[]
  isLoading: boolean
  error: Error | null
}

export function EventList({ events, isLoading, error }: Props) {
  if (isLoading) return (
    <div className="space-y-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="backdrop-blur-md bg-blue-950/30 rounded-lg p-4 border border-blue-900/40 animate-pulse">
          <div className="h-4 bg-gray-700 rounded w-3/4 mb-2" />
          <div className="h-3 bg-gray-800 rounded w-1/4" />
        </div>
      ))}
    </div>
  )

  if (error) return (
    <div className="bg-red-950 border border-red-800 rounded-lg p-4">
      <p className="text-red-400 text-sm">Server Issue, please try again in a few seconds.</p>
    </div>
  )

  if (events.length === 0) return (
    <p className="text-gray-500 text-sm">No events found for the current filters.</p>
  )

  return (
    <div className="space-y-4">
      {events.map(event => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  )
}
