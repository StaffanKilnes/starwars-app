import { PaginatedResponse } from './PaginatedResponse'

export interface Character {
  name: string
  height: string
  birth_year: string
  gender: string
  homeworld: string
  films: string[]
  url: string
}

export type CharactersPage = PaginatedResponse<Character>
