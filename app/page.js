"use client";

import { useMemo, useState } from "react";

const navItems = [
  ["overview", "Project Overview"],
  ["uploads", "Uploads"],
  ["extraction", "Extraction Review"],
  ["conflicts", "Conflicts & Verification"],
  ["parameters", "Parameter Register"],
  ["configuration", "Plant Configuration"],
  ["calculations", "Calculations"],
  ["criteria", "Criteria"],
  ["gates", "Gate Assessment"],
  ["investigations", "Investigations"],
];

const candidateRows = [
  { id: "CPV-0204", label: "Length, each pass", value: "91 m", mapped: "PASS_LENGTH", extraction: "High", semantic: "High", status: "Ready" },
  { id: "CPV-0205", label: "Width, each pass", value: "12 m", mapped: "PASS_WIDTH", extraction: "High", semantic: "High", status: "Ready" },
  { id: "CPV-0206", label: "Average liquid depth", value: "4.5 m", mapped: "WATER_DEPTH", extraction: "High", semantic: "High", status: "Ready" },
  { id: "CPV-0207", label: "Volume per tank", value: "20,400 m³", mapped: "AERATION_TANK_VOLUME", extraction: "High", semantic: "High", status: "Conflict" },
  { id: "CPV-0814", label: "NH3 concentration", value: "50 mg/L", mapped: "AMMONIA_N_CONCENTRATION?", extraction: "High", semantic: "Low", status: "Semantic review" },
];

const investigations = [
  ["INV-001A", "As-built reactor geometry recovery", "HD-001–008, DP-014", "P1"],
  ["INV-001B", "Historian/process data extraction", "DP-001/002/003, HD-013, Gates 1/3", "P1"],
  ["INV-001D", "COD fractionation campaign", "DP-004/005/006", "P1"],
  ["INV-001G", "Spatial DO/NH₄/NO₂/NO₃ survey", "HD-013/014", "P1"],
  ["INV-001H", "Full-scale tracer RTD campaign", "HD-009/010/011", "P1"],
];

function Badge({ children, tone = "neutral" }) {
  return <span className={`badge ${tone}`}>{children}</span>;
}

function Kpi({ label, value, note }) {
  return (
    <div className="card kpi-card">
      <div className="kpi-label">{label}</div>
      <div className="kpi-value">{value}</div>
      <div className="small">{note}</div>
    </div>
  );
}

function SectionTitle({ title, subtitle, action }) {
  return (
    <div className="topbar">
      <div>
        <h1>{title}</h1>
        <div className="small">{subtitle}</div>
      </div>
      {action}
    </div>
  );
}

export default function Home() {
  const [active, setActive] = useState("overview");
  const [approved, setApproved] = useState({});
  const [openConflict, setOpenConflict] = useState(null);

  const section = useMemo(() => {
    switch (active) {
      case "uploads":
        return <Uploads />;
      case "extraction":
        return <Extraction approved={approved} setApproved={setApproved} setActive={setActive} />;
      case "conflicts":
        return <Conflicts openConflict={openConflict} setOpenConflict={setOpenConflict} />;
      case "parameters":
        return <Parameters />;
      case "configuration":
        return <Configuration />;
      case "calculations":
        return <Calculations />;
      case "criteria":
        return <Criteria />;
      case "gates":
        return <Gates />;
      case "investigations":
        return <Investigations />;
      default:
        return <Overview setActive={setActive} />;
    }
  }, [active, approved, openConflict]);

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">Ultra-Low-N₂O BNR</div>
        <div className="subbrand">RC-001 Brownfield Prototype · UX-001 v0.1</div>
        <nav>
          {navItems.map(([id, label]) => (
            <button key={id} className={active === id ? "active" : ""} onClick={() => setActive(id)}>
              {label}
            </button>
          ))}
        </nav>
      </aside>

      <main className="main">
        {section}
        <div className="footer">
          Prototype only — seeded with the controlled RC-001 case-study values developed for the design platform.
        </div>
      </main>
    </div>
  );
}

function Overview({ setActive }) {
  return (
    <>
      <SectionTitle
        title="RC-001 — Eastern Treatment Plant Brownfield Low-N₂O Retrofit"
        subtitle="Project Revision RC-001-R0.1 · Stage: Forensic / Screening · Working baseline"
        action={<Badge tone="warn">Gate 1 & 2 not demonstrated</Badge>}
      />

      <div className="kpi-grid">
        <Kpi label="Source files" value="2" note="Current benchmark set" />
        <Kpi label="Candidate values" value="94" note="Illustrative prototype count" />
        <Kpi label="Material conflicts" value="2" note="Tank volume · F/M" />
        <Kpi label="Mandatory evidence gaps" value="11" note="RTD, rbCOD, spatial DO, N₂O…" />
      </div>

      <div className="two-col">
        <div className="card">
          <h2>Assurance Snapshot</h2>
          {[
            ["Gate 1", "Biological Capacity", "48%"],
            ["Gate 2", "Hydraulic & Low-Emission Integrity", "28%"],
            ["Gate 3", "Dynamic Operability", "32%"],
            ["Gate 4", "Whole-Plant Carbon & Resource", "24%"],
          ].map(([gate, label, width]) => (
            <div className="gate-row" key={gate}>
              <strong>{gate}</strong>
              <div>
                <div className="progress"><span style={{ width }} /></div>
                <div className="small">{label}</div>
              </div>
              <Badge tone="warn">NOT DEMONSTRATED</Badge>
            </div>
          ))}
        </div>

        <div className="card">
          <h2>Next Best Actions</h2>
          <div className="notice info"><strong>1.</strong> Resolve the 20,400 vs 19,656 m³ tank-volume discrepancy from as-built drawings.</div>
          <div className="notice info"><strong>2.</strong> Extract 12–24 months of historian data to establish the real operating envelope.</div>
          <div className="notice info"><strong>3.</strong> Undertake COD fractionation and spatial DO/NH₄/NO₂/NO₃ field surveys.</div>
          <div className="notice research"><strong>Research status:</strong> N₂O-specific metrics remain research-only until evidence and thresholds mature.</div>
          <button className="btn primary" onClick={() => setActive("investigations")}>View investigations</button>
        </div>
      </div>
    </>
  );
}

function Uploads() {
  return (
    <>
      <SectionTitle title="Uploads" subtitle="Source files remain traceable to the project revision and evidence context." action={<button className="btn primary">+ Upload Evidence</button>} />
      <div className="card table-wrap">
        <table>
          <thead><tr><th>File</th><th>Classification</th><th>Authority</th><th>Context</th><th>Status</th></tr></thead>
          <tbody>
            <tr><td>ETP Process Summary.docx</td><td>TECHNICAL_REPORT</td><td>Medium–High</td><td>Existing ETP baseline</td><td><Badge tone="ok">Parsed</Badge></td></tr>
            <tr><td>A Route to Eliminating Scope 1 Emissions…docx</td><td>CONCEPT_STUDY</td><td>Medium</td><td>2019 future design basis</td><td><Badge tone="ok">Parsed</Badge></td></tr>
          </tbody>
        </table>
      </div>
      <div className="notice">The 350 ML/d existing baseline and the 503 ML/d 2019 future design basis are intentionally stored as different contexts, not as a conflict.</div>
    </>
  );
}

function Extraction({ approved, setApproved, setActive }) {
  const approve = (id) => setApproved((prev) => ({ ...prev, [id]: true }));
  return (
    <>
      <SectionTitle title="Extraction Review" subtitle="Exception-driven review: focus engineering judgement on conflicts and ambiguity." action={<button className="btn approve" onClick={() => setApproved(Object.fromEntries(candidateRows.filter(r => r.status === "Ready").map(r => [r.id, true])))}>Approve all clean</button>} />
      <div className="card table-wrap">
        <table>
          <thead><tr><th>Candidate</th><th>Source label</th><th>Value</th><th>Mapped parameter</th><th>Extraction</th><th>Semantic</th><th>Status</th><th>Action</th></tr></thead>
          <tbody>
            {candidateRows.map((r) => (
              <tr key={r.id}>
                <td>{r.id}</td><td>{r.label}</td><td>{r.value}</td><td>{r.mapped}</td><td>{r.extraction}</td><td>{r.semantic}</td>
                <td>
                  {approved[r.id] ? <Badge tone="ok">Approved</Badge> :
                    r.status === "Ready" ? <Badge tone="ok">Ready</Badge> :
                    r.status === "Conflict" ? <Badge tone="danger">Conflict</Badge> :
                    <Badge tone="warn">Semantic review</Badge>}
                </td>
                <td>
                  {r.status === "Ready" && !approved[r.id] && <button className="btn approve" onClick={() => approve(r.id)}>Approve</button>}
                  {r.status === "Conflict" && <button className="btn" onClick={() => setActive("conflicts")}>Review</button>}
                  {r.status === "Semantic review" && <button className="btn">Review basis</button>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

function Conflicts({ openConflict, setOpenConflict }) {
  return (
    <>
      <SectionTitle title="Conflicts & Verification" subtitle="Conflicts are exposed and reviewed; source values are never silently overwritten." />
      <ConflictCard id="volume" openConflict={openConflict} setOpenConflict={setOpenConflict}
        title="SCF-001 — Aeration tank volume" subtitle="Geometry conflict · Material for detailed hydraulics"
        leftLabel="Reported" left="20,400 m³" rightLabel="Calculated from 4 × 91 × 12 × 4.5" right="19,656 m³"
        note="Difference = 744 m³ (3.79% relative to dimensional volume)."
      >
        <strong>Suggested resolution evidence:</strong> as-built GA/sections, exact turn/end volumes, operating level and non-rectangular geometry.
      </ConflictCard>

      <ConflictCard id="fm" openConflict={openConflict} setOpenConflict={setOpenConflict}
        title="SCF-002 — F/M basis" subtitle="Formula or basis conflict"
        leftLabel="Reported" left="0.18 kg BOD/kg MLVSS·d" rightLabel="Independent" right="0.155 kg BOD/kg MLVSS·d"
        note="Possible basis differences include active volume, MLVSS, BOD load, tank count or time period. These are hypotheses only."
      >
        <strong>Required reviewer action:</strong> resolve the original calculation basis from design calculation or operating record.
      </ConflictCard>

      <div className="card spacer-top">
        <h2>Positive Verifications</h2>
        <table>
          <thead><tr><th>Check</th><th>Reported</th><th>Independent</th><th>Result</th></tr></thead>
          <tbody>
            <tr><td>Nominal HRT</td><td>12.6 h</td><td>12.59 h</td><td><Badge tone="ok">VERIFIED WITHIN ROUNDING</Badge></td></tr>
            <tr><td>Total blower capacity</td><td>152.5 kg/s</td><td>152.5 kg/s</td><td><Badge tone="ok">VERIFIED</Badge></td></tr>
            <tr><td>503 ML/d BOD load</td><td>291,237 kg/d</td><td>291,237 kg/d</td><td><Badge tone="ok">VERIFIED</Badge></td></tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

function ConflictCard({ id, openConflict, setOpenConflict, title, subtitle, leftLabel, left, rightLabel, right, note, children }) {
  const open = openConflict === id;
  return (
    <div className="card conflict-card" onClick={() => setOpenConflict(open ? null : id)}>
      <div className="topbar compact">
        <div><h2>{title}</h2><div className="small">{subtitle}</div></div>
        <Badge tone="danger">OPEN</Badge>
      </div>
      <div className="two-col">
        <div><div className="small">{leftLabel}</div><div className="metric">{left}</div></div>
        <div><div className="small">{rightLabel}</div><div className="metric">{right}</div></div>
      </div>
      <div className="notice">{note}</div>
      {open && <div className="detail">{children}<div className="actions"><button className="btn">Link supporting source</button><button className="btn">Create investigation</button><button className="btn">Keep open</button></div></div>}
    </div>
  );
}

function Parameters() {
  return (
    <>
      <SectionTitle title="Approved Parameter Register" subtitle="Every value is traceable to source evidence or controlled calculation lineage." action={<button className="btn">Export PVR-001</button>} />
      <div className="card table-wrap">
        <table>
          <thead><tr><th>PV</th><th>Parameter</th><th>Value</th><th>Provenance</th><th>Scenario</th><th>Quality</th></tr></thead>
          <tbody>
            <tr><td>PV-0001</td><td>PLANT_MEDIAN_FLOW</td><td>350 ML/d</td><td>DESIGN_BASIS</td><td>Existing baseline</td><td><Badge tone="ok">Approved</Badge></td></tr>
            <tr><td>PV-0204</td><td>PASS_LENGTH</td><td>91 m</td><td>DESIGN_BASIS</td><td>Global</td><td><Badge tone="ok">Approved</Badge></td></tr>
            <tr><td>PV-0205</td><td>PASS_WIDTH</td><td>12 m</td><td>DESIGN_BASIS</td><td>Global</td><td><Badge tone="ok">Approved</Badge></td></tr>
            <tr><td>PV-0207</td><td>AERATION_TANK_VOLUME_REPORTED</td><td>20,400 m³</td><td>DESIGN_BASIS</td><td>Global</td><td><Badge tone="warn">Approved with conflict</Badge></td></tr>
            <tr><td>PV-0230</td><td>NOMINAL_HRT_CALCULATED</td><td>12.59 h</td><td>CALCULATED_FROM_DESIGN_BASIS</td><td>S-001</td><td><Badge tone="warn">Verified + upstream warning</Badge></td></tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

function Configuration() {
  return (
    <>
      <SectionTitle title="Plant Configuration" subtitle="Physical asset model reconstructed from approved evidence." />
      <div className="card">
        <h2>Secondary treatment — baseline</h2>
        <div className="process-flow">
          <div className="step">Primary Sedimentation<br/><strong>8 tanks</strong></div>
          <div className="step current">Aeration Train<br/><strong>10 tanks installed</strong></div>
          <div className="step">4 passes / tank<br/><strong>91 × 12 × 4.5 m</strong></div>
          <div className="step">Secondary Clarification<br/><strong>20 centre + 6 peripheral</strong></div>
        </div>
        <div className="notice info">Process configuration: N-DeN with sequential anoxic/aerated zones, step feed and DO-based aeration control. Exact zone lengths and feed splits remain not found.</div>
      </div>
    </>
  );
}

function Calculations() {
  return (
    <>
      <SectionTitle title="Calculations" subtitle="Deterministic CAL-001 outputs; calculations do not decide compliance." />
      <div className="kpi-grid">
        <Kpi label="L/W" value="7.58" note="Geometry descriptor only" />
        <Kpi label="W/H" value="2.67" note="Geometry descriptor only" />
        <Kpi label="Active volume" value="183,600" note="m³ · 9 × 20,400" />
        <Kpi label="Nominal HRT" value="12.59" note="h · verified against 12.6 h" />
      </div>
      <div className="card">
        <h2>Calculation lineage example</h2>
        <div className="metric">HRT = (9 × 20,400 m³ / 350,000 m³/d) × 24 = 12.59 h</div>
        <div className="notice">Arithmetic is verified, but tank volume has an unresolved geometry conflict. The warning propagates downstream.</div>
      </div>
    </>
  );
}

function Criteria() {
  return (
    <>
      <SectionTitle title="Criterion Results" subtitle="CRS-001 prevents missing evidence or research metrics from becoming green PASS outcomes." action={<button className="btn">Export CRR-001</button>} />
      <div className="card table-wrap">
        <table>
          <thead><tr><th>Criterion</th><th>Metric/evidence</th><th>Maturity</th><th>Result</th><th>Why?</th></tr></thead>
          <tbody>
            <tr><td>HD-001 L/W</td><td>7.58</td><td>Benchmark</td><td><Badge tone="ok">WITHIN BENCHMARK</Badge></td><td>Formal pass prohibited</td></tr>
            <tr><td>HD-009 Effective volume</td><td>No tracer/CFD evidence</td><td>Enhanced</td><td><Badge tone="warn">NOT DEMONSTRATED</Badge></td><td>Metric missing</td></tr>
            <tr><td>HD-010 RTD</td><td>No RTD data</td><td>Enhanced</td><td><Badge tone="warn">NOT DEMONSTRATED</Badge></td><td>Required evidence missing</td></tr>
            <tr><td>HD-013 Spatial DO</td><td>DO control exists; field absent</td><td>Enhanced</td><td><Badge tone="warn">NOT DEMONSTRATED</Badge></td><td>Probe control ≠ spatial field</td></tr>
            <tr><td>HD-014 N₂O integrity</td><td>No NO₂/N₂O evidence</td><td>Research</td><td><Badge tone="research">RESEARCH ONLY</Badge></td><td>Pass/fail not authorised</td></tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

function Gates() {
  return (
    <>
      <SectionTitle title="Gate Assessment" subtitle="Gates consume CriterionResults only — never raw data directly." />
      <div className="card">
        {[
          ["Gate 1", "Biological Capacity", "Current NH₄/TN/alkalinity/solids evidence incomplete."],
          ["Gate 2", "Hydraulic & Low-Emission Integrity", "RTD, effective volume, spatial DO, NO₂/N₂O absent."],
          ["Gate 3", "Dynamic Operability", "Minimum-load and turndown evidence incomplete."],
          ["Gate 4", "Whole-Plant Carbon & Resource", "Current COD/N/GHG balances incomplete."],
        ].map(([g, name, why]) => (
          <div className="gate-row" key={g}>
            <strong>{g}</strong><div><strong>{name}</strong><div className="small">{why}</div></div><Badge tone="warn">NOT DEMONSTRATED</Badge>
          </div>
        ))}
      </div>
      <div className="notice info"><strong>No formal DOES_NOT_MEET outcomes have been demonstrated.</strong> Current results identify evidence gaps, not proven plant defects.</div>
    </>
  );
}

function Investigations() {
  return (
    <>
      <SectionTitle title="Investigations" subtitle="Turn “Not Demonstrated” into a prioritised evidence-acquisition programme." action={<button className="btn primary">+ New Investigation</button>} />
      <div className="card table-wrap">
        <table>
          <thead><tr><th>ID</th><th>Investigation</th><th>Criteria advanced</th><th>Priority</th><th>Status</th></tr></thead>
          <tbody>
            {investigations.map(([id, name, criteria, p]) => (
              <tr key={id}><td>{id}</td><td>{name}</td><td>{criteria}</td><td>{p}</td><td><Badge tone="warn">Proposed</Badge></td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
