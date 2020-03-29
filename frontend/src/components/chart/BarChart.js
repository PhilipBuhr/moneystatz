import React from "react";
import { connect } from "react-redux";
import './BarChart.css';
import * as d3 from 'd3';

class BarChart extends React.Component {

    constructor(props) {
        super(props);
        this.width = 800;
        this.height = 600;
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
            .attr('class', d => d.type)
            .attr('x', (d, i) => xScale(i))
            .attr('y', d => yScale(d.total))
            .attr('width', xScale.bandwidth)
            .attr('height', d => canvasHeight - yScale(d.total));

        g.selectAll('.percentage')
            .data(data).enter()
            .append('text')
            .attr('class', 'percentage')
            .attr('x', (d, i) => xScale(i))
            .attr('y', d => yScale(d.total))
            .text(d => `${d.percentage.toFixed(0)}%`);

        const balance = this.props.transactions.calculateBalance();
        svg.append('text')
            .attr('x', canvasWidth)
            .attr('y', margin/2)
            .attr('text-anchor', 'end')
            .text(`Balance: ${balance.toFixed(2)}`)
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
    transactions: state.dateState.statisticsTransactions
});

export default connect(mapStateToProps, null)(BarChart);
