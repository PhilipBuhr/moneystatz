import {DateTypes} from '../actions/dateActions';
import {TransactionTypes} from '../actions/transactionActions';
import {Month} from "../service/month";
import {Transactions} from "../service/transactions";

const defaultState = {
    month: Month.from(new Date()),
    loading: false,
    transactions: new Transactions([]),
    selectedTransaction: null,
    jar_modal: false
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case DateTypes.SET_DATE:
            return {...state, month: action.month};
        case DateTypes.REQUEST_TRANSACTIONS:
            return {...state, loading: true};
        case DateTypes.RECEIVE_TRANSACTIONS:
            return {...state, loading: false, transactions: action.payload};
        case TransactionTypes.CLOSE:
            return {...state, selectedTransaction: null};
        case TransactionTypes.SELECT:
            return {...state, selectedTransaction: action.transaction};
        case TransactionTypes.ADD_JAR:
            console.log('open');
            return {...state, jar_modal: true};
        case TransactionTypes.CLOSE_JAR:
            return {...state, jar_modal: false};
        default:
            return state;
    }
}
