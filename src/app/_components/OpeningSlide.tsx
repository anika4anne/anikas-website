"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";


function SmallFlower({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x}, ${y})`}>

      {Array.from({ length: 5 }).map((_, i) => {
        const angle = (i * 360) / 5;
        return (
          <path
            key={i}
            d="M0 -8 Q3 -9 4 -5 Q5 -1 0 -2 Q-5 -1 -4 -5 Q-3 -9 0 -8 Z"
            fill="url(#smallPetalGradient)"
            stroke="#d72660"
            strokeWidth="0.3"
            transform={`rotate(${angle})`}
          />
        );
      })}

      <circle
        cx="0"
        cy="0"
        r="1.5"
        fill="#ffd166"
        stroke="#f78ca2"
        strokeWidth="0.3"
      />
    </g>
  );
}

const NUM_FLOWERS = 32;

export default function OpeningSlide({ onFinish }: { onFinish?: () => void }) {
  const [show, setShow] = useState(true);
  const [flowersIn, setFlowersIn] = useState(0);


  useEffect(() => {
    if (!show) return;
    if (flowersIn < NUM_FLOWERS) {
      const t = setTimeout(() => setFlowersIn(flowersIn + 1), 100);
      return () => clearTimeout(t);
    } else {

      const t = setTimeout(() => {
        setShow(false);
        onFinish?.();
      }, 2000);
      return () => clearTimeout(t);
    }
  }, [flowersIn, show, onFinish]);

  const flowers = Array.from({ length: NUM_FLOWERS }, (_, i) => {
    const angle = (2 * Math.PI * i) / NUM_FLOWERS;
    const r = 35; // Circle radius
    const x = 50 + Math.cos(angle) * r;
    const y = 50 + Math.sin(angle) * r;
    return { x, y };
  });

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/20 backdrop-blur-sm"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative z-10 text-center"
          >
            <h1 className="text-5xl font-bold text-white drop-shadow-lg sm:text-7xl">
              Hi, I&apos;m Anika
            </h1>
          </motion.div>


          <svg
            width="100vw"
            height="100vh"
            viewBox="0 0 100 100"
            style={{
              position: "absolute",
              inset: 0,
              width: "100vw",
              height: "100vh",
              pointerEvents: "none",
            }}
          >

            <defs>
              <radialGradient id="smallPetalGradient" cx="50%" cy="50%" r="60%">
                <stop offset="0%" stopColor="#fffbe6" />
                <stop offset="60%" stopColor="#fbbfce" />
                <stop offset="100%" stopColor="#f78ca2" />
              </radialGradient>
            </defs>

            {flowers.map((f, i) => (
              <motion.g
                key={i}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={
                  i < flowersIn
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0, scale: 0.5 }
                }
                transition={{ delay: i * 0.06, duration: 0.4, type: "spring" }}
                style={{
                  transformOrigin: `${f.x.toFixed(2)}% ${f.y.toFixed(2)}%`,
                }}
              >
                <SmallFlower x={f.x} y={f.y} />
              </motion.g>
            ))}
          </svg>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
