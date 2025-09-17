import styled from 'styled-components/native';
import { StyleSheet } from 'react-native';
import theme from '../../styles/theme';

export const styles = StyleSheet.create({
  scrollContent: {
    padding: 20,
  },
  button: {
    marginBottom: 15,
    width: '100%',
    borderRadius: 20,
  },
  buttonStyle: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 12,
  },
  backupButton: {
    backgroundColor: theme.colors.success,
    paddingVertical: 12,
  },
  cacheButton: {
    backgroundColor: theme.colors.warning,
    paddingVertical: 12,
  },
  dangerButton: {
    backgroundColor: theme.colors.error,
    paddingVertical: 12,
  },
});

export const Container = styled.View`
  flex: 1;
  background-color: ${theme.colors.background};
`;

export const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const LoadingText = styled.Text`
  font-size: 16px;
  color: ${theme.colors.text};
  font-family: Arimo;
`;

export const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: ${theme.colors.text};
  margin-bottom: 20px;
  text-align: center;
  font-family: Arimo;
`;

export const SectionTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: ${theme.colors.text};
  margin-bottom: 10px;
  margin-top: 20px;
  font-family: Arimo;
`;

export const SettingsCard = styled.View`
  background-color: ${theme.colors.white};
  border-radius: 8px;
  margin-bottom: 15px;
  border-width: 1px;
  border-color: ${theme.colors.border};
`;

export const InfoItem = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-bottom-width: 1px;
  border-bottom-color: ${theme.colors.border};
`;

export const InfoLabel = styled.Text`
  font-size: 16px;
  color: ${theme.colors.text};
  font-family: Arimo;
`;

export const InfoValue = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${theme.colors.primary};
  font-family: Arimo;
`;
