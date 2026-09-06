import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Create() {
  const [tab, setTab] = useState(1) // 0=Photo, 1=Video, 2=Live
  const navigate = useNavigate()
  const tabs = ['Photo', 'Video', 'Live']

  return (
    <div className="screen" style={{ background: '#000', display: 'flex', flexDirection: 'column' }}>
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
          {/* Gallery */}
          <div style={{
            width: 48, height: 48, borderRadius: 10,
            border: '1px solid #444', background: '#1E1E1E',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 20,
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
