import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import React, {useState} from "react";
import Form from "react-bootstrap/Form";

export default function SaveGistModalDialog (props) {
    const [show, setShow] = useState(false);

    const [username, setUsername] = useState(sessionStorage.getItem("username") ? sessionStorage.getItem("username") :'');
    const [password, setPassword] = useState(sessionStorage.getItem("password") ?sessionStorage.getItem("password") : '');

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleCreate = () => {
        sessionStorage.setItem("username", username);
        sessionStorage.setItem("password", password);
        setShow(false);
        let token = username + ":" + password;
        let hash = btoa(token);
        props.handleCreate(hash);
    };

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Save as gist
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{props.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    You have to login to github in order to create a gist, or you can create it manually of course with
                    copy/paste! <br/>
                    <Form>
                        <Form.Group controlId="username">
                            <Form.Label>GitHub username</Form.Label>
                            <Form.Control type="username" placeholder="Enter your username, without the @ ;)" value={username} onChange={ e => setUsername(e.target.value)}/>
                            <Form.Text className="text-muted">
                                This is open source and is all client side... there is no mambo jambo ;) ... just basic auth
                            </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="password">
                            <Form.Label>Github Password</Form.Label>
                            <Form.Control type="password" placeholder="Your Password" value={password} onChange={e => setPassword(e.target.value)}/>
                        </Form.Group>
                        <a href="https://github.com/join?source=header-home" target="_blank">You can register at GitHub if you dont have account yet.</a>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleCreate}>
                        Create gist
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
