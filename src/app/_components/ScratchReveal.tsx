"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ScratchReveal({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isRevealed, setIsRevealed] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size to match window
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      // Fill with black paint
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Auto scratch animation
    let progress = 0;
    const startPoint = { x: canvas.width, y: 0 }; // Top-right corner
    const endPoint = { x: 0, y: canvas.height }; // Bottom-left corner

    const animateScratch = () => {
      if (progress >= 1) {
        setIsRevealed(true);
        return;
      }

      // Calculate current position along the diagonal
      const currentX = startPoint.x + (endPoint.x - startPoint.x) * progress;
      const currentY = startPoint.y + (endPoint.y - startPoint.y) * progress;

      // Create scratch effect with large brush
      ctx.globalCompositeOperation = "destination-out";
      ctx.lineWidth = 120; // Much bigger brush
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.strokeStyle = "rgba(0,0,0,1)";

      // Draw scratch line
      ctx.beginPath();
      ctx.moveTo(currentX, currentY);
      ctx.lineTo(currentX + 20, currentY + 20); // Small line segment
      ctx.stroke();

      // Add circular scratch for more coverage
      ctx.beginPath();
      ctx.arc(currentX, currentY, 60, 0, Math.PI * 2);
      ctx.fill();

      // Add some random smaller scratches around the main scratch
      for (let i = 0; i < 3; i++) {
        const offsetX = (Math.random() - 0.5) * 100;
        const offsetY = (Math.random() - 0.5) * 100;
        ctx.beginPath();
        ctx.arc(currentX + offsetX, currentY + offsetY, 30, 0, Math.PI * 2);
        ctx.fill();
      }

      progress += 0.02; // Speed of scratching
      animationRef.current = requestAnimationFrame(animateScratch);
    };

    // Start animation after a short delay
    const startDelay = setTimeout(() => {
      animateScratch();
    }, 500);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      clearTimeout(startDelay);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div className="relative h-full w-full">
      {/* Content underneath */}
      <div className={isRevealed ? "opacity-100" : "opacity-0"}>{children}</div>

      {/* Scratch overlay */}
      <AnimatePresence>
        {!isRevealed && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[9999]"
          >
            <canvas ref={canvasRef} className="h-full w-full" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
