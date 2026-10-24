"use client";

import React, { useEffect, useRef } from "react";
import { useTheme } from "@/context/ThemeContext";

const VERTEX_SHADER_SRC = `
  attribute vec2 position;
  varying vec2 vUv;
  void main() {
    vUv = position * 0.5 + 0.5;
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const FRAGMENT_SHADER_SRC = `
  precision highp float;
  varying vec2 vUv;
  uniform float u_time;
  uniform vec2 u_resolution;
  uniform vec2 u_mouse;
  uniform vec3 u_color_a;
  uniform vec3 u_color_b;

  // Jesper Landberg Style: 3D Simplex noise generator
  vec4 permute(vec4 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v) {
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);

    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);

    vec3 x1 = x0 - i1 + 1.0 * C.xxx;
    vec3 x2 = x0 - i2 + 2.0 * C.xxx;
    vec3 x3 = x0 - 1.0 + 3.0 * C.xxx;

    i = mod(i, 289.0);
    vec4 p = permute(permute(permute(
              i.z + vec4(0.0, i1.z, i2.z, 1.0))
            + i.y + vec4(0.0, i1.y, i2.y, 1.0))
            + i.x + vec4(0.0, i1.x, i2.x, 1.0));

    float n_ = 0.142857142857;
    vec3  ns = n_ * D.wyz - D.xzx;

    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);

    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);

    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);

    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));

    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;

    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);

    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;

    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }

  // Fractional Brownian Motion for liquid topography
  float fbm(vec3 p) {
    float total = 0.0;
    float amp = 0.55;
    float freq = 1.0;
    for (int i = 0; i < 4; i++) {
      total += snoise(p * freq) * amp;
      freq *= 2.05;
      amp *= 0.48;
    }
    return total;
  }

  void main() {
    vec2 st = gl_FragCoord.xy / u_resolution.xy;
    vec2 aspect = vec2(u_resolution.x / u_resolution.y, 1.0);
    vec2 p = (st - 0.5) * aspect;

    // Mouse interactive field displacement
    vec2 m = (u_mouse - 0.5) * aspect;
    float distToMouse = length(p - m);
    float mouseWave = exp(-distToMouse * 3.5) * 0.45;

    // Time vectors for multi-layer fluid currents
    float t = u_time * 0.15;
    vec3 coord = vec3(p * 1.8, t);

    // Chromatic dispersion sampling (Landberg chromatic refraction)
    float disp = 0.035;
    float noiseR = fbm(coord + vec3(disp, 0.0, 0.0) + mouseWave);
    float noiseG = fbm(coord);
    float noiseB = fbm(coord - vec3(disp, 0.0, 0.0) - mouseWave);

    // Compute dynamic surface normal for metallic specular lighting
    float eps = 0.015;
    float nL = fbm(coord - vec3(eps, 0.0, 0.0));
    float nR = fbm(coord + vec3(eps, 0.0, 0.0));
    float nD = fbm(coord - vec3(0.0, eps, 0.0));
    float nU = fbm(coord + vec3(0.0, eps, 0.0));
    vec3 normal = normalize(vec3(nL - nR, nD - nU, 0.35));

    // Spatial metallic light vector reacting to mouse position
    vec3 lightPos = normalize(vec3(m.x * 2.0, m.y * 2.0, 1.2));
    float diffuse = clamp(dot(normal, lightPos), 0.0, 1.0);

    // Specular highlight (liquid metal sheen)
    vec3 viewDir = vec3(0.0, 0.0, 1.0);
    vec3 halfDir = normalize(lightPos + viewDir);
    float spec = pow(max(dot(normal, halfDir), 0.0), 32.0);

    // Ambient theme mixing
    vec3 fluidColor = mix(u_color_a, u_color_b, smoothstep(-0.6, 0.6, noiseG));
    fluidColor += vec3(noiseR - noiseG, 0.0, noiseB - noiseG) * 0.3;

    // Base dark brutalist background composition
    vec3 darkBase = vec3(0.015, 0.02, 0.04);
    vec3 finalColor = mix(darkBase, fluidColor, 0.35 + mouseWave * 0.3);
    finalColor += u_color_a * spec * 0.8;
    finalColor += diffuse * u_color_b * 0.15;

    // Vignette
    float vig = 1.0 - smoothstep(0.4, 1.4, length(p));
    finalColor *= vig;

    gl_FragColor = vec4(finalColor, 0.95);
  }
`;

export function CanvasBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { colors } = useTheme();

  // Smooth mouse coordinates with spring-physics easing
  const mouseRef = useRef({ x: 0.5, y: 0.5, targetX: 0.5, targetY: 0.5 });
  // Interpolated GLSL color uniforms
  const colorsRef = useRef({
    currentA: [...colors.glslPrimary] as [number, number, number],
    targetA: [...colors.glslPrimary] as [number, number, number],
    currentB: [...colors.glslSecondary] as [number, number, number],
    targetB: [...colors.glslSecondary] as [number, number, number],
  });

  useEffect(() => {
    colorsRef.current.targetA = [...colors.glslPrimary];
    colorsRef.current.targetB = [...colors.glslSecondary];
  }, [colors]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl =
      canvas.getContext("webgl", { antialias: true, alpha: true }) ||
      (canvas.getContext("experimental-webgl") as WebGLRenderingContext | null);

    if (!gl) return;

    // Compile Shader Helper
    const createShader = (type: number, src: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, src);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertShader = createShader(gl.VERTEX_SHADER, VERTEX_SHADER_SRC);
    const fragShader = createShader(gl.FRAGMENT_SHADER, FRAGMENT_SHADER_SRC);
    if (!vertShader || !fragShader) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertShader);
    gl.attachShader(program, fragShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);

    // Full-screen Quad buffer
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );

    const posAttr = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(posAttr);
    gl.vertexAttribPointer(posAttr, 2, gl.FLOAT, false, 0, 0);

    // Uniform Locations
    const uTime = gl.getUniformLocation(program, "u_time");
    const uResolution = gl.getUniformLocation(program, "u_resolution");
    const uMouse = gl.getUniformLocation(program, "u_mouse");
    const uColorA = gl.getUniformLocation(program, "u_color_a");
    const uColorB = gl.getUniformLocation(program, "u_color_b");

    let animId: number;
    let startTime = performance.now();

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    resize();
    window.addEventListener("resize", resize);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = e.clientX / window.innerWidth;
      mouseRef.current.targetY = 1.0 - e.clientY / window.innerHeight;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Render Loop
    const render = (time: number) => {
      const elapsed = (time - startTime) * 0.001;

      // Spring-smoothed mouse interpolation
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.08;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.08;

      // Smooth color morphing
      for (let i = 0; i < 3; i++) {
        colorsRef.current.currentA[i] +=
          (colorsRef.current.targetA[i] - colorsRef.current.currentA[i]) * 0.06;
        colorsRef.current.currentB[i] +=
          (colorsRef.current.targetB[i] - colorsRef.current.currentB[i]) * 0.06;
      }

      gl.uniform1f(uTime, elapsed);
      gl.uniform2f(uResolution, canvas.width, canvas.height);
      gl.uniform2f(uMouse, mouseRef.current.x, mouseRef.current.y);
      gl.uniform3fv(uColorA, colorsRef.current.currentA);
      gl.uniform3fv(uColorB, colorsRef.current.currentB);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      gl.deleteProgram(program);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-35 transition-opacity duration-1000"
    />
  );
}
