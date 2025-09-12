import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import theme from '../../styles/theme';
import { TouchableOpacity } from 'react-native';


export const Container = styled.View`
  flex: 1;
  background-color: ${theme.colors.background};
`;

export const Content = styled.View`
  flex: 1;
  padding: ${theme.spacing.medium}px;
`;

export const HeaderContainer = styled.View`
  background-color: ${theme.colors.primary};
  padding: 16px;
  align-items: center;
  justify-content: center;
`;

export const HeaderTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: ${theme.colors.white};
`;
export const AppointmentList = styled(FlatList)`
  flex: 1;
`;

export const AppointmentCard = styled.View`
  background-color: ${theme.colors.white};
  border-radius: 8px;
  padding: ${theme.spacing.medium}px;
  margin-bottom: ${theme.spacing.medium}px;
  flex-direction: row;
  align-items: center;
  elevation: 2;
  shadow-color: #000;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  shadow-offset: 0px 2px;
`;

export const DoctorImage = styled.Image`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  margin-right: ${theme.spacing.medium}px;
`;

export const InfoContainer = styled.View`
  flex: 1;
`;

export const DoctorName = styled.Text`
  font-size: ${theme.typography.subtitle.fontSize}px;
  font-weight: ${theme.typography.subtitle.fontWeight};
  color: ${theme.colors.text};
`;

export const DoctorSpecialty = styled.Text`
  font-size: ${theme.typography.body.fontSize}px;
  color: ${theme.colors.text};
  opacity: 0.8;
  margin-bottom: 4px;
`;

export const DateTime = styled.Text`
  font-size: ${theme.typography.body.fontSize}px;
  color: ${theme.colors.primary};
  margin-top: 4px;
`;

export const Description = styled.Text`
  font-size: ${theme.typography.body.fontSize}px;
  color: ${theme.colors.text};
  opacity: 0.8;
  margin-top: 4px;
`;

export const Status = styled.Text<{ status: string }>`
  font-size: ${theme.typography.body.fontSize}px;
  color: ${(props: { status: string }) => props.status === 'pending' ? theme.colors.error : theme.colors.success};
  margin-top: 4px;
  font-weight: bold;
`;

export const ActionButtons = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  margin-top: ${theme.spacing.small}px;
`;

export const ActionButton = styled(TouchableOpacity)`
  padding: ${theme.spacing.small}px;
  margin-left: ${theme.spacing.small}px;
`;

export const EmptyText = styled.Text`
  text-align: center;
  color: ${theme.colors.text};
  opacity: 0.6;
  margin-top: ${theme.spacing.large}px;
`;

export const PatientImage = styled.Image`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  margin-right: ${theme.spacing.medium}px;
`;


export const PatientName = styled.Text`
  font-size: ${theme.typography.subtitle.fontSize}px;
  font-weight: ${theme.typography.subtitle.fontWeight};
  color: ${theme.colors.text};
`;
export const SectionTitle = styled.Text`
 fontFamily: Arimo;
  font-size: 20px;
  font-weight: bold;
  color: ${theme.colors.text};
  margin-bottom: 15px;
  margin-top: 10px;
`;
export const Title = styled.Text`
  fontFamily: Arimo;
  font-size: 24px;
  font-weight: bold;
  color: ${theme.colors.text};
  margin-bottom: 20px;
  text-align: center;
`;
export const StatisticsGrid = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  fontFamily: Arimo;
  justify-content: space-between;
  margin-bottom: 20px;
`;

export const styles = {
  scrollContent: {
    padding: 20,
  },
  button: {
    marginBottom: 20,
    width: '100%',
    borderRadius: 20
  },
  buttonStyle: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 12,
    
  },
  logoutButton: {
    backgroundColor: theme.colors.error,
    paddingVertical: 12,
  },
  actionButton: {
    marginTop: 8,
    width: '48%',
  },
  confirmButton: {
    backgroundColor: theme.colors.success,
    paddingVertical: 8,
  },
  cancelButton: {
    backgroundColor: theme.colors.error,
    paddingVertical: 8,
  },
  dateTime: {
    fontSize: 16,
    fontWeight: '700',
    color: theme.colors.text,
  },
  patientName: {
    fontSize: 16,
    fontWeight: '700',
    color: theme.colors.text,
  },
  specialty: {
    fontSize: 14,
    fontWeight: '500',
    color: theme.colors.text,
  },
  settingsButton: {
    backgroundColor: theme.colors.secondary,
    paddingVertical: 12,
  },
};
