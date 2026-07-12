import type { Event } from '../types/events'

interface Props {
  event: Event
}

const CATEGORY_COLORS: Record<string, string> = {
  wildfires:    'text-orange-400',
  severeStorms: 'text-yellow-400',
  volcanoes:    'text-red-400',
  seaLakeIce:   'text-cyan-400',
  earthquakes:  'text-amber-400',
  floods:       'text-blue-400',
  landslides:   'text-stone-400',
  snow:         'text-slate-300',
  dustHaze:     'text-yellow-600',
}

const CATEGORY_ICONS: Record<string, string> = {
  wildfires:    '🔥',
  severeStorms: '⛈️',
  volcanoes:    '🌋',
  seaLakeIce:   '🧊',
  earthquakes:  '🫨',
  floods:       '🌊',
  landslides:   '⛰️',
  snow:         '❄️',
  dustHaze:     '🌫️',
}

export function EventCard({ event }: Props) {
  const latestGeometry = event.geometry[event.geometry.length - 1]
  const categoryId = event.categories[0]?.id ?? ''
  const colorClass = CATEGORY_COLORS[categoryId] ?? 'text-blue-400'
  const icon = CATEGORY_ICONS[categoryId] ?? '🌍'

  return (
  <div
  style={{
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    background: 'rgba(15, 23, 60, 0.35)',
  }}
  className="rounded-lg p-4 border border-blue-900/40 hover:border-blue-700/60 transition-all duration-200"
>
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3 min-w-0">
          <span className="text-xl mt-0.5 shrink-0">{icon}</span>
          <div className="min-w-0">
            <h2 className="font-semibold text-blue-50 truncate">{event.title}</h2>
            <p className={`text-sm mt-0.5 ${colorClass}`}>
              {event.categories.map(c => c.title).join(', ')}
            </p>
          </div>
        </div>
        <span className={`shrink-0 text-xs px-2 py-1 rounded-full border ${
          event.closed
            ? 'bg-slate-900 border-slate-700 text-slate-400'
            : 'bg-green-950 border-green-800 text-green-400'
        }`}>
          {event.closed ? 'Closed' : 'Active'}
        </span>
      </div>

      <div className="flex items-center gap-4 mt-3 ml-9">
        {latestGeometry && (
          <p className="text-xs text-blue-400/60">
            {new Date(latestGeometry.date).toLocaleDateString('en-US', {
              month: 'short', day: 'numeric', year: 'numeric'
            })}
          </p>
        )}
        {latestGeometry?.magnitudeValue > 0 && (
          <p className="text-xs text-blue-400/60">
            {latestGeometry.magnitudeValue} {latestGeometry.magnitudeUnit}
          </p>
        )}
      </div>
    </div>
  )
}
