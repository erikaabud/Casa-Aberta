import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './InventoryPage.css';

// Dados dos itens baseados na lore de Umbraeth
const mockItems = [
  {
    id: 1,
    name: 'Fragmento de Nex-Mortis',
    rarity: 'Lendário',
    category: 'Artefato',
    description: 'Um pedaço da árvore negra que pulsa com energia ancestral. Dizem que quem o toca pode vislumbrar o futuro.',
    collected: true,
    location: 'Trono Esquecido',
    mark: '#NEX-01'
  },
  {
    id: 2,
    name: 'Carta do Rei Vazio',
    rarity: 'Épico',
    category: 'Pista',
    description: 'Uma carta escrita com sangue de dragão. Revela os planos do Rei Vazio para mergulhar o mundo na escuridão eterna.',
    collected: true,
    location: 'Abismo Escarlate',
    mark: '#VOID-07'
  },
  {
    id: 3,
    name: 'Cinzas da Aldeia',
    rarity: 'Raro',
    category: 'Item',
    description: 'As cinzas da sua antiga casa. Um lembrete doloroso do que foi perdido para o Rei Vazio.',
    collected: true,
    location: 'Reino das Cinzas',
    mark: '#ASH-03'
  },
  {
    id: 4,
    name: 'Selo de Velkar',
    rarity: 'Épico',
    category: 'Chave',
    description: 'Um selo antigo da cidade afundada. Permite acesso aos salões proibidos onde a verdade está enterrada.',
    collected: false,
    location: 'Cidade Afundada de Velkar',
    mark: '#VEL-09'
  },
  {
    id: 5,
    name: 'Lágrima de Umbral',
    rarity: 'Lendário',
    category: 'Artefato',
    description: 'Uma gema negra que contém a essência da Noite Eterna. Dizem que pode abrir portais para outras dimensões.',
    collected: false,
    location: 'Floresta dos Sussurros',
    mark: '#UMB-05'
  },
  {
    id: 6,
    name: 'Mapa dos Deuses',
    rarity: 'Épico',
    category: 'Pista',
    description: 'Um mapa que mostra a localização dos deuses desaparecidos. Será que ainda há esperança?',
    collected: false,
    location: 'Trono Esquecido',
    mark: '#MAP-42'
  }
];

const InventoryPage = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState(mockItems);
  const [selectedItem, setSelectedItem] = useState(items[0]);
  const [filter, setFilter] = useState('Todos');

  // Filtro de itens
  const filteredItems = filter === 'Todos' 
    ? items 
    : items.filter(item => item.category === filter);

  // Estatísticas de progresso
  const totalItems = items.length;
  const collectedItems = items.filter(item => item.collected).length;
  const progress = Math.round((collectedItems / totalItems) * 100);

  // Categorias únicas para filtro
  const categories = ['Todos', ...new Set(items.map(item => item.category))];

  // Função para coletar item (simulação)
  const handleCollectItem = (itemId) => {
    setItems(items.map(item => 
      item.id === itemId ? { ...item, collected: !item.collected } : item
    ));
  };

  // Função para ir ao AR (simulação)
  const handleOpenAR = () => {
    alert('🎮 Abrindo Painel AR para escanear marcadores...');
  };

  return (
    <div className="inventory-container">
      {/* ===== NAVBAR - IGUAL AO APP.CSS ===== */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo">
            {/* <span className="logo-icon">⚔️</span> */}
            <span className="logo-text">UMBRAETH</span>
            <span className="logo-subtitle">As Crônicas</span>
          </div>
          <ul className="nav-menu">
            <li>
              <button className="nav-btn" onClick={() => navigate('/')}>
                Início
              </button>
            </li>
            <li>
              <button className="nav-btn" onClick={() => navigate('/cadastro')}>
                Cadastro
              </button>
            </li>
            <li>
              <button className="nav-btn" onClick={() => navigate('/about')}>
                Sobre
              </button>
            </li>
            <li>
              <button className="nav-btn nav-btn-ar" onClick={handleOpenAR}>
                AR
              </button>
            </li>
          </ul>
          <div className="nav-toggle">☯</div>
        </div>
      </nav>

      {/* ===== HERO PROGRESS ===== */}
      <div className="inventory-hero">
        <div className="hero-content">
          <h1>
            <span className="glow-text">Inventário</span>
            <br />
            <span className="subtitle">do Portador das Cinzas</span>
          </h1>
          <div className="progress-container">
            <div className="progress-stats">
              <div className="stat-item">
                <span className="stat-number">{collectedItems}</span>
                <span className="stat-label">Itens Coletados</span>
              </div>
              <div className="stat-divider">|</div>
              <div className="stat-item">
                <span className="stat-number">{totalItems}</span>
                <span className="stat-label">Total de Itens</span>
              </div>
              <div className="stat-divider">|</div>
              <div className="stat-item">
                <span className="stat-number">{progress}%</span>
                <span className="stat-label">Progresso</span>
              </div>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${progress}%` }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== MAIN CONTENT ===== */}
      <div className="inventory-main">
        {/* Left: Item List */}
        <div className="item-list-panel">
          <div className="panel-header">
            <h2>📦 Evidências Coletadas</h2>
            <div className="filter-group">
              {categories.map(cat => (
                <button 
                  key={cat}
                  className={`filter-btn ${filter === cat ? 'active' : ''}`}
                  onClick={() => setFilter(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
          <div className="items-list">
            {filteredItems.map((item) => (
              <div 
                key={item.id}
                className={`item-card ${item.collected ? 'collected' : 'locked'} ${selectedItem?.id === item.id ? 'selected' : ''}`}
                onClick={() => setSelectedItem(item)}
              >
                <div className="item-status-icon">
                  {item.collected ? '✅' : '🔒'}
                </div>
                <div className="item-info">
                  <div className="item-name">{item.name}</div>
                  <div className="item-meta">
                    <span className={`item-rarity ${item.rarity.toLowerCase()}`}>
                      {item.rarity}
                    </span>
                    <span className="item-category">{item.category}</span>
                  </div>
                </div>
                <div className="item-location">
                  {item.location}
                </div>
              </div>
            ))}
          </div>
          <div className="panel-footer">
            <span>⚔️ {filteredItems.length} itens encontrados</span>
          </div>
        </div>

        {/* Right: Detail Panel */}
        <div className="detail-panel">
          {selectedItem ? (
            <>
              <div className="detail-header">
                <h3>🔍 Detalhes do Item</h3>
                <button 
                  className="collect-btn"
                  onClick={() => handleCollectItem(selectedItem.id)}
                >
                  {selectedItem.collected ? '📤 Remover' : '📥 Coletar'}
                </button>
              </div>
              <div className="detail-content">
                <div className="detail-rarity">
                  <span className={`rarity-badge ${selectedItem.rarity.toLowerCase()}`}>
                    {selectedItem.rarity}
                  </span>
                  <span className="detail-category">{selectedItem.category}</span>
                </div>
                <h2 className="detail-name">{selectedItem.name}</h2>
                <p className="detail-description">{selectedItem.description}</p>
                <div className="detail-meta">
                  <div className="meta-item">
                    <span className="meta-label">📍 Localização</span>
                    <span className="meta-value">{selectedItem.location}</span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-label">🔖 Marcador AR</span>
                    <span className="meta-value">{selectedItem.mark}</span>
                  </div>
                  <div className="meta-item">
                    <span className="meta-label">📊 Status</span>
                    <span className={`meta-value ${selectedItem.collected ? 'collected' : 'locked'}`}>
                      {selectedItem.collected ? '✅ Coletado' : '🔒 Bloqueado'}
                    </span>
                  </div>
                </div>
                {selectedItem.collected && (
                  <div className="detail-actions">
                    <button className="btn-primary">📖 Ler Pista Completa</button>
                    <button className="btn-secondary">🔮 Escanear AR</button>
                  </div>
                )}
                <div className="detail-lore">
                  <p className="lore-text">
                    <span className="lore-icon">📜</span>
                    "Este item guarda segredos antigos que podem mudar o destino de Umbraeth."
                  </p>
                </div>
              </div>
            </>
          ) : (
            <div className="detail-empty">
              <span className="empty-icon">🗡️</span>
              <h3>Nenhum item selecionado</h3>
              <p>Escolha um item da lista para ver seus detalhes</p>
            </div>
          )}
        </div>
      </div>

      {/* ===== FOOTER ===== */}
      <footer className="inventory-footer">
        <div className="footer-content">
          <span>⚔️ As Crônicas de Umbraeth - Inventário do Herói</span>
          <div className="footer-runes">ᚠ ᚢ ᚦ ᚨ ᚱ ᚲ ᚷ ᚹ</div>
        </div>
      </footer>
    </div>
  );
};

export default InventoryPage;