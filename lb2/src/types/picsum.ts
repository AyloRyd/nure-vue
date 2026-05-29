export interface PicsumImage {
  id: string
  author: string
  download_url: string
  width: number
  height: number
  url: string
}

export type ViewMode = 'all' | 'favorites'
