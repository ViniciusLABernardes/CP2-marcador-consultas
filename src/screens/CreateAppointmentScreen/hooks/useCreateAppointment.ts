import { useState } from 'react';
import { Doctor } from '../models/Doctor';
import { appointmentService } from '../services/appointmentService';

export const useCreateAppointment = (user: any, navigation: any) => {
  const [date, setDate] = useState('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCreateAppointment = async () => {
    try {
      setLoading(true);
      setError('');

      if (!date || !selectedTime || !selectedDoctor) {
        setError('Por favor, preencha a data e selecione um médico e horário');
        return;
      }

      await appointmentService.createAppointment({
        date,
        time: selectedTime,
        doctor: selectedDoctor,
        user,
      });

      alert('Consulta agendada com sucesso!');
      navigation.goBack();
    } catch (err) {
      setError('Erro ao agendar consulta. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return {
    date,
    setDate,
    selectedTime,
    setSelectedTime,
    selectedDoctor,
    setSelectedDoctor,
    loading,
    error,
    handleCreateAppointment,
  };
};
