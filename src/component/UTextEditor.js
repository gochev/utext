import React, {useState} from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import Container from "react-bootstrap/Container";
import Split from "react-split";
import AceEditor from "react-ace";
import Preview from "../Preview";
import Button from "react-bootstrap/Button";

const parse = require('../parser/grammar');

export default function UTextEditor () {

    const [text, setText] = useState("");
    const [html, setHtml] = useState("");

    const [previewDevice, setPreviewDevice] = useState("iphone-x");

    // const inputTextStyle = {
    //     width:"100%",
    //     minHeight:"875px"
    // };

    // let onTextChange = (e) => {
    //     setText(e.target.value);
    //     //parse
    //     // parser.parse();
    //     try {
    //         // console.log(parse.parse(e.target.value).map(e => e.html));
    //         setHtml(parse.parse(e.target.value).map(e => e.html).join(""));
    //         // setHtml(e.target.value);
    //     } catch {
    //         //todo do something with the errors
    //     }
    // };

    let onChange = (newValue) => {
        setText(newValue);
        try {
            newValue += "\n";
            let newHtml = parse.parse(newValue).map(e => e.html).join("");
            setHtml(newHtml);
            // setHtml(newValue);
        } catch {
            //todo do something with the errors
        }
    }

    let deviceControls = null;
    if(previewDevice === "iphone-x") {
        deviceControls = (<>
                <i>Speaker</i>
                <b>Camera</b>
            </>
        );
    }

    return (
        <>
            <Container fluid={true}>
                <Row>
                    <Col> Type your uTeXt bellow, it looks like markdown but on steroids. <br/> If you want to learn more <Button variant="info">?</Button> </Col>
                    <Col>
                        {/*Frame: */}
                        {/*<ButtonToolbar>*/}
                        {/*    <ToggleButtonGroup type="radio" name="options" defaultValue={1}>*/}
                        {/*        <ToggleButton value={1} onChange={() => {setPreviewDevice("iphone-x")}}>Phone</ToggleButton>*/}
                        {/*        /!*<ToggleButton value={2} onChange={() => {setPreviewDevice("browser-mockup with-url")}}>Browser</ToggleButton>*!/*/}
                        {/*        /!*<ToggleButton value={3} onChange={() => {setPreviewDevice("blank-mockup")}}>No Frame</ToggleButton>*!/*/}
                        {/*    </ToggleButtonGroup>*/}
                        {/*</ButtonToolbar>*/}
                        <ButtonToolbar>
                            <Button variant="primary">Export as Image</Button>
                            <Button variant="secondary">Export as Gist (Requires Github Login)</Button>
                        </ButtonToolbar>
                    </Col>
                </Row>
            </Container>
            <div className="splitContainer">
                <Split sizes={[40, 60]}>
                    {/*<textarea className="codeeditor" style={inputTextStyle} onChange={onTextChange} value={text}/>*/}
                    <AceEditor
                        placeholder=""
                        mode="markdown"
                        theme="github"
                        className="codeeditor"
                        name="codeeditor"
                        onChange={onChange}
                        fontSize={13}
                        showPrintMargin={true}
                        showGutter={true}
                        highlightActiveLine={true}
                        value={text}
                        setOptions={{
                            enableBasicAutocompletion: true,
                            enableLiveAutocompletion: false,
                            enableSnippets: false,
                            showLineNumbers: true,
                            tabSize: 2,
                        }}/>

                    <div>
                        <div className={previewDevice}>
                            {deviceControls}
                            <Preview className="content">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-xl-12">
                                            <p dangerouslySetInnerHTML={{__html: html || "" }}/>
                                        </div>
                                    </div>
                                </div>
                            </Preview>
                        </div>
                    </div>
                </Split>
            </div>
        </>
    );
}
