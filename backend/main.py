from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
import networkx as nx
from models import RouteRequest
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

@app.post("/best-route")
def best_route(request: RouteRequest):

    graph = nx.Graph()

    # Map node IDs to labels
    id_to_label = {}

    for node in request.nodes:
        label = (
            node.label
            .replace("👤 ", "")
            .replace("🔁 ", "")
        )
        id_to_label[node.id] = label

    # Build graph
    for edge in request.edges:
        graph.add_edge(
            id_to_label[edge.source],
            id_to_label[edge.target],
            distance=edge.distance,
            fidelity=edge.fidelity,
            probability=edge.probability,
        )

    try:

        # -----------------------------
        # Select routing algorithm
        # -----------------------------

        if request.algorithm == "Shortest Path":

            path = nx.shortest_path(
                graph,
                request.source,
                request.destination,
                weight="distance",
            )

            reason = (
                "This route minimizes the total communication distance."
            )

        elif request.algorithm == "Highest Fidelity":

            for u, v, data in graph.edges(data=True):
                data["cost"] = 1 - data["fidelity"]

            path = nx.shortest_path(
                graph,
                request.source,
                request.destination,
                weight="cost",
            )

            reason = (
                "This route provides the highest end-to-end quantum fidelity."
            )

        elif request.algorithm == "Highest Probability":

            for u, v, data in graph.edges(data=True):
                data["cost"] = 1 - data["probability"]

            path = nx.shortest_path(
                graph,
                request.source,
                request.destination,
                weight="cost",
            )

            reason = (
                "This route maximizes the probability of successful quantum transmission."
            )

        else:

            path = nx.shortest_path(
                graph,
                request.source,
                request.destination,
                weight="distance",
            )

            reason = "Default shortest path selected."

        # -----------------------------
        # Calculate route metrics
        # -----------------------------

        distance = 0
        fidelity = 1
        probability = 1

        highlight = []

        label_to_id = {v: k for k, v in id_to_label.items()}

        for i in range(len(path) - 1):

            edge = graph[path[i]][path[i + 1]]

            distance += edge["distance"]
            fidelity *= edge["fidelity"]
            probability *= edge["probability"]

            highlight.append([
                label_to_id[path[i]],
                label_to_id[path[i + 1]]
            ])

        latency = round(distance / 25, 2)

        score = round(
            fidelity * 40 +
            probability * 40 +
            (1 / (distance + 1)) * 20,
            2
        )

        return {
            "algorithm": request.algorithm,
            "path": path,
            "distance": distance,
            "fidelity": round(fidelity, 4),
            "probability": round(probability, 4),
            "highlightEdges": highlight,
            "reason": reason,
            "latency": latency,
            "score": score,
        }

    except nx.NetworkXNoPath:
        return {
            "error": "No route exists between the selected nodes."
        }

    except nx.NodeNotFound:
        return {
            "error": "One or both selected nodes do not exist."
        }