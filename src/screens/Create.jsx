import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { usePosts } from '../context/PostsContext'

export default function Create() {
  const [tab, setTab] = useState(1) // 0=Photo, 1=Video, 2=Live
  const [videoUrl, setVideoUrl] = useState(null)
  const [caption, setCaption] = useState('')
  const navigate = useNavigate()
  const { addPost } = usePosts()
  const fileInputRef = useRef(null)
  const tabs = ['Photo', 'Video', 'Live']

  const handleFileSelect = (e) => {
    const file = e.target.files[0]
    if (file) {
      setVideoUrl(URL.createObjectURL(file))
    }
  }

  const handlePost = () => {
    addPost(caption, videoUrl)
    navigate('/home')
  }

  // Upload / caption screen when a file is selected
  if (videoUrl) {
    return (
      <div className="screen" style={{ background: '#000', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px' }}>
          <button onClick={() => { setVideoUrl(null); setCaption('') }} style={{ fontSize: 22, color: '#fff' }}>{'\u2715'}</button>
          <span style={{ fontWeight: 600, fontSize: 17 }}>New Post</span>
          <button onClick={handlePost} style={{ color: '#3B82F6', fontWeight: 700, fontSize: 16 }}>Post</button>
        </div>

        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
          <video src={videoUrl} controls playsInline style={{ maxWidth: '100%', maxHeight: '100%', borderRadius: 12 }} />
        </div>

        <div style={{ padding: 16, borderTop: '1px solid #1a1a1a' }}>
          <textarea
            value={caption}
            onChange={e => setCaption(e.target.value)}
            placeholder="Write a caption..."
            style={{
              width: '100%', minHeight: 80, padding: '12px 16px',
              borderRadius: 12, background: '#1E1E1E', border: '1px solid #333',
              color: '#fff', fontSize: 15, outline: 'none', resize: 'none',
            }}
          />
        </div>
      </div>
    )
  }

  // Default camera screen
  return (
    <div className="screen" style={{ background: '#000', display: 'flex', flexDirection: 'column' }}>
      <input ref={fileInputRef} type="file" accept="video/*" style={{ display: 'none' }} onChange={handleFileSelect} />

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px' }}>
        <button onClick={() => navigate('/home')} style={{ fontSize: 22, color: '#fff' }}>{'\u2715'}</button>
        <span style={{ fontWeight: 600, fontSize: 17 }}>Create</span>
        <div style={{ display: 'flex', gap: 16 }}>
          <span style={{ fontSize: 18 }}>{'\u26A1'}</span>
          <span>{'\u2699\uFE0F'}</span>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 0, marginBottom: 16 }}>
        {tabs.map((t, i) => (
          <button
            key={t}
            onClick={() => setTab(i)}
            style={{
              padding: '8px 24px',
              fontSize: 14,
              fontWeight: tab === i ? 700 : 400,
              color: tab === i ? '#fff' : '#707070',
              borderBottom: tab === i ? '2px solid #fff' : '2px solid transparent',
              background: 'none',
            }}
          >{t}</button>
        ))}
      </div>

      {/* Camera viewport with 3x3 grid */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
        <div style={{
          width: '100%', maxWidth: 320, aspectRatio: '3/4',
          border: '1px solid rgba(255,255,255,0.3)', borderRadius: 8,
          display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gridTemplateRows: '1fr 1fr 1fr',
          position: 'relative',
          background: tab === 2 ? 'rgba(255,59,48,0.05)' : 'transparent',
        }}>
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} style={{ borderRight: i % 3 < 2 ? '1px solid rgba(255,255,255,0.1)' : 'none', borderBottom: i < 6 ? '1px solid rgba(255,255,255,0.1)' : 'none' }} />
          ))}
        </div>
      </div>

      {/* Bottom controls */}
      <div style={{ padding: '8px 16px 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', marginBottom: 20 }}>
          {/* Gallery - triggers file picker */}
          <div
            onClick={() => fileInputRef.current?.click()}
            style={{
              width: 48, height: 48, borderRadius: 10,
              border: '1px solid #444', background: '#1E1E1E',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 20, cursor: 'pointer',
            }}>{'\uD83D\uDDBC'}</div>

          {/* Record button */}
          <div style={{
            width: 72, height: 72, borderRadius: '50%',
            border: `4px solid ${tab === 2 ? '#FF3B30' : '#fff'}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: tab === 2 ? '0 0 20px rgba(255,59,48,0.4)' : 'none',
          }}>
            <div style={{
              width: 56, height: 56, borderRadius: '50%',
              background: tab === 2 ? '#FF3B30' : '#fff',
            }} />
          </div>

          {/* Effects */}
          <div style={{
            width: 48, height: 48, borderRadius: 10,
            border: '1px solid #444', background: '#1E1E1E',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 20,
          }}>{'\u2728'}</div>
        </div>

        {/* Add sound */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 6, fontSize: 13, color: '#fff' }}>
          <span>{'\u266A'}</span>
          <span>Add sound</span>
        </div>
      </div>
    </div>
  )
}
