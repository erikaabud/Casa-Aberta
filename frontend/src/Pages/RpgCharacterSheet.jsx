import React, { useState, useEffect, useMemo } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { theme } from '../styles/theme';
import { GlobalStyles } from '../styles/GlobalStyles';
import { initialCharacter } from '../data/mockCharacter';
import { DeviceModeBar } from '../components/DeviceModeBar';
import { MobileView } from '../components/MobileView';
import { DesktopView } from '../components/DesktopView';
import { QrModal } from '../components/QrModal';

// Estilos da página
const AppContainer = styled.div`
  min-height: 100vh;
  background-color: #030712;
  background-image: radial-gradient(circle at 50% 0%, rgba(212, 175, 55, 0.08) 0%, transparent 60%),
    radial-gradient(circle at 10% 90%, rgba(15, 23, 42, 0.8) 0%, transparent 50%);
  color: #f7fafc;
  display: flex;
  flex-direction: column;
`;

const ResponsiveContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px 12px;
  width: 100%;
  .auto-mobile { display: block; }
  .auto-desktop { display: none; }
  @media (min-width: 1024px) {
    .auto-mobile { display: none; }
    .auto-desktop { display: block; width: 100%; }
  }
`;

export default function RpgCharacterSheet() {
  const [character, setCharacter] = useState(() => {
    const saved = localStorage.getItem('rpg_character_data');
    return saved ? JSON.parse(saved) : initialCharacter;
  });

  const [deviceMode, setDeviceMode] = useState('auto');
  const [activeTab, setActiveTab] = useState('poderes');
  const [showQrModal, setShowQrModal] = useState(false);

  useEffect(() => {
    localStorage.setItem('rpg_character_data', JSON.stringify(character));
  }, [character]);

  const calculatedPower = useMemo(() => {
    const basePower = (character.stats.strength * 10) + (character.stats.defense * 8) +
      (character.level * 80) + (character.stats.hpMax / 4) + (character.stats.manaMax / 4);
    const itemBonus = character.inventory.filter(item => item.equipped)
      .reduce((sum, item) => sum + item.powerBonus, 0);
    return Math.round(basePower + itemBonus);
  }, [character]);

  const handleUpdateName = (newName) => setCharacter(prev => ({ ...prev, name: newName }));
  
  const handleUpdateClass = (newClass) => {
    setCharacter(prev => ({
      ...prev,
      class: newClass,
      stats: {
        ...prev.stats,
        strength: newClass === 'Guerreiro' ? prev.stats.strength + 20 : prev.stats.strength,
        defense: newClass === 'Paladino' ? prev.stats.defense + 20 : prev.stats.defense,
        manaMax: (newClass === 'Mago' || newClass === 'Necromante') ? prev.stats.manaMax + 200 : prev.stats.manaMax,
      }
    }));
  };

  const handleGainExp = () => {
    setCharacter(prev => {
      let newExp = prev.expCurrent + 5000;
      let newLevel = prev.level;
      let newMax = prev.expMax;
      if (newExp >= prev.expMax) {
        newLevel += 1;
        newExp = newExp - prev.expMax;
        newMax = Math.round(prev.expMax * 1.2);
      }
      return {
        ...prev,
        level: newLevel,
        expCurrent: newExp,
        expMax: newMax,
        stats: {
          ...prev.stats,
          hpMax: prev.stats.hpMax + 50,
          hpCurrent: prev.stats.hpMax + 50,
          manaMax: prev.stats.manaMax + 20,
          manaCurrent: prev.stats.manaMax + 20,
          strength: prev.stats.strength + 3,
          defense: prev.stats.defense + 4,
        }
      };
    });
  };

  const handleUpdateStat = (statName, delta) => {
    setCharacter(prev => ({
      ...prev,
      stats: {
        ...prev.stats,
        [statName]: Math.max(10, prev.stats[statName] + delta),
        ...(statName === 'hpMax' ? { hpCurrent: Math.min(prev.stats.hpCurrent + delta, prev.stats.hpMax + delta) } : {}),
        ...(statName === 'manaMax' ? { manaCurrent: Math.min(prev.stats.manaCurrent + delta, prev.stats.manaMax + delta) } : {}),
      }
    }));
  };

  const handleToggleEquip = (itemId) => setCharacter(prev => ({
    ...prev,
    inventory: prev.inventory.map(item => item.id === itemId ? { ...item, equipped: !item.equipped } : item)
  }));

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <AppContainer>
        <DeviceModeBar mode={deviceMode} onModeChange={setDeviceMode} />
        <ResponsiveContainer>
          {deviceMode === 'mobile' ? (
            <MobileView character={character} totalPower={calculatedPower} activeTab={activeTab} onSelectTab={setActiveTab} onUpdateName={handleUpdateName} onUpdateClass={handleUpdateClass} onGainExp={handleGainExp} onUpdateStat={handleUpdateStat} onToggleEquip={handleToggleEquip} onOpenQrModal={() => setShowQrModal(true)} />
          ) : deviceMode === 'desktop' ? (
            <DesktopView character={character} totalPower={calculatedPower} activeTab={activeTab} onSelectTab={setActiveTab} onUpdateName={handleUpdateName} onUpdateClass={handleUpdateClass} onGainExp={handleGainExp} onUpdateStat={handleUpdateStat} onToggleEquip={handleToggleEquip} onOpenQrModal={() => setShowQrModal(true)} />
          ) : (
            <>
              <div className="auto-mobile"><MobileView character={character} totalPower={calculatedPower} activeTab={activeTab} onSelectTab={setActiveTab} onUpdateName={handleUpdateName} onUpdateClass={handleUpdateClass} onGainExp={handleGainExp} onUpdateStat={handleUpdateStat} onToggleEquip={handleToggleEquip} onOpenQrModal={() => setShowQrModal(true)} /></div>
              <div className="auto-desktop"><DesktopView character={character} totalPower={calculatedPower} activeTab={activeTab} onSelectTab={setActiveTab} onUpdateName={handleUpdateName} onUpdateClass={handleUpdateClass} onGainExp={handleGainExp} onUpdateStat={handleUpdateStat} onToggleEquip={handleToggleEquip} onOpenQrModal={() => setShowQrModal(true)} /></div>
            </>
          )}
        </ResponsiveContainer>
        {showQrModal && <QrModal character={character} totalPower={calculatedPower} onClose={() => setShowQrModal(false)} />}
      </AppContainer>
    </ThemeProvider>
  );
}