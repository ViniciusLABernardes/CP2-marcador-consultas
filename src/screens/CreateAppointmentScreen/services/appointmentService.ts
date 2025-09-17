import AsyncStorage from '@react-native-async-storage/async-storage';
import { Appointment } from '../models/Appointment';
import { Doctor } from '../models/Doctor';
import { notificationService } from '../../../services/notifications';

type CreateAppointmentParams = {
  date: string;
  time: string;
  doctor: Doctor;
  user: any;
};

export const appointmentService = {
  async createAppointment({ date, time, doctor, user }: CreateAppointmentParams) {
    const storedAppointments = await AsyncStorage.getItem('@MedicalApp:appointments');
    const appointments: Appointment[] = storedAppointments ? JSON.parse(storedAppointments) : [];

    const newAppointment: Appointment = {
      id: Date.now().toString(),
      patientId: user?.id || '',
      patientName: user?.name || '',
      doctorId: doctor.id,
      doctorName: doctor.name,
      date,
      time,
      specialty: doctor.specialty,
      status: 'pending',
    };

    appointments.push(newAppointment);

    await AsyncStorage.setItem('@MedicalApp:appointments', JSON.stringify(appointments));
    await notificationService.notifyNewAppointment(doctor.id, newAppointment);

    return newAppointment;
  },
};
