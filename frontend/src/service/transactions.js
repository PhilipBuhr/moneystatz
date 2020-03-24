export class Transactions {
    constructor(jars) {
        this.jars = jars;
        this.groupedTransactions = {};
        this.jars.forEach(jar => this.groupedTransactions[jar] = [])
    }

    static parse(json) {
        let transactions = new Transactions(json['jars']);
        json['transactions'].forEach(transaction => transactions.push(transaction));
        return transactions;
    }

    push(transaction) {
        let jar = transaction['jar'];
        this.groupedTransactions[jar].push(transaction);
    }

    get(jar) {
        let transactions = this.groupedTransactions[jar];
        if (transactions) {
            return transactions;
        }
        return [];
    }

    maxJarSize() {
        return this.jars
            .map(jar => this.get(jar))
            .map(transactions => transactions.length)
            .reduce((max, size) => Math.max(max, size), 0);
    }

    toTotals() {
        return this.jars.map(jar => {
            const total = this.get(jar)
                .map(transaction => transaction.amount)
                .reduce((sum, amount) => sum + amount, 0);
            return {jar: jar, total: total}
        })
    }
}
