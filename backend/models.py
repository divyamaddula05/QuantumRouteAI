from pydantic import BaseModel
from typing import List


class GraphNode(BaseModel):
    id: str
    label: str


class GraphEdge(BaseModel):
    source: str
    target: str
    distance: float = 40
    fidelity: float = 0.95
    probability: float = 0.95


class RouteRequest(BaseModel):
    nodes: List[GraphNode]
    edges: List[GraphEdge]
    source: str
    destination: str
    algorithm: str