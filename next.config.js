/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";

/** @type {import("next").NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "cdn.jsdelivr.net",
      "www.onshape.com",
      "gh.devicons.devicon.icons.nextjs.nextjs-original.svg",
      "gh.devicons.devicon.icons.react.react-original.svg",
      "gh.devicons.devicon.icons.typescript.typescript-original.svg",
      "gh.devicons.devicon.icons.javascript.javascript-original.svg",
      "gh.devicons.devicon.icons.python.python-original.svg",
      "gh.devicons.devicon.icons.nodejs.nodejs-original.svg",
      "gh.devicons.devicon.icons.tailwindcss.tailwindcss-plain.svg",
      "gh.devicons.devicon.icons.prisma.prisma-original.svg",
      "gh.devicons.devicon.icons.git.git-original.svg",
    ],
  },
};

export default nextConfig;
