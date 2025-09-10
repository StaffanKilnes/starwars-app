import { StyleSheet, Text, TouchableOpacity } from 'react-native'

import { Color } from '@/constants/Color'
import { Layout } from '@/constants/Layout'
import { Character, Film } from '@/types'

interface CharacterCardProps {
  character: Character
  films?: Film[]
  isFilmsLoading: boolean
  onPress: (character: Character) => void
}

const styles = StyleSheet.create({
  container: {
    gap: Layout.gap.sm,
    padding: Layout.padding.md,
    borderRadius: Layout.borderRadius.sm,
    elevation: 2,
    backgroundColor: Color.white,
    shadowColor: Color.black,
    shadowOpacity: 0.25,
    shadowRadius: 2.5,
    shadowOffset: { width: 0, height: 0 }
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  filmTitle: {
    fontSize: 14
  }
})

export default function CharacterCard({
  character,
  films = [],
  isFilmsLoading,
  onPress
}: CharacterCardProps) {
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.8}
      onPress={() => onPress(character)}
    >
      <Text style={styles.name}>{character.name}</Text>
      <Text style={styles.filmTitle}>
        {isFilmsLoading
          ? 'Loading...'
          : films?.length
            ? films?.map(film => film.title).join(', ')
            : 'This character has not appeared in any films'}
      </Text>
    </TouchableOpacity>
  )
}
