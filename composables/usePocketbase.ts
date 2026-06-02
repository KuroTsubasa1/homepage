// Central helper for talking to the PocketBase backend.
// Reads the base URL from runtimeConfig so it isn't hardcoded across components.
export const usePocketbase = () => {
  const base = useRuntimeConfig().public.apiBase

  /** Build a records list endpoint URL, e.g. listUrl('portfolio_images', { perPage: 60 }). */
  const listUrl = (
    collection: string,
    params: Record<string, string | number> = {},
  ) => {
    const query = new URLSearchParams(
      Object.entries(params).map(([k, v]) => [k, String(v)]),
    ).toString()
    return `${base}/api/collections/${collection}/records${query ? `?${query}` : ''}`
  }

  /** Build a file URL for a record's file field, with an optional query (e.g. 'thumb=300x0'). */
  const fileUrl = (
    item: { collectionId: string; id: string },
    file: string,
    query = '',
  ) => `${base}/api/files/${item.collectionId}/${item.id}/${file}${query ? `?${query}` : ''}`

  return { base, listUrl, fileUrl }
}
