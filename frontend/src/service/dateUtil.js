export const format = date => date.toISOString().substring(0, 10);

export const parse = dateString => {
    const parts = dateString.split('-');
    const year = parseInt(parts[0]);
    const month = parseInt(parts[1]);
    const day = parseInt(parts[2]);
    return new Date(Date.UTC(year, month - 1, day));
};
