import type { Event } from '../types/events'

interface Props {
  event: Event
}

export function EventCard({ event }: Props) {
  const latestGeometry = event.geometry[event.geometry.length - 1]

  return (
    <div className="bg-gray-900 rounded-lg p-4 border border-gray-800 hover:border-gray-600 transition-colors">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h2 className="font-semibold text-white truncate">{event.title}</h2>
          <p className="text-sm text-gray-400 mt-1">
            {event.categories.map(c => c.title).join(', ')}
          </p>
        </div>
        <span className={`shrink-0 text-xs px-2 py-1 rounded-full ${
          event.closed
            ? 'bg-gray-700 text-gray-300'
            : 'bg-green-900 text-green-300'
        }`}>
          {event.closed ? 'Closed' : 'Active'}
        </span>
      </div>

      <div className="flex items-center gap-4 mt-3">
        {latestGeometry && (
          <p className="text-xs text-gray-500">
            Last updated: {new Date(latestGeometry.date).toLocaleDateString()}
          </p>
        )}
        {latestGeometry?.magnitudeValue > 0 && (
          <p className="text-xs text-gray-500">
            {latestGeometry.magnitudeValue} {latestGeometry.magnitudeUnit}
          </p>
        )}
      </div>
    </div>
  )
}
