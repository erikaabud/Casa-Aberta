import React from 'react';
import styled from 'styled-components';
import { Header } from './Header';
import { StatsGrid } from './StatsGrid';
import { QuestsSection } from './QuestsSection';
import { InventoryView } from './InventoryView';
import { PowersView } from './PowersView';
import { QrScannerView } from './QrScannerView';
import { Shield, Scroll, ShoppingBag, Star, Sparkles, QrCode } from 'lucide-react';

// 1. CSS corrigido com ':' e valores preenchidos
const DesktopLayoutWrapper = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 24px;
  display: grid;
  grid-template-columns: 1fr 1.8fr;
  gap: 24px;
  width: 100%;

  @media (max-width: 1024px) {
    display: flex;
    flex-direction: column;
    padding: 12px;
  }
`;

const SidebarCard = styled.div`
  background: #151515;
  border: 1px solid #4a3c1e;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.9);
  display: flex;
  flex-direction: column;
`;

const MainContentCard = styled.div`
  background: #151515;
  border: 1px solid #4a3c1e;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.9);
  display: flex;
  flex-direction: column;
`;

const DesktopNavHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 20px;
  background: linear-gradient(to bottom, #2a2212, #1a1a1a);
  border-bottom: 1px solid #4a3c1e;
  flex-wrap: wrap;
`;

// 2. Removido o genérico <{ $active }> e corrigido o CSS
const NavTabButton = styled.button`
  background: ${props => props.$active ? '#4a3c1e' : '#2a2212'};
  border: 1px solid ${props => props.$active ? '#d4af37' : '#4a3c1e'};
  border-radius: 8px;
  color: ${props => props.$active ? '#ffd700' : '#a08a5a'};
  padding: 12px 16px;
  font-family: 'Cinzel', serif;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: 0.2s ease;
  box-shadow: ${props => props.$active ? '0 0 15px rgba(212, 175, 55, 0.3)' : 'none'};

  &:hover {
    color: #ffd700;
    border-color: #d4af37;
    background: #4a3c1e;
  }
`;

const ContentBody = styled.div`
  padding: 0;
  overflow-y: auto;
  max-height: calc(100vh - 180px);
`;


export const DesktopView = ({
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
    <DesktopLayoutWrapper>
      {/* Left Sidebar - Character Identity & Core Stats */}
      <SidebarCard>
        <Header
          name={character.name}
          className={character.class}
          onUpdateName={onUpdateName}
          onUpdateClass={onUpdateClass}
        />
        {activeTab === 'poderes' && (
          <StatsGrid stats={character.stats} onUpdateStat={onUpdateStat} />
        )}
      </SidebarCard>

      {/* Main Content Area - Tabs (Quests, Inventory, Powers) */}
      <MainContentCard>
        <DesktopNavHeader>
          <NavTabButton
            $active={activeTab === 'missoes'}
            onClick={() => onSelectTab('missoes')}
          >
            <Scroll size={16} /> Missões ({character.quests.length})
          </NavTabButton>

          <NavTabButton
            $active={activeTab === 'inventario'}
            onClick={() => onSelectTab('inventario')}
          >
            <ShoppingBag size={16} /> Inventário ({character.inventory.length})
          </NavTabButton>

          <NavTabButton
            $active={activeTab === 'poderes'}
            onClick={() => onSelectTab('poderes')}
          >
            <Star size={16} /> Poderes ({character.skills.length})
          </NavTabButton>

          <NavTabButton
            $active={activeTab === 'qrcode'}
            onClick={() => onSelectTab('qrcode')}
          >
            <QrCode size={16} /> Leitor QR
          </NavTabButton>
        </DesktopNavHeader>

        <ContentBody>
          {activeTab === 'missoes' && (
            <QuestsSection quests={character.quests} onCompleteQuest={onCompleteQuest} />
          )}

          {activeTab === 'inventario' && (
            <InventoryView
              items={character.inventory}
              onToggleEquip={onToggleEquip}
              onAddItem={onAddItem}
            />
          )}

          {activeTab === 'poderes' && (
            <PowersView skills={character.skills} />
          )}

          {activeTab === 'qrcode' && (
            <QrScannerView
              character={character}
              totalPower={totalPower}
              onAddItem={onAddItem}
              onGainExp={onGainExp}
            />
          )}
        </ContentBody>
      </MainContentCard>
    </DesktopLayoutWrapper>
  );
};