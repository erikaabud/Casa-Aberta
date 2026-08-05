import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import jsQR from 'jsqr';
import { Camera, QrCode, Upload, CheckCircle, AlertCircle, RefreshCw, Copy, Check, Sparkles, Gift, Shield } from 'lucide-react';
import { WingedSwordEmblem } from './MedievalEmblems';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 16px;
  gap: 20px;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
`;

const ModeSwitch = styled.div`
  display: flex;
  background: #111827;
  border: 1px solid #4a3c1e;
  border-radius: 12px;
  padding: 4px;
  width: 100%;
  gap: 4px;
`;

// 1. Removido o <{ $active: boolean }>
const SwitchBtn = styled.button`
  flex: 1;
  padding: 10px 14px;
  border-radius: 8px;
  background: ${props => props.$active ? 'linear-gradient(135deg, #d4af37 0%, #8a6711 100%)' : 'transparent'};
  color: ${props => props.$active ? '#070b12' : '#a08a5a'};
  border: none;
  font-family: 'Cinzel', serif;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.2s ease;

  &:hover {
    color: ${props => props.$active ? '#070b12' : '#fbe396'};
  }
`;

const ScannerCard = styled.div`
  background: #151515;
  border: 2px solid #d4af37;
  border-radius: 16px;
  padding: 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.8), 0 0 20px rgba(212, 175, 55, 0.15);
  position: relative;
`;

const scanAnimation = keyframes`
  0% { top: 0%; opacity: 0.8; }
  50% { opacity: 1; }
  100% { top: 95%; opacity: 0.8; }
`;

const CameraFrame = styled.div`
  position: relative;
  width: 100%;
  max-width: 320px;
  height: 320px;
  background: #000;
  border-radius: 12px;
  overflow: hidden;
  border: 2px solid #4a3c1e;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const VideoElement = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ScanOverlay = styled.div`
  position: absolute;
  inset: 20px;
  border: 2px dashed rgba(212, 175, 55, 0.6);
  border-radius: 12px;
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ScanLine = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, transparent, #ffd700, transparent);
  box-shadow: 0 0 12px #ffd700;
  animation: ${scanAnimation} 2.5s infinite ease-in-out;
`;

const CornerBracket = styled.div`
  position: absolute;
  width: 24px;
  height: 24px;
  border-color: #ffd700;
  border-style: solid;
  border-width: 0;

  ${props => props.$position === 'tl' && `top: 10px; left: 10px; border-top-width: 3px; border-left-width: 3px;`}
  ${props => props.$position === 'tr' && `top: 10px; right: 10px; border-top-width: 3px; border-right-width: 3px;`}
  ${props => props.$position === 'bl' && `bottom: 10px; left: 10px; border-bottom-width: 3px; border-left-width: 3px;`}
  ${props => props.$position === 'br' && `bottom: 10px; right: 10px; border-bottom-width: 3px; border-right-width: 3px;`}
`;

const StatusText = styled.p`
  font-size: 13px;
  color: #a0aec0;
  margin: 0;
  text-align: center;
  display: flex;
  align-items: center;
  gap: 6px;
`;

const ErrorBox = styled.div`
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid #ef4444;
  border-radius: 8px;
  padding: 12px;
  color: #fca5a5;
  font-size: 13px;
  text-align: center;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

// 2. Removido o <{ $primary?: boolean }>
const ActionButton = styled.button`
  background: ${props => props.$primary ? 'linear-gradient(135deg, #d4af37 0%, #8a6711 100%)' : 'rgba(30, 41, 59, 0.8)'};
  color: ${props => props.$primary ? '#070b12' : '#fbe396'};
  border: 1px solid #d4af37;
  border-radius: 8px;
  padding: 10px 18px;
  font-family: 'Cinzel', serif;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.2s ease;

  &:hover {
    filter: brightness(1.15);
    transform: translateY(-1px);
  }
`;

const ResultCard = styled.div`
  background: rgba(16, 185, 129, 0.1);
  border: 2px solid #10b981;
  border-radius: 12px;
  padding: 16px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  text-align: center;
`;

const ResultTitle = styled.h4`
  color: #34d399;
  font-family: 'Cinzel', serif;
  font-size: 16px;
  font-weight: 800;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 6px;
`;

const ResultContent = styled.div`
  background: #0f172a;
  border: 1px solid #334155;
  border-radius: 8px;
  padding: 10px;
  width: 100%;
  color: #f8fafc;
  font-size: 13px;
  word-break: break-all;
  font-family: monospace;
`;

const HiddenFileInput = styled.input`
  display: none;
`;

const DemoRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
  width: 100%;
  margin-top: 8px;
`;

const DemoChip = styled.button`
  background: rgba(212, 175, 55, 0.1);
  border: 1px solid rgba(212, 175, 55, 0.3);
  color: #fbe396;
  border-radius: 20px;
  padding: 6px 12px;
  font-size: 11px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(212, 175, 55, 0.25);
    border-color: #d4af37;
  }
`;

// Passport view components
const PassportCard = styled.div`
  background: linear-gradient(135deg, #0d1527 0%, #070b13 100%);
  border: 2px solid #d4af37;
  border-radius: 16px;
  padding: 24px;
  width: 100%;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.8);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 16px;
`;

const QrDisplayBox = styled.div`
  background: #ffffff;
  padding: 16px;
  border-radius: 12px;
  border: 3px solid #d4af37;
  box-shadow: 0 0 15px rgba(212, 175, 55, 0.4);
`;

// 3. Interface removida
// 4. Import { CharacterData } removido

// 5. React.FC removido
export const QrScannerView = ({
  character,
  totalPower,
  onAddItem,
  onGainExp,
}) => {
  const [activeMode, setActiveMode] = useState('scan');
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState(null);
  const [scannedResult, setScannedResult] = useState(null);
  const [copied, setCopied] = useState(false);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const animationFrameId = useRef(null);
  const fileInputRef = useRef(null);

  // Start camera stream
  const startCamera = async () => {
    setCameraError(null);
    setScannedResult(null);

    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('A câmera não é suportada neste navegador.');
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 640 }, height: { ideal: 640 } }
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.setAttribute('playsinline', 'true');
        await videoRef.current.play();
        setCameraActive(true);
      }
    } catch (err) {
      console.warn('Camera access error:', err);
      setCameraError(
        err?.message || 'Permissão de câmera negada ou câmera indisponível.'
      );
      setCameraActive(false);
    }
  };

  // Stop camera stream
  const stopCamera = () => {
    if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current);
      animationFrameId.current = null;
    }
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setCameraActive(false);
  };

  // Scan frame loop
  const scanFrame = () => {
    if (!videoRef.current || !canvasRef.current || videoRef.current.readyState !== videoRef.current.HAVE_ENOUGH_DATA) {
      animationFrameId.current = requestAnimationFrame(scanFrame);
      return;
    }

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });

    if (ctx) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const code = jsQR(imageData.data, imageData.width, imageData.height, {
        inversionAttempts: 'dontInvert',
      });

      if (code && code.data) {
        setScannedResult(code.data);
        stopCamera();
        return;
      }
    }

    animationFrameId.current = requestAnimationFrame(scanFrame);
  };

  useEffect(() => {
    if (activeMode === 'scan') {
      startCamera();
    } else {
      stopCamera();
    }

    return () => {
      stopCamera();
    };
  }, [activeMode]);

  useEffect(() => {
    if (cameraActive && !scannedResult) {
      animationFrameId.current = requestAnimationFrame(scanFrame);
    }
  }, [cameraActive, scannedResult]);

  // Handle file upload scanning
  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0);
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const code = jsQR(imageData.data, imageData.width, imageData.height);
          if (code && code.data) {
            setScannedResult(code.data);
          } else {
            alert('Nenhum código QR válido foi encontrado na imagem selecionada.');
          }
        }
      };
      img.src = event.target?.result;
    };
    reader.readAsDataURL(file);
  };

  // Simulate scanning demo code
  const handleDemoScan = (demoText) => {
    setScannedResult(demoText);
    stopCamera();
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClaimReward = () => {
    if (onAddItem) onAddItem();
    if (onGainExp) onGainExp();
    alert('✨ Recompensa de QR Code resgatada com sucesso! Ouro e Itens adicionados ao seu personagem!');
    setScannedResult(null);
    startCamera();
  };

  return (
    <Container>
      <ModeSwitch>
        <SwitchBtn
          $active={activeMode === 'scan'}
          onClick={() => setActiveMode('scan')}
        >
          <Camera size={16} /> Leitor de Câmera
        </SwitchBtn>

        <SwitchBtn
          $active={activeMode === 'passport'}
          onClick={() => setActiveMode('passport')}
        >
          <QrCode size={16} /> Meu Passaporte
        </SwitchBtn>
      </ModeSwitch>

      {/* Hidden canvas for image analysis */}
      <canvas ref={canvasRef} style={{ display: 'none' }} />

      {activeMode === 'scan' && (
        <ScannerCard>
          {!scannedResult ? (
            <>
              <CameraFrame>
                <VideoElement ref={videoRef} />
                {cameraActive && (
                  <ScanOverlay>
                    <CornerBracket $position="tl" />
                    <CornerBracket $position="tr" />
                    <CornerBracket $position="bl" />
                    <CornerBracket $position="br" />
                    <ScanLine />
                  </ScanOverlay>
                )}
                {!cameraActive && !cameraError && (
                  <div style={{ textAlign: 'center', padding: 20 }}>
                    <Camera size={40} color="#a08a5a" style={{ marginBottom: 8 }} />
                    <p style={{ color: '#a08a5a', fontSize: 13, margin: 0 }}>
                      Iniciando câmera...
                    </p>
                  </div>
                )}
              </CameraFrame>

              {cameraError && (
                <ErrorBox>
                  <AlertCircle size={20} color="#ef4444" />
                  <span>{cameraError}</span>
                  <ActionButton onClick={startCamera}>
                    <RefreshCw size={14} /> Tentar Novamente
                  </ActionButton>
                </ErrorBox>
              )}

              <StatusText>
                <Sparkles size={14} color="#ffd700" />
                Aproxime a câmera de um QR Code externo para ler
              </StatusText>

              <DemoRow>
                <ActionButton onClick={() => fileInputRef.current?.click()}>
                  <Upload size={14} /> Enviar Imagem QR
                </ActionButton>
                <HiddenFileInput
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                />
              </DemoRow>

              <div style={{ width: '100%', textAlign: 'center', marginTop: 8 }}>
                <p style={{ fontSize: 11, color: '#a08a5a', marginBottom: 6 }}>
                  Códigos de Teste Rápido (Demonstração):
                </p>
                <DemoRow>
                  <DemoChip onClick={() => handleDemoScan('RPG_ITEM_REWARD_EPIC_AMULET_2026')}>
                    <Gift size={12} /> Amuleto Épico
                  </DemoChip>
                  <DemoChip onClick={() => handleDemoScan('RPG_QUEST_KEY_DRAGON_CAVE')}>
                    <Shield size={12} /> Chave de Missão
                  </DemoChip>
                  <DemoChip onClick={() => handleDemoScan('https://meurpg.com/passaporte/12345')}>
                    <QrCode size={12} /> URL Externa
                  </DemoChip>
                </DemoRow>
              </div>
            </>
          ) : (
            <ResultCard>
              <ResultTitle>
                <CheckCircle size={20} /> QR CODE LIDO COM SUCESSO!
              </ResultTitle>

              <ResultContent>{scannedResult}</ResultContent>

              <div style={{ display: 'flex', gap: 10, width: '100%', flexWrap: 'wrap' }}>
                {scannedResult.startsWith('RPG_') && (
                  <ActionButton $primary style={{ flex: 1 }} onClick={handleClaimReward}>
                    <Gift size={16} /> Resgatar Recompensa
                  </ActionButton>
                )}

                <ActionButton style={{ flex: 1 }} onClick={() => handleCopy(scannedResult)}>
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                  {copied ? 'Copiado!' : 'Copiar Texto'}
                </ActionButton>

                <ActionButton style={{ flex: '1 0 100%' }} onClick={() => { setScannedResult(null); startCamera(); }}>
                  <RefreshCw size={14} /> Escanear Outro QR Code
                </ActionButton>
              </div>
            </ResultCard>
          )}
        </ScannerCard>
      )}

      {activeMode === 'passport' && (
        <PassportCard>
          <WingedSwordEmblem size={54} />
          <h3 style={{ fontFamily: 'Cinzel, serif', color: '#fbe396', margin: 0, textTransform: 'uppercase' }}>
            Seu QR Code do Personagem
          </h3>

          <QrDisplayBox>
            <svg width="180" height="180" viewBox="0 0 100 100" fill="#070b12">
              <rect width="100" height="100" fill="#ffffff" />
              <rect x="5" y="5" width="25" height="25" fill="#070b12" />
              <rect x="10" y="10" width="15" height="15" fill="#ffffff" />
              <rect x="13" y="13" width="9" height="9" fill="#070b12" />
              <rect x="70" y="5" width="25" height="25" fill="#070b12" />
              <rect x="75" y="10" width="15" height="15" fill="#ffffff" />
              <rect x="78" y="13" width="9" height="9" fill="#070b12" />
              <rect x="5" y="70" width="25" height="25" fill="#070b12" />
              <rect x="10" y="75" width="15" height="15" fill="#ffffff" />
              <rect x="13" y="78" width="9" height="9" fill="#070b12" />
              <rect x="35" y="10" width="10" height="10" fill="#070b12" />
              <rect x="50" y="5" width="5" height="15" fill="#070b12" />
              <rect x="40" y="25" width="15" height="5" fill="#070b12" />
              <rect x="10" y="35" width="20" height="5" fill="#070b12" />
              <rect x="35" y="40" width="30" height="20" fill="#070b12" />
              <rect x="45" y="45" width="10" height="10" fill="#ffffff" />
              <rect x="70" y="35" width="20" height="15" fill="#070b12" />
              <rect x="75" y="55" width="15" height="10" fill="#070b12" />
              <rect x="35" y="70" width="15" height="20" fill="#070b12" />
              <rect x="55" y="75" width="25" height="15" fill="#070b12" />
            </svg>
          </QrDisplayBox>

          <div>
            <h2 style={{ fontFamily: 'Cinzel, serif', color: '#ffffff', margin: '0 0 4px 0', fontSize: 18 }}>
              {character.name}
            </h2>
            <div style={{ color: '#d4af37', fontSize: 13, fontWeight: 700 }}>
              {character.class} • Nível {character.level}
            </div>
            <div style={{
              background: 'rgba(212, 175, 55, 0.15)',
              border: '1px solid #d4af37',
              borderRadius: 8,
              padding: '6px 14px',
              color: '#fbe396',
              fontFamily: 'Cinzel, serif',
              fontSize: 13,
              fontWeight: 700,
              marginTop: 8
            }}>
              PODER TOTAL: {totalPower.toLocaleString('pt-BR')}
            </div>
          </div>

          <ActionButton style={{ width: '100%' }} onClick={() => handleCopy(window.location.href)}>
            {copied ? <Check size={14} /> : <Copy size={14} />}
            {copied ? 'Link Copiado!' : 'Copiar Link do Passaporte'}
          </ActionButton>
        </PassportCard>
      )}
    </Container>
  );
};