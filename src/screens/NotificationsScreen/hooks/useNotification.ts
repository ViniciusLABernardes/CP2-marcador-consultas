import { useCallback, useState } from 'react';
import { Notification } from '../models';
import * as service from '../services/notificationService';

export function useNotifications(userId?: string) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const loadNotifications = useCallback(async () => {
    if (!userId) {
      setNotifications([]);
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      const list = await service.getNotifications(userId);
      setNotifications(list || []);
    } catch (error) {
      console.error('Erro ao carregar notificações:', error);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  const markAsRead = useCallback(
    async (notificationId: string) => {
      try {
        await service.markAsRead(notificationId);
        await loadNotifications();
      } catch (error) {
        console.error('Erro ao marcar como lida:', error);
      }
    },
    [loadNotifications]
  );

  const markAllAsRead = useCallback(async () => {
    if (!userId) return;
    try {
      await service.markAllAsRead(userId);
      await loadNotifications();
    } catch (error) {
      console.error('Erro ao marcar todas como lidas:', error);
    }
  }, [userId, loadNotifications]);

  const deleteNotification = useCallback(
    async (notificationId: string) => {
      try {
        await service.deleteNotification(notificationId);
        await loadNotifications();
      } catch (error) {
        console.error('Erro ao excluir notificação:', error);
      }
    },
    [loadNotifications]
  );

  return {
    notifications,
    loading,
    loadNotifications,
    markAsRead,
    markAllAsRead,
    deleteNotification,
  };
}
