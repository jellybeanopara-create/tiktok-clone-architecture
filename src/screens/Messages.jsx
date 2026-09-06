import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { messageThreads } from '../data/mockData'

export default function Messages() {
  const navigate = useNavigate()
  const [searching, setSearching] = useState(false)
  const [query, setQuery] = useState('')

  const filtered = messageThreads.filter(t =>
    t.name.toLowerCase().includes(query.toLowerCase()) ||
    t.preview.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <div className="screen safe-top" style={{ background: '#000' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px' }}>
        <h1 style={{ fontSize: 22, fontWeight: 700 }}>Messages</h1>
        <div style={{ display: 'flex', gap: 16 }}>
          <svg onClick={() => setSearching(s => !s)} width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" style={{ cursor: 'pointer' }}><circle cx="11" cy="11" r="7" /><path d="M21 21l-4-4" strokeLinecap="round" /></svg>
          <svg onClick={() => navigate('/discover')} width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ cursor: 'pointer' }}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6M12 18v-6M9 15h6" /></svg>
        </div>
      </div>

      {/* Search bar */}
      {searching && (
        <div style={{ padding: '0 16px 12px' }}>
          <input autoFocus value={query} onChange={e => setQuery(e.target.value)} placeholder="Search messages..." style={{ width: '100%', padding: '10px 16px', borderRadius: 25, background: '#1E1E1E', border: 'none', color: '#fff', fontSize: 14, outline: 'none' }} />
        </div>
      )}

      {/* Message threads */}
      <div style={{ padding: '0 12px 80px' }}>
        {filtered.map(thread => (
          <div
            key={thread.id}
            onClick={() => navigate(`/messages/${thread.id}`)}
            style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '12px 8px',
              cursor: 'pointer',
            }}
          >
            {/* Avatar */}
            <div style={{
              width: 52, height: 52, borderRadius: '50%',
              background: '#2A2A2A', flexShrink: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 20,
            }}>{thread.name.startsWith('@') ? '\uD83C\uDF0D' : '\uD83D\uDC65'}</div>

            {/* Text */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 2 }}>{thread.name}</div>
              <div style={{ fontSize: 13, color: '#A0A0A0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{thread.preview}</div>
            </div>

            {/* Right side */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, flexShrink: 0 }}>
              <span style={{ fontSize: 12, color: '#707070' }}>{thread.time}</span>
              {thread.unread && <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#3B82F6' }} />}
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', color: '#707070', fontSize: 14, padding: 40 }}>No conversations found</div>
        )}
      </div>
    </div>
  )
}
