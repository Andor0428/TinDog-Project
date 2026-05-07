import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { colors } from '@/theme/colors';

const STEPS = [
  { title: 'Welcome to BarkSpark', body: 'Meet nearby dog parents and set up fun playdates in minutes.' },
  { title: 'Match by Dog Vibe', body: 'Filter by energy, size, and temperament for safer, happier matches.' },
  { title: 'Stay Safe & Social', body: 'Use verified profiles, reporting tools, and community challenges.' }
];

export function OnboardingScreen({ onDone }: { onDone: () => void }) {
  const [step, setStep] = useState(0);
  const isLast = step === STEPS.length - 1;
  const current = useMemo(() => STEPS[step], [step]);

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>🐾 BarkSpark</Text>
      <View style={styles.card}>
        <Text style={styles.title}>{current.title}</Text>
        <Text style={styles.body}>{current.body}</Text>
      </View>
      <View style={styles.dots}>
        {STEPS.map((_, idx) => (
          <View key={idx} style={[styles.dot, idx === step && styles.dotActive]} />
        ))}
      </View>
      <Pressable style={styles.button} onPress={() => (isLast ? onDone() : setStep(step + 1))}>
        <Text style={styles.buttonText}>{isLast ? 'Start Matching' : 'Next'}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', backgroundColor: colors.background },
  logo: { fontSize: 32, fontWeight: '800', textAlign: 'center', color: colors.text, marginBottom: 24 },
  card: { backgroundColor: 'white', borderRadius: 20, padding: 22, shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 12, elevation: 4 },
  title: { fontSize: 24, fontWeight: '800', color: colors.text, marginBottom: 10 },
  body: { fontSize: 16, color: colors.subtext, lineHeight: 24 },
  dots: { flexDirection: 'row', justifyContent: 'center', marginTop: 18, marginBottom: 20, gap: 8 },
  dot: { width: 9, height: 9, borderRadius: 5, backgroundColor: '#D1D5DB' },
  dotActive: { backgroundColor: colors.primary, width: 24 },
  button: { backgroundColor: colors.primary, borderRadius: 14, paddingVertical: 14, alignItems: 'center' },
  buttonText: { color: 'white', fontWeight: '800', fontSize: 16 }
});
