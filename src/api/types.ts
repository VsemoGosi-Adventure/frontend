export type MeetingId = 'coffee' | 'games' | 'jazz';

export interface Meeting {
  id: MeetingId;
  category: string;
  time: string;
  title: string;
  area: string;
  distance: string;
  host: string;
  access: 'joined' | 'request' | 'open';
  participants: number;
  capacity: number;
}

export interface EventChat {
  id: MeetingId;
  title: string;
  latestMessage: string;
  latestTime: string;
  meetingTime: string;
  unread: number;
}

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  action?: string;
  time: string;
  read: boolean;
  kind: 'confirmed' | 'crawler' | 'ping' | 'request' | 'cancelled';
}

export interface AdventureApi {
  getMeetings(): Promise<Meeting[]>;
  getChats(): Promise<EventChat[]>;
  getNotifications(): Promise<NotificationItem[]>;
}
