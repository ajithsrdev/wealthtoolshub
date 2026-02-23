let emiChart;

function formatIndian(num){
  return num.toLocaleString("en-IN");
}

function calculateEMI(){
  const P = parseFloat(document.getElementById("loanAmount").value);
  const r = parseFloat(document.getElementById("interestRate").value)/12/100;
  const n = parseFloat(document.getElementById("loanTenure").value)*12;

  const EMI = (P*r*Math.pow(1+r,n))/(Math.pow(1+r,n)-1);
  const totalPayment = EMI*n;
  const totalInterest = totalPayment-P;

  document.getElementById("emiResult").innerText = formatIndian(Math.round(EMI));
  document.getElementById("totalInterest").innerText = formatIndian(Math.round(totalInterest));
  document.getElementById("totalPayment").innerText = formatIndian(Math.round(totalPayment));

  const ctx = document.getElementById("emiChart");
  if(emiChart) emiChart.destroy();

  emiChart = new Chart(ctx,{
    type:"doughnut",
    data:{
      labels:["Principal","Interest"],
      datasets:[{
        data:[P,totalInterest],
        backgroundColor:["#1e3a8a","#cbd5e1"]
      }]
    }
  });
}

document.addEventListener("DOMContentLoaded",calculateEMI);
