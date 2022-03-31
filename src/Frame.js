import React, {Component} from "react";
import ReactDOM from 'react-dom';


export default class Frame extends Component {
    // constructor(props) {
    //     super(props);
    // }

    render() {
        return (<iframe id="iframe" title="html-preview" className="icontent"/>);
    }

    renderFrameContents() {
        let doc = ReactDOM.findDOMNode(this).contentDocument;
        doc.body.innerHTML = "";

        if(doc.readyState === 'complete') {
            // if(doc.body.getElementsByClassName("scene").length > 0) {
            //     doc.body.removeChild(doc.body.getElementsByClassName("scene")[0]);
            // }

            // let scene = doc.createElement("div");
            // scene.className = "scene";
            // doc.body.append(scene);

            // let iframe = document.getElementById("iframe");
            //clear the old script and styles
            let existingScripts = doc.body.getElementsByTagName("script");
            console.log('existing scripts leng' + existingScripts.length);
            for (let i = existingScripts.length; i--; i === 0) {
                doc.body.removeChild(existingScripts[i]);
            }

                // doc.body.innerHTML = "";
            const scriptJQuery = document.createElement("script");
            scriptJQuery.src = "js/icontent/jquery.min.js";
            scriptJQuery.async = false;
            doc.body.appendChild(scriptJQuery);

            const scriptPopper = document.createElement("script");
            scriptPopper.src = "js/icontent/popper.min.js";
            scriptPopper.async = false;
            doc.body.appendChild(scriptPopper);

            const scriptBootstrap = document.createElement("script");
            scriptBootstrap.src = "js/icontent/bootstrap.min.js";
            scriptBootstrap.async = false;
            doc.body.appendChild(scriptBootstrap);

            const script = document.createElement("script");
            script.src = "js/icontent/custom.js";
            script.async = false;
            doc.body.appendChild(script);
            //
            // let existingScripts = iframe.contentDocument.documentElement.getElementsByTagName("script");
            // for (let i = existingScripts.length; i--; i === 0) {
            //     iframe.contentDocument.documentElement.removeChild(existingScripts[i]);
            // }

            // for (let existingScript in existingScripts) {
            //     iframe.contentDocument.documentElement.removeChild(existingScripts[0]);
            // }
            // iframe.contentDocument.documentElement.innerHTML ="";

            ReactDOM.render(
                <>
                    <link rel="stylesheet" href="css/icontent/bootstrap.min.css" media="screen"/>
                    <link rel="stylesheet" href="css/icontent/icontent.css" media="screen"/>
                </>, doc.head);

            let buffer = doc.createElement("div");

            ReactDOM.render(<>{ this.props.children }</>, buffer);


            doc.body.appendChild(buffer);

            console.log("ready state COMPLETE");



            // doc.dispatchEvent(new Event('load'));
            // window.dispatchEvent(new Event('load'));
            // dispatchEvent(new Event('load'));
        } else {
            debugger;
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
