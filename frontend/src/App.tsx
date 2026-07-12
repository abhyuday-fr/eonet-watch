import { useState } from 'react'
import { useEvents } from './hooks/useEvents'
import { EventList } from './components/EventList'
import { EventMap } from './components/EventMap'
import { FilterBar } from './components/FilterBar'
import { Footer } from './components/Footer'
import { getCategoryBackground } from './hooks/useCategoryBackground'
import type { EventsFilter } from './types/events'

export default function App() {
  const [filter, setFilter] = useState<EventsFilter>({
    status: 'open',
    limit: 50,
  })

  const { data, isLoading, error } = useEvents(filter)
  const bgImage = getCategoryBackground(filter.category)

  return (
    <div className="min-h-screen flex flex-col relative">

      {/* Background image layer */}
      <div
        key={bgImage}
        className="fixed inset-0 z-0 bg-cover bg-center transition-opacity duration-700"
        style={{ backgroundImage: `url(${bgImage})` }}
      />

      {/* Dark overlay */}
      <div
        className="fixed inset-0 z-0"
        style={{
          background: ['snow', 'seaLakeIce'].includes(filter.category ?? '')
            ? 'rgba(2, 8, 16, 0.88)'
            : ['earthquakes', 'floods', 'landslides', 'dustHaze'].includes(filter.category ?? '')
            ? 'rgba(2, 8, 16, 0.82)'
            : 'rgba(2, 8, 16, 0.75)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col min-h-screen">

        <header
          style={{
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            background: 'rgba(15, 23, 60, 0.4)',
          }}
          className="border-b border-blue-900/40 px-8 py-5"
        >
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🌍</span>
              <div>
                <h1 className="text-xl font-bold text-blue-50 tracking-wide">
                  EONET Watch
                </h1>
                <p className="text-xs text-blue-400/70 mt-0.5">
                  Earth Natural Event Tracker
                </p>
              </div>
            </div>
            <span className="inline-flex items-center gap-1.5 text-xs text-green-400 bg-green-950/50 border border-green-900 px-2.5 py-1 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              Live
            </span>
          </div>
        </header>

        <main className="flex-1 max-w-4xl mx-auto w-full px-8 py-6">
          <div className="flex items-center justify-between mb-4">
            <p className="text-blue-400/70 text-sm">
              {isLoading ? 'Loading events...' : data
                ? `${data.events.length} events tracked`
                : ''}
            </p>
          </div>

          <FilterBar filter={filter} onChange={setFilter} />

          {data && data.events.length > 0 && (
            <div className="mb-8">
              <EventMap events={data.events} />
            </div>
          )}

          <EventList
            events={data?.events ?? []}
            isLoading={isLoading}
            error={error}
          />
        </main>

        <Footer />
      </div>
    </div>
  )
}
