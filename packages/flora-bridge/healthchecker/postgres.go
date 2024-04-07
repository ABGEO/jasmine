package healthchecker

import (
	"fmt"

	"github.com/tavsec/gin-healthcheck/checks"
	"gorm.io/gorm"
)

func NewPostgresHealthChecker(database *gorm.DB) (*checks.SqlCheck, error) {
	db, err := database.DB()
	if err != nil {
		return nil, fmt.Errorf("unable to get database instance: %w", err)
	}

	return &checks.SqlCheck{Sql: db}, nil
}
