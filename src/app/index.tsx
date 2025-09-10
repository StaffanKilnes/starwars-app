import { router, useNavigation } from 'expo-router'
import { useCallback, useEffect, useState } from 'react'
import {
  ActivityIndicator,
  Button,
  FlatList,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View
} from 'react-native'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'

import {
  useGetCharactersQuery,
  useGetFilmsQuery,
  useLazyGetCharactersByNameQuery
} from '@/api'
import { CharacterCard } from '@/components'
import { Pagination, SearchBar } from '@/components/ui'
import { Color } from '@/constants/Color'
import { Layout } from '@/constants/Layout'
import { useThrottle } from '@/hooks'
import { Character } from '@/types'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  list: {
    flexGrow: 1,
    gap: Layout.gap.sm,
    padding: Layout.padding.md
  },
  footer: {
    gap: Layout.gap.sm,
    padding: Layout.padding.md
  }
})

export default function Index() {
  const [page, setPage] = useState(1)

  const { top } = useSafeAreaInsets()
  const navigation = useNavigation()
  const throttle = useThrottle()

  const {
    data: characters,
    isError: isCharactersError,
    isLoading: isCharactersLoading,
    isFetching: isCharactersFetching,
    refetch: refetchCharacters
  } = useGetCharactersQuery(page)

  const {
    data: films,
    isError: isFilmsError,
    isLoading: isFilmsLoading,
    refetch: refetchFilms
  } = useGetFilmsQuery()

  const [
    getCharactersByName,
    { data: searchData, reset: resetSearch, isFetching: isSearchFetching }
  ] = useLazyGetCharactersByNameQuery()

  useEffect(() => {
    navigation.setOptions({
      title: `Page ${page}`
    })
  }, [page, navigation])

  const handleRetry = useCallback(() => {
    throttle(() => {
      if (isCharactersError) {
        refetchCharacters()
      }
      if (isFilmsError) {
        refetchFilms()
      }
    })
  }, [
    refetchCharacters,
    refetchFilms,
    isCharactersError,
    isFilmsError,
    throttle
  ])

  const handleSearch = useCallback(
    (search: string) => {
      throttle(() => getCharactersByName(search))
    },
    [getCharactersByName, throttle]
  )

  const handlePressCharacter = useCallback((character: Character) => {
    router.push({
      pathname: '/character',
      params: { character: encodeURIComponent(JSON.stringify(character)) }
    })
  }, [])

  const renderItem = useCallback(
    ({ item }: { item: Character }) => {
      const characterFilms = films?.results.filter(film =>
        item.films.includes(film.url)
      )

      return (
        <CharacterCard
          character={item}
          films={characterFilms}
          isFilmsLoading={isFilmsLoading}
          onPress={handlePressCharacter}
        />
      )
    },
    [films, isFilmsLoading, handlePressCharacter]
  )

  if (isCharactersLoading || isFilmsLoading) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator />
      </View>
    )
  } else if (isCharactersError || isFilmsError) {
    return (
      <View style={[styles.container, styles.center]}>
        <Text>There was an error fetching the data.</Text>
        <Button title="Retry" onPress={handleRetry} />
      </View>
    )
  }

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={top}
      behavior="padding"
      style={styles.container}
    >
      <SafeAreaView style={styles.container} edges={['bottom']}>
        <FlatList
          data={searchData?.results || characters?.results}
          keyExtractor={item => item.url}
          ListEmptyComponent={<Text>No characters found.</Text>}
          contentContainerStyle={styles.list}
          renderItem={renderItem}
        />
        <View style={styles.footer}>
          <SearchBar
            loading={isSearchFetching}
            onClear={resetSearch}
            onSubmit={handleSearch}
          />
          <Pagination
            hasNext={!!characters?.next}
            hasPrevious={!!characters?.previous}
            loading={isCharactersFetching}
            disabled={isSearchFetching}
            onNext={() => setPage(page + 1)}
            onPrevious={() => setPage(Math.max(1, page - 1))}
          />
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  )
}
