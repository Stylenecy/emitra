# LAST DANCE — Final Audit Briefing for Orchestrators

> **Kirim ini ke ChatGPT, Gemini, dan Grok. Claude limit sampai 17:20.**
> **Setiap AI dapet copy yang sama — mereka akan assign diri sendiri siapa ngapain.**

---

## PREMIS: Apa Yang Kita Bikin

Kami tim BMC #12 (Politeknik Negeri Bali) sedang menyusun **International Business Plan** untuk kompetisi. Deadline: **9 Juli 2026**.

Produk kami: **Emitra** — platform SaaS berbasis AI yang membantu eksportir Indonesia (besi, baja, aluminium) memenuhi kewajiban pelaporan emisi karbon sesuai regulasi **EU CBAM** (Carbon Border Adjustment Mechanism).

**Kenapa ide ini?**
Karena CBAM EU mulai berlaku definitif 1 Januari 2026, dan eksportir Indonesia yang tidak bisa menyediakan data emisi terverifikasi akan menyebabkan importir EU pakai "default value" yang lebih mahal → produk Indonesia kalah kompetitif. Solusi patuh karbon yang ada (Persefoni, Watershed) harganya USD 15.000–80.000/tahun — terlalu mahal untuk UKM. Emitra mengisi celah ini dengan harga lokal (IDR 30–50J setup + IDR 50–80J/tahun).

**Kenapa outputnya seperti ini?**
Proposal disusun melalui **5-AI orchestration** — 5 AI (Claude, ChatGPT, Gemini, Grok, Qwen) mengerjakan section berbeda, lalu digabung. Keputusan kunci ( nama Emitra, pricing hybrid, green financing = roadmap, target market Indonesia-first) sudah diverifikasi melalui 4 round diskusi.

**Sudah sampai mana?**
- ✅ Proposal draft lengkap (6 sections + BMC) sudah jadi
- ✅ Semua section sudah ditulis dan digabung
- ⚠️ Financial Year 2–3 masih template (perlu Adriel isi)
- 🔴 BUTUH: Final audit dari kalian bertiga sebelum convert ke PDF

---

## UNDERSTANDING BRIEFING: Apa Yang Harus Kalian Pahami

Sebelum audit, pastikan kalian paham ini:

### Struktur Proposal (Sesuai Format Kompetisi)

| # | Section | Bobot | Status |
| :--- | :--- | :--- | :--- |
| 1 | Executive Summary | 15% | ✅ |
| 2 | Project Description | 15% | ✅ |
| 3 | Recommended Solution | 25% | ✅ |
| 4 | Financial Overview | 15% | ⚠️ Template |
| 5 | Risk Analysis | 15% | ✅ |
| 6 | Expected Outcome | 15% | ✅ |
| - | BMC (Appendix) | - | ✅ |

### Data Fakta (Verified)

| Data Point | Value | Source |
| :--- | :--- | :--- |
| EU total exports | USD 21.5B | BPS 2025 |
| CBAM-affected | USD 757.7M | Kemendag 2025 |
| Steel to EU | 4% of total | IISIA 2025 |
| Certificate cost | €383M / €390/ton | IISIA 2025 |
| CBAM price | €75.36/tCO2 | EEX 2026 |
| Phase-in 2026 | 2.5% → 100% by 2034 | EU Parliament |
| Cert purchase deadline | Feb 2027 | EU Commission |
| Affected enterprises | 1,500–2,000 | Industry |
| Case study cost | IDR 150–250M/yr audit | CV Logam Mulia |

### Keputusan Kunci (Converged)

1. **Nama:** Emitra (Dex's choice)
2. **Pricing:** Hybrid — Setup IDR 30–50M + Annual IDR 50–80M/tahun
3. **Green Financing:** Roadmap Year 3–4, bukan MVP
4. **Target Market:** Indonesia first, ASEAN 1 paragraf di roadmap
5. **MVP:** 4 fitur — OCR, Calculator, XML Generator, Audit Trail

---

## DIVISION OF LABOR: Siapa Ngapain

Kalian bertiga punya kekuatan berbeda. Aku tidak assign — **kalian pilih sendiri** berdasarkan strength masing-masing. Tapi ini panduannya:

### Peran yang Tersedia

**🔍 AUDITOR 1: Structure & Clarity**
- Cek apakah urutan section flow-nya logis
- Cek redundansi antar section
- Cek apakah ada bagian yang kurang jelas atau bertele-tele
- Pastikan proposal "dibaca sekali langsung paham" untuk juri internasional

**📊 AUDITOR 2: Data & Facts**
- Verifikasi semua angka dan sumber
- Cek konsistensi data antar section (misal: pricing di Executive Summary vs Financial vs BMC)
- Cek apakah ada klaim yang overclaiming atau tidak bisa dipertanggungjawabkan
- Flag data yang perlu update atau koreksi

**⚡ AUDITOR 3: Critical Thinking & Improvement**
- Cari kelemahan proposal dari sudut pandang juri
- Identifikasi bagian yang bisa diperkuat
- Cek apakah ada asumsi yang lemah
- Suggest perbaikan konkret (bukan hanya指出 masalah)

### Yang Harus Dihasilkan

Setiap auditor:
1. **Premis singkat** (3–5 kalimat): Apa ini, kenapa, sudah sampai mana
2. **Temuan**: Apa yang ditemukan dari audit
3. **Rekomendasi**: Apa yang harus diperbaiki (prioritized)
4. **Verdict**: Layak finalisasi / perlu revisi

---

## PROMPT UNTUK KALIAN

Copy prompt ini, ganti `[NAMA FILE PROPOSAL]` dengan path file proposal:

```
Kamu adalah auditor untuk proposal International Business Plan kompetisi BMC #12.

BRIEFING:
[Tempel seluruh isi briefing di atas]

TUGASMU:
1. Baca proposal di [NAMA FILE PROPOSAL]
2. Jalankan audit sesuai peranmu (pilih sendiri berdasarkan strength-mu)
3. Tulis output dalam format:
   - PREMIS (3-5 kalimat)
   - TEMUAN (bullet points, spesifik dengan section/paragraf)
   - REKOMENDASI (prioritized: Critical / Important / Nice-to-have)
   - VERDICT: Finalize / Revise Required
   - SALAH SATU: Apa yang bisa kamu perbaiki/tingkatkan dari proposal ini?

IMPORTANT:
- Kamu BOLEH dan DIIKAN menyarankan perubahan apapun jika memang diperlukan
- AI output bukan dewa — kritik dengan jujur
- Fokus pada KUALITAS proposal, bukan sekadar cari kesalahan
- Tunjukkan keahlianmu yang sebenarnya
```

---

## CATATAN PENTING

- **File proposal:** `Emitra-International-Business-Plan-BMC12.md`
- **Deadline:** 9 Juli 2026
- **Format akhir:** PDF, Times New Roman 12, spasi 1.5, 10–20 halaman
- **Financial Year 2–3:** Masih kosong (Adriel akan isi)
- **Claude:** Limit sampai 17:20, tidak bisa ikut audit kali ini

**Terima kasih sudah jadi bagian dari last dance ini. Tunjukkan yang terbaik.** 🎯
