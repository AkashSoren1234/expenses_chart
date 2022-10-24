import myJson from "./data.json" assert { type: "json" };

window.addEventListener("load", (event) => {
  let main_chart_container = document.querySelector(".charts-container");

  let price_list = myJson.map((val) => {
    return val.amount;
  });

  let price_list_max = price_list.reduce((acc, val) => (acc > val ? acc : val));
  chart_function(window.innerWidth);

  window.addEventListener("resize", () => {
    chart_function(window.innerWidth);
  });

  function chart_function(screen_width) {
    let scale_height_value = "";
    let charts_content = myJson
      .map((val) => {
        if (screen_width < 1000) {
          scale_height_value = val.amount * 1.71;
        } else {
          scale_height_value = val.amount * 3.21;
        }
        if (val.amount === price_list_max) {
          return `<div class="single-chart-container">
        <span class="chart-value">$${val.amount}</span>
        <div class="chart" style="height:${scale_height_value}px; background-color: hsl(186, 34%, 60%);"></div>
        <span class="day-text">${val.day}</span>
        </div>`;
        } else {
          return `<div class="single-chart-container">
        <span class="chart-value">$${val.amount}</span>
        <div class="chart" style="height:${scale_height_value}px;"></div>
        <span class="day-text">${val.day}</span>
        </div>`;
        }
      })
      .join("");

    main_chart_container.innerHTML = charts_content;

    let chart_values = document.querySelectorAll(".chart-value");
    let charts = document.querySelectorAll(".chart");

    charts.forEach((chart, index) => {
      chart.addEventListener("mouseover", () => {
        chart_values.forEach((chart_value) => {
          chart_value.classList.remove("chart-value-visible");
        });
        chart_values[index].classList.add("chart-value-visible");
      });
      chart.addEventListener("mouseout", () => {
        chart_values[index].classList.remove("chart-value-visible");
      });
    });
  }
});