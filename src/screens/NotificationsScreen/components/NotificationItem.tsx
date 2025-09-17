import React from 'react';
import { ListItem } from 'react-native-elements';
import {
  NotificationCard,
  NotificationIcon,
  NotificationHeader,
  UnreadDot,
  DateText,
  styles,
} from '../styles';
import { Notification } from '../models';

type Props = {
  notification: Notification;
  onPress: () => void;
  onLongPress: () => void;
};

const getNotificationEmoji = (type: string) => {
  switch (type) {
    case 'appointment_confirmed':
      return '✅';
    case 'appointment_cancelled':
      return '❌';
    case 'appointment_reminder':
      return '⏰';
    default:
      return '📩';
  }
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

const NotificationItem: React.FC<Props> = ({ notification, onPress, onLongPress }) => {
  return (
    <NotificationCard isRead={notification.read}>
      <ListItem onPress={onPress} onLongPress={onLongPress}>
        <NotificationIcon>{getNotificationEmoji(notification.type)}</NotificationIcon>
        <ListItem.Content>
          <NotificationHeader>
            <ListItem.Title style={styles.title}>{notification.title}</ListItem.Title>
            {!notification.read && <UnreadDot />}
          </NotificationHeader>
          <ListItem.Subtitle style={styles.message}>{notification.message}</ListItem.Subtitle>
          <DateText>{formatDate(notification.createdAt)}</DateText>
        </ListItem.Content>
      </ListItem>
    </NotificationCard>
  );
};

export default NotificationItem;
