import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CriarLogin.css";

function CriarLogin() {
  const navigate = useNavigate();
  const [nome, setNome] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [notificacao, setNotificacao] = useState(null);

  const mostrarNotificacao = (mensagem, tipo = "info") => {
    setNotificacao({ mensagem, tipo });
    setTimeout(() => setNotificacao(null), 3000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!nome.trim()) {
      mostrarNotificacao("❌ Digite seu nome!", "error");
      return;
    }
    if (senha.length < 3) {
      mostrarNotificacao("❌ A senha deve ter pelo menos 3 caracteres!", "error");
      return;
    }
    if (senha !== confirmarSenha) {
      mostrarNotificacao("❌ As senhas não coincidem!", "error");
      return;
    }

    setCarregando(true);
    setTimeout(() => {
      setCarregando(false);
      mostrarNotificacao("🎉 Conta criada com sucesso!", "success");
      setTimeout(() => navigate('/login'), 1500);
    }, 1500);
  };

  return (
    <div className="criar-container">
      <div className="criar-card">
        <div className="criar-header">
          <div className="criar-icone">⚔️</div>
          <h1>Criar Conta</h1>
          <p>Junte-se à aventura em Umbraeth</p>
        </div>

        {notificacao && (
          <div className={`criar-notificacao ${notificacao.tipo}`}>
            {notificacao.mensagem}
          </div>
        )}

        <form onSubmit={handleSubmit} className="criar-form">
          <div className="criar-campo">
            <label>👤 Nome</label>
            <input
              type="text"
              placeholder="Seu nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              disabled={carregando}
            />
          </div>

          <div className="criar-campo">
            <label>🔑 Senha</label>
            <input
              type="password"
              placeholder="Mínimo 3 caracteres"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              disabled={carregando}
            />
          </div>

          <div className="criar-campo">
            <label>✅ Confirmar Senha</label>
            <input
              type="password"
              placeholder="Digite a senha novamente"
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
              disabled={carregando}
            />
          </div>

          <button 
            type="submit" 
            className={`criar-botao ${carregando ? 'carregando' : ''}`}
            disabled={carregando}
          >
            {carregando ? (
              <>
                <span className="criar-spinner"></span>
                Criando conta...
              </>
            ) : (
              <>
                <span>⚔️</span>
                Criar minha lenda
              </>
            )}
          </button>
        </form>

        <div className="criar-login">
          <p>
            Já tem uma conta?{' '}
            <button 
              className="criar-link-login"
              onClick={() => navigate('/Login')}
            >
              Faça login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default CriarLogin;