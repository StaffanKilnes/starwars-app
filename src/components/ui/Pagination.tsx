import { ActivityIndicator, Button } from 'react-native'

import Row from './Row'

interface PaginationProps {
  hasNext: boolean
  hasPrevious: boolean
  loading: boolean
  disabled: boolean
  onNext: () => void
  onPrevious: () => void
}

export default function Pagination({
  hasNext,
  hasPrevious,
  loading,
  disabled,
  onNext,
  onPrevious
}: PaginationProps) {
  return (
    <Row justifyContent="space-between" alignItems="center">
      <Button
        onPress={onPrevious}
        title="Prev"
        disabled={!hasPrevious || loading || disabled}
      />
      {loading ? (
        <ActivityIndicator />
      ) : (
        <Button onPress={onNext} title="Next" disabled={!hasNext || disabled} />
      )}
    </Row>
  )
}
