import { Canvas } from "@react-three/fiber";

import { FormEvent, Suspense, useEffect, useState } from "react";

import AIBrainOrb from "./components/AIBrainOrb";

import TechOrbit from "./components/TechOrbit";

const navLinks = [
  { label: "Home", href: "#home" },

  { label: "About", href: "#about" },

  { label: "Services", href: "#services" },

  { label: "Skills", href: "#skills" },

  { label: "Experience", href: "#experience" },

  { label: "Projects", href: "#projects" },

  { label: "Contact", href: "#contact" },
];

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

  "Node.js",

  "Python",

  "LangChain",

  "OpenAI API",

  "PostgreSQL",

  "Supabase",

  "Serverless",

  "CI/CD",

  "Observability",

  "Claude Code",

  "Zapier",

  "Make",
];

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
  if (type === "automation") {
    return (
      <div
        style={{
          display: "flex",

          alignItems: "center",

          justifyContent: "center",

          width: "100%",

          height: "100%",
        }}
      >
               {" "}
        <Canvas
          camera={{ position: [0, 0, 6], fov: 45 }}
          style={{ width: "100%", height: "100%", background: "#001133" }}
        >
                   {" "}
          <Suspense fallback={null}>
                        <AIBrainOrb />         {" "}
          </Suspense>
                 {" "}
        </Canvas>
             {" "}
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",

        alignItems: "center",

        justifyContent: "center",

        width: "100%",

        height: "100%",
      }}
    >
           {" "}
      <Canvas
        camera={{ position: [0, 1.5, 6], fov: 50 }}
        gl={{ alpha: true }}
        style={{ width: "100%", height: "100%" }}
      >
               {" "}
        <Suspense fallback={null}>
                    <TechOrbit />       {" "}
        </Suspense>
             {" "}
      </Canvas>
         {" "}
    </div>
  );
};

export default function App() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

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
    <div className="relative min-h-screen overflow-x-hidden bg-(--background) text-(--white)">
           {" "}
      <div className="pointer-events-none absolute inset-0">
               {" "}
        <div className="absolute -top-40 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-(--accent)/30 blur-3xl" />
               {" "}
        <div className="absolute top-32 right-0 h-80 w-80 rounded-full bg-(--accent-2)/25 blur-3xl" />
               {" "}
        <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-(--accent-3)/15 blur-3xl" />
             {" "}
      </div>
           {" "}
      <header className="sticky top-0 z-50">
               {" "}
        <div className="glass">
                   {" "}
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
                       {" "}
            <div className="flex items-center gap-3">
                           {" "}
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-(--accent)/40 bg-(--accent)/20 font-display text-sm">
                                BS              {" "}
              </div>
                           {" "}
              <div>
                               {" "}
                <p className="text-xs uppercase tracking-[0.3em] text-(--text-muted)">
                                    Portfolio                {" "}
                </p>
                               {" "}
                <p className="text-base font-semibold">Chinonso Onyebuagu</p>   
                         {" "}
              </div>
                         {" "}
            </div>
                       {" "}
            <nav className="hidden items-center gap-6 text-sm text-(--text-muted) md:flex">
                           {" "}
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="transition hover:text-(--white)"
                >
                                    {link.label}               {" "}
                </a>
              ))}
                         {" "}
            </nav>
                       {" "}
            <div className="flex items-center gap-3">
                           {" "}
              <button
                type="button"
                onClick={() =>
                  setTheme((prev) => (prev === "dark" ? "light" : "dark"))
                }
                className="icon-toggle"
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
                    <path d="M21 12.8A9 9 0 1111.2 3a7 7 0 109.8 9.8z" />       
                             {" "}
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
                                        <circle cx="12" cy="12" r="4" />
                                       {" "}
                    <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
                                     {" "}
                  </svg>
                )}
                             {" "}
              </button>
                           {" "}
              <a className="btn-primary text-sm" href="#contact">
                                Let’s Talk              {" "}
              </a>
                         {" "}
            </div>
                     {" "}
          </div>
                 {" "}
        </div>
             {" "}
      </header>
           {" "}
      <main className="relative">
               {" "}
        <section id="home" className="mx-auto max-w-6xl px-6 pb-16 pt-24">
                   {" "}
          <div className="grid items-center gap-12 lg:grid-cols-[1.2fr_0.8fr]">
                       {" "}
            <div className="space-y-6">
                           {" "}
              <div className="badge">
                               {" "}
                <span className="h-2 w-2 rounded-full bg-(--accent-3)" />       
                        Available for AI automation projects              {" "}
              </div>
                           {" "}
              <div className="space-y-4">
                               {" "}
                <h1 className="text-4xl font-semibold leading-tight md:text-6xl">
                                    Chinonso Bryan Onyebuagu                  {" "}
                  <span className="block text-gradient">
                                        AI Automation Engineer                
                     {" "}
                  </span>
                                 {" "}
                </h1>
                               {" "}
                <p className="text-lg text-(--text-muted)">
                                    I design premium digital experiences and
                  intelligent                   automation systems that blend
                  elegant UI with reliable AI                   workflows.      
                           {" "}
                </p>
                             {" "}
              </div>
                           {" "}
              <div className="flex flex-wrap gap-4">
                               {" "}
                <a className="btn-primary" href="#contact">
                                    Schedule a Call                {" "}
                </a>
                               {" "}
                <a className="btn-ghost" href="#projects">
                                    View Work                {" "}
                </a>
                             {" "}
              </div>
                           {" "}
              <div className="grid gap-6 pt-6 sm:grid-cols-3">
                               {" "}
                {[
                  { label: "Years building", value: "4+" },

                  { label: "Automations shipped", value: "4" },

                  { label: "Products launched", value: "15" },
                ].map((stat) => (
                  <div key={stat.label} className="card-grad p-4">
                                       {" "}
                    <p className="text-2xl font-semibold">{stat.value}</p>     
                                 {" "}
                    <p className="text-sm text-(--text-muted)">
                                            {stat.label}                   {" "}
                    </p>
                                     {" "}
                  </div>
                ))}
                             {" "}
              </div>
                         {" "}
            </div>
                       {" "}
            <div className="card-grad p-6">
                           {" "}
              <div className="space-y-4">
                                <p className="section-label">Current Focus</p> 
                             {" "}
                <h2 className="text-2xl font-semibold">
                                    Building autonomous workflows that scale
                  impact.                {" "}
                </h2>
                               {" "}
                <p className="text-sm text-(--text-muted)">
                                    I specialize in AI-first automation: agent
                  orchestration,                   intelligent routing, and
                  real-time data integrations that                   keep
                  products ahead.                {" "}
                </p>
                               {" "}
                <div className="grid gap-3">
                                   {" "}
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
                                           {" "}
                      <span className="h-2 w-2 rounded-full bg-(--accent-2)" /> 
                                         {" "}
                      <span className="text-sm">{item}</span>                 
                       {" "}
                    </div>
                  ))}
                                 {" "}
                </div>
                               {" "}
                <div className="rounded-2xl border border-(--hairline) bg-(--surface-strong)/40 p-4">
                                   {" "}
                  <p className="text-xs uppercase tracking-[0.4em] text-(--text-muted)">
                                        Tool Stack                  {" "}
                  </p>
                                   {" "}
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
                                                {tool}                     {" "}
                      </span>
                    ))}
                                     {" "}
                  </div>
                                 {" "}
                </div>
                             {" "}
              </div>
                         {" "}
            </div>
                     {" "}
          </div>
                 {" "}
        </section>
               {" "}
        <section id="about" className="mx-auto max-w-6xl px-6 py-16">
                   {" "}
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
                       {" "}
            <div className="card-grad p-8">
                            <p className="section-label">About</p>             {" "}
              <h2 className="mt-4 text-3xl font-semibold">
                                Engineering calm, automated workflows for modern
                teams.              {" "}
              </h2>
                           {" "}
              <p className="mt-4 text-(--text-muted)">
                                I partner with founders and operations leaders
                to automate                 repetitive work and elevate customer
                experiences. My approach                 blends product
                strategy, premium UI design, and dependable AI                
                automation pipelines.              {" "}
              </p>
                           {" "}
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
                                        {item}                 {" "}
                  </div>
                ))}
                             {" "}
              </div>
                         {" "}
            </div>
                       {" "}
            <div className="space-y-6">
                           {" "}
              <div className="card-grad p-6">
                                <p className="section-label">Signature</p>     
                         {" "}
                <h3 className="mt-3 text-xl font-semibold">
                                    Design + Automation                {" "}
                </h3>
                               {" "}
                <p className="mt-3 text-sm text-(--text-muted)">
                                    Combining sleek interfaces with AI-driven
                  backend logic for                   seamless customer
                  experiences.                {" "}
                </p>
                             {" "}
              </div>
                           {" "}
              <div className="card-grad p-6">
                                <p className="section-label">Process</p>       
                       {" "}
                <div className="mt-4 space-y-3 text-sm text-(--text-muted)">
                                    <p>1. Discovery & workflow audit</p>       
                            <p>2. AI automation architecture</p>               
                    <p>3. UI + integration delivery</p>                 {" "}
                  <p>4. Optimization & monitoring</p>               {" "}
                </div>
                             {" "}
              </div>
                           {" "}
              <div className="card-grad p-6">
                                <p className="section-label">Impact</p>         
                     {" "}
                <p className="mt-3 text-sm text-(--text-muted)">
                                    Delivering automation systems that cut
                  operational time by up                   to 60% while keeping
                  teams in control.                {" "}
                </p>
                             {" "}
              </div>
                         {" "}
            </div>
                     {" "}
          </div>
                 {" "}
        </section>
               {" "}
        <section id="services" className="mx-auto max-w-6xl px-6 py-16">
                   {" "}
          <div className="flex flex-wrap items-end justify-between gap-6">
                       {" "}
            <div>
                            <p className="section-label">Services</p>           
                <h2 className="mt-3 text-3xl font-semibold">What I deliver</h2> 
                       {" "}
            </div>
                       {" "}
            <p className="max-w-xl text-sm text-(--text-muted)">
                            End-to-end product support with automation built
              into every               layer.            {" "}
            </p>
                     {" "}
          </div>
                   {" "}
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
                       {" "}
            {services.map((service) => (
              <div key={service.title} className="card-grad p-6">
                               {" "}
                <h3 className="text-xl font-semibold">{service.title}</h3>     
                         {" "}
                <p className="mt-3 text-sm text-(--text-muted)">
                                    {service.description}               {" "}
                </p>
                             {" "}
              </div>
            ))}
                     {" "}
          </div>
                 {" "}
        </section>
               {" "}
        <section id="skills" className="mx-auto max-w-6xl px-6 py-16">
                   {" "}
          <div className="flex flex-wrap items-end justify-between gap-6">
                       {" "}
            <div>
                            <p className="section-label">Skills</p>             {" "}
              <h2 className="mt-3 text-3xl font-semibold">
                                Specialized tooling              {" "}
              </h2>
                         {" "}
            </div>
                       {" "}
            <p className="max-w-xl text-sm text-(--text-muted)">
                            A balanced stack of automation, engineering, and
              design systems.            {" "}
            </p>
                     {" "}
          </div>
                   {" "}
          <div className="mt-10 flex flex-wrap gap-3">
                       {" "}
            {skills.map((skill, index) => (
              <span
                key={skill}
                className="skill-pill rounded-full border border-(--hairline) bg-(--surface-strong)/60 px-4 py-2 text-sm"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                                {skill}             {" "}
              </span>
            ))}
                     {" "}
          </div>
                 {" "}
        </section>
               {" "}
        <section id="experience" className="mx-auto max-w-6xl px-6 py-16">
                   {" "}
          <div className="flex flex-wrap items-end justify-between gap-6">
                       {" "}
            <div>
                            <p className="section-label">Experience</p>         
                 {" "}
              <h2 className="mt-3 text-3xl font-semibold">
                                Automation journey              {" "}
              </h2>
                         {" "}
            </div>
                       {" "}
            <p className="max-w-xl text-sm text-(--text-muted)">
                            Focused on blending intelligent systems with premium
              digital               products.            {" "}
            </p>
                     {" "}
          </div>
                   {" "}
          <div className="mt-10 space-y-6">
                       {" "}
            {timeline.map((item, index) => (
              <div key={item.role} className="card-grad p-6">
                               {" "}
                <div className="flex flex-wrap items-center justify-between gap-6">
                                   {" "}
                  <div className="space-y-3">
                                       {" "}
                    <div>
                                           {" "}
                      <h3 className="text-xl font-semibold">{item.role}</h3>   
                                       {" "}
                      <p className="text-sm text-(--text-muted)">
                                                {item.company}                 
                           {" "}
                      </p>
                                         {" "}
                    </div>
                                       {" "}
                    <span className="text-xs uppercase tracking-[0.3em] text-(--text-muted)">
                                            {item.time}                   {" "}
                    </span>
                                       {" "}
                    <p className="text-sm text-(--text-muted)">
                                            {item.detail}                 
                       {" "}
                    </p>
                                     {" "}
                  </div>
                                   {" "}
                  <div
                    className="experience-illustration shrink-0"
                    style={{
                      background: `linear-gradient(140deg, ${item.accent}33, ${item.accentTwo}22)`,
                    }}
                  >
                                       {" "}
                    <div className="absolute inset-0 opacity-30">
                                           {" "}
                      <div className="absolute -top-6 left-4 h-16 w-16 rounded-full bg-white/10 blur-xl" />
                                           {" "}
                      <div className="absolute bottom-0 right-2 h-20 w-20 rounded-full bg-white/10 blur-xl" />
                                         {" "}
                    </div>
                                       {" "}
                    <div className="relative z-10 flex h-full w-full items-center justify-center">
                                            {renderExperienceIcon(item.icon)}   
                                     {" "}
                    </div>
                                     {" "}
                  </div>
                                 {" "}
                </div>
                               {" "}
                {index < timeline.length - 1 && (
                  <div className="mt-6 h-px w-full bg-white/5" />
                )}
                             {" "}
              </div>
            ))}
                     {" "}
          </div>
                 {" "}
        </section>
               {" "}
        <section id="projects" className="mx-auto max-w-6xl px-6 py-16">
                   {" "}
          <div className="flex flex-wrap items-end justify-between gap-6">
                       {" "}
            <div>
                            <p className="section-label">Projects</p>           
                <h2 className="mt-3 text-3xl font-semibold">Selected work</h2> 
                       {" "}
            </div>
                       {" "}
            <p className="max-w-xl text-sm text-(--text-muted)">
                            Automation projects, development work, and selected
              builds.            {" "}
            </p>
                     {" "}
          </div>
                   {" "}
          <div className="mt-10 grid gap-8 sm:grid-cols-2">
                       {" "}
            <a
              href="https://drive.google.com/drive/folders/1AflHkFqC76hknPXT6cIKscV0bYQTU9RU?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View automation projects on Google Drive"
              className="group flex min-h-[260px] flex-col items-center justify-center rounded-2xl border border-(--hairline) bg-(--surface-strong)/30 transition duration-300 hover:-translate-y-2 hover:border-(--accent)/50 hover:bg-(--surface-strong)/60"
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
                  />
                                   {" "}
                  <path
                    fill="#4285F4"
                    d="M16.1 5L2.9 27.8l4.8 8.3h28.4l4.8-8.3H12.5z"
                  />
                                   {" "}
                  <path
                    fill="#F4B400"
                    d="M25.8 5h-9.7l-8.4 14.5 4.8 8.3h9.7l8.4-14.5z"
                  />
                                 {" "}
                </svg>
                             {" "}
              </div>
                           {" "}
              <p className="mt-6 text-xl font-semibold">Google Drive</p>       
                   {" "}
              <p className="mt-2 text-sm text-(--text-muted)">
                                View automation projects              {" "}
              </p>
                         {" "}
            </a>
                       {" "}
            <a
              href="https://github.com/bryanonyebuagu"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View GitHub projects"
              className="group flex min-h-[260px] flex-col items-center justify-center rounded-2xl border border-(--hairline) bg-(--surface-strong)/30 transition duration-300 hover:-translate-y-2 hover:border-(--accent)/50 hover:bg-(--surface-strong)/60"
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
                  <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56v-2.17c-3.2.7-3.88-1.36-3.88-1.36-.53-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.68 1.25 3.33.96.1-.74.4-1.25.73-1.54-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.47.11-3.06 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 5.74 0c2.19-1.49 3.15-1.18 3.15-1.18.62 1.59.23 2.77.11 3.06.73.81 1.18 1.84 1.18 3.1 0 4.43-2.69 5.4-5.25 5.69.41.36.78 1.07.78 2.16v3.2c0 .31.21.68.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" />
                                 {" "}
                </svg>
                             {" "}
              </div>
                            <p className="mt-6 text-xl font-semibold">GitHub</p>
                           {" "}
              <p className="mt-2 text-sm text-(--text-muted)">
                                View development projects              {" "}
              </p>
                         {" "}
            </a>
                     {" "}
          </div>
                 {" "}
        </section>
               {" "}
        <section id="testimonials" className="mx-auto max-w-6xl px-6 py-16">
                   {" "}
          <div className="flex flex-wrap items-end justify-between gap-6">
                       {" "}
            <div>
                            <p className="section-label">Testimonials</p>       
                   {" "}
              <h2 className="mt-3 text-3xl font-semibold">Client feedback</h2> 
                       {" "}
            </div>
                       {" "}
            <p className="max-w-xl text-sm text-(--text-muted)">
                            Long-term partnerships built on trust, clarity, and
              execution.            {" "}
            </p>
                     {" "}
          </div>
                   {" "}
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
                       {" "}
            {testimonials.map((item) => (
              <div key={item.name} className="card-grad p-6">
                               {" "}
                <p className="text-sm text-(--text-muted)">
                                    “{item.quote}”                {" "}
                </p>
                               {" "}
                <div className="mt-4">
                                    <p className="font-semibold">{item.name}</p>
                                   {" "}
                  <p className="text-xs uppercase tracking-[0.3em] text-(--text-muted)">
                                        {item.title}                 {" "}
                  </p>
                                 {" "}
                </div>
                             {" "}
              </div>
            ))}
                     {" "}
          </div>
                 {" "}
        </section>
               {" "}
        <section id="contact" className="mx-auto max-w-6xl px-6 py-16">
                   {" "}
          <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr]">
                       {" "}
            <div className="card-grad p-8">
                            <p className="section-label">Contact</p>           
               {" "}
              <h2 className="mt-4 text-3xl font-semibold">
                                Let’s build your next automation.            
                 {" "}
              </h2>
                           {" "}
              <p className="mt-4 text-sm text-(--text-muted)">
                                Share a few details about your automation goals
                and I’ll                 respond within two business days.      
                       {" "}
              </p>
                           {" "}
              <form className="mt-6 space-y-4" onSubmit={handleContactSubmit}>
                               {" "}
                <div className="grid gap-4 sm:grid-cols-2">
                                   {" "}
                  <input
                    name="name"
                    className="w-full rounded-xl border border-(--hairline) bg-(--surface-strong)/50 px-4 py-3 text-sm focus:outline-none"
                    placeholder="Name"
                    type="text"
                    required
                  />
                                   {" "}
                  <input
                    name="email"
                    className="w-full rounded-xl border border-(--hairline) bg-(--surface-strong)/50 px-4 py-3 text-sm focus:outline-none"
                    placeholder="Email"
                    type="email"
                    required
                  />
                                 {" "}
                </div>
                               {" "}
                <input
                  name="company"
                  className="w-full rounded-xl border border-(--hairline) bg-(--surface-strong)/50 px-4 py-3 text-sm focus:outline-none"
                  placeholder="Company / Project"
                  type="text"
                />
                               {" "}
                <textarea
                  name="message"
                  className="h-32 w-full rounded-xl border border-(--hairline) bg-(--surface-strong)/50 px-4 py-3 text-sm focus:outline-none"
                  placeholder="Tell me about the workflow you want to automate..."
                  required
                />
                               {" "}
                <button className="btn-primary" type="submit">
                                    Send message                {" "}
                </button>
                             {" "}
              </form>
                         {" "}
            </div>
                       {" "}
            <div className="space-y-6">
                           {" "}
              {contactCards.map((card) => (
                <div key={card.label} className="card-grad p-6">
                                   {" "}
                  <p className="section-label">{card.label}</p>                 {" "}
                  <p className="mt-3 text-lg font-semibold">{card.value}</p>   
                             {" "}
                </div>
              ))}
                           {" "}
              <div className="card-grad p-6">
                                <p className="section-label">Social</p>         
                     {" "}
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
                      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V8.99h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.29zM5.32 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.1 20.45H3.54V8.99H7.1v11.46zM22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.21 0 22.23 0z" />
                                         {" "}
                    </svg>
                                        <span>LinkedIn</span>               
                     {" "}
                  </a>
                                   {" "}
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
        </div>
      </footer>
    </div>
  );
}
