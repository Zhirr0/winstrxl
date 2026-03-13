import { useWaveCanvas } from "../hooks/useWaveCanvas";

export function WaveCanvas({ src }) {
  const canvasRef = useWaveCanvas(src);
  return <canvas ref={canvasRef} className="block w-full h-full cursor-crosshair" />;
}
