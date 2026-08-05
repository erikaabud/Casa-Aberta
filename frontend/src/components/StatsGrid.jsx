import React from 'react';
import styled from 'styled-components';
import { Heart, Plus, Minus } from 'lucide-react';

const GridContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 18px;
  margin-top: 24px;
  margin-bottom: 18px;
`;

const StatCard = styled.div`
  background: linear-gradient(135deg, rgba(16, 24, 40, 0.9) 0%, rgba(9, 14, 24, 0.95) 100%);
  border: 1px solid rgba(212, 175, 55, 0.25);
  border-radius: 10px;
  padding: 12px 14px;
  display: flex;
  align-items: center;
  gap: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    border-color: rgba(212, 175, 55, 0.5);
    transform: translateY(-1px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.7);
  }
`;

// 1. Removido o <{ $color: string; $bgGlow?: string }>
const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background: ${props => props.$bgGlow || 'rgba(15, 23, 42, 0.8)'};
  color: ${props => props.$color};
  filter: drop-shadow(0 0 6px ${props => props.$color});
  flex-shrink: 0;
`;

const StatTextGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex: 1;
`;

// 2. Removido o <{ $color?: string }>
const StatLabel = styled.span`
  font-family: 'Cinzel', serif;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: ${props => props.$color || '#a0aec0'};
  text-transform: uppercase;
`;

const StatValue = styled.span`
  font-size: 15px;
  font-weight: 800;
  color: #f7fafc;
  letter-spacing: 0.02em;
  font-family: 'Plus Jakarta Sans', sans-serif;
`;

const StatControls = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  opacity: 0.4;
  transition: opacity 0.2s ease;

  ${StatCard}:hover & {
    opacity: 1;
  }
`;

const ControlBtn = styled.button`
  background: rgba(15, 23, 42, 0.8);
  border: 1px solid rgba(212, 175, 55, 0.3);
  color: #fbe396;
  width: 18px;
  height: 18px;
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 0;

  &:hover {
    background: rgba(212, 175, 55, 0.3);
    border-color: #fbe396;
  }
`;

// 3. Interface removida
// 4. Import { CharacterStats } removido

// 5. React.FC removido
export const StatsGrid = ({ stats, onUpdateStat }) => {
  return (
    <GridContainer>
      {/* VIDA */}
      <StatCard>
        <IconWrapper $color="#e53e3e" $bgGlow="rgba(229, 62, 62, 0.15)">
          <Heart size={22} fill="#e53e3e" />
        </IconWrapper>
        <StatTextGroup>
          <StatLabel $color="#fc8181">VIDA</StatLabel>
          <StatValue>{stats.hpCurrent.toLocaleString('pt-BR')} / {stats.hpMax.toLocaleString('pt-BR')}</StatValue>
        </StatTextGroup>
        {onUpdateStat && (
          <StatControls>
            <ControlBtn onClick={() => onUpdateStat('hpMax', 50)} title="Aumentar Vida Máxima"><Plus size={10} /></ControlBtn>
            <ControlBtn onClick={() => onUpdateStat('hpMax', -50)} title="Diminuir Vida Máxima"><Minus size={10} /></ControlBtn>
          </StatControls>
        )}
      </StatCard>
    </GridContainer>
  );
};