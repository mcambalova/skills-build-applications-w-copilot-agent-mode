import './App.css'
import { NavLink, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'

const navigation = [
  { label: 'Overview', to: '/' },
  { label: 'Activities', to: '/activities' },
  { label: 'Leaderboard', to: '/leaderboard' },
  { label: 'Teams', to: '/teams' },
  { label: 'Users', to: '/users' },
  { label: 'Workouts', to: '/workouts' },
]

function App() {
  return <div className="app-shell">
    <header className="app-header"><div className="container-fluid app-header-inner">
      <NavLink className="brand" to="/"><span className="brand-mark">O</span><span>Octofit Tracker</span></NavLink>
      <span className="status-pill"><span className="status-dot" /> Training desk</span>
    </div></header>
    <div className="container-fluid app-layout">
      <aside className="sidebar"><p className="eyebrow">Workspace</p><nav className="nav flex-column" aria-label="Primary navigation">
        {navigation.map((item) => <NavLink key={item.to} className="nav-link" to={item.to} end={item.to === '/'}>{item.label}</NavLink>)}
      </nav></aside>
      <main className="main-content"><Routes>
        <Route path="/" element={<Overview />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/users" element={<Users />} />
        <Route path="/workouts" element={<Workouts />} />
      </Routes></main>
    </div>
  </div>
}

function Overview() {
  return <>
    <div className="page-heading"><p className="eyebrow">Today at a glance</p><h1>Move together. Go further.</h1><p className="lead">A clear view of your people, progress, and next best workout.</p></div>
    <div className="overview-grid">
      <NavLink className="overview-card overview-card-primary" to="/activities"><span className="card-kicker">Track</span><strong>Log an activity</strong><span>Keep momentum visible across the team.</span></NavLink>
      <NavLink className="overview-card" to="/leaderboard"><span className="card-kicker">Compete</span><strong>Check the leaderboard</strong><span>See who is setting the pace this week.</span></NavLink>
      <NavLink className="overview-card" to="/workouts"><span className="card-kicker">Plan</span><strong>Find a workout</strong><span>Choose a challenge that fits today.</span></NavLink>
    </div>
  </>
}

export default App
