"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const projects = [
  {
    title: "Guess The Jam",
    description:
      "A music guessing game powered by the YouTube Data API and Next.js",
    image: "/guess-the-jam.png",
    details: [
      "Used YouTube Data API to fetch playlist items.",
      "Filtered results and displayed song previews in a game interface.",
      "Designed with Framer Motion for UI polish.",
    ],
  },
  {
    title: "Jaybots CAD",
    description:
      "3D-modeled and manufactured parts for our FTC robot using OnShape.",
    image: "",
    details: [
      "Created precise 3D models in OnShape.",
      "Exported STLs and managed 3D printer at competitions.",
      "Led workshops for students on manufacturing in STEM.",
    ],
  },
  {
    title: "Science Olympiad Site",
    description:
      "Responsive site built in Next.js to manage events, newsletters, and alumni filtering.",
    image: "/scioly.png",
    details: [
      "Built filterable and newsletter sections with dynamic routing.",
      "Used Tailwind and Next.js App Router.",
      "Designed responsive layouts with smooth animations.",
    ],
  },
];

const skills = [
  {
    name: "Next.js",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
    category: "Frontend",
  },
  {
    name: "React",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    category: "Frontend",
  },
  {
    name: "TypeScript",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    category: "Language",
  },
  {
    name: "JavaScript",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    category: "Language",
  },
  {
    name: "Python",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    category: "Language",
  },
  {
    name: "Node.js",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    category: "Backend",
  },
  {
    name: "Tailwind CSS",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg",
    category: "Styling",
  },
  {
    name: "Prisma",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prisma/prisma-original.svg",
    category: "Database",
  },
  {
    name: "Git",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    category: "Tools",
  },
  {
    name: "OnShape",
    logo: "https://www.onshape.com/favicon.ico",
    category: "CAD",
  },
];

const sections = [
  {
    id: "home",
    title: "Hi, I'm Anika",
    subtitle: "Dancer. Singer. Pianist. Coder. CADer. Creative soul.",
    gradient: ["#6d28d9", "#be185d", "#312e81"], // purple, pink, purple
  },
  {
    id: "skills",
    title: "Skills",
    subtitle:
      "Familiar with a variety of programming languages and tools, including Python, JavaScript, React, Node.js, and more.",
    gradient: ["#6d28d9", "#2563eb", "#312e81"], // purple, blue, purple
  },
  {
    id: "projects",
    title: "Projects",
    subtitle:
      "From web apps to CAD models — here's where code meets creativity.",
    gradient: ["#6d28d9", "#14b8a6", "#312e81"], // purple, teal, purple
  },
  {
    id: "about",
    title: "About Me",
    subtitle:
      "Performer, maker, problem solver. I use code, music, and motion to tell stories.",
    gradient: ["#6d28d9", "#fbbf24", "#312e81"], // purple, gold, purple
  },
];

type Project = {
  title: string;
  description: string;
  image: string;
  details: string[];
};

function interpolateColor(color1: string, color2: string, factor: number) {
  // color1, color2: hex strings, factor: 0-1
  const c1Match = color1.match(/#(..)(..)(..)/);
  const c2Match = color2.match(/#(..)(..)(..)/);
  const c1 = c1Match ? c1Match.slice(1).map((x) => parseInt(x, 16)) : [0, 0, 0];
  const c2 = c2Match ? c2Match.slice(1).map((x) => parseInt(x, 16)) : [0, 0, 0];
  // Ensure both arrays have length 3
  while (c1.length < 3) c1.push(0);
  while (c2.length < 3) c2.push(0);
  const result = c1.map((v, i) => Math.round(v + ((c2[i] ?? 0) - v) * factor));
  return `rgb(${result[0]},${result[1]},${result[2]})`;
}

function useSectionScrollGradients(
  sectionIds: string[],
  gradientsInput: string[][],
) {
  const fallback: [string, string, string] = ["#6d28d9", "#6d28d9", "#6d28d9"];
  // Helper to ensure a [string, string, string] gradient
  function getSafeGradient(arr: unknown): [string, string, string] {
    return Array.isArray(arr) &&
      arr.length === 3 &&
      arr.every((x) => typeof x === "string")
      ? ([arr[0], arr[1], arr[2]] as [string, string, string])
      : fallback;
  }

  const initialGradient = getSafeGradient(gradientsInput[0] ?? fallback);
  const [bgGradient, setBgGradient] = useState<string[]>(initialGradient);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    sectionRefs.current = sectionIds.map((id) => document.getElementById(id));
    const onScroll = () => {
      const scrollY = window.scrollY + window.innerHeight / 2;
      let idx = 0;
      for (let i = 0; i < sectionRefs.current.length - 1; i++) {
        const curr = sectionRefs.current[i];
        const next = sectionRefs.current[i + 1];
        if (curr && next) {
          const currTop = curr.offsetTop;
          const nextTop = next.offsetTop;
          if (scrollY >= currTop && scrollY < nextTop) {
            idx = i;
            break;
          }
          if (scrollY >= nextTop) {
            idx = i + 1;
          }
        }
      }
      // Interpolate between gradients
      let t = 0;
      const curr = sectionRefs.current[idx];
      const next = sectionRefs.current[idx + 1];
      if (curr && next) {
        const currTop = curr.offsetTop;
        const nextTop = next.offsetTop;
        t = Math.min(1, Math.max(0, (scrollY - currTop) / (nextTop - currTop)));
      }
      const safeIdx = Math.max(0, Math.min(idx, gradientsInput.length - 1));
      const safeNextIdx = Math.max(
        0,
        Math.min(idx + 1, gradientsInput.length - 1),
      );
      const g1raw = getSafeGradient(gradientsInput[safeIdx] ?? fallback);
      const g2raw = getSafeGradient(gradientsInput[safeNextIdx] ?? fallback);
      const g1 = g1raw;
      const g2 = g2raw;
      setBgGradient([
        interpolateColor(g1[0], g2[0], t),
        interpolateColor(g1[1], g2[1], t),
        interpolateColor(g1[2], g2[2], t),
      ]);
    };
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [sectionIds, gradientsInput]);

  return bgGradient;
}

function AnimatedBackground({ gradient }: { gradient: string[] }) {
  // Sparkles and floating shapes for the hero section only
  return (
    <div
      className="fixed inset-0 -z-10 h-full w-full transition-colors duration-700"
      style={{
        background: `linear-gradient(135deg, ${gradient[0]}, ${gradient[1]}, ${gradient[2]})`,
      }}
    >
      {/* Sparkles and shapes only for the top section */}
      {/* Optionally, you can add sparkles for all sections or just the first */}
    </div>
  );
}

export default function HomePage() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const sectionIds = sections.map((s) => s.id);
  const gradients = sections.map((s) => s.gradient);
  const bgGradient = useSectionScrollGradients(sectionIds, gradients);

  return (
    <div className="relative z-0 min-h-screen scroll-smooth text-white">
      <AnimatedBackground gradient={bgGradient} />
      {/* Header */}
      <header className="fixed top-0 z-50 w-full bg-transparent text-white backdrop-blur-md">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <motion.div
            className="cursor-pointer text-xl font-bold"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Anika Anne
          </motion.div>
          <ul className="flex space-x-6 text-sm sm:text-base">
            {sections.map((section, index) => (
              <motion.li
                key={section.id}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <motion.a
                  href={`#${section.id}`}
                  className="relative transition-colors duration-200 hover:text-pink-200"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {section.id.charAt(0).toUpperCase() + section.id.slice(1)}
                  <motion.div
                    className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-pink-400 to-purple-500"
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.a>
              </motion.li>
            ))}
          </ul>
        </nav>
      </header>
      {/* Page Sections */}
      {sections.map((section, idx) => (
        <section
          key={section.id}
          id={section.id}
          className={`relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-24 text-center`}
        >
          {/* Detailed flower vines for home section */}
          {section.id === "home" && (
            <>
              {/* Left detailed flower vine */}
              <svg
                className="absolute top-0 left-0 z-0 opacity-40"
                width="320"
                height="600"
                viewBox="0 0 320 600"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ pointerEvents: "none" }}
              >
                <path
                  d="M60 580 Q120 500 80 420 Q40 340 160 300 Q280 260 220 160 Q160 60 300 100"
                  stroke="#7dd87d"
                  strokeWidth="6"
                  fill="none"
                  strokeLinecap="round"
                />
                {/* Leaves */}
                <ellipse
                  cx="100"
                  cy="500"
                  rx="18"
                  ry="8"
                  fill="#5cb85c"
                  transform="rotate(-30 100 500)"
                />
                <ellipse
                  cx="140"
                  cy="350"
                  rx="14"
                  ry="7"
                  fill="#5cb85c"
                  transform="rotate(20 140 350)"
                />
                <ellipse
                  cx="200"
                  cy="250"
                  rx="16"
                  ry="8"
                  fill="#5cb85c"
                  transform="rotate(-15 200 250)"
                />
                <ellipse
                  cx="250"
                  cy="120"
                  rx="12"
                  ry="6"
                  fill="#5cb85c"
                  transform="rotate(10 250 120)"
                />
                {/* Flowers */}
                <g>
                  <circle
                    cx="60"
                    cy="580"
                    r="18"
                    fill="#f9c2ff"
                    stroke="#e75480"
                    strokeWidth="4"
                  />
                  <circle
                    cx="80"
                    cy="420"
                    r="14"
                    fill="#fff7ae"
                    stroke="#e7b54a"
                    strokeWidth="3"
                  />
                  <circle
                    cx="160"
                    cy="300"
                    r="16"
                    fill="#b3e6ff"
                    stroke="#3b82f6"
                    strokeWidth="3"
                  />
                  <circle
                    cx="220"
                    cy="160"
                    r="12"
                    fill="#ffd6e0"
                    stroke="#e75480"
                    strokeWidth="2"
                  />
                  <circle
                    cx="300"
                    cy="100"
                    r="10"
                    fill="#c2f9ef"
                    stroke="#38b2ac"
                    strokeWidth="2"
                  />
                </g>
                {/* Flower centers */}
                <circle cx="60" cy="580" r="5" fill="#e75480" />
                <circle cx="80" cy="420" r="4" fill="#e7b54a" />
                <circle cx="160" cy="300" r="5" fill="#3b82f6" />
                <circle cx="220" cy="160" r="3" fill="#e75480" />
                <circle cx="300" cy="100" r="3" fill="#38b2ac" />
              </svg>
              {/* Right detailed flower vine */}
              <svg
                className="absolute right-0 bottom-0 z-0 opacity-40"
                width="320"
                height="600"
                viewBox="0 0 320 600"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ pointerEvents: "none" }}
              >
                <path
                  d="M260 20 Q200 100 240 180 Q280 260 160 300 Q40 340 100 440 Q160 540 20 500"
                  stroke="#7dd87d"
                  strokeWidth="6"
                  fill="none"
                  strokeLinecap="round"
                />
                {/* Leaves */}
                <ellipse
                  cx="220"
                  cy="100"
                  rx="18"
                  ry="8"
                  fill="#5cb85c"
                  transform="rotate(30 220 100)"
                />
                <ellipse
                  cx="180"
                  cy="250"
                  rx="14"
                  ry="7"
                  fill="#5cb85c"
                  transform="rotate(-20 180 250)"
                />
                <ellipse
                  cx="120"
                  cy="350"
                  rx="16"
                  ry="8"
                  fill="#5cb85c"
                  transform="rotate(15 120 350)"
                />
                <ellipse
                  cx="70"
                  cy="480"
                  rx="12"
                  ry="6"
                  fill="#5cb85c"
                  transform="rotate(-10 70 480)"
                />
                {/* Flowers */}
                <g>
                  <circle
                    cx="260"
                    cy="20"
                    r="18"
                    fill="#f9c2ff"
                    stroke="#e75480"
                    strokeWidth="4"
                  />
                  <circle
                    cx="240"
                    cy="180"
                    r="14"
                    fill="#fff7ae"
                    stroke="#e7b54a"
                    strokeWidth="3"
                  />
                  <circle
                    cx="160"
                    cy="300"
                    r="16"
                    fill="#b3e6ff"
                    stroke="#3b82f6"
                    strokeWidth="3"
                  />
                  <circle
                    cx="100"
                    cy="440"
                    r="12"
                    fill="#ffd6e0"
                    stroke="#e75480"
                    strokeWidth="2"
                  />
                  <circle
                    cx="20"
                    cy="500"
                    r="10"
                    fill="#c2f9ef"
                    stroke="#38b2ac"
                    strokeWidth="2"
                  />
                </g>
                {/* Flower centers */}
                <circle cx="260" cy="20" r="5" fill="#e75480" />
                <circle cx="240" cy="180" r="4" fill="#e7b54a" />
                <circle cx="160" cy="300" r="5" fill="#3b82f6" />
                <circle cx="100" cy="440" r="3" fill="#e75480" />
                <circle cx="20" cy="500" r="3" fill="#38b2ac" />
              </svg>
            </>
          )}

          <motion.h2
            className="text-4xl font-extrabold drop-shadow-lg sm:text-6xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {section.title}
          </motion.h2>
          <motion.p
            className="mt-4 max-w-2xl text-lg text-white/90 sm:text-xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {section.subtitle}
          </motion.p>

          {section.id === "projects" && (
            <div className="mt-12 grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-2">
              {projects.map((project) => (
                <motion.a
                  key={project.title}
                  onClick={() => setSelectedProject(project)}
                  className="cursor-pointer rounded-2xl border border-white/10 bg-white/10 p-6 text-left backdrop-blur-lg transition hover:scale-105 hover:bg-white/20"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-xl font-semibold text-white">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-sm text-white/80">
                    {project.description}
                  </p>
                </motion.a>
              ))}
            </div>
          )}

          {section.id === "skills" && (
            <div className="mt-12 grid max-w-4xl grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  className="group relative flex flex-col items-center rounded-2xl border border-white/10 bg-white/10 p-6 backdrop-blur-lg transition-all duration-300 hover:scale-105 hover:border-white/30 hover:bg-white/20"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{
                    scale: 1.05,
                    rotateY: 5,
                    boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
                  }}
                >
                  {/* Glowing effect on hover */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-pink-400/20 to-purple-600/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  <div className="relative mb-4">
                    <motion.img
                      src={skill.logo}
                      alt={`${skill.name} logo`}
                      className="h-16 w-16 transition-all duration-300 group-hover:scale-110 group-hover:drop-shadow-lg"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = "none";
                        const fallback =
                          target.nextElementSibling as HTMLElement;
                        if (fallback) fallback.style.display = "block";
                      }}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    />
                    <div
                      className="flex hidden h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-pink-400 to-purple-600 text-lg font-bold text-white shadow-lg"
                      style={{ display: "none" }}
                    >
                      {skill.name.charAt(0)}
                    </div>
                  </div>
                  <h3 className="relative text-center text-sm font-semibold text-white transition-all duration-300 group-hover:scale-105 group-hover:text-pink-200">
                    {skill.name}
                  </h3>

                  {/* Floating sparkles */}
                  <div className="pointer-events-none absolute inset-0">
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute h-1 w-1 rounded-full bg-pink-400"
                        animate={{
                          y: [0, -10, 0],
                          opacity: [0, 1, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.5,
                        }}
                        style={{
                          left: `${30 + i * 20}%`,
                          top: `${20 + i * 30}%`,
                        }}
                      />
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {section.id === "about" && (
            <div className="mt-12 w-full max-w-4xl">
              <motion.div
                className="flex flex-col items-center space-y-8 rounded-3xl border border-white/20 bg-white/10 p-8 shadow-2xl backdrop-blur-xl"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <motion.div
                  className="flex items-center space-x-4"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-pink-400 to-purple-500 text-2xl">
                    👋
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">
                      Hi! I'm Anika Anne
                    </h3>
                    <p className="text-lg text-white/80">
                      10th Grader at John Jay High School
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  className="max-w-3xl text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <p className="text-lg leading-relaxed text-white/90">
                    I'm a student at John Jay High School, pursuing my passion
                    for technology and innovation. With a love for coding in my
                    free time and hands-on experience with CAD for FTC robotics,
                    I combine creativity with technical precision. I have strong
                    skills in web development and 3D modeling, as well as
                    experience with frameworks like Next.js, React, and CAD
                    software.
                  </p>
                </motion.div>

                <motion.div
                  className="mt-6 flex flex-wrap justify-center gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  <span className="rounded-full border border-pink-400/30 bg-pink-500/20 px-4 py-2 text-sm font-medium text-pink-200">
                    Web Development
                  </span>
                  <span className="rounded-full border border-purple-400/30 bg-purple-500/20 px-4 py-2 text-sm font-medium text-purple-200">
                    CAD Design
                  </span>
                  <span className="rounded-full border border-blue-400/30 bg-blue-500/20 px-4 py-2 text-sm font-medium text-blue-200">
                    FTC Robotics
                  </span>
                  <span className="rounded-full border border-green-400/30 bg-green-500/20 px-4 py-2 text-sm font-medium text-green-200">
                    Next.js
                  </span>
                  <span className="rounded-full border border-yellow-400/30 bg-yellow-500/20 px-4 py-2 text-sm font-medium text-yellow-200">
                    React
                  </span>
                </motion.div>
              </motion.div>
            </div>
          )}
        </section>
      ))}

      {/* Modal */}
      {selectedProject && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Siri-style animated background */}
          <div className="absolute inset-0 -z-10 animate-[gradient_8s_ease_in_out_infinite] bg-gradient-to-br from-pink-400 via-purple-400 to-indigo-400 bg-[length:300%_300%] opacity-20 blur-3xl" />

          {/* Modal box */}
          <motion.div
            className="relative mx-4 flex w-full max-w-4xl flex-col gap-6 rounded-2xl border border-white/30 bg-white/10 p-6 text-white shadow-2xl backdrop-blur-xl sm:mx-6 md:mx-auto md:flex-row"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 text-xl font-bold text-white hover:text-pink-300"
            >
              ×
            </button>

            {/* Left side: text content */}
            <div className="flex-1">
              <h2 className="text-2xl font-bold">{selectedProject.title}</h2>
              <p className="mt-4 text-sm text-white/90">
                {selectedProject.description}
              </p>
              <div className="mt-4 text-sm">
                <p className="font-medium text-white">Here's what I did:</p>
                <ul className="mt-2 list-disc pl-5 text-white/90">
                  {selectedProject.details.map((point, index) => (
                    <li key={index}>{point}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right side: image */}
            <div className="flex flex-shrink-0 items-center justify-center md:w-60">
              <img
                src={selectedProject.image}
                alt={`${selectedProject.title} preview`}
                className="h-48 w-full rounded-xl object-cover shadow-md md:h-60"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
