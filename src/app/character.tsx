import { useLocalSearchParams, useNavigation } from 'expo-router'
import { useEffect, useMemo } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { useGetHomeworldQuery } from '@/api'
import { Row } from '@/components/ui'
import { Color } from '@/constants/Color'
import { Layout } from '@/constants/Layout'
import { Character as CharacterType } from '@/types'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white,
    padding: Layout.padding.md
  },
  label: {
    fontWeight: 'bold'
  }
})

export default function Character() {
  const navigation = useNavigation()
  const { character } = useLocalSearchParams()

  const parsedCharacter = useMemo(() => {
    try {
      return JSON.parse(character as string) as CharacterType
    } catch (error) {
      console.error('Error parsing character', error)
      return null
    }
  }, [character])

  const {
    data: homeworld,
    refetch: refetchHomeworld,
    isError: isErrorHomeworld,
    isLoading: isLoadingHomeworld
  } = useGetHomeworldQuery(parsedCharacter?.homeworld ?? '', {
    skip: !parsedCharacter?.homeworld
  })

  useEffect(() => {
    navigation.setOptions({
      title: parsedCharacter?.name ?? 'Unknown Character'
    })
  }, [navigation, parsedCharacter?.name])

  if (!parsedCharacter) {
    return <Text>Unknown Character</Text>
  }

  return (
    <View style={styles.container}>
      <Row gap={Layout.gap.sm}>
        <Text style={styles.label}>Height:</Text>
        <Text>{parsedCharacter.height}</Text>
      </Row>
      <Row gap={Layout.gap.sm}>
        <Text style={styles.label}>Birth Year:</Text>
        <Text>{parsedCharacter.birth_year}</Text>
      </Row>
      <Row gap={Layout.gap.sm}>
        <Text style={styles.label}>Gender:</Text>
        <Text>{parsedCharacter.gender}</Text>
      </Row>
      <Row gap={Layout.gap.sm}>
        <Text style={styles.label}>Homeworld:</Text>
        <TouchableOpacity
          onPress={refetchHomeworld}
          disabled={!isErrorHomeworld}
          activeOpacity={0.8}
        >
          <Text>
            {isLoadingHomeworld
              ? 'Loading Homeworld...'
              : isErrorHomeworld
                ? 'Error loading Homeworld, tap to retry'
                : (homeworld?.name ?? 'Unknown Homeworld')}
          </Text>
        </TouchableOpacity>
      </Row>
    </View>
  )
}
