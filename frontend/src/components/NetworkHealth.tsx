interface Props {
  health: any;
  nodes: number;
}

function NetworkHealth({ health, nodes }: Props) {

  return (

    <div className="bg-white rounded-xl shadow p-5">

      <h2 className="text-xl font-bold mb-4">

        🌐 Network Health

      </h2>

      <div className="space-y-3">

        <p><b>Nodes:</b> {nodes}</p>

        <p><b>Links:</b> {health.totalLinks}</p>

        <p><b>Weak Links:</b> {health.weakLinks}</p>

        <p>
          <b>Average Fidelity:</b>{" "}
          {(health.averageFidelity * 100).toFixed(1)}%
        </p>

        <p>
          <b>Average Probability:</b>{" "}
          {(health.averageProbability * 100).toFixed(1)}%
        </p>

        <p>
          <b>Estimated Latency:</b>{" "}
          {health.latency} ms
        </p>

        <p>

          <b>Status:</b>{" "}

          <span
            className={
              health.status === "Healthy"
                ? "text-green-600 font-bold"
                : health.status === "Warning"
                ? "text-yellow-600 font-bold"
                : "text-red-600 font-bold"
            }
          >
            {health.status}
          </span>

        </p>

      </div>

    </div>

  );

}

export default NetworkHealth;