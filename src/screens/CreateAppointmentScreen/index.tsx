import React, { useState } from 'react';
import { ScrollView, ViewStyle } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/navigation';
import theme from '../../styles/theme';
import Header from '../../components/Header';

import DoctorList from './components/DoctorList';
import TimeSlotList from './components/TimeSlotList';

import { Container, Title, SectionTitle, ErrorText, styles } from './styles';
import { useCreateAppointment } from './hooks/useCreateAppointment';
import { Doctor } from './models/Doctor';

type CreateAppointmentScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'CreateAppointment'>;
};

const availableDoctors: Doctor[] = [
  {
    id: '1',
    name: 'Dr. João Silva',
    specialty: 'Cardiologia',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-F4lN1ZpSX7ghTc0u4U2ZQNjPCzKbe2d65Q&s',
  },
  {
    id: '2',
    name: 'Dra. Maria Santos',
    specialty: 'Pediatria',
    image: 'https://randomuser.me/api/portraits/women/1.jpg',
  },
  {
    id: '3',
    name: 'Dr. Pedro Oliveira',
    specialty: 'Ortopedia',
    image: 'https://randomuser.me/api/portraits/men/2.jpg',
  },
  {
    id: '4',
    name: 'Dra. Ana Costa',
    specialty: 'Dermatologia',
    image: 'https://randomuser.me/api/portraits/women/2.jpg',
  },
  {
    id: '5',
    name: 'Dr. Carlos Mendes',
    specialty: 'Oftalmologia',
    image: 'https://randomuser.me/api/portraits/men/3.jpg',
  },
];

const CreateAppointmentScreen: React.FC = () => {
  const { user } = useAuth();
  const navigation = useNavigation<CreateAppointmentScreenProps['navigation']>();

  const {
    date,
    setDate,
    selectedTime,
    setSelectedTime,
    selectedDoctor,
    setSelectedDoctor,
    error,
    loading,
    handleCreateAppointment,
  } = useCreateAppointment(user, navigation);

  return (
    <Container>
      <Header />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Title>Agendar Consulta</Title>

        <Input
          placeholder="Data (DD/MM/AAAA)"
          value={date}
          onChangeText={setDate}
          containerStyle={styles.input}
          keyboardType="numeric"
        />

        <SectionTitle>Selecione um Horário</SectionTitle>
        <TimeSlotList
          onSelectTime={setSelectedTime}
          selectedTime={selectedTime}
        />

        <SectionTitle>Selecione um Médico</SectionTitle>
        <DoctorList
          doctors={availableDoctors}
          onSelectDoctor={setSelectedDoctor}
          selectedDoctorId={selectedDoctor?.id}
        />

        {error ? <ErrorText>{error}</ErrorText> : null}

        <Button
          titleStyle={{ fontFamily: 'Arimo' }}
          title="Agendar"
          onPress={handleCreateAppointment}
          loading={loading}
          containerStyle={styles.button as ViewStyle}
          buttonStyle={styles.buttonStyle}
        />

        <Button
          titleStyle={{ fontFamily: 'Arimo' }}
          title="Cancelar"
          onPress={() => navigation.goBack()}
          containerStyle={styles.button as ViewStyle}
          buttonStyle={styles.cancelButton}
        />
      </ScrollView>
    </Container>
  );
};

export default CreateAppointmentScreen;
