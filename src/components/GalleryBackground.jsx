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


float TIME_SPEED = 0.3;   


void mainImage(out vec4 fragColor, in vec2 fragCoord) { 
    vec2 uv = fragCoord / iResolution.xy;
    vec2 p = uv;
    
    float time = iTime * TIME_SPEED;   
    
    float dist = length(p);
    
    vec2 q = p;
    q += vec2(
        sin(dist * 4.0 - time * 0.9),
        cos(dist * 3.7 - time * 0.8)
    ) * 0.5;
    
    vec2 r = q;
    r += vec2(
        sin(length(q) * 5.5 - time * 1.1),
        cos(dist * 5.0 - time * 1.0)
    ) * 0.4;
    
    vec2 s = r;
    s += vec2(
        sin(dist * 7.0 - time * 1.3),
        cos(length(r) * 6.5 - time * 1.2)
    ) * 0.3;
    
    vec2 t = s;
    t += vec2(
        sin(length(s) * 8.5 - time * 1.5),
        cos(dist * 8.0 - time * 1.4)
    ) * 0.2;
    
    float waves = 0.0;
    waves += sin(dist * 13.0 - time * 1.8);
    waves += cos(length(t) * 15.0 - time * 2.0);
    waves += sin(dist * 9.0 - time * 1.4) * 0.7;
    
    waves = waves * 0.03 + 0.5;
    waves = smoothstep(0.15, 2.5, waves);
    
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

export default function GalleryBackground() {
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
      gl.STATIC_DRAW,
    );

    const pos = gl.getAttribLocation(prog, "position");
    gl.enableVertexAttribArray(pos);
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, "iResolution");
    const uTime = gl.getUniformLocation(prog, "iTime");

    const setSize = () => {
      const w = Math.round(window.innerWidth * devicePixelRatio);
      const h = Math.round(window.innerHeight * devicePixelRatio);
      if (canvas.width === w && canvas.height === h) return;
      canvas.width = w;
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
        position: "fixed",
        inset: 0,
        width: "100dvw",
        height: "100dvh",
        pointerEvents: "none",
        zIndex: -1,
        transform: "translateZ(0)",
      }}
    />
  );
}
