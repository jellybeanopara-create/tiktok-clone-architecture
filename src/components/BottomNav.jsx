import { NavLink, useLocation } from 'react-router-dom'

const tabs = [
  { path: '/home', label: 'Home', icon: HomeIcon },
  { path: '/discover', label: 'Discover', icon: CompassIcon },
  { path: '/create', label: 'Create', icon: PlusIcon },
  { path: '/gym', label: 'Gym', icon: DumbbellIcon },
  { path: '/messages', label: 'Inbox', icon: ChatIcon },
  { path: '/profile', label: 'Profile', icon: UserIcon },
]

export default function BottomNav() {
  const location = useLocation()
  return (
    <nav style={navStyle}>
      {tabs.map(tab => {
        const active = location.pathname === tab.path
        const Icon = tab.icon
        return (
          <NavLink key={tab.path} to={tab.path} style={tabStyle}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
              <Icon active={active} />
              <span style={{
                fontSize: 9,
                color: active ? '#fff' : '#707070',
                fontWeight: active ? 600 : 400,
              }}>{tab.label}</span>
              {active && <div style={{ width: 20, height: 2, background: '#fff', borderRadius: 1 }} />}
            </div>
          </NavLink>
        )
      })}
    </nav>
  )
}

const navStyle = {
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
  height: 60,
  background: '#000',
  borderTop: '1px solid #1a1a1a',
  paddingBottom: 'env(safe-area-inset-bottom, 0px)',
  flexShrink: 0,
}
const tabStyle = { display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1 }

function HomeIcon({ active }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={active ? '#fff' : '#707070'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1V9.5z" />
    </svg>
  )
}
function CompassIcon({ active }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={active ? '#3B82F6' : '#707070'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M16 8l-2 6-6 2 2-6 6-2z" fill={active ? '#3B82F6' : 'none'} />
    </svg>
  )
}
function PlusIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round">
      <circle cx="12" cy="12" r="11" />
      <path d="M12 7v10M7 12h10" />
    </svg>
  )
}
function DumbbellIcon({ active }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={active ? '#fff' : '#707070'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6.5 6.5l11 11M3 9l3-3M18 18l3-3M9 3L6 6M18 18l3 3" />
      <rect x="1" y="7" width="4" height="10" rx="1" transform="rotate(0 3 12)" />
      <rect x="19" y="7" width="4" height="10" rx="1" />
    </svg>
  )
}
function ChatIcon({ active }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={active ? '#fff' : '#707070'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 11.5a8.38 8.38 0 0 1-9 8.5 8.5 8.5 0 0 1-4-1L3 20l1-4a8.38 8.38 0 0 1-1-4 8.5 8.5 0 0 1 8.5-8.5 8.38 8.38 0 0 1 8.5 4z" />
    </svg>
  )
}
function UserIcon({ active }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={active ? '#fff' : '#707070'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4 4-7 8-7s8 3 8 7" />
    </svg>
  )
}
