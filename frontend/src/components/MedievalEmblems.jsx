import React from 'react';
import styled from 'styled-components';

// 1. Removido o <{ $size?: number; $glow?: boolean }> do TypeScript
const SvgContainer = styled.svg`
  width: ${props => props.$size || 32}px;
  height: ${props => props.$size || 32}px;
  filter: ${props => props.$glow ? 'drop-shadow(0 0 8px rgba(212, 175, 55, 0.6))' : 'none'};
  transition: transform 0.2s ease, filter 0.2s ease;

  &:hover {
    transform: scale(1.05);
    filter: drop-shadow(0 0 12px rgba(212, 175, 55, 0.8));
  }
`;

// 2. Removido : React.FC<{ size?: number }>
export const WingedSwordEmblem = ({ size = 84 }) => {
  return (
    <SvgContainer $size={size} $glow viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fff3d1" />
          <stop offset="50%" stopColor="#d4af37" />
          <stop offset="100%" stopColor="#8a6711" />
        </linearGradient>
        <linearGradient id="swordGrad" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="60%" stopColor="#e2c262" />
          <stop offset="100%" stopColor="#8a6a12" />
        </linearGradient>
      </defs>

      {/* Left Wing */}
      <path
        d="M 28 55 C 10 40 5 25 18 15 C 28 20 32 30 35 42 C 22 35 15 28 20 20 C 30 32 36 42 42 50 C 32 46 25 42 28 35 C 38 46 42 55 45 62 Z"
        fill="url(#goldGrad)"
        opacity="0.95"
      />

      {/* Right Wing */}
      <path
        d="M 92 55 C 110 40 115 25 102 15 C 92 20 88 30 85 42 C 98 35 105 28 100 20 C 90 32 84 42 78 50 C 88 46 95 42 92 35 C 82 46 78 55 75 62 Z"
        fill="url(#goldGrad)"
        opacity="0.95"
      />

      {/* Shield Outline */}
      <path
        d="M 60 18 L 85 30 V 62 C 85 85 60 102 60 102 C 60 102 35 85 35 62 V 30 L 60 18 Z"
        fill="#0a101d"
        stroke="url(#goldGrad)"
        strokeWidth="3.5"
      />

      {/* Inner Shield Border */}
      <path
        d="M 60 24 L 79 34 V 60 C 79 78 60 92 60 92 C 60 92 41 78 41 60 V 34 L 60 24 Z"
        fill="none"
        stroke="url(#goldGrad)"
        strokeWidth="1.5"
        strokeDasharray="4 2"
        opacity="0.8"
      />

      {/* Central Sword Blade */}
      <path
        d="M 60 10 L 63 20 L 62 82 L 60 92 L 58 82 L 57 20 Z"
        fill="url(#swordGrad)"
      />

      {/* Sword Guard */}
      <path
        d="M 46 48 Q 60 52 74 48 L 72 53 Q 60 56 48 53 Z"
        fill="url(#goldGrad)"
      />

      {/* Central Star Emblem */}
      <path
        d="M 60 40 L 63 47 L 70 50 L 63 53 L 60 60 L 57 53 L 50 50 L 57 47 Z"
        fill="#ffffff"
        filter="drop-shadow(0 0 6px #ffe49e)"
      />
      
      {/* Radiant Rays */}
      <circle cx="60" cy="50" r="18" stroke="url(#goldGrad)" strokeWidth="0.75" strokeDasharray="2 3" opacity="0.6" />
    </SvgContainer>
  );
};

// 3. Removido : React.FC<{ size?: number }>
export const PaladinShieldIcon = ({ size = 22 }) => {
  return (
    <SvgContainer $size={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 2L4 5V11C4 16.5 12 21 12 21C12 21 20 16.5 20 11V5L12 2Z"
        fill="#131e32"
        stroke="#d4af37"
        strokeWidth="1.8"
      />
      {/* Cross in shield */}
      <path d="M12 6V16M8 10H16" stroke="#fbe396" strokeWidth="1.8" strokeLinecap="round" />
    </SvgContainer>
  );
};

// 4. Removido : React.FC<{ size?: number }>
export const QuestDiamondIcon = ({ size = 26 }) => {
  return (
    <SvgContainer $size={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M16 2L28 16L16 30L4 16L16 2Z"
        fill="#0f192b"
        stroke="#d4af37"
        strokeWidth="2"
      />
      <path
        d="M16 7L23 16L16 25L9 16L16 7Z"
        fill="none"
        stroke="#fbe396"
        strokeWidth="1"
        opacity="0.8"
      />
      <circle cx="16" cy="16" r="3" fill="#d4af37" />
    </SvgContainer>
  );
};

// 5. Removido : React.FC<{ level: number }>
export const LevelBadgeRing = ({ level }) => {
  return (
    <div style={{ position: 'relative', width: 72, height: 72, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg width="72" height="72" viewBox="0 0 72 72" fill="none" style={{ position: 'absolute' }}>
        <circle cx="36" cy="36" r="33" fill="#0b1322" stroke="#d4af37" strokeWidth="2" />
        <circle cx="36" cy="36" r="29" fill="none" stroke="#e8c252" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
        <circle cx="36" cy="36" r="35" fill="none" stroke="rgba(212,175,55,0.2)" strokeWidth="1" />
      </svg>
      <div style={{ textAlign: 'center', zIndex: 1, marginTop: 2 }}>
        <span style={{ fontSize: 9, letterSpacing: '0.12em', color: '#a0aec0', display: 'block', textTransform: 'uppercase', fontWeight: 700 }}>
          NÍVEL
        </span>
        <span style={{ fontSize: 22, fontWeight: 800, color: '#fbe396', fontFamily: 'Cinzel, serif', lineHeight: 1 }}>
          {level}
        </span>
      </div>
    </div>
  );
};