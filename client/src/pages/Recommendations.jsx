import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Container,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Grid,
  Chip,
  Paper,
  Button,
  Avatar,
  LinearProgress,
  Fab,
} from '@mui/material';
import {
  PlayArrow as PlayIcon,
  Pause as PauseIcon,
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
  Share as ShareIcon,
  SkipNext as SkipNextIcon,
  SkipPrevious as SkipPreviousIcon,
  Shuffle as ShuffleIcon,
  Repeat as RepeatIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';

const Recommendations = () => {
  const location = useLocation();
  const moodData = location.state || { mood: { emoji: '😊', name: 'Happy' }, energy: 75, activities: ['Relaxing'] };
  
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [likedTracks, setLikedTracks] = useState(new Set());

  // Mock music data based on mood
  const recommendations = [
    {
      id: 1,
      title: "Good 4 U",
      artist: "Olivia Rodrigo",
      album: "SOUR",
      duration: "2:58",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
      genre: "Pop",
      year: "2021",
      energy: 85,
    },
    {
      id: 2,
      title: "Blinding Lights",
      artist: "The Weeknd",
      album: "After Hours",
      duration: "3:20",
      image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&h=300&fit=crop",
      genre: "Synthpop",
      year: "2019",
      energy: 90,
    },
    {
      id: 3,
      title: "Watermelon Sugar",
      artist: "Harry Styles",
      album: "Fine Line",
      duration: "2:54",
      image: "https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=300&h=300&fit=crop",
      genre: "Pop Rock",
      year: "2020",
      energy: 70,
    },
    {
      id: 4,
      title: "Levitating",
      artist: "Dua Lipa",
      album: "Future Nostalgia",
      duration: "3:23",
      image: "https://images.unsplash.com/photo-1571974599782-87624638275b?w=300&h=300&fit=crop",
      genre: "Dance Pop",
      year: "2020",
      energy: 95,
    },
    {
      id: 5,
      title: "positions",
      artist: "Ariana Grande",
      album: "Positions",
      duration: "2:52",
      image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=300&h=300&fit=crop",
      genre: "R&B",
      year: "2020",
      energy: 60,
    },
    {
      id: 6,
      title: "Heat Waves",
      artist: "Glass Animals",
      album: "Dreamland",
      duration: "3:58",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop",
      genre: "Indie Pop",
      year: "2020",
      energy: 65,
    },
  ];

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress(prev => (prev >= 100 ? 0 : prev + 0.5));
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handlePlayPause = (trackIndex) => {
    if (trackIndex !== undefined) {
      setCurrentTrack(trackIndex);
    }
    setIsPlaying(!isPlaying);
  };

  const handleLike = (trackId) => {
    setLikedTracks(prev => {
      const newSet = new Set(prev);
      if (newSet.has(trackId)) {
        newSet.delete(trackId);
      } else {
        newSet.add(trackId);
      }
      return newSet;
    });
  };

  const handleNext = () => {
    setCurrentTrack(prev => (prev + 1) % recommendations.length);
    setProgress(0);
  };

  const handlePrevious = () => {
    setCurrentTrack(prev => prev === 0 ? recommendations.length - 1 : prev - 1);
    setProgress(0);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography
            variant="h2"
            component="h1"
            sx={{
              mb: 2,
              background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Your Personalized Playlist
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
            Based on your {moodData.mood.emoji} {moodData.mood.name} mood
          </Typography>
          
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
            <Chip 
              label={`${moodData.mood.emoji} ${moodData.mood.name}`} 
              color="primary" 
              size="medium"
            />
            <Chip 
              label={`⚡ ${moodData.energy}% Energy`} 
              color="secondary" 
              size="medium"
            />
            {moodData.activities.map((activity, index) => (
              <Chip 
                key={index}
                label={activity} 
                variant="outlined" 
                size="medium"
              />
            ))}
          </Box>
        </Box>
      </motion.div>

      {/* Current Track Player */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Paper
          sx={{
            p: 3,
            mb: 4,
            background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)',
            color: 'white',
            borderRadius: 4,
          }}
        >
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={3}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <CardMedia
                  component="img"
                  sx={{ width: 80, height: 80, borderRadius: 2 }}
                  image={recommendations[currentTrack].image}
                  alt={recommendations[currentTrack].title}
                />
                <Box>
                  <Typography variant="h6" fontWeight="bold">
                    {recommendations[currentTrack].title}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    {recommendations[currentTrack].artist}
                  </Typography>
                </Box>
              </Box>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Box sx={{ textAlign: 'center' }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mb: 2 }}>
                  <IconButton onClick={handlePrevious} sx={{ color: 'white' }}>
                    <SkipPreviousIcon />
                  </IconButton>
                  <IconButton 
                    onClick={() => handlePlayPause()} 
                    sx={{ 
                      color: 'white',
                      backgroundColor: 'rgba(255, 255, 255, 0.2)',
                      '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.3)' }
                    }}
                  >
                    {isPlaying ? <PauseIcon /> : <PlayIcon />}
                  </IconButton>
                  <IconButton onClick={handleNext} sx={{ color: 'white' }}>
                    <SkipNextIcon />
                  </IconButton>
                </Box>
                <LinearProgress 
                  variant="determinate" 
                  value={progress} 
                  sx={{ 
                    height: 6, 
                    borderRadius: 3,
                    backgroundColor: 'rgba(255, 255, 255, 0.3)',
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: 'white',
                    }
                  }} 
                />
              </Box>
            </Grid>
            
            <Grid item xs={12} md={3}>
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                <IconButton sx={{ color: 'white' }}>
                  <ShuffleIcon />
                </IconButton>
                <IconButton sx={{ color: 'white' }}>
                  <RepeatIcon />
                </IconButton>
                <IconButton 
                  onClick={() => handleLike(recommendations[currentTrack].id)}
                  sx={{ color: 'white' }}
                >
                  {likedTracks.has(recommendations[currentTrack].id) ? 
                    <FavoriteIcon /> : <FavoriteBorderIcon />
                  }
                </IconButton>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </motion.div>

      {/* Recommendations Grid */}
      <Typography variant="h4" gutterBottom fontWeight="bold">
        Recommended Tracks
      </Typography>
      
      <Grid container spacing={3}>
        {recommendations.map((track, index) => (
          <Grid item xs={12} sm={6} md={4} key={track.id}>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <Card
                sx={{
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  border: currentTrack === index ? '2px solid #6366f1' : 'none',
                  '&:hover': {
                    boxShadow: '0 15px 35px rgba(0,0,0,0.1)',
                  },
                }}
                onClick={() => setCurrentTrack(index)}
              >
                <Box sx={{ position: 'relative' }}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={track.image}
                    alt={track.title}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      left: 0,
                      bottom: 0,
                      background: 'rgba(0,0,0,0.5)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      opacity: 0,
                      transition: 'opacity 0.3s ease',
                      '&:hover': { opacity: 1 },
                    }}
                  >
                    <Fab
                      color="primary"
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePlayPause(index);
                      }}
                      sx={{
                        background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)',
                      }}
                    >
                      {isPlaying && currentTrack === index ? <PauseIcon /> : <PlayIcon />}
                    </Fab>
                  </Box>
                </Box>
                
                <CardContent>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    {track.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {track.artist} • {track.album}
                  </Typography>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Chip label={track.genre} size="small" variant="outlined" />
                      <Chip label={track.year} size="small" variant="outlined" />
                    </Box>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <IconButton
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleLike(track.id);
                        }}
                        color={likedTracks.has(track.id) ? 'error' : 'default'}
                      >
                        {likedTracks.has(track.id) ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                      </IconButton>
                      <IconButton size="small">
                        <ShareIcon />
                      </IconButton>
                    </Box>
                  </Box>
                  
                  <Typography variant="body2" sx={{ mt: 1, textAlign: 'right' }}>
                    {track.duration}
                  </Typography>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      {/* Action Buttons */}
      <Box sx={{ textAlign: 'center', mt: 6 }}>
        <Button
          variant="contained"
          size="large"
          sx={{
            mr: 2,
            background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)',
            px: 4,
            py: 1.5,
          }}
        >
          Save Playlist
        </Button>
        <Button
          variant="outlined"
          size="large"
          sx={{ px: 4, py: 1.5 }}
        >
          Try Different Mood
        </Button>
      </Box>
    </Container>
  );
};

export default Recommendations;