import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { ArrowUpRight, Bot, ChevronDown, CircleCheck, Menu, X, Workflow, Sparkles, ShieldCheck } from "lucide-react";
import "./ai-solutions.css";

const services = [
  {
    icon: Sparkles,
    name: "AI Consulting",
    label: "Finn hvor AI skaper verdi",
    text: "Vi finner praktiske muligheter for å spare tid, redusere manuelt arbeid og forbedre hvordan teamet jobber.",
    points: ["AI mulighetsanalyse", "Prosesskartlegging og prioritering", "Business case og implementeringsplan"]
  },
  {
    icon: Bot,
    name: "AI Agent Development",
    label: "Bygg løsningen",
    text: "Vi designer og bygger AI-agenter og automatiseringer rundt oppgavene dere faktisk trenger å få gjort.",
    points: ["AI-agenter og assistenter", "Automatiserte arbeidsflyter", "Integrasjoner med verktøyene dere allerede bruker"]
  },
  {
    icon: Workflow,
    name: "AI Automation",
    label: "Forbedre kontinuerlig",
    text: "Vi hjelper dere å gjøre AI-arbeidsflyter til stabile systemer som blir bedre over tid.",
    points: ["Oppfølging og optimalisering", "Nye automatiseringer", "Løpende AI-rådgivning"]
  }
];

const steps = [
  ["Find", "Identify the process, friction or opportunity where AI can make a measurable difference."],
  ["Calculate", "Estimate time, cost and business impact before building anything."],
  ["Fix", "Implement the smallest useful AI solution that solves the real problem."],
  ["Measure", "Review the outcome, improve the system and decide what comes next."]
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [sent, setSent] = useState(false);

  const scrollTo = (id) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const submitBrief = (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const subject = `SmartSvar enquiry from ${form.get("name")}`;
    const body = [
      `Name: ${form.get("name")}`,
      `Company: ${form.get("company")}`,
      `What do you want to improve?: ${form.get("challenge")}`,
      "",
      "Message:",
      form.get("message")
    ].join("\n");
    window.location.href = `mailto:jelassi@smartsvar.no?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <div className="ai-site">
      <div className="ai-grid" />
      <header className="ai-nav">
        <button className="ai-brand" onClick={() => scrollTo("top")} aria-label="Til toppen">
          SMARTSVAR<span>®</span>
        </button>
        <div className="ai-nav-center">AI-LØSNINGER / OSLO</div>
        <nav>
          <button onClick={() => scrollTo("services")}>Tjenester</button>
          <button onClick={() => scrollTo("method")}>Metode</button>
          <a href="/blog/">Innsikt</a>
          <button className="ai-nav-cta" onClick={() => scrollTo("contact")}>Start en samtale <ArrowUpRight size={15}/></button>
        </nav>
        <button className="ai-mobile-trigger" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Lukk meny" : "Åpne meny"} aria-expanded={menuOpen}>
          {menuOpen ? <X size={22}/> : <Menu size={22}/>}
        </button>
      </header>

      {menuOpen && (
        <div className="ai-mobile-menu">
          <button onClick={() => scrollTo("services")}>Tjenester</button>
          <button onClick={() => scrollTo("method")}>Metode</button>
          <a href="/blog/" onClick={() => setMenuOpen(false)}>Innsikt</a>
          <button onClick={() => scrollTo("contact")}>Start en samtale ↗</button>
        </div>
      )}

      <main id="top">
        <section className="ai-hero">
          <div className="ai-eyebrow">TRUSTED AI ADVISOR / ETABLERT 2026</div>
          <div className="ai-hero-layout">
            <div>
              <h1>AI SOM<br/><em>FAKTISK</em><br/>SKAPER VERDI.</h1>
              <p className="ai-lead">Vi hjelper bedrifter med å finne riktige AI-muligheter, bygge løsningene og gjøre dem nyttige i hverdagen.</p>
              <div className="ai-actions">
                <button className="ai-primary" onClick={() => scrollTo("contact")}>Finn din AI-mulighet <ArrowUpRight size={18}/></button>
                <button className="ai-secondary" onClick={() => scrollTo("services")}>Se hva vi gjør <ArrowDownIcon /></button>
              </div>
            </div>
            <div className="ai-orbit-card" aria-hidden="true">
              <div className="ai-orbit orbit-a" />
              <div className="ai-orbit orbit-b" />
              <div className="ai-orbit orbit-c" />
              <div className="ai-orbit-core"><Sparkles size={28}/></div>
              <span className="orbit-label label-top">VERDI</span>
              <span className="orbit-label label-right">AUTOMATISERING</span>
              <span className="orbit-label label-bottom">MÅLING</span>
              <span className="orbit-label label-left">AI</span>
            </div>
          </div>
          <div className="ai-hero-meta">
            <span>AI RÅDGIVNING</span><span>AI AGENTER</span><span>AUTOMATISERING</span><span>OSLO / NORGE</span>
          </div>
        </section>

        <section className="ai-section ai-statement">
          <div className="ai-section-label">PRINSIPPET</div>
          <div>
            <h2>Ikke mer AI for AI sin skyld.</h2>
            <p>Vi starter med virksomheten, ikke teknologien. Først finner vi problemet. Så regner vi på verdien. Deretter bygger vi det som faktisk er verdt å bygge.</p>
          </div>
        </section>

        <section className="ai-section" id="services">
          <div className="ai-section-head">
            <div>
              <div className="ai-section-label">TJENESTER</div>
              <h2>Fra idé til<br/><em>implementering.</em></h2>
            </div>
            <p>Tre tjenester som dekker hele reisen fra å finne en god AI-mulighet til å få den inn i driften.</p>
          </div>
          <div className="ai-services">
            {services.map(({ icon: Icon, name, label, text, points }) => (
              <article className="ai-service" key={name}>
                <div className="ai-service-top"><Icon size={24}/><span>{label}</span></div>
                <h3>{name}</h3>
                <p>{text}</p>
                <div className="ai-points">
                  {points.map((point) => <div key={point}><CircleCheck size={16}/><span>{point}</span></div>)}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="ai-method" id="method">
          <div className="ai-section-label">VÅR METODE</div>
          <div className="ai-method-layout">
            <div>
              <h2>FIND.<br/><em>CALCULATE.</em><br/>FIX.<br/>MEASURE.</h2>
              <p>En enkel modell for å sørge for at AI-prosjekter starter med et reelt problem og ender med en målbar forbedring.</p>
            </div>
            <div className="ai-step-list">
              {steps.map(([title, text], index) => (
                <button key={title} className={activeStep === index ? "active" : ""} onMouseEnter={() => setActiveStep(index)} onFocus={() => setActiveStep(index)} onClick={() => setActiveStep(index)}>
                  <span>{title}</span>
                  <p>{text}</p>
                  <ChevronDown size={18}/>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="ai-proof">
          <div>
            <div className="ai-section-label">HVA DET KAN BETY</div>
            <h2>Bygg mindre.<br/><em>Oppnå mer.</em></h2>
          </div>
          <div className="ai-proof-items">
            <div><strong>Mindre manuelt arbeid</strong><span>Automatiser gjentakende oppgaver som stjeler tid.</span></div>
            <div><strong>Raskere arbeidsflyter</strong><span>Koble sammen systemer og få informasjon dit den trengs.</span></div>
            <div><strong>Bedre beslutninger</strong><span>Gjør store mengder informasjon lettere å bruke i praksis.</span></div>
          </div>
        </section>

        <section className="ai-future">
          <div className="ai-section-label">NESTE</div>
          <div>
            <ShieldCheck size={22}/>
            <h2>Managed AI<br/><em>Cybersecurity.</em></h2>
            <p>En fremtidig tjeneste for virksomheter som trenger mer struktur rundt sikker AI-bruk, risiko og løpende kontroll.</p>
            <span className="ai-future-note">KOMMER SENERE / SIKKERHET FØRST</span>
          </div>
        </section>

        <section className="ai-contact" id="contact">
          <div>
            <div className="ai-section-label">START HER</div>
            <h2>Har dere en prosess som burde vært <em>enklere?</em></h2>
            <p>Fortell oss hva som tar tid, skaper friksjon eller kunne vært gjort bedre. Vi starter med å forstå problemet.</p>
            <a href="mailto:jelassi@smartsvar.no">jelassi@smartsvar.no <ArrowUpRight size={17}/></a>
          </div>
          <form onSubmit={submitBrief}>
            <label>Navn<input required name="name" placeholder="Ditt navn" /></label>
            <label>Bedrift<input required name="company" placeholder="Bedriftsnavn" /></label>
            <label>Hva ønsker dere å forbedre?<input required name="challenge" placeholder="For eksempel salg, drift eller kundeservice" /></label>
            <label>Beskriv kort<textarea required name="message" rows="5" placeholder="Hva skjer i dag, og hva ønsker dere skal bli enklere?" /></label>
            <button type="submit">{sent ? "E-POSTUTKAST KLART" : "SEND FORESPØRSEL"} <ArrowUpRight size={19}/></button>
            {sent && <small>Utkastet er åpnet i e-postprogrammet ditt.</small>}
          </form>
        </section>
      </main>

      <footer className="ai-footer">
        <span>SMARTSVAR®</span>
        <a href="/blog/">Innsikt ↗</a>
        <span>OSLO / NORGE</span>
        <span>© 2026 SMARTSVAR</span>
      </footer>
    </div>
  );
}

function ArrowDownIcon() {
  return <span className="arrow-down-icon">↓</span>;
}

createRoot(document.getElementById("root")).render(<App />);