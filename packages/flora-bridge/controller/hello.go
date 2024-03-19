package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type HelloController struct{}

func NewHelloController() (*HelloController, error) {
	return &HelloController{}, nil
}

func (ctrl *HelloController) Hello(ctx *gin.Context) {
	ctx.AbortWithStatusJSON(http.StatusOK, gin.H{"msg": "Hello, World!"})
}
