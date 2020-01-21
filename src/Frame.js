import React, {Component} from "react";
import ReactDOM from 'react-dom';


export default class Frame extends Component {
    // constructor(props) {
    //     super(props);
    // }

    render() {
        return (<iframe title="html-preview" className="icontent"/>);
    }

    renderFrameContents() {
        let doc = ReactDOM.findDOMNode(this).contentDocument;
        if(doc.readyState === 'complete') {
            ReactDOM.render(
                <>
                    <link rel="stylesheet" href="css/icontent/bootstrap.min.css" media="screen"/>
                    <link rel="stylesheet" href="css/icontent/icontent.css" media="screen"/>
                </>, doc.head);



            ReactDOM.render(<>
                {this.props.children}
            </>, doc.body);

            console.log("ready state COMPLETE");

            const scriptJQuery = document.createElement("script");
            scriptJQuery.src = "js/icontent/jquery.min.js";
            scriptJQuery.async = false;
            document.body.appendChild(scriptJQuery);

            const scriptPopper = document.createElement("script");
            scriptPopper.src = "js/icontent/popper.min.js";
            scriptPopper.async = false;
            document.body.appendChild(scriptPopper);

            const scriptBootstrap = document.createElement("script");
            scriptBootstrap.src = "js/icontent/bootstrap.min.js";
            scriptBootstrap.async = false;
            document.body.appendChild(scriptBootstrap);

            const script = document.createElement("script");
            script.src = "js/icontent/custom.js";
            script.async = false;
            document.body.appendChild(script);

            // doc.dispatchEvent(new Event('load'));
            // window.dispatchEvent(new Event('load'));
            // dispatchEvent(new Event('load'));
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
