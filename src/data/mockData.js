// Mock data for the Veltorix app

export const currentUser = {
  username: 'veltorix',
  displayName: 'Veltorix',
  bio: 'Explorer of the unknown. Mapping the world one trail at a time.',
  avatar: null,
  following: 128,
  followers: '2.4K',
  posts: 24,
  videos: 18,
  likes: 156,
  views: '7.2K',
  coins: 750,
  subscription: 'free',
};

export const feedVideos = [
  {
    id: 1,
    username: 'veltorix',
    caption: 'Lost beyond the maps. Some places don\u2019t want to be found.',
    hashtags: '#veltorix #explore #unknown #cinematic',
    audio: 'VELTORIX \u2022 Beyond the Maps',
    likes: '12.8K',
    comments: '256',
    shares: '1.2K',
    saves: '3.4K',
    gradient: 'linear-gradient(135deg, #1a2a3a 0%, #0d1f2d 40%, #0a1520 100%)',
  },
  {
    id: 2,
    username: 'summit_seeker',
    caption: 'Dawn patrol on the ridgeline. No trail, no problem.',
    hashtags: '#hiking #sunrise #peaks #adventure',
    audio: 'Echoes - Alpine Sessions',
    likes: '8.4K',
    comments: '142',
    shares: '670',
    saves: '2.1K',
    gradient: 'linear-gradient(135deg, #2a1a0d 0%, #1e1505 40%, #120a00 100%)',
  },
  {
    id: 3,
    username: 'trailfinders',
    caption: 'New trail discovered near the coast. Full map in bio.',
    hashtags: '#coast #trail #explore #nature',
    audio: 'Ocean Drift - Veltorix Originals',
    likes: '5.6K',
    comments: '89',
    shares: '430',
    saves: '1.8K',
    gradient: 'linear-gradient(135deg, #0d2a2a 0%, #051e1e 40%, #031515 100%)',
  },
];

export const discoverPlaces = [
  { id: 1, name: 'Hidden Peaks', tag: 'Trending', views: '12.4K', location: 'Swiss Alps', gradient: 'linear-gradient(160deg, #2a3a4a, #1a2a3a, #0a1a2a)' },
  { id: 2, name: 'Coastal Routes', tag: 'New', views: '8.7K', location: 'Big Sur, CA', gradient: 'linear-gradient(160deg, #1a3a4a, #0a2a3a, #051a2a)' },
  { id: 3, name: 'Night Trails', tag: 'Trending', views: '5.3K', location: 'Black Forest, DE', gradient: 'linear-gradient(160deg, #1a1a3a, #0a0a2a, #05051a)' },
  { id: 4, name: 'Alpine Lakes', tag: 'New', views: '9.1K', location: 'Banff, AB', gradient: 'linear-gradient(160deg, #2a3a2a, #1a2a1a, #0a1a0a)' },
  { id: 5, name: 'Canyon Traverses', tag: 'New', views: '3.2K', location: 'Sedona, AZ', gradient: 'linear-gradient(160deg, #3a2a1a, #2a1a0a, #1a0a05)' },
  { id: 6, name: 'Glacier Paths', tag: 'Trending', views: '7.8K', location: 'Patagonia, AR', gradient: 'linear-gradient(160deg, #1a2a3a, #0a1a2a, #050a1a)' },
];

export const messageThreads = [
  { id: 1, name: '@explorer', preview: 'Check out this route I mapped.', time: '9:36 AM', unread: false },
  { id: 2, name: 'Travel Crew', preview: 'Sarah: When are we leaving?', time: '8:52 AM', unread: true },
  { id: 3, name: 'Veltorix Official', preview: 'Welcome to Veltorix. Explore.', time: 'Yesterday', unread: false },
  { id: 4, name: 'Anna', preview: 'Thanks for the tips!', time: 'Yesterday', unread: false },
  { id: 5, name: 'Trailfinders', preview: 'New trail added near you.', time: 'Mon', unread: false },
  { id: 6, name: '@summit_seeker', preview: 'Let\u2019s hit the peaks this weekend.', time: 'Mon', unread: false },
  { id: 7, name: 'Map Share', preview: 'Your shared map was viewed.', time: 'Sun', unread: false },
];

export const chatMessages = {
  1: [
    { id: 1, sender: 'them', type: 'text', text: 'Hey! Did you see the new trail I found?' },
    { id: 2, sender: 'me', type: 'text', text: 'Not yet! Where is it?' },
    { id: 3, sender: 'them', type: 'text', text: 'Check out this route I mapped.' },
    { id: 4, sender: 'them', type: 'link', text: 'https://veltorix.app/maps/hidden-peaks' },
    { id: 5, sender: 'me', type: 'text', text: 'That looks incredible. Adding it to my list!' },
  ],
  2: [
    { id: 1, sender: 'them', type: 'text', text: 'Sarah: When are we leaving?' },
    { id: 2, sender: 'me', type: 'text', text: 'Saturday morning, 6 AM sharp.' },
  ],
};

export const profileVideos = [
  { id: 1, duration: '03:12', type: 'video', gradient: 'linear-gradient(160deg, #2a3a4a, #0a1a2a)' },
  { id: 2, duration: '05:47', type: 'video', gradient: 'linear-gradient(160deg, #1a3a2a, #0a1a1a)' },
  { id: 3, duration: '04:31', type: 'gallery', gradient: 'linear-gradient(160deg, #3a2a1a, #1a0a05)' },
  { id: 4, duration: '02:58', type: 'video', gradient: 'linear-gradient(160deg, #1a2a3a, #050a1a)' },
  { id: 5, duration: '06:19', type: 'video', gradient: 'linear-gradient(160deg, #2a1a3a, #0a051a)' },
  { id: 6, duration: '03:45', type: 'gallery', gradient: 'linear-gradient(160deg, #1a3a3a, #051a1a)' },
  { id: 7, duration: '04:02', type: 'video', gradient: 'linear-gradient(160deg, #3a3a1a, #1a1a05)' },
  { id: 8, duration: '05:33', type: 'video', gradient: 'linear-gradient(160deg, #2a2a3a, #0a0a1a)' },
  { id: 9, duration: '02:21', type: 'video', gradient: 'linear-gradient(160deg, #1a2a2a, #050a1a)' },
];

export const workouts = [
  { id: 1, title: 'Full Body HIIT Burn', description: 'High-intensity interval training targeting all major muscle groups.', duration: 30, calories: 420 },
  { id: 2, title: 'Core Crusher', description: '15 minutes of intense core work. No equipment needed.', duration: 15, calories: 180 },
  { id: 3, title: 'Trail Runner Strength', description: 'Build the legs and lungs for your next big hike.', duration: 45, calories: 350 },
  { id: 4, title: 'Mobility & Recovery', description: 'Active recovery flow to keep you moving pain-free.', duration: 20, calories: 90 },
];

export const gifts = [
  { name: 'Heart', cost: 50, icon: '\u2665', color: '#FF3B30' },
  { name: 'Star', cost: 150, icon: '\u2605', color: '#FFD60A' },
  { name: 'Golden Dumbbell', cost: 100, icon: '\uD83C\uDFCB', color: '#FF9500' },
  { name: 'Crown', cost: 500, icon: '\u2654', color: '#FFD700' },
];

export const countries = [
  'United States', 'Nigeria', 'United Kingdom', 'India', 'Canada', 'Germany',
  'France', 'Japan', 'China', 'Brazil', 'South Africa', 'Egypt', 'Kenya',
  'Australia', 'Mexico', 'Spain', 'Italy', 'Netherlands', 'Sweden', 'Norway',
  'Argentina', 'South Korea', 'Indonesia', 'Thailand', 'Vietnam', 'Turkey',
  'Saudi Arabia', 'UAE', 'Morocco', 'Ghana', 'Ethiopia', 'Poland',
];

export const adminUsers = [
  { id: 1, username: '@veltorix', userCode: 'VEL-839204', ip: '102.89.34.12', country: 'Nigeria', city: 'Lagos', suspended: false },
  { id: 2, username: '@explorer', userCode: 'VEL-204918', ip: '24.91.12.44', country: 'United States', city: 'Denver', suspended: false },
  { id: 3, username: '@summit_seeker', userCode: 'VEL-571038', ip: '91.214.55.8', country: 'Germany', city: 'Munich', suspended: false },
  { id: 4, username: '@anna_trails', userCode: 'VEL-920134', ip: '188.12.90.7', country: 'United Kingdom', city: 'London', suspended: false },
  { id: 5, username: '@hiker_dan', userCode: 'VEL-102938', ip: '34.210.1.88', country: 'Canada', city: 'Banff', suspended: true },
];
