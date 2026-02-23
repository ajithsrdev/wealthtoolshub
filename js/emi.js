function formatIndian(num) {
  return num.toLocaleString("en-IN");
}

function calculateEMI() {

  const P = parseFloat(document.getElementById("loanAmount").value);
  const r = parseFloat(document.getElementById("interestRate").value) / 12 / 100;
  const n = parseFloat(document.getElementById("loanTenure").value) * 12;

  const EMI = (P * r * Math.pow(1+r, n)) / (Math.pow(1+r, n) - 1);
  const totalPayment = EMI * n;
  const totalInterest = totalPayment - P;

  document.getElementById("emiResult").innerText = formatIndian(Math.round(EMI));
  document.getElementById("totalInterest").innerText = formatIndian(Math.round(totalInterest));
  document.getElementById("totalPayment").innerText = formatIndian(Math.round(totalPayment));
}

calculateEMI();
