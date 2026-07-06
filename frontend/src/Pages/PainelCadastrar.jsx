import "./PainelCadastrar.css";

function PainelCadastrar() {
  return (
    <div className="painel-container">
      <h1 className="titulo">AS CRÔNICAS DE UMBRAETH</h1>
      <h2 className="subtitulo">Cadastro da Equipe</h2>

      <div className="card-cadastro">
        {[1, 2, 3, 4].map((membro) => (
          <div key={membro} className="membro-card">
            <h3>Integrante {membro}</h3>

            <input
              type="text"
              placeholder="Nome do personagem"
              className="campo"
            />

            <select className="campo">
              <option>Selecione a Classe</option>
              <option>Guerreiro Sombrio</option>
              <option>Mago das Sombras</option>
              <option>Caçador de Espectros</option>
              <option>Necromante</option>
            </select>

            <select className="campo">
              <option>Selecione a Raça</option>
              <option>Humano</option>
              <option>Elfo Obscuro</option>
              <option>Anão Rúnico</option>
              <option>Filho do Vazio</option>
            </select>
          </div>
        ))}

        <button className="btn-cadastrar">
          Registrar Equipe
        </button>
      </div>
    </div>
  );
}

export default PainelCadastrar;