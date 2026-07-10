import { useState, useEffect, useRef } from "react";
import "./PlayerEntry.css";

function PlayerEntry({ onEntrar, grupos, onVoltar }) {
  const [token, setToken] = useState("");
  const [nomeJogador, setNomeJogador] = useState("");
  const [grupoEncontrado, setGrupoEncontrado] = useState(null);
  const [vagaSelecionada, setVagaSelecionada] = useState(null);
  const [personagemNome, setPersonagemNome] = useState("");
  const [classeSelecionada, setClasseSelecionada] = useState("");
  const [etapa, setEtapa] = useState(1); // 1: Token, 2: Vaga, 3: Personagem
  const [notificacao, setNotificacao] = useState(null);
  const canvasRef = useRef(null);

  const classesDisponiveis = [
    { nome: "Guerreiro Sombrio", emoji: "⚔️", cor: "#ef4444", descricao: "Mestre das espadas sombrias" },
    { nome: "Mago das Sombras", emoji: "🔮", cor: "#8b5cf6", descricao: "Domina a magia das trevas" },
    { nome: "Caçador de Espectros", emoji: "🏹", cor: "#22d3ee", descricao: "Preciso e letal à distância" },
    { nome: "Necromante", emoji: "💀", cor: "#34d399", descricao: "Comanda os mortos" },
    { nome: "Paladino da Ruína", emoji: "🛡️", cor: "#f59e0b", descricao: "Guerreiro sagrado da destruição" },
    { nome: "Assassino Etéreo", emoji: "🗡️", cor: "#ec4899", descricao: "Sombra mortal e silenciosa" },
  ];

  // Sistema de partículas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particleArray = [];
    for (let i = 0; i < 80; i++) {
      particleArray.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 1,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.5 + 0.1,
      });
    }

    let animationId;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particleArray.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        if (p.x > canvas.width) p.x = 0;
        if (p.x < 0) p.x = canvas.width;
        if (p.y > canvas.height) p.y = 0;
        if (p.y < 0) p.y = canvas.height;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(168, 85, 247, ${p.opacity})`;
        ctx.fill();
      });
      animationId = requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);
    
    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, []);

  const mostrarNotificacao = (mensagem, tipo = "info") => {
    setNotificacao({ mensagem, tipo });
    setTimeout(() => setNotificacao(null), 3000);
  };

  const buscarGrupo = () => {
    const tokenLimpo = token.toUpperCase().trim();
    const grupo = grupos.find(g => g.token === tokenLimpo);
    
    if (grupo) {
      const vagasDisponiveis = grupo.integrantes.filter(integ => !integ.jogador);
      if (vagasDisponiveis.length === 0) {
        mostrarNotificacao("❌ Esta equipe já está completa!", "error");
        return;
      }
      setGrupoEncontrado(grupo);
      setEtapa(2);
      mostrarNotificacao("✅ Token válido! Escolha sua vaga.", "success");
    } else {
      mostrarNotificacao("❌ Token inválido! Verifique e tente novamente.", "error");
    }
  };

  const selecionarVaga = (integranteId) => {
    setVagaSelecionada(integranteId);
    setEtapa(3);
  };

  const criarPersonagem = () => {
    if (!personagemNome.trim()) {
      mostrarNotificacao("❌ Digite o nome do seu personagem!", "error");
      return;
    }
    if (!classeSelecionada) {
      mostrarNotificacao("❌ Selecione uma classe!", "error");
      return;
    }

    // Atualizar o grupo com os dados do jogador
    const grupoAtualizado = {
      ...grupoEncontrado,
      integrantes: grupoEncontrado.integrantes.map(integ => {
        if (integ.id === vagaSelecionada) {
          return {
            ...integ,
            jogador: nomeJogador,
            nome: personagemNome,
            classe: classeSelecionada
          };
        }
        return integ;
      })
    };

    // Atualizar a lista de grupos
    const novosGrupos = grupos.map(g => 
      g.id === grupoEncontrado.id ? grupoAtualizado : g
    );

    onEntrar(novosGrupos);
    mostrarNotificacao(`🎉 ${nomeJogador} entrou na equipe ${grupoEncontrado.nomeGrupo}!`, "success");
    
    // Resetar após 2 segundos
    setTimeout(() => {
      setEtapa(1);
      setToken("");
      setNomeJogador("");
      setGrupoEncontrado(null);
      setVagaSelecionada(null);
      setPersonagemNome("");
      setClasseSelecionada("");
    }, 2000);
  };

  const voltarEtapa = () => {
    if (etapa === 1) {
      onVoltar();
    } else {
      setEtapa(etapa - 1);
      if (etapa === 3) setVagaSelecionada(null);
    }
  };

  const getClasseInfo = (nomeClasse) => {
    return classesDisponiveis.find(c => c.nome === nomeClasse);
  };

  return (
    <div className="player-entry-container">
      <canvas ref={canvasRef} className="particles-canvas" />
      
      {notificacao && (
        <div className={`notificacao ${notificacao.tipo}`}>
          {notificacao.mensagem}
        </div>
      )}

      <div className="entry-card">
        <div className="entry-header">
          <div className="entry-logo">🎮</div>
          <h1>ENTRAR NA EQUIPE</h1>
          <p className="entry-subtitle">Junte-se à aventura em As Crônicas de Umbraeth</p>
        </div>

        <div className="entry-progress">
          <div className={`progress-step ${etapa >= 1 ? 'active' : ''}`}>
            <span className="step-number">1</span>
            <span className="step-label">Token</span>
          </div>
          <div className={`progress-line ${etapa >= 2 ? 'active' : ''}`}></div>
          <div className={`progress-step ${etapa >= 2 ? 'active' : ''}`}>
            <span className="step-number">2</span>
            <span className="step-label">Vaga</span>
          </div>
          <div className={`progress-line ${etapa >= 3 ? 'active' : ''}`}></div>
          <div className={`progress-step ${etapa >= 3 ? 'active' : ''}`}>
            <span className="step-number">3</span>
            <span className="step-label">Personagem</span>
          </div>
        </div>

        <div className="entry-content">
          {/* Etapa 1: Token */}
          {etapa === 1 && (
            <div className="etapa-token">
              <div className="etapa-icon">🔑</div>
              <h2>Digite o Token da Equipe</h2>
              <p>Peça o token ao líder da sua equipe</p>
              <div className="input-group">
                <input
                  type="text"
                  placeholder="Ex: ABCD-1234"
                  value={token}
                  onChange={(e) => setToken(e.target.value.toUpperCase())}
                  className="input-token-grande"
                  maxLength="9"
                  autoFocus
                  onKeyPress={(e) => e.key === 'Enter' && buscarGrupo()}
                />
                <button 
                  className="btn-buscar"
                  onClick={buscarGrupo}
                  disabled={token.length < 9}
                >
                  🔍 Buscar
                </button>
              </div>
              <div className="dica-token">
                <span>💡 O token tem 8 caracteres no formato XXXX-XXXX</span>
              </div>
            </div>
          )}

          {/* Etapa 2: Vaga */}
          {etapa === 2 && grupoEncontrado && (
            <div className="etapa-vaga">
              <div className="etapa-icon">👥</div>
              <h2>Escolha sua Vaga</h2>
              <p className="grupo-nome">🏹 {grupoEncontrado.nomeGrupo}</p>
              <div className="vagas-grid">
                {grupoEncontrado.integrantes.map((integ) => {
                  const ocupado = !!integ.jogador;
                  return (
                    <div
                      key={integ.id}
                      className={`vaga-card ${ocupado ? 'ocupado' : 'disponivel'} ${vagaSelecionada === integ.id ? 'selecionado' : ''}`}
                      onClick={() => !ocupado && selecionarVaga(integ.id)}
                    >
                      <div className="vaga-card-header">
                        <span className="vaga-icone">
                          {integ.isLider ? '👑' : '🛡️'}
                        </span>
                        <span className="vaga-nome">
                          {integ.isLider ? 'Líder' : `Membro ${integ.id}`}
                        </span>
                      </div>
                      <div className="vaga-card-status">
                        {ocupado ? (
                          <span className="status-ocupado">👤 {integ.jogador}</span>
                        ) : (
                          <span className="status-disponivel">✅ Disponível</span>
                        )}
                      </div>
                      {vagaSelecionada === integ.id && !ocupado && (
                        <div className="vaga-selecionada-badge">✓ Selecionada</div>
                      )}
                    </div>
                  );
                })}
              </div>
              <div className="vaga-info">
                <span>📌 Selecione uma vaga disponível para continuar</span>
              </div>
            </div>
          )}

          {/* Etapa 3: Personagem */}
          {etapa === 3 && grupoEncontrado && (
            <div className="etapa-personagem">
              <div className="etapa-icon">⚔️</div>
              <h2>Crie seu Personagem</h2>
              <p className="vaga-selecionada-info">
                🎯 Você está ocupando a vaga de {grupoEncontrado.integrantes.find(i => i.id === vagaSelecionada)?.isLider ? 'Líder' : `Membro ${vagaSelecionada}`}
              </p>

              <div className="form-personagem">
                <div className="campo-personagem">
                  <label>👤 Nome do Jogador</label>
                  <input
                    type="text"
                    placeholder="Seu nome real"
                    value={nomeJogador}
                    onChange={(e) => setNomeJogador(e.target.value)}
                    className="input-personagem"
                  />
                </div>

                <div className="campo-personagem">
                  <label>📜 Nome do Personagem</label>
                  <input
                    type="text"
                    placeholder="Nome do seu herói"
                    value={personagemNome}
                    onChange={(e) => setPersonagemNome(e.target.value)}
                    className="input-personagem"
                  />
                </div>

                <div className="campo-personagem">
                  <label>🎯 Classe</label>
                  <div className="classes-grid">
                    {classesDisponiveis.map((classe) => (
                      <div
                        key={classe.nome}
                        className={`classe-card ${classeSelecionada === classe.nome ? 'selecionada' : ''}`}
                        onClick={() => setClasseSelecionada(classe.nome)}
                        style={{
                          borderColor: classeSelecionada === classe.nome ? classe.cor : 'rgba(168, 85, 247, 0.2)',
                          background: classeSelecionada === classe.nome ? `${classe.cor}15` : 'transparent'
                        }}
                      >
                        <span className="classe-emoji" style={{ color: classe.cor }}>
                          {classe.emoji}
                        </span>
                        <span className="classe-nome">{classe.nome}</span>
                        <span className="classe-descricao">{classe.descricao}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button 
                  className="btn-criar-personagem"
                  onClick={criarPersonagem}
                  disabled={!personagemNome.trim() || !classeSelecionada || !nomeJogador.trim()}
                >
                  🎮 Entrar na Aventura
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="entry-footer">
          <button className="btn-voltar" onClick={voltarEtapa}>
            {etapa === 1 ? '← Voltar' : '← Voltar'}
          </button>
          <div className="entry-status">
            {etapa === 1 && 'Aguardando token...'}
            {etapa === 2 && 'Escolha sua vaga'}
            {etapa === 3 && 'Crie seu personagem'}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlayerEntry;