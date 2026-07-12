interface Props {
  route: any;
}

function RouteResult({ route }: Props) {

  if (!route) {
    return (
      <div className="bg-white rounded-xl shadow p-5">

        <h2 className="text-xl font-bold">
          Best Route
        </h2>

        <hr className="my-4" />

        <p>No route calculated.</p>

      </div>
    );
  }

  return (

    <div className="bg-white rounded-xl shadow p-5">

      <h2 className="text-xl font-bold">
        🤖 AI Recommendation
      </h2>

      <hr className="my-4" />

      <p>
        <b>Algorithm</b>
      </p>

      <p>{route.algorithm}</p>

      <br />

      <p>
        <b>Path</b>
      </p>

      <p>{route.path.join(" → ")}</p>

      <br />

      <p>
        <b>Distance</b>
      </p>

      <p>{route.distance} km</p>

      <br />

      <p>
        <b>Fidelity</b>
      </p>

      <p>{route.fidelity}</p>

      <br />

      <p>
        <b>Success Probability</b>
      </p>

      <p>{(route.probability * 100).toFixed(2)}%</p>

      <br />

      <p>
        <b>Estimated Latency</b>
      </p>

      <p>{route.latency} ms</p>

      <br />

      <p>
        <b>AI Score</b>
      </p>

      <p>{route.score}/100</p>

      <br />

      <p>
        <b>Recommendation</b>
      </p>

      <p className="text-green-700 font-medium">
        {route.reason}
      </p>

    </div>

  );

}

export default RouteResult;