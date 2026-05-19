



;(function (Jmol, document) {

	Jmol._JMEApplet = function(id, Info, linkedApplet, checkOnly) {
		this._isJME = true;
		this._isJava = false;//(Info.use && (Info.use.toUpperCase() != "HTML5"))
		this._jmolType = "Jmol._JME" + (this._isJava ? "(JAVA)" : "(HTML5)");
		this._viewType = "JME";
		if (checkOnly)
			return this;
		window[id] = this;
		Jmol._setObject(this, id, Info);
		this._options = Info.options;
		(this._options.indexOf("autoez") < 0) && (this._options += ",autoez");
		(this._options.indexOf("canonize") < 0) && (this._options += ",nocanonize");
		this._setCheck(true);
		this._editEnabled = true;
		this._editOptions =  Info.editOptions || "editEnabled;";
		this._setEditOptions();
		this._editMol = "";
		this._highlightColor = Info.highlightColor || 1;
		if (this._viewSet != null) {
			this._options += ",star";
		}
		var jmol = this._linkedApplet = linkedApplet;
		this._hasOptions = Info.addSelectionOptions;
		this._readyFunction = Info.readyFunction;
		this._ready = false; 
 		this._jarPath = Info.jarPath;
		this._jarFile = Info.jarFile;
		if (jmol)
			this._console = jmol._console;
		Jmol._setConsoleDiv(this._console);
		this._isEmbedded = !Info.divId;
		this._divId = Info.divId || this._id + "_jmeappletdiv";
 		if (Jmol._document) {
			if (jmol) {
				jmol._2dapplet = this;
				var id = jmol._id + "_2dappletdiv";
				if (this._isEmbedded)
					this._divId = id;
				var d = Jmol._document;
				Jmol._document = null;
				Jmol.$html(this._divId, this.create());
				if (this._isEmbedded) {
					Jmol.$("#"+id)[0].style.zIndex = Jmol._z.header - 1;
					}
				Jmol._document = d;
				this.__showContainer(false, false);
			} else {
				this.create();
			}
		}
		return this;
	}

	Jmol._JMEApplet._get = function(id, Info, linkedApplet, checkOnly) {


		Info || (Info = {});
		var DefaultInfo = {
			width: 300,
			height: 300,
			jarPath: "jme",
			jarFile: "JME.jar",
			use: "HTML5",
			structureChangedCallback: null, // could be myFunction; first parameter will be reference to this object
			editOptions: "editEnabled",
			highlightColor: 1,  // 1-6
			options: "autoez"
		};		
		Jmol._addDefaultInfo(Info, DefaultInfo);
		var applet = new Jmol._JMEApplet(id, Info, linkedApplet, checkOnly);
		return (checkOnly ? applet : Jmol._registerApplet(id, applet));  
	}

	jsmeOnLoad = Jmol._JMEApplet.onload = function() {
		for (var i in Jmol._applets) {
			var app = Jmol._applets[i]
			if (app._isJME && !app._isJava && !app._ready) {
				app._applet = new JSApplet.JSME(app._divId, app.__Info);
				app._applet.options(app._options);
				var f = "";
        var theapp = app;
				if (app._viewSet) {
          f = function(event){theapp._myEditCallback(theapp, event);};

				} else if (app.__Info.structureChangedCallback) {
          f = function(event){theapp.__Info.structureChangedCallback(theapp, event);};
				}
				if (f) 
	          app._applet.setAfterStructureModifiedCallback(f);
				app._ready = true;
				if (app._isEmbedded && app._linkedApplet._ready && app.__Info.visible)
					app._linkedApplet.show2d(true);
				Jmol._setReady(app);
			}
		}
	}   

;(function(proto){

	proto.create = function() {
		var s = "";
		if (this._isJava) {
			var w = (this._linkedApplet ? "2px" : this._containerWidth);
			var h = (this._linkedApplet ? "2px" : this._containerHeight);
			s = '<applet code="JME.class" id="' + this._id + '_object" name="' + this._id 
				+ '_object" archive="' + this._jarFile + '" codebase="' + this._jarPath + '" width="'+w+'" height="'+h+'">'
				+ '<param name="options" value="' + this._options + '" />'	
				+ '</applet>';
		} else if (this._isEmbedded) {
			return this._code = "";
		}    
		if (this._hasOptions)
			s += Jmol._getGrabberOptions(this);      
		return this._code = Jmol._documentWrite(s);
	}

	proto._checkDeferred = function(script) {
		return false;
	}	

	proto._search = function(query){
		Jmol._search(this, query);
	}

	proto._searchDatabase = function(query, database, _jme_searchDatabase){
		this._showInfo(false);
		this._searchQuery = database + query;
		if (database == "$")
			query = "$" + query; // 2D variant;  will be $$caffeine
		var dm = database + query;
		this._loadFile(dm, {chemID: this._searchQuery});
	}

 	proto._loadFile = function(fileName, params, _jme_loadFile){
		var chemID = (params ? params.chemID : fileName);
		this._showInfo(false);
		this._thisJmolModel = "" + Math.random();
		var me = this;
		Jmol._loadFileData(this, fileName, function(data){me.__loadModel(data, chemID)}, function() {me.__loadModel(null, chemID)});
	}

	proto.__loadModel = function(jmeOrMolData, chemID, viewID, _jme__loadModel) {
		System.out.println("__loadModel")
		if (jmeOrMolData == null)
			return;
		if (jmeOrMolData.indexOf("\n") == 0)
			jmeOrMolData = "mol" + jmeOrMolData;
		Jmol.jmeReadMolecule(this, jmeOrMolData);
		if (this._viewSet != null)
			Jmol.View.updateView(this, {chemID:chemID, data:jmeOrMolData, viewID: viewID});      
	}

	proto._loadModelFromView = function(view, _jme_loadModelFromView) {
		var rec = view.JME;
		this._currentView = view;
		if (rec.data != null) {
			this.__loadModel(rec.data, view.info.chemID, view.info.viewID);
		} else if (rec.chemID != null) {
			Jmol._searchMol(this, view.info.chemID, null, false);
		} else {
			rec = view.Jmol;
			if (rec) {
				this._show2d(true, rec.applet);
			}
		}
		var me = this;
	}

  proto._reset = function(_jmol_resetView) {
    this._script("clear");
  }

	proto._updateView = function(_jme_updateView) {
		if (this._viewSet != null) {
			this._search("$" + this._getSmiles(true, false))
    }
		var me = this;
	}

	proto._setCheck = function(b, why) {
		console.log("setCheckEnabled " + b + " " + why);
		this._checkEnabled = b;
	}
		 
	proto._setEditOptions = function(o) {
		o || (o = this._editOptions);
		o = o.toLowerCase();
		if (o.indexOf("edit") >= 0)
			this._editEnabled = (o.indexOf("editdisable") < 0);
	}
	
	
	proto._enableEdit = function(tf) {
	  this._editEnabled = tf;
	}

	
			
	proto.__getJmeFileOrEmptyString = function() {
		var s = this._applet.jmeFile();
		return (s == "0 0" ? "" : s);		
	}
	
	proto._myEditCallback = function(me, event,_jme_myEditCallback) {
		setTimeout(function() {
			me.__doEditCallback(me, event, _jme_myEditCallback)
		}, 150);
	}
	
	proto.__doEditCallback = function(me, event, _jme_myEditCallback) {
		console.log("editcallback check=" + event.action + " " + this._checkEnabled + " edit=" + this._editEnabled + " "  );

		var data = this.__getJmeFileOrEmptyString().replace(/\:1/g,"");
		this._editMol = this._editMol.replace(/\:1/g,"");
		if (this._checkEnabled && !this._editEnabled) {
			console.log("editcallback "
					+ " data= " + data + " ; " + this._editMol);
	 		this._editEnabled && data && (this._editMol = data); /// was .editEnabled
			if (data && data != this._editMol) {
				var me = this;
				var m = me._editMol;
				console.log("editcallback failed check " + m);
				setTimeout(function(){
					me._setCheck(false, "sorry");
					(m ? me._applet.readMolecule(m) : me._applet.reset());
					me._editMol = me.__getJmeFileOrEmptyString();
					console.log("editmol = " + me._editMol);
					me._setCheck(true, "failed")
				},150);
				return;
			}
		}
		var me = this;
		setTimeout(function() {me._setCheck(true, "callback")}, 10);
		data && (this._editMol = data);
		if (this._viewSet == null)
			return;
    if (event.action == "readMolFile" || event.action == "readJME") {
      this._molData = this._applet.molFile().replace(/1  0  0\n/g, "0  0  0\n");
      setTimeout(function() {jme.__updateAtomCorrelation()},10);
	return;
    }
		var a = this._applet.molFile().replace(/1  0  0\n/g, "0  0  0\n").split("V2000")[1];
		var b = ("" + this._molData).replace(/1  0  0\n/g, "0  0  0\n").split("V2000")[1];
		if (a != b) {
			this._molData = "<modified>";
			this._thisJmolModel = null;
			return this.__clearAtomSelection(false);
		}
		var data = this.__getJmeFileOrEmptyString();
		if (data.indexOf(":") < 0) 
			return this.__clearAtomSelection(true);
		data = data.split(" ");
		var n = parseInt(data[0]);
		var iAtom = 0;
		for (var i = 0; i < n; i++)
			if ((!this._atomSelection || !this.__atomSelection[i + 1]) && data[i*3 + 2].indexOf(":") >= 0) {
				iAtom = i + 1;
				break;
			}
		if (iAtom <= 0)
			return;
		var A = [];
		var map = this._currentView.JME.atomMap;    
		A.push(map == null ? iAtom : map.toJmol[iAtom]);


		Jmol.View.updateAtomPick(this, A);
		this._updateAtomPick(A);
		if (this._atomPickCallback)
			setTimeout(this._atomPickCallback+"([" + iAtom + "])",10);    
	}

	proto.__updateAtomCorrelation = function(){
			if (this._viewSet && this._currentView) {
			  var v = this._currentView;
			  v.JME.data = this._molData;
				v.JME.atomMap = (v.Jmol && v.Jmol.applet? v.Jmol.applet._getAtomCorrelation(this._molData,false) : null);
			}

	}
	proto.__clearAtomSelection = function(andUpdate) {
		System.out.println("clearAtomSelection");
		this.__atomSelection = [];
		this.__resetMarks();
		if (andUpdate)
			Jmol.View.updateAtomPick(this, []);
	}	

	proto.__resetMarks = function() {
		var haveModel = !!this.__getJmeFileOrEmptyString();
		if (haveModel) {
			this._applet.resetAtomColors(1);
			this._applet.resetAtomMarks(1);
			this._applet.resetBondColors(1);
			this._applet.resetBondMarks(1);
		}
	}
	
	proto._updateAtomPick = function(A, _jme_updateAtomPick) {
		this.__resetMarks();
		if (A.length == 0)
			return;
		var B = [];
		var C = [];
		var j;		
		var map = this._currentView.JME.atomMap;		
		for (var i = 0; i < A.length; i++) {
		 C[j = (map == null ? A[i] : map.fromJmol[A[i]])] = 1; 
		 B.push(j);
		 B.push(this._highlightColor);
		}
		console.log("JME setting atom colors " + B.join(","))
		this._applet.setAtomBackgroundColors(1, B.join(","));
		this.__atomSelection = C;
	}

	proto._showInfo = Jmol._Applet.prototype._showInfo;
	proto._show = Jmol._Applet.prototype._show;

	proto._show = function(tf) {
		var x = (!tf ? 2 : "100%");
		Jmol.$setSize(Jmol.$(this, "object"), x, x);
		if (!this._isJava) {
			Jmol.$setVisible(Jmol.$(this, "appletdiv"), tf);
			if (this._isEmbedded && !tf)
				Jmol.$setVisible(Jmol.$(this._linkedApplet, "2dappletdiv"), false);
		}
	}

	proto._show2d = function(toJME, jmol) {
		jmol || (jmol = this._linkedApplet);
		if (jmol) {
			var jme = this._applet;
			if (jme == null && this._isJava)
				jme = this._applet = Jmol._getElement(this, "object");
			var isOK = true;
      var jmeSMILES = null;
			if (this._viewSet != null) {
			  isOK = false;
			} else if (jme != null) {
				jmeSMILES = this._getSmiles();
         
        var script = "{*}.find('SMILES', '" + jmeSMILES.replace(/\\/g,"\\\\")+ "')"
				var jmolAtoms = (jmeSMILES ? jmol._evaluate(script) : []);
				var isOK = (jmolAtoms.length > 0);
			}
			if (!isOK) {
				if (toJME) {
				  this._loadFromJmol(jmol);
				} else {
					if (jmeSMILES)
						Jmol.script(jmol, "load \"$" + jmeSMILES + "\"");
				}
			}
		}
		if (this._linkedApplet) {
			this._showInfo(!toJME);
		}
	}
	
	proto._loadFromJmol = function(jmol, format) {
    format || (format = "jme");
    if (format == "jmeh") {
      if (!this._getjmeh) {
        this._getjmeh = true;
        var f = "function getJMEHs() {select visible;var x= show(\"chemical mrv\");var x2 = x.split('x2=\"')[2].split('\"')[1].split(\" \");var y2 = x.split('y2=\"')[2].split('\"')[1].split(' ');var el = x.split('elementType=\"')[2].split('\"')[1].split(' ');var s =  '' + {*}.size + ' ' + {*}.bonds.size + ' ' + el.join(x2).join(y2).join(' ').replace('\\n',' ');var b = x.split('<bond ');for (var i = 2; i <= b.length; i++) { var bi = b[i]; var at = bi.split('atomRefs2=\"')[2].split('\"')[1].replace('a','');var n = (bi.find('>W<') ? -1 : bi.find('>H<') ? -2 : bi.split('order=\"')[2].split('\"')[1]); s += ' ' +  at + ' ' + n};return s}"
        jmol._scriptWait(f);
      }
      var data = jmol._evaluate("getJMEHs()")
      format = "jme"
    } else {
      var data = jmol._evaluate("script('select visible;show chemical "+format+"')");
    }
    this._molData = data;
		if (!this._applet)return;
		this._setCheck(false, "readmoldata");
		if (this._molData) {
    	    Jmol.jmeReadMolecule(this, this._molData);
			this._molData = this._applet.molFile();
			this.__updateAtomCorrelation();
		} else {
			this._applet.reset();
			this._molData = "<zapped>";
		} 
		this._editMol = this.__getJmeFileOrEmptyString();
		this._setCheck(true, "readmoldata2");
	}
  
	proto.__showContainer = function(tf, andShow) {	
		var jmol = this._linkedApplet;
		var mydiv = Jmol.$(jmol, "2dappletdiv");
		if (this._isJava) {
			var w = (tf ? "100%" : 2);
			var h = (tf ? "100%" : 2);
			Jmol.$setSize(mydiv, w, h);
			if (andShow)
				Jmol.$setSize(Jmol.$(this, "object"), w, h);
		} else {
			Jmol.$setVisible(mydiv, tf);
		}
	}

	proto._script = function(script) {
		var list = script.split(";");
		for (i = 0; i < list.length; i++) {
			switch (list[i].split(" ")[0].trim().toLowerCase()) {
			case "print":
				var svg = Jmol.$("#" + this._divId).find("svg")[0];
				var img = new Image();
				var me = this;
				img.onload = function() {
					var canvas = document.createElement("canvas");
					var ctx = canvas.getContext('2d');
					ctx.clearRect( 0, 0, (canvas.width = svg.width.animVal.value - 5), (canvas.height = svg.height.animVal.value));
					ctx.drawImage(img, 0, 0);
					Jmol._saveFile(me._id + ".png", canvas.toDataURL("image/png"));
				}
				img.src = "data:image/svg+xml;base64," + btoa(svg.outerHTML);
				break;
			}
		}
	}

  proto._getSmiles = function(withStereoChemistry, withMarkers) {
	withMarkers = (arguments.length < 2 || withMarkers); 
	this._applet.options(withMarkers ? "marker" : "nomarker");
  	var s = (arguments.length == 0 || withStereoChemistry ? this._applet.smiles() : this._applet.nonisomericSmiles());
	if (!withMarkers)
		this._applet.options("marker");

		return s;
  }

  proto._getMol = function() {
		return this._applet.molFile();   
  }
  
})(Jmol._JMEApplet.prototype);




	Jmol.jmeSmiles = function(jme, withStereoChemistry) {
   var s = jme._getSmiles();
		return s;
	}

	Jmol.jmeReadMolecule = function(jme, jmeOrMolData) {
		jme._setCheck(false, "readmolecule");
    jmeOrMolData = jmeOrMolData.trim();
		if (jmeOrMolData.indexOf("\n") < 0 && jmeOrMolData.indexOf("\r") < 0)
			jme._applet.readMolecule(jmeOrMolData);
		else 
			jme._applet.readMolFile(jmeOrMolData);   
	 jme._molData = jme._applet.molFile();
	 jme._editMol = jme._applet.jmeFile();
		jme._setCheck(true, "readmolecule2");
	}

	Jmol.jmeGetFile = function(jme, asJME) {
		jme._molData = jme._applet.molFile();
		return  (asJME ? jme._applet.jmeFile() : jme._molData);
	}

	Jmol.jmeReset = function(jme) {
		jme._applet.reset();
	}

	Jmol.jmeOptions = function(jme, options) {
		jme._applet.options(options);
	}



})(Jmol, document);


