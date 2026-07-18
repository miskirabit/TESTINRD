import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Droplet, RotateCcw, Play, Check, Beaker } from 'lucide-react';
import { Substance, Reagent, SimulationState } from '../types';

interface PlateSimulatorProps {
  selectedSubstance: Substance;
  selectedReagent: Reagent;
  simulationState: SimulationState;
  setSimulationState: (state: SimulationState) => void;
  onSimulationComplete: () => void;
}

export default function PlateSimulator({
  selectedSubstance,
  selectedReagent,
  simulationState,
  setSimulationState,
  onSimulationComplete
}: PlateSimulatorProps) {
  const [sampleType, setSampleType] = useState<'crystals' | 'pill'>('crystals');
  const [elapsedTime, setElapsedTime] = useState<number>(0);

  // Extract reaction for current selected reagent
  const reaction = selectedSubstance.reactions[selectedReagent.id] || selectedSubstance.reactions['marquis'];

  // Handle stopwatch interval during reaction
  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    if (simulationState === 'reacting') {
      const startTime = Date.now();
      setElapsedTime(0);

      intervalId = setInterval(() => {
        const elapsed = (Date.now() - startTime) / 1000;
        if (elapsed >= 2.0) {
          setElapsedTime(2.0);
          clearInterval(intervalId);
          setSimulationState('completed');
          onSimulationComplete();
        } else {
          setElapsedTime(elapsed);
        }
      }, 30);
    } else if (simulationState === 'idle' || simulationState === 'dripping') {
      setElapsedTime(0);
    }
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [simulationState, setSimulationState, onSimulationComplete]);

  const handleStartSimulation = () => {
    if (simulationState !== 'idle') return;
    setSimulationState('dripping');

    // After 1 second, the drop lands and reaction begins
    setTimeout(() => {
      setSimulationState('reacting');
    }, 1000);
  };

  const handleReset = () => {
    setSimulationState('idle');
    setElapsedTime(0);
  };

  // Get current active reaction description based on elapsed time
  const getCurrentPhaseDescription = () => {
    if (simulationState === 'idle') return 'Muestra seca lista. Haz clic en Aplicar Reactivo.';
    if (simulationState === 'dripping') return `Liberando una gota de reactivo ${selectedReagent.name}...`;
    if (simulationState === 'reacting') {
      const phase = reaction.reactionPhases.find(
        (p, idx) => {
          const nextP = reaction.reactionPhases[idx + 1];
          return elapsedTime >= p.timeOffset && (!nextP || elapsedTime < nextP.timeOffset);
        }
      );
      return phase ? phase.description : 'Reaccionando...';
    }
    return 'Reacción completada. Analiza los resultados.';
  };

  return (
    <div id="plate-simulator" className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col justify-between h-full">
      {/* Simulation Controls Header */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Beaker className="w-5 h-5 text-blue-400" />
            <h2 className="text-lg font-display font-bold text-white">Placa de Testeo</h2>
          </div>
          <div className="flex bg-slate-950 p-1 rounded-lg border border-slate-800">
            <button
              id="select-crystals"
              onClick={() => simulationState === 'idle' && setSampleType('crystals')}
              disabled={simulationState !== 'idle'}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
                sampleType === 'crystals'
                  ? 'bg-slate-800 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white disabled:opacity-50'
              }`}
            >
              Cristales / Polvo
            </button>
            <button
              id="select-pill"
              onClick={() => simulationState === 'idle' && setSampleType('pill')}
              disabled={simulationState !== 'idle'}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
                sampleType === 'pill'
                  ? 'bg-slate-800 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white disabled:opacity-50'
              }`}
            >
              Pastilla Molida
            </button>
          </div>
        </div>

        {/* Reaction Status Ribbon */}
        <div className="bg-slate-950/60 border border-slate-800/80 rounded-xl py-2 px-4 mb-6 flex justify-between items-center text-xs">
          <span className="text-slate-400 font-medium">Estado:</span>
          <span className={`font-mono ${simulationState === 'reacting' ? 'text-amber-400 animate-pulse' : 'text-slate-300'}`}>
            {getCurrentPhaseDescription()}
          </span>
          <span className="font-mono text-blue-400 font-semibold bg-blue-950/40 px-2 py-0.5 rounded border border-blue-900/30">
            {elapsedTime.toFixed(2)}s
          </span>
        </div>
      </div>

      {/* Visual Canvas (Ceramic Plate & Dropper) */}
      <div className="relative flex-1 min-h-[340px] flex items-center justify-center bg-slate-950 rounded-2xl border border-slate-800/50 overflow-hidden py-10">
        {/* Ambient Grid Background */}
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]"></div>

        {/* Informative Label Overlay */}
        <div className="absolute top-4 left-6 text-slate-500 font-mono text-[9px] uppercase tracking-widest pointer-events-none select-none">
          ÁREA DE VISUALIZACIÓN / PLACA DE CERÁMICA
        </div>

        {/* Dropper Bottle Assembly */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center">
          <motion.div
            animate={
              simulationState === 'dripping'
                ? { y: [0, 15, 0], rotate: [0, -5, 0] }
                : { y: 0, rotate: 0 }
            }
            transition={{ duration: 1, ease: 'easeInOut' }}
            className="relative flex flex-col items-center"
          >
            {/* Dropper Squeeze Bulb */}
            <div className="w-7 h-8 bg-red-800 rounded-t-full border-b border-red-900 shadow-inner flex items-center justify-center">
              <div className="w-1.5 h-full bg-red-700/50 rounded-full"></div>
            </div>
            {/* Dropper Cap & Glass Shaft */}
            <div className="w-9 h-2.5 bg-slate-800 border border-slate-700 rounded-sm"></div>
            <div className="w-2.5 h-12 bg-slate-300/40 border border-white/20 backdrop-blur-xs rounded-b-md relative flex items-end justify-center shadow-md">
              <div className="w-1 h-full bg-amber-500/10 rounded-b-full"></div>
              {/* Nozzle nozzle */}
              <div className="absolute bottom-0 w-1.5 h-2 bg-slate-300/60 rounded-b-full border-t border-slate-400"></div>
            </div>

            {/* Forming droplet */}
            {simulationState === 'idle' && (
              <div className="absolute -bottom-1.5 w-2 h-2 rounded-full bg-sky-300/40 blur-[0.5px] animate-pulse"></div>
            )}
          </motion.div>
        </div>

        {/* Falling Chemical Drop */}
        <AnimatePresence>
          {simulationState === 'dripping' && (
            <motion.div
              initial={{ y: -100, scale: 0.8, opacity: 0 }}
              animate={{ y: 95, scale: 1, opacity: 1 }}
              exit={{ scale: 1.4, opacity: 0 }}
              transition={{ duration: 0.8, ease: 'easeIn' }}
              className="absolute top-24 left-1/2 -translate-x-1/2 z-15"
            >
              <div className="w-3 h-5 bg-sky-200/90 rounded-full rounded-t-xs border border-white/30 shadow-[0_0_8px_rgba(186,230,253,0.6)] flex flex-col justify-end">
                <div className="w-1.5 h-1.5 bg-white/60 rounded-full mx-auto mb-1"></div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Ceramic Well Plate (Testing Surface) */}
        <div className="relative w-64 h-64 rounded-full bg-slate-100 shadow-[inset_0_6px_16px_rgba(0,0,0,0.15),0_15px_35px_rgba(0,0,0,0.4)] border-8 border-slate-200 flex items-center justify-center">
          {/* Porcelain Inner Glaze Reflective Ripple */}
          <div className="absolute inset-2 rounded-full bg-gradient-to-b from-white to-slate-100/90 border border-slate-200/50 shadow-inner"></div>
          <div className="absolute top-4 left-6 w-48 h-20 rounded-full bg-white/40 filter blur-[2px] transform -rotate-12 pointer-events-none"></div>

          {/* Test Sample container */}
          <div className="absolute w-28 h-28 rounded-full flex items-center justify-center">
            {/* The powder heap (dry state) */}
            <div className="relative">
              {/* Small crystals sparkles */}
              {sampleType === 'crystals' ? (
                <div className="absolute -inset-6 flex flex-wrap justify-center items-center gap-1 opacity-80 z-5">
                  <span className="w-1 h-1 bg-slate-400 rounded-sm rotate-45 animate-pulse"></span>
                  <span className="w-1.5 h-1.5 bg-slate-300 rounded-sm rotate-12"></span>
                  <span className="w-1 h-1 bg-slate-400 rounded-xs -rotate-12"></span>
                  <span className="w-0.5 h-0.5 bg-slate-300 rounded-full"></span>
                  <span className="w-1 h-1 bg-slate-500 rounded-sm rotate-90"></span>
                </div>
              ) : (
                <div className="absolute -inset-6 flex flex-wrap justify-center items-center gap-0.5 opacity-60 z-5">
                  {/* coarse pill particles */}
                  <span className="w-1 h-1 bg-slate-500 rounded-full"></span>
                  <span className="w-1 h-1 bg-slate-400 rounded-full"></span>
                  <span className="w-1 h-1 bg-slate-600 rounded-full"></span>
                  <span className="w-0.5 h-0.5 bg-slate-500 rounded-full"></span>
                </div>
              )}

              {/* The powder body */}
              <motion.div
                animate={
                  simulationState === 'idle'
                    ? { scale: 1 }
                    : { scale: [1, 1.05, 1.02] }
                }
                transition={{ duration: 0.5 }}
                className={`w-16 h-12 rounded-full filter blur-[1px] shadow-xs relative flex items-center justify-center z-4 ${
                  sampleType === 'crystals'
                    ? 'bg-gradient-to-br from-slate-200 to-slate-350 border-b border-slate-400/40'
                    : 'bg-gradient-to-br from-slate-300 to-slate-450 border-b border-slate-500/40'
                }`}
              >
                {/* Visual grain textures */}
                <div className="absolute inset-1 opacity-25 bg-[radial-gradient(#475569_1px,transparent_1px)] [background-size:3px_3px] rounded-full"></div>
              </motion.div>
            </div>

            {/* The Wet Chemical reaction liquid spreading with REFRACTION and SURFACE TENSION realism */}
            <AnimatePresence>
              {(simulationState === 'reacting' || simulationState === 'completed') && (
                <motion.div
                  initial={{ scale: 0.1, opacity: 0 }}
                  animate={{
                    scale: [0.1, 1.12, 1],
                    opacity: 0.94,
                    backgroundColor: reaction.colorSpectrum,
                    borderRadius: [
                      '48% 52% 47% 53% / 50% 48% 52% 50%', // wobbling start
                      '51% 49% 52% 48% / 49% 51% 49% 51%',
                      '50% 50% 50% 50% / 50% 50% 50% 50%'  // stable round dome
                    ]
                  }}
                  transition={{
                    scale: { duration: 0.8, ease: 'easeOut' },
                    backgroundColor: { duration: 2.0, ease: 'linear' },
                    borderRadius: { duration: 2.0, repeat: 0, ease: 'easeInOut' }
                  }}
                  className="absolute w-24 h-20 mix-blend-multiply filter blur-[0.5px] border border-white/20 shadow-[inset_0_4px_10px_rgba(255,255,255,0.7),inset_0_-4px_8px_rgba(0,0,0,0.5),0_12px_24px_rgba(0,0,0,0.35)] flex items-center justify-center z-10 backdrop-blur-[2.5px] backdrop-saturate-150 overflow-hidden"
                >
                  {/* Organic Specular Highlights representing glossy liquid dome */}
                  <div className="absolute top-1.5 left-3 w-10 h-4 rounded-full bg-gradient-to-b from-white/45 to-white/5 filter blur-[0.5px] -rotate-12"></div>
                  <div className="absolute top-1 left-2.5 w-6 h-2 rounded-full bg-white/50 filter blur-[0.2px] -rotate-12"></div>
                  
                  {/* Bottom secondary refraction crescent highlight */}
                  <div className="absolute bottom-1.5 right-4 w-5 h-2 rounded-full bg-white/15 filter blur-[0.5px]"></div>
                  
                  {/* Inner liquid ring representing depth & meniscus boundary */}
                  <div className="absolute inset-1 border border-black/5 rounded-full pointer-events-none opacity-40"></div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Primary Simulator Actions */}
      <div className="mt-6 flex gap-4">
        <button
          id="btn-apply-reagent"
          disabled={simulationState !== 'idle'}
          onClick={handleStartSimulation}
          className={`flex-1 py-3.5 px-4 rounded-xl font-display font-semibold text-sm flex items-center justify-center gap-2 transition-all ${
            simulationState === 'idle'
              ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/20 active:scale-98 cursor-pointer'
              : 'bg-slate-800 text-slate-500 cursor-not-allowed'
          }`}
        >
          {simulationState === 'reacting' ? (
            <>
              <span className="w-4 h-4 rounded-full border-2 border-slate-500 border-t-white animate-spin"></span>
              Reaccionando...
            </>
          ) : simulationState === 'dripping' ? (
            <>
              <Droplet className="w-4 h-4 text-sky-400 animate-bounce" />
              Aplicando Gota...
            </>
          ) : simulationState === 'completed' ? (
            <>
              <Check className="w-4 h-4 text-emerald-400" />
              Test Completado
            </>
          ) : (
            <>
              <Play className="w-4 h-4 fill-white" />
              Aplicar {selectedReagent.name}
            </>
          )}
        </button>

        <button
          id="btn-clear-plate"
          disabled={simulationState === 'idle' || simulationState === 'dripping'}
          onClick={handleReset}
          className={`px-4 rounded-xl border font-display font-semibold text-sm flex items-center justify-center gap-2 transition-all ${
            simulationState !== 'idle' && simulationState !== 'dripping'
              ? 'border-slate-700 hover:border-slate-600 text-slate-300 hover:text-white bg-slate-800/40 active:scale-98 cursor-pointer'
              : 'border-slate-800/50 text-slate-600 cursor-not-allowed bg-transparent'
          }`}
          title="Limpiar Placa"
        >
          <RotateCcw className={`w-4 h-4 ${simulationState === 'reacting' ? 'animate-spin' : ''}`} />
          <span className="hidden sm:inline">Limpiar</span>
        </button>
      </div>
    </div>
  );
}
