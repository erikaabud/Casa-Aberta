import React from 'react';
import styled from 'styled-components';
import { Star, ShoppingBag, QrCode } from 'lucide-react';

const NavContainer = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  background: #1a1a1a;
  border-top: 2px solid #2a2212;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 12px 14px;
  z-index: 100;
  box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.8);
`;

const NavItem = styled.button`
  background: ${props => props.$active ? '#2a2212' : 'transparent'};
  border: 1px solid ${props => props.$active ? '#4a3c1e' : 'transparent'};
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 10px;
  color: ${props => props.$active ? '#ffd700' : '#888888'};
  cursor: pointer;
  transition: 0.2s ease;
  position: relative;
  background: none;

  &:hover {
    color: #ffd700;
    border-color: #4a3c1e;
    transform: translateY(-1px);
  }

  svg {
    stroke: ${props => props.$active ? '#d4af37' : '#888888'};
    filter: ${props => props.$active ? 'drop-shadow(0 0 6px rgba(212, 175, 55, 0.6))' : 'none'};
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -4px;
    width: ${props => props.$active ? '18px' : '0px'};
    height: 2px;
    background: #d4af37;
    border-radius: 4px;
    transition: 0.2s ease;
    box-shadow: 0 0 6px #d4af37;
  }
`;

const NavLabel = styled.span`
  font-family: 'Cinzel', serif;
  font-size: 10px;
  font-weight: ${props => props.$active ? '700' : '500'};
  letter-spacing: 0.05em;
  color: ${props => props.$active ? '#ffd700' : '#a08a5a'};
  text-transform: uppercase;
`;

export const BottomNav = ({ activeTab, onSelectTab }) => {
  return (
    <NavContainer>
      <NavItem $active={activeTab === 'poderes'} onClick={() => onSelectTab('poderes')}>
        <Star size={22} />
        <NavLabel $active={activeTab === 'poderes'}>Poderes</NavLabel>
      </NavItem>

      <NavItem $active={activeTab === 'inventario'} onClick={() => onSelectTab('inventario')}>
        <ShoppingBag size={22} />
        <NavLabel $active={activeTab === 'inventario'}>Inventário</NavLabel>
      </NavItem>

      <NavItem $active={activeTab === 'qrcode'} onClick={() => onSelectTab('qrcode')}>
        <QrCode size={22} />
        <NavLabel $active={activeTab === 'qrcode'}>QR Code</NavLabel>
      </NavItem>
    </NavContainer>
  );
};