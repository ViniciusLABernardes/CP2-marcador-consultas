// Service local da tela para desacoplar da implementação global.
// Aqui delegamos ao storageService global do app, mas se um dia mudar,
// você só altera este arquivo.

import { storageService } from '../../../services/storage';
import { AppSettings, PartialAppSettings, StorageInfo } from '../models';

export async function getAppSettings(): Promise<AppSettings> {
  return storageService.getAppSettings();
}

export async function updateAppSettings(partial: PartialAppSettings): Promise<void> {
  return storageService.updateAppSettings(partial);
}

export async function getStorageInfo(): Promise<StorageInfo> {
  return storageService.getStorageInfo();
}

export async function createBackup(): Promise<string> {
  return storageService.createBackup();
}

export async function clearCache(): Promise<void> {
  return storageService.clearCache();
}

export async function clearAll(): Promise<void> {
  return storageService.clearAll();
}
