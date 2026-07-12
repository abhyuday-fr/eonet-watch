package handler

import (
	"encoding/json"
	"log"
	"net/http"
	"strconv"

	"github.com/abhyuday-fr/eonet-watch/internal/eonet"
	"github.com/abhyuday-fr/eonet-watch/internal/service"
)

type EventService interface {
	GetEvents(params service.EventsParams) (*eonet.EventsResponse, error)
}

// Handles HTTP requests for events
type EventHandler struct {
	service EventService
}

// NewEventHandler constructs an EventHandler, dependency injection
func NewEventHandler(svc EventService) *EventHandler {
	return &EventHandler{service: svc}
}

// List handles GET /api/v1/events
func (h *EventHandler) List(w http.ResponseWriter, r *http.Request) {

	q := r.URL.Query()

	limit := 50
	if l := q.Get("limit"); l != "" {
		if parsed, err := strconv.Atoi(l); err == nil {
			limit = parsed
		}
	}

	days := 0
	if d := q.Get("days"); d != "" {
		if parsed, err := strconv.Atoi(d); err == nil {
			days = parsed
		}
	}

	params := service.EventsParams{
		Status:   q.Get("status"),
		Category: q.Get("category"),
		Limit:    limit,
		Days:     days,
	}

	result, err := h.service.GetEvents(params)
	if err != nil {
		writeJSON(w, http.StatusBadGateway, map[string]string{
			"error": "failed to fetch events",
		})
		return
	}

	writeJSON(w, http.StatusOK, result)
}

func writeJSON(w http.ResponseWriter, status int, v any) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)

	if err := json.NewEncoder(w).Encode(v); err != nil {
		log.Printf("failed to encode response: %v", err)
	}
}
