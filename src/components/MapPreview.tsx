import { Pressable, Text, View } from 'react-native';
import CityStreets from '../../assets/figma/explore/city-streets.svg';
import CityStreetsCompact from '../../assets/figma/meeting-confirmed/city-streets.svg';
import BookMarker from '../../assets/figma/explore/meeting-point.svg';
import TreeMarker from '../../assets/figma/explore/meeting-point-2.svg';
import GamesMarker from '../../assets/figma/explore/place-marker.svg';
import CoffeeMarker from '../../assets/figma/explore/coffee.svg';
import MusicMarker from '../../assets/figma/explore/meeting-point-3.svg';
import ShieldIcon from '../../assets/figma/explore/shield-check.svg';

export function MapPreview({ onCoffee, onGames, onJazz, compact = false, category = 'Все', onCategory }: { onCoffee?: () => void; onGames?: () => void; onJazz?: () => void; compact?: boolean; category?: string; onCategory?: (category: string) => void }) {
  return <View className={`relative overflow-hidden bg-[#EDEEE6] ${compact ? 'h-[134px] rounded-card' : 'h-[200px]'}`}>
    <View className="absolute -right-7 -top-7 h-72 w-36 rotate-[18deg] rounded-[64px] bg-[#D7E3C4]" />
    <View className="absolute right-10 top-20 h-40 w-10 rotate-[18deg] rounded-3xl bg-[#B9D9DB]" />
    <View className="absolute left-3 top-14 h-20 w-24 -rotate-[10deg] rounded-lg border border-[#D9DCCF] bg-[#E1E3D9]" />
    <View className="absolute left-36 top-5 h-20 w-20 -rotate-[10deg] rounded-lg border border-[#D9DCCF] bg-[#E1E3D9]" />
    <View className="absolute left-6 top-44 h-16 w-24 -rotate-[10deg] rounded-lg border border-[#D9DCCF] bg-[#E1E3D9]" />
    <View className="absolute left-[104px] top-0">{compact ? <CityStreetsCompact /> : <CityStreets />}</View>
    <Text className="absolute right-14 top-12 font-medium text-[10px] text-green">Чистые{compact ? ' пруды' : '\nпруды'}</Text>
    <Text className={`absolute left-5 font-sans text-[10px] text-muted ${compact ? 'top-5' : 'top-[158px]'}`}>Покровка</Text>
    {!compact ? <><Text className="absolute left-7 top-[92px] font-sans text-[10px] text-muted">Мясницкая улица</Text><Pressable accessibilityRole="button" accessibilityLabel="Открыть настолки" onPress={onGames} className="absolute left-[92px] top-[112px]"><GamesMarker /></Pressable><View className="absolute left-12 top-14"><BookMarker /></View><View className="absolute right-6 top-[122px]"><TreeMarker /></View></> : null}
    <Pressable accessibilityRole="button" accessibilityLabel="Открыть встречу за кофе" onPress={onCoffee} className="absolute left-[183px] top-[64px] h-[50px] w-[50px] items-center justify-center rounded-full border-2 border-ink bg-lime"><CoffeeMarker /></Pressable>
    {!compact ? <Pressable accessibilityRole="button" accessibilityLabel="Открыть джаз во дворе" onPress={onJazz} className="absolute right-12 top-6"><MusicMarker /></Pressable> : null}
    {!compact ? <><View className="absolute bottom-2 left-[178px] rounded-lg bg-white px-2 py-1"><Text className="font-semibold text-[10px] text-ink">Кофе · 18:30</Text></View><View className="absolute left-5 top-2 flex-row gap-2">{[['Все', 'Всё рядом'], ['Кофе', 'Кофе'], ['Прогулки', 'Прогулки']].map(([value, label]) => <Pressable key={value} accessibilityRole="button" accessibilityState={{ selected: category === value }} onPress={() => onCategory?.(value)} className={`rounded-full px-3 py-2 ${category === value ? 'bg-lime' : 'bg-white'}`}><Text className="font-medium text-xs text-ink">{label}</Text></Pressable>)}</View><View className="absolute left-5 top-[48px] flex-row items-center gap-1 rounded-lg bg-white px-2 py-1"><ShieldIcon /><Text className="font-sans text-[10px] text-muted">Только встречи и публичные места</Text></View></> : null}
  </View>;
}
