import React from "react";
import {connect} from "react-redux";
import './TransactionModal.css';
import {close} from "../../actions/transactionActions"

class TransactionModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {transaction: this.props.transaction}
    }

    render() {
        return (
            <div className={this.props.active ? "TransactionModal-container" : "hidden"}>
                <div className="TransactionModal-modal">
                    <div className="TransactionModal-body">
                        <div className="TransactionModal-label">Amount</div><input value={this.state.transaction.amount}/>
                        <div className="TransactionModal-label">Jar</div><input value={this.state.transaction.jar}/>
                        <div className="TransactionModal-label">Date</div><input value={this.state.transaction.date}/>
                    </div>
                    <div className="TransactionModal-button-box">
                        <button className="TransactionModal-button submit" onClick={() => this.props.close()}>Submit</button>
                        <button className="TransactionModal-button close" onClick={() => this.props.close()}>Close</button>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    active: !!state.dateState.selectedTransaction,
    transaction: state.dateState.selectedTransaction
});

const mapDispatchToProps = dispatch => ({
    close: () => dispatch(close())
});

export default connect(mapStateToProps, mapDispatchToProps)(TransactionModal);
