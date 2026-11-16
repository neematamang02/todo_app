import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { StyleSheet } from 'react-native';


export default function SettingsScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="subtitle">Settings</ThemedText>
      <ThemedText themeColor="textSecondary">
        This is the settings screen. You can add your settings options here.
      </ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
});