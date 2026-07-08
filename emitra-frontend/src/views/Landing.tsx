import { useEffect, useRef, useState } from 'react';
import '../styles/landing.css';
import { stats, testimonials, partners, features, howItWorks, faqItems } from '../data/landing';

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
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  useFadeObserver();
  useScrollTopbar();

  return (
    <div className="landing">
      <div className="grain" />

      {/* ───────── ATLAS-inspired floating glass pill navbar ───────── */}
      <header className="topbar">
        <div className="topbar__inner">
          <a href="#top" className="brand">
            <span className="brand__mark" />
            <span className="brand-name">E<span>mi</span>tra</span>
          </a>
          <nav className="nav">
            <a href="#problem">Masalah</a>
            <a href="#how">Cara Kerja</a>
            <a href="#features">Fitur</a>
            <a href="#pricing">Harga</a>
            <a href="#faq">FAQ</a>
            <a href="/dashboard" className="nav-cta">Dashboard →</a>
          </nav>
        </div>
      </header>

      {/* ───────── Hero ───────── */}
      <section className="hero" id="top" ref={heroRef}>
        <div className="hero__media">
          <div className="hero__img-wrap">
            <img
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=2400&q=80"
              alt="Industrial facility — steel and heavy machinery"
              loading="eager"
            />
          </div>
          <div className="hero__veil" />
          <div className="hero__beam" />
        </div>

        <div className="hero__content">
          <div className="hero__label fade-up">
            AI-Powered Carbon Compliance<span></span>Untuk Eksportir RI
          </div>
          <h1 className="hero__title fade-up delay-1">
            Ekspor ke Eropa<br />Tetap Jalan
          </h1>
          <p className="hero__sub fade-up delay-2">
            Tanpa ribet CBAM
          </p>
          <p className="hero__tag fade-up delay-2">
            Dari dokumen ke XML EU Registry dalam hitungan jam —{' '}
            <em>bukan minggu.</em> AI compliance yang{' '}
            <em>bekerja untuk Anda, bukan sebaliknya.</em>
          </p>
          <div className="hero__actions fade-up delay-3">
            <a href="#final" className="btn-primary">
              <span>Coba Gratis 30 Hari</span>
              <span className="arrow">→</span>
            </a>
            <a href="#how" className="btn-secondary">
              <span>Lihat Cara Kerja</span>
            </a>
          </div>
        </div>

        <div className="hero__scroll fade-up delay-4">
          <span>scroll</span>
          <div className="hero__scrollline" />
        </div>
      </section>

      {/* ───────── Problem / Pain ───────── */}
      <section className="pain" id="problem">
        <SectionHeader
          label="01 · Masalah"
          title="Kenapa ini <em>urgent</em> sekarang?"
          lead="EU CBAM (Carbon Border Adjustment Mechanism) mulai berlaku penuh. Eksportir RI yang tidak patuh siap-siap kehilangan akses pasar Eropa."
        />
        <div className="pain__grid">
          <div className="pain-card fade-up">
            <div className="pain-card__num">— 01</div>
            <div className="pain-card__icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#F5A623" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 9v4m0 4h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
            </div>
            <h3 className="pain-card__title">Default Value = Kalah Saing</h3>
            <p className="pain-card__desc">
              Kalau tidak punya data emisi riil, EU menggunakan <em>default value</em> — yang
              20-40% lebih tinggi dari emisi aktual. Artinya: <strong>bayar pajak karbon lebih mahal</strong> dari yang seharusnya.
            </p>
          </div>
          <div className="pain-card fade-up delay-1">
            <div className="pain-card__num">— 02</div>
            <div className="pain-card__icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#E53E3E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2v20M2 12h20" />
              </svg>
            </div>
            <h3 className="pain-card__title">14% Tambahan Biaya untuk Data Manual</h3>
            <p className="pain-card__desc">
              Perusahaan menghabiskan 12-14% dari revenue ekspor untuk konsultan lingkungan
              dan tenaga kerja manual — meng-entry ulang data dari invoice, PLN, dan log
              produksi ke spreadsheet Excel.
            </p>
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
            <h3 className="pain-card__title">Februari 2027 — Deadline Fix</h3>
            <p className="pain-card__desc">
              Sertifikat CBAM wajib mulai Februari 2027. Tanpa sistem terintegrasi sekarang,
              perusahaan akan <strong>kejar-kejaran dengan waktu</strong> — dan berisiko
              kehilangan akses ke 67% mitra dagang Eropa.
            </p>
          </div>
        </div>
      </section>

      {/* ───────── Solution ───────── */}
      <section className="solution" id="solution">
        <div className="solution__inner">
          <div className="solution__text">
            <SectionHeader
              label="02 · Solusi"
              title="e-Faktur-nya <em>kepatuhan karbon</em>"
              lead="Ingat e-Faktur PPN yang dulu ribet, sekarang jadi satu klik? Konsep yang sama — tapi untuk pelaporan emisi CBAM."
            />
            <p className="section-lead fade-up delay-3" style={{ textAlign: 'left', marginLeft: 0 }}>
              Emitra adalah <em>AI-powered compliance platform</em> yang mengubah dokumen
              operasional sehari-hari (tagihan listrik, invoice BBM, log produksi) menjadi
              laporan emisi siap EU Registry.
            </p>
          </div>
          <div className="solution__visual fade-up delay-2">
            <div className="solution__flow">
              <div className="solution__step">
                <span className="solution__step-num">01</span>
                <span className="solution__step-text">
                  <strong>Upload dokumen</strong> — PDF, scan, foto. No format khusus.
                </span>
              </div>
              <div className="solution__step" style={{ borderColor: 'rgba(10, 135, 84, 0.2)' }}>
                <span className="solution__step-num">02</span>
                <span className="solution__step-text">
                  <strong>AI LayoutLM</strong> mengekstrak data emisi secara otomatis.
                </span>
              </div>
              <div className="solution__step">
                <span className="solution__step-num">03</span>
                <span className="solution__step-text">
                  <strong>Validasi HITL</strong> — konfirmasi 3 detik jika confidence &lt; 90%.
                </span>
              </div>
              <div className="solution__step" style={{ borderColor: 'rgba(10, 135, 84, 0.2)' }}>
                <span className="solution__step-num">04</span>
                <span className="solution__step-text">
                  <strong>XML siap EU Registry</strong> — satu klik, siap submit.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── How It Works ───────── */}
      <section className="how" id="how">
        <SectionHeader
          label="03 · Cara Kerja"
          title="5 langkah — <em>dari dokumen ke kepatuhan</em>"
          lead="Tanpa training. Tanpa IT support. Cukup upload dokumen seperti biasa — Emitra yang mengerjakan sisanya."
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
      </section>

      {/* ───────── Features ───────── */}
      <section className="features" id="features">
        <SectionHeader
          label="04 · Fitur"
          title="Enam fitur — <em>satu platform</em>"
          lead="Bukan black-box AI. Setiap langkah auditable, setiap angka bisa ditelusuri ke dokumen sumber."
        />
        <div className="features__grid">
          {features.map((f, i) => (
            <div className={`feature fade-up ${i > 0 ? `delay-${Math.min(i, 5)}` : ''}`} key={f.num}>
              <div className="feature__num">— {f.num}</div>
              <h3 className="feature__title">{f.title}</h3>
              <p className="feature__desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ───────── Stats ───────── */}
      <section className="stats" id="stats">
        <div className="stats__grid">
          {stats.map((s, i) => (
            <div className={`stat-card fade-up ${i > 0 ? `delay-${i}` : ''}`} key={s.label}>
              <div className="stat-card__value">{s.value}</div>
              <div className="stat-card__label">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ───────── Testimonials ───────── */}
      <section className="testimonials" id="testimonials">
        <SectionHeader
          label="05 · Testimonial"
          title="Sudah dipakai oleh <em>industri</em>"
          lead="Ini bukan pitching ke startup — ini solusi untuk pabrik dengan 40 tahun sejarah operasi."
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
      </section>

      {/* ───────── Partners ───────── */}
      <section className="partners">
        <div className="partners__label fade-up">Didukung oleh</div>
        <div className="partners__list fade-up delay-1">
          {partners.map(p => (
            <div className="partners__item" key={p.name}>{p.name}</div>
          ))}
        </div>
      </section>

      {/* ───────── Pricing ───────── */}
      <section className="pricing" id="pricing">
        <SectionHeader
          label="06 · Harga"
          title="Investasi <em>sebanding risiko</em>"
          lead="Mulai dari 3% dari biaya konsultan manual. ROI terasa di bulan pertama."
        />
        <div className="pricing__grid">
          <div className="pricing-card fade-up">
            <div className="pricing-card__tier">Basic</div>
            <div className="pricing-card__price">
              IDR 30–50 Juta <span>/ year</span>
            </div>
            <p className="pricing-card__desc">Untuk pabrik kecil-menengah dengan &lt; 3 produk CBAM per kuartal.</p>
            <div className="pricing-card__divider" />
            <ul className="pricing-card__list">
              <li>Upload hingga 100 dokumen / bulan</li>
              <li>AI OCR — LayoutLM ekstraksi otomatis</li>
              <li>HITL validation — side-by-side preview</li>
              <li>Kalkulasi emisi Scope 1 & 2</li>
              <li>XML export EU Registry format</li>
              <li>Audit trail dasar (30 hari)</li>
              <li className="muted">Multi-pengguna (single user only)</li>
              <li className="muted">Dedicated support</li>
            </ul>
            <button className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Mulai Trial</button>
          </div>

          <div className="pricing-card featured fade-up delay-1">
            <div className="pricing-card__badge">Rekomendasi</div>
            <div className="pricing-card__tier">Pro</div>
            <div className="pricing-card__price">
              IDR 50–80 Juta <span>/ year</span>
            </div>
            <p className="pricing-card__desc">Untuk pabrik besar / korporasi dengan volume ekspor tinggi (3+ produk / kuartal).</p>
            <div className="pricing-card__divider" />
            <ul className="pricing-card__list">
              <li>Upload hingga 500+ dokumen / bulan</li>
              <li>AI OCR — LayoutLM ekstraksi otomatis</li>
              <li>HITL validation — side-by-side preview</li>
              <li>Kalkulasi emisi Scope 1 & 2</li>
              <li>XML export EU Registry format</li>
              <li>Audit trail penuh (1 tahun +)</li>
              <li>Multi-pengguna (unlimited)</li>
              <li>Dedicated support & onboarding</li>
              <li>Early access: Scope 3 (Year 3)</li>
            </ul>
            <button className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Mulai Trial</button>
          </div>
        </div>
      </section>

      {/* ───────── FAQ ───────── */}
      <section className="faq" id="faq">
        <SectionHeader
          label="07 · FAQ"
          title="Pertanyaan yang <em>sering diajukan</em>"
          lead="Jujur lebih baik dari sopan. Ini jawaban untuk hal-hal yang ingin Anda tanyakan tapi mungkin malu."
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
      </section>

      {/* ───────── Final CTA ───────── */}
      <section className="final-cta" id="final">
        <div className="final-cta__inner">
          <h2 className="final-cta__title fade-up">
            Siap <em>amankan ekspor</em> Anda?
          </h2>
          <p className="final-cta__desc fade-up delay-1">
            Coba gratis 30 hari — tanpa kartu kredit. Kami bantu onboarding dalam 3-5 hari kerja.
            Kalau tidak cocok, cancel. <em>Simple.</em>
          </p>
          <div className="final-cta__actions fade-up delay-2">
            <a href="#top" className="btn-primary" onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}>
              <span>Coba Gratis 30 Hari</span>
              <span className="arrow">→</span>
            </a>
            <a href="/dashboard" className="btn-secondary">
              Lihat Demo Dashboard →
            </a>
          </div>
          <p className="final-cta__note fade-up delay-3">
            Gratis 30 hari · 3-5 hari onboarding · Cancel kapan saja
          </p>
        </div>
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
              <p>AI-powered carbon compliance untuk eksportir Indonesia. Dari dokumen ke EU Registry dalam hitungan jam — karena kepatuhan karbon tidak boleh jadi hambatan ekspor.</p>
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
          <div className="footer__card-right">
            <div className="footer__col">
              <h4>Produk</h4>
              <ul>
                <li>Upload Dokumen</li>
                <li>AI OCR</li>
                <li>Validasi HITL</li>
                <li className="em">Kalkulasi Emisi</li>
              </ul>
            </div>
            <div className="footer__col">
              <h4>Perusahaan</h4>
              <ul>
                <li>Tentang Emitra</li>
                <li className="em">BMC #12 · PNB</li>
                <li>Grand Final 20 Agu 2026</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer__base">
          <span>© Emitra · BMC #12</span>
          <span>Dari dokumen ke EU Registry · Satu klik</span>
        </div>
      </footer>
    </div>
  );
}
