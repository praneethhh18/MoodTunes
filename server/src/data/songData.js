// Static song data for mood-based recommendations
// TODO: Replace with dynamic API integration (Spotify, Apple Music, etc.)

const songData = {
  happy: [
    {
      id: 1,
      title: "Happy",
      artist: "Pharrell Williams",
      duration: "3:53",
      genre: "Pop"
    },
    {
      id: 2,
      title: "Walking on Sunshine",
      artist: "Katrina and the Waves",
      duration: "3:58",
      genre: "Pop Rock"
    },
    {
      id: 3,
      title: "Good as Hell",
      artist: "Lizzo",
      duration: "2:39",
      genre: "Pop"
    },
    {
      id: 4,
      title: "Can't Stop the Feeling!",
      artist: "Justin Timberlake",
      duration: "3:56",
      genre: "Pop"
    },
    {
      id: 5,
      title: "Uptown Funk",
      artist: "Mark Ronson ft. Bruno Mars",
      duration: "4:30",
      genre: "Funk Pop"
    }
  ],
  sad: [
    {
      id: 6,
      title: "Someone Like You",
      artist: "Adele",
      duration: "4:45",
      genre: "Pop Ballad"
    },
    {
      id: 7,
      title: "Hurt",
      artist: "Johnny Cash",
      duration: "3:38",
      genre: "Alternative Country"
    },
    {
      id: 8,
      title: "Mad World",
      artist: "Gary Jules",
      duration: "3:07",
      genre: "Alternative"
    },
    {
      id: 9,
      title: "The Sound of Silence",
      artist: "Simon & Garfunkel",
      duration: "3:05",
      genre: "Folk"
    },
    {
      id: 10,
      title: "Everybody Hurts",
      artist: "R.E.M.",
      duration: "5:17",
      genre: "Alternative Rock"
    }
  ],
  neutral: [
    {
      id: 11,
      title: "Breathe Me",
      artist: "Sia",
      duration: "4:31",
      genre: "Alternative"
    },
    {
      id: 12,
      title: "Fix You",
      artist: "Coldplay",
      duration: "4:54",
      genre: "Alternative Rock"
    },
    {
      id: 13,
      title: "Imagine",
      artist: "John Lennon",
      duration: "3:03",
      genre: "Rock"
    },
    {
      id: 14,
      title: "The Middle",
      artist: "Jimmy Eat World",
      duration: "2:46",
      genre: "Alternative Rock"
    },
    {
      id: 15,
      title: "Weightless",
      artist: "Marconi Union",
      duration: "8:08",
      genre: "Ambient"
    }
  ],
  angry: [
    {
      id: 16,
      title: "Break Stuff",
      artist: "Limp Bizkit",
      duration: "2:47",
      genre: "Nu Metal"
    },
    {
      id: 17,
      title: "Bodies",
      artist: "Drowning Pool",
      duration: "3:23",
      genre: "Nu Metal"
    },
    {
      id: 18,
      title: "Killing in the Name",
      artist: "Rage Against the Machine",
      duration: "5:14",
      genre: "Alternative Metal"
    },
    {
      id: 19,
      title: "Chop Suey!",
      artist: "System of a Down",
      duration: "3:30",
      genre: "Alternative Metal"
    },
    {
      id: 20,
      title: "B.Y.O.B.",
      artist: "System of a Down",
      duration: "4:15",
      genre: "Alternative Metal"
    }
  ],
  relaxed: [
    {
      id: 21,
      title: "Clair de Lune",
      artist: "Claude Debussy",
      duration: "5:03",
      genre: "Classical"
    },
    {
      id: 22,
      title: "Weightless",
      artist: "Marconi Union",
      duration: "8:08",
      genre: "Ambient"
    },
    {
      id: 23,
      title: "River",
      artist: "Joni Mitchell",
      duration: "4:00",
      genre: "Folk"
    },
    {
      id: 24,
      title: "Aqueous Transmission",
      artist: "Incubus",
      duration: "7:49",
      genre: "Alternative Rock"
    },
    {
      id: 25,
      title: "Mad About You",
      artist: "Sting",
      duration: "3:56",
      genre: "Pop"
    }
  ]
};

module.exports = songData;