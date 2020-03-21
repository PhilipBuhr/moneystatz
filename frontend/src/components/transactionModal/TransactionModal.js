import React from "react";
import {connect} from "react-redux";
import './TransactionModal.css';
import {close, select, submit} from "../../actions/transactionActions"

class TransactionModal extends React.Component {

    render() {
        if (this.props.active) {
            return (
                <div className="TransactionModal-container" onClick={this.onBackgroundClick}>
                    <div className="TransactionModal-modal">
                        <div className="TransactionModal-body">
                            <div className="TransactionModal-label">Amount</div>
                            <input value={this.props.transaction.amount}
                                   onChange={event => this.onChange(event, 'amount')}/>
                            <div className="TransactionModal-label">Jar</div>
                            <input value={this.props.transaction.jar} onChange={event => this.onChange(event, 'jar')}/>
                            <div className="TransactionModal-label">Date</div>
                            <input value={this.props.transaction.date}
                                   onChange={event => this.onChange(event, 'date')}/>
                        </div>
                        <div className="TransactionModal-button-box">
                            <button className="TransactionModal-button submit" onClick={this.onSubmit}>
                                Submit
                            </button>
                            <button className="TransactionModal-button close" onClick={() => this.props.close()}>
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            );
        }
        return null;
    }

    onBackgroundClick = event => {
        if (event.target.closest('.TransactionModal-modal')) {
            return;
        }
        this.props.close();
    };

    onChange(event, property) {
        let newTransaction = {
            ...this.props.transaction,
        };
        newTransaction[property] = event.target.value;
        this.props.change(newTransaction);
    }

    onSubmit = () => {
        this.props.submit(this.props.transaction, this.props.month);
    };
}

const mapStateToProps = state => ({
    active: !!state.dateState.selectedTransaction,
    transaction: state.dateState.selectedTransaction,
    month: state.dateState.month
});

const mapDispatchToProps = dispatch => ({
    close: () => dispatch(close()),
    change: transaction => dispatch(select(transaction)),
    submit: (transaction, month) => dispatch(submit(transaction, month))
});

export default connect(mapStateToProps, mapDispatchToProps)(TransactionModal);
