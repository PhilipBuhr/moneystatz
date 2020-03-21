import React from "react";
import {connect} from "react-redux";
import './Table.css'
import Column from "./Column";

class Table extends React.Component {

    renderColumns = () => {
        return this.props.transactions.jars.map(jar => (
            <Column
                jar={jar}
                key={jar}
                transactions={this.props.transactions.get(jar)}
                minCells={this.props.transactions.maxJarSize()}/>
        ))
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
});

export default connect(mapStateToProps)(Table);
