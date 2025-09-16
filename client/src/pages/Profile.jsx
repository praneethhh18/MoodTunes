import React, { useState } from 'react';
import {
  Box,
  Typography,
  Container,
  Card,
  CardContent,
  Avatar,
  Grid,
  Chip,
  Paper,
  Button,
  IconButton,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  LinearProgress,
} from '@mui/material';
import {
  Edit as EditIcon,
  Share as ShareIcon,
  MusicNote as MusicNoteIcon,
  Favorite as FavoriteIcon,
  TrendingUp as TrendingUpIcon,
  People as PeopleIcon,
  PlaylistPlay as PlaylistPlayIcon,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const Profile = () => {
  const [tabValue, setTabValue] = useState(0);

  // Mock user data
  const userData = {
    name: "Alex Johnson",
    username: "@alexj_music",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    bio: "Music lover • Mood explorer • Playlist curator",
    stats: {
      tracksPlayed: 1247,
      playlistsCreated: 23,
      favoriteSongs: 89,
      following: 156,
      followers: 234,
    },
    currentMood: { emoji: '😊', name: 'Happy', color: '#22c55e' },
    moodHistory: [
      { date: '2024-01-15', mood: '😊', name: 'Happy', tracks: 12 },
      { date: '2024-01-14', mood: '😴', name: 'Relaxed', tracks: 8 },
      { date: '2024-01-13', mood: '🎉', name: 'Excited', tracks: 15 },
      { date: '2024-01-12', mood: '🤔', name: 'Thoughtful', tracks: 6 },
      { date: '2024-01-11', mood: '😎', name: 'Confident', tracks: 10 },
    ],
    topGenres: [
      { name: 'Pop', percentage: 35, color: '#6366f1' },
      { name: 'R&B', percentage: 25, color: '#ec4899' },
      { name: 'Electronic', percentage: 20, color: '#3b82f6' },
      { name: 'Indie', percentage: 15, color: '#f59e0b' },
      { name: 'Others', percentage: 5, color: '#8b5cf6' },
    ],
    recentPlaylists: [
      { id: 1, name: 'Happy Vibes', tracks: 24, image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=80&h=80&fit=crop' },
      { id: 2, name: 'Chill Evening', tracks: 18, image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=80&h=80&fit=crop' },
      { id: 3, name: 'Workout Energy', tracks: 32, image: 'https://images.unsplash.com/photo-1571974599782-87624638275b?w=80&h=80&fit=crop' },
    ],
    friends: [
      { id: 1, name: 'Sarah Wilson', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b02c?w=50&h=50&fit=crop&crop=face', currentMood: '🎵' },
      { id: 2, name: 'Mike Chen', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face', currentMood: '😴' },
      { id: 3, name: 'Emma Davis', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop&crop=face', currentMood: '🎉' },
    ],
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const TabPanel = ({ children, value, index }) => (
    <div hidden={value !== index}>
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Paper
          sx={{
            p: 4,
            mb: 4,
            background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)',
            color: 'white',
            borderRadius: 4,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Background Pattern */}
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              right: 0,
              fontSize: '15rem',
              opacity: 0.1,
              lineHeight: 1,
            }}
          >
            🎵
          </Box>

          <Grid container spacing={3} alignItems="center">
            <Grid item>
              <Avatar
                src={userData.avatar}
                sx={{
                  width: 120,
                  height: 120,
                  border: '4px solid rgba(255, 255, 255, 0.3)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
                }}
              />
            </Grid>
            
            <Grid item xs>
              <Typography variant="h3" component="h1" fontWeight="bold" gutterBottom>
                {userData.name}
              </Typography>
              <Typography variant="h6" sx={{ opacity: 0.9, mb: 1 }}>
                {userData.username}
              </Typography>
              <Typography variant="body1" sx={{ opacity: 0.8, mb: 2 }}>
                {userData.bio}
              </Typography>
              
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <Chip
                  label={`Currently: ${userData.currentMood.emoji} ${userData.currentMood.name}`}
                  sx={{
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    color: 'white',
                    fontWeight: 'bold',
                  }}
                />
              </Box>
              
              <Box sx={{ display: 'flex', gap: 4 }}>
                <Box textAlign="center">
                  <Typography variant="h6" fontWeight="bold">
                    {userData.stats.tracksPlayed}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    Tracks Played
                  </Typography>
                </Box>
                <Box textAlign="center">
                  <Typography variant="h6" fontWeight="bold">
                    {userData.stats.playlistsCreated}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    Playlists
                  </Typography>
                </Box>
                <Box textAlign="center">
                  <Typography variant="h6" fontWeight="bold">
                    {userData.stats.followers}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    Followers
                  </Typography>
                </Box>
                <Box textAlign="center">
                  <Typography variant="h6" fontWeight="bold">
                    {userData.stats.following}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    Following
                  </Typography>
                </Box>
              </Box>
            </Grid>
            
            <Grid item>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <IconButton
                  sx={{
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    color: 'white',
                    '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.3)' },
                  }}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  sx={{
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    color: 'white',
                    '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.3)' },
                  }}
                >
                  <ShareIcon />
                </IconButton>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Paper sx={{ mb: 3 }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            variant="fullWidth"
            sx={{
              '& .MuiTab-root': {
                fontWeight: 'bold',
                fontSize: '1rem',
              },
            }}
          >
            <Tab label="Overview" icon={<TrendingUpIcon />} />
            <Tab label="Playlists" icon={<PlaylistPlayIcon />} />
            <Tab label="Friends" icon={<PeopleIcon />} />
          </Tabs>
        </Paper>

        {/* Overview Tab */}
        <TabPanel value={tabValue} index={0}>
          <Grid container spacing={3}>
            {/* Mood History */}
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom fontWeight="bold">
                    Recent Mood History
                  </Typography>
                  <List>
                    {userData.moodHistory.map((entry, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <ListItem>
                          <ListItemAvatar>
                            <Avatar sx={{ backgroundColor: 'primary.light' }}>
                              {entry.mood}
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText
                            primary={entry.name}
                            secondary={`${entry.date} • ${entry.tracks} tracks`}
                          />
                        </ListItem>
                        {index < userData.moodHistory.length - 1 && <Divider />}
                      </motion.div>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </Grid>

            {/* Top Genres */}
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom fontWeight="bold">
                    Top Genres
                  </Typography>
                  {userData.topGenres.map((genre, index) => (
                    <motion.div
                      key={genre.name}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <Box sx={{ mb: 2 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                          <Typography variant="body1" fontWeight="medium">
                            {genre.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {genre.percentage}%
                          </Typography>
                        </Box>
                        <LinearProgress
                          variant="determinate"
                          value={genre.percentage}
                          sx={{
                            height: 8,
                            borderRadius: 4,
                            backgroundColor: 'grey.200',
                            '& .MuiLinearProgress-bar': {
                              backgroundColor: genre.color,
                              borderRadius: 4,
                            },
                          }}
                        />
                      </Box>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </Grid>

            {/* Activity Stats */}
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom fontWeight="bold">
                    Music Activity
                  </Typography>
                  <Grid container spacing={3}>
                    <Grid item xs={6} sm={3}>
                      <Box textAlign="center">
                        <MusicNoteIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
                        <Typography variant="h5" fontWeight="bold">
                          {userData.stats.tracksPlayed}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Total Tracks
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      <Box textAlign="center">
                        <PlaylistPlayIcon sx={{ fontSize: 40, color: 'secondary.main', mb: 1 }} />
                        <Typography variant="h5" fontWeight="bold">
                          {userData.stats.playlistsCreated}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Playlists Created
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      <Box textAlign="center">
                        <FavoriteIcon sx={{ fontSize: 40, color: 'error.main', mb: 1 }} />
                        <Typography variant="h5" fontWeight="bold">
                          {userData.stats.favoriteSongs}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Liked Songs
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={6} sm={3}>
                      <Box textAlign="center">
                        <PeopleIcon sx={{ fontSize: 40, color: 'info.main', mb: 1 }} />
                        <Typography variant="h5" fontWeight="bold">
                          {userData.stats.followers}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Followers
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>

        {/* Playlists Tab */}
        <TabPanel value={tabValue} index={1}>
          <Grid container spacing={3}>
            {userData.recentPlaylists.map((playlist, index) => (
              <Grid item xs={12} sm={6} md={4} key={playlist.id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <Card sx={{ cursor: 'pointer' }}>
                    <Box sx={{ position: 'relative' }}>
                      <CardContent sx={{ p: 3 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <Avatar
                            src={playlist.image}
                            sx={{ width: 60, height: 60, mr: 2, borderRadius: 2 }}
                          />
                          <Box>
                            <Typography variant="h6" fontWeight="bold">
                              {playlist.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {playlist.tracks} tracks
                            </Typography>
                          </Box>
                        </Box>
                        <Button
                          variant="outlined"
                          fullWidth
                          startIcon={<PlaylistPlayIcon />}
                        >
                          View Playlist
                        </Button>
                      </CardContent>
                    </Box>
                  </Card>
                </motion.div>
              </Grid>
            ))}
            
            <Grid item xs={12} sm={6} md={4}>
              <Card
                sx={{
                  cursor: 'pointer',
                  border: '2px dashed',
                  borderColor: 'grey.300',
                  '&:hover': { borderColor: 'primary.main' },
                }}
              >
                <CardContent sx={{ textAlign: 'center', py: 6 }}>
                  <PlaylistPlayIcon sx={{ fontSize: 60, color: 'grey.400', mb: 2 }} />
                  <Typography variant="h6" color="text.secondary">
                    Create New Playlist
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>

        {/* Friends Tab */}
        <TabPanel value={tabValue} index={2}>
          <Grid container spacing={3}>
            {userData.friends.map((friend, index) => (
              <Grid item xs={12} sm={6} md={4} key={friend.id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card>
                    <CardContent sx={{ textAlign: 'center', p: 3 }}>
                      <Avatar
                        src={friend.avatar}
                        sx={{ width: 80, height: 80, mx: 'auto', mb: 2 }}
                      />
                      <Typography variant="h6" fontWeight="bold" gutterBottom>
                        {friend.name}
                      </Typography>
                      <Chip
                        label={`Currently: ${friend.currentMood}`}
                        size="small"
                        color="primary"
                        sx={{ mb: 2 }}
                      />
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button variant="outlined" size="small" fullWidth>
                          View Profile
                        </Button>
                        <Button variant="contained" size="small" fullWidth>
                          Share Music
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </TabPanel>
      </motion.div>
    </Container>
  );
};

export default Profile;