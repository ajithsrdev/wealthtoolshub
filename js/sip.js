let sipChart;

function calculateSIP() {

const P = parseFloat(document.getElementById("monthlyInvestment").value);
const annualRate = parseFloat(document.getElementById("annualReturn").value);
const years = parseFloat(document.getElementById("years").value);

const r = annualRate / 12 / 100;
const n = years * 12;

const FV = P * (((Math.pow(1 + r, n) - 1) / r) * (1 + r));

const invested = P * n;
const returns = FV - invested;

document.getElementById("totalValue").innerText = FV.toFixed(0);
document.getElementById("totalInvested").innerText = invested.toFixed(0);
document.getElementById("estimatedReturns").innerText = returns.toFixed(0);

const ctx = document.getElementById("sipChart");

if (sipChart) sipChart.destroy();

sipChart = new Chart(ctx, {
type: "doughnut",
data: {
labels: ["Invested Amount", "Estimated Returns"],
datasets: [{
data: [invested, returns],
backgroundColor: ["#1e3a8a", "#cbd5e1"]
}]
}
});
}

calculateSIP();
