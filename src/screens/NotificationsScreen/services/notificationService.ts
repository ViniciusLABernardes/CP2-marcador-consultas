// Service local da tela para desacoplar da implementação global.
// Se a implementação global mudar, basta ajustar aqui.

import { notificationService as globalNotificationService } from '../../../services/notifications';
import { Notification } from '../models';

export function getNotifications(userId: string): Promise<Notification[]> {
  return globalNotificationService.getNotifications(userId);
}

export function markAsRead(notificationId: string): Promise<void> {
  return globalNotificationService.markAsRead(notificationId);
}

export function markAllAsRead(userId: string): Promise<void> {
  return globalNotificationService.markAllAsRead(userId);
}

export function deleteNotification(notificationId: string): Promise<void> {
  return globalNotificationService.deleteNotification(notificationId);
}
