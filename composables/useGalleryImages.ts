// SSR fetch of all images in a category, used by the category gallery
// index pages. Returns the mapped image list plus a hero image (first item).
export const useGalleryImages = (category: string, label: string) => {
  const { listUrl, fileUrl } = usePocketbase()

  const { data, error } = useAsyncData(
    `gallery-list-${category}`,
    () => $fetch(listUrl('portfolio_images', {
      filter: `(category='${category}')`,
      perPage: 1000,
    })),
    {
      default: () => ({ items: [] }),
      transform: (res: any) => res.items.map((item: any) => ({
        id: item.id,
        thumbnail: fileUrl(item, item.image, 'thumb=300x0'),
        src: fileUrl(item, item.image),
        alt: item.alt || label,
      })),
    },
  )

  const images = computed(() => (Array.isArray(data.value) ? data.value : []))
  const heroImage = computed(() => images.value[0]?.src ?? '')

  return { images, heroImage, error }
}
