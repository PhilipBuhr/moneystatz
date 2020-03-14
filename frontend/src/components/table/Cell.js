import React from "react";
import './Cell.css';

class Cell extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: this.props.transaction.amount}
    }

    onChange = (event) => {
        this.setState({...this.state, value: event.target.value})
    };

    render() {
        return (
            <div className="Cell-container">
                <input className="Cell-field" value={this.state.value} onChange={this.onChange}/>
            </div>
        )
    }
}

export default Cell;
