import { PaginatedResponse } from './PaginatedResponse'

export interface Film {
  title: string
  url: string
}

export type FilmsPage = PaginatedResponse<Film>
