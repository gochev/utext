import React, {Component} from "react";
import ReactDOM from 'react-dom';


export default class Preview extends Component {
    // constructor(props) {
    //     super(props);
    // }

    render() {
        return (<iframe id="iframe" title="html-preview" src="preview.html" className="icontent"/>);
    }

    renderFrameContents() {
        let doc = ReactDOM.findDOMNode(this).contentDocument;
        doc.body.innerHTML = "";

        if(doc.readyState === 'complete') {

            let buffer = doc.createElement("div");

            ReactDOM.render(<>{ this.props.children }</>, buffer);

            doc.body.appendChild(buffer);

            console.log("ready state COMPLETE");

        } else {
            setTimeout(this.renderFrameContents, 0);
        }
    }

    componentDidUpdate(){
        console.log("update");
        this.renderFrameContents();
    }

    componentDidMount() {
        console.log("mount");
        this.renderFrameContents();
    }

    componentWillUnmount(){
        ReactDOM.unmountComponentAtNode(ReactDOM.findDOMNode(this).contentDocument.body);
    }

}
