"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const projects = [
  {
    title: "TEDI - The Environmental Defense Initiative",
    description:
      "A student-led environmental organization, built with Next.js and Tailwind CSS.",
    image: "/TEDI.webp",
    details: [
      "Used YouTube Data API to fetch playlist items.",
      "Filtered results and displayed song previews in a game interface.",
      "Designed with Framer Motion for UI polish.",
    ],
  },
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
    id: "about",
    title: "Hi, I'm Anika",
    subtitle: "Dancer. Singer. Pianist. Coder. CADer. Creative soul.",
    gradient: ["#1e1b4b", "#831843", "#0f172a"], // dark purple, dark pink, dark blue
  },
  {
    id: "skills",
    title: "Skills",
    subtitle:
      "Familiar with a variety of programming languages and tools, including Python, JavaScript, React, Node.js, and more.",
    gradient: ["#1e1b4b", "#1e3a8a", "#0f172a"], // dark purple, dark blue, dark blue
  },
  {
    id: "projects",
    title: "Projects",
    subtitle:
      "From web apps to CAD models — here's where code meets creativity.",
    gradient: ["#1e1b4b", "#134e4a", "#0f172a"], // dark purple, dark teal, dark blue
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
  const hexReg = /#(..)(..)(..)/;
  const c1Match = hexReg.exec(color1);
  const c2Match = hexReg.exec(color2);
  const c1 = c1Match
    ? [c1Match[1] ?? "00", c1Match[2] ?? "00", c1Match[3] ?? "00"].map((x) =>
        parseInt(x, 16),
      )
    : [0, 0, 0];
  const c2 = c2Match
    ? [c2Match[1] ?? "00", c2Match[2] ?? "00", c2Match[3] ?? "00"].map((x) =>
        parseInt(x, 16),
      )
    : [0, 0, 0];
  while (c1.length < 3) c1.push(0);
  while (c2.length < 3) c2.push(0);
  const result = c1.map((v, i) => Math.round(v + ((c2[i] ?? 0) - v) * factor));
  return `rgb(${result[0]},${result[1]},${result[2]})`;
}

function useSectionScrollGradients(
  sectionIds: string[],
  gradientsInput: string[][],
) {
  const fallback: [string, string, string] = ["#1e1b4b", "#1e1b4b", "#1e1b4b"];
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
  }, [sectionIds, gradientsInput, fallback, getSafeGradient]);

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
                  className="relative transition-colors duration-200 hover:text-purple-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {section.id.charAt(0).toUpperCase() + section.id.slice(1)}
                  <motion.div
                    className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-purple-600 to-indigo-600"
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
      {sections.map((section) => (
        <section
          key={section.id}
          id={section.id}
          className={`relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-24 text-center`}
        >
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
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-600/20 to-indigo-600/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  <div className="relative mb-4">
                    <Image
                      src={skill.logo}
                      alt={`${skill.name} logo`}
                      width={64}
                      height={64}
                      className="h-16 w-16 transition-all duration-300 group-hover:scale-110 group-hover:drop-shadow-lg"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = "none";
                        const fallback =
                          target.nextElementSibling as HTMLElement;
                        if (fallback) fallback.style.display = "block";
                      }}
                    />
                    <div
                      className="flex hidden h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-purple-800 to-indigo-800 text-lg font-bold text-white shadow-lg"
                      style={{ display: "none" }}
                    >
                      {skill.name.charAt(0)}
                    </div>
                  </div>
                  <h3 className="relative text-center text-sm font-semibold text-white transition-all duration-300 group-hover:scale-105 group-hover:text-purple-300">
                    {skill.name}
                  </h3>

                  {/* Floating sparkles */}
                  <div className="pointer-events-none absolute inset-0">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className="absolute h-1 w-1 rounded-full bg-purple-400"
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
            <div className="mt-12 w-full max-w-5xl">
              <motion.div
                className="flex flex-col items-center space-y-12 rounded-3xl border border-white/20 bg-white/10 p-12 shadow-2xl backdrop-blur-xl"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                {/* Hero section with larger profile */}
                <motion.div
                  className="flex flex-col items-center space-y-6 text-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-r from-purple-800 via-indigo-800 to-slate-900 text-4xl shadow-2xl">
                    👋
                  </div>
                  <div>
                    <h3 className="mb-2 text-4xl font-bold text-white">
                      Hi! I&apos;m Anika Anne
                    </h3>
                    <p className="text-xl text-white/80">
                      10th Grader at John Jay High School
                    </p>
                  </div>
                </motion.div>

                {/* Enhanced description */}
                <motion.div
                  className="max-w-4xl text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <p className="mb-6 text-xl leading-relaxed text-white/90">
                    I&apos;m a passionate student at John Jay High School,
                    diving deep into the world of technology and innovation.
                    When I&apos;m not coding in my free time, you&apos;ll find
                    me designing 3D models for FTC robotics or exploring new
                    frameworks and tools. I love combining creativity with
                    technical precision to bring ideas to life.
                  </p>
                  <p className="text-lg leading-relaxed text-white/80">
                    My journey spans from web development with Next.js and React
                    to CAD modeling with OnShape, always pushing the boundaries
                    of what&apos;s possible through code and design.
                  </p>
                </motion.div>

                {/* Enhanced tags with better styling */}
                <motion.div
                  className="flex flex-wrap justify-center gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  <span className="rounded-full border border-red-600/30 bg-red-900/20 px-6 py-3 text-base font-medium text-red-300 backdrop-blur-sm transition-colors hover:bg-red-900/30">
                    Web Development
                  </span>
                  <span className="rounded-full border border-purple-600/30 bg-purple-900/20 px-6 py-3 text-base font-medium text-purple-300 backdrop-blur-sm transition-colors hover:bg-purple-900/30">
                    CAD Design
                  </span>
                  <span className="rounded-full border border-blue-600/30 bg-blue-900/20 px-6 py-3 text-base font-medium text-blue-300 backdrop-blur-sm transition-colors hover:bg-blue-900/30">
                    FTC Robotics
                  </span>
                  <span className="rounded-full border border-emerald-600/30 bg-emerald-900/20 px-6 py-3 text-base font-medium text-emerald-300 backdrop-blur-sm transition-colors hover:bg-emerald-900/30">
                    Next.js
                  </span>
                  <span className="rounded-full border border-amber-600/30 bg-amber-900/20 px-6 py-3 text-base font-medium text-amber-300 backdrop-blur-sm transition-colors hover:bg-amber-900/30">
                    React
                  </span>
                  <span className="rounded-full border border-indigo-600/30 bg-indigo-900/20 px-6 py-3 text-base font-medium text-indigo-300 backdrop-blur-sm transition-colors hover:bg-indigo-900/30">
                    TypeScript
                  </span>
                </motion.div>

                {/* Call to action */}
                <motion.div
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                >
                  <p className="mb-4 text-lg text-white/70">
                    Scroll down to explore my skills and projects
                  </p>
                  <div className="flex justify-center">
                    <motion.div
                      className="flex h-10 w-6 justify-center rounded-full border-2 border-white/30"
                      animate={{ y: [0, 10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <motion.div
                        className="mt-2 h-3 w-1 rounded-full bg-white/60"
                        animate={{ y: [0, 12, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    </motion.div>
                  </div>
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
          <div className="absolute inset-0 -z-10 animate-[gradient_8s_ease_in_out_infinite] bg-gradient-to-br from-purple-800 via-indigo-800 to-slate-900 bg-[length:300%_300%] opacity-20 blur-3xl" />

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
              className="absolute top-4 right-4 text-xl font-bold text-white hover:text-purple-300"
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
                <p className="font-medium text-white">
                  Here&apos;s what I did:
                </p>
                <ul className="mt-2 list-disc pl-5 text-white/90">
                  {selectedProject.details.map((point, index) => (
                    <li key={index}>{point}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right side: image */}
            <div className="flex flex-shrink-0 items-center justify-center md:w-[400px]">
              <Image
                src={selectedProject.image}
                alt={`${selectedProject.title} preview`}
                width={600}
                height={400}
                className="h-64 w-full rounded-xl object-cover shadow-md md:h-80"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
