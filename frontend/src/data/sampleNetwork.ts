import type { Node, Edge } from "@xyflow/react";

export const sampleNodes: Node[] = [
  {
    id: "1",
    position: { x: 100, y: 250 },
    data: { label: "👤 Alice" },
  },
  {
    id: "2",
    position: { x: 350, y: 150 },
    data: { label: "🔁 R1" },
  },
  {
    id: "3",
    position: { x: 350, y: 350 },
    data: { label: "🔁 R2" },
  },
  {
    id: "4",
    position: { x: 650, y: 250 },
    data: { label: "👤 Bob" },
  },
];

export const sampleEdges: Edge[] = [
  {
    id: "e1",
    source: "1",
    target: "2",
    label: "50 km",
  },
  {
    id: "e2",
    source: "2",
    target: "4",
    label: "60 km",
  },
  {
    id: "e3",
    source: "1",
    target: "3",
    label: "70 km",
  },
  {
    id: "e4",
    source: "3",
    target: "4",
    label: "55 km",
  },
];