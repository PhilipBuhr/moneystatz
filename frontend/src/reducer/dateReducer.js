import {DateTypes} from '../actions/dateActions';
import {TransactionTypes} from '../actions/transactionActions';
import {Month} from "../service/month";
import {Transactions} from "../service/transactions";

const defaultState = {
    month: Month.from(new Date()),
    loading: false,
    transactions: new Transactions([]),
    selectedTransaction: {uuid: '374ed882-607e-4203-9c8c-380fe38c1a51', amount: 2000, date: '2020-03-15', jar: 'Einkommen'}
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case (DateTypes.SET_DATE):
            return {...state, month: action.month};
        case (DateTypes.REQUEST_TRANSACTIONS):
            return {...state, loading: true};
        case (DateTypes.RECEIVE_TRANSACTIONS):
            return {...state, loading: false, transactions: action.payload};
        case (TransactionTypes.CLOSE):
            return {...state, selectedTransaction: null};
        case (TransactionTypes.SELECT):
            return {...state, selectedTransaction: action.payload};
        default:
            return state;
    }
}
