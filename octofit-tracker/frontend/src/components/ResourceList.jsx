import { useEffect, useState } from 'react'
import { fetchResource } from '../api.js'

export default function ResourceList({ resource, title, description, columns }) {
  const [items, setItems] = useState([])
  const [state, setState] = useState({ loading: true, error: '' })

  useEffect(() => {
    const controller = new AbortController()
    fetchResource(resource, controller.signal).then((data) => {
      setItems(data)
      setState({ loading: false, error: '' })
    }).catch((error) => {
      if (error.name !== 'AbortError') setState({ loading: false, error: error.message })
    })
    return () => controller.abort()
  }, [resource])

  return <section>
    <div className="page-heading compact-heading"><p className="eyebrow">Octofit data</p><h1>{title}</h1><p className="lead">{description}</p></div>
    {state.loading && <div className="empty-state">Loading {title.toLowerCase()}...</div>}
    {state.error && <div className="alert alert-warning" role="alert">{state.error}</div>}
    {!state.loading && !state.error && <div className="table-wrap">
      <table className="table align-middle"><thead><tr>{columns.map((column) => <th key={column.key}>{column.label}</th>)}</tr></thead>
        <tbody>{items.map((item, index) => <tr key={item._id || item.id || index}>{columns.map((column) => <td key={column.key}>{column.render ? column.render(item) : item[column.key] || '-'}</td>)}</tr>)}</tbody>
      </table>
      {!items.length && <div className="empty-state">No records yet.</div>}
    </div>}
  </section>
}