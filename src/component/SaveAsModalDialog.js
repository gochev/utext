import React, {useState} from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

export default function SaveAsModalDialog() {
    const [show, setShow] = useState(false);

    return (
        <>
            <Button onClick={() => setShow(true)}>
                Save as
            </Button>

            <Modal
                show={show}
                onHide={() => setShow(false)}
                dialogClassName="modal-90w"
                aria-labelledby="example-custom-modal-styling-title"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-custom-modal-styling-title">
                        Save As
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        Currently you have to save us your content by <string>yourself</string> if you desire to use it outside of UTeXt.<br/>
                        The plan is in the near feature to export bootstrap ready to use html that you can use in your projects. <br/>
                        We are working on exporting the content in the correct bootstrap columns classes (col-xs-4 etc), since right now everything is in one single column.
                    </p>
                    <p>
                        In order to save your markup if you dont want to use github gist you can just right click and select "save as"
                    </p>
                    <p>
                        <Container>
                            <Row>
                                <Col sm={12}>
                                    <p>Right click on the page <br/>
                                        <img src="/images/save-as-1.jpg" style={{maxWidth: 700}}
                                             alt="save as picture context menu"/></p>
                                    <p>The context menu might be different on different browsers but it is always
                                        present.</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={12}>
                                    Select one of the options:
                                    <ul>
                                        <li>
                                            Web Page, Single file - everything is exported in single mhtml file ideal for sharing the design with someone.
                                        </li>
                                        <li>
                                            Web Page, complete - everything is exported as a file + a folder with assets, inside the folder with assets
                                            the file preview.html might be useful since it contains the HTML code shown in the device preview.<br/>
                                            Keep in mind as of today the bootstrap columns are NOT exported correctly but at least you have all all real html element <br/>
                                            You can also use the bootstrap.min(1).css but if you want just replace it with whatever bootstrap style you want to apply a theme. <br/>
                                            The last is also a planed feature for the future, to give you the ability to select themes on the preview in the UTeXt itself.
                                        </li>
                                    </ul>
                                </Col>
                            </Row>
                        </Container>
                    </p>
                </Modal.Body>
            </Modal>
        </>
    );
}
