import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import React, {useState} from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function LoadGistModalDialog (props) {
    const [show, setShow] = useState(false);

    const [gistRawUrl, setGistRawUrl] = useState('');

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleGistLoad = () => {
        setShow(false);
        props.handleGistLoad(gistRawUrl);
    };

    return (
        <>
            <Button variant="secondary" onClick={handleShow}>
                Load gist
            </Button>
            <Modal show={show} onHide={handleClose} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>{props.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    You must enter a URL to a gist that contains UteXt that we can preview.
                    <br/>
                    If you do not remember your URLs just go to <a href="https://gist.github.com/your-user-name" target="_blank">https://gist.github.com/your-user-name</a> and grab the one !
                    <Container>
                        <Row>
                            <Col sm={12}><img src="/images/gist-load-1.jpg" style={{maxWidth: 700}}/></Col>
                        </Row>
                        <Row>
                            <Col sm={12}><img src="/images/gist-load-2.jpg" style={{maxWidth: 700}}/></Col>
                        </Row>
                    </Container>
                    <Form>
                        <Form.Group controlId="gistRawUrl">
                            <Form.Label>Paste GitHub Gist Raw URL</Form.Label>
                            <Form.Control type="text" placeholder="https://gist...../raw" value={gistRawUrl} onChange={ e => setGistRawUrl(e.target.value)}/>
                            <Form.Text className="text-muted">
                                You can also use someone else public gist URL.
                            </Form.Text>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleGistLoad}>
                        Load gist
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
