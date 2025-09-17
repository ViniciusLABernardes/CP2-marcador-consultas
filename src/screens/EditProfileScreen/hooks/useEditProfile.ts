
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../../../contexts/AuthContext';
import { imageService } from '../../../services/imageService';

export function useEditProfile() {
  const { user, updateUser } = useAuth();
  const [loading, setLoading] = useState(false);

  const saveProfile = async (updates: Partial<typeof user>) => {
    if (!user) return;
    setLoading(true);
    try {
      const updatedUser = { ...user, ...updates };

      await updateUser(updatedUser);
      await AsyncStorage.setItem('@MedicalApp:user', JSON.stringify(updatedUser));

      if (user.id) {
        await imageService.cleanupOldImages(user.id);
      }

      return updatedUser;
    } finally {
      setLoading(false);
    }
  };

  return { user, loading, saveProfile };
}
