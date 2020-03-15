import {Types} from '../actions/dateActions'
import {Month} from "../service/month";

const defaultState = {
    month: Month.from(new Date()),
    loading: false,
    transactions: [],
    jars: []
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case (Types.SET_DATE):
            return {...state, month: action.month};
        case (Types.REQUEST_TRANSACTIONS):
            return {...state, loading: true};
        case (Types.RECEIVE_TRANSACTIONS):
            return {...state, loading: false, transactions: action.payload['transactions'], jars: action.payload['jars']};
        default:
            return state;
    }
}
