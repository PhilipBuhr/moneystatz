import React from "react";
import {connect} from "react-redux";
import './Table.css'
import addIcon from './plus.svg'
import Column from "./Column";
import {openAddJar} from "../../actions/transactionActions";

class Table extends React.Component {

    renderColumns = () => {
        return this.props.transactions.jars.map(jar => (
            <Column
                jar={jar}
                key={jar}
                month={this.props.month}
                transactions={this.props.transactions.get(jar)}
                minCells={this.props.transactions.maxJarSize()}/>
        ))
    };

    render() {
        return (
            <div className="Table-container">
                {this.renderColumns()}
                <div className="Table-add-jar-button" onClick={this.props.openAddJar}>
                    <img className="Table-add-jar-button-icon" src={addIcon} alt="Add Jar"/>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    transactions: state.dateState.transactions,
    month: state.dateState.month
});
const mapDispatchToProps = dispatch => ({
    openAddJar: () => dispatch(openAddJar())
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
