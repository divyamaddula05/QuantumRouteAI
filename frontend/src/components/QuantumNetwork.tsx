
import { useEffect, useState, useRef } from "react";
import { useEvents } from "../context/EventContext";
import QuantumPacket from "./QuantumPacket";
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  addEdge,
} from "@xyflow/react";

import type {
  Node,
  Edge,
  Connection,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";

import { useGraph } from "../context/GraphContext";
import LinkEditor from "./LinkEditor";

interface Props {
  route: any;
}

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
    data: {
      distance: 50,
      fidelity: 0.95,
      probability: 0.96,
    },
  },
  {
    id: "e2",
    source: "2",
    target: "4",
    label: "60 km",
    data: {
      distance: 60,
      fidelity: 0.93,
      probability: 0.94,
    },
  },
  {
    id: "e3",
    source: "1",
    target: "3",
    label: "70 km",
    data: {
      distance: 70,
      fidelity: 0.99,
      probability: 0.91,
    },
  },
  {
    id: "e4",
    source: "3",
    target: "4",
    label: "55 km",
    data: {
      distance: 55,
      fidelity: 0.90,
      probability: 0.99,
    },
  },
];

function QuantumNetwork({ route }: Props) {
  const fileInput = useRef<HTMLInputElement>(null);
  const [packet, setPacket] = useState({
    x: -100,
    y: -100,
  });
  const {
    nodes,
    edges,
    setNodes,
    setEdges,
    onNodesChange,
    onEdgesChange,
  } = useGraph();

  const { addEvent } = useEvents();

  const [selectedEdge, setSelectedEdge] =
    useState<Edge | null>(null);

  const onConnect = (connection: Connection) => {

    setEdges((eds: Edge[]) =>
      addEdge(
        {
          ...connection,
          animated: true,
          label: "40 km",
          data: {
            distance: 40,
            fidelity: 0.95,
            probability: 0.95,
          },
        },
        eds
      )
    );

    addEvent("New connection created");

  };

  const addRepeater = () => {

    const id = String(nodes.length + 1);

    const previous = nodes[nodes.length - 1];

    const newNode: Node = {
      id,
      position: {
        x: previous.position.x + 180,
        y: previous.position.y,
      },
      data: {
        label: `🔁 R${id}`,
      },
      style: {
        background: "#10b981",
        color: "#ffffff",
        borderRadius: 8,
      },
    };

    setNodes((nds: Node[]) => [...nds, newNode]);

    const newEdge: Edge = {
      id: `e${edges.length + 1}`,
      source: previous.id,
      target: id,
      label: "40 km",
      data: {
        distance: 40,
        fidelity: 0.95,
        probability: 0.95,
      },
    };

    setEdges((eds: Edge[]) => [...eds, newEdge]);

    addEvent(`Repeater R${id} added`);

  };

  const deleteRepeater = () => {

    if (nodes.length <= 4) return;

    const lastNode = nodes[nodes.length - 1];

    setNodes((nds: Node[]) =>
      nds.filter((node) => node.id !== lastNode.id)
    );

    setEdges((eds: Edge[]) =>
      eds.filter(
        (edge) =>
          edge.source !== lastNode.id &&
          edge.target !== lastNode.id
      )
    );

    addEvent(`${lastNode.data.label} removed`);

  };

  const resetNetwork = () => {

    setNodes(initialNodes);
    setEdges(initialEdges);

    addEvent("Network reset");

  };
  const saveNetwork = () => {

    const network = {
      nodes,
      edges,
    };

    const blob = new Blob(
      [JSON.stringify(network, null, 2)],
      {
        type: "application/json",
      }
    );

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = "quantum-network.json";

    link.click();

    URL.revokeObjectURL(url);

    addEvent("Network saved");

  };
  const loadNetwork = (
  event: React.ChangeEvent<HTMLInputElement>
) => {

  const file = event.target.files?.[0];

  if (!file) return;

  const reader = new FileReader();

  reader.onload = (e) => {

    const network = JSON.parse(
      e.target?.result as string
    );

    setNodes(network.nodes);

    setEdges(network.edges);

    addEvent("Network loaded");

  };

  reader.readAsText(file);

};

  const updateEdge = (updatedEdge: Edge) => {

    setEdges((eds: Edge[]) =>
      eds.map((edge) =>
        edge.id === updatedEdge.id
          ? updatedEdge
          : edge
      )
    );

    addEvent(
      `Updated link ${updatedEdge.source} → ${updatedEdge.target}`
    );

  };
    useEffect(() => {

    if (!route) return;

    setEdges((prev: Edge[]) =>
      prev.map((edge) => {

        const highlight = route.highlightEdges?.some(
          ([source, target]: [string, string]) =>
            (edge.source === source &&
              edge.target === target) ||
            (edge.source === target &&
              edge.target === source)
        );

        return {
          ...edge,
          animated: highlight,
          style: {
            stroke: highlight ? "#22c55e" : "#94a3b8",
            strokeWidth: highlight ? 5 : 2,
          },
        };

      })
    );
    if (!route?.path) return;

    const positions = route.path
      .map((label: string) =>
        nodes.find(
          (n) =>
            n.data.label.replace("👤 ", "").replace("🔁 ", "") === label
        )
      )
      .filter(Boolean);

    positions.forEach((node: any, index: number) => {

      setTimeout(() => {

        setPacket({
          x: node.position.x + 15,
          y: node.position.y + 15,
        });

      }, index * 1000);

    });

  }, [route, setEdges]);

  return (

    <div
      style={{
        width: "100%",
        height: "550px",
      }}
    >

      <div className="flex gap-3 mb-4 flex-wrap">

        <button
          onClick={addRepeater}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Add Repeater
        </button>
        <button
          onClick={saveNetwork}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Save Network
        </button>
        <button
          onClick={() => fileInput.current?.click()}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          Load Network
        </button>

        <button
          onClick={deleteRepeater}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Delete Repeater
        </button>

        <button
          onClick={resetNetwork}
          className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800"
        >
          Reset
        </button>
        <input
          type="file"
          accept=".json"
          ref={fileInput}
          onChange={loadNetwork}
          className="hidden"
        />

      </div>

      <div
        style={{
          width: "100%",
          height: "450px",
        }}
      >

        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onEdgeClick={(_, edge) => setSelectedEdge(edge)}
          fitView
        >
        <QuantumPacket
            x={packet.x}
            y={packet.y}
        />

          <MiniMap />

          <Controls />

          <Background />

        </ReactFlow>

      </div>

      <div className="mt-5">

        <LinkEditor
          edge={selectedEdge}
          onSave={updateEdge}
        />

      </div>

    </div>

  );

}

export default QuantumNetwork;