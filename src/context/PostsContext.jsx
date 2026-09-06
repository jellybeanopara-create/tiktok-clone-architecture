import { createContext, useContext, useState, useCallback } from 'react'
import { feedVideos, profileVideos, currentUser } from '../data/mockData'

const PostsContext = createContext(null)
export const usePosts = () => useContext(PostsContext)

// Build unified initial posts from mock data
const initialPosts = [
  ...feedVideos.map(v => ({
    ...v,
    author: v.username,
    duration: '00:30',
    mediaType: 'video',
    videoUrl: null,
  })),
  ...profileVideos.map(v => ({
    id: `p${v.id}`,
    username: currentUser.username,
    author: currentUser.username,
    caption: '',
    hashtags: '',
    audio: 'Original Sound - veltorix',
    likes: '0',
    comments: '0',
    shares: '0',
    saves: '0',
    gradient: v.gradient,
    duration: v.duration,
    mediaType: v.type,
    videoUrl: null,
  })),
]

export function PostsProvider({ children }) {
  const [posts, setPosts] = useState(initialPosts)

  const addPost = useCallback((caption, videoUrl) => {
    const hashtags = caption
      ? caption.split(' ').filter(w => w.startsWith('#')).join(' ')
      : ''
    const newPost = {
      id: `upload-${Date.now()}`,
      username: currentUser.username,
      author: currentUser.username,
      caption: caption || '',
      hashtags,
      audio: 'Original Sound - veltorix',
      likes: '0',
      comments: '0',
      shares: '0',
      saves: '0',
      gradient: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f0c29 100%)',
      duration: '00:00',
      mediaType: 'video',
      videoUrl,
    }
    setPosts(prev => [newPost, ...prev])
    return newPost
  }, [])

  return (
    <PostsContext.Provider value={{ posts, addPost }}>
      {children}
    </PostsContext.Provider>
  )
}
