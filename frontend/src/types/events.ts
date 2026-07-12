export interface Category {
  id: string
  title: string
}

export interface Source {
  id: string
  url: string
}

export interface Geometry {
  magnitudeValue: number
  magnitudeUnit: string
  date: string
  type: 'Point' | 'Polygon'
  coordinates: number[] | number[][][]
}

export interface Event {
  id: string
  title: string
  description: string
  link: string
  closed: string | null
  categories: Category[]
  sources: Source[]
  geometry: Geometry[]
}

export interface EventsResponse {
  title: string
  description: string
  link: string
  events: Event[]
}

export interface EventsFilter {
  status?: 'open' | 'closed' | 'all'
  limit?: number
  days?: number
  category?: string
}
