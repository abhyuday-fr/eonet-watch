package main

import (
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/abhyuday-fr/eonet-watch/internal/config"
	"github.com/abhyuday-fr/eonet-watch/internal/handler"
	"github.com/go-chi/chi/v5"
	chimiddleware "github.com/go-chi/chi/v5/middleware"
	"github.com/joho/godotenv"
)

func main() {
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found, reading from Environment")
	}

	cfg, err := config.Load()
	if err != nil {
		log.Fatalf("Failed to load config: %v", err)
		os.Exit(1)
	}

	r := chi.NewRouter()

	r.Use(chimiddleware.Logger)    // logs every request
	r.Use(chimiddleware.Recoverer) // catches panics, returns 500 instead of crashing

	// wire up handlers
	eventHandler := handler.NewEventHandler()
	r.Get("/api/v1/events", eventHandler.List)

	healthChecker := handler.NewHealthChecker()
	r.Get("/api/v1/health", healthChecker.Check)

	addr := fmt.Sprintf(":%d", cfg.Port)
	log.Printf("Server listening on %s", addr)

	if err := http.ListenAndServe(addr, r); err != nil {
		log.Fatalf("Server failed: %v", err)
	}

}
