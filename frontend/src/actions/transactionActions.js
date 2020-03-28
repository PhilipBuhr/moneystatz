import { loadForMonth } from "./dateActions";

export const TransactionTypes = {
    CLOSE: "CLOSE",
    SELECT: "SELECT",
    ADD_JAR: "ADD_JAR",
    CLOSE_JAR: "CLOSE_JAR"
};

export const closeTransaction = () => ({
    type: TransactionTypes.CLOSE
});

export const select = transaction => ({
    type: TransactionTypes.SELECT,
    transaction: transaction
});

export const submit = transaction => {
    return (dispatch, getState, services) => {
        services.restService.post('api/transactions', transaction)
            .then(() => {
                dispatch(closeTransaction());
                dispatch(loadForMonth(getState().dateState.month));
            }, error => console.log(error));
    }
};

export const deleteTransaction = transaction => {
    return (dispatch, getState, services) => {
        services.restService.delete('api/transactions', transaction.uuid)
            .then(() => {
                dispatch(closeTransaction());
                dispatch(loadForMonth(getState().dateState.month));
            }, error => console.error(error));
    }
};

export const openAddJar = () => {
    return {
        type: TransactionTypes.ADD_JAR
    }
};

export const closeAddJar = () => {
    return {
        type: TransactionTypes.CLOSE_JAR
    }
};

export const submitJar = jarName => {
    return (dispatch, getState, services) => {
        services.restService.post('api/jars', { jar: jarName })
            .then(() => {
                dispatch(closeAddJar());
                dispatch(loadForMonth(getState().dateState.month))
            })
    }
};
