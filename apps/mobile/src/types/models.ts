export type SubscriptionTier = 'free' | 'plus' | 'gold';

export type DogProfile = {
  id: string;
  name: string;
  age: number;
  breed: string;
  bio: string;
  distanceMiles: number;
  energy: 'low' | 'medium' | 'high';
};

export type UserState = {
  tier: SubscriptionTier;
  likesRemaining: number;
};
