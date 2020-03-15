import {Transactions} from "../service/transactions";

export const Types = {
    SET_DATE: 'SET_DATE',
    REQUEST_TRANSACTIONS: 'REQUEST_TRANSACTIONS',
    RECEIVE_TRANSACTIONS: 'RECEIVE_TRANSACTIONS'
};

const setMonthAction = (month) => ({
    type: Types.SET_DATE,
    month,
});


function fetchTransactionsForMonth(month, dispatch) {
    dispatch(setMonthAction(month));
    dispatch(requestTransactions());

    return loadTransactions(month, dispatch)
}

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

const loadTransactions = (month, dispatch) => {
    const first = month.getFirstAsString();
    const last = month.getLastAsString();
    return fetch(`http://localhost:8000/api/transactions?from=${first}&to=${last}`)
        .then(response => response.json(), error => console.log(error))
        .then(json => dispatch(receiveTransactions(json)));
};

const requestTransactions = () => ({
    type: Types.REQUEST_TRANSACTIONS
});

const receiveTransactions = json => ({
    type: Types.RECEIVE_TRANSACTIONS,
    payload: Transactions.parse(json)
});

