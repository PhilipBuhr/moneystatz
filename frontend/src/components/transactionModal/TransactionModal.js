import React from "react";
import { connect } from "react-redux";
import './TransactionModal.css';
import {
    closeTransaction,
    deleteTransaction,
    selectTransaction,
    submitTransaction
} from "../../actions/transactionActions"
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import { format, parse } from "../../service/dateUtil";
import Modal from "../commons/Modal";

class TransactionModal extends React.Component {
    constructor(props) {
        super(props);
        this.inputAmount = null;
    }

    // noinspection JSCheckFunctionSignatures
    componentDidUpdate() {
        if (this.inputAmount) {
            this.inputAmount.focus();
        }
    }

    render() {
        if (this.props.active) {
            const {amount, jar, date} = this.props.transaction;
            return (
                <Modal onClose={this.props.close} onSubmit={this.onSubmit} onDelete={this.onDelete}>
                    <div className="TransactionModal-body">
                        <div className="TransactionModal-label">Amount</div>
                        <input value={amount}
                               onChange={event => this.onChange(event, 'amount')}
                               onKeyPress={this.submitOnEnter}
                               ref={input => this.inputAmount = input}
                        />
                        <div className="TransactionModal-label">Jar</div>
                        <input value={jar} onChange={event => this.onChange(event, 'jar')} onKeyPress={this.submitOnEnter}/>
                        <div className="TransactionModal-label">Date</div>
                        <DatePicker selected={parse(date)} onChange={this.onChangeDate} dateFormat="dd.MM.yyyy"/>
                    </div>
                </Modal>
            );
        }
        return null;
    }

    onChangeDate = date => {
        this.props.change({
            ...this.props.transaction,
            date: format(date)
        })
    };

    onChange(event, property) {
        let newTransaction = {
            ...this.props.transaction,
        };
        newTransaction[property] = event.target.value;
        this.props.change(newTransaction);
    }

    submitOnEnter = (event) => {
        if (event.key === 'Enter') {
            this.onSubmit();
        }
    };

    onSubmit = () => {
        this.props.submit(this.props.transaction);
    };

    onDelete = () => {
        this.props.deleteTransaction(this.props.transaction);
    }
}

const mapStateToProps = state => ({
    active: !!state.dateState.selectedTransaction,
    transaction: state.dateState.selectedTransaction,
});

const mapDispatchToProps = dispatch => ({
    close: () => dispatch(closeTransaction()),
    change: transaction => dispatch(selectTransaction(transaction)),
    submit: transaction => dispatch(submitTransaction(transaction)),
    deleteTransaction: transaction => dispatch(deleteTransaction(transaction))
});

export default connect(mapStateToProps, mapDispatchToProps)(TransactionModal);
