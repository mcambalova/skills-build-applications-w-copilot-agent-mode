import ResourceList from './ResourceList.jsx'

export default function Workouts() {
  return <ResourceList resource="workouts" title="Workouts" description="Suggested sessions for building a stronger routine." columns={[{ key: 'name', label: 'Workout' }, { key: 'description', label: 'Description' }, { key: 'activity', label: 'Focus' }]} />
}