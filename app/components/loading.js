import { View, ActivityIndicator, StyleSheet } from 'react-native'
import colors from '../config/colors'

export const LoadingIndicator = () => {
  return <View style={styles.loading}>
    <ActivityIndicator size='large' color={colors.primary} />
  </View>
}

const styles = StyleSheet.create({
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
    zIndex: 9999
  }
})