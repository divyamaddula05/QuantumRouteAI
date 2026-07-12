export function calculateNetworkHealth(edges: any[]) {

  const totalLinks = edges.length;

  let totalFidelity = 0;
  let totalProbability = 0;

  let weakLinks = 0;

  edges.forEach((edge) => {

    const fidelity = edge.data?.fidelity ?? 0.95;
    const probability = edge.data?.probability ?? 0.95;

    totalFidelity += fidelity;
    totalProbability += probability;

    if (fidelity < 0.75) {
      weakLinks++;
    }

  });

  const averageFidelity =
    totalLinks === 0 ? 0 : totalFidelity / totalLinks;

  const averageProbability =
    totalLinks === 0 ? 0 : totalProbability / totalLinks;

  const latency =
    totalLinks === 0 ? 0 : totalLinks * 5;

  let status = "Healthy";

  if (weakLinks >= 3) {
    status = "Critical";
  } else if (weakLinks > 0) {
    status = "Warning";
  }

  return {
    totalLinks,
    weakLinks,
    averageFidelity,
    averageProbability,
    latency,
    status,
  };
}