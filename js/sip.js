function formatIndian(num) {
  return num.toLocaleString("en-IN");
}

function calculateSIP() {

  const P = parseFloat(document.getElementById("monthlyInvestment").value);
  const r = parseFloat(document.getElementById("annualReturn").value) / 12 / 100;
  const n = parseFloat(document.getElementById("years").value) * 12;

  const FV = P * (((Math.pow(1+r, n) - 1) / r) * (1+r));
  const invested = P * n;
  const returns = FV - invested;

  document.getElementById("totalInvested").innerText = formatIndian(Math.round(invested));
  document.getElementById("estimatedReturns").innerText = formatIndian(Math.round(returns));
  document.getElementById("totalValue").innerText = formatIndian(Math.round(FV));
}

calculateSIP();
