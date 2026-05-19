
Jmol.Info = {      
			use: "HTML5", // could be JAVA or HTML5
			serverURL: "http://your.server.here/jsmol.php", // required for binary file loading (Spartan, .gz, .map, etc.)
	disableJ2SLoadMonitor: false,
	disableInitialConsole: true

}


var _jmol = {
	appletCount: 0,
	applets: {},
	allowedJmolSize: [25, 2048, 300],   // min, max, default (pixels)
	codebase: ".",
	targetSuffix: 0,
	target: "jmolApplet0",
	buttonCount: 0,
	checkboxCount: 0,
	linkCount: 0,
	cmdCount: 0,
	menuCount: 0,
	radioCount: 0,
	radioGroupCount: 0,
	initialized: false,
	initChecked: false,
	archivePath: "JmolAppletSigned0.jar"
}

function _jmolApplet(size, inlineModel, script, nameSuffix) {
		nameSuffix == null && (nameSuffix = _jmol.appletCount);
		var id = "jmolApplet" + nameSuffix;
		jmolSetTarget(nameSuffix);
		++_jmol.appletCount;
		script || (script = "select *");
		inlineModel && (script = 'load DATA "inline"\n' + inlineModel + '\nEND "inline";' + script); 
		var Info = {}
		for (var i in Jmol.Info)
			Info[i] = Jmol.Info[i]
		Info.jarFile || (Info.jarFile = _jmol.archivePath);
		Info.jarPath || (Info.jarPath = _jmol.codebase);
		Info.j2sPath || (Info.j2sPath = Info.jarPath + "/j2s");    
		var sz = _jmolGetAppletSize(size);
		Info.width || (Info.width = sz[0]);
		Info.height || (Info.height = sz[1]);  
		Info.script || (Info.script = script);
		Info.isSigned == null && (Info.isSigned = (Info.jarFile.indexOf("Signed") >= 0));
		for (var i in _jmol.params)
			if(_jmol.params[i]!="")
				Info[i] || (Info[i] = _jmol.params[i]);
		return _jmol.applets[id] = Jmol.getApplet(id, Info)
}

function _jmolGetJarFilename(fileNameOrFlag) {
	_jmol.archivePath =
		(typeof(fileNameOrFlag) == "string"  ? fileNameOrFlag : (fileNameOrFlag ?  "JmolAppletSigned" : "JmolApplet") + "0.jar");
}


function jmolSetParameter(key,value) {
	Jmol.Info[key] = value;
}

function jmolSetXHTML(id) {
	Jmol.setXHTML(id);
}

function jmolSetTranslation(TF) {
}

function jmolInitialize(codebaseDirectory, fileNameOrUseSignedApplet) {
	if (_jmol.initialized)
		return;
	_jmol.initialized = true;
	if(_jmol.jmoljar) {
		var f = _jmol.jmoljar;
		if (f.indexOf("/") >= 0) {
			alert ("This web page URL is requesting that the applet used be " + f + ". This is a possible security risk, particularly if the applet is signed, because signed applets can read and write files on your local machine or network.")
			var ok = prompt("Do you want to use applet " + f + "? ","yes or no")
			if (ok == "yes") {
				codebaseDirectory = f.substring(0, f.lastIndexOf("/"));
				fileNameOrUseSignedApplet = f.substring(f.lastIndexOf("/") + 1);
			} else {
	_jmolGetJarFilename(fileNameOrUseSignedApplet);
				alert("The web page URL was ignored. Continuing using " + _jmol.archivePath + ' in directory "' + codebaseDirectory + '"');
			}
		} else {
			fileNameOrUseSignedApplet = f;
		}
	}
	_jmol.codebase = codebaseDirectory;
	_jmolGetJarFilename(fileNameOrUseSignedApplet);
}

function jmolSetDocument(doc) {
	_jmol.currentDocument = Jmol._document = doc;
}

function jmolSetAppletColor(boxbgcolor, boxfgcolor, progresscolor) {
	Jmol.Info.color = boxbgcolor ? boxbgcolor : "black";
}

function jmolSetAppletWindow(w) {
	_jmol.appletWindow = w;
}

function jmolApplet(size, script, nameSuffix) {
	return _jmolApplet(size, null, script, nameSuffix);
}

function jmolAppletInline(size, inlineModel, script, nameSuffix) {
	return _jmolApplet(size, inlineModel, script, nameSuffix);
}




function jmolButton(script, label, id, title) {
	return Jmol.jmolButton(_jmol.target, script, label, id, title);
}

function jmolCheckbox(scriptWhenChecked, scriptWhenUnchecked, labelHtml, isChecked, id, title) {
	return Jmol.jmolCheckbox(_jmol.target, scriptWhenChecked, scriptWhenUnchecked, labelHtml, isChecked, id, title)
}

function jmolRadioGroup(arrayOfRadioButtons, separatorHtml, groupName, id, title) {
	return Jmol.jmolRadioGroup(_jmol.target, arrayOfRadioButtons, separatorHtml, groupName, id, title)
}


function jmolRadio(script, labelHtml, isChecked, separatorHtml, groupName, id, title) {
	return  Jmol.jmolRadio(_jmol.target, script, labelHtml, isChecked, separatorHtml, groupName, id, title)
}

function jmolLink(script, label, id, title) {
	return Jmol.jmolLink(_jmol.target, script, label, id, title)
}

function jmolCommandInput(label, size, id, title) {
	return Jmol.jmolCommandInput(_jmol.target, label, size, id, title);
}

function jmolMenu(arrayOfMenuItems, size, id, title) {
	return Jmol.jmolMenu(_jmol.target, arrayOfMenuItems, size, id, title);
}

function jmolHtml(html) {
	return Jmol._documentWrite(html);
}

function jmolBr() {
	return Jmol._documentWrite("<br />");
}


function jmolDebugAlert(enableAlerts) {
}


function jmolLoadInline(model, targetSuffix) {
	return jmolLoadInlineScript(model, null, targetSuffix, false)
}

function jmolLoadInlineArray(ModelArray, script, targetSuffix) {
	return jmolLoadInlineScript(ModelArray.join("\n"), script, targetSuffix, false)
}

function jmolAppendInlineArray(ModelArray, script, targetSuffix) {
	return jmolLoadInlineScript(ModelArray.join("\n"), script, targetSuffix, true)
}

function jmolAppendInlineScript(model, script, targetSuffix) {
	return jmolLoadInlineScript(model, script, targetSuffix, true)
}

function jmolLoadInlineScript(model, script, targetSuffix, isAppend) {
	Jmol.script(jmolFindTarget(targetSuffix),
		 "load " 
		 + (isAppend ? "APPEND " : "") 
		 + "DATA 'mydata'\n" + model.replace(/\"/g,'\\"') + "\nEND 'mydata'\n")
}

function jmolSetTarget(targetSuffix) {
	targetSuffix == null || (_jmol.targetSuffix = targetSuffix);
	return _jmol.target = "jmolApplet" + _jmol.targetSuffix;
}

function jmolFindTarget(targetSuffix) {
	return _jmol.applets[jmolSetTarget(targetSuffix)];
}

function jmolScript(script, targetSuffix) {
    if (targetSuffix == "all") {
      for (var app in Jmol._applets) {
        var applet = (app.indexOf("__") >= 0 ? null  : Jmol._applets[app]);
        if (applet) applet.script(script);
      }
    } else {
    	Jmol.script(jmolFindTarget(targetSuffix), script)
    }
}

function jmolCheckBrowser(action, urlOrMessage, nowOrLater) {
}


function jmolSetAppletCssClass(appletCssClass) {
	Jmol.setAppletCss(appletCssClass)
}

function jmolSetButtonCssClass(s) {
	Jmol.setButtonCss(s)
}

function jmolSetCheckboxCssClass(s) {
	Jmol.setCheckboxCss(s)
}

function jmolSetRadioCssClass(s) {
	Jmol.setRadioCss(s)
}

function jmolSetLinkCssClass(s) {
	Jmol.setLinkCss(s)
}

function jmolSetMenuCssClass(s) {
	Jmol.setMenuCss(s)
}

function jmolSetMemoryMb(nMb) {
}


function jmolSetCallback(callbackName,funcName) {
	Jmol.Info[callbackName] = funcName
}

function jmolSetSyncId(n) {
	alert("jmolSetSyncId " + n + " must be included in Info definition")
}

function jmolSetLogLevel(n) {
	Jmol.script(_jmol.target, "set loglevel " + n)
}

function _jmolGetAppletSize(size, units) {
	var width, height;
	if ( (typeof size) == "object" && size != null ) {
		width = size[0]; height = size[1];
	} else {
		width = height = size;
	}
	return [_jmolFixDim(width, units), _jmolFixDim(height, units)];
}

function _jmolFixDim(x, units) {
	var sx = "" + x;
	return (sx.length == 0 ? (units ? "" : _jmol.allowedJmolSize[2])
	: sx.indexOf("%") == sx.length-1 ? sx
		: (x = parseFloat(x)) <= 1 && x > 0 ? x * 100 + "%"
		: (isNaN(x = Math.floor(x)) ? _jmol.allowedJmolSize[2]
			: x < _jmol.allowedJmolSize[0] ? _jmol.allowedJmolSize[0]
				: x > _jmol.allowedJmolSize[1] ? _jmol.allowedJmolSize[1]
				: x) + (units ? units : ""));
}


function jmolGetStatus(strStatus,targetSuffix){
	return Jmol.getStatus(jmolFindTarget(targetSuffix), strStatus)
}

function jmolGetPropertyAsArray(sKey,sValue,targetSuffix) {
	return Jmol.getPropertyAsArray(jmolFindTarget(targetSuffix), sKey, sValue)
}

function jmolGetPropertyAsString(sKey,sValue,targetSuffix) {
	return Jmol.getPropertyAsString(jmolFindTarget(targetSuffix), sKey, sValue)
}

function jmolGetPropertyAsJSON(sKey,sValue,targetSuffix) {
	return Jmol.getPropertyAsJSON(jmolFindTarget(targetSuffix), sKey, sValue)
}

function jmolGetPropertyAsJavaObject(sKey,sValue,targetSuffix) {
	return Jmol.getPropertyAsJavaObject(jmolFindTarget(targetSuffix), sKey, sValue)
}


function jmolScriptWait(script, targetSuffix) {
	return Jmol.scriptWait(jmolFindTarget(targetSuffix), script)
}

function jmolScriptWaitOutput(script, targetSuffix) {
	return Jmol.scriptWaitOutput(jmolFindTarget(targetSuffix), script)
}

function jmolEvaluate(molecularMath, targetSuffix) {
	return Jmol.evaluate(jmolFindTarget(targetSuffix), molecularMath)
}

function jmolScriptEcho(script, targetSuffix) {
	return Jmol.scriptEcho(jmolFindTarget(targetSuffix), script)
}


function jmolScriptMessage(script, targetSuffix) {
	return Jmol.scriptMessage(jmolFindTarget(targetSuffix), script)
}


function jmolScriptWaitAsArray(script, targetSuffix) {
	return Jmol.scriptWait(jmolFindTarget(targetSuffix), script)
}




function jmolSaveOrientation(id, targetSuffix) {
	return Jmol.saveOrientation(jmolFindTarget(targetSuffix), id)
}

function jmolRestoreOrientation(id, targetSuffix) {
	return Jmol.restoreOrientation(jmolFindTarget(targetSuffix), id)
}

function jmolRestoreOrientationDelayed(id, delay, targetSuffix) {
	return Jmol.restoreOrientationDelayed(jmolFindTarget(targetSuffix), id, delay)
}

function jmolResizeApplet(size, targetSuffix) {
	return Jmol.resizeApplet(jmolFindTarget(targetSuffix), size);
}



function jmolAppletAddParam(appletCode,name,value){
	alert ("use Info to add a parameter: " + name + "/" + value)
}

