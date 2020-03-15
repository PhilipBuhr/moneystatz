export class Month {
    constructor(month, year) {
        while (month > 12) {
            month -= 12;
            year += 1;
        }
        while (month < 1) {
            month += 12;
            year -= 1;
        }
        this.month = month;
        this.year = year;
    }

    static from(date) {
        return new Month(date.getMonth() + 1, date.getFullYear());
    }

    getPrevious() {
        return new Month(this.month - 1, this.year);
    }

    getNext() {
        return new Month(this.month + 1, this.year)
    }

    getFirstAsString() {
        let first = new Date(Date.UTC(this.year, this.month -1 , 1));
        return first.toISOString().substring(0, 10);
    }

    getLastAsString() {
        const last = new Date(Date.UTC(this.year, this.month, 0));
        return last.toISOString().substring(0, 10);
    }

    getMonthName() {
        const date = new Date(Date.UTC(this.year, this.month - 1, 1));
        return date.toLocaleString('default', { month: 'long' });
    }
}
