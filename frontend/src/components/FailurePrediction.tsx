import { useGraph } from "../context/GraphContext";
import { predictFailures } from "../utils/predictFailure";

function FailurePrediction() {

  const { edges, nodes } = useGraph();

  const predictions = predictFailures(edges, nodes);

  return (
    

    <div className="bg-white rounded-xl shadow p-6 mt-6">

      <h2 className="text-2xl font-bold mb-5">

        ⚠ AI Failure Prediction

      </h2>

      <div className="space-y-5">

        {predictions.map((prediction, index) => (

          <div
            key={index}
            className="border rounded-lg p-4"
          >

            <div className="flex justify-between">

              <h3 className="font-bold">

                {prediction.edge}

              </h3>

              <span
                className={`font-bold ${
                  prediction.level === "High"
                    ? "text-red-600"
                    : prediction.level === "Medium"
                    ? "text-yellow-600"
                    : "text-green-600"
                }`}
              >

                {prediction.level}

              </span>

            </div>

            <p className="mt-2">

              Risk Score:
              <span className="font-bold">
                {" "}
                {prediction.risk}
              </span>

            </p>

            <div className="mt-3">

              <h4 className="font-semibold">

                Reasons

              </h4>

              <ul className="list-disc ml-5">

                {prediction.reasons.length === 0 ? (
                  <li>No major issues detected.</li>
                ) : (
                  prediction.reasons.map((reason, i) => (
                    <li key={i}>{reason}</li>
                  ))
                )}

              </ul>

            </div>

            <div className="mt-3">

              <h4 className="font-semibold">

                Recommendation

              </h4>

              <p className="text-blue-700">

                {prediction.recommendation}

              </p>

            </div>

          </div>

        ))}

      </div>

    </div>

  );

}

export default FailurePrediction;