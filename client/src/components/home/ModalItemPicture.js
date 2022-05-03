import React from 'react'
import { Modal } from 'react-bootstrap'

function ModalItemPicture(props) {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Item picture
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <img
                    src={props.src}
                    alt={props.alt}
                    className="bg-light rounded-3 h-100"
                    style={{ objectFit: 'contain', width: '100%' }}
                />
            </Modal.Body>
        </Modal>
    );
}

export default ModalItemPicture