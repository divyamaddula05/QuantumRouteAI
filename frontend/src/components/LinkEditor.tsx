import { useState, useEffect } from "react";

interface Props {
  edge: any;
  onSave: (edge: any) => void;
}

function LinkEditor({ edge, onSave }: Props) {

  const [distance, setDistance] = useState(0);
  const [fidelity, setFidelity] = useState(0);
  const [probability, setProbability] = useState(0);

  useEffect(() => {
    if (!edge) return;

    setDistance(edge.data?.distance ?? 40);
    setFidelity(edge.data?.fidelity ?? 0.95);
    setProbability(edge.data?.probability ?? 0.95);
  }, [edge]);

  if (!edge) return null;

  return (
    <div className="bg-white shadow rounded-xl p-5">

      <h2 className="text-xl font-bold mb-5">
        Link Properties
      </h2>

      <p>
        <b>{edge.source}</b> → <b>{edge.target}</b>
      </p>

      <label className="block mt-4">Distance</label>

      <input
        type="number"
        value={distance}
        onChange={(e)=>setDistance(Number(e.target.value))}
        className="border rounded p-2 w-full"
      />

      <label className="block mt-4">Fidelity</label>

      <input
        type="number"
        step="0.01"
        value={fidelity}
        onChange={(e)=>setFidelity(Number(e.target.value))}
        className="border rounded p-2 w-full"
      />

      <label className="block mt-4">Probability</label>

      <input
        type="number"
        step="0.01"
        value={probability}
        onChange={(e)=>setProbability(Number(e.target.value))}
        className="border rounded p-2 w-full"
      />

      <button
        className="bg-blue-600 text-white mt-5 px-4 py-2 rounded"
        onClick={() =>
          onSave({
            ...edge,
            data: {
              distance,
              fidelity,
              probability,
            },
          })
        }
      >
        Save
      </button>

    </div>
  );
}

export default LinkEditor;