# MoodTunes

A TypeScript monorepo application that analyzes your mood and recommends music accordingly.

## Project Structure

This is a TypeScript monorepo with the following structure:

```
MoodTunes/
├── client/          # React + TypeScript frontend (Vite)
├── server/          # Node.js + Express + TypeScript backend
└── README.md        # This file
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm

### Installation & Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/praneethhh18/MoodTunes.git
   cd MoodTunes
   ```

2. **Start the backend server:**
   ```bash
   cd server
   npm install
   npm run dev
   ```
   The server will start on `http://localhost:3001`

3. **Start the frontend client:**
   ```bash
   cd client
   npm install
   npm run dev
   ```
   The client will start on `http://localhost:5173`

## Features

- **Frontend**: React + TypeScript with Vite for fast development
- **Backend**: Express.js + TypeScript for API services
- **Type Safety**: Full TypeScript support across the entire stack
- **Hot Reload**: Both frontend and backend support hot reloading during development

## API Endpoints

- `GET /` - Welcome message
- `GET /api/health` - Health check endpoint

## Development Scripts

### Client (Frontend)
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Server (Backend)
- `npm run dev` - Start development server with ts-node
- `npm run dev:watch` - Start development server with watch mode
- `npm run build` - Compile TypeScript to JavaScript
- `npm run start` - Start production server

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test your changes
5. Submit a pull request

## License

This project is licensed under the ISC License.