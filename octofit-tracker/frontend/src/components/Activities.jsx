import ResourceList from './ResourceList.jsx'

export default function Activities() {
  return <ResourceList resource="activities" title="Activities" description="Recent movement logged by your community." columns={[{ key: 'activity', label: 'Activity' }, { key: 'userId', label: 'Member' }, { key: 'points', label: 'Points' }, { key: 'createdAt', label: 'Logged', render: (item) => item.createdAt ? new Date(item.createdAt).toLocaleDateString() : '-' }]} />
}