/* ═══════════════════════════════════════════════════════
   suggestion-script.js  –  Apashishta Prithakkaranam
   ═══════════════════════════════════════════════════════ */

const DISPOSAL_DETAILS = {
  plastic: {
    title: "Plastic Waste",
    disposal: "Place in the blue recycling bin. Rinse containers before disposal. Avoid single-use plastics where possible.",
    tips: [
      "Rinse containers before recycling to prevent contamination",
      "Remove caps and lids — these often require different processing",
      "Do NOT place plastic bags in curbside bins (they jam equipment)",
      "Crush plastic bottles to save space in your bin",
      "Check for recycling symbols (1-7) — some plastics are not accepted"
    ],
    what: "Plastic includes water bottles, food containers, bags, packaging, and more.",
    environmental: "Plastic takes 400-1000 years to decompose. Recycling reduces landfill waste and saves petroleum resources."
  },
  Plastic: {
    title: "Plastic Waste",
    disposal: "Place in the blue recycling bin. Rinse containers before disposal. Avoid single-use plastics where possible.",
    tips: [
      "Rinse containers before recycling to prevent contamination",
      "Remove caps and lids — these often require different processing",
      "Do NOT place plastic bags in curbside bins (they jam equipment)",
      "Crush plastic bottles to save space in your bin",
      "Check for recycling symbols (1-7) — some plastics are not accepted"
    ],
    what: "Plastic includes water bottles, food containers, bags, packaging, and more.",
    environmental: "Plastic takes 400-1000 years to decompose. Recycling reduces landfill waste and saves petroleum resources."
  },
  metal: {
    title: "Metal Waste",
    disposal: "Place in the metal/recycling bin. Aluminium cans can be crushed to save space. Take large metal items to a scrap yard.",
    tips: [
      "Rinse aluminium cans and steel containers before recycling",
      "Crush cans to save space in your bin",
      "Remove any plastic or rubber components before recycling",
      "Large metal items (appliances, furniture) should go to a scrap yard",
      "Separate ferrous metals (iron-based) from non-ferrous (like aluminium)"
    ],
    what: "Metal waste includes cans (aluminium, steel), foil, automotive parts, and metal scraps.",
    environmental: "Recycling one aluminium can saves enough energy to power a laptop for 3 hours. Metal can be recycled infinitely without quality loss."
  },
  Metal: {
    title: "Metal Waste",
    disposal: "Place in the metal/recycling bin. Aluminium cans can be crushed to save space. Take large metal items to a scrap yard.",
    tips: [
      "Rinse aluminium cans and steel containers before recycling",
      "Crush cans to save space in your bin",
      "Remove any plastic or rubber components before recycling",
      "Large metal items (appliances, furniture) should go to a scrap yard",
      "Separate ferrous metals (iron-based) from non-ferrous (like aluminium)"
    ],
    what: "Metal waste includes cans (aluminium, steel), foil, automotive parts, and metal scraps.",
    environmental: "Recycling one aluminium can saves enough energy to power a laptop for 3 hours. Metal can be recycled infinitely without quality loss."
  },
  cardboard: {
    title: "Cardboard & Boxes",
    disposal: "Flatten boxes and place in the paper/cardboard recycling bin. Keep dry — wet cardboard is not recyclable.",
    tips: [
      "Flatten all cardboard boxes to reduce volume",
      "Remove all plastic bubble wrap, styrofoam, and tape",
      "Keep cardboard dry — wet cardboard cannot be recycled",
      "Remove any food contamination before recycling",
      "Bundle loose cardboard with twine if not using a bin"
    ],
    what: "Cardboard includes shipping boxes, paper bags, egg cartons, and corrugated packaging.",
    environmental: "Recycled cardboard uses 25% less energy than making new cardboard. It can be recycled 5-7 times before fiber quality degrades."
  },
  Cardboard: {
    title: "Cardboard & Boxes",
    disposal: "Flatten boxes and place in the paper/cardboard recycling bin. Keep dry — wet cardboard is not recyclable.",
    tips: [
      "Flatten all cardboard boxes to reduce volume",
      "Remove all plastic bubble wrap, styrofoam, and tape",
      "Keep cardboard dry — wet cardboard cannot be recycled",
      "Remove any food contamination before recycling",
      "Bundle loose cardboard with twine if not using a bin"
    ],
    what: "Cardboard includes shipping boxes, paper bags, egg cartons, and corrugated packaging.",
    environmental: "Recycled cardboard uses 25% less energy than making new cardboard. It can be recycled 5-7 times before fiber quality degrades."
  },
  paper: {
    title: "Paper Waste",
    disposal: "Place in the paper recycling bin. Shred sensitive documents. Avoid recycling greasy or food-soiled paper.",
    tips: [
      "Shred sensitive documents containing personal information",
      "Do NOT recycle paper with food stains or grease",
      "Remove plastic windows from envelopes",
      "Avoid glossy or coated paper (use regular material recycling)",
      "Group paper with other cardboard for efficient collection"
    ],
    what: "Paper includes newspapers, magazines, office paper, notebooks, and cardboard.",
    environmental: "It takes 24 trees to make 1 ton of paper. Recycling 1 ton of paper saves 17 trees, 7000 gallons of water, and 4100 kWh of energy."
  },
  Paper: {
    title: "Paper Waste",
    disposal: "Place in the paper recycling bin. Shred sensitive documents. Avoid recycling greasy or food-soiled paper.",
    tips: [
      "Shred sensitive documents containing personal information",
      "Do NOT recycle paper with food stains or grease",
      "Remove plastic windows from envelopes",
      "Avoid glossy or coated paper (use regular material recycling)",
      "Group paper with other cardboard for efficient collection"
    ],
    what: "Paper includes newspapers, magazines, office paper, notebooks, and cardboard.",
    environmental: "It takes 24 trees to make 1 ton of paper. Recycling 1 ton of paper saves 17 trees, 7000 gallons of water, and 4100 kWh of energy."
  },
  organic: {
    title: "Organic & Biodegradable Waste",
    disposal: "Place in the green organic/compost bin. Great for composting at home. Do not mix with plastics or metals.",
    tips: [
      "Include fruit & vegetable scraps, eggshells, tea bags, and coffee grounds",
      "Avoid meat, dairy, and oils (they can attract pests)",
      "Shred large items to speed up decomposition",
      "Layer 'green' (wet) and 'brown' (dry) materials for best results",
      "Consider home composting if you generate lots of organic waste"
    ],
    what: "Organic waste includes food scraps, garden trimmings, leaves, grass clippings, and biodegradable packaging.",
    environmental: "Composting organic waste diverts 30% of household waste from landfills. Compost enriches soil and reduces need for chemical fertilizers."
  },
  Organic: {
    title: "Organic & Biodegradable Waste",
    disposal: "Place in the green organic/compost bin. Great for composting at home. Do not mix with plastics or metals.",
    tips: [
      "Include fruit & vegetable scraps, eggshells, tea bags, and coffee grounds",
      "Avoid meat, dairy, and oils (they can attract pests)",
      "Shred large items to speed up decomposition",
      "Layer 'green' (wet) and 'brown' (dry) materials for best results",
      "Consider home composting if you generate lots of organic waste"
    ],
    what: "Organic waste includes food scraps, garden trimmings, leaves, grass clippings, and biodegradable packaging.",
    environmental: "Composting organic waste diverts 30% of household waste from landfills. Compost enriches soil and reduces need for chemical fertilizers."
  },
  ogranic: {
    title: "Organic & Biodegradable Waste",
    disposal: "Place in the green organic/compost bin. Great for composting at home. Do not mix with plastics or metals.",
    tips: [
      "Include fruit & vegetable scraps, eggshells, tea bags, and coffee grounds",
      "Avoid meat, dairy, and oils (they can attract pests)",
      "Shred large items to speed up decomposition",
      "Layer 'green' (wet) and 'brown' (dry) materials for best results",
      "Consider home composting if you generate lots of organic waste"
    ],
    what: "Organic waste includes food scraps, garden trimmings, leaves, grass clippings, and biodegradable packaging.",
    environmental: "Composting organic waste diverts 30% of household waste from landfills. Compost enriches soil and reduces need for chemical fertilizers."
  },
  Ogranic: {
    title: "Organic & Biodegradable Waste",
    disposal: "Place in the green organic/compost bin. Great for composting at home. Do not mix with plastics or metals.",
    tips: [
      "Include fruit & vegetable scraps, eggshells, tea bags, and coffee grounds",
      "Avoid meat, dairy, and oils (they can attract pests)",
      "Shred large items to speed up decomposition",
      "Layer 'green' (wet) and 'brown' (dry) materials for best results",
      "Consider home composting if you generate lots of organic waste"
    ],
    what: "Organic waste includes food scraps, garden trimmings, leaves, grass clippings, and biodegradable packaging.",
    environmental: "Composting organic waste diverts 30% of household waste from landfills. Compost enriches soil and reduces need for chemical fertilizers."
  },
  glass: {
    title: "Glass Waste",
    disposal: "Rinse glass thoroughly and place in the glass recycling bank. Do not place broken glass in regular bins — wrap safely first.",
    tips: [
      "Rinse all glass containers thoroughly before recycling",
      "Remove caps, lids, and labels if possible",
      "For broken glass: wrap in newspaper and place in regular trash (for safety)",
      "Do NOT mix glass with other recyclables (it contaminates them)",
      "Bring broken glass to a separate collection point if available"
    ],
    what: "Glass includes beverage bottles, food jars, drinking glasses, and containers.",
    environmental: "Glass is 100% recyclable and can be recycled infinitely without losing purity or strength. Recycling saves 30% of production energy."
  },
  Glass: {
    title: "Glass Waste",
    disposal: "Rinse glass thoroughly and place in the glass recycling bank. Do not place broken glass in regular bins — wrap safely first.",
    tips: [
      "Rinse all glass containers thoroughly before recycling",
      "Remove caps, lids, and labels if possible",
      "For broken glass: wrap in newspaper and place in regular trash (for safety)",
      "Do NOT mix glass with other recyclables (it contaminates them)",
      "Bring broken glass to a separate collection point if available"
    ],
    what: "Glass includes beverage bottles, food jars, drinking glasses, and containers.",
    environmental: "Glass is 100% recyclable and can be recycled infinitely without losing purity or strength. Recycling saves 30% of production energy."
  },
  ewaste: {
    title: "E-Waste (Electronic Waste)",
    disposal: "Never throw electronics in the regular bin. Take them to an authorised e-waste collection centre, manufacturer take-back programme, or a certified recycler. Many electronics stores in India accept old devices.",
    tips: [
      "Remove personal data by factory-resetting devices before disposal",
      "Keep the original battery with the device — do not remove it unless instructed",
      "Look for E-Waste collection drives by CPCB-authorised recyclers near you",
      "Check if the manufacturer offers a buy-back or exchange scheme",
      "Store e-waste in a dry place away from children until you can drop it off",
      "Never burn or dismantle electronics at home — toxic fumes are released"
    ],
    what: "E-waste includes mobile phones, laptops, tablets, chargers, cables, batteries, televisions, refrigerators, washing machines, printers, and any other electrical or electronic equipment.",
    environmental: "E-waste is the world's fastest-growing waste stream — over 62 million tonnes generated in 2022. Electronics contain lead, mercury, cadmium, and arsenic that leach into soil and groundwater. Proper recycling recovers gold, silver, copper, and rare earth metals, reducing the need for destructive mining."
  },
  Ewaste: {
    title: "E-Waste (Electronic Waste)",
    disposal: "Never throw electronics in the regular bin. Take them to an authorised e-waste collection centre, manufacturer take-back programme, or a certified recycler. Many electronics stores in India accept old devices.",
    tips: [
      "Remove personal data by factory-resetting devices before disposal",
      "Keep the original battery with the device — do not remove it unless instructed",
      "Look for E-Waste collection drives by CPCB-authorised recyclers near you",
      "Check if the manufacturer offers a buy-back or exchange scheme",
      "Store e-waste in a dry place away from children until you can drop it off",
      "Never burn or dismantle electronics at home — toxic fumes are released"
    ],
    what: "E-waste includes mobile phones, laptops, tablets, chargers, cables, batteries, televisions, refrigerators, washing machines, printers, and any other electrical or electronic equipment.",
    environmental: "E-waste is the world's fastest-growing waste stream — over 62 million tonnes generated in 2022. Electronics contain lead, mercury, cadmium, and arsenic that leach into soil and groundwater. Proper recycling recovers gold, silver, copper, and rare earth metals, reducing the need for destructive mining."
  }
};

const BADGE_COLORS = {
  plastic:   "#1565c0",
  Plastic:   "#1565c0",
  metal:     "#c17000",
  Metal:     "#c17000",
  cardboard: "#c62828",
  Cardboard: "#c62828",
  paper:     "#6a1b9a",
  Paper:     "#6a1b9a",
  ogranic:   "#2e7d32",
  Ogranic:   "#2e7d32",
  organic:   "#2e7d32",
  Organic:   "#2e7d32",
  glass:     "#00695c",
  Glass:     "#00695c",
  ewaste:    "#880e4f",
  Ewaste:    "#880e4f",
  "e-waste": "#880e4f",
  "E-waste": "#880e4f"
};

/* ── LOAD & RENDER SUGGESTION ── */
function loadSuggestion() {
  const params = new URLSearchParams(window.location.search);
  let wasteType = params.get('type');

  // Fallback to sessionStorage
  if (!wasteType) {
    wasteType = sessionStorage.getItem('lastWasteType');
  }

  if (!wasteType) {
    document.getElementById('suggestionContent').innerHTML = `
      <div class="error-message">
        <strong>No waste type selected.</strong><br>
        <a href="dashboard.html" style="color: inherit; text-decoration: underline;">Return to Dashboard and scan an item first.</a>
      </div>`;
    return;
  }

  const details = DISPOSAL_DETAILS[wasteType];

  if (!details) {
    document.getElementById('suggestionContent').innerHTML = `
      <div class="error-message">
        <strong>Unknown waste type: "${wasteType}"</strong><br>
        <a href="dashboard.html" style="color: inherit; text-decoration: underline;">Return to Dashboard and try again.</a>
      </div>`;
    return;
  }

  // Badge colour
  const badgeColor = BADGE_COLORS[wasteType] || '#2e7d32';
  const bgColor = ['#e3f2fd', '#fff3e0', '#fce4ec', '#f3e5f5', '#e8f5e9', '#e0f7fa']
    .find(c => c.includes(badgeColor.slice(0, 3))) || '#f0f4f0';

  // Page title
  document.getElementById('sugTitle').textContent = details.title;

  // Waste type badge
  document.getElementById('wasteTypeContainer').innerHTML = `
    <div class="waste-type-badge" style="background-color: ${bgColor}; color: ${badgeColor};">
      ${wasteType.charAt(0).toUpperCase() + wasteType.slice(1)}
    </div>`;

  // Main content
  document.getElementById('suggestionContent').innerHTML = `
    <div class="disposal-section">
      <h3>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" width="20" height="20">
          <polyline points="9 11 12 14 22 4"></polyline>
          <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
        </svg>
        Disposal Method
      </h3>
      <p>${details.disposal}</p>
    </div>

    <div class="disposal-section">
      <h3>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" width="20" height="20">
          <polyline points="12 1 3 7 3 17 21 17 21 7 12 1"></polyline>
        </svg>
        What is considered ${wasteType.toLowerCase()}?
      </h3>
      <p>${details.what}</p>
    </div>

    <div class="tips-box">
      <h4>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" width="16" height="16">
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M12 6v6l4 2"></path>
        </svg>
        Disposal Tips
      </h4>
      <ul style="list-style: none; padding: 0; margin: 12px 0 0 0;">
        ${details.tips.map(tip => `
          <li style="padding: 6px 0; padding-left: 24px; position: relative; color: var(--muted); font-size: 0.9rem;">
            <span style="position: absolute; left: 0; color: var(--leaf); font-weight: bold;">✓</span>
            ${tip}
          </li>`).join('')}
      </ul>
    </div>

    <div class="disposal-section">
      <h3>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" width="20" height="20">
          <path d="M12 2a10 10 0 1 0 20 0 10 10 0 0 0-20 0"></path>
          <path d="M12 6v6l4 2"></path>
        </svg>
        🌍 Environmental Impact
      </h3>
      <p><strong>${details.environmental}</strong></p>
    </div>`;
}

/* ── SIDEBAR ── */
const sidebar   = document.getElementById('sidebar');
const overlay   = document.getElementById('overlay');
const toggleBtn = document.getElementById('toggleBtn');
let sidebarOpen = true;

function isMobile() { return window.innerWidth <= 768; }

toggleBtn.addEventListener('click', () => {
  if (isMobile()) {
    sidebar.classList.toggle('open');
    overlay.classList.toggle('show');
  } else {
    sidebarOpen = !sidebarOpen;
    sidebar.classList.toggle('collapsed', !sidebarOpen);
    document.getElementById('layout').classList.toggle('expanded', !sidebarOpen);
  }
});

overlay.addEventListener('click', () => {
  sidebar.classList.remove('open');
  overlay.classList.remove('show');
});

window.addEventListener('resize', () => {
  if (!isMobile()) {
    sidebar.classList.remove('open');
    overlay.classList.remove('show');
    if (sidebarOpen) {
      sidebar.classList.remove('collapsed');
      document.getElementById('layout').classList.remove('expanded');
    }
  }
});

/* ── INIT ── */
window.addEventListener('DOMContentLoaded', loadSuggestion);
