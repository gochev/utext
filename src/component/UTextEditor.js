import React, {useState} from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import Container from "react-bootstrap/Container";
import Split from "react-split";
import AceEditor from "react-ace";
import Preview from "../Preview";
import Button from "react-bootstrap/Button";
import SaveGistModalDialog from "./SaveGistModalDialog";
import Toast from "react-bootstrap/Toast";
import LoadGistModalDialog from "./LoadGistModalDialog";

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

    let onLoadFromGist = () => {
        let gistURL = prompt("Enter the gist URL");
        if(gistURL) {
            fetch(gistURL, {method: 'GET'})
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
            }).catch(function (err) {
                alert("failed to load \n" + gistURL + "\n" + err.message);
            });
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
        <>
            <Container fluid={true}>
                <Row>
                    <Col>
                        Type your uTeXt bellow, it looks like markdown but on steroids. <br/>
                        If you want to learn more <Button variant="info">?</Button>
                        <Toast style={{
                                position: 'fixed',
                                top: 15,
                                right: 15,
                                zIndex:100
                            }} show={showGistMessage} onClose={toggleShowGistMessage}>
                            <Toast.Header>
                                <strong className="mr-auto">Notification</strong>
                                <small>1 min ago</small>
                            </Toast.Header>
                            <Toast.Body><p dangerouslySetInnerHTML={{__html: gistMessage || "" }}/></Toast.Body>
                        </Toast>
                    </Col>
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
                            <SaveGistModalDialog title="Save as gist" handleCreate={handleCreate}/>
                            <LoadGistModalDialog title="Load gist" handleGistLoad={handleGistLoad}/>
                            <Button variant="secondary" onClick = {onLoadFromGist}>Load from gist</Button>
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
