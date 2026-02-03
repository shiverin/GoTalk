# Build stage
FROM golang:1.25.5-alpine AS builder

RUN apk add --no-cache gcc musl-dev

WORKDIR /app

# Copy go mod files and download deps
COPY go.mod go.sum ./
RUN go mod download

# Copy source code including the DB
COPY . .

# Build Go binary
RUN CGO_ENABLED=1 GOOS=linux go build -o main ./cmd/api

# Runtime stage
FROM alpine:latest

RUN apk add --no-cache libc6-compat sqlite

WORKDIR /app

# Create data folder
RUN mkdir -p /app/data

# Copy Go binary
COPY --from=builder /app/main .

# Copy initial database (only for the first run)
COPY --from=builder /app/cmd/api/forum.db ./data/forum.db

EXPOSE 8080

CMD ["./main"]
