export const stats = [
  { value: '1,500+', label: 'Exporters Affected by CBAM' },
  { value: 'USD 757.7M', label: 'Threatened Export Value' },
  { value: '67%', label: 'Compliance Cost Savings' },
  { value: 'Feb 2027', label: 'EU Certificate Deadline' },
];

export const testimonials = [
  {
    name: 'Budi Santoso', role: 'Plant Manager', company: 'PT Baja Nusantara Prima',
    quote: 'Emitra cut our CBAM reporting time from 3 weeks to 2 days. The complete audit trail allowed EU verifiers to approve it instantly.',
    result: 'Saved 120 working hours / year', avatar: 'BS',
  },
  {
    name: 'Siti Aminah', role: 'CFO', company: 'CV Logam Mulia Sejahtera',
    quote: 'Our environmental consulting costs dropped by 67% in the second year. The ROI is immediately apparent in our plant\'s net margin.',
    result: 'Saved IDR 135 Million / year', avatar: 'SA',
  },
  {
    name: 'Hendra Wijaya', role: 'Export Director', company: 'PT Cilegon Steel Works',
    quote: 'Our German buyers requested real-time emissions data. Emitra is the only local tool whose XML output was accepted by the EU Registry.',
    result: 'European contracts secured for 3 years', avatar: 'HW',
  },
];

export const partners = [
  { name: 'IISIA', label: 'Indonesian Iron & Steel Industry Association' },
  { name: 'KADIN', label: 'Indonesian Chamber of Commerce and Industry' },
  { name: 'ALFI', label: 'Indonesian Logistics and Machine Association' },
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
    a: 'Yes. We use single-tenant isolation, AES-256 encryption, and TLS 1.3. Client data is fully isolated. Fully compliant with data protection laws.',
  },
  {
    q: 'Who is responsible if there is a calculation error?',
    a: 'Emitra is a software tool, not an accredited verifier. Final verification is still done by certified bodies like Sucofindo, SGS, or Mutu Agung Lestari. Our liability is capped at subscription fees.',
  },
  {
    q: 'How long does the implementation take?',
    a: 'Onboarding is completed within 3 to 5 business days. Pilot clients can start uploading documents and view emission calculations on day one.',
  },
];

export const team = [
  { name: 'Imeldya', role: 'CEO', avatar: 'IM', desc: 'B2B Strategy & Partnerships' },
  { name: 'Dex Bennett', role: 'CTO', avatar: 'DB', desc: 'AI/ML Architecture & Cloud' },
  { name: 'Adriel', role: 'CFO', avatar: 'AD', desc: 'Financial Modeling & Pricing' },
  { name: 'Keren Tiara', role: 'CMO', avatar: 'KT', desc: 'Market Research & Go-to-Market' },
];
