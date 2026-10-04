import React, { useEffect, useMemo, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { ArrowDownRight, ArrowUpRight, Check, Menu, Plus, X } from "lucide-react";
import "./styles.css";

const projects = [
  {
    name: "AURA",
    type: "Aesthetic Clinic",
    tag: "Trust / Conversion",
    className: "project-clinic",
    code: "AURA",
    summary: "A premium clinic experience designed around trust, clarity and a frictionless booking journey.",
    challenge: "Premium clinics often have strong services but digital experiences that feel generic, clinical or difficult to navigate.",
    strategy: "Create a calm editorial environment that explains expertise quickly and moves visitors naturally toward consultation.",
    system: "Soft editorial imagery, precise typography, treatment storytelling and a booking flow built around confidence.",
    outcome: "A digital flagship designed to turn expertise into trust before the first consultation.",
    deliverables: "Strategy / UX / Editorial Design / Motion / Conversion",
    principle: "Make confidence visible before asking for commitment."
  },
  {
    name: "NOIR HOUSE",
    type: "Luxury Hospitality",
    tag: "Atmosphere / Desire",
    className: "project-hospitality",
    code: "NOIR",
    summary: "A cinematic hospitality identity built to turn atmosphere into desire before a guest ever arrives.",
    challenge: "Luxury hospitality is difficult to communicate with static information alone. The digital experience has to create a feeling.",
    strategy: "Lead with atmosphere, then reveal the practical details when the visitor is ready to act.",
    system: "Dark editorial layouts, immersive imagery, restrained motion and a reservation path that stays visible without becoming intrusive.",
    outcome: "A digital experience where the feeling of the property arrives before the guest does.",
    deliverables: "Brand Experience / Art Direction / UX / Motion / Reservation Flow",
    principle: "Lead with atmosphere. Reveal information when it becomes useful."
  },
  {
    name: "NORTHLINE",
    type: "Architecture / Construction",
    tag: "Precision / Leads",
    className: "project-architecture",
    code: "NORTH",
    summary: "A structural digital identity for an architecture and construction brand built to communicate precision.",
    challenge: "Complex projects can become visually impressive but difficult to understand. The website needs to communicate both craft and capability.",
    strategy: "Use the project portfolio as the primary proof, supported by a clear narrative around process, materials and expertise.",
    system: "Architectural grids, oversized project imagery, technical details and a focused enquiry journey.",
    outcome: "A precise digital identity designed to make serious work feel as serious online as it does in the real world.",
    deliverables: "Positioning / Information Architecture / Portfolio UX / Design / Development",
    principle: "Let the work carry the story, then remove everything that gets in its way."
  },
  {
    name: "SALT & STONE",
    type: "Restaurant / Dining",
    tag: "Taste / Reservations",
    className: "project-restaurant",
    code: "SALT",
    summary: "A contemporary restaurant experience built around appetite, atmosphere and an effortless table booking journey.",
    challenge: "Restaurant websites need to communicate the feeling of the room and the food while making menus, location and reservations easy to find.",
    strategy: "Lead with editorial food and interior direction, then keep practical details and reservation actions close at hand.",
    system: "Warm tones, expressive typography, a seasonal menu story and a direct reservation path.",
    outcome: "A restaurant concept designed to make the next visit feel appealing and simple to plan.",
    deliverables: "Art Direction / Menu UX / Responsive Design / Reservation Journey",
    principle: "Make people hungry to visit, then make the next step effortless."
  },
];

const approach = [
  ["Strategy", "Find the signal. Position the brand. Define what the experience needs to achieve."],
  ["Design", "Create a visual language with enough character to be remembered and enough clarity to convert."],
  ["Development", "Turn the system into a fast, responsive and technically precise digital experience."],
  ["Growth", "Launch with intent. Learn from behavior. Keep improving what happens after the click."]
];

const labItems = [
  ["01", "Kinetic Type", "Typography that responds to scroll, pointer position and context."],
  ["02", "Spatial UI", "Interfaces that use depth and movement without adding friction."],
  ["03", "AI Experience", "Useful intelligence embedded directly into the customer journey."],
  ["04", "Motion Systems", "A repeatable motion language instead of random animation."]
];

function App() {
  const cursor = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [language, setLanguage] = useState("no");
  const [cursorLabel, setCursorLabel] = useState("");
  const [activeApproach, setActiveApproach] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [navScrolled, setNavScrolled] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeLab, setActiveLab] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const closeTrigger = useRef(null);
  const caseOrigin = useRef(null);

  useEffect(() => {
    document.documentElement.lang = language;
    const translations = {
  "Work": "Arbeid",
  "Approach": "Metode",
  "Lab": "Lab",
  "About": "Om oss",
  "Start a project": "Start et prosjekt",
  "DIGITAL EXPERIENCE STUDIO": "DIGITALT DESIGNSTUDIO",
  "BRAND / UX / CODE": "MERKEVARE / UX / KODE",
  "OSLO / WORLDWIDE": "OSLO / NORGE",
  "WE BUILD": "VI BYGGER",
  "DIGITAL": "DIGITALE",
  "EXPERIENCES": "OPPLEVELSER",
  "Websites designed to make ambitious businesses impossible to ignore.": "Nettsider som gjør at ambisiøse bedrifter blir lagt merke til.",
  "START A PROJECT": "START ET PROSJEKT",
  "VIEW OUR WORK": "SE VÅRT ARBEID",
  "SCROLL TO EXPLORE": "RULL FOR Å UTFORSKE",
  "THE DIGITAL FLAGSHIP": "BEDRIFTENS DIGITALE UTSTILLINGSVINDU",
  "YOUR WEBSITE": "NETTSIDEN DIN",
  "IS YOUR DIGITAL FLAGSHIP.": "ER DITT DIGITALE UTSTILLINGSVINDU.",
  "The place where your brand meets the world. We turn that first impression into an experience people remember, trust and act on.": "Det er her merkevaren din møter verden. Vi gjør førsteinntrykket om til en opplevelse folk husker, stoler på og handler ut fra.",
  "SELECTED WORK": "UTVALGTE PROSJEKTER",
  "BUILT TO": "SKAPT FOR Å",
  "BE REMEMBERED.": "BLI HUSKET.",
  "Four digital worlds. Four different problems. One standard: make the experience matter.": "Fire digitale konsepter. Fire ulike behov. Én standard: Opplevelsen skal gjøre en forskjell.",
  "THE DIFFERENCE": "FORSKJELLEN",
  "BEAUTIFUL": "VAKKERT",
  "IS THE BASELINE.": "ER BARE STARTEN.",
  "We build for what happens after the click.": "Vi designer for det som skjer etter klikket.",
  "CLARITY": "TYDELIGHET",
  "TRUST": "TILLIT",
  "DESIRE": "ØNSKE",
  "ACTION": "HANDLING",
  "OUR APPROACH": "VÅR METODE",
  "COMPLEXITY": "KOMPLEKSITET",
  "UNDERNEATH.": "UNDER OVERFLATEN.",
  "Simplicity on the surface. Every decision has a reason, every interaction has a job.": "Enkelt på overflaten. Hver beslutning har en grunn, og hver interaksjon har en funksjon.",
  "DESIGN THAT DOES SOMETHING": "DESIGN SOM SKAPER RESULTATER",
  "MAKE PEOPLE": "FÅ FOLK TIL Å",
  "STOP.": "STOPPE OPP.",
  "Build trust faster": "Bygg tillit raskere",
  "Generate better leads": "Få bedre kundeemner",
  "Explain complex offers": "Forklar komplekse tjenester",
  "Turn attention into action": "Gjør oppmerksomhet til handling",
  "INTERACTION / 04": "INTERAKSJON / 04",
  "MOTION / ON": "BEVEGELSE / PÅ",
  "SYSTEM / ACTIVE": "SYSTEM / AKTIVT",
  "THE LAB": "LABORATORIET",
  "WE TEST": "VI UTFORSKER",
  "WHAT'S NEXT.": "DET NESTE.",
  "Interactive type. Motion systems. Spatial interfaces. AI experiences. We experiment so the final product can feel inevitable.": "Interaktiv typografi, bevegelse, romlige grensesnitt og AI-opplevelser. Vi eksperimenterer for å skape bedre digitale produkter.",
  "ABOUT": "OM OSS",
  "SMALL TEAM.": "LITE TEAM.",
  "BIG CRAFT.": "HØYT HÅNDVERK.",
  "Independent digital studio based in Oslo, working with ambitious businesses worldwide. We combine strategy, design and development in one focused team.": "Uavhengig digitalt studio i Oslo som jobber med ambisiøse bedrifter. Vi samler strategi, design og utvikling i ett fokusert team.",
  "READY TO BUILD": "KLAR FOR Å SKAPE",
  "SOMETHING UNFORGETTABLE?": "NOE SOM BLIR HUSKET?",
  "Tell us what you are building, where the current experience falls short and what needs to change.": "Fortell oss hva du vil bygge, hva som ikke fungerer i dag, og hva du ønsker å forbedre.",
  "Name": "Navn",
  "Your name": "Ditt navn",
  "Company": "Bedrift",
  "Company name": "Bedriftsnavn",
  "Project type": "Type prosjekt",
  "New digital experience": "Ny nettside eller digital opplevelse",
  "Website redesign": "Redesign av nettside",
  "Digital product": "Digitalt produkt",
  "Growth and conversion": "Vekst og konvertering",
  "What are you trying to achieve?": "Hva ønsker du å oppnå?",
  "A short description of the project": "Beskriv prosjektet kort",
  "BRIEF READY": "KLAR TIL Å SENDES",
  "SEND PROJECT BRIEF": "SEND PROSJEKTBESKRIVELSE",
  "Your email draft is ready. Send it from your email client to continue the conversation.": "E-postutkastet er klart. Send det fra e-postprogrammet ditt for å fortsette dialogen.",
  "CHALLENGE": "UTFORDRING",
  "STRATEGY": "STRATEGI",
  "SYSTEM": "SYSTEM",
  "OUTCOME": "RESULTAT",
  "DELIVERABLES": "LEVERANSER",
  "DESIGN PRINCIPLE": "DESIGNPRINSIPP",
  "PREVIOUS CASE": "FORRIGE PROSJEKT",
  "NEXT CASE": "NESTE PROSJEKT",
  "OPEN FULL EXPERIENCE": "ÅPNE HELE DEMOEN",
  "CLOSE CASE": "LUKK PROSJEKT",
  "Go to top": "Til toppen",
  "Close project": "Lukk prosjekt",
  "Close menu": "Lukk meny",
  "Open menu": "Åpne meny",
  "Flagship": "Hovedprosjekt",
  "Trust / Conversion": "Tillit / Konvertering",
  "Atmosphere / Desire": "Atmosfære / Ønske",
  "Precision / Leads": "Presisjon / Leads",
  "Taste / Reservations": "Matopplevelse / Reservasjoner",
  "Aesthetic Clinic": "Estetisk klinikk",
  "Luxury Hospitality": "Eksklusiv hotell- og restaurantopplevelse",
  "Architecture / Construction": "Arkitektur / Bygg",
  "Restaurant / Dining": "Restaurant / Servering",
  "A premium clinic experience designed around trust, clarity and a frictionless booking journey.": "En premium klinikkopplevelse bygget på tillit, tydelighet og en enkel bestillingsreise.",
  "Create a calm editorial environment that explains expertise quickly and moves visitors naturally toward consultation.": "Skap et rolig, redaksjonelt uttrykk som forklarer kompetansen og leder besøkende mot konsultasjon.",
  "A cinematic hospitality identity built to turn atmosphere into desire before a guest ever arrives.": "En filmatisk identitet for gjestfrihet som skaper forventning før gjesten ankommer.",
  "A structural digital identity for an architecture and construction brand built to communicate precision.": "En strukturert digital identitet for arkitektur og bygg som kommuniserer presisjon.",
  "A contemporary restaurant experience built around appetite, atmosphere and an effortless table booking journey.": "En moderne restaurantopplevelse bygget rundt matglede, atmosfære og enkel bordbestilling."
};
    const translateTree = (root) => {
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
      const nodes = [];
      while (walker.nextNode()) nodes.push(walker.currentNode);
      for (const node of nodes) {
        const original = node.nodeValue;
        const trimmed = original.trim();
        if (language === "no" && translations[trimmed]) {
          node.nodeValue = original.replace(trimmed, translations[trimmed]);
        }
      }
      root.querySelectorAll?.("[placeholder], [aria-label]").forEach((el) => {
        if (language === "no") {
          if (translations[el.getAttribute("placeholder")]) el.setAttribute("placeholder", translations[el.getAttribute("placeholder")]);
          if (translations[el.getAttribute("aria-label")]) el.setAttribute("aria-label", translations[el.getAttribute("aria-label")]);
        }
      });
    };
    translateTree(document.body);
    const observer = new MutationObserver((mutations) => {
      if (language !== "no") return;
      for (const mutation of mutations) {
        if (mutation.type === "childList") mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.TEXT_NODE) {
            const trimmed = node.nodeValue.trim();
            if (translations[trimmed]) node.nodeValue = node.nodeValue.replace(trimmed, translations[trimmed]);
          } else if (node.nodeType === Node.ELEMENT_NODE) translateTree(node);
        });
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [language]);

  useEffect(() => {
    const move = (event) => {
      if (cursor.current) {
        cursor.current.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
      }
    };
    const scroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(max > 0 ? window.scrollY / max : 0);
      setNavScrolled(window.scrollY > 24);
      const rows = [...document.querySelectorAll(".approach-row")];
      if (!rows.length) return;
      let nearest = 0;
      rows.forEach((row, index) => {
        const target = window.innerHeight * 0.48;
        const distance = Math.abs(row.getBoundingClientRect().top - target);
        const current = Math.abs(rows[nearest].getBoundingClientRect().top - target);
        if (distance < current) nearest = index;
      });
      setActiveApproach(nearest);
    };
    const keydown = (event) => {
      if (event.key === "Escape") {
        closeProject();
        setMenuOpen(false);
      }
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("scroll", scroll, { passive: true });
    window.addEventListener("keydown", keydown);
    scroll();
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("scroll", scroll);
      window.removeEventListener("keydown", keydown);
    };
  }, []);

  useEffect(() => {
    document.getElementById("boot-fallback")?.remove();
    document.body.style.overflow = selectedProject ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [selectedProject]);

  const scrollTo = (id) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const track = (event, payload = {}) => {
    window.dataLayer?.push({ event, ...payload });
  };

  const cursorProps = (label) => ({
    onMouseEnter: () => setCursorLabel(label),
    onMouseLeave: () => setCursorLabel("")
  });

  const openProject = (project) => {
    caseOrigin.current = document.activeElement;
    track("smartsvar_case_open", { project: project.name });
    setSelectedProject(project);
  };
  const projectKeyDown = (event, project) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openProject(project);
    }
  };

  const selectedIndex = useMemo(
    () => selectedProject ? projects.findIndex((project) => project.name === selectedProject.name) : -1,
    [selectedProject]
  );

  const changeProject = (direction) => {
    if (selectedIndex < 0) return;
    const nextIndex = (selectedIndex + direction + projects.length) % projects.length;
    const nextProject = projects[nextIndex];
    track("smartsvar_case_navigate", { from: selectedProject.name, to: nextProject.name });
    setSelectedProject(nextProject);
  };

  useEffect(() => {
    if (!selectedProject || selectedIndex < 0) return;
    const handleCaseKeys = (event) => {
      if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
      event.preventDefault();
      const direction = event.key === "ArrowRight" ? 1 : -1;
      const nextIndex = (selectedIndex + direction + projects.length) % projects.length;
      const nextProject = projects[nextIndex];
      track("smartsvar_case_navigate", { from: selectedProject.name, to: nextProject.name });
      setSelectedProject(nextProject);
    };
    window.addEventListener("keydown", handleCaseKeys);
    return () => window.removeEventListener("keydown", handleCaseKeys);
  }, [selectedProject, selectedIndex]);

  useEffect(() => {
    if (!selectedProject) return;
    requestAnimationFrame(() => closeTrigger.current?.focus());
  }, [selectedProject]);

  const closeProject = () => {
    setSelectedProject(null);
    requestAnimationFrame(() => caseOrigin.current?.focus?.());
  };

  const handleBrief = (event) => {
    track("smartsvar_enquiry_start", { form: "project_brief" });
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = `SmartSvar project enquiry from ${data.get("name")}`;
    const body = [
      `Name: ${data.get("name")}`,
      `Company: ${data.get("company")}`,
      `Project type: ${data.get("type")}`,
      "",
      "Project brief:",
      data.get("message")
    ].join("\n");
    window.location.href = `mailto:jelassi@smartsvar.no?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSubmitted(true);
  };

  return (
    <div className="site" key={language} style={{ "--scroll": scrollProgress }}>
      <div className={`cursor ${cursorLabel ? "cursor-active" : ""}`} ref={cursor}>
        {cursorLabel && <span>{cursorLabel}</span>}
      </div>
      <div className="progress-line" />

      <header className={`nav${navScrolled ? " nav-scrolled" : ""}`}>
        <button className="brand brand-button" onClick={() => scrollTo("top")} aria-label="Go to top">SMARTSVAR<span>®</span></button>
        <div className="nav-center">DIGITAL EXPERIENCE STUDIO</div>
        <nav>
          <button onClick={() => { track("smartsvar_nav_click", { target: "work" }); scrollTo("work"); }}>Work</button>
          <button onClick={() => { track("smartsvar_nav_click", { target: "approach" }); scrollTo("approach"); }}>Approach</button>
          <button onClick={() => { track("smartsvar_nav_click", { target: "lab" }); scrollTo("lab"); }}>Lab</button>
          <button onClick={() => { track("smartsvar_nav_click", { target: "about" }); scrollTo("about"); }}>About</button>
          <button className="nav-cta" onClick={() => { track("smartsvar_cta_click", { location: "nav" }); scrollTo("contact"); }} {...cursorProps("START PROJECT ↗")}>Start a project <ArrowUpRight size={15}/></button>
        </nav>
        <button className="language-toggle" onClick={() => setLanguage(language === "no" ? "en" : "no")} aria-label={language === "no" ? "Switch to English" : "Bytt til norsk"}>{language === "no" ? "EN" : "NO"}</button>
        <button className="mobile-menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} aria-controls="mobile-navigation">
          {menuOpen ? <X size={22}/> : <Menu size={22}/>}
        </button>
      </header>

      {menuOpen && (
        <div className="mobile-menu" id="mobile-navigation" role="navigation" aria-label="Mobile navigation">
          {["work", "approach", "lab", "about", "contact"].map((id) => (
            <button key={id} onClick={() => scrollTo(id)}>{id === "contact" ? "Start a project ↗" : id}</button>
          ))}
        </div>
      )}

      <main id="top">
        <section className="hero">
          <div className="construction-grid" />
          <div className="hero-noise" />
          <div className="hero-orbit orbit-a" />
          <div className="hero-orbit orbit-b" />
          <div className="hero-fragment fragment-one">BRAND / UX / CODE</div>
          <div className="hero-fragment fragment-two">OSLO / WORLDWIDE</div>
          <div className="hero-fragment fragment-three">SYSTEM / 001</div>
          <div className="hero-crosshair" />

          <div className="hero-copy">
            <p className="eyebrow hero-eyebrow">DIGITAL EXPERIENCE STUDIO <span>EST. 2026</span></p>
            <h1>WE BUILD<br/><em>DIGITAL</em><br/>EXPERIENCES<span className="hero-dot">.</span></h1>
            <div className="hero-bottom">
              <p>Websites designed to make ambitious businesses impossible to ignore.</p>
              <div className="hero-actions">
                <button className="button primary" onClick={() => { track("smartsvar_cta_click", { location: "hero" }); scrollTo("contact"); }} {...cursorProps("START PROJECT ↗")}>START A PROJECT <ArrowUpRight size={18}/></button>
                <button className="button ghost" onClick={() => { track("smartsvar_cta_click", { location: "hero_work" }); scrollTo("work"); }} {...cursorProps("VIEW WORK ↘")}>VIEW OUR WORK <ArrowDownRight size={18}/></button>
              </div>
            </div>
          </div>
          <div className="hero-index">SMARTSVAR / 001</div>
          <div className="scroll-cue"><span>SCROLL TO EXPLORE</span><ArrowDownRight size={15}/></div>
        </section>

        <section className="statement">
          <div className="statement-label">THE DIGITAL FLAGSHIP</div>
          <div className="statement-main">
            <div className="statement-line" />
            <h2>YOUR WEBSITE<br/><span>IS YOUR DIGITAL FLAGSHIP.</span></h2>
            <p>The place where your brand meets the world. We turn that first impression into an experience people remember, trust and act on.</p>
          </div>
        </section>

        <section className="work" id="work">
          <div className="section-head">
            <div><span className="eyebrow">SELECTED WORK</span><h2>BUILT TO<br/><em>BE REMEMBERED.</em></h2></div>
            <p>Four digital worlds. Four different problems. One standard: make the experience matter.</p>
          </div>
          <div className="projects">
            {projects.map((project, index) => (
              <article className={`project ${project.className}`} key={project.name} tabIndex="0" role="button" aria-label={`View ${project.name} case study`} onClick={() => openProject(project)} onKeyDown={(event) => projectKeyDown(event, project)} {...cursorProps("VIEW PROJECT ↗")}>
                <div className="project-art">
                  <div className="art-grid" />
                  <div className="art-scan" />
                  <div className="art-shape shape-one" />
                  <div className="art-shape shape-two" />
                  <div className="art-shape shape-three" />
                  <div className="art-word">{project.code}</div>
                  <div className="art-label">CASE / {String(index + 1).padStart(2, "0")}</div>
                  <span className="art-orbit" />
                  <span className="art-caption">{project.summary}</span>
                </div>
                <div className="project-meta">
                  <div><span>{project.tag}</span><h3>{project.name}</h3></div>
                  <div className="project-type">{project.type}</div>
                  <ArrowUpRight size={20}/>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="difference">
          <div className="eyebrow">THE DIFFERENCE</div>
          <h2>BEAUTIFUL<br/><em>IS THE BASELINE.</em></h2>
          <div className="difference-bottom">
            <p>We build for what happens after the click.</p>
            <div className="difference-word"><span>CLARITY</span><span>TRUST</span><span>DESIRE</span><span>ACTION</span></div>
          </div>
        </section>

        <section className="approach" id="approach">
          <div className="section-head">
            <div><span className="eyebrow">OUR APPROACH</span><h2>COMPLEXITY<br/><em>UNDERNEATH.</em></h2></div>
            <p>Simplicity on the surface. Every decision has a reason, every interaction has a job.</p>
          </div>
          <div className="approach-stage">
            <div className="approach-display">
              <span>0{activeApproach + 1}</span>
              <strong>{approach[activeApproach][0]}</strong>
              <p>{approach[activeApproach][1]}</p>
              <div className="approach-bar"><i style={{ width: `${(activeApproach + 1) * 25}%` }} /></div>
            </div>
            <div className="approach-list">
              {approach.map(([title, text], index) => (
                <button className={`approach-row ${activeApproach === index ? "active" : ""}`} key={title} onMouseEnter={() => setActiveApproach(index)} onFocus={() => setActiveApproach(index)}>
                  <span className="approach-index">0{index + 1}</span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                  <Plus size={22}/>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="impact">
          <div className="eyebrow">DESIGN THAT DOES SOMETHING</div>
          <div className="impact-copy">
            <h2>MAKE PEOPLE<br/><em>STOP.</em></h2>
            <div className="impact-lines">
              <p>Build trust faster</p><p>Generate better leads</p><p>Explain complex offers</p><p>Turn attention into action</p>
            </div>
          </div>
        </section>

        <section className="lab" id="lab">
          <div className="lab-visual">
            <div className="lab-crosshair" />
            <div className="lab-core">{String(activeLab + 1).padStart(2, "0")}</div>
            <div className="lab-ring ring-one"/>
            <div className="lab-ring ring-two"/>
            <div className="lab-ring ring-three"/>
            <span className="lab-data data-one">INTERACTION / 04</span>
            <span className="lab-data data-two">MOTION / ON</span>
            <span className="lab-data data-three">SYSTEM / ACTIVE</span>
          </div>
          <div className="lab-copy">
            <span className="eyebrow">THE LAB</span>
            <h2>WE TEST<br/><em>WHAT'S NEXT.</em></h2>
            <p>Interactive type. Motion systems. Spatial interfaces. AI experiences. We experiment so the final product can feel inevitable.</p>
            <div className="lab-list">
              {labItems.map(([number, title, text], index) => (
                <button className={`lab-item ${activeLab === index ? "active" : ""}`} key={number} onMouseEnter={() => setActiveLab(index)} onFocus={() => setActiveLab(index)}>
                  <span>{number}</span><strong>{title}</strong><small>{text}</small><ArrowUpRight size={15}/>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="about" id="about">
          <div className="eyebrow">ABOUT</div>
          <h2>SMALL TEAM.<br/><em>BIG CRAFT.</em></h2>
          <div className="about-grid">
            <p>Independent digital studio based in Oslo, working with ambitious businesses worldwide. We combine strategy, design and development in one focused team.</p>
            <div className="about-principles">
              <span>01 / CLARITY</span>
              <span>02 / CRAFT</span>
              <span>03 / PURPOSE</span>
              <span>04 / MOTION</span>
            </div>
          </div>
        </section>

        <section className="contact" id="contact">
          <span className="eyebrow">START A PROJECT</span>
          <h2>READY TO BUILD<br/><em>SOMETHING UNFORGETTABLE?</em></h2>
          <div className="contact-layout">
            <div>
              <p>Tell us what you are building, where the current experience falls short and what needs to change.</p>
              <a className="contact-email" href="mailto:jelassi@smartsvar.no" {...cursorProps("EMAIL SMARTSVAR ↗")}>jelassi@smartsvar.no <ArrowUpRight size={17}/></a>
            </div>
            <form className="brief-form" onSubmit={handleBrief}>
              <label>Name<input required name="name" placeholder="Your name" /></label>
              <label>Company<input required name="company" placeholder="Company name" /></label>
              <label>Project type<select name="type" defaultValue="New digital experience"><option>New digital experience</option><option>Website redesign</option><option>Digital product</option><option>Growth and conversion</option></select></label>
              <label>What are you trying to achieve?<textarea required name="message" rows="4" placeholder="A short description of the project" /></label>
              <button className="contact-button" type="submit">{submitted ? <><Check size={20}/> BRIEF READY</> : <>SEND PROJECT BRIEF <ArrowUpRight size={22}/></>}</button>
              {submitted && <p className="form-note">Your email draft is ready. Send it from your email client to continue the conversation.</p>}
            </form>
          </div>
        </section>
      </main>

      {selectedProject && (
        <div className="case-overlay" role="dialog" aria-modal="true" aria-label={selectedProject.name} onClick={closeProject}>
          <div className={`case-panel ${selectedProject.className}`} onClick={(event) => event.stopPropagation()}>
            <button className="case-close" onClick={() => setSelectedProject(null)} aria-label="Close project"><X size={22}/></button>
            <div className="case-visual">
              <span>CASE / {String(selectedIndex + 1).padStart(2, "0")}</span>
              <strong>{selectedProject.code}</strong>
              <div className="case-grid" />
            </div>
            <div className="case-content">
              <span className="eyebrow">{selectedProject.type}</span>
              <h2>{selectedProject.name}</h2>
              <p className="case-summary">{selectedProject.summary}</p>
              <div className="case-sections">
                <div><span>CHALLENGE</span><p>{selectedProject.challenge}</p></div>
                <div><span>STRATEGY</span><p>{selectedProject.strategy}</p></div>
                <div><span>SYSTEM</span><p>{selectedProject.system}</p></div>
                <div><span>OUTCOME</span><p>{selectedProject.outcome}</p></div>
                <div><span>DELIVERABLES</span><p>{selectedProject.deliverables}</p></div>
                <div><span>DESIGN PRINCIPLE</span><p>{selectedProject.principle}</p></div>
              </div>
              <div className="case-actions">
                <button className="text-link" onClick={() => changeProject(-1)} aria-label="Previous case">PREVIOUS CASE <ArrowUpRight size={16}/></button>
                <button className="text-link" onClick={() => changeProject(1)} aria-label="Next case">NEXT CASE <ArrowUpRight size={16}/></button>
                <a className="text-link" href={selectedProject.name === "SmartSvar Studio" ? "/" : `/demos/${selectedProject.name === "AURA" ? "aura" : selectedProject.name === "NOIR HOUSE" ? "noir" : selectedProject.name === "NORTHLINE" ? "northline" : "salt-stone"}/`} target="_blank" rel="noreferrer" onClick={() => track("smartsvar_full_experience_click", { project: selectedProject.name })}>OPEN FULL EXPERIENCE <ArrowUpRight size={16}/></a>
                <button className="text-link" onClick={() => setSelectedProject(null)}>CLOSE CASE <X size={16}/></button>
              </div>
            </div>
          </div>
        </div>
      )}

      <footer>
        <div className="brand">SMARTSVAR<span>®</span></div>
        <div>OSLO / WORLDWIDE</div>
        <div>© 2026 SMARTSVAR</div>
      </footer>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
