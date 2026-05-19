Clazz.declarePackage("JS");
Clazz.load(["JU.M4"], "JS.CLEG", ["java.util.Arrays", "JU.AU", "$.BS", "$.P3", "$.PT", "JS.SV", "JS.SpaceGroup", "$.UnitCell", "JV.Viewer"], function(){
var c$ = Clazz.declareType(JS, "CLEG", null);
;(function(){
var c$ = Clazz.decorateAsClass(function(){
this.tokens = null;
this.sym = null;
this.trMat = null;
this.errString = null;
this.trLink = null;
this.trTemp = null;
this.prevNode = null;
this.retMap = null;
this.retLst = null;
this.asM4 = false;
Clazz.instantialize(this, arguments);}, JS.CLEG, "ClegData", null);
Clazz.prepareFields (c$, function(){
this.trTemp =  new JU.M4();
});
Clazz.makeConstructor(c$, 
function(sym, tokens){
this.tokens = tokens;
this.sym = sym;
}, "J.api.SymmetryInterface,~A");
Clazz.defineMethod(c$, "setSymmetry", 
function(sym){
this.sym = sym;
}, "J.api.SymmetryInterface");
Clazz.defineMethod(c$, "addSGTransform", 
function(tr, what){
if (this.trMat == null) {
System.out.println("ClegData reset");
this.trMat =  new JU.M4();
this.trMat.setIdentity();
}if (tr != null) {
this.trMat.mul(this.matFor(tr));
}if (what != null) System.out.println("ClegData adding " + what + " " + tr + " now " + this.abcFor(this.trMat));
return this.trMat;
}, "~S,~S");
Clazz.defineMethod(c$, "abcFor", 
function(trm){
return this.sym.staticGetTransformABC(trm, false);
}, "JU.M4");
Clazz.defineMethod(c$, "matFor", 
function(trm){
return this.sym.convertTransform(trm, (trm.indexOf(">") > 0 ? null : this.trTemp));
}, "~S");
Clazz.defineMethod(c$, "removePrevNodeTrm", 
function(){
if (this.prevNode != null && this.prevNode.myTrm != null && !this.prevNode.disabled) {
this.addSGTransform("!" + this.prevNode.myTrm, "!prevNode.myTrm");
}});
Clazz.defineMethod(c$, "calculate", 
function(trm0){
trm0.invert();
var trm1 = JU.M4.newM4(this.trMat);
trm1.mul(trm0);
return this.sym.convertTransform(null, trm1);
}, "JU.M4");
Clazz.defineMethod(c$, "updateTokens", 
function(node){
var index = node.index;
var s = node.name;
if (s.startsWith("ITA/")) s = s.substring(4);
 else s = (node.myIta == null ? "." : node.myIta) + ":" + node.myTrm;
this.setToken(index, s);
if (node.calculated != null && index > 0) this.setToken(index - 1, node.calculated);
}, "JS.CLEG.ClegNode");
Clazz.defineMethod(c$, "setToken", 
function(index, s){
this.tokens[index] = s;
}, "~N,~S");
Clazz.defineMethod(c$, "addTransformLink", 
function(){
if (this.trLink == null) {
this.trLink =  new JU.M4();
this.trLink.setIdentity();
}this.trLink.mul(this.trTemp);
});
Clazz.defineMethod(c$, "setNodeTransform", 
function(node){
node.myTrm = this.abcFor(this.trMat);
node.setITAName(node.name);
}, "JS.CLEG.ClegNode");
Clazz.defineMethod(c$, "addTransform", 
function(index, transform){
this.addSGTransform(transform, ">t>");
this.addTransformLink();
System.out.println("CLEG.addTransform index=" + index + " trm=" + this.trMat);
}, "~N,~S");
Clazz.defineMethod(c$, "getPrevNode", 
function(){
return this.prevNode;
});
Clazz.defineMethod(c$, "setPrevNode", 
function(node){
return this.prevNode = node;
}, "JS.CLEG.ClegNode");
Clazz.defineMethod(c$, "addPrimitiveTransform", 
function(myIta, myTrm){
var hmName = this.sym.getSpaceGroupInfoObj("hmName", myIta + ":" + myTrm, false, false);
if (hmName == null) return myTrm;
var c = hmName.charAt(0);
if ("ABCFI".indexOf(c) < 0) return myTrm;
var t = JU.M4.newMV(JS.UnitCell.getPrimitiveTransform(c), JU.P3.new3(0, 0, 0));
t.mul(this.matFor(myTrm));
return this.abcFor(t);
}, "~S,~S");
Clazz.defineMethod(c$, "setReturnMap", 
function(ret){
if (ret != null) {
this.asM4 = (ret.get("ASM4") === Boolean.TRUE);
ret.clear();
}this.retMap = ret;
}, "java.util.Map");
Clazz.defineMethod(c$, "setReturnLst", 
function(ret){
if (ret != null) ret.clear();
this.retLst = ret;
}, "JU.Lst");
;(function(){
var c$ = Clazz.decorateAsClass(function(){
this.name = null;
this.myIta = null;
this.myTrm = null;
this.index = 0;
this.calcNext = null;
this.calcI1 = 0;
this.calcI2 = 0;
this.calcDepthMin = 0;
this.calcDepthMax = 0;
this.calcIndexMin = 0;
this.calcIndexMax = 0;
this.calculated = null;
this.disabled = false;
this.isThisModelCalc = false;
this.hallSymbol = null;
this.specialType = 0;
this.specialPrefix = "";
Clazz.instantialize(this, arguments);}, JS.CLEG, "ClegNode", null);
Clazz.makeConstructor(c$, 
function(data, index, name){
if (name == null) return;
this.index = index;
this.init(data, name);
}, "JS.CLEG.ClegData,~N,~S");
Clazz.defineMethod(c$, "disable", 
function(){
this.disabled = true;
});
Clazz.defineMethod(c$, "checkSpecial", 
function(name){
switch (this.specialType = JS.SpaceGroup.getExplicitSpecialGroupType(name)) {
case -1:
return null;
case 0:
if (!JS.CLEG.allow300) return name;
var ptDot = name.indexOf(".");
var sname = (ptDot > 0 ? name.substring(0, ptDot) : name);
var itno = JS.SpaceGroup.getITNo(sname, 0);
if (itno < 300) return name;
if (itno > 600) return null;
this.specialType = (Clazz.doubleToInt(itno / 100)) * 100;
this.specialPrefix = JS.SpaceGroup.getGroupTypePrefix(itno);
return "" + (itno - this.specialType) + name.substring(sname.length);
default:
this.specialPrefix = name.substring(0, 2);
return name.substring(2);
}
}, "~S");
Clazz.defineMethod(c$, "init", 
function(data, name){
var pt = JS.CLEG.isProbableClegSetting(name);
if (pt > 0) {
this.myIta = name.substring(0, pt);
this.myTrm = name.substring(pt + 1);
}if (name.equals("ref")) {
this.isThisModelCalc = true;
}name = this.checkSpecial(name);
var isPrimitive = name.endsWith(":p");
if (isPrimitive) name = name.substring(0, name.length - 2);
var isITAnDotm = name.startsWith("ITA/");
if (isITAnDotm) {
name = this.checkSpecial(name.substring(4));
}var isHM = false;
this.hallSymbol = null;
var hallTrm = null;
if (this.specialType == 0 && name.charAt(0) == '[') {
pt = name.indexOf(']');
if (pt < 0) {
data.errString = "invalid Hall symbol: " + name + "!";
return;
}this.hallSymbol = name.substring(1, pt);
pt = this.hallSymbol.indexOf("(");
if (pt > 0) {
hallTrm = this.hallSymbol.substring(pt + 1, this.hallSymbol.length - 1) + " ";
this.hallSymbol = this.hallSymbol.substring(0, pt).trim();
hallTrm = JU.PT.rep(hallTrm, " ", "/12,");
hallTrm = "a,b,c;" + hallTrm.substring(0, hallTrm.length - 1);
}pt = name.indexOf(":");
if (pt > 0) {
this.myTrm = name.substring(pt + 1);
}name = "Hall:" + this.hallSymbol;
} else if (name.startsWith("HM:")) {
isHM = true;
} else if (name.length <= 3) {
isITAnDotm = (JS.SpaceGroup.getITNo(name, 0) > 0);
if (isITAnDotm) {
name = this.checkSpecial(name) + ".1";
}}if (!isITAnDotm && this.hallSymbol == null && !isHM) {
pt = (JU.PT.isDigit(name.charAt(0)) ? name.indexOf(" ") : -1);
if (pt > 0) name = name.substring(0, pt);
if (name.indexOf('.') > 0 && !Float.isNaN(JU.PT.parseFloat(name))) {
isITAnDotm = true;
}}if (isITAnDotm) {
this.myTrm = (name.endsWith(".1") ? "a,b,c" : data.sym.getSpaceGroupInfoObj("itaTransform", this.specialPrefix + name, false, false));
if (this.myTrm == null) {
data.errString = "Unknown ITA setting: " + this.specialPrefix + name + "!";
return;
}var parts = JU.PT.split(name, ".");
this.myIta = parts[0];
} else {
if (this.myIta == null) this.myIta = data.sym.getSpaceGroupInfoObj("itaNumber", this.specialPrefix + name, false, false);
if (this.myTrm == null) this.myTrm = data.sym.getSpaceGroupInfoObj("itaTransform", this.specialPrefix + name, false, false);
if (this.hallSymbol != null && hallTrm != null) {
this.myTrm = hallTrm + (this.myTrm.equals("a,b,c") ? "" : ">" + this.myTrm);
}}if ("0".equals(this.myIta)) {
data.errString = "Could not get ITA space group for " + name + "!";
return;
}if (isPrimitive) {
this.myTrm = data.addPrimitiveTransform(this.myIta, this.myTrm);
}this.setITAName(name);
}, "JS.CLEG.ClegData,~S");
Clazz.defineMethod(c$, "setITAName", 
function(name){
return this.name = (".".equals(name) || this.myIta == null ? "." : "ITA/" + this.specialPrefix + this.myIta) + (this.myTrm == null ? "" : ":" + this.myTrm);
}, "~S");
Clazz.defineMethod(c$, "update", 
function(data){
if (data.errString != null) return false;
if (this.name == null) return true;
var prev = data.prevNode;
if (prev.isThisModelCalc) prev.myIta = this.myIta;
var haveReferenceCell = (data.trLink == null && (this.myIta != null && (this.myIta.equals(prev.myIta) || prev.calcNext != null)));
if (!haveReferenceCell) return true;
var trm0 = JU.M4.newM4(data.trMat);
data.removePrevNodeTrm();
var trCalc = null;
if (prev.calcNext != null) {
var isSub = true;
var isImplicit = false;
var isCalcFunction = false;
switch (prev.calcNext) {
case "super(":
case "sub(":
isCalcFunction = true;
break;
case "super":
isSub = false;
break;
case "sub":
break;
case "":
case "set":
prev.calcNext = "set";
isImplicit = true;
break;
}
var ita1 = JU.PT.parseInt(prev.myIta);
var ita2 = JU.PT.parseInt(this.myIta);
var unspecifiedSettingChangeOnly = !isCalcFunction && (data.retLst == null && (data.retMap == null || data.asM4) && isImplicit && ita1 == ita2);
if (!unspecifiedSettingChangeOnly) {
var flags = (prev.calcIndexMax << 24) | (prev.calcIndexMin << 16) | (prev.calcDepthMax << 8) | prev.calcDepthMin;
trCalc = data.sym.getSubgroupJSON((isSub ? prev.name : this.name), (isSub ? this.name : prev.name), prev.calcI1, prev.calcI2, flags, data.retMap, data.retLst);
var haveCalc = (trCalc != null);
if (haveCalc) {
if (trCalc.endsWith("!")) {
data.errString = trCalc;
return false;
}if (!isSub) trCalc = "!" + trCalc;
}var calc = prev.myIta + ">" + (haveCalc ? trCalc : "?") + ">" + this.myIta;
if (!haveCalc) {
data.errString = calc + "!";
return false;
}data.addSGTransform(trCalc, "sub");
}}if (!this.disabled) data.addSGTransform(this.myTrm, "myTrm");
this.calculated = data.calculate(trm0);
System.out.println("calculated is " + this.calculated + (data.retMap == null ? "" : " for the path " + data.retMap.get("indexPath")));
return true;
}, "JS.CLEG.ClegData");
Clazz.defineMethod(c$, "getName", 
function(){
return this.name;
});
Clazz.defineMethod(c$, "getCleanITAName", 
function(){
if (this.name == null) return (this.name = ".");
var s = (this.name.startsWith("ITA/") ? this.name.substring(4) : this.name);
if (this.specialType != 0 && !s.startsWith(this.specialPrefix)) s = this.specialPrefix + s;
return s;
});
Clazz.defineMethod(c$, "isDefaultSetting", 
function(){
return (this.myTrm == null || JS.CLEG.cleanCleg000(this.myTrm).equals("a,b,c"));
});
Clazz.defineMethod(c$, "setCalcNext", 
function(data, token){
var pt = token.length;
switch (pt == 0 ? token : JS.CLEG.getCalcType(token)) {
case "sub":
if (data.retLst != null || data.retMap != null) {
pt = 0;
break;
}case "super":
this.calcI1 = 1;
this.calcI2 = 1;
pt = 3;
break;
case "sub(":
pt = -3;
break;
case "super(":
pt = -5;
break;
}
var isErr = true;
while (true) {
if (pt == 0) {
this.calcIndexMin = 2;
this.calcIndexMax = 0xFF;
this.calcDepthMin = 1;
this.calcDepthMax = 0xFF;
isErr = false;
} else if (pt > 0) {
this.calcIndexMin = 2;
this.calcIndexMax = 0xFF;
this.calcDepthMin = 1;
this.calcDepthMax = 1;
isErr = false;
} else {
if (token.indexOf(")") != token.length - 1) break;
var params = JU.PT.split(JU.PT.trim(token.toLowerCase().substring(-pt + 1), ")"), ",");
try {
if (token.length == 5 || token.indexOf('=') >= 0) {
this.calcIndexMin = 2;
this.calcIndexMax = 0xFF;
this.calcDepthMin = 1;
this.calcDepthMax = 0xFF;
token = token.substring(0, -pt);
for (var i = params.length; --i >= 0; ) {
var p = params[i];
var val = Math.min(0xFF, Integer.parseInt(p.substring(p.indexOf('=') + 1)));
if (p.startsWith("indexmax=")) this.calcIndexMax = Math.max(2, val);
 else if (p.startsWith("indexmin=")) this.calcIndexMin = Math.max(2, val);
 else if (p.startsWith("index=")) this.calcIndexMin = this.calcIndexMax = Math.max(2, val);
if (p.startsWith("depthmax=")) this.calcDepthMax = Math.max(1, val);
 else if (p.startsWith("depthmin=")) this.calcDepthMin = Math.max(1, val);
 else if (p.startsWith("depth=")) this.calcDepthMin = this.calcDepthMax = Math.max(1, val);
}
} else {
switch (params.length) {
case 2:
this.calcI2 = Math.max(0, Integer.parseInt(params[1])) & 0xFF;
case 1:
this.calcI1 = Math.max(1, Integer.parseInt(params[0])) & 0xFF;
break;
}
}token = token.substring(0, -pt);
isErr = false;
} catch (e) {
if (Clazz.exceptionOf(e, Exception)){
} else {
throw e;
}
}
}break;
}
if (isErr) {
data.errString = "Error parsing CLEG " + token + "!";
return false;
}this.calcNext = token;
return true;
}, "JS.CLEG.ClegData,~S");
Clazz.overrideMethod(c$, "toString", 
function(){
return "[ClegNode #" + this.index + " " + this.name + "   " + this.myIta + ":" + this.myTrm + (this.disabled ? " disabled" : "") + "]";
});
;(function(){
var c$ = Clazz.decorateAsClass(function(){
this.vwr = null;
this.mkCalcOnly = false;
this.mkIsAssign = false;
this.mkSb = null;
this.mkIgnoreAllSettings = false;
this.mkSym00 = null;
this.mkBitset = null;
this.mkParamsOrUC = null;
this.mkWasNode = false;
this.mkIndex = 0;
Clazz.instantialize(this, arguments);}, JS.CLEG, "AssignedSGParams", null);
Clazz.makeConstructor(c$, 
function(vwr, isCurrentSG){
this.vwr = vwr;
this.mkCalcOnly = true;
this.mkIsAssign = false;
this.mkSb = null;
if (isCurrentSG) this.mkSym00 = vwr.getOperativeSymmetry();
}, "JV.Viewer,~B");
Clazz.makeConstructor(c$, 
function(vwr, sym00, bs, paramsOrUC, index, ignoreAllSettings, sb, isAssign){
this.vwr = vwr;
this.mkCalcOnly = false;
this.mkIndex = index;
this.mkSym00 = sym00;
this.mkBitset = bs;
this.mkParamsOrUC = paramsOrUC;
this.mkIgnoreAllSettings = ignoreAllSettings;
this.mkSb = sb;
this.mkIsAssign = isAssign;
}, "JV.Viewer,J.api.SymmetryInterface,JU.BS,~O,~N,~B,JU.SB,~B");
