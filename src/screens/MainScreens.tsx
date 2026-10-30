import { useMemo, useState } from 'react';
import { Image, Pressable, Text, TextInput, View } from 'react-native';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { adventureApi } from '../api';
import type { Meeting, MeetingId, NotificationItem } from '../api/types';
import { Body, Chip, EmptyState, ErrorState, LoadState, Notice, PrimaryButton, Screen, Title } from '../components/ui';
import { MapPreview } from '../components/MapPreview';
import { useResource } from '../hooks/useResource';
import type { MainTabParamList, RootStackParamList } from '../navigation/types';
import SearchIcon from '../../assets/figma/explore/search.svg';
import CoffeeIcon from '../../assets/figma/explore/chat-avatar.svg';
import CheckIcon from '../../assets/figma/notifications/notification-symbol.svg';
import BotIcon from '../../assets/figma/notifications/crawler-avatar.svg';
import PingIcon from '../../assets/figma/notifications/notification-symbol-2.svg';
import CancelIcon from '../../assets/figma/notifications/notification-symbol-3.svg';
import SettingsIcon from '../../assets/figma/profile/header-action.svg';
import ReadAllIcon from '../../assets/figma/notifications/header-action.svg';

type TabProps<T extends keyof MainTabParamList> = BottomTabScreenProps<MainTabParamList, T>;
const meetingImages = {
  coffee: require('../../assets/figma/explore/meeting-image.jpg'),
  games: require('../../assets/figma/explore/meeting-image-2.jpg'),
  jazz: require('../../assets/figma/explore/meeting-image-3.jpg'),
};
const chatImages = {
  coffee: require('../../assets/figma/chats/asset.jpg'),
  games: require('../../assets/figma/chats/asset-2.jpg'),
  jazz: require('../../assets/figma/chats/asset-3.jpg'),
};

function MeetingCard({ meeting, onPress }: { meeting: Meeting; onPress: () => void }) {
  const status = meeting.access === 'joined' ? `Вы идёте · ${meeting.participants}/${meeting.capacity}` : meeting.access === 'request' ? '🔒 По заявке' : 'Вход свободный';
  return <Pressable accessibilityRole="button" accessibilityLabel={meeting.title} onPress={onPress} className="h-24 flex-row items-center gap-[10px] rounded-card bg-white p-3"><Image source={meetingImages[meeting.id]} className="!h-[66px] !w-[60px] rounded-[14px]" /><View className="flex-1"><Text className="font-medium text-[10px] text-green">{meeting.category} · {meeting.time}</Text><Text numberOfLines={1} className="font-bold text-base text-ink">{meeting.title}</Text><Text className="font-sans text-[10px] text-muted">{meeting.area} · {meeting.distance}</Text><View className="mt-1 flex-row items-center justify-between"><Text className="font-semibold text-[10px] text-ink">{meeting.host} · организатор</Text><View className={`rounded-full px-[6px] py-[2px] ${meeting.access === 'request' ? 'bg-warm' : 'bg-pale'}`}><Text className={`font-semibold text-[10px] ${meeting.access === 'request' ? 'text-rust' : 'text-ink'}`}>{status}</Text></View></View></View></Pressable>;
}

export function ExploreScreen({ navigation }: TabProps<'Explore'>) {
  const root = navigation.getParent<NativeStackNavigationProp<RootStackParamList>>();
  const { data, loading, error, retry } = useResource(adventureApi.getMeetings);
  const [category, setCategory] = useState('Все');
  const [query, setQuery] = useState('');
  const [searching, setSearching] = useState(false);
  const [sortByTime, setSortByTime] = useState(false);
  const visible = useMemo(() => (data ?? []).filter((meeting) => (category === 'Все' || meeting.category === category) && meeting.title.toLowerCase().includes(query.toLowerCase())).sort((a, b) => sortByTime ? a.time.localeCompare(b.time) : 0), [data, category, query, sortByTime]);
  const open = (id: MeetingId) => root?.navigate(id === 'games' ? 'MeetingProtected' : 'MeetingOpen');
  return <Screen scroll withBottomInset={false}><View className="h-16 flex-row items-center justify-between px-5"><View><Text className="font-extrabold text-[28px] text-ink">авантюра*</Text><Text className="font-sans text-[11px] text-muted">Москва · Чистые пруды</Text></View><Pressable accessibilityRole="button" accessibilityLabel="Поиск встреч" onPress={() => setSearching(!searching)} className="h-[42px] w-[42px] items-center justify-center rounded-full bg-white"><SearchIcon /></Pressable></View>{searching ? <TextInput accessibilityLabel="Поиск встреч" placeholder="Найти встречу" value={query} onChangeText={setQuery} className="mx-5 mb-3 h-11 rounded-input border border-line bg-white px-4 font-sans text-sm text-ink" /> : null}<MapPreview category={category} onCategory={setCategory} onCoffee={() => open('coffee')} onGames={() => open('games')} onJazz={() => open('jazz')} /><View className="gap-2 px-5 pb-3 pt-3"><View className="flex-row items-center justify-between"><Text className="font-semibold text-[13px] text-ink">Сегодня рядом</Text><Pressable accessibilityRole="button" onPress={() => setSortByTime(!sortByTime)}><Text className="font-sans text-[11px] text-muted">{sortByTime ? 'По времени' : 'По релевантности'} ⌄</Text></Pressable></View>{loading ? <LoadState /> : error ? <ErrorState onRetry={retry} /> : visible.length ? visible.map((meeting) => <MeetingCard key={meeting.id} meeting={meeting} onPress={() => open(meeting.id)} />) : <EmptyState message="Поблизости пока нет встреч по выбранным условиям" />}</View><View className="gap-2 px-5 pb-4"><View className="flex-row justify-between"><Text className="font-semibold text-[13px] text-ink">Активные встречи</Text><Text className="font-sans text-[11px] text-muted">4 из 6 · 1 чат</Text></View><Pressable accessibilityRole="button" onPress={() => root?.navigate('MeetingChat')} className="h-[88px] flex-row items-center gap-2 rounded-card bg-white p-3"><View className="h-9 w-9 items-center justify-center rounded-full bg-pale"><CoffeeIcon /></View><View className="flex-1"><Text className="font-bold text-[13px] text-ink">Кофе без планов</Text><Text className="font-sans text-[10px] text-muted">Аня: До встречи! · 18:12</Text></View><Pressable accessibilityRole="button" onPress={() => root?.navigate('PingCreate')} className="rounded-full bg-lime px-3 py-2"><Text className="font-semibold text-xs text-ink">Пинг рядом</Text></Pressable></Pressable></View></Screen>;
}

export function ChatsScreen({ navigation }: TabProps<'Chats'>) {
  const root = navigation.getParent<NativeStackNavigationProp<RootStackParamList>>();
  const { data, loading, error, retry } = useResource(adventureApi.getChats);
  const [unreadOnly, setUnreadOnly] = useState(false);
  const chats = (data ?? []).filter((chat) => !unreadOnly || chat.unread > 0);
  return <Screen scroll withBottomInset={false}><View className="px-6 pb-6 pt-4"><Title>Чаты</Title><Body className="mt-2">Ваши встречи продолжаются здесь</Body></View><View className="flex-row gap-2 px-6"><Chip label="Все" active={!unreadOnly} onPress={() => setUnreadOnly(false)} /><Chip label="Непрочитанные · 3" active={unreadOnly} onPress={() => setUnreadOnly(true)} /></View><View className="gap-2 px-6 pt-6"><Text className="mb-1 font-semibold text-xs text-ink">Сегодня</Text>{loading ? <LoadState label="Загружаем чаты..." /> : error ? <ErrorState onRetry={retry} /> : chats.length ? chats.map((chat) => <Pressable key={chat.id} accessibilityRole="button" onPress={() => root?.navigate('MeetingChat')} className="min-h-[94px] flex-row items-center gap-3 rounded-card bg-white p-4"><Image source={chatImages[chat.id]} className="!h-14 !w-12 rounded-[14px]" /><View className="flex-1 gap-1"><View className="flex-row justify-between"><Text className="font-bold text-[13px] text-ink">{chat.title}</Text><Text className="font-sans text-[10px] text-green">{chat.latestTime}</Text></View><Text className="font-sans text-xs leading-[17px] text-ink">{chat.latestMessage}</Text><Text className="font-sans text-[10px] text-muted">Сегодня · {chat.meetingTime}</Text></View>{chat.unread ? <View className="h-[22px] w-[22px] items-center justify-center rounded-full bg-lime"><Text className="font-semibold text-[10px] text-ink">{chat.unread}</Text></View> : null}</Pressable>) : <EmptyState message="Пока нет чатов по выбранному фильтру" />}</View><View className="mx-6 mt-6"><Notice>Чаты доступны только участникам встреч. Договоритесь о деталях и до встречи!</Notice></View></Screen>;
}

function NotificationCard({ item, onPress }: { item: NotificationItem; onPress: () => void }) {
  const Icon = item.kind === 'confirmed' ? CheckIcon : item.kind === 'crawler' ? BotIcon : item.kind === 'ping' ? PingIcon : item.kind === 'cancelled' ? CancelIcon : null;
  return <Pressable accessibilityRole="button" onPress={onPress} className={`flex-row gap-3 rounded-card border p-3 ${item.read ? 'border-soft bg-canvas' : 'border-line bg-white'}`}><View className="h-[34px] w-[34px] items-center justify-center rounded-full bg-pale">{Icon ? <Icon /> : <Image source={require('../../assets/figma/notifications/avatar.jpg')} className="!h-[34px] !w-[34px] rounded-full" />}</View><View className="flex-1 gap-1"><View className="flex-row items-center justify-between"><Text className="font-semibold text-[13px] text-ink">{item.title}</Text>{!item.read ? <View className="h-1.5 w-1.5 rounded-full bg-green" /> : null}</View><Text className="font-sans text-xs leading-[17px] text-muted">{item.description}</Text><View className="flex-row justify-between"><Text className="font-semibold text-[11px] text-green">{item.action ?? (item.kind === 'cancelled' ? 'Встреча отменена' : '')}</Text><Text className="font-sans text-[10px] text-muted">{item.time}</Text></View></View></Pressable>;
}

export function NotificationsScreen({ navigation }: TabProps<'Notifications'>) {
  const root = navigation.getParent<NativeStackNavigationProp<RootStackParamList>>();
  const { data, loading, error, retry } = useResource(adventureApi.getNotifications);
  const [readIds, setReadIds] = useState<string[]>([]);
  const items = (data ?? []).map((item) => ({ ...item, read: item.read || readIds.includes(item.id) }));
  const unread = items.filter((item) => !item.read).length;
  return <Screen scroll withBottomInset={false}><View className="px-5 pb-5 pt-3"><View className="flex-row items-center justify-between"><Title>Есть новости</Title><Pressable accessibilityRole="button" accessibilityLabel="Отметить прочитанными" onPress={() => setReadIds((data ?? []).map((item) => item.id))}><ReadAllIcon /></Pressable></View><Body className="mt-1 text-xs">{unread} новых уведомления</Body></View><View className="gap-[10px] px-5"><View className="flex-row justify-between"><Text className="font-semibold text-xs text-ink">Сегодня</Text><Pressable accessibilityRole="button" onPress={() => setReadIds((data ?? []).map((item) => item.id))}><Text className="font-sans text-[11px] text-muted">Отметить прочитанными</Text></Pressable></View>{loading ? <LoadState label="Загружаем уведомления..." /> : error ? <ErrorState onRetry={retry} /> : items.length ? items.map((item) => <NotificationCard key={item.id} item={item} onPress={() => { setReadIds((ids) => [...ids, item.id]); if (item.kind === 'request') root?.navigate('MeetingProtected'); else if (item.kind !== 'cancelled') root?.navigate('MeetingConfirmed'); }} />) : <EmptyState message="Пока нет уведомлений" />}</View></Screen>;
}

export function ProfileScreen() {
  const [name, setName] = useState('Саша');
  const [bio, setBio] = useState('За кофе, долгие прогулки и новые знакомства. Легко собираюсь на авантюры ✨');
  const [selected, setSelected] = useState<string[]>(['Кофе', 'Прогулки', 'Настолки']);
  const [saved, setSaved] = useState(false);
  const toggle = (value: string) => { setSaved(false); setSelected((items) => items.includes(value) ? items.filter((item) => item !== value) : [...items, value]); };
  return <Screen withBottomInset={false}><View className="flex-1 px-5 pt-3"><View className="flex-row items-center justify-between"><Title>Это вы</Title><View><SettingsIcon /></View></View><View className="mt-5 flex-row items-center gap-4"><Image source={require('../../assets/figma/profile/avatar.jpg')} className="!h-[72px] !w-[72px] rounded-full" /><View><Text className="font-bold text-2xl text-ink">{name}</Text><Text className="font-sans text-[11px] text-muted">✿ Профиль подтверждён</Text></View></View><Text className="mt-5 font-semibold text-[11px] text-muted">Как к вам обращаться</Text><TextInput accessibilityLabel="Как к вам обращаться" value={name} onChangeText={(value) => { setName(value); setSaved(false); }} className="mt-2 h-10 rounded-input border border-line bg-white px-3 font-sans text-sm text-ink" /><View className="mt-4 flex-row justify-between"><Text className="font-semibold text-[11px] text-muted">О себе</Text><Text className="font-sans text-[10px] text-muted">{bio.length}/160</Text></View><TextInput accessibilityLabel="О себе" value={bio} onChangeText={(value) => { setBio(value); setSaved(false); }} multiline maxLength={160} textAlignVertical="top" className="mt-2 h-[62px] rounded-input border border-line bg-white p-3 font-sans text-[13px] text-ink" /><Text className="mt-5 font-bold text-[17px] text-ink">Что вам по душе?</Text><Body className="mt-1 text-xs">Подберём встречи по вашим интересам</Body><View className="mt-2 flex-row flex-wrap gap-2">{['Кофе', 'Прогулки', 'Настолки', 'Спорт', 'Музыка', 'Кино', 'Искусство'].map((value) => <Chip key={value} label={`${selected.includes(value) ? '✓  ' : ''}${value}`} active={selected.includes(value)} onPress={() => toggle(value)} />)}</View><View className="mt-5"><Notice>Вас нет на карте. Точная геолокация не видна другим — даже участникам встречи.</Notice></View><View className="flex-1" /><View className="pb-4"><PrimaryButton label={saved ? 'Изменения сохранены' : 'Сохранить изменения'} onPress={() => setSaved(true)} /></View></View></Screen>;
}
