import React from 'react';
import { View, ScrollView, RefreshControl, ViewStyle } from 'react-native';
import { Button } from 'react-native-elements';
import { useDoctorDashboard } from './hooks/useDoctorDashboard';
import { AppointmentItem } from './components/AppointmentItem';

import {
  Container,
  HeaderContainer,
  HeaderTitle,
  Content,
  Title,
  AppointmentList,
  EmptyText,
  styles,
} from './styles';

import Header from '../../components/Header'; 
import { Appointment } from '../../types/appointments';

const DoctorDashboardScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const {
    appointments,
    refreshing,
    onRefresh,
    handleDeleteAppointment,
    handleEditAppointment,
  } = useDoctorDashboard();

  const renderAppointment = ({ item }: { item: Appointment }) => (
    <AppointmentItem
      appointment={item}
      onEdit={handleEditAppointment}
      onDelete={handleDeleteAppointment}
    />
  );

  return (
    <Container>
      <Header />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <Title>Minhas Consultas</Title>

        <Button
          title="Meu Perfil"
          onPress={() => navigation.navigate('Profile')}
          containerStyle={styles.button as ViewStyle}
          buttonStyle={styles.buttonStyle}
        />
        <Button
          title="Configurações"
          onPress={() => navigation.navigate('Settings')}
          containerStyle={styles.button as ViewStyle}
          buttonStyle={styles.settingsButton}
        />

 
        <Content>
        <AppointmentList
          data={appointments}
          keyExtractor={(item: Appointment) => item.id}
          renderItem={renderAppointment}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListEmptyComponent={
            <EmptyText>Nenhuma consulta agendada</EmptyText>
          }
        />
        </Content>
        </ScrollView>
  
    </Container>
  );
};

export default DoctorDashboardScreen;

