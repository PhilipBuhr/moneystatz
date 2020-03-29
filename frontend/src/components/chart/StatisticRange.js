import React from "react";
import { connect } from "react-redux";
import './StatisticRange.css';
import { format, parse } from '../../service/dateUtil';
import DatePicker from 'react-datepicker';
import { selectStatisticRange } from '../../actions/dateActions';

class StatisticRange extends React.Component {
    constructor(props) {
        super(props);
        this.state = {rangeType: 'current'}
    }

    render() {
        return (
            <div className="StatisticRange-container">
                <div className="StatisticRange-label">Range:</div>
                <select value={this.state.rangeType} onChange={this.onSelectRangeType}>
                    <option value="current">Current Month</option>
                    <option value="custom">Custom</option>
                </select>
                <div className={this.hideIfCurrentMonth("StatisticRange-label")}>From:</div>
                <DatePicker className={this.hideIfCurrentMonth('')} selected={this.props.from} onChange={this.onSelectFrom} dateFormat="dd.MM.yyyy"/>
                <div className={this.hideIfCurrentMonth("StatisticRange-label")}>To:</div>
                <DatePicker className={this.hideIfCurrentMonth('')} selected={this.props.to} onChange={this.onSelectTo} dateFormat="dd.MM.yyyy"/>
            </div>
        )
    }

    hideIfCurrentMonth = className => {
        return this.state.rangeType === 'current' ? 'hidden' : className;
    };

    onSelectRangeType = event => {
        this.setState({ ...this.state, rangeType: event.target.value });
        this.props.selectRange(this.props.currentMonth.getFirstAsString(), this.props.currentMonth.getLastAsString());
    };


    onSelectFrom = date => {
        this.props.selectRange(format(date), format(this.props.to));
    };

    onSelectTo = date => {
        this.props.selectRange(format(this.props.from), format(date));
    };
}

const mapStateToProps = state => ({
    from: parse(state.dateState.statisticFrom),
    to: parse(state.dateState.statisticTo),
    currentMonth: state.dateState.month
});

const mapDispatchToProps = dispatch => ({
    selectRange: (from, to) => dispatch(selectStatisticRange(from, to))
});

export default connect(mapStateToProps, mapDispatchToProps)(StatisticRange);
