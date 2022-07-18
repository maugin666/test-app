import { ContentItem } from '../index'

export const filterItems = (
  items: ContentItem[],
  field: string,
  value: string
): ContentItem[] => {
  return items.filter((item) => {
    const itemField = item[field as keyof ContentItem].toString()

    return itemField.toLowerCase().includes(value.toLowerCase())
  })
}

export const sortDirection = (direction: string): string =>
  direction === 'asc' ? 'desc' : 'asc'

export const sortItems = (
  items: ContentItem[],
  direction: string,
  field: string
): ContentItem[] =>
  items.sort((a, b) => {
    const first = a[field as keyof ContentItem]
    const second = b[field as keyof ContentItem]

    if (sortDirection(direction) === 'asc') {
      return first < second ? -1 : 1
    }
    if (sortDirection(direction) === 'desc') {
      return first > second ? -1 : 1
    }
    return 0
  })

export const sliceItems = (
  items: ContentItem[],
  currentPage: string,
  perPage: number
): ContentItem[] => {
  const firstPageIndex = (Number(currentPage) - 1) * perPage
  const lastPageIndex = firstPageIndex + perPage

  return items.slice(firstPageIndex, lastPageIndex)
}
