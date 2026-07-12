interface Props {
  x: number;
  y: number;
}

function QuantumPacket({ x, y }: Props) {

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: 18,
        height: 18,
        borderRadius: "50%",
        background: "#3b82f6",
        boxShadow: "0 0 15px #3b82f6",
        transition: "all 1s linear",
        pointerEvents: "none",
        zIndex: 1000,
      }}
    />
  );
}

export default QuantumPacket;