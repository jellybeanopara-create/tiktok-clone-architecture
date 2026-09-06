import { useState } from 'react'
import { workouts, gifts, currentUser } from '../data/mockData'

export default function Gym() {
  const [subscribed, setSubscribed] = useState(false)

  if (!subscribed) {
    return (
      <div className="screen safe-top" style={{ background: '#000', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 30, textAlign: 'center' }}>
        <div style={{ fontSize: 60, marginBottom: 16 }}>{'\uD83D\uDECB\uFE0F'}</div>
        <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 16 }}>Unlock Gym Summer!</h1>
        <p style={{ fontSize: 15, color: '#A0A0A0', lineHeight: 1.6, marginBottom: 30 }}>
          Get access to exclusive workout content, live fitness classes, personalized training plans, and 500 Base-44 coins monthly!
        </p>
        <button
          onClick={() => setSubscribed(true)}
          style={{
            width: '100%', maxWidth: 320, padding: '14px', borderRadius: 12,
            background: '#fff', color: '#000', fontSize: 16, fontWeight: 700,
          }}
        >Subscribe for $9.99/month</button>
      </div>
    )
  }

  return (
    <div className="screen safe-top" style={{ background: '#000', paddingBottom: 80 }}>
      <div style={{ padding: '16px 16px 8px' }}>
        <h1 style={{ fontSize: 22, fontWeight: 700 }}>Gym</h1>
        <div style={{ fontSize: 13, color: '#34C759', marginTop: 4 }}>{'\u2714'} Gym Summer Active</div>
      </div>

      {workouts.map(w => (
        <div key={w.id} style={{ margin: '8px 16px', background: '#1E1E1E', borderRadius: 14, overflow: 'hidden' }}>
          <div style={{
            height: 160, background: 'linear-gradient(135deg, #2a2a2a, #1a1a1a)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 40, opacity: 0.4,
          }}>{'\u25B6'}</div>
          <div style={{ padding: 14 }}>
            <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>{w.title}</div>
            <div style={{ fontSize: 13, color: '#A0A0A0', marginBottom: 10, lineHeight: 1.4 }}>{w.description}</div>
            <div style={{ display: 'flex', gap: 20, fontSize: 12, color: '#707070' }}>
              <span>{'\u23F1'} {w.duration} mins</span>
              <span>{'\uD83D\uDD25'} {w.calories} cal</span>
            </div>
          </div>
        </div>
      ))}

      {/* Coin wallet mini */}
      <div style={{ margin: '16px', background: '#1E1E1E', borderRadius: 14, padding: 16 }}>
        <div style={{ fontSize: 13, color: '#A0A0A0', marginBottom: 6 }}>Your Balance</div>
        <div style={{ fontSize: 22, fontWeight: 700 }}>{currentUser.coins} Base-44 Coins</div>
      </div>
    </div>
  )
}
