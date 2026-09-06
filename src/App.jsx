import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useState, createContext, useContext } from 'react'
import { PostsProvider } from './context/PostsContext'
import BottomNav from './components/BottomNav'
import Login from './screens/Login'
import HomeFeed from './screens/HomeFeed'
import Discover from './screens/Discover'
import Create from './screens/Create'
import Gym from './screens/Gym'
import Messages from './screens/Messages'
import Chat from './screens/Chat'
import Profile from './screens/Profile'
import Settings from './screens/Settings'
import AccountChannel from './screens/AccountChannel'
import AdminDashboard from './screens/AdminDashboard'

const AuthContext = createContext(null)
export const useAuth = () => useContext(AuthContext)

const NAV_SCREENS = ['/home', '/discover', '/create', '/gym', '/messages', '/profile']

function AppInner() {
  const [authed, setAuthed] = useState(false)
  const location = useLocation()
  const showNav = authed && NAV_SCREENS.includes(location.pathname)

  return (
    <AuthContext.Provider value={{ authed, setAuthed }}>
      <PostsProvider>
        <div className="app-container">
          <div className="phone-frame">
            <Routes>
              <Route path="/" element={authed ? <Navigate to="/home" /> : <Login />} />
              <Route path="/home" element={<HomeFeed />} />
              <Route path="/discover" element={<Discover />} />
              <Route path="/create" element={<Create />} />
              <Route path="/gym" element={<Gym />} />
              <Route path="/messages" element={<Messages />} />
              <Route path="/messages/:id" element={<Chat />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/account" element={<AccountChannel />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
            {showNav && <BottomNav />}
          </div>
        </div>
      </PostsProvider>
    </AuthContext.Provider>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppInner />
    </BrowserRouter>
  )
}
