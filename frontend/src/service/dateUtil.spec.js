import {format, parse} from "./dateUtil";

describe('dateUtil', () => {
    it('should return YYYY-mm-dd date format', () => {
        const date = new Date(Date.UTC(2020, 2, 1));
        const formatted = format(date);
        expect(formatted).toEqual('2020-03-01');
    });

    it('should parse date string', () => {
        const formatted = '2020-03-01';
        const date = parse(formatted);
        expect(date.getDate()).toEqual(1);
        expect(date.getMonth()).toEqual(2);
        expect(date.getFullYear()).toEqual(2020);
    });
});
