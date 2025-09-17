export interface AppSettings {
  notifications: boolean;
  autoBackup: boolean;
  theme: 'light' | 'dark';
  language: string;
}

export type PartialAppSettings = Partial<AppSettings>;

export interface StorageInfo {
  cacheSize: number;
  totalKeys: number;
}
