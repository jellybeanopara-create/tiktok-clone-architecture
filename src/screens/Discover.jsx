import { useState } from 'react'
import { discoverPlaces } from '../data/mockData'

const filters = ['Trending', 'Nearby', 'Adventure', 'Nature', 'Maps']

export default function Discover() {
  const [activeFilter, setActiveFilter] = useState('Trending')

  return (
    <div className="screen safe-top" style={{ background: '#000', padding: '0 0 60px' }}>
      {/* Search bar */}
      <div style={{ padding: '12px 16px' }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10,
          background: '#1E1E1E', borderRadius: 25, padding: '12px 16px',
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#707070" strokeWidth="2"><circle cx="11" cy="11" r="7" /><path d="M21 21l-4-4" strokeLinecap="round" /></svg>
          <input placeholder="Search trails, places, people..." style={{ background: 'none', border: 'none', color: '#fff', fontSize: 14, outline: 'none', flex: 1 }} />
        </div>
      </div>

      {/* Filter chips */}
      <div style={{ display: 'flex', gap: 10, padding: '0 16px 12px', overflowX: 'auto' }}>
        {filters.map(f => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            style={{
              padding: '7px 18px',
              borderRadius: 20,
              fontSize: 13,
              whiteSpace: 'nowrap',
              background: activeFilter === f ? '#fff' : 'transparent',
              color: activeFilter === f ? '#000' : '#fff',
              border: '1px solid #444',
              fontWeight: activeFilter === f ? 600 : 400,
            }}
          >{f}</button>
        ))}
      </div>

      {/* 2-column grid */}
      <div style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr',
        gap: 12, padding: '0 16px 20px',
      }}>
        {discoverPlaces.map(place => (
          <div key={place.id} style={{
            borderRadius: 14, overflow: 'hidden',
            background: place.gradient,
            aspectRatio: '0.75',
            position: 'relative',
          }}>
            {/* Badge */}
            <div style={{
              position: 'absolute', top: 10, left: 10,
              background: '#fff', color: '#000',
              fontSize: 11, fontWeight: 700,
              padding: '3px 10px', borderRadius: 10,
            }}>{place.tag}</div>

            {/* Bottom info overlay */}
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0,
              padding: '30px 12px 12px',
              background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
            }}>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 6 }}>{place.name}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 12, color: '#ccc' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                  <span>{'\uD83D\uDC41'}</span> {place.views}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                  <span>{'\uD83D\uDCCD'}</span> {place.location}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
