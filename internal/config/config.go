package config

import (
	"fmt"
	"os"
	"strconv"
)

type Config struct {
	Port         int
	EONETBaseURL string
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

	return &Config{
		Port:         port,
		EONETBaseURL: eonetURL,
	}, nil
}
