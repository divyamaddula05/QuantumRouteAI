# QuantumRouteAI

An interactive Quantum Network Routing Simulator that visualizes network topologies and computes optimal routing paths using graph algorithms.

## Features

- Interactive quantum network visualization
- Dynamic node and edge management
- Shortest path computation
- Real-time route highlighting
- REST API integration with FastAPI
- Interactive graph visualization using React Flow

## Tech Stack

### Frontend
- React.js
- TypeScript
- React Flow
- CSS

### Backend
- FastAPI
- Python
- NetworkX

## Project Structure

```
QuantumRouteAI
│
├── frontend
│   ├── src
│   ├── public
│   └── package.json
│
├── backend
│   ├── main.py
│   ├── routing.py
│   ├── models.py
│   └── requirements.txt
│
└── README.md
```

## Installation

### Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/QuantumRouteAI.git
```

### Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## Future Enhancements

- Multiple routing algorithms
- Quantum fidelity-based routing
- Route animation
- Save & Load network topology
- AI-assisted route recommendation
- Deployment on cloud

## Author

**Divya Maddula**

- GitHub: https://github.com/divyamaddula05
