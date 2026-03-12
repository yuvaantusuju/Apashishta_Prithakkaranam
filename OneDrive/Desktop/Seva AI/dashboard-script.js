/* ══════════════════════════════════════════════
   dashboard-script.js  –  Kachara-vibhajanam
   ══════════════════════════════════════════════ */

/* Labels from model metadata: ["plastic","Metal","paper","cardboard","glass","ogranic"]
   Keys cover exact model case AND title-case variants for safety. */
const DISPOSAL = {
  plastic:   "Place in the blue recycling bin. Rinse containers before disposal. Avoid single-use plastics where possible.",
  Plastic:   "Place in the blue recycling bin. Rinse containers before disposal. Avoid single-use plastics where possible.",
  metal:     "Place in the metal/recycling bin. Aluminium cans can be crushed to save space. Take large metal items to a scrap yard.",
  Metal:     "Place in the metal/recycling bin. Aluminium cans can be crushed to save space. Take large metal items to a scrap yard.",
  cardboard: "Flatten boxes and place in the paper/cardboard recycling bin. Keep dry — wet cardboard is not recyclable.",
  Cardboard: "Flatten boxes and place in the paper/cardboard recycling bin. Keep dry — wet cardboard is not recyclable.",
  paper:     "Place in the paper recycling bin. Shred sensitive documents. Avoid recycling greasy or food-soiled paper.",
  Paper:     "Place in the paper recycling bin. Shred sensitive documents. Avoid recycling greasy or food-soiled paper.",
  ogranic:   "Place in the green organic/compost bin. Great for composting at home. Do not mix with plastics or metals.",
  Ogranic:   "Place in the green organic/compost bin. Great for composting at home. Do not mix with plastics or metals.",
  organic:   "Place in the green organic/compost bin. Great for composting at home. Do not mix with plastics or metals.",
  Organic:   "Place in the green organic/compost bin. Great for composting at home. Do not mix with plastics or metals.",
  glass:     "Rinse glass thoroughly and place in the glass recycling bank. Do not place broken glass in regular bins — wrap safely first.",
  Glass:     "Rinse glass thoroughly and place in the glass recycling bank. Do not place broken glass in regular bins — wrap safely first."
};

const BADGE_COLORS = {
  plastic:   { bg: "#e3f2fd", color: "#1565c0" },
  Plastic:   { bg: "#e3f2fd", color: "#1565c0" },
  metal:     { bg: "#fff3e0", color: "#c17000" },
  Metal:     { bg: "#fff3e0", color: "#c17000" },
  cardboard: { bg: "#fce4ec", color: "#c62828" },
  Cardboard: { bg: "#fce4ec", color: "#c62828" },
  paper:     { bg: "#f3e5f5", color: "#6a1b9a" },
  Paper:     { bg: "#f3e5f5", color: "#6a1b9a" },
  ogranic:   { bg: "#e8f5e9", color: "#2e7d32" },
  Ogranic:   { bg: "#e8f5e9", color: "#2e7d32" },
  organic:   { bg: "#e8f5e9", color: "#2e7d32" },
  Organic:   { bg: "#e8f5e9", color: "#2e7d32" },
  glass:     { bg: "#e0f7fa", color: "#00695c" },
  Glass:     { bg: "#e0f7fa", color: "#00695c" }
};

const DOT_COLORS = {
  plastic: "#1565c0", Plastic: "#1565c0",
  metal:   "#c17000", Metal:   "#c17000",
  cardboard: "#c62828", Cardboard: "#c62828",
  paper:   "#6a1b9a", Paper:   "#6a1b9a",
  ogranic: "#2e7d32", Ogranic: "#2e7d32",
  organic: "#2e7d32", Organic: "#2e7d32",
  glass:   "#00695c", Glass:   "#00695c"
};

/* ─── STATE ─── */
let model = null;
let cameraStream = null;
let stats = { scans: 0, uploads: 0, detected: 0 };
let activity = [];
let selectedCategory = null;
let uploadFile = null;

/* ─── LOAD MODEL ─── */
async function loadModel() {
  setModelStatus("loading", "Loading model…");

  if (window.location.protocol === "file:") {
    setModelStatus("error", "Needs server ⚠");
    window.showDiag && window.showDiag(
      "⚠️ <strong>Cannot load model from file://</strong> — Open via a local server.<br>" +
      "Run in your project folder: <code style='background:rgba(255,255,255,0.25);padding:2px 8px;border-radius:4px;'>npx serve .</code> " +
      "then visit <strong>http://localhost:3000/dashboard.html</strong>"
    );
    return;
  }

  try {
    setModelStatus("loading", "Loading TF…");
    if (typeof tf === "undefined") throw new Error("TensorFlow.js did not load. Check internet / ad-blocker.");

    setModelStatus("loading", "Loading TM…");
    if (typeof tmImage === "undefined") throw new Error("Teachable Machine library did not load. Check internet / ad-blocker.");

    setModelStatus("loading", "Loading model files…");
    model = await Promise.race([
      tmImage.load("./model.json", "./metadata.json"),
      new Promise((_, rej) => setTimeout(() => rej(new Error("Timed out — are model.json & metadata.json in the same folder?")), 20000))
    ]);

    console.log("✅ Model loaded. Labels:", model.getClassLabels());
    setModelStatus("ready", "Model ready ✓");

  } catch (err) {
    console.error("❌ Model error:", err.message);
    setModelStatus("error", "Failed ✗");
    window.showDiag && window.showDiag(
      "❌ <strong>Model load failed:</strong> " + err.message + "<br>" +
      "Make sure <code style='background:rgba(255,255,255,0.2);padding:2px 6px;border-radius:3px;'>model.json</code>, " +
      "<code style='background:rgba(255,255,255,0.2);padding:2px 6px;border-radius:3px;'>metadata.json</code> and " +
      "<code style='background:rgba(255,255,255,0.2);padding:2px 6px;border-radius:3px;'>weights.bin</code> " +
      "are in the same folder as dashboard.html"
    );
  }
}

function setModelStatus(state, text) {
  const dot  = document.getElementById("modelStatus").querySelector(".status-dot");
  const span = document.getElementById("modelStatus").querySelector(".status-text");
  dot.className  = "status-dot " + state;
  span.textContent = text;
}

/* ─── SIDEBAR TOGGLE ─── */
const sidebar  = document.getElementById("sidebar");
const layout   = document.getElementById("layout");
const overlay  = document.getElementById("overlay");
const toggleBtn = document.getElementById("toggleBtn");
let sidebarOpen = true;

function isMobile() { return window.innerWidth <= 768; }

toggleBtn.addEventListener("click", () => {
  if (isMobile()) {
    sidebar.classList.toggle("open");
    overlay.classList.toggle("show");
  } else {
    sidebarOpen = !sidebarOpen;
    sidebar.classList.toggle("collapsed", !sidebarOpen);
    layout.classList.toggle("expanded", !sidebarOpen);
  }
});

overlay.addEventListener("click", () => {
  sidebar.classList.remove("open");
  overlay.classList.remove("show");
});

window.addEventListener("resize", () => {
  if (!isMobile()) {
    sidebar.classList.remove("open");
    overlay.classList.remove("show");
    if (sidebarOpen) {
      sidebar.classList.remove("collapsed");
      layout.classList.remove("expanded");
    }
  }
});

/* ─── NAVIGATION ─── */
const PAGE_TITLES = { home: "Home", scan: "Scan", help: "Help", about: "About" };

document.querySelectorAll(".nav-item").forEach(item => {
  item.addEventListener("click", () => {
    const page = item.dataset.page;
    navigateTo(page);
    if (isMobile()) {
      sidebar.classList.remove("open");
      overlay.classList.remove("show");
    }
  });
});

function navigateTo(pageId) {
  document.querySelectorAll(".nav-item").forEach(n => n.classList.remove("active"));
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));

  const target = document.querySelector(`[data-page="${pageId}"]`);
  const page   = document.getElementById("page-" + pageId);
  if (target) target.classList.add("active");
  if (page)   page.classList.add("active");

  const topbarTitle = document.getElementById("topbarTitle");
  if (topbarTitle) topbarTitle.textContent = PAGE_TITLES[pageId] || pageId;
}

/* ─── PREDICT ─── */
async function predict(imgElement) {
  if (!model) { alert("Model is still loading. Please wait a moment."); return; }

  const resultIdle = document.getElementById("resultIdle");
  const resultLoading = document.getElementById("resultLoading");
  const resultData = document.getElementById("resultData");
  
  if (resultIdle) resultIdle.style.display = "none";
  if (resultLoading) resultLoading.style.display = "flex";
  if (resultData) resultData.style.display = "none";

  try {
    const canvas = document.createElement("canvas");
    canvas.width = 224; canvas.height = 224;
    canvas.getContext("2d").drawImage(imgElement, 0, 0, 224, 224);
    const predictions = await model.predict(canvas);
    const best = predictions.reduce((a, b) => a.probability > b.probability ? a : b);

    if (resultLoading) resultLoading.style.display = "none";
    if (resultData) resultData.style.display = "flex";

    const conf    = Math.round(best.probability * 100);
    const label   = best.className;
    const colors  = BADGE_COLORS[label] || { bg: "#f0f4f0", color: "#333" };
    const disposal = DISPOSAL[label] || "Consult local waste management guidelines for proper disposal.";

    const badge = document.getElementById("rBadge");
    if (badge) {
      badge.textContent = label;
      badge.style.background = colors.bg;
      badge.style.color = colors.color;
    }

    const rType = document.getElementById("rType");
    if (rType) rType.textContent = label;
    
    const rConf = document.getElementById("rConf");
    if (rConf) rConf.textContent = conf + "%";
    
    const confFill = document.getElementById("confFill");
    if (confFill) confFill.style.width = conf + "%";
    
    // Store waste type for suggestion page
    sessionStorage.setItem('lastWasteType', label);
    
    // Update disposal box with button
    const disposalBox = document.querySelector(".disposal-box");
    if (disposalBox) {
      disposalBox.innerHTML = `
        <div class="disposal-label">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" width="14" height="14"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
          Suggested Disposal
        </div>
        <button class="btn-suggestion" onclick="window.location.href='suggestion.html?type=${encodeURIComponent(label)}'">
          <span>Go to Suggestion</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" width="16" height="16">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </button>
      `;
    }

    // All predictions mini-bars
    const allPreds = document.getElementById("allPreds");
    if (allPreds) {
      allPreds.innerHTML = predictions
        .sort((a, b) => b.probability - a.probability)
        .map(p => {
          const pct = Math.round(p.probability * 100);
          return `
            <div class="pred-row">
              <span class="pred-name">${p.className}</span>
              <div class="pred-bar-bg"><div class="pred-bar-fill" style="width:${pct}%;background:${DOT_COLORS[p.className] || '#7ec89a'}"></div></div>
              <span class="pred-pct">${pct}%</span>
            </div>`;
        }).join("");
    }

    // Update stats + activity
    stats.scans++;
    stats.detected++;
    updateStats();
    addActivity(label, conf, "scan");

  } catch (err) {
    console.error("Prediction error:", err);
    const resultLoading = document.getElementById("resultLoading");
    const resultIdle = document.getElementById("resultIdle");
    if (resultLoading) resultLoading.style.display = "none";
    if (resultIdle) resultIdle.style.display = "flex";
    alert("Could not analyse image. Please try another photo.");
  }
}

/* ─── CAMERA ─── */
const openCameraBtn = document.getElementById("openCameraBtn");
const captureBtn    = document.getElementById("captureBtn");
const cameraFeed    = document.getElementById("cameraFeed");
const scanCanvas    = document.getElementById("scanCanvas");
const scanPreviewImg = document.getElementById("scanPreviewImg");
const scanPlaceholder = document.getElementById("scanPlaceholder");

if (openCameraBtn) {
  openCameraBtn.addEventListener("click", async () => {
    try {
      cameraStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
      cameraFeed.srcObject = cameraStream;
      cameraFeed.style.display = "block";
      scanPreviewImg.style.display = "none";
      scanPlaceholder.style.display = "none";
      openCameraBtn.style.display = "none";
    captureBtn.style.display    = "inline-flex";
  } catch (err) {
    alert("Camera access denied. Please allow camera permissions or use 'Upload Image'.");
  }
  });
}

if (captureBtn) {
  captureBtn.addEventListener("click", () => {
    const w = cameraFeed.videoWidth;
    const h = cameraFeed.videoHeight;
    scanCanvas.width  = w;
    scanCanvas.height = h;
    const ctx = scanCanvas.getContext("2d");
    ctx.drawImage(cameraFeed, 0, 0, w, h);

    const dataURL = scanCanvas.toDataURL("image/jpeg");
    scanPreviewImg.src = dataURL;
    scanPreviewImg.style.display = "block";
    cameraFeed.style.display = "none";
    scanPlaceholder.style.display = "none";

    if (cameraStream) { cameraStream.getTracks().forEach(t => t.stop()); cameraStream = null; }
    openCameraBtn.style.display = "inline-flex";
    captureBtn.style.display    = "none";

    scanPreviewImg.onload = () => predict(scanPreviewImg);
  });
}

/* ─── SCAN FILE UPLOAD ─── */
const scanFileInput = document.getElementById("scanFileInput");
if (scanFileInput) {
  scanFileInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    scanPreviewImg.src = url;
    scanPreviewImg.style.display  = "block";
    cameraFeed.style.display      = "none";
    scanPlaceholder.style.display = "none";

    scanPreviewImg.onload = () => predict(scanPreviewImg);
  });
}

/* Category chips */
const catChipsContainer = document.getElementById("catChips");
if (catChipsContainer) {
  document.querySelectorAll("#catChips .chip").forEach(chip => {
    chip.addEventListener("click", () => {
      document.querySelectorAll("#catChips .chip").forEach(c => c.classList.remove("selected"));
      chip.classList.add("selected");
      selectedCategory = chip.dataset.cat;
    });
  });
}

/* Submit */
const submitUploadBtn = document.getElementById("submitUploadBtn");
if (submitUploadBtn) {
  submitUploadBtn.addEventListener("click", () => {
    if (!uploadFile)        { alert("Please select an image to upload."); return; }
    if (!selectedCategory)  { alert("Please select a category."); return; }

    stats.uploads++;
    stats.detected++;
    updateStats();
    addActivity(selectedCategory, null, "upload");

    const ok = document.getElementById("uploadOk");
    if (ok) {
      ok.style.display = "block";
      setTimeout(() => { ok.style.display = "none"; }, 3000);
    }

    // reset
    const removeUploadBtn = document.getElementById("removeUploadBtn");
    if (removeUploadBtn) removeUploadBtn.click();
    document.querySelectorAll("#catChips .chip").forEach(c => c.classList.remove("selected"));
    const uploadNotes = document.getElementById("uploadNotes");
    if (uploadNotes) uploadNotes.value = "";
    selectedCategory = null;
  });
}

/* ─── STATS ─── */
function updateStats() {
  const totalScans = document.getElementById("totalScans");
  if (totalScans) totalScans.textContent = stats.scans;
  
  const totalUploads = document.getElementById("totalUploads");
  if (totalUploads) totalUploads.textContent = stats.uploads;
  
  const totalDetected = document.getElementById("totalDetected");
  if (totalDetected) totalDetected.textContent = stats.detected;
}

/* ─── ACTIVITY ─── */
function addActivity(label, conf, type) {
  const item = { label, conf, type, time: new Date() };
  activity.unshift(item);
  if (activity.length > 10) activity.pop();
  renderActivity();
}

function renderActivity() {
  const list = document.getElementById("activityList");
  if (!list) return;
  
  if (!activity.length) {
    list.innerHTML = '<div class="activity-empty">No scans yet — get started above!</div>';
    return;
  }
  list.innerHTML = activity.map(item => {
    const dot   = DOT_COLORS[item.label] || "#7ec89a";
    const confStr = item.conf !== null ? item.conf + "% confidence" : "Manually logged";
    const typeStr = item.type === "scan" ? "Scanned" : "Uploaded";
    const timeStr = item.time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    return `
      <div class="activity-row">
        <div class="act-dot" style="background:${dot}"></div>
        <div class="act-info">
          <div class="act-name">${item.label}</div>
          <div class="act-sub">${typeStr} · ${confStr}</div>
        </div>
        <div class="act-conf">${timeStr}</div>
      </div>`;
  }).join("");
}

/* ─── FAQ ─── */
function toggleFaq(btn) {
  const answer = btn.nextElementSibling;
  const isOpen = answer.classList.contains("open");
  document.querySelectorAll(".faq-a").forEach(a => a.classList.remove("open"));
  document.querySelectorAll(".faq-q").forEach(b => b.classList.remove("open"));
  if (!isOpen) { answer.classList.add("open"); btn.classList.add("open"); }
}

/* ─── INIT ─── */
window.addEventListener("DOMContentLoaded", () => {
  updateStats();
  if (isMobile()) {
    sidebarOpen = false;
    sidebar.classList.remove("open");
  }

  // Hook into sequential loader: TF.js → tmImage → loadModel
  // If tmImage already loaded (fast CDN), call loadModel immediately
  // Otherwise wait for __startModel callback
  window.__startModel = loadModel;
  if (window.__modelReady) {
    loadModel();
  }
  // If neither fired yet, __startModel will be called by the inline script after tmImage loads
});
