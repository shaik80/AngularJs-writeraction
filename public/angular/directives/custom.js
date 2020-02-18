myApp.directive("addEditForm", function() {
  function link() {
    console.log("a");
  }
  return {
    link: link,
    restrict: "E"
  };
});

myApp.directive("firstChartApp", [
  "StockService",
  function(StockService) {
    return {
      restrict: "E",
      scope: {
        startDate: "=",
        endDate: "=",
        data: "="
      },
      link: function(scope, $element, attrs) {
        console.log(scope.startdate);
        console.log(scope);

        scope.$watch(
          "[startDate,endDate]",
          function(value) {
            startDate = scope.startDate;
            endDate = scope.endDate;
            value = scope.data;

            chartLine($element[0], value, startDate, endDate);
          },
          true
        );
        refreshSvg($element[0]);
      }
    };
  }
]);

refreshSvg = tagname => {
  d3.select(tagname)
    .select("svg")
    .remove();
};
function chartLine(tagName, value, startDate, endDate) {
  if (value) {
    let data = value.data
      .filter(
        v =>
          new Date(v.date) >= new Date(startDate) &&
          new Date(v.date) <= new Date(endDate)
      )
      .map(v => {
        return { date: new Date(v.date), value: Number(v.close) };
      });

    margin = { top: 20, right: 30, bottom: 30, left: 40 };
    height = 700;
    width = 500;

    let svg = d3
      .select(tagName)
      .append("svg")
      .attr("class", "alert alert-dark")
      .style("-webkit-tap-highlight-color", "transparent")
      .style("overflow", "visible")
      .style("height", height)
      .style("width", width);
    x = d3
      .scaleUtc()
      .domain(d3.extent(data, d => d.date))
      .range([margin.left, width - margin.right]);
    xAxis = g =>
      g.attr("transform", `translate(0,${height - margin.bottom})`).call(
        d3
          .axisBottom(x)
          .ticks(width / 80)
          .tickSizeOuter(0)
      );
    svg.append("g").call(xAxis);

    y = d3
      .scaleLinear()
      .domain([0, d3.max(data, d => d.value)])
      .nice()
      .range([height - margin.bottom, margin.top]);
    yAxis = g =>
      g
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(y))
        .call(g => g.select(".domain").remove())
        .call(g =>
          g
            .select(".tick:last-of-type text")
            .clone()
            .attr("x", 3)
            .attr("text-anchor", "start")
            .attr("font-weight", "bold")
            .text(data.y)
        );
    svg.append("g").call(yAxis);

    line = d3
      .line()
      .curve(d3.curveStep)
      .defined(d => !isNaN(d.value))
      .x(d => x(d.date))
      .y(d => y(d.value));
    svg
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("d", line);

    const tooltip = svg.append("g");

    bisect = mx => {
      const bisect = d3.bisector(d => d.date).left;
      const date = x.invert(mx);
      const index = bisect(data, date, 1);
      const a = data[index - 1];
      const b = data[index];
      try {
        if (date != undefined) {
          return date - a.date > b.date - date ? b : a;
        }
      } catch (error) {}
    };

    callout = (g, value) => {
      if (!value) return g.style("display", "none");

      g.style("display", null)
        .style("pointer-events", "none")
        .style("font", "10px sans-serif");

      const path = g
        .selectAll("path")
        .data([null])
        .join("path")
        .attr("fill", "white")
        .attr("stroke", "black");

      const text = g
        .selectAll("text")
        .data([null])
        .join("text")
        .call(text =>
          text
            .selectAll("tspan")
            .data((value + "").split(/\n/))
            .join("tspan")
            .attr("x", 0)
            .attr("y", (d, i) => `${i * 1.1}em`)
            .style("font-weight", (_, i) => (i ? null : "bold"))
            .text(d => d)
        );

      const { x, y, width: w, height: h } = text.node().getBBox();

      text.attr("transform", `translate(${-w / 2},${15 - y})`);
      path.attr(
        "d",
        `M${-w / 2 - 10},5H-5l5,-5l5,5H${w / 2 + 10}v${h + 20}h-${w + 20}z`
      );
    };
    svg.on("touchmove mousemove", function() {
      try {
        const { date, value } = bisect(d3.mouse(this)[0]);

        tooltip.attr("transform", `translate(${x(date)},${y(value)})`).call(
          callout,
          `${value.toLocaleString(undefined, {
            style: "currency",
            currency: "USD"
          })}
            ${date.toLocaleString(undefined, {
              month: "short",
              day: "numeric",
              year: "numeric"
            })}`
        );
        svg.on("touchend mouseleave", () => tooltip.call(callout, null));
      } catch (error) {
        console.log("No further date is defined");
        // console.log(error);
      }
    });
  }
}
