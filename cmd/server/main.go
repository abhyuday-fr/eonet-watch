package main

import (
	"fmt"
	"log"
	"os"

	"github.com/abhyuday-fr/eonet-watch/internal/config"
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

	fmt.Printf("EONET Watch starting on port %d\n", cfg.Port)
	fmt.Printf("EONET API: %s\n", cfg.EONETBaseURL)
}
