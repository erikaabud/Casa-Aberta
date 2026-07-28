import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './TeamPage.css';

//logo
import gitHubLogo from "../../assets/githubBranco.png"
import inLogo from "../../assets/inBranco.png"
import instaLogo from "../../assets/instaBranco.png"
//Imgs
import camillyv from "../../assets/camillyv.jpg";
import vitinho from "../../assets/vitinho.png";

const TeamPage = () => {
  const [membroSelecionado, setMembroSelecionado] = useState(null);

  const equipe = [
    {
      id: 1,
      nome: 'Balys Kozakevic',
      funcao: 'a',
      emoji: '👩‍💼',
      idade: 22,
      cidade: 'São Paulo',
      habilidades: [],
      bio: '',
      redes: { github: '', linkedin: '', instagram: '' },
      curiosidade: ''
    },
    {
      id: 2,
      nome: 'Camilly Victoria',
      funcao: 'Scrum Master',
      imagem: camillyv,
      idade: 21,
      cidade: 'São Paulo',
      habilidades: ['Agile', 'Facilitação', 'Mediação', 'Kanban'],
      bio: 'Camilly é a mestre do Scrum, garantindo que a equipe trabalhe de forma ágil e colaborativa, removendo impedimentos e promovendo melhorias contínuas.',
      redes: { github: 'camillysantos-dev', linkedin: 'camillyvictoriadosantos02', instagram: '@eae_camilly_' },
      curiosidade: 'Coleciona tatuagens como coleciona métricas ágeis - cada uma tem uma história e um significado. Para ela, a pele é o backlog da vida: tudo planejado, mas sempre aberta a novas ideias.'
    },
    {
      id: 3,
      nome: 'Erika Abud',
      funcao: 'Product Owner',
      emoji: '👩‍💻',
      idade: 17,
      cidade: 'São Paulo',
      habilidades: ['Liderança', 'Gestão de Projetos', 'Comunicação', 'Scrum'],
      bio: 'Erika é a líder da equipe, responsável por garantir que o projeto atenda às necessidades dos usuários e entregue valor real.',
      redes: { github: 'erikaabud', linkedin: '', instagram: '' },
      curiosidade: ''
    },
    {
      id: 4,
      nome: 'Gabriel de Souza',
      funcao: 'a',
      emoji: '👨‍💻',
      idade: 23,
      cidade: 'São Paulo',
      habilidades: [''],
      bio: '',
      redes: { github: 'gabrieldesouzabobmarley-creator', linkedin: '', instagram: '' },
      curiosidade: ''
    },
    {
      id: 5,
      nome: 'Giovanni Calado',
      funcao: 'a',
      emoji: '🎨',
      idade: 20,
      cidade: 'Porto Alegre',
      habilidades: [''],
      bio: '',
      redes: { github: 'Hackrin01', linkedin: '', instagram: '' },
      curiosidade: ''
    },
    {
      id: 6,
      nome: 'João Pedro',
      funcao: 'a',
      emoji: '🔧',
      idade: 25,
      cidade: 'Recife',
      habilidades: ['Docker', 'AWS', 'CI/CD', 'Linux'],
      bio: 'Felipe é o engenheiro de infraestrutura. Ele cuida da implantação, monitoramento e escalabilidade do sistema, garantindo alta disponibilidade.',
      redes: { github: 'Jpedroozxs', linkedin: '', instagram: '' },
      curiosidade: 'Tem uma fazenda de servidores em casa e adora jogar RPG de mesa 🎲'
    },
    {
      id: 7,
      nome: 'Luciano Filho',
      funcao: 'Analista de Dados',
      emoji: '📊',
      idade: 22,
      cidade: 'São Paulo',
      habilidades: [''],
      bio: '',
      redes: { github: 'Lucianobfilho', linkedin: '', instagram: '' },
      curiosidade: ''
    },
    {
      id: 8,
      nome: 'Paulo Santana',
      funcao: 'a',
      emoji: '🚀',
      idade: 24,
      cidade: 'São Paulo',
      habilidades: [''],
      bio: '',
      redes: { github: '', linkedin: '', instagram: '' },
      curiosidade: ''
    },
    {
      id: 9,
      nome: 'Paulo Vicenty',
      funcao: 'a',
      emoji: '🧪',
      idade: 21,
      cidade: 'São Paulo',
      habilidades: [''],
      bio: '',
      redes: { github: 'paulovicenty-debug', linkedin: '', instagram: '' },
      curiosidade: ''
    },
    {
      id: 10,
      nome: 'Vitor Hugo',
      funcao: 'FRONT-END',
      imagem: vitinho,
      idade: 20,
      cidade: 'São Paulo',
      habilidades: ['Manutenção de Computadores','Linux', 'Programação', 'Redes de Computadores'],
      bio: 'Estudante de Tecnologia da Informação, apaixonado por programação, infraestrutura de redes e desenvolvimento de sistemas. Atualmente cursando Técnico em Informática e buscando oportunidades para adquirir experiência prática e evoluir profissionalmente na área de TI.',
      redes: { github: 'vitinho13y7', linkedin: '', instagram: '@vitinho132y7' },
      curiosidade: ''
    }
  ];

  // Estatísticas da equipe
  const totalMembros = equipe.length;
  const mediaIdade = Math.round(equipe.reduce((acc, m) => acc + m.idade, 0) / totalMembros);
  const cidades = [...new Set(equipe.map(m => m.cidade))];
  const habilidadesUnicas = [...new Set(equipe.flatMap(m => m.habilidades))];

  return (
    <div className="team-page">
      <nav className="barra-navegacao">
        <div className="container-nav">
          <div className="logo-nav">
            <span className="texto-logo">UMBRAETH</span>
            <span className="subtitulo-logo">As Crônicas</span>
          </div>
          <ul className="menu-nav">
            <li><Link to="/">Início</Link></li>
            <li><Link to="/inventory">Inventário</Link></li>
            <li><Link to="/cadastro">Cadastro</Link></li>
            <li><Link to="/equipe">Equipe</Link></li>
            <li><Link to="/about">Sobre</Link></li>
          </ul>
        </div>
      </nav>

      {/* Header da Equipe */}
      <div className="team-header">
        <div className="team-header-content">
          <h1>⚔️ A Equipe — T.I 101</h1>
          <p className="team-subtitle">Casa Aberta Senac 2026</p>
          <div className="team-stats-banner">
            <div className="stat-banner-item">
              <span className="stat-banner-number">{totalMembros}</span>
              <span className="stat-banner-label">Alunos</span>
            </div>
            <div className="stat-banner-divider">|</div>
            <div className="stat-banner-item">
              <span className="stat-banner-number">{mediaIdade}</span>
              <span className="stat-banner-label">Idade Média</span>
            </div>
            <div className="stat-banner-divider">|</div>
            <div className="stat-banner-item">
              <span className="stat-banner-number">{habilidadesUnicas.length}</span>
              <span className="stat-banner-label">Habilidades</span>
            </div>
          </div>
        </div>
      </div>

      {/* Grid da Equipe */}
      <div className="team-grid-container">
        <div className="team-grid">
          {equipe.map((membro) => (
            <div
              key={membro.id}
              className="team-card"
              onClick={() => setMembroSelecionado(membroSelecionado?.id === membro.id ? null : membro)}
            >
              <div className="team-card-header">
                <div className="team-avatar">
                  {membro.imagem ? (
                    <img
                      src={membro.imagem}
                      alt={membro.nome}
                      className="team-avatar-img"
                    />
                  ) : (
                    <span className="team-emoji">{membro.emoji}</span>
                  )}
                </div>
                <div className="team-card-badge">{membro.funcao}</div>
              </div>

              <h3 className="team-card-name">{membro.nome}</h3>
              <p className="team-card-role">{membro.funcao}</p>

              <div className="team-card-info">
                <span class="material-symbols-outlined">
                  location_on
                </span>
                <p>{membro.cidade}</p>
                <span class="material-symbols-outlined">
                  cake 
                </span>
                <p>{membro.idade} anos</p>
              </div>

              <div className="team-card-skills">
                {membro.habilidades.slice(0, 3).map((skill, idx) => (
                  <span key={idx} className="skill-tag">{skill}</span>
                ))}
                {membro.habilidades.length > 3 && (
                  <span className="skill-tag more">+{membro.habilidades.length - 3}</span>
                )}
              </div>

              <div className="team-card-social">
                <a
                  href={`https://github.com/${membro.redes.github}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link">
                  <img src={gitHubLogo} alt="GitHub" className='social-icon' />
                </a>

                <a href={`https://linkedin.com/in/${membro.redes.linkedin}`} target="_blank" rel="noopener noreferrer" className="social-link">
                  <img src={inLogo} alt='Linkedln' className='social-icon' />
                </a>
                <a href={`https://instagram.com/${membro.redes.instagram}`}
                  target="_blank" rel="noopener noreferrer" className="social-link">
                  <img src={instaLogo} alt='Instagram' className='social-icon' />
                </a>
              </div>

              <div className="team-card-expand">
                <span className="expand-icon">{membroSelecionado?.id === membro.id ? '▲' : '▼'}</span>
                <span className="expand-text">
                  {membroSelecionado?.id === membro.id ? 'Ver menos' : 'Ver mais'}
                </span>
              </div>

              {/* Detalhes expandidos */}
              {membroSelecionado?.id === membro.id && (
                <div className="team-card-details">
                  <div className="detail-section">
                    <h4>📖 Sobre</h4>
                    <p>{membro.bio}</p>
                  </div>
                  <div className="detail-section">
                    <h4>💡 Curiosidade</h4>
                    <p>{membro.curiosidade}</p>
                  </div>
                  <div className="detail-section">
                    <h4>🛠️ Todas as Habilidades</h4>
                    <div className="all-skills">
                      {membro.habilidades.map((skill, idx) => (
                        <span key={idx} className="skill-tag full">{skill}</span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Seção de Estatísticas Detalhadas */}
      <section className="team-stats-section">

        <div className="stats-card">
          <h3>📈 Funções da Equipe</h3>
          <div className="role-chart">
            {['Desenvolvedor', 'Designer', 'Gestão', 'Qualidade', 'Suporte', 'Dados', 'DevOps'].map((role, idx) => {
              const count = equipe.filter(m => m.funcao.includes(role) || m.funcao.includes(role.slice(0, -1))).length;
              return count > 0 && (
                <div key={idx} className="role-bar">
                  <span className="role-label">{role}</span>
                  <div className="role-bar-track">
                    <div className="role-bar-fill" style={{ width: `${(count / totalMembros) * 100}%` }}>
                      <span className="role-count">{count}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="stats-card">
          <h3>⭐ Top Habilidades</h3>
          <div className="top-skills">
            {habilidadesUnicas
              .map(skill => ({
                skill,
                count: equipe.filter(m => m.habilidades.includes(skill)).length
              }))
              .sort((a, b) => b.count - a.count)
              .slice(0, 8)
              .map((item, idx) => (
                <div key={idx} className="skill-popularity">
                  <span className="skill-name">{item.skill}</span>
                  <div className="skill-bar">
                    <div className="skill-bar-fill" style={{ width: `${(item.count / totalMembros) * 100}%` }} />
                  </div>
                  <span className="skill-count">{item.count}x</span>
                </div>
              ))}
          </div>
        </div>
      </section >

      {/* Botão Voltar */}
      < div className="team-footer-actions" >
        <Link to="/" className="voltar-link">← Voltar ao início</Link>
      </div >

      {/* Rodapé */}
      < footer className="team-footer" >
        <p>Casa Aberta Senac 2026 · Turma T.I 101 · {totalMembros} alunos</p>
        <div className="team-footer-meta">
          <span>Feito com muito código e café</span>
          <span className="footer-divider">|</span>
          <span>Sempre aprendendo</span>
        </div>
      </footer >
    </div >
  );
};

export default TeamPage;