import {Transactions} from "./transactions";

describe('Transaction', () => {
    const json = {
        transactions: [
            {
                uuid: 'd6b076e6-5350-4169-bc88-532097f161a4',
                amount: 1000,
                date: '2020-03-01',
                jar: 'Einkommen'
            },
            {
                uuid: 'db81494c-dad8-4721-83ad-19b350edb8c2',
                amount: 100,
                date: '2020-03-05',
                jar: 'Spaß'
            },
            {
                uuid: 'f6959a2b-75c1-4644-8e01-29e14aee70df',
                amount: 1000,
                date: '2020-03-23',
                jar: 'Spaß'
            },
        ],
        jars: ['Einkommen', 'Spaß', 'Notwendigkeiten']
    };

    it('should parse json', () => {
        const transactions = Transactions.parse(json);

        expect(transactions.jars.length).toEqual(3);

        const einkommen = transactions.get('Einkommen');
        expect(einkommen.length).toEqual(1);
        expect(einkommen[0].amount).toEqual(1000);
        expect(einkommen[0].date).toEqual('2020-03-01');
        expect(einkommen[0].jar).toEqual('Einkommen');
        expect(einkommen[0].uuid).toEqual('d6b076e6-5350-4169-bc88-532097f161a4');

        const spass = transactions.get('Spaß');
        expect(spass.length).toEqual(2);

        expect(transactions.get('Notwendigkeiten').length).toEqual(0);
    });

    it('should returns length of jar with most entries', () => {
        const transactions = Transactions.parse(json);

        expect(transactions.maxJarSize()).toEqual(2);
    });

    it('should return totals per jar', () => {
        const transactions = Transactions.parse(json);

        const data = transactions.toTotals();
        expect(data.length).toEqual(3);
        const jars = data.map(d => d.jar);
        expect(jars).toEqual(['Einkommen', 'Spaß', 'Notwendigkeiten']);
        const totals = data.map(d => d.total);
        expect(totals).toEqual([1000, 1100, 0]);
        const percentages = data.map(d => d.percentage);
        expect(percentages).toEqual([100, 110, 0]);
    });
});
