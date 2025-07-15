"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface GrandOpeningProps {
  onComplete: () => void;
}

export default function GrandOpening({ onComplete }: GrandOpeningProps) {
  const [currentStage, setCurrentStage] = useState(0);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const stages = [
      2000, // Welcome text
      3000, // Name reveal
      2000, // Tagline
      2500, // Particle explosion
      1500, // Final flourish
    ];

    if (currentStage < stages.length) {
      const timer = setTimeout(() => {
        setCurrentStage(currentStage + 1);
      }, stages[currentStage]);

      return () => clearTimeout(timer);
    } else {
      // Animation complete
      setTimeout(() => {
        onComplete();
      }, 1000);
    }
  }, [currentStage, onComplete]);

  const particles = Array.from({ length: 50 }, (_, i) => i);
  const sparkles = Array.from({ length: 20 }, (_, i) => i);

  return (
    <AnimatePresence>
      {showContent && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-black"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Stable animated background */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-pink-900 to-blue-900" />

            {/* Floating geometric shapes */}
            {Array.from({ length: 12 }, (_, i) => (
              <motion.div
                key={i}
                className="animate-pulse-glow absolute h-4 w-4 rounded-full bg-white/20"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -30, 0],
                  opacity: [0.2, 0.8, 0.2],
                  scale: [1, 1.5, 1],
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 4 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}

            {/* Sparkles */}
            {sparkles.map((sparkle) => (
              <motion.div
                key={sparkle}
                className="animate-sparkle absolute text-2xl text-white/60"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 3,
                }}
              >
                ✨
              </motion.div>
            ))}
          </div>

          {/* Main content */}
          <div className="relative z-10 text-center">
            {/* Welcome text */}
            <AnimatePresence>
              {currentStage >= 0 && (
                <motion.div
                  key="welcome"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                  transition={{ duration: 0.8 }}
                  className="mb-8"
                >
                  <motion.h2
                    className="animate-pulse-glow mb-4 text-4xl font-bold text-white md:text-6xl"
                    animate={{
                      textShadow: [
                        "0 0 20px rgba(255,255,255,0.5)",
                        "0 0 40px rgba(255,255,255,0.8)",
                        "0 0 20px rgba(255,255,255,0.5)",
                      ],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    Welcome to My Website
                  </motion.h2>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Name reveal */}
            <AnimatePresence>
              {currentStage >= 1 && (
                <motion.div
                  key="name"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.2 }}
                  transition={{ duration: 1, type: "spring", bounce: 0.4 }}
                  className="mb-8"
                >
                  <motion.h1
                    className="animate-pulse-glow bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-6xl font-bold text-transparent md:text-8xl"
                    animate={{
                      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                      filter: [
                        "drop-shadow(0 0 20px rgba(236, 72, 153, 0.5))",
                        "drop-shadow(0 0 40px rgba(168, 85, 247, 0.8))",
                        "drop-shadow(0 0 20px rgba(236, 72, 153, 0.5))",
                      ],
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                    style={{
                      backgroundSize: "200% 200%",
                    }}
                  >
                    ANIKA ANNE
                  </motion.h1>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Tagline */}
            <AnimatePresence>
              {currentStage >= 2 && (
                <motion.div
                  key="tagline"
                  initial={{ opacity: 0, x: -100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 100 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="mb-8"
                >
                  <motion.p
                    className="text-xl font-light text-white/80 md:text-2xl"
                    animate={{
                      opacity: [0.8, 1, 0.8],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    Dancer • Singer • Pianist • Coder • CADer • Creative Soul
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Enhanced particle explosion */}
            <AnimatePresence>
              {currentStage >= 3 && (
                <motion.div
                  key="particles"
                  className="pointer-events-none absolute inset-0"
                >
                  {particles.map((particle) => (
                    <motion.div
                      key={particle}
                      className="animate-pulse-glow absolute h-2 w-2 rounded-full bg-gradient-to-r from-pink-400 to-purple-400"
                      style={{
                        left: "50%",
                        top: "50%",
                      }}
                      initial={{ scale: 0, opacity: 1 }}
                      animate={{
                        x: (Math.random() - 0.5) * 800,
                        y: (Math.random() - 0.5) * 600,
                        scale: [0, 1, 0],
                        opacity: [1, 1, 0],
                        rotate: [0, 360],
                      }}
                      transition={{
                        duration: 2,
                        delay: Math.random() * 0.5,
                        ease: "easeOut",
                      }}
                    />
                  ))}

                  {/* Additional sparkle burst */}
                  {Array.from({ length: 15 }, (_, i) => (
                    <motion.div
                      key={`sparkle-${i}`}
                      className="absolute text-2xl"
                      style={{
                        left: "50%",
                        top: "50%",
                      }}
                      initial={{ scale: 0, opacity: 1 }}
                      animate={{
                        x: (Math.random() - 0.5) * 600,
                        y: (Math.random() - 0.5) * 400,
                        scale: [0, 1, 0],
                        opacity: [1, 1, 0],
                        rotate: [0, 720],
                      }}
                      transition={{
                        duration: 2.5,
                        delay: Math.random() * 0.8,
                        ease: "easeOut",
                      }}
                    >
                      ✨
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Final flourish */}
            <AnimatePresence>
              {currentStage >= 4 && (
                <motion.div
                  key="flourish"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.5 }}
                  transition={{ duration: 0.8, type: "spring" }}
                  className="mt-8"
                >
                  <motion.div
                    className="text-lg text-white/60"
                    animate={{
                      opacity: [0.6, 1, 0.6],
                    }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    ✨ Entering the creative universe ✨
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Enhanced loading bar */}
          <motion.div
            className="animate-pulse-glow absolute bottom-10 left-1/2 h-2 w-64 -translate-x-1/2 transform overflow-hidden rounded-full bg-white/20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <motion.div
              className="h-full bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 12, ease: "easeInOut" }}
            />
          </motion.div>

          {/* Corner decorations */}
          <motion.div
            className="absolute top-8 left-8 text-4xl text-white/40"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          >
            🌟
          </motion.div>
          <motion.div
            className="absolute top-8 right-8 text-4xl text-white/40"
            animate={{ rotate: [360, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          >
            ✨
          </motion.div>
          <motion.div
            className="absolute bottom-20 left-8 text-4xl text-white/40"
            animate={{ rotate: [0, -360] }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          >
            💫
          </motion.div>
          <motion.div
            className="absolute right-8 bottom-20 text-4xl text-white/40"
            animate={{ rotate: [-360, 0] }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          >
            ⭐
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
