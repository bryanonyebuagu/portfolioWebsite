import { Canvas } from "@react-three/fiber";
import { FormEvent, Suspense, useEffect, useState } from "react";
import EarthBackground from "./components/EarthBackground";
import TechOrbit from "./components/TechOrbit";

const navLinks = [
  { label: "Home", href: "#home", icon: "home" },

  { label: "About", href: "#about", icon: "about" },

  { label: "Services", href: "#services", icon: "services" },

  { label: "Skills", href: "#skills", icon: "skills" },

  { label: "Experience", href: "#experience", icon: "experience" },

  { label: "Projects", href: "#projects", icon: "projects" },

  { label: "Contact", href: "#contact", icon: "contact" },
];

const NavigationIcon = ({ name }: { name: string }) => {
  const iconProps = {
    viewBox: "0 0 24 24",
    className: "h-5 w-5",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true as const,
  };

  switch (name) {
    case "home":
      return <svg {...iconProps}><path d="m3 10 9-7 9 7" /><path d="M5 9v11h14V9M9 20v-6h6v6" /></svg>;
    case "about":
      return <svg {...iconProps}><circle cx="12" cy="8" r="4" /><path d="M5 21a7 7 0 0 1 14 0" /></svg>;
    case "services":
      return <svg {...iconProps}><path d="m12 3 9 5-9 5-9-5 9-5Z" /><path d="m3 12 9 5 9-5M3 16l9 5 9-5" /></svg>;
    case "skills":
      return <svg {...iconProps}><path d="m8 5-6 7 6 7M16 5l6 7-6 7M14 3l-4 18" /></svg>;
    case "experience":
      return <svg {...iconProps}><rect x="3" y="7" width="18" height="14" rx="2" /><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18M10 12v2h4v-2" /></svg>;
    case "projects":
      return <svg {...iconProps}><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 10h18M9 10v10" /></svg>;
    default:
      return <svg {...iconProps}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m4 7 8 6 8-6" /></svg>;
  }
};

const services = [
  {
    title: "AI Workflow Automation",

    description:
      "Designing agentic systems, LLM pipelines, and orchestration layers that remove manual work.",
  },

  {
    title: "Full-Stack Product Builds",

    description:
      "From discovery to launch with responsive UI, scalable APIs, and reliable data layers.",
  },

  {
    title: "Automation Consulting",

    description:
      "Auditing business processes to uncover high-impact automation opportunities.",
  },
];

const skills = [
  "AI Automation Engineer",

  "React",

  "TypeScript",

  "JavaScript",

  "Svelte",

  "CSS",

  "HTML",

  "Node.js",

  "Python",

  "LangChain",

  "OpenAI API",

  "PostgreSQL",

  "Supabase",

  "Firebase",

  "Serverless",

  "CI/CD",

  "Observability",

  "Claude Code",

  "Zapier",

  "Make",
];

const skillIcons: Record<string, { src?: string; color: string; mark: string }> = {
  "AI Automation Engineer": { color: "#7c5cff", mark: "AI" },
  React: { src: "/icons/react.svg", color: "#61dafb", mark: "R" },
  TypeScript: { src: "/icons/typescript.svg", color: "#3178c6", mark: "TS" },
  JavaScript: { src: "/icons/js.svg", color: "#f7df1e", mark: "JS" },
  Svelte: { src: "/icons/svelte.svg", color: "#ff3e00", mark: "S" },
  CSS: { src: "/icons/css.svg", color: "#264de4", mark: "CSS" },
  HTML: { src: "/icons/html.svg", color: "#e34f26", mark: "5" },
  "Node.js": { src: "/icons/node.svg", color: "#339933", mark: "N" },
  Python: { color: "#3776ab", mark: "Py" },
  LangChain: { color: "#14b8a6", mark: "∞" },
  "OpenAI API": { color: "#10a37f", mark: "AI" },
  PostgreSQL: { src: "/icons/postgres.svg", color: "#4169e1", mark: "DB" },
  Supabase: { src: "/icons/supabase.svg", color: "#3ecf8e", mark: "S" },
  Firebase: { src: "/icons/firebase.svg", color: "#ffca28", mark: "F" },
  Serverless: { color: "#38bdf8", mark: "λ" },
  "CI/CD": { color: "#a78bfa", mark: "↻" },
  Observability: { color: "#22c55e", mark: "◎" },
  "Claude Code": { color: "#d97757", mark: "C" },
  Zapier: { color: "#ff4f00", mark: "Z" },
  Make: { color: "#6d4aff", mark: "M" },
};

const timeline = [
  {
    role: "AI Automation Engineer",

    company: "Independent Studio",

    time: "2025 — Present",

    detail:
      "Designing and building AI-powered automation systems that connect business processes, intelligent agents, data sources, and communication channels. I build workflow orchestration, automated routing, notifications, reporting pipelines, and human-in-the-loop processes that reduce repetitive operational work while keeping teams in control.",

    accent: "#7c5cff",

    accentTwo: "#38bdf8",

    icon: "automation",
  },

  {
    role: "Full-Stack Developer",

    company: "Creative Labs",

    time: "2023 — 2026",

    detail:
      "Built and shipped data-driven web applications with responsive interfaces, reusable components, API integrations, authentication, database-backed features, and real-time dashboards. Focused on turning product requirements into reliable full-stack experiences with polished UX and maintainable architecture.",

    accent: "#22c55e",

    accentTwo: "#0ea5e9",

    icon: "fullstack",
  },
];

const testimonials = [
  {
    name: "Elena Chimdaalu",

    title: "Head of Operations in Dawih Solutions Limited",

    quote:
      "Bryan mapped our entire automation stack and delivered reliable workflows within weeks. Productivity jumped instantly.",
  },

  {
    name: "Tyrone Stevens",

    title: "Senior Software Engineer at TyroTech",

    quote:
      "The UI polish and AI integrations were exactly what we needed to impress investors.",
  },
];

const contactCards = [
  {
    label: "Email",

    value: "c.bryanonyebuagu@gmail.com",
  },

  {
    label: "Location",

    value: "Abuja, Nigeria",
  },

  {
    label: "Availability",

    value: "Open for select AI automation engagements",
  },
];

const renderExperienceIcon = (type: string) => {
  const isAutomation = type === "automation";

  if (isAutomation) {
    return (
      <img
        src="/images/robot-ai.png"
        alt="AI robot with a glowing neural-network brain"
        className="h-full w-full object-contain"
        loading="lazy"
        decoding="async"
      />
    );
  }

  return (
    <Canvas
      camera={{ position: [0, 0, 9.2], fov: 38 }}
      dpr={[1, 1.5]}
      gl={{ alpha: true, antialias: true }}
      style={{ width: "100%", height: "100%", background: "transparent" }}
      aria-label="Three-dimensional orbit of full-stack technology icons"
    >
      <Suspense fallback={null}>
        <TechOrbit />
      </Suspense>
    </Canvas>
  );
};

export default function App() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("theme");

    if (stored === "light" || stored === "dark") {
      setTheme(stored);
    } else if (window.matchMedia("(prefers-color-scheme: light)").matches) {
      setTheme("light");
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("light", theme === "light");

    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMobileMenuOpen(false);
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [isMobileMenuOpen]);

  const handleContactSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const name = formData.get("name")?.toString() || "";

    const email = formData.get("email")?.toString() || "";

    const company = formData.get("company")?.toString() || "";

    const message = formData.get("message")?.toString() || "";

    const subject = encodeURIComponent(
      `Automation Inquiry from ${name || "Portfolio Visitor"}`,
    );

    const body = encodeURIComponent(
      `Name: ${name}\n` +
        `Email: ${email}\n` +
        `Company / Project: ${company}\n\n` +
        `What they want to automate:\n${message}`,
    );

    window.location.href = `mailto:c.bryanonyebuagu@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-(--background) text-left text-(--white)">
      {" "}
      <EarthBackground />
      <div className="relative z-10">
      <header className="sticky top-0 z-50">
        {" "}
        <div className="glass">
          {" "}
          <div className="mx-auto grid w-full max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 gap-y-3 px-4 py-3 sm:px-6 lg:grid-cols-[auto_minmax(0,1fr)_auto] lg:gap-x-6">
            {" "}
            <div className="flex min-w-0 items-center gap-2 sm:gap-3">
              {" "}
              <div className="flex shrink-0 items-center justify-center rounded-xl border border-(--accent)/40 bg-(--accent)/20 px-2.5 py-2 font-display text-sm sm:px-3">
                CO{" "}
              </div>{" "}
              <div className="min-w-0">
                {" "}
                <p className="text-xs uppercase tracking-[0.3em] text-(--text-muted)">
                  Portfolio{" "}
                </p>{" "}
                <p className="break-words text-sm font-semibold leading-tight sm:text-base">
                  Chinonso Onyebuagu
                </p>{" "}
              </div>{" "}
            </div>{" "}
            <nav
              aria-label="Main navigation"
              className="hidden items-center justify-center gap-x-3 text-xs text-(--text-muted) sm:text-sm lg:col-start-2 lg:col-span-1 lg:row-start-1 lg:flex xl:gap-x-4"
            >
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="whitespace-nowrap transition hover:text-(--white)"
                >
                  {link.label}
                </a>
              ))}
            </nav>{" "}
            <div className="col-start-2 row-start-1 flex items-center justify-self-end gap-2 sm:gap-3 lg:col-start-3">
              {" "}
              <button
                type="button"
                onClick={() =>
                  setTheme((prev) => (prev === "dark" ? "light" : "dark"))
                }
                className="icon-toggle hidden lg:inline-flex"
                aria-label="Toggle theme"
              >
                {" "}
                {theme === "dark" ? (
                  <svg
                    viewBox="0 0 24 24"
                    className="h-5 w-5 text-(--white)"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {" "}
                    <path d="M21 12.8A9 9 0 1111.2 3a7 7 0 109.8 9.8z" />{" "}
                  </svg>
                ) : (
                  <svg
                    viewBox="0 0 24 24"
                    className="h-5 w-5 text-(--white)"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="4" />{" "}
                    <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />{" "}
                  </svg>
                )}{" "}
              </button>{" "}
              <a
                className="btn-primary hidden justify-center px-3 py-2 text-center text-xs sm:inline-flex sm:text-sm"
                href="#contact"
              >
                Let’s Talk{" "}
              </a>{" "}
              <button
                type="button"
                className="icon-toggle lg:hidden"
                aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                aria-expanded={isMobileMenuOpen}
                aria-controls="mobile-navigation"
                onClick={() => setIsMobileMenuOpen((open) => !open)}
              >
                {isMobileMenuOpen ? (
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                    <path d="m6 6 12 12M18 6 6 18" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                    <path d="M4 7h16M4 12h16M4 17h16" />
                  </svg>
                )}
              </button>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
        {isMobileMenuOpen && (
          <nav
            id="mobile-navigation"
            aria-label="Mobile navigation"
            className="absolute inset-x-4 top-full z-50 mx-auto mt-2 max-w-md rounded-2xl border border-(--hairline) bg-(--surface)/95 p-2 shadow-2xl backdrop-blur-xl lg:hidden"
          >
            {navLinks.map((link, index) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-(--text-muted) transition hover:bg-(--accent)/10 hover:text-(--white) focus-visible:bg-(--accent)/10 focus-visible:text-(--white)"
                style={{ animationDelay: `${index * 35}ms` }}
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-(--hairline) bg-(--surface-strong)/80 text-(--accent-2) transition group-hover:border-(--accent)/40 group-hover:text-(--accent)">
                  <NavigationIcon name={link.icon} />
                </span>
                <span className="flex-1 font-medium">{link.label}</span>
                <svg viewBox="0 0 24 24" className="h-4 w-4 opacity-50 transition group-hover:translate-x-0.5 group-hover:opacity-100" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </a>
            ))}
            <div className="my-2 border-t border-(--hairline)" />
            <button
              type="button"
              onClick={() => setTheme((prev) => (prev === "dark" ? "light" : "dark"))}
              className="group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm text-(--text-muted) transition hover:bg-(--accent)/10 hover:text-(--white) focus-visible:bg-(--accent)/10 focus-visible:text-(--white)"
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-(--hairline) bg-(--surface-strong)/80 text-(--accent-2) transition group-hover:border-(--accent)/40 group-hover:text-(--accent)">
                {theme === "dark" ? (
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="4" />
                    <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M21 12.8A9 9 0 1111.2 3a7 7 0 109.8 9.8z" />
                  </svg>
                )}
              </span>
              <span className="flex-1 font-medium">Switch to {theme === "dark" ? "light" : "dark"} mode</span>
              <span className="text-xs capitalize text-(--text-muted)">{theme} theme</span>
            </button>
          </nav>
        )}
      </header>{" "}
      <main className="relative">
        {" "}
        <section
          id="home"
          className="mx-auto max-w-6xl px-4 pb-16 pt-12 sm:px-6 sm:pt-20 lg:pt-24"
        >
          {" "}
          <div className="grid items-center gap-12 lg:grid-cols-[1.2fr_0.8fr]">
            {" "}
            <div className="space-y-6 text-center lg:text-left">
              {" "}
              <div className="badge">
                {" "}
                <span className="h-2 w-2 rounded-full bg-(--accent-3)" />
                Available for Coding and AI automation projects{" "}
              </div>{" "}
              <div className="space-y-4">
                {" "}
                <h1 className="text-3xl font-semibold leading-tight sm:text-4xl md:text-6xl">
                  Chinonso Bryan Onyebuagu{" "}
                  <span className="block text-gradient">
                    Coding and AI Automation Engineer{" "}
                  </span>{" "}
                </h1>{" "}
                <p className="text-lg text-(--text-muted)">
                  I design premium digital experiences and intelligent
                  automation systems that blend elegant UI with reliable AI
                  workflows.{" "}
                </p>{" "}
              </div>{" "}
              <div className="flex flex-wrap justify-center gap-4 lg:justify-start">
                {" "}
                <a className="btn-primary" href="#contact">
                  Schedule a Call{" "}
                </a>{" "}
                <a className="btn-ghost" href="#projects">
                  View Work{" "}
                </a>{" "}
              </div>{" "}
              <div className="grid gap-4 pt-6 text-center sm:grid-cols-3">
                {" "}
                {[
                  { label: "Years building", value: "4+" },

                  { label: "Automations shipped", value: "4" },

                  { label: "Products launched", value: "15" },
                ].map((stat) => (
                  <div key={stat.label} className="card-grad p-4">
                    {" "}
                    <p className="text-2xl font-semibold">{stat.value}</p>{" "}
                    <p className="text-sm text-(--text-muted)">
                      {stat.label}{" "}
                    </p>{" "}
                  </div>
                ))}{" "}
              </div>{" "}
            </div>{" "}
            <div className="card-grad p-6 text-center">
              {" "}
              <div className="space-y-4">
                <p className="section-label">Current Focus</p>{" "}
                <div className="space-y-4">
                  <h2 className="text-2xl font-semibold">
                    Building polished full-stack experiences from interface to data.
                  </h2>{" "}
                  <p className="text-sm text-(--text-muted)">
                    I build responsive web applications with reusable
                    components, reliable integrations, and thoughtful user
                    experiences.
                  </p>{" "}
                  <div className="grid gap-3">
                    {[
                      "Responsive, accessible interfaces",
                      "Reusable React + TypeScript components",
                      "API integrations and authentication",
                      "Database-backed features and real-time dashboards",
                    ].map((item) => (
                      <div
                        key={item}
                        className="flex items-center gap-3 rounded-xl border border-(--hairline) bg-(--surface-strong)/60 px-4 py-3"
                      >
                        <span className="h-2 w-2 shrink-0 rounded-full bg-(--accent)" />
                        <span className="text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>{" "}
                <div className="space-y-4 border-t border-(--hairline) pt-5">
                  <h2 className="text-2xl font-semibold">
                    Building autonomous workflows that scale impact.{" "}
                  </h2>{" "}
                  <p className="text-sm text-(--text-muted)">
                    I specialize in AI-first automation: agent orchestration,
                    intelligent routing, and real-time data integrations that keep
                    products ahead.{" "}
                  </p>{" "}
                  <div className="grid gap-3">
                    {[
                      "Agentic workflow design",

                      "Automated reporting pipelines",

                      "Human-in-the-loop QA systems",

                      "Realtime alerts + observability",
                    ].map((item) => (
                      <div
                        key={item}
                        className="flex items-center gap-3 rounded-xl border border-(--hairline) bg-(--surface-strong)/60 px-4 py-3"
                      >
                        <span className="h-2 w-2 rounded-full bg-(--accent-2)" />{" "}
                        <span className="text-sm">{item}</span>{" "}
                      </div>
                    ))}{" "}
                  </div>{" "}
                </div>{" "}
                <div className="rounded-2xl border border-(--hairline) bg-(--surface-strong)/40 p-4">
                  {" "}
                  <p className="text-xs uppercase tracking-[0.4em] text-(--text-muted)">
                    Tool Stack{" "}
                  </p>{" "}
                  <div className="mt-3 flex flex-wrap gap-2 text-xs text-(--text-muted)">
                    {" "}
                    {[
                      "React",

                      "Vite",

                      "Tailwind",

                      "Node",

                      "Python",

                      "OpenAI",

                      "LangChain",

                      "Supabase",

                      "n8n",

                      "Make",

                      "Zapier",

                      "Claude Code",

                      "Airtable",

                      "Flowise",
                    ].map((tool) => (
                      <span
                        key={tool}
                        className="rounded-full border border-(--hairline) px-3 py-1"
                      >
                        {tool}{" "}
                      </span>
                    ))}{" "}
                  </div>{" "}
                </div>{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
        </section>{" "}
        <section id="about" className="mx-auto max-w-6xl px-6 py-16">
          {" "}
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            {" "}
            <div className="card-grad p-8 text-center">
              <p className="section-label">About</p>{" "}
              <h2 className="mt-4 text-3xl font-semibold">
                Engineering calm, automated workflows for modern teams.{" "}
              </h2>{" "}
              <p className="mt-4 text-(--text-muted)">
                I partner with founders and operations leaders to automate
                repetitive work and elevate customer experiences. My approach
                blends product strategy, premium UI design, and dependable AI
                automation pipelines.{" "}
              </p>{" "}
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {" "}
                {[
                  "Workflow mapping & automation design",

                  "Human-centered AI UX",

                  "Secure API architecture",

                  "Responsive, accessible UI",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-(--hairline) bg-(--surface-strong)/40 px-4 py-3 text-sm"
                  >
                    {item}{" "}
                  </div>
                ))}{" "}
              </div>{" "}
            </div>{" "}
            <div className="space-y-6">
              {" "}
              <div className="card-grad p-6 text-center">
                <p className="section-label">Signature</p>{" "}
                <h3 className="mt-3 text-xl font-semibold">
                  Design + Automation{" "}
                </h3>{" "}
                <p className="mt-3 text-sm text-(--text-muted)">
                  Combining sleek interfaces with AI-driven backend logic for
                  seamless customer experiences.{" "}
                </p>{" "}
              </div>{" "}
              <div className="card-grad p-6 text-center">
                <p className="section-label">Process</p>{" "}
                <div className="mt-4 space-y-3 text-sm text-(--text-muted)">
                  <p>1. Discovery & workflow audit</p>
                  <p>2. AI automation architecture</p>
                  <p>3. UI + integration delivery</p>{" "}
                  <p>4. Optimization & monitoring</p>{" "}
                </div>{" "}
              </div>{" "}
              <div className="card-grad p-6 text-center">
                <p className="section-label">Impact</p>{" "}
                <p className="mt-3 text-sm text-(--text-muted)">
                  Delivering automation systems that cut operational time by up
                  to 60% while keeping teams in control.{" "}
                </p>{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
        </section>{" "}
        <section id="services" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          {" "}
          <div className="flex flex-col items-center gap-3 text-center">
            {" "}
            <div>
              <p className="section-label">Services</p>
              <h2 className="mt-3 text-3xl font-semibold">
                What I deliver
              </h2>{" "}
            </div>{" "}
            <p className="max-w-xl text-sm text-(--text-muted)">
              End-to-end product support with automation built into every
              layer.{" "}
            </p>{" "}
          </div>{" "}
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {" "}
            {services.map((service) => (
              <div key={service.title} className="card-grad p-6 text-center">
                {" "}
                <h3 className="text-xl font-semibold">{service.title}</h3>{" "}
                <p className="mt-3 text-sm text-(--text-muted)">
                  {service.description}{" "}
                </p>{" "}
              </div>
            ))}{" "}
          </div>{" "}
        </section>{" "}
        <section id="skills" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          {" "}
          <div className="flex flex-col items-center gap-3 text-center">
            {" "}
            <div>
              <p className="section-label">Skills</p>{" "}
              <h2 className="mt-3 text-3xl font-semibold">
                Specialized tooling{" "}
              </h2>{" "}
            </div>{" "}
            <p className="max-w-xl text-sm text-(--text-muted)">
              A balanced stack of automation, engineering, and design
              systems.{" "}
            </p>{" "}
          </div>{" "}
          <div className="mt-10 flex flex-wrap justify-center gap-3 text-center">
            {" "}
            {skills.map((skill, index) => {
              const icon = skillIcons[skill];

              return (
                <span
                  key={skill}
                  className="skill-pill inline-flex items-center gap-2 rounded-full border border-(--hairline) bg-(--surface-strong)/60 px-4 py-2 text-sm"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  {icon.src ? (
                    <img
                      src={icon.src}
                      alt=""
                      aria-hidden="true"
                      className="h-6 w-6 rounded-md object-contain"
                      loading="lazy"
                    />
                  ) : (
                    <span
                      aria-hidden="true"
                      className="grid h-6 w-6 place-items-center rounded-md text-[0.65rem] font-bold"
                      style={{ backgroundColor: `${icon.color}22`, color: icon.color }}
                    >
                      {icon.mark}
                    </span>
                  )}
                  <span>{skill}</span>
                </span>
              );
            })}{" "}
          </div>{" "}
        </section>{" "}
        <section
          id="experience"
          className="mx-auto max-w-6xl px-4 py-16 sm:px-6"
        >
          {" "}
          <div className="flex flex-col items-center gap-3 text-center">
            {" "}
            <div>
              <p className="section-label">Experience</p>{" "}
              <h2 className="mt-3 text-3xl font-semibold">
                Automation journey{" "}
              </h2>{" "}
            </div>{" "}
            <p className="max-w-xl text-sm text-(--text-muted)">
              Focused on blending intelligent systems with premium digital
              products.{" "}
            </p>{" "}
          </div>{" "}
          <div className="mt-10 space-y-6">
            {" "}
            {timeline.map((item, index) => (
              <div key={item.role} className="card-grad p-6 text-center">
                {" "}
                <div className="flex flex-col items-center gap-6 text-center lg:flex-row lg:justify-between lg:text-left">
                  {" "}
                  <div className="min-w-0 space-y-3 lg:flex-1">
                    {" "}
                    <div>
                      {" "}
                      <h3 className="text-center text-xl font-semibold">
                        {item.role}
                      </h3>{" "}
                      <p className="text-sm text-(--text-muted)">
                        {item.company}{" "}
                      </p>{" "}
                    </div>{" "}
                    <span className="text-xs uppercase tracking-[0.3em] text-(--text-muted)">
                      {item.time}{" "}
                    </span>{" "}
                    <p className="text-sm text-(--text-muted)">
                      {item.detail}{" "}
                    </p>{" "}
                  </div>{" "}
                  <div
                    className="experience-illustration flex-none"
                    style={{
                      background: `linear-gradient(140deg, ${item.accent}33, ${item.accentTwo}22)`,
                    }}
                  >
                    {" "}
                    <div className="relative z-10 flex h-full w-full items-center justify-center">
                      {renderExperienceIcon(item.icon)}{" "}
                    </div>{" "}
                  </div>{" "}
                </div>{" "}
                {index < timeline.length - 1 && (
                  <div className="mt-6 h-px w-full bg-white/5" />
                )}{" "}
              </div>
            ))}{" "}
          </div>{" "}
        </section>{" "}
        <section id="projects" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          {" "}
          <div className="flex flex-col items-center gap-3 text-center">
            {" "}
            <div>
              <p className="section-label">Projects</p>
              <h2 className="mt-3 text-3xl font-semibold">
                Selected work
              </h2>{" "}
            </div>{" "}
            <p className="max-w-xl text-sm text-(--text-muted)">
              Automation projects, development work, and selected builds.{" "}
            </p>{" "}
          </div>{" "}
          <div className="mt-10 grid gap-8 sm:grid-cols-2">
            {" "}
            <a
              href="https://drive.google.com/drive/folders/1AflHkFqC76hknPXT6cIKscV0bYQTU9RU?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View automation projects on Google Drive"
              className="group flex flex-col items-center justify-center gap-2 rounded-2xl border border-(--hairline) bg-(--surface-strong)/30 p-8 text-center transition duration-300 hover:-translate-y-2 hover:border-(--accent)/50 hover:bg-(--surface-strong)/60 sm:p-10"
            >
              {" "}
              <div className="transition duration-300 group-hover:scale-110 group-hover:-translate-y-2">
                {" "}
                <svg
                  viewBox="0 0 48 48"
                  className="h-24 w-24"
                  aria-hidden="true"
                >
                  {" "}
                  <path
                    fill="#0F9D58"
                    d="M16.1 5h9.7l15.1 26.1-4.8 8.3h-9.7L11.3 13.3z"
                  />{" "}
                  <path
                    fill="#4285F4"
                    d="M16.1 5L2.9 27.8l4.8 8.3h28.4l4.8-8.3H12.5z"
                  />{" "}
                  <path
                    fill="#F4B400"
                    d="M25.8 5h-9.7l-8.4 14.5 4.8 8.3h9.7l8.4-14.5z"
                  />{" "}
                </svg>{" "}
              </div>{" "}
              <p className="mt-6 text-xl font-semibold">Google Drive</p>{" "}
              <p className="mt-2 text-sm text-(--text-muted)">
                View automation projects{" "}
              </p>{" "}
            </a>{" "}
            <a
              href="https://github.com/bryanonyebuagu"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View GitHub projects"
              className="group flex flex-col items-center justify-center gap-2 rounded-2xl border border-(--hairline) bg-(--surface-strong)/30 p-8 text-center transition duration-300 hover:-translate-y-2 hover:border-(--accent)/50 hover:bg-(--surface-strong)/60 sm:p-10"
            >
              {" "}
              <div className="transition duration-300 group-hover:scale-110 group-hover:-translate-y-2">
                {" "}
                <svg
                  viewBox="0 0 24 24"
                  className="h-24 w-24 fill-current text-(--white)"
                  aria-hidden="true"
                >
                  {" "}
                  <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56v-2.17c-3.2.7-3.88-1.36-3.88-1.36-.53-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.68 1.25 3.33.96.1-.74.4-1.25.73-1.54-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.47.11-3.06 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 5.74 0c2.19-1.49 3.15-1.18 3.15-1.18.62 1.59.23 2.77.11 3.06.73.81 1.18 1.84 1.18 3.1 0 4.43-2.69 5.4-5.25 5.69.41.36.78 1.07.78 2.16v3.2c0 .31.21.68.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" />{" "}
                </svg>{" "}
              </div>
              <p className="mt-6 text-xl font-semibold">GitHub</p>{" "}
              <p className="mt-2 text-sm text-(--text-muted)">
                View development projects{" "}
              </p>{" "}
            </a>{" "}
          </div>{" "}
        </section>{" "}
        <section
          id="testimonials"
          className="mx-auto max-w-6xl px-4 py-16 sm:px-6 flex flex-col items-center"
        >
          {" "}
          <div className="flex flex-col items-center gap-3 text-center">
            {" "}
            <div>
              <p className="section-label">Testimonials</p>{" "}
              <h2 className="mt-3 text-3xl font-semibold">
                Client feedback
              </h2>{" "}
            </div>{" "}
            <p className="max-w-xl text-sm text-(--text-muted)">
              Long-term partnerships built on trust, clarity, and
              execution.{" "}
            </p>{" "}
          </div>{" "}
          <div className="mt-10 grid gap-6 lg:grid-cols-2  justify-center items-center ">
            {" "}
            {testimonials.map((item) => (
              <div key={item.name} className="card-grad p-10 text-center">
                {" "}
                <p className="text-sm text-(--text-muted)">
                  “{item.quote}”{" "}
                </p>{" "}
                <div className="mt-4 p-10">
                  <p className="font-semibold">{item.name}</p>{" "}
                  <p className="text-xs uppercase tracking-[0.3em] text-(--text-muted)">
                    {item.title}{" "}
                  </p>{" "}
                </div>{" "}
              </div>
            ))}{" "}
          </div>{" "}
        </section>{" "}
        <section id="contact" className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          {" "}
          <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr]">
            {" "}
            <div className="card-grad p-8 text-center">
              <p className="section-label">Contact</p>{" "}
              <h2 className="mt-4 text-3xl font-semibold">
                Let’s build your next automation.{" "}
              </h2>{" "}
              <p className="mt-4 text-sm text-(--text-muted)">
                Share a few details about your automation goals and I’ll respond
                within two business days.{" "}
              </p>{" "}
              <form
                className="mt-6 flex w-full flex-col items-center gap-4 text-left"
                onSubmit={handleContactSubmit}
              >
                {" "}
                <div className="grid w-full gap-4 sm:grid-cols-2">
                  {" "}
                  <input
                    name="name"
                    className="w-full rounded-xl border border-(--hairline) bg-(--surface-strong)/50 px-4 py-3 text-left text-sm focus:outline-none"
                    placeholder="Name"
                    type="text"
                    required
                  />{" "}
                  <input
                    name="email"
                    className="w-full rounded-xl border border-(--hairline) bg-(--surface-strong)/50 px-4 py-3 text-left text-sm focus:outline-none"
                    placeholder="Email"
                    type="email"
                    required
                  />{" "}
                </div>{" "}
                <input
                  name="company"
                  className="w-full rounded-xl border border-(--hairline) bg-(--surface-strong)/50 px-4 py-3 text-left text-sm focus:outline-none"
                  placeholder="Company / Project"
                  type="text"
                />{" "}
                <textarea
                  name="message"
                  className="min-h-32 w-full resize-y rounded-xl border border-(--hairline) bg-(--surface-strong)/50 px-4 py-3 text-left text-sm focus:outline-none"
                  placeholder="Tell me about the workflow you want to automate..."
                  required
                />{" "}
                <button
                  className="btn-primary justify-center text-center"
                  type="submit"
                >
                  Send message{" "}
                </button>{" "}
              </form>{" "}
            </div>{" "}
            <div className="space-y-6">
              {" "}
              {contactCards.map((card) => (
                <div key={card.label} className="card-grad p-6 text-center">
                  {" "}
                  <p className="section-label">{card.label}</p>{" "}
                  <p className="mt-3 text-lg font-semibold">
                    {card.value}
                  </p>{" "}
                </div>
              ))}{" "}
              <div className="card-grad p-6 text-center">
                <p className="section-label">Social</p>{" "}
                <div className="mt-4 flex flex-wrap gap-3">
                  {" "}
                  <a
                    href="https://www.linkedin.com/in/chinonso-onyebuagu-11459a409?utm_source=share_via&utm_content=profile&utm_medium=member_ios"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 rounded-full border border-(--hairline) px-4 py-2 text-sm text-(--text-muted) transition duration-300 hover:-translate-y-1 hover:border-(--accent)/50 hover:text-(--white)"
                    aria-label="LinkedIn"
                  >
                    {" "}
                    <svg
                      viewBox="0 0 24 24"
                      className="h-5 w-5 fill-current"
                      aria-hidden="true"
                    >
                      {" "}
                      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V8.99h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.29zM5.32 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.1 20.45H3.54V8.99H7.1v11.46zM22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.21 0 22.23 0z" />{" "}
                    </svg>
                    <span>LinkedIn</span>{" "}
                  </a>{" "}
                  <a
                    href="https://github.com/bryanonyebuagu"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 rounded-full border border-(--hairline) px-4 py-2 text-sm text-(--text-muted) transition duration-300 hover:-translate-y-1 hover:border-(--accent)/50 hover:text-(--white)"
                    aria-label="GitHub"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="h-5 w-5 fill-current"
                      aria-hidden="true"
                    >
                      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56v-2.17c-3.2.7-3.88-1.36-3.88-1.36-.53-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.68 1.25 3.33.96.1-.74.4-1.25.73-1.54-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.47.11-3.06 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 5.74 0c2.19-1.49 3.15-1.18 3.15-1.18.62 1.59.23 2.77.11 3.06.73.81 1.18 1.84 1.18 3.1 0 4.43-2.69 5.4-5.25 5.69.41.36.78 1.07.78 2.16v3.2c0 .31.21.68.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" />
                    </svg>
                    <span>GitHub</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t border-(--hairline)">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-8 text-sm text-(--text-muted) sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Bryan Onyebuagu. All rights reserved.</p>
          <p>Crafted with AI automation and premium UX.</p>
          <p className="text-xs sm:max-w-xs sm:text-right">
            Earth imagery: NASA Blue Marble. Cloud layer: Contains modified EUMETSAT data.
          </p>
        </div>
      </footer>
      </div>
    </div>
  );
}
