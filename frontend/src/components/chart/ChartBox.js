import React from "react";
import './ChartBox.css';
import BarChart from './BarChart';
import StatisticRange from './StatisticRange';

class ChartBox extends React.Component {
    render() {
        return (
            <div className="ChartBox-container">
                <StatisticRange/>
                <BarChart/>
            </div>
        )
    }
}

export default ChartBox;
