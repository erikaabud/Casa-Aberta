import React, { useState } from 'react';
import styled from 'styled-components';
import { ChevronRight, CheckCircle, MapPin, Award, Scroll } from 'lucide-react';
import { QuestDiamondIcon } from './MedievalEmblems';

const QuestsContainer = styled.div`
  padding: 0 18px;
  margin-bottom: 24px;
`;

const SectionHeader = styled.h2`
  font-family: 'Cinzel', serif;
  font-size: 14px;
  font-weight: 800;
  letter-spacing: 0.12em;
  color: #d4af37;
  text-transform: uppercase;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

// 1. Removido o <{ $selected?: boolean }> do TypeScript
const QuestCard = styled.div`
  background: linear-gradient(135deg, rgba(16, 24, 40, 0.95) 0%, rgba(9, 14, 24, 0.98) 100%);
  border: 1px solid ${props => props.$selected ? '#d4af37' : 'rgba(212, 175, 55, 0.3)'};
  border-radius: 12px;
  padding: 14px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.6);
  margin-bottom: 10px;

  &:hover {
    border-color: #fbe396;
    background: linear-gradient(135deg, rgba(21, 32, 54, 0.95) 0%, rgba(12, 18, 32, 0.98) 100%);
    transform: translateY(-2px);
    box-shadow: 0 6px 18px rgba(212, 175, 55, 0.15);
  }
`;

const QuestLeftGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  flex: 1;
`;

const QuestTextGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
`;

const QuestTitle = styled.h3`
  font-family: 'Cinzel', serif;
  font-size: 15px;
  font-weight: 700;
  color: #f7fafc;
  margin: 0;
  letter-spacing: 0.02em;
`;

const QuestSubtitle = styled.p`
  font-size: 13px;
  color: #a0aec0;
  margin: 0;
  line-height: 1.3;
`;

const ChevronIconWrapper = styled.div`
  color: #d4af37;
  display: flex;
  align-items: center;
  justify-content: center;
`;

/* Quest Modal */
const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(3, 7, 18, 0.85);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  z-index: 100;
`;

const ModalBox = styled.div`
  background: #0b1220;
  border: 1px solid #d4af37;
  border-radius: 14px;
  padding: 24px;
  max-width: 440px;
  width: 100%;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.9), 0 0 20px rgba(212, 175, 55, 0.2);
  display: flex;
  flex-direction: column;
  gap: 16px;
  position: relative;
`;

const ModalTitle = styled.h3`
  font-family: 'Cinzel', serif;
  font-size: 20px;
  font-weight: 800;
  color: #fbe396;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ModalDesc = styled.p`
  font-size: 14px;
  color: #cbd5e1;
  line-height: 1.6;
`;

const RewardRow = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  background: rgba(15, 23, 42, 0.8);
  border: 1px solid rgba(212, 175, 55, 0.2);
  border-radius: 8px;
  padding: 12px;
`;

const RewardItem = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  font-weight: 700;
  color: #fbe396;
`;

const CompleteBtn = styled.button`
  background: linear-gradient(135deg, #d4af37 0%, #8a6711 100%);
  color: #070b12;
  font-family: 'Cinzel', serif;
  font-size: 14px;
  font-weight: 800;
  padding: 12px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.2s ease;

  &:hover {
    filter: brightness(1.15);
    box-shadow: 0 0 15px rgba(212, 175, 55, 0.5);
  }
`;

const CloseBtn = styled.button`
  position: absolute;
  top: 14px;
  right: 14px;
  background: transparent;
  border: none;
  color: #a0aec0;
  font-size: 18px;
  cursor: pointer;

  &:hover {
    color: #fff;
  }
`;

// 2. Interface removida
// 3. Import { Quest } removido

// 4. React.FC removido, useState sem tipo
export const QuestsSection = ({ quests, onCompleteQuest }) => {
  const [selectedQuest, setSelectedQuest] = useState(null);

  return (
    <QuestsContainer>
      <SectionHeader>
        <Scroll size={16} color="#d4af37" />
        MISSÕES ATIVAS
      </SectionHeader>

      {quests.map((quest) => (
        <QuestCard key={quest.id} $selected={selectedQuest?.id === quest.id} onClick={() => setSelectedQuest(quest)}>
          <QuestLeftGroup>
            <QuestDiamondIcon size={26} />
            <QuestTextGroup>
              <QuestTitle>{quest.title}</QuestTitle>
              <QuestSubtitle>{quest.subtitle}</QuestSubtitle>
            </QuestTextGroup>
          </QuestLeftGroup>

          <ChevronIconWrapper>
            <ChevronRight size={22} />
          </ChevronIconWrapper>
        </QuestCard>
      ))}

      {selectedQuest && (
        <ModalOverlay onClick={() => setSelectedQuest(null)}>
          <ModalBox onClick={(e) => e.stopPropagation()}>
            <CloseBtn onClick={() => setSelectedQuest(null)}>✕</CloseBtn>

            <ModalTitle>
              <QuestDiamondIcon size={28} />
              {selectedQuest.title}
            </ModalTitle>

            <div style={{ display: 'flex', gap: 12, fontSize: 12, color: '#a0aec0' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <MapPin size={12} color="#d4af37" /> {selectedQuest.location}
              </span>
              <span>• Dificuldade: <strong style={{ color: '#fbe396' }}>{selectedQuest.difficulty}</strong></span>
            </div>

            <ModalDesc>{selectedQuest.description}</ModalDesc>

            <RewardRow>
              <Award size={18} color="#d4af37" />
              <RewardItem>+{selectedQuest.rewardExp} EXP</RewardItem>
              <RewardItem>+{selectedQuest.rewardGold} Ouro</RewardItem>
            </RewardRow>

            <CompleteBtn
              onClick={() => {
                onCompleteQuest(selectedQuest.id);
                setSelectedQuest(null);
              }}
            >
              <CheckCircle size={18} />
              Concluir Missão
            </CompleteBtn>
          </ModalBox>
        </ModalOverlay>
      )}
    </QuestsContainer>
  );
};