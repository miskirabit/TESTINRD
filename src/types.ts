export type SimulationState = 'idle' | 'dripping' | 'reacting' | 'completed';

export interface ReactionPhase {
  timeOffset: number; // in seconds (0 to 2)
  color: string;      // hex color
  description: string; // description of the reaction state at this point
}

export interface ReagentReaction {
  colorSpectrum: string[]; // hex array for gradient transition
  reactionPhases: ReactionPhase[];
  resultType: 'positive' | 'warning' | 'danger' | 'info';
  obtainedColorName: string;
  explanation: string;
  adulterantInfo: string;
}

export interface Reagent {
  id: string;
  name: string;
  description: string;
  chemicalComposition: string;
  badgeColor: string;
}

export interface Substance {
  id: string;
  name: string;
  chemicalName?: string;
  category: string;
  description: string;
  badgeColor: string;
  textColor: string;
  reactions: Record<string, ReagentReaction>; // Map reagent.id -> ReagentReaction
}

export interface SafetyRule {
  id: string;
  title: string;
  icon: string;
  description: string;
}
