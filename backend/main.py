from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
import networkx as nx

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "Backend Running"}

@app.get("/best-route")
def best_route(
    source: str = Query(...),
    destination: str = Query(...)
):

    graph = nx.Graph()

    graph.add_edge("Alice","R1",
                   distance=50,
                   fidelity=0.95,
                   probability=0.96)

    graph.add_edge("R1","Bob",
                   distance=60,
                   fidelity=0.93,
                   probability=0.94)

    graph.add_edge("Alice","R2",
                   distance=70,
                   fidelity=0.90,
                   probability=0.91)

    graph.add_edge("R2","Bob",
                   distance=55,
                   fidelity=0.94,
                   probability=0.95)

    path = nx.shortest_path(
        graph,
        source,
        destination,
        weight="distance"
    )

    distance = 0
    fidelity = 1
    probability = 1

    highlightEdges = []

    for i in range(len(path)-1):

        edge = graph[path[i]][path[i+1]]

        distance += edge["distance"]
        fidelity *= edge["fidelity"]
        probability *= edge["probability"]

        node_map = {
            "Alice": "1",
            "R1": "2",
            "R2": "3",
            "Bob": "4"
        }

        highlightEdges.append([
            node_map[path[i]],
            node_map[path[i + 1]]
        ])

    return{
        "path":path,
        "distance":distance,
        "fidelity":round(fidelity,4),
        "probability":round(probability,4),
        "highlightEdges":highlightEdges
    }