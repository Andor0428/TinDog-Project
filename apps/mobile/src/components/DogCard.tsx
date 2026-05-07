import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { DogProfile } from '@/types/models';
import { colors } from '@/theme/colors';

export function DogCard({ dog }: { dog: DogProfile }) {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{dog.name} • {dog.age}</Text>
      <Text style={styles.meta}>{dog.breed} • {dog.distanceMiles} mi • {dog.energy} energy</Text>
      <Text style={styles.bio}>{dog.bio}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#FFE2D8'
  },
  name: { fontSize: 20, fontWeight: '700', color: colors.text },
  meta: { fontSize: 13, color: colors.subtext, marginTop: 4 },
  bio: { fontSize: 15, color: colors.text, marginTop: 8 }
});
