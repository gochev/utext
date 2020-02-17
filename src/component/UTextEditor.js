import React, {useState} from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import Container from "react-bootstrap/Container";
import Split from "react-split";
import AceEditor from "react-ace";
import Preview from "../Preview";
import Toast from "react-bootstrap/Toast";
import HelpModalDialog from "./HelpModalDialog";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import ShowHtmlCode from "./ShowHtmlCode";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";

const parse = require('../parser/grammar');

export default function UTextEditor () {

    const [text, setText] = useState("");
    const [html, setHtml] = useState("");

    const [previewDevice, setPreviewDevice] = useState("iphone-x");
    const [previewTheme, setPreviewTheme] = useState("sketch");

    const inputTextStyle = {
        width:"100%",
        minHeight:"860px"
    };

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
        updateHtmlPreview(newValue);
    };

    let updateHtmlPreview = (newValue) => {
        try {
            newValue += "\n";
            let newHtml = parse.parse(newValue).map(e => e.html).join("");
            setHtml(newHtml);
            // setHtml(newValue);
        } catch {
            //todo do something with the errors
        }
    };

    const [gistMessage, setGistMessage] = useState("");
    const [showGistMessage, setShowGistMessage] = useState(false);
    const toggleShowGistMessage = () => setShowGistMessage(!showGistMessage);

    let handleCreate = (token) => {
        let payload = JSON.stringify({
            "description": "utext snippet",
            "public": true,
            "files": {
                "utext_snippet": {
                    "content": text
                }
            }
        });

        fetch("https://api.github.com/gists",
            {
                method: 'POST',
                headers: {
                    "Content-Type" : "application/json",
                    "Authorization": `Basic ${token}`
                },
                body: payload
            }).then(function (response) {
            // console.log(url + " -> " + response.ok);
            if (response.ok) {
                return response.text();
            } else {
                return 'Failed to create gist ' + response.status + ':' + response.statusText;
            }
        }).then(function (data) {
            let newGistURL = null;
            try {
                let jsonData = JSON.parse(data);
                newGistURL = jsonData.url;
                setGistMessage(`Gist created, you can view it <a href='${newGistURL}' target='_blank'>here!</a> 
                        You can view all your saved gists at <a href="https://gist.github.com/${jsonData.owner.login}" target="_blank">https://gist.github.com/${jsonData.owner.login}<a/>`);
            } catch {
                setGistMessage("Unable to create gist " + data);
            }
            setShowGistMessage(true);
        }).catch(function (err) {
            setGistMessage("Failed to create gist \n" + err.message);
            setShowGistMessage(true);
        });

    };

    let handleGistLoad = (url) => {
        if(url){
            fetch(url, {method: 'GET'})
                .then(function (response) {
                    // console.log(url + " -> " + response.ok);
                    if (response.ok) {
                        return response.text();
                    } else {
                        return 'Failed to get gist';
                    }
                }).then(function (data) {
                console.log("data: ", data);
                setText(data);
                updateHtmlPreview(data);
                setGistMessage("Loading gist successful");
            }).catch(function (err) {
                setGistMessage("Failed to load " + url + err.message);
            });
        } else {
            setGistMessage("Failed to load gist, please enter URL to preview ");
        }
        setShowGistMessage(true);
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
        <>
            <Container fluid={true}>
                <Row>
                    <Col>
                        Type your uTeXt bellow, it is like markdown but on steroids. <br/>
                        You want to learn more about the syntax <HelpModalDialog/>
                        <Toast style={{
                                position: 'fixed',
                                top: 15,
                                right: 15,
                                zIndex:100
                            }} show={showGistMessage} onClose={toggleShowGistMessage} delay={3000} autohide>
                            <Toast.Header>
                                <strong className="mr-auto">Notification</strong>
                                <small>1 min ago</small>
                            </Toast.Header>
                            <Toast.Body><p dangerouslySetInnerHTML={{__html: gistMessage || "" }}/></Toast.Body>
                        </Toast>
                    </Col>
                    <Col>
                        <ButtonToolbar>
                            <ToggleButtonGroup type="radio" name="options" defaultValue={1}>
                                <ToggleButton value={1} onChange={() => {setPreviewDevice("iphone-x")}}>Phone</ToggleButton>
                                <ToggleButton value={2} onChange={() => {setPreviewDevice("browser-mockup with-url")}}>Browser</ToggleButton>
                                <ToggleButton value={3} onChange={() => {setPreviewDevice("blank-mockup")}}>No Frame</ToggleButton>
                            </ToggleButtonGroup>
                        </ButtonToolbar>
                        <ButtonToolbar>
                            {/*<SaveGistModalDialog title="Save as gist" handleCreate={handleCreate}/>*/}
                            {/*<LoadGistModalDialog title="Load gist" handleGistLoad={handleGistLoad}/>*/}
                            {/*<SaveAsModalDialog/>*/}
                            <ShowHtmlCode html={html} theme={previewTheme}/>
                            <DropdownButton id="dropdown-basic-button" title="Change Theme" onSelect={(e) => {setPreviewTheme(e.replace("#/",""))}}>
                                <Dropdown.Item href="#/sketch">Default Theme(Sketch)</Dropdown.Item>
                                <Dropdown.Item href="#/cerulean">Cerulean</Dropdown.Item>
                                <Dropdown.Item href="#/cosmo">Cosmo</Dropdown.Item>
                                <Dropdown.Item href="#/cyborg">Cyborg</Dropdown.Item>
                                <Dropdown.Item href="#/darkly">Darkly</Dropdown.Item>
                                <Dropdown.Item href="#/flatly">Flatly</Dropdown.Item>
                                <Dropdown.Item href="#/journal">Journal</Dropdown.Item>
                                <Dropdown.Item href="#/litera">Litera</Dropdown.Item>
                                <Dropdown.Item href="#/lumen">Lumen</Dropdown.Item>
                                <Dropdown.Item href="#/lux">Lux</Dropdown.Item>
                                <Dropdown.Item href="#/materia">Materia</Dropdown.Item>
                                <Dropdown.Item href="#/minty">Minty</Dropdown.Item>
                                <Dropdown.Item href="#/pulse">Pulse</Dropdown.Item>
                                <Dropdown.Item href="#/sandstone">Sandstone</Dropdown.Item>
                                <Dropdown.Item href="#/simplex">Simplex</Dropdown.Item>
                                <Dropdown.Item href="#/slate">Slate</Dropdown.Item>
                                <Dropdown.Item href="#/solar">Solar</Dropdown.Item>
                                <Dropdown.Item href="#/spacelab">Spacelab</Dropdown.Item>
                                <Dropdown.Item href="#/superhero">Superhero</Dropdown.Item>
                                <Dropdown.Item href="#/united">United</Dropdown.Item>
                                <Dropdown.Item href="#/yeti">Yeti</Dropdown.Item>

                            </DropdownButton>
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
                        className="code-editor" style={inputTextStyle}
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
                            <Preview className="content" theme={previewTheme}>
                                <div className="container">
                                {/*    <div className="row">*/}
                                {/*        <div className="col">*/}
                                            <p dangerouslySetInnerHTML={{__html: html || "" }}/>
                                {/*        </div>*/}
                                {/*        <div className="col">*/}
                                {/*            <p dangerouslySetInnerHTML={{__html: html || "" }}/>*/}
                                {/*        </div>*/}
                                {/*    </div>*/}
                                {/*</div>*/}
                                {/*<div className="row">*/}
                                {/*    <div className="col-sm-10">*/}
                                {/*        <p dangerouslySetInnerHTML={{__html: html || "" }}/>*/}
                                {/*    </div>*/}
                                </div>
                            </Preview>
                        </div>
                    </div>
                </Split>
            </div>
        </>
    );
}
