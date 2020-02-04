import React, {useState} from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default function HelpModalDialog() {
    const [show, setShow] = useState(false);

    return (
        <>
            <Button variant="info" onClick={() => setShow(true)}>
                ?
            </Button>

            <Modal
                show={show}
                onHide={() => setShow(false)}
                dialogClassName="modal-90w"
                aria-labelledby="example-custom-modal-styling-title"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-custom-modal-styling-title">
                        Help with UTeXt
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        UTeXt is like an extension to markdown. So most of the markdown rules should work. <br/>
                        However we have few other rules that are explained bellow:
                    </p>









                </Modal.Body>
            </Modal>
        </>
    );
}
