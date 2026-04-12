import { Movie } from './types';

export const MOVIES: Movie[] = [
  {
    id: '1',
    title: 'Kantara',
    thumbnail: 'https://picsum.photos/seed/kantara/400/600',
    backdrop: 'https://picsum.photos/seed/kantara-bg/1920/1080',
    category: 'Trending Now',
    language: 'Kannada',
    year: 2022,
    description: 'When greed paves the way for betrayal, scheming and murder, a young tribal reluctantly dons the traditions of his ancestors to seek justice.',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    chapters: [
      { title: 'Introduction', time: 0 },
      { title: 'The Ritual', time: 300 },
      { title: 'The Conflict', time: 900 },
      { title: 'Climax', time: 1500 }
    ]
  },
  {
    id: '2',
    title: 'Pushpa: The Rise',
    thumbnail: 'https://picsum.photos/seed/pushpa/400/600',
    backdrop: 'https://picsum.photos/seed/pushpa-bg/1920/1080',
    category: 'Trending Now',
    language: 'Telugu',
    year: 2021,
    description: 'Violence erupts between red sandalwood smugglers and the police in the Seshachalam forests of South India.',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    chapters: [
      { title: 'Rise of Pushpa', time: 0 },
      { title: 'The Smuggling', time: 600 },
      { title: 'Police Raid', time: 1200 },
      { title: 'Final Showdown', time: 1800 }
    ]
  }
];
