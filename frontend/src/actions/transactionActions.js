import {RestService} from "../service/restService";
import {loadForMonth} from "./dateActions";

const restService = new RestService();
export const TransactionTypes = {
    CLOSE: "CLOSE",
    SELECT: "SELECT",
    SUBMIT: "SUBMIT"
};

export const close = () => ({
    type: TransactionTypes.CLOSE
});

export const select = transaction => ({
    type: TransactionTypes.SELECT,
    transaction: transaction
});

export const submit = (transaction, month) => {
    return dispatch => {
        restService.post('api/transactions', transaction)
            .then(() => {
                dispatch(close());
                dispatch(loadForMonth(month));
            }, error => console.log(error));
    }
};

export const deleteTransaction = (transaction, month) => {
    return dispatch => {
        restService.delete('api/transactions', transaction.uuid)
            .then(() => {
                dispatch(close());
                dispatch(loadForMonth(month));
            }, error => console.error(error));
    }
};
