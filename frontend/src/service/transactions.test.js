import { Transactions } from "./transactions";

describe('Transaction', () => {
    const json = {
        transactions: [
            {
                uuid: 'd6b076e6-5350-4169-bc88-532097f161a4',
                amount: 500,
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
                amount: 400,
                date: '2020-03-23',
                jar: 'Spaß'
            },
            {
                uuid: '75bbb465-1401-494c-9c1b-5a72ab063cf2',
                amount: 1500,
                date: '2020-03-23',
                jar: 'Schwarzgeld'
            },
        ],
        jars: [
            {
                uuid: 'ae1ea2bc-05e8-4979-9830-597c4f79984c',
                name: 'Einkommen',
                type: 'income',
                order: 0
            },
            {
                uuid: '16776615-c90e-42e1-84a9-0bd341fa567e',
                name: 'Schwarzgeld',
                type: 'income',
                order: 3
            },
            {
                uuid: '24b05a06-e2b8-44f5-9726-c5ae140e0b4f',
                name: 'Spaß',
                type: 'expense',
                order: 1
            },
            {
                uuid: 'c040a094-bb4c-4072-94d9-0988cfed774b',
                name: 'Notwendigkeiten',
                type: 'expense',
                order: 2
            },
        ]
    };

    it('should parse json', () => {
        const transactions = Transactions.parse(json);

        expect(transactions.jars.length).toEqual(4);

        const einkommen = transactions.get('Einkommen');
        expect(einkommen.length).toEqual(1);
        expect(einkommen[0].amount).toEqual(500);
        expect(einkommen[0].date).toEqual('2020-03-01');
        expect(einkommen[0].jar).toEqual('Einkommen');
        expect(einkommen[0].uuid).toEqual('d6b076e6-5350-4169-bc88-532097f161a4');

        const spass = transactions.get('Spaß');
        expect(spass.length).toEqual(2);

        expect(transactions.get('Notwendigkeiten').length).toEqual(0);
    });

    it('should order jars', () => {
        const transactions = Transactions.parse(json);

        const names = transactions.jars.map(jar => jar.name);
        expect(names).toEqual(['Einkommen', 'Spaß', 'Notwendigkeiten', 'Schwarzgeld'])
    });

    it('should returns length of jar with most entries', () => {
        const transactions = Transactions.parse(json);

        expect(transactions.maxJarSize()).toEqual(2);
    });

    it('should return totals per jar', () => {
        const transactions = Transactions.parse(json);

        const data = transactions.toTotals();
        expect(data.length).toEqual(4);
        const jars = data.map(d => d.jar);
        expect(jars).toEqual(['Einkommen', 'Spaß', 'Notwendigkeiten', 'Schwarzgeld']);
        const totals = data.map(d => d.total);
        expect(totals).toEqual([500, 500, 0, 1500]);
        const percentages = data.map(d => d.percentage);
        expect(percentages).toEqual([25, 25, 0, 75]);
    });

    it('should calculate total for given jar', () => {
        const transactions = Transactions.parse(json);

        expect(transactions.getTotal('Einkommen')).toEqual(500);
        expect(transactions.getTotal('Spaß')).toEqual(500);
        expect(transactions.getTotal('Notwendigkeiten')).toEqual(0);
        expect(transactions.getTotal('Schwarzgeld')).toEqual(1500);
    });

    it('should calculate balance', () => {
        const transactions = Transactions.parse(json);

        expect(transactions.calculateBalance()).toEqual(1500)
    });
});
