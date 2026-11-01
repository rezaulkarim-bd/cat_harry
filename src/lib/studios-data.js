// Shared sample data used as a fallback until MongoDB is provisioned.
// Set MONGODB_URI (see src/lib/studios.js) and the same documents will be
// served from the `studios` collection instead.

export const HERO_SLIDES = [
  {
    eyebrow: "Whoever books it, makes it",
    headline: "Find the perfect studio for your next production",
    subtext:
      "Browse thousands of camera-ready spaces — recording, photo, podcast, and more — and lock in your hours in minutes.",
  },
  {
    eyebrow: "Camera-ready, always",
    headline: "Sound stages and photo studios, on demand",
    subtext:
      "Verified hosts, pro-grade equipment, and transparent hourly pricing in every major city.",
  },
  {
    eyebrow: "Own a space?",
    headline: "Turn your studio into steady income",
    subtext:
      "List your space for free, set your own rates, and manage bookings from a single dashboard.",
  },
];

export const SAMPLE_STUDIOS = [
  {
    _id: "studio-1",
    title: "Northside Sound Lab",
    category: "Podcast Room",
    hourlyRate: 35,
    rating: 4.9,
    reviews: 124,
    location: "Brooklyn, NY",
    accent: "from-violet-500 to-fuchsia-500",
    isNew: true,
  },
  {
    _id: "studio-2",
    title: "Aperture Lofts",
    category: "Photo Studio",
    hourlyRate: 60,
    rating: 4.8,
    reviews: 210,
    location: "Jersey City, NJ",
    accent: "from-amber-500 to-rose-500",
    isNew: false,
  },
  {
    _id: "studio-3",
    title: "The Boom Room",
    category: "Music Suite",
    hourlyRate: 45,
    rating: 4.9,
    reviews: 98,
    location: "Brooklyn, NY",
    accent: "from-sky-500 to-indigo-500",
    isNew: false,
  },
  {
    _id: "studio-4",
    title: "Stage 44",
    category: "Sound Stage",
    hourlyRate: 120,
    rating: 5.0,
    reviews: 36,
    location: "Queens, NY",
    accent: "from-emerald-500 to-teal-500",
    isNew: true,
  },
  {
    _id: "studio-5",
    title: "Atelier 09",
    category: "Art Workshop",
    hourlyRate: 28,
    rating: 4.7,
    reviews: 152,
    location: "Bronx, NY",
    accent: "from-orange-500 to-pink-500",
    isNew: false,
  },
  {
    _id: "studio-6",
    title: "Echo Corner Studios",
    category: "Podcast Room",
    hourlyRate: 40,
    rating: 4.8,
    reviews: 87,
    location: "Long Island City, NY",
    accent: "from-cyan-500 to-blue-600",
    isNew: true,
  },
];

export const HOME_CATEGORIES = [
  {
    label: "Photo Studios",
    slug: "photo-studios",
    accent: "from-amber-500/20 to-rose-500/20 text-rose-600 dark:text-rose-400",
    count: null,
  },
  {
    label: "Sound Stages",
    slug: "sound-stages",
    accent: "from-emerald-500/20 to-teal-500/20 text-teal-600 dark:text-teal-400",
    count: null,
  },
  {
    label: "Podcast Rooms",
    slug: "podcast-rooms",
    accent: "from-violet-500/20 to-fuchsia-500/20 text-fuchsia-600 dark:text-fuchsia-400",
    count: null,
  },
  {
    label: "Music Suites",
    slug: "music-suites",
    accent: "from-sky-500/20 to-indigo-500/20 text-indigo-600 dark:text-indigo-400",
    count: null,
  },
  {
    label: "Art Workshops",
    slug: "art-workshops",
    accent: "from-orange-500/20 to-pink-500/20 text-pink-600 dark:text-pink-400",
    count: null,
  },
];
