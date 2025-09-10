import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { CharactersPage, FilmsPage, Homeworld } from '@/types'

export const starwarsApi = createApi({
  reducerPath: 'starwarsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://swapi.py4e.com/api' }),
  endpoints: builder => ({
    getCharacters: builder.query<CharactersPage, number | void>({
      query: (page = 1) => `people/?page=${page}`
    }),
    getCharactersByName: builder.query<CharactersPage, string>({
      query: name => `people/?search=${name}`
    }),
    getFilms: builder.query<FilmsPage, void>({
      query: () => `films/`
    }),
    getHomeworld: builder.query<Homeworld, string>({
      query: url => {
        const planetIdMatch = url.match(/planets\/(\d+)/)

        if (!planetIdMatch) {
          throw new Error(`Invalid homeworld URL format: ${url}`)
        }

        return `planets/${planetIdMatch[1]}`
      }
    })
  })
})

export const {
  useGetCharactersQuery,
  useLazyGetCharactersByNameQuery,
  useGetFilmsQuery,
  useGetHomeworldQuery
} = starwarsApi
