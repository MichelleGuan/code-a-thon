import * as d3 from 'd3';
import template from './index.html';
import './style.scss';

export default class {
  mount(container) {
    document.title = 'd3_demo1'
    container.innerHTML = template
    const square = d3.selectAll("rect");
    square.style("fill", "green");
  }
}