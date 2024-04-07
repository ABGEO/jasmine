package dto

import "time"

type SensorReading struct {
	Time  time.Time `json:"time"`
	Value any       `json:"value"`
}
