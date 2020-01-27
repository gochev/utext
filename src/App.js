import React, {useState} from 'react';
import './App.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from "react-bootstrap/Nav";
import Split from 'react-split'
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import Button from "react-bootstrap/Button";
import Preview from "./Preview";


function App() {
    const [text, setText] = useState("");
    const [html, setHtml] = useState("");
    
    const [previewDevice, setPreviewDevice] = useState("iphone-x");

    const inputTextStyle = {
        width:"100%",
        minHeight:"875px"
    };

    let onTextChange = e => {
            setText(e.target.value);
            setHtml(e.target.value);
    };

    let deviceControls = null;
    if(previewDevice === "iphone-x") {
        deviceControls = (<>
                <i>Speaker</i>
                <b>Camera</b>
            </>
        );
    }

    return (
        <div className="App">
            <Nav variant="pills" defaultActiveKey="/home">
                <Nav.Item>
                    <Nav.Link href="/home">Home</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="link-1">Try</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="disabled" disabled>
                        Prototype
                    </Nav.Link>
                </Nav.Item>

            </Nav>
            <Container fluid={true}>
                <Row>
                    <Col>utext</Col>
                    <Col>
                        Frame: <ButtonToolbar>
                            <ToggleButtonGroup type="radio" name="options" defaultValue={1}>
                                <ToggleButton value={1} onChange={() => {setPreviewDevice("iphone-x")}}>Phone</ToggleButton>
                                <ToggleButton value={2} onChange={() => {setPreviewDevice("browser-mockup with-url")}}>Browser</ToggleButton>
                                <ToggleButton value={3} onChange={() => {setPreviewDevice("")}}>None</ToggleButton>
                            </ToggleButtonGroup>
                        </ButtonToolbar>
                    </Col>
                </Row>
            </Container>
            <div className="splitContainer">
                <Split>
                    <textarea style={inputTextStyle} onChange={onTextChange} value={text}/>
                    <div>
                        <div className={previewDevice}>
                            {deviceControls}
                            <Preview className="content">
                                <p dangerouslySetInnerHTML={{__html: html || "" }}/>
                            </Preview>
                        </div>
                    </div>
                </Split>
           </div>

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
