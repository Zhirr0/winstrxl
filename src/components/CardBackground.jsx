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

  #define BRIGHTNESS      0.2
  #define BASE_WHITE      0.1
  #define WAVE_STRENGTH_1 1.0
  #define WAVE_STRENGTH_2 0.0
  #define WAVE_STRENGTH_3 0.6
  #define SPEED_1         1.0
  #define SPEED_2         1.5
  #define SPEED_3         0.5
  #define RIPPLES_1       2.0
  #define RIPPLES_2       2.0
  #define RIPPLES_3       3.0
  #define VERTICAL_1      4.0
  #define VERTICAL_2      6.0
  #define VERTICAL_3      3.0
  #define REACH           1.0

  void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    vec2  uv   = fragCoord / iResolution.xy;
    float dist = uv.x;

    float wave1 = sin(dist * RIPPLES_1 - iTime * SPEED_1);
    float wave2 = sin(dist * RIPPLES_2 - iTime * SPEED_2 + 1.0);
    float wave3 = sin(dist * RIPPLES_3 - iTime * SPEED_3 + 2.5);

    wave1 *= sin(uv.y * VERTICAL_1 + iTime * 0.5);
    wave2 *= sin(uv.y * VERTICAL_2 - iTime * 0.3);
    wave3 *= sin(uv.y * VERTICAL_3 + iTime * 0.7);

    float waves = wave1 * WAVE_STRENGTH_1
                + wave2 * WAVE_STRENGTH_2
                + wave3 * WAVE_STRENGTH_3;

    waves *= smoothstep(REACH, 0.2, dist);
    waves  = waves * BRIGHTNESS + BASE_WHITE;
    waves  = max(0.0, waves);

    fragColor = vec4(vec3(waves), 1.0);
  }

  void main() {
    mainImage(gl_FragColor, gl_FragCoord.xy);
  }
`;

function compile(gl, type, src) {
  const s = gl.createShader(type);
  gl.shaderSource(s, src);
  gl.compileShader(s);
  return s;
}

export default function CardBackground() {
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

    // Use the parent element's size — it's stable during GSAP pin
    // because GSAP doesn't change the parent's layout dimensions
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

    // window resize = real viewport change only, never fires on GSAP pin
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
        zIndex: 0,
        transform: "translateZ(0)",
      }}
    />
  );
}