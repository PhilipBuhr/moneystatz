import React from "react";
import left from './keyboard_arrow_left-24px.svg';
import right from './keyboard_arrow_right-24px.svg'
import './Header.css'
import {nextDateAction, previousDateAction} from "../../actions/dateActions";
import {connect} from "react-redux";

class Header extends React.Component {
    render() {
        return (
            <div className="Header-container">
                <div className="Header-month-selector">
                    <img className="Header-img-button" src={left} alt="Left Button" onClick={this.previous}/>
                    <span className="Header-month">{this.props.month.getMonthName()}</span>
                    <span>{this.props.month.year}</span>
                    <img className="Header-img-button" src={right} alt="Right Button" onClick={this.next}/>
                </div>
                <div className="Header-balance">
                    Balance: {this.props.balance.toFixed(2)}
                </div>
            </div>
        );
    }

    previous = () => {
        this.props.previousDateAction(this.props.month);
    };

    next = () => {
        this.props.nextDateAction(this.props.month);
    };
}

const mapStateToProps = state => ({
    month: state.dateState.month,
    balance: state.dateState.transactions.calculateBalance()
});
const mapDispatchToProps = dispatch => ({
    previousDateAction: date => dispatch(previousDateAction(date)),
    nextDateAction: date => dispatch(nextDateAction(date))
});
export default connect(mapStateToProps, mapDispatchToProps)(Header);
