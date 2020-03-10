import {Types} from '../actions/dateActions'

const defaultState = {
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
    loading: false,
    transactions: []
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case (Types.SET_DATE):
            return {...state, month: action.month, year: action.year};
        case (Types.REQUEST_TRANSACTIONS):
            return {...state, loading: true};
        case (Types.RECEIVE_TRANSACTIONS):
            console.log(action);
            return {...state, loading: false, transactions: action.payload['transactions']};
        default:
            return state;
    }
}
