import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import { useNavigate } from 'react-router-dom'
import PainelCadastrar from './Pages/Cadastro/PainelCadastrar'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const navigate = useNavigate()
  const [showCadastro, setShowCadastro] = useState(false)
  const handleStartJourney = () => setShowCadastro(true)

  if (showCadastro) return <PainelCadastrar />

  return (
    <>
      {/* Navbar */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo">
            <span className="logo-icon">⚔️</span>
            <span className="logo-text">UMBRAETH</span>
            <span className="logo-subtitle">As Crônicas</span>
          </div>
          <ul className="nav-menu">
           
            <li><a href="#contato">📖 Contato</a></li>
          </ul>
          <div className="nav-toggle">☯</div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-badge">✦ REINO DE UMBRAETH ✦</div>
            <h1>
              <span className="glow-text">As Crônicas</span>
              <br />
              de Umbraeth
            </h1>
            <p className="hero-subtitle">
              "Nas sombras do esquecimento, uma era de trevas desperta.
              O destino do reino está em suas mãos, herói."
            </p>
            <div className="hero-buttons">
              <button className="btn-primary" onClick={handleStartJourney}>
                🗡️ Iniciar Jornada {count > 0 && `(${count})`}
              </button>
              <button className="btn-secondary">
                📜 O Profecia
              </button>
            </div>
            <div className="hero-stats">
              <div className="stat-item">
                <span className="stat-number">7</span>
                <span className="stat-label">Reinos</span>
              </div>
              <div className="stat-divider">|</div>
              <div className="stat-item">
                <span className="stat-number">12</span>
                <span className="stat-label">Heróis Lendários</span>
              </div>
              <div className="stat-divider">|</div>
              <div className="stat-item">
                <span className="stat-number">∞</span>
                <span className="stat-label">Aventuras</span>
              </div>
            </div>
          </div>
          <div className="hero-image">
            <div className="hero-image-frame">
              <img src={heroImg} alt="Umbraeth" />
              <div className="image-overlay"></div>
              <div className="image-runes">ᚠ ᚢ ᚦ ᚨ ᚱ</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2>⚔️ O Que Te Aguarda em Umbraeth</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🏰</div>
            <h3>Reinos Sombrios</h3>
            <p>Explore terras esquecidas, castelos amaldiçoados e florestas encantadas</p>
            <div className="feature-rune">ᚲ</div>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🐲</div>
            <h3>Criaturas Lendárias</h3>
            <p>Enfrente dragões anciões, demônios das trevas e seres ancestrais</p>
            <div className="feature-rune">ᚷ</div>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>Magia Ancestral</h3>
            <p>Domine os elementos e desvende os segredos da magia proibida</p>
            <div className="feature-rune">ᚹ</div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-logo">
            <span>⚔️ UMBRAETH</span>
            <span className="footer-sub">As Crônicas</span>
          </div>
          <div className="footer-links">
            <a href="#">📜 Profecia</a>
            <a href="#">⚔️ Guerrear</a>
            <a href="#">🔮 Magia</a>
            <a href="#">🐉 Bestiário</a>
          </div>
          <div className="footer-copy">
            <p>© 2024 - As Crônicas de Umbraeth - Todos os direitos reservados aos senhores das trevas</p>
            <div className="footer-runes">ᚠ ᚢ ᚦ ᚨ ᚱ ᚲ ᚷ ᚹ</div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default App