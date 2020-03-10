import React from "react";
import left from './keyboard_arrow_left-24px.svg';
import right from './keyboard_arrow_right-24px.svg'
import './Header.css'
import {nextDateAction, previousDateAction} from "../../actions/dateActions";
import {connect} from "react-redux";

class Header extends React.Component {
    render() {
        console.log(this.props)
        return (
            <div className="Header-container">
                <img className="Header-img-button" src={left} alt="Left Button" onClick={this.previous}/>
                <span className="Header-month">{this.props.date.toLocaleString('default', { month: 'long' })}</span>
                <span>{this.props.date.getFullYear()}</span>
                <img className="Header-img-button" src={right} alt="Right Button" onClick={this.next}/>
            </div>
        );
    }

    previous = () => {
        this.props.previousDateAction(this.props.date);
    };

    next = () => {
        this.props.nextDateAction(this.props.date);
    };
}

const mapStateToProps = state => ({
    date: new Date(state.dateState.year, state.dateState.month)
});
const mapDispatchToProps = dispatch => ({
    previousDateAction: date => dispatch(previousDateAction(date)),
    nextDateAction: date => dispatch(nextDateAction(date))
});
export default connect(mapStateToProps, mapDispatchToProps)(Header);
