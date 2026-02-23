let emiChart;

function calculateEMI() {

const P = parseFloat(document.getElementById("loanAmount").value);
const annualRate = parseFloat(document.getElementById("interestRate").value);
const years = parseFloat(document.getElementById("loanTenure").value);

const r = annualRate / 12 / 100;
const n = years * 12;

const EMI = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);

const totalPayment = EMI * n;
const totalInterest = totalPayment - P;

document.getElementById("emiResult").innerText = EMI.toFixed(0);
document.getElementById("totalInterest").innerText = totalInterest.toFixed(0);
document.getElementById("totalPayment").innerText = totalPayment.toFixed(0);

const ctx = document.getElementById("emiChart");

if (emiChart) emiChart.destroy();

emiChart = new Chart(ctx, {
type: "doughnut",
data: {
labels: ["Principal", "Interest"],
datasets: [{
data: [P, totalInterest],
backgroundColor: ["#1e3a8a", "#cbd5e1"]
}]
}
});
}

calculateEMI();
