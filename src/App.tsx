import { useState, useEffect } from 'react';
import Header from './components/Header';
import SubstanceSelector from './components/SubstanceSelector';
import ReagentSelector from './components/ReagentSelector';
import PlateSimulator from './components/PlateSimulator';
import InterpretationPanel from './components/InterpretationPanel';
import { SUBSTANCES, REAGENTS, SAFETY_RULES, EDUCATIONAL_TIPS } from './data/substances';
import { Substance, Reagent, SimulationState } from './types';
import { Info, Droplet, ShieldAlert, Trash, Sparkles, BookOpen, HeartHandshake } from 'lucide-react';

export default function App() {
  const [selectedSubstance, setSelectedSubstance] = useState<Substance>(SUBSTANCES[0]);
  const [selectedReagent, setSelectedReagent] = useState<Reagent>(REAGENTS[0]);
  const [simulationState, setSimulationState] = useState<SimulationState>('idle');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('theme');
    return saved ? saved === 'dark' : false;
  });

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => {
      const next = !prev;
      localStorage.setItem('theme', next ? 'dark' : 'light');
      return next;
    });
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleSimulationComplete = () => {
    // Logic triggered when simulation finishes
  };


  const handleSelectSubstance = (substance: Substance) => {
    setSelectedSubstance(substance);
    setSimulationState('idle'); // Reset if changing substance
  };

  const handleSelectReagent = (reagent: Reagent) => {
    setSelectedReagent(reagent);
    setSimulationState('idle'); // Reset if changing reagent
  };

  // Icon mapping for safety cards
  const renderSafetyIcon = (iconName: string) => {
    switch (iconName) {
      case 'Info':
        return <Info className="w-5 h-5 text-blue-500" />;
      case 'Droplet':
        return <Droplet className="w-5 h-5 text-sky-500" />;
      case 'ShieldAlert':
        return <ShieldAlert className="w-5 h-5 text-amber-500" />;
      case 'Trash2':
        return <Trash className="w-5 h-5 text-rose-500" />;
      default:
        return <Info className="w-5 h-5 text-slate-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 flex flex-col font-sans text-slate-800 dark:text-slate-100 transition-colors duration-300">
      {/* Header */}
      <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />

      {/* Main Content Area */}
      <main id="main-content" className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
        
        {/* Intro Alert */}
        <div className="bg-blue-50/80 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/30 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs transition-colors">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/40 rounded-lg text-blue-600 dark:text-blue-400 mt-0.5 sm:mt-0 shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-display font-bold text-slate-900 dark:text-white">
                ¿Cómo funciona el simulador multi-reactivo Marquis, Mecke y Froehde?
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                Cada reactivo contiene una solución ácida única que reacciona de forma diferente con cada compuesto alcaloide. Selecciona un <strong>reactivo químico</strong> y una <strong>sustancia esperada</strong>, personaliza el formato y haz clic en <strong>"Aplicar Reactivo"</strong> en la placa de testeo para contemplar el cambio cromático en tiempo real con efecto de refracción líquida.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 self-start sm:self-auto">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xxs font-mono font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Simulador Calibrado
            </span>
          </div>
        </div>

        {/* Primary Interactive Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Left Side: Test Visual Area */}
          <div className="lg:col-span-7 flex flex-col">
            <PlateSimulator
              selectedSubstance={selectedSubstance}
              selectedReagent={selectedReagent}
              simulationState={simulationState}
              setSimulationState={setSimulationState}
              onSimulationComplete={handleSimulationComplete}
            />
          </div>

          {/* Right Side: Inputs & Results */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <ReagentSelector
              selectedReagent={selectedReagent}
              onSelectReagent={handleSelectReagent}
              simulationState={simulationState}
            />

            <SubstanceSelector
              selectedSubstance={selectedSubstance}
              onSelectSubstance={handleSelectSubstance}
              simulationState={simulationState}
            />

            <InterpretationPanel
              selectedSubstance={selectedSubstance}
              selectedReagent={selectedReagent}
              simulationState={simulationState}
            />
          </div>
        </div>

        {/* Secondary Educational Sections */}
        <section id="educational-resources" className="space-y-6 pt-6 border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h2 className="text-xl font-display font-bold text-slate-900 dark:text-white">
              Guía de Buenas Prácticas y Reducción de Riesgos
            </h2>
          </div>

          {/* Grid of Safety Rules (The pinhead rule etc.) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {SAFETY_RULES.map((rule) => (
              <div 
                key={rule.id}
                id={`safety-rule-${rule.id}`}
                className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-250 dark:border-slate-800 shadow-xs hover:shadow-md dark:hover:shadow-slate-950/40 transition-all flex flex-col gap-3 group"
              >
                <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-850 flex items-center justify-center transition-colors group-hover:bg-blue-50/50 dark:group-hover:bg-blue-950/20">
                  {renderSafetyIcon(rule.icon)}
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-display font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {rule.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed">
                    {rule.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* General Knowledge Articles */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-2">
            {EDUCATIONAL_TIPS.map((tip, idx) => (
              <div 
                key={idx}
                className="bg-slate-900 dark:bg-slate-900 text-white rounded-2xl p-6 border border-slate-800 dark:border-slate-800 shadow-lg flex flex-col gap-3 relative overflow-hidden"
              >
                {/* Subtle visual accent */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-500/10 to-transparent rounded-bl-full pointer-events-none"></div>
                
                <span className="text-[10px] font-mono text-blue-400 dark:text-blue-400 font-bold uppercase tracking-wider">
                  Lección {idx + 1}
                </span>
                <h3 className="text-md font-display font-bold text-white">
                  {tip.title}
                </h3>
                <p className="text-xs text-slate-350 leading-relaxed mt-1">
                  {tip.content}
                </p>
              </div>
            ))}
          </div>

          {/* Extra Help / Disclaimer Banner */}
          <div className="bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 transition-colors">
            <div className="flex items-center gap-4 text-center md:text-left flex-col md:flex-row">
              <div className="w-12 h-12 rounded-full bg-blue-100/60 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-display font-bold text-slate-900 dark:text-white">¿Quieres saber más sobre testeo de sustancias?</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-xl leading-relaxed">
                  Visita el sitio oficial para consultar análisis reales, alertas de lotes adulterados en circulación y descargar material preventivo gratuito. El testeo salva vidas.
                </p>
              </div>
            </div>
            <a 
              href="https://reduciendodano.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl bg-slate-900 dark:bg-white hover:bg-slate-800 dark:hover:bg-slate-100 text-white dark:text-slate-900 text-xs font-semibold tracking-wide transition-all shrink-0 hover:scale-[1.02] shadow-xs"
            >
              Ir a Reduciendo Daño
            </a>
          </div>
        </section>
      </main>

      {/* Educational Footer */}
      <footer id="app-footer" className="bg-blue-50 dark:bg-slate-950/60 border-t border-blue-100 dark:border-slate-900 py-5 px-6 mt-auto transition-colors">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-600 text-white rounded-lg shrink-0">
              <Droplet className="w-5 h-5 fill-white" />
            </div>
            <p className="text-xs sm:text-sm text-blue-900 dark:text-blue-300 leading-relaxed max-w-3xl">
              <strong className="font-bold">Regla de Oro:</strong> Menos es más. Utiliza siempre una muestra diminuta (del tamaño de una cabeza de alfiler) y una sola gota. El exceso de muestra opaca los posibles adulterantes que se diluyen en menor cantidad.
            </p>
          </div>
          <span className="text-[10px] font-mono text-blue-400 dark:text-blue-500 shrink-0 tracking-wide">
            REDUCIENDODAÑO.COM © 2026
          </span>
        </div>
      </footer>
    </div>
  );
}
