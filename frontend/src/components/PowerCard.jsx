import React from 'react';
import styled from 'styled-components';
import { WingedSwordEmblem } from './MedievalEmblems';

const CardFrame = styled.div`
  background: linear-gradient(135deg, rgba(16, 24, 40, 0.95) 0%, rgba(9, 14, 24, 0.98) 100%);
  border: 1px solid #c89d2c;
  border-radius: 12px;
  padding: 16px 20px;
  margin: 16px 18px 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 
    0 4px 20px rgba(0, 0, 0, 0.6),
    inset 0 0 15px rgba(212, 175, 55, 0.08);
  position: relative;
  overflow: hidden;

  /* Corner accents */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 12px;
    height: 12px;
    border-top: 2px solid #fbe396;
    border-left: 2px solid #fbe396;
    border-top-left-radius: 10px;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    right: 0;
    width: 12px;
    height: 12px;
    border-bottom: 2px solid #fbe396;
    border-right: 2px solid #fbe396;
    border-bottom-right-radius: 10px;
  }
`;

const EmblemWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  filter: drop-shadow(0 0 10px rgba(212, 175, 55, 0.3));
`;

const PowerInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  text-align: right;
`;

const PowerLabel = styled.span`
  font-family: 'Cinzel', serif;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.15em;
  color: #c89d2c;
  text-transform: uppercase;
  margin-bottom: 2px;
`;

const PowerValue = styled.span`
  font-family: 'Cinzel', serif;
  font-size: 38px;
  font-weight: 900;
  letter-spacing: 0.02em;
  background: linear-gradient(180deg, #ffffff 0%, #fbe396 35%, #d4af37 70%, #997312 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 2px 8px rgba(0,0,0,0.8));
  line-height: 1;
`;

// 1. Interface removida

// 2. React.FC removido e props desestruturadas
export const PowerCard = ({ totalPower }) => {
  return (
    <CardFrame>
      <EmblemWrapper>
        <WingedSwordEmblem size={82} />
      </EmblemWrapper>

      <PowerInfo>
        <PowerLabel>PODER TOTAL</PowerLabel>
        <PowerValue>{totalPower.toLocaleString('pt-BR')}</PowerValue>
      </PowerInfo>
    </CardFrame>
  );
};