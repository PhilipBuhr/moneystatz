export const TransactionTypes = {
    CLOSE: "CLOSE",
    SELECT: "SELECT"
};

export const close = () => ({
    type: TransactionTypes.CLOSE
});

export const select = transaction => ({
    type: TransactionTypes.SELECT,
    payload: transaction
});
