import { configureStore } from '@reduxjs/toolkit'

import { starwarsApi } from '@/api'

export const store = configureStore({
  reducer: {
    [starwarsApi.reducerPath]: starwarsApi.reducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(starwarsApi.middleware)
})
