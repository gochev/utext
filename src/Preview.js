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

            let existingScripts = doc.body.getElementsByTagName("script");
            console.log('existing scripts leng' + existingScripts.length);
            for (let i = existingScripts.length; i--; i === 0) {
                if(existingScripts[i].src === "js/icontent/custom.js") {
                    doc.body.removeChild(existingScripts[i]);
                }
            }

            const script = document.createElement("script");
            script.src = "js/icontent/custom.js";
            script.async = false;
            doc.body.appendChild(script);

        } else {
            setTimeout(this.renderFrameContents, 0);
        }
    }

    componentDidUpdate(){
        this.renderFrameContents();
    }

    componentDidMount() {
        this.renderFrameContents();
    }

    componentWillUnmount(){
        ReactDOM.unmountComponentAtNode(ReactDOM.findDOMNode(this).contentDocument.body);
    }

}
