import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '@/theme/colors';

export function EventsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dog Events</Text>
      <Text style={styles.copy}>Find local walks, playdates, and challenge meetups.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: 16 },
  title: { fontSize: 28, fontWeight: '800', color: colors.text, marginBottom: 8 },
  copy: { fontSize: 15, color: colors.subtext }
});
