import React from 'react';
import styled from 'styled-components';
import { LevelBadgeRing } from './MedievalEmblems';
import { Sparkles } from 'lucide-react';

const BannerContainer = styled.div`
  position: relative;
  width: 100%;
  padding: 18px 20px;
  background-image: linear-gradient(
      180deg,
      rgba(10, 10, 10, 0.5) 0%,
      rgba(10, 10, 10, 0.95) 100%
    ),
    url('/src/assets/images/medieval_castle_banner_1785862750245.jpg');
  background-size: cover;
  background-position: center;
  border-bottom: 2px solid #4a3c1e;
  display: flex;
  align-items: center;
  gap: 16px;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at 80% 20%, rgba(212, 175, 55, 0.15) 0%, transparent 60%);
    pointer-events: none;
  }
`;

const ExpContent = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 6px;
  z-index: 2;
`;

const ExpHeaderRow = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
`;

const ExpLabel = styled.span`
  font-family: 'Cinzel', serif;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: #a08a5a;
  text-transform: uppercase;
`;

const ExpValues = styled.span`
  font-size: 14px;
  font-weight: 700;
  color: #ffd700;
  letter-spacing: 0.02em;
`;

const ProgressTrack = styled.div`
  width: 100%;
  height: 10px;
  background: #1a1a1a;
  border: 1px solid #4a3c1e;
  border-radius: 5px;
  overflow: hidden;
  position: relative;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.9);
`;

// 1. Removido o <{ $percent: number }> do TypeScript
const ProgressBar = styled.div`
  height: 100%;
  width: ${props => props.$percent}%;
  background: linear-gradient(90deg, #d4af37 0%, #fbe396 70%, #fff2c6 100%);
  border-radius: 4px;
  transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 0 10px rgba(212, 175, 55, 0.8);
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: 6px;
    background: #ffffff;
    border-radius: 2px;
    box-shadow: 0 0 6px #ffffff;
  }
`;

const GainExpButton = styled.button`
  align-self: flex-end;
  background: rgba(212, 175, 55, 0.15);
  border: 1px solid rgba(212, 175, 55, 0.4);
  border-radius: 4px;
  color: #fbe396;
  font-size: 10px;
  font-weight: 700;
  padding: 3px 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
  margin-top: 2px;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(212, 175, 55, 0.3);
    border-color: #fbe396;
    transform: scale(1.02);
  }
`;

// 2. Interface removida

// 3. Removido React.FC<...> e ajustada a desestruturação
export const LevelBanner = ({ level, expCurrent, expMax, onGainExp }) => {
  const percent = Math.min(100, Math.round((expCurrent / expMax) * 100));

  return (
    <BannerContainer>
      <LevelBadgeRing level={level} />

      <ExpContent>
        <ExpHeaderRow>
          <ExpLabel>EXP</ExpLabel>
          <ExpValues>
            {expCurrent.toLocaleString('pt-BR')} / {expMax.toLocaleString('pt-BR')}
          </ExpValues>
        </ExpHeaderRow>

        <ProgressTrack>
          <ProgressBar $percent={percent} />
        </ProgressTrack>

        <GainExpButton onClick={onGainExp}>
          <Sparkles size={11} /> +5.000 EXP
        </GainExpButton>
      </ExpContent>
    </BannerContainer>
  );
};