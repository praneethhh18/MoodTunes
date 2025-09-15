# MoodTunes Server

This directory is prepared for future backend implementation.

## Planned Features

### Share Link Management
- Generate unique shareable links for mood and playlist combinations
- Store shared content with expiration dates
- Retrieve shared mood and playlist data by link ID

### API Endpoints (Future)

```
GET /api/share/:shareId
- Retrieve shared mood and playlist data

POST /api/share
- Create a new shareable link
- Body: { mood, playlist, expiresIn? }
- Returns: { shareId, shareUrl }

GET /api/health
- Health check endpoint
```

### Database Schema (Future)

```sql
-- Shares table
CREATE TABLE shares (
  id VARCHAR(255) PRIMARY KEY,
  mood VARCHAR(50) NOT NULL,
  playlist JSON NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  expires_at TIMESTAMP,
  view_count INTEGER DEFAULT 0
);
```

## Development Setup (Future)

When implementing the backend:

1. Choose a framework (Express.js, Fastify, or similar)
2. Set up database (PostgreSQL, MongoDB, or similar)
3. Implement share link generation and retrieval
4. Add CORS configuration for frontend integration
5. Set up environment variables for configuration

## Current Status

Currently using client-side URL encoding for sharing functionality. The backend is planned for future releases to provide:
- Persistent storage of shared content
- Analytics and usage statistics
- Advanced sharing options
- User authentication and profiles