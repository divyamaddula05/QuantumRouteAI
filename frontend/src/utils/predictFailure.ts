export interface FailurePrediction {
  edge: string;
  risk: number;
  level: "Low" | "Medium" | "High";
  reasons: string[];
  recommendation: string;
}

export function predictFailures(
  edges: any[],
  nodes: any[]
): FailurePrediction[] {

  // Map node IDs to their labels (Alice, R1, Bob, etc.)
  const nodeMap: Record<string, string> = {};

  nodes.forEach((node) => {
    nodeMap[node.id] = node.data.label
      .replace("👤 ", "")
      .replace("🔁 ", "");
  });

  return edges.map((edge) => {

    const distance =
      edge.data?.distance ??
      Number(String(edge.label).replace(" km", "")) ??
      0;

    const fidelity =
      edge.data?.fidelity ?? 0.95;

    const probability =
      edge.data?.probability ?? 0.95;

    // Risk Score Formula
    const risk =
      (100 - fidelity * 100) +
      distance * 0.4 +
      (100 - probability * 100);

    let level: "Low" | "Medium" | "High";

    if (risk >= 60) {
      level = "High";
    } else if (risk >= 35) {
      level = "Medium";
    } else {
      level = "Low";
    }

    const reasons: string[] = [];

    if (distance > 70) {
      reasons.push("⚠ Long communication distance");
    }

    if (fidelity < 0.90) {
      reasons.push("⚠ Low fidelity");
    }

    if (probability < 0.92) {
      reasons.push("⚠ Low success probability");
    }

    let recommendation = "✅ Network operating normally";

    if (distance > 70) {
      recommendation = "➜ Add a repeater";
    }

    if (fidelity < 0.90) {
      recommendation = "➜ Upgrade quantum channel";
    }

    if (probability < 0.92) {
      recommendation = "➜ Recalculate optimal route";
    }

    return {
      edge: `${nodeMap[edge.source]} → ${nodeMap[edge.target]}`,
      risk: Number(risk.toFixed(1)),
      level,
      reasons,
      recommendation,
    };

  })
  // Highest risk shown first
  .sort((a, b) => b.risk - a.risk);
}