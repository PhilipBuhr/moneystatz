import React from 'react';
import './App.css';
import Header from "./components/head/Header";
import Table from "./components/table/Table";
import {loadForMonth} from "./actions/dateActions";
import {connect} from "react-redux";
import {Month} from "./service/month";
import TransactionModal from "./components/transactionModal/TransactionModal";

class App extends React.Component {

    componentDidMount() {
        this.props.loadForMonth(Month.from(new Date()));
    }

    render() {
        return (
            <div className="App">
                <div className="App-head"><Header/></div>
                <div className="App-table"><Table/></div>
                <div className="App-chart"/>
                <TransactionModal/>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    loadForMonth: (date) => dispatch(loadForMonth(date))
});
export default connect(() => {}, mapDispatchToProps)(App);
