Clazz.declarePackage("JS");
Clazz.load(["JU.M4"], "JS.HallInfo", ["JU.P3i", "$.SB", "JS.SymmetryOperation", "JU.Logger"], function(){
var c$ = Clazz.decorateAsClass(function(){
this.hallSymbol = null;
this.primitiveHallSymbol = null;
this.latticeCode = '\0';
this.latticeExtension = null;
this.$isCentrosymmetric = false;
this.rotationTerms = null;
this.nRotations = 0;
this.vector12ths = null;
this.vectorCode = null;
Clazz.instantialize(this, arguments);}, JS, "HallInfo", null);
Clazz.prepareFields (c$, function(){
this.rotationTerms =  new Array(16);
});
Clazz.makeConstructor(c$, 
function(hallSymbol){
this.init(hallSymbol);
}, "~S");
Clazz.defineMethod(c$, "getRotationCount", 
function(){
return this.nRotations;
});
Clazz.defineMethod(c$, "isGenerated", 
function(){
return this.nRotations > 0;
});
Clazz.defineMethod(c$, "getLatticeCode", 
function(){
return this.latticeCode;
});
Clazz.defineMethod(c$, "isCentrosymmetric", 
function(){
return this.$isCentrosymmetric;
});
Clazz.defineMethod(c$, "getHallSymbol", 
function(){
return this.hallSymbol;
});
Clazz.defineMethod(c$, "init", 
function(hallSymbol){
try {
var str = this.hallSymbol = hallSymbol.trim();
str = this.extractLatticeInfo(str);
if (JS.HallInfo.HallTranslation.getLatticeIndex(this.latticeCode) == 0) return;
this.latticeExtension = JS.HallInfo.HallTranslation.getLatticeExtension(this.latticeCode, this.$isCentrosymmetric);
str = this.extractVectorInfo(str) + this.latticeExtension;
if (JU.Logger.debugging) JU.Logger.debug("Hallinfo: " + hallSymbol + " " + str);
var prevOrder = 0;
var prevAxisType = '\u0000';
this.primitiveHallSymbol = "P";
while (str.length > 0 && this.nRotations < 16) {
str = this.extractRotationInfo(str, prevOrder, prevAxisType);
var r = this.rotationTerms[this.nRotations - 1];
prevOrder = r.order;
prevAxisType = r.axisType;
this.primitiveHallSymbol += " " + r.primitiveCode;
}
this.primitiveHallSymbol += this.vectorCode;
} catch (e) {
if (Clazz.exceptionOf(e, Exception)){
JU.Logger.error("Invalid Hall symbol " + e);
this.nRotations = 0;
} else {
throw e;
}
}
}, "~S");
Clazz.defineMethod(c$, "dumpInfo", 
function(){
var sb =  new JU.SB();
sb.append("\nHall symbol: ").append(this.hallSymbol).append("\nprimitive Hall symbol: ").append(this.primitiveHallSymbol).append("\nlattice type: ").append(this.getLatticeDesignation());
for (var i = 0; i < this.nRotations; i++) {
sb.append("\n\nrotation term ").appendI(i + 1).append(this.rotationTerms[i].dumpInfo(this.vectorCode));
}
return sb.toString();
});
Clazz.defineMethod(c$, "getLatticeDesignation", 
function(){
return JS.HallInfo.HallTranslation.getLatticeDesignation2(this.latticeCode, this.$isCentrosymmetric);
});
Clazz.defineMethod(c$, "extractLatticeInfo", 
function(name){
var i = name.indexOf(" ");
if (i < 0) return "";
var term = name.substring(0, i).toUpperCase();
this.latticeCode = term.charAt(0);
if (this.latticeCode == '-') {
this.$isCentrosymmetric = true;
this.latticeCode = term.charAt(1);
}return name.substring(i + 1).trim();
}, "~S");
Clazz.defineMethod(c$, "extractVectorInfo", 
function(name){
this.vector12ths =  new JU.P3i();
this.vectorCode = "";
var i = name.indexOf("(");
var j = name.indexOf(")", i);
if (i > 0 && j > i) {
var term = name.substring(i + 1, j);
this.vectorCode = " (" + term + ")";
name = name.substring(0, i).trim();
i = term.indexOf(" ");
if (i >= 0) {
this.vector12ths.x = Integer.parseInt(term.substring(0, i));
term = term.substring(i + 1).trim();
i = term.indexOf(" ");
if (i >= 0) {
this.vector12ths.y = Integer.parseInt(term.substring(0, i));
term = term.substring(i + 1).trim();
}}this.vector12ths.z = Integer.parseInt(term);
}return name;
}, "~S");
Clazz.defineMethod(c$, "extractRotationInfo", 
function(name, prevOrder, prevAxisType){
var i = name.indexOf(" ");
var code;
if (i >= 0) {
code = name.substring(0, i);
name = name.substring(i + 1).trim();
} else {
code = name;
name = "";
}this.rotationTerms[this.nRotations] =  new JS.HallInfo.HallRotationTerm(this, code, prevOrder, prevAxisType);
this.nRotations++;
return name;
}, "~S,~N,~S");
Clazz.overrideMethod(c$, "toString", 
function(){
return this.hallSymbol;
});
Clazz.defineMethod(c$, "generateAllOperators", 
function(sg){
var mat1 =  new JU.M4();
var operation =  new JU.M4();
var newOps =  new Array(7);
for (var i = 0; i < 7; i++) newOps[i] =  new JU.M4();

var nOps = sg.getMatrixOperationCount();
for (var i = 0; i < this.nRotations; i++) {
var rt = this.rotationTerms[i];
mat1.setM4(rt.seitzMatrix12ths);
var nRot = rt.order;
newOps[0].setIdentity();
for (var j = 1; j <= nRot; j++) {
var m = newOps[j];
m.mul2(mat1, newOps[0]);
newOps[0].setM4(m);
var nNew = 0;
for (var k = 0; k < nOps; k++) {
operation.mul2(m, sg.getMatrixOperation(k));
operation.m03 = (Clazz.floatToInt(operation.m03) + 12) % 12;
operation.m13 = (Clazz.floatToInt(operation.m13) + 12) % 12;
operation.m23 = (Clazz.floatToInt(operation.m23) + 12) % 12;
if (sg.addHallOperationCheckDuplicates(operation)) {
nNew++;
}}
nOps += nNew;
}
}
}, "JS.HallInfo.HallReceiver");
c$.getHallLatticeEquivalent = Clazz.defineMethod(c$, "getHallLatticeEquivalent", 
function(shellXLATTCode){
var latticeCode = JS.HallInfo.HallTranslation.getLatticeCode(shellXLATTCode);
var isCentrosymmetric = (shellXLATTCode > 0);
return (isCentrosymmetric ? "-" : "") + latticeCode + " 1";
}, "~N");
c$.getLatticeDesignation = Clazz.defineMethod(c$, "getLatticeDesignation", 
function(latt){
return JS.HallInfo.HallTranslation.getLatticeDesignation(latt);
}, "~N");
c$.getLatticeIndex = Clazz.defineMethod(c$, "getLatticeIndex", 
function(latticeCode){
return JS.HallInfo.HallTranslation.getLatticeIndex(latticeCode);
}, "~S");
c$.getLatticeIndexFromCode = Clazz.defineMethod(c$, "getLatticeIndexFromCode", 
function(latticeParameter){
return JS.HallInfo.getLatticeIndex(JS.HallInfo.HallTranslation.getLatticeCode(latticeParameter));
}, "~N");
Clazz.declareInterface(JS.HallInfo, "HallReceiver");
})();
})();
})();
});
;//5.0.1-v7 Wed Mar 25 00:33:43 CDT 2026
