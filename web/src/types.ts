export interface Paint {
  id: string,
  range: string
  name: string
  type: string
  metallic: boolean
  hex: string
}

export interface Page<T> {
  page: number,
  pageCount: number,
  totalCount: number,
  hasNext: boolean,
  hasPrev: boolean,
  first: number,
  last: number,
  items: T[]
}
