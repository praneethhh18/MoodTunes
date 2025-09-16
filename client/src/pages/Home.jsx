import React from 'react';
import {
  Box,
  Typography,
  Button,
  Container,
  Card,
  CardContent,
  Grid,
  Paper,
  useTheme,
} from '@mui/material';
import {
  Psychology as PsychologyIcon,
  MusicNote as MusicNoteIcon,
  Share as ShareIcon,
  TrendingUp as TrendingUpIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const features = [
    {
      icon: <PsychologyIcon sx={{ fontSize: 60, color: theme.palette.primary.main }} />,
      title: 'Mood Detection',
      description: 'Advanced AI analyzes your emotions to understand your current mood',
      action: () => navigate('/mood'),
    },
    {
      icon: <MusicNoteIcon sx={{ fontSize: 60, color: theme.palette.secondary.main }} />,
      title: 'Smart Recommendations',
      description: 'Get personalized music suggestions that perfectly match your vibe',
      action: () => navigate('/recommendations'),
    },
    {
      icon: <ShareIcon sx={{ fontSize: 60, color: theme.palette.primary.main }} />,
      title: 'Social Sharing',
      description: 'Share your mood and music discoveries with friends',
      action: () => navigate('/profile'),
    },
    {
      icon: <TrendingUpIcon sx={{ fontSize: 60, color: theme.palette.secondary.main }} />,
      title: 'Mood Analytics',
      description: 'Track your emotional journey and music preferences over time',
      action: () => navigate('/profile'),
    },
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)',
          color: 'white',
          py: 12,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Container maxWidth="lg">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Box textAlign="center">
              <Typography
                variant="h1"
                component="h1"
                sx={{
                  mb: 3,
                  fontSize: { xs: '3rem', md: '4.5rem' },
                  fontWeight: 'bold',
                  textShadow: '0 4px 20px rgba(0,0,0,0.3)',
                }}
              >
                🎵 MoodTunes
              </Typography>
              <Typography
                variant="h4"
                component="h2"
                sx={{
                  mb: 4,
                  fontSize: { xs: '1.5rem', md: '2rem' },
                  fontWeight: 300,
                  opacity: 0.9,
                }}
              >
                Music that matches your mood, powered by AI
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  mb: 6,
                  maxWidth: 600,
                  mx: 'auto',
                  opacity: 0.8,
                  lineHeight: 1.6,
                }}
              >
                Discover the perfect soundtrack for every emotion. Our intelligent system
                analyzes your mood and curates personalized playlists just for you.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => navigate('/mood')}
                  sx={{
                    background: 'rgba(255, 255, 255, 0.2)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    color: 'white',
                    px: 4,
                    py: 1.5,
                    fontSize: '1.1rem',
                    '&:hover': {
                      background: 'rgba(255, 255, 255, 0.3)',
                      transform: 'translateY(-2px)',
                    },
                  }}
                >
                  Detect My Mood
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => navigate('/signup')}
                  sx={{
                    borderColor: 'rgba(255, 255, 255, 0.5)',
                    color: 'white',
                    px: 4,
                    py: 1.5,
                    fontSize: '1.1rem',
                    '&:hover': {
                      borderColor: 'white',
                      background: 'rgba(255, 255, 255, 0.1)',
                      transform: 'translateY(-2px)',
                    },
                  }}
                >
                  Get Started
                </Button>
              </Box>
            </Box>
          </motion.div>
        </Container>

        {/* Floating Elements */}
        <Box
          sx={{
            position: 'absolute',
            top: '20%',
            left: '10%',
            fontSize: '4rem',
            opacity: 0.1,
            animation: 'float 6s ease-in-out infinite',
            '@keyframes float': {
              '0%, 100%': { transform: 'translateY(0px)' },
              '50%': { transform: 'translateY(-20px)' },
            },
          }}
        >
          🎵
        </Box>
        <Box
          sx={{
            position: 'absolute',
            top: '60%',
            right: '15%',
            fontSize: '3rem',
            opacity: 0.1,
            animation: 'float 4s ease-in-out infinite 2s',
          }}
        >
          🎧
        </Box>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Typography
            variant="h2"
            component="h3"
            textAlign="center"
            sx={{
              mb: 6,
              background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Discover Your Musical Journey
          </Typography>
        </motion.div>

        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={6} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card
                  sx={{
                    height: '100%',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
                    },
                  }}
                  onClick={feature.action}
                >
                  <CardContent sx={{ textAlign: 'center', p: 4 }}>
                    <Box sx={{ mb: 3 }}>
                      {feature.icon}
                    </Box>
                    <Typography variant="h5" component="h4" gutterBottom fontWeight="bold">
                      {feature.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Call to Action Section */}
      <Paper
        sx={{
          background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
          color: 'white',
          py: 8,
          textAlign: 'center',
        }}
      >
        <Container maxWidth="md">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Typography variant="h3" component="h4" gutterBottom fontWeight="bold">
              Ready to Start Your Musical Journey?
            </Typography>
            <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
              Join thousands of users who have discovered their perfect soundtrack
            </Typography>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/mood')}
              sx={{
                background: 'rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                color: 'white',
                px: 6,
                py: 2,
                fontSize: '1.2rem',
                '&:hover': {
                  background: 'rgba(255, 255, 255, 0.3)',
                  transform: 'translateY(-2px)',
                },
              }}
            >
              Start Mood Detection
            </Button>
          </motion.div>
        </Container>
      </Paper>
    </Box>
  );
};

export default Home;