const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()

export const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : '/api'

export function getResourceUrl(resource) {
  return `${apiBaseUrl}/${resource}/`
}

export function normalizeList(payload) {
  if (Array.isArray(payload)) return payload
  if (!payload || typeof payload !== 'object') return []
  for (const key of ['results', 'items', 'data', 'docs']) {
    if (Array.isArray(payload[key])) return payload[key]
  }
  return []
}

export async function fetchResource(resource, signal) {
  const response = await fetch(getResourceUrl(resource), { signal })
  if (!response.ok) throw new Error(`Unable to load ${resource}.`)
  const contentType = response.headers.get('content-type') || ''
  if (!contentType.includes('application/json')) {
    throw new Error(`The ${resource} API returned a non-JSON response. Check that the backend is running.`)
  }
  return normalizeList(await response.json())
}