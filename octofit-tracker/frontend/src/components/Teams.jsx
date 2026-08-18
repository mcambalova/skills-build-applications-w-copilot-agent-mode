import ResourceList from './ResourceList.jsx'

export default function Teams() {
  return <ResourceList resource="teams" title="Teams" description="Groups that make every session more social." columns={[{ key: 'name', label: 'Team' }, { key: 'description', label: 'Description' }, { key: 'points', label: 'Points' }]} />
}