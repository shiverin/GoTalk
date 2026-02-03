# Build stage
FROM golang:1.25.5-alpine AS builder

# Install gcc for CGO (required for SQLite)
RUN apk add --no-cache gcc musl-dev

WORKDIR /app

# Copy go mod files
COPY go.mod go.sum ./
RUN go mod download

# Copy source code
COPY . .

# Build the application with CGO enabled for SQLite
RUN CGO_ENABLED=1 GOOS=linux go build -o main ./cmd/api

# Runtime stage
FROM alpine:latest

# Install SQLite runtime dependencies
RUN apk add --no-cache libc6-compat

WORKDIR /app

# Copy the binary from builder
COPY --from=builder /app/main .

# Create directory for database
RUN mkdir -p /app/data

# Expose port
EXPOSE 8080

# Run the application
CMD ["./main"]
