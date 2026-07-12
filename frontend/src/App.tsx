import { useState } from 'react'
import { useEvents } from './hooks/useEvents'
import { EventList } from './components/EventList'
import type { EventsFilter } from './types/events'
import { FilterBar } from './components/FilterBar'
import { EventMap } from './components/EventMap'

export default function App() {
  const [filter, setFilter] = useState<EventsFilter>({
    status: 'open',
    limit: 50,
  })

  const { data, isLoading, error } = useEvents(filter)

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <header className="border-b border-gray-800 px-8 py-4">
        <h1 className="text-2xl font-bold">EONET Watch</h1>
        <p className="text-gray-400 text-sm mt-1">
          NASA Earth Observatory Natural Event Tracker
        </p>
      </header>

      <main className="max-w-4xl mx-auto px-8 py-6">
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-400 text-sm">
            {data ? `${data.events.length} events` : '—'}
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
    </div>
  )
}

