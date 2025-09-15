import ShareButtons from './ShareButtons'

const PlaylistRecommendation = ({ mood, playlist }) => {
  const getMoodEmoji = (mood) => {
    const moodEmojis = {
      happy: '😊',
      sad: '😢',
      energetic: '⚡',
      relaxed: '😌'
    }
    return moodEmojis[mood] || '🎵'
  }

  const formatPlaylistForSharing = () => {
    return playlist.slice(0, 3).map(song => `${song.title} - ${song.artist}`).join(', ')
  }

  return (
    <div className="playlist-section">
      <h2>
        {getMoodEmoji(mood)} Your {mood.charAt(0).toUpperCase() + mood.slice(1)} Playlist
      </h2>
      <p>Based on your current mood, here are some songs we think you'll love:</p>
      
      <div className="playlist">
        {playlist.map((song, index) => (
          <div key={song.id} className="playlist-item">
            <div>
              <strong>{index + 1}. {song.title}</strong>
              <div style={{ fontSize: '14px', opacity: 0.8 }}>
                by {song.artist} • {song.duration}
              </div>
            </div>
          </div>
        ))}
      </div>

      <ShareButtons 
        type="playlist"
        mood={mood}
        playlist={playlist}
        shareText={`Check out my ${mood} mood playlist on MoodTunes! 🎵 Featuring: ${formatPlaylistForSharing()} and more!`}
      />
      
      {/* TODO: Future enhancements
          - Add playlist voting/rating system
          - Implement collaborative playlists for groups
          - Add mood-based challenges/competitions
          - Include privacy controls for shared playlists
          - Add playlist export to Spotify/Apple Music
          - Implement playlist history and favorites
      */}
    </div>
  )
}

export default PlaylistRecommendation