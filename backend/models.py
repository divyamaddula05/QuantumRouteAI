from pydantic import BaseModel
from typing import List


class NodeData(BaseModel):
    id: str
    label: str


class Node(BaseModel):
    id: str
    data: NodeData


class Edge(BaseModel):
    source: str
    target: str
    distance: float
    fidelity: float
    probability: float


class RouteRequest(BaseModel):
    nodes: List[Node]
    edges: List[Edge]
    source: str
    destination: str