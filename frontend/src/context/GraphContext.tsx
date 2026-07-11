import { createContext, useContext } from "react";

import {
  useNodesState,
  useEdgesState,
} from "@xyflow/react";

import type {
  Node,
  Edge,
} from "@xyflow/react";

import {
  sampleNodes,
  sampleEdges,
} from "../data/sampleNetwork";

interface GraphContextType {
  nodes: Node[];
  edges: Edge[];
  setNodes: any;
  setEdges: any;
  onNodesChange: any;
  onEdgesChange: any;
}

const GraphContext = createContext<GraphContextType | null>(null);

export function GraphProvider({ children }: any) {

  const [nodes, setNodes, onNodesChange] =
    useNodesState(sampleNodes);

  const [edges, setEdges, onEdgesChange] =
    useEdgesState(sampleEdges);

  return (
    <GraphContext.Provider
      value={{
        nodes,
        edges,
        setNodes,
        setEdges,
        onNodesChange,
        onEdgesChange,
      }}
    >
      {children}
    </GraphContext.Provider>
  );
}

export function useGraph() {
  const context = useContext(GraphContext);

  if (!context) {
    throw new Error("useGraph must be used inside GraphProvider");
  }

  return context;
}