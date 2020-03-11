import React from "react";
import './Column.css'

class Column extends React.Component {

    renderCells = () => {
        return this.props.transactions.map(transaction => (
            <div className="Column-cell">{transaction.amount}</div>
        ))
    };

    render() {
        return (
            <div className="Column-container">
                <div className="Column-cell">{this.props.jar}</div>
                {this.renderCells()}
            </div>
        )
    }
}

export default Column;
