package service

import (
	"fmt"

	"github.com/abhyuday-fr/eonet-watch/internal/cache"
	"github.com/abhyuday-fr/eonet-watch/internal/eonet"
)

// EONETClient defines the behaviour our service needs from the EONET client.
// The service depends on this interface, not the concrete Client struct.
// This means in tests we can pass a fake that implements this interface.

type EONETClient interface {
	GetEvents(filter eonet.EventsFilter) (*eonet.EventsResponse, error)
}

// EventService contains the business logic for events.
// It does not know about HTTP at all.
type EventService struct {
	client EONETClient
	cache  *cache.Cache
}

// NewEventService constructs an EventService with its dependency injected.
func NewEventService(client EONETClient, cache *cache.Cache) *EventService {
	return &EventService{client: client, cache: cache}
}

// EventsParams are the options the handler can pass when requesting events.
// Notice this is separate from eonet.
// EventsFilter the service defines its own input type so it's not coupled to EONET's structure.
type EventsParams struct {
	Status   string
	Limit    int
	Days     int
	Category string
}

func (s *EventService) GetEvents(params EventsParams) (*eonet.EventsResponse, error) {
	// Apply business rule: default to open events if not specified
	if params.Status == "" {
		params.Status = "open"
	}

	// Apply business rule: cap the limit to prevent abuse
	if params.Limit <= 0 || params.Limit > 500 {
		params.Limit = 50
	}

	// Build a cache key from the request parameters
	cacheKey := fmt.Sprintf("events:%s:%d:%d:%s", params.Status, params.Limit, params.Days, params.Category)

	// if Cache Hit, return immediately without calling NASA
	if cached, ok := s.cache.Get(cacheKey); ok {
		return cached.(*eonet.EventsResponse), nil
	}

	// if cache miss, call NASA

	filter := eonet.EventsFilter{
		Status:   params.Status,
		Limit:    params.Limit,
		Days:     params.Days,
		Category: params.Category,
	}

	result, err := s.client.GetEvents(filter)
	if err != nil {
		if stale, ok := s.cache.GetStale(cacheKey); ok {
			return stale.(*eonet.EventsResponse), nil
		}
		return nil, fmt.Errorf("service: failed to get events: %w", err)
	}

	// Store in cache for next time
	s.cache.Set(cacheKey, result)

	return result, nil
}
