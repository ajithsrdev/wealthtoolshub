let emiChart;

// Indian number formatter
function formatIndianNumber(num) {
    return num.toLocaleString("en-IN");
}

function calculateEMI() {

    const P = parseFloat(document.getElementById("loanAmount").value) || 0;
    const annualRate = parseFloat(document.getElementById("interestRate").value) || 0;
    const years = parseFloat(document.getElementById("loanTenure").value) || 0;

    if (P <= 0 || annualRate <= 0 || years <= 0) {
        alert("Please enter valid values");
        return;
    }

    const r = annualRate / 12 / 100;
    const n = years * 12;

    const EMI = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);

    const totalPayment = EMI * n;
    const totalInterest = totalPayment - P;

    // Apply Indian format
    document.getElementById("emiResult").innerText = formatIndianNumber(Math.round(EMI));
    document.getElementById("totalInterest").innerText = formatIndianNumber(Math.round(totalInterest));
    document.getElementById("totalPayment").innerText = formatIndianNumber(Math.round(totalPayment));

    const ctx = document.getElementById("emiChart");

    if (emiChart) emiChart.destroy();

    emiChart = new Chart(ctx, {
        type: "doughnut",
        data: {
            labels: ["Principal", "Interest"],
            datasets: [{
                data: [P, totalInterest],
                backgroundColor: ["#1e3a8a", "#94a3b8"]
            }]
        }
    });
}

// Auto calculate on load
document.addEventListener("DOMContentLoaded", calculateEMI);
