import React from 'react';
import './App.css';
import Header from "./components/head/Header";
import Table from "./components/table/Table";
import { loadForMonth, selectStatisticRange } from "./actions/dateActions";
import { connect } from "react-redux";
import { Month } from "./service/month";
import TransactionModal from "./components/transactionModal/TransactionModal";
import AddJarModal from "./components/jarModal/JarModal";
import ChartBox from './components/chart/ChartBox';

import de from 'date-fns/locale/de'
import { registerLocale, setDefaultLocale } from 'react-datepicker';

registerLocale('de', de);
setDefaultLocale('de');

class App extends React.Component {

    componentDidMount() {
        let currentMonth = Month.from(new Date());
        this.props.loadForMonth(currentMonth);
        this.props.selectStatisticRange(currentMonth.getFirstAsString(), currentMonth.getLastAsString());
    }

    render() {
        return (
            <div className="App">
                <div className="App-head"><Header/></div>
                <div className="App-table"><Table/></div>
                <div className="App-chart"><ChartBox/></div>
                <TransactionModal/>
                <AddJarModal/>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    loadForMonth: (date) => dispatch(loadForMonth(date)),
    selectStatisticRange: (from, to) => dispatch(selectStatisticRange(from, to))
});
export default connect(null, mapDispatchToProps)(App);
