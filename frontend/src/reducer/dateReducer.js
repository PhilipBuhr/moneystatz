import { DateTypes } from '../actions/dateActions';
import { TransactionTypes } from '../actions/transactionActions';
import { Month } from "../service/month";
import { Transactions } from "../service/transactions";

const defaultState = {
    month: Month.from(new Date()),
    loading: false,
    transactions: new Transactions([]),
    selectedTransaction: null,
    selectedJar: null,
    statisticFrom: Month.from(new Date()).getFirstAsString(),
    statisticTo: Month.from(new Date()).getLastAsString(),
    statisticsTransactions: new Transactions([])
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case DateTypes.SET_DATE:
            return {...state, month: action.month};
        case DateTypes.REQUEST_TRANSACTIONS:
            return {...state, loading: true};
        case DateTypes.RECEIVE_TRANSACTIONS:
            return {...state, loading: false, transactions: action.payload};
        case DateTypes.SELECT_STATISTIC_RANGE:
            return { ...state, statisticFrom: action.from, statisticTo: action.to };
        case DateTypes.RECEIVE_STATISTICS_TRANSACTIONS:
            return { ...state, statisticsTransactions: action.transactions };
        case TransactionTypes.CLOSE:
            return {...state, selectedTransaction: null};
        case TransactionTypes.SELECT:
            return {...state, selectedTransaction: action.transaction};
        case TransactionTypes.CLOSE_JAR:
            return {...state, selectedJar: null};
        case TransactionTypes.SELECT_JAR:
            return {...state, selectedJar: action.jar};
        default:
            return state;
    }
}
