import React from "react";
import './Column.css'

class Column extends React.Component {

    renderCells = () => {
        return this.props.transactions.map(transaction => (
            <div className="Column-cell">{transaction.amount}</div>
        ))
    };

    renderExtraCells = () => {
        console.log(this.props.minCells);
        const emptyCells = [];
        if (this.props.minCells > this.props.transactions.length) {
            console.log('mop');
            for (let i = this.props.transactions.length; i < this.props.minCells; i++) {
                emptyCells.push(<div className="Column-cell"/> )
            }
        }
        return emptyCells;
    };

    render() {
        return (
            <div className="Column-container">
                <div className="Column-cell">{this.props.jar}</div>
                {this.renderCells()}
                {this.renderExtraCells()}
            </div>
        )
    }
}

export default Column;
