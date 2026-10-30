import type { AdventureApi, EventChat, Meeting, NotificationItem } from '../types';

const meetings: Meeting[] = [
  { id: 'coffee', category: 'Кофе', time: '18:30', title: 'Кофе без планов', area: 'Чистые пруды', distance: '~ 7 мин', host: 'Аня', access: 'joined', participants: 4, capacity: 6 },
  { id: 'games', category: 'Настолки', time: '19:00', title: 'Настолки до темноты', area: 'Район Покровки', distance: '~ 12 мин', host: 'Марк', access: 'request', participants: 5, capacity: 8 },
  { id: 'jazz', category: 'Музыка', time: '19:30', title: 'Джаз во дворе', area: 'Двор «Ровесника»', distance: '~ 15 мин', host: 'Crawler', access: 'open', participants: 0, capacity: 0 },
];

const chats: EventChat[] = [
  { id: 'coffee', title: 'Кофе без планов', latestMessage: 'Аня: Я в зелёной рубашке 🙂 До встречи!', latestTime: '18:12', meetingTime: '18:30', unread: 2 },
  { id: 'games', title: 'Настолки до темноты', latestMessage: 'Марк: Беру «Имаджинариум». Кто ещё?', latestTime: '18:05', meetingTime: '19:00', unread: 1 },
  { id: 'jazz', title: 'Джаз во дворе', latestMessage: 'Лена: Давайте встретимся у сцены', latestTime: '17:48', meetingTime: '19:30', unread: 0 },
];

const notifications: NotificationItem[] = [
  { id: 'n1', title: 'Вы идёте на кофе!', description: 'Кофе без планов · сегодня, 18:30. Ваше участие подтверждено.', action: 'Открыть встречу →', time: '18:12', read: false, kind: 'confirmed' },
  { id: 'n2', title: 'Crawler нашёл кое-что', description: 'Джаз во дворе · сегодня, 19:30. Публичный концерт в 15 минутах.', action: 'Посмотреть событие →', time: '18:11', read: false, kind: 'crawler' },
  { id: 'n3', title: 'Пинг в вашем районе', description: 'Лена приглашает на «Прогулка у Чистых прудов» · сегодня, 18:30. Она уже присоединена к встрече.', action: 'Перейти к встрече →', time: '18:07', read: false, kind: 'ping' },
  { id: 'n4', title: 'Марк приглашает', description: 'Настолки до темноты · 19:00. Ваша заявка ожидает подтверждения.', action: 'К заявке на встречу →', time: '18:02', read: true, kind: 'request' },
  { id: 'n5', title: 'Волейбол у воды', description: 'Сегодня, 19:00 · организатор отменил встречу из-за дождя.', time: '17:50', read: true, kind: 'cancelled' },
];

const copy = <T,>(items: T[]): Promise<T[]> => new Promise((resolve) => setTimeout(() => resolve(items.map((item) => ({ ...item }))), 180));

export const mockAdventureApi: AdventureApi = {
  getMeetings: () => copy(meetings),
  getChats: () => copy(chats),
  getNotifications: () => copy(notifications),
};
