import React, {Component} from "react";
import ReactDOM from 'react-dom';


export default class Preview extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let iframeClassName = "icontent";
        if (this.props.additionalClasses) {
            iframeClassName += " " + this.props.additionalClasses;
        }
        return (<iframe id="iframe" title="html-preview" src="preview.html" className={iframeClassName} scrolling={this.props.scrolling}/>);
    }

    renderFrameContents() {
        try {
            let doc = ReactDOM.findDOMNode(this).contentDocument;
            doc.body.innerHTML = "";

            if (doc.readyState === 'complete') {

                //override default theme if required
                if(this.props.theme) {
                    let themeCss = "css/icontent/" + this.props.theme + "/bootstrap.min.css";
                    ReactDOM.render(
                        <>
                            <link rel="stylesheet" href={themeCss} media="screen"/>
                            <link rel="stylesheet" href="css/icontent/icontent.css" media="screen"/>
                        </>, doc.head);
                }

                let buffer = doc.createElement("div");

                ReactDOM.render(<>
                    {this.props.children}
                    </>, buffer);

                doc.body.appendChild(buffer);

                let existingScripts = doc.body.getElementsByTagName("script");
                for (let i = existingScripts.length; i--; i === 0) {
                    if (existingScripts[i].src === "js/icontent/custom.js") {
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
        } catch(e) {
            // setTimeout(this.renderFrameContents, 1000);
            //intentionally left blank
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
