import React from "react";
import Split from "react-split";
import AceEditor from "react-ace";
import Preview from "../Preview";

const parse = require('../parser/grammar');

function parseTextAndGetHtml(text) {
    try {
        text += "\n";
        return parse.parse(text).map(e => e.html).join("");
    } catch {
        //todo do something with the errors
    }
}

export default class MiniUTextEditor extends React.Component {


    constructor(props) {
        super(props);

        this.state = {
            text: this.props.text ?? '',
            html: this.props.text ? parseTextAndGetHtml(this.props.text) : ""};
    }

    componentDidMount() {
        setTimeout(function () {
            this.setState({...this.state,
                html:parseTextAndGetHtml(this.state.text)});
        }.bind(this), 5000);
    }

    render() {

        // const [text, setText] = useState(this.props.text ?? '');
        // const [html, setHtml] = useState(this.props.text ? parseTextAndGetHtml(this.props.text) : "");

        // //bad workaround
        // setTimeout(function () {
        //     setHtml(parseTextAndGetHtml(html))
        // }, 1500);

        const inputTextStyle = {
            height: this.props.height
        };

        let onChange = (newValue) => {
            this.setState({...this.state,text:newValue});
            this.setState({...this.state,html:parseTextAndGetHtml(newValue)});
        };

        return (
            <>
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
                            value={this.state.text}
                            setOptions={{
                                enableBasicAutocompletion: true,
                                enableLiveAutocompletion: false,
                                enableSnippets: false,
                                showLineNumbers: true,
                                tabSize: 2,
                            }}/>

                        <div>
                            <div className="blank-mockup">
                                <Preview className="content" additionalClasses="no-padding" scrolling="no" theme="sketch">
                                    <div className="container">
                                        <div className="row">
                                            <div className="col-xd-12 col-md-6">
                                                <p dangerouslySetInnerHTML={{__html: this.state.html || ""}}/>
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
}
