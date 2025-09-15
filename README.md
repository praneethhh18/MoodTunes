# 🎵 MoodTunes

MoodTunes is an intelligent music recommendation platform that detects your mood and suggests music that matches your emotional state. The application uses sentiment analysis of text input as the initial implementation, with a modular architecture designed for future enhancements with advanced mood detection technologies.

## 🚀 Features

### Current Implementation
- **Text-based Mood Detection**: Uses natural language processing to analyze user input and determine emotional state
- **Real-time Sentiment Analysis**: Powered by the `sentiment` npm package for accurate emotion detection
- **Three Mood Categories**: Happy, Sad, and Neutral mood detection with confidence scores
- **Modern React Interface**: Clean, responsive UI built with React and Vite
- **RESTful API**: Well-structured backend API for mood detection services

### Planned Features (TODO)
- 📸 **Camera-based Emotion Detection**: Facial expression analysis using computer vision
- 🎤 **Voice Mood Analysis**: Speech pattern and tone analysis for mood detection
- 🧠 **Advanced AI Mood Prediction**: Machine learning models for enhanced accuracy
- 🎵 **Personalized Music Recommendations**: Integration with music services and playlist generation

## 🏗️ Architecture

```
MoodTunes/
├── client/                 # React frontend application
│   ├── src/
│   │   ├── components/
│   │   │   ├── MoodDetection.jsx    # Main mood detection component
│   │   │   └── MoodDetection.css    # Component styling
│   │   ├── App.jsx         # Main app component
│   │   ├── main.jsx        # React entry point
│   │   └── index.css       # Global styles
│   ├── index.html          # HTML template
│   ├── package.json        # Frontend dependencies
│   └── vite.config.js      # Vite configuration with API proxy
└── server/                 # Node.js backend application
    ├── index.js            # Express server with mood detection API
    └── package.json        # Backend dependencies
```

## 🛠️ Setup and Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd MoodTunes
   ```

2. **Install backend dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../client
   npm install
   ```

4. **Start the development servers**

   **Terminal 1 - Backend Server:**
   ```bash
   cd server
   npm start
   # Server runs on http://localhost:3001
   ```

   **Terminal 2 - Frontend Development Server:**
   ```bash
   cd client
   npm run dev
   # Frontend runs on http://localhost:3000
   ```

5. **Access the application**
   - Open your browser and navigate to `http://localhost:3000`
   - The frontend automatically proxies API requests to the backend

## 🔧 API Reference

### Mood Detection Endpoint

**POST** `/api/mood`

Analyzes text input and returns mood classification with confidence metrics.

#### Request Body
```json
{
  "text": "I'm feeling wonderful today!"
}
```

#### Response
```json
{
  "mood": "happy",
  "confidence": 1.0,
  "score": 8,
  "analysis": {
    "positive": ["wonderful", "feeling"],
    "negative": [],
    "wordCount": 2
  }
}
```

#### Response Fields
- `mood`: Detected mood category (`happy`, `sad`, `neutral`)
- `confidence`: Confidence level (0.0 to 1.0)
- `score`: Raw sentiment score (positive for happy, negative for sad, 0 for neutral)
- `analysis`: Detailed breakdown of sentiment analysis

### Health Check Endpoint

**GET** `/api/health`

Returns server status information.

#### Response
```json
{
  "status": "OK",
  "service": "MoodTunes Mood Detection API"
}
```

## 🧪 Testing the Mood Detection

### Testing Different Moods

1. **Happy Mood Example:**
   ```
   Input: "I'm feeling absolutely fantastic today! The sun is shining and I'm excited about all the possibilities ahead."
   Expected: mood: "happy", high confidence
   ```

2. **Sad Mood Example:**
   ```
   Input: "I'm feeling really down today. Everything seems difficult and I'm quite disappointed."
   Expected: mood: "sad", moderate confidence
   ```

3. **Neutral Mood Example:**
   ```
   Input: "Today is just another day. Nothing particularly good or bad happened."
   Expected: mood: "neutral", low confidence
   ```

### Manual Testing Steps

1. Start both backend and frontend servers
2. Navigate to `http://localhost:3000`
3. Enter text describing your mood in the textarea
4. Click "Detect My Mood"
5. Observe the mood analysis results including:
   - Detected mood with emoji
   - Confidence percentage
   - Sentiment score
   - Positive/negative word breakdown

## 🔮 Future Enhancement Guidelines

The codebase is structured to easily accommodate advanced mood detection methods:

### Adding Webcam-based Emotion Detection
```javascript
// TODO: In MoodDetection.jsx
// 1. Import TensorFlow.js face detection models
import * as faceapi from 'face-api.js';

// 2. Add camera capture functionality
const startCamera = async () => {
  const stream = await navigator.mediaDevices.getUserMedia({ video: true });
  // Process video stream for facial emotion detection
};
```

### Adding Voice Analysis
```javascript
// TODO: In MoodDetection.jsx
// 1. Implement speech recognition
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

// 2. Analyze voice patterns and combine with text sentiment
const analyzeVoice = (audioData) => {
  // Implement voice tone and pitch analysis
};
```

### Backend Extensions
```javascript
// TODO: In server/index.js
// 1. Add new endpoints for different input types
app.post('/api/mood/camera', handleCameraMood);
app.post('/api/mood/voice', handleVoiceMood);
app.post('/api/mood/combined', handleMultiModalMood);

// 2. Implement ML model integration
const loadMLModel = async () => {
  // Load pre-trained emotion detection models
};
```

## 🎵 Music Integration Roadmap

Future integration points for music recommendation:

1. **Spotify API Integration**: Connect detected moods to Spotify playlists
2. **Custom Playlist Generation**: Create mood-based playlists using music APIs
3. **User Preference Learning**: Machine learning for personalized recommendations
4. **Real-time Music Streaming**: Direct integration with streaming services

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).