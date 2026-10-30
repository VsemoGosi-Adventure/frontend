import '../global.css';
import { useFonts, Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold, Inter_800ExtraBold } from '@expo-google-fonts/inter';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { BottomBar } from './navigation/BottomBar';
import type { MainTabParamList, RootStackParamList } from './navigation/types';
import { LoginScreen, OnboardingBioScreen, OnboardingInterestsScreen, OnboardingNameScreen, RegisterScreen } from './screens/AuthScreens';
import { ChatsScreen, ExploreScreen, NotificationsScreen, ProfileScreen } from './screens/MainScreens';
import { MeetingChatScreen, MeetingConfirmedScreen, MeetingOpenScreen, MeetingProtectedScreen, PingCreateScreen, PingSentScreen } from './screens/FlowScreens';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tabs = createBottomTabNavigator<MainTabParamList>();


function MainTabs() {
  return <Tabs.Navigator screenOptions={{ headerShown: false }} tabBar={(props) => <BottomBar {...props} />}>
    <Tabs.Screen name="Explore" component={ExploreScreen} />
    <Tabs.Screen name="Chats" component={ChatsScreen} />
    <Tabs.Screen name="Notifications" component={NotificationsScreen} />
    <Tabs.Screen name="Profile" component={ProfileScreen} />
  </Tabs.Navigator>;
}

export default function App() {
  const [loaded] = useFonts({ Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold, Inter_800ExtraBold });
  if (!loaded) return <View className="flex-1 bg-canvas" />;
  return <SafeAreaProvider><StatusBar style="dark" /><NavigationContainer><Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Register">
    <Stack.Screen name="Register" component={RegisterScreen} />
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="OnboardingName" component={OnboardingNameScreen} />
    <Stack.Screen name="OnboardingBio" component={OnboardingBioScreen} />
    <Stack.Screen name="OnboardingInterests" component={OnboardingInterestsScreen} />
    <Stack.Screen name="Main" component={MainTabs} />
    <Stack.Screen name="MeetingOpen" component={MeetingOpenScreen} />
    <Stack.Screen name="MeetingConfirmed" component={MeetingConfirmedScreen} />
    <Stack.Screen name="MeetingProtected" component={MeetingProtectedScreen} />
    <Stack.Screen name="MeetingChat" component={MeetingChatScreen} />
    <Stack.Screen name="PingCreate" component={PingCreateScreen} />
    <Stack.Screen name="PingSent" component={PingSentScreen} />
  </Stack.Navigator></NavigationContainer></SafeAreaProvider>;
}
