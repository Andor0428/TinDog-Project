import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { SubscriptionTier } from '@/types/models';

const tierColor: Record<SubscriptionTier, string> = {
  free: '#9CA3AF',
  plus: '#3B82F6',
  gold: '#D97706'
};

export function TierBadge({ tier }: { tier: SubscriptionTier }) {
  return (
    <View style={[styles.pill, { backgroundColor: tierColor[tier] }]}>
      <Text style={styles.text}>{tier.toUpperCase()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pill: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 999 },
  text: { color: 'white', fontWeight: '700', fontSize: 12 }
});
