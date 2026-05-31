document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Elements ---
    const inputTeamSize = document.getElementById('input-team-size');
    const inputHourlyWage = document.getElementById('input-hourly-wage');
    const inputManualHours = document.getElementById('input-manual-hours');
    const inputAgencyCost = document.getElementById('input-agency-cost');

    const valTeamSize = document.getElementById('val-team-size');
    const valHourlyWage = document.getElementById('val-hourly-wage');
    const valManualHours = document.getElementById('val-manual-hours');
    const valAgencyCost = document.getElementById('val-agency-cost');

    const counterSavings = document.getElementById('counter-savings');
    const valHoursSaved = document.getElementById('val-hours-saved');
    const valRoiRatio = document.getElementById('val-roi-ratio');
    
    const lblManualCost = document.getElementById('lbl-manual-cost');
    const lblAutomatedCost = document.getElementById('lbl-automated-cost');
    const barManual = document.getElementById('bar-manual');
    const barAutomated = document.getElementById('bar-automated');
    const valPaybackMonths = document.getElementById('val-payback-months');
    const ctaDynamicPitch = document.getElementById('cta-dynamic-pitch');

    // --- State variables ---
    let currentSavingsVal = 0;
    let animationFrameId = null;

    // --- Value Smooth Animation ---
    function animateValue(targetVal, duration = 350) {
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
        }

        const startVal = currentSavingsVal;
        const diff = targetVal - startVal;
        if (diff === 0) {
            counterSavings.innerText = targetVal.toLocaleString('en-US');
            return;
        }

        const startTime = performance.now();

        function step(timestamp) {
            const elapsed = timestamp - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing Out Quad
            const ease = progress * (2 - progress);
            const current = Math.floor(startVal + diff * ease);
            
            counterSavings.innerText = current.toLocaleString('en-US');
            currentSavingsVal = current;

            if (progress < 1) {
                animationFrameId = requestAnimationFrame(step);
            } else {
                counterSavings.innerText = targetVal.toLocaleString('en-US');
                currentSavingsVal = targetVal;
            }
        }

        animationFrameId = requestAnimationFrame(step);
    }

    // --- Core Calculation Logic ---
    function updateCalculator() {
        const teamSize = parseInt(inputTeamSize.value);
        const hourlyWage = parseInt(inputHourlyWage.value);
        const manualHours = parseInt(inputManualHours.value);
        const agencyCost = parseInt(inputAgencyCost.value);

        // Update Slider Badge Values
        valTeamSize.innerText = teamSize;
        valHourlyWage.innerText = hourlyWage;
        valManualHours.innerText = manualHours;
        valAgencyCost.innerText = agencyCost.toLocaleString('en-US');

        // Business Math
        // 1. Current manual costs per year
        const manualCost = teamSize * hourlyWage * manualHours * 52;
        
        // 2. Weekly hours saved assuming 75% process automation efficiency
        const hoursSavedPerYear = Math.round(teamSize * (manualHours * 0.75) * 52);
        
        // 3. Gross dollars saved
        const grossSavings = Math.round(hoursSavedPerYear * hourlyWage);
        
        // 4. Net Savings
        const netSavings = Math.max(0, grossSavings - agencyCost);
        
        // 5. ROI Multiplier (Gross Savings / Annual Budget)
        const roiRatio = agencyCost > 0 ? (grossSavings / agencyCost).toFixed(1) : '0.0';
        
        // 6. Payback period in months
        const paybackMonths = grossSavings > 0 ? ((agencyCost / grossSavings) * 12).toFixed(1) : '0.0';

        // Animate primary counter
        animateValue(netSavings);

        // Update other metrics
        valHoursSaved.innerText = hoursSavedPerYear.toLocaleString('en-US');
        valRoiRatio.innerText = roiRatio;
        lblManualCost.innerText = '$' + manualCost.toLocaleString('en-US');
        lblAutomatedCost.innerText = '$' + agencyCost.toLocaleString('en-US');
        valPaybackMonths.innerText = paybackMonths;

        // Animate Cost Comparison Bar Widths
        const maxCost = Math.max(manualCost, agencyCost);
        if (maxCost > 0) {
            const manualWidth = (manualCost / maxCost) * 100;
            const automatedWidth = (agencyCost / maxCost) * 100;
            
            barManual.style.width = manualWidth + '%';
            barAutomated.style.width = automatedWidth + '%';
        } else {
            barManual.style.width = '0%';
            barAutomated.style.width = '0%';
        }

        // Dynamic CRM Outbound Pitch Text
        ctaDynamicPitch.innerHTML = `Based on your team size of <strong>${teamSize} employees</strong>, your current manual tasks are costing you an estimated <strong>$${manualCost.toLocaleString('en-US')}</strong> in labor overhead every single year. By automating, you reclaim <strong>${hoursSavedPerYear.toLocaleString('en-US')} hours</strong> of high-value time, saving you <strong>$${netSavings.toLocaleString('en-US')}</strong> net after tech investments. Let us build custom, secure, autonomous AI receptionists and webhook automation pipelines for your brand!`;
    }

    // --- Slider Listeners ---
    inputTeamSize.addEventListener('input', updateCalculator);
    inputHourlyWage.addEventListener('input', updateCalculator);
    inputManualHours.addEventListener('input', updateCalculator);
    inputAgencyCost.addEventListener('input', updateCalculator);

    // Initial Execution
    updateCalculator();
});
