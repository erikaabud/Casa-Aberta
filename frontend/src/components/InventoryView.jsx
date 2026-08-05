import React from 'react';
import styled from 'styled-components';
import { Sword, Shield, Sparkles, Heart, Check, Plus } from 'lucide-react';

const Container = styled.div`
  padding: 18px;
`;

const Title = styled.h2`
  font-family: 'Cinzel', serif;
  font-size: 16px;
  font-weight: 800;
  color: #d4af37;
  letter-spacing: 0.1em;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ItemGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

// 1. Removido o <{ $rarity: string; $equipped: boolean }> do TypeScript
const ItemCard = styled.div`
  background: linear-gradient(135deg, rgba(16, 24, 40, 0.95) 0%, rgba(9, 14, 24, 0.98) 100%);
  border: 1px solid ${props => {
    switch (props.$rarity) {
      case 'lendario': return '#dd6b20';
      case 'epico': return '#805ad5';
      case 'raro': return '#3182ce';
      default: return 'rgba(212, 175, 55, 0.3)';
    }
  }};
  border-radius: 10px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  position: relative;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.7);
  }
`;

const ItemHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

// 2. Removido o <{ $rarity: string }> do TypeScript
const ItemIcon = styled.div`
  width: 34px;
  height: 34px;
  border-radius: 6px;
  background: rgba(15, 23, 42, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${props => {
    switch (props.$rarity) {
      case 'lendario': return '#dd6b20';
      case 'epico': return '#805ad5';
      case 'raro': return '#3182ce';
      default: return '#718096';
    }
  }};
  color: ${props => {
    switch (props.$rarity) {
      case 'lendario': return '#fbd38d';
      case 'epico': return '#d6bcfa';
      case 'raro': return '#90cdf4';
      default: return '#cbd5e1';
    }
  }};
`;

const ItemName = styled.h4`
  font-family: 'Cinzel', serif;
  font-size: 13px;
  font-weight: 700;
  color: #f7fafc;
  margin: 0;
`;

const RarityBadge = styled.span`
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  color: ${props => {
    switch (props.$rarity) {
      case 'lendario': return '#fbd38d';
      case 'epico': return '#d6bcfa';
      case 'raro': return '#90cdf4';
      default: return '#a0aec0';
    }
  }};
`;

const StatBonus = styled.span`
  font-size: 12px;
  color: #d4af37;
  font-weight: 600;
`;

const EquipTag = styled.span`
  position: absolute;
  top: 8px;
  right: 8px;
  background: rgba(212, 175, 55, 0.2);
  border: 1px solid #d4af37;
  color: #fbe396;
  font-size: 9px;
  font-weight: 700;
  padding: 2px 6px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 2px;
`;

const AddItemBtn = styled.button`
  background: rgba(212, 175, 55, 0.15);
  border: 1px dashed #d4af37; /* 3. Corrigido erro de sintaxe no CSS (de border-dashed para dashed) */
  color: #fbe396;
  font-family: 'Cinzel', serif;
  font-size: 12px;
  font-weight: 700;
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;

  &:hover {
    background: rgba(212, 175, 55, 0.3);
  }
`;

// 4. Interface removida, import { Item } removido

// 5. Removido React.FC<...> e usada a sintaxe JS pura
export const InventoryView = ({ items, onToggleEquip, onAddItem }) => {
  const getIcon = (name) => {
    switch (name) {
      case 'sword': return <Sword size={18} />;
      case 'shield': return <Shield size={18} />;
      case 'sparkles': return <Sparkles size={18} />;
      default: return <Heart size={18} />;
    }
  };

  return (
    <Container>
      <Title>
        <span>INVENTÁRIO & EQUIPAMENTOS</span>
        <AddItemBtn onClick={onAddItem}>
          <Plus size={14} /> Novo Item
        </AddItemBtn>
      </Title>

      <ItemGrid>
        {items.map((item) => (
          <ItemCard
            key={item.id}
            $rarity={item.rarity}
            $equipped={item.equipped}
            onClick={() => onToggleEquip(item.id)}
          >
            {item.equipped && (
              <EquipTag>
                <Check size={10} /> EQUIPADO
              </EquipTag>
            )}

            <ItemHeader>
              <ItemIcon $rarity={item.rarity}>{getIcon(item.iconName)}</ItemIcon>
              <div>
                <ItemName>{item.name}</ItemName>
                <RarityBadge $rarity={item.rarity}>{item.rarity}</RarityBadge>
              </div>
            </ItemHeader>

            <StatBonus>{item.statBonus}</StatBonus>
            <span style={{ fontSize: 11, color: '#94a3b8' }}>{item.description}</span>
          </ItemCard>
        ))}
      </ItemGrid>
    </Container>
  );
};