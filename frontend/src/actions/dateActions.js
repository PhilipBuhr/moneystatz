import {Transactions} from "../service/transactions";
import {RestService} from "../service/restService";

const restService = new RestService('localhost', 8000);

export const DateTypes = {
    SET_DATE: 'SET_DATE',
    REQUEST_TRANSACTIONS: 'REQUEST_TRANSACTIONS',
    RECEIVE_TRANSACTIONS: 'RECEIVE_TRANSACTIONS'
};

export const loadForMonth = (month) => {
    return dispatch => {
        return fetchTransactionsForMonth(month, dispatch)
    }
};


export const previousDateAction = (month) => {
    return dispatch => {
        return fetchTransactionsForMonth(month.getPrevious(), dispatch)
    }
};

export const nextDateAction = (month) => {
    return dispatch => {
        return fetchTransactionsForMonth(month.getNext(), dispatch);
    }
};

const setMonthAction = (month) => ({
    type: DateTypes.SET_DATE,
    month,
});

function fetchTransactionsForMonth(month, dispatch) {
    dispatch(setMonthAction(month));
    dispatch(requestTransactions());

    return loadTransactions(month, dispatch)
}

const loadTransactions = (month, dispatch) => {
    const first = month.getFirstAsString();
    const last = month.getLastAsString();
    return restService.get('api/transactions', {from: first, to: last})
        .then(
            response => dispatch(receiveTransactions(response.data)),
            error => console.log(error)
        );
};

const requestTransactions = () => ({
    type: DateTypes.REQUEST_TRANSACTIONS
});

const receiveTransactions = json => ({
    type: DateTypes.RECEIVE_TRANSACTIONS,
    payload: Transactions.parse(json)
});



