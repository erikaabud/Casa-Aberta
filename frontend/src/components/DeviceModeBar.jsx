import React from 'react';
import styled from 'styled-components';
import { Smartphone, Monitor, Sparkles, RefreshCw, Zap } from 'lucide-react';

const ControlBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  background: #1a1a1a;
  border-bottom: 2px solid #2a2212;
  position: sticky;
  top: 0;
  z-index: 90;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.9);
  flex-wrap: wrap;
  gap: 10px;
`;

const ModeGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ModeBtn = styled.button`
  background: ${props => props.$active ? '#4a3c1e' : '#2a2212'};
  color: ${props => props.$active ? '#ffd700' : '#d4af37'};
  border: 1px solid ${props => props.$active ? '#d4af37' : '#4a3c1e'};
  border-radius: 6px;
  padding: 6px 12px;
  font-family: 'Cinzel', serif;
  font-size: 11px;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.2s ease;
  box-shadow: ${props => props.$active ? '0 0 10px rgba(212, 175, 55, 0.3)' : 'none'};

  &:hover {
    filter: brightness(1.15);
    border-color: #ffd700;
  }
`;

const TitleTag = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: 'Cinzel', serif;
  font-size: 13px;
  font-weight: 800;
  color: #fbe396;
  letter-spacing: 0.08em;

  @media (max-width: 640px) {
    display: none;
  }
`;

const QuickActionBtn = styled.button`
  background: rgba(212, 175, 55, 0.15);
  border: 1px solid rgba(212, 175, 55, 0.4);
  color: #fbe396;
  border-radius: 6px;
  padding: 6px 10px;
  font-size: 11px;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;

  &:hover {
    background: rgba(212, 175, 55, 0.3);
  }
`;


export const DeviceModeBar = ({ 
  deviceMode, 
  onSetDeviceMode, 
  onGainExp, 
  onResetData 
}) => {
  return (
    <ControlBar>
      <TitleTag>
        <Sparkles size={16} color="#d4af37" />
        PAINEL DE PERSONAGEM RPG MEDIEVAL
      </TitleTag>

      <ModeGroup>
        <ModeBtn $active={deviceMode === 'auto'} onClick={() => onSetDeviceMode('auto')}>
          <Zap size={14} /> Auto-Responsivo
        </ModeBtn>

        <ModeBtn $active={deviceMode === 'mobile'} onClick={() => onSetDeviceMode('mobile')}>
          <Smartphone size={14} /> Moldura Mobile
        </ModeBtn>

        <ModeBtn $active={deviceMode === 'desktop'} onClick={() => onSetDeviceMode('desktop')}>
          <Monitor size={14} /> Modo Desktop
        </ModeBtn>
      </ModeGroup>

      <ModeGroup>
        <QuickActionBtn onClick={onGainExp} title="Ganhar EXP para o Personagem">
          <Sparkles size={12} /> +EXP
        </QuickActionBtn>
        <QuickActionBtn onClick={onResetData} title="Resetar dados do personagem">
          <RefreshCw size={12} /> Resetar
        </QuickActionBtn>
      </ModeGroup>
    </ControlBar>
  );
};