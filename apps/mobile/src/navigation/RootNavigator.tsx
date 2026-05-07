import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DiscoverScreen } from '@/screens/DiscoverScreen';
import { MatchesScreen } from '@/screens/MatchesScreen';
import { EventsScreen } from '@/screens/EventsScreen';
import { ProfileScreen } from '@/screens/ProfileScreen';

export type RootTabParamList = {
  Discover: undefined;
  Matches: undefined;
  Events: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

export function RootNavigator() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Discover" component={DiscoverScreen} />
      <Tab.Screen name="Matches" component={MatchesScreen} />
      <Tab.Screen name="Events" component={EventsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
