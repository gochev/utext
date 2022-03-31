import React, {useState} from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import MiniUTextEditor from "./MiniUTextEditor";

export default function HelpModalDialog() {
    const [show, setShow] = useState(false);

    return (
        <>
            <Button variant="info" onClick={() => setShow(true)}>
                ?
            </Button>

            <Modal
                show={show}
                onHide={() => setShow(false)}
                dialogClassName="modal-90w"
                animation={false}
                aria-labelledby="example-custom-modal-styling-title"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-custom-modal-styling-title">
                        Help with UTeXt
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <p>
                        UTeXt is like an extension to markdown. So most of the markdown rules should work. <br/>
                        However we have few other rules that are explained bellow:
                    </p>
                    <h4> 1. Headings - just like in markdown </h4>
                    <MiniUTextEditor height={250} text={`
# heading 1
## heading 2
### heading 3
#### heading 4
##### heading 5
###### heading 6`}/>
                    <h4> 2. Links - just like in markdown </h4>
                    <MiniUTextEditor height={50} text={`[Open me](https://www.jug.bg)`}/>
                    <h4> 3. Images - just like in markdown </h4>
                    <MiniUTextEditor height={350} text={`
Regular image: 

![altext](https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png)

Also a handy placeholder image is provided.

![placeholder](placeholder.svg){height=40}

*Note: After most HTML elements you can put: 
{attribute=value attribute2=value2} 
which are copied directly into the HTML element as attributes.*
`}/>
                    <h4> 4. Hidden text (not very useful) </h4>
                    <MiniUTextEditor height={50} text={`<!-- This is a comment -->`}/>
                    <h3> The UteXt part</h3>
                    <h4> 5. Buttons </h4>
                    <MiniUTextEditor height={100} text={`
[label][click me]
[primary btn]{class="btn btn-primary"}[regular]`}/>
                    <h4> 6. Table </h4>
                    <MiniUTextEditor height={100} text={`
|header1|header2|
|col1   |col2   |
|col1|col2|`}/>
                    <h4> 6. text field (___)</h4>
                    <MiniUTextEditor height={100} text={`
firstName: ___`}/>
                    <h4> 7. password field (*___)</h4>
                    <MiniUTextEditor height={100} text={`
password: *___`}/>
                    <h4> 8. email field (@___)</h4>
                    <MiniUTextEditor height={100} text={`
email: @___`}/>
                    <h4> 9. numbers text field (#___)</h4>
                    <MiniUTextEditor height={100} text={`
email: #___`}/>
                    <h4> 10. date text field (__-__-____ )</h4>
                    <MiniUTextEditor height={100} text={`
birth date: __-__-____ `}/>
                    <h4> 11. Dropdown / Combo box</h4>
                    <MiniUTextEditor height={100} text={`
Select language:
<[English]>
<[French]>
<[Bulgarian]>`}/>
                    <h4> 12. Radio buttons</h4>
                    <MiniUTextEditor height={100} text={`
Radio buttons
(x) selected option 
() another
() third
`}/>
                    <h4> 13. Checkboxes</h4>
                    <MiniUTextEditor height={100} text={`
[x] I agree with terms and conditions
[] I want to receive marketing materials.
`}/>
                    <h4> 14. Horizontal line</h4>
                    <MiniUTextEditor height={100} text={`
Before the line
***
After the line
`}/>
                    <h4> 15. Cards </h4>
                    <MiniUTextEditor height={200} text={`
---I am a  card header---
I am the content [random btn]
---
*Note should start and end with at least 3 dashes*`}/>
                    <h4> 16. Modal Dialogs </h4>
                    <MiniUTextEditor height={400} text={`
===Register===
username : ___
password: *___
===
*Note should start and end with at least 3 equals*
`}/>
                    <h4> 17. Modal Dialog with custom buttons </h4>
                    <MiniUTextEditor height={450} text={`
You can customize the modal dialog buttons as normal buttons
===Registration form===
username : ___
password: *___
===[register][cancel]===
`}/>

                    <h4> 18. Form </h4>
                    <MiniUTextEditor height={450} text={`
You can create a form so the reset and submit button will work
!!!registration !!!
username : ___
password: *___
[>Submit<] [!Reset!]
!!!
`}/>
                    <h4> 19. Paging </h4>
                    <MiniUTextEditor height={150} text={`
[1,2,3,4]
`}/>
                    <h4> 20. Breadcrumb </h4>
                    <MiniUTextEditor height={150} text={`
[/home/products/amazing-product]
`}/>
                    <h4> 21. Navbar </h4>
                    <MiniUTextEditor height={200} text={`
[ [home] [contacts] [about us] ]
`}/>
                    <h4> 22. Progress bars </h4>
                    <MiniUTextEditor height={200} text={`
% 20 %
% 80 %
`}/>
                    <h4> 23. Tooltips </h4>
                    <MiniUTextEditor height={200} text={`
[btn]^ you can put tooltips on elements^
[btn]> depending on the direction of the 'v' >
[btn]< you can configure on which side the tooltip to be shown 'v' <
[btn]v I am a tooltip!v

`}/>
                </Modal.Body>
            </Modal>
        </>
    );
}
