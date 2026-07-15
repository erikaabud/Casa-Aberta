// src/pages/Inventory/components/InventoryPanel.jsx
import React, { useState } from 'react';
import ItemCard from './ItemCard';
import InventarioFiltro from './InventarioFiltro';
import { EmptyState } from '../../../components/Shared';
import './InventarioPainel.css';

const InventarioPainel= ({ 
  items, 
  stats, 
  viewMode = 'grid',
  selectedCategory = null,
  onCollect, 
  onFilter,
  isEditable = true 
}) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [filters, setFilters] = useState({
    rarity: '',
    category: '',
    collected: 'all',
    search: ''
  });

  // Aplica filtros
  const filteredItems = items.filter(item => {
    // Filtro de categoria
    if (selectedCategory && item.category !== selectedCategory) return false;
    
    // Filtro de raridade
    if (filters.rarity && item.rarity?.toLowerCase() !== filters.rarity.toLowerCase()) {
      return false;
    }
    
    // Filtro de categoria
    if (filters.category && item.category?.toLowerCase() !== filters.category.toLowerCase()) {
      return false;
    }
    
    // Filtro de status
    if (filters.collected === 'collected' && !item.collected) return false;
    if (filters.collected === 'available' && (item.collected || item.blocked)) return false;
    if (filters.collected === 'blocked' && !item.blocked) return false;
    
    // Filtro de busca
    if (filters.search) {
      const search = filters.search.toLowerCase();
      const nameMatch = item.name?.toLowerCase().includes(search);
      const descMatch = item.description?.toLowerCase().includes(search);
      if (!nameMatch && !descMatch) return false;
    }
    
    return true;
  });

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    onFilter(newFilters);
  };

  const handleItemClick = (item) => {
    setSelectedItem(selectedItem?.id === item.id ? null : item);
  };

  if (filteredItems.length === 0) {
    return (
      <div className="inventory-panel">
        <InventoryFilters
          filters={filters}
          onFilterChange={handleFilterChange}
        />
        <EmptyState
          icon="🔍"
          title="Nenhum item encontrado"
          description="Tente ajustar os filtros ou coletar novos itens"
        />
      </div>
    );
  }

  return (
    <div className="inventory-panel">
      <InventoryFilters
        filters={filters}
        onFilterChange={handleFilterChange}
      />

      <div className={`inventory-grid ${viewMode === 'list' ? 'list-view' : ''}`}>
        {filteredItems.map((item) => (
          <ItemCard
            key={item.id}
            item={item}
            onCollect={onCollect}
            onSelect={handleItemClick}
            isSelected={selectedItem?.id === item.id}
            isEditable={isEditable}
            viewMode={viewMode}
          />
        ))}
      </div>

      {/* Item Details Modal */}
      {selectedItem && (
        <div className="item-details-modal" onClick={() => setSelectedItem(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedItem(null)}>
              ✕
            </button>
            <ItemDetails item={selectedItem} />
          </div>
        </div>
      )}
    </div>
  );
};

// Subcomponente de detalhes
const ItemDetails = ({ item }) => (
  <div className="item-details">
    <div className="detail-icon">{item.icon || '📦'}</div>
    <h3>{item.name}</h3>
    <div className="detail-tags">
      <span className={`detail-rarity rarity-${item.rarity?.toLowerCase() || 'comum'}`}>
        {item.rarity || 'Comum'}
      </span>
      <span className="detail-category">{item.category || 'Sem categoria'}</span>
    </div>
    <p className="detail-description">{item.description || 'Sem descrição'}</p>
    <div className="detail-info">
      <div>
        <span className="detail-label">Status:</span>
        <span className={`detail-status ${item.collected ? 'collected' : 'available'}`}>
          {item.collected ? '✅ Coletado' : '📥 Disponível'}
        </span>
      </div>
      {item.marker && (
        <div>
          <span className="detail-label">Marcador:</span>
          <span className="detail-marker">{item.marker}</span>
        </div>
      )}
      {item.quantity > 1 && (
        <div>
          <span className="detail-label">Quantidade:</span>
          <span className="detail-quantity">×{item.quantity}</span>
        </div>
      )}
    </div>
  </div>
);

export default InventarioPainel;