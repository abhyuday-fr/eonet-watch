import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './index.css'
import App from './App.tsx'
import 'leaflet/dist/leaflet.css'
import './utils/leaflet'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,           // retry failed requests once
      refetchOnWindowFocus: false,  // don't refetch just because user switched tabs
    },
  },
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>,
)
