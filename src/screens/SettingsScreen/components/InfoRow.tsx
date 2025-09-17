import React from 'react';
import { InfoItem, InfoLabel, InfoValue } from '../styles';

type Props = {
  label: string;
  value: string | number;
};

const InfoRow: React.FC<Props> = ({ label, value }) => (
  <InfoItem>
    <InfoLabel>{label}</InfoLabel>
    <InfoValue>{value}</InfoValue>
  </InfoItem>
);

export default InfoRow;
