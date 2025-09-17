import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';
import theme from '../../../styles/theme';

type Props = {
  selectedTime: string;
  onSelectTime: (time: string) => void;
};

const timeSlots = [
  '08:00','08:30',
  '09:00','09:30',
  '10:00','10:30',
  '11:00','11:30',
  '12:00','12:30',
  '13:00','13:30',
  '14:00','14:30',
  '15:00','15:30',
  '16:00','16:30',
  '17:00',
];

const TimeSlotList: React.FC<Props> = ({ selectedTime, onSelectTime }) => {
  return (
    <TimeSlotGrid>
      {timeSlots.map((slot) => {
        const isSelected = selectedTime === slot;
        return (
          <TimeSlot
            key={slot}
            onPress={() => onSelectTime(slot)}
            style={{
              backgroundColor: isSelected ? theme.colors.primary : theme.colors.background,
            }}
          >
            <TimeText style={{ color: isSelected ? '#fff' : theme.colors.text }}>
              {slot}
            </TimeText>
          </TimeSlot>
        );
      })}
    </TimeSlotGrid>
  );
};

export default TimeSlotList;

const TimeSlotGrid = styled(View)`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
`;

const TimeSlot = styled.TouchableOpacity`
  padding: 10px 15px;
  border-radius: 20px;
  margin: 5px;
  border: 1px solid ${theme.colors.border};
`;

const TimeText = styled.Text`
  font-size: 14px;
  font-family: Arimo;
  font-weight: bold;
`;
