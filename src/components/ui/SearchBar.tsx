import { useCallback, useState } from 'react'
import {
  ActivityIndicator,
  Button,
  Keyboard,
  StyleSheet,
  TextInput
} from 'react-native'

import { Color } from '@/constants/Color'
import { Layout } from '@/constants/Layout'

import Row from './Row'

interface SearchBarProps {
  loading: boolean
  onClear: () => void
  onSubmit: (search: string) => void
}

const styles = StyleSheet.create({
  input: {
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: Layout.borderRadius.sm,
    borderColor: Color.gray,
    padding: Layout.padding.sm,
    flex: 1
  }
})

export default function SearchBar({
  onClear,
  onSubmit,
  loading
}: SearchBarProps) {
  const [search, setSearch] = useState('')

  const handleSubmit = useCallback(() => {
    Keyboard.dismiss()
    onSubmit(search)
  }, [search, onSubmit])

  const handleClear = useCallback(() => {
    Keyboard.dismiss()
    setSearch('')
    onClear()
  }, [onClear])

  return (
    <Row alignItems="center" gap={Layout.gap.sm}>
      <TextInput
        style={styles.input}
        placeholder="Search"
        value={search}
        onChangeText={setSearch}
        onSubmitEditing={handleSubmit}
        returnKeyType="search"
        editable={!loading}
      />
      <Row gap={Layout.gap.sm}>
        <Button
          title="Clear"
          disabled={!search || loading}
          onPress={handleClear}
        />
        {loading ? (
          <ActivityIndicator />
        ) : (
          <Button
            title="Go!"
            disabled={!search || loading}
            onPress={handleSubmit}
          />
        )}
      </Row>
    </Row>
  )
}
