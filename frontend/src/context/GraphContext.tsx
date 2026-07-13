import { createContext, useContext, useState } from "react";

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
  route: any;
  setRoute: any;
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
  const [route, setRoute] = useState<any>(null);

  return (
    <GraphContext.Provider
      value={{
        nodes,
        edges,
        route,
        setRoute,
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