import React, { useMemo, useRef, useState } from 'react';
import { View, Text, StyleSheet, Animated, PanResponder, Pressable } from 'react-native';
import { dogs } from '@/services/mockData';
import { DogCard } from '@/components/DogCard';
import { colors } from '@/theme/colors';
import { TierBadge } from '@/components/TierBadge';
import { UserState } from '@/types/models';

const FREE_DAILY_LIKES = 5;
const SWIPE_THRESHOLD = 110;

export function DiscoverScreen() {
  const [index, setIndex] = useState(0);
  const [user, setUser] = useState<UserState>({ tier: 'free', likesRemaining: FREE_DAILY_LIKES });
  const pan = useRef(new Animated.ValueXY()).current;

  const currentDog = useMemo(() => dogs[index], [index]);
  const nextDog = () => setIndex((prev) => (prev + 1) % dogs.length);

  const doLike = () => {
    if (user.tier === 'free' && user.likesRemaining <= 0) return;
    setUser((prev) => ({ ...prev, likesRemaining: prev.tier === 'free' ? prev.likesRemaining - 1 : prev.likesRemaining }));
    nextDog();
  };

  const handleSwipeComplete = (direction: 'left' | 'right') => {
    Animated.timing(pan, { toValue: { x: direction === 'right' ? 500 : -500, y: 0 }, duration: 180, useNativeDriver: false }).start(() => {
      pan.setValue({ x: 0, y: 0 });
      if (direction === 'right') doLike();
      else nextDog();
    });
  };

  const responder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, g) => pan.setValue({ x: g.dx, y: g.dy * 0.1 }),
      onPanResponderRelease: (_, g) => {
        if (g.dx > SWIPE_THRESHOLD) return handleSwipeComplete('right');
        if (g.dx < -SWIPE_THRESHOLD) return handleSwipeComplete('left');
        Animated.spring(pan, { toValue: { x: 0, y: 0 }, useNativeDriver: false }).start();
      }
    })
  ).current;

  const rotate = pan.x.interpolate({ inputRange: [-200, 0, 200], outputRange: ['-12deg', '0deg', '12deg'] });

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.title}>Discover Dogs Nearby</Text>
          <Text style={styles.subtitle}>Swipe left to pass • right to like</Text>
        </View>
        <TierBadge tier={user.tier} />
      </View>

      <Animated.View {...responder.panHandlers} style={[styles.swipeCard, { transform: [{ translateX: pan.x }, { translateY: pan.y }, { rotate }] }]}>
        {currentDog ? <DogCard dog={currentDog} /> : <Text>No dogs available.</Text>}
      </Animated.View>

      <View style={styles.actionsRow}>
        <Pressable style={[styles.button, styles.passButton]} onPress={nextDog}><Text style={styles.buttonText}>Pass</Text></Pressable>
        <Pressable style={[styles.button, styles.likeButton]} onPress={doLike}><Text style={styles.buttonText}>Like</Text></Pressable>
      </View>

      {user.tier === 'free' && (
        <View style={styles.paywallCard}>
          <Text style={styles.paywallTitle}>Free likes left today: {user.likesRemaining}</Text>
          <Text style={styles.paywallText}>Upgrade to Plus for unlimited likes and advanced filters.</Text>
          <Pressable style={styles.upgradeButton} onPress={() => setUser({ tier: 'plus', likesRemaining: Number.POSITIVE_INFINITY })}>
            <Text style={styles.upgradeText}>Unlock Plus</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: 16 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  title: { fontSize: 28, fontWeight: '800', color: colors.text, marginBottom: 2 },
  subtitle: { fontSize: 14, color: colors.subtext, marginBottom: 14 },
  swipeCard: { marginVertical: 8 },
  actionsRow: { flexDirection: 'row', gap: 10, marginTop: 6 },
  button: { flex: 1, paddingVertical: 12, borderRadius: 12, alignItems: 'center' },
  passButton: { backgroundColor: '#E5E7EB' },
  likeButton: { backgroundColor: colors.primary },
  buttonText: { fontWeight: '700', color: '#111827' },
  paywallCard: { marginTop: 14, backgroundColor: '#FFF1E6', borderRadius: 14, padding: 12 },
  paywallTitle: { fontWeight: '700', color: colors.text, marginBottom: 6 },
  paywallText: { color: colors.subtext, marginBottom: 10 },
  upgradeButton: { backgroundColor: colors.accent, paddingVertical: 10, borderRadius: 10, alignItems: 'center' },
  upgradeText: { fontWeight: '700', color: '#111827' }
});
