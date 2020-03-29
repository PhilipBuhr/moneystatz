import { loadForMonth } from "./dateActions";

export const TransactionTypes = {
    CLOSE: "CLOSE",
    SELECT: "SELECT",
    ADD_JAR: "ADD_JAR",
    CLOSE_JAR: "CLOSE_JAR",
    SELECT_JAR: "SELECT_JAR"
};

export const closeTransaction = () => ({
    type: TransactionTypes.CLOSE
});

export const selectTransaction = transaction => ({
    type: TransactionTypes.SELECT,
    transaction: transaction
});

export const submitTransaction = transaction => {
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

export const closeAddJar = () => {
    return {
        type: TransactionTypes.CLOSE_JAR
    }
};

export const selectJar = jar => {
    return {
        type: TransactionTypes.SELECT_JAR,
        jar: jar
    }
};

export const submitJar = jar => {
    return (dispatch, getState, services) => {
        services.restService.post('api/jars', { name: jar.name, uuid: jar.uuid, type: jar.type, order: jar.order})
            .then(() => {
                dispatch(closeAddJar());
                dispatch(loadForMonth(getState().dateState.month))
            })
    }
};
