# MoodTunes 🎵

**Music that matches your mood, powered by AI**

MoodTunes is a modern, interactive web application that analyzes your current mood and provides personalized music recommendations. Built with React and Material UI, it offers a sleek, engaging user experience with smooth animations and responsive design.

## ✨ Features

### 🎨 Modern UI Design
- **Material UI Components**: Built with Google's Material Design system
- **Vibrant Gradients**: Eye-catching color schemes throughout the interface
- **Smooth Animations**: Powered by Framer Motion for delightful interactions
- **Responsive Design**: Optimized for mobile, tablet, and desktop devices

### 😊 Mood Detection
- **Interactive Emoji Picker**: Select from 9 different mood states
- **Energy Level Slider**: Fine-tune your current energy level
- **Activity Selection**: Choose what you're currently doing
- **Multi-step Process**: Guided flow with progress indicators

### 🎵 Music Recommendations
- **Personalized Playlists**: AI-powered song suggestions based on your mood
- **Interactive Music Player**: Play, pause, skip tracks with visual feedback
- **Song Cards**: Beautiful cards with album art, genre tags, and metadata
- **Like & Share**: Social features for favorite tracks

### 👤 User Profiles
- **Personal Dashboard**: Comprehensive user statistics and analytics
- **Mood History**: Track your emotional journey over time
- **Music Analytics**: Genre preferences and listening habits
- **Social Features**: Friends, followers, and playlist sharing

### 🔐 Authentication
- **Modern Login/Signup**: Sleek forms with gradient backgrounds
- **Social Authentication**: Google and Facebook login options
- **Password Visibility**: Toggle password visibility for better UX

## 🛠️ Technology Stack

- **Frontend**: React 19.1.1 with Hooks
- **UI Framework**: Material UI (MUI) 7.3.2
- **Animations**: Framer Motion 12.23.13
- **Routing**: React Router DOM 7.9.1
- **Styling**: Emotion for CSS-in-JS
- **Build Tool**: Vite 7.1.5
- **Icons**: Material UI Icons

## 🚀 Getting Started

### Prerequisites
- Node.js (version 16 or higher)
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

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000` to see the application

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## 📱 User Interface Overview

### Home Page
- Hero section with gradient background and floating animations
- Feature cards showcasing app capabilities
- Call-to-action buttons leading to mood detection

### Mood Detection Flow
1. **Mood Selection**: Choose from 9 emoji-based mood options
2. **Energy Level**: Adjust slider from 0-100%
3. **Activities**: Select current activities with chip-based selection
4. **Analysis**: Animated processing with mood summary cards

### Music Recommendations
- Personalized playlist header with mood indicators
- Interactive music player with gradient design
- Grid of song cards with hover effects
- Like, share, and playlist management features

### User Profile
- Gradient header with user stats and avatar
- Tabbed interface: Overview, Playlists, Friends
- Mood history with emoji indicators
- Genre analytics with animated progress bars
- Music activity statistics with icons

### Authentication
- Login/Signup forms with glassmorphism design
- Social authentication buttons
- Animated background elements
- Responsive form validation

## 🎨 Design System

### Color Palette
- **Primary**: Indigo (#6366f1) to Pink (#ec4899) gradient
- **Secondary**: Blue (#3b82f6) to Purple (#8b5cf6) gradient
- **Accent**: Orange (#f59e0b) to Red (#ef4444) gradient

### Typography
- **Font Family**: Roboto (Google Fonts)
- **Gradient Text**: Headers with gradient overlays
- **Weight Hierarchy**: 300, 400, 500, 700

### Animations
- **Page Transitions**: Fade and slide effects
- **Hover States**: Scale and shadow transforms
- **Loading States**: Rotating icons and progress bars
- **Card Interactions**: Lift and glow effects

## 📦 Component Architecture

### Layout Components
- `Layout.jsx`: Main app shell with navigation
- `AppBar`: Top navigation with gradient background
- `Drawer`: Sidebar navigation with menu items

### Page Components
- `Home.jsx`: Landing page with feature showcase
- `MoodDetection.jsx`: Multi-step mood analysis flow
- `Recommendations.jsx`: Music player and song grid
- `Profile.jsx`: User dashboard with analytics
- `Login.jsx` / `Signup.jsx`: Authentication forms

### Reusable Components
- Custom Material UI theme with gradients
- Animated cards and buttons
- Progress indicators and steppers
- Form components with validation

## 🔧 Configuration

### Vite Configuration
- React plugin for hot module replacement
- Production optimization and bundling
- Development server on port 3000

### Material UI Theme
- Custom color palette with gradients
- Component style overrides
- Typography scale and font loading
- Responsive breakpoints

## 🌟 Key Features Implemented

✅ **Modern Material UI Design**
✅ **Vibrant Gradients and Animations**
✅ **Interactive Mood Detection Flow**
✅ **Music Recommendation Interface**
✅ **User Profile with Analytics**
✅ **Responsive Navigation**
✅ **Authentication Screens**
✅ **Smooth Page Transitions**
✅ **Mobile-First Design**
✅ **Social Features UI**

## 📸 Screenshots

The application features a modern, visually appealing interface with:
- Gradient backgrounds and glassmorphism effects
- Smooth animations and micro-interactions
- Responsive design across all devices
- Interactive mood selection and music recommendations
- Comprehensive user profiles with data visualization

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 🙏 Acknowledgments

- Material UI for the excellent component library
- Framer Motion for smooth animations
- Unsplash for beautiful placeholder images
- Google Fonts for typography

---

**MoodTunes** - Where your emotions meet the perfect soundtrack! 🎵✨