import ResourceList from './ResourceList.jsx'

export default function Leaderboard() {
  return <ResourceList resource="leaderboard" title="Leaderboard" description="The people and teams leading the way." columns={[{ key: 'name', label: 'Name' }, { key: 'username', label: 'Username' }, { key: 'points', label: 'Points' }]} />
}