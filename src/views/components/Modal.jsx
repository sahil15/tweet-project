import React from 'react';
import { Modal } from "react-bootstrap";

function BTModal(props) {
    return (
        <Modal
            {...props.attr}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">{props.modalTitle}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {props.children}
            </Modal.Body>
        </Modal>
    );
}

export default BTModal;