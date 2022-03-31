import React, {useState} from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const inputTextStyle = {
    width:"100%",
    minHeight:"460px"
};

export default function ShowHtmlCode(props) {
    const [show, setShow] = useState(false);

    let themeCss= `css/icontent/${props.theme}/bootstrap.min.css`;

    let previewHtml =  `<html lang="en">
                        <head>
                            <link rel="stylesheet" href="${themeCss}" media="screen"/>
                        </head>
                        <body>${props.html}
                        <script src="js/icontent/jquery.min.js"></script>
                        <script src="js/icontent/popper.min.js"></script>
                        <script src="js/icontent/bootstrap.min.js"></script>
                        </body>
                        </html>`;

    return (
        <>
            <Button variant="success" onClick={() => setShow(true)}>
                Show html
            </Button>

            <Modal
                show={show}
                onHide={() => setShow(false)}
                dialogClassName="modal-90w"
                aria-labelledby="example-custom-modal-styling-title"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-custom-modal-styling-title">
                        HTML
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <textarea style={inputTextStyle}>
                        {previewHtml}
                    </textarea>
                    <p>
                        <Container>
                            <Row>
                                <Col sm={12}>
                                    Additional resources you might need (related to bootstrap and the theme):
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={12}>
                                    <a href={themeCss}>{themeCss}</a>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={12}>
                                    <a href="js/icontent/jquery.min.js">js/icontent/jquery.min.js</a>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={12}>
                                    <a href="js/icontent/popper.min.js">js/icontent/popper.min.js</a>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={12}>
                                    <a href="js/icontent/bootstrap.min.js">js/icontent/bootstrap.min.js</a>
                                </Col>
                            </Row>

                        </Container>
                    </p>
                </Modal.Body>
            </Modal>
        </>
    );
}
