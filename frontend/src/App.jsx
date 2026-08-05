import { useState } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import './App.css';
import PainelCadastrar from './Pages/PainelCadastrar.jsx';
import InventoryPage from './Pages/InventoryPage.jsx';
import AboutPage from './Pages/AboutPage.jsx';
import TeamPage from './Pages/TeamPage.jsx';
import RpgCharacterSheet from './Pages/RpgCharacterSheet';

// ===== COMPONENTE HOME =====
function HomePage({ equipeCriada, onEquipeCriada }) {
  const navigate = useNavigate();

  const handleCriarEquipe = () => {
    // Marca que a equipe foi criada e redireciona para o cadastro
    onEquipeCriada();
    navigate('/cadastro');
  };

  return (
    <>
      {/* ===== BARRA DE NAVEGAÇÃO ===== */}
      <nav className="barra-navegacao">
        <div className="container-nav">
          <div className="logo-nav">
            {/* <span className="icone-logo">⚔️</span> */}
            <span className="texto-logo">UMBRAETH</span>
            <span className="subtitulo-logo">As Crônicas</span>
          </div>
          <ul className="menu-nav">
            <li><Link to="/cadastro">Cadastro</Link></li>
            <li><Link to="/team">Equipe</Link></li>
            <li><Link to="/about">Sobre</Link></li> 
            <Link to="/rpg" className="botao-rpg">🎲 Ficha RPG</Link> 
          </ul>
          <div className="toggle-nav">☯</div>
        </div>
      </nav>

      {/* ===== SEÇÃO HEROI ===== */}
      <section className="heroi">
        <div className="container-heroi">
          <div className="conteudo-heroi">
            <div className="emblema-heroi">✦ REINO DE UMBRAETH ✦</div>
            <h1>
              <span className="texto-brilhante">As Crônicas</span>
              <br />
              de Umbraeth
            </h1>
            <p className="subtitulo-heroi">
              "Nas sombras do esquecimento, uma era de trevas desperta.
              O destino do reino está em suas mãos, herói."
            </p>
            <div className="botoes-heroi">
              <button className="botao-primario" onClick={handleCriarEquipe}>
                🗡️ Criar Equipe
              </button>
              <button className="botao-secundario" onClick={() => navigate('/about')}>
                📜 A Profecia
              </button>
            </div>
            <div className="estatisticas-heroi">
              <div className="item-estatistica">
                <span className="numero-estatistica">7</span>
                <span className="rotulo-estatistica">Reinos</span>
              </div>
              <div className="divisor-estatistica">|</div>
              <div className="item-estatistica">
                <span className="numero-estatistica">12</span>
                <span className="rotulo-estatistica">Heróis Lendários</span>
              </div>
              <div className="divisor-estatistica">|</div>
              <div className="item-estatistica">
                <span className="numero-estatistica">∞</span>
                <span className="rotulo-estatistica">Aventuras</span>
              </div>
            </div>
          </div>
          <div className="imagem-heroi">
            <div className="moldura-imagem">
              <div className="placeholder-imagem">
                <span className="icone-placeholder">⚔️</span>
                <span className="texto-placeholder">UMBRAETH</span>
                <span className="subtitulo-placeholder">As Crônicas</span>
              </div>
              <div className="sobreposicao-imagem"></div>
              <div className="runas-imagem">ᚠ ᚢ ᚦ ᚨ ᚱ</div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SEÇÃO CARACTERÍSTICAS ===== */}
      <section className="caracteristicas">
        <h2>O Que Te Aguarda em Umbraeth</h2>
        <div className="grade-caracteristicas">
          <div className="cartao-caracteristica">
            <div className="icone-caracteristica">🏰</div>
            <h3>Reinos Sombrios</h3>
            <p>Explore terras esquecidas, castelos amaldiçoados e florestas encantadas</p>
            <div className="runa-caracteristica">ᚲ</div>
          </div>
          <div className="cartao-caracteristica">
            <div className="icone-caracteristica">🐲</div>
            <h3>Criaturas Lendárias</h3>
            <p>Enfrente dragões anciões, demônios das trevas e seres ancestrais</p>
            <div className="runa-caracteristica">ᚷ</div>
          </div>
          <div className="cartao-caracteristica">
            <div className="icone-caracteristica">⚡</div>
            <h3>Magia Ancestral</h3>
            <p>Domine os elementos e desvende os segredos da magia proibida</p>
            <div className="runa-caracteristica">ᚹ</div>
          </div>
        </div>
      </section>

      {/* ===== RODAPÉ ===== */}
      <footer className="rodape">
        <div className="conteudo-rodape">
          <div className="logo-rodape">
            <span>UMBRAETH</span>
            <span className="subtitulo-rodape">As Crônicas</span>
          </div>
          <div className="links-rodape">
            {/* <Link to="/inventory">⚔️ Inventário</Link> */}
            <Link to="/cadastro"> Cadastro</Link>
            <Link to="/team"> Equipe</Link>
            <Link to="/about">Profecia</Link>
          </div>
          <div className="copiar-rodape">
            <p>© 2024 - As Crônicas de Umbraeth - Todos os direitos reservados</p>
            <div className="runas-rodape">ᚠ ᚢ ᚦ ᚨ ᚱ ᚲ ᚷ ᚹ</div>
          </div>
        </div>
      </footer>
    </>
  );
}

// ===== COMPONENTE PROTEGIDO =====
function RotaProtegida({ children, estaLogado, equipeCriada }) {
  // Se não logou e não criou equipe, redireciona para home
  if (!estaLogado && !equipeCriada) {
    return <Login onLogin={() => {}} />;
  }
  // Se criou equipe mas não logou, mostra login
  if (!estaLogado && equipeCriada) {
    return <Login onLogin={() => {}} />;
  }
  // Se logou, mostra o conteúdo
  return children;
}

// ===== COMPONENTE PRINCIPAL =====
function App() {
  const [estaLogado, setEstaLogado] = useState(false);
  const [usuario, setUsuario] = useState(null);
  const [equipeCriada, setEquipeCriada] = useState(false);
  const [dadosEquipe, setDadosEquipe] = useState(null);

  const handleLogin = (dados) => {
    setUsuario(dados);
    setEstaLogado(true);
  };

  const handleLogout = () => {
    setUsuario(null);
    setEstaLogado(false);
    // Não reseta equipeCriada para manter os dados
  };

  const handleEquipeCriada = (dados) => {
    setDadosEquipe(dados);
    setEquipeCriada(true);
  };

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/cadastro" element={<PainelCadastrar />} />
      <Route path="/inventory" element={<InventoryPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/team" element={<TeamPage />} />
      <Route path="/rpg" element={<RpgCharacterSheet />} />
    </Routes>
  );
}

export default App;