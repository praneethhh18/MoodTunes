# 🎵 MoodTunes

Discover music that matches your mood! MoodTunes is a web application that detects your emotional state and recommends songs or playlists accordingly.

## 📸 Screenshots

### Main Application Interface
![MoodTunes Main Interface](https://github.com/user-attachments/assets/95a36c7b-fa9e-4c1c-9aab-5d50c7a1a0cb)

### Mood Detection in Action
![Mood Detection](https://github.com/user-attachments/assets/5107168c-f62f-41ba-9b3c-cb040bdc17ba)

### Dynamic Recommendations
![Sad Mood Recommendations](https://github.com/user-attachments/assets/9d208396-02f9-45aa-8585-6c4f53ac0ee4)

## 🚀 Features

- **Mood Detection**: Simulated mood detection with plans for real facial recognition
- **Dynamic Recommendations**: Get song recommendations based on your current mood
- **Multiple Moods**: Support for Happy, Sad, Neutral, Angry, and Relaxed moods
- **Responsive UI**: Beautiful, modern interface that works on all devices
- **Real-time Updates**: Recommendations update instantly when mood changes
- **Modular Architecture**: Easy to extend with external APIs and advanced features

## 🛠️ Tech Stack

### Backend (`/server`)
- **Node.js** + **Express.js** - REST API server
- **CORS** - Cross-origin resource sharing
- **Modular Services** - Separated business logic

### Frontend (`/client`)
- **React 18** - Modern UI framework
- **Vite** - Fast development and build tool
- **CSS3** - Custom styling with gradients and animations

## 📦 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### 1. Clone the Repository
```bash
git clone https://github.com/praneethhh18/MoodTunes.git
cd MoodTunes
```

### 2. Install Backend Dependencies
```bash
cd server
npm install
```

### 3. Install Frontend Dependencies
```bash
cd ../client
npm install
```

### 4. Start the Backend Server
```bash
cd ../server
npm start
```
The server will run on `http://localhost:3001`

### 5. Start the Frontend Development Server
```bash
cd ../client
npm run dev
```
The client will run on `http://localhost:3000`

### 6. Open Your Browser
Navigate to `http://localhost:3000` to use the application!

## 🎮 How to Use

1. **Open the Application**: Navigate to `http://localhost:3000`
2. **Detect Your Mood**: Click "📸 Detect My Mood" to simulate mood detection
3. **View Recommendations**: Songs will automatically appear based on your detected mood
4. **Manual Selection**: Use the mood buttons to manually select different moods
5. **Explore Music**: Browse through the recommended songs for each mood

## 📡 API Documentation

### Base URL
```
http://localhost:3001/api
```

### Endpoints

#### Get Recommendations
```http
GET /recommendation?mood={mood}&limit={limit}
```

**Parameters:**
- `mood` (required): One of `happy`, `sad`, `neutral`, `angry`, `relaxed`
- `limit` (optional): Number of songs to return (default: 5, max: 20)

**Example Response:**
```json
{
  "success": true,
  "mood": "happy",
  "count": 3,
  "recommendations": [
    {
      "id": 1,
      "title": "Happy",
      "artist": "Pharrell Williams",
      "duration": "3:53",
      "genre": "Pop"
    }
  ]
}
```

#### Get Available Moods
```http
GET /recommendation/moods
```

**Example Response:**
```json
{
  "success": true,
  "moods": ["happy", "sad", "neutral", "angry", "relaxed"]
}
```

#### Health Check
```http
GET /health
```

## 🧪 Testing the Application

### Manual Testing
1. Start both servers (backend and frontend)
2. Test mood detection by clicking the detection button
3. Verify recommendations change when selecting different moods
4. Test API endpoints directly:
   ```bash
   curl "http://localhost:3001/api/recommendation?mood=happy&limit=3"
   curl "http://localhost:3001/api/recommendation/moods"
   curl "http://localhost:3001/health"
   ```

### Expected Behavior
- ✅ Mood detection should simulate analysis and show results
- ✅ Recommendations should update automatically when mood changes
- ✅ Different moods should return different song genres
- ✅ UI should be responsive and intuitive
- ✅ Backend API should respond with valid JSON

## 🔮 Future Enhancements

### 🎭 Mood Detection
- [ ] **Real-time Facial Recognition** - Integrate with Face-API.js or similar
- [ ] **Camera Access** - Use device camera for live mood detection
- [ ] **Voice Emotion Analysis** - Detect emotions from voice/audio input
- [ ] **Confidence Scoring** - Show accuracy of mood detection
- [ ] **Multiple Detection Methods** - Combine visual and audio analysis

### 🎵 Music Integration
- [ ] **Spotify API Integration** - Connect with user's Spotify account
- [ ] **Apple Music Support** - Support for Apple Music playlists
- [ ] **YouTube Music Connection** - Access YouTube Music library
- [ ] **Custom Playlist Creation** - Allow users to create and save playlists
- [ ] **Music Playback** - Integrate audio player functionality

### 🤖 AI & Personalization
- [ ] **Machine Learning Recommendations** - Use ML for better suggestions
- [ ] **User Preference Learning** - Learn from user interactions
- [ ] **Collaborative Filtering** - Recommend based on similar users
- [ ] **Listening History Analysis** - Track and analyze user behavior
- [ ] **Mood History Tracking** - Track mood patterns over time

### 🌟 Additional Features
- [ ] **Social Sharing** - Share moods and playlists with friends
- [ ] **Mood Journaling** - Keep track of daily moods
- [ ] **Offline Mode** - Work without internet connection
- [ ] **Mobile App** - React Native or Flutter mobile version
- [ ] **Podcast Recommendations** - Suggest podcasts based on mood

## 🏗️ Architecture & Code Structure

```
MoodTunes/
├── server/                 # Backend API
│   ├── src/
│   │   ├── data/          # Static song data
│   │   ├── services/      # Business logic
│   │   ├── routes/        # API endpoints
│   │   └── server.js      # Main server file
│   └── package.json
├── client/                # Frontend React app
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── services/      # API integration
│   │   ├── App.jsx       # Main app component
│   │   └── main.jsx      # Entry point
│   ├── vite.config.js    # Vite configuration
│   └── package.json
└── README.md
```

### Key Components

#### Backend
- `recommendationService.js` - Core recommendation logic
- `songData.js` - Static music database
- `recommendation.js` - API route handlers
- `server.js` - Express server setup

#### Frontend
- `App.jsx` - Main application component
- `PlaylistRecommendation.jsx` - Music recommendation display
- `MockMoodDetection.jsx` - Mood detection simulation
- `api.js` - Backend communication service

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- **Pharrell Williams** - For the inspiration with "Happy"
- **React Team** - For the amazing framework
- **Express.js** - For the simple and powerful server framework
- **Vite** - For the lightning-fast development experience

---

Built with ❤️ by the MoodTunes team