import React from "react";
import './Column.css'
import Cell from "./Cell";
import {v4 as uuid} from "uuid";

class Column extends React.Component {

    renderCells = () => {
        return this.props.transactions.map(transaction => (
            <Cell transaction={transaction} key={transaction.uuid}/>
        ))
    };

    renderExtraCells = () => {
        const emptyCells = [];
        for (let i = this.props.transactions.length; i < this.props.minCells + 1; i++) {
            let transaction = {amount: '', jar: this.props.jar, date: "TODO", uuid: uuid()};
            emptyCells.push(<Cell transaction={transaction} key={transaction.uuid} />)
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
