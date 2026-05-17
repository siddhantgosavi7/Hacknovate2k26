import { useMemo, useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, CheckCircle2, ImageUp, Loader2, Mic2, Recycle, ScanLine, Sparkles, Trash2, Zap } from 'lucide-react';
import SectionHeader from '../components/SectionHeader.jsx';
import { GlassCard, IconBadge, PillButton, ProgressBar } from '../components/UI.jsx';
import { detectionResult as mockDetectionResult } from '../data/mockData.js';
import api from '../api.js';
import { useTranslation } from '../contexts/TranslationContext.jsx';
import { useAuth } from '../contexts/AuthContext.jsx';

export default function WasteScanner({ onToast }) {
  const { t } = useTranslation();
  const { isAuthenticated, earnEcoCoins } = useAuth();
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const [preview, setPreview] = useState('');
  const [scanning, setScanning] = useState(false);
  const [resultVisible, setResultVisible] = useState(true);
  const [itemCount, setItemCount] = useState(12);
  const [result, setResult] = useState(mockDetectionResult);
  const [isCameraActive, setIsCameraActive] = useState(false);

  useEffect(() => {
    return () => {
      // Cleanup camera on unmount
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const carbonSaved = useMemo(() => (itemCount * 0.18).toFixed(2), [itemCount]);

  const handleFile = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));
    setScanning(true);
    setResultVisible(false);

    try {
      const formData = new FormData();
      formData.append('image', file);
      const res = await api.post('/waste-scans/upload', formData);
      setResult(res.data.data.detectionResult);
      onToast(t('scanner.toastScanComplete'), `${res.data.data.detectionResult.wasteType} detected.`);
      if (isAuthenticated) {
        await earnEcoCoins('scan', t('scanner.toastCoins'));
      }
    } catch (error) {
      console.error('Scan error:', error);
      onToast(t('scanner.toastScanFailed'), t('scanner.toastScanFailedText'));
      setResult(mockDetectionResult);
    } finally {
      setScanning(false);
      setResultVisible(true);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setIsCameraActive(false);
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setIsCameraActive(true);
      setPreview(''); // clear previous preview
    } catch (err) {
      console.error('Camera access denied:', err);
      onToast(t('scanner.toastCameraFailed'), t('scanner.toastCameraFailedText'));
    }
  };

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;
    
    const video = videoRef.current;
    const canvas = canvasRef.current;
    
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    // Stop camera stream immediately
    stopCamera();
    
    // Convert to blob and process
    canvas.toBlob((blob) => {
      if (!blob) return;
      const file = new File([blob], 'capture.jpg', { type: 'image/jpeg' });
      // Reuse the handleFile logic
      const fakeEvent = { target: { files: [file] } };
      handleFile(fakeEvent);
    }, 'image/jpeg', 0.9);
  };

  const handleCameraToggle = () => {
    if (isCameraActive) {
      capturePhoto();
    } else {
      startCamera();
    }
  };

  return (
    <section id="scanner" className="px-4 py-20">
      <div className="mx-auto max-w-7xl">
        <SectionHeader
          eyebrow={t('scanner.eyebrow')}
          title={t('scanner.title')}
          text={t('scanner.text')}
        />

        <div className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
          <GlassCard className="overflow-hidden p-0">
            <div className="relative min-h-[30rem] bg-gradient-to-br from-ink-950 via-eco-900 to-eco-500 p-5 text-white">
              <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.16),rgba(255,255,255,0)_48%)]" />
              <div className="relative flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-black uppercase tracking-[0.24em] text-eco-100">{t('scanner.visionModel')}</p>
                  <h3 className="mt-2 text-3xl font-black">{t('scanner.livePreview')}</h3>
                </div>
                <div className="flex gap-2">
                  <PillButton variant="secondary" onClick={() => { stopCamera(); fileInputRef.current?.click(); }} className="border-white/20 bg-white/12 text-white hover:bg-white/18">
                    <ImageUp className="h-5 w-5" />
                    Upload
                  </PillButton>
                  <PillButton 
                    variant={isCameraActive ? "primary" : "secondary"} 
                    onClick={handleCameraToggle} 
                    className={isCameraActive ? "border-transparent bg-eco-500 text-white hover:bg-eco-600" : "border-white/20 bg-white/12 text-white hover:bg-white/18"}
                  >
                    <Camera className="h-5 w-5" />
                    {isCameraActive ? t('scanner.capture') : t('scanner.camera')}
                  </PillButton>
                  {isCameraActive && (
                    <PillButton variant="secondary" onClick={stopCamera} className="border-white/20 bg-white/12 text-white hover:bg-red-500/80">
                      Cancel
                    </PillButton>
                  )}
                </div>
              </div>

              <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />

              <div className="relative mt-8 overflow-hidden rounded-[2rem] border border-white/20 bg-black/24 p-4">
                <div className="relative grid aspect-[4/3] place-items-center overflow-hidden rounded-[1.5rem] bg-white/10">
                  <video 
                    ref={videoRef} 
                    autoPlay 
                    playsInline 
                    muted 
                    className={`h-full w-full object-cover ${isCameraActive ? 'block' : 'hidden'}`} 
                  />
                  <canvas ref={canvasRef} className="hidden" />
                  
                  {!isCameraActive && preview && (
                    <img src={preview} alt="Uploaded waste preview" className="h-full w-full object-cover" />
                  )}
                  
                  {!isCameraActive && !preview && (
                    <div className="text-center">
                      <div className="mx-auto mb-5 grid h-20 w-20 place-items-center rounded-[1.5rem] bg-white/12">
                        <ScanLine className="h-10 w-10" />
                      </div>
                      <p className="text-xl font-black">{t('scanner.dropImage')}</p>
                      <p className="mt-2 text-sm text-white/62">{t('scanner.demoReady')}</p>
                    </div>
                  )}
                  {(scanning || resultVisible) && (
                    <div className="absolute inset-0 pointer-events-none">
                      <div className="absolute inset-x-0 top-0 h-1/3 animate-scan bg-gradient-to-b from-eco-300/0 via-eco-300/70 to-eco-300/0" />
                      <div className="absolute inset-5 rounded-[1.3rem] border border-eco-200/50" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </GlassCard>

          <div className="grid gap-5">
            <GlassCard>
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-black uppercase tracking-[0.22em] text-eco-700 dark:text-eco-200">{t('scanner.detectionResult')}</p>
                  <h3 className="mt-2 text-2xl font-black text-ink-950 dark:text-white">{t('scanner.aiClassification')}</h3>
                </div>
                {scanning ? (
                  <IconBadge icon={Loader2} className="animate-spin" />
                ) : (
                  <IconBadge icon={CheckCircle2} />
                )}
              </div>

              <AnimatePresence mode="wait">
                {scanning ? (
                  <motion.div
                    key="loading"
                    className="mt-7 rounded-[1.5rem] bg-eco-50 p-5 dark:bg-white/8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="mb-4 h-4 w-2/3 animate-shimmer rounded-full bg-[linear-gradient(90deg,rgba(31,183,103,0.12),rgba(31,183,103,0.45),rgba(31,183,103,0.12))] bg-[length:200%_100%]" />
                    <div className="mb-4 h-4 w-full animate-shimmer rounded-full bg-[linear-gradient(90deg,rgba(31,183,103,0.12),rgba(31,183,103,0.45),rgba(31,183,103,0.12))] bg-[length:200%_100%]" />
                    <div className="h-4 w-1/2 animate-shimmer rounded-full bg-[linear-gradient(90deg,rgba(31,183,103,0.12),rgba(31,183,103,0.45),rgba(31,183,103,0.12))] bg-[length:200%_100%]" />
                  </motion.div>
                ) : (
                  <motion.div key="result" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                    <div className="mt-7 grid gap-3 sm:grid-cols-2">
                      {[
                        [t('scanner.wasteType'), result?.wasteType || ''],
                        [t('scanner.category'), result?.category || ''],
                        [t('scanner.recyclable'), result?.recyclable || ''],
                        [t('scanner.disposal'), result?.disposal || ''],
                      ].map(([label, value]) => (
                        <div key={label} className="rounded-[1.25rem] bg-eco-50 p-4 dark:bg-white/8">
                          <p className="text-xs font-black uppercase tracking-[0.2em] text-ink-800/45 dark:text-white/38">{label}</p>
                          <p className="mt-2 text-lg font-black text-ink-950 dark:text-white">{value}</p>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6">
                      <ProgressBar value={result?.confidence || 0} label={t('scanner.aiConfidence')} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </GlassCard>

            <div className="grid gap-5 sm:grid-cols-2">
              <GlassCard>
                <IconBadge icon={Recycle} />
                <h3 className="mt-5 text-xl font-black text-ink-950 dark:text-white">{t('scanner.envImpact')}</h3>
                <div className="mt-5 space-y-3 text-sm font-bold text-ink-800/68 dark:text-white/58">
                  <p>CO2 avoided: {result?.impact?.co2} kg</p>
                  <p>Water preserved: {result?.impact?.water} L</p>
                  <p>Energy saved: {result?.impact?.energy} kWh</p>
                </div>
              </GlassCard>

              <GlassCard>
                <IconBadge icon={Zap} />
                <h3 className="mt-5 text-xl font-black text-ink-950 dark:text-white">{t('scanner.carbonCalc')}</h3>
                <label className="mt-5 block text-sm font-bold text-ink-800/62 dark:text-white/58">
                  {t('scanner.itemsRecycled')}: {itemCount}
                  <input
                    type="range"
                    min="1"
                    max="100"
                    value={itemCount}
                    onChange={(event) => setItemCount(Number(event.target.value))}
                    className="mt-3 w-full accent-eco-600"
                  />
                </label>
                <p className="mt-3 text-3xl font-black text-eco-700 dark:text-eco-200">{carbonSaved} kg</p>
              </GlassCard>
            </div>

            <PillButton
              variant="secondary"
              onClick={() => onToast(t('scanner.toastVoice'), t('scanner.toastVoiceText'))}
              className="w-full justify-center py-4"
            >
              <Mic2 className="h-5 w-5" />
              {t('scanner.voiceAssistant')}
            </PillButton>
          </div>
        </div>
      </div>
    </section>
  );
}
