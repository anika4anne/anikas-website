"use client";

import { motion } from "framer-motion";

// Example project data
const projects = [
  {
    title: "Guess The Jam",
    description:
      "A music guessing game powered by the YouTube Data API and Spotify playlists.",
    link: "#",
  },
  {
    title: "Jaybots  CAD",
    description:
      "3D-modeled and manufactured parts for our FTC robot using OnShape.",
    link: "#",
  },
  {
    title: "Science Olympiad Site",
    description:
      "Responsive site built in Next.js to manage events, newsletters, and alumni filtering.",
    link: "#",
  },
];

const sections = [
  {
    id: "home",
    title: "Hi, I'm Anika",
    subtitle: "Dancer. Singer. Pianist. Coder. CADer. Creative soul.",
  },
  {
    id: "projects",
    title: "Projects",
    subtitle:
      "From web apps to CAD models — here's where code meets creativity.",
  },
  {
    id: "about",
    title: "About Me",
    subtitle:
      "Performer, maker, problem solver. I use code, music, and motion to tell stories.",
  },
  {
    id: "contact",
    title: "Let's Talk",
    subtitle: (
      <>
        Hit me up at{" "}
        <a
          href="mailto:anikaanne2010pal@gmail.com"
          className="underline hover:text-pink-200"
        >
          anikaanne2010pal@gmail.com
        </a>
      </>
    ),
  },
];

export default function HomePage() {
  return (
    <div className="relative z-0 scroll-smooth text-white">
      <div className="fixed inset-0 -z-10 h-full w-full animate-[gradient_12s_ease_infinite] bg-gradient-to-br from-[#300458] via-[#2aa0d6] to-[#031343] bg-[length:400%_400%]" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 mix-blend-soft-light" />
      <header className="fixed top-0 z-50 w-full bg-transparent text-white backdrop-blur-md">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="text-xl font-bold">Anika Anne</div>
          <ul className="flex space-x-6 text-sm sm:text-base">
            {sections.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="transition-colors duration-200 hover:text-pink-200"
                >
                  {section.id.charAt(0).toUpperCase() + section.id.slice(1)}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      {sections.map((section) => (
        <section
          key={section.id}
          id={section.id}
          className="flex min-h-screen flex-col items-center justify-center px-6 pt-24 text-center"
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

          {/* PROJECTS SECTION */}
          {section.id === "projects" && (
            <div className="mt-12 grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-2">
              {projects.map((project) => (
                <motion.a
                  key={project.title}
                  href={project.link}
                  className="rounded-2xl border border-white/10 bg-white/10 p-6 text-left backdrop-blur-lg transition hover:scale-105 hover:bg-white/20"
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
        </section>
      ))}
    </div>
  );
}
