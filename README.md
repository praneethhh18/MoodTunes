# 🎵 MoodTunes

Discover music that matches your mood and share it with friends!

MoodTunes is a React-based web application that detects your current mood and recommends personalized playlists. With built-in social sharing features, you can easily share your mood and music discoveries with friends across multiple platforms.

## Features

### 🎭 Mood Detection
- Interactive mood selection with emoji-based interface
- Four mood categories: Happy, Sad, Energetic, and Relaxed
- Real-time mood analysis simulation

### 🎶 Playlist Recommendations
- Curated playlists based on detected mood
- 5 songs per playlist with artist and duration information
- Mood-specific song selections for each emotional state

### 📱 Social Sharing
- **Copy Link**: Generate and copy shareable URLs with encoded mood and playlist data
- **Twitter/X Integration**: Direct sharing to Twitter with pre-formatted messages
- **Facebook Sharing**: Share to Facebook with custom quotes and links
- **WhatsApp Integration**: Share via WhatsApp with formatted text and links
- **Shared Link Support**: View shared mood and playlist from friends via URL parameters

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/praneethhh18/MoodTunes.git
cd MoodTunes/client
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

## How to Use Social Sharing

### Sharing Your Mood
1. Select your current mood from the emoji buttons
2. Wait for mood detection to complete
3. Click any of the share buttons in the "Mood Detected!" section:
   - **📋 Copy Link**: Copies a shareable URL to your clipboard
   - **🐦 Twitter**: Opens Twitter with pre-filled tweet
   - **📘 Facebook**: Opens Facebook sharing dialog
   - **💬 WhatsApp**: Opens WhatsApp with formatted message

### Sharing Your Playlist
1. After mood detection, scroll down to the playlist section
2. Use the share buttons below the playlist:
   - Share buttons include playlist information in the message
   - Shared links contain both mood and playlist data

### Viewing Shared Content
- When someone shares a MoodTunes link with you, clicking it will:
  - Display a green banner indicating shared content
  - Show the friend's detected mood
  - Display their recommended playlist
  - Allow you to share or detect your own mood

## Technical Implementation

### URL Encoding
- Shared data is encoded using Base64 JSON encoding
- URL format: `http://localhost:5173/?share=<encoded_data>`
- Encoded data includes:
  - Mood information
  - Timestamp
  - Playlist data (title and artist for each song)

### Social Media Integration
- Uses platform-specific URL schemes for sharing
- Supports URL encoding for special characters
- Fallback clipboard functionality for older browsers

## Future Enhancements (TODOs)

The following features are planned for future releases:

### Group Features
- [ ] Collaborative playlists for friend groups
- [ ] Group mood challenges and competitions
- [ ] Shared mood history tracking

### Privacy & Security
- [ ] Privacy controls for shared playlists
- [ ] User accounts and authentication
- [ ] Share link expiration settings

### Platform Integration
- [ ] Spotify playlist export
- [ ] Apple Music integration
- [ ] YouTube Music support
- [ ] Last.fm scrobbling

### Enhanced Features
- [ ] Playlist voting and rating system
- [ ] Mood-based music discovery
- [ ] Playlist history and favorites
- [ ] Custom mood categories
- [ ] Advanced mood analysis using AI

### Backend Features
- [ ] Persistent playlist storage
- [ ] User profile management
- [ ] Share analytics and statistics
- [ ] Real-time collaboration features

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

For support, please open an issue on GitHub or contact the maintainers.