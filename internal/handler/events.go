package handler

import (
	"encoding/json"
	"log"
	"net/http"
)

// Handles HTTP requests related to events
type EventHandler struct{}

// NewEventHandler constructs an EventHandler, dependency injection
func NewEventHandler() *EventHandler {
	return &EventHandler{}
}

// List handles GET /api/v1/events
func (h *EventHandler) List(w http.ResponseWriter, r *http.Request) {
	data := map[string]string{
		"message": "events endpoint reached",
	}
	writeJSON(w, http.StatusOK, data)
}

func writeJSON(w http.ResponseWriter, status int, v any) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)

	if err := json.NewEncoder(w).Encode(v); err != nil {
		log.Printf("failed to encode response: %v", err)
	}
}
