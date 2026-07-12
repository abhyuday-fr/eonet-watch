// internal/eonet/client.go
package eonet

import (
	"encoding/json"
	"fmt"
	"net/http"
	"net/url"
	"strconv"
	"time"
)

// client handles all communication with EONET API
type Client struct {
	baseURL    string
	httpClient *http.Client
}

// NewClient constructs a Client with a sensible timeout.
// Never use http.DefaultClient in production as it has no timeout,
// meaning a slow external API can hang your server forever.
func NewClient(baseURL string) *Client {
	return &Client{
		baseURL: baseURL,
		httpClient: &http.Client{
			Timeout: 10 * time.Second,
		},
	}
}

// GetEvents fetches events from EONET with optional filters
func (c *Client) GetEvents(filter EventsFilter) (*EventsResponse, error) {
	endpoint := fmt.Sprintf("%s/events", c.baseURL)

	// url.Values builds query strings safely
	params := url.Values{}

	if filter.Status != "" {
		params.Set("status", filter.Status)
	}
	if filter.Limit > 0 {
		params.Set("limit", strconv.Itoa(filter.Limit))
	}
	if filter.Days > 0 {
		params.Set("days", strconv.Itoa(filter.Days))
	}
	if filter.Category != "" {
		params.Set("category", filter.Category)
	}

	if len(params) > 0 {
		endpoint = fmt.Sprintf("%s?%s", endpoint, params.Encode())
	}

	resp, err := c.httpClient.Get(endpoint)
	if err != nil {
		return nil, fmt.Errorf("eonet: request failed: %w", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("eonet: unexpected status %d", resp.StatusCode)
	}

	var result EventsResponse
	if err := json.NewDecoder(resp.Body).Decode(&result); err != nil {
		return nil, fmt.Errorf("eonet: failed to decode response: %w", err)
	}

	return &result, nil

}
