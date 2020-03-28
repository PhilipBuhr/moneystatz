import React from "react";
import { connect } from "react-redux";
import './JarModal.css';
import Modal from "../commons/Modal";
import { closeAddJar, submitJar } from "../../actions/transactionActions";

export class JarModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {jarName: ''}
    }
    render() {
        if (!this.props.active) {
            return null;
        }
        return (
            <Modal onClose={this.onClose} onSubmit={this.onSubmit}>
                <div className="AddJarModal-body">
                    <div>Jar</div><input value={this.state.jarName} onChange={this.onChange}/>
                </div>
            </Modal>
        );
    }

    onChange = event => {
        this.setState({...this.state, jarName: event.target.value})
    };

    onSubmit = () => {
        this.props.submit(this.state.jarName);
        this.resetJarName();
    };

    resetJarName() {
        this.setState({...this.state, jarName: ''})
    }

    onClose = () => {
        this.resetJarName();
        this.props.close();
    };
}

const mapStateToProps = state => ({
    active: state.dateState.jar_modal,
});

const mapDispatchToProps = dispatch => ({
    close: () => dispatch(closeAddJar()),
    submit: jarName => dispatch(submitJar(jarName))
});

export default connect(mapStateToProps, mapDispatchToProps)(JarModal);
