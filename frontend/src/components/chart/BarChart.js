import React from "react";
import {connect} from "react-redux";
import './BarChart.css';
import * as d3 from 'd3';

class BarChart extends React.Component {

    constructor(props) {
        super(props);
        this.width = 600;
        this.height = 400;
    }


    // noinspection JSCheckFunctionSignatures
    componentDidUpdate() {
        this.clear();
        this.drawCanvas();
    }

    clear = () => {
        d3.select('.BarChart-canvas')
            .select('svg').remove();
    };

    drawCanvas = () => {
        const margin = 100;
        const canvasWidth = this.width - margin;
        const canvasHeight = this.height - margin;
        const svg = d3.select('.BarChart-canvas')
            .append('svg')
            .attr('width', this.width)
            .attr('height', this.height)
            .style('border', '1px solid #DDDDDD')
            .style('background', '#FFFFFF');

        const xScale = d3.scaleBand().range([0, canvasWidth]).padding(0.4);
        const yScale = d3.scaleLinear().range([canvasHeight, 0]);

        const g = svg.append('g')
            .attr('transform', `translate(${margin / 2}, ${margin / 2})`);

        const data = this.props.transactions.toTotals();
        console.log(data);

        // noinspection JSCheckFunctionSignatures
        xScale.domain(d3.range(data.length));
        // noinspection JSCheckFunctionSignatures
        yScale.domain([0, d3.max(data, d => d.total)]);

        g.append('g')
            .attr('transform', `translate(0, ${canvasHeight})`)
            .attr('color', '#121212')
            .call(
                d3.axisBottom(xScale)
                    .tickFormat((d, i) => data[i].jar )
            );

        // noinspection JSCheckFunctionSignatures
        g.append('g').call(d3.axisLeft(yScale));

        g.selectAll('.bar')
            .data(data).enter()
            .append('rect')
            .attr('class', 'bar')
            .attr('x', (d, i) => xScale(i))
            .attr('y', d => yScale(d.total))
            .attr('width', xScale.bandwidth)
            .attr('height', d => canvasHeight - yScale(d.total));


    };

    render() {
        return (
            <div className="BarChart-container">
                <div className="BarChart-canvas"/>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    transactions: state.dateState.transactions
});

export default connect(mapStateToProps, null)(BarChart);