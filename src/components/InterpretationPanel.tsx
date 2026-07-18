import { CheckCircle2, AlertTriangle, Info, Skull, Sparkles } from 'lucide-react';
import { Substance, Reagent, SimulationState } from '../types';

interface InterpretationPanelProps {
  selectedSubstance: Substance;
  selectedReagent: Reagent;
  simulationState: SimulationState;
}

export default function InterpretationPanel({
  selectedSubstance,
  selectedReagent,
  simulationState
}: InterpretationPanelProps) {
  const isCompleted = simulationState === 'completed';
  const isReacting = simulationState === 'reacting';
  const isDripping = simulationState === 'dripping';

  // Extract the specific reaction details for the currently active reagent
  const reaction = selectedSubstance.reactions[selectedReagent.id] || selectedSubstance.reactions.marquis;

  // Determine Concordance score based on substance and reagent
  const getConcordanceInfo = () => {
    if (selectedSubstance.id === 'desconocida') {
      return { percentage: 28, label: 'ALERTA / ANÓMALO' };
    }
    if (selectedSubstance.id === 'aspirina') {
      return { percentage: 100, label: 'CONTROL OK' };
    }
    
    // Standard matches
    if (reaction.resultType === 'positive') {
      return { percentage: 98, label: 'CONCORDANTE' };
    }
    return { percentage: 45, label: 'ADULTERADO' };
  };

  const info = getConcordanceInfo();

  // Dynamic Styles based on outcome
  const getHeaderStyle = () => {
    if (!isCompleted) return 'bg-slate-50 dark:bg-slate-950/40 border-b border-slate-150 dark:border-slate-800/80 text-slate-500 dark:text-slate-400';
    
    switch (reaction.resultType) {
      case 'positive':
        return 'bg-emerald-50 dark:bg-emerald-950/20 border-b border-emerald-100 dark:border-emerald-900/30 text-emerald-800 dark:text-emerald-300';
      case 'danger':
        return 'bg-red-50 dark:bg-red-950/20 border-b border-red-100 dark:border-red-900/30 text-red-800 dark:text-red-300';
      case 'info':
        return 'bg-blue-50 dark:bg-blue-950/20 border-b border-blue-100 dark:border-blue-900/30 text-blue-800 dark:text-blue-300';
      default:
        return 'bg-amber-50 dark:bg-amber-950/20 border-b border-amber-100 dark:border-amber-900/30 text-amber-800 dark:text-amber-300';
    }
  };

  const getStatusBadge = () => {
    switch (reaction.resultType) {
      case 'positive':
        return (
          <span className="flex items-center gap-1 bg-emerald-600 text-white text-[10px] font-black px-2 py-1 rounded uppercase tracking-wider">
            <CheckCircle2 className="w-3 h-3" /> {info.label}
          </span>
        );
      case 'danger':
        return (
          <span className="flex items-center gap-1 bg-red-600 text-white text-[10px] font-black px-2 py-1 rounded uppercase tracking-wider">
            <Skull className="w-3 h-3" /> {info.label}
          </span>
        );
      case 'info':
        return (
          <span className="flex items-center gap-1 bg-blue-600 text-white text-[10px] font-black px-2 py-1 rounded uppercase tracking-wider">
            <Info className="w-3 h-3" /> {info.label}
          </span>
        );
      default:
        return (
          <span className="flex items-center gap-1 bg-amber-600 text-white text-[10px] font-black px-2 py-1 rounded uppercase tracking-wider">
            <AlertTriangle className="w-3 h-3" /> {info.label}
          </span>
        );
    }
  };

  const badgeColorText = () => {
    switch (reaction.resultType) {
      case 'positive': return 'text-emerald-500 dark:text-emerald-400';
      case 'danger': return 'text-red-500 dark:text-red-400';
      case 'info': return 'text-blue-500 dark:text-blue-400';
      default: return 'text-amber-500 dark:text-amber-400';
    }
  };

  return (
    <div id="interpretation-panel" className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col h-full min-h-[380px] transition-colors duration-300">
      {/* Dynamic Header */}
      <div className={`px-6 py-4 flex justify-between items-center transition-colors duration-300 ${getHeaderStyle()}`}>
        <span className="font-display font-bold text-xs tracking-wider uppercase text-slate-600 dark:text-slate-300">
          {!isCompleted ? 'ANALIZADOR CROMÁTICO' : 'RESULTADO ANALIZADO'}
        </span>
        {isCompleted ? (
          getStatusBadge()
        ) : (
          <span className="text-[10px] font-mono bg-slate-100 dark:bg-slate-950 text-slate-500 dark:text-slate-400 px-2 py-1 rounded uppercase tracking-wider">
            ESPERANDO REACCIÓN
          </span>
        )}
      </div>

      {/* Main Body */}
      <div className="p-6 flex-1 flex flex-col justify-between gap-5">
        {!isCompleted ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center px-4 py-8">
            {isReacting ? (
              <div className="flex flex-col items-center gap-3">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full border-4 border-blue-100 dark:border-blue-900/30 border-t-blue-600 animate-spin"></div>
                  <Sparkles className="w-5 h-5 text-amber-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
                </div>
                <p className="font-display font-bold text-slate-800 dark:text-white text-sm mt-2">
                  Reacción en progreso...
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs leading-relaxed">
                  Observa la placa cerámica. El reactivo Marquis reacciona con la sustancia esperada.
                </p>
              </div>
            ) : isDripping ? (
              <div className="flex flex-col items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-950/30 flex items-center justify-center text-blue-500 animate-bounce">
                  <Info className="w-5 h-5" />
                </div>
                <p className="font-display font-bold text-slate-800 dark:text-white text-sm">
                  Liberando reactivo
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">La gota está cayendo sobre la muestra.</p>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-slate-50 dark:bg-slate-950 flex items-center justify-center border border-slate-100 dark:border-slate-800 text-slate-400">
                  <Info className="w-5 h-5" />
                </div>
                <p className="font-display font-semibold text-slate-500 dark:text-slate-400 text-xs uppercase tracking-widest">
                  PLACA LISTA PARA TEST
                </p>
                <p className="text-xs text-slate-400 max-w-xs leading-relaxed">
                  Haz clic en <strong>"Aplicar Reactivo"</strong> en la placa de testeo para ver el informe químico.
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-4 animate-fade-in">
            {/* Color Result Block */}
            <div className="flex items-center space-x-4">
              <div 
                className="w-12 h-12 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-center shadow-inner relative overflow-hidden"
                style={{
                  background: `radial-gradient(circle, ${reaction.colorSpectrum[3]} 0%, ${reaction.colorSpectrum[2]} 100%)`
                }}
              >
                <div className="absolute inset-1 rounded-lg bg-white/10 mix-blend-overlay"></div>
              </div>
              <div>
                <p className="text-xxs text-slate-400 font-bold uppercase tracking-wider">Color obtenido ({selectedReagent.name}):</p>
                <p className={`text-base font-black ${badgeColorText()}`}>
                  {reaction.obtainedColorName}
                </p>
              </div>
            </div>

            {/* Structured Clear Explanation Card */}
            <div className="p-4 bg-slate-50 dark:bg-slate-950/50 rounded-xl border border-slate-150 dark:border-slate-800 flex flex-col gap-1">
              <span className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wider">Resultado</span>
              <p className="text-xs sm:text-sm leading-relaxed text-slate-700 dark:text-slate-200 italic font-medium">
                "{reaction.explanation}"
              </p>
            </div>

            {/* Adulterant Info / Warnings */}
            <div className="p-4 rounded-xl border border-dashed border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/30 flex flex-col gap-1">
              <span className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wider">Análisis de Adulterantes</span>
              <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-350">
                {reaction.adulterantInfo}
              </p>
            </div>

            {/* Concordance Metric Bar */}
            <div className="space-y-2 pt-1">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-500 dark:text-slate-400 font-medium">Concordancia con patrón {selectedReagent.name}</span>
                <span className={`font-black ${badgeColorText()}`}>
                  {info.percentage}%
                </span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-950 h-1.5 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-1000 ${
                    reaction.resultType === 'positive' ? 'bg-emerald-500' :
                    reaction.resultType === 'danger' ? 'bg-red-500' :
                    reaction.resultType === 'info' ? 'bg-blue-500' : 'bg-amber-500'
                  }`}
                  style={{ width: `${info.percentage}%` }}
                ></div>
              </div>
            </div>
          </div>
        )}

        {/* Footer actions of card */}
        <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500 uppercase">
            Reactivo {selectedReagent.name} activo
          </span>
          <a
            href="https://reduciendodano.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-bold text-xs hover:underline uppercase tracking-wider flex items-center gap-1"
          >
            Guía completa &rarr;
          </a>
        </div>
      </div>
    </div>
  );
}
