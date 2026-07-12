# 🗺  EONET Watch

<img src="frontend/public/favicon.svg" width="90" height="90">

A production-grade Earth natural events dashboard
Real-time tracking of wildfires, storms, volcanoes, earthquakes, and more.. powered by NASA's EONET API.

# Demo video
![Demo video](demo.mp4)

# Build and run
1. Clone the repository
```
  git clone https://github.com/abhyuday-fr/eonet-watch.git
  cd eonet-watch
```

2. Copy the environment config
```
  cp .env.example .env
```

3. Run the Go server
```
  go run cmd/server/main.go
```

The API will be available at `http://localhost:8080`

4. Frontend
```
  cd frontend
  npm install
  npm run dev
```

## Overview
EONET Watch is a full-stack web application that tracks natural events across Earth in real time.
It fetches live data from [NASA's Earth Observatory Natural Event Tracker (EONET) API](https://eonet.gsfc.nasa.gov/) and presents it through an interactive world map and filterable event list.

Built as a learning project with a focus on production-quality architecture.

## Features

- Interactive world map with event location pins and popups
- Filter by category: wildfires, severe storms, volcanoes, earthquakes, floods, landslides, snow, sea & lake ice, dust & haze
- Filter by status: active, closed, or all events
- Filter by time range: last 7, 30, 90 days, or all time
- Dynamic backgrounds: category-specific imagery that transitions on filter change
- Server-side caching with stale-while-revalidate fallback — ~10,000x speedup on cache hits
- Fullscreen map toggle
- Skeleton loading states for perceived performance
- Earth-themed UI with glassmorphism cards


