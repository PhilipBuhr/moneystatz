import React from 'react';
import './App.css';
import Header from "./components/head/Header";
import Table from "./components/table/Table";
import {loadDateAction} from "./actions/dateActions";
import {connect} from "react-redux";

class App extends React.Component {

    componentDidMount() {
        this.props.loadDate(new Date());
    }

    render() {
        return (
            <div className="App">
                <div className="App-head"><Header/></div>
                <div className="App-table"><Table/></div>
                <div className="App-chart"></div>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    loadDate: (date) => dispatch(loadDateAction(date))
});
export default connect(() => {}, mapDispatchToProps)(App);
