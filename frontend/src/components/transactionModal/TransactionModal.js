import React from "react";
import {connect} from "react-redux";
import './TransactionModal.css';
import {close} from "../../actions/transactionActions"

class TransactionModal extends React.Component {
    render() {
        return (
            <div className={this.props.active ? "TransactionModal-container" : "hidden"}>
                <div className="TransactionModal-modal">
                    <button onClick={() => this.props.close()}>Close</button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    active: !!state.dateState.selectedTransaction
});

const mapDispatchToProps = dispatch => ({
    close: () => dispatch(close())
});

export default connect(mapStateToProps, mapDispatchToProps)(TransactionModal);
