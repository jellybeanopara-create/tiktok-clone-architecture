import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const sections = [
  {
    title: 'ACCOUNT',
    items: [
      { icon: '\uD83D\uDC64', label: 'Profile', to: '/profile' },
      { icon: '\u270F\uFE0F', label: 'Edit Profile', to: '/profile' },
      { icon: '\uD83D\uDC65', label: 'Switch Account', to: '/account' },
    ],
  },
  {
    title: 'PREFERENCES',
    items: [
      { icon: '\uD83D\uDD14', label: 'Notifications' },
      { icon: '\uD83D\uDEE1', label: 'Privacy' },
      { icon: '\uD83C\uDF0D', label: 'Language' },
      { icon: '\uD83C\uDF19', label: 'Dark Mode', toggle: true },
    ],
  },
  {
    title: 'CONTENT',
    items: [
      { icon: '\uD83D\uDDBC', label: 'Download Quality' },
      { icon: '\uD83C\uDF3F', label: 'Data Saver' },
      { icon: '\uD83D\uDDD1', label: 'Clear Cache' },
    ],
  },
  {
    title: 'SUPPORT',
    items: [
      { icon: '\u2753', label: 'Help Center' },
      { icon: '\u26A0\uFE0F', label: 'Report a Problem' },
      { icon: '\u2139\uFE0F', label: 'About' },
    ],
  },
]

export default function Settings() {
  const navigate = useNavigate()
  const [darkMode, setDarkMode] = useState(true)

  return (
    <div className="screen safe-top" style={{ background: '#000', paddingBottom: 80 }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '8px 16px 16px' }}>
        <button onClick={() => navigate(-1)} style={{ fontSize: 22, color: '#fff' }}>{'\u2039'}</button>
        <h1 style={{ fontSize: 20, fontWeight: 700 }}>Settings</h1>
      </div>

      {sections.map(section => (
        <div key={section.title} style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: '#707070', padding: '0 16px 8px', letterSpacing: 0.5 }}>{section.title}</div>
          <div style={{ background: '#1E1E1E', borderRadius: 12, margin: '0 16px', overflow: 'hidden' }}>
            {section.items.map((item, i) => (
              <div
                key={item.label}
                onClick={() => item.to && navigate(item.to)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  padding: '14px 16px',
                  borderTop: i > 0 ? '1px solid #2A2A2A' : 'none',
                  cursor: item.to ? 'pointer' : 'default',
                }}
              >
                <span style={{ fontSize: 18, width: 24, textAlign: 'center' }}>{item.icon}</span>
                <span style={{ flex: 1, fontSize: 15 }}>{item.label}</span>
                {item.toggle ? (
                  <div
                    onClick={e => { e.stopPropagation(); setDarkMode(!darkMode) }}
                    style={{
                      width: 44, height: 26, borderRadius: 13,
                      background: darkMode ? '#007AFF' : '#333',
                      position: 'relative', cursor: 'pointer',
                      transition: 'background 0.2s',
                    }}
                  >
                    <div style={{
                      position: 'absolute', top: 2, left: darkMode ? 20 : 2,
                      width: 22, height: 22, borderRadius: '50%', background: '#fff',
                      transition: 'left 0.2s',
                    }} />
                  </div>
                ) : (
                  <span style={{ color: '#555', fontSize: 18 }}>{'\u203A'}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}

      <div style={{ textAlign: 'center', padding: 20 }}>
        <button onClick={() => navigate('/')} style={{ color: '#FF3B30', fontSize: 16, fontWeight: 600 }}>Log Out</button>
      </div>
    </div>
  )
}
