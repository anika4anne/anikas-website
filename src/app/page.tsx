"use client";

import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const projects = [
  {
    title: "Guess The Jam",
    description: "A music guessing game made with YouTube Data API and Next.js",
    image: "/guess-the-jam.png",
    details: [
      "Used YouTube Data API to fetch playlist items.",
      "Filtered results and displayed song previews",
    ],
  },
  {
    title: "TEDI - The Environmental Defense Initiative",
    description:
      "A student-led environmental organization, website built to raise awareness",
    image: "/TEDI.webp",
    details: [
      "currently I am the Chief Website Designer",
      "Updated incoming officers",
    ],
  },
  {
    title: "Jaybots CAD",
    description:
      "3D-modeled and manufactured parts for FTC robot using OnShape (2025-26)",
    image: "/vw.png",
    details: [
      "Created precise 3D models in OnShape.",
      "Exported STLs and managed 3D printer at competitions.",
      "Led workshops for students on manufacturing in STEM.",
    ],
  },
  {
    title: "Science Olympiad Site",
    description:
      "Website for Science Olympiad Club at my school to help students prepare for competitions",
    image: "/scioly.png",
    details: [
      "AI-generated practice tests based on student's weaknesses",
      "Used Tailwind and Next.js App Router",
      "Designed to be user-friendly",
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
    gradient: ["#1e3a8a", "#2563eb", "#1e40af"], // dark blue, blue, dark blue
  },
  {
    id: "projects",
    title: "Projects",
    subtitle:
      "From web apps to CAD models — here's where code meets creativity.",
    gradient: ["#064e3b", "#166534", "#14532d"], // dark green, green, dark green
  },
  {
    id: "hobbies",
    title: "Hobbies",
    subtitle:
      "Beyond coding and design — here's what I love to do in my free time.",
    gradient: ["#1e1b4b", "#581c87", "#0f172a"], // dark purple, dark purple, dark blue
  },
];

type Project = {
  title: string;
  description: string;
  image: string;
  details: string[];
};

function interpolateColor(color1: string, color2: string, factor: number) {
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
  const fallback = useMemo(
    (): [string, string, string] => ["#1e1b4b", "#1e1b4b", "#1e1b4b"],
    [],
  );

  const getSafeGradient = useCallback(
    (arr: unknown): [string, string, string] => {
      return Array.isArray(arr) &&
        arr.length === 3 &&
        arr.every((x) => typeof x === "string")
        ? ([arr[0], arr[1], arr[2]] as [string, string, string])
        : fallback;
    },
    [fallback],
  );

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
  return (
    <div
      className="fixed inset-0 -z-10 h-full w-full transition-colors duration-700"
      style={{
        background: `linear-gradient(135deg, ${gradient[0]}, ${gradient[1]}, ${gradient[2]})`,
      }}
    ></div>
  );
}

const hobbies = [
  {
    icon: "💃",
    label: "Dancing",
    centerImage: "/dance.png",
    achievements: [
      {
        year: "2026",
        title: "Kuchipudi Rangapravesam",
        description: "Solo debut performance (Graduation)",
      },
      {
        year: "2014",
        title: "First Performance",
        description: "At age of 4, performed dance at temple",
      },
    ],
    backText: "I love to dance! It keeps me active and creative.",
  },
  {
    icon: "🤖",
    label: "Roboticist",
    centerImage: "/worlds.jpg",
    achievements: [
      {
        year: "2025",
        title: "FTC Worlds Championship",
        description: "Team Won Judge's Choice Award",
      },
      {
        year: "2024",
        title: "Manufacturer",
        description: "In charge of 3D printing",
      },
      {
        year: "2024",
        title: "Webmaster",
        description: "Given role to manage team website at jaybots.org",
      },
    ],
    backText: "Drawing and painting are my favorite ways to relax.",
  },
  {
    icon: "🏐",
    label: "Volleyball",
    centerImage: "/vb.png",
    achievements: [
      {
        year: "2025",
        title: "Lefty Setter",
        description: "Evolved from a right-side hitter to setter",
      },
      {
        year: "2023",
        title: "School Team (8th Grade)",
        description:
          "Made the team in 8th grade after spending the summer training following a 7th grade cut.",
      },
      {
        year: "2021",
        title: "Backyard Volleyball (6th Grade)",
        description:
          "Learned volleyball during COVID from a high school neighbor",
      },
    ],
    backText: "Capturing moments through my lens is magical.",
  },
  {
    icon: "🎹",
    label: "Piano",
    centerImage: "/piano.png",
    achievements: [
      {
        year: "2025",
        title: "Piano Teacher",
        description: "Recently started teaching younger kids piano",
      },
      {
        year: "2024",
        title: "Baby Grand Piano Gift",
        description: "Gifted a baby grand piano for my 13th birthday",
      },
      {
        year: "2014",
        title: "First Solo Performance",
        description:
          "At the age of 4, I played the piece 'Twinkle Twinkle Little Star' for my school",
      },
    ],
    backText: "Playing piano helps me express my emotions through music.",
  },
  {
    icon: "💻",
    label: "Coding",
    centerImage: "/code.jpg",
    achievements: [
      {
        year: "2025",
        title: "Built Websites for School Clubs,",
        description:
          "Designed and coded from scratch using Next.js, ex. jjhs.scioly.org, jjhs.mindnmethod.org",
      },
      {
        year: "2021",
        title: "Arduino Plant Monitor",
        description:
          "Used a water sensor to detect if a plant needed water and automatically watered my plants",
      },
    ],
    backText: "Books open up new worlds and ideas for me.",
  },
  {
    icon: "🎤",
    label: "Singing",
    centerImage: "/sing.png",
    achievements: [
      {
        year: "2026",
        title: "Completed Pancharatna Kritis",
        description:
          "Completed Carnatic Vocal Training, and reached the highest level of music",
      },
      {
        year: "2023",
        title: "Completed Varnaalu, Swarajathulu, Keerthanaalu",
        description:
          "Marks a milestone in my journey, as I am heading towards graduation",
      },
      {
        year: "2017",
        title: "First Solo Performance",
        description: "At age of seven, performed 'MuddhuGaare Yashoda'",
      },
    ],
    backText: "Singing brings me joy and confidence.",
  },
];

export default function HomePage() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const sectionIds = sections.map((s) => s.id);
  const gradients = sections.map((s) => s.gradient);
  const bgGradient = useSectionScrollGradients(sectionIds, gradients);
  const [hoveredHobby, setHoveredHobby] = useState<number | null>(null);
  const [clickedHobby, setClickedHobby] = useState<number | null>(null);
  const [projectsVisible, setProjectsVisible] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      if (!target.closest(".hobby-circle") && !target.closest(".tooltip-box")) {
        setClickedHobby(null);
      }
    };

    if (clickedHobby !== null) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [clickedHobby]);

  const handleHobbyClick = useCallback((hobbyIndex: number) => {
    setClickedHobby((prev) => (prev === hobbyIndex ? null : hobbyIndex));
  }, []);

  return (
    <div className="relative z-0 min-h-screen scroll-smooth text-white">
      <AnimatedBackground gradient={bgGradient} />

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
            <motion.div
              className="mt-12 grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
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
            </motion.div>
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

                <motion.div
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                >
                  <p className="mb-4 text-lg text-white/70">
                    Scroll down to explore my skills and projects
                  </p>
                  <div className="flex justify-center space-x-4">
                    <motion.a
                      href="#projects"
                      onClick={() => {
                        setTimeout(() => setProjectsVisible(true), 100);
                      }}
                      className="inline-flex items-center rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:from-purple-700 hover:to-indigo-700"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      View Projects
                    </motion.a>
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

          {section.id === "hobbies" && (
            <div className="mt-12 w-full max-w-5xl">
              <div className="relative mx-auto h-[600px] w-[600px]">
                {/* Instruction text */}
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-center">
                  <p className="text-lg font-medium text-white/70">
                    👇 Hover over the circles to see achievements
                  </p>
                </div>
                {(hoveredHobby !== null || clickedHobby !== null) &&
                  (() => {
                    const activeHobby = hoveredHobby ?? clickedHobby;
                    return (
                      activeHobby !== null &&
                      hobbies[activeHobby] && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.4, ease: "easeOut" }}
                          className="pointer-events-none absolute top-1/2 left-1/2 z-10 flex h-48 w-48 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 shadow-xl backdrop-blur-lg"
                        >
                          <img
                            src={hobbies[activeHobby].centerImage}
                            alt={hobbies[activeHobby].label}
                            className="h-40 w-40 rounded-full object-cover"
                          />
                        </motion.div>
                      )
                    );
                  })()}
                {hobbies.map((hobby, i, arr) => {
                  const angle = (2 * Math.PI * i) / arr.length;
                  const radius = 200;
                  const x = Math.round(300 + radius * Math.cos(angle) - 80);
                  const y = Math.round(300 + radius * Math.sin(angle) - 80);
                  const isActive = hoveredHobby === i || clickedHobby === i;

                  const showLeft = ["Coding", "Piano", "Volleyball"].includes(
                    hobby.label,
                  );

                  const shouldHide =
                    hoveredHobby !== null &&
                    hoveredHobby !== i &&
                    ((showLeft && i < 3) || (!showLeft && i >= 3));

                  return (
                    <motion.div
                      key={hobby.label}
                      className={`hobby-circle absolute flex h-40 w-40 flex-col items-center justify-center rounded-full border border-white/10 bg-white/10 backdrop-blur-lg transition-all duration-300 hover:scale-105 ${shouldHide ? "pointer-events-none opacity-0" : ""}`}
                      style={{ left: x, top: y, zIndex: isActive ? 20 : 10 }}
                      initial={{ opacity: 0, scale: 0.5 }}
                      whileInView={{
                        opacity: 1,
                        scale: 1,
                        transition: {
                          duration: 0.8,
                          delay: i * 0.3,
                          ease: "easeOut",
                        },
                      }}
                      whileHover={{ scale: 1.1, transition: { duration: 0.3 } }}
                      onMouseEnter={() => {
                        setHoveredHobby(i);

                        if (clickedHobby !== null && clickedHobby !== i) {
                          setClickedHobby(null);
                        }
                      }}
                      onMouseLeave={() => {
                        if (clickedHobby !== i) {
                          setHoveredHobby(null);
                        }
                      }}
                      onClick={() => handleHobbyClick(i)}
                    >
                      <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-purple-800 to-indigo-800 text-3xl shadow-lg">
                        {hobby.icon}
                      </div>
                      <h3 className="text-center text-base font-bold text-white">
                        {hobby.label}
                      </h3>

                      {isActive && (
                        <div
                          className={`absolute top-1/2 z-30 flex -translate-y-1/2 items-center ${showLeft ? "right-full mr-6 flex-row-reverse" : "left-full ml-6"}`}
                        >
                          <svg
                            width="24"
                            height="48"
                            viewBox="0 0 24 48"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className={
                              showLeft ? "-mr-4 scale-x-[-1]" : "-ml-4"
                            }
                          >
                            <path
                              d="M24 24C10 24 10 0 0 0V48C10 48 10 24 24 24Z"
                              fill="rgba(255,255,255,0.10)"
                            />
                          </svg>

                          <div
                            className={`tooltip-box overflow-y-auto rounded-2xl bg-white/10 px-6 py-4 text-base font-semibold text-white shadow-xl backdrop-blur-lg ${hobby.label === "Volleyball" ? "max-h-96" : "max-h-96 max-w-xs"}`}
                            style={
                              hobby.label === "Volleyball"
                                ? { maxWidth: "36rem" }
                                : {}
                            }
                          >
                            {hobby.achievements &&
                            hobby.achievements.length > 0 ? (
                              <div className="flex flex-col gap-4">
                                <h4 className="mb-2 text-lg font-bold text-white">
                                  Achievements
                                </h4>

                                {hobby.achievements.length > 1 &&
                                  (() => {
                                    const years = hobby.achievements
                                      .map((a) => parseInt(a.year))
                                      .filter(Boolean);
                                    const minYear = Math.min(...years);
                                    const now = new Date().getFullYear();
                                    const diff = minYear && now - minYear + 1;
                                    return (
                                      diff && (
                                        <div className="mx-auto mb-3 w-fit rounded-full bg-purple-600/80 px-4 py-1 text-center text-sm font-bold text-white shadow">
                                          {hobby.label.charAt(0).toUpperCase() +
                                            hobby.label.slice(1)}{" "}
                                          for {diff} year{diff > 1 ? "s" : ""}
                                        </div>
                                      )
                                    );
                                  })()}
                                <ol className="relative pl-0">
                                  <div
                                    className="absolute top-0 left-6 z-0 h-full w-0.5 bg-white/30"
                                    style={{ left: "32px" }}
                                  ></div>
                                  {hobby.achievements.map((ach, idx) => (
                                    <li
                                      key={idx}
                                      className="relative mb-10 flex items-start last:mb-0"
                                    >
                                      <div className="relative z-10 flex w-16 min-w-[64px] flex-col items-center">
                                        <span className="mt-0.5 h-4 w-4 rounded-full border-2 border-white bg-purple-400"></span>
                                      </div>

                                      <div className="ml-2 flex w-12 min-w-[48px] items-center">
                                        <span className="text-[11px] font-semibold text-purple-200">
                                          {ach.year}
                                        </span>
                                      </div>

                                      <div className="ml-2">
                                        <div className="mt-0.5 text-sm font-bold text-white">
                                          {ach.title}
                                        </div>
                                        <div className="text-xs text-white/80">
                                          {ach.description}
                                        </div>
                                      </div>
                                    </li>
                                  ))}
                                </ol>
                              </div>
                            ) : (
                              <div className="flex flex-col gap-4">
                                <h4 className="mb-2 text-lg font-bold text-white">
                                  Achievements
                                </h4>
                                <ol className="relative pl-0">
                                  <div
                                    className="absolute top-0 left-6 z-0 h-full w-0.5 bg-white/30"
                                    style={{ left: "32px" }}
                                  ></div>
                                  <li className="relative mb-10 flex items-start last:mb-0">
                                    <div className="relative z-10 flex w-16 min-w-[64px] flex-col items-center">
                                      <span className="mt-0.5 h-4 w-4 rounded-full border-2 border-white bg-purple-400"></span>
                                    </div>
                                    <div className="ml-2 flex w-12 min-w-[48px] items-center">
                                      <span className="text-[11px] font-semibold text-purple-200">
                                        Now
                                      </span>
                                    </div>
                                    <div className="ml-2">
                                      <div className="text-xs text-white/80">
                                        {hobby.backText}
                                      </div>
                                    </div>
                                  </li>
                                </ol>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </div>
          )}
        </section>
      ))}

      {selectedProject && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 -z-10 animate-[gradient_8s_ease_in_out_infinite] bg-gradient-to-br from-purple-800 via-indigo-800 to-slate-900 bg-[length:300%_300%] opacity-20 blur-3xl" />

          <motion.div
            className="relative mx-4 flex w-full max-w-4xl flex-col gap-6 rounded-2xl border border-white/30 bg-white/10 p-6 text-white shadow-2xl backdrop-blur-xl sm:mx-6 md:mx-auto md:flex-row"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 text-xl font-bold text-white hover:text-purple-300"
            >
              ×
            </button>

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
