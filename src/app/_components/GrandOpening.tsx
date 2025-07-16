"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// SVG flower inspired by the new image (5-petal, pink/orange/yellow)
function PlumeriaFlower({
  style = {},
  ...props
}: {
  style?: React.CSSProperties;
  [key: string]: unknown;
}) {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      style={style}
      {...props}
    >
      <g>
        {/* 5 petals */}
        {Array.from({ length: 5 }).map((_, i) => {
          const angle = (i * 360) / 5;
          return (
            <path
              key={i}
              d="M20 8 Q28 6 30 14 Q32 22 20 20 Q8 22 10 14 Q12 6 20 8 Z"
              fill="url(#petalGradient)"
              stroke="#d72660"
              strokeWidth="0.8"
              transform={`rotate(${angle} 20 20)`}
            />
          );
        })}
        {/* Petal gradient */}
        <defs>
          <radialGradient id="petalGradient" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor="#fffbe6" />
            <stop offset="60%" stopColor="#fbbfce" />
            <stop offset="100%" stopColor="#f78ca2" />
          </radialGradient>
        </defs>
        {/* Yellow center */}
        <circle
          cx="20"
          cy="20"
          r="4"
          fill="#ffd166"
          stroke="#f78ca2"
          strokeWidth="0.8"
        />
      </g>
    </svg>
  );
}

const NUM_FLOWERS = 18;

export default function GrandOpening({ onFinish }: { onFinish?: () => void }) {
  const [show, setShow] = useState(true);
  const [flowersIn, setFlowersIn] = useState(0);
  const [showRibbon, setShowRibbon] = useState(false);

  // Animate flowers one by one
  useEffect(() => {
    if (!show) return;
    if (flowersIn < NUM_FLOWERS) {
      const t = setTimeout(() => setFlowersIn(flowersIn + 1), 120);
      return () => clearTimeout(t);
    } else {
      // After all flowers, show ribbon
      const t = setTimeout(() => setShowRibbon(true), 500);
      // Hide after a bit
      const t2 = setTimeout(() => {
        setShow(false);
        onFinish?.();
      }, 2000);
      return () => {
        clearTimeout(t);
        clearTimeout(t2);
      };
    }
  }, [flowersIn, show, onFinish]);

  // Arrange flowers in a circle
  const flowers = Array.from({ length: NUM_FLOWERS }, (_, i) => {
    const angle = (2 * Math.PI * i) / NUM_FLOWERS;
    const r = 36;
    const x = 50 + Math.cos(angle) * r;
    const y = 50 + Math.sin(angle) * r;
    return { x, y };
  });

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{
            background:
              "linear-gradient(135deg, #fff 0%, #fbbfce 50%, #fff 100%)",
          }}
        >
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
            {/* Flowers in a circle */}
            {flowers.map((f, i) => (
              <motion.g
                key={i}
                initial={{ opacity: 0, scale: 0.7 }}
                animate={
                  i < flowersIn
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0, scale: 0.7 }
                }
                transition={{ delay: i * 0.08, duration: 0.5, type: "spring" }}
                style={{
                  transformOrigin: `${f.x.toFixed(2)}% ${f.y.toFixed(2)}%`,
                }}
              >
                <foreignObject
                  x={(f.x - 2).toFixed(2)}
                  y={(f.y - 2).toFixed(2)}
                  width={4}
                  height={4}
                >
                  <PlumeriaFlower />
                </foreignObject>
              </motion.g>
            ))}
            {/* Ribbon in the center */}
            {showRibbon && (
              <motion.path
                d="M50 20 Q55 50 50 80 Q45 50 50 20 Z"
                fill="url(#ribbonGradient)"
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 0.8, scale: 1 }}
                transition={{ duration: 0.8 }}
                style={{ filter: "blur(0.5px)" }}
              />
            )}
            <defs>
              <linearGradient
                id="ribbonGradient"
                x1="50"
                y1="20"
                x2="50"
                y2="80"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#fbbfce" />
                <stop offset="1" stopColor="#f78ca2" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
