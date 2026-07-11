import {
  ReactFlow,
  Background,
 Controls,
  MiniMap,
  addEdge,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";

import { useState, useEffect } from "react";

import type { Node, Edge } from "@xyflow/react";
import type { Connection } from "@xyflow/react";

const initialNodes: Node[] = [
  {
    id: "1",
    position: { x: 100, y: 200 },
    data: { label: "👤 Alice" },
  },
  {
    id: "2",
    position: { x: 350, y: 120 },
    data: { label: "🔁 R1" },
  },
  {
    id: "3",
    position: { x: 350, y: 320 },
    data: { label: "🔁 R2" },
  },
  {
    id: "4",
    position: { x: 650, y: 200 },
    data: { label: "👤 Bob" },
  },
];

const initialEdges: Edge[] = [
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

interface Props {
  route: any;
}

function QuantumNetwork({ route }: Props) {

const [nodes, setNodes] = useState(initialNodes);
const [edges, setEdges] = useState(initialEdges);
const onConnect = (connection: Connection) => {

  setEdges((prev) =>
    addEdge(
      {
        ...connection,
        animated: true,
        label: "40 km",
      },
      prev
    )
  );

};
const addRepeater = () => {

    const id = String(nodes.length + 1);

    const newNode: Node = {

        id,

        position: {

            x: 200 + nodes.length * 120,

            y: 250,

        },

        data: {

            label: `🔁 R${id}`,

        },

    };

    setNodes((prev)=>[...prev,newNode]);

};
const deleteRepeater=()=>{

if(nodes.length<=4) return;

setNodes(nodes.slice(0,-1));

}
const resetNetwork=()=>{

setNodes(initialNodes);

setEdges(initialEdges);

}
useEffect(() => {
  if (!route) {
    setEdges(initialEdges);
    return;
  }

  const updatedEdges = initialEdges.map((edge) => {
    const highlight = route.highlightEdges?.some(
      ([source, target]: [string, string]) =>
        edge.source === source &&
        edge.target === target
    );

    return {
      ...edge,
      animated: highlight,
      style: {
        stroke: highlight ? "#22c55e" : "#94a3b8",
        strokeWidth: highlight ? 5 : 2,
      },
    };
  });

  setEdges(updatedEdges);
}, [route]);
  return (

    <div style={{ width: "100%", height: "550px" }}>
      <div className="flex gap-3 mb-4">

        <button
        onClick={addRepeater}
        className="bg-green-600 text-white px-4 py-2 rounded"
        >

        Add Repeater

        </button>
        <button
          onClick={deleteRepeater}
          className="bg-red-600 text-white px-4 py-2 rounded"
          >

          Delete Repeater

          </button>
          <button
            onClick={resetNetwork}
            className="bg-gray-700 text-white px-4 py-2 rounded"
            >

            Reset

            </button>

        </div>
      <ReactFlow
          nodes={nodes}
          edges={edges}
          onConnect={onConnect}
          fitView
      >

        <MiniMap />

        <Controls />

        <Background />

      </ReactFlow>

    </div>

  );

}

export default QuantumNetwork;