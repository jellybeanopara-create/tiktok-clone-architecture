import { useState } from 'react'
import { countries, adminUsers } from '../data/mockData'

export default function AdminDashboard() {
  const [tab, setTab] = useState(0)
  const [countryStates, setCountryStates] = useState(
    Object.fromEntries(countries.map(c => [c, true]))
  )
  const [users, setUsers] = useState(adminUsers)
  const [appSuspended, setAppSuspended] = useState(false)
  const [primaryColor, setPrimaryColor] = useState('#3B82F6')
  const [bgColor, setBgColor] = useState('#000000')

  const toggleCountry = c => setCountryStates(p => ({ ...p, [c]: !p[c] }))
  const suspendUser = id => setUsers(us => us.map(u => u.id === id ? { ...u, suspended: true } : u))

  return (
    <div className="screen" style={{ background: '#000', padding: '0 0 60px', maxWidth: '100%' }}>
      {/* Header */}
      <div className="safe-top" style={{ padding: '16px', borderBottom: '1px solid #1a1a1a' }}>
        <h1 style={{ fontSize: 20, fontWeight: 700 }}>Veltorix Admin</h1>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', borderBottom: '1px solid #1a1a1a' }}>
        {['Country Control', 'User Management', 'App Control'].map((t, i) => (
          <button
            key={t}
            onClick={() => setTab(i)}
            style={{
              flex: 1, padding: '12px 4px', fontSize: 12,
              color: tab === i ? '#fff' : '#707070',
              borderBottom: tab === i ? '2px solid #fff' : '2px solid transparent',
              fontWeight: tab === i ? 600 : 400,
              background: 'none',
            }}
          >{t}</button>
        ))}
      </div>

      {/* Country Control */}
      {tab === 0 && (
        <div style={{ padding: 16 }}>
          <p style={{ fontSize: 13, color: '#A0A0A0', marginBottom: 16 }}>Toggle OFF to block users from that country.</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {countries.map(c => (
              <div key={c} style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                border: '1px solid #333', borderRadius: 10, padding: '10px 12px',
              }}>
                <span style={{ fontSize: 13 }}>{c}</span>
                <button
                  onClick={() => toggleCountry(c)}
                  style={{
                    padding: '4px 12px', borderRadius: 20, fontSize: 11, fontWeight: 700,
                    background: countryStates[c] ? '#34C759' : '#FF3B30', color: '#fff',
                  }}
                >{countryStates[c] ? 'OPEN' : 'BLOCKED'}</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* User Management */}
      {tab === 1 && (
        <div style={{ padding: 16, overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 500 }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #333' }}>
                {['Username', 'User Code', 'IP Address', 'Country', 'Action'].map(h => (
                  <th key={h} style={{ textAlign: 'left', padding: '8px 6px', fontSize: 12, color: '#A0A0A0', fontWeight: 600 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u.id} style={{ borderBottom: '1px solid #1a1a1a' }}>
                  <td style={{ padding: '10px 6px', fontSize: 13 }}>{u.username}</td>
                  <td style={{ padding: '10px 6px', fontSize: 12, color: '#A0A0A0' }}>{u.userCode}</td>
                  <td style={{ padding: '10px 6px', fontSize: 12, color: '#A0A0A0' }}>{u.ip}</td>
                  <td style={{ padding: '10px 6px', fontSize: 12, color: '#A0A0A0' }}>{u.country}</td>
                  <td style={{ padding: '10px 6px' }}>
                    {u.suspended ? (
                      <span style={{ color: '#FF3B30', fontSize: 12 }}>Suspended</span>
                    ) : (
                      <button
                        onClick={() => suspendUser(u.id)}
                        style={{ background: '#FF3B30', color: '#fff', padding: '4px 12px', borderRadius: 6, fontSize: 12 }}
                      >Suspend</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* App Control */}
      {tab === 2 && (
        <div style={{ padding: 16 }}>
          {/* Master switch */}
          <div style={{ background: '#1E1E1E', borderRadius: 14, padding: 16, marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontWeight: 600, fontSize: 15 }}>Global App Suspension</div>
              <div style={{ fontSize: 12, color: '#A0A0A0', marginTop: 4 }}>Disable the entire app for all users</div>
            </div>
            <button
              onClick={() => setAppSuspended(!appSuspended)}
              style={{
                width: 50, height: 28, borderRadius: 14,
                background: appSuspended ? '#FF3B30' : '#34C759',
                position: 'relative', cursor: 'pointer',
              }}
            >
              <div style={{
                position: 'absolute', top: 2, left: appSuspended ? 24 : 2,
                width: 24, height: 24, borderRadius: '50%', background: '#fff',
                transition: 'left 0.2s',
              }} />
            </button>
          </div>

          {/* Color pickers */}
          <div style={{ background: '#1E1E1E', borderRadius: 14, padding: 16 }}>
            <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 16 }}>Theme & Color Editor</div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
              <span style={{ fontSize: 14 }}>Primary Color</span>
              <input type="color" value={primaryColor} onChange={e => setPrimaryColor(e.target.value)} style={{ width: 50, height: 36, border: 'none', borderRadius: 8, background: 'none' }} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 14 }}>Background Color</span>
              <input type="color" value={bgColor} onChange={e => setBgColor(e.target.value)} style={{ width: 50, height: 36, border: 'none', borderRadius: 8, background: 'none' }} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
