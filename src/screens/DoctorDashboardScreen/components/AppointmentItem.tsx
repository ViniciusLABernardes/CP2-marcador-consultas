import React from 'react';
import { Icon } from 'react-native-elements';
import { Appointment } from '../../../types/appointments';
import { getPatientInfo } from '../models/patients';
import theme from '../../../styles/theme';
import {
  AppointmentCard,
  PatientImage,
  InfoContainer,
  PatientName,
  DateTime,
  Description,
  Status,
  ActionButtons,
  ActionButton,
} from '../styles';

interface AppointmentItemProps {
  appointment: Appointment;
  onEdit?: (appointment: Appointment) => void;
  onDelete?: (appointmentId: string) => void;
}

export const AppointmentItem: React.FC<AppointmentItemProps> = ({
  appointment,
  onEdit,
  onDelete,
}) => {
  const patient = getPatientInfo(appointment.patientId);

  const handleEdit = () => {
    if (onEdit) {
      onEdit(appointment);
    }
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete(appointment.id);
    }
  };

  return (
    <AppointmentCard>
      <PatientImage source={{ uri: patient?.image || 'https://via.placeholder.com/100' }} />
      <InfoContainer>
        <PatientName>{appointment.patientName || patient?.name || 'Paciente não encontrado'}</PatientName>
        <DateTime>{new Date(appointment.date).toLocaleDateString()} - {appointment.time}</DateTime>
        <Description>{appointment.time}</Description>
        <Status status={appointment.status}>
        
        </Status>
        <ActionButtons>
          <ActionButton onPress={handleEdit}>
            <Icon name="edit" type="material" size={20} color={theme.colors.primary} />
          </ActionButton>
          <ActionButton onPress={handleDelete}>
            <Icon name="delete" type="material" size={20} color={theme.colors.error} />
          </ActionButton>
        </ActionButtons>
      </InfoContainer>
    </AppointmentCard>
  );
};