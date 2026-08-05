import React from 'react';
import styled from 'styled-components';
import { Sword, Shield, Sparkles, Zap, Flame } from 'lucide-react';

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
`;

const SkillList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const SkillCard = styled.div`
  background: linear-gradient(135deg, rgba(16, 24, 40, 0.95) 0%, rgba(9, 14, 24, 0.98) 100%);
  border: 1px solid rgba(212, 175, 55, 0.3);
  border-radius: 10px;
  padding: 14px;
  display: flex;
  align-items: flex-start;
  gap: 14px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
  transition: all 0.2s ease;

  &:hover {
    border-color: #fbe396;
    transform: translateY(-2px);
  }
`;

const SkillIcon = styled.div`
  width: 42px;
  height: 42px;
  border-radius: 8px;
  background: rgba(212, 175, 55, 0.15);
  border: 1px solid #d4af37;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fbe396;
  flex-shrink: 0;
`;

const SkillContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
`;

const SkillHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const SkillName = styled.h3`
  font-family: 'Cinzel', serif;
  font-size: 14px;
  font-weight: 700;
  color: #f7fafc;
  margin: 0;
`;

const ManaCost = styled.span`
  font-size: 12px;
  font-weight: 700;
  color: #63b3ed;
  background: rgba(49, 130, 206, 0.15);
  padding: 2px 6px;
  border-radius: 4px;
  border: 1px solid rgba(49, 130, 206, 0.3);
`;

const SkillType = styled.span`
  font-size: 11px;
  color: #d4af37;
  font-weight: 600;
`;

const SkillDesc = styled.p`
  font-size: 12px;
  color: #cbd5e1;
  margin: 0;
  line-height: 1.4;
`;

// 1. Interface removida
// 2. Import { Skill } removido

// 3. React.FC removido
export const PowersView = ({ skills }) => {
  const getIcon = (icon) => {
    switch (icon) {
      case 'sword': return <Sword size={22} />;
      case 'shield': return <Shield size={22} />;
      case 'sparkles': return <Sparkles size={22} />;
      case 'zap': return <Zap size={22} />;
      default: return <Flame size={22} />;
    }
  };

  return (
    <Container>
      <Title>HABILIDADES & PODERES</Title>

      <SkillList>
      {skills && skills.map((skill) => (
          <SkillCard key={skill.id}>
            <SkillIcon>{getIcon(skill.icon)}</SkillIcon>
            <SkillContent>
              <SkillHeader>
                <SkillName>{skill.name}</SkillName>
                <ManaCost>{skill.manaCost} MP</ManaCost>
              </SkillHeader>
              <SkillType>Tipo: {skill.type} • Cooldown: {skill.cooldown}</SkillType>
              <SkillDesc>{skill.description}</SkillDesc>
            </SkillContent>
          </SkillCard>
        ))}
      </SkillList>
    </Container>
  );
};