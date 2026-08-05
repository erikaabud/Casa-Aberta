import React from 'react';
import styled from 'styled-components';
import { Header } from './Header';
import { StatsGrid } from './StatsGrid';
import { QuestsSection } from './QuestsSection';
import { BottomNav } from './BottomNav';
import { InventoryView } from './InventoryView';
import { PowersView } from './PowersView';
import { QrScannerView } from './QrScannerView';

const PhoneFrame = styled.div`
  max-width: 412px;
  width: 100%;
  margin: 0 auto;
  background: #0a0a0a;
  border-radius: 40px;
  border: 10px solid #2a2212;
  box-shadow: 
    0 25px 60px rgba(0, 0, 0, 0.95),
    0 0 30px rgba(212, 175, 55, 0.25);
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 840px;

  /* Media query for actual mobile devices */
  @media (max-width: 480px) {
    border-radius: 0;
    border: none;
    max-width: 100%;
    min-height: 100vh;
  }
`;

const ScrollableBody = styled.div`
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`;

// 1. Interface removida
// 2. Importações de tipos removidas (CharacterData, CharacterClass, ActiveTab)

// 3. React.FC removido e desestruturação de props limpa
export const MobileView = ({
  character,
  totalPower,
  activeTab,
  onSelectTab,
  onUpdateName,
  onUpdateClass,
  onGainExp,
  onUpdateStat,
  onCompleteQuest,
  onToggleEquip,
  onAddItem,
  onOpenQrModal
}) => {
  return (
    <PhoneFrame>
      <Header
        name={character.name}
        className={character.class}
        onUpdateName={onUpdateName}
        onUpdateClass={onUpdateClass}
      />

      <ScrollableBody>
        {activeTab === 'poderes' && (
          <>
            <StatsGrid stats={character.stats} onUpdateStat={onUpdateStat} />
            <PowersView skills={character.skills} />
          </>
        )}

        {activeTab === 'inventario' && (
          <InventoryView
            items={character.inventory}
            onToggleEquip={onToggleEquip}
            onAddItem={onAddItem}
          />
        )}

        {activeTab === 'missoes' && (
          <QuestsSection quests={character.quests} onCompleteQuest={onCompleteQuest} />
        )}

        {activeTab === 'qrcode' && (
          <QrScannerView
            character={character}
            totalPower={totalPower}
            onAddItem={onAddItem}
            onGainExp={onGainExp}
          />
        )}
      </ScrollableBody>

      <BottomNav activeTab={activeTab} onSelectTab={onSelectTab} />
    </PhoneFrame>
  );
};