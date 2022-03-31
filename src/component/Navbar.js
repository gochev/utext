import Nav from "react-bootstrap/Nav";
import React from "react";

export default function Navbar () {
    return (
        <Nav variant="pills" defaultActiveKey="/home">
            <Nav.Item>
                <Nav.Link href="/home">UteXt - the first step to UX</Nav.Link>
            </Nav.Item>
            {/*<Nav.Item>*/}
            {/*    <Nav.Link href="/wireframe" eventKey="link-1">Try</Nav.Link>*/}
            {/*</Nav.Item>*/}
            {/*<Nav.Item>*/}
            {/*    <Nav.Link eventKey="disabled" disabled>*/}
            {/*        Prototype*/}
            {/*    </Nav.Link>*/}
            {/*</Nav.Item>*/}

        </Nav>
    );
}
