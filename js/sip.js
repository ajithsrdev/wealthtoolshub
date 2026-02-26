let sipChart;

function formatIndian(num) {
  return num.toLocaleString("en-IN");
}

function calculateSIP() {
  const P = parseFloat(document.getElementById("monthlyInvestment").value) || 0;
  const annualRate = parseFloat(document.getElementById("annualReturn").value) || 0;
  const years = parseFloat(document.getElementById("years").value) || 0;

  const r = annualRate / 12 / 100;
  const n = years * 12;

  // ✅ FIX Bug 2: Handle zero interest rate (avoids division by zero / NaN)
  let FV = 0;
  if (r === 0) {
    FV = P * n;
  } else {
    FV = P * (((Math.pow(1 + r, n) - 1) / r) * (1 + r));
  }

  const invested = P * n;
  const returns = FV - invested;

  document.getElementById("totalValue").innerText = formatIndian(Math.round(FV));
  document.getElementById("totalInvested").innerText = formatIndian(Math.round(invested));
  document.getElementById("estimatedReturns").innerText = formatIndian(Math.round(returns));

  const ctx = document.getElementById("sipChart");
  if (sipChart) sipChart.destroy();
  sipChart = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["Invested", "Returns"],
      datasets: [{
        data: [Math.round(invested), Math.round(returns)],
        backgroundColor: ["#1e3a8a", "#16a34a"],
        borderWidth: 0,
        hoverOffset: 6
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "bottom",
          labels: { font: { size: 13 }, padding: 16 }
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              return "₹ " + context.raw.toLocaleString("en-IN");
            }
          }
        }
      }
    }
  });
}

// ✅ Auto-calculate with default values on page load
document.addEventListener("DOMContentLoaded", calculateSIP);

