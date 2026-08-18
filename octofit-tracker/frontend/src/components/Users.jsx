import ResourceList from './ResourceList.jsx'

export default function Users() {
  return <ResourceList resource="users" title="Users" description="Your Octofit community, all in one place." columns={[{ key: 'name', label: 'Name' }, { key: 'username', label: 'Username' }, { key: 'email', label: 'Email' }]} />
}