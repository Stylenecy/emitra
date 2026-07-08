# DELEGASI — Claude: Recommended Solution (25%) + Risk Analysis (15%)

Kita sudah final: platform bernama **Emitra** — AI-Powered Carbon Compliance & Export Intelligence untuk eksportir Indonesia (sektor besi, baja, aluminium).

## TUGAS: Tulis 2 section proposal ini

### SECTION 1: Recommended Solution (~4-5 halaman)
Tulis detail teknis platform Emitra:

1. **System Architecture** — diagram alur data dari input (invoice listrik, tagihan BBM, data produksi) → OCR/AI extraction → emission calculation → CBAM XML report
2. **AI/ML Pipeline** — bagaimana AI digunakan: OCR untuk parsing dokumen, auto-classification HS Code, emission factor auto-mapping, anomaly detection
3. **MVP Features** (bukan nice-to-have):
   - OCR invoice & bill of materials
   - Kalkulator Scope 1 & 2 emissions (standar EU)
   - CBAM Declarant Report Generator (format XML EU)
   - Audit-trail log (setiap angka bisa dilacak ke dokumen asli)
4. **Tech Stack** — rekomendasi konkret (Python/TypeScript, framework, cloud, library OCR)
5. **UI Mockup Description** — deskripsi dashboard (dashboard overview, data input, report generation, audit trail)
6. **Keamanan Data** — enkripsi, compliance ISO 27001, data isolation

### SECTION 2: Risk Analysis — Technical Risks (~2 halaman)
1. **Data quality risk** — input data kotor dari pabrik → mitigasi: template + AI validation layer
2. **Regulation change risk** — CBAM phase-in berubah → mitigasi: modular calculation engine
3. **Verification rejection risk** — EU verifier tolak report → mitigasi: dual-verification + partnership with accredited verifier
4. **Adoption risk** — UKM tidak trust AI → mitigasi: transparent audit trail, human-in-the-loop
5. **Data security risk** — data produksi bocor → mitigasi: ISO 27001, data encryption, access control

**Tone:** Teknis, kredibel, detail arsitektur. Gunakan data validasi dari Round 3 (€75.36/tCO2, phase-in 2.5%, Feb 2027 full). Jangan overclaim.

**Format:** Full paragraph akademis, ready to paste ke proposal.
