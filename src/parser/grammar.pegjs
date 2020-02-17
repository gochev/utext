{
 function parseOptions(options, defaultClass) {
 	if(options !== undefined  && options !== null) {
 		options = options.flat(Infinity);
 		options = options.join("").replace(/"/g,`'`);
 		options = options.replace(/{/g,'');
 		options = options.replace(/}/g,'');
     
        if (!options.includes('class')) {
   			options = options.concat(defaultClass);
  		}
    } else {
    	options = defaultClass;
    }

    return options;
 }
 
 function parseInputType(input) {
 	if(input === undefined || input === null) {
    	return 'textField';
    }
    if(input.includes('*')) {
    	return 'passowrd';
    }
    if(input.includes('@')) {
    	return 'email';
    }
    if(input.includes('#')) {
    	return 'number';
    }
 }
 
 function parseDirection(direction) {
 	if (direction === '^') 
    	return 'top';
    if (direction === 'v')
    	return 'bottom';
    if (direction === '>')
    	return 'right';
    return 'left';
 }
 
 function containsObject(array) {
 	return array.some(item => item instanceof Object)
 }
 
 function flatText(text) {
 	return text.flat(Infinity).filter(function (el) {
  		return el != null;
	});
 }
 
 function flatArray(array) {
 	if (containsObject(array)) {
    	var text;
        text = array[0].map(item => {
        		if (item instanceof Object) {
            		return item.html;
            	}
            	return item;
        	   });
        return text;
    }
 	return flatText(array);
 }
 function buildOptions(options, tooltip) {
 	if(tooltip !== null) 
    	return options.concat(' ', tooltip.options);
    return options;    
 }
 
}

start
  = info:Markdown+ {
  return info;
}

Markdown
	=  EndOfLine /  Heading / Hr / CardStart / CardEnd / FormStart / FormEnd / ModalEnd / ModalStart / Table / Pager / Navigation / Breadcrumb / List / Bold / Italic / Strikethrough / Dropdown / CheckBox / Reference / TextArea / Button / InputField / InputFieldDate / ProgressBar / MultipleLineCodeStart / MultipleLineCodeEnd / InlineCode / MyText / Space
	
ascii = [\x20-\x7E]

PlainText = ascii / nonascii

SpecialText = !Table !Heading !InputField !Pager !Navigation !Breadcrumb !TextArea !CheckBoxItem !Reference !Button !Bold !Italic !Strikethrough !Dropdown !MultipleLineCodeStart !MultipleLineCodeEnd !InlineCode PlainText 

Digit1_9 = [1-9]
EOF = !.
crlf = '\r\n' / '\r' / '\n'
EatLine = (!crlf !EOF .)*

EndOfLine = ('\r\n' / '\n' / '\r') {
	return { 
    	type: 'new_line',
   	 	html: '<br>',
        options: ''
    } 
}

Space = ' '+ / '\t' / EndOfLine

/*     (space)!"#$%&' / +`-./0-9:;<=>?@ / A-Z    /a-z */
AnyText = [\x20-\x27] / [\x2B-\x40] / [\x41-\x5A] / [\x61-\x7A] /  nonascii

/*     (space)!"#$%&'()* / +`-./0-9:;<=>?@ / A-Z[   /a-z */
LinkText = [\x20-\x2A] / [\x2B-\x40] / [\x41-\x5B] / [\x61-\x7A] / nonascii

/*     	       -   / (space)!"#$%&'()*+`-./0-9:;<=>?@ / A-Z[\]^_` / a-z */
SectionText = [-]+ / ([\x20-\x40] / [\x41-\x60] / [\x61-\x7A] / nonascii)

Options = ' '? '{'(!'}' !'^' !'v' !'>' !'<' ascii)+ '}'

Direction = '^' / 'v' / '>' / '<'
Tooltip = ' '? direction:Direction text:(!Direction PlainText)+ Direction {
	text = flatText(text).join("");
    var direction = parseDirection(direction);
    var options = `data-container='body' data-toggle='popover' data-placement='`.concat(direction, `' data-content='`,text,`' data-original-title=''`);
	return {
    	type: 'tooltip',
        html: '',
        options: options
    }
}

MyText = text:(SpecialText)+ {
	text = flatText(text);
	return {
    	type: 'text',
        html: text.join("")
    }
}

Heading
  = hashes:('######' / '#####' / '####' / '###' / '##' / '#') + text:(Bold / Italic / Strikethrough / PlainText)+ Space? {
  	var headingSize = hashes.join("").length;
    text = flatArray(text);
    return {
     type: 'heading',
     html: '<h'.concat(headingSize,'>', text.join(""), '</h', headingSize,'>'),
     options: ''
    }
}

/* **Thematic break** */
Hr
  = hr:'***' !PlainText Space?  {
    return {
    type: 'thematic break',
     html: '<hr>',
     options: ''
    }
}

/* *Italic* */
Italic
  = '*' text:(!'*' PlainText)+ '*' {
  	text = flatText(text);
    return {
     type: 'italic',
     html: '<em>'.concat(text.join(""),'</em>'),
     options:''
    }
}

/* **Bold** */
Bold
  = '**' text:(!'**' PlainText)+ '**' {
  	text = flatText(text);
  	return {
     type: 'bold',
     html: '<strong>'.concat(text.join(""), '</strong>'),
     options: ''
    }
}

/* ~~Mistaken text.~~ */
Strikethrough
  = '~~' text:(!'~~' PlainText)+ '~~' {
  	text = flatText(text);
    return {
     type: 'text_with_strikethrough',
     html: '<strike>'.concat(text.join(""),'</strike>'),
     options:''
    }
}

PagerItem
= ','? ' '? number:Digit1_9+ ','? ' '? {
	return {
    	type: 'pagerItem',
        html: `<li class='page-item'><a class='page-link' href='#'>`.concat(number.join(""),`</a></li>\n`),
        options: `class='page-item'`
    }
}

Pager 
= '[' items:PagerItem+ ']' options:Options? tooltip:Tooltip? {
	var options = parseOptions(options, ` class='pagination'`)
    options = buildOptions(options, tooltip);
    var leftHTML = `<li class='page-item disabled'><a class='page-link' href='#'>&laquo;</a></li>\n`;
    var rightHTML =  `<li class='page-item'><a class='page-link' href='#'>&raquo;</a></li>\n`
	return {
    	type: 'pager',
        html: `<ul `.concat(options,`>\n`,leftHTML, items.map(item=>item.html).join(""), rightHTML, `</ul>`),
        options: options
    }
}

BreadcrumbItem
= '/' text:(!'[' !']' !'/' PlainText)+ {
	text = flatText(text);
	return {
    	type: 'breadcrumbItem',
        html: `<li class='breadcrumb-item'><a href='#'>`.concat(text.join(""),`</a></li>\n`),
        options: `class='breadcrumb-item'`
    }
}

Breadcrumb 
= '[' ' '? items:BreadcrumbItem+ ' '? ']' options:Options? tooltip:Tooltip? {
	var options = parseOptions(options, ` class='breadcrumb'`);
    options = buildOptions(options, tooltip);
	return {
    	type: 'breadcrumb',
        html: `<ol `.concat(options,`>\n`, items.map(item=>item.html).join(""), `</ol>`),
        options: options
    }
}

/* buttonReset */
ButtonReset
 = '[!' text:(!'!]' PlainText)+ '!]' {
 	text = flatText(text);
 	return {
    	type: 'reset',
    	html: text.join(""),
        options:'reset'
    }
}

/* buttonSubmit */
ButtonSubmit
 = '[>' text:(!'<]' PlainText)+ '<]' {
 	text = flatText(text);
 	return {
    	type: 'submit',
    	html: text.join(""),
        options:'submit'
    }
}

/* button */
ButtonNormal
 = '[' text:(!']' PlainText)+ ']' {
 	text = flatText(text);
 	return {
    	type: 'button',
    	html: text.join(""),
        options:'button'
    }
}

Button 
 = button:(ButtonSubmit / ButtonReset / ButtonNormal) options:Options? tooltip:Tooltip? {
    var options = parseOptions(options, ` class='btn btn-outline-primary'`);
    options = buildOptions(options, tooltip);
    return {
    	type: button.type,
        html: `<button type='`.concat(button.type,`' `,options,`>`, button.html,`</button>`),
        options: options
    }
 }
 
 ButtonModal 
 = button:ButtonNormal options:Options? tooltip:Tooltip? {
    var options = parseOptions(options, ` class='btn btn-outline-primary'`);
    options = buildOptions(options, tooltip);
    return {
    	type: button.type,
        html: `<button type='`.concat(button.type,`' `,options,`>`, button.html,`</button>`),
        options: options
    }
 }

InputField
 = inputType: ('*' ('*'+)? / '#' ('#'+)? / '@' ('@'+)? )?  '___' ('_'+)? options:Options? tooltip:Tooltip? {
 	var type = parseInputType(inputType);
 	options = parseOptions(options, ` class='form-control'`);
    options = buildOptions(options, tooltip);
 	return {
    	type: type,
    	html: `<input type='`.concat(type,`' `, options, `>`,`</input>`),
        options:options
    }
}

InputFieldDate
 = '__-__-____' options:Options? tooltip:Tooltip? {
 	var type = 'date';
 	options = parseOptions(options, ` class='form-control'`);
    options = buildOptions(options, tooltip);
 	return {
    	type: type,
    	html: `<input type='`.concat(type,`' `, options, `>`,`</input>`),
        options:options
    }
}

TextAreaRow
 = '[___' ('_'+)? ']' options:Options? tooltip:Tooltip? Space? {
 	options = parseOptions(options, ` class='form-control'`);
    options = buildOptions(options, tooltip);
 	return {
    	type: 'textareaRow',
    	html: `<textArea `.concat(options, `>`,`</textArea>`),
        options:options
    }
}

TextArea
 = rows:TextAreaRow+ {
 	var size = rows.length;
   var options = rows[size-1].options;
 	return {
    	type: 'textarea',
    	html: `<textArea `.concat(options,`rows=`, size,`></textArea>`),
        options:options
    }
}

ListItem
 = "- " text:PlainText+ options:Options? tooltip:Tooltip? Space? {
 	var options = parseOptions(options, ` class='list-group-item d-flex justify-content-between align-items-center'`);
    options = buildOptions(options, tooltip);
    var text = flatText(text);
    return  {
    	type: 'list_unordered',
    	html: '<li'.concat(options, '>',text.join(""),'</li>\n'),
        options: options
    }
 }

OrderedListItem
 = "  "? (Digit1_9+ '.') text:PlainText+ options:Options? tooltip:Tooltip? Space? {
 	var options = parseOptions(options, ` class='list-group-item d-flex justify-content-between align-items-center'`);
    options = buildOptions(options, tooltip);
 	return  {
    	type: 'list_ordered',
    	html: '<li'.concat(options, '>',text.join(""),'</li>\n'),
        options: options
    }
}

List
 = lists:(ListItem+ / OrderedListItem+) {
   var options = ` class='list-group'`;
   return {
    type: lists[0].type,
    html: `<ul`.concat(options,`>\n`, lists.map(item => item.html).join(""),'</ul>'),
    options: options 
   }
}

CheckBoxItem
 = selected:("[x] " / "[] " / "[ ] ") text:(!'[]' PlainText)+ options:Options? tooltip:Tooltip? Space? {
 	var checked = '';
 	if (selected.includes('x')) {
    	checked = 'checked';
    }
    var options=parseOptions(options, ` class='form-check-input'`);
    options = buildOptions(options, tooltip);
    var text = flatText(text);
	return {
    type: 'input_checkbox',
	html: `<input type='checkbox'`. concat(options, ' ',checked, `>`, text.join("")),
    options: options
    }
}

RadioItem
 = selected:("(x) " / "() " / "( ) ")  text:(!'[]' PlainText)+ options:Options? tooltip:Tooltip? Space? {
 	var checked = '';
 	if (selected.includes('x')) {
    	checked = 'checked';
    }
    var options=parseOptions(options, ` class='form-check-input'`);
    options = buildOptions(options, tooltip);
    var text = flatText(text);
	return {
    type: 'input_radio',
	html: `<input type='radio'`. concat(options, ' ', checked, `>`, text.join("")),
    options: options
    }
}

CheckBox
 = tasks:(CheckBoxItem+ / RadioItem+) {
   var options = ` class='form-check'`;
   return {
    type: tasks[0].type,
    html: tasks.map(item =>  `<label class='form-check-label'>`.concat(item.html, `</label>\n`)).join(""),
    options: options
   }
}

DropdownItem 
 = '<[' text:(!']>' PlainText)+ ']>' options:Options? tooltip:Tooltip? Space? {
 	var html = `<option>`;
    text = flatText(text).join("");
    if (text.includes('-')) {
     text = text.replace(/-/g,'');
     html = `<option disabled>`;
    }
    var options = parseOptions(options, '');
    options = buildOptions(options, tooltip);
    return {
    	type:'dropdown_item',
        html: html.concat(text, `</option `, options, `>\n`),
        options: options
    }
 }
 
Dropdown 
 =items: DropdownItem+ {
 	options = items[items.length-1].options;
 	if( options === '') {
    	options = ` class='form-control'`;
    }
    
 	return {
    	type: 'dropdown',
        html: `<select `.concat( options,`'>\n`, items.map(item => item.html).join(""), `</select>`),
        options: options
    }
}

ProgressBar
 = '%' ' '? text:[0-9]+ ' '? '%' options:Options? tooltip:Tooltip? {
 	text = text.join("");
 	var options = parseOptions(options, ` class='progress-bar progress-bar-striped progress-bar-animated'`);
    options = options.concat(` role='progressbar' aria-valuenow='`, text, `' aria-valuemin='0' aria-valuemax='100' style='width: `, text, `%'`);
 	options = buildOptions(options, tooltip);
    return {
    	type:'progress',
        html: `<div class='progress'><div `.concat(options,`></div></div>`),
        options: options
    }
 }
 
LinkTitle
 = '[' text:LinkText+ ']' {
  return text.join("")
 }

LinkTitleEmpty
  = '[]' {return ""}

LinkRef
  = '(' text:(AnyText)+ ')' {
  	return text.join("")
  }

Reference
  = img:'!'?  title:(LinkTitle / LinkTitleEmpty) href:LinkRef options:Options? tooltip:Tooltip? {
  	var type = 'link';
    var output;
    var options = parseOptions(options, '');
    options = buildOptions(options, tooltip);
    if(img !== null ) {
    	type = 'image';
    	output = `<img src='`.concat(href,`' alt=`,title, ' ', options, '>');
    } else {
    	output = `<a href='`.concat(href,`' `, options, `>`,title, `</a>`);
    }
    return {
     type: type ,
     html: output,
     options: options
    }
}

NavButton
 = title:LinkTitle href:LinkRef? option:Options? tooltip:Tooltip? ' '? {
  	var link = href !== null ? href : '#';
    var options = parseOptions(options, ` class='nav-link'`);
    options = buildOptions(options, tooltip);
    var output = ` <li class='nav-item'><a href='`.concat(link, `' `, options, `>`, title, `</a></li>\n`);
    return {
     type: 'navButton',
     html: output,
     options: options
    }
}

Navigation
 = '[' ' '? items:NavButton+ ' '? ']' option:Options? tooltip:Tooltip? {
 	var output = `<nav class='navbar navbar-expand-lg navbar-light bg-light'><a class='navbar-brand' href='#'>Navbar</a>
    <button class='navbar-toggler' type='button' data-toggle='collapse' data-target='#navbarColor03' aria-controls='navbarColor03' aria-expanded='false' aria-label='Toggle navigation'>
    <span class='navbar-toggler-icon'></span></button><div class='collapse navbar-collapse' id='navbarColor03'><ul class='navbar-nav mr-auto'>\n`
   
    var options = parseOptions(options, ` class='nav-link'`);
    options = buildOptions(options, tooltip);
    return {
    	type: 'navbar',
        html: output.concat(items.map(item => item.html).join(""), `</ul></div></nav>`),
        options: options
    }
 }

FormStart
 = '!!!' ('!'+)? legend:(!'!' PlainText)+ '!!!' ('!'+)? options:Options? tooltip:Tooltip? {
 	text = flatText(legend);
    options = parseOptions(options, '');
    options = buildOptions(options, tooltip);
 	return {
    	type: 'form-start',
    	html: `<form `.concat(options, `><fieldset><legend>`, text.join(""), `</legend>`),
        options: options
    }
}

FormEnd
 = '!!!' ('!'+)? EndOfLine { 
 	return {
    	type: 'form-end',
    	html: `</fieldset></form>`,
        options: ''
    }
}

CardStart
 = '---' ('-'+)? text:(!'-' PlainText)+ '---' ('-'+)? options:Options? tooltip:Tooltip? Space? {
 	text = flatText(text);
    options = parseOptions(options, `class='card border-primary mb-3'`);
    options = buildOptions(options, tooltip);
 	return {
    	type: 'card-start',
    	html: `<div `.concat(options, `><div class='card-header'>`,text.join(""), `</div> <div class='card-body'>`),
        options: options
    }
 }

CardEnd
 = '---' ('-'+)? EndOfLine {
 	return {
    	type: 'card-end',
    	html: `</div></div>`,
        options: ''
    }
 }
 
ModalStart
 = '===' ('='+)? text:(!'=' PlainText)+ '===' ('='+)? options:Options? tooltip:Tooltip? Space? {
 	text = flatText(text);
    options = parseOptions(options, ` class='modal-dialog'`);
    options = buildOptions(options, tooltip);
 	return {
    	type: 'modal-start',
    	html: `<div `.concat(options, ` role='document'><div class='modal-content'><div class='modal-header'><h5 class='modal-title'>`,
        text.join(""), `</h5><button type='button' class='close' data-dismiss='modal' aria-label='Close'><span aria-hidden='true'>&times;</span></button></div><div class='modal-body'>`),
        options: options
    }
 }

ModalEnd
 = '===' ('='+)? btn1:Button? btn2:ButtonModal? ('='+)? EndOfLine {
 	btn1 = btn1 != null ? btn1.html : `<button type='button' class='btn btn-primary'>Save changes</button>`;
    btn2 = btn2 != null ? btn2.html : `<button type='button' class='btn btn-secondary' data-dismiss='modal'>Close</button>`;
 	return {
    	type: 'modal-end',
    	html: `</div><div class='modal-footer'>`.concat(btn1,btn2,`</div></div></div>`),
        options: ''
    }
 }

InlineCode
  = '`' text:(!'`' PlainText)+ '`' options:Options? tooltip:Tooltip? Space? {
  text = flatText(text);
  options = parseOptions(options, '');
  options = buildOptions(options, tooltip);
  return {
  	type:'inlinecode',
    html: `<pre `.concat(options, `>`, text.join(""),`</pre>`),
    options: options
  }
}

MultipleLineCodeStart 
 = '```' ('`'+)? (!'{' ascii)+ options:Options? tooltip:Tooltip? Space? {
 options = parseOptions(options, '');
 options = buildOptions(options, tooltip);
 return {
 	type:'multiplelinecode-start',
    html:`<pre `.concat(options, `>`),
    options: options
 }
}

MultipleLineCodeEnd 
 = '```' ('`'+)? EndOfLine {
 return {
 	type:'multiplelinecode-end',
    html:`</pre>`,
    options: ''
 }
}

TableCell = (!'|' !'{' PlainText)

TableRow
 = '|' cells:(TableCell+ (('|' TableCell+)+)?) '|' options:Options? tooltip:Tooltip? Space? {
 	var array = [];
    array.push(flatText(cells[0]).join(""));
    if (cells[1] !== null) {
    	for (let i = 0; i < cells[1].length; i++) {
  			var newEl = flatText(cells[1][i][1]).join("");
            array.push(newEl);
		}
    }
    console.log(array);
    var output = '';
    for (let i = 0; i < array.length; i++) {
  		if (array[i].startsWith('*')) {
        	output += '<th>'.concat(array[i].substr(1),'</th>');
        } else {
        	output += '<td>'.concat(array[i],'</td>');
        }
	}
    
    
    options = parseOptions(options, ` class='table table-hover'`);
    options = buildOptions(options, tooltip);
    return {
    	type: 'tableRow',
        html: `<tr class='table-active'>`.concat(output, `</tr>\n`),
        options: options
    }
}

Table 
 = rows:TableRow+ {
 	var options =  rows[rows.length-1].options;
 	return {
    	type: 'table',
        html: `<table `.concat(options, `>\n`, rows.map(row => row.html).join(""), `</table>`),
        options: options
    }
 }

h
  = [0-9a-f]i

nonascii
  = [\x80-\uFFFF]

unicode
  = "\\" digits:$(h h? h? h? h? h?) ("\r\n" / [ \t\r\n\f])? {
      return String.fromCharCode(parseInt(digits, 16));
    }

escape
  = unicode
  / "\\" ch:[^\r\n\f0-9a-f]i { return ch; }

nmstart
  = [_a-z]i
  / nonascii
  / escape

nmchar
  = [_a-z0-9-]i
  / nonascii
  / escape

string1
  = '"' chars:([^\n\r\f\\"] / "\\" nl:nl { return ""; } / escape)* '"' {
      return chars.join("");
    }

string2
  = "'" chars:([^\n\r\f\\'] / "\\" nl:nl { return ""; } / escape)* "'" {
      return chars.join("");
    }

string
  = chars: (string1 / [_a-zA-Z0-9-\n]+) { return chars.join("")}

comment
  = "/*" [^*]* "*"+ ([^/*] [^*]* "*"+)* "/"

ident
  = prefix:$"-"? start:nmstart chars:nmchar* {
      return prefix + start + chars.join("");
    }

name
  = chars:nmchar+ { return chars.join(""); }

num
  = [+-]? ([0-9]+ / [0-9]* "." [0-9]+) ("e" [+-]? [0-9]+)? {
      return parseFloat(text());
    }

url
  = chars:([!#$%&*-\[\]-~] / nonascii / escape)* { return chars.join(""); }

s
  = [ \t\r\n\f]+

w
  = s?

nl
  = "\n"
  / "\r\n"
  / "\r"
  / "\f"