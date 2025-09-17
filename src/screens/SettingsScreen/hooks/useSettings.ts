import { useCallback, useState } from 'react';
import { Alert, Share } from 'react-native';
import { AppSettings, StorageInfo } from '../models';
import * as service from '../services/settingsService';

const DEFAULT_SETTINGS: AppSettings = {
  notifications: true,
  autoBackup: true,
  theme: 'light',
  language: 'pt-BR',
};

export function useSettings() {
  const [settings, setSettings] = useState<AppSettings>(DEFAULT_SETTINGS);
  const [loading, setLoading] = useState<boolean>(true);
  const [storageInfo, setStorageInfo] = useState<StorageInfo | null>(null);

  const loadSettings = useCallback(async () => {
    try {
      setLoading(true);
      const appSettings = await service.getAppSettings();
      setSettings(appSettings ?? DEFAULT_SETTINGS);

      const info = await service.getStorageInfo();
      setStorageInfo(info ?? null);
    } catch (error) {
      console.error('Erro ao carregar configurações:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const updateSetting = useCallback(async <K extends keyof AppSettings>(key: K, value: AppSettings[K]) => {
    try {
      const prev = settings;
      const updated = { ...settings, [key]: value };
      setSettings(updated);
      await service.updateAppSettings({ [key]: value });
    } catch (error) {
      console.error('Erro ao atualizar configuração:', error);
      Alert.alert('Erro', 'Não foi possível salvar a configuração');
    }
  }, [settings]);

  const handleCreateBackup = useCallback(async () => {
    try {
      setLoading(true);
      const backup = await service.createBackup();
      const fileName = `backup_${new Date().toISOString().split('T')[0]}.json`;

      await Share.share({
        message: backup,
        title: `Backup do App - ${fileName}`,
      });

      Alert.alert('Sucesso', 'Backup criado e compartilhado com sucesso!');
    } catch (error) {
      console.error('Erro ao criar backup:', error);
      Alert.alert('Erro', 'Não foi possível criar o backup');
    } finally {
      setLoading(false);
    }
  }, []);

  const handleClearCache = useCallback(async () => {
    try {
      await service.clearCache();
      await loadSettings();
      Alert.alert('Sucesso', 'Cache limpo com sucesso!');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível limpar o cache');
    }
  }, [loadSettings]);

  const handleClearAllData = useCallback(async () => {
    try {
      await service.clearAll();
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível apagar os dados');
    }
  }, []);

  return {
    settings,
    loading,
    storageInfo,
    loadSettings,
    updateSetting,
    handleCreateBackup,
    handleClearCache,
    handleClearAllData,
  };
}
