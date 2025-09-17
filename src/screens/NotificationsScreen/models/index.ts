export type NotificationType =
  | 'appointment_confirmed'
  | 'appointment_cancelled'
  | 'appointment_reminder'
  | string;

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  createdAt: string; // ISO string
  read: boolean;
}
