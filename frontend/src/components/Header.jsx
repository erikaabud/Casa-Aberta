import React, { useState } from 'react';
import styled from 'styled-components';
import { Edit3, Shield } from 'lucide-react';
import { PaladinShieldIcon } from './MedievalEmblems';

const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 22px;
  background: linear-gradient(to bottom, #2a2212, #1a1a1a);
  border-bottom: 2px solid #4a3c1e;
  box-shadow: 0 4px 15px rgba(0,0,0,0.5);
  width: 100%;
  position: relative;
  z-index: 10;
  gap: 24px;
`;

const PlayerInfoGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
  min-width: 0;
`;

const NameRow = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const PlayerName = styled.h1`
  font-family: 'Cinzel', serif;
  font-size: 15px;
  font-weight: 800;
  letter-spacing: 0.1em;
  color: #d4af37;
  text-transform: uppercase;
  margin: 0;
  cursor: pointer;
  transition: color 0.2s ease;

  &:hover {
    color: #fbe396;
    text-shadow: 0 0 8px rgba(212, 175, 55, 0.5);
  }
`;

const NameInput = styled.input`
  background: #0d1527;
  border: 1px solid #d4af37;
  color: #fbe396;
  font-family: 'Cinzel', serif;
  font-size: 14px;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 4px;
  outline: none;
  width: 160px;
`;

const ClassBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: rgba(15, 23, 42, 0.7);
  border: 1px solid rgba(212, 175, 55, 0.25);
  border-radius: 6px;
  padding: 3px 8px;
  width: fit-content;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: #d4af37;
    background: rgba(212, 175, 55, 0.1);
  }
`;

const ClassText = styled.span`
  font-size: 13px;
  font-weight: 600;
  color: #f7fafc;
`;

const ClassSelectorModal = styled.div`
  position: absolute;
  top: 55px;
  left: 18px;
  background: #0b1220;
  border: 1px solid #d4af37;
  border-radius: 8px;
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.8);
  z-index: 50;
`;


const ClassOption = styled.button`
  background: ${props => props.$active ? 'rgba(212, 175, 55, 0.2)' : 'transparent'};
  color: ${props => props.$active ? '#fbe396' : '#a0aec0'};
  border: ${props => props.$active ? '1px solid #d4af37' : '1px solid transparent'};
  border-radius: 4px;
  padding: 6px 12px;
  font-size: 12px;
  font-weight: 600;
  text-align: left;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background: rgba(212, 175, 55, 0.15);
    color: #fff;
  }
`;


const CLASSES = ['Paladino', 'Mago', 'Guerreiro', 'Ladino', 'Necromante'];


export const Header = ({ 
  name, 
  className, 
  onUpdateName, 
  onUpdateClass 
}) => {
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState(name);
  const [showClassDropdown, setShowClassDropdown] = useState(false);

  const handleNameSubmit = () => {
    if (tempName.trim()) {
      onUpdateName(tempName.trim());
    }
    setIsEditingName(false);
  };

  return (
    <HeaderContainer>
      <PlayerInfoGroup>
        <NameRow>
          {isEditingName ? (
            <NameInput
              autoFocus
              value={tempName}
              onChange={(e) => setTempName(e.target.value)}
              onBlur={handleNameSubmit}
              onKeyDown={(e) => e.key === 'Enter' && handleNameSubmit()}
            />
          ) : (
            <PlayerName onClick={() => setIsEditingName(true)} title="Clique para editar nome">
              {name}
            </PlayerName>
          )}
          <Edit3
            size={12}
            color="#a0aec0"
            style={{ cursor: 'pointer', opacity: 0.7 }}
            onClick={() => setIsEditingName(!isEditingName)}
          />
        </NameRow>

        <ClassBadge onClick={() => setShowClassDropdown(!showClassDropdown)}>
          <PaladinShieldIcon size={16} />
          <ClassText>{className}</ClassText>
        </ClassBadge>

        {showClassDropdown && (
          <ClassSelectorModal>
            {CLASSES.map((cls) => (
              <ClassOption
                key={cls}
                $active={cls === className}
                onClick={() => {
                  onUpdateClass(cls);
                  setShowClassDropdown(false);
                }}
              >
                <Shield size={12} color={cls === className ? '#d4af37' : '#a0aec0'} />
                {cls}
              </ClassOption>
            ))}
          </ClassSelectorModal>
        )}
      </PlayerInfoGroup>
    </HeaderContainer>
  );
};