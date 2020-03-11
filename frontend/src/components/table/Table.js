import React from "react";
import {connect} from "react-redux";
import './Table.css'
import Column from "./Column";

class Table extends React.Component {

    findTransactions = jar => {
        return this.props.transactions.filter(transaction => transaction.jar === jar)
    };

    renderColumns = () => {
        return this.props.jars.map(jar => (
            <Column jar={jar} transactions={this.findTransactions(jar)} minCells={this.findNumberOfCells()}/>
        ))
    };

    findNumberOfCells = () => {
        return Math.max(...this.props.jars.map(jar => this.findTransactions(jar))
            .map(transactions => transactions.length));
    };

    render() {
        return (
            <div className="Table-container">
                {this.renderColumns()}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    transactions: state.dateState.transactions,
    jars: state.dateState.jars
});

export default connect(mapStateToProps)(Table);
