import React, {useState} from 'react';
import './App.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function App() {
    const [text, setText] = useState("");
    const [html, setHtml] = useState("");

    const inputTextStyle = {
        width:"100%",
        minHeight:"875px"
    };

    let onTextChange = e => {
            setText(e.target.value);
            setHtml(e.target.value);
    };

    return (
        <div className="App">
            <Container>
                <Row>
                    <Col>utext</Col>
                    <Col>html</Col>
                </Row>
                <Row>
                    <Col><textarea style={inputTextStyle} onChange={onTextChange} value={text}/></Col>
                    <Col>
                        <div className="iphone-x">
                            <i>Speaker</i>
                            <b>Camera</b>
                            <div className="content" dangerouslySetInnerHTML={{__html: html || "" }}>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
            {/*<header className="App-header">*/}
            {/*  <img src={logo} className="App-logo" alt="logo" />*/}
            {/*  <p>*/}
            {/*    Edit <code>src/App.js</code> and save to reload.*/}
            {/*  </p>*/}
            {/*  <a*/}
            {/*    className="App-link"*/}
            {/*    href="https://reactjs.org"*/}
            {/*    target="_blank"*/}
            {/*    rel="noopener noreferrer"*/}
            {/*  >*/}
            {/*    Learn React*/}
            {/*  </a>*/}
            {/*</header>*/}

            <Button variant="primary"> test </Button>
        </div>
    );
}

export default App;
