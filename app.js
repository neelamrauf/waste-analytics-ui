// =====================================================================
// 🏢 1. SYSTEM BASE REFERENCE LOOKUP (KNOWLEDGE BASE)
// =====================================================================
const lookupRules = {
    "Single-Use-Plastic": { Action: "Replace", Alternative: "Mycelium Packaging", ImpactScore: 9.2, BaseCostFactor: 2.1 },
    "Scrap-Aluminium": { Action: "Recycle", Alternative: "Smelter Closed Loop", ImpactScore: 8.5, BaseCostFactor: 1.4 },
    "Organic-Sludge": { Action: "Divert", Alternative: "Anaerobic Digester Composting", ImpactScore: 7.8, BaseCostFactor: 0.9 },
    "Cardboard-Boxes": { Action: "Reuse", Alternative: "Returnable Plastic Pallets", ImpactScore: 6.4, BaseCostFactor: 0.6 },
    "Toxic-Solvents": { Action: "Neutralize", Alternative: "Bio-Based Solvents", ImpactScore: 9.5, BaseCostFactor: 3.4 }
};

const facilityModifiers = {
    "Textile-Plant-Alpha": 1.05,
    "Automotive-Assembly-B": 1.25,
    "Chemicals-Unit-Z": 1.40,
    "Food-Pack-Delta": 0.95
};

// =====================================================================
// 🎮 2. RUNTIME PIPELINE EXECUTION ENGINE
// =====================================================================
document.getElementById('pipeline-form').addEventListener('submit', function(e) {
    e.preventDefault(); // Intercept form dispatch safely

    // Fetch user-defined interface values
    const selectedFacility = document.getElementById('facility').value;
    const selectedMaterial = document.getElementById('material').value;
    const massValue = parseFloat(document.getElementById('mass').value);

    // Fetch knowledge metrics block
    const context = lookupRules[selectedMaterial];
    const facilityMod = facilityModifiers[selectedFacility];

    // Execution Core Logic Block (Simulating Random Forest Regression mathematically)
    const rawCostForecast = (massValue * context.BaseCostFactor * facilityMod) + (context.ImpactScore * 12.5);
    const finalizedCost = rawCostForecast.toFixed(2);
    
    // Evaluate Custom Eco Index Formula
    const computedMitigationIndex = ((massValue * context.ImpactScore) / 100).toFixed(3);

    // Render Metrics metrics smoothly to dashboard output zones
    document.getElementById('forecast-output').innerHTML = `$${parseFloat(finalizedCost).toLocaleString()} <span class="currency">USD</span>`;
    document.getElementById('mitigation-output').innerText = computedMitigationIndex;

    // Trigger Generative LLM Report Simulation
    compileAIExecutiveBrief(selectedFacility, selectedMaterial, massValue, context, computedMitigationIndex);
});

// =====================================================================
// 💬 3. CONTEXT EXTENSION REPORT SYNTHESIZER
// =====================================================================
function compileAIExecutiveBrief(facility, material, mass, config, index) {
    const consoleElement = document.getElementById('llm-console');
    const currentDate = new Date().toISOString().split('T')[0];

    const structuredBrief = `========================================================================
🌿 SUSTAINABILITY ADVISOR AI REPORT | COMPILED: ${currentDate}
========================================================================
[WORKSPACE LAYER]: Core Matrix Context Engine Init.
[SYSTEM LOGIC]: Analyzing telemetry streams for cross-compliance deployment.

[METRICS PARSING]
--> Manufacturing Asset: ${facility}
--> Active Stream Token: '${material}'
--> Processed Batch Mass: ${mass.toLocaleString()} KG

[STRATEGIC DIRECTIVE MAP]: **${config.Action.toUpperCase()}**
--> Engineering Substitute Substitute: ${config.Alternative}
--> Priority Assessment Matrix Score: ${config.ImpactScore}/10
--> Derived Mitigation Carbon Metric: ${index} Units

[EXECUTIVE LOGISTICS DIRECTIVE]
Based on the optimization run executed, continuing the disposal track for '${material}' introduces unnecessary overhead bounds. 

Transitioning this inventory stream to '${config.Alternative}' will validate enterprise environment indexes and mitigate resource depletion channels. Engineering operators are requested to review these deployment vectors immediately.
========================================================================`;

    consoleElement.innerText = structuredBrief;
}
