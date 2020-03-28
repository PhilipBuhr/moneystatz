import { Month } from "./month";

describe('Month', () => {
    it('should set month to calendar number', () => {
        const date = new Date(Date.UTC(2020, 2, 31)); // that's March
        const month = Month.from(date);
        expect(month.month).toEqual(3);
        expect(month.year).toEqual(2020);
    });

    it('should return previous month over year borders', () => {
        const month = new Month(2, 2020);
        const previous = month.getPrevious();
        expect(previous.month).toEqual(1);
        expect(previous.year).toEqual(2020);

        expect(previous.getPrevious().month).toEqual(12);
        expect(previous.getPrevious().year).toEqual(2019);
    });

    it('should return next Month', () => {
        const month = new Month(12, 2019);
        expect(month.getNext().month).toEqual(1);
        expect(month.getNext().year).toEqual(2020);

    });

    it('should return first of Month', () => {
        const month = new Month(3, 2020);
        const first = month.getFirstAsString();
        expect(first).toEqual('2020-03-01');
    });

    it('should return last of Month', () => {
        const month = new Month(2, 2020); //leap year
        const last = month.getLastAsString();
        expect(last).toEqual('2020-02-29');
    });

    it('should return localized Month String', () => {
        const month = new Month(3, 2020);

        expect(month.getMonthName()).toEqual('March')
    });
});
