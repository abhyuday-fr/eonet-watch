// internal/eonet/types.go
package eonet

import "time"

// EcentsResponse is the top-level response from GET api/v3/events
type EventsResponse struct {
	Title       string  `json:"title"`
	Description string  `json:"description"`
	Link        string  `json:"link"`
	Events      []Event `json:"events"`
}

// Event represents a single natural event from EONET
type Event struct {
	ID          string     `json:"id"`
	Title       string     `json:"title"`
	Description string     `json:"description"`
	Link        string     `json:"link"`
	Closed      *time.Time `json:"closed"` // pointer because it can be null
	Categories  []Category `json:"categories"`
	Sources     []Source   `json:"sources"`
	Geometry    []Geometry `json:"geometry"`
}

// Category is the type of natural event
type Category struct {
	ID    string `json:"id"`
	Title string `json:"title"`
}

// Source is a reference to external information about the event
type Source struct {
	ID  string `json:"id"`
	URL string `json:"url"`
}

// Geometry pairs a date/time with a location
type Geometry struct {
	MagnitudeValue float64   `json:"magnitudeValue"`
	MagnitudeUnit  string    `json:"magnitudeUnit"`
	Date           time.Time `json:"date"`
	Type           string    `json:"type"`        // "Point" or "Polygon"
	Coordinates    any       `json:"coordinates"` // varies by type
}

// EventsFilter holds optional query parameters for filtering events
type EventsFilter struct {
	Status   string // "open", "closed", "all"
	Limit    int
	Days     int
	Category string
}
