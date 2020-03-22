import React from "react";
import {connect} from "react-redux";
import './TransactionModal.css';
import check from './check-24px.svg';
import closeIcon from './close-24px.svg';
import {close, select, submit} from "../../actions/transactionActions"
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import {format, parse} from "../../service/dateUtil";

class TransactionModal extends React.Component {

    render() {
        if (this.props.active) {
            const {amount, jar, date} = this.props.transaction;
            return (
                <div className="TransactionModal-container" onClick={this.onBackgroundClick}>
                    <div className="TransactionModal-modal">
                        <div className="TransactionModal-body">
                            <div className="TransactionModal-label">Amount</div>
                            <input value={amount}
                                   onChange={event => this.onChange(event, 'amount')}/>
                            <div className="TransactionModal-label">Jar</div>
                            <input value={jar} onChange={event => this.onChange(event, 'jar')}/>
                            <div className="TransactionModal-label">Date</div>
                            <DatePicker selected={parse(date)} onChange={this.onChangeDate} dateFormat="dd.MM.yyyy"/>
                        </div>
                        <div className="TransactionModal-button-box">
                            <button className="TransactionModal-button submit" onClick={this.onSubmit}>
                                <img className="TransactionModal-icon-button" src={check} alt="Submit"/>
                            </button>
                            <button className="TransactionModal-button close" onClick={() => this.props.close()}>
                                <img className="TransactionModal-icon-button" src={closeIcon} alt="Cancel"/>
                            </button>
                        </div>
                    </div>
                </div>
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
