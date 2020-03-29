export class Transactions {
    constructor(jars) {
        this.jars = jars;
        this.jars.sort((a, b) => a.order - b.order);
        this.groupedTransactions = {};
        this.jars.forEach(jar => this.groupedTransactions[jar.name] = [])
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

    get(jarName) {
        let transactions = this.groupedTransactions[jarName];
        if (transactions) {
            return transactions;
        }
        return [];
    }

    maxJarSize() {
        return this.jars
            .map(jar => this.get(jar.name))
            .map(transactions => transactions.length)
            .reduce((max, size) => Math.max(max, size), 0);
    }

    getTotal(jar) {
        return  this.get(jar)
                .map(transaction => transaction.amount)
                .reduce((sum, amount) => sum + amount, 0);
    }

    _getPercentage(jar) {
        let totalIncome = this.getIncome();
        totalIncome = totalIncome ? totalIncome : 0.1;
        return 100 * this.getTotal(jar) / totalIncome
    }

    toTotals() {
        return this.jars.map(jar => {
            let jarName = jar.name;
            const total = this.getTotal(jarName);
            const percentage = this._getPercentage(jarName);
            return {jar: jarName, total: total, percentage: percentage, type: jar.type}
        })
    }

    calculateBalance() {
        const income = this.getIncome();
        return this.jars
            .filter(jar => jar.type !== 'income')
            .map(jar => this.getTotal(jar.name))
            .reduce((balance, jar) => balance - jar, income);
    }

    getIncome() {
        return this.jars
            .filter(jar => jar.type === 'income')
            .map(jar => this.getTotal(jar.name))
            .reduce((total, jar) => total + jar, 0);
    }
}
