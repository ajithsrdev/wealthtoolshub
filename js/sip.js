let sipChart;

function formatIndian(num){
  return num.toLocaleString("en-IN");
}

function calculateSIP(){
  const P = parseFloat(document.getElementById("monthlyInvestment").value);
  const r = parseFloat(document.getElementById("annualReturn").value)/12/100;
  const n = parseFloat(document.getElementById("years").value)*12;

  const FV = P*(((Math.pow(1+r,n)-1)/r)*(1+r));
  const invested = P*n;
  const returns = FV-invested;

  document.getElementById("totalValue").innerText = formatIndian(Math.round(FV));
  document.getElementById("totalInvested").innerText = formatIndian(Math.round(invested));
  document.getElementById("estimatedReturns").innerText = formatIndian(Math.round(returns));

  const ctx = document.getElementById("sipChart");
  if(sipChart) sipChart.destroy();

  sipChart = new Chart(ctx,{
    type:"doughnut",
    data:{
      labels:["Invested","Returns"],
      datasets:[{
        data:[invested,returns],
        backgroundColor:["#1e3a8a","#cbd5e1"]
      }]
    }
  });
}

document.addEventListener("DOMContentLoaded",calculateSIP);
