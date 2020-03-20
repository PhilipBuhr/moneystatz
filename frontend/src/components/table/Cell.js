import React from "react";
import {connect} from "react-redux";
import './Cell.css';
import {select} from "../../actions/transactionActions";

class Cell extends React.Component {
    render() {
        return (
            <div className="Cell-container" onClick={this.onSelect}>
                 {this.props.transaction.amount}
            </div>
        )
    }

    onSelect = () => {
        this.props.select(this.props.transaction);
    }
}
const mapDispatchToProps = dispatch => ({
    select: transaction => dispatch(select(transaction))
});

export default connect(null, mapDispatchToProps)(Cell);
