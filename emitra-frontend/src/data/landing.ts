export const stats = [
  { value: '3,200', label: 'Indonesian Manufacturers Exposed to CBAM' },
  { value: 'USD 757.7M', label: 'Threatened Export Value' },
  { value: '47-80%', label: 'Saved vs a Manual Consultant Audit' },
  { value: 'Feb 2027', label: 'EU Certificate Deadline' },
];

export const testimonials = [
  {
    name: 'Scenario A - Steel, Cikarang', role: 'Modelled from sector data', company: 'Not a customer statement',
    quote: 'A Tier-2 steel plant replaces a three-week manual collection cycle with upload, AI extraction and human validation. The same documents it already produces - a different pipeline.',
    result: 'Design target: 3 weeks to under 48 hours', avatar: '01',
  },
  {
    name: 'Scenario B - Aluminium, Ceper', role: 'Modelled from our own pricing', company: 'Not a customer statement',
    quote: 'A foundry paying IDR 200 million a year for a manual consultant audit moves to Emitra Basic: IDR 80 million in year one, IDR 50 million from year two onward.',
    result: '60% saved in year one, 75% from year two', avatar: '02',
  },
  {
    name: 'Scenario C - Steel, Cilegon', role: 'Modelled from EU CBAM methodology', company: 'Not a customer statement',
    quote: 'An exporter asked by its German buyer for per-unit emission data files an EU-registry XML declaration in which every figure is traceable to its source document.',
    result: 'Audit trail on every single value', avatar: '03',
  },
];

export const partners = [
  { name: 'IISIA', label: 'Indonesian Iron & Steel Industry Association' },
  { name: 'KADIN', label: 'Indonesian Chamber of Commerce and Industry' },
  { name: 'ALFI', label: 'Indonesian Logistics and Forwarders Association' },
];

export const features = [
  {
    num: '01', title: 'One-Time Upload',
    desc: 'Upload invoices, utility bills, fuel logs, and production records—no special format required.',
    img: '/assets/icon-cert.webp',
  },
  {
    num: '02', title: 'Automated AI OCR',
    desc: 'Extract data from low-quality docs, faded thermal paper, or blurry scans into structured data in seconds.',
    img: '/assets/icon-ai.webp',
  },
  {
    num: '03', title: 'HITL Validation',
    desc: 'If AI confidence falls below 90%, the system shows a side-by-side layout for quick 3-second human correction.',
    img: '/assets/icon-cert.webp',
  },
  {
    num: '04', title: 'Deterministic Calculation',
    desc: 'Emissions calculations follow official EU CBAM methodologies. 100% auditable—no black-box AI.',
    img: '/assets/icon-carbon.webp',
  },
  {
    num: '05', title: 'Registry-Ready XML',
    desc: 'Generate XML reports in one click, fully compliant with CBAM schemas accepted directly by EU Customs.',
    img: '/assets/icon-growth.webp',
  },
  {
    num: '06', title: 'Complete Audit Trail',
    desc: 'Every figure can be traced back to its source document—showing who, when, old values, and new values.',
    img: '/assets/icon-cert.webp',
  },
];

export const howItWorks = [
  { step: '1', title: 'Upload Documents', desc: 'PDF invoices, utility bills, production logs' },
  { step: '2', title: 'AI Data Extraction', desc: 'LayoutLM reads & extracts carbon emission data' },
  { step: '3', title: 'Manual Validation', desc: 'HITL—correct details if AI confidence is low' },
  { step: '4', title: 'Emissions Calculation', desc: 'EU methodology: Scope 1 & 2 computed automatically' },
  { step: '5', title: 'XML EU Registry', desc: 'Download report ready for direct submission' },
];

export const faqItems = [
  {
    q: 'What is the difference between Emitra and Excel?',
    a: 'Excel does not connect to the EU Registry, lacks official EU calculation methodologies, provides no figure-by-figure audit trail, and manual data entry is not scalable. Emitra automates document processing to XML in hours.',
  },
  {
    q: 'What if the OCR results are inaccurate?',
    a: 'Documents with confidence scores below 90% go to HITL (Human-in-the-Loop) for a side-by-side preview and quick 3-second manual verification. Accuracy is maintained without slowing down workflows.',
  },
  {
    q: 'Is our company data secure?',
    a: 'Client data is isolated per tenant and every value carries a full audit log. Our ISO/IEC 27001 certification is scheduled for years two and three - it has not started, and we will not claim it has. In the interim we rely on contractual confidentiality and on-premise export of the client\'s own data.',
  },
  {
    q: 'Who is responsible if there is a calculation error?',
    a: 'Emitra is a software tool, not an accredited verifier. Final verification is still done by certified bodies like Sucofindo, SGS, or Mutu Agung Lestari. Our liability is capped at subscription fees.',
  },
  {
    q: 'How long does the implementation take?',
    a: 'Our onboarding is designed to take 3 to 5 business days, including an on-site visit. To be clear: this is a design target, not a measured one - we have not yet onboarded a live factory.',
  },
  {
    q: 'Do you already have paying customers?',
    a: 'No. Emitra is pre-revenue: no paying customer, no signed partnership, and no pilot inside a live factory yet. What exists is a deployed product with a public repository, and a year-one plan whose first milestone is three free pilots through an industry association. Every figure shown in the dashboard is demo data.',
  },
  {
    q: 'How much does Emitra cost?',
    a: 'Basic is IDR 30 million to set up plus IDR 50 million a year. Pro is IDR 50 million plus IDR 80 million a year. Enterprise is custom. A manual consultant audit costs IDR 150-250 million a year, so Basic saves 47-68% in year one and 67-80% from year two.',
  },
];

export const team = [
  { name: 'Imeldya', role: 'CEO', avatar: 'IM', desc: 'B2B Strategy & Partnerships' },
  { name: 'Dex Bennett', role: 'CTO', avatar: 'DB', desc: 'AI/ML Architecture & Cloud' },
  { name: 'Adriel', role: 'CMO', avatar: 'AD', desc: 'Market Research & Go-to-Market' },
  { name: 'Keren Tiara', role: 'CFO', avatar: 'KT', desc: 'Financial Modeling & Pricing' },
];
