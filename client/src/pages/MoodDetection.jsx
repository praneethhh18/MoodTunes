import React, { useState } from 'react';
import {
  Box,
  Typography,
  Container,
  Card,
  CardContent,
  Button,
  Grid,
  Chip,
  Slider,
  Paper,
  Stepper,
  Step,
  StepLabel,
  LinearProgress,
  Avatar,
} from '@mui/material';
import {
  Psychology as PsychologyIcon,
  MusicNote as MusicNoteIcon,
  TrendingUp as TrendingUpIcon,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const MoodDetection = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [selectedMood, setSelectedMood] = useState('');
  const [energyLevel, setEnergyLevel] = useState(50);
  const [selectedActivities, setSelectedActivities] = useState([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const navigate = useNavigate();

  const moods = [
    { emoji: '😊', name: 'Happy', color: '#22c55e' },
    { emoji: '😢', name: 'Sad', color: '#3b82f6' },
    { emoji: '😴', name: 'Relaxed', color: '#8b5cf6' },
    { emoji: '😠', name: 'Angry', color: '#ef4444' },
    { emoji: '🥰', name: 'Romantic', color: '#ec4899' },
    { emoji: '😎', name: 'Confident', color: '#f59e0b' },
    { emoji: '😰', name: 'Anxious', color: '#6b7280' },
    { emoji: '🤔', name: 'Thoughtful', color: '#06b6d4' },
    { emoji: '🎉', name: 'Excited', color: '#f97316' },
  ];

  const activities = [
    'Working out', 'Studying', 'Driving', 'Cooking', 'Reading',
    'Partying', 'Relaxing', 'Focusing', 'Dancing', 'Walking'
  ];

  const steps = ['Select Mood', 'Energy Level', 'Activities', 'Analysis'];

  const handleMoodSelect = (mood) => {
    setSelectedMood(mood);
    setTimeout(() => setActiveStep(1), 300);
  };

  const handleActivityToggle = (activity) => {
    setSelectedActivities(prev => 
      prev.includes(activity)
        ? prev.filter(a => a !== activity)
        : [...prev, activity]
    );
  };

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      setIsAnalyzing(true);
      setTimeout(() => {
        navigate('/recommendations', { 
          state: { 
            mood: selectedMood, 
            energy: energyLevel, 
            activities: selectedActivities 
          } 
        });
      }, 3000);
    } else {
      setActiveStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    setActiveStep(prev => prev - 1);
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Typography variant="h4" textAlign="center" gutterBottom>
              How are you feeling right now?
            </Typography>
            <Typography variant="body1" textAlign="center" color="text.secondary" sx={{ mb: 4 }}>
              Select the emoji that best represents your current mood
            </Typography>
            
            <Grid container spacing={2} justifyContent="center">
              {moods.map((mood) => (
                <Grid item key={mood.name}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Paper
                      elevation={selectedMood.name === mood.name ? 8 : 2}
                      sx={{
                        p: 3,
                        textAlign: 'center',
                        cursor: 'pointer',
                        border: selectedMood.name === mood.name ? `3px solid ${mood.color}` : 'none',
                        backgroundColor: selectedMood.name === mood.name ? `${mood.color}20` : 'white',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-5px)',
                          boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
                        },
                      }}
                      onClick={() => handleMoodSelect(mood)}
                    >
                      <Typography sx={{ fontSize: '3rem', mb: 1 }}>
                        {mood.emoji}
                      </Typography>
                      <Typography variant="h6" fontWeight="bold">
                        {mood.name}
                      </Typography>
                    </Paper>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        );

      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Typography variant="h4" textAlign="center" gutterBottom>
              What's your energy level?
            </Typography>
            <Typography variant="body1" textAlign="center" color="text.secondary" sx={{ mb: 4 }}>
              Adjust the slider to match your current energy
            </Typography>

            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <Typography sx={{ fontSize: '4rem', mb: 2 }}>
                {selectedMood.emoji}
              </Typography>
              <Typography variant="h5" color="primary" fontWeight="bold">
                {selectedMood.name}
              </Typography>
            </Box>

            <Box sx={{ px: 4 }}>
              <Typography variant="h6" textAlign="center" gutterBottom>
                Energy Level: {energyLevel}%
              </Typography>
              <Slider
                value={energyLevel}
                onChange={(_, value) => setEnergyLevel(value)}
                step={10}
                marks
                min={0}
                max={100}
                valueLabelDisplay="auto"
                sx={{
                  '& .MuiSlider-thumb': {
                    height: 24,
                    width: 24,
                    backgroundColor: selectedMood.color,
                  },
                  '& .MuiSlider-track': {
                    backgroundColor: selectedMood.color,
                  },
                  '& .MuiSlider-rail': {
                    backgroundColor: '#e0e0e0',
                  },
                }}
              />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                <Typography variant="body2" color="text.secondary">😴 Low</Typography>
                <Typography variant="body2" color="text.secondary">🚀 High</Typography>
              </Box>
            </Box>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Typography variant="h4" textAlign="center" gutterBottom>
              What are you doing?
            </Typography>
            <Typography variant="body1" textAlign="center" color="text.secondary" sx={{ mb: 4 }}>
              Select activities that match your current situation
            </Typography>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'center' }}>
              {activities.map((activity) => (
                <motion.div
                  key={activity}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Chip
                    label={activity}
                    onClick={() => handleActivityToggle(activity)}
                    color={selectedActivities.includes(activity) ? 'primary' : 'default'}
                    variant={selectedActivities.includes(activity) ? 'filled' : 'outlined'}
                    sx={{
                      m: 0.5,
                      fontSize: '1rem',
                      p: 2,
                      height: 'auto',
                      '&:hover': {
                        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                      },
                    }}
                  />
                </motion.div>
              ))}
            </Box>

            <Box sx={{ mt: 4, textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                Selected: {selectedActivities.length} activities
              </Typography>
            </Box>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Typography variant="h4" textAlign="center" gutterBottom>
              Analyzing Your Mood
            </Typography>
            <Typography variant="body1" textAlign="center" color="text.secondary" sx={{ mb: 4 }}>
              We're creating the perfect playlist for you...
            </Typography>

            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <PsychologyIcon sx={{ fontSize: 80, color: 'primary.main', mb: 2 }} />
              </motion.div>
              
              <Typography variant="h6" gutterBottom>
                Processing your mood data...
              </Typography>
              
              <LinearProgress 
                sx={{ 
                  width: '60%', 
                  mx: 'auto', 
                  mb: 3,
                  height: 8,
                  borderRadius: 4,
                  '& .MuiLinearProgress-bar': {
                    background: 'linear-gradient(90deg, #6366f1 0%, #ec4899 100%)',
                  }
                }} 
              />

              <Grid container spacing={2} justifyContent="center" sx={{ mt: 2 }}>
                <Grid item>
                  <Card sx={{ p: 2, minWidth: 120, textAlign: 'center' }}>
                    <Typography sx={{ fontSize: '2rem', mb: 1 }}>
                      {selectedMood.emoji}
                    </Typography>
                    <Typography variant="body2" fontWeight="bold">
                      {selectedMood.name}
                    </Typography>
                  </Card>
                </Grid>
                <Grid item>
                  <Card sx={{ p: 2, minWidth: 120, textAlign: 'center' }}>
                    <Typography sx={{ fontSize: '2rem', mb: 1 }}>
                      ⚡
                    </Typography>
                    <Typography variant="body2" fontWeight="bold">
                      {energyLevel}% Energy
                    </Typography>
                  </Card>
                </Grid>
                <Grid item>
                  <Card sx={{ p: 2, minWidth: 120, textAlign: 'center' }}>
                    <Typography sx={{ fontSize: '2rem', mb: 1 }}>
                      🎯
                    </Typography>
                    <Typography variant="body2" fontWeight="bold">
                      {selectedActivities.length} Activities
                    </Typography>
                  </Card>
                </Grid>
              </Grid>
            </Box>
          </motion.div>
        );

      default:
        return 'Unknown step';
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Typography
          variant="h2"
          component="h1"
          textAlign="center"
          sx={{
            mb: 2,
            background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Mood Detection
        </Typography>
        <Typography variant="h6" textAlign="center" color="text.secondary" sx={{ mb: 6 }}>
          Let's discover music that perfectly matches your vibe
        </Typography>

        <Stepper activeStep={activeStep} sx={{ mb: 6 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Card sx={{ minHeight: 400, mb: 4 }}>
          <CardContent sx={{ p: 4 }}>
            <AnimatePresence mode="wait">
              {getStepContent(activeStep)}
            </AnimatePresence>
          </CardContent>
        </Card>

        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
            variant="outlined"
            size="large"
          >
            Back
          </Button>
          
          <Button
            variant="contained"
            onClick={handleNext}
            disabled={
              (activeStep === 0 && !selectedMood) ||
              (activeStep === 2 && selectedActivities.length === 0) ||
              isAnalyzing
            }
            size="large"
          >
            {activeStep === steps.length - 1 ? 
              (isAnalyzing ? 'Analyzing...' : 'Get Recommendations') : 
              'Next'
            }
          </Button>
        </Box>
      </motion.div>
    </Container>
  );
};

export default MoodDetection;