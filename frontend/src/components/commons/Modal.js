import React from "react";
import './Modal.css';
import deleteIcon from "./delete-24px.svg";
import check from "./check-24px.svg";
import closeIcon from "./close-24px.svg";

class Modal extends React.Component {
    render() {
        return (
            <div className="Modal-container" onClick={this.onBackgroundClick}>
                <div className="Modal-modal">
                    <div className="Modal-body">
                        {this.props.children}
                    </div>
                    <div className="Modal-button-box">
                        {this.renderDeleteButton()}
                        <button className="Modal-button submit" onClick={this.props.onSubmit}>
                            <img className="Modal-icon-button" src={check} alt="Submit"/>
                        </button>
                        <button className="Modal-button close" onClick={this.props.onClose}>
                            <img className="Modal-icon-button" src={closeIcon} alt="Cancel"/>
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    renderDeleteButton() {
        if (this.props.onDelete) {
            return (
                <button className="Modal-button delete" onClick={this.props.onDelete}>
                    <img className="Modal-icon-button" src={deleteIcon} alt="Delete"/>
                </button>
            )
        }
    }


    onBackgroundClick = event => {
        if (event.target.closest('.Modal-modal')) {
            return;
        }
        this.props.onClose();
    };
}

export default Modal;
