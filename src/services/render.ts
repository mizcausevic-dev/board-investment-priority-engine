import { boardAsks, capitalSequence, payload, priorityLane, riskMap, summary, verification } from "./verticalBriefService.js";

const productTitle = "Board Investment Priority Engine";
const domain = "https://priority.kineticgain.com";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function shell(title: string, path: string, body: string, description: string) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(title)} · Kinetic Gain</title>
    <meta name="description" content="${escapeHtml(description)}" />
    <style>
      :root {
        color-scheme: dark;
        --bg: #07111d;
        --panel: #0d1a2b;
        --panel-2: #102032;
        --border: rgba(103, 224, 190, 0.22);
        --text: #edf2ff;
        --muted: #9fb0cf;
        --accent: #67e0be;
        --accent-2: #7dc4ff;
      }
      * { box-sizing: border-box; }
      body {
        margin: 0;
        font-family: "Segoe UI", system-ui, sans-serif;
        background:
          radial-gradient(circle at top left, rgba(125, 196, 255, 0.12), transparent 30%),
          linear-gradient(180deg, #050c16 0%, var(--bg) 100%);
        color: var(--text);
      }
      a { color: var(--accent-2); text-decoration: none; }
      .wrap { max-width: 1180px; margin: 0 auto; padding: 32px 24px 64px; }
      .hero, .section {
        background: linear-gradient(180deg, rgba(14, 28, 45, 0.95), rgba(10, 19, 33, 0.98));
        border: 1px solid var(--border);
        border-radius: 28px;
        padding: 28px;
        box-shadow: 0 18px 60px rgba(2, 7, 16, 0.35);
      }
      .hero { margin-bottom: 24px; }
      .eyebrow {
        display: inline-block;
        padding: 10px 16px;
        border-radius: 999px;
        border: 1px solid var(--border);
        background: rgba(103, 224, 190, 0.08);
        color: var(--accent);
        font-size: 12px;
        text-transform: uppercase;
        letter-spacing: 0.28em;
      }
      h1, h2 { margin: 18px 0 12px; font-family: Georgia, serif; line-height: 0.95; }
      h1 { font-size: clamp(56px, 8vw, 92px); max-width: 980px; }
      h2 { font-size: clamp(36px, 4vw, 54px); }
      .lede { color: var(--muted); font-size: 20px; line-height: 1.6; max-width: 920px; }
      .nav { display: flex; gap: 10px; flex-wrap: wrap; margin-top: 22px; }
      .nav a {
        padding: 10px 14px;
        border: 1px solid rgba(125, 196, 255, 0.18);
        border-radius: 999px;
        color: var(--muted);
      }
      .nav a.active { color: var(--text); border-color: var(--accent); background: rgba(103, 224, 190, 0.08); }
      .metrics, .grid {
        display: grid;
        gap: 18px;
      }
      .metrics { grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); margin-top: 26px; }
      .metric, .card, .table-wrap {
        background: rgba(16, 32, 50, 0.76);
        border: 1px solid rgba(125, 196, 255, 0.12);
        border-radius: 22px;
        padding: 18px;
      }
      .metric-label, .chip {
        color: var(--accent);
        text-transform: uppercase;
        letter-spacing: 0.18em;
        font-size: 12px;
      }
      .metric-value { display: block; font-size: 40px; font-weight: 700; margin-top: 10px; }
      .metric-copy { margin-top: 10px; color: var(--muted); line-height: 1.5; }
      .section { margin-top: 24px; }
      .grid { grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); }
      .card h3 { margin: 12px 0 10px; font-size: 30px; line-height: 1.05; }
      .card p, li { color: var(--muted); line-height: 1.6; }
      .table-wrap { overflow-x: auto; }
      table { width: 100%; border-collapse: collapse; }
      th, td { text-align: left; padding: 12px; border-bottom: 1px solid rgba(125, 196, 255, 0.12); vertical-align: top; }
      th { color: var(--accent); font-size: 12px; text-transform: uppercase; letter-spacing: 0.18em; }
      ul { padding-left: 20px; }
      .footer {
        margin-top: 24px;
        color: var(--muted);
        font-size: 14px;
        display: flex;
        gap: 18px;
        flex-wrap: wrap;
      }
    </style>
  </head>
  <body>
    <div class="wrap">
      ${body}
      <div class="footer">
        <span>${productTitle}</span>
        <a href="${domain}">${domain.replace("https://", "")}</a>
        <a href="https://github.com/mizcausevic-dev/">GitHub</a>
        <a href="https://www.linkedin.com/in/mirzacausevic/">LinkedIn</a>
        <a href="https://kineticgain.com/">Kinetic Gain</a>
      </div>
    </div>
  </body>
</html>`;
}

function navLinks(path: string) {
  return [
    ["/", "Overview"],
    ["/priority-lane", "Priority lane"],
    ["/board-asks", "Board asks"],
    ["/capital-sequence", "Capital sequence"],
    ["/verification", "Verification"],
    ["/docs", "Docs"]
  ]
    .map(([href, label]) => {
      const active = href === path ? ' class="active"' : "";
      return `<a${active} href="${href}">${label}</a>`;
    })
    .join("");
}

export function renderOverview() {
  const executiveSummary = summary();
  const lanes = priorityLane().slice(0, 4);
  const findings = riskMap().slice(0, 5);
  const cards = lanes
    .map(
      (item) => `<article class="card">
        <div class="chip">${escapeHtml(item.action)}</div>
        <h3>${escapeHtml(item.priorityTheme)}</h3>
        <p><strong>Audience:</strong> ${escapeHtml(item.audience)}</p>
        <p>${escapeHtml(item.recommendedMove)}</p>
        <p><strong>Board ask:</strong> ${escapeHtml(item.nextBoardAsk)}</p>
      </article>`
    )
    .join("");

  const risks = findings
    .map((item) => `<li><strong>${escapeHtml(item.severity.toUpperCase())}</strong> · ${escapeHtml(item.message)}</li>`)
    .join("");

  return shell(
    productTitle,
    "/",
    `<section class="hero">
      <span class="eyebrow">Board Priority Intelligence</span>
      <h1>Where should the board fund, protect, hold, or trim next?</h1>
      <p class="lede">Board Investment Priority Engine turns AI, identity, revenue, FinTech, biotech, procurement, and public-sector complexity into a ranked committee packet with clear next asks.</p>
      <div class="nav">${navLinks("/")}</div>
      <div class="metrics">
        <div class="metric"><span class="metric-label">Priority lanes</span><span class="metric-value">${executiveSummary.items}</span><div class="metric-copy">Modeled board-priority motions in the current packet.</div></div>
        <div class="metric"><span class="metric-label">Priority score</span><span class="metric-value">${executiveSummary.averagePriorityScore}</span><div class="metric-copy">Average strength of the next board recommendation.</div></div>
        <div class="metric"><span class="metric-label">Savings leverage</span><span class="metric-value">${executiveSummary.averageSavingsLeverageScore}</span><div class="metric-copy">Average recoverable leverage if the committee trims or sequences well.</div></div>
        <div class="metric"><span class="metric-label">Capital to reallocate</span><span class="metric-value">$${executiveSummary.capitalToReallocateMillions}M</span><div class="metric-copy">Modeled capital that can be redirected into stronger board-approved lanes.</div></div>
      </div>
    </section>
    <section class="section">
      <h2>Priority queue</h2>
      <div class="grid">${cards}</div>
    </section>
    <section class="section">
      <h2>Priority findings</h2>
      <ul>${risks}</ul>
    </section>`,
    "Board-ready surface for funding, protecting, holding, and trimming investment priorities across the executive estate."
  );
}

export function renderPriorityLane() {
  const rows = priorityLane()
    .map(
      (item) => `<tr>
        <td>${escapeHtml(item.owner)}</td>
        <td>${escapeHtml(item.audience)}</td>
        <td>${escapeHtml(item.action)}</td>
        <td>${escapeHtml(item.priorityTheme)}</td>
        <td>${escapeHtml(item.recommendedMove)}</td>
      </tr>`
    )
    .join("");

  return shell(
    "Priority lane",
    "/priority-lane",
    `<section class="hero">
      <span class="eyebrow">Priority lane</span>
      <h1>Every board motion stays tied to one audience, one owner, and one next ask.</h1>
      <p class="lede">The priority-lane view keeps fund, protect, hold, and trim decisions readable instead of scattering them across unrelated update decks.</p>
      <div class="nav">${navLinks("/priority-lane")}</div>
    </section>
    <section class="section table-wrap">
      <table>
        <thead><tr><th>Owner</th><th>Audience</th><th>Action</th><th>Theme</th><th>Recommended move</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </section>`,
    "Priority-lane view for board action, owner accountability, and next committee asks."
  );
}

export function renderBoardAsks() {
  const rows = boardAsks()
    .map(
      (item) => `<tr>
        <td>${escapeHtml(item.owner)}</td>
        <td>${escapeHtml(item.audience)}</td>
        <td>${item.priorityScore}</td>
        <td>${item.convictionScore}</td>
        <td>${item.boardConfidenceScore}</td>
        <td>${escapeHtml(item.companyTags.join(", "))}</td>
      </tr>`
    )
    .join("");

  return shell(
    "Board asks",
    "/board-asks",
    `<section class="hero">
      <span class="eyebrow">Board asks</span>
      <h1>See which asks are most ready for approval and which still need tighter proof.</h1>
      <p class="lede">This view keeps priority, conviction, and board confidence together so the committee can rank the asks instead of reacting to whichever motion is loudest.</p>
      <div class="nav">${navLinks("/board-asks")}</div>
    </section>
    <section class="section table-wrap">
      <table>
        <thead><tr><th>Owner</th><th>Audience</th><th>Priority</th><th>Conviction</th><th>Board confidence</th><th>Signals</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </section>`,
    "Board-asks view for ranking committee motions by priority, conviction, and confidence."
  );
}

export function renderCapitalSequence() {
  const rows = capitalSequence()
    .map(
      (item) => `<tr>
        <td>${escapeHtml(item.owner)}</td>
        <td>${escapeHtml(item.audience)}</td>
        <td>${item.urgencyScore}</td>
        <td>${item.paybackWindowScore}</td>
        <td>${item.savingsLeverageScore}</td>
        <td>${escapeHtml(item.headline)}</td>
      </tr>`
    )
    .join("");
  const notes = verification().map((item) => `<li>${escapeHtml(item)}</li>`).join("");

  return shell(
    "Capital sequence",
    "/capital-sequence",
    `<section class="hero">
      <span class="eyebrow">Capital sequence</span>
      <h1>Urgency, payback, and savings leverage stay visible so the board can sequence actions cleanly.</h1>
      <p class="lede">The capital-sequence view highlights where investment timing is tight, where payback is shortest, and where trim decisions release the most leverage.</p>
      <div class="nav">${navLinks("/capital-sequence")}</div>
    </section>
    <section class="section table-wrap">
      <table>
        <thead><tr><th>Owner</th><th>Audience</th><th>Urgency</th><th>Payback window</th><th>Savings leverage</th><th>Headline</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </section>
    <section class="section">
      <h2>Verification</h2>
      <ul>${notes}</ul>
    </section>`,
    "Capital-sequence view for urgency, payback timing, and savings leverage."
  );
}

export function renderVerification() {
  const notes = verification().map((item) => `<li>${escapeHtml(item)}</li>`).join("");
  return shell(
    "Verification",
    "/verification",
    `<section class="hero">
      <span class="eyebrow">Verification</span>
      <h1>How this board-priority packet is modeled and what it is safe to infer from it.</h1>
      <p class="lede">This route keeps the synthetic nature, proof boundaries, and reproducibility notes visible before anyone treats the sample as live financial advice.</p>
      <div class="nav">${navLinks("/verification")}</div>
    </section>
    <section class="section">
      <ul>${notes}</ul>
    </section>`,
    "Verification notes for the Board Investment Priority Engine sample and modeled outputs."
  );
}

export function renderDocs() {
  return shell(
    "Docs",
    "/docs",
    `<section class="hero">
      <span class="eyebrow">Docs</span>
      <h1>Board Investment Priority Engine docs</h1>
      <p class="lede">This surface packages board-ready fund, protect, hold, and trim decisions into reproducible routes and JSON outputs.</p>
      <div class="nav">${navLinks("/docs")}</div>
    </section>
    <section class="section">
      <ul>
        <li><code>/priority-lane</code> keeps owners, audiences, actions, and next board asks readable.</li>
        <li><code>/board-asks</code> compares priority, conviction, and board confidence.</li>
        <li><code>/capital-sequence</code> shows urgency, payback, and savings leverage.</li>
        <li><code>/api/payload</code> exposes the reproducible board-priority packet.</li>
      </ul>
      <pre>${escapeHtml(JSON.stringify(payload(), null, 2))}</pre>
    </section>`,
    "Product documentation for Board Investment Priority Engine and its board-decision routes."
  );
}
