
import AsyncStorage from '@react-native-async-storage/async-storage';
import { imageService } from '../../../services/imageService';

export async function saveUserProfile(user: any, updateUser: (u: any) => Promise<void>) {
  await updateUser(user);
  await AsyncStorage.setItem('@MedicalApp:user', JSON.stringify(user));
  if (user.id) {
    await imageService.cleanupOldImages(user.id);
  }
}
