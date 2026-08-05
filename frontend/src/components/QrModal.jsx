import React, { useState } from 'react';
import styled from 'styled-components';
import { QrCode, Copy, Check, X, Shield, Share2 } from 'lucide-react';
import { WingedSwordEmblem } from './MedievalEmblems';

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(3, 7, 18, 0.85);
  backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  z-index: 100;
`;

const PassportCard = styled.div`
  background: linear-gradient(135deg, #0d1527 0%, #070b13 100%);
  border: 2px solid #d4af37;
  border-radius: 16px;
  padding: 24px;
  max-width: 360px;
  width: 100%;
  box-shadow: 
    0 20px 50px rgba(0, 0, 0, 0.9),
    0 0 30px rgba(212, 175, 55, 0.3);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 16px;
  position: relative;
`;

const HeaderTitle = styled.h3`
  font-family: 'Cinzel', serif;
  font-size: 16px;
  font-weight: 800;
  letter-spacing: 0.12em;
  color: #fbe396;
  text-transform: uppercase;
  margin: 0;
`;

const QrBox = styled.div`
  background: #ffffff;
  padding: 14px;
  border-radius: 12px;
  border: 3px solid #d4af37;
  box-shadow: 0 0 15px rgba(212, 175, 55, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CharInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
`;

const CharName = styled.h2`
  font-family: 'Cinzel', serif;
  font-size: 18px;
  font-weight: 800;
  color: #ffffff;
  margin: 0;
`;

const CharClassLevel = styled.div`
  font-size: 13px;
  font-weight: 700;
  color: #d4af37;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const PowerBadge = styled.div`
  background: rgba(212, 175, 55, 0.15);
  border: 1px solid #d4af37;
  border-radius: 8px;
  padding: 6px 14px;
  color: #fbe396;
  font-family: 'Cinzel', serif;
  font-size: 13px;
  font-weight: 700;
  margin-top: 4px;
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
`;

// 1. Removido o <{ $primary?: boolean }> do TypeScript
const ActionBtn = styled.button`
  flex: 1;
  background: ${props => props.$primary ? 'linear-gradient(135deg, #d4af37 0%, #8a6711 100%)' : 'rgba(15, 23, 42, 0.8)'};
  color: ${props => props.$primary ? '#070b12' : '#fbe396'};
  border: 1px solid #d4af37;
  border-radius: 8px;
  padding: 10px;
  font-family: 'Cinzel', serif;
  font-size: 12px;
  font-weight: 800;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  transition: all 0.2s ease;

  &:hover {
    filter: brightness(1.15);
    transform: translateY(-1px);
  }
`;

const CloseCross = styled.button`
  position: absolute;
  top: 14px;
  right: 14px;
  background: transparent;
  border: none;
  color: #a0aec0;
  cursor: pointer;

  &:hover {
    color: #fff;
  }
`;

// 2. Interface removida
// 3. Import { CharacterData } removido

// 4. React.FC removido e props desestruturadas
export const QrModal = ({ character, totalPower, onClose }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ModalOverlay onClick={onClose}>
      <PassportCard onClick={(e) => e.stopPropagation()}>
        <CloseCross onClick={onClose}>
          <X size={20} />
        </CloseCross>

        <HeaderTitle>PASSAPORTE DO PERSONAGEM</HeaderTitle>

        <WingedSwordEmblem size={54} />

        <QrBox>
          <svg width="150" height="150" viewBox="0 0 100 100" fill="#070b12">
            {/* Styled QR Code matrix mock */}
            <rect width="100" height="100" fill="#ffffff" />
            {/* Top-left marker */}
            <rect x="5" y="5" width="25" height="25" fill="#070b12" />
            <rect x="10" y="10" width="15" height="15" fill="#ffffff" />
            <rect x="13" y="13" width="9" height="9" fill="#070b12" />
            {/* Top-right marker */}
            <rect x="70" y="5" width="25" height="25" fill="#070b12" />
            <rect x="75" y="10" width="15" height="15" fill="#ffffff" />
            <rect x="78" y="13" width="9" height="9" fill="#070b12" />
            {/* Bottom-left marker */}
            <rect x="5" y="70" width="25" height="25" fill="#070b12" />
            <rect x="10" y="75" width="15" height="15" fill="#ffffff" />
            <rect x="13" y="78" width="9" height="9" fill="#070b12" />
            {/* Random code dots */}
            <rect x="35" y="10" width="10" height="10" fill="#070b12" />
            <rect x="50" y="5" width="5" height="15" fill="#070b12" />
            <rect x="40" y="25" width="15" height="5" fill="#070b12" />
            <rect x="10" y="35" width="20" height="5" fill="#070b12" />
            <rect x="35" y="40" width="30" height="20" fill="#070b12" />
            <rect x="45" y="45" width="10" height="10" fill="#ffffff" />
            <rect x="70" y="35" width="20" height="15" fill="#070b12" />
            <rect x="75" y="55" width="15" height="10" fill="#070b12" />
            <rect x="35" y="70" width="15" height="20" fill="#070b12" />
            <rect x="55" y="75" width="25" height="15" fill="#070b12" />
            <rect x="85" y="70" width="10" height="20" fill="#070b12" />
          </svg>
        </QrBox>

        <CharInfoBox>
          <CharName>{character.name}</CharName>
          <CharClassLevel>
            <Shield size={14} color="#d4af37" />
            {character.class} • Nível {character.level}
          </CharClassLevel>
          <PowerBadge>PODER TOTAL: {totalPower.toLocaleString('pt-BR')}</PowerBadge>
        </CharInfoBox>

        <ButtonRow>
          <ActionBtn onClick={handleCopyLink}>
            {copied ? <Check size={14} /> : <Copy size={14} />}
            {copied ? 'Copiado!' : 'Copiar Link'}
          </ActionBtn>
          <ActionBtn $primary onClick={handleCopyLink}>
            <Share2 size={14} /> Compartilhar
          </ActionBtn>
        </ButtonRow>
      </PassportCard>
    </ModalOverlay>
  );
};