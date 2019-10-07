import * as d3 from "d3";
import template from "./index.html";
import "./style.scss";

export default class {
  mount(container) {
    document.title = "d3_demo1";
    container.innerHTML = template;
    // const square = d3.selectAll("rect");
    // square.style("fill", "green");

    var n = 6, // number of layers
      m = 10, // number of samples per layer
      stack = d3.stack().keys([0, 1, 2, 3]);
    stack.value(function (d, key) {
      return d[key].y;
    });
    var layers = stack(d3.transpose(d3.range(n).map(function () { return bumpLayer(m, .1); }))),
      yGroupMax = d3.max(layers, function (layer) { return d3.max(layer, function (d) { return d[1] - d[0]; }); }),
      yStackMax = d3.max(layers, function (layer) { return d3.max(layer, function (d) { return d[1]; }); });

    var margin = { top: 40, right: 10, bottom: 20, left: 10 },
      width = 960 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

    var x = d3.scaleBand()
      .domain(d3.range(m))
      .rangeRound([0, width], .08);

    var y = d3.scaleLinear()
      .domain([0, yStackMax])
      .range([height, 0]);

    var color = d3.scaleLinear()
      .domain([0, n - 1])
      .range(["#00FF66", "#CCFF00"]);

    var xAxis = d3.axisBottom(x)
      .tickSize(0)
      .tickPadding(6);

    var svg = d3.select("body").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var layer = svg.selectAll(".layer")
      .data(layers)
      .enter().append("g")
      .attr("class", "layer")
      .attr("layernum", function (d, i) { return i; })
      .style("fill", function (d, i) { return color(i); });

    var rect = layer.selectAll("rect")
      .data(function (d) { return d; })
      .enter().append("rect")
      .attr("x", function (d, i) { return x(i); })
      .attr("y", height)
      .attr("width", x.bandwidth() - 1)
      .attr("height", 0);

    rect.transition()
      .delay(function (d, i) { return i * 10; })
      .attr("y", function (d) { return y(d[1]); })
      .attr("height", function (d) { return y(d[0]) - y(d[1]); })

    svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

    d3.selectAll("input").on("change", change);

    var timeout = setTimeout(function () {
      d3.select("input[value=\"grouped\"]").property("checked", true).each(change);
    }, 2000);

    function change() {
      clearTimeout(timeout);
      if (this.value === "grouped") transitionGrouped();
      else transitionStacked();
    }

    function transitionGrouped() {
      y.domain([0, yGroupMax]);

      rect.transition()
        .duration(500)
        .delay(function (d, i) { return i * 10; })
        .attr("x", function (d, i) {
          var j = d3.select(this.parentNode).attr("layernum");
          return x(i) + (x.bandwidth() - 1) / n * j;
        })
        .attr("width", (x.bandwidth() - 1) / n)
        .transition()
        .attr("y", function (d) { return height - (y(d[0]) - y(d[1])); })
        .attr("height", function (d) { return (y(d[0]) - y(d[1])); });
    }

    function transitionStacked() {
      y.domain([0, yStackMax]);

      rect.transition()
        .duration(500)
        .delay(function (d, i) { return i * 10; })
        .attr("y", function (d) { return y(d[1]); })
        .attr("height", function (d) { return y(d[0]) - y(d[1]); })
        .transition()
        .attr("x", function (d, i) { return x(i); })
        .attr("width", x.bandwidth() - 1);
    }

    // Inspired by Lee Byron's test data generator.
    function bumpLayer(n, o) {

      function bump(a) {
        var x = 1 / (.1 + Math.random()),
          y = 2 * Math.random() - .5,
          z = 10 / (.1 + Math.random());
        for (var i = 0; i < n; i++) {
          var w = (i / n - y) * z;
          a[i] += x * Math.exp(-w * w);
        }
      }

      var a = [], i;
      for (i = 0; i < n; ++i) a[i] = o + o * Math.random();
      for (i = 0; i < 5; ++i) bump(a);
      return a.map(function (d, i) { return { x: i, y: Math.max(0, d) }; });
    }

  }
}
