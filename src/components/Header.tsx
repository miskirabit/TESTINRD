import { Beaker, ShieldCheck, Sun, Moon } from 'lucide-react';

interface HeaderProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export default function Header({ isDarkMode, toggleDarkMode }: HeaderProps) {
  return (
    <header id="app-header" className="border-b border-slate-200 dark:border-slate-800 bg-white/85 dark:bg-slate-900/60 backdrop-blur-md sticky top-0 z-50 py-4 px-6 transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex items-center justify-between w-full lg:w-auto">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-500/10 rounded-xl border border-blue-500/20 text-blue-500 dark:text-blue-400 shadow-inner">
              <Beaker className="w-7 h-7" />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-display font-bold tracking-tight text-slate-950 dark:text-white flex items-center gap-2">
                Simulador de Test Colorimétrico
                <span className="text-xs font-mono font-medium bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-300 px-2 py-0.5 rounded border border-blue-500/20 dark:border-blue-500/30">
                  Multi-Reactivos
                </span>
              </h1>
              <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                Inspirado en las pautas de reducción de daños de <a href="https://reduciendodano.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">reduciendodaño.com</a>
              </p>
            </div>
          </div>

          {/* Mobile Theme Toggle Button */}
          <button
            id="mobile-theme-toggle"
            onClick={toggleDarkMode}
            className="lg:hidden p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900 transition-all cursor-pointer"
            aria-label="Toggle theme"
          >
            {isDarkMode ? <Sun className="w-5 h-5 text-amber-500" /> : <Moon className="w-5 h-5 text-indigo-600" />}
          </button>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
          {/* Informative alert badge */}
          <div className="flex items-center gap-2 bg-amber-500/5 dark:bg-amber-500/10 border border-amber-500/15 dark:border-amber-500/25 px-4 py-2 rounded-xl text-amber-850 dark:text-amber-300 text-xs max-w-md">
            <ShieldCheck className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0" />
            <span>
              <strong>Herramienta educativa:</strong> Los reactivos identifican la <strong>presencia</strong> de una sustancia, no su pureza o dosis.
            </span>
          </div>

          {/* Desktop Theme Toggle Switch */}
          <button
            id="desktop-theme-toggle"
            onClick={toggleDarkMode}
            className="hidden lg:flex items-center gap-2 px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-white transition-all cursor-pointer select-none"
          >
            {isDarkMode ? (
              <>
                <Sun className="w-4 h-4 text-amber-500 fill-amber-500/20 animate-spin-slow" />
                <span className="text-xs font-semibold">Modo Claro</span>
              </>
            ) : (
              <>
                <Moon className="w-4 h-4 text-indigo-600 fill-indigo-500/10" />
                <span className="text-xs font-semibold">Modo Oscuro</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}

