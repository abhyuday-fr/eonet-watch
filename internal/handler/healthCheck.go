package handler

import (
	"net/http"
)

type HealthChecker struct{}

func NewHealthChecker() *HealthChecker {
	return &HealthChecker{}
}

// Check handles GET /api/v1/health
func (c *HealthChecker) Check(w http.ResponseWriter, r *http.Request) {
	data := map[string]string{
		"status": "ok",
	}
	writeJSON(w, http.StatusOK, data)

}
