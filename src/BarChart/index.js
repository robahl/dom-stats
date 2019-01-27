import React, { Component } from 'react';
import * as d3 from 'd3';
import './style.scss';

class BarChart extends Component {
  constructor(props) {
    super(props);

    // this.createChart = this.createChart.bind(this);

    this.node = React.createRef();
  }

  componentDidMount() {
    this.createChart();
  }

  createChart() {
    const node = this.node.current;

    var margin = { top: 20, right: 20, bottom: 30, left: 40 },
      width = 1920 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

    // set the ranges
    var x = d3
      .scaleBand()
      .range([0, width])
      .padding(0.1);
    var y = d3.scaleLinear().range([height, 0]);

    // append the svg object to the body of the page
    // append a 'group' element to 'svg'
    // moves the 'group' element to the top left margin
    var svg = d3
      .select(node)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    // get the data
    const data = this.props.data;
    console.log(data);
    // Scale the range of the data in the domains
    x.domain(
      data.map(function(d) {
        return d.tag;
      })
    );
    y.domain([
      0,
      d3.max(data, function(d) {
        return d.count;
      })
    ]);

    // append the rectangles for the bar chart
    svg
      .selectAll('.bar')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', function(d) {
        return x(d.tag);
      })
      .attr('width', x.bandwidth())
      .attr('y', function(d) {
        return y(d.count);
      })
      .attr('height', function(d) {
        return height - y(d.count);
      });

    // add the x Axis
    svg
      .append('g')
      .attr('transform', 'translate(0,' + height + ')')
      .call(d3.axisBottom(x));

    // add the y Axis
    svg.append('g').call(d3.axisLeft(y));
  }

  render() {
    return (
      <div className="BarChart">
        <svg ref={this.node} />
      </div>
    );
  }
}

export default BarChart;
