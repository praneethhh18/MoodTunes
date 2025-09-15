# MoodTunes

MoodTunes is a music discovery application that helps users find music that matches their current mood. Users can explore different moods, save favorites, and track their listening history.

## Features

### User Authentication
- User registration and login
- JWT-based authentication
- Secure password hashing

### Mood-Based Music Discovery
- 14 different mood categories (happy, sad, energetic, calm, romantic, angry, motivated, nostalgic, adventurous, melancholic, peaceful, excited, thoughtful, uplifting)
- Mood-based playlist recommendations
- Visual mood selector with emojis

### User Profiles
- Personal user profiles with favorite moods and playlists
- Mood and playlist history tracking
- Timestamped activity tracking
- Ability to clear history

### Profile Management
- Save/remove favorite moods
- Save/remove favorite playlists
- View detailed history of mood selections and playlist interactions
- Profile settings and information

## Technology Stack

### Backend
- **Node.js** with Express.js
- **SQLite** database for data persistence
- **JWT** for authentication
- **bcryptjs** for password hashing
- **express-validator** for input validation
- **helmet** and **cors** for security
- **express-rate-limit** for API protection

### Frontend
- **React 18** with functional components and hooks
- **Vite** for fast development and building
- **React Router** for navigation
- **Axios** for API communication
- **Lucide React** for icons
- Custom CSS with glassmorphism design

## Project Structure

```
MoodTunes/
├── server/                 # Backend API
│   ├── config/
│   │   └── database.js     # Database configuration and initialization
│   ├── middleware/
│   │   └── auth.js         # JWT authentication middleware
│   ├── models/
│   │   ├── User.js         # User model and database operations
│   │   └── Profile.js      # Profile model and database operations
│   ├── routes/
│   │   ├── auth.js         # Authentication routes
│   │   ├── profile.js      # User profile routes
│   │   ├── moods.js        # Mood-related routes
│   │   └── playlists.js    # Playlist routes
│   ├── package.json
│   └── server.js           # Main server file
├── client/                 # Frontend React app
│   ├── public/
│   ├── src/
│   │   ├── components/     # Reusable React components
│   │   ├── contexts/       # React contexts (Auth)
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom React hooks
│   │   └── utils/          # Utility functions
│   ├── package.json
│   └── vite.config.js
└── README.md
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user

### User Profile
- `GET /api/profile` - Get user profile
- `PUT /api/profile/favorites` - Update favorite moods and playlists
- `GET /api/profile/mood-history` - Get mood history
- `POST /api/profile/mood-history` - Add mood to history
- `DELETE /api/profile/mood-history` - Clear mood history
- `GET /api/profile/playlist-history` - Get playlist history
- `POST /api/profile/playlist-history` - Add playlist to history
- `DELETE /api/profile/playlist-history` - Clear playlist history

### Moods
- `GET /api/moods` - Get all available moods
- `GET /api/moods/:mood` - Get playlist recommendations for a mood

### Playlists
- `GET /api/playlists` - Get user's custom playlists
- `POST /api/playlists` - Create a new playlist
- `GET /api/playlists/:id` - Get specific playlist
- `PUT /api/playlists/:id` - Update playlist
- `DELETE /api/playlists/:id` - Delete playlist

### Health Check
- `GET /api/health` - API health check

## Installation and Setup

### Prerequisites
- Node.js (v14 or higher)
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

3. Start the development server:
   ```bash
   npm run dev
   ```
   
   Or for production:
   ```bash
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

### Database
The SQLite database will be automatically created when the server starts for the first time. No additional setup is required.

## Environment Variables

### Server
You can set the following environment variables:
- `PORT` - Server port (default: 3001)
- `JWT_SECRET` - JWT secret key (default: provided for development)
- `CLIENT_URL` - Client URL for CORS (default: http://localhost:5173)

## Development

### Running Both Services
To run both backend and frontend simultaneously:

1. In one terminal, start the backend:
   ```bash
   cd server && npm run dev
   ```

2. In another terminal, start the frontend:
   ```bash
   cd client && npm run dev
   ```

### Building for Production

#### Frontend
```bash
cd client && npm run build
```

#### Backend
The backend is ready for production as-is. Consider setting environment variables appropriately.

## Features in Detail

### User Authentication
- Secure registration with email validation
- Password hashing using bcryptjs
- JWT tokens for session management
- Protected routes requiring authentication

### Mood Selection
- Interactive mood cards with emoji representations
- Heart icons for favoriting moods
- Real-time mood selection and playlist generation
- Mood history tracking with timestamps

### User Profiles
- **Favorites Tab**: View and manage favorite moods and playlists
- **History Tab**: View chronological history of moods and playlists
- Profile information display (username, email, join date)
- Ability to clear history with confirmation dialogs

### Responsive Design
- Mobile-friendly interface
- Glassmorphism design with beautiful gradients
- Smooth animations and transitions
- Accessible design patterns

## Security Features
- Password hashing with bcryptjs
- JWT token authentication
- Rate limiting on API endpoints
- Input validation and sanitization
- CORS protection
- Helmet security headers

## Future Enhancements (TODOs)

### Music Integration
- [ ] Integrate with Spotify API for real music recommendations
- [ ] Add music preview functionality
- [ ] Implement actual playlist creation with streaming services

### Analytics
- [ ] Advanced mood analytics and insights
- [ ] Mood patterns over time
- [ ] Most popular moods and playlists
- [ ] Personalized recommendations based on history

### Social Features
- [ ] Share favorite playlists with friends
- [ ] Community mood boards
- [ ] Social login options (Google, Spotify)

### Data Export
- [ ] Export user data (moods, playlists, history)
- [ ] Data import from other music services
- [ ] Backup and restore functionality

### Enhanced UI/UX
- [ ] Dark/light theme toggle
- [ ] Custom mood creation
- [ ] Advanced playlist filtering and search
- [ ] Keyboard shortcuts

### Performance
- [ ] Implement caching for frequently accessed data
- [ ] Add pagination for large history lists
- [ ] Optimize database queries
- [ ] Add loading states and error boundaries

## Contributing
1. Fork the repository
2. Create a feature branch
3. Make changes and test thoroughly
4. Submit a pull request

## License
This project is licensed under the ISC License.