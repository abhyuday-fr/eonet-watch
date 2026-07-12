package main

import (
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/abhyuday-fr/eonet-watch/internal/cache"
	"github.com/abhyuday-fr/eonet-watch/internal/config"
	"github.com/abhyuday-fr/eonet-watch/internal/eonet"
	"github.com/abhyuday-fr/eonet-watch/internal/handler"
	"github.com/abhyuday-fr/eonet-watch/internal/middleware"
	"github.com/abhyuday-fr/eonet-watch/internal/service"
	"github.com/go-chi/chi/v5"
	chimiddleware "github.com/go-chi/chi/v5/middleware"
	"github.com/joho/godotenv"
)

func main() {
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found, reading from environment")
	}

	cfg, err := config.Load()
	if err != nil {
		log.Fatalf("Failed to load config: %v", err)
	}

	// Build the dependency chain: client → service → handler
	eonetClient := eonet.NewClient(cfg.EONETBaseURL)
	eventCache := cache.New(5 * time.Minute) // cache responses for 5 minutes
	eventService := service.NewEventService(eonetClient, eventCache)
	eventHandler := handler.NewEventHandler(eventService)

	r := chi.NewRouter()
	r.Use(chimiddleware.Logger)
	r.Use(chimiddleware.Recoverer)
	r.Use(middleware.CORS(cfg.AllowedOrigins))

	r.Get("/api/v1/events", eventHandler.List)

	healthChecker := handler.NewHealthChecker()
	r.Get("/api/v1/health", healthChecker.Check)

	addr := fmt.Sprintf(":%d", cfg.Port)
	log.Printf("Server listening on %s", addr)

	if err := http.ListenAndServe(addr, r); err != nil {
		log.Fatalf("Server failed: %v", err)
	}
}
