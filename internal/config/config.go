package config

import (
	"fmt"
	"os"
	"strconv"
	"strings"
)

type Config struct {
	Port           int
	EONETBaseURL   string
	AllowedOrigins []string
}

func Load() (*Config, error) {
	portStr := os.Getenv("PORT")
	if portStr == "" {
		portStr = "8080"
	}

	port, err := strconv.Atoi(portStr)
	if err != nil {
		return nil, fmt.Errorf("invalid PORT value %q : %w", portStr, err)
	}

	eonetURL := os.Getenv("EONET_BASE_URL")
	if eonetURL == "" {
		return nil, fmt.Errorf("EONET_BASE_URL is required but not set")
	}

	origins := os.Getenv("ALLOWED_ORIGINS")
	if origins == "" {
		origins = "http://localhost:5173"
	}

	return &Config{
		Port:           port,
		EONETBaseURL:   eonetURL,
		AllowedOrigins: strings.Split(origins, ","),
	}, nil
}
