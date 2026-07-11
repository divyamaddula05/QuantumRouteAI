import QuantumNetwork from "./QuantumNetwork";

interface Props {
  route: any;
}

function NetworkCanvas({ route }: Props) {
  return (
    <div className="bg-white rounded-xl shadow p-4">
      <QuantumNetwork route={route} />
    </div>
  );
}

export default NetworkCanvas;