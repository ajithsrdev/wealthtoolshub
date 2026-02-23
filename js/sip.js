let sipChart;

// Indian number format function
function formatIndianNumber(num) {
    return num.toLocaleString("en-IN");
}

function calculateSIP() {

    const P = parseFloat(document.getElementById("monthlyInvestment").value) || 0;
    const annualRate = parseFloat(document.getElementById("annualReturn").value) || 0;
    const years = parseFloat(document.getElementById("years").value) || 0;

    if (P <= 0 || annualRate <= 0 || years <= 0) {
        alert("Please enter valid values");
        return;
    }

    const r = annualRate / 12 / 100;
    const n = years * 12;

    const FV = P * (((Math.pow(1 + r, n) - 1) / r) * (1 + r));

    const invested = P * n;
    const returns = FV - invested;

    // Apply Indian formatting
    document.getElementById("totalValue").innerText = formatIndianNumber(Math.round(FV));
    document.getElementById("totalInvested").innerText = formatIndianNumber(Math.round(invested));
    document.getElementById("estimatedReturns").innerText = formatIndianNumber(Math.round(returns));

    const ctx = document.getElementById("sipChart");

    if (sipChart) sipChart.destroy();

    sipChart = new Chart(ctx, {
        type: "doughnut",
        data: {
            labels: ["Invested Amount", "Estimated Returns"],
            datasets: [{
                data: [invested, returns],
                backgroundColor: ["#1e3a8a", "#94a3b8"]
            }]
        }
    });
}

// Auto calculate on load
document.addEventListener("DOMContentLoaded", calculateSIP);
