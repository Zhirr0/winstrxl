import { useEffect, useRef } from "react";

const PosterGradient = () => {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl");
    if (!gl) return;

    const vSrc = `
      attribute vec2 p;
      void main() { gl_Position = vec4(p, 0, 1); }
    `;

    const fSrc = `
      precision mediump float;
      uniform vec2 u_r;
      uniform float u_t;

      float h(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

      float n(vec2 p) {
        vec2 i = floor(p), f = fract(p);
        float a = h(i), b = h(i + vec2(1, 0)), c = h(i + vec2(0, 1)), d = h(i + vec2(1, 1));
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
      }

      void main() {
        vec2 uv = gl_FragCoord.xy / u_r;
        vec3 col = vec3(0.025, 0.032, 0.028);

        float n1 = n(uv * 3.0 + vec2(u_t * 0.06, u_t * 0.04));
        float n2 = n(uv * 7.0 - vec2(u_t * 0.03, u_t * 0.05));
        col += n1 * 0.04;
        col -= n2 * 0.02;

        float bl = 1.0 - length(uv - vec2(0.0, 0.9)) * 1.6;
        float tr = 1.0 - length(uv - vec2(1.0, 0.1)) * 1.8;
        float br = 1.0 - length(uv - vec2(1.0, 1.0)) * 1.4;
        col += max(0.0, bl) * vec3(0.28, 0.02, 0.02) * 0.6;
        col += max(0.0, tr) * vec3(0.18, 0.01, 0.01) * 0.3;
        col += max(0.0, br) * vec3(0.22, 0.015, 0.015) * 0.4;

        float bl2 = 1.0 - length(uv - vec2(0.0, 1.0)) * 1.2;
        col += max(0.0, bl2) * vec3(0.32, 0.025, 0.025) * 0.5;

        float sc = step(0.5, fract(gl_FragCoord.y * 0.5));
        col *= 0.985 + sc * 0.015;

        float vg = 1.0 - length((uv - 0.5) * vec2(1.1, 0.9)) * 1.1;
        col *= smoothstep(0.0, 0.55, vg);

        gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
      }
    `;

    function mkShader(src, type) {
      const s = gl.createShader(type);
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    }

    const prog = gl.createProgram();
    gl.attachShader(prog, mkShader(vSrc, gl.VERTEX_SHADER));
    gl.attachShader(prog, mkShader(fSrc, gl.FRAGMENT_SHADER));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW
    );

    const aP = gl.getAttribLocation(prog, "p");
    gl.enableVertexAttribArray(aP);
    gl.vertexAttribPointer(aP, 2, gl.FLOAT, false, 0, 0);

    const uR = gl.getUniformLocation(prog, "u_r");
    const uT = gl.getUniformLocation(prog, "u_t");

    function resize() {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
    }

    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    function frame(t) {
      rafRef.current = requestAnimationFrame(frame);
      gl.uniform2f(uR, canvas.width, canvas.height);
      gl.uniform1f(uT, t * 0.001);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    }

    rafRef.current = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
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
      }}
    />
  );
};

export default PosterGradient;