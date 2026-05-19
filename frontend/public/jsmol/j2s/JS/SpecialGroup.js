Clazz.declarePackage("JS");
Clazz.load(["JS.SpaceGroup"], "JS.SpecialGroup", ["JU.PT", "JU.SimpleUnitCell"], function(){
var c$ = Clazz.decorateAsClass(function(){
this.embeddingSymmetry = null;
Clazz.instantialize(this, arguments);}, JS, "SpecialGroup", JS.SpaceGroup);
Clazz.makeConstructor(c$, 
function(sym, info, type){
Clazz.superConstructor(this, JS.SpecialGroup, [-1, null, true]);
this.embeddingSymmetry = sym;
this.groupType = type;
if (info == null) return;
this.initSpecial(info);
}, "JS.Symmetry,java.util.Map,~N");
Clazz.defineMethod(c$, "initSpecial", 
function(info){
var ops = info.get("gp");
for (var i = 0; i < ops.size(); i++) {
this.addOperation(ops.get(i), 0, false);
}
this.setTransform(info.get("trm"));
this.itaNumber = "" + info.get("sg");
this.itaIndex = "" + info.get("set");
this.specialPrefix = JS.SpaceGroup.getGroupTypePrefix(this.groupType);
this.setHMSymbol(info.get("hm"));
this.setITATableNames(null, this.itaNumber, this.itaIndex, this.itaTransform);
}, "java.util.Map");
Clazz.defineMethod(c$, "setTransform", 
function(transform){
this.itaTransform = transform;
}, "~S");
Clazz.defineMethod(c$, "checkCompatible", 
function(params, newParams, allowSame, monoclinic_oblique, monoclinic_orthogonal, orthorhombic, tetragonal){
var n = (this.itaNumber == null ? 0 : JU.PT.parseInt(this.itaNumber));
var toHex = (n != 0 && this.isHexagonalSG(n, null));
var isHex = (toHex && this.isHexagonalSG(-1, params));
if (toHex && isHex) {
allowSame = true;
}var pc =  new JS.SpaceGroup.ParamCheck(params, allowSame, true);
if (n > (allowSame ? 2 : 0)) {
if (toHex) {
pc.b = pc.a;
pc.alpha = pc.beta = 90;
pc.gamma = 120;
} else if (n >= tetragonal) {
pc.b = pc.a;
if (pc.acsame && !allowSame) pc.c = pc.a * 1.5;
pc.alpha = pc.beta = pc.gamma = 90;
} else if (n >= orthorhombic) {
pc.alpha = pc.beta = pc.gamma = 90;
} else if (n >= monoclinic_orthogonal) {
pc.beta = 90;
if (this.groupType == 400) {
pc.gamma = 90;
} else {
pc.alpha = 90;
}} else if (n >= monoclinic_oblique) {
pc.beta = 90;
if (this.groupType == 400) {
pc.alpha = 90;
} else {
pc.gamma = 90;
}}}return pc.checkNew(params, newParams == null ? params : newParams);
}, "~A,~A,~B,~N,~N,~N,~N");
})();
})();
})();
})();
});
;//5.0.1-v7 Mon Mar 16 22:03:40 CDT 2026
