import React from 'react';
import { Button } from 'react-native-elements';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import Header from '../../components/Header';
import ProfileImagePicker from '../../components/ProfileImagePicker';

import {
  Container,
  ScrollView,
  Title,
  Name,
  Email,
  RoleBadge,
  RoleText,
  SpecialtyText,
  ProfileCard,
  styles,
} from './styles';
import { ViewStyle } from 'react-native';

type ProfileScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Profile'>;
};

const ProfileScreen: React.FC = () => {
  const { user, signOut } = useAuth();
  const navigation = useNavigation<ProfileScreenProps['navigation']>();

  const getRoleText = (role: string) => {
    switch (role) {
      case 'admin':
        return 'Administrador';
      case 'doctor':
        return 'Médico';
      case 'patient':
        return 'Paciente';
      default:
        return role;
    }
  };

  return (
    <Container>
      <Header />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Title>Meu Perfil</Title>

        <ProfileCard>
          <ProfileImagePicker
            currentImageUri={user?.image}
            onImageSelected={() => {}}
            size={120}
            editable={false}
          />
          <Name>{user?.name}</Name>
          <Email>{user?.email}</Email>
          <RoleBadge role={user?.role || ''}>
            <RoleText>{getRoleText(user?.role || '')}</RoleText>
          </RoleBadge>

          {user?.role === 'doctor' && (
            <SpecialtyText>Especialidade: {user?.specialty}</SpecialtyText>
          )}
        </ProfileCard>

        <Button
          titleStyle={{ fontFamily: 'Arimo' }}
          title="Editar Perfil"
          onPress={() => navigation.navigate('EditProfile' as any)}
          containerStyle={styles.button as ViewStyle} 
          buttonStyle={styles.editButton}
        />

        <Button
          titleStyle={{ fontFamily: 'Arimo' }}
          title="Voltar"
          onPress={() => navigation.goBack()}
          containerStyle={styles.button as ViewStyle}
          buttonStyle={styles.buttonStyle}
        />

        <Button
          titleStyle={{ fontFamily: 'Arimo' }}
          title="Sair"
          onPress={signOut}
          containerStyle={styles.button as ViewStyle}
          buttonStyle={styles.logoutButton}
        />
      </ScrollView>
    </Container>
  );
};

export default ProfileScreen;
