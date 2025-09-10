import { PropsWithChildren } from 'react'
import { StyleSheet, View, ViewProps, ViewStyle } from 'react-native'

export interface RowProps extends ViewProps {
  gap?: number
  justifyContent?: ViewStyle['justifyContent']
  alignItems?: ViewStyle['alignItems']
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row'
  }
})

export default function Row({
  children,
  gap,
  justifyContent,
  alignItems,
  ...props
}: PropsWithChildren<RowProps>) {
  return (
    <View style={[styles.row, { gap, justifyContent, alignItems }]} {...props}>
      {children}
    </View>
  )
}
