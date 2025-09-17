import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';
import { Doctor } from '../models/Doctor';
import theme from '../../../styles/theme';

type Props = {
  doctors: Doctor[];
  onSelectDoctor: (doctor: Doctor) => void;
  selectedDoctorId?: string;
};

const DoctorList: React.FC<Props> = ({ doctors, onSelectDoctor, selectedDoctorId }) => {
  return (
    <DoctorGrid>
      {doctors.map((doctor) => {
        const isSelected = selectedDoctorId === doctor.id;
        return (
          <DoctorCard
            key={doctor.id}
            onPress={() => onSelectDoctor(doctor)}
            style={{
              borderColor: isSelected ? theme.colors.primary : '#ccc',
              borderWidth: 2,
            }}
          >
            <DoctorImage source={{ uri: doctor.image }} />
            <DoctorName>{doctor.name}</DoctorName>
            <DoctorSpecialty>{doctor.specialty}</DoctorSpecialty>
          </DoctorCard>
        );
      })}
    </DoctorGrid>
  );
};

export default DoctorList;

const DoctorGrid = styled(View)`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const DoctorCard = styled.TouchableOpacity`
  width: 48%; 
  padding: 10px;
  margin-bottom: 15px;
  border-radius: 10px;
  align-items: center;
  background-color: ${theme.colors.background};
`;

const DoctorImage = styled.Image`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  margin-bottom: 8px;
`;

const DoctorName = styled.Text`
  font-size: 14px;
  font-family: Arimo;
  font-weight: bold;
  color: ${theme.colors.text};
  text-align: center;
`;

const DoctorSpecialty = styled.Text`
  font-size: 12px;
  font-family: Arimo;
  color: ${theme.colors.secondary};
  text-align: center;
`;
