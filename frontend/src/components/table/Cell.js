import React from "react";
import './Cell.css';

class Cell extends React.Component {

    render() {
        return (
            <div className="Cell-container">
                {this.props.transaction.amount}
            </div>
        )
    }
}

export default Cell;
