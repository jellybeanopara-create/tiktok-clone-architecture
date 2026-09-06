# Veltorix — Base44 Dev Environment

## Overview
Veltorix is a social media app UI prototype (React + Vite) with dark-mode design. Built as a web app viewable in the Base44 preview. No backend — all data is mocked in `src/data/mockData.js`.

## Running
```
docker compose -f docker-compose.base44.yml up -d --build
```
The Vite dev server runs on port 5173 inside the container, mapped to host port 3000. Live reload is enabled via polling.

## Architecture
- **Router**: `react-router-dom` (BrowserRouter) in `src/App.jsx`
- **Auth**: Simple context-based flag (no real auth) — clicking "Log in" sets `authed=true`
- **Bottom nav**: 6 tabs (Home, Discover, Create, Gym, Inbox, Profile) — shown only on main screens
- **Admin dashboard**: Accessible at `/admin` (no nav bar, separate layout)
- **Styling**: Inline styles + global CSS in `src/index.css`. Phone-frame container centers content on desktop.

## Key Screens
| Route | Screen | Description |
|-------|--------|-------------|
| `/` | Login | Email/password + social login buttons |
| `/home` | HomeFeed | Full-screen vertical video feed with For You/Following tabs |
| `/discover` | Discover | Search bar, filter chips, 2-column location grid |
| `/create` | Create | Camera grid with Photo/Video/Live tabs |
| `/gym` | Gym | Paywall → workout list (subscription-gated) |
| `/messages` | Messages | Chat thread list |
| `/messages/:id` | Chat | Individual chat with text/link/image send |
| `/profile` | Profile | Avatar, stats, video grid |
| `/settings` | Settings | Account/Preferences/Content/Support sections |
| `/account` | AccountChannel | Personal account + channel management |
| `/admin` | AdminDashboard | Country control, user management, app control |

## Notes
- No external secrets or API keys required
- All images use CSS gradients (no external image dependencies)
- Emoji/symbol characters are used via JS string expressions `{'\uXXXX'}` in JSX text content
