import type { ReactNode } from 'react';
import { ActivityIndicator, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackIcon from '../../assets/figma/meeting-open/back.svg';
import ShieldIcon from '../../assets/figma/explore/shield-check.svg';

export function Screen({ children, scroll = false, className = '', withBottomInset = true }: { children: ReactNode; scroll?: boolean; className?: string; withBottomInset?: boolean }) {
  return (
    <SafeAreaView className={`flex-1 bg-canvas ${className}`} edges={withBottomInset ? ['top', 'bottom'] : ['top']}>
      {scroll ? <ScrollView className="flex-1" contentContainerClassName="pb-6" keyboardShouldPersistTaps="handled">{children}</ScrollView> : children}
    </SafeAreaView>
  );
}

export function Title({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <Text className={`font-bold text-[29px] leading-[33px] text-ink ${className}`}>{children}</Text>;
}

export function Body({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <Text className={`font-sans text-sm leading-5 text-muted ${className}`}>{children}</Text>;
}

export function PrimaryButton({ label, onPress, disabled = false, icon }: { label: string; onPress: () => void; disabled?: boolean; icon?: ReactNode }) {
  return (
    <Pressable accessibilityRole="button" accessibilityLabel={label} disabled={disabled} onPress={onPress} className={`h-[54px] flex-row items-center justify-center gap-2 rounded-card ${disabled ? 'bg-soft' : 'bg-lime'}`}>
      {icon}
      <Text className={`font-semibold text-sm ${disabled ? 'text-muted' : 'text-ink'}`}>{label}</Text>
    </Pressable>
  );
}

export function SecondaryButton({ label, onPress }: { label: string; onPress: () => void }) {
  return <Pressable accessibilityRole="button" onPress={onPress} className="h-[54px] items-center justify-center rounded-card border border-line bg-white"><Text className="font-semibold text-sm text-ink">{label}</Text></Pressable>;
}

export function PageHeader({ title, onBack, action }: { title: string; onBack: () => void; action?: ReactNode }) {
  return (
    <View className="h-[68px] flex-row items-center gap-3 px-5 pb-[18px] pt-3">
      <Pressable accessibilityRole="button" accessibilityLabel="Назад" onPress={onBack} className="h-[38px] w-[38px] items-center justify-center rounded-full bg-white"><BackIcon /></Pressable>
      <Text className="flex-1 font-bold text-[17px] text-ink">{title}</Text>
      {action ?? <View className="h-[38px] w-[38px]" />}
    </View>
  );
}

export function Notice({ children }: { children: ReactNode }) {
  return <View className="flex-row items-start gap-2 rounded-input bg-soft p-3"><ShieldIcon /><Text className="flex-1 font-sans text-[11px] leading-[15px] text-muted">{children}</Text></View>;
}

export function LoadState({ label = 'Загружаем встречи...' }: { label?: string }) {
  return <View accessibilityRole="progressbar" className="items-center gap-3 py-10"><ActivityIndicator color="#44652C" /><Body>{label}</Body></View>;
}

export function ErrorState({ onRetry }: { onRetry: () => void }) {
  return <View className="items-center gap-3 rounded-card bg-white p-6"><Text className="font-semibold text-ink">Не удалось загрузить данные</Text><Pressable accessibilityRole="button" onPress={onRetry}><Text className="font-semibold text-green">Повторить</Text></Pressable></View>;
}

export function EmptyState({ message }: { message: string }) {
  return <View className="items-center rounded-card bg-white p-6"><Body>{message}</Body></View>;
}

export function Chip({ label, active, onPress }: { label: string; active?: boolean; onPress?: () => void }) {
  return <Pressable accessibilityRole="button" accessibilityState={{ selected: !!active }} onPress={onPress} className={`h-[35px] items-center justify-center rounded-full border px-3 ${active ? 'border-lime bg-lime' : 'border-line bg-white'}`}><Text className="font-medium text-xs text-ink">{label}</Text></Pressable>;
}
