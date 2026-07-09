import { useEffect, useRef, useState } from 'react';
import '../styles/landing.css';
import HeroCanvas from '../components/HeroCanvas';
import { useEmitra } from '../context/EmitraContext';
import { stats, testimonials, partners, features, howItWorks, faqItems, team } from '../data/landing';

/* ───────── Video Ping-Pong Loop Hook ───────── */
function usePingPongVideo(ref: React.RefObject<HTMLVideoElement>) {
  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    let reverseInterval: any = null;
    let isReversing = false;

    const onEnded = () => {
      isReversing = true;
      video.pause();
      const fps = 30;
      const step = 1 / fps;
      
      reverseInterval = setInterval(() => {
        if (!video) return;
        video.currentTime -= step * 1.5;
        if (video.currentTime <= 0.05) {
          video.currentTime = 0;
          clearInterval(reverseInterval);
          isReversing = false;
          video.play().catch(() => {});
        }
      }, 1000 / fps);
    };

    const onPlay = () => {
      if (isReversing) {
        isReversing = false;
        clearInterval(reverseInterval);
      }
    };

    video.addEventListener('ended', onEnded);
    video.addEventListener('play', onPlay);
    return () => {
      video.removeEventListener('ended', onEnded);
      video.removeEventListener('play', onPlay);
      clearInterval(reverseInterval);
    };
  }, [ref]);
}

/* ───────── Fade-up observer ───────── */
function useFadeObserver() {
  useEffect(() => {
    const el = document.querySelectorAll('.landing .fade-up');
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('is-in');
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    el.forEach(el => obs.observe(el));
    document.querySelectorAll('.landing .hero .fade-up').forEach(el => {
      setTimeout(() => el.classList.add('is-in'), 100);
    });
    return () => obs.disconnect();
  }, []);
}

/* ───────── Scroll-triggered parallax ───────── */
function useParallax() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>('[data-parallax]'));
    if (!els.length) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const vh = window.innerHeight;
      els.forEach((el) => {
        const speed = parseFloat(el.dataset.parallax || '0.1');
        const rect = el.getBoundingClientRect();
        const center = rect.top + rect.height / 2;
        const offset = (center - vh / 2) * -speed;
        el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
      });
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    update();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);
}

/* ───────── Navbar scroll effect: hide-on-down / show-on-up ───────── */
function useScrollTopbar() {
  useEffect(() => {
    const topbar = document.querySelector('.landing .topbar');
    if (!topbar) return;
    let lastScroll = window.scrollY;
    const handler = () => {
      const current = window.scrollY;
      if (current > 80) {
        topbar.classList.toggle('hidden', current > lastScroll);
        topbar.classList.add('scrolled');
      } else {
        topbar.classList.remove('hidden', 'scrolled');
      }
      lastScroll = current;
    };
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);
}

/* ───────── Section Header ───────── */
function SectionHeader({ label, title, lead }: { label: string; title: string; lead?: string }) {
  return (
    <header className="section-head">
      <span className="section-label fade-up">{label}</span>
      <h2 className="section-title fade-up delay-1" dangerouslySetInnerHTML={{ __html: title }} />
      {lead && <p className="section-lead fade-up delay-2">{lead}</p>}
    </header>
  );
}

/* ───────── FAQ Row ───────── */
function FaqRow({ q, a, isOpen, onClick }: { q: string; a: string; isOpen: boolean; onClick: () => void }) {
  return (
    <div className={`faq-row${isOpen ? ' is-open' : ''}`}>
      <div className="faq-row__main" onClick={onClick}>
        <div className="faq-q">{q}</div>
        <div className="faq-toggle">+</div>
      </div>
      <div className="faq-row__answer">
        <div className="faq-a">{a}</div>
      </div>
    </div>
  );
}

/* ───────── Landing Page ───────── */
export function Landing() {
  const { tourStep, setTourStep } = useEmitra();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const howVideoRef = useRef<HTMLVideoElement>(null);

  useFadeObserver();
  useScrollTopbar();
  useParallax();
  
  usePingPongVideo(heroVideoRef);
  usePingPongVideo(howVideoRef);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="landing">
      <div className="grain" />
      <HeroCanvas />

      {/* ───────── ATLAS-inspired floating glass pill navbar ───────── */}
      <header className="topbar">
        <div className="topbar__inner">
          <a href="#top" className="brand" onClick={(e) => handleNavClick(e, 'top')}>
            <img src="/logo.svg" alt="Emitra" className="brand__logo" />
          </a>
          <nav className="nav">
            <a href="#problem" onClick={(e) => handleNavClick(e, 'problem')}>Problem</a>
            <a href="#how" onClick={(e) => handleNavClick(e, 'how')}>How It Works</a>
            <a href="#features" onClick={(e) => handleNavClick(e, 'features')}>Features</a>
            <a href="#pricing" onClick={(e) => handleNavClick(e, 'pricing')}>Pricing</a>
            <a href="#faq" onClick={(e) => handleNavClick(e, 'faq')}>FAQ</a>
            <a 
              href="/dashboard" 
              className={`nav-cta ${tourStep === 0 ? 'tour-pulse' : ''}`}
              onClick={() => {
                if (tourStep === 0) setTourStep(1);
              }}
            >
              Dashboard →
            </a>
          </nav>
        </div>
      </header>

      {/* ───────── Hero ───────── */}
      <section className="hero" id="top" ref={heroRef}>
        <video
          ref={heroVideoRef}
          className="hero__video"
          autoPlay
          muted
          playsInline
          preload="auto"
          poster="/assets/factory.webp"
        >
          <source src="/assets/hero-bg.mp4" type="video/mp4" />
        </video>
        <div className="hero__orb hero__orb--emerald" data-parallax="0.12" />
        <div className="hero__orb hero__orb--navy" data-parallax="-0.08" />
        <div className="hero__orb hero__orb--amber" data-parallax="0.18" />
        <div className="hero__veil" />

        <div className="hero__sticky">
          <div className="hero__content">
            <div className="hero__label fade-up">
              AI-Powered Carbon Compliance<span></span>For Indonesian Exporters
            </div>
            <h1 className="hero__title fade-up delay-1">
              Keep Exporting<br />To Europe
            </h1>
            <p className="hero__sub fade-up delay-2">
              Without CBAM Hassles
            </p>
            <p className="hero__tag fade-up delay-2">
              From operational documents to XML EU Registry in hours —{' '}
              <em>not weeks.</em> AI compliance that{' '}
              <em>works for you, not the other way around.</em>
            </p>
            <div className="hero__actions fade-up delay-3">
              <a href="#final" className="btn-primary" onClick={(e) => handleNavClick(e, 'final')}>
                <span>Start 3-Month Free Pilot</span>
                <span className="arrow">→</span>
              </a>
              <a href="#how" className="btn-secondary" onClick={(e) => handleNavClick(e, 'how')}>
                <span>See How It Works</span>
              </a>
            </div>
          </div>

          <div className="hero__scroll fade-up delay-4">
            <span>scroll</span>
            <div className="hero__scrollline" />
          </div>
        </div>
        <div className="section-fade-bottom" />
      </section>

      {/* ───────── Problem / Pain ───────── */}
      <section className="pain" id="problem">
        <div className="section-fade-top" />
        <SectionHeader
          label="01 · The Problem"
          title="Why is this <em>urgent</em> now?"
          lead="EU CBAM (Carbon Border Adjustment Mechanism) is now in full effect. Non-compliant exporters face losing access to the European market."
        />
        <div className="pain__grid">
          <div className="pain-card fade-up">
            <div className="pain-card__num">— 01</div>
            <div className="pain-card__icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#F5A623" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 9v4m0 4h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
            </div>
            <h3 className="pain-card__title">Default Value = Higher Costs</h3>
            <p className="pain-card__desc">
              Without actual emissions data, the EU applies default values—which are 
              20-40% higher than your actual emissions. This means paying significantly higher carbon taxes.
            </p>
            <div className="pain-card__chart">
              <svg width="100%" height="80" viewBox="0 0 200 80" fill="none">
                <rect x="10" y="30" width="70" height="40" rx="4" fill="url(#orange-grad)" />
                <text x="45" y="23" fill="#F5A623" fontSize="9" fontWeight="bold" textAnchor="middle">Default (1.4x)</text>
                <rect x="110" y="50" width="70" height="20" rx="4" fill="url(#green-grad)" />
                <text x="145" y="43" fill="#0A8754" fontSize="9" fontWeight="bold" textAnchor="middle">Actual (1.0x)</text>
                <path d="M80 35 L110 55" stroke="#E53E3E" strokeWidth="1.5" strokeDasharray="3 3" />
                <defs>
                  <linearGradient id="orange-grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#F5A623" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#F5A623" stopOpacity="0.2" />
                  </linearGradient>
                  <linearGradient id="green-grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0A8754" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#0A8754" stopOpacity="0.2" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
          <div className="pain-card fade-up delay-1">
            <div className="pain-card__num">— 02</div>
            <div className="pain-card__icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#E53E3E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2v20M2 12h20" />
              </svg>
            </div>
            <h3 className="pain-card__title">14% Extra Cost for Manual Entry</h3>
            <p className="pain-card__desc">
              Companies spend 12-14% of their export revenue on environmental consultants 
              and manual data entry, manually copying data from invoices, utility bills, and logs into spreadsheets.
            </p>
            <div className="pain-card__chart">
              <svg width="100%" height="80" viewBox="0 0 200 80" fill="none">
                <circle cx="100" cy="40" r="28" stroke="rgba(255,255,255,0.06)" strokeWidth="6" />
                <circle cx="100" cy="40" r="28" stroke="#E53E3E" strokeWidth="6" strokeDasharray="175" strokeDashoffset="150" strokeLinecap="round" transform="rotate(-90 100 40)" />
                <text x="100" y="44" fill="#E53E3E" fontSize="13" fontWeight="bold" textAnchor="middle">14%</text>
                <text x="100" y="58" fill="#a1a1aa" fontSize="7" textAnchor="middle">Revenue Loss</text>
              </svg>
            </div>
          </div>
          <div className="pain-card fade-up delay-2">
            <div className="pain-card__num">— 03</div>
            <div className="pain-card__icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#E53E3E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
            </div>
            <h3 className="pain-card__title">February 2027 — Hard Deadline</h3>
            <p className="pain-card__desc">
              CBAM certificates will be mandatory starting February 2027. Without an integrated 
              system, companies will face a race against time—risking access to 67% of their European partners.
            </p>
            <div className="pain-card__chart">
              <svg width="100%" height="80" viewBox="0 0 200 80" fill="none">
                <rect x="60" y="15" width="80" height="50" rx="8" fill="#141416" stroke="rgba(229, 62, 62, 0.4)" strokeWidth="1.5" />
                <rect x="60" y="15" width="80" height="15" rx="8" fill="#E53E3E" />
                <text x="100" y="26" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">DEADLINE</text>
                <text x="100" y="46" fill="#ffffff" fontSize="13" fontWeight="bold" textAnchor="middle">FEB 2027</text>
                <path d="M25 45 L35 30 L45 45 Z" fill="#F5A623" />
                <text x="35" y="43" fill="#000" fontSize="8" fontWeight="bold" textAnchor="middle">!</text>
                <path d="M155 45 L165 30 L175 45 Z" fill="#F5A623" />
                <text x="165" y="43" fill="#000" fontSize="8" fontWeight="bold" textAnchor="middle">!</text>
              </svg>
            </div>
          </div>
        </div>
        <div className="section-fade-bottom" />
      </section>

      {/* ───────── Solution ───────── */}
      <section className="solution section-bg" id="solution" style={{ backgroundImage: 'url(/assets/mood-green.webp)' }}>
        <div className="section-fade-top" />
        <div className="solution__inner">
          <div className="solution__text">
            <SectionHeader
              label="02 · The Solution"
              title="The e-Invoice of <em>carbon compliance</em>"
              lead="Remember how complex VAT invoicing used to be before it became a single click? The same concept applies here—but for CBAM emissions reporting."
            />
            <p className="section-lead fade-up delay-3" style={{ textAlign: 'left', marginLeft: 0 }}>
              Emitra is an <em>AI-powered compliance platform</em> that converts your everyday 
              operational documents (electricity bills, fuel invoices, production logs) into 
              EU Registry-ready emissions reports.
            </p>
          </div>
          <div className="solution__visual fade-up delay-2">
            <div className="solution__flow">
              <div className="solution__step">
                <span className="solution__step-num">01</span>
                <span className="solution__step-text">
                  <strong>Upload documents</strong> — PDF, scan, photo. No special format required.
                </span>
              </div>
              <div className="solution__step" style={{ borderColor: 'rgba(10, 135, 84, 0.2)' }}>
                <span className="solution__step-num">02</span>
                <span className="solution__step-text">
                  <strong>AI LayoutLM</strong> extracts carbon emission data automatically.
                </span>
              </div>
              <div className="solution__step">
                <span className="solution__step-num">03</span>
                <span className="solution__step-text">
                  <strong>HITL Validation</strong> — 3-second review if confidence is &lt; 90%.
                </span>
              </div>
              <div className="solution__step" style={{ borderColor: 'rgba(10, 135, 84, 0.2)' }}>
                <span className="solution__step-num">04</span>
                <span className="solution__step-text">
                  <strong>XML for EU Registry</strong> — one click, ready to submit.
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="section-fade-bottom" />
      </section>

      {/* ───────── How It Works ───────── */}
      <section className="how" id="how">
        <div className="section-fade-top" />
        <video 
          ref={howVideoRef} 
          className="section-video" 
          autoPlay 
          muted 
          playsInline 
          preload="metadata" 
          poster="/assets/icon-ai.webp"
          style={{ opacity: 0.22 }}
        >
          <source src="/assets/data-flow.mp4" type="video/mp4" />
        </video>
        <div style={{ position: 'relative', zIndex: 2 }}>
          <SectionHeader
            label="03 · How It Works"
            title="5 steps — <em>from document to compliance</em>"
            lead="No training. No IT support needed. Just upload your documents as usual — Emitra handles the rest."
          />
          <div className="how__grid">
            {howItWorks.map((item, i) => (
              <div className={`how__card fade-up ${i > 0 ? `delay-${i}` : ''}`} key={i}>
                <div className="how__step">{item.step}</div>
                <h3 className="how__title">{item.title}</h3>
                <p className="how__desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="section-fade-bottom" />
      </section>

      {/* ───────── Features ───────── */}
      <section className="features" id="features">
        <div className="section-fade-top" />
        <SectionHeader
          label="04 · Features"
          title="Six Features — <em>One Platform</em>"
          lead="Not a black-box AI. Every step is auditable, and every figure can be traced back to its source document."
        />
        <div className="features__grid">
          {features.map((f, i) => (
            <div className={`feature fade-up ${i > 0 ? `delay-${Math.min(i, 5)}` : ''}`} key={f.num}>
              <div className="feature__head">
                <img className="feature__icon" src={f.img} alt={f.title} loading="lazy" />
                <div className="feature__num">— {f.num}</div>
              </div>
              <h3 className="feature__title">{f.title}</h3>
              <p className="feature__desc">{f.desc}</p>
            </div>
          ))}
        </div>
        <div className="section-fade-bottom" />
      </section>

      {/* ───────── Stats ───────── */}
      <section className="stats" id="stats">
        <div className="section-fade-top" />
        <div className="stats__grid">
          {stats.map((s, i) => (
            <div className={`stat-card fade-up ${i > 0 ? `delay-${i}` : ''}`} key={s.label}>
              <div className="stat-card__value">{s.value}</div>
              <div className="stat-card__label">{s.label}</div>
            </div>
          ))}
        </div>
        <div className="section-fade-bottom" />
      </section>

      {/* ───────── Testimonials ───────── */}
      <section className="testimonials section-bg" id="testimonials" style={{ backgroundImage: 'url(/assets/testimonial.webp)' }}>
        <div className="section-fade-top" />
        <SectionHeader
          label="05 · Testimonials"
          title="Trusted by <em>Leading Industries</em>"
          lead="This is not a pitch for startups — it is a proven solution for factories with decades of operational history."
        />
        <div className="testimonials__grid">
          {testimonials.map((t, i) => (
            <div className={`testimonial fade-up ${i > 0 ? `delay-${i}` : ''}`} key={t.name}>
              <div className="testimonial__avatar">{t.avatar}</div>
              <div className="testimonial__quote">{t.quote}</div>
              <div className="testimonial__name">{t.name}</div>
              <div className="testimonial__role">{t.role} · {t.company}</div>
              <div className="testimonial__result">{t.result}</div>
            </div>
          ))}
        </div>
        <div className="section-fade-bottom" />
      </section>

      {/* ───────── Team ───────── */}
      <section className="team section-bg" id="team" style={{ backgroundImage: 'url(/assets/team.webp)' }}>
        <div className="section-fade-top" />
        <SectionHeader
          label="06 · The Team"
          title="Built by <em>Industry Innovators</em>"
        />
        <div className="team__grid">
          {team.map((m, i) => (
            <div className={`team__card fade-up ${i > 0 ? `delay-${Math.min(i, 3)}` : ''}`} key={m.name}>
              <div className="team__avatar">{m.avatar}</div>
              <div className="team__name">{m.name}</div>
              <div className="team__role">{m.role}</div>
            </div>
          ))}
        </div>
        <div className="section-fade-bottom" />
      </section>

      {/* ───────── Partners (Supported By) ───────── */}
      <section className="partners">
        <div className="section-fade-top" />
        <div className="partners__label fade-up">Supported By</div>
        <div className="partners__list fade-up delay-1">
          {partners.map(p => (
            <div className="partners__card" key={p.name}>
              <div className="partners__status">
                <span className="partners__dot"></span>
                Verified Connection
              </div>
              <div className="partners__name">{p.name}</div>
              <div className="partners__desc">{p.label}</div>
            </div>
          ))}
        </div>
        <div className="section-fade-bottom" />
      </section>

      {/* ───────── Pricing ───────── */}
      <section className="pricing" id="pricing">
        <div className="section-fade-top" />
        <SectionHeader
          label="07 · Pricing"
          title="Investment <em>Matching Your Risk</em>"
          lead="40–70% cost savings compared to manual environmental audits. ROI realized in the first month."
        />
        <div className="pricing__grid">
          <div className="pricing-card fade-up">
            <div className="pricing-card__tier">Basic</div>
            <div className="pricing-card__price">
              Setup IDR 60M<span> + Subscription IDR 100M / year</span>
            </div>
            <p className="pricing-card__desc">For small-to-medium factories with &lt; 3 CBAM products per quarter.</p>
            <div className="pricing-card__divider" />
            <ul className="pricing-card__list">
              <li>Upload up to 100 documents / month</li>
              <li>AI OCR — LayoutLM automated extraction</li>
              <li>HITL validation — side-by-side preview</li>
              <li>Scope 1 & 2 emissions calculation</li>
              <li>XML export in EU Registry format</li>
              <li>Basic audit trail (30 days)</li>
              <li className="muted">Multi-user (single user only)</li>
              <li className="muted">Dedicated support</li>
            </ul>
            <button className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Start Pilot</button>
          </div>

          <div className="pricing-card featured fade-up delay-1">
            <div className="pricing-card__badge">Recommended</div>
            <div className="pricing-card__tier">Pro</div>
            <div className="pricing-card__price">
              Setup IDR 100M<span> + Subscription IDR 160M / year</span>
            </div>
            <p className="pricing-card__desc">For large factories / corporations with high export volumes (3+ products / quarter).</p>
            <div className="pricing-card__divider" />
            <ul className="pricing-card__list">
              <li>Upload up to 500+ documents / month</li>
              <li>AI OCR — LayoutLM automated extraction</li>
              <li>HITL validation — side-by-side preview</li>
              <li>Scope 1 & 2 emissions calculation</li>
              <li>XML export in EU Registry format</li>
              <li>Full audit trail (1 year +)</li>
              <li>Multi-user (unlimited users)</li>
              <li>Dedicated support & onboarding</li>
              <li>Early access: Scope 3 emissions</li>
            </ul>
            <button className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Start Pilot</button>
          </div>
        </div>
        <div className="section-fade-bottom" />
      </section>

      {/* ───────── FAQ ───────── */}
      <section className="faq section-bg" id="faq" style={{ backgroundImage: 'url(/assets/factory.webp)' }}>
        <div className="section-fade-top" />
        <div style={{ position: 'relative', zIndex: 2 }}>
          <SectionHeader
            label="08 · FAQ"
            title="Frequently Asked <em>Questions</em>"
            lead="Honesty is better than politeness. Here are the answers to the questions you want to ask but might hesitate to."
          />
          <div className="faq__list fade-up">
            {faqItems.map((item, i) => (
              <FaqRow
                key={i}
                q={item.q}
                a={item.a}
                isOpen={openFaq === i}
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              />
            ))}
          </div>
        </div>
        <div className="section-fade-bottom" />
      </section>

      {/* ───────── Final CTA ───────── */}
      <section className="final-cta" id="final">
        <div className="section-fade-top" />
        <div className="final-cta__inner">
          <h2 className="final-cta__title fade-up">
            Ready to <em>secure your exports</em>?
          </h2>
          <p className="final-cta__desc fade-up delay-1">
            Try free for 30 days — no credit card required. We will onboard you within 3-5 business days.
            If it is not a fit, cancel anytime. <em>Simple.</em>
          </p>
          <div className="final-cta__actions fade-up delay-2">
            <a href="#top" className="btn-primary" onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}>
              <span>Start 3-Month Free Pilot</span>
              <span className="arrow">→</span>
            </a>
            <a href="/dashboard" className="btn-secondary">
              View Demo Dashboard →
            </a>
          </div>
          <p className="final-cta__note fade-up delay-3">
            3-Month Free Pilot · 3-5 Day Onboarding · Cancel Anytime
          </p>
        </div>
        <div className="section-fade-bottom" />
      </section>

      {/* ───────── KRESNA-inspired bento footer ───────── */}
      <footer>
        <div className="footer__watermark" aria-hidden="true">
          <svg preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 200">
            <text x="600" y="160" text-anchor="middle" font-size="280" font-weight="700">Emitra</text>
          </svg>
        </div>

        <div className="footer__bento">
          <div className="footer__card-left">
            <div>
              <div className="footer-name">E<span>mi</span>tra</div>
              <p>AI-powered carbon compliance for Indonesian exporters. From documents to the EU Registry in hours — because carbon compliance should never be an obstacle to exporting.</p>
            </div>
            <div className="footer__social">
              <a href="#" className="footer__social-icon" title="Instagram" aria-label="Instagram">
                <svg viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href="#" className="footer__social-icon" title="LinkedIn" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
              <a href="#" className="footer__social-icon" title="X" aria-label="X">
                <svg viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
            </div>

          </div>
        </div>
        <div className="footer__base">
          <span>© Emitra</span>
          <span>From document to EU Registry · One click</span>
        </div>
      </footer>

      {tourStep === 0 && (
        <div style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 10000,
          padding: '16px',
          background: 'linear-gradient(135deg, rgba(13, 21, 39, 0.95), rgba(8, 13, 26, 0.95))',
          border: '1px solid rgba(16, 185, 129, 0.3)',
          borderRadius: '16px',
          boxShadow: '0 8px 32px rgba(10, 135, 84, 0.25)',
          backdropFilter: 'blur(20px)',
          maxWidth: '300px',
          fontFamily: 'system-ui, sans-serif'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10b981', display: 'inline-block', boxShadow: '0 0 8px #10b981' }} className="animate-pulse" />
            <span style={{ fontSize: '9px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.15em', color: '#10b981' }}>Simulation Tour</span>
          </div>
          <h4 style={{ margin: 0, fontSize: '13px', fontWeight: 'bold', color: '#ffffff' }}>Start CBAM Compliance!</h4>
          <p style={{ margin: '4px 0 0 0', fontSize: '11px', color: '#a1a1aa', lineHeight: '1.4' }}>
            Click the flashing green <strong>"Dashboard →"</strong> link in the top header to begin the step-by-step walkthrough.
          </p>
        </div>
      )}
    </div>
  );
}
