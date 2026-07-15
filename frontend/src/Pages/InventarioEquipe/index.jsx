import React, { useState, useEffect } from 'react';
import { useInventory } from './hooks/useInventory';
import InventarioPage from './components/InventarioPage';
import { LoadingSpinner, EmptyState } from '../../components/Shared';
import './InventoryPage.css';

const InventarioPage = ({ teamId, onItemCollect, isEditable = true }) => {
  const [viewMode, setViewMode] = useState('grid'); // grid | list
  const [selectedCategory, setSelectedCategory] = useState(null);
  
  const {
    items,
    loading,
    error,
    stats,
    fetchInventory,
    collectItem,
    filterItems
  } = useInventory(teamId);

  useEffect(() => {
    if (teamId) {
      fetchInventory();
    }
  }, [teamId]);

  const handleCollect = async (itemId) => {
    const success = await collectItem(itemId);
    if (success && onItemCollect) {
      onItemCollect(itemId);
    }
  };

  // Categorias para navegação rápida
  const categories = [...new Set(items.map(item => item.category))].filter(Boolean);

  if (loading) {
    return (
      <div className="inventory-page">
        <LoadingSpinner message="Carregando inventário..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="inventory-page">
        <div className="inventory-error">
          <span className="error-icon">⚠️</span>
          <h3>Erro ao carregar inventário</h3>
          <p>{error}</p>
          <button onClick={fetchInventory} className="btn-retry">
            Tentar novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="inventory-page">
      {/* Header da Página */}
      <div className="page-header">
        <div className="header-left">
          <h1>📦 Inventário da Equipe</h1>
          <span className="page-subtitle">
            Gerencie os itens coletados pela sua equipe
          </span>
        </div>
        <div className="header-right">
          <div className="view-toggle">
            <button 
              className={`btn-view ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
              title="Visualização em grade"
            >
              ▦
            </button>
            <button 
              className={`btn-view ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')}
              title="Visualização em lista"
            >
              ☰
            </button>
          </div>
          <button 
            className="btn-refresh" 
            onClick={fetchInventory}
            disabled={loading}
          >
            🔄 Atualizar
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stats-cards">
        <div className="stat-card">
          <span className="stat-icon">📦</span>
          <div className="stat-info">
            <span className="stat-value">{stats.total}</span>
            <span className="stat-label">Total de Itens</span>
          </div>
        </div>
        <div className="stat-card">
          <span className="stat-icon">✅</span>
          <div className="stat-info">
            <span className="stat-value">{stats.collected}</span>
            <span className="stat-label">Coletados</span>
          </div>
        </div>
        <div className="stat-card">
          <span className="stat-icon">📊</span>
          <div className="stat-info">
            <span className="stat-value">{stats.collectionRate || '0%'}</span>
            <span className="stat-label">Taxa de Coleta</span>
          </div>
        </div>
        <div className="stat-card">
          <span className="stat-icon">🔒</span>
          <div className="stat-info">
            <span className="stat-value">{stats.blocked || 0}</span>
            <span className="stat-label">Bloqueados</span>
          </div>
        </div>
      </div>

      {/* Categorias Rápidas */}
      {categories.length > 0 && (
        <div className="category-nav">
          <button 
            className={`category-btn ${!selectedCategory ? 'active' : ''}`}
            onClick={() => setSelectedCategory(null)}
          >
            Todos
          </button>
          {categories.map(cat => (
            <button 
              key={cat}
              className={`category-btn ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* Painel do Inventário */}
      <InventoryPanel
        items={items}
        stats={stats}
        viewMode={viewMode}
        selectedCategory={selectedCategory}
        onCollect={handleCollect}
        onFilter={filterItems}
        isEditable={isEditable}
      />
    </div>
  );
};

export default InventarioPage;