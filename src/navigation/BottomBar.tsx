import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapActive from '../../assets/figma/explore/icon-slot.svg';
import MapDefault from '../../assets/figma/chats/asset-3.svg';
import ChatActive from '../../assets/figma/chats/asset-4.svg';
import ChatDefault from '../../assets/figma/explore/icon-slot-2.svg';
import BellActive from '../../assets/figma/notifications/icon-slot-3.svg';
import BellDefault from '../../assets/figma/explore/icon-slot-3.svg';
import ProfileActive from '../../assets/figma/profile/icon-slot-4.svg';
import ProfileDefault from '../../assets/figma/explore/icon-slot-4.svg';

const tabs = {
  Explore: { label: 'Карта', active: MapActive, inactive: MapDefault },
  Chats: { label: 'Чаты', active: ChatActive, inactive: ChatDefault },
  Notifications: { label: 'Уведомления', active: BellActive, inactive: BellDefault },
  Profile: { label: 'Профиль', active: ProfileActive, inactive: ProfileDefault },
};

export function BottomBar({ state, navigation }: BottomTabBarProps) {
  return <SafeAreaView edges={['bottom']} className="border-t border-line bg-white"><View className="h-[60px] flex-row px-2">{state.routes.map((route, index) => {
    const tab = tabs[route.name as keyof typeof tabs];
    const active = state.index === index;
    const Icon = active ? tab.active : tab.inactive;
    return <Pressable key={route.key} accessibilityRole="tab" accessibilityState={{ selected: active }} accessibilityLabel={tab.label} onPress={() => navigation.navigate(route.name)} className="flex-1 items-center justify-center gap-1"><Icon /><Text className={`text-[10px] ${active ? 'font-semibold text-ink' : 'font-medium text-muted'}`}>{tab.label}</Text></Pressable>;
  })}</View></SafeAreaView>;
}
