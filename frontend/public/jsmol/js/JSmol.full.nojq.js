
;window.getClientRects = function(){return []};

;(function($) {

	function createXHR(isMSIE) {
		try {
			return (isMSIE ? new window.ActiveXObject( "Microsoft.XMLHTTP" ) : new window.XMLHttpRequest());
		} catch( e ) {}
	}

 $.ajaxSettings.xhr = (window.ActiveXObject === undefined ? createXHR :  
	function() {
		return (this.url == document.location || this.url.indexOf("http") == 0 || !this.isLocal) &&  // BH MSIE fix
			/^(get|post|head|put|delete|options)$/i.test( this.type ) &&
			createXHR() || createXHR(1);
	});


		$.ajaxTransport( "+script", function(s) {

	if ( true || s.crossDomain ) {

		var script,
			head = document.head || jQuery("head")[0] || document.documentElement;

		return {

			send: function( _, callback ) {
				script = document.createElement("script");

				if ( s.scriptCharset ) {
					script.charset = s.scriptCharset;
				}

				script.src = s.url;

				script.onload = script.onreadystatechange = function( _, isAbort ) {

					if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {

						script.onload = script.onreadystatechange = null;
						if ( script.parentNode ) {
							script.parentNode.removeChild( script );
						}

						script = null;

						if ( !isAbort ) {
							callback( 200, "success" );
						}
					}
				};

				head.insertBefore( script, head.firstChild );
			},

			abort: function() {
				if ( script ) {
					script.onload( undefined, true );
				}
			}
		};
	}
});
 

	$.extend( $.support, { iecors: !!window.XDomainRequest });

	if ($.support.iecors) {
		$.ajaxTransport(function(s) {
		
			return {
				send: function( headers, complete ) {				
					var xdr = new window.XDomainRequest();
					xdr.onload = function() {          
						var headers = { 'Content-Type': xdr.contentType };
						complete(200, 'OK', { text: xdr.responseText }, headers);
					};
					if ( s.xhrFields ) {
						xdr.onerror = s.xhrFields.error;
						xdr.ontimeout = s.xhrFields.timeout;
					}
					xdr.open( s.type, s.url );
					xdr.send( ( s.hasContent && s.data ) || null );
				},
				abort: function() {        
					xdr.abort();
				}
			};
		});

	} else {


		$.ajaxSetup({
			accepts: { binary: "text/plain; charset=x-user-defined" },
			responseFields: { binary: "response" }
		})


		$.ajaxTransport('binary', function(s) {
		
			var callback;
			return {
				send: function( headers, complete ) {        
					var xhr = s.xhr();
					console.log("xhr.open binary async=" + s.async + " url=" + s.url);
					xhr.open( s.type, s.url, s.async );					
					var isOK = false;
					try {
						if (xhr.hasOwnProperty("responseType")) {
								xhr.responseType = "arraybuffer";
								isOK = true;
						} 
					} catch(e) {
					}
					try {
						if (!isOK && xhr.overrideMimeType) {
							xhr.overrideMimeType('text/plain; charset=x-user-defined');
						}
					} catch(e) {
					}
					if ( !s.crossDomain && !headers["X-Requested-With"] ) {
						headers["X-Requested-With"] = "XMLHttpRequest";
					}
					try {
						for (var i in headers )
							xhr.setRequestHeader( i, headers[ i ] );
					} catch(_) {}

					xhr.send( ( s.hasContent && s.data ) || null );

					callback = function( _, isAbort ) {

					var 
						status = xhr.status,
						statusText = "",
						responseHeaders = xhr.getAllResponseHeaders(),
						responses = {},
						xml;

					try {

						if ( callback && ( xhr.readyState === 4 ) ) {

							callback = undefined;

							try {
								responses.text = (typeof xhr.responseText === "string" ? xhr.responseText : null);
							} catch( _ ) {
							}
							try {
								responses.binary = xhr.response;
							} catch( _ ) {
							}

							try {
								statusText = xhr.statusText;
							} catch( _ ) {
								statusText = "";
							}

							if ( !status && s.isLocal && !s.crossDomain ) {
								status = (responses.text ? 200 : 404);
							} else if ( status === 1223 ) {
								status = 204;
							}
							complete( status, statusText, responses, responseHeaders );
						}
					} catch( e ) {
						alert(e)
						complete( -1, e );
					}
					};
					
					if ( !s.async ) {
						callback();
					} else if ( xhr.readyState === 4 ) {
						setTimeout( callback );
					} else {
						xhr.onreadystatechange = callback;
					}
					
				},
				abort: function() {}
			};
		});
	}
})( jQuery );
	 

;(function($,doc,eventList,id){  
	$.map(
		eventList.split(' '),
		function( event_name ) { jq_addOutsideEvent( event_name ); }
	);
	jq_addOutsideEvent( 'focusin',  'focus' + id );
	jq_addOutsideEvent( 'focusout', 'blur' + id );
	function jq_addOutsideEvent( event_name, outside_event_name ) {
		outside_event_name = outside_event_name || event_name + id;
		var elems = $(),
			event_namespaced = event_name + '.' + outside_event_name + '-special-event';
		$.event.special[ outside_event_name ] = {    
			setup: function(){
				elems = elems.add( this );
				if ( elems.length === 1 ) {
					$(doc).bind( event_namespaced, handle_event );
				}
			},
			teardown: function(){
				self.Jmol && Jmol._setMouseOwner(null);
				elems = elems.not( this );
				if ( elems.length === 0 ) {
					$(doc).unbind( event_namespaced );
				}
			},
			add: function( handleObj ) {
				var old_handler = handleObj.handler;
				handleObj.handler = function( event, elem ) {
					event.target = elem;
					old_handler.apply( this, arguments );
				};
			}
		};
		function handle_event( event ) {
			$(elems).each(function(){
				self.Jmol && (outside_event_name.indexOf("mouseup") >= 0 || outside_event_name.indexOf("touchend") >= 0) && Jmol._setMouseOwner(null);
				var elem = $(this);
				if ( this !== event.target && !elem.has(event.target).length ) {
					elem.triggerHandler( outside_event_name, [ event.target, event ] );
				}
			});
		};
	};
})(jQuery,document,"click mousemove mouseup touchmove touchend", "outjsmol");















if(typeof(jQuery)=="undefined") alert ("Note -- JSmoljQuery is required for JSmol, but it's not defined.")


self.Jmol || (Jmol = {});

if (!Jmol._version)
Jmol = (function(document) {
	var z=Jmol.z || 9000;
	var getZOrders = function(z) {
		return {
			rear:z++,
			header:z++,
			main:z++,
			image:z++,
			front:z++,
			fileOpener:z++,
			coverImage:z++,
			dialog:z++, // could be several of these, JSV only
			menu:z+90000, // way front
			console:z+91000, // even more front
      consoleImage:z+91001, // bit more front; increments
			monitorZIndex:z+99999 // way way front
		}
	};
	var j = {
		_version: "$Date: 2022-06-24 05:54:49 -0500 (Fri, 24 Jun 2022) $", // svn.keywords:lastUpdated
		_alertNoBinary: true,
		_allowedJmolSize: [25, 2048, 300],   // min, max, default (pixels)
		_allowKeyboardFocus: true, // set false on page if mouse moves and clicks cause too much scrolling of window
		_appletCssClass: "",
		_appletCssText: "",
		_fileCache: null, // enabled by Jmol.setFileCaching(applet, true/false)
		_jarFile: null,  // can be set in URL using _JAR=
		_j2sPath: null,  // can be set in URL using _J2S=
		_use: null,      // can be set in URL using _USE=
		_j2sLoadMonitorOpacity: 90, // initial opacity for j2s load monitor message
		_applets: {},
		_asynchronous: true,
		_ajaxQueue: [],
    _persistentMenu: false,
		_getZOrders: getZOrders,
		_z:getZOrders(z),
		_debugCode: true,  // set false in process of minimization
    _debugCore: false, // set true using URL &debugCore
		db: {
			_databasePrefixes: "$=:",
			_fileLoadScript: ";if (_loadScript = '' && defaultLoadScript == '' && _filetype == 'Pdb') { select protein or nucleic;cartoons Only;color structure; select * };",
			_nciLoadScript: ";n = ({molecule=1}.length < {molecule=2}.length ? 2 : 1); select molecule=n;display selected;center selected;",
			_pubChemLoadScript: "",
			_DirectDatabaseCalls:{
				"cactus.nci.nih.gov": null,
        ".x3dna.org": null,
        "rruff.geo.arizona.edu": null, 
        ".rcsb.org": null, 
        		"chemapps.stolaf.edu/jmol/jsmol/": null,
        		"zakodium.com":null,
				"ftp.wwpdb.org": null,
				"pdbe.org": null, 
				"materialsproject.org": null, 
				".ebi.ac.uk": null, 
				"pubchem.ncbi.nlm.nih.gov":null,
				"www.nmrdb.org/tools/jmol/predict.php":null,
				"$": "https://cactus.nci.nih.gov/chemical/structure/%FILENCI/file?format=sdf&get3d=True",
				"$$": "https://cactus.nci.nih.gov/chemical/structure/%FILENCI/file?format=sdf",
				"=": "https://files.rcsb.org/download/%FILE.pdb",
				"*": "https://www.ebi.ac.uk/pdbe/entry-files/download/%FILE.cif",
				"==": "https://files.rcsb.org/ligands/download/%FILE.cif",
				":": "https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/%FILE/SDF?record_type=3d"
			},
			_restQueryUrl: "http://www.rcsb.org/pdb/rest/search",
			_restQueryXml: "<orgPdbQuery><queryType>org.pdb.query.simple.AdvancedKeywordQuery</queryType><description>Text Search</description><keywords>QUERY</keywords></orgPdbQuery>",
			_restReportUrl: "http://www.pdb.org/pdb/rest/customReport?pdbids=IDLIST&customReportColumns=structureId,structureTitle"
		},
		_debugAlert: false,
		_document: document,
		_isXHTML: false,
		_lastAppletID: null,
		_mousePageX: null,
		_mouseOwner: null,
		_serverUrl: "https://your.server.here/jsmol.php",
		_syncId: ("" + Math.random()).substring(3),
		_touching: false,
		_XhtmlElement: null,
		_XhtmlAppendChild: false
	}
	
	var ref = document.location.href.toLowerCase();
	j._debugCore = (ref.indexOf("j2sdebugcore") >= 0);
	j._httpProto = (ref.indexOf("https") == 0 ? "https://" : "http://"); 
	j._isFile = (ref.indexOf("file:") == 0);
	if (j._isFile) // ensure no attempt to read XML in local request:
	  $.ajaxSetup({ mimeType: "text/plain" });
	j._ajaxTestSite = j._httpProto + "google.com";
	var isLocal = (j._isFile || ref.indexOf("http://localhost") == 0 || ref.indexOf("http://127.") == 0);
	j._tracker = (!isLocal && 'https://chemapps.stolaf.edu/jmol/JmolTracker.php?id=UA-45940799-1');
	
	j._isChrome = (navigator.userAgent.toLowerCase().indexOf("chrome") >= 0);
	j._isSafari = (!j._isChrome && navigator.userAgent.toLowerCase().indexOf("safari") >= 0);
	j._isMsie = (window.ActiveXObject !== undefined);
  j._isEdge = (navigator.userAgent.indexOf("Edge/") >= 0);
	j._useDataURI = /*!j._isSafari && */ !j._isMsie && !j._isEdge; // safari may be OK here -- untested

  window.requestAnimationFrame || (window.requestAnimationFrame = window.setTimeout);
	for(var i in Jmol) j[i] = Jmol[i]; // allows pre-definition
	return j;
})(document, Jmol);


(function (Jmol, $) {

  Jmol.clazzAlert = function(msg) {
  }
  Jmol.__$ = $; // local jQuery object -- important if any other module needs to access it (JSmolMenu, for example)






	$(document).ready(function(){ Jmol._document = null });

	Jmol.$ = function(objectOrId, subdiv) {
		if (objectOrId == null)alert (subdiv + arguments.callee.caller.toString());
			return $(subdiv ? "#" + objectOrId._id + "_" + subdiv : objectOrId);
	} 

	Jmol._$ = function(id) {
		return (typeof id == "string" ? $("#" + id) : id);
	}


	Jmol.$ajax = function(info) {
		Jmol._ajaxCall = info.url;
		info.cache = (info.cache != "NO");
    info.url = Jmol._fixProtocol(info.url);
		return $.ajax(info);
	}

  Jmol._fixProtocol = function(url) {
    if (url.indexOf("get3d=True") >= 0)
      url = url.replace(/get3d\=True/, "get3d=true"); // NCI/CADD change 08/2016
  	return (    
    url.indexOf("http://www.rcsb.org/pdb/files/") == 0 && url.indexOf("/ligand/") < 0 ? 
      "http://files.rcsb.org/view/" + url.substring(30).replace(/\.gz/,"")    
    : url.indexOf("http://") == 0 && (
      Jmol._httpProto == "https://"
      || url.indexOf(".gov/") > 0 
      || url.indexOf("http://www.materialsproject") == 0) 
      ? "https" + url.substring(4) : url);
  }
  
	Jmol._getNCIInfo = function(identifier, what, fCallback) {
		return Jmol._getFileData("https://cactus.nci.nih.gov/chemical/structure/"+identifier +"/" + (what == "name" ? "names" : what));
	}
	
	Jmol.$appEvent = function(app, subdiv, evt, f) {
		var o = Jmol.$(app, subdiv); 
		o.off(evt) && f && o.on(evt, f);
	}   

	Jmol.$resize = function (f) {
		return $(window).resize(f);
	}


	Jmol.$after = function (what, s) {
		return $(what).after(s);
	}

	Jmol.$append = function (what, s) {
		return $(what).append(s);
	}

	Jmol.$bind = function(what, list, f) {
		return (f ? $(what).bind(list, f) : $(what).unbind(list));
	}

	Jmol.$closest = function(what, d) {
		return $(what).closest(d);
	}
	
	Jmol.$get = function(what, i) {
	return $(what).get(i);
	}
 
			 
	Jmol.$documentOff = function(evt, id) {
		return $(document).off(evt, "#" + id);
	}

	Jmol.$documentOn = function(evt, id, f) {
		return $(document).on(evt, "#" + id, f);
	}

	Jmol.$getAncestorDiv = function(id, className) {
		return $("div." + className + ":has(#" + id + ")")[0];
	}

	Jmol.$supportsIECrossDomainScripting = function() {
		return $.support.iecors;
	}


	Jmol.$attr = function (id, a, val) {
		return Jmol._$(id).attr(a, val);
	}

	Jmol.$css = function(id, style) {
		return Jmol._$(id).css(style);
	}
	 
	Jmol.$find = function(id, d) {
		return Jmol._$(id).find(d);
	}
	
	Jmol.$focus = function(id) {
		return Jmol._$(id).focus();
	}

	Jmol.$html = function(id, html) {
		return Jmol._$(id).html(html);
	}
	 
	Jmol.$offset = function(id) {
		return Jmol._$(id).offset();
	}

	Jmol.$windowOn = function(evt, f) {
		return $(window).on(evt, f);
	}

	Jmol.$prop = function(id, p, val) {
		var o = Jmol._$(id);
		return (arguments.length == 3 ? o.prop(p, val) : o.prop(p));
	}

	Jmol.$remove = function(id) {
		return Jmol._$(id).remove();
	}

	Jmol.$scrollTo = function (id, n) {
		var o = Jmol._$(id);
		return o.scrollTop(n < 0 ? o[0].scrollHeight : n);
	}

	Jmol.$setEnabled = function(id, b) {
		return Jmol._$(id).attr("disabled", b ? null : "disabled");  
	}

  Jmol.$getSize = function(id) {
		var o = Jmol._$(id);
    return [ o.width(), o.height() ]
  }
  
	Jmol.$setSize = function(id, w, h) {
		return Jmol._$(id).width(w).height(h);
	}

  Jmol.$is = function(id, test) { // e.g. :visible
    return Jmol._$(id).is(test);
  }
  
	Jmol.$setVisible = function(id, b) {
		var o = Jmol._$(id);
		return (b ? o.show() : o.hide());  
	}

	Jmol.$submit = function(id) {
		return Jmol._$(id).submit();
	}

	Jmol.$val = function (id, v) {
		var o = Jmol._$(id);
		return (arguments.length == 1 ? o.val() : o.val(v));
	}



	Jmol._clearVars = function() {

		delete jQuery;
		delete $;
		delete Jmol;
		delete SwingController;
		delete J;
		delete JM;
		delete JS;
		delete JSV;
		delete JU;
		delete JV;
		delete java;
		delete javajs;
		delete Clazz;
		delete c$; // used in p0p; could be gotten rid of
	}


	Jmol.featureDetection = (function(document, window) {

		var features = {};
		features.ua = navigator.userAgent.toLowerCase()

		features.os = (function(){
			var osList = ["linux","unix","mac","win"]
			var i = osList.length;

			while (i--){
				if (features.ua.indexOf(osList[i])!=-1) return osList[i]
			}
			return "unknown";
		})();

		features.browser = function(){
			var ua = features.ua;
			var browserList = ["konqueror","webkit","omniweb","opera","webtv","icab","msie","mozilla"];
			for (var i = 0; i < browserList.length; i++)
			if (ua.indexOf(browserList[i])>=0) 
				return browserList[i];
			return "unknown";
		}
		features.browserName = features.browser();
		features.browserVersion= parseFloat(features.ua.substring(features.ua.indexOf(features.browserName)+features.browserName.length+1));
		features.supportsXhr2 = function() {return ($.support.cors || $.support.iecors)}
		features.allowDestroy = (features.browserName != "msie");
		features.allowHTML5 = (features.browserName != "msie" || navigator.appVersion.indexOf("MSIE 8") < 0);
		features.getDefaultLanguage = function() {
			return navigator.language || navigator.userLanguage || "en-US";
		};

		features._webGLtest = 0;

		features.supportsWebGL = function() {
		if (!Jmol.featureDetection._webGLtest) { 
			var canvas;
			Jmol.featureDetection._webGLtest = ( 
				window.WebGLRenderingContext 
					&& ((canvas = document.createElement("canvas")).getContext("webgl") 
				|| canvas.getContext("experimental-webgl")) ? 1 : -1);
		}
		return (Jmol.featureDetection._webGLtest > 0);
	};

	features.supportsLocalization = function() {
		var metas = document.getElementsByTagName('meta'); 
		for (var i= metas.length; --i >= 0;) 
			if (metas[i].outerHTML.toLowerCase().indexOf("utf-8") >= 0) return true;
		return false;
		};

	features.supportsJava = function() {
		if (!Jmol.featureDetection._javaEnabled) {
			if (Jmol._isMsie) {
				if (!navigator.javaEnabled()) {
					Jmol.featureDetection._javaEnabled = -1;
				} else {
					Jmol.featureDetection._javaEnabled = 1;
				}
			} else {
				Jmol.featureDetection._javaEnabled = (navigator.javaEnabled() && (!navigator.mimeTypes || navigator.mimeTypes["application/x-java-applet"]) ? 1 : -1);
			}
		}
		return (Jmol.featureDetection._javaEnabled > 0);
	};

	features.compliantBrowser = function() {
		var a = !!document.getElementById;
		var os = features.os;
		if (features.browserName == "opera" && features.browserVersion <= 7.54 && os == "mac"
			|| features.browserName == "webkit" && features.browserVersion < 125.12
			|| features.browserName == "msie" && os == "mac"
			|| features.browserName == "konqueror" && features.browserVersion <= 3.3
		) a = false;
		return a;
	}

	features.isFullyCompliant = function() {
		return features.compliantBrowser() && features.supportsJava();
	}

	features.useIEObject = (features.os == "win" && features.browserName == "msie" && features.browserVersion >= 5.5);
	features.useHtml4Object = (features.browserName == "mozilla" && features.browserVersion >= 5) ||
		(features.browserName == "opera" && features.browserVersion >= 8) ||
		(features.browserName == "webkit"/* && features.browserVersion >= 412.2 && features.browserVersion < 500*/); // 500 is a guess; required for 536.3

	features.hasFileReader = (window.File && window.FileReader);

	return features;

})(document, window);



	Jmol._ajax = function(info) {
		if (!info.async) {
			return Jmol.$ajax(info).responseText;
		}
		Jmol._ajaxQueue.push(info)
		if (Jmol._ajaxQueue.length == 1)
			Jmol._ajaxDone()
	}
	Jmol._ajaxDone = function() {
		var info = Jmol._ajaxQueue.shift();
		info && Jmol.$ajax(info);
	}

	Jmol._grabberOptions = [
		["$", "NCI(small molecules)"],
		[":", "PubChem(small molecules)"],
		["=", "RCSB(macromolecules)"],
		["*", "PDBe(macromolecules)"]
	];

	Jmol._getGrabberOptions = function(applet) {
		if (Jmol._grabberOptions.length == 0)
			return ""


		var s = '<input type="text" id="ID_query" onfocus="jQuery(this).select()" onkeypress="if(13==event.which){Jmol._applets[\'ID\']._search();return false}" size="32" value="" />';
		var b = '<button id="ID_submit" onclick="Jmol._applets[\'ID\']._search()">Search</button></nobr>'
		if (Jmol._grabberOptions.length == 1) {
			s = '<nobr>' + s + '<span style="display:none">';
			b = '</span>' + b;
		} else {
			s += '<br /><nobr>'
		}
		s += '<select id="ID_select">'
		for (var i = 0; i < Jmol._grabberOptions.length; i++) {
			var opt = Jmol._grabberOptions[i];
			s += '<option value="' + opt[0] + '" ' + (i == 0 ? 'selected' : '') + '>' + opt[1] + '</option>';
		}
		s = (s + '</select>' + b).replace(/ID/g, applet._id);
		return '<br />' + s;
	}

	Jmol._getScriptForDatabase = function(database) {
		return (database == "$" ? Jmol.db._nciLoadScript : database == ":" ? Jmol.db._pubChemLoadScript : Jmol.db._fileLoadScript);
	}


	Jmol._setInfo = function(applet, database, data) {
		var info = [];
		var header = "";
		if (data.indexOf("ERROR") == 0)
			header = data;
		else
			switch (database) {
			case "=":
				var S = data.split("<dimStructure.structureId>");
				var info = ["<table>"];
				for (var i = 1; i < S.length; i++) {
					info.push("<tr><td valign=top><a href=\"javascript:Jmol.search(" + applet._id + ",'=" + S[i].substring(0, 4) + "')\">" + S[i].substring(0, 4) + "</a></td>");
					info.push("<td>" + S[i].split("Title>")[1].split("</")[0] + "</td></tr>");
				}
				info.push("</table>");
				header = (S.length - 1) + " matches";
				break;      
			case "$": // NCI
			case ":": // pubChem
			break;
			default:
				return;
		}
		applet._infoHeader = header;
		applet._info = info.join("");
		applet._showInfo(true);
	}

	Jmol._loadSuccess = function(a, fSuccess) {
		if (!fSuccess)
			return;
		Jmol._ajaxDone();
		fSuccess(a);
	}

	Jmol._loadError = function(fError){
		Jmol._ajaxDone();
		Jmol.say("Error connecting to server: " + Jmol._ajaxCall);  
		null!=fError&&fError()
	}

	Jmol._isDatabaseCall = function(query) {
		return (Jmol.db._databasePrefixes.indexOf(query.substring(0, 1)) >= 0);
	}

	Jmol._getDirectDatabaseCall = function(query, checkXhr2) {
		if (checkXhr2 && !Jmol.featureDetection.supportsXhr2())
			return query;
		var pt = 2;
		var db = query.substring(0,pt)
		var call = Jmol.db._DirectDatabaseCalls[db] || Jmol.db._DirectDatabaseCalls[db = query.substring(0,--pt)];
		if (call) {
			if (db == ":") {
				var ql = query.toLowerCase();
				if (!isNaN(parseInt(query.substring(1)))) {
					query = "cid/" + query.substring(1);
				} else if (ql.indexOf(":smiles:") == 0) {
					call += "?POST?smiles=" + query.substring(8);
					query = "smiles";
				} else if (ql.indexOf(":cid:") == 0) {
					query = "cid/" + query.substring(5);
				} else {
					if (ql.indexOf(":name:") == 0)
						query = query.substring(5);
					else if (ql.indexOf(":cas:") == 0)
						query = query.substring(4);
					query = "name/" + encodeURIComponent(query.substring(pt));
				}
			} else {
				query = encodeURIComponent(query.substring(pt));		
			}
      if (query.indexOf(".mmtf") >= 0) {
        query = "https://mmtf.rcsb.org/v1.0/full/" + query.replace(/\.mmtf/, "");
			} else if (call.indexOf("FILENCI") >= 0) {
				query = query.replace(/\%2F/g, "/");				
				query = call.replace(/\%FILENCI/, query);
			} else {
				query = call.replace(/\%FILE/, query);
			}
		}
		return query;
	}

	Jmol._getRawDataFromServer = function(database,query,fSuccess,fError,asBase64,noScript){
		var s = 
			"?call=getRawDataFromDatabase&database=" + database + (query.indexOf("?POST?") >= 0 ? "?POST?" : "")
				+ "&query=" + encodeURIComponent(query)
				+ (asBase64 ? "&encoding=base64" : "")
				+ (noScript ? "" : "&script=" + encodeURIComponent(Jmol._getScriptForDatabase(database)));
		return Jmol._contactServer(s, fSuccess, fError);
	}

	Jmol._checkFileName = function(applet, fileName, isRawRet) {
		if (Jmol._isDatabaseCall(fileName)) {
			if (isRawRet)
				Jmol._setQueryTerm(applet, fileName);
			fileName = Jmol._getDirectDatabaseCall(fileName, true);
			if (Jmol._isDatabaseCall(fileName)) {
				fileName = Jmol._getDirectDatabaseCall(fileName, false);
				isRawRet && (isRawRet[0] = true);
			}
		}
		return fileName;
	}
	
	Jmol._checkCache = function(applet, fileName, fSuccess) {
		if (applet._cacheFiles && Jmol._fileCache && !fileName.endsWith(".js")) {
			var data = Jmol._fileCache[fileName];
			if (data) {
				System.out.println("using "  + data.length + " bytes of cached data for "  + fileName);
				fSuccess(data);
				return null;
			} else {
				fSuccess = function(fileName, data) { fSuccess(Jmol._fileCache[fileName] = data) };     
			}
		}
		return fSuccess;
	}
	
  Jmol.playAudio = function(filePath) {
    Jmol.playAudio(null, filePath);
  }
  
  Jmol.playAudio = function(applet, params) {
  
    var get = (params.get ? function(key){return params.get(key)} : null);
    var put = (params.put ? function(key,val){return params.put(key,val)} : null);
    var filePath = (get ? get("audioFile") : params);
    var jmolAudio = get && get("audioPlayer");
    var audio = document.createElement("audio");
    put && put("audioElement", audio);
    var callback = null;
    if (jmolAudio) {
      callback = function(type){jmolAudio.processUpdate(type)};
      jmolAudio.myClip = {
         open: function() {callback("open")},
         start: function() { audio.play(); callback("start")},
         loop: function(n) { audio.loop = (n != 0); },
         stop: function() { audio.pause(); },
         close: function() { callback("close") },
         setMicrosecondPosition: function(us) { audio.currentTime = us / 1e6; }
      };
    }    
    audio.controls = "true";
    audio.src = filePath;
    if (get && get("loop"))
      audio.loop = "true";
    if (callback) {
      audio.addEventListener("pause", function() {
          callback("pause");
      });
      audio.addEventListener("play", function() {
          callback("play");
      });
      audio.addEventListener("playing", function() {
          callback("playing");
      });
      audio.addEventListener("ended", function() {
          callback("ended");
      });
      callback("open")
    }
  }
  
	Jmol._loadFileData = function(applet, fileName, fSuccess, fError){
		var isRaw = [];
		fileName = Jmol._checkFileName(applet, fileName, isRaw);
		fSuccess = Jmol._checkCache(applet, fileName, fSuccess);
		if (isRaw[0]) {
				Jmol._getRawDataFromServer("_",fileName,fSuccess,fError);   
				return;
		} 
		var info = {
			type: "GET",
			dataType: "text",
			url: fileName,
			async: Jmol._asynchronous,
			success: function(a) {Jmol._loadSuccess(a, fSuccess)},
			error: function() {Jmol._loadError(fError)}
		}
		Jmol._checkAjaxPost(info);
		Jmol._ajax(info);
	}

	Jmol._getInfoFromDatabase = function(applet, database, query){
		if (database == "====") {
			var data = Jmol.db._restQueryXml.replace(/QUERY/,query);
			var info = {
				dataType: "text",
				type: "POST",
				contentType:"application/x-www-form-urlencoded",
				url: Jmol.db._restQueryUrl,
				data: encodeURIComponent(data) + "&req=browser",
				success: function(data) {Jmol._ajaxDone();Jmol._extractInfoFromRCSB(applet, database, query, data)},
				error: function() {Jmol._loadError(null)},
				async: Jmol._asynchronous
			}
			return Jmol._ajax(info);
		}   
		query = "?call=getInfoFromDatabase&database=" + database
				+ "&query=" + encodeURIComponent(query);
		return Jmol._contactServer(query, function(data) {Jmol._setInfo(applet, database, data)});
	}

	Jmol._extractInfoFromRCSB = function(applet, database, query, output) {
		var n = output.length/5;
		if (n == 0)
			return; 
		if (query.length == 4 && n != 1) {
			var QQQQ = query.toUpperCase();
			var pt = output.indexOf(QQQQ);
			if (pt > 0 && "123456789".indexOf(QQQQ.substring(0, 1)) >= 0)
				output = QQQQ + "," + output.substring(0, pt) + output.substring(pt + 5);
			if (n > 50)
				output = output.substring(0, 250);
			output = output.replace(/\n/g,",");
			var url = Jmol._restReportUrl.replace(/IDLIST/,output);
			Jmol._loadFileData(applet, url, function(data) {Jmol._setInfo(applet, database, data) });   
		}
	}

	Jmol._checkAjaxPost = function(info) {
		var pt = info.url.indexOf("?POST?");
		if (pt > 0) {
			info.data = info.url.substring(pt + 6);
			info.url = info.url.substring(0, pt);
			info.type = "POST";
			info.contentType = "application/x-www-form-urlencoded";
		}
	}
	Jmol._contactServer = function(data,fSuccess,fError){
		var info = {
			dataType: "text",
			type: "GET",
			url: Jmol._serverUrl + data,
			success: function(a) {Jmol._loadSuccess(a, fSuccess)},
			error:function() { Jmol._loadError(fError) },
			async:fSuccess ? Jmol._asynchronous : false
		}
		Jmol._checkAjaxPost(info);
		return Jmol._ajax(info);
	}

	Jmol._setQueryTerm = function(applet, query) {
		if (!query || !applet._hasOptions || query.substring(0, 7) == "http://")
			return;
		if (Jmol._isDatabaseCall(query)) {
			var database = query.substring(0, 1);
			query = query.substring(1);
			if (query.substring(0,1) == database && "=$".indexOf(database) >= 0)
				query = query.substring(1);
			var d = Jmol._getElement(applet, "select");
			if (d && d.options)
				for (var i = 0; i < d.options.length; i++)
					if (d[i].value == database)
						d[i].selected = true;
		}
		Jmol.$val(Jmol.$(applet, "query"), query);
	}

	Jmol._search = function(applet, query, script) {
		arguments.length > 1 || (query = null);
		Jmol._setQueryTerm(applet, query);
		query || (query = Jmol.$val(Jmol.$(applet, "query")))
		if (query.indexOf("!") == 0) {
			applet._script(query.substring(1));
			return;
		} 
		query && (query = query.replace(/\"/g, ""));
		applet._showInfo(false);
		Jmol._searchMol(applet, query, script, true);
	}

	Jmol._searchMol = function(applet, query, script, checkView) {
		var database;
		if (Jmol._isDatabaseCall(query)) {
			database = query.substring(0, 1);
			query = query.substring(1);
		} else {
			database = (applet._hasOptions ? Jmol.$val(Jmol.$(applet, "select")) : "$");
		}
		if (database == "=" && query.length == 3)
			query = "=" + query; // this is a ligand      
		var dm = database + query;
		if (!query || dm.indexOf("?") < 0 && dm == applet._thisJmolModel) {
			return;    
		}
		applet._thisJmolModel = dm;
		var view;
		if (checkView && applet._viewSet != null && (view = Jmol.View.__findView(applet._viewSet, {chemID:dm})) != null) {
			Jmol.View.__setView(view, applet, false);
			return;
		}

		if (database == "$" || database == ":")
			applet._jmolFileType = "MOL";
		else if (database == "=")
			applet._jmolFileType = "PDB";
		applet._searchDatabase(query, database, script);
	}

	Jmol._searchDatabase = function(applet, query, database, script) {
		applet._showInfo(false);
		if (query.indexOf("?") >= 0) {
			Jmol._getInfoFromDatabase(applet, database, query.split("?")[0]);
			return true;
		}
		if (Jmol.db._DirectDatabaseCalls[database]) {
			applet._loadFile(database + query, script);
			return true;
		}
		return false;
	}

	Jmol._syncBinaryOK="?";

	Jmol._canSyncBinary = function(isSilent) {
		if (Jmol._isAsync) return true;
		if (self.VBArray) return (Jmol._syncBinaryOK = false);
		if (Jmol._syncBinaryOK != "?") return Jmol._syncBinaryOK;
		Jmol._syncBinaryOK = true;
		try {
			var xhr = new window.XMLHttpRequest();
			xhr.open( "text", Jmol._ajaxTestSite, false );
			if (xhr.hasOwnProperty("responseType")) {
				xhr.responseType = "arraybuffer";
			} else if (xhr.overrideMimeType) {
				xhr.overrideMimeType('text/plain; charset=x-user-defined');
			}
		} catch( e ) {
			var s = "JSmolCore.js: synchronous binary file transfer is requested but not available";
			System.out.println(s);
			if (Jmol._alertNoBinary && !isSilent)
				alert (s)
			return Jmol._syncBinaryOK = false;
		}
		return true;  
	}

	Jmol._binaryTypes = [".cdx","mmtf",".bcif",".gz",".bz2",".jpg",".gif",".png",".zip",".jmol",".bin",".smol",".spartan",".pmb",".mrc",".map",".ccp4",".dn6",".delphi",".omap",".pse",".dcd",".lut",".uk/pdbe/densities/",".uk/pdbe/volume-server/"];

	Jmol.isBinaryUrl = function(url) {
		for (var i = Jmol._binaryTypes.length; --i >= 0;)
			if (url.indexOf(Jmol._binaryTypes[i]) >= 0) return true;
		return false;
	}

	Jmol._getFileData = function(fileName, fSuccess, doProcess) {
		var isBinary = Jmol.isBinaryUrl(fileName);
		var isPDB = (fileName.indexOf(".gz") >= 0 && fileName.indexOf("rcsb.org") >= 0);
		if (isPDB) {
			fileName = fileName.replace(/\.gz/,"");
			isBinary = false;
		}
		var asBase64 = (isBinary && !fSuccess && !Jmol._canSyncBinary(isPDB));
		var isPost = (fileName.indexOf("?POST?") >= 0);
		if (fileName.indexOf("file:/") == 0 && fileName.indexOf("file:///") != 0)
			fileName = "file://" + fileName.substring(5);      /// fixes IE problem
		var isMyHost = (fileName.indexOf("://") < 0 || fileName.indexOf(document.location.protocol) == 0 && fileName.indexOf(document.location.host) >= 0);
    var isHttps2Http = (Jmol._httpProto == "https://" && fileName.indexOf("http://") == 0);
		var isDirectCall = Jmol._isDirectCall(fileName);
    if (fileName.indexOf("?ALLOWSORIGIN?") >= 0) {
			fileName = fileName.replace(/\?ALLOWSORIGIN\?/,"");
    }

		var cantDoSynchronousLoad = (!isMyHost && Jmol.$supportsIECrossDomainScripting());
		var data = null;
		if (isHttps2Http || asBase64 || !isMyHost && !isDirectCall || !fSuccess && cantDoSynchronousLoad ) {
				data = Jmol._getRawDataFromServer("_",fileName, fSuccess, fSuccess, asBase64, true);
		} else {
			fileName = fileName.replace(/file:\/\/\/\//, "file://"); // opera
			var info = {dataType:(isBinary ? "binary" : "text"),async:!!fSuccess};
			if (isPost) {
				info.type = "POST";
				info.url = fileName.split("?POST?")[0]
				info.data = fileName.split("?POST?")[1]
				if (info.data.startsWith('{"')) {
					info.contentType = "application/json";
					info.data = info.data.replaceAll("\n", "\\\\n");
				}
			} else {
				info.type = "GET";
				info.url = fileName;
			}
			if (fSuccess) {
				info.success = function(data) { fSuccess(Jmol._xhrReturn(info.xhr))};
				info.error = function() { fSuccess(info.xhr.statusText)};
			}
			info.xhr = Jmol.$ajax(info);
			if (!fSuccess) {
				data = Jmol._xhrReturn(info.xhr);
			}
		}
		if (!doProcess)
			return data;
		if (data == null) {
			data = "";
			isBinary = false;
		}
		isBinary && (isBinary = Jmol._canSyncBinary(true));
		return (isBinary ? Jmol._strToBytes(data) : JU.SB.newS(data));
	}
	
	Jmol._xhrReturn = function(xhr){
		if (!xhr.responseText && xhr.responseText !== '' || self.Clazz && Clazz.instanceOf(xhr.response, self.ArrayBuffer)) {
			return xhr.response || xhr.statusText;
		} 
		return xhr.responseText;
	}

	Jmol._isDirectCall = function(url) {
    if (url.indexOf("?ALLOWSORIGIN?") >= 0)
      return true;
		for (var key in Jmol.db._DirectDatabaseCalls) {
			if (key.indexOf(".") >= 0 && url.indexOf(key) >= 0)
				return true;
		}
		return false;
	}

	Jmol._cleanFileData = function(data) {
		if (data.indexOf("\r") >= 0 && data.indexOf("\n") >= 0) {
			return data.replace(/\r\n/g,"\n");
		}
		if (data.indexOf("\r") >= 0) {
			return data.replace(/\r/g,"\n");
		}
		return data;
	};

	Jmol._getFileType = function(name) {
		var database = name.substring(0, 1);
		if (database == "$" || database == ":")
			return "MOL";
		if (database == "=")
			return (name.substring(1,2) == "=" ? "LCIF" : "PDB");
		name = name.split('.').pop().toUpperCase();
		return name.substring(0, Math.min(name.length, 3));
	};

	Jmol._getZ = function(applet, what) {
		return applet && applet._z && applet._z[what] || Jmol._z[what];
	}
	
	Jmol._incrZ = function(applet, what) {
		return applet && applet._z && ++applet._z[what] || ++Jmol._z[what];
	}
	
  Jmol._hideLocalFileReader = function(applet, cursor) {
    applet._localReader && Jmol.$setVisible(applet._localReader, false);
    applet._readingLocal = false;
    Jmol.setCursor(applet, 0);
  }
  
  Jmol.loadFileFromDialog = function(applet) {
    Jmol.loadFileAsynchronously(null, applet, null, null);
  }
  
	Jmol.loadFileAsynchronously = function(fileLoadThread, applet, fileName, appData) {
		if (fileName && fileName.indexOf("?") != 0) {
			var fileName0 = fileName;
			fileName = Jmol._checkFileName(applet, fileName);
			var fSuccess = function(data) {Jmol._setData(fileLoadThread, fileName, fileName0, data, appData, applet)};
			fSuccess = Jmol._checkCache(applet, fileName, fSuccess);
			if (fileName.indexOf("|") >= 0)
				fileName = fileName.split("|")[0];
			return (fSuccess == null ? null : Jmol._getFileData(fileName, fSuccess));		
		}
		if (!Jmol.featureDetection.hasFileReader) {
        var msg = "Local file reading is not enabled in your browser";
				return (fileLoadThread ? fileLoadThread.setData(msg, null, null, appData, applet) : alert(msg));
    }
		if (!applet._localReader) {
			var div = '<div id="ID" style="z-index:'+Jmol._getZ(applet, "fileOpener") + ';position:absolute;background:#E0E0E0;left:10px;top:10px"><div style="margin:5px 5px 5px 5px;"><button id="ID_loadurl">URL</button><input type="file" id="ID_files" /><button id="ID_loadfile">load</button><button id="ID_cancel">cancel</button></div><div>'
			Jmol.$after("#" + applet._id + "_appletdiv", div.replace(/ID/g, applet._id + "_localReader"));
			applet._localReader = Jmol.$(applet, "localReader");
		}
		Jmol.$appEvent(applet, "localReader_loadurl", "click");
		Jmol.$appEvent(applet, "localReader_loadurl", "click", function(evt) {
      var file = prompt("Enter a URL");
      if (!file)return
      Jmol._hideLocalFileReader(applet, 0);
      Jmol._setData(null, file, file, null, appData, applet);
		});
		Jmol.$appEvent(applet, "localReader_loadfile", "click");
		Jmol.$appEvent(applet, "localReader_loadfile", "click", function(evt) {
			var file = Jmol.$(applet, "localReader_files")[0].files[0];   
			var reader = new FileReader();
			reader.onloadend = function(evt) {
				if (evt.target.readyState == FileReader.DONE) { // DONE == 2
          Jmol._hideLocalFileReader(applet, 0);
					Jmol._setData(fileLoadThread, file.name, file.name, evt.target.result, appData, applet);
				}
			};
      try {
			  reader.readAsArrayBuffer(file);
      } catch (e) {
        alert("You must select a file first.");
      }
		});
		Jmol.$appEvent(applet, "localReader_cancel", "click");
		Jmol.$appEvent(applet, "localReader_cancel", "click", function(evt) {
      Jmol._hideLocalFileReader(applet);
      if (fileLoadThread)
  			fileLoadThread.setData("#CANCELED#", null, null, appData, applet);
		});
		Jmol.$setVisible(applet._localReader, true);
    applet._readingLocal = true;
	}

  Jmol._setData = function(fileLoadThread, filename, filename0, data, appData, applet) {
  	data && (data = Jmol._strToBytes(data));
		if (data != null && (fileLoadThread == null || filename.indexOf(".jdx") >= 0))
			Jmol.Cache.put("cache://" + filename, data); 
    if (fileLoadThread == null) {
      applet._applet.openFileAsyncSpecial(data == null ? filename : "cache://" + filename, 1);
    } else {          
		  fileLoadThread.setData(filename, filename0, data, appData);
    }    
  }

	Jmol.doAjax = function(url, postOut, dataOut) {
		url = url.toString();
		if (dataOut) {

			if (url.indexOf("http://") != 0 && url.indexOf("https://") != 0)
				return Jmol._saveFile(url, dataOut);
			var info = {async:false,url:url,type:"POST",
				data:typeof data == "string" ? dataOut :";base64," + (JU || J.util).Base64.getBase64(dataOut).toString(), processData:false
			};
			return Jmol.$ajax(info).responseText;
		}
		if (postOut)
			url += "?POST?" + postOut;
		return Jmol._getFileData(url, null, true);
	}

	 
	Jmol._saveFile = function(filename, data, mimetype, encoding) {
		if (Jmol._localFileSaveFunction && Jmol._localFileSaveFunction(filename, data))
			return "OK";
		var filename = filename.substring(filename.lastIndexOf("/") + 1);
		mimetype || (mimetype = (filename.indexOf(".pdf") >= 0 ? "application/pdf" 
			: filename.indexOf(".png") >= 0 ? "image/png" 
			: filename.indexOf(".gif") >= 0 ? "image/gif" 
			: filename.indexOf(".jpg") >= 0 ? "image/jpg" : ""));
		var isString = (typeof data == "string");
		
	if (isString && data.indexOf(";base64,") >= 0) {
	  data = data.split(";base64,")[1];
	} else {	
   	data = (JU || J.util).Base64.getBase64(isString ? data.getBytes("UTF-8") : data).toString();
   	}
		encoding || (encoding = "base64");
		
		var url = Jmol._serverUrl;
		url && url.indexOf("your.server") >= 0 && (url = "");
		if (Jmol._useDataURI || !url) {
			var a = document.createElement("a");
			a.href = "data:" + mimetype + ";base64," + data;
			a.type = mimetype || (mimetype = "text/plain;charset=utf-8");	
			a.download = filename;
			a.target = "_blank";
				$("body").append(a);
			a.click();
			a.remove();		
		} else {
			if (!Jmol._formdiv) {
					var sform = '<div id="__jsmolformdiv__" style="display:none">\
						<form id="__jsmolform__" method="post" target="_blank" action="">\
						<input name="call" value="saveFile"/>\
						<input id="__jsmolmimetype__" name="mimetype" value=""/>\
						<input id="__jsmolencoding__" name="encoding" value=""/>\
						<input id="__jsmolfilename__" name="filename" value=""/>\
						<textarea id="__jsmoldata__" name="data"></textarea>\
						</form>\
						</div>'
				Jmol.$after("body", sform);
				Jmol._formdiv = "__jsmolform__";
			}
			Jmol.$attr(Jmol._formdiv, "action", url + "?" + (new Date()).getMilliseconds());
			Jmol.$val("__jsmoldata__", data);
			Jmol.$val("__jsmolfilename__", filename);
			Jmol.$val("__jsmolmimetype__", mimetype);
			Jmol.$val("__jsmolencoding__", encoding);
			Jmol.$submit("__jsmolform__");
			Jmol.$val("__jsmoldata__", "");
			Jmol.$val("__jsmolfilename__", "");
		}
		return "OK";
	}

	Jmol._strToBytes = function(s) {
		if (Clazz.instanceOf(s, self.ArrayBuffer))
			return Clazz.newByteArray(-1, s);
		var b = Clazz.newByteArray(s.length, 0);
		for (var i = s.length; --i >= 0;)
			b[i] = s.charCodeAt(i) & 0xFF;
		return b;
	}


	Jmol._setConsoleDiv = function (d) {
		if (!self.Clazz)return;
		Clazz.setConsoleDiv(d);
	}

	Jmol._registerApplet = function(id, applet) {
		return window[id] = Jmol._applets[id] = Jmol._applets.master = Jmol._applets[id + "__" + Jmol._syncId + "__"] = applet;
	} 

	Jmol._readyCallback = function (appId,fullId,isReady,javaApplet,javaAppletPanel) {
		appId = appId.split("_object")[0];
    var applet = Jmol._applets[appId];
		isReady = (isReady.booleanValue ? isReady.booleanValue() : isReady);
    if (isReady) {
      applet._appletPanel = (javaAppletPanel || javaApplet);
      applet._applet = javaApplet;
    }
		Jmol._track(applet)._readyCallback(appId, fullId, isReady);
	}

	Jmol._getWrapper = function(applet, isHeader) {



		var s;
		if (isHeader) {
			var img = ""; 
			if (applet._coverImage){
				var more = " onclick=\"Jmol.coverApplet(ID, false)\" title=\"" + (applet._coverTitle) + "\"";
				var play = "<image id=\"ID_coverclickgo\" src=\"" + applet._makeLiveImage + "\" style=\"width:25px;height:25px;position:absolute;bottom:10px;left:10px;"
					+ "z-index:" + Jmol._getZ(applet, "coverImage")+";opacity:0.5;\"" + more + " />"  
				img = "<div id=\"ID_coverdiv\" style=\"background-color:red;z-index:" + Jmol._getZ(applet, "coverImage")+";width:100%;height:100%;display:inline;position:absolute;top:0px;left:0px\"><image id=\"ID_coverimage\" src=\""
				 + applet._coverImage + "\" style=\"width:100%;height:100%\"" + more + "/>" + play + "</div>";
			}
      
      var wait = (applet._isJava ? "" : "<image id=\"ID_waitimage\" src=\"" + applet._j2sPath + "/img/cursor_wait.gif\" style=\"display:none;position:absolute;bottom:10px;left:10px;"
					+ "z-index:" + Jmol._getZ(applet, "coverImage")+";\" />");  

			var css = Jmol._appletCssText.replace(/\'/g,'"');
      var spinner = applet._getSpinner && applet._getSpinner();
      applet._spinner = spinner = (!spinner || spinner == "none" ? "" : "background-image:url("+spinner + "); background-repeat:no-repeat; background-position:center;");    
			css = spinner + (css.indexOf("style=\"") >= 0 ? css.split("style=\"")[1] : "\" " + css);
			s = "\
...<div id=\"ID_appletinfotablediv\" style=\"width:Wpx;height:Hpx;position:relative;font-size:14px;text-align:left\">IMG WAIT\
......<div id=\"ID_appletdiv\" style=\"z-index:" + Jmol._getZ(applet, "header") + ";width:100%;height:100%;position:absolute;top:0px;left:0px;" + css + ">";
			var height = applet._height;
			var width = applet._width;
			if (typeof height !== "string" || height.indexOf("%") < 0) 
				height += "px";
			if (typeof width !== "string" || width.indexOf("%") < 0)
				width += "px";
			s = s.replace(/IMG/, img).replace(/WAIT/, wait).replace(/Hpx/g, height).replace(/Wpx/g, width);
		} else {
			s = "\
......</div>\
......<div id=\"ID_2dappletdiv\" style=\"position:absolute;width:100%;height:100%;overflow:hidden;display:none\"></div>\
......<div id=\"ID_infotablediv\" style=\"width:100%;height:100%;position:absolute;top:0px;left:0px\">\
.........<div id=\"ID_infoheaderdiv\" style=\"height:20px;width:100%;background:yellow;display:none\"><span id=\"ID_infoheaderspan\"></span><span id=\"ID_infocheckboxspan\" style=\"position:absolute;text-align:right;right:1px;\"><a href=\"javascript:Jmol.showInfo(ID,false)\">[x]</a></span></div>\
.........<div id=\"ID_infodiv\" style=\"position:absolute;top:20px;bottom:0px;width:100%;height:100%;overflow:auto\"></div>\
......</div>\
...</div>";
		}
		return s.replace(/\.\.\./g,"").replace(/[\n\r]/g,"").replace(/ID/g, applet._id);
	}

  Jmol._hideLoadingSpinner = function(applet) {
    if (applet._spinner)
      Jmol.$css(Jmol.$(applet, "appletdiv"), {"background-image": ""});
  }
  
	Jmol._documentWrite = function(text) {
		if (Jmol._document) {
			if (Jmol._isXHTML && !Jmol._XhtmlElement) {
				var s = document.getElementsByTagName("script");
				Jmol._XhtmlElement = s.item(s.length - 1);
				Jmol._XhtmlAppendChild = false;
			}
			if (Jmol._XhtmlElement)
				Jmol._domWrite(text);
			else
				Jmol._document.write(text);
		}
		return text;
	}

	Jmol._domWrite = function(data) {
		var pt = 0
		var Ptr = []
		Ptr[0] = 0
		while (Ptr[0] < data.length) {
			var child = Jmol._getDomElement(data, Ptr);
			if (!child)
				break;
			if (Jmol._XhtmlAppendChild)
				Jmol._XhtmlElement.appendChild(child);
			else
				Jmol._XhtmlElement.parentNode.insertBefore(child, _jmol.XhtmlElement);
		}
	}

	Jmol._getDomElement = function(data, Ptr, closetag, lvel) {


		var e = document.createElement("span");
		e.innerHTML = data;
		Ptr[0] = data.length;

		return e;    
	}

	Jmol._setObject = function(obj, id, Info) {
		obj._id = id;
		obj.__Info = {};
		Info.z && Info.zIndexBase && (Jmol._z = Jmol._getZOrders(Info.zIndexBase));
		for (var i in Info)
			obj.__Info[i] = Info[i];
		(obj._z = Info.z) || Info.zIndexBase && (obj._z = obj.__Info.z = Jmol._getZOrders(Info.zIndexBase));
		obj._width = Info.width;
		obj._height = Info.height;
		obj._noscript = !obj._isJava && Info.noscript;
		obj._console = Info.console;
		obj._cacheFiles = !!Info.cacheFiles;
		obj._viewSet = (Info.viewSet == null || obj._isJava ? null : "Set" + Info.viewSet);
		if (obj._viewSet != null) {
			Jmol.View.__init(obj);
			obj._currentView = null;
		}
		!Jmol._fileCache && obj._cacheFiles && (Jmol._fileCache = {});
		if (!obj._console)
			obj._console = obj._id + "_infodiv";
		if (obj._console == "none")
			obj._console = null;

		obj._color = (Info.color ? Info.color.replace(/0x/,"#") : "#FFFFFF");
		obj._disableInitialConsole = Info.disableInitialConsole;
		obj._noMonitor = Info.disableJ2SLoadMonitor;
		Jmol._j2sPath && (Info.j2sPath = Jmol._j2sPath);
		obj._j2sPath = Info.j2sPath;
		obj._coverImage = Info.coverImage;
    obj._makeLiveImage = Info.makeLiveImage || Info.j2sPath + "/img/play_make_live.jpg";
		obj._isCovered = !!obj._coverImage; 
		obj._deferApplet = Info.deferApplet || obj._isCovered && obj._isJava; // must do this if covered in Java
		obj._deferUncover = Info.deferUncover && !obj._isJava; // can't do this with Java
		obj._coverScript = Info.coverScript;
		obj._coverTitle = Info.coverTitle;

		if (!obj._coverTitle)
			obj._coverTitle = (obj._deferApplet ? "activate 3D model" : "3D model is loading...")
		obj._containerWidth = obj._width + ((obj._width==parseFloat(obj._width))? "px":"");
		obj._containerHeight = obj._height + ((obj._height==parseFloat(obj._height))? "px":"");
		obj._info = "";
		obj._infoHeader = obj._jmolType + ' "' + obj._id + '"'
		obj._hasOptions = Info.addSelectionOptions;
		obj._defaultModel = Info.defaultModel;
		obj._readyScript = (Info.script ? Info.script : "");
		obj._readyFunction = Info.readyFunction;
		if (obj._coverImage && !obj._deferApplet)
			obj._readyScript += ";javascript " + id + "._displayCoverImage(false)";
		obj._src = Info.src;

	}

	Jmol._addDefaultInfo = function(Info, DefaultInfo) {
		for (var x in DefaultInfo)
			if (typeof Info[x] == "undefined")
				Info[x] = DefaultInfo[x];
		Jmol._use && (Info.use = Jmol._use);
		if (Info.use.indexOf("SIGNED") >= 0) {
			if (Info.jarFile.indexOf("Signed") < 0)
				Info.jarFile = Info.jarFile.replace(/Applet/,"AppletSigned");
			Info.use = Info.use.replace(/SIGNED/, "JAVA");
			Info.isSigned = true;
		}
	}

	Jmol._syncedApplets = [];
	Jmol._syncedCommands = [];
	Jmol._syncedReady = [];
	Jmol._syncReady = false;
	Jmol._isJmolJSVSync = false;

	Jmol._setReady = function(applet) {
		Jmol._syncedReady[applet] = 1;
		var n = 0;
		for (var i = 0; i < Jmol._syncedApplets.length; i++) {
			if (Jmol._syncedApplets[i] == applet._id) {
				Jmol._syncedApplets[i] = applet;
				Jmol._syncedReady[i] = 1;
			} else if (!Jmol._syncedReady[i]) {
				continue;
			}
			n++;
		}
		if (n != Jmol._syncedApplets.length)
			return;
		Jmol._setSyncReady();
	}

	Jmol._setDestroy = function(applet) {

		if (Jmol.featureDetection.allowDestroy)
			Jmol.$windowOn('beforeunload', function () { Jmol._destroy(applet); } );
	}

	Jmol._destroy = function(applet) {
		try {
			if (applet._appletPanel) applet._appletPanel.destroy();
			applet._applet = null;
			Jmol._unsetMouse(applet._canvas)
			applet._canvas = null;
			var n = 0;
			for (var i = 0; i < Jmol._syncedApplets.length; i++) {
				if (Jmol._syncedApplets[i] == applet)
					Jmol._syncedApplets[i] = null;
				if (Jmol._syncedApplets[i])
					n++;
			}
			if (n > 0)
				return;
			Jmol._clearVars();
		} catch(e){}
	}


	Jmol._setSyncReady = function() {
		Jmol._syncReady = true;
		if (Jmol._isJmolJSVSync) {
			var applets = Jmol._syncedApplets;
			for (var i = 0; i < applets.length - 1; i += 2) {
				applets[i]._linkedApplet = applets[i + 1];
				applets[i + 1]._linkedApplet = applets[i];
			}
		}
		var s = ""
		for (var i = 0; i < Jmol._syncedApplets.length; i++)
			if (Jmol._syncedCommands[i])
				s += "Jmol.script(Jmol._syncedApplets[" + i + "], Jmol._syncedCommands[" + i + "]);"
		setTimeout(s, 50);  
	}

	Jmol._mySyncCallback = function(appFullName,msg) {
		app = Jmol._applets[appFullName];
		if (app._viewSet) {
				Jmol.View.updateFromSync(app, msg);
			return;
		}
		if(!Jmol._syncReady || !Jmol._isJmolJSVSync)
			return 1; // continue processing and ignore me
		
		if (app._linkedApplet && msg.indexOf(app._linkedApplet._syncKeyword) >= 0)
			app._linkedApplet._syncScript(msg);
		return 0 // prevents further Jmol sync processing 

		for (var i = 0; i < Jmol._syncedApplets.length; i++) {
			if (msg.indexOf(Jmol._syncedApplets[i]._syncKeyword) >= 0)
				Jmol._syncedApplets[i]._syncScript(msg);
		}
		return 0 // prevents further Jmol sync processing 
	}              

	Jmol._getElement = function(applet, what) {
		var d = document.getElementById(applet._id + "_" + what);
		return (d || {});
	} 
	 
	Jmol._evalJSON = function(s,key){
		s = s + "";
		if(!s)
			return [];
		if(s.charAt(0) != "{") {
			if(s.indexOf(" | ") >= 0)
				s = s.replace(/\ \|\ /g, "\n");
			return s;
		}
		var A = (new Function( "return " + s ) )();
		return (!A ? null : key && A[key] != undefined ? A[key] : A);
	}

	Jmol._sortMessages = function(A){
		function _sortKey0(a,b){
			return (a[0]<b[0]?1:a[0]>b[0]?-1:0);
		}

		if(!A || typeof (A) != "object")
			return [];
		var B = [];
		for(var i = A.length - 1; i >= 0; i--)
			for(var j = 0, jj= A[i].length; j < jj; j++)
				B[B.length] = A[i][j];
		if(B.length == 0)
			return;
		B = B.sort(_sortKey0);
		return B;
	}


	Jmol._setMouseOwner = function(who, tf) {
		if (who == null || tf) {
			Jmol._mouseOwner = who;
			who && who._applet && (Jmol._lastAppletID = who._applet._id);
		} else if (Jmol._mouseOwner == who) {
			Jmol._mouseOwner = null;
		}
	}

	Jmol._jsGetMouseModifiers = function(ev) {
		var modifiers = 0;
		switch (ev.button) {
		case 0:
			modifiers = 16;//J.api.Event.MOUSE_LEFT;
			break;
		case 1:
			modifiers = 8;//J.api.Event.MOUSE_MIDDLE;
			break;
		case 2:
			modifiers = 4;//J.api.Event.MOUSE_RIGHT;
			break;
		}
		if (ev.shiftKey)
			modifiers += 1;//J.api.Event.SHIFT_MASK;
		if (ev.altKey)
			modifiers += 8;//J.api.Event.ALT_MASK;
		if (ev.ctrlKey)
			modifiers += 2;//J.api.Event.CTRL_MASK;
		return modifiers;
	}

	Jmol._jsGetXY = function(canvas, ev) {
		if (!canvas.applet._ready || Jmol._touching && ev.type.indexOf("touch") < 0)
			return false;
		var offsets = Jmol.$offset(canvas.id);
		var x, y;
		var oe = ev.originalEvent;
		ev.pageX || (ev.pageX = oe.pageX);
		ev.pageY || (ev.pageY = oe.pageY);
		Jmol._mousePageX = ev.pageX;
		Jmol._mousePageY = ev.pageY;
		if (oe.targetTouches && oe.targetTouches[0]) {
			x = oe.targetTouches[0].pageX - offsets.left;
			y = oe.targetTouches[0].pageY - offsets.top;
		} else if (oe.changedTouches) {
			x = oe.changedTouches[0].pageX - offsets.left;
			y = oe.changedTouches[0].pageY - offsets.top;
		} else {
			x = ev.pageX - offsets.left;
			y = ev.pageY - offsets.top;
		}
		return (x == undefined ? null : [Math.round(x), Math.round(y), Jmol._jsGetMouseModifiers(ev)]);
	}

  Jmol.setCursor = function(applet, c) {
    if (applet._isJava || applet._readingLocal)
      return;
    var curs;
    switch(c) {
    case 1: 
      curs = "crosshair";
      break;
    case 3: // wait
      curs = "wait";
      Jmol.$setVisible(Jmol.$(applet, "waitimage"), true);
      break;
    case 8: // zoom
      curs = "ns-resize"; 
      break;
    case 12: // hand
      curs = "grab"; 
      break;
    case 13: 
      curs = "move";
      break;
    default:
      Jmol.$setVisible(Jmol.$(applet, "waitimage"), false);
      curs = "default";
      break;
    }
    applet._canvas.style.cursor = curs;
  }
  
	Jmol._gestureUpdate = function(canvas, ev) {
		ev.stopPropagation();
		ev.preventDefault();
		var oe = ev.originalEvent;
		switch (ev.type) {
		case "touchstart":
			Jmol._touching = true;
			break;
		case "touchend":
			Jmol._touching = false;
			break;
		}
		if (!oe.touches || oe.touches.length != 2) return false;
		switch (ev.type) {
		case "touchstart":
			canvas._touches = [[],[]];
			break;
		case "touchmove":
			var offsets = Jmol.$offset(canvas.id);
			var t0 = canvas._touches[0];
			var t1 = canvas._touches[1];
			t0.push([oe.touches[0].pageX - offsets.left, oe.touches[0].pageY - offsets.top]);
			t1.push([oe.touches[1].pageX - offsets.left, oe.touches[1].pageY - offsets.top]);
			var n = t0.length;
			if (n > 3) {
				t0.shift();
				t1.shift();
			}
			if (n >= 2)
				canvas.applet._processGesture(canvas._touches);
			break;
		}
		return true;
	}

	Jmol._jsSetMouse = function(canvas) {

    var doIgnore = function(ev) { return (!ev.target || ("" + ev.target.className).indexOf("swingjs-ui") >= 0) };

		Jmol.$bind(canvas, 'mousedown touchstart', function(ev) {
      if (doIgnore(ev))
        return true;
      if (Jmol._allowKeyboardFocus)	
    	  canvas.focus();
			Jmol._setMouseOwner(canvas, true);
			ev.stopPropagation();
      var ui = ev.target["data-UI"];
      if (!ui || !ui.handleJSEvent(canvas, 501, ev)) 
  			ev.preventDefault();
			canvas.isDragging = true;
			if ((ev.type == "touchstart") && Jmol._gestureUpdate(canvas, ev))
				return !!ui;
			Jmol._setConsoleDiv(canvas.applet._console);
			var xym = Jmol._jsGetXY(canvas, ev);
			if(xym) {
		  	if (ev.button != 2)
          Jmol.Swing.hideMenus(canvas.applet);
        canvas.applet._processEvent(501, xym); //java.awt.Event.MOUSE_DOWN
      }
			return !!ui;
		});
    
		Jmol.$bind(canvas, 'mouseup touchend', function(ev) {
      if (doIgnore(ev))
        return true;
			Jmol._setMouseOwner(null);
			ev.stopPropagation();
      var ui = ev.target["data-UI"];
      if (!ui || !ui.handleJSEvent(canvas, 502, ev))
  			ev.preventDefault();
			canvas.isDragging = false;
			if (ev.type == "touchend" && Jmol._gestureUpdate(canvas, ev))
				return !!ui;
			var xym = Jmol._jsGetXY(canvas, ev);
			if(xym)
  			canvas.applet._processEvent(502, xym);//java.awt.Event.MOUSE_UP
			return !!ui;
		});
    
		Jmol.$bind(canvas, 'mousemove touchmove', function(ev) { // touchmove
      if (doIgnore(ev))
        return true;
      if (Jmol._allowKeyboardFocus)	
    	  canvas.focus(); //in Chrome and Edge, this forces a jump 
			if (Jmol._mouseOwner && Jmol._mouseOwner != canvas && Jmol._mouseOwner.isDragging) {
        if (!Jmol._mouseOwner.mouseMove)
          return true;
	   			Jmol._mouseOwner.mouseMove(ev);
				return false;
			}
			return Jmol._drag(canvas, ev);
		});
		

		Jmol.$bind(canvas, 'keydown keyup', function(ev) {
      if (doIgnore(ev))
        return true;
			ev.stopPropagation();
  			ev.preventDefault();
			var xym = Jmol._jsGetXY(canvas, ev);
			var type = (ev.type == "keydown" ? 401 : 402);
  			canvas.applet._processKeyEvent && canvas.applet._processKeyEvent(type, xym, ev);//java.awt.Event.
			return true;
		});

		Jmol._drag = function(canvas, ev) {
      
			ev.stopPropagation();
			ev.preventDefault();
      
			var isTouch = (ev.type == "touchmove");
			if (isTouch && Jmol._gestureUpdate(canvas, ev))
				return false;
			var xym = Jmol._jsGetXY(canvas, ev);
			if(!xym) return false;
      
			if (!canvas.isDragging)
				xym[2] = 0;

      var ui = ev.target["data-UI"];
      if (canvas.isdragging && (!ui || !ui.handleJSEvent(canvas, 506, ev))) {}
			canvas.applet._processEvent((canvas.isDragging ? 506 : 503), xym); // java.awt.Event.MOUSE_DRAG : java.awt.Event.MOUSE_MOVE
			return !!ui;
}
		
		Jmol.$bind(canvas, 'DOMMouseScroll mousewheel', function(ev) { // Zoom
      if (doIgnore(ev))
        return true;
			ev.stopPropagation();
			ev.preventDefault();
			canvas.isDragging = false;
			var oe = ev.originalEvent;
			var scroll = (oe.detail ? oe.detail : (Jmol.featureDetection.os == "mac" ? 1 : -1) * oe.wheelDelta); // Mac and PC are reverse; but 
			var modifiers = Jmol._jsGetMouseModifiers(ev);
			canvas.applet._processEvent(507,[scroll < 0 ? -1 : 1,0,modifiers]);
			return false;
		});


		Jmol.$bind(canvas, "contextmenu", function() {return false;});

		Jmol.$bind(canvas, 'mouseout', function(ev) {
      if (doIgnore(ev))
        return true;
      if (Jmol._mouseOwner && !Jmol._mouseOwner.mouseMove && !Jmol._mouseOwner.isDragging) 
        Jmol._setMouseOwner(null);
			if (canvas.applet._appletPanel)
				canvas.applet._appletPanel.startHoverWatcher(false);
			var xym = Jmol._jsGetXY(canvas, ev);
			if (!xym)
				return false;
			return false;
		});

		Jmol.$bind(canvas, 'mouseenter', function(ev) {
      if (doIgnore(ev))
        return true;
			if (canvas.applet._appletPanel)
				canvas.applet._appletPanel.startHoverWatcher(true);
			if (ev.buttons === 0 || ev.which === 0) {
				canvas.isDragging = false;
				var xym = Jmol._jsGetXY(canvas, ev);
				if (!xym)
					return false;
				canvas.applet._processEvent(504, xym);//J.api.Event.MOUSE_ENTERED	
				canvas.applet._processEvent(502, xym);//J.api.Event.MOUSE_UP
				return false;
			}
		});

	Jmol.$bind(canvas, 'mousemoveoutjsmol', function(evspecial, target, ev) {
      if (doIgnore(ev))
        return true;
		if (canvas == Jmol._mouseOwner && canvas.isDragging) {
			return Jmol._drag(canvas, ev);
		}
	});

		if (canvas.applet._is2D)
			Jmol.$resize(function() {
				if (!canvas.applet)
					return;
				canvas.applet._resize();
			});
 
		Jmol.$bind('body', 'mouseup touchend', function(ev) {
      if (doIgnore(ev))
        return true;
			if (canvas.applet)
				canvas.isDragging = false;
			Jmol._setMouseOwner(null);
		});

	}

	Jmol._jsUnsetMouse = function(canvas) {
		canvas.applet = null;
		Jmol.$bind(canvas, 'mousedown touchstart mousemove touchmove mouseup touchend DOMMouseScroll mousewheel contextmenu mouseout mouseenter', null);
		Jmol._setMouseOwner(null);
	}



Jmol.Swing = {
	count:0,
	menuInitialized:0,
	menuCounter:0,
	htDialogs:{}
};

(function(Swing) {

SwingController = Swing;

Swing.setDraggable = function(Obj) {
	
	var proto = Obj.prototype;
	if (proto.setContainer)
		return;
	
	proto.setContainer = function(container) {
		this.container = container;
		container.obj = this;
		this.isDragging = false;
		this.ignoreMouse = false;
		var me = this;
		container.bind('mousedown touchstart', function(ev) {
			if (me.ignoreMouse) {
				me.ignoreMouse = false;
				return true;
			}
			Jmol._setMouseOwner(me, true);
			me.isDragging = true;
			me.pageX = ev.pageX;
			me.pageY = ev.pageY;
			return false;
		});
		container.bind('mousemove touchmove', function(ev) {
			if (me.isDragging && Jmol._mouseOwner == me) {
				me.mouseMove(ev);
				return false;
			}
		});
		container.bind('mouseup touchend', function(ev) {
			me.mouseUp(ev);
			Jmol._setMouseOwner(null);
		});
	};

	proto.mouseUp = function(ev) {
		if (this.isDragging && Jmol._mouseOwner == this) {
			this.pageX0 += (ev.pageX - this.pageX);
			this.pageY0 += (ev.pageY - this.pageY);
			this.isDragging = false;
			return false;
		}
		Jmol._setMouseOwner(null);
	}

	proto.setPosition = function() {
		if (Jmol._mousePageX === null) {
			var id = this.applet._id + "_" + (this.applet._is2D ? "canvas2d" : "canvas");
			var offsets = Jmol.$offset(id);
			Jmol._mousePageX = offsets.left;
			Jmol._mousePageY = offsets.top;
		}
		this.pageX0 = Jmol._mousePageX;
		this.pageY0 = Jmol._mousePageY;
		var pos = { top: Jmol._mousePageY + 'px', left: Jmol._mousePageX + 'px' };
		this.container.css(pos);
	};

	proto.mouseMove = function(ev) {
		if (this.isDragging && Jmol._mouseOwner == this) {
			this.timestamp = System.currentTimeMillis(); // used for menu closure
			var x = this.pageX0 + (ev.pageX - this.pageX);
			var y = this.pageY0 + (ev.pageY - this.pageY);
      Jmol._mousePageX = x;
      Jmol._mousePageY = y;
			this.container.css({ top: y + 'px', left: x + 'px' })
		}
	};

	proto.dragBind = function(isBind) {
		this.applet._ignoreMouse = !isBind;
		this.container.unbind('mousemoveoutjsmol');
		this.container.unbind('touchmoveoutjsmol');
		this.container.unbind('mouseupoutjsmol');
		this.container.unbind('touchendoutjsmol');
		Jmol._setMouseOwner(null);
		if (isBind) {
			var me = this;
			this.container.bind('mousemoveoutjsmol touchmoveoutjsmol', function(evspecial, target, ev) {
				me.mouseMove(ev);
			});
			this.container.bind('mouseupoutjsmol touchendoutjsmol', function(evspecial, target, ev) {
				me.mouseUp(ev);
			});
		}
	};
}


Swing.JSDialog = function () {
}

Swing.setDraggable(Swing.JSDialog);


Swing.getScreenDimensions = function(d) {
	d.width = $(window).width();
	d.height = $(window).height();
}

Swing.dispose = function(dialog) {
	Jmol.$remove(dialog.id + "_mover");
	delete Swing.htDialogs[dialog.id]
	dialog.container.obj.dragBind(false);
}
 
Swing.register = function(dialog, type) {
	dialog.id = type + (++Swing.count);
	Swing.htDialogs[dialog.id] = dialog;

}

Swing.setDialog = function(dialog) {
	Jmol._setMouseOwner(null);
	Jmol.$remove(dialog.id);
	var id = dialog.id + "_mover";
	var container = Jmol._$(id);
	var jd;
	if (container[0]) {
		container.html(dialog.html);
		jd = container[0].jd;
	} else {
		Jmol.$after("body","<div id='" + id + "' style='position:absolute;left:0px;top:0px;'>" + dialog.html + "</div>");
		var jd = new Swing.JSDialog();
		container = Jmol._$(id);
		dialog.container = container;
		jd.applet = dialog.manager.vwr.html5Applet;
		jd.setContainer(container);
		jd.dialog = dialog;
		jd.setPosition();  
		jd.dragBind(true);
		container[0].jd = jd; 
	}
	Jmol.$bind("#" + dialog.id + " .JButton", "mousedown touchstart", function(event) { jd.ignoreMouse=true });
	Jmol.$bind("#" + dialog.id + " .JComboBox", "mousedown touchstart", function(event) { jd.ignoreMouse=true });
	Jmol.$bind("#" + dialog.id + " .JCheckBox", "mousedown touchstart", function(event) { jd.ignoreMouse=true });
	Jmol.$bind("#" + dialog.id + " .JTextField", "mousedown touchstart", function(event) { jd.ignoreMouse=true });
	Jmol.$bind("#" + dialog.id + " .JTable", "mousedown touchstart", function(event) { jd.ignoreMouse=true });
	Jmol.$bind("#" + dialog.id + " .JScrollPane", "mousedown touchstart", function(event) { jd.ignoreMouse=true });
	Jmol.$bind("#" + dialog.id + " .JEditorPane", "mousedown touchstart", function(event) { jd.ignoreMouse=true });

}
 
Swing.setSelected = function(chk) {
 Jmol.$prop(chk.id, 'checked', !!chk.selected);
}

Swing.setSelectedIndex = function(cmb) {
 Jmol.$prop(cmb.id, 'selectedIndex', cmb.selectedIndex);
}

Swing.setText = function(btn) {
 Jmol.$prop(btn.id, 'value', btn.text);
}

Swing.setVisible = function(c) {
	Jmol.$setVisible(c.id, c._visible);
}

Swing.setEnabled = function(c) {
	Jmol.$setEnabled(c.id, c.enabled);
}

 
Swing.click = function(element, keyEvent) {
	var component = Swing.htDialogs[element.id];
	if (component) {
		var info = component.toString();
		if (info.indexOf("JCheck") >= 0) {
				component.selected = element.checked;
		} else if (info.indexOf("JCombo") >= 0) {
			component.selectedIndex = element.selectedIndex;
		} else if (component.text != null) {  // JButton, JTextField
			component.text = element.value;
			if (keyEvent && ((keyEvent.charCode || keyEvent.keyCode) != 13))
				return;
		}    
	}
	var dialog = Swing.htDialogs[Jmol.$getAncestorDiv(element.id, "JDialog").id];
	var key = (component ? component.name :  dialog.registryKey + "/" + element.id);
	dialog.manager.actionPerformed(key);
}

Swing.setFront = function(dialog) {
  var applet = dialog.manager.vwr.html5Applet;
	if (dialog.zIndex != Jmol._getZ(applet, "dialog"))
	 dialog.zIndex = Jmol._incrZ(applet, "dialog");
	dialog.container && ((dialog.container[0] || dialog.container).style.zIndex = dialog.zIndex);
}

Swing.hideMenus = function(applet) {
	var menus = applet._menus;
	if (menus)
		for (var i in menus)
			if (menus[i]._visible)
				Swing.hideMenu(menus[i]);
}

Swing.windowClosing = function(element) {
	var dialog = Swing.htDialogs[Jmol.$getAncestorDiv(element.id, "JDialog").id];
	if (dialog.registryKey) {
		dialog.manager.processWindowClosing(dialog.registryKey);
	} else {
		dialog.dispose();
	}
}

})(Jmol.Swing);

Jmol._track = function(applet) {
	if (Jmol._tracker){
		try {  
			var url = Jmol._tracker + "&applet=" + applet._jmolType + "&version=" + Jmol._version 
				+ "&appver=" + Jmol.___JmolVersion + "&url=" + encodeURIComponent(document.location.href);
			var s = '<iframe style="display:none" width="0" height="0" frameborder="0" tabindex="-1" src="' + url + '"></iframe>'
			Jmol.$after("body", s);
		} catch (e) {
		}
		delete Jmol._tracker;
	}
	return applet;
}

var __profiling;

Jmol.getProfile = function(doProfile) {
  if (!self.Clazz || !self.JSON)
    return;
  if (!__profiling)
    Clazz._startProfiling(__profiling = (arguments.length == 0 || doProfile));
	return Clazz.getProfile();
}

Jmol._getInChIKey = function(applet, data) {
	if (data.indexOf("MOL=") >= 0)
		data = data.split("MOL=")[1].split("\"")[0];

}

Jmol._getAttr = function(s, a) {
	var pt = s.indexOf(a + "=");
	return (pt >= 0 && (pt = s.indexOf('"', pt)) >= 0 
		? s.substring(pt+1, s.indexOf('"', pt+1)) : null);
}

Jmol.User = {
	viewUpdatedCallback: null
}

Jmol.View = {


	count: 0,
	applets: {},
	sets: {}
};

(function(View) {


View.resetView = function(applet, appletNot) {
  debugger;
  if (appletNot) {
  	if (!appletNot._viewSet)
  		return;
    var set = Jmol.View.applets[appletNot._viewSet]
    for (var applet in set) {
      if (applet == appletNot)
        continue;
      Jmol.View.resetView(applet);
    }
    return;
  }
  if (applet) {
  	applet._reset();
    Jmol.View.updateView(applet);
  }
}

View.updateView = function(applet, Info, _View_updateView) {
	if (applet._viewSet == null)
		return;
  Info || (Info = {});
	Info.chemID || (applet._searchQuery = null);
	Info.data || (Info.data = "N/A");
	Info.type = applet._viewType;
	if((applet._currentView = View.__findView(applet._viewSet, Info)) == null)
		applet._currentView = View.__createViewSet(applet._viewSet, Info.chemID, Info.viewID || Info.chemID);
	applet._currentView[Info.type].data = Info.data;
	applet._currentView[Info.type].smiles = applet._getSmiles();
	if (Jmol.User.viewUpdatedCallback)
		Jmol.User.viewUpdatedCallback(applet, "updateView");
	View.__setView(applet._currentView, applet, false);
}

View.updateFromSync = function(applet, msg) {
	applet._updateMsg = msg;
	var id = Jmol._getAttr(msg, "sourceID") || Jmol._getAttr(msg, "file");
	if (!id)
		return;
	var view = View.__findView(applet._viewSet, {viewID:id});
	if (view == null)
		return Jmol.updateView(applet, msg); // JSV has been updated internally
	if (view != applet._currentView)
		View.__setView(view, applet, true);
	var A = ((id = Jmol._getAttr(msg, "atoms")) && msg.indexOf("selectionhalos ON") >= 0  
		? eval("[" + id + "]") : []);
	setTimeout(function(){if (applet._currentView == view)View.updateAtomPick(applet, A)}, 10);
	if (Jmol.User.viewUpdatedCallback)
		Jmol.User.viewUpdatedCallback(applet, "updateFromSync");
}

View.updateAtomPick = function(applet, A, _View_updateAtomPick) {
	var view = applet._currentView;
	if (view == null)
		return;
	for (var viewType in view) {
		if (viewType != "info" && view[viewType].applet != applet)
			view[viewType].applet._updateAtomPick(A);
	}
	if (Jmol.User.viewUpdatedCallback)
		Jmol.User.viewUpdatedCallback(applet, "updateAtomPick");
}

View.dumpViews = function(setID) {
	var views = View.sets[setID];
	if (!views)
	  return;
	var s = "View set " + setID + ":\n";
	var applets = View.applets[setID];
	for (var i in applets)
		s += "\napplet " + applets[i]._id
			+ " currentView=" + (applets[i]._currentView ? applets[i]._currentView.info.viewID : null);
	for (var i = views.length; --i >= 0;) {
		var view = views[i];
		s += "\n\n<b>view=" + i 
			+ " viewID=" + view.info.viewID 
			+ " chemID=" + view.info.chemID + "</b>\n"
		var v;
		for (var viewType in view) 
			if (viewType != "info")
				s += "\nview=" + i + " type=" + viewType + " applet=" 
					+ ((v = view[viewType]).applet ? v.applet._id : null) 
					+ " SMILES=" + v.smiles + "\n"
					+ " atomMap=" + JSON.stringify(v.atomMap) + "\n"
					+ " data=\n" + v.data + "\n"
	}
	return s
}



View.__init = function(applet) {
  var set = applet._viewSet;
	var a = View.applets;
	a[set] || (a[set] = {});
	a[set][applet._viewType] = applet;
}

View.__findView = function(set, Info) {
	var views = View.sets[set];
	if (views == null)
		views = View.sets[set] = [];
	for (var i = views.length; --i >= 0;) {
		var view = views[i];
		if (Info.viewID) {
			if (view.info.viewID == Info.viewID)
				return view;
		} else if (Info.chemID != null && Info.chemID == view.info.chemID) {
				return view;
		} else {
			for (var viewType in view) { 
				if (viewType != "info") {
					if (Info.data != null && view[viewType].data != null ? Info.data == view[viewType].data 
						: Info.type == viewType)
							return view;
				}
			}
		}
	}
	return null;  
}

View.__createViewSet = function(set, chemID, viewID, _createViewSet) {
	View.count++;
	var view = {info:{chemID: chemID, viewID: viewID || "model_" + View.count}};

	for (var id in Jmol._applets) {
		var a = Jmol._applets[id];
		if (a._viewSet == set)
			view[a._viewType] = {applet:a, data: null};
	}
	View.sets[set].push(view);
	return view;
}

View.__setView = function(view, applet, isSwitch, _setView) {

	for (var viewType in view) {
			if (viewType == "info") 
				continue;
		var rec = view[viewType];
		var a = rec.applet;
		var modified = (isSwitch || a != null && a._molData == "<modified>");

		if (a == null || a == applet && !modified)
			continue; // may be a mol3d required by JSV but not having a corresponding applet
		var wasNull = (rec.data == null);
		var haveView = (a._currentView != null);
		a._currentView = view; 
		if (haveView && view[viewType].data == rec.data && !wasNull & !modified)
			continue;
		a._loadModelFromView(view);
		if (wasNull)
			break;
	}

}

}) (Jmol.View);

Jmol.Cache = {fileCache: {}};

Jmol.Cache.get = function(filename) {
	return Jmol.Cache.fileCache[filename];
}

Jmol.Cache.put = function(filename, data) {
  Jmol.Cache.fileCache[filename] = data;
}

	Jmol.Cache.setDragDrop = function(me, divname) {
		Jmol.$appEvent(me, divname, "dragover", function(e) {
			e = e.originalEvent;
			e.stopPropagation();
			e.preventDefault();
			e.dataTransfer.dropEffect = 'copy';
		});
		Jmol.$appEvent(me, divname, "drop", function(e) {
			var oe = e.originalEvent;
			oe.stopPropagation();
			oe.preventDefault();
			var file = oe.dataTransfer.files[0];
			if (file == null) {
				try {
				  file = "" + oe.dataTransfer.getData("text");
				  if (file.indexOf("file:/") == 0 || file.indexOf("http:/") == 0 || file.indexOf("https:/") == 0) {
				  	me._scriptLoad(file);
				  	return;
			  	}
				} catch(e) {
				  return;
				}
			  return;
			}
			var reader = new FileReader();
			reader.onloadend = function(evt) {
				if (evt.target.readyState == FileReader.DONE) {
					var cacheName = "cache://DROP_" + file.name;
					var bytes = Clazz.newByteArray(-1, evt.target.result);
					if (divname == "console_input") {
						var s = String.instantialize(bytes);
						Jmol.$(me,divname).val(s.indexOf('\0') < 0 ? s : bytes.length + " bytes");
						return;
					}
					if (!cacheName.endsWith(".spt"))
						me._appletPanel.cacheFileByName("cache://DROP_*",false);
					if (me._viewType == "JSV" || cacheName.endsWith(".jdx")) // shared by Jmol and JSV
						Jmol.Cache.put(cacheName, bytes);
					else
						me._appletPanel.cachePut(cacheName, bytes);
					var xym = Jmol._jsGetXY(me._canvas, e);
					var retType = [null];
					if(xym && (!me._appletPanel.setStatusDragDropped || me._appletPanel.setStatusDragDropped(0, xym[0], xym[1], cacheName, retType))) {
						me._appletPanel.openFileAsyncSpecialType(cacheName, 1, retType[0]);
					}
				}
			};
			reader.readAsArrayBuffer(file);
		});
	}
  
})(Jmol, jQuery);
Jmol._debugCode = (document && document.location && document.location.href.indexOf("j2sdebugcode") >=0);





;(function (Jmol) {

	Jmol._isAsync = false; // testing only
	Jmol._asyncCallbacks = {};
	
	Jmol._coreFiles = []; // required for package.js




  var __clazzLoaded = false;
	var __execLog = [];
	var __execStack = [];
	var __execTimer = 0;
	var __coreSet = [];
	var __coreMore = [];
	var __execDelayMS = 100; // must be > 55 ms for FF

	var __nextExecution = function(trigger) {
    arguments.length || (trigger = true);
		delete __execTimer;
		var es = __execStack;
		var e;
		while (es.length > 0 && (e = es[0])[4] == "done")
			es.shift();
		if (es.length == 0)
			return;
		if (!Jmol._isAsync && !trigger) {
			setTimeout(__nextExecution,10)
			return;
		}
		e.push("done");
		var s = "JSmol exec " + e[0]._id + " " + e[3] + " " + e[2];
		if (self.System)
			System.out.println(s);
		if (self.console)console.log(s + " -- OK")
		__execLog.push(s);
		e[1](e[0],e[2]);	
	};

	var __loadClazz = function(applet) {
		if (!__clazzLoaded) {
			__clazzLoaded = true;
			LoadClazz();
			if (applet._noMonitor)
				Clazz._LoaderProgressMonitor.showStatus = function() {}
			LoadClazz = null;
      if (applet.__Info.uncompressed)
        Clazz.loadClass(); // for now; allows for no compression 
			Clazz._Loader.onGlobalLoaded = function (file) {
				Clazz._LoaderProgressMonitor.showStatus("Application loaded.", true);
				if (!Jmol._debugCode || !Jmol.haveCore) {
					Jmol.haveCore = true;
					__nextExecution();
				}
			};
			Clazz._Loader.loadPackageClasspath("java", null, true, __nextExecution);
			return;
		}
		__nextExecution();
	};

	var __loadClass = function(applet, javaClass) {
		Clazz._Loader.loadClass(javaClass, function() {__nextExecution()});
	};

	Jmol.showExecLog = function() { return __execLog.join("\n") }; 

	Jmol._addExec = function(e) {
    e[1] || (e[1] = __loadClass);
		var s = "JSmol load " + e[0]._id + " " + e[3];
		if (self.console)console.log(s + "...")
		__execLog.push(s);   
		__execStack.push(e);
	}

	Jmol._addCoreFile = function(type, path, more) {
  
     
    type = type.toLowerCase().split(".")[0]; // package name only 

		if (__coreSet.join("").indexOf(type) >= 0) return;
    
    
		__coreSet.push(type);
		__coreSet.sort();
		Jmol._coreFiles = [path + "/core/core" + __coreSet.join("") + ".z.js" ];
		if (more && (more = more.split(" ")))
			for (var i = 0; i < more.length; i++)
				if (__coreMore.join("").indexOf(more[i]) < 0)
					__coreMore.push(path + "/core/core" + more[i] + ".z.js")
		for (var i = 0; i < __coreMore.length; i++)
			Jmol._coreFiles.push(__coreMore[i]);
	}      		

	Jmol._Canvas2D = function(id, Info, type, checkOnly){
		this._uniqueId = ("" + Math.random()).substring(3);
		this._id = id;
		this._is2D = true;
		this._isJava = false;
		this._jmolType = "Jmol._Canvas2D (" + type + ")";
    this._isLayered = Info._isLayered || false;
    this._isSwing = Info._isSwing || false;
    this._isJSV = Info._isJSV || false;
    this._isAstex = Info._isAstex || false;            
    this._platform = Info._platform || "";
		if (checkOnly)
			return this;
		window[id] = this;
		this._createCanvas(id, Info);
		if (!Jmol._document || this._deferApplet)
			return this;
		this._init();
		return this;
	};

	Jmol._setAppletParams = function(availableParams, params, Info, isHashtable) {
		for (var i in Info)
			if(!availableParams || availableParams.indexOf(";" + i.toLowerCase() + ";") >= 0){
				if (Info[i] == null || i == "language" && !Jmol.featureDetection.supportsLocalization())
					continue;
				if (isHashtable)
					params.put(i, (Info[i] === true ? Boolean.TRUE: Info[i] === false ? Boolean.FALSE : Info[i]))
				else
					params[i] = Info[i];
			}
	}     
	 
	Jmol._jsSetPrototype = function(proto) {
		proto._init = function() {
	 		this._setupJS();
			this._showInfo(true); 
			if (this._disableInitialConsole)
				this._showInfo(false);
		};

		proto._createCanvas = function(id, Info, glmol) {
			Jmol._setObject(this, id, Info);
			if (glmol) {
				this._GLmol = glmol;
		 		this._GLmol.applet = this;
				this._GLmol.id = this._id;
			}      
			var t = Jmol._getWrapper(this, true);
			if (this._deferApplet) {
			} else if (Jmol._document) {
				Jmol._documentWrite(t);
				this._newCanvas(false);				        
				t = "";
			} else {
				this._deferApplet = true;
				t += '<img width=0 height=0 src=. onerror=' + id + '._cover(false) >';
			}
			t += Jmol._getWrapper(this, false);
			if (Info.addSelectionOptions)
				t += Jmol._getGrabberOptions(this);
			if (Jmol._debugAlert && !Jmol._document)
				alert(t);
			this._code = Jmol._documentWrite(t);
		};

		proto._newCanvas = function(doReplace) {
			if (this._is2D)
				this._createCanvas2d(doReplace);
			else
				this._GLmol.create();
		};

    proto._getHtml5Canvas = function() { return this._canvas }; 
    proto._getWidth = function() { return this._canvas.width }; 
    proto._getHeight = function() { return this._canvas.height };
    proto._getContentLayer = function() { return Jmol.$(this, "contentLayer")[0] };
    proto._repaintNow = function() { Jmol.repaint(this, false) }; 


		proto._createCanvas2d = function(doReplace) {
			var container = Jmol.$(this, "appletdiv");
      
			try {
			container[0].removeChild(this._canvas);
			if (this._canvas.frontLayer)
				container[0].removeChild(this._canvas.frontLayer);
			if (this._canvas.rearLayer)
				container[0].removeChild(this._canvas.rearLayer);
			if (this._canvas.contentLayer)
				container[0].removeChild(this._canvas.contentLayer);
			Jmol._jsUnsetMouse(this._mouseInterface);
			} catch (e) {}
			var w = Math.round(container.width()) || 100;
			var h = Math.round(container.height()) || 100;
			var canvas = document.createElement( 'canvas' );
			canvas.tabIndex = 1;
			canvas.outline = "none";
			canvas.applet = this;
			
			this._canvas = canvas;
			canvas.style.width = "100%";
			canvas.style.height = "100%";
			canvas.width = w;
			canvas.height = h; // w and h used in setScreenDimension
			canvas.id = this._id + "_canvas2d";
			container.append(canvas);
			Jmol._$(canvas.id).css({"z-index":Jmol._getZ(this, "main")});
			if (this._isLayered){
				var img = document.createElement("div");
				canvas.contentLayer = img;
				img.id = this._id + "_contentLayer";
				container.append(img);
				Jmol._$(img.id).css({zIndex:Jmol._getZ(this, "image"),position:"absolute",left:"0px",top:"0px",
        width:(this._isSwing ? w : 0) + "px", height:(this._isSwing ? h : 0) +"px", overflow:"hidden"});
        if (this._isSwing) {
        	var d = document.createElement("div");
          d.id = this._id + "_swingdiv";
        	Jmol._$(this._id + "_appletinfotablediv").append(d);
				  Jmol._$(d.id).css({zIndex:Jmol._getZ(this, "rear"),position:"absolute",left:"0px",top:"0px", width:w +"px", height:h+"px", overflow:"hidden"});
  				this._mouseInterface = canvas.contentLayer;
          canvas.contentLayer.applet = this;
        } else {
  				this._mouseInterface = this._getLayer("front", container, w, h, false);
        }
			} else {
				this._mouseInterface = canvas;
			}
			Jmol._jsSetMouse(this._mouseInterface);
		}
    
    proto._getLayer = function(name, container, w, h, isOpaque) {
  		var c = document.createElement("canvas");
			this._canvas[name + "Layer"] = c;
			c.style.width = "100%";
			c.style.height = "100%";
			c.id = this._id + "_" + name + "Layer";
			c.width = w;
			c.height = h; // w and h used in setScreenDimension
			container.append(c);
			c.applet = this;
			Jmol._$(c.id).css({background:(isOpaque ? "rgb(0,0,0,1)" : "rgb(0,0,0,0.001)"), "z-index": Jmol._getZ(this,name),position:"absolute",left:"0px",top:"0px",overflow:"hidden"});
			return c;	
    }
    
    
		proto._setupJS = function() {
			window["j2s.lib"] = {
				base : this._j2sPath + "/",
				alias : ".",
				console : this._console,
				monitorZIndex : Jmol._getZ(this, "monitorZIndex")
			};
			var isFirst = (__execStack.length == 0);
			if (isFirst)
				Jmol._addExec([this, __loadClazz, null, "loadClazz"]);
      this._addCoreFiles();
			Jmol._addExec([this, this.__startAppletJS, null, "start applet"])
			this._isSigned = true; // access all files via URL hook
			this._ready = false; 
			this._applet = null;
			this._canScript = function(script) {return true;};
			this._savedOrientations = [];
			__execTimer && clearTimeout(__execTimer);
			__execTimer = setTimeout(__nextExecution, __execDelayMS);
		};

		proto.__startAppletJS = function(applet) {
			if (Jmol._version.indexOf("$Date: ") == 0)
				Jmol._version = (Jmol._version.substring(7) + " -").split(" -")[0] + " (JSmol/j2s)"
			var viewerOptions = Clazz._4Name("java.util.Hashtable").newInstance();
			Jmol._setAppletParams(applet._availableParams, viewerOptions, applet.__Info, Boolean.TRUE);
			viewerOptions.put("appletReadyCallback","Jmol._readyCallback");
			viewerOptions.put("applet", Boolean.TRUE);
			viewerOptions.put("name", applet._id);// + "_object");
			viewerOptions.put("syncId", Jmol._syncId);
			if (Jmol._isAsync)
				viewerOptions.put("async", Boolean.TRUE);
			if (applet._color) 
				viewerOptions.put("bgcolor", applet._color);
			if (applet._startupScript)
				viewerOptions.put("script", applet._startupScript)
			if (Jmol._syncedApplets.length)
				viewerOptions.put("synccallback", "Jmol._mySyncCallback");
			viewerOptions.put("signedApplet", "true");
			viewerOptions.put("platform", applet._platform);
			if (applet._is2D)
				viewerOptions.put("display",applet._id + "_canvas2d");

			viewerOptions.put("documentBase", document.location.href);
			var codePath = applet._j2sPath + "/";
      
			if (codePath.indexOf("://") < 0) {
				var base = document.location.href.split("#")[0].split("?")[0].split("/");
				if (codePath.indexOf("/") == 0)
					base = [base[0], codePath.substring(1)];
				else
					base[base.length - 1] = codePath;
				codePath = base.join("/");
			}
			applet._j2sFullPath = codePath.substring(0, codePath.length-1);
			viewerOptions.put("codePath", codePath);
			Jmol._registerApplet(applet._id, applet);
			try {
				applet._newApplet(viewerOptions);
			} catch (e) {
				var s = (Jmol._isAsync ? "normal async abort? from " : "") + e;
				if (Jmol._debugCode)
					alert(s);
				System.out.println(s);
				return;
			}
      
			applet._jsSetScreenDimensions();
			__nextExecution();
		};

    if (!proto._restoreState)
	   	proto._restoreState = function(clazzName, state) {
		  }
	
		proto._jsSetScreenDimensions = function() {
				if (!this._appletPanel)return
				var d = Jmol._getElement(this, (this._is2D ? "canvas2d" : "canvas"));
				this._appletPanel.setScreenDimension(d.width, d.height);
		};

		proto._show = function(tf) {
			Jmol.$setVisible(Jmol.$(this,"appletdiv"), tf);
			if (tf)
				Jmol.repaint(this, true);
		};

		proto._canScript = function(script) {return true};
		proto.equals = function(a) { return this == a };
		proto.clone = function() { return this };
		proto.hashCode = function() { return parseInt(this._uniqueId) };  


		proto._processGesture = function(touches) {
			return this._appletPanel.processTwoPointGesture(touches);
		}

		proto._processEvent = function(type, xym) {
			this._appletPanel.processMouseEvent(type,xym[0],xym[1],xym[2],System.currentTimeMillis());
		}

		proto._processKeyEvent = function(type, xym, ev) {
			this._appletPanel.processKeyEvent({ getID: function() { return type; },
							getKeyCode: function(){ return ev.keyCode; },
							getModifiers: function() { return xym[2]; },
							consume: function(){}});
		}
		
		proto._resize = function() {
			var s = "__resizeTimeout_" + this._id;
			if (Jmol[s])
				clearTimeout(Jmol[s]);
			var me = this;
			Jmol[s] = setTimeout(function() {Jmol.repaint(me, true);Jmol[s]=null}, 100);
		}

		return proto;
	};

	Jmol.repaint = function(applet, asNewThread) {

		if (!applet || !applet._appletPanel)return;

		var container = Jmol.$(applet, "appletdiv");
		var w = Math.round(container.width());
		var h = Math.round(container.height());
		if (applet._is2D && (applet._canvas.width != w || applet._canvas.height != h)) {
			applet._newCanvas(true);
			applet._appletPanel.setDisplay(applet._canvas);
		}
		applet._appletPanel.setScreenDimension(w, h);
    var f = function(){
      if (applet._appletPanel.paint)
        applet._appletPanel.paint(null);
      else
        applet._appletPanel.update(null)
    };
		if (asNewThread) {
			requestAnimationFrame(f); // requestAnimationFrame or (MSIE 9) setTimeout
		} else {
      f();
		}
	}

	Jmol.loadImage = function(platform, echoName, path, bytes, fOnload, image) {
		var id = "echo_" + echoName + path + (bytes ? "_" + bytes.length : "");
		var canvas = Jmol.getHiddenCanvas(platform.vwr.html5Applet, id, 0, 0, false, true);
    if (canvas == null) { 
  		if (image == null) {
  			image = new Image();
        if (bytes == null) {
          image.onload = function() {Jmol.loadImage(platform, echoName, path, null, fOnload, image)};
    			image.src = path;
          return null;
        }
        System.out.println("Jsmol.js Jmol.loadImage using data URI for " + id) 
        image.src = (typeof bytes == "string" ? bytes : 
          "data:" + JU.Rdr.guessMimeTypeForBytes(bytes) + ";base64," + JU.Base64.getBase64(bytes));
      }
  		var width = image.width;
  		var height = image.height;
      if (echoName == "webgl") {
       width /= 2;
       height /= 2; 
      } 
		  canvas = Jmol.getHiddenCanvas(platform.vwr.html5Applet, id, width, height, true, false);
  		canvas.imageWidth = width;
  		canvas.imageHeight = height;
  		canvas.id = id;
  		canvas.image=image;
  		Jmol.setCanvasImage(canvas, width, height);
    } else {
      System.out.println("Jsmol.js Jmol.loadImage reading cached image for " + id) 
    }
    return (bytes == null? fOnload(canvas,path) : canvas);
	};

Jmol._canvasCache = {};

	Jmol.getHiddenCanvas = function(applet, id, width, height, forceNew, checkOnly) {
		id = applet._id + "_" + id;
    var d = Jmol._canvasCache[id];
    if (checkOnly)
      return d; 
    if (forceNew || !d || d.width != width || d.height != height) {
      d = document.createElement( 'canvas' );
  		d.width = d.style.width = width;
  		d.height = d.style.height = height;
  		d.id = id;
      Jmol._canvasCache[id] = d;
    }
    
		return d;
   	}

	Jmol.setCanvasImage = function(canvas, width, height) {
		canvas.buf32 = null;
		canvas.width = width;
		canvas.height = height;
		canvas.getContext("2d").drawImage(canvas.image, 0, 0, canvas.image.width, canvas.image.height, 0, 0, width, height);
	};
  
  Jmol.applyFunc = function(f,a) {
    return f(a);
  }
  
})(Jmol);


;(function (Jmol, document) {


	Jmol._Applet = function(id, Info, checkOnly){
		window[id] = this;
		this._jmolType = "Jmol._Applet" + (Info.isSigned ? " (signed)" : "");
		this._viewType = "Jmol";
		this._isJava = true;
		this._syncKeyword = "Select:";
		this._availableParams = ";progressbar;progresscolor;boxbgcolor;boxfgcolor;allowjavascript;boxmessage;\
			;animframecallback;appletreadycallback;atommovedcallback;audiocallback;\
			;clickcallback;dragdropcallback;echocallback;errorcallback;evalcallback;hovercallback;\
			;imagecallback;loadstructcallback;measurecallback;messagecallback;minimizationcallback;modelkitcallback;pickcallback;\
			;resizecallback;scriptcallback;selectcallback;servicecallback;structuremodifiedcallback;synccallback;\
			;statusform;statustext;statustextarea;usecommandthread;syncid;appletid;startupscript;language;menufile;";
		if (checkOnly)
			return this;
		this._isSigned = Info.isSigned;
		this._readyFunction = Info.readyFunction;
		this._ready = false;
		this._isJava = true; 
		this._isInfoVisible = false;
		this._applet = null;
		this._memoryLimit = Info.memoryLimit || 512;
		this._canScript = function(script) {return true;};
		this._savedOrientations = [];
		this._initialize = function(jarPath, jarFile) {
			var doReport = false;
			Jmol._jarFile && (jarFile = Jmol._jarFile);
			if(this._jarFile) {
				var f = this._jarFile;
				if(f.indexOf("/") >= 0) {
					alert ("This web page URL is requesting that the applet used be " + f + ". This is a possible security risk, particularly if the applet is signed, because signed applets can read and write files on your local machine or network.");
					var ok = prompt("Do you want to use applet " + f + "? ", "yes or no")
					if(ok == "yes") {
						jarPath = f.substring(0, f.lastIndexOf("/"));
						jarFile = f.substring(f.lastIndexOf("/") + 1);
					} else {
						doReport = true;
					}
				} else {
					jarFile = f;
				}
				this_isSigned = Info.isSigned = (jarFile.indexOf("Signed") >= 0);
			}
 			this._jarPath = Info.jarPath = jarPath || ".";
			this._jarFile = Info.jarFile = (typeof(jarFile) == "string" ? jarFile : (jarFile ?  "JmolAppletSigned" : "JmolApplet") + "0.jar");
			if (doReport)
				alert ("The web page URL was ignored. Continuing using " + this._jarFile + ' in directory "' + this._jarPath + '"');
			Jmol.controls == undefined || Jmol.controls._onloadResetForms();		
		}		
		this._create(id, Info);
		return this;
	}

	;(function(Applet, proto) {
	Applet._get = function(id, Info, checkOnly) {


		checkOnly || (checkOnly = false);
		Info || (Info = {});
		var DefaultInfo = {
			color: "#FFFFFF", // applet object background color, as for older jmolSetBackgroundColor(s)
			width: 300,
			height: 300,
			addSelectionOptions: false,
			serverURL: "http://your.server.here/jsmol.php",
			defaultModel: "",
			script: null,
			src: null,
			readyFunction: null,
			use: "HTML5",//other options include JAVA, WEBGL, and IMAGE
			jarPath: "java",
			jarFile: "JmolApplet0.jar",
			isSigned: false,
			j2sPath: "j2s",
			coverImage: null,     // URL for image to display
      makeLiveImage: null,  // URL for small image to click to make live (defaults to j2s/img/play_make_live.jpg)
			coverTitle: "",       // tip that is displayed before model starts to load
			coverCommand: "",     // Jmol command executed upon clicking image
			deferApplet: false,   // true == the model should not be loaded until the image is clicked
			deferUncover: false,  // true == the image should remain until command execution is complete 
			disableJ2SLoadMonitor: false,
			disableInitialConsole: true, // new default since now we have the spinner 2/14/2016 12:26:28 PM
			debug: false
		};	 
		Jmol._addDefaultInfo(Info, DefaultInfo);
		Jmol._debugAlert = Info.debug;

		Info.serverURL && (Jmol._serverUrl = Info.serverURL);

		var javaAllowed = false;
		var applet = null;
		var List = Info.use.toUpperCase().split("#")[0].split(" ");
		for (var i = 0; i < List.length; i++) {
			switch (List[i]) {
			case "JAVA":
				javaAllowed = true;
				if (Jmol.featureDetection.supportsJava())
					applet = new Applet(id, Info, checkOnly);
				break;
			case "WEBGL":
				applet = Applet._getCanvas(id, Info, checkOnly, true);
				break;
			case "HTML5":               
  			if (Jmol.featureDetection.allowHTML5){
				  applet = Applet._getCanvas(id, Info, checkOnly, false);
        } else {
          List.push("JAVA");
        }
				break;
			}
			if (applet != null)
				break;		  
		}
		if (applet == null) {
			if (checkOnly || !javaAllowed)
				applet = {_jmolType : "none" };
			else if (javaAllowed)
 		  	applet = new Applet(id, Info);
		}

		return (checkOnly ? applet : Jmol._registerApplet(id, applet));  
	}

	Applet._getCanvas = function(id, Info, checkOnly, webGL) {
    Info._isLayered = false;
    Info._platform = "J.awtjs2d.Platform";
		if (webGL && Jmol.featureDetection.supportsWebGL()) {
			Jmol._Canvas3D.prototype = Jmol.GLmol.extendApplet(Jmol._jsSetPrototype(new Applet(id, Info, true)));
			return new Jmol._Canvas3D(id, Info, "Jmol", checkOnly);
		}
		if (!webGL) {
			Jmol._Canvas2D.prototype = Jmol._jsSetPrototype(new Applet(id, Info, true));
			return new Jmol._Canvas2D(id, Info, "Jmol", checkOnly);
		}
		return null;
	};


	Applet._noJavaMsg =
			"Either you do not have Java applets enabled in your web<br />browser or your browser is blocking this applet.<br />\
			Check the warning message from your browser and/or enable Java applets in<br />\
			your web browser preferences, or install the Java Runtime Environment from <a href='http://www.java.com'>www.java.com</a>";

	Applet._setCommonMethods = function(p) {
		p._showInfo = proto._showInfo;	
		p._search = proto._search;
		p._getName = proto._getName;
		p._readyCallback = proto._readyCallback;
	}

	Applet._createApplet = function(applet, Info, params) {
		applet._initialize(Info.jarPath, Info.jarFile);
		var jarFile = applet._jarFile;
		var jnlp = ""
		if (Jmol._isFile) {
			jarFile = jarFile.replace(/0\.jar/,".jar");
		}
		var w = (applet._containerWidth.indexOf("px") >= 0 ? applet._containerWidth : "100%");
		var h = (applet._containerHeight.indexOf("px") >= 0 ? applet._containerHeight : "100%");
		var widthAndHeight = " style=\"width:" + w + ";height:" + h + "\" ";
		var attributes = "name='" + applet._id + "_object' id='" + applet._id + "_object' " + "\n"
				+ widthAndHeight + jnlp + "\n"
		params.codebase = applet._jarPath;
		params.codePath = params.codebase + "/";
		if (params.codePath.indexOf("://") < 0) {
			var base = document.location.href.split("#")[0].split("?")[0].split("/");
			base[base.length - 1] = params.codePath;
			params.codePath = base.join("/");
		}
		params.archive = jarFile;
		params.mayscript = 'true';
		params.java_arguments = "-Xmx" + Math.round(Info.memoryLimit || applet._memoryLimit) + "m";
		params.permissions = (applet._isSigned ? "all-permissions" : "sandbox");
		params.documentLocation = document.location.href;
		params.documentBase = document.location.href.split("#")[0].split("?")[0];

		params.jarPath = Info.jarPath;
		Jmol._syncedApplets.length && (params.synccallback = "Jmol._mySyncCallback");
		applet._startupScript && (params.script = applet._startupScript);
		var t = "\n"; 
 		for (var i in params)
			if(params[i])
		 		t += "  <param name='"+i+"' value='"+params[i]+"' />\n";
		if (Jmol.featureDetection.useIEObject || Jmol.featureDetection.useHtml4Object) {
			t = "<object " + attributes
				+ (Jmol.featureDetection.useIEObject ? 
					 " classid='clsid:8AD9C840-044E-11D1-B3E9-00805F499D93' codebase='http://java.sun.com/update/1.6.0/jinstall-6u22-windows-i586.cab'>"
				 : " type='application/x-java-applet'>")
				 + t + "<p style='background-color:yellow;" + widthAndHeight.split('"')[1] 
				+ ";text-align:center;vertical-align:middle;'>\n" + Applet._noJavaMsg + "</p></object>\n";
		} else { // use applet tag
			t = "<applet " + attributes
				+ " code='" + params.code + "' codebase='" + applet._jarPath + "' archive='" + jarFile + "' mayscript='true'>\n"
				+ t + "<table bgcolor='yellow'><tr><td align='center' valign='middle' " + widthAndHeight + ">\n"
				+ Applet._noJavaMsg + "</td></tr></table></applet>\n";
		}
		if (applet._deferApplet)
			applet._javaCode = t, t="";
		t = Jmol._getWrapper(applet, true) + t + Jmol._getWrapper(applet, false) 
			+ (Info.addSelectionOptions ? Jmol._getGrabberOptions(applet) : "");
		if (Jmol._debugAlert)
			alert (t);
		applet._code = Jmol._documentWrite(t);
	}

	proto._newApplet = function(viewerOptions) {
		if (!this._is2D)  
			viewerOptions.put("script", (viewerOptions.get("script") || "") + ";set multipleBondSpacing 0.35;");
		this._viewerOptions = viewerOptions;
		return new J.appletjs.Jmol(viewerOptions);
	}
	
	proto._addCoreFiles = function() {
		Jmol._addCoreFile("jmol" + (Jmol._debugCode ? "debug" : ""), this._j2sPath, this.__Info.preloadCore);
		if (Jmol._debugCode) {
			Jmol._addCoreFile("jmoldebug", this._j2sPath, this.__Info.preloadCore);
		}
		if (!this._is2D) {
	 		Jmol._addExec([this, null, "J.export.JSExporter","load JSExporter"])
		}
		if (Jmol._debugCode) {
			Jmol._addExec([this, null, "J.appletjs.Jmol", "load Jmol"]);
		}
  }
  
	proto._create = function(id, Info){
		Jmol._setObject(this, id, Info);
		var params = {
			syncId: Jmol._syncId,
			progressbar: "true",                      
			progresscolor: "blue",
			boxbgcolor: this._color || "black",
			boxfgcolor: "white",
			boxmessage: "Downloading JmolApplet ...",
			script: (this._color ? "background \"" + this._color +"\"": ""),
			code: "JmolApplet.class"
		};

		Jmol._setAppletParams(this._availableParams, params, Info);
		function sterilizeInline(model) {
			model = model.replace(/\r|\n|\r\n/g, (model.indexOf("|") >= 0 ? "\\/n" : "|")).replace(/'/g, "&#39;");
			if(Jmol._debugAlert)
				alert ("inline model:\n" + model);
			return model;
		}

		params.loadInline = (Info.inlineModel ? sterilizeInline(Info.inlineModel) : "");
		params.appletReadyCallback = "Jmol._readyCallback";
		if (Jmol._syncedApplets.length)
			params.synccallback = "Jmol._mySyncCallback";
		params.java_arguments = "-Xmx" + Math.round(Info.memoryLimit || this._memoryLimit) + "m";

		this._initialize(Info.jarPath, Info.jarFile);
		Applet._createApplet(this, Info, params);
	}

	proto._restoreState = function(clazzName, state) {
		System.out.println("\n\nasynchronous restore state for " + clazzName + " " + state)
		var applet = this;
		var vwr = applet._applet && applet._applet.viewer;
		switch (state) {
		case "setOptions":
			return function(_setOptions) {applet.__startAppletJS(applet)};
		case "render":
			return function() {setTimeout(function(){vwr.refresh(2)},10)};
		default:
			switch (clazzName) {
			case "J.shape.Balls":
			case "J.shape.Sticks":
			case "J.shape.Frank":
				return null;
			}
			
			if (vwr && vwr.isScriptExecuting && vwr.isScriptExecuting()) {
				if (Jmol._asyncCallbacks[clazzName]) {
					System.out.println("...ignored");
					return 1;
				}
				var sc = vwr.getEvalContextAndHoldQueue(vwr.eval);
				var pc = sc.pc - 1;
				sc.asyncID = clazzName;
				Jmol._asyncCallbacks[clazzName] = function(pc) {sc.pc=pc; System.out.println("sc.asyncID="+sc.asyncID+" sc.pc = " + sc.pc);vwr.eval.resumeEval(sc)};
				vwr.eval.pc = vwr.eval.pcEnd;
				System.out.println("setting resume for pc=" + sc.pc + " " + clazzName + " to " + Jmol._asyncCallbacks[clazzName] + "//" )
				return function() {System.out.println("resuming " + clazzName + " " + Jmol._asyncCallbacks[clazzName]);Jmol._asyncCallbacks[clazzName](pc)};					
			}
			System.out.println(clazzName + "?????????????????????" + state)
			return function() {setTimeout(function(){vwr.refresh(2)},10)};
		}
	}

  proto._notifyAudioEnded = function(htParams) {
    this._applet.notifyAudioEnded(htParams);
  }
  
	proto._readyCallback = function(id, fullid, isReady) {
		if (!isReady)
			return; // ignore -- page is closing
		Jmol._setDestroy(this);
		this._ready = true;
		var script = this._readyScript;
		if (this._defaultModel)
			Jmol._search(this, this._defaultModel, (script ? ";" + script : ""));
		else if (script)
			this._script(script);
		else if (this._src)
			this._script('load "' + this._src + '"');
		this._showInfo(true);
		this._showInfo(false);
		Jmol.Cache.setDragDrop(this, "appletdiv");
		this._readyFunction && this._readyFunction(this);
		Jmol._setReady(this);
		var app = this._2dapplet;
		if (app && app._isEmbedded && app._ready && app.__Info.visible) {
      var me = this;
			me._show2d(true);me._show2d(false);me._show2d(true);
    }
    Jmol._hideLoadingSpinner(this);
	}

	proto._showInfo = function(tf) {
		if(tf && this._2dapplet)
			this._2dapplet._show(false);
		Jmol.$html(Jmol.$(this, "infoheaderspan"), this._infoHeader);
		if (this._info)
			Jmol.$html(Jmol.$(this, "infodiv"), this._info);
		if ((!this._isInfoVisible) == (!tf))
			return;
		this._isInfoVisible = tf;
		if (this._isJava) {
			var x = (tf ? 2 : "100%");
			Jmol.$setSize(Jmol.$(this, "appletdiv"), x, x);
		}
		Jmol.$setVisible(Jmol.$(this, "infotablediv"), tf);
		Jmol.$setVisible(Jmol.$(this, "infoheaderdiv"), tf);
		this._show(!tf);
	}

	proto._show2d = function(tf) {
		this._2dapplet._show2d(tf);
		if (this._2dapplet._isEmbedded) {
			this._showInfo(false);
			this._show(!tf);
			this._2dapplet.__showContainer(true, true);
		}
	}

  proto._getSpinner = function() {
    return (this.__Info.appletLoadingImage || this._j2sPath + "/img/JSmol_spinner.gif");
  }

  proto._getAtomCorrelation = function(molData, isC13) {

    var n = this._evaluate("{*}.count");
    if (n == 0)return;

    this._loadMolData(molData, "atommap = compare({1.1} {2.1} 'MAP' " + (isC13 ? "" : "'H'") + "); zap 2.1", true);
    var map = this._evaluate("atommap");
    var A = [];
    var B = [];
		for (var i = 0; i < map.length; i++) {
		  var c = map[i];
		  A[c[0] + 1] = c[1] - n + 1;
		  B[c[1] - n + 1] = c[0] + 1;
		}
		return {fromJmol:A, toJmol:B}; // forward and rev.		
  }
  
	proto._show = function(tf) {
		var x = (!tf ? 2 : "100%");
		Jmol.$setSize(Jmol.$(this, "object"), x, x);
		if (!this._isJava)
			Jmol.$setVisible(Jmol.$(this, "appletdiv"), tf);
	}

	proto._clearConsole = function () {
			if (this._console == this._id + "_infodiv")
				this.info = "";
			if (!self.Clazz)return;
			Jmol._setConsoleDiv(this._console);
			Clazz.Console.clear();
		}


	proto._addScript = function(script) {      
		this._readyScript || (this.readyScript = "");
		this._readyScript && (this._readyScript += ";");
		this._readyScript += script;
		return true;
	}

	proto._setCallback = function(name, func) {
		this._applet.setCallback(name, func);
	}

	proto._script = function(script) {
		if (!this._ready)
				return this._addScript(script);
		Jmol._setConsoleDiv(this._console);
		Jmol._hideLocalFileReader(this);
		this._applet.script(script);
	}

	proto._syncScript = function(script) {
		this._applet.syncScript(script);
	}

	proto._scriptCheck = function(script) {
		return this._ready && this._applet.scriptCheck(script);  
	}

	proto._scriptWait = function(script, noReturn) {
		var Ret = this._scriptWaitAsArray(script);
		var s = "";
		if (!noReturn)
		for(var i = Ret.length; --i >= 0; )
			for(var j = 0, jj = Ret[i].length; j < jj; j++)
				s += Ret[i][j] + "\n";
		return s;
	}

	proto._scriptEcho = function(script) {
		var Ret = this._scriptWaitAsArray(script);
		var s = "";
		for(var i = Ret.length; --i >= 0; )
			for(var j = Ret[i].length; --j >= 0; )
				if(Ret[i][j][1] == "scriptEcho")
					s += Ret[i][j][3] + "\n";
		return s.replace(/ \| /g, "\n");
	}

	proto._scriptMessage = function(script) {
		var Ret = this._scriptWaitAsArray(script);
		var s = "";
		for(var i = Ret.length; --i >= 0; )
			for(var j = Ret[i].length; --j >= 0; )
				if(Ret[i][j][1] == "scriptStatus")
					s += Ret[i][j][3] + "\n";
		return s.replace(/ \| /g, "\n");
	}

	proto._scriptWaitOutput = function(script) {
		var ret = "";
		try {
			if(script) {
				ret += this._applet.scriptWaitOutput(script);
			}
		} catch(e) {
		}
		return ret;
	}

	proto._scriptWaitAsArray = function(script) {
		var ret = "";
		try {
			this._getStatus("scriptEcho,scriptMessage,scriptStatus,scriptError");
			if(script) {
				ret += this._applet.scriptWait(script);
				ret = Jmol._evalJSON(ret, "jmolStatus");
				if( typeof ret == "object")
					return ret;
			}
		} catch(e) {
		}
		return [[ret]];
	}

	proto._getStatus = function(strStatus) {
		return Jmol._sortMessages(this._getPropertyAsArray("jmolStatus",strStatus));
	}

	proto._getPropertyAsArray = function(sKey,sValue) {
		return Jmol._evalJSON(this._getPropertyAsJSON(sKey,sValue),sKey);
	}

	proto._getPropertyAsString = function(sKey,sValue) {
		sValue == undefined && ( sValue = "");
		return this._applet.getPropertyAsString(sKey, sValue) + "";
	}

	proto._getPropertyAsJSON = function(sKey,sValue) {
		sValue == undefined && ( sValue = "");
		try {
			return (this._applet.getPropertyAsJSON(sKey, sValue) + "");
		} catch(e) {
			return "";
		}
	}

	proto._getPropertyAsJavaObject = function(sKey,sValue) {		
		sValue == undefined && ( sValue = "");
		return this._applet.getProperty(sKey,sValue);
	}

  proto._evaluate = function(expr) {  
  	expr != null || (expr = "");
		return this._getPropertyAsArray("variableInfo", expr);

  }

	proto._evaluateDEPRECATED = function(molecularMath) {   // DEPRECATED!!!	
		var result = "" + this._getPropertyAsJavaObject("evaluate", molecularMath);
		var s = result.replace(/\-*\d+/, "");
		if(s == "" && !isNaN(parseInt(result)))
			return parseInt(result);
		var s = result.replace(/\-*\d*\.\d*/, "")
		if(s == "" && !isNaN(parseFloat(result)))
			return parseFloat(result);
		return result;
	}

	proto._saveOrientation = function(id) {	
		return this._savedOrientations[id] = this._getPropertyAsArray("orientationInfo","info").moveTo;
	}

	proto._restoreOrientation = function(id) {
		var s = this._savedOrientations[id];
		if(!s || s == "")
			return s = s.replace(/1\.0/, "0");
		return this._scriptWait(s);
	}


	proto._restoreOrientationDelayed = function(id,delay) {
		arguments.length < 1 && ( delay = 1);
		var s = this._savedOrientations[id];
		if(!s || s == "")
			return s = s.replace(/1\.0/, delay);
		return this._scriptWait(s);
	}

	proto._resizeApplet = function(size) {

		function _getAppletSize(size, units) {
			var width, height;
			if(( typeof size) == "object" && size != null) {
				width = size[0]||size.width;
				height = size[1]||size.height;
			} else {
				width = height = size;
			}
			return [_fixDim(width, units), _fixDim(height, units)];
		}

		function _fixDim(x, units) {
			var sx = "" + x;
			return (sx.length == 0 ? (units ? "" : Jmol._allowedJmolSize[2]) 
				: sx.indexOf("%") == sx.length - 1 ? sx 
				: (x = parseFloat(x)) <= 1 && x > 0 ? x * 100 + "%" 
				: (isNaN(x = Math.floor(x)) ? Jmol._allowedJmolSize[2] 
				: x < Jmol._allowedJmolSize[0] ? Jmol._allowedJmolSize[0] 
				: x > Jmol._allowedJmolSize[1] ? Jmol._allowedJmolSize[1] 
				: x)
				+ (units ? units : "")
			);
		}

		var sz = _getAppletSize(size, "px");
		var d = Jmol._getElement(this, "appletinfotablediv");
		d.style.width = sz[0];
		d.style.height = sz[1];
		this._containerWidth = sz[0];
		this._containerHeight = sz[1];
		if (this._is2D)
			Jmol.repaint(this, true);
	}

	proto._search = function(query, script){
		Jmol._search(this, query, script);
	}

	proto._searchDatabase = function(query, database, script, _jmol_searchDatabase){
		if (this._2dapplet && this._2dapplet._isEmbedded && !Jmol.$(this, "appletdiv:visible")[0])
			return this._2dapplet._searchDatabase(query, database, script); 
		this._showInfo(false);
		if (query.indexOf("?") >= 0) {
			Jmol._getInfoFromDatabase(this, database, query.split("?")[0]);
			return;
		}
		script || (script = Jmol._getScriptForDatabase(database));
		var dm = database + query;
		this._currentView = null;
		this._searchQuery = dm;
 		this._loadFile(dm, script, dm);
	}

	proto._loadFile = function(fileName, script, chemID, _jmol_loadFile){
		this._showInfo(false);
		script || (script = "");
		this._thisJmolModel = "" + Math.random();
		this._fileName = fileName;
		if (!this._scriptLoad(fileName, script)) {
			var me = this;      
			Jmol._loadFileData(this, fileName, 
				function(data){me.__loadModel(data, script, chemID)},
				function() {me.__loadModel(null)}
			);
		}
	}
					 
	proto._scriptLoad = function(file, script, _jmol_scriptLoad) {
		script || (script = "");
		var doscript = (this._isJava || !this._noscript);
		if (doscript)
			this._script("zap;set echo middle center;echo Retrieving data...");
		if (!this._isSigned || this._viewSet != null)
			return false;
		if (doscript)
			this._script("load async \"" + file + "\";" + script);
		else
			this._applet.openFile(file);
		this._checkDeferred("");
		return true;
	}

	proto.__loadModel = function(mol, script, chemID, _jmol__loadModel) {
		if (mol == null)
			return;
		if (this._viewSet != null) {
			script || (script = ""); 
			script += ";if ({*}.molecule.max > 1 || {*}.modelindex.max > 0){ delete molecule > 1 or modelindex > 0;x = getProperty('extractModel',{*});load inline @x};"
		}
		if (!script && this._noscript) {
			this._applet.loadInlineString(mol, "", false);
		} else {
		  this._loadMolData(mol, script, false);
		}
		if (this._viewSet != null) {
			Jmol.View.updateView(this, {chemID:chemID, data:mol});
		}      
	}

  proto._loadMolData = function(mol, script, isAppend) {
		script || (script = "");
		var name = (isAppend ? "append" : "model");
		script = 'load DATA "' + name + '"' + mol + '\nEND "'+ name +'" ;' + script;
		this._applet.scriptWait(script);
  }
  
	proto._loadModelFromView = function(view, _jmol_loadModelFromView) {
		this._currentView = view;
		var rec = view.Jmol;
		if (rec.data != null) {
			this.__loadModel(rec.data, null, view.info.chemID);
			return;
		}
		if (view.info.chemID != null) {
			Jmol._searchMol(this, view.info.chemID, null, false);
			return;
		}
		rec = view.JME;
		if (rec) {
			rec.applet._show2d(false, this);
			return;
		}
	}

  proto._reset = function(_jmol_resetView) {
    this._scriptWait("zap", true);
  }
  
	proto._updateView = function(_jmol_updateView) {
		if (this._viewSet == null || !this._applet)
			return;
		chemID = "" + this._getPropertyAsJavaObject("variableInfo","script('show chemical inchiKey')");
		if (chemID.length < 36) // InChIKey=RZVAJINKPMORJF-BGGKNDAXNA-N
			chemID = null;
		else
			chemID = chemID.substring(36).split('\n')[0];
		Jmol.View.updateView(this, {chemID:chemID, data: "" + this._getPropertyAsJavaObject("evaluate", "extractModel", "{visible}")});
	}

	proto._atomPickedCallback = function(imodel, iatom, _jmol_atomPickedCallback) {
		if (iatom < 0) {
		} else {
			var A = [iatom + 1];
			Jmol.View.updateAtomPick(this, A);
			this._updateAtomPick(A);
		}
	}

	proto._updateAtomPick = function(A) {
			this._script(A.length == 0 ? "select none" : "select on visible and (@" + A.join(",@") + ")");
	}

  proto._isDeferred = function () {
      return !this._canvas && this._cover && this._isCovered && this._deferApplet
  }

	proto._checkDeferred = function(script) {
		if (this._isDeferred()) {
			this._coverScript = script;
			this._cover(false);
			return true;
		}
		return false;
	}

	proto._cover = function (doCover) {
		if (doCover || !this._deferApplet) {
			this._displayCoverImage(doCover);
			return;
		}
		var s = (this._coverScript ? this._coverScript : "");
		this._coverScript = "";
		if (this._deferUncover)
			s += ";refresh;javascript " + this._id + "._displayCoverImage(false)";
		this._script(s, true);
		if (this._deferUncover && this._coverTitle == "activate 3D model")
			Jmol._getElement(this, "coverimage").title = "3D model is loading...";
		if (!this._isJava)
			this._newCanvas(false);
		if (this._defaultModel)	
			Jmol._search(this, this._defaultModel);
		this._showInfo(false);
		if (!this._deferUncover)
			this._displayCoverImage(false);
		if (this._isJava)
			Jmol.$html(Jmol.$(this, "appletdiv"), this._javaCode);
		if (this._init)
			this._init();
	};

	proto._displayCoverImage = function(TF) {
		if (!this._coverImage || this._isCovered == TF) return;
		this._isCovered = TF;
		Jmol._getElement(this, "coverdiv").style.display = (TF ? "block" : "none");
	};

  proto._getSmiles = function() {
		return this._evaluate("{visible}.find('SMILES')");   
  }
  
  proto._getMol = function() {
		return this._evaluate("getProperty('ExtractModel',{visible})");   
  }

  proto._getMol2D = function() {
		return this._evaluate("script('select visible;show chemical sdf')"); // 2D equivalent no longer!
  }
  
  
})(Jmol._Applet, Jmol._Applet.prototype);


	Jmol.jmolSmiles = function(jmol, withStereoChemistry) {
		return jmol._getSmiles();
	}


})(Jmol, document);

(function(Jmol) {


	var c = Jmol.controls = {

		_hasResetForms: false,	
		_scripts: [""],
		_checkboxMasters: {},
		_checkboxItems: {},
		_actions: {},

		_buttonCount: 0,
		_checkboxCount: 0,
		_radioGroupCount: 0,
		_radioCount: 0,
		_linkCount: 0,
		_cmdCount: 0,
		_menuCount: 0,

		_previousOnloadHandler: null,	
		_control: null,
		_element: null,

		_appletCssClass: null,
		_appletCssText: "",
		_buttonCssClass: null,
		_buttonCssText: "",
		_checkboxCssClass: null,
		_checkboxCssText: "",
		_radioCssClass: null,
		_radioCssText: "",
		_linkCssClass: null,
		_linkCssText: "",
		_menuCssClass: null,
		_menuCssText: ""
	};

	c._addScript = function(appId,script) {
		var index = c._scripts.length;
		c._scripts[index] = [appId, script];
		return index;
	}

	c._getIdForControl = function(appletOrId, script) {
		return (typeof appletOrId == "string" ? appletOrId 
			: !script || !appletOrId._canScript || appletOrId._canScript(script) ? appletOrId._id
			: null);
	}

	c._radio = function(appletOrId, script, labelHtml, isChecked, separatorHtml, groupName, id, title) {
		var appId = c._getIdForControl(appletOrId, script);
		if (appId == null)
			return null;
		++c._radioCount;
		groupName != undefined && groupName != null || (groupName = "jmolRadioGroup" + (c._radioGroupCount - 1));
		if (!script)
			return "";
		id != undefined && id != null || (id = "jmolRadio" + (c._radioCount - 1));
		labelHtml != undefined && labelHtml != null || (labelHtml = script.substring(0, 32));
		separatorHtml || (separatorHtml = "");
		var eospan = "</span>";
		c._actions[id] = c._addScript(appId, script);
		var t = "<span id=\"span_"+id+"\""+(title ? " title=\"" + title + "\"":"")+"><input name='"
			+ groupName + "' id='"+id+"' type='radio'"
			+ " onclick='Jmol.controls._click(this);return true;'"
			+ " onmouseover='Jmol.controls._mouseOver(this);return true;'"
			+ " onmouseout='Jmol.controls._mouseOut()' " +
		 (isChecked ? "checked='true' " : "") + c._radioCssText + " />";
		if (labelHtml.toLowerCase().indexOf("<td>")>=0) {
			t += eospan;
			eospan = "";
		}
		t += "<label for=\"" + id + "\">" + labelHtml + "</label>" +eospan + separatorHtml;
		return t;
	}


	c._scriptExecute = function(element, scriptInfo) {
		var applet = Jmol._applets[scriptInfo[0]];
		var script = scriptInfo[1];
		if (typeof(script) == "object")
			script[0](element, script, applet);
		else if (typeof(script) == "function")
			script(applet);
		else
			Jmol.script(applet, script);
	}

	c.__checkScript = function(applet, d) {
		var ok = (d.value.indexOf("JSCONSOLE ") >= 0 || applet._scriptCheck(d.value) === "");
		d.style.color = (ok ? "black" : "red");
		return ok;
	} 

	c.__getCmd = function(dir, d) {
		if (!d._cmds || !d._cmds.length)return
		var s = d._cmds[d._cmdpt = (d._cmdpt + d._cmds.length + dir) % d._cmds.length]
		setTimeout(function(){d.value = s},10);    
		d._cmdadd = 1;
		d._cmddir = dir;
	}

	c._commandKeyPress = function(e, id, appId) {
	var keycode = (e == 13 ? 13 : window.event ? window.event.keyCode : e ? e.keyCode || e.which : 0);
	var d = document.getElementById(id);
		var applet = Jmol._applets[appId];
	switch (keycode) {
	case 13:
		var v = d.value;
		if ((c._scriptExecute(d, [appId, v]) || 1)) {
			 if (!d._cmds){
				 d._cmds = [];
				 d._cmddir = 0;
				 d._cmdpt = -1;
				 d._cmdadd = 0;      
	}
			 if (v && d._cmdadd == 0) {
					++d._cmdpt;
					d._cmds.splice(d._cmdpt, 0, v);
					d._cmdadd = 0;
					d._cmddir = 0;
			 } else {
					d._cmdadd = 0;
			 }
			 d.value = "";
		}
		return false;
	case 27:
		setTimeout(function() {d.value = ""}, 20);
		return false;
	case 38: // up
		c.__getCmd(-1, d);
		break;
	case 40: // dn
		c.__getCmd(1, d);
		break;
	default:
		d._cmdadd = 0;
	}
	setTimeout(function() {c.__checkScript(applet, d)}, 20);
	return true;
 }

	c._click = function(obj, scriptIndex) {
		c._element = obj;
		if (arguments.length == 1)
			scriptIndex = c._actions[obj.id];
		c._scriptExecute(obj, c._scripts[scriptIndex]);
	}

	c._menuSelected = function(menuObject) {
		var scriptIndex = menuObject.value;
		if (scriptIndex != undefined) {
			c._scriptExecute(menuObject, c._scripts[scriptIndex]);
			return;
		}
		var len = menuObject.length;
		if (typeof len == "number")
			for (var i = 0; i < len; ++i)
				if (menuObject[i].selected) {
					c._click(menuObject[i], menuObject[i].value);
					return;
				}
		alert("?Que? menu selected bug #8734");
	}

	c._cbNotifyMaster = function(m){
    var allOn = true;
    var allOff = true;
    var mixed = false;
    var cb;
    for (var id in m.chkGroup){ //siblings of m
      cb = m.chkGroup[id]; 
		  if (cb.checked)
        allOff = false;
      else
        allOn = false;
      if (cb.indeterminate)
        mixed = true;
		}
	  cb = m.chkMaster;
		if (allOn) { cb.checked = true; }
		else if (allOff) { cb.checked = false; }
		else { mixed = true; }
		cb.indeterminate = mixed;
    (m = c._checkboxItems[cb.id]) && (cb = m.chkMaster) 
      && c._cbNotifyMaster(c._checkboxMasters[cb.id])
	}
  
	c._cbNotifyGroup = function(m, isOn){
		for (var chkBox in m.chkGroup){
			var item = m.chkGroup[chkBox]
			if (item.checked != isOn) {
				item.checked = isOn;
				c._cbClick(item);
			}
			if (c._checkboxMasters[item.id])
				c._cbNotifyGroup(c._checkboxMasters[item.id], isOn)
		}
	}

	c._cbSetCheckboxGroup = function(chkMaster, chkboxes, args){
		var id = chkMaster;
		if(typeof(id)=="number")id = "jmolCheckbox" + id;
		chkMaster = document.getElementById(id);
		if (!chkMaster)alert("jmolSetCheckboxGroup: master checkbox not found: " + id);
		var m = c._checkboxMasters[id] = {};
		m.chkMaster = chkMaster;
		m.chkGroup = {};
		var i0;
		if (typeof(chkboxes)=="string") {
			chkboxes = args;
			i0 = 1;
		} else {
			i0 = 0;
		}
		for (var i = i0; i < chkboxes.length; i++){
			var id = chkboxes[i];
			if(typeof(id)=="number")id = "jmolCheckbox" + id;
			var checkboxItem = document.getElementById(id);
			if (!checkboxItem)alert("jmolSetCheckboxGroup: group checkbox not found: " + id);
			m.chkGroup[id] = checkboxItem;
			c._checkboxItems[id] = m;
		}
	}

	c._cbClick = function(ckbox) {
		c._control = ckbox;
		var whenChecked = c._actions[ckbox.id][0];
		var whenUnchecked = c._actions[ckbox.id][1];
		c._click(ckbox, ckbox.checked ? whenChecked : whenUnchecked);
		if(c._checkboxMasters[ckbox.id])
			c._cbNotifyGroup(c._checkboxMasters[ckbox.id], ckbox.checked)
		if(c._checkboxItems[ckbox.id])
			c._cbNotifyMaster(c._checkboxItems[ckbox.id])
	}

	c._cbOver = function(ckbox) {
		var whenChecked = c._actions[ckbox.id][0];
		var whenUnchecked = c._actions[ckbox.id][1];
		window.status = c._scripts[ckbox.checked ? whenUnchecked : whenChecked];
	}

	c._mouseOver = function(obj, scriptIndex) {
		if (arguments.length == 1)
			scriptIndex = c._actions[obj.id];
		window.status = c._scripts[scriptIndex];
	}

	c._mouseOut = function() {
		window.status = " ";
		return true;
	}


	c._onloadResetForms = function() {
		if (c._hasResetForms)
			return;
		c._hasResetForms = true;
		c._previousOnloadHandler = window.onload;
		window.onload = function() {
			if (c._buttonCount+c._checkboxCount+c._menuCount+c._radioCount+c._radioGroupCount > 0) {
				var forms = document.forms;
				for (var i = forms.length; --i >= 0; )
					forms[i].reset();
			}
			if (c._previousOnloadHandler)
				c._previousOnloadHandler();
		}
	}


	c._getButton = function(appletOrId, script, label, id, title) {
		var appId = c._getIdForControl(appletOrId, script);
		if (appId == null)
			return "";
		id != undefined && id != null || (id = "jmolButton" + c._buttonCount);
		label != undefined && label != null || (label = script.substring(0, 32));
		++c._buttonCount;
		c._actions[id] = c._addScript(appId, script);
		var t = "<span id=\"span_"+id+"\""+(title ? " title=\"" + title + "\"":"")+"><input type='button' name='" + id + "' id='" + id +
						"' value='" + label +
						"' onclick='Jmol.controls._click(this)' onmouseover='Jmol.controls._mouseOver(this);return true' onmouseout='Jmol.controls._mouseOut()' " +
						c._buttonCssText + " /></span>";
		if (Jmol._debugAlert)
			alert(t);
		return Jmol._documentWrite(t);
	}

	c._getCheckbox = function(appletOrId, scriptWhenChecked, scriptWhenUnchecked,
			labelHtml, isChecked, id, title) {

		var appId = c._getIdForControl(appletOrId, scriptWhenChecked);
		if (appId != null)
			appId = c._getIdForControl(appletOrId, scriptWhenUnchecked);
		if (appId == null)
			return "";

		id != undefined && id != null || (id = "jmolCheckbox" + c._checkboxCount);
		++c._checkboxCount;
		if (scriptWhenChecked == undefined || scriptWhenChecked == null ||
				scriptWhenUnchecked == undefined || scriptWhenUnchecked == null) {
			alert("jmolCheckbox requires two scripts");
			return;
		}
		if (labelHtml == undefined || labelHtml == null) {
			alert("jmolCheckbox requires a label");
			return;
		}
		c._actions[id] = [c._addScript(appId, scriptWhenChecked),c._addScript(appId, scriptWhenUnchecked)];
		var eospan = "</span>"
		var t = "<span id=\"span_"+id+"\""+(title ? " title=\"" + title + "\"":"")+"><input type='checkbox' name='" + id + "' id='" + id +
						"' onclick='Jmol.controls._cbClick(this)" +
						"' onmouseover='Jmol.controls._cbOver(this)" +
						";return true' onmouseout='Jmol.controls._mouseOut()' " +
			(isChecked ? "checked='true' " : "")+ c._checkboxCssText + " />"
		if (labelHtml.toLowerCase().indexOf("<td>")>=0) {
			t += eospan
			eospan = "";
		}
		t += "<label for=\"" + id + "\">" + labelHtml + "</label>" +eospan;
		if (Jmol._debugAlert)
			alert(t);
		return Jmol._documentWrite(t);
	}

	c._getCommandInput = function(appletOrId, label, size, id, title, cmd0) {
		var appId = c._getIdForControl(appletOrId, "x");
		if (appId == null)
			return "";
		id != undefined && id != null || (id = "jmolCmd" + c._cmdCount);
		label != undefined && label != null || (label = "Execute");
		size != undefined && !isNaN(size) || (size = 60);
		cmd0 != undefined || (cmd0 = "help");
		++c._cmdCount;
		var t = "<span id=\"span_"+id+"\""+(title ? " title=\"" + title + "\"":"")+"><input name='" + id + "' id='" + id +
						"' size='"+size+"' onkeydown='return Jmol.controls._commandKeyPress(event,\""+id+"\",\"" + appId + "\")' value='" + cmd0 + "'/><input " +
						" type='button' name='" + id + "Btn' id='" + id + "Btn' value = '"+label+"' onclick='Jmol.controls._commandKeyPress(13,\""+id+"\",\"" + appId + "\")' /></span>";
		if (Jmol._debugAlert)
			alert(t);
		return Jmol._documentWrite(t);
	}

	c._getLink = function(appletOrId, script, label, id, title) {
		var appId = c._getIdForControl(appletOrId, script);
		if (appId == null)
			return "";
		id != undefined && id != null || (id = "jmolLink" + c._linkCount);
		label != undefined && label != null || (label = script.substring(0, 32));
		++c._linkCount;
		var scriptIndex = c._addScript(appId, script);
		var t = "<span id=\"span_"+id+"\""+(title ? " title=\"" + title + "\"":"")+"><a name='" + id + "' id='" + id +
						"' href='javascript:Jmol.controls._click(null,"+scriptIndex+");' onmouseover='Jmol.controls._mouseOver(null,"+scriptIndex+");return true;' onmouseout='Jmol.controls._mouseOut()' " +
						c._linkCssText + ">" + label + "</a></span>";
		if (Jmol._debugAlert)
			alert(t);
		return Jmol._documentWrite(t);
	}

	c._getMenu = function(appletOrId, arrayOfMenuItems, size, id, title) {
		var appId = c._getIdForControl(appletOrId, null);
		var optgroup = null;
		id != undefined && id != null || (id = "jmolMenu" + c._menuCount);
		++c._menuCount;
		var type = typeof arrayOfMenuItems;
		if (type != null && type == "object" && arrayOfMenuItems.length) {
			var len = arrayOfMenuItems.length;
			if (typeof size != "number" || size == 1)
				size = null;
			else if (size < 0)
				size = len;
			var sizeText = size ? " size='" + size + "' " : "";
			var t = "<span id=\"span_"+id+"\""+(title ? " title=\"" + title + "\"":"")+"><select name='" + id + "' id='" + id +
							"' onChange='Jmol.controls._menuSelected(this)'" +
							sizeText + c._menuCssText + ">";
			for (var i = 0; i < len; ++i) {
				var menuItem = arrayOfMenuItems[i];
				type = typeof menuItem;
				var script = null;
				var text = null;
				var isSelected = null;
				if (type == "object" && menuItem != null) {
					script = menuItem[0];
					text = menuItem[1];
					isSelected = menuItem[2];
				} else {
					script = text = menuItem;
				}
				appId = c._getIdForControl(appletOrId, script);
				if (appId == null)
					return "";
				text == null && (text = script);
				if (script=="#optgroup") {
					t += "<optgroup label='" + text + "'>";
				} else if (script=="#optgroupEnd") {
					t += "</optgroup>";
				} else {
					var scriptIndex = c._addScript(appId, script);
					var selectedText = isSelected ? "' selected='true'>" : "'>";
					t += "<option value='" + scriptIndex + selectedText + text + "</option>";
				}
			}
			t += "</select></span>";
			if (Jmol._debugAlert)
				alert(t);
			return Jmol._documentWrite(t);
		}
	}

	c._getRadio = function(appletOrId, script, labelHtml, isChecked, separatorHtml, groupName, id, title) {
		if (c._radioGroupCount == 0)
			++c._radioGroupCount;
		groupName || (groupName = "jmolRadioGroup" + (c._radioGroupCount - 1));
		var t = c._radio(appletOrId, script, labelHtml, isChecked, separatorHtml, groupName, (id ? id : groupName + "_" + c._radioCount), title ? title : 0);
		if (t == null)
			return "";
		if (Jmol._debugAlert)
			alert(t);
		return Jmol._documentWrite(t);
	}

	c._getRadioGroup = function(appletOrId, arrayOfRadioButtons, separatorHtml, groupName, id, title) {

		var type = typeof arrayOfRadioButtons;
		if (type != "object" || type == null || ! arrayOfRadioButtons.length) {
			alert("invalid arrayOfRadioButtons");
			return;
		}
		separatorHtml != undefined && separatorHtml != null || (separatorHtml = "&#xa0; ");
		var len = arrayOfRadioButtons.length;
		++c._radioGroupCount;
		groupName || (groupName = "jmolRadioGroup" + (c._radioGroupCount - 1));
		var t = "<span id='"+(id ? id : groupName)+"'>";
		for (var i = 0; i < len; ++i) {
			if (i == len - 1)
				separatorHtml = "";
			var radio = arrayOfRadioButtons[i];
			type = typeof radio;
			var s = null;
			if (type == "object") {
				t += (s = c._radio(appletOrId, radio[0], radio[1], radio[2], separatorHtml, groupName, (radio.length > 3 ? radio[3]: (id ? id : groupName)+"_"+i), (radio.length > 4 ? radio[4] : 0), title));
			} else {
				t += (s = c._radio(appletOrId, radio, null, null, separatorHtml, groupName, (id ? id : groupName)+"_"+i, title));
			}
			if (s == null)
				return "";
		}
		t+="</span>"
		if (Jmol._debugAlert)
			alert(t);
		return Jmol._documentWrite(t);
	}


})(Jmol);







;(function (Jmol) {
	var getField = function(key) {
		key = "&" + key + "=";
		return decodeURI(("&" + document.location.search.substring(1) + key).split(key)[1].split("&")[0]);
	}
	Jmol._j2sPath = getField("_J2S");
	Jmol._jarFile = getField("_JAR");
	Jmol._use = getField("_USE");

	Jmol.getVersion = function(){return Jmol._jmolInfo.version};

	Jmol.getApplet = function(id, Info, checkOnly) {
		return Jmol._Applet._get(id, Info, checkOnly);
	}

	Jmol.getJMEApplet = function(id, Info, linkedApplet, checkOnly) {
		return Jmol._JMEApplet._get(id, Info, linkedApplet, checkOnly);
	}

	Jmol.getJSVApplet = function(id, Info, checkOnly) {
		return Jmol._JSVApplet._get(id, Info, checkOnly);
	}	



	Jmol.setCallback = function(applet, name, func) {
		applet._setCallback(name, func);
	}

	Jmol.loadFile = function(applet, fileName, params){
		applet._loadFile(fileName, params);
	}

	Jmol.script = function(applet, script) {
		if (applet._checkDeferred(script)) 
			return;
		applet._script(script);
	}

	Jmol.scriptCheck = function(applet, script) {
		return applet && applet._scriptCheck && applet._ready && applet._scriptCheck(script);
	}

	Jmol.scriptWait = function(applet, script) {
		return applet._scriptWait(script);
	}

	Jmol.scriptEcho = function(applet, script) {
		return applet._scriptEcho(script);
	}

	Jmol.scriptMessage = function(applet, script) {
		return applet._scriptMessage(script);
	}

	Jmol.scriptWaitOutput = function(applet, script) {
		return applet._scriptWait(script);
	}

	Jmol.scriptWaitAsArray = function(applet, script) {
		return applet._scriptWaitAsArray(script);
	}

	Jmol.search = function(applet, query, script) {
		applet._search(query, script);
	}



	Jmol.evaluateVar = function(applet,expr) {
		return applet._evaluate(expr);
	}

	Jmol.evaluate = function(applet,molecularMath) {
		return applet._evaluateDEPRECATED(molecularMath);
	}

	Jmol.getAppletHtml = function(applet, Info) {
		if (Info) {
			var d = Jmol._document;
			Jmol._document = null;
			applet = Jmol.getApplet(applet, Info);
			Jmol._document = d;
		}  
		return applet._code;
	}

	Jmol.getPropertyAsArray = function(applet,sKey,sValue) {
		return applet._getPropertyAsArray(sKey,sValue);
	}

	Jmol.getPropertyAsJavaObject = function(applet,sKey,sValue) {
		return applet._getPropertyAsJavaObject(sKey,sValue);
	}

	Jmol.getPropertyAsJSON = function(applet,sKey,sValue) {
		return applet._getPropertyAsJSON(sKey,sValue);
	}

	Jmol.getPropertyAsString = function(applet,sKey,sValue) {
		return applet._getPropertyAsString(sKey,sValue);
	}

	Jmol.getStatus = function(applet,strStatus) {
		return applet._getStatus(strStatus);
	}



	Jmol.resizeApplet = function(applet,size) {
		return applet._resizeApplet(size);
	}

	Jmol.restoreOrientation = function(applet,id) {
		return applet._restoreOrientation(id);
	}

	Jmol.restoreOrientationDelayed = function(applet,id,delay) {
		return applet._restoreOrientationDelayed(id,delay);
	}

	Jmol.saveOrientation = function(applet,id) {
		return applet._saveOrientation(id);
	}

	Jmol.say = function(msg) {
		alert(msg);
	}


	Jmol.clearConsole = function(applet) {
		applet._clearConsole();
	}

	Jmol.getInfo = function(applet) {
		return applet._info;
	}

	Jmol.setInfo = function(applet, info, isShown) {
		applet._info = info;
		if (arguments.length > 2)
			applet._showInfo(isShown);
	}

	Jmol.showInfo = function(applet, tf) {
		applet._showInfo(tf);
	}

	Jmol.show2d = function(applet, tf) {
		applet._show2d(tf);
	}




	Jmol.jmolBr = function() {
		return Jmol._documentWrite("<br>");
	}

	Jmol.jmolButton = function(appletOrId, script, label, id, title) {
		return Jmol.controls._getButton(appletOrId, script, label, id, title);
	}

	Jmol.jmolCheckbox = function(appletOrId, scriptWhenChecked, scriptWhenUnchecked,
			labelHtml, isChecked, id, title) {
		return Jmol.controls._getCheckbox(appletOrId, scriptWhenChecked, scriptWhenUnchecked,
			labelHtml, isChecked, id, title);
	}


	Jmol.jmolCommandInput = function(appletOrId, label, size, id, title, cmd0) {
		return Jmol.controls._getCommandInput(appletOrId, label, size, id, title, cmd0);
	}

	Jmol.jmolHtml = function(html) {
		return Jmol._documentWrite(html);
	}

	Jmol.jmolLink = function(appletOrId, script, label, id, title) {
		return Jmol.controls._getLink(appletOrId, script, label, id, title);
	}

	Jmol.jmolMenu = function(appletOrId, arrayOfMenuItems, size, id, title) {
		return Jmol.controls._getMenu(appletOrId, arrayOfMenuItems, size, id, title);
	}

	Jmol.jmolRadio = function(appletOrId, script, labelHtml, isChecked, separatorHtml, groupName, id, title) {
		return Jmol.controls._getRadio(appletOrId, script, labelHtml, isChecked, separatorHtml, groupName, id, title);
	}

	Jmol.jmolRadioGroup = function (appletOrId, arrayOfRadioButtons, separatorHtml, groupName, id, title) {
		return Jmol.controls._getRadioGroup(appletOrId, arrayOfRadioButtons, separatorHtml, groupName, id, title);
	}

	Jmol.setCheckboxGroup = function(chkMaster, chkBoxes) {
		Jmol.controls._cbSetCheckboxGroup(chkMaster, chkBoxes, arguments);
	}

	Jmol.setDocument = function(doc) {


		Jmol._document = doc;
	}

	Jmol.setXHTML = function(id) {
		Jmol._isXHTML = true;
		Jmol._XhtmlElement = null;
		Jmol._XhtmlAppendChild = false;
		if (id){
			Jmol._XhtmlElement = document.getElementById(id);
			Jmol._XhtmlAppendChild = true;
		}
	}



	Jmol.setAppletCss = function(cssClass, text) {
		cssClass != null && (Jmol._appletCssClass = cssClass);
		Jmol._appletCssText = text ? text + " " : cssClass ? "class=\"" + cssClass + "\" " : "";
	}

	Jmol.setButtonCss = function(cssClass, text) {
		cssClass != null && (Jmol.controls._buttonCssClass = cssClass);
		Jmol.controls._buttonCssText = text ? text + " " : cssClass ? "class=\"" + cssClass + "\" " : "";
	}

	Jmol.setCheckboxCss = function(cssClass, text) {
		cssClass != null && (Jmol.controls._checkboxCssClass = cssClass);
		Jmol.controls._checkboxCssText = text ? text + " " : cssClass ? "class=\"" + cssClass + "\" " : "";
	}

	Jmol.setRadioCss = function(cssClass, text) {
		cssClass != null && (Jmol.controls._radioCssClass = cssClass);
		Jmol.controls._radioCssText = text ? text + " " : cssClass ? "class=\"" + cssClass + "\" " : "";
	}

	Jmol.setLinkCss = function(cssClass, text) {
		cssClass != null && (Jmol.controls._linkCssClass = cssClass);
		Jmol.controls._linkCssText = text ? text + " " : cssClass ? "class=\"" + cssClass + "\" " : "";
	}

	Jmol.setMenuCss = function(cssClass, text) {
		cssClass != null && (Jmol.controls._menuCssClass = cssClass);
		Jmol.controls._menuCssText = text ? text + " ": cssClass ? "class=\"" + cssClass + "\" " : "";
	}

	Jmol.setAppletSync = function(applets, commands, isJmolJSV) {
		Jmol._syncedApplets = applets;   // an array of appletIDs
		Jmol._syncedCommands = commands; // an array of commands; one or more may be null 
		Jmol._syncedReady = {};
		Jmol._isJmolJSVSync = isJmolJSV;
	}


	Jmol.setGrabberOptions = function(options) {
		Jmol._grabberOptions = options;
	}

	Jmol.setAppletHtml = function (applet, divid) {
		if (!applet._code) 
			return;
		Jmol.$html(divid, applet._code);
		if (applet._init && !applet._deferApplet)
			applet._init();
	}

	Jmol.coverApplet = function(applet, doCover) {
		if (applet._cover)
			applet._cover(doCover);
	}

	Jmol.setFileCaching = function(applet, doCache) {
		if (applet) {
			applet._cacheFiles = doCache;
		} else {
			Jmol.fileCache = (doCache ? {} : null);
		}
	}  

	Jmol.resetView = function(applet, appletNot) {
    Jmol.View.resetView(applet, appletNot);
	}

	Jmol.updateView = function(applet, param1, param2) {
		applet._updateView(param1, param2);
	}

	Jmol.getChemicalInfo = function(appletOrIdentifier, what, fCallback) {
		what || (what = "name");
		if (typeof appletOrIdentifier != "string") 
			appletOrIdentifier = appletOrIdentifier._getSmiles();
		return Jmol._getNCIInfo(appletOrIdentifier, what, fCallback);
	}

	Jmol.saveImage = function(app, type, fname) {
		type = (type || "png").toLowerCase();
		fname || (fname = app.id + "." + type.toLowerCase());
		if (fname.indexOf(".") < 0) fname += "." + type;
		switch (app._viewType) {
		case "Jmol":
			return app._script("write PNGJ \"" + fname + "\"");
		case "JSV":
			if (type == "PDF")
				return app._script("write PDF");
			break;
		case "JME":
			return app._script("print");			
		}
		Jmol._saveFile(fname,app._canvas.toDataURL("image/png"));
	}
		
		
})(Jmol);
 



LoadClazz = function() {

TypeError.prototype.printStackTrace = ReferenceError.prototype.printStackTrace = function() { console.log(this) }

var c$ = null; // class variable

if (!window["j2s.clazzloaded"])
	window["j2s.clazzloaded"] = false;

if (window["j2s.clazzloaded"])return;

window["j2s.clazzloaded"] = true;

window["j2s.object.native"] = true;


 

Clazz._supportsNativeObject = window["j2s.object.native"];

if (Clazz._supportsNativeObject) {
	Clazz._O = function(){};
	Clazz._O.__CLASS_NAME__ = "Object";
	Clazz._O["getClass"] = function(){ return Clazz._O; }; 
} else {
	Clazz._O = Object;
}

Clazz.Console = {};
Clazz.dateToString = Date.prototype.toString;
Clazz._hashCode = 0;

var addProto = function(proto, name, func) {
	return proto[name] = func;
};

;(function(proto) {
	addProto(proto, "equals", function(obj) {
		return this == obj;
	});

	addProto(proto, "hashCode", function(){
  
    return this._$hashcode || (this._$hashcode = ++Clazz._hashCode)

	});

	addProto(proto, "getClass", function(){ return Clazz.getClass (this); });

	addProto(proto, "clone", function(){ return Clazz.clone(this); });

	Clazz.clone = function(me) {
		var o = (me instanceof Array ? new Array(me.length) : new me.constructor());
		for (var i in me) {
			o[i] = me[i];
      }
		return o;
	}
	addProto(proto, "finalize", function(){});
	addProto(proto, "notify", function(){});
	addProto(proto, "notifyAll", function(){});
	addProto(proto, "wait", function(){});
	addProto(proto, "to$tring", Object.prototype.toString);
	addProto(proto, "toString", function(){ return (this.__CLASS_NAME__ ? "[" + this.__CLASS_NAME__ + " object]" : this.to$tring.apply(this, arguments)); });
	Clazz._extendedObjectMethods = [ "equals", "hashCode", "getClass", "clone", "finalize", "notify", "notifyAll", "wait", "to$tring", "toString" ];

})(Clazz._O.prototype);

Clazz.extendJO = function(c, name) {  
	if (name) {
		c.__CLASS_NAME__ = c.prototype.__CLASS_NAME__ = name;
		Clazz._setDeclared(name, c);
	}
	if (Clazz._supportsNativeObject) {
		for (var i = 0; i < Clazz._extendedObjectMethods.length; i++) {
			var p = Clazz._extendedObjectMethods[i];
			addProto(c.prototype, p, Clazz._O.prototype[p]);
		}
	}
};


Clazz.extractClassName = function(clazzStr) {
	var clazzName = clazzStr.substring (1, clazzStr.length - 1);
	return (clazzName.indexOf("Array") >= 0 ? "Array" // BH -- for Float64Array and Int32Array
		: clazzName.indexOf ("object ") >= 0 ? clazzName.substring (7) // IE
		: clazzName);
}
Clazz.getClassName = function(obj) {
	if (obj == null)
		return "NullObject";
	if (obj instanceof Clazz.CastedNull)
		return obj.clazzName;
	switch(typeof obj) {
	case "number":
		return "n";
	case "boolean":
		return "b";
	case "string":
		return "String";
	case "function":
		if (obj.__CLASS_NAME__)
			return (arguments[1] ? obj.__CLASS_NAME__ : "Class"); /* user defined class name */
		var s = obj.toString();
		var idx0 = s.indexOf("function");
		if (idx0 < 0)
			return (s.charAt(0) == '[' ? Clazz.extractClassName(s) : s.replace(/[^a-zA-Z0-9]/g, ''));
		var idx1 = idx0 + 8;
		var idx2 = s.indexOf ("(", idx1);
		if (idx2 < 0)
			return "Object";
		s = s.substring (idx1, idx2);
		if (s.indexOf("Array") >= 0)
			return "Array"; 
		s = s.replace (/^\s+/, "").replace (/\s+$/, "");
		return (s == "anonymous" || s == "" ? "Function" : s);
	case "object":
		if (obj.__CLASS_NAME__) // user defined class name
			return obj.__CLASS_NAME__;
		if (!obj.constructor)
			return "Object"; // For HTML Element in IE
		if (!obj.constructor.__CLASS_NAME__) {
			if (obj instanceof Number)
				return "Number";
			if (obj instanceof Boolean)
				return "Boolean";
			if (obj instanceof Array || obj.BYTES_PER_ELEMENT)
				return "Array";
			var s = obj.toString();
			if (s.charAt(0) == '[')
				return Clazz.extractClassName(s);
		}
  	return Clazz.getClassName (obj.constructor, true);
	}
  return "Object";
};
Clazz.getClass = function(clazzHost) {
	if (!clazzHost)
		return Clazz._O;	// null/undefined is always treated as Object
	if (typeof clazzHost == "function")
		return clazzHost;
	var clazzName;
	if (clazzHost instanceof Clazz.CastedNull) {
		clazzName = clazzHost.clazzName;
	} else {
		switch (typeof clazzHost) {
		case "string":
			return String;
	  case "object":
			if (!clazzHost.__CLASS_NAME__)
				return (clazzHost.constructor || Clazz._O);
			clazzName = clazzHost.__CLASS_NAME__;
		break;
		default:
			return clazzHost.constructor;
		}
	}
	return Clazz.evalType(clazzName, true);
};


var checkInnerFunction = function(hostSuper, funName) {
	for (var k = 0; k < Clazz.innerFunctionNames.length; k++)
		if (funName == Clazz.innerFunctionNames[k] && 
				Clazz._innerFunctions[funName] === hostSuper[funName])
			return true;
	return false;
};

var args4InheritClass = function(){};

Clazz.inheritArgs = new args4InheritClass();

Clazz.inheritClass = function(clazzThis, clazzSuper, objSuper) {
	for (var o in clazzSuper) {
		if (o != "b$" && o != "prototype" && o != "superClazz"
				&& o != "__CLASS_NAME__" && o != "implementz"
				&& !checkInnerFunction(clazzSuper, o)) {
			clazzThis[o] = clazzSuper[o];
		}
	}
	if (Clazz.unloadedClasses[Clazz.getClassName(clazzThis, true)]) {
	} else if (objSuper) {
		clazzThis.prototype = objSuper; 
	} else if (clazzSuper !== Number) {
		clazzThis.prototype = new clazzSuper (Clazz.inheritArgs);
	} else { // Number
		clazzThis.prototype = new Number();
	}
	clazzThis.superClazz = clazzSuper;
	clazzThis.prototype.__CLASS_NAME__ = clazzThis.__CLASS_NAME__;
};

Clazz.implementOf = function(clazzThis, interfacez) {
	if (arguments.length >= 2) {
		if (!clazzThis.implementz)
			clazzThis.implementz = [];
		var impls = clazzThis.implementz;
		if (arguments.length == 2) {
			if (typeof interfacez == "function") {
				impls.push(interfacez);
				copyProperties(clazzThis, interfacez);
			} else if (interfacez instanceof Array) {
				for (var i = 0; i < interfacez.length; i++) {
					impls.push(interfacez[i]);
					copyProperties(clazzThis, interfacez[i]);
				}
			}
		} else {
			for (var i = 1; i < arguments.length; i++) {
				impls.push(arguments[i]);
				copyProperties(clazzThis, arguments[i]);
			}
		}
	}
};

var copyProperties = function(clazzThis, clazzSuper) {
	for (var o in clazzSuper)
		if (o != "b$" 
				&& o != "prototype" && o != "superClazz"
				&& o != "__CLASS_NAME__" && o != "implementz"
				&& (typeof clazzSuper[o] != "function" || !checkInnerFunction(clazzSuper, o)))
			clazzThis[o] = clazzThis.prototype[o] = clazzSuper[o];
};

Clazz.extendInterface = Clazz.implementOf;

Clazz.equalsOrExtendsLevel = function(clazzThis, clazzAncestor) {
	if (clazzThis === clazzAncestor)
		return 0;
	if (clazzThis.implementz) {
		var impls = clazzThis.implementz;
		for (var i = 0; i < impls.length; i++) {
			var level = Clazz.equalsOrExtendsLevel (impls[i], clazzAncestor);
			if (level >= 0)
				return level + 1;
		}
	}
	return -1;
};

Clazz.getInheritedLevel = function(clazzTarget, clazzBase) {
	if (clazzTarget === clazzBase)
		return 0;
	var isTgtStr = (typeof clazzTarget == "string");
	if (isTgtStr && ("void" == clazzTarget || "unknown" == clazzTarget))
		return -1;
	var isBaseStr = (typeof clazzBase == "string");
	if (isBaseStr && ("void" == clazzBase || "unknown" == clazzBase))
		return -1;
	if (clazzTarget === (isTgtStr ? "NullObject" : NullObject)) {
		switch (clazzBase) {
    case "n":
    case "b":
      return -1;
		case Number:
		case Boolean:
		case NullObject:
			break;
		default:
			return 0;
		}
	}
	if (isTgtStr)
		clazzTarget = Clazz.evalType(clazzTarget);
	if (isBaseStr)
		clazzBase = Clazz.evalType(clazzBase);
	if (!clazzBase || !clazzTarget)
		return -1;
	var level = 0;
	var zzalc = clazzTarget; // zzalc <--> clazz
	while (zzalc !== clazzBase && level < 10) {
		if (zzalc.implementz) {
			var impls = zzalc.implementz;
			for (var i = 0; i < impls.length; i++) {
				var implsLevel = Clazz.equalsOrExtendsLevel (impls[i], clazzBase);
				if (implsLevel >= 0)
					return level + implsLevel + 1;
			}
		}
		zzalc = zzalc.superClazz;
		if (!zzalc)
			return (clazzBase === Object || clazzBase === Clazz._O ? 
				level + 1.5 // 1.5! Special!
			: -1);
		level++;
	}
	return level;
};


Clazz.allClasses = {};

Clazz.isClassDefined = Clazz.isDefinedClass = function(clazzName) {
	return (clazzName && Clazz._getDeclared(clazzName));
};

Clazz._setDeclared = function(name, func) {
  (name.indexOf(".") < 0) && (name = "java.lang." + name);
  Clazz.allClasses[name] = func;
}

Clazz._getDeclared = function(name) { 
  (name.indexOf(".") < 0) && (name = "java.lang." + name);
  return Clazz.allClasses[name] 
}

Clazz.instanceOf = function(obj, clazz) {
  if (obj == null)
	return false;
  if (typeof clazz == "string") {
	    clazz = Clazz._getDeclared(clazz);
  } 
  if (!clazz)
	return false;
  if (clazz == String)
	  return typeof obj == "string";

	return (obj != null && clazz && (obj == clazz || obj instanceof clazz || Clazz.getInheritedLevel(Clazz.getClassName(obj), clazz) >= 0));
};

Clazz.exceptionOf = function(e, clazz) {
	if(e.__CLASS_NAME__) {
	  if (typeof clazz == "string") {
		  var c = Clazz._getDeclared(clazz);
		  if (!c) return false;
		  clazz = c;
	  }
	  return Clazz.instanceOf(e, clazz);
	}
  if (!e.getMessage) {
    e.getMessage = function() {return "" + e + (e.stack ? "\n" + e.stack : "")};
  }
  if (!e.printStackTrace) {
   e.printStackTrace = function(){System.err.println("" + e)};
  }
  if(clazz == Error) {
	if (("" + e).indexOf("Error") < 0)
      return false;
	System.out.println (Clazz.getStackTrace());
    return true;
  }
  return (clazz == Exception || clazz == Throwable
		|| clazz == NullPointerException && _isNPEExceptionPredicate(e));
};



Clazz.superCall = function(objThis, clazzThis, funName, funParams) {
	var fx = null;
	var i = -1;
	var clazzFun = objThis[funName];
	if (clazzFun) {
		if (clazzFun.claxxOwner) { 
			if (clazzFun.claxxOwner !== clazzThis) {
				fx = clazzFun;
        
			}
		} else if (!clazzFun.stacks && !(clazzFun.lastClaxxRef
					&& clazzFun.lastClaxxRef.prototype[funName]
					&& clazzFun.lastClaxxRef.prototype[funName].stacks)) { // super.toString
			fx = clazzFun;
		} else { // normal wrapped method
			var stacks = clazzFun.stacks;
			if (!stacks)
				stacks = clazzFun.lastClaxxRef.prototype[funName].stacks;
			for (i = stacks.length; --i >= 0;) {
				if (clazzThis === stacks[i]) { // level == 0
					if (i > 0) {
						fx = stacks[--i].prototype[funName];
					} else {
						fx = stacks[0].prototype[funName]["\\unknown"];
					}
					break;
				} else if (Clazz.getInheritedLevel (clazzThis, stacks[i]) > 0) {
					fx = stacks[i].prototype[funName];
					break;
				}
			} // end of for loop
		} // end of normal wrapped method
	} // end of clazzFun
	if (!fx) {
		if (funName != "construct") {
			Clazz.alert (["j2slib","no class found",(funParams).typeString])
			newMethodNotFoundException(objThis, clazzThis, funName, 
					Clazz.getParamsType(funParams).typeString);	
		}
		return;
	}
	if (i == 0 && funName == "construct") {
		var ss = clazzFun.stacks;
		if (ss && !ss[0].superClazz && ss[0].con$truct)
			ss[0].con$truct.apply (objThis, []);
	}
	return fx.apply (objThis, funParams || []);
};

Clazz.superConstructor = function(objThis, clazzThis, funParams) {
	Clazz.superCall (objThis, clazzThis, "construct", funParams);
	if (clazzThis.con$truct) {
		clazzThis.con$truct.apply (objThis, []);
	}
};

Clazz.CastedNull = function(asClazz) {
	if (asClazz) {
		if (asClazz instanceof String) {
			this.clazzName = asClazz;
		} else if (asClazz instanceof Function) {
			this.clazzName = Clazz.getClassName (asClazz, true);
		} else {
			this.clazzName = "" + asClazz;
		}
	} else {
		this.clazzName = "Object";
	}
	this.toString = function(){
		return null;
	};
	this.valueOf = function(){
		return null;
	};
};

Clazz.castNullAs = function(asClazz) {
	return new Clazz.CastedNull (asClazz);
};


Clazz._initializingException = false;

Clazz._callingStackTraces = [];

var MethodException = function(){
	this.toString = function(){
		return "J2S MethodException";
	};
};

  var _isNPEExceptionPredicate;

;(function() { 
  var $$o$$ = null;
  
  try {
  	$$o$$.hello();
  } catch (e) {
    var _ex_reg = function(msg, spliterName, spliterRegex) {
    	if(!spliterRegex) 
    		spliterRegex="[^\\s]+";	
    	var idx = msg.indexOf (spliterName), 
    		str = msg.substring (0, idx) + spliterRegex + msg.substring(idx + spliterName.length), 
    		regexp = new RegExp("^"+str+"$");
    	return regexp;
    };
  	if(/Opera[\/\s](\d+\.\d+)/.test(navigator.userAgent)) {// opera throws an exception with fixed messages like "Statement on line 23: Cannot convert undefined or null to Object Backtrace: Line....long text... " 
  		var idx1 = e.message.indexOf(":"), idx2 = e.message.indexOf(":", idx1+2);
  		var _NPEMsgFragment = e.message.substr(idx1+1, idx2-idx1-20);
  		_isNPEExceptionPredicate = function(e) { return e.message.indexOf(_NPEMsgFragment)!=-1; };
  	}	else if(navigator.userAgent.toLowerCase().indexOf("webkit")!=-1) { //webkit, google chrome prints the property name accessed. 
  		var _exceptionNPERegExp = _ex_reg(e.message, "hello");
  		_isNPEExceptionPredicate = function(e) { return _exceptionNPERegExp.test(e.message); };
  	}	else {// ie, firefox and others print the name of the object accessed: 
  		var _exceptionNPERegExp = _ex_reg(e.message, "$$o$$");
  		_isNPEExceptionPredicate = function(e) { return _exceptionNPERegExp.test(e.message); };
  	}		
  };
})();

Clazz.getStackTrace = function(n) {
	n || (n = 25);
	var s = "\n";
	var c = arguments.callee;
  var showParams = (n < 0)
  if (showParams)
    n = -n;
 try {
  for (var i = 0; i < n; i++) {
    if (!(c = c.caller))
      break;
    var sig = (c.toString ? c.toString().substring(0, c.toString().indexOf("{")) : "<native method>");
		s += i + " " + (c.exName ? (c.claxxOwner ? c.claxxOwner.__CLASS_NAME__ + "."  : "") + c.exName  + sig.replace(/function /,""): sig) + "\n";
		if (c == c.caller) {
      s += "<recursing>\n";
      break;
    }
    if (showParams) {
      var args = c.arguments;
      for (var j = 0; j < args.length; j++) {
        var sa = "" + args[j];
        if (sa.length > 60)
          sa = sa.substring(0, 60) + "...";
        s += " args[" + j + "]=" + sa.replace(/\s+/g," ") + "\n";
      }
    }
  }
 }catch(e){}
	return s;
}


Clazz.makeConstructor = function(clazzThis, funBody, funParams) {
	Clazz.defineMethod (clazzThis, "construct", funBody, funParams);
	if (clazzThis.con$truct) {
		clazzThis.con$truct.index = clazzThis.con$truct.stacks.length;
	}
};

Clazz.overrideConstructor = function(clazzThis, funBody, funParams) {
	Clazz.overrideMethod (clazzThis, "construct", funBody, funParams);
	if (clazzThis.con$truct) {
		clazzThis.con$truct.index = clazzThis.con$truct.stacks.length;
	}
};


Clazz.defineMethod = function(clazzThis, funName, funBody, funParams) {
	funBody.exName = funName;
	var fpName = formatParameters(funParams);
	var proto = clazzThis.prototype;
	var f$ = proto[funName];
  if (Clazz._Loader._checkLoad)
    checkDuplicate(clazzThis, funName, fpName);
	if (!f$ || (f$.claxxOwner === clazzThis && f$.funParams == fpName)) {
		funBody.funParams = fpName; 
		funBody.claxxOwner = clazzThis;
		funBody.exClazz = clazzThis; // make it traceable
		return addProto(proto, funName, funBody);
	}
	var oldFun = null;
	var oldStacks = f$.stacks;
		if (!oldStacks) {
      oldStacks = [];
			oldFun = f$;
			if (f$.claxxOwner) {
				oldStacks[0] = oldFun.claxxOwner;
			}
		}
	if (!f$.stacks || f$.claxxReference !== clazzThis) {
    var id = ++SAEMid;
  	var delegate = function(){
  		return searchAndExecuteMethod(id, this, arguments.callee.claxxReference, arguments.callee.methodName, arguments);
  	};
  	delegate.methodName = funName;
  	delegate.claxxReference = clazzThis;
		f$ = addProto(proto, funName, delegate);				
		var arr = [];
		for (var i = 0; i < oldStacks.length; i++)
			arr[i] = oldStacks[i];
		f$.stacks = arr;
	}
	var ss = f$.stacks;
	if (findArrayItem(ss, clazzThis) < 0) ss.push(clazzThis);

	if (oldFun) {
		if (oldFun.claxxOwner === clazzThis) {
			f$[oldFun.funParams] = oldFun;
			oldFun.claxxOwner = null;
			oldFun.funParams = null; // null ? safe ? // safe for != null
		} else if (!oldFun.claxxOwner) {
			f$["\\unknown"] = oldFun;
		}
	}
	funBody.exClazz = clazzThis; // make it traceable
	f$[fpName] = funBody;
	return f$;
};                                                

duplicatedMethods = {};

var checkDuplicate = function(clazzThis, funName, fpName) {
	var proto = clazzThis.prototype;
	var f$ = proto[funName];
  if (f$ && (f$.claxxOwner || f$.claxxReference) === clazzThis) {
    key = clazzThis.__CLASS_NAME__ + "." + funName + fpName;
    var m = duplicatedMethods[key];
    if (m) {
      var s = "Warning! Duplicate method found for " + key;
      System.out.println(s);
      Clazz.alert(s);
      duplicatedMethods[key] = m + 1; 
    } else {
      duplicatedMethods[key] = 1;
    }
  }
}

Clazz.showDuplicates = function(quiet) {
  var s = "";
  var a = duplicatedMethods;
  var n = 0;
  for (var key in a)
    if (a[key] > 1) {
      s += a[key] + "\t" + key + "\n";
      n++;
    }
  s = "Duplicates: " + n + "\n\n" + s;
  System.out.println(s);
  if (!quiet)
    alert(s);
}

var findArrayItem = function(arr, item) {
	if (arr && item)
		for (var i = arr.length; --i >= 0;)
			if (arr[i] === item)
				return i;
	return -1;
}

var removeArrayItem = function(arr, item) {
	var i = findArrayItem(arr, item);
	if (i >= 0) {
		var n = arr.length - 1;
		for (; i < n; i++)
			arr[i] = arr[i + 1];
		arr.length--;
		return true;
	}
}

var formatParameters = function(funParams) {
	return (funParams ? funParams.replace (/~([NABSO])/g, 
      function($0, $1) {
      	switch ($1) {
      	case 'N':
      		return "n";
      	case 'B':
      		return "b";
      	case 'S':
      		return "String";
      	case 'O':
      		return "Object";
      	case 'A':
      		return "Array";
      	}
      	return "Unknown";
      }).replace (/\s+/g, "").replace (/^|,/g, "\\").replace (/\$/g, "org.eclipse.s") : "\\void");
};

Clazz.overrideMethod = function(clazzThis, funName, funBody, funParams) {
	funBody.exName = funName;
	var fpName = formatParameters(funParams);
  if (Clazz._Loader._checkLoad)
    checkDuplicate(clazzThis, funName, fpName);
	funBody.funParams = fpName; 
	funBody.claxxOwner = clazzThis;
	return addProto(clazzThis.prototype, funName, funBody);
};



  var __signatures = ""; 

Clazz.getProfile = function() {
  	var s = "";
	if (_profile) {
		var l = [];
		for (var i in _profile) {
			var n = "" + _profile[i];
			l.push("        ".substring(n.length) + n + "\t" + i);
		}
		s = l.sort().reverse().join("\r\n");
		_profile = {};
	}
	return s; //+ __signatures;
}

var addProfile = function(c, f, p, id) {
	var s = c.__CLASS_NAME__ + " " + f + " ";// + JSON.stringify(p);
  if (__signatures.indexOf(s) < 0)
    __signatures += s + "\n";    
	_profile[s] || (_profile[s] = 0);
	_profile[s]++;
}

Clazz.getParamsType = function(funParams) {
	var n = funParams.length;
	switch (n) {
	case 0:
		var params = ["void"];
		params.typeString = "\\void";
		return params;
	case 1:
    switch (typeof obj) {
    case "number":
			var params = ["n"];
			params.typeString = "\\n";
			return params;
    case "boolean":
			var params = ["b"];
			params.typeString = "\\b";
			return params;
		}
	}

	var params = [];
	params.hasCastedNull = false;
	if (funParams) {
		for (var i = 0; i < n; i++) {
			params[i] = Clazz.getClassName (funParams[i]);
			if (funParams[i] instanceof Clazz.CastedNull) {
				params.hasCastedNull = true;
			}
		}
	}
	params.typeString = "\\" + params.join ('\\');
	return params;
};

var SAEMid = 0;



var searchAndExecuteMethod = function(id, objThis, claxxRef, fxName, args, _saem) {



	fx = objThis[fxName];
	var params = Clazz.getParamsType(args);


 

  if (!fx)    
    try {System.out.println(Clazz.getStackTrace(5))} catch (e){}
	_profile && addProfile(claxxRef, fxName, params, id);
	if (fx.lastParams == params.typeString && fx.lastClaxxRef === claxxRef) {
		var methodParams;
		if (params.hasCastedNull) {
			methodParams = [];
			for (var k = 0; k < args.length; k++)
				methodParams[k] = (args[k] instanceof Clazz.CastedNull ? null : args[k]);
		} else {
			methodParams = args;
		}
		return (fx.lastMethod ? fx.lastMethod.apply(objThis, methodParams) : null);
	}
	fx.lastParams = params.typeString;
	fx.lastClaxxRef = claxxRef;

	var stacks = fx.stacks;
	if (!stacks)
		stacks = claxxRef.prototype[fxName].stacks;
	var length = stacks.length;

	var began = false; // began to search its super classes
	for (var i = length; --i >= 0;) {
		if (began || stacks[i] === claxxRef) {
			var clazzFun = stacks[i].prototype[fxName];
			var ret = tryToSearchAndExecute(id, fxName, objThis, clazzFun, params,
					args, fx);
			if (!(ret instanceof MethodException)) {
				return ret;
			}
			began = true; 
		} // end of if
	} // end of for
	if ("construct" == fxName) {
		return;
	}
	newMethodNotFoundException(objThis, claxxRef, 
			fxName, params.typeString);
};


var tryToSearchAndExecute = function(id, fxName, objThis, clazzFun, params, args, fx, _ttsaem) {
	var method = [];
	var generic = true;
	for (var fn in clazzFun) {
		if (fn.charCodeAt(0) == 92) { // 92 == '\\'.charCodeAt (0)
			var ps = fn.substring(1).split("\\");
			(ps.length == params.length) && method.push(ps);
  		generic = false;
			continue;
		}
		if (generic && fn == "funParams" && clazzFun.funParams) {
			fn = clazzFun.funParams;
			var ps = fn.substring(1).split ("\\");
			(ps.length == params.length) && (method[0] = ps);
			break;
		}
	}
  var debug = false;//(method.length > 1 && method.join().indexOf("Listen")< 0 && params.join().indexOf("Null") >= 0)
  if (debug)alert(fxName + " -- " + method.join("|") + " -- searching for method with " + params)
  if (method.length == 0 || !(method = searchMethod(method, params, debug)))
	  return new MethodException();
  if (debug) alert("OK: \\" + method)
	var f = (generic ? clazzFun : clazzFun["\\" + method]);
	var methodParams = null;
	if (params.hasCastedNull) {
		methodParams = [];
		for (var k = 0; k < args.length; k++) {
			if (args[k] instanceof Clazz.CastedNull) {
				methodParams[k] = null;
			} else {
				methodParams[k] = args[k];
			}
		}
	} else {
		methodParams = args;
	}
	fx.lastMethod = f;
	return f.apply(objThis, methodParams);
};

var searchMethod = function(roundOne, paramTypes, debug) {

	var roundTwo = [];
	var len = roundOne.length;
	for (var i = 0; i < len; i++) {
		var fittedLevel = [];
		var isFitted = true;
		var len2 = roundOne[i].length;
		for (var j = 0; j < len2; j++) {
    
			fittedLevel[j] = Clazz.getInheritedLevel (paramTypes[j], 
					roundOne[i][j]);
			if (fittedLevel[j] < 0) {
				isFitted = false;
				break;
			}
		}
		if (isFitted) {
			fittedLevel[paramTypes.length] = i; // Keep index for later use
			roundTwo.push(fittedLevel);
		}
	}
	if (roundTwo.length == 0)
		return null;
	var resultTwo = roundTwo;
	var min = resultTwo[0];
	for (var i = 1; i < resultTwo.length; i++) {
		var isVectorLesser = true;
		for (var j = 0; j < paramTypes.length; j++) {
			if (min[j] < resultTwo[i][j]) {
				isVectorLesser = false;;
				break;
			}
		}
		if (isVectorLesser)
			min = resultTwo[i];
	}
	var index = min[paramTypes.length]; // Get the previously stored index
	return roundOne[index].join ('\\');
};


Clazz.allPackage = {};

Clazz.lastPackageName = null;
Clazz.lastPackage = null;

Clazz.unloadedClasses = [];

Clazz.declarePackage = function(pkgName) {
	if (Clazz.lastPackageName == pkgName)
		return Clazz.lastPackage;
	if (pkgName && pkgName.length) {
		var pkgFrags = pkgName.split (/\./);
		var pkg = Clazz.allPackage;
		for (var i = 0; i < pkgFrags.length; i++) {
			if (!pkg[pkgFrags[i]]) {
				pkg[pkgFrags[i]] = { 
					__PKG_NAME__ : (pkg.__PKG_NAME__ ? 
						pkg.__PKG_NAME__ + "." + pkgFrags[i] : pkgFrags[i])
				}; 
				if (i == 0) {
					Clazz.setGlobal(pkgFrags[i], pkg[pkgFrags[i]]);
				}
			}
			pkg = pkg[pkgFrags[i]]
		}
		Clazz.lastPackageName = pkgName;
		Clazz.lastPackage = pkg;
		return pkg;
	}
};

Clazz.evalType = function(typeStr, isQualified) {
	var idx = typeStr.lastIndexOf(".");
	if (idx != -1) {
		var pkgName = typeStr.substring (0, idx);
		var pkg = Clazz.declarePackage (pkgName);
		var clazzName = typeStr.substring (idx + 1);
		return pkg[clazzName];
	} 
	if (isQualified)
		return window[typeStr];
	switch (typeStr) {
	case "string":
		return String;
	case "number":
		return Number;
  case "object":
		return Clazz._O;
	case "boolean":
		return Boolean;
	case "function":
		return Function;
  case "void":
  case "undefined":
  case "unknown":
		return typeStr;
	case "NullObject":
		return NullObject;
	default:
		return window[typeStr];
	}
};

Clazz.defineType = function(qClazzName, clazzFun, clazzParent, interfacez) {
	var cf = Clazz.unloadedClasses[qClazzName];
	if (cf) {
		clazzFun = cf;
	}
	var idx = qClazzName.lastIndexOf (".");
	if (idx != -1) {
		var pkgName = qClazzName.substring (0, idx);
		var pkg = Clazz.declarePackage (pkgName);
		var clazzName = qClazzName.substring (idx + 1);
		if (pkg[clazzName]) {
			return pkg[clazzName];
		}
		pkg[clazzName] = clazzFun;
	} else {
		if (window[qClazzName]) {
			return window[qClazzName];
		}
		Clazz.setGlobal(qClazzName, clazzFun);
	}
	Clazz.decorateAsType(clazzFun, qClazzName, clazzParent, interfacez);
	var iFun = Clazz._innerFunctions;
	clazzFun.defineMethod = iFun.defineMethod;
	clazzFun.defineStaticMethod = iFun.defineStaticMethod;
	clazzFun.makeConstructor = iFun.makeConstructor;
	return clazzFun;
};

var isSafari = (navigator.userAgent.indexOf ("Safari") != -1);
var isSafari4Plus = false;
if (isSafari) {
	var ua = navigator.userAgent;
	var verIdx = ua.indexOf("Version/");
	if (verIdx  != -1) {
		var verStr = ua.substring(verIdx + 8);
		var verNumber = parseFloat(verStr);
		isSafari4Plus = verNumber >= 4.0;
	}
}

Clazz.instantialize = function(objThis, args) {


	if (args && args.length == 1 && args[0] 
			&& args[0] instanceof args4InheritClass) {
		return;
	}
	if (objThis instanceof Number) {
		objThis.valueOf = function(){
			return this;
		};
	}
	if (isSafari4Plus) { // Fix bug of Safari 4.0+'s over-optimization
		var argsClone = [];
		for (var k = 0; k < args.length; k++) {
			argsClone[k] = args[k];
		}
		args = argsClone;
	}

	var c = objThis.construct; // the actual constructor Xxx() {...}
	if (c) {
		if (!objThis.con$truct) { // no need to init fields
			c.apply (objThis, args);
		} else if (!objThis.getClass().superClazz) { // the base class
			objThis.con$truct.apply (objThis, []);
			c.apply (objThis, args);
		} else if ((c.claxxOwner 
				&& c.claxxOwner === objThis.getClass())
				|| (c.stacks 
				&& c.stacks[c.stacks.length - 1] == objThis.getClass())) {
			c.apply (objThis, args);
		} else { // constructor is a super constructor
			if (c.claxxOwner && !c.claxxOwner.superClazz 
						&& c.claxxOwner.con$truct) {
				c.claxxOwner.con$truct.apply (objThis, []);
			} else if (c.stacks && c.stacks.length == 1
					&& !c.stacks[0].superClazz) {
				c.stacks[0].con$truct.apply (objThis, []);
			}
			c.apply (objThis, args);
			objThis.con$truct.apply (objThis, []);
		}
	} else if (objThis.con$truct) {
		objThis.con$truct.apply (objThis, []);
	}
};

Clazz.innerFunctionNames = [
	"isInstance", "equals", "hashCode", /*"toString",*/ "getName", "getCanonicalName", "getClassLoader", "getResource", "getResourceAsStream" /*# {$no.javascript.support} >>x #*/, "defineMethod", "defineStaticMethod",
	"makeConstructor" /*# x<< #*/
];

Clazz._innerFunctions = {
   
  isInstance: function(c) {
    return Clazz.instanceOf(c, this);
  },
  
	equals : function(aFun) {
		return this === aFun;
	},

	hashCode : function(){
		return this.getName().hashCode();
	},

	toString : function(){
		return "class " + this.getName();
	},

	getName : function(){
		return Clazz.getClassName (this, true);
	},
	getCanonicalName : function(){
		return this.__CLASS_NAME__;
	},
	getClassLoader : function(){
		var clazzName = this.__CLASS_NAME__;
		var baseFolder = Clazz._Loader.getClasspathFor(clazzName);
		var x = baseFolder.lastIndexOf (clazzName.replace (/\./g, "/"));
		if (x != -1) {
			baseFolder = baseFolder.substring (0, x);
		} else {
			baseFolder = Clazz._Loader.getClasspathFor(clazzName, true);
		}
		var loader = Clazz._Loader.requireLoaderByBase(baseFolder);
		loader.getResourceAsStream = Clazz._innerFunctions.getResourceAsStream;
		loader.getResource = Clazz._innerFunctions.getResource; // BH
		return loader;
	},

	getResource : function(name) {
		var stream = this.getResourceAsStream(name);
    return (stream ? stream.url : null);
	},

	getResourceAsStream : function(name) {
		if (!name)
			return null;
		name = name.replace (/\\/g, '/');
		var baseFolder = null;
    var fname = name;
		var clazzName = this.__CLASS_NAME__;
		if (arguments.length == 2 && name.indexOf ('/') != 0) { // additional argument
			name = "/" + name;
		}
		if (name.indexOf ('/') == 0) {
			if (arguments.length == 2) { // additional argument
				baseFolder = arguments[1];
				if (!baseFolder)
					baseFolder = Clazz.binaryFolders[0];
			} else if (Clazz._Loader) {
				baseFolder = Clazz._Loader.getClasspathFor(clazzName, true);
			}
			if (!baseFolder) {
				fname = name.substring (1);
			} else {
				baseFolder = baseFolder.replace (/\\/g, '/');
				var length = baseFolder.length;
				var lastChar = baseFolder.charAt (length - 1);
				if (lastChar != '/') {
					baseFolder += "/";
				}
				fname = baseFolder + name.substring (1);
			}
		} else {
			if (this.base) {
				baseFolder = this.base;
			} else if (Clazz._Loader) {
				baseFolder = Clazz._Loader.getClasspathFor(clazzName);
				var x = baseFolder.lastIndexOf (clazzName.replace (/\./g, "/"));
				if (x != -1) {
					baseFolder = baseFolder.substring (0, x);
				} else {
					var y = -1;
					if (baseFolder.indexOf (".z.js") == baseFolder.length - 5
							&& (y = baseFolder.lastIndexOf ("/")) != -1) {
						baseFolder = baseFolder.substring (0, y + 1);
						var pkgs = clazzName.split (/\./);
						for (var k = 1; k < pkgs.length; k++) {
							var pkgURL = "/";
							for (var j = 0; j < k; j++) {
								pkgURL += pkgs[j] + "/";
							}
							if (pkgURL.length > baseFolder.length) {
								break;
							}
							if (baseFolder.indexOf (pkgURL) == baseFolder.length - pkgURL.length) {
								baseFolder = baseFolder.substring (0, baseFolder.length - pkgURL.length + 1);
								break;
							}
						}
					} else {
						baseFolder = Clazz._Loader.getClasspathFor(clazzName, true);
					}
				}
			} else {
				var bins = Clazz.binaryFolders;
				if (bins && bins.length) {
					baseFolder = bins[0];
				}
			}
			if (!baseFolder)
				baseFolder = "j2s/";
			baseFolder = baseFolder.replace (/\\/g, '/');
			var length = baseFolder.length;
			var lastChar = baseFolder.charAt (length - 1);
			if (lastChar != '/') {
				baseFolder += "/";
			}
			if (this.base) {
				fname = baseFolder + name;
			} else {
				var idx = clazzName.lastIndexOf ('.');
				if (idx == -1 || this.base) {
					fname = baseFolder + name;
				} else {
					fname = baseFolder + clazzName.substring (0, idx)
							.replace (/\./g, '/') +  "/" + name;
				}
			}            
		}
    var url = null;
    try {
      if (fname.indexOf(":/") < 0) {
        var d = document.location.href.split("?")[0].split("/");
        d[d.length - 1] = fname;
        fname = d.join("/");
      }
      url = new java.net.URL(fname);
    } catch (e) {
    }
		var data = (url == null ? null : Jmol._getFileData(fname.toString()));
    if (!data || data == "error" || data.indexOf("[Exception") == 0)
      return null;
    var bytes = new java.lang.String(data).getBytes();      
    var is = new java.io.BufferedInputStream ( new java.io.ByteArrayInputStream (bytes)); 
    is.url = url;
		return is;
	}/*# {$no.javascript.support} >>x #*/,

	defineMethod : function(methodName, funBody, paramTypes) {
		Clazz.defineMethod (this, methodName, funBody, paramTypes);
	},

	defineStaticMethod : function(methodName, funBody, paramTypes) {
		Clazz.defineMethod (this, methodName, funBody, paramTypes);
		this[methodName] = this.prototype[methodName];
	},

	makeConstructor : function(funBody, paramTypes) {
		Clazz.makeConstructor (this, funBody, paramTypes);
	}
};


var cStack = [];

  
Clazz.pu$h = function(c) {
  c || (c = self.c$); // old style
	c && cStack.push(c);
};

Clazz.p0p = function(){
	return cStack.pop();
};

Clazz.decorateAsClass = function(clazzFun, prefix, name, clazzParent, 
		interfacez, parentClazzInstance, _decorateAsClass) {
    
	var prefixName = null;
	if (prefix) {
		prefixName = prefix.__PKG_NAME__;
		if (!prefixName)
			prefixName = prefix.__CLASS_NAME__;      
	}
	var qName = (prefixName ? prefixName + "." : "") + name;
  
    if (Clazz._Loader._classPending[qName]) {
      delete Clazz._Loader._classPending[qName];
      Clazz._Loader._classCountOK++;
      Clazz._Loader._classCountPending--;
    }
  if (Clazz._Loader && Clazz._Loader._checkLoad) {
    System.out.println("decorating class " + prefixName + "." + name);
  }
	var cf = Clazz.unloadedClasses[qName];
	if (cf) {
		clazzFun = cf;
	}
	var qName = null;
	decorateFunction(clazzFun, prefix, name);
	if (parentClazzInstance) {
		Clazz.inheritClass (clazzFun, clazzParent, parentClazzInstance);
	} else if (clazzParent) {
		Clazz.inheritClass (clazzFun, clazzParent);
	}
	if (interfacez) {
		Clazz.implementOf (clazzFun, interfacez);
	}
	return clazzFun;
};

var decorateFunction = function(clazzFun, prefix, name, interfacez) {
	var qName;
	if (!prefix) {
		qName = name;
		Clazz.setGlobal(name, clazzFun);
	} else if (prefix.__PKG_NAME__) {
		qName = prefix.__PKG_NAME__ + "." + name;
		prefix[name] = clazzFun;
		if (prefix === java.lang)
			Clazz.setGlobal(name, clazzFun);
	} else {
		qName = prefix.__CLASS_NAME__ + "." + name;
		prefix[name] = clazzFun;
	}
	Clazz.extendJO(clazzFun, qName);
	var inF = Clazz.innerFunctionNames;
	for (var i = 0; i < inF.length; i++) {
		clazzFun[inF[i]] = Clazz._innerFunctions[inF[i]];
	}
	interfacez && Clazz.implementOf(clazzFun, interfacez);
	Clazz._Loader && Clazz._Loader.updateNodeForFunctionDecoration(qName);
	return clazzFun;
};

Clazz.declareInterface = function(prefix, name, interfacez, _declareInterface) {
	return decorateFunction(function(){}, prefix, name, interfacez);
};

Clazz.declareType = function(prefix, name, clazzParent, interfacez, 
		parentClazzInstance, _declareType) {
	return Clazz.decorateAsClass (function(){
		Clazz.instantialize (this, arguments);
	}, prefix, name, clazzParent, interfacez, 
			parentClazzInstance);
};

Clazz.declareAnonymous = function(prefix, name, clazzParent, interfacez, 
		parentClazzInstance, _declareAnonymous) {
	return Clazz.decorateAsClass (function(){
		Clazz.prepareCallback(this, arguments);
		Clazz.instantialize (this, arguments);
	}, prefix, name, clazzParent, interfacez, 
			parentClazzInstance);
};

Clazz.decorateAsType = function(clazzFun, qClazzName, clazzParent, 
		interfacez, parentClazzInstance, inheritClazzFuns, _decorateAsType) {
	Clazz.extendJO(clazzFun, qClazzName);
	clazzFun.equals = Clazz._innerFunctions.equals;
	clazzFun.getName = Clazz._innerFunctions.getName;
	if (inheritClazzFuns) {
		for (var i = 0; i < Clazz.innerFunctionNames.length; i++) {
			var methodName = Clazz.innerFunctionNames[i];
			clazzFun[methodName] = Clazz._innerFunctions[methodName];
		}
	}
	if (parentClazzInstance) {
		Clazz.inheritClass (clazzFun, clazzParent, parentClazzInstance);
	} else if (clazzParent) {
		Clazz.inheritClass (clazzFun, clazzParent);
	}
	interfacez && Clazz.implementOf(clazzFun, interfacez);
	return clazzFun;
};



Number.prototype._numberToString=Number.prototype.toString;


Clazz.declarePackage ("java.io");
Clazz.declarePackage ("java.lang.reflect"); // java.lang
Clazz.declarePackage ("java.lang.ref");  // java.lang.ref
java.lang.ref.reflect = java.lang.reflect;
Clazz.declarePackage ("java.util");
Clazz.declarePackage ("java.security");


Clazz.declareInterface (java.io,"Closeable");
Clazz.declareInterface (java.io,"DataInput");
Clazz.declareInterface (java.io,"DataOutput");
Clazz.declareInterface (java.io,"Externalizable");
Clazz.declareInterface (java.io,"Flushable");
Clazz.declareInterface (java.io,"Serializable");
Clazz.declareInterface (java.lang,"Appendable");
Clazz.declareInterface (java.lang,"AutoCloseable");// BH 2023.11.19
Clazz.declareInterface (java.lang,"CharSequence");
Clazz.declareInterface (java.lang,"Cloneable");
Clazz.declareInterface (java.lang,"Comparable");
Clazz.declareInterface (java.lang,"Iterable");
Clazz.declareInterface (java.lang,"Runnable");
Clazz.declareInterface (java.util,"Comparator");

java.lang.ClassLoader = {
	__CLASS_NAME__ : "ClassLoader"
};


 
var newMethodNotFoundException = function(obj, clazz, method, params) {
	var paramStr = "";
	if (params) {
		paramStr = params.substring (1).replace (/\\/g, ",");
	}
	var leadingStr = "";
	if (method && method != "construct") {
		leadingStr = "Method";
	} else {
		leadingStr = "Constructor";
	}
	var message = leadingStr + " " + Clazz.getClassName (clazz, true) + "." 
					+ method + "(" + paramStr + ") is not found!";
  throw new java.lang.NoSuchMethodException(message);        
};

Clazz.prepareCallback = function(innerObj, args) {
	var outerObj = args[0];
	var cbName = "b$"; // "callbacks";
	if (innerObj && outerObj && outerObj !== window) {
		var className = Clazz.getClassName(outerObj, true);		
		var obs = {};
		if (innerObj[cbName]) // must make a copy!
			for (var s in innerObj[cbName])
				obs[s] = innerObj[cbName][s];
		innerObj[cbName] = obs;
		obs[className] = outerObj;
		var clazz = Clazz.getClass(outerObj);
		while (clazz.superClazz) {
			clazz = clazz.superClazz;
			obs[Clazz.getClassName(clazz, true)] = outerObj;
		}
		var cbs = outerObj[cbName];
		if (cbs)
			for (var s in cbs)
				obs[s] = cbs[s];
	}
	for (var i = 0; i < args.length - 1; i++)
		args[i] = args[i + 1];
  if (args.length > 0)
  	args.length--;
};

Clazz.innerTypeInstance = function(clazzInner, innerObj, finalVars) {
	if (!clazzInner)
		clazzInner = arguments.callee.caller;
	var obj;
	if (finalVars || innerObj.$finals) {
			obj = new clazzInner(innerObj, Clazz.inheritArgs);
		if (finalVars) {
			if (innerObj.f$) {
				var o = {};
				for (var attr in innerObj.f$)
					o[attr] = innerObj.f$[attr];
				for (var attr in finalVars)
					o[attr] = finalVars[attr];
				obj.f$ = o;
			} else {
				obj.f$ = finalVars;
			}
		} else if (innerObj.f$) {
			obj.f$ = innerObj.f$;
		}
	} else {
		switch (arguments.length) {
		case 3:
			return new clazzInner(innerObj);
		case 4:
			return (innerObj.__CLASS_NAME__ == clazzInner.__CLASS_NAME__
					&& arguments[3] === Clazz.inheritArgs ? innerObj : new clazzInner(innerObj, arguments[3]));
		case 5:
			return new clazzInner(innerObj, arguments[3], arguments[4]);
		case 6:
			return new clazzInner(innerObj, arguments[3], arguments[4], 
					arguments[5]);
		case 7:
			return new clazzInner(innerObj, arguments[3], arguments[4], 
					arguments[5], arguments[6]);
		case 8:
			return new clazzInner(innerObj, arguments[3], arguments[4], 
					arguments[5], arguments[6], arguments[7]);
		case 9:
			return new clazzInner(innerObj, arguments[3], arguments[4], 
					arguments[5], arguments[6], arguments[7], arguments[8]);
		case 10:
			return new clazzInner(innerObj, arguments[3], arguments[4], 
					arguments[5], arguments[6], arguments[7], arguments[8],
					arguments[9]);
		default:
			obj = new clazzInner(innerObj, Clazz.inheritArgs);
			break;
		}
	}
	var n = arguments.length - 3;
	var args = new Array(n);
	for (var i = n; --i >= 0;)
		args[i] = arguments[i + 3];
	Clazz.instantialize(obj, args);
	return obj;
};

Clazz.cloneFinals = function(){
	var o = {};
	var len = arguments.length / 2;
	for (var i = len; --i >= 0;)
		o[arguments[i + i]] = arguments[i + i + 1];
	return o;
};

Clazz.defineEnumConstant = function(clazzEnum, enumName, enumOrdinal, initialParams, clazzEnumExt) {
	var o = (clazzEnumExt ? new clazzEnumExt() : new clazzEnum());
	if (initialParams && initialParams.length) {
		o.constructor.apply (o, initialParams);
	}
		o.$name = enumName;
		o.$ordinal = enumOrdinal;
	clazzEnum[enumName] = o;
	clazzEnum.prototype[enumName] = o;
	if (!clazzEnum["$ values"]) {         // BH added
		clazzEnum["$ values"] = []          // BH added
		clazzEnum.values = function() {     // BH added
			return this["$ values"];          // BH added
		};                                  // BH added
	}
	clazzEnum["$ values"].push(o);
	return o;
};


Clazz.floatToInt = function(x) {
	return isNaN(x) ? 0 : x < 0 ? Math.ceil(x) : Math.floor(x);
};

Clazz.floatToByte = Clazz.floatToShort = Clazz.floatToLong = Clazz.floatToInt;
Clazz.doubleToByte = Clazz.doubleToShort = Clazz.doubleToLong = Clazz.doubleToInt = Clazz.floatToInt;

Clazz.floatToChar = function(x) {
	return String.fromCharCode (x < 0 ? Math.ceil(x) : Math.floor(x));
};

Clazz.doubleToChar = Clazz.floatToChar;




var getArrayType = function(n, nbits) {
		if (!n) n = 0;
    if (typeof n == "object") {
      var b = n;
    } else {
  		var b = new Array(n);
	   	for (var i = 0; i < n; i++)b[i] = 0
    }
    b.BYTES_PER_ELEMENT = nbits >> 3;
    b._fake = true;    
		return b;
} 

var arraySlice = function(istart, iend) {
  istart || (istart = 0);
  iend || (iend = this.length);
  if (this._fake) {    
    var b = new this.constructor(iend - istart); 
    System.arraycopy(this, istart, b, 0, iend - istart); 
    return b; 
  }
  return new this.constructor(this.buffer.slice(istart * this.BYTES_PER_ELEMENT, iend * this.BYTES_PER_ELEMENT));
};
      
if ((Clazz.haveInt32 = !!(self.Int32Array && self.Int32Array != Array)) == true) {
	if (!Int32Array.prototype.sort)
		Int32Array.prototype.sort = Array.prototype.sort
} else {
	Int32Array = function(n) { return getArrayType(n, 32); };
	Int32Array.prototype.sort = Array.prototype.sort
  Int32Array.prototype.toString = function(){return "[object Int32Array]"};
}
if (!Int32Array.prototype.slice)
  Int32Array.prototype.slice = function() {return arraySlice.apply(this, arguments)};
Int32Array.prototype.clone = function() { var a = this.slice(); a.BYTES_PER_ELEMENT = 4; return a; };

if ((Clazz.haveFloat64 = !!(self.Float64Array && self.Float64Array != Array)) == true) {
	if (!Float64Array.prototype.sort)
		Float64Array.prototype.sort = Array.prototype.sort
} else {
	Float64Array = function(n) { return getArrayType(n, 64); };
	Float64Array.prototype.sort = Array.prototype.sort
	Float64Array.prototype.toString = function() {return "[object Float64Array]"};
}
if (!Float64Array.prototype.slice)
  Float64Array.prototype.slice = function() {return arraySlice.apply(this, arguments)};
Float64Array.prototype.clone =  function() { return this.slice(); };

Clazz.newArray = function(a, b, c, d) {
  if (a != -1 || arguments.length == 2) { 
    return newTypedArray(arguments, 0);
  }
  a = b.slice(c, d);
  a.BYTES_PER_ELEMENT = b.BYTES_PER_ELEMENT;
  return a;
};


var newTypedArray = function(args, nBits) {
	var dim = args[0];
	if (typeof dim == "string")
		dim = dim.charCodeAt(0); // char
	var last = args.length - 1;
	var val = args[last];
  if (last > 1) {
    var xargs = new Array(last); // 2 in this case
    for (var i = 0; i < last; i++)
    	xargs[i] = args[i + 1];
    var arr = new Array(dim);
  	for (var i = 0; i < dim; i++)
  		arr[i] = newTypedArray(xargs, nBits); // Call recursively
    return arr;
  }
  if (nBits > 0 && dim < 0)
    dim = val; // because we can initialize an array using new Int32Array([...])
  switch (nBits) {
  case 8:
  	var arr = new Int8Array(dim);
    arr.BYTES_PER_ELEMENT = 1;
    return arr;
  case 32:
  	var arr = new Int32Array(dim);
    arr.BYTES_PER_ELEMENT = 4;
    return arr;
  case 64:
    var arr = new Float64Array(dim);
    arr.BYTES_PER_ELEMENT = 8;
    return arr;
  default:
  	var arr = (dim < 0 ? val : new Array(dim));
    arr.BYTES_PER_ELEMENT = 0;
    if (dim > 0 && val != null)
    	for (var i = dim; --i >= 0;)
     		arr[i] = val;
    return arr;
  }
}

Clazz.newByteArray  = function(){
	return newTypedArray(arguments, 8);
}

Clazz.newIntArray  = function(){
	return newTypedArray(arguments, 32);
}

Clazz.newFloatArray  = function(){
	return newTypedArray(arguments, 64);
}

Clazz.newDoubleArray = Clazz.newFloatArray;
Clazz.newLongArray = Clazz.newShortArray = Clazz.newIntArray;
Clazz.newCharArray = Clazz.newBooleanArray = Clazz.newArray;
if ((Clazz.haveInt8 = !!self.Int8Array) == true) {
	if (!Int8Array.prototype.sort)
		Int8Array.prototype.sort = Array.prototype.sort
  if (!Int8Array.prototype.slice)
    Int8Array.prototype.slice = function() {return arraySlice.apply(this, arguments)}; 
} else {
  Clazz.newByteArray = Clazz.newIntArray;
}
Int8Array.prototype.clone = function() { var a = this.slice(); a.BYTES_PER_ELEMENT = 1;return a; };

Clazz.isAB = function(a) {
	return (a && typeof a == "object" && a.BYTES_PER_ELEMENT == 1);
}
Clazz.isAI = function(a) {
	return (a && typeof a == "object" && a.BYTES_PER_ELEMENT == 4);
}

Clazz.isAF = function(a) {
	return (a && typeof a == "object" && a.BYTES_PER_ELEMENT == 8);
}

Clazz.isAS = function(a) { // just checking first parameter
	return (a && typeof a == "object" && a.constructor == Array && (typeof a[0] == "string" || typeof a[0] == "undefined"));
}

Clazz.isAII = function(a) { // assumes non-null a[0]
	return (a && typeof a == "object" && Clazz.isAI(a[0]));
}

Clazz.isAFF = function(a) { // assumes non-null a[0]
	return (a && typeof a == "object" && Clazz.isAF(a[0]));
}

Clazz.isAFFF = function(a) { // assumes non-null a[0]
	return (a && typeof a == "object" && Clazz.isAFF(a[0]));
}

Clazz.isASS = function(a) {
	return (a && typeof a == "object" && Clazz.isAS(a[0]));
}

Clazz.isAFloat = function(a) { // just checking first parameter
	return (a && typeof a == "object" && a.constructor == Array && Clazz.instanceOf(a[0], Float));
}

Clazz.isAP = function(a) {
	return (a && Clazz.getClassName(a[0]) == "JU.P3");
}

Clazz.prepareFields = function(clazz, fieldsFun) {
	var stacks = [];
	if (clazz.con$truct) {
		var ss = clazz.con$truct.stacks;
		var idx = 0;//clazz.con$truct.index;
		for (var i = idx; i < ss.length; i++) {
			stacks[i] = ss[i];
		}
	}
	addProto(clazz.prototype, "con$truct", clazz.con$truct = function(){
		var stacks = arguments.callee.stacks;
		if (stacks) {
			for (var i = 0; i < stacks.length; i++) {
				stacks[i].apply (this, []);
			}
		}
	});
	stacks.push(fieldsFun);
	clazz.con$truct.stacks = stacks;
	clazz.con$truct.index = 0;
};
Clazz.checkPrivateMethod = function(){
  me = arguments.callee.caller;
  caller = arguments.callee.caller.caller;
  var stack = me.stacks;
  var mySig = "\\" + Clazz.getParamsType(arguments[0]).join("\\")
  if (!me.privateNote) {
    me.privateNote = "You are seeing this note because the method " 
    + me.exName + mySig + " in class " 
    + me.exClazz.__CLASS_NAME__
    + " has a superclass method by the same name (possibly with the same parameters) that is private and "
    + " therefore might be called improperly from this class. If your "
    + " code does not run properly, or you want to make it run faster, change the name of this method to something else."
    System.out.println(me.privateNote);
    alert(me.privateNote);
  }
	return null;
};

java.lang.Object = Clazz._O;

Clazz._O.getName = Clazz._innerFunctions.getName;

java.lang.System = System = {
	props : null, //new java.util.Properties(),
	$props : {},
	arraycopy : function(src, srcPos, dest, destPos, length) {  
		if (src !== dest || srcPos > destPos) {
			for (var i = length; --i >= 0;)
				dest[destPos++] = src[srcPos++];
		} else {
      destPos += length;
      srcPos += length;
			for (var i = length; --i >= 0;)
				src[--destPos] = src[--srcPos];
		}
	},
	currentTimeMillis : function(){
		return new Date().getTime();
	},
	gc : function() {}, // bh
	getProperties : function(){
		return System.props;
	},
	getProperty : function(key, def) {
		if (System.props)
			return System.props.getProperty (key, def);
		var v = System.$props[key];
    if (typeof v != "undefined")
      return v;
    if (key.indexOf(".") > 0) {
      v = null;    
      switch (key) {
      case "java.version":
        v = "1.6";
      case "file.separator":
      case "path.separator":
        v = "/";
        break;        
      case "line.separator":
        v = (navigator.userAgent.indexOf("Windows") >= 0 ? "\r\n" : "\n");
        break;
      case "os.name":
      case "os.version":
        v = navigator.userAgent;
        break;
      }
      if (v)
        return System.$props[key] = v;
    }
    return (arguments.length == 1 ? null : def == null ? key : def); // BH
	},
	getSecurityManager : function() { return null },  // bh
	setProperties : function(props) {
		System.props = props;
	},
  lineSeparator : function() { return '\n' }, // bh
	setProperty : function(key, val) {
		if (!System.props)
			return System.$props[key] = val; // BH
		System.props.setProperty (key, val);
	}
};

System.identityHashCode=function(obj){
  if(obj==null)
    return 0;
    
        return obj._$hashcode || (obj._$hashcode = ++Clazz._hashCode)
}

System.out = new Clazz._O();
System.out.__CLASS_NAME__ = "java.io.PrintStream";
System.out.print = function(){};
System.out.printf = function(){};
System.out.println = function(){};
System.out.write = function(){};
System.out.flush = function() {};

System.err = new Clazz._O();
System.err.__CLASS_NAME__ = "java.io.PrintStream";
System.err.print = function(){};
System.err.printf = function(){};
System.err.println = function(){};
System.err.write = function(){};
System.err.flush = function() {};

Clazz.popup = Clazz.assert = Clazz.log = Clazz.error = window.alert;

Thread = function(){};
Thread.J2S_THREAD = Thread.prototype.J2S_THREAD = new Thread();
Thread.currentThread = Thread.prototype.currentThread = function(){
	return this.J2S_THREAD;
};


Clazz.innerFunctionNames = Clazz.innerFunctionNames.concat ([
    "getSuperclass", "isAssignableFrom", 
    "getConstructor", 
    "getDeclaredMethod", "getDeclaredMethods",
    "getMethod", "getMethods",   
		"getModifiers", /*"isArray",*/ "newInstance"]);

Clazz._innerFunctions.getSuperclass = function(){
	return this.superClazz;	
};

Clazz._innerFunctions.isAssignableFrom = function(clazz) {
	return Clazz.getInheritedLevel (clazz, this) >= 0;	
};

Clazz._innerFunctions.getConstructor = function(){
	return new java.lang.reflect.Constructor (this, [], [], 
			java.lang.reflect.Modifier.PUBLIC);
};
Clazz._innerFunctions.getDeclaredMethods = Clazz._innerFunctions.getMethods = function(){
	var ms = [];
	var p = this.prototype;
	for (var attr in p) {
		if (typeof p[attr] == "function" && !p[attr].__CLASS_NAME__) {
			ms.push(new java.lang.reflect.Method (this, attr,
					[], java.lang.Void, [], java.lang.reflect.Modifier.PUBLIC));
		}
	}
	p = this;
	for (var attr in p) {
		if (typeof p[attr] == "function" && !p[attr].__CLASS_NAME__) {
			ms.push(new java.lang.reflect.Method (this, attr,
					[], java.lang.Void, [], java.lang.reflect.Modifier.PUBLIC
					| java.lang.reflect.Modifier.STATIC));
		}
	}
	return ms;
};
Clazz._innerFunctions.getDeclaredMethod = Clazz._innerFunctions.getMethod = function(name, clazzes) {
	var p = this.prototype;
	for (var attr in p) {
		if (name == attr && typeof p[attr] == "function" 
				&& !p[attr].__CLASS_NAME__) {
			return new java.lang.reflect.Method (this, attr,
					[], java.lang.Void, [], java.lang.reflect.Modifier.PUBLIC);
		}
	}
	p = this;
	for (var attr in p) {
		if (name == attr && typeof p[attr] == "function" 
				&& !p[attr].__CLASS_NAME__) {
			return new java.lang.reflect.Method (this, attr,
					[], java.lang.Void, [], java.lang.reflect.Modifier.PUBLIC
					| java.lang.reflect.Modifier.STATIC);
		}
	}
	return null;
};
Clazz._innerFunctions.getModifiers = function(){
	return java.lang.reflect.Modifier.PUBLIC;
};

Clazz._innerFunctions.newInstance = function(a) {
	var clz = this;
  switch(a == null ? 0 : a.length) {
  case 0:
    return new clz();
  case 1:
  	return new clz(a[0]);
  case 2:
  	return new clz(a[0], a[1]);
  case 3:
  	return new clz(a[0], a[1], a[2]);
  case 4:
  	return new clz(a[0], a[1], a[2], a[3]);
  default:
    var x = "new " + clz.__CLASS_NAME__ + "(";
    for (var i = 0; i < a.length; i++)
     x += (i == 0 ? "" : ",") + "a[" + i + "]";
    x += ")";
    return eval(x);
  }
};

;(function(){  // BH added wrapper here
	var inF = Clazz.innerFunctionNames;
	for (var i = 0; i < inF.length; i++) {
		Clazz._O[inF[i]] = Clazz._innerFunctions[inF[i]];
		Array[inF[i]] = Clazz._innerFunctions[inF[i]];
	}
})();




Clazz._Loader = Clazz.ClazzLoader = function(){};

var Node = function(){
	this.parents = [];
	this.musts = [];
	this.optionals = [];
	this.declaration = null;
	this.name = null; // id
	this.path = null;
	this.onLoaded = null;
	this.status = 0;
	this.random = 0.13412;
};


;(function(Clazz, _Loader) {

_Loader._checkLoad = Jmol._checkLoad;
 
_Loader.updateNodeForFunctionDecoration = function(qName) {
	var node = findNode(qName);
	if (node && node.status == Node.STATUS_KNOWN) {
		window.setTimeout((function(nnn) {
			return function() {
				updateNode(nnn);
			};
		})(node), 1);
	}
}

Node.prototype.toString = function() {
	return this.name || this.path || "ClazzNode";
}

Node.STATUS_UNKNOWN = 0;
Node.STATUS_KNOWN = 1;
Node.STATUS_CONTENT_LOADED = 2;
Node.STATUS_MUSTS_LOADED = 3;
Node.STATUS_DECLARED = 4;
Node.STATUS_LOAD_COMPLETE = 5;

						 
var loaders = [];

_Loader.requireLoaderByBase = function(base) {
	for (var i = 0; i < loaders.length; i++) {
		if (loaders[i].base == base) {
			return loaders[i];
		}
	}
	var loader = new _Loader();
	loader.base = base; 
	loaders.push(loader);
	return loader;
};

var clazzTreeRoot = new Node();

var loadedScripts = {};

var inLoadingThreads = 0;

var maxLoadingThreads = 6;

var userAgent = navigator.userAgent.toLowerCase();
var isOpera = (userAgent.indexOf ("opera") != -1);
var isIE = (userAgent.indexOf ("msie") != -1) && !isOpera;
var isGecko = (userAgent.indexOf ("gecko") != -1);

if (isOpera) {
	maxLoadingThreads = 1;
	var index = userAgent.indexOf ("opera/");
	if (index != -1) {
		var verNumber = 9.0;
		try {
			verNumber = parseFloat(userAgent.subString (index + 6));
		} catch (e) {}
		if (verNumber >= 9.6) {
			maxLoadingThreads = 6;
		}
	} 
}

var isClassdefined;
var definedClasses;

if (self.Clazz && Clazz.isClassDefined) {
	isClassDefined = Clazz.isClassDefined;
} else {
	definedClasses = {};
	isClassDefined = function(clazzName) {
		return definedClasses[clazzName] == true;
	};
}

var unwrapArray = function(arr) {
	if (!arr || arr.length == 0)
		return [];
	var last = null;
	for (var i = 0; i < arr.length; i++) {
		if (!arr[i])
			continue;
		if (arr[i].charAt (0) == '$') {
			if (arr[i].charAt (1) == '.') {
				if (!last)
					continue;
				var idx = last.lastIndexOf (".");
				if (idx != -1) {
					var prefix = last.substring (0, idx);
					arr[i] = prefix + arr[i].substring (1);
				}
			} else {
				arr[i] = "org.eclipse.s" + arr[i].substring (1);
			}
		}
		last = arr[i];
	}
	return arr;
};

var classQueue = [];

var classpathMap = {};

var pkgRefCount = 0;

_Loader.loadPackageClasspath = function(pkg, base, isIndex, fSuccess, mode, pt) {
	var map = classpathMap;
	mode || (mode = 0);
	fSuccess || (fSuccess = null);
	pt || (pt = 0);

	var isPkgDeclared = (isIndex && map["@" + pkg]);
	if (mode == 0 && isIndex && !map["@java"] && pkg.indexOf ("java") != 0 && needPackage("java")) {
		_Loader.loadPackage("java", fSuccess ? function(_package){_Loader.loadPackageClasspath(pkg, base, isIndex, fSuccess, 1)} : null);
		if (fSuccess)
			return;
	}
	if (pkg instanceof Array) {
		unwrapArray(pkg);
		if (fSuccess) {
			if (pt < pkg.length)
				_Loader.loadPackageClasspath(pkg[pt], base, isIndex, function(_loadPackageClassPath){_Loader.loadPackageClasspath(pkg, base, isIndex, fSuccess, 1, pt + 1)}, 1);
			else
				fSuccess();
		} else {
			for (var i = 0; i < pkg.length; i++)
				_Loader.loadPackageClasspath(pkg[i], base, isIndex, null);
		}
		return;
	}
	switch (pkg) {
	case "java.*":
		pkg = "java";
	case "java":
		break;
	default:
		if (pkg.lastIndexOf(".*") == pkg.length - 2)
			pkg = pkg.substring(0, pkg.length - 2);
		break;
	}
	if (base) // critical for multiple applets
		map["@" + pkg] = base;
	if (isIndex && !isPkgDeclared && !window[pkg + ".registered"]) {
		pkgRefCount++;
		if (pkg == "java")
			pkg = "core" // JSmol -- moves java/package.js to core/package.js
		_Loader.loadClass(pkg + ".package", function(){
					if (--pkgRefCount == 0)
						runtimeLoaded();
				}, true, true, 1);
		return;
	}
	fSuccess && fSuccess();
};

Clazz.loadClass = function(name, onLoaded, async) {
  if (!self.Class) {
    Class = Clazz;
    Class.forName = Clazz._4Name;
    JavaObject = Clazz._O;
  }
  return (name && _Loader.loadClass(name, onLoaded, true, async, 1));
}

_Loader.loadClass = function(name, onLoaded, forced, async, mode) {

  
  mode || (mode = 0); // BH: not implemented
  (async == null) && (async = false);
  
 	if (typeof onLoaded == "boolean")
		return Clazz.evalType(name);


	if (needPackage("java")) {
		_Loader.loadPackage("java");
  }
    

	_Loader.keepOnLoading = true;
	
	if (!forced && (pkgRefCount && name.lastIndexOf(".package") != name.length - 8
			|| name.indexOf("java.") != 0 && !isClassDefined(runtimeKeyClass)
		 )) {	
		queueBe4KeyClazz.push([name, onLoaded]);
    
    

		return;    
	}
	var b;
	if ((b = isClassDefined(name)) || isClassExcluded(name)) {
		if (b && onLoaded) {
			var nn = findNode(name);
			if (!nn || nn.status >= Node.STATUS_LOAD_COMPLETE) {
				if (async) {
					window.setTimeout(onLoaded, 25);
				} else {
					onLoaded();
				}
			}
		}
		return;
	}
	var path = _Loader.getClasspathFor(name);
  var existed = loadedScripts[path];
  	var qq = classQueue;
	if (!existed)
		for (var i = qq.length; --i >= 0;)
			if (qq[i].path == path || qq[i].name == name) {
				existed = true;
				break;
			}
	if (existed) {
		if (onLoaded) {
			var n = findNode(name);
			if (n) {
				if (!n.onLoaded) {
					n.onLoaded = onLoaded;
				} else if (onLoaded != n.onLoaded) {
					n.onLoaded = (function(nF, oF) { return function(){ nF(); oF() };	}) (n.onLoaded, onLoaded);
				}
			}
		}
		return;
	}

	var n = (Clazz.unloadedClasses[name] && findNode(name) || new Node());
	n.name = name;
	n.path = path;
	n.isPackage = (path.lastIndexOf("package.js") == path.length - 10);
	mappingPathNameNode(path, name, n);
	n.onLoaded = onLoaded;
	n.status = Node.STATUS_KNOWN;
	var needBeingQueued = false;
	for (var i = qq.length; --i >= 0;) {
		if (qq[i].status != Node.STATUS_LOAD_COMPLETE) {
			needBeingQueued = true;
			break;
		}
	}
	
	if (n.isPackage) {//forced
		var pt = qq.length;
		for (; --pt >= 0;) {
			if (qq[pt].isPackage) 
				break;
			qq[pt + 1] = qq[pt];
		}
		qq[++pt] = n;
	} else if (needBeingQueued) {
		qq.push(n);
	}
	if (!needBeingQueued) { // can be loaded directly
		var bSave = false;
		if (onLoaded) {	
			bSave = isLoadingEntryClass;
			isLoadingEntryClass = true;
		}
    if (forced)onLoaded = null;
		addChildClassNode(clazzTreeRoot, n, true);
		loadScript(n, n.path, n.requiredBy, false, onLoaded ? function(_loadClass){ isLoadingEntryClass = bSave; onLoaded()}: null);
	}
};

var needPackage = function(pkg) {
	return (window[pkg + ".registered"] != null && !classpathMap["@" + pkg]);
}

_Loader.loadPackage = function(pkg, fSuccess) {
	fSuccess || (fSuccess = null);
	window[pkg + ".registered"] = false;
	_Loader.loadPackageClasspath(pkg, 
		(_Loader.J2SLibBase || (_Loader.J2SLibBase = (_Loader.getJ2SLibBase() || "j2s/"))), 
		true, fSuccess);
};

_Loader.jarClasspath = function(jar, clazzes) {
	if (!(clazzes instanceof Array))
		clazzes = [clazzes];
	unwrapArray(clazzes);
  if (Jmol._debugCore)
    jar = jar.replace(/\.z\./, ".")
	for (var i = clazzes.length; --i >= 0;)
		classpathMap["#" + clazzes[i]] = jar;
	classpathMap["$" + jar] = clazzes;
};

_Loader.registerPackages = function(prefix, pkgs) {
	var base = _Loader.getClasspathFor (prefix + ".*", true);
	for (var i = 0; i < pkgs.length; i++) {
		if (window["Clazz"]) {
			Clazz.declarePackage (prefix + "." + pkgs[i]);
		}
		_Loader.loadPackageClasspath (prefix + "." + pkgs[i], base);
	}
};


_Loader.getClasspathFor = function(clazz, forRoot, ext) {
	var path = classpathMap["#" + clazz];
	if (!path || forRoot || ext) {
		var base;
		var idx;
		if (path) {
			clazz = clazz.replace(/\./g, "/");	
			if ((idx = path.lastIndexOf(clazz)) >= 0 
				|| (idx = clazz.lastIndexOf("/")) >= 0 
					&& (idx = path.lastIndexOf(clazz.substring(0, idx))) >= 0)
				base = path.substring(0, idx);
		} else {
			idx = clazz.length + 2;
			while ((idx = clazz.lastIndexOf(".", idx - 2)) >= 0)
				if ((base = classpathMap["@" + clazz.substring(0, idx)]))
					break;
			if (!forRoot)
				clazz = clazz.replace (/\./g, "/");	
		}
		if (base == null) {
			var bins = "binaryFolders";
			base = (window["Clazz"] && Clazz[bins] && Clazz[bins].length ? Clazz[bins][0] 
				: _Loader[bins]	&& _Loader[bins].length ? _Loader[bins][0]
				: "j2s");
		}
		path = (base.lastIndexOf("/") == base.length - 1 ? base : base + "/") + (forRoot ? ""
			: clazz.lastIndexOf("/*") == clazz.length - 2 ? clazz.substring(0, idx + 1)
			: clazz + (!ext ? ".js" : ext.charAt(0) != '.' ? "." + ext : ext));
	}		
	return path;//_Loader.multipleSites(path);
};

_Loader.ignore = function(){
	var clazzes = (arguments.length == 1 && arguments[0] instanceof Array ?
			clazzes = arguments[0] : null);
	var n = (clazzes ? clazzes.length : arguments.length);
	if (!clazzes) {
		clazzes = new Array(n);
		for (var i = 0; i < n; i++)
			clazzes[i] = arguments[i];
	}
	unwrapArray(clazzes);
	for (var i = 0; i < n; i++)
		excludeClassMap["@" + clazzes[i]] = 1;
};

_Loader.onScriptLoading = function(file){};

_Loader.onScriptLoaded = function(file, isError){};

_Loader.onScriptInitialized = function(file){};

_Loader.onScriptCompleted = function(file){};

_Loader.onClassUnloaded = function(clazz){};

_Loader.onGlobalLoaded = function(){};

_Loader.keepOnLoading = true; // never set false in this code


var mapPath2ClassNode = {};

var isClassExcluded = function(clazz) {
	return excludeClassMap["@" + clazz];
};

var excludeClassMap = {};

var evaluate = function(file, file0, js, isLoaded) {
  if (!isLoaded)
 		try {
			eval(js + ";//# sourceURL="+file);
		} catch (e) {      
      if (Clazz._isQuiet) 
        return;
			var s = "[Java2Script] The required class file \n\n" + file + (js.indexOf("[Exception") == 0 && js.indexOf("data: no") ? 
         "\nwas not found.\n"
        : "\ncould not be loaded. Script error: " + e.message + " \n\ndata:\n\n" + js) + "\n\n" + Clazz.getStackTrace();
  		alert(s)
			Clazz.alert(s);
			throw e;
		}
	_Loader.onScriptLoaded(file, false);
	tryToLoadNext(file0);
}

var failedHandles = {};

var generateRemovingFunction = function(node) {
	return function(){
		if (node.readyState != "interactive") {
			try {
				if (node.parentNode)
					node.parentNode.removeChild (node);
			} catch (e) { }
			node = null;
		}
	};
};

var removeScriptNode = function(n) {
	if (window["j2s.script.debugging"]) {
		return;
	}
	window.setTimeout (generateRemovingfunction(n), 1);
};

Clazz._4Name = function(clazzName, applet, state) {
	if (Clazz.isClassDefined(clazzName))
		return Clazz.evalType(clazzName);
	var f = (Jmol._isAsync && applet ? applet._restoreState(clazzName, state) : null);
	if (f == 1)
		return null; // must be already being created
	if (_Loader.setLoadingMode(f ? _Loader.MODE_SCRIPT : "xhr.sync")) {
		_Loader.loadClass(clazzName, f, false, true, 1);
		return null; // this will surely throw an error, but that is OK
	}
	_Loader.loadClass(clazzName);
	return Clazz.evalType(clazzName);
};

Clazz.currentPath= "";

var loadScript = function(node, file, why, ignoreOnload, fSuccess, _loadScript) {

	Clazz.currentPath = file;
  
	if (ignoreOnload)alert("WHY>>")

  var isLoaded = loadedScripts[file];
	loadedScripts[file] = true;
	removeArrayItem(classQueue, file);

  isUsingXMLHttpRequest = true;
  isAsynchronousLoading = false;
  
  
  if (_Loader._checkLoad) {
    System.out.println("\t" + file + (why ? "\n -- required by " + why : "") + "  ajax=" + isUsingXMLHttpRequest + " async=" + isAsynchronousLoading)
  }

  var file0 = file;
  if (Clazz._debugging) {
    file = file.replace(/\.z\.js/,".js");
  }

  if (!isLoaded)
    System.out.println("loadScript " + file)

	_Loader.onScriptLoading(file);
	if (isUsingXMLHttpRequest && !isAsynchronousLoading) {
		var data = Jmol._getFileData(file);
    try{
		  evaluate(file, file0, data, isLoaded);
    }catch(e) {
      alert(e + " loading file " + file + " " + node.name + " " + Clazz.getStackTrace());
    }
    if (fSuccess) {
      fSuccess(); 
    }
		return;
	}
	var info = {
		dataType:"script",
		async:true, 
		type:"GET", 
		url:file,
		success:W3CScriptOnCallback(file, false, fSuccess),
		error:W3CScriptOnCallback(file, true, fSuccess)
	};
	inLoadingThreads++;
  if (isLoaded)
    setTimeout(info.success, 0);
  else
	 Jmol.$ajax(info);
};

var W3CScriptOnCallback = function(path, forError, fSuccess) {
  var s = Clazz.getStackTrace();
	return function(){
	if (forError && __debuggingBH)Clazz.alert ("############ forError=" + forError + " path=" + path + " ####" + (forError ? "NOT" : "") + "LOADED###");
		if (isGecko && this.timeoutHandle)
			window.clearTimeout(this.timeoutHandle), this.timeoutHandle = null;
		if (inLoadingThreads > 0)
			inLoadingThreads--;
		this.onload = null;
		this.onerror = null;
		if (forError) 
			alert ("There was a problem loading " + path);
		_Loader.onScriptLoaded(path, true);
		var node = this;			
		var f;
    if (fSuccess)
      f = function(_W3scriptFS){removeScriptNode(node);tryToLoadNext(path, fSuccess); };
    else
      f = function(_W3script){removeScriptNode(node);tryToLoadNext(path)};
		if (loadingTimeLag >= 0)
			window.setTimeout(function() { tryToLoadNext(path, f); }, loadingTimeLag);
		else
			tryToLoadNext(path, f);
	};
};

var isLoadingEntryClass = true;

var besidesJavaPackage = false;

var tryToLoadNext = function(file, fSuccess) {
	var node = mapPath2ClassNode["@" + file];
	if (!node) // maybe class tree root
		return;
	var n;
	var clazzes = classpathMap["$" + file];
	if (clazzes) {
		for (var i = 0; i < clazzes.length; i++) {
			var name = clazzes[i];
			if (name != node.name && (n = findNode(name))) {
				if (n.status < Node.STATUS_CONTENT_LOADED) {
					n.status = Node.STATUS_CONTENT_LOADED;
					updateNode(n);
				}
			} else {
				n = new Node();
				n.name = name;
				var pp = classpathMap["#" + name];
				if (!pp) {
					alert (name + " J2S error in tryToLoadNext");
					error("Java2Script implementation error! Please report this bug!");
				}
				n.path = pp;
				mappingPathNameNode (n.path, name, n);
				n.status = Node.STATUS_CONTENT_LOADED;
				addChildClassNode(clazzTreeRoot, n, false);
				updateNode(n);
			}
		}
	}
	if (node instanceof Array) {
		for (var i = 0; i < node.length; i++) {
			if (node[i].status < Node.STATUS_CONTENT_LOADED) {
				node[i].status = Node.STATUS_CONTENT_LOADED;
				updateNode(node[i]);
			}
		}
	} else if (node.status < Node.STATUS_CONTENT_LOADED) {
		var stillLoading = false;
		var ss = document.getElementsByTagName ("SCRIPT");
		for (var i = 0; i < ss.length; i++) {
			if (isIE) {
				if (ss[i].onreadystatechange && ss[i].onreadystatechange.path == node.path
						&& ss[i].readyState == "interactive") {
					stillLoading = true;
					break;
				}
			} else if (ss[i].onload && ss[i].onload.path == node.path) {
				stillLoading = true;
				break;
			}
		}
		if (!stillLoading) {
			node.status = Node.STATUS_CONTENT_LOADED;
			updateNode(node);
		}
	}
	 
	if (!_Loader.keepOnLoading) // set externally
		return;

	var cq;
	var working = true;
	if ((n = findNextMustClass(Node.STATUS_KNOWN))) {
		loadClassNode(n);
		while (inLoadingThreads < maxLoadingThreads) {
			if (!(n = findNextMustClass(Node.STATUS_KNOWN)))
				break;
			loadClassNode(n); // will increase inLoadingThreads!
		}
	} else if ((cq = classQueue).length != 0) { 
		n = cq.shift();
		if (!loadedScripts[n.path] 
				|| cq.length != 0 
				|| !isLoadingEntryClass
				|| n.musts.length
				|| n.optionals.length) {
			addChildClassNode(clazzTreeRoot, n, true);
			loadScript(n, n.path, n.requiredBy, false);
		} else if (isLoadingEntryClass) {
			isLoadingEntryClass = false;
		}
	} else if ((n = findNextRequiredClass(Node.STATUS_KNOWN))) {
		loadClassNode(n);
		while (inLoadingThreads < maxLoadingThreads) {
			if (!(n = findNextRequiredClass(Node.STATUS_KNOWN)))
				break;
			loadClassNode(n); // will increase inLoadingThreads!
		}
	} else {
		working = false;
	}
	if (working || inLoadingThreads > 0)
		return;
	var f = [findNextMustClass,findNextRequiredClass];
	var lastNode = null;
	for (var i = 0; i < 2; i++)
		while ((n = f[i](Node.STATUS_CONTENT_LOADED))) {
			if (i == 1 && lastNode === n) // Already existed cycle ?
				n.status = Node.STATUS_LOAD_COMPLETE;
			updateNode(n);
			lastNode = n;
		}
    
  
	while (true) {
		tracks = [];
		if (!checkCycle(clazzTreeRoot, file))
			break;
	}
  
  
	for (var i = 0; i < 2; i++) {
		lastNode = null;
		while ((n = f[i](Node.STATUS_DECLARED))) {
			if (lastNode === n) 
				break;
			updateNode(lastNode = n);
		}
	}
	var done = [];
	for (var i = 0; i < 2; i++) 
		while ((n = f[i](Node.STATUS_DECLARED)))
			done.push(n), n.status = Node.STATUS_LOAD_COMPLETE;
	if (done.length) {
		for (var i = 0; i < done.length; i++)
			destroyClassNode(done[i]);
		for (var i = 0; i < done.length; i++)
			if ((f = done[i].onLoaded))
				done[i].onLoaded = null, f();
	}
  
  
  
  
  
  
  
  if (fSuccess) {
	  fSuccess();
  } else if (_Loader._classCountPending) {
    for (var name in _Loader._classPending) {
      var n = findNode(name);
      System.out.println("class left pending " + name + " " + n);
      if (n) {
        updateNode(n);
        break;
      }
    }
  } else {
    
    if (_Loader._checkLoad) {
      System.out.println("I think I'm done: SAEM call count: " + SAEMid);
      Clazz.showDuplicates(true);
    }
  }
	_Loader.onGlobalLoaded();
};


var tracks = [];

var checkCycle = function(node, file) {
	var ts = tracks;
	var len = ts.length;
	ts.push(node);
	var i = len;
	for (; --i >= 0;)
		if (ts[i] === node && ts[i].status >= Node.STATUS_DECLARED) 
			break;
	if (i >= 0) {
    if (_Loader._checkLoad) {
      var msg = "cycle found loading " + file + " for " + node;
      System.out.println(msg)
    } 
		for (; i < len; i++) {
      var n = ts[i];
			n.status = Node.STATUS_LOAD_COMPLETE;
			destroyClassNode(n); // Same as above
			for (var k = 0; k < n.parents.length; k++)
				updateNode(n.parents[k]);
			n.parents = [];
      var f = n.onLoaded;
      if (_Loader._checkLoad) {
        var msg = "cycle setting status to LOAD_COMPLETE for " + n.name + (f ? " firing " + f.toString() : "");
        System.out.println(msg)
      } 
			if (f)
				n.onLoaded = null, f();
		}
		ts.length = 0;
		return true;
	}
	var a = [node.musts, node.optionals];
	for (var j = 0; j < 2; j++)
		for (var r = a[j], i = r.length; --i >= 0;)
			if (r[i].status == Node.STATUS_DECLARED && checkCycle(r[i], file)) 
				return true;
	ts.length = len;
	return false; // done 
};


_Loader._classCountPending = 0;
_Loader._classCountOK = 0;
_Loader._classPending = {};

_Loader.showPending = function() {
  var a = [];
  for (var name in _Loader._classPending) {
    var n = findNode(name);
    if (!n) {
      alert("No node for " + name);
      continue;
    }
    a.push(n);
    System.out.println(showNode("", "", n, "", 0));     
  }  
  return a;
}

var showNode = function(s, names, node, inset, level) {
  names += "--" + node.name;
  s += names + "\n";
  if (level > 5) {
    s += inset + " ...\n";
    return s;
  }
  inset += "\t";
  s += inset + "status: " + node.status + "\n";
  if (node.parents && node.parents.length && node.parents[0] && node.parents[0].name) {
    s += inset + "parents: " + node.parents.length + "\n";
    for (var i = 0; i < node.parents.length; i++) {
      s = showNode(s, names, node.parents[i], inset + "\t", level+1);
    }
    s += "\n";
  }
  return s;    
}     

updateNode = function(node, _updateNode) {
	if (!node.name || node.status >= Node.STATUS_LOAD_COMPLETE) {
		destroyClassNode(node);
		return;
	}
	var ready = true;
	if (node.musts.length && node.declaration) {
		for (var mustLength = node.musts.length, i = mustLength; --i >= 0;) {
			var n = node.musts[i];
			n.requiredBy = node;
			if (n.status < Node.STATUS_DECLARED && isClassDefined (n.name)) {
				var nns = []; // a stack for onLoaded events
				n.status = Node.STATUS_LOAD_COMPLETE;
				destroyClassNode(n); // Same as above
				if (n.declaration	&& n.declaration.clazzList) {
					for (var j = 0, list = n.declaration.clazzList, l = list.length; j < l; j++) {
						var nn = findNode (list[j]);
						if (nn && nn.status != Node.STATUS_LOAD_COMPLETE
								&& nn !== n) {
							nn.status = n.status;
							nn.declaration = null;
							destroyClassNode(nn);
							nn.onLoaded && nns.push(nn);
						}
					}
					n.declaration = null;
				}
				if (n.onLoaded)
					nns.push(n);
				for (var j = 0; j < nns.length; j++) {
					var onLoaded = nns[j].onLoaded;
					if (onLoaded) {
						nns[j].onLoaded = null;
						onLoaded();
					}
				}
			} else {
				(n.status == Node.STATUS_CONTENT_LOADED) && updateNode(n); // musts may be changed
				if (n.status < Node.STATUS_DECLARED)
					ready = false;
			}
			if (node.musts.length != mustLength) {
				i = mustLength = node.musts.length;
				ready = true;
			}
		}
	}
	if (!ready)
		return;
	if (node.status < Node.STATUS_DECLARED) {
		var decl = node.declaration;
		if (decl)
			decl(), decl.executed = true;
    if(_Loader._checkLoad) {
            if (_Loader._classPending[node.name]) {
              delete _Loader._classPending[node.name];
              _Loader._classCountOK;
              _Loader._classCountPending--;
            }
    }
		node.status = Node.STATUS_DECLARED;
		if (definedClasses)
			definedClasses[node.name] = true;
		_Loader.onScriptInitialized(node.path);
		if (node.declaration && node.declaration.clazzList) {
			for (var j = 0, list = node.declaration.clazzList, l = list.length; j < l; j++) {
				var nn = findNode(list[j]);
				if (nn && nn.status != Node.STATUS_DECLARED
						&& nn !== node) {
					nn.status = Node.STATUS_DECLARED;
					if (definedClasses)
						definedClasses[nn.name] = true;
					_Loader.onScriptInitialized(nn.path);
				}
			}
		}
	}
	var level = Node.STATUS_DECLARED;
	if (node.optionals.length == 0 && node.musts.length == 0
			|| node.status > Node.STATUS_KNOWN && !node.declaration
			|| checkStatusIs(node.musts, Node.STATUS_LOAD_COMPLETE)
					&& checkStatusIs(node.optionals, Node.STATUS_LOAD_COMPLETE)) { 
		level = Node.STATUS_LOAD_COMPLETE;
		if (!doneLoading(node, level))
			return false;
		if (node.declaration && node.declaration.clazzList) {
			for (var j = 0, list = node.declaration.clazzList, l = list.length; j < l; j++) {
				var nn = findNode(list[j]);
				if (nn && nn.status != level && nn !== node) {
					nn.declaration = null;
					if (!doneLoading(nn, level))
						return false;
				}
			}
		}
	}
	if (node.parents && node.parents.length) {
  	for (var i = 0; i < node.parents.length; i++) {
  		var p = node.parents[i];
  		if (p.status < level) 
  			updateNode(p, p.name);
  	}
  	if (level == Node.STATUS_LOAD_COMPLETE)
  		node.parents = [];
  }
};

var checkStatusIs = function(arr, status){
	for (var i = arr.length; --i >= 0;)
		if (arr[i].status < status)
			return false;
	return true;
}
var doneLoading = function(node, level, _doneLoading) {
	node.status = level;
	_Loader.onScriptCompleted(node.path);
  
	var onLoaded = node.onLoaded;
	if (onLoaded) {
		node.onLoaded = null;
		onLoaded();
		if (!_Loader.keepOnLoading)
			return false;
	}
  
	destroyClassNode(node);
	return true;
}

var usedRandoms = {
  "r0.13412" : 1
};

var getRnd = function() {
	while (true) { // get a unique random number
		var rnd = Math.random();
		var s = "r" + rnd;
		if (!usedRandoms[s])
			return (usedRandoms[s] = 1, clazzTreeRoot.random = rnd);
	}
}

var findNode = function(clazzName) {
	getRnd();
	return findNodeUnderNode(clazzName, clazzTreeRoot);
};

var findNextRequiredClass = function(status) {
	getRnd();
	return findNextRequiredNode(clazzTreeRoot, status);
};

var findNextMustClass = function(status) {
	return findNextMustNode(clazzTreeRoot, status);
};

var findNodeUnderNode = function(clazzName, node) {
	var n;
	return (node.name == clazzName ? node 
		: (n = findNodeWithin(clazzName, node.musts))
		|| (n = findNodeWithin(clazzName, node.optionals)) 
		? n : null);
};

var findNodeWithin = function(name, arr) {
	var rnd = clazzTreeRoot.random;
	for (var i = arr.length; --i >= 0;) {
		var n = arr[i];
		if (n.name == name)
			return n;
		if (n.random != rnd) {
			n.random = rnd;
			if ((n = findNodeUnderNode(name, n)))
				return n;
		}
	}
	return null;
}

var checkStatus = function(n, status) {
	return (n.status == status 
			&& (status != Node.STATUS_KNOWN || !loadedScripts[n.path])
			&& (status == Node.STATUS_DECLARED	|| !isClassDefined (n.name)));
}

var findNextMustNode = function(node, status) {
	for (var i = node.musts.length; --i >= 0;) {
		var n = node.musts[i];
		if (checkStatus(n, status) || (n = findNextMustNode(n, status)))
			return n;	
	}
	return (checkStatus(node, status) ? node : null); 
};

var findNextRequiredNode = function(node, status) {
	var n;
	return ((n = searchClassArray(node.musts, status))
		|| (n = searchClassArray(node.optionals, status))
		|| checkStatus(n = node, status) ? n : null);
};

var searchClassArray = function(arr, status) {
	if (arr) {
		var rnd = clazzTreeRoot.random;
		for (var i = 0; i < arr.length; i++) {
			var n = arr[i];
			if (checkStatus(n, status))
				return n;
			if (n.random != rnd) {
				n.random = rnd; // mark as visited!
				if ((n = findNextRequiredNode(n, status)))
					return n;
			}
		}
	}
	return null;
};

var innerLoadedScripts = {};

var load = function(musts, name, optionals, declaration) {
	if (name instanceof Array) {
		unwrapArray(name);
		for (var i = 0; i < name.length; i++)
			load(musts, name[i], optionals, declaration, name);
		return;
	}	

  if (_Loader._checkLoad) {
    if (_Loader._classPending[name]) {
    } else {
      _Loader._classPending[name] = 1;
      if (_Loader._classCountPending++ == 0)
        _Loader._classCountOK = 0;
      System.out.println("Loading class " + name);
    }
  }

	var node = mapPath2ClassNode["#" + name];
	if (!node) { // load called inside *.z.js?
		var n = findNode(name);
		node = (n ? n : new Node());
		node.name = name;
		node.path = classpathMap["#" + name] || "unknown";
		mappingPathNameNode(node.path, name, node);
		node.status = Node.STATUS_KNOWN;
		addChildClassNode(clazzTreeRoot, node, false);
	}
	processRequired(node, musts, true);
	if (arguments.length == 5 && declaration) {
		declaration.status = node.status;
		declaration.clazzList = arguments[4];
	}
	node.declaration = declaration;
	if (declaration) 
		node.status = Node.STATUS_CONTENT_LOADED;
	processRequired(node, optionals, false);
};

var processRequired = function(node, arr, isMust) {
	if (arr && arr.length) {
		unwrapArray(arr);
		for (var i = 0; i < arr.length; i++) {
			var name = arr[i];
			if (!name)
				continue;
			if (isClassDefined(name)
					|| isClassExcluded(name))
				continue;
			var n = findNode(name);
			if (!n) {
				n = new Node();
				n.name = name;
				n.status = Node.STATUS_KNOWN;
			}
			n.requiredBy = node;
			addChildClassNode(node, n, isMust);
		}
	}
}

if (window["Clazz"]) {
	Clazz.load = load;
} else {
  _Loader.load = load;
}  
var mappingPathNameNode = function(path, name, node) {
	var map = mapPath2ClassNode;
	var keyPath = "@" + path;
	var v = map[keyPath];
	if (v) {
		if (v instanceof Array) {
			var existed = false;
			for (var i = 0; i < v.length; i++) {
				if (v[i].name == name) {
					existed = true;
					break;
				}
			}
			if (!existed)
				v.push(node);
		} else {
			map[keyPath] = [v, node];
		}
	} else {
		map[keyPath] = node;
	}
	map["#" + name] = node;
};

var loadClassNode = function(node) {
	var name = node.name;
	if (!isClassDefined (name) 
			&& !isClassExcluded (name)) {
		var path = _Loader.getClasspathFor (name/*, true*/);
		node.path = path;
		mappingPathNameNode (path, name, node);
		if (!loadedScripts[path]) {
			loadScript(node, path, node.requiredBy, false);
			return true;
		}
	}
	return false;
};


var runtimeKeyClass = _Loader.runtimeKeyClass = "java.lang.String";

var queueBe4KeyClazz = [];

var J2sLibBase;

_Loader.getJ2SLibBase = function(){
	var o = window["j2s.lib"];
	return (o ? o.base + (o.alias == "." ? "" : (o.alias ? o.alias : (o.version ? o.version : "1.0.0")) + "/") : null);
};

var isAsynchronousLoading = true;

var isUsingXMLHttpRequest = false;

var loadingTimeLag = -1;

_Loader.MODE_SCRIPT = 4;
_Loader.MODE_XHR = 2;
_Loader.MODE_SYNC = 1;

_Loader.setLoadingMode = function(mode, timeLag) {
	var async = true;
	var ajax = true;
	if (typeof mode == "string") {
		mode = mode.toLowerCase();
		if (mode.indexOf("script") >= 0)
			ajax = false;
		else
			async = (mode.indexOf("async") >=0);
		async = false; // BH
	} else {
		if (mode & _Loader.MODE_SCRIPT)
			ajax = false;
		else
			async = !(mode & _Loader.MODE_SYNC);
	}
	isUsingXMLHttpRequest = ajax;
	isAsynchronousLoading = async;
	loadingTimeLag = (async && timeLag >= 0 ? timeLag: -1);
	return async;
};

var runtimeLoaded = function(){
	if (pkgRefCount	|| !isClassDefined(runtimeKeyClass))
		return;
	var qbs = queueBe4KeyClazz;
	for (var i = 0; i < qbs.length; i++)
		_Loader.loadClass(qbs[i][0], qbs[i][1]);
	queueBe4KeyClazz = [];
};

_Loader.loadZJar = function(zjarPath, keyClass) {
	var f =	null;
	var isArr = (keyClass instanceof Array);
	if (isArr)
		keyClass = keyClass[keyClass.length - 1];
	else
		f = (keyClass == runtimeKeyClass ? runtimeLoaded : null);			
	_Loader.jarClasspath(zjarPath, isArr ? keyClass : [keyClass]);
	_Loader.loadClass(keyClass, f, true);
};

var NodeMap = {};
var _allNodes = [];

var addChildClassNode = function(parent, child, isMust) {
	var existed = false;
	var arr;
	if (isMust) {
		arr = parent.musts;
		if (!child.requiredBy)
			child.requiredBy = parent;
	} else {
		arr = parent.optionals;
	}
	if (!NodeMap[child.name]) {
		_allNodes.push(child)
		NodeMap[child.name]=child
	}
	for (var i = 0; i < arr.length; i++) {
		if (arr[i].name == child.name) {
			existed = true;
			break;
		}
	}
	if (!existed) {
		arr.push(child);
		if (isLoadingEntryClass 
				&& child.name.indexOf("java") != 0 
				&& child.name.indexOf("net.sf.j2s.ajax") != 0) {
			if (besidesJavaPackage)
				isLoadingEntryClass = false;
			besidesJavaPackage = true;
		}
	}
	addParentClassNode(child, parent);
};

var addParentClassNode = function(child, parent) {
	if (parent.name && parent != clazzTreeRoot && parent != child)
		for (var i = 0; i < child.parents.length; i++)
			if (child.parents[i].name == parent.name)
				return;
	child.parents.push(parent);
}

var destroyClassNode = function(node) {
	var parents = node.parents;
	if (parents)
		for (var k = parents.length; --k >= 0;)
			removeArrayItem(parents[k].musts, node) || removeArrayItem(parents[k].optionals, node);
};

Clazz.binaryFolders =  _Loader.binaryFolders = [ _Loader.getJ2SLibBase() ];

})(Clazz, Clazz._Loader);


Clazz._LoaderProgressMonitor = {};

;(function(CLPM, Jmol) {

var fadeOutTimer = null;
var fadeAlpha = 0;
var monitorEl = null;
var lastScrollTop = 0;
var bindingParent = null;

CLPM.DEFAULT_OPACITY = (Jmol && Jmol._j2sLoadMonitorOpacity ? Jmol._j2sLoadMonitorOpacity : 55);


CLPM.hideMonitor = function(){
  	monitorEl.style.display = "none";
}

CLPM.showStatus = function(msg, fading) {
	if (!monitorEl) {
		createHandle();
		if (!attached) {
			attached = true;
		}
	}
	clearChildren(monitorEl);
  if (msg == null) {
    if (fading) {
      fadeOut();
    } else {
    	CLPM.hideMonitor();
    }
    return;
  }
  
	monitorEl.appendChild(document.createTextNode ("" + msg));
	if (monitorEl.style.display == "none") {
		monitorEl.style.display = "";
	}
	setAlpha(CLPM.DEFAULT_OPACITY);
	var offTop = getFixedOffsetTop();
	if (lastScrollTop != offTop) {
		lastScrollTop = offTop;
		monitorEl.style.bottom = (lastScrollTop + 4) + "px";
	}
	if (fading) {
		fadeOut();
	}
};

var clearChildren = function(el) {
	if (!el)
		return;
	for (var i = el.childNodes.length; --i >= 0;) {
		var child = el.childNodes[i];
		if (!child)
			continue;
		if (child.childNodes && child.childNodes.length)
			clearChildren (child);
		try {
			el.removeChild (child);
		} catch (e) {};
	}
};
var setAlpha = function(alpha) {
	if (fadeOutTimer && alpha == CLPM.DEFAULT_OPACITY) {
		window.clearTimeout (fadeOutTimer);
		fadeOutTimer = null;
	}
	fadeAlpha = alpha;
	var ua = navigator.userAgent.toLowerCase();
	monitorEl.style.filter = "Alpha(Opacity=" + alpha + ")";
	monitorEl.style.opacity = alpha / 100.0;
};
var hidingOnMouseOver = function(){
  CLPM.hideMonitor();
};

var attached = false;
var cleanup = function(){
	monitorEl = null;
	bindingParent = null;
	attached = false;
};
var createHandle = function(){
	var div = document.createElement ("DIV");
	div.id = "_Loader-status";
	div.style.cssText = "position:absolute;bottom:4px;left:4px;padding:2px 8px;"
			+ "z-index:" + (window["j2s.lib"].monitorZIndex || 10000) + ";background-color:#8e0000;color:yellow;" 
			+ "font-family:Arial, sans-serif;font-size:10pt;white-space:nowrap;";
	div.onmouseover = hidingOnMouseOver;
	monitorEl = div;
	if (bindingParent) {
		bindingParent.appendChild(div);
	} else {
		document.body.appendChild(div);
	}
	return div;
};

var fadeOut = function(){
	if (monitorEl.style.display == "none") return;
	if (fadeAlpha == CLPM.DEFAULT_OPACITY) {
		fadeOutTimer = window.setTimeout(function(){
					fadeOut();
				}, 750);
		fadeAlpha -= 5;
	} else if (fadeAlpha - 10 >= 0) {
		setAlpha(fadeAlpha - 10);
		fadeOutTimer = window.setTimeout(function(){
					fadeOut();
				}, 40);
	} else {
		monitorEl.style.display = "none";
	}
};
var getFixedOffsetTop = function(){
	if (bindingParent) {
		var b = bindingParent;
		return b.scrollTop;
	}
	var dua = navigator.userAgent;
	var b = document.body;
	var p = b.parentNode;
	var pcHeight = p.clientHeight;
	var bcScrollTop = b.scrollTop + b.offsetTop;
	var pcScrollTop = p.scrollTop + p.offsetTop;
	return (dua.indexOf("Opera") < 0 && document.all ? (pcHeight == 0 ? bcScrollTop : pcScrollTop)
		: dua.indexOf("Gecko") < 0 ? (pcHeight == p.offsetHeight 
				&& pcHeight == p.scrollHeight ? bcScrollTop : pcScrollTop) : bcScrollTop);
};


})(Clazz._LoaderProgressMonitor, Jmol);


;(function(Con, Sys) {
Con.maxTotalLines =	10000;

Con.setMaxTotalLines = function(lines) {
	Con.maxTotalLines = (lines > 0 ? lines : 999999);
}

Con.maxLatency = 40;

Con.setMaxLatency = function(latency) {
	Con.maxLatency = (latency > 0 ? latency : 40);
};

Con.pinning  = false;

Con.enablePinning = function(enabled) {
	Con.pinning = enabled;
};

Con.linesCount = 0;

Con.metLineBreak = false;


Con.createConsoleWindow = function(parentEl) {
	var console = document.createElement ("DIV");
	console.style.cssText = "font-family:monospace, Arial, sans-serif;";
	document.body.appendChild (console);
	return console;
};

var c160 = String.fromCharCode(160); //nbsp;
c160 += c160+c160+c160;

Con.consoleOutput = function(s, color) {
	var o = window["j2s.lib"];
	var console = (o && o.console);
	if (console && typeof console == "string")
		console = document.getElementById(console)
	if (!console)
		return false; // BH this just means we have turned off all console action
	if (Con.linesCount > Con.maxTotalLines) {
		for (var i = 0; i < Con.linesCount - Con.maxTotalLines; i++) {
			if (console && console.childNodes.length > 0) {
				console.removeChild (console.childNodes[0]);
			}
		}
		Con.linesCount = Con.maxTotalLines;
	}

	var willMeetLineBreak = false;
	s = (typeof s == "undefined" ? "" : s == null ? "null" : "" + s);
	s = s.replace (/\t/g, c160);
	if (s.length > 0)
		switch (s.charAt(s.length - 1)) {
		case '\n':
		case '\r':
			s = (s.length > 1 ? s.substring (0, s.length - (s.charAt (s.length - 2) == '\r' ? 2 : 1)) : "");
			willMeetLineBreak = true;
			break;
		}

	var lines = null;
	s = s.replace (/\t/g, c160);
	lines = s.split(/\r\n|\r|\n/g);
	for (var i = 0, last = lines.length - 1; i <= last; i++) {
		var lastLineEl = null;
		if (Con.metLineBreak || Con.linesCount == 0 
				|| console.childNodes.length < 1) {
			lastLineEl = document.createElement ("DIV");
			console.appendChild (lastLineEl);
			lastLineEl.style.whiteSpace = "nowrap";
			Con.linesCount++;
		} else {
			try {
				lastLineEl = console.childNodes[console.childNodes.length - 1];
			} catch (e) {
				lastLineEl = document.createElement ("DIV");
				console.appendChild (lastLineEl);
				lastLineEl.style.whiteSpace = "nowrap";
				Con.linesCount++;
			}
		}
		var el = document.createElement ("SPAN");
		lastLineEl.appendChild (el);
		el.style.whiteSpace = "nowrap";
		if (color)
			el.style.color = color;
		var l = lines[i]
		if (l.length == 0)
			l = c160;
		el.appendChild(document.createTextNode(l));
		if (!Con.pinning)
			console.scrollTop += 100;
		Con.metLineBreak = (i != last || willMeetLineBreak);
	}

	var cssClazzName = console.parentNode.className;
	if (!Con.pinning && cssClazzName
			&& cssClazzName.indexOf ("composite") != -1) {
		console.parentNode.scrollTop = console.parentNode.scrollHeight;
	}
	Con.lastOutputTime = new Date().getTime();
};

Con.clear = function(){
	try {
		Con.metLineBreak = true;
		var o = window["j2s.lib"];
		var console = o && o.console;
		if (!console || !(console = document.getElementById (console)))
			return;
		var childNodes = console.childNodes;
		for (var i = childNodes.length; --i >= 0;)
			console.removeChild (childNodes[i]);
		Con.linesCount = 0;
	} catch(e){};
};

Clazz.alert = function(s) {
	Con.consoleOutput (s + "\r\n");
	Jmol.clazzAlert(s);
};


Sys.out.print = function(s) { 
	Con.consoleOutput (s);
};
Sys.out.println = function(s) { 
	Con.consoleOutput(typeof s == "undefined" ? "\r\n" : s == null ?  s = "null\r\n" : s + "\r\n");
};

Sys.out.write = function(buf, offset, len) {
	Sys.out.print(String.instantialize(buf).substring(offset, offset+len));
};

Sys.err.__CLASS_NAME__ = "java.io.PrintStream";

Sys.err.print = function(s) { 
	Con.consoleOutput (s, "red");
};

Sys.err.println = function(s) {
	Con.consoleOutput (typeof s == "undefined" ? "\r\n" : s == null ?  s = "null\r\n" : s + "\r\n", "red");
};

Sys.err.write = function(buf, offset, len) {
	Sys.err.print(String.instantialize(buf).substring(offset, offset+len));
};

})(Clazz.Console, System);

})(Clazz, Jmol); // requires JSmolCore.js

}; // called by external application 
Jmol.___JmolDate="$Date: 2026-03-20 10:03:31 -0500 (Fri, 20 Mar 2026) $"
Jmol.___fullJmolProperties="src/org/jmol/viewer/Jmol.properties"
Jmol.___JmolVersion="16.3.53" // (legacy) also 16.3.54 (swingJS) 
