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

    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;


      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);


    let progress = 0;
    const startPoint = { x: canvas.width, y: 0 }; 
    const endPoint = { x: 0, y: canvas.height }; 

    const animateScratch = () => {
      if (progress >= 1) {
        setIsRevealed(true);
        return;
      }


      const currentX = startPoint.x + (endPoint.x - startPoint.x) * progress;
      const currentY = startPoint.y + (endPoint.y - startPoint.y) * progress;


      ctx.globalCompositeOperation = "destination-out";
      ctx.lineWidth = 120; 
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.strokeStyle = "rgba(0,0,0,1)";


      ctx.beginPath();
      ctx.moveTo(currentX, currentY);
      ctx.lineTo(currentX + 20, currentY + 20);

   
      ctx.beginPath();
      ctx.arc(currentX, currentY, 60, 0, Math.PI * 2);
      ctx.fill();

  
      for (let i = 0; i < 3; i++) {
        const offsetX = (Math.random() - 0.5) * 100;
        const offsetY = (Math.random() - 0.5) * 100;
        ctx.beginPath();
        ctx.arc(currentX + offsetX, currentY + offsetY, 30, 0, Math.PI * 2);
        ctx.fill();
      }

      progress += 0.02; 
      animationRef.current = requestAnimationFrame(animateScratch);
    };

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
      <div className={isRevealed ? "opacity-100" : "opacity-0"}>{children}</div>

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
