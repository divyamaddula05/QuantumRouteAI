export interface QuantumNode {
  id: string;
  label: string;
  memory: number;
  availableMemory: number;
  status: string;
}

export interface QuantumLink {
  source: string;
  target: string;
  distance: number;
  fidelity: number;
  successProbability: number;
  decoherence: number;
}