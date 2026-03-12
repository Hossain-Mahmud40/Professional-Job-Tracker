"use strict";

// ── Default seed data ──────────────────────────────────────────────────
const DEFAULT_JOBS = [
  {
    id: "job-1",
    company: "Mobile First Corp",
    title: "React Native Developer",
    details: "Remote • Full-time • $130,000 – $175,000",
    description:
      "Build cross-platform mobile applications using React Native. Work on products used by millions of users worldwide.",
    status: "not-applied",
  },
  {
    id: "job-2",
    company: "CloudScale Solutions",
    title: "Senior Backend Engineer",
    details: "New York, NY (Hybrid) • Full-time • $150,000 – $190,000",
    description:
      "Design and maintain high-performance microservices using Node.js and Go. Optimize database queries for enterprise clients.",
    status: "not-applied",
  },
  {
    id: "job-3",
    company: "FinTech Innovations",
    title: "Frontend Web Developer",
    details: "Remote • Contract • $60/hr – $85/hr",
    description:
      "Create responsive, accessible financial dashboards using React and Tailwind CSS. Collaborate closely with UI/UX teams.",
    status: "not-applied",
  },
  {
    id: "job-4",
    company: "DataSphere Analytics",
    title: "Machine Learning Engineer",
    details: "San Francisco, CA • Full-time • $160,000 – $210,000",
    description:
      "Develop and deploy predictive models. Work with large-scale datasets using Python, TensorFlow, and AWS SageMaker.",
    status: "not-applied",
  },
  {
    id: "job-5",
    company: "Pixel Perfect Studios",
    title: "UI/UX Designer",
    details: "Remote • Full-time • $90,000 – $125,000",
    description:
      "Lead the design system for our core SaaS product. Conduct user research, wireframing, and high-fidelity prototyping in Figma.",
    status: "not-applied",
  },
  {
    id: "job-6",
    company: "SecureNet Security",
    title: "Cybersecurity Analyst",
    details: "Chicago, IL • Full-time • $110,000 – $140,000",
    description:
      "Monitor network traffic for anomalies, perform penetration testing, and ensure compliance with industry security standards.",
    status: "not-applied",
  },
  {
    id: "job-7",
    company: "NextGen DevOps",
    title: "DevOps Engineer",
    details: "Austin, TX (Hybrid) • Full-time • $135,000 – $165,000",
    description:
      "Automate CI/CD pipelines, manage cloud infrastructure via Terraform, and ensure 99.99% uptime for core services.",
    status: "not-applied",
  },
  {
    id: "job-8",
    company: "HealthTech Systems",
    title: "Full Stack Developer",
    details: "Remote • Full-time • $120,000 – $155,000",
    description:
      "Build HIPAA-compliant patient portals using Vue.js and Django. Contribute to architecture decisions and mentor junior devs.",
    status: "not-applied",
  },
];

// ── State ──────────────────────────────────────────────────────────────
const STORAGE_KEY = "jobTrackerJobs";
const THEME_KEY = "jobTrackerTheme";
let jobs = loadJobs();
let activeFilter = "all";
let nextId = jobs.length
  ? Math.max(...jobs.map((j) => parseInt(j.id.split("-")[1], 10))) + 1
  : 1;

// ── DOM refs ───────────────────────────────────────────────────────────
const $jobList = document.getElementById("job-list");
const $emptyState = document.getElementById("empty-state");
const $totalCount = document.getElementById("total-count");
const $interviewCount = document.getElementById("interview-count");
const $rejectedCount = document.getElementById("rejected-count");
const $tabJobCount = document.getElementById("tab-job-count");
const $btnAll = document.getElementById("btn-all");
const $btnInterview = document.getElementById("btn-interview");
const $btnRejected = document.getElementById("btn-rejected");
const $themeToggle = document.getElementById("theme-toggle");
const $themeIcon = document.getElementById("theme-icon");
const $themeLabel = document.getElementById("theme-label");
const $addJobBtn = document.getElementById("add-job-btn");
const $addJobModal = document.getElementById("add-job-modal");
const $addJobForm = document.getElementById("add-job-form");
const $modalCancel = document.getElementById("modal-cancel");

// ── Persistence (localStorage) ─────────────────────────────────────────
function loadJobs() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length) return parsed;
    }
  } catch {
    /* corrupted data — fall back to defaults */
  }
  return structuredClone(DEFAULT_JOBS);
}

function saveJobs() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(jobs));
}

// ── Theme ──────────────────────────────────────────────────────────────
function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  const isDark = theme === "dark";
  $themeIcon.className = isDark ? "fa-solid fa-sun" : "fa-solid fa-moon";
  $themeLabel.textContent = isDark ? "Light Mode" : "Dark Mode";
  localStorage.setItem(THEME_KEY, theme);
}

function toggleTheme() {
  const current = document.documentElement.getAttribute("data-theme");
  applyTheme(current === "dark" ? "light" : "dark");
}

function initTheme() {
  const saved = localStorage.getItem(THEME_KEY);
  if (saved) {
    applyTheme(saved);
  } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    applyTheme("dark");
  }
}

// ── Rendering ──────────────────────────────────────────────────────────
function statusBadge(status) {
  const map = {
    "not-applied": { text: "Not Applied", cls: "badge-ghost" },
    interview: { text: "Interview", cls: "badge-success text-success-content" },
    rejected: { text: "Rejected", cls: "badge-error text-error-content" },
  };
  const { text, cls } = map[status] || map["not-applied"];
  return `<span class="badge badge-transition ${cls} badge-md">${text}</span>`;
}

function escapeHtml(str) {
  const el = document.createElement("span");
  el.textContent = str;
  return el.innerHTML;
}

function createJobCard(job) {
  const card = document.createElement("div");
  card.id = job.id;
  card.dataset.status = job.status;
  card.className =
    "card bg-base-100 shadow-sm border border-base-300 hover:shadow-md transition-shadow card-enter";
  card.innerHTML = `
    <div class="card-body p-5 gap-3">
      <div class="flex items-start justify-between gap-3">
        <div class="min-w-0">
          <h2 class="card-title text-base font-semibold leading-tight">${escapeHtml(job.company)}</h2>
          <p class="text-sm text-base-content/70 mt-0.5">${escapeHtml(job.title)}</p>
          ${job.details ? `<p class="text-xs text-base-content/50 mt-0.5">${escapeHtml(job.details)}</p>` : ""}
        </div>
        <button class="btn btn-ghost btn-xs btn-circle text-error hover:bg-error/10 shrink-0 delete-btn" aria-label="Delete job">
          <i class="fa-regular fa-trash-can text-sm"></i>
        </button>
      </div>
      <div>${statusBadge(job.status)}</div>
      ${job.description ? `<p class="text-sm text-base-content/60 leading-relaxed">${escapeHtml(job.description)}</p>` : ""}
      <div class="card-actions mt-1 gap-2">
        <button class="btn btn-outline btn-success btn-sm interview-btn">
          <i class="fa-solid fa-calendar-check text-xs"></i> Interview
        </button>
        <button class="btn btn-outline btn-error btn-sm rejected-btn">
          <i class="fa-solid fa-circle-xmark text-xs"></i> Rejected
        </button>
      </div>
    </div>`;
  return card;
}

function renderJobs() {
  $jobList.innerHTML = "";

  const filtered = jobs.filter((job) => {
    if (activeFilter === "all") return true;
    return job.status === activeFilter;
  });

  filtered.forEach((job) => {
    $jobList.appendChild(createJobCard(job));
  });

  $emptyState.classList.toggle("hidden", filtered.length > 0);
  $jobList.classList.toggle("hidden", filtered.length === 0);
  $tabJobCount.textContent = filtered.length;
  updateCounts();
}

function updateCounts() {
  const total = jobs.length;
  const interviews = jobs.filter((j) => j.status === "interview").length;
  const rejected = jobs.filter((j) => j.status === "rejected").length;

  $totalCount.textContent = total;
  $interviewCount.textContent = interviews;
  $rejectedCount.textContent = rejected;
}

// ── Actions ────────────────────────────────────────────────────────────
function findJob(id) {
  return jobs.find((j) => j.id === id);
}

function setJobStatus(id, newStatus) {
  const job = findJob(id);
  if (!job || job.status === newStatus) return;
  job.status = newStatus;
  saveJobs();
  renderJobs();
}

function deleteJob(id) {
  const card = document.getElementById(id);
  if (card) {
    card.classList.add("card-exit");
    card.addEventListener("animationend", () => {
      jobs = jobs.filter((j) => j.id !== id);
      saveJobs();
      renderJobs();
    });
  }
}

function addJob({ company, title, details, description }) {
  const id = `job-${nextId++}`;
  jobs.unshift({
    id,
    company,
    title,
    details,
    description,
    status: "not-applied",
  });
  saveJobs();
  renderJobs();
}

// ── Filter Tabs ────────────────────────────────────────────────────────
function setFilter(filter) {
  activeFilter = filter;
  [$btnAll, $btnInterview, $btnRejected].forEach((btn) => {
    const isActive = btn.dataset.filter === filter;
    btn.classList.toggle("btn-primary", isActive);
    btn.classList.toggle("btn-ghost", !isActive);
  });
  renderJobs();
}

// ── Event Delegation ───────────────────────────────────────────────────
$jobList.addEventListener("click", (e) => {
  const card = e.target.closest(".card[id]");
  if (!card) return;
  const jobId = card.id;

  if (e.target.closest(".interview-btn")) {
    setJobStatus(jobId, "interview");
  } else if (e.target.closest(".rejected-btn")) {
    setJobStatus(jobId, "rejected");
  } else if (e.target.closest(".delete-btn")) {
    deleteJob(jobId);
  }
});

// Filter buttons
[$btnAll, $btnInterview, $btnRejected].forEach((btn) => {
  btn.addEventListener("click", () => setFilter(btn.dataset.filter));
});

// Theme toggle
$themeToggle.addEventListener("click", toggleTheme);

// ── Add Job Modal ──────────────────────────────────────────────────────
$addJobBtn.addEventListener("click", () => $addJobModal.showModal());
$modalCancel.addEventListener("click", () => $addJobModal.close());

$addJobForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const company = document.getElementById("input-company").value.trim();
  const title = document.getElementById("input-title").value.trim();
  const details = document.getElementById("input-details").value.trim();
  const description = document.getElementById("input-description").value.trim();

  if (!company || !title) return;

  addJob({ company, title, details, description });
  $addJobForm.reset();
  $addJobModal.close();
  setFilter("all");
});

// ── Keyboard accessibility ─────────────────────────────────────────────
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && $addJobModal.open) {
    $addJobModal.close();
  }
});

// ── Initialize ─────────────────────────────────────────────────────────
initTheme();
setFilter("all");
