import { useState, useEffect, useRef } from "react";
import "./Login.css";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [lembrar, setLembrar] = useState(false);
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [notificacao, setNotificacao] = useState(null);
  const [carregando, setCarregando] = useState(false);
  const canvasRef = useRef(null);

  // Sistema de partículas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particleArray = [];
    for (let i = 0; i < 100; i++) {
      particleArray.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.3 + 0.1,
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
        ctx.fillStyle = `rgba(212, 165, 116, ${p.opacity})`;
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

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!email.trim()) {
      mostrarNotificacao("❌ Digite seu e-mail!", "error");
      return;
    }
    if (!senha.trim()) {
      mostrarNotificacao("❌ Digite sua senha!", "error");
      return;
    }

    setCarregando(true);

    // Simulação de login
    setTimeout(() => {
      setCarregando(false);
      
      // Login simulado - aceita qualquer email/senha com validação básica
      if (email.includes('@') && senha.length >= 3) {
        mostrarNotificacao("🎉 Bem-vindo às Crônicas de Umbraeth!", "success");
        
        // Salvar preferência de lembrar
        if (lembrar) {
          localStorage.setItem('umbraeth_email', email);
        }
        
        // Chamar callback de sucesso
        if (onLogin) {
          onLogin({ email });
        }
      } else {
        mostrarNotificacao("❌ E-mail ou senha inválidos!", "error");
      }
    }, 1500);
  };

  // Carregar email salvo
  useEffect(() => {
    const emailSalvo = localStorage.getItem('umbraeth_email');
    if (emailSalvo) {
      setEmail(emailSalvo);
      setLembrar(true);
    }
  }, []);

  return (
    <div className="login-container">
      <canvas ref={canvasRef} className="login-particles" />
      
      {notificacao && (
        <div className={`login-notificacao ${notificacao.tipo}`}>
          {notificacao.mensagem}
        </div>
      )}

      <div className="login-card">
        {/* Selo/Emblema */}
        <div className="login-emblema">
          <div className="login-emblema-icone">⚔️</div>
          <div className="login-emblema-texto">AS CRÔNICAS DE</div>
          <div className="login-emblema-destaque">UMBRAETH</div>
          <div className="login-emblema-runa">ᚠ ᚢ ᚦ ᚨ ᚱ ᚲ</div>
        </div>

        <div className="login-divisor">
          <span>✦</span>
        </div>

        <h2 className="login-titulo">Entrar na Jornada</h2>
        <p className="login-subtitulo">Aventureiro, a escuridão te aguarda...</p>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="login-campo">
            <label htmlFor="email">📧 E-mail</label>
            <input
              id="email"
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="login-input"
              disabled={carregando}
            />
            <span className="login-campo-runa">ᚨ</span>
          </div>

          <div className="login-campo">
            <label htmlFor="senha">🔑 Senha</label>
            <div className="login-senha-wrapper">
              <input
                id="senha"
                type={mostrarSenha ? "text" : "password"}
                placeholder="Sua senha secreta"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                className="login-input login-input-senha"
                disabled={carregando}
              />
              <button
                type="button"
                className="login-toggle-senha"
                onClick={() => setMostrarSenha(!mostrarSenha)}
                disabled={carregando}
              >
                {mostrarSenha ? "👁️" : "👁️‍🗨️"}
              </button>
              <span className="login-campo-runa">ᚲ</span>
            </div>
          </div>

          <div className="login-opcoes">
            <label className="login-lembrar">
              <input
                type="checkbox"
                checked={lembrar}
                onChange={(e) => setLembrar(e.target.checked)}
                disabled={carregando}
              />
              <span>Lembrar de mim</span>
            </label>
            <a href="#" className="login-esqueceu-senha">
              Esqueceu a senha?
            </a>
          </div>

          <button 
            type="submit" 
            className={`login-botao ${carregando ? 'carregando' : ''}`}
            disabled={carregando}
          >
            {carregando ? (
              <>
                <span className="login-spinner"></span>
                Forjando entrada...
              </>
            ) : (
              <>
                <span>⚔️</span>
                Entrar na Aventura
              </>
            )}
          </button>
        </form>

        <div className="login-divisor">
          <span>✦</span>
        </div>

        <div className="login-cadastro">
          <p>
            Ainda não é um herói?{' '}
            <a href="#" className="login-link-cadastro">
              Crie sua lenda
            </a>
          </p>
        </div>

        <div className="login-runas">
          <span>ᚠ ᚢ ᚦ ᚨ ᚱ ᚲ</span>
        </div>

        <div className="login-versao">
          v1.0.0 • As Crônicas de Umbraeth
        </div>
      </div>
    </div>
  );
}

export default Login;