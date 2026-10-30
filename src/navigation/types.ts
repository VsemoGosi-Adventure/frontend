import type { NavigatorScreenParams } from '@react-navigation/native';

export type MainTabParamList = {
  Explore: undefined;
  Chats: undefined;
  Notifications: undefined;
  Profile: undefined;
};

export type RootStackParamList = {
  Register: undefined;
  Login: undefined;
  OnboardingName: undefined;
  OnboardingBio: undefined;
  OnboardingInterests: undefined;
  Main: NavigatorScreenParams<MainTabParamList> | undefined;
  MeetingOpen: undefined;
  MeetingConfirmed: undefined;
  MeetingProtected: undefined;
  MeetingChat: undefined;
  PingCreate: undefined;
  PingSent: undefined;
};
