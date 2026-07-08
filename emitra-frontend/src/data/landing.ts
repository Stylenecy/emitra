export const stats = [
  { value: '1.500+', label: 'Eksportir Terdampak CBAM' },
  { value: 'USD 757,7 Jt', label: 'Nilai Ekspor Terancam' },
  { value: '67%', label: 'Hemat Biaya Kepatuhan' },
  { value: 'Feb 2027', label: 'Deadline Sertifikat EU' },
];

export const testimonials = [
  {
    name: 'Budi Santoso', role: 'Plant Manager', company: 'PT Baja Nusantara Prima',
    quote: 'Emitra memangkas waktu pelaporan CBAM dari 3 minggu menjadi 2 hari. Audit trail-nya bikin verifikator EU langsung ACC.',
    result: 'Hemat 120 jam kerja / tahun', avatar: 'BS',
  },
  {
    name: 'Siti Aminah', role: 'CFO', company: 'CV Logam Mulia Sejahtera',
    quote: 'Biaya konsultan lingkungan kami turun 67% di tahun kedua. ROI-nya terasa banget di margin bersih pabrik.',
    result: 'Hemat IDR 135 Juta / tahun', avatar: 'SA',
  },
  {
    name: 'Hendra Wijaya', role: 'Export Director', company: 'PT Cilegon Steel Works',
    quote: 'Buyer Jerman kami minta data emisi real-time. Emitra satu-satunya tools lokal yang output XML-nya diterima EU Registry.',
    result: 'Kontrak Eropa aman 3 tahun', avatar: 'HW',
  },
];

export const partners = [
  { name: 'IISIA', label: 'Indonesian Iron & Steel Industry Association' },
  { name: 'KADIN', label: 'Kamar Dagang dan Industri Indonesia' },
  { name: 'ALFI', label: 'Asosiasi Logam dan Mesin Indonesia' },
];

export const features = [
  {
    num: '01', title: 'Upload Sekali',
    desc: 'Unggah invoice, tagihan listrik PLN, log BBM, dan laporan produksi — tanpa format khusus.',
  },
  {
    num: '02', title: 'AI OCR Otomatis',
    desc: 'Ekstraksi data dari dokumen kotor, kertas termal pudar, atau scan buram jadi data terstruktur dalam detik.',
  },
  {
    num: '03', title: 'Validasi HITL',
    desc: 'Jika confidence AI di bawah 90%, sistem menampilkan side-by-side — koreksi 3 detik oleh admin pabrik.',
  },
  {
    num: '04', title: 'Kalkulasi Deterministik',
    desc: 'Perhitungan emisi mengikuti metodologi EU CBAM resmi. 100% auditable — bukan AI black-box.',
  },
  {
    num: '05', title: 'XML Siap EU Registry',
    desc: 'Satu klik generate laporan XML sesuai skema CBAM yang diterima langsung oleh EU Customs.',
  },
  {
    num: '06', title: 'Audit Trail Lengkap',
    desc: 'Setiap angka bisa ditelusuri ke dokumen sumber — siapa, kapan, nilai lama, nilai baru.',
  },
];

export const howItWorks = [
  { step: '1', title: 'Upload Dokumen', desc: 'PDF invoice, foto meteran listrik, log produksi' },
  { step: '2', title: 'AI Ekstrak Data', desc: 'LayoutLM membaca & mengekstrak angka emisi' },
  { step: '3', title: 'Validasi Manual', desc: 'HITL — koreksi jika confidence rendah' },
  { step: '4', title: 'Kalkulasi Emisi', desc: 'EU methodology: Scope 1 & 2 otomatis' },
  { step: '5', title: 'XML EU Registry', desc: 'Download laporan siap submit' },
];

export const faqItems = [
  {
    q: 'Apa bedanya Emitra dengan Excel?',
    a: 'Excel tidak connect ke EU Registry, tidak punya metodologi kalkulasi resmi EU, tidak ada audit trail per angka, dan manual entry untuk 500 invoice tidak scalable. Emitra mengotomatisasi dari dokumen ke XML dalam hitungan jam.',
  },
  {
    q: 'Bagaimana jika hasil OCR tidak akurat?',
    a: 'Dokumen dengan confidence di bawah 90% masuk ke HITL (Human-in-the-Loop) — tampilan side-by-side, koreksi 3 detik oleh admin pabrik. Akurasi terjaga tanpa memperlambat proses.',
  },
  {
    q: 'Apakah data perusahaan kami aman?',
    a: 'Ya. Single-tenant isolation + AES-256 + TLS 1.3. Data klien A tidak bisa diakses klien B atau staf Emitra tanpa otorisasi. UU PDP compliant.',
  },
  {
    q: 'Siapa yang bertanggung jawab kalau ada kesalahan hitung?',
    a: 'Emitra adalah software tool, bukan accredited verifier. Verifikasi akhir tetap oleh Sucofindo / SGS / Mutu Agung Lestari. Liability kami di-capped di subscription fees.',
  },
  {
    q: 'Berapa lama implementasinya?',
    a: 'Onboarding selesai dalam 3-5 hari kerja. Pilot clients bisa langsung upload dokumen dan melihat hasil kalkulasi di hari pertama.',
  },
];

export const team = [
  { name: 'Imeldya', role: 'CEO', avatar: 'IM', desc: 'B2B Strategy & Partnerships' },
  { name: 'Dex Bennett', role: 'CTO', avatar: 'DB', desc: 'AI/ML Architecture & Cloud' },
  { name: 'Adriel', role: 'CFO', avatar: 'AD', desc: 'Financial Modeling & Pricing' },
  { name: 'Keren Tiara', role: 'CMO', avatar: 'KT', desc: 'Market Research & Go-to-Market' },
];
