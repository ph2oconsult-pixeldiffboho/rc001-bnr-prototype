# RC-001 Ultra-Low-N₂O BNR Prototype

This repository is the first hosted UX prototype for the Ultra-Low-N₂O BNR Design Platform.

It is intentionally a **seeded front-end prototype** using the RC-001 Eastern Treatment Plant brownfield case. It does not yet include a database, live document ingestion, authentication, or production engineering calculations.

## What is included

- Project Overview
- Uploads
- Extraction Review
- Conflicts & Verification
- Parameter Register
- Plant Configuration
- Calculations
- Criterion Results
- Gate Assessment
- Investigations

The prototype preserves the core engineering philosophy already defined in:

- ADM-001 — Application Data Model
- DAT-001 — Data Ingestion, Extraction and Verification Specification
- CAL-001 — Calculation Module Register
- CRS-001 — Criterion and Rules Engine Specification
- FRS-001 — Functional Requirements Specification
- RC-001 — Brownfield reference case
- DAT-BMK-001 — Data Ingestion Benchmark

## Deploy to Vercel

1. Create a new GitHub repository.
2. Upload all files and folders from this project **preserving the folder structure**.
3. In Vercel, choose **Add New → Project**.
4. Import the GitHub repository.
5. Vercel should automatically detect **Next.js**.
6. Leave the standard build settings unchanged.
7. Deploy.

No environment variables are required for this prototype.

## Run locally

```bash
npm install
npm run dev
```

Then open:

```text
http://localhost:3000
```

## Important

This prototype contains seeded/sanitised project data only. Do not use it for confidential client information until authentication, project isolation, secure object storage, audit requirements and data-governance controls have been implemented.

## Recommended next development step

After UX review of this hosted prototype, the next technical increment should be:

1. move RC-001 seeded values into structured JSON/data objects;
2. add a controlled Project / Revision model;
3. connect a PostgreSQL database;
4. implement CAL-001 deterministic calculation services;
5. implement CRS-001 controlled CriterionResult logic;
6. then add DAT-001 live file ingestion.
