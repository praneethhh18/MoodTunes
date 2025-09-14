# MoodTunes

A music application with mood-based recommendations featuring secure user authentication.

## Features

- **User Authentication**: Secure registration and login system
- **JWT-based Sessions**: Stateless authentication with JSON Web Tokens
- **Password Security**: Bcrypt hashing for secure password storage
- **React Frontend**: Modern UI with TypeScript support
- **Express Backend**: RESTful API with TypeScript

## Setup Instructions

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Backend Setup

1. Navigate to the server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file with the following variables:
```env
PORT=3001
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
NODE_ENV=development
```

4. Build and start the server:
```bash
# Development mode
npm run dev

# Production mode
npm run build
npm start
```

The server will run on `http://localhost:3001`

### Frontend Setup

1. Navigate to the client directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The client will run on `http://localhost:5173`

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
  - Body: `{ email: string, password: string }`
  - Returns: `{ user: UserResponse, token: string }`

- `POST /api/auth/login` - Login an existing user
  - Body: `{ email: string, password: string }`
  - Returns: `{ user: UserResponse, token: string }`

- `GET /api/auth/me` - Get current user (protected)
  - Headers: `Authorization: Bearer <token>`
  - Returns: `UserResponse`

- `POST /api/auth/logout` - Logout (client-side token removal)
  - Returns: `{ message: string }`

### Health Check

- `GET /api/health` - Server health check
  - Returns: `{ message: string, timestamp: string }`

## Architecture

### Backend
- **Express.js** with TypeScript
- **bcryptjs** for password hashing
- **jsonwebtoken** for JWT authentication
- **CORS** enabled for cross-origin requests
- In-memory user storage (replace with database in production)

### Frontend
- **React** with TypeScript
- **Vite** for fast development and building
- **React Router** for navigation
- **Axios** for HTTP requests
- **Context API** for authentication state management

## Security Features

- Password hashing with bcrypt (10 salt rounds)
- JWT tokens with 24-hour expiration
- Input validation and sanitization
- CORS protection
- Secure headers and middleware

## Development

### Running Tests

Currently, the project uses manual testing. To test the authentication system:

1. Start both servers (backend and frontend)
2. Open `http://localhost:5173`
3. Test registration with a new email
4. Test login with existing credentials
5. Verify JWT token persistence

### Environment Configuration

**Production Setup:**
- Change `JWT_SECRET` to a strong, random secret
- Configure proper CORS origins
- Set up a production database
- Enable HTTPS
- Add rate limiting and additional security measures

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## Coming Soon

- 🎵 Mood-based music recommendations
- 🎧 Personalized playlists
- 📊 Music analytics and insights
- 👥 Social features and sharing