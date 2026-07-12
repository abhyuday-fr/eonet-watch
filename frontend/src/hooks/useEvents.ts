import { useQuery } from '@tanstack/react-query'
import { fetchEvents } from '../api/events'
import type { EventsFilter } from '../types/events'

export function useEvents(filter: EventsFilter = {}) {
  return useQuery({
    // Query key — React Query refetches when this changes
    queryKey: ['events', filter],
    queryFn: () => fetchEvents(filter),
    staleTime: 5 * 60 * 1000, // 5 minutes — matches our backend cache TTL
  })
}
