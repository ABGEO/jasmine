package middleware

import (
	"context"
	"errors"
	"fmt"
	"net/http"
	"strings"

	"github.com/abgeo/jasmine/packages/flora-bridge/config"
	"github.com/coreos/go-oidc/v3/oidc"
	"github.com/gin-gonic/gin"
)

var errAuthorizationRequired = errors.New("authorization required")

type Claims struct {
	Sub     string
	Aud     string
	Email   string
	Name    string
	Picture string
}

type AuthMiddleware struct {
	verifier *oidc.IDTokenVerifier
}

func NewAuthMiddleware(conf *config.Config) (*AuthMiddleware, error) {
	ctx := context.Background()

	provider, err := oidc.NewProvider(ctx, conf.OIDC.Issuer)
	if err != nil {
		return nil, fmt.Errorf("unable to create OIDC provider: %w", err)
	}

	return &AuthMiddleware{
		verifier: provider.Verifier(&oidc.Config{ClientID: conf.OIDC.ClientID}),
	}, nil
}

func (mid *AuthMiddleware) Handler() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		claims, _, err := mid.checkAuthHeader(ctx)
		if err != nil {
			ctx.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": err.Error()})

			return
		}

		mid.StoreAuthData(ctx, claims)

		ctx.Next()
	}
}

func (mid *AuthMiddleware) checkAuthHeader(ctx *gin.Context) (Claims, string, error) {
	authHeader := ctx.GetHeader("Authorization")
	if authHeader == "" {
		return Claims{}, "", errAuthorizationRequired
	}

	claims, err := mid.ExtractAuthClaims(ctx, authHeader)
	if err != nil {
		return Claims{}, "", err
	}

	return claims, authHeader, nil
}

func (mid *AuthMiddleware) ExtractAuthClaims(ctx *gin.Context, authHeaderValue string) (Claims, error) {
	claims := Claims{}

	accessToken := strings.TrimPrefix(authHeaderValue, "Bearer ")

	token, err := mid.verifier.Verify(ctx, accessToken)
	if err != nil {
		return claims, fmt.Errorf("unable to verify token : %w", err)
	}

	if err = token.Claims(&claims); err != nil {
		return claims, fmt.Errorf("unable to unmarshal claims : %w", err)
	}

	return claims, nil
}

func (mid *AuthMiddleware) StoreAuthData(ctx *gin.Context, claims Claims) {
	ctx.Set("user_id", claims.Sub)
	ctx.Set("claims", claims)
}
