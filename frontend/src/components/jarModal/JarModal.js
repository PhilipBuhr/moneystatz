import React from "react";
import { connect } from "react-redux";
import './JarModal.css';
import Modal from "../commons/Modal";
import { closeAddJar, selectJar, submitJar } from "../../actions/transactionActions";

export class JarModal extends React.Component {

    render() {
        if (!this.props.active) {
            return null;
        }
        return (
            <Modal onClose={this.onClose} onSubmit={this.onSubmit}>
                <div className="AddJarModal-body">
                    <div>Jar</div><input value={this.props.jar.name} onChange={event => this.onChange(event, 'name')}/>
                    <div>Type</div>
                    <select value={this.props.jar.type} onChange={event => this.onChange(event, 'type')}>
                        <option value="income">Income</option>
                        <option value="expense">Expense</option>
                    </select>
                    <div>Order</div><input value={this.props.jar.order} onChange={event => this.onChange(event, 'order')}/>
                </div>
            </Modal>
        );
    }

    onChange = (event, property) => {
        const newJar = { ...this.props.jar };
        newJar[property] = event.target.value;
        this.props.change(newJar);
    };

    onSubmit = () => {
        this.props.submit(this.props.jar);
    };


    onClose = () => {
        this.props.close();
    };
}

const mapStateToProps = state => ({
    active: !!state.dateState.selectedJar,
    jar: state.dateState.selectedJar
});

const mapDispatchToProps = dispatch => ({
    close: () => dispatch(closeAddJar()),
    change: jar => dispatch(selectJar(jar)),
    submit: jar => dispatch(submitJar(jar))
});

export default connect(mapStateToProps, mapDispatchToProps)(JarModal);
