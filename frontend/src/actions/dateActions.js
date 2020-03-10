export const Types = {
    SET_DATE: 'SET_DATE',
    REQUEST_TRANSACTIONS: 'REQUEST_TRANSACTIONS',
    RECEIVE_TRANSACTIONS: 'RECEIVE_TRANSACTIONS'
};

const setDateAction = (year, month) => ({
    type: Types.SET_DATE,
    month,
    year
});


function fetchTransactionsForDate(date, dispatch) {
    let year = date.getFullYear();
    let month = date.getMonth();
    dispatch(setDateAction(year, month));
    dispatch(requestTransactions());

    return loadTransactions(year, month, dispatch)
}

export const loadDateAction = (date) => {
    return dispatch => {
        return fetchTransactionsForDate(new Date(date), dispatch)
    }
};

export const previousDateAction = (date) => {
    return dispatch => {
        date = new Date(date);
        date.setMonth(date.getMonth() - 1);
        return fetchTransactionsForDate(date, dispatch)
    }
};

export const nextDateAction = (date) => {
    return dispatch => {
        date = new Date(date);
        date.setMonth(date.getMonth() + 1);
        return fetchTransactionsForDate(date, dispatch);
    }
};

const loadTransactions = (year, month, dispatch) => {
    const first = new Date(year, month, 1).toISOString().substring(0, 10);
    const last = new Date(year, month + 1, 0).toISOString().substring(0, 10);
    console.log(first, last);
    return fetch(`http://localhost:8000/api/transactions?from=${first}&to=${last}`)
        .then(response => response.json(), error => console.log(error))
        .then(json => dispatch(receiveTransactions(json)));
};

const requestTransactions = () => ({
    type: Types.REQUEST_TRANSACTIONS
});

const receiveTransactions = json => ({
    type: Types.RECEIVE_TRANSACTIONS,
    payload: json
});

