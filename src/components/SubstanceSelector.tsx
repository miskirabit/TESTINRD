import { HelpCircle, Info, ShieldQuestion } from 'lucide-react';
import { Substance, SimulationState } from '../types';
import { SUBSTANCES } from '../data/substances';

interface SubstanceSelectorProps {
  selectedSubstance: Substance;
  onSelectSubstance: (substance: Substance) => void;
  simulationState: SimulationState;
}

export default function SubstanceSelector({
  selectedSubstance,
  onSelectSubstance,
  simulationState
}: SubstanceSelectorProps) {
  const isLocked = simulationState !== 'idle';

  return (
    <div id="substance-selector" className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col gap-5">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <ShieldQuestion className="w-5 h-5 text-blue-400" />
          <h2 className="text-lg font-display font-bold text-white">Sustancia Esperada / Muestra</h2>
        </div>
        <p className="text-xs text-slate-400">
          Selecciona qué sustancia esperas que sea tu muestra para configurar el simulador de reacción.
        </p>
      </div>

      {/* The drop-down selector as requested */}
      <div className="relative">
        <label htmlFor="substance-select" className="block text-xs font-medium text-slate-400 mb-1.5 font-mono">
          SUSTANCIA ESPERADA O MUESTRA:
        </label>
        <select
          id="substance-select"
          disabled={isLocked}
          value={selectedSubstance.id}
          onChange={(e) => {
            const found = SUBSTANCES.find((s) => s.id === e.target.value);
            if (found) onSelectSubstance(found);
          }}
          className={`w-full bg-slate-950 border text-sm rounded-xl px-4 py-3.5 font-medium tracking-wide text-white transition-all appearance-none cursor-pointer outline-none focus:ring-2 focus:ring-blue-500/50 ${
            isLocked
              ? 'border-slate-800 text-slate-500 cursor-not-allowed bg-slate-950/60'
              : 'border-slate-800 hover:border-slate-700 hover:bg-slate-950/80 focus:border-blue-500'
          }`}
        >
          {SUBSTANCES.map((sub) => (
            <option key={sub.id} value={sub.id} className="bg-slate-950 text-white py-2">
              {sub.name}
            </option>
          ))}
        </select>
        {/* Custom Chevron icon */}
        <div className="absolute top-[38px] right-4 pointer-events-none text-slate-500">
          <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
            <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
          </svg>
        </div>
      </div>

      {/* Detailed Info Card of selected Expected Substance */}
      <div className="flex-1 bg-slate-950/60 border border-slate-800/80 rounded-2xl p-5 flex flex-col gap-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <span className="text-xs font-mono bg-blue-950/40 text-blue-300 border border-blue-900/40 px-2 py-0.5 rounded-md">
              {selectedSubstance.category}
            </span>
            <h3 className="text-md font-display font-bold text-white mt-2 flex items-center gap-1.5">
              {selectedSubstance.name}
            </h3>
            {selectedSubstance.chemicalName && (
              <p className="text-xs font-mono text-slate-400 mt-0.5 select-all">
                {selectedSubstance.chemicalName}
              </p>
            )}
          </div>

          <div className="w-12 h-12 rounded-xl border border-slate-800 flex items-center justify-center bg-slate-900/50 text-slate-400">
            <Info className="w-5 h-5 text-blue-400" />
          </div>
        </div>

        <p className="text-xs text-slate-400 leading-relaxed">
          {selectedSubstance.description}
        </p>

        {isLocked && (
          <div className="mt-auto pt-3 border-t border-slate-900 flex items-center gap-2 text-xxs font-mono text-amber-400/80">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping"></span>
            <span>Placa bloqueada durante la simulación.</span>
          </div>
        )}
      </div>
    </div>
  );
}
