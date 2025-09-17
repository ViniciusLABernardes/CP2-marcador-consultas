import React from 'react';
import { ScrollView, Alert } from 'react-native';
import { Button, ListItem, Switch } from 'react-native-elements';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useFocusEffect } from '@react-navigation/native';
import { RootStackParamList } from '../../types/navigation';
import theme from '../../styles/theme';
import Header from '../../components/Header';

import { styles, Container, LoadingContainer, LoadingText, Title, SectionTitle, SettingsCard } from './styles';
import InfoRow from './components/InfoRow';
import { useSettings } from './hooks/useSettings';

type SettingsScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Settings'>;
};

const SettingsScreen: React.FC = () => {
  const { signOut } = useAuth();
  const navigation = useNavigation<SettingsScreenProps['navigation']>();
  const {
    settings,
    loading,
    storageInfo,
    loadSettings,
    updateSetting,
    handleCreateBackup,
    handleClearCache,
    handleClearAllData,
  } = useSettings();

  useFocusEffect(
    React.useCallback(() => {
      loadSettings();
    }, [loadSettings])
  );

  if (loading) {
    return (
      <Container>
        <Header />
        <LoadingContainer>
          <LoadingText>Carregando configurações...</LoadingText>
        </LoadingContainer>
      </Container>
    );
  }

  const confirmClearAll = () => {
    Alert.alert(
      'Apagar Todos os Dados',
      'ATENÇÃO: Isso irá apagar TODOS os dados da aplicação permanentemente. Esta ação não pode ser desfeita!',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'APAGAR TUDO',
          style: 'destructive',
          onPress: () => {
            Alert.alert(
              'Confirmação Final',
              'Tem certeza absoluta? Todos os dados serão perdidos!',
              [
                { text: 'Cancelar', style: 'cancel' },
                {
                  text: 'SIM, APAGAR',
                  style: 'destructive',
                  onPress: async () => {
                    await handleClearAllData();
                    Alert.alert('Concluído', 'Todos os dados foram apagados. O app será reiniciado.', [
                      { text: 'OK', onPress: () => signOut() },
                    ]);
                  },
                },
              ]
            );
          },
        },
      ]
    );
  };

  return (
    <Container>
      <Header />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Title>Configurações</Title>

        <SectionTitle>Preferências</SectionTitle>
        <SettingsCard>
          <ListItem>
            <ListItem.Content>
              <ListItem.Title>Notificações</ListItem.Title>
              <ListItem.Subtitle>Receber notificações push</ListItem.Subtitle>
            </ListItem.Content>
            <Switch
              value={settings.notifications}
              onValueChange={(value) => updateSetting('notifications', value)}
              trackColor={{ false: theme.colors.border, true: theme.colors.primary }}
            />
          </ListItem>

          <ListItem>
            <ListItem.Content>
              <ListItem.Title>Backup Automático</ListItem.Title>
              <ListItem.Subtitle>Criar backups automaticamente</ListItem.Subtitle>
            </ListItem.Content>
            <Switch
              value={settings.autoBackup}
              onValueChange={(value) => updateSetting('autoBackup', value)}
              trackColor={{ false: theme.colors.border, true: theme.colors.primary }}
            />
          </ListItem>
        </SettingsCard>

        <SectionTitle>Dados e Armazenamento</SectionTitle>
        <SettingsCard>
          {storageInfo && (
            <>
              <InfoRow label="Itens no Cache:" value={String(storageInfo.cacheSize)} />
              <InfoRow label="Total de Chaves:" value={String(storageInfo.totalKeys)} />
            </>
          )}
        </SettingsCard>

        <Button
          titleStyle={{ fontFamily: 'Arimo' }}
          title="Criar Backup"
          onPress={handleCreateBackup}
          containerStyle={styles.button}
          buttonStyle={styles.backupButton}
          loading={loading}
        />

        <Button
          titleStyle={{ fontFamily: 'Arimo' }}
          title="Limpar Cache"
          onPress={handleClearCache}
          containerStyle={styles.button}
          buttonStyle={styles.cacheButton}
        />

        <SectionTitle>Ações Perigosas</SectionTitle>
        <Button
          titleStyle={{ fontFamily: 'Arimo' }}
          title="Apagar Todos os Dados"
          onPress={confirmClearAll}
          containerStyle={styles.button}
          buttonStyle={styles.dangerButton}
        />

        <Button
          titleStyle={{ fontFamily: 'Arimo' }}
          title="Voltar"
          onPress={() => navigation.goBack()}
          containerStyle={styles.button}
          buttonStyle={styles.buttonStyle}
        />
      </ScrollView>
    </Container>
  );
};

export default SettingsScreen;
