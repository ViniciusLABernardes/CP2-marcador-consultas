import React from 'react';
import { View, ScrollView, RefreshControl, ViewStyle } from 'react-native';
import { Button } from 'react-native-elements';
import { useDoctorDashboard } from './hooks/useDoctorDashboard';
import { AppointmentItem } from './components/AppointmentItem';
import theme from '../../styles/theme';
import {
  Container,
  HeaderContainer,
  HeaderTitle,
  Title,
  SectionTitle,
  StatisticsGrid,
  EmptyText,
  styles,
} from './styles';
import StatisticsCard from '../../components/StatisticsCard';
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
  const statistics = {
    totalAppointments: appointments.length,
    confirmedAppointments: appointments.filter(a => a.status === 'confirmed').length,
    pendingAppointments: appointments.filter(a => a.status === 'pending').length,
    totalPatients: new Set(appointments.map(a => a.patientId)).size,
    statusPercentages: {
      confirmed: appointments.length
        ? (appointments.filter(a => a.status === 'confirmed').length / appointments.length) * 100
        : 0,
      pending: appointments.length
        ? (appointments.filter(a => a.status === 'pending').length / appointments.length) * 100
        : 0,
    },
  };

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

 
        {appointments.length > 0 && (
          <>
            <SectionTitle>Minhas Estatísticas</SectionTitle>
            <StatisticsGrid>
              <StatisticsCard
                title="Consultas Totais"
                value={statistics.totalAppointments}
                color={theme.colors.primary}
                subtitle="Todas as minhas consultas"
              />
              <StatisticsCard
                title="Confirmadas"
                value={statistics.confirmedAppointments}
                color={theme.colors.success}
                subtitle={`${statistics.statusPercentages.confirmed.toFixed(1)}% do total`}
              />
              <StatisticsCard
                title="Pendentes"
                value={statistics.pendingAppointments}
                color={theme.colors.warning}
                subtitle={`${statistics.statusPercentages.pending.toFixed(1)}% do total`}
              />
              <StatisticsCard
                title="Pacientes Atendidos"
                value={statistics.totalPatients}
                color={theme.colors.secondary}
                subtitle="Pacientes únicos"
              />
            </StatisticsGrid>
          </>
        )}

        {appointments.length > 0 ? (
          appointments.map((appointment: Appointment) => (
            <AppointmentItem
              key={appointment.id}
              appointment={appointment}
              onEdit={handleEditAppointment}
              onDelete={handleDeleteAppointment}
            />
          ))
        ) : (
          <EmptyText>Nenhuma consulta agendada</EmptyText>
        )}
      </ScrollView>
    </Container>
  );
};

export default DoctorDashboardScreen;

