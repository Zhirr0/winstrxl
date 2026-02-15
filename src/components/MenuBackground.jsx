import { useEffect, useRef } from "react";

const VERT = `
  attribute vec2 position;
  void main() {
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const FRAG = `
  precision highp float;
  uniform vec2  iResolution;
  uniform float iTime;

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    vec2 uv = fragCoord/iResolution.xy;
    vec3 col = vec3(0.0);
    float dist = uv.x;
    float phase = iTime * 1.5;
    float wave1 = sin(dist * 10.0 - phase);
    float wave2 = sin(dist * 10.0 - phase + 2.094);
    float wave3 = sin(dist * 10.0 - phase + 4.189);
wave1 *= sin((1.0 - uv.y) * 5.0 + phase * 0.3);
wave2 *= sin((1.0 - uv.y) * 5.0 + phase * 0.3 + 2.094);
wave3 *= sin((1.0 - uv.y) * 5.0 + phase * 0.3 + 4.189);

    float waves = wave1 * 0.3 + wave2 * 0.3 + wave3 * 0.3;
    waves *= smoothstep(1.0, 0.2, dist);
    waves = waves * 0.23 + 0.04;
    waves = max(0.0, waves);
    col = vec3(waves);
    fragColor = vec4(col, 1.0);
}


  void main() {
    mainImage(gl_FragColor, gl_FragCoord.xy);
  }
`;

function compile(gl, type, src) {
  const s = gl.createShader(type);
  gl.shaderSource(s, src);
  gl.compileShader(s);

  // small compile log to help debugging if shader fails
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
    const msg = gl.getShaderInfoLog(s);
    console.error("Shader compile error:", msg);
  }

  return s;
}

export default function MenuBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const gl = canvas.getContext("webgl");
    if (!gl) return;

    const prog = gl.createProgram();
    gl.attachShader(prog, compile(gl, gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl, gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW
    );

    const pos = gl.getAttribLocation(prog, "position");
    gl.enableVertexAttribArray(pos);
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

    const uRes  = gl.getUniformLocation(prog, "iResolution");
    const uTime = gl.getUniformLocation(prog, "iTime");

    const setSize = () => {
      const parent = canvas.parentElement;
      const w = Math.round(parent.offsetWidth  * devicePixelRatio);
      const h = Math.round(parent.offsetHeight * devicePixelRatio);
      if (canvas.width === w && canvas.height === h) return;
      canvas.width  = w;
      canvas.height = h;
      gl.viewport(0, 0, w, h);
    };

    setSize();
    window.addEventListener("resize", setSize);

    let rafId;
    const start = performance.now();

    const render = () => {
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, (performance.now() - start) / 1000);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      rafId = requestAnimationFrame(render);
    };
    render();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", setSize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: -1,
        transform: "translateZ(0)",
      }}
    />
  );
}
