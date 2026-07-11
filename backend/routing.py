import networkx as nx


def calculate_best_route(request):

    graph = nx.Graph()

    for edge in request.edges:

        graph.add_edge(
            edge.source,
            edge.target,
            distance=edge.distance,
            fidelity=edge.fidelity,
            probability=edge.probability,
        )

    path = nx.shortest_path(
        graph,
        request.source,
        request.destination,
        weight="distance",
    )

    fidelity = 1
    probability = 1
    distance = 0

    highlight = []

    for i in range(len(path) - 1):

        edge = graph[path[i]][path[i + 1]]

        fidelity *= edge["fidelity"]
        probability *= edge["probability"]
        distance += edge["distance"]

        highlight.append([
            path[i],
            path[i + 1],
        ])

    return {
        "path": path,
        "distance": distance,
        "fidelity": round(fidelity, 4),
        "probability": round(probability, 4),
        "highlightEdges": highlight,
    }