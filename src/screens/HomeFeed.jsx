import { useState } from 'react'
import { feedVideos } from '../data/mockData'
import Logo from '../components/Logo'

export default function HomeFeed() {
  const [tab, setTab] = useState(0)
  const [liked, setLiked] = useState({})

  const toggleLike = id => setLiked(p => ({ ...p, [id]: !p[id] }))

  return (
    <div className="screen" style={{ background: '#000', scrollSnapType: 'y mandatory' }}>
      {/* Top nav overlay */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 10,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '14px 16px 10px',
        background: 'linear-gradient(180deg, rgba(0,0,0,0.6) 0%, transparent 100%)',
      }}>
        <Logo size={32} />
        <div style={{ display: 'flex', gap: 24 }}>
          <button onClick={() => setTab(0)} style={tabStyle(tab === 0)}>For You</button>
          <span style={{ color: '#555' }}>|</span>
          <button onClick={() => setTab(1)} style={tabStyle(tab === 1)}>Following</button>
        </div>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><circle cx="11" cy="11" r="7" /><path d="M21 21l-4-4" strokeLinecap="round" /></svg>
      </div>

      {feedVideos.map(video => (
        <div key={video.id} style={{
          height: 'calc(100vh - 60px)',
          scrollSnapAlign: 'start',
          position: 'relative',
          background: video.gradient,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          overflow: 'hidden',
        }}>
          {/* Watermark */}
          <div style={{ position: 'absolute', top: 60, right: 16, opacity: 0.06 }}>
            <Logo size={80} />
          </div>

          {/* Right action buttons */}
          <div style={{ position: 'absolute', right: 12, bottom: 80, display: 'flex', flexDirection: 'column', gap: 20, alignItems: 'center' }}>
            <ActionButton icon={liked[video.id] ? '\u2665' : '\u2661'} count={video.likes} color={liked[video.id] ? '#FF3B30' : '#fff'} onClick={() => toggleLike(video.id)} />
            <ActionButton icon={'\uD83D\uDCAC'} count={video.comments} />
            <ActionButton icon={'\u2197'} count={video.shares} />
            <ActionButton icon={'\u2630'} count={video.saves} />
            <div style={{
              width: 40, height: 40, borderRadius: '50%',
              background: 'linear-gradient(135deg, #3B82F6, #1E1E1E)',
              border: '2px solid #fff',
            }} />
          </div>

          {/* Bottom info */}
          <div style={{ padding: '0 16px 80px 16px', maxWidth: '75%' }}>
            <div style={{ fontWeight: 700, fontSize: 17, marginBottom: 8 }}>@{video.username}</div>
            <div style={{ fontSize: 14, color: '#ddd', marginBottom: 6, lineHeight: 1.4 }}>{video.caption}</div>
            <div style={{ fontSize: 13, color: '#3B82F6', marginBottom: 10 }}>{video.hashtags}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#ccc' }}>
              <span>{'\u266A'}</span>
              <span>{video.audio}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

function tabStyle(active) {
  return {
    background: 'none', border: 'none',
    color: active ? '#fff' : '#888',
    fontWeight: active ? 700 : 400,
    fontSize: 16,
    textDecoration: active ? 'underline' : 'none',
  }
}

function ActionButton({ icon, count, color = '#fff', onClick }) {
  return (
    <div onClick={onClick} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, cursor: 'pointer' }}>
      <span style={{ fontSize: 30, color, lineHeight: 1 }}>{icon}</span>
      <span style={{ fontSize: 12, color: '#fff' }}>{count}</span>
    </div>
  )
}
