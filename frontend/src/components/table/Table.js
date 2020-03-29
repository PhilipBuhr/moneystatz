import React from "react";
import { connect } from "react-redux";
import './Table.css'
import addIcon from './plus.svg'
import Column from "./Column";
import { selectJar } from "../../actions/transactionActions";
import { v4 as uuid } from 'uuid';

class Table extends React.Component {

    renderColumns = () => {
        return this.props.transactions.jars.map(jar => (
            <Column
                jar={jar}
                key={jar.uuid}
                month={this.props.month}
                transactions={this.props.transactions.get(jar.name)}
                total={this.props.transactions.getTotal(jar.name)}
                minCells={this.props.transactions.maxJarSize()}
                onSelectJar={this.props.selectJar}
            />
        ))
    };

    render() {
        return (
            <div className="Table-container">
                {this.renderColumns()}
                <div className="Table-add-jar-button" onClick={this.addJar}>
                    <img className="Table-add-jar-button-icon" src={addIcon} alt="Add Jar"/>
                </div>
            </div>
        )
    }

    addJar = () => {
        const jar = {
            name: '',
            uuid: uuid(),
            order: this.props.transactions.jars.length,
            type: 'expense'
        };
        this.props.selectJar(jar);
    }
}

const mapStateToProps = state => ({
    transactions: state.dateState.transactions,
    month: state.dateState.month
});
const mapDispatchToProps = dispatch => ({
    selectJar: jar => dispatch(selectJar(jar))
});

export default connect(mapStateToProps, mapDispatchToProps)(Table);
