import { FlaskConical, HelpCircle, ShieldAlert } from 'lucide-react';
import { Reagent, SimulationState } from '../types';
import { REAGENTS } from '../data/substances';

interface ReagentSelectorProps {
  selectedReagent: Reagent;
  onSelectReagent: (reagent: Reagent) => void;
  simulationState: SimulationState;
}

export default function ReagentSelector({
  selectedReagent,
  onSelectReagent,
  simulationState
}: ReagentSelectorProps) {
  const isLocked = simulationState !== 'idle';

  return (
    <div id="reagent-selector" className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col gap-4">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <FlaskConical className="w-5 h-5 text-blue-400" />
          <h2 className="text-lg font-display font-bold text-white">Reactivo Químico</h2>
        </div>
        <p className="text-xs text-slate-400">
          Selecciona qué reactivo de reducción de daños vas a gotear sobre la placa de cerámica.
        </p>
      </div>

      {/* Grid of Reagents */}
      <div className="grid grid-cols-3 gap-3">
        {REAGENTS.map((reagent) => {
          const isSelected = reagent.id === selectedReagent.id;
          return (
            <button
              key={reagent.id}
              id={`reagent-btn-${reagent.id}`}
              disabled={isLocked}
              onClick={() => onSelectReagent(reagent)}
              className={`flex flex-col items-center justify-center p-3.5 rounded-2xl border transition-all text-center group cursor-pointer ${
                isSelected
                  ? 'bg-blue-600/10 border-blue-500/80 text-white shadow-lg shadow-blue-500/5'
                  : 'bg-slate-950/40 border-slate-800/80 text-slate-400 hover:text-slate-200 hover:border-slate-700 disabled:opacity-50 disabled:cursor-not-allowed'
              }`}
            >
              <span className={`text-xs font-mono px-2 py-0.5 rounded-md border mb-2 transition-colors ${
                isSelected
                  ? 'bg-blue-500/20 text-blue-300 border-blue-400/30'
                  : 'bg-slate-900 text-slate-500 border-slate-800 group-hover:border-slate-700'
              }`}>
                {reagent.id.toUpperCase()}
              </span>
              <span className="text-sm font-display font-bold">{reagent.name}</span>
            </button>
          );
        })}
      </div>

      {/* Description of current Reagent */}
      <div className="bg-slate-950/60 border border-slate-800/80 rounded-2xl p-4 flex flex-col gap-2.5">
        <div className="flex items-center justify-between">
          <span className="text-xxs font-mono text-slate-500 uppercase tracking-wider">
            Composición Química:
          </span>
          <span className="text-xxs font-mono text-slate-400 bg-slate-900/80 px-2 py-0.5 rounded border border-slate-800">
            {selectedReagent.chemicalComposition}
          </span>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed italic">
          "{selectedReagent.description}"
        </p>
      </div>
    </div>
  );
}
