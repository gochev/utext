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
import Preview from "./Preview";

const parse = require('./parser/gr');

function App() {
    const [text, setText] = useState("");
    const [html, setHtml] = useState("");
    
    const [previewDevice, setPreviewDevice] = useState("iphone-x");

    const inputTextStyle = {
        width:"100%",
        minHeight:"875px"
    };

    let onTextChange = (e) => {
        setText(e.target.value);
        //parse
        // parser.parse();
        try {
            // console.log(parse.parse(e.target.value).map(e => e.html));
            setHtml(parse.parse(e.target.value).map(e => e.html).join(""));
            // setHtml(e.target.value);
        } catch {
            //todo do something with the errors
        }
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
                    <Nav.Link href="/wireframe" eventKey="link-1">Try</Nav.Link>
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
                                <ToggleButton value={3} onChange={() => {setPreviewDevice("blank-mockup")}}>None</ToggleButton>
                            </ToggleButtonGroup>
                        </ButtonToolbar>
                    </Col>
                </Row>
            </Container>
            <div className="splitContainer">
                <Split sizes={[40, 60]}>
                    <textarea className="codeeditor" style={inputTextStyle} onChange={onTextChange} value={text}/>
                    <div>
                        <div className={previewDevice}>
                            {deviceControls}
                            <Preview className="content">

                                <div className="container">


                                    <div className="row">

                                        <div className="col-lg-12">
                                <p dangerouslySetInnerHTML={{__html: html || "" }}/>
                                </div>
                                    </div>
                                </div>
                            </Preview>
                        </div>
                    </div>
                </Split>
           </div>

        </div>
    );
}

export default App;
