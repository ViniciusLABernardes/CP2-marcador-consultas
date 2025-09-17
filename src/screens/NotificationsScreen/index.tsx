import React from 'react';
import { ScrollView, ViewStyle, Alert } from 'react-native';
import { Button, Badge } from 'react-native-elements';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useFocusEffect } from '@react-navigation/native';
import { RootStackParamList } from '../../types/navigation';
import theme from '../../styles/theme';
import Header from '../../components/Header';

import {
  styles,
  Container,
  TitleContainer,
  Title,
  LoadingText,
  EmptyContainer,
  EmptyText,
} from './styles';

import { useNotifications } from './hooks/useNotifications';
import NotificationItem from './components/NotificationItem';
import { Notification as NotificationModel } from './models';

type NotificationsScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Notifications'>;
};

const NotificationsScreen: React.FC = () => {
  const { user } = useAuth();
  const navigation = useNavigation<NotificationsScreenProps['navigation']>();

  const {
    notifications,
    loading,
    loadNotifications,
    markAsRead,
    markAllAsRead,
    deleteNotification,
  } = useNotifications(user?.id);

  useFocusEffect(
    React.useCallback(() => {
      loadNotifications();
    }, [loadNotifications])
  );

  const unreadCount = notifications.filter(n => !n.read).length;

  const onDelete = (notificationId: string) => {
    Alert.alert(
      'Excluir Notificação',
      'Tem certeza que deseja excluir esta notificação?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            await deleteNotification(notificationId);
          },
        },
      ]
    );
  };

  return (
    <Container>
      <Header />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <TitleContainer>
          <Title>Notificações</Title>
          {unreadCount > 0 && (
            <Badge value={unreadCount} status="error" containerStyle={styles.badge} />
          )}
        </TitleContainer>

        {unreadCount > 0 && (
          <Button
            titleStyle={{ fontFamily: 'Arimo' }}
            title="Marcar todas como lidas"
            onPress={markAllAsRead}
            containerStyle={styles.markAllButton as ViewStyle}
            buttonStyle={styles.markAllButtonStyle}
          />
        )}

        <Button
          titleStyle={{ fontFamily: 'Arimo' }}
          title="Voltar"
          onPress={() => navigation.goBack()}
          containerStyle={styles.button as ViewStyle}
          buttonStyle={styles.buttonStyle}
        />

        {loading ? (
          <LoadingText>Carregando notificações...</LoadingText>
        ) : notifications.length === 0 ? (
          <EmptyContainer>
            <EmptyText>Nenhuma notificação encontrada</EmptyText>
          </EmptyContainer>
        ) : (
          notifications.map((notification: NotificationModel) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
              onPress={() => !notification.read && markAsRead(notification.id)}
              onLongPress={() => onDelete(notification.id)}
            />
          ))
        )}
      </ScrollView>
    </Container>
  );
};

export default NotificationsScreen;
