// Shared logic for a single-image detail page: SSR fetch of the category's
// images, current/prev/next resolution, and SEO meta. Used by the photo
// [id].vue / [image].vue pages so they don't each re-implement client fetching.
export const useGalleryDetail = (category: string, label: string) => {
  const { listUrl, fileUrl } = usePocketbase()
  const route = useRoute()

  const currentId = computed(() =>
    String(route.params.id ?? route.params.image ?? ''),
  )

  const { data, error } = useAsyncData(
    `gallery-detail-${category}`,
    () => $fetch(listUrl('portfolio_images', {
      filter: `(category='${category}')`,
      perPage: 1000,
    })),
    {
      default: () => ({ items: [] }),
      transform: (res: any) => ({
        items: res.items.map((item: any) => ({
          id: item.id,
          thumbnail: fileUrl(item, item.image, 'thumb=300x0'),
          src: fileUrl(item, item.image),
          alt: item.alt || label,
          description: item.description || '',
          location: item.location || '',
          date: item.date || '',
          camera: item.camera || '',
          lens: item.lens || '',
          settings: item.settings || '',
        })),
      }),
    },
  )

  const list = computed(() => data.value?.items ?? [])
  const index = computed(() => list.value.findIndex(i => i.id === currentId.value))
  const imageData = computed(() => (index.value > -1 ? list.value[index.value] : {}))
  const prevImage = computed(() => (index.value > 0 ? list.value[index.value - 1] : null))
  const nextImage = computed(() =>
    index.value > -1 && index.value < list.value.length - 1
      ? list.value[index.value + 1]
      : null,
  )

  useSeoMeta({
    title: () => `${imageData.value.alt || label} — Lasse Harm`,
    ogTitle: () => `${imageData.value.alt || label} — Lasse Harm`,
    description: () => imageData.value.description || `${label} by Lasse Harm.`,
    ogDescription: () => imageData.value.description || `${label} by Lasse Harm.`,
    ogImage: () => imageData.value.src,
    twitterCard: 'summary_large_image',
  })

  return { imageData, prevImage, nextImage, error }
}
