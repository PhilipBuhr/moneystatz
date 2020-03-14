import React from "react";
import './Column.css'
import Cell from "./Cell";

class Column extends React.Component {

    constructor(props) {
        super(props);
        this.state = {transactions: this.props.transactions}
    }

    renderCells = () => {
        return this.state.transactions.map(transaction => (
            <Cell transaction={transaction} on/>
        ))
    };

    renderExtraCells = () => {
        console.log(this.props.minCells);
        const emptyCells = [];
        for (let i = this.state.transactions.length; i < this.props.minCells + 1; i++) {
            emptyCells.push(<Cell transaction={{amount: null, jar: this.props.jar, date:"TODO"}}/>)
        }
        return emptyCells;
    };

    addTransaction = transaction => {
        this.setState({...this.state, transactions: [...this.state.transactions, transaction]})
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
