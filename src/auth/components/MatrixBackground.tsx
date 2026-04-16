import { useEffect, useRef } from "react";

const MATRIX_CHARS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*+-<>[]{}()/\\|アイウエオカキクケコサシスセソ";

export const MatrixBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    canvas.width = width;
    canvas.height = height;

    const fontSize = 16;
    const columns = Math.floor(width / fontSize);
    const drops = Array(columns).fill(1);

    const resizeCanvas = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;

      const newColumns = Math.floor(width / fontSize);
      drops.length = 0;

      for (let i = 0; i < newColumns; i++) {
        drops.push(Math.random() * -100);
      }
    };

    const draw = () => {
      ctx.fillStyle = "rgba(2, 6, 23, 0.12)";
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = "#22c55e";
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text =
          MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)];

        const x = i * fontSize;
        const y = drops[i] * fontSize;

        ctx.fillText(text, x, y);

        if (y > height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        drops[i]++;
      }

      animationRef.current = requestAnimationFrame(draw);
    };

    window.addEventListener("resize", resizeCanvas);
    draw();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 h-full w-full bg-slate-950"
    />
  );
};