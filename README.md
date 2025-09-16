# MoodTunes 🎵

**Music That Feels Your Mood** - An AI-powered music discovery platform with immersive 3D visuals and dynamic mood-based theming.

![MoodTunes Homepage](https://github.com/user-attachments/assets/2118ca39-c211-4b05-b5da-4d17bd39d33a)

## ✨ Features

### 🎨 Dynamic Mood-Based Theming
- **6 Unique Mood Themes**: Happy, Sad, Energetic, Calm, Romantic, Focused
- **Real-time Theme Switching**: Seamless transitions between mood themes
- **Adaptive UI Colors**: Background gradients, accent colors, and particle effects change based on mood
- **Time-based Auto Detection**: Automatic mood detection based on time of day

![Calm Theme](https://github.com/user-attachments/assets/5155fb51-14bf-477c-a5ef-e329dff25c72)

### 🤖 AI-Powered Mood Detection
- **Manual Mood Selection**: Choose from beautifully designed mood cards
- **Simulated AI Analysis**: Interactive AI detection with animated feedback
- **Mood History Tracking**: Analytics showing mood patterns over time
- **Personalized Recommendations**: Music suggestions tailored to detected mood

![Mood Detection](https://github.com/user-attachments/assets/279c08a7-b70d-4711-8c11-de416102dfef)

### 🎵 Smart Music Recommendations
- **Mood-Filtered Playlists**: Songs curated specifically for your current mood
- **Interactive Music Player**: Play/pause controls with visual feedback
- **Personal Playlists**: Create and manage custom mood-based playlists
- **Social Features**: Like, share, and discover music from others

![Music Recommendations](https://github.com/user-attachments/assets/d184c304-88fa-442f-a4a1-63535dacab05)

### 🌟 3D Visual Experience
- **Three.js Integration**: Stunning 3D background animations
- **Particle Systems**: Dynamic particle effects that respond to mood
- **3D Card Components**: Interactive cards with tilt effects and shine overlays
- **Floating Geometric Elements**: Animated 3D shapes and icons
- **Glassmorphism Design**: Modern translucent UI elements with backdrop blur

### 👤 Comprehensive User Profiles
- **Detailed Analytics**: Track listening habits, mood patterns, and preferences
- **Activity Timeline**: View recent music interactions and playlist activity
- **Genre Analysis**: Visual charts showing favorite music genres
- **Customizable Themes**: Switch between mood themes manually
- **Settings & Preferences**: Privacy controls and notification settings

![User Profile](https://github.com/user-attachments/assets/c25a92eb-80e6-45be-96d4-4ee28e14b461)

### 🔐 Modern Authentication
- **Beautiful Auth Forms**: Glassmorphism design with 3D visual effects
- **Social Login Options**: Google and Spotify integration ready
- **Responsive Design**: Optimized for all device sizes
- **Smooth Animations**: Framer Motion powered transitions

## 🛠️ Technology Stack

### Frontend Framework
- **React 18** - Modern React with hooks and functional components
- **Vite** - Fast build tool and development server
- **React Router DOM** - Client-side routing with smooth page transitions

### 3D Graphics & Animation
- **Three.js** - WebGL-powered 3D graphics engine
- **React Three Fiber** - React renderer for Three.js
- **@react-three/drei** - Useful helpers and components for R3F
- **Framer Motion** - Production-ready motion library for React

### Styling & UI
- **CSS3 with Modern Features** - Grid, Flexbox, CSS Variables
- **Custom Design System** - Consistent theming and component architecture
- **Responsive Design** - Mobile-first approach with breakpoint system
- **Glassmorphism Effects** - Modern translucent design patterns

### State Management
- **React Context API** - Theme management and mood state
- **Custom Hooks** - Reusable logic for mood detection and theming
- **Local State Management** - Component-level state with useState and useEffect

## 🎯 Mood Theme System

### Theme Configuration
Each mood theme includes:
- **Primary & Secondary Colors**: Main theme colors for UI elements
- **Background Gradients**: Dynamic gradient backgrounds
- **Particle Effects**: Customized particle systems (color, shape, count, speed)
- **Visual Effects**: Glow, bounce, and sparkle animations
- **Typography**: Gradient text effects and color schemes

### Available Moods

| Mood | Colors | Effects | Particle Shape |
|------|---------|---------|----------------|
| **Happy** 😊 | Gold & Pink | Glow, Bounce, Sparkles | Circle |
| **Sad** 😢 | Blue & Purple | Minimal effects | Circle |
| **Energetic** ⚡ | Red & Orange | Glow, Bounce, Sparkles | Triangle |
| **Calm** 😌 | Green & Light Green | Subtle effects | Circle |
| **Romantic** 💕 | Pink & Deep Pink | Glow, Sparkles | Heart |
| **Focused** 🎯 | Purple & Dark Purple | Clean, minimal | Polygon |

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/praneethhh18/MoodTunes.git
   cd MoodTunes/client
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

### Build for Production
```bash
npm run build
npm run preview
```

## 📱 Features by Page

### 🏠 Homepage
- Hero section with animated 3D elements
- Feature showcase with interactive cards
- Statistics and social proof
- Call-to-action sections with mood detection links

### 🎭 Mood Detection
- **Manual Selection**: Choose from 4 primary mood options with gradient cards
- **AI Detection**: Simulated AI analysis with spinning animations and progress indicators
- **Results Display**: Mood detection results with recommendation buttons

### 🎵 Music Recommendations
- **Mood-Based Filtering**: Songs filtered by current mood preference
- **Interactive Player**: Play/pause buttons with visual state changes
- **Personal Playlists**: Display user-created playlists with song counts
- **Exploration Section**: Discover music from other mood categories

### 👤 Profile Page
- **User Information**: Avatar, contact details, and current mood status
- **Statistics Dashboard**: Songs played, favorite mood, playlists, hours listened
- **Mood Analytics**: Visual charts showing mood distribution over time
- **Activity Feed**: Recent interactions with music and playlists
- **Settings Panel**: Theme preferences and notification controls

### 🔐 Authentication
- **Sign In/Sign Up Forms**: Beautiful glassmorphism design with 3D effects
- **Social Authentication**: Google and Spotify login options
- **Form Validation**: Real-time validation with visual feedback
- **Responsive Layout**: Optimized for mobile and desktop

## 🎨 Design Principles

### Visual Hierarchy
- **Typography Scale**: Consistent font sizes and weights across components
- **Color System**: Mood-based color palettes with accessibility considerations
- **Spacing System**: Consistent margins, padding, and gap measurements
- **Component Consistency**: Reusable design patterns across all pages

### Animation & Interactivity
- **Micro-interactions**: Hover effects, button animations, and state transitions
- **Page Transitions**: Smooth navigation between routes using Framer Motion
- **3D Elements**: Interactive 3D cards with tilt effects and depth
- **Loading States**: Engaging loading animations and progress indicators

### Accessibility
- **Keyboard Navigation**: Full keyboard accessibility for all interactive elements
- **Screen Reader Support**: Semantic HTML and ARIA labels
- **Color Contrast**: High contrast ratios for text readability
- **Responsive Design**: Works on all device sizes and orientations

## 🔧 Component Architecture

### Core Components
- **`Background3D`** - Three.js powered animated background
- **`Card3D`** - Interactive 3D cards with tilt and shine effects  
- **`Navigation`** - Responsive navigation with mood selector
- **`HeroSection`** - Homepage hero with animated elements

### Context Providers
- **`ThemeProvider`** - Manages mood-based theme state and transitions
- **`useTheme`** - Custom hook for accessing theme context

### Page Components
- **`HomePage`** - Landing page with features and call-to-actions
- **`MoodDetectionPage`** - AI and manual mood detection interface
- **`RecommendationsPage`** - Music discovery and playlist management
- **`ProfilePage`** - User dashboard with analytics and settings
- **`AuthPage`** - Authentication forms with social login options

## 🎵 Music Features

### Recommendation Engine
- **Mood Mapping**: Songs categorized by emotional attributes
- **User Preferences**: Learning from user interactions and feedback
- **Playlist Generation**: Automatic playlist creation based on mood
- **Discovery Features**: Explore music outside current mood preferences

### Audio Integration Ready
- **Player Controls**: Play, pause, skip, volume controls implemented
- **Playlist Management**: Add, remove, and organize songs
- **Favorite Tracking**: Like/unlike functionality with visual feedback
- **Sharing Features**: Social sharing capabilities for songs and playlists

## 🌐 Browser Support

- **Chrome** 90+ (Recommended)
- **Firefox** 88+
- **Safari** 14+
- **Edge** 90+

*Note: 3D features require WebGL support*

## 📦 Dependencies

### Core Dependencies
```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-router-dom": "^6.15.0",
  "@react-three/fiber": "^8.13.6",
  "@react-three/drei": "^9.83.6",
  "three": "^0.155.0",
  "framer-motion": "^10.16.1"
}
```

### UI & Styling
```json
{
  "styled-components": "^6.0.7",
  "react-spring": "^9.7.3",
  "@emotion/react": "^11.11.1",
  "@emotion/styled": "^11.11.0",
  "lucide-react": "^0.263.1",
  "react-icons": "^4.10.1"
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Three.js Community** - For the amazing 3D graphics library
- **React Team** - For the robust frontend framework  
- **Framer Motion** - For smooth animations and transitions
- **Lucide Icons** - For the beautiful icon set

---

**Built with ❤️ and 🎵 by the MoodTunes Team**