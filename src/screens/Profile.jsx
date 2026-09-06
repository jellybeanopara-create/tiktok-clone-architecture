import { useNavigate } from 'react-router-dom'
import { currentUser, profileVideos } from '../data/mockData'

export default function Profile() {
  const navigate = useNavigate()
  const stats = [
    { value: '128', label: 'Following' },
    { value: '2.4K', label: 'Followers' },
    { value: '24', label: 'Posts' },
    { value: '18', label: 'Videos' },
    { value: '156', label: 'Likes' },
    { value: '7.2K', label: 'Views' },
  ]

  return (
    <div className="screen safe-top" style={{ background: '#000', paddingBottom: 80 }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 16px' }}>
        <button onClick={() => navigate(-1)} style={{ fontSize: 22, color: '#fff' }}>{'\u2039'}</button>
        <button onClick={() => navigate('/settings')} style={{ fontSize: 20 }}>{'\u2699\uFE0F'}</button>
      </div>

      {/* Profile section */}
      <div style={{ textAlign: 'center', padding: '8px 16px 16px' }}>
        <div style={{
          width: 80, height: 80, borderRadius: '50%', margin: '0 auto 12px',
          background: '#1E1E1E', border: '1px solid #333', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36,
        }}>{'\uD83D\uDC64'}</div>
        <div style={{ fontWeight: 700, fontSize: 18 }}>@{currentUser.username}</div>
        <div style={{ fontSize: 15, marginTop: 2 }}>{currentUser.displayName}</div>
        <div style={{ fontSize: 13, color: '#A0A0A0', marginTop: 8, lineHeight: 1.5, padding: '0 30px' }}>{currentUser.bio}</div>
      </div>

      {/* Stats card */}
      <div style={{
        margin: '4px 16px 16px', background: '#1E1E1E', borderRadius: 14, padding: '16px 12px',
        display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '8px 28px',
      }}>
        {stats.map(s => (
          <div key={s.label} style={{ textAlign: 'center' }}>
            <div style={{ fontWeight: 700, fontSize: 16 }}>{s.value}</div>
            <div style={{ fontSize: 11, color: '#707070' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Action buttons */}
      <div style={{ display: 'flex', gap: 10, padding: '0 16px 20px' }}>
        <button style={{ flex: 1, padding: '10px', borderRadius: 10, background: '#1E1E1E', color: '#fff', fontSize: 14, fontWeight: 600 }}>Edit Profile</button>
        <button style={{ flex: 1, padding: '10px', borderRadius: 10, background: '#1E1E1E', color: '#fff', fontSize: 14, fontWeight: 600 }}>Share Profile</button>
      </div>

      {/* Video grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 3, padding: '0 3px' }}>
        {profileVideos.map(v => (
          <div key={v.id} style={{
            aspectRatio: '1', borderRadius: 4, overflow: 'hidden',
            background: v.gradient, position: 'relative',
          }}>
            <div style={{ position: 'absolute', bottom: 4, left: 4, fontSize: 11, color: '#fff' }}>
              {v.type === 'video' ? '\u25B6' : '\uD83D\uDDBC'}
            </div>
            <div style={{ position: 'absolute', bottom: 4, right: 4, fontSize: 10, color: '#fff' }}>{v.duration}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
