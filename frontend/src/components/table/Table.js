import React from "react";
import {connect} from "react-redux";
import './Table.css'

class Table extends React.Component {

    renderTransactions = () => {
        return this.props.transactions.map(transaction => (
            <div>{transaction.jar}: {transaction.amount}</div>
        ))
    };

    render() {
        return (
            <div className="Table-container">
                {this.renderTransactions()}
            </div>
        )
    }
}
const mapStateToProps = state => ({
    transactions: state.dateState.transactions
});

export default connect(mapStateToProps)(Table);
