


;Jmol.Console = {
	buttons:{},
	buttonWidth:100,
	click:function(id) {
		Jmol.Console.buttons[id].console.appletConsole.doAction(Jmol.Console.buttons[id]);
	}	
}

Jmol.consoleGetImageDialog = function(vwr, title, imageMap) {
  return new Jmol.Console.Image(vwr, title, imageMap);
}

Jmol.Console.Image = function(vwr, title, imageMap) {

  
  
  this.vwr = vwr;
  this.title = title;
  this.imageMap = imageMap;
	this.applet = vwr.html5Applet;
  var id = this.applet._id + "_Image";
  this.id = id + "_" + (title == "" ? "app" : title).replace(/\W/g,"_");
  var jqobj = Jmol._$(this.id + "_holder");
  if (!jqobj[0] && (jqobj = Jmol._$(id + "_holder"))[0])
    this.id = id;
  if (jqobj[0])
    this.div = jqobj;
  else
    Jmol.Console.createDOM(this, '<div id="$ID" class="jmolImage" style="display:block;background-color:yellow;position:absolute;z-index:' + ++Jmol._z.consoleImage +'"><div id="$ID_title"></div><div id="$ID_holder"></div></div>');
  System.out.println("image " + this.id + " created");
  var obj = imageMap.get(this.id);
  if (obj)
    obj.closeMe();
  imageMap.put(this.id, this);
  imageMap.put(title, this);
}

Jmol.Console.Image.setCanvas = function(obj, canvas) {
	Jmol.$append(Jmol._$(obj.id + "_holder"), canvas);
	Jmol.$html(obj.id + "_title", "<table style='width:100%'><tr><td>&nbsp;&nbsp;&nbsp;&nbsp;<a href=\"javascript:Jmol.Console.buttons['"+obj.id+"'].closeMe()\">close</a></td><td align=right>" + obj.title + " [" + canvas.width + " x " + canvas.height + "]</td></tr></table>");
}

Jmol.Console.Image.closeImage = function(obj) {
  obj.imageMap.remove(obj.title);
  obj.imageMap.remove(obj.id);
  if (obj.div) {
    Jmol.$remove(obj.cid);
  } else {
    obj.dragBind(false);  
    Jmol.$remove(obj.id);
  }
}

Jmol.Console.Image.prototype.setImage = function(canvas) {
  if (this.cid)
    Jmol.$remove(this.cid);
  var c = document.createElement("canvas");
  c.width = canvas.width;
  c.height = canvas.height;
  var cdx = c.getContext("2d");
  if (canvas.buf32) {
  	var imgData = cdx.getImageData(0, 0, c.width, c.height);
    var buf8 = imgData.data;
    var buf32 = canvas.buf32;
    var n = buf8.length >> 2;
    for (var i = 0, j = 0; i < n; i++) {
      buf8[j++] = (buf32[i] >> 16) & 0xFF;
      buf8[j++] = (buf32[i] >> 8) & 0xFF;
      buf8[j++] = buf32[i] & 0xFF;
      buf8[j++] = 0xFF;
    }
    cdx.putImageData(imgData, 0, 0);
  } else {
    cdx.drawImage(canvas,0,0);
  }    
  this.cid = c.id = this.id + "_image"; 
  Jmol.Console.Image.setCanvas(this, c);
}

Jmol.Console.Image.prototype.closeMe = function() {
  Jmol.Console.Image.closeImage(this);
}

Jmol.Swing.setDraggable(Jmol.Console.Image);

Jmol.Console.createDOM = function(obj, s, userConsole) {
  var id = obj.id;
  Jmol.Console.buttons[id] = obj;
	s = s.replace(/\$ID/g,id);
  if (userConsole && userConsole[0]) {
    Jmol.$html(userConsole,s);
  } else {
  	Jmol.$after("body", s);
  	obj.setContainer(Jmol._$(id));
  	obj.setPosition();
  	obj.dragBind(true);
  }
}

Jmol.Console.JSConsole = function(appletConsole) {
	this.applet = appletConsole.vwr.html5Applet;
	var id = this.id = this.applet._id+"_console";
	var console = this;
	console.appletConsole = appletConsole;
	console.input = appletConsole.input = new Jmol.Console.Input(console);
	console.output = appletConsole.output = new Jmol.Console.Output(console);
  var userConsole = Jmol.$("#" + id); 

	var s = '<div id=$ID_title></div><div id=$ID_label1></div><div id=$ID_outputdiv style="position:relative;left:2px"></div><div id=$ID_inputdiv style="position:relative;left:2px"></div><div id=$ID_buttondiv></div>'  
  var w = 600, h = 362;
  if (userConsole[0]) {
      var dims = Jmol.$getSize(userConsole);
      if (dims[0] == 0)
        Jmol.$setSize(userConsole, w, h);
      w = dims[0] || w;
      h = dims[1] || h;
  } else {
    s = '<div id="$ID" class="jmolConsole" style="display:block;background-color:yellow;width:'+w+'px;height:'+h+'px;position:absolute;z-index:'
	   	+ Jmol._z.console +'">' + s + '</div>';
  }
  Jmol.Console.createDOM(this, s, userConsole);
	var setBtn = function(console, btn) {
		btn.console = console;
		btn.id = id + "_" + btn.label.replace(/\s/g,"_");
		Jmol.Console.buttons[btn.id] = btn;
		return btn.html();
	}
	s = setBtn(console, appletConsole.runButton)
		+ setBtn(console, appletConsole.loadButton)
		+ setBtn(console, appletConsole.clearInButton)
		+ setBtn(console, appletConsole.clearOutButton)
		+ setBtn(console, appletConsole.historyButton)
		+ setBtn(console, appletConsole.stateButton);
	Jmol.$html(id + "_buttondiv", s);
  s = "";
  if (!userConsole[0])
	 s += "&nbsp;&nbsp;&nbsp;&nbsp;<a href=\"javascript:Jmol.Console.buttons['"+id+"'].setVisible(false)\">close</a>";
	s += "&nbsp;&nbsp;&nbsp;&nbsp;<a href=\"javascript:Jmol.script("+console.applet._id+",'help')\">help</a>";
	Jmol.$html(id + "_label1", s);
  if (userConsole[0]) {
    w = w - 10;
    h = (h - Jmol.$getSize(id + "_label1")[1] - Jmol.$getSize(id + "_buttondiv")[1] - 20)/3;
  } else {
    w = w - 10;
    h = (h - 62)/3;
  }
	Jmol.$html(id + "_inputdiv", '<textarea id="' + id + '_input" style="width:'+w+'px;height:'+h+'px"></textarea>');
	Jmol.$html(id + "_outputdiv", '<textarea id="' + id + '_output" style="width:'+w+'px;height:'+(h*2)+'px"></textarea>');

		Jmol.Cache.setDragDrop(this.applet, "console_output");
		Jmol.Cache.setDragDrop(this.applet, "console_input");

	Jmol.$bind("#" + id + "_input", "keydown keypress keyup", function(event) { console.input.keyEvent(event) });
	Jmol.$bind("#" + id + "_input", "mousedown touchstart", function(event) { console.ignoreMouse=true });
	Jmol.$bind("#" + id + "_output", "mousedown touchstart", function(event) { console.ignoreMouse=true });

	console.setButton = function(text) {
		return new Jmol.Console.Button(this, text);
	}  

	console.setVisible = function(b) {	
		if (b)
			this.container.show();
		else
			this.container.hide();
		this.dragBind(b);
	}

	console.setTitle = function(title) {
	}
  
  console.setVisible(false);
}

Jmol.Swing.setDraggable(Jmol.Console.JSConsole);

Jmol.Console.Input = function(console) {

	this.console = console;
	this.id = console.id + "_input";


	this.getText = function() {
		return Jmol.$val(this.id);
	}

	this.setText = function(text) {
		if (text == null)
			text = "";
		Jmol.$val(this.id, text);
	}

	this.keyEvent = function(ev) {
			
	
	
		

		var mode;
		var type = ev.type;
		var isCtrl = ev.ctrlKey;
		var kcode = ev.keyCode;
		if (kcode == 13)
			kcode=10; 
		if (type == "keyup") { 
			mode = (kcode == 38 || kcode == 40 ? 1 : this.console.appletConsole.processKey(kcode, 402, isCtrl));
			if ((mode & 1) == 1)
				ev.preventDefault();
			return;
		}


		var isKeydown = (type == "keydown");
		var key = (isKeydown ? (ev.key || ev.originalEvent.keyIdentifier) : "");

		switch (kcode) {
		case 38: // up-arrow, possibly
		case 40: // down-arrow, possibly
			if (!isKeydown)
				kcode = 0;
			break;
		case 8: // bs
		case 9: // tab
		case 10: // CR
		case 27: // esc
			break;
		default:
			kcode = 0; // nothing to report
		}					
		mode = this.console.appletConsole.processKey(kcode, 401, isCtrl);
		if (isCtrl && kcode == 10)
			this.setText(this.getText() + "\n")
		if (mode == 0 && ev.keyCode == 9) {
			var me = this;
			setTimeout(function(){me.setText(me.getText() + "\t"); Jmol.$focus(me.id)},10);
		}
		if ((mode & 1) == 1 // Jmol has handled the key press
			|| key == "Up" || key == "Down" // up and down arrows
			|| isKeydown && ev.keyCode != 8 && ev.keyCode < 32 // a special character other than backspace, when keyDown 
			) {
			ev.preventDefault();
		}
	}

	this.getCaretPosition = function() {
		var el = Jmol._$(this.id)[0];
		if('selectionStart' in el)
			return el.selectionStart;
		if(!('selection' in document))
			return 0;
		el.focus();
		var sel = document.selection.createRange();
		var len = document.selection.createRange().text.length;
		sel.moveStart('character', -el.value.length);
		return sel.text.length - len;
	}

}

Jmol.Console.Output = function(console) {
	this.id = console.id + "_output";
	this.getText = function() {
		return Jmol.$val(this.id);
	}

	this.setText = function(text) {
		if (text == null)
			text = "";
		Jmol.$val(this.id, text);
	}

	this.append = function(message, att) {
		this.setText(this.getText() + message);
		Jmol.$scrollTo(this.id, -1); 		 
	}
}

Jmol.Console.Button = function(text) {
	this.label = text;
}

Jmol.Console.Button.prototype.addConsoleListener = function(appletConsole) {
	this.appletConsole = appletConsole;
	Jmol.Console.buttons[this.id] = this;
}

Jmol.Console.Button.prototype.html = function() {
	var s = '<input type="button" id="' + this.id + '" style="width:' + Jmol.Console.buttonWidth + 'px" value="' + this.label + '" onClick="Jmol.Console.click(\'' + this.id + '\')"/>'
	return s;
}

;
