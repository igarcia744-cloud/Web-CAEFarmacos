Clazz.declarePackage("JS");
Clazz.load(["JU.BS"], "JS.CIPChirality", ["java.util.Arrays", "$.Collections", "$.Hashtable", "JU.Lst", "$.PT", "JU.Elements", "$.Logger", "JV.JC"], function(){
var c$ = Clazz.decorateAsClass(function(){
this.currentRule = 1;
this.root = null;
this.data = null;
this.doTrack = false;
this.isAux = false;
this.bsNeedRule = null;
this.havePseudoAuxiliary = false;
this.ptIDLogger = 0;
if (!Clazz.isClassDefined("JS.CIPChirality.CIPAtom")) {
JS.CIPChirality.$CIPChirality$CIPAtom$ ();
}
Clazz.instantialize(this, arguments);}, JS, "CIPChirality", null);
Clazz.prepareFields (c$, function(){
this.bsNeedRule =  new JU.BS();
});
Clazz.makeConstructor(c$, 
function(){
});
Clazz.defineMethod(c$, "getRuleName", 
function(rule){
return JS.CIPChirality.ruleNames[rule];
}, "~N");
Clazz.defineMethod(c$, "getChiralityForAtoms", 
function(data){
if (data.bsAtoms.isEmpty()) return;
this.data = data;
this.doTrack = data.isTracker();
this.ptIDLogger = 0;
var bsToDo = data.bsMolecule.clone();
var haveAlkenes = this.preFilterAtomList(data.atoms, bsToDo, data.bsEnes);
if (!data.bsEnes.isEmpty()) data.getEneKekule();
this.logInfo("bsKekule:" + data.bsKekuleAmbiguous);
bsToDo = data.bsAtoms.clone();
for (var i = bsToDo.nextSetBit(0); i >= 0; i = bsToDo.nextSetBit(i + 1)) {
var a = data.atoms[i];
a.setCIPChirality(0);
this.ptIDLogger = 0;
var c = this.getAtomChiralityLimited(a, null, null);
a.setCIPChirality(c == 0 ? 3 : c | ((this.currentRule - 1) << 5));
if (this.doTrack && c != 0) data.getRootTrackerResult(this.root);
}
if (haveAlkenes) {
var lstEZ =  new JU.Lst();
for (var i = bsToDo.nextSetBit(0); i >= 0; i = bsToDo.nextSetBit(i + 1)) this.getAtomBondChirality(data.atoms[i], lstEZ, bsToDo);

if (data.lstSmallRings.length > 0 && lstEZ.size() > 0) this.clearSmallRingEZ(data.atoms, lstEZ);
this.setStereoFromSmiles(data.bsHelixM, 17, data.atoms);
this.setStereoFromSmiles(data.bsHelixP, 18, data.atoms);
}if (JU.Logger.debugging) {
this.logInfo("Kekule ambiguous = " + data.bsKekuleAmbiguous);
this.logInfo("small rings = " + JU.PT.toJSON(null, data.lstSmallRings));
}}, "JS.CIPData");
Clazz.defineMethod(c$, "setStereoFromSmiles", 
function(bsHelix, stereo, atoms){
if (bsHelix != null) for (var i = bsHelix.nextSetBit(0); i >= 0; i = bsHelix.nextSetBit(i + 1)) atoms[i].setCIPChirality(stereo);

}, "JU.BS,~N,~A");
Clazz.defineMethod(c$, "preFilterAtomList", 
function(atoms, bsToDo, bsEnes){
var haveAlkenes = false;
for (var i = bsToDo.nextSetBit(0); i >= 0; i = bsToDo.nextSetBit(i + 1)) {
if (!this.data.couldBeChiralAtom(atoms[i])) {
bsToDo.clear(i);
continue;
}switch (this.data.couldBeChiralAlkene(atoms[i], null)) {
case -1:
break;
case 13:
bsEnes.set(i);
case 17:
haveAlkenes = true;
break;
}
}
return haveAlkenes;
}, "~A,JU.BS,JU.BS");
c$.isFirstRow = Clazz.defineMethod(c$, "isFirstRow", 
function(a){
var n = a.getElementNumber();
return (n > 2 && n <= 10);
}, "JU.SimpleNode");
Clazz.defineMethod(c$, "clearSmallRingEZ", 
function(atoms, lstEZ){
for (var j = this.data.lstSmallRings.length; --j >= 0; ) this.data.lstSmallRings[j].andNot(this.data.bsAtropisomeric);

for (var i = lstEZ.size(); --i >= 0; ) {
var ab = lstEZ.get(i);
for (var j = this.data.lstSmallRings.length; --j >= 0; ) {
var ring = this.data.lstSmallRings[j];
if (ring.get(ab[0]) && ring.get(ab[1])) {
atoms[ab[0]].setCIPChirality(3);
atoms[ab[1]].setCIPChirality(3);
}}
}
}, "~A,JU.Lst");
Clazz.defineMethod(c$, "getAtomBondChirality", 
function(atom, lstEZ, bsToDo){
var index = atom.getIndex();
var bonds = atom.getEdges();
var c = 0;
var isAtropic = this.data.bsAtropisomeric.get(index);
for (var j = bonds.length; --j >= 0; ) {
var bond = bonds[j];
var atom1;
var index1;
if (isAtropic) {
atom1 = bonds[j].getOtherNode(atom);
index1 = atom1.getIndex();
if (!this.data.bsAtropisomeric.get(index1)) continue;
c = this.setBondChirality(atom, atom1, atom, atom1, true);
} else if (this.data.getBondOrder(bond) == 2) {
atom1 = this.getLastCumuleneAtom(bond, atom, null, null);
index1 = atom1.getIndex();
if (index1 < index) continue;
c = this.getBondChiralityLimited(bond, atom);
} else {
continue;
}if (c != 0) {
if (!isAtropic) lstEZ.addLast( Clazz.newIntArray(-1, [index, index1]));
bsToDo.clear(index);
bsToDo.clear(index1);
}if (isAtropic) break;
}
}, "JU.SimpleNode,JU.Lst,JU.BS");
Clazz.defineMethod(c$, "getLastCumuleneAtom", 
function(bond, atom, nSP2, parents){
var atom2 = bond.getOtherNode(atom);
if (parents != null) {
parents[0] = atom2;
parents[1] = atom;
}if (nSP2 != null) nSP2[0] = 2;
var ppt = 0;
while (true) {
if (atom2.getCovalentBondCount() != 2) return atom2;
var edges = atom2.getEdges();
for (var i = edges.length; --i >= 0; ) {
var atom3 = (bond = edges[i]).getOtherNode(atom2);
if (atom3 === atom) continue;
if (this.data.getBondOrder(bond) != 2) return atom2;
if (parents != null) {
if (ppt == 0) {
parents[0] = atom2;
ppt = 1;
}parents[1] = atom2;
}if (nSP2 != null) nSP2[0]++;
atom = atom2;
atom2 = atom3;
break;
}
}
}, "JU.SimpleEdge,JU.SimpleNode,~A,~A");
Clazz.defineMethod(c$, "getAtomChiralityLimited", 
function(atom, cipAtom, parentAtom){
var rs = 0;
this.bsNeedRule.clearAll();
this.bsNeedRule.set(1);
try {
var isAlkeneEndCheck = (atom == null);
if (isAlkeneEndCheck) {
atom = (this.root = cipAtom).atom;
cipAtom.htPathPoints = (cipAtom.parent = Clazz.innerTypeInstance(JS.CIPChirality.CIPAtom, this, null).create(parentAtom, null, true, false, false)).htPathPoints;
} else {
if (!(this.root = cipAtom = (cipAtom == null ? Clazz.innerTypeInstance(JS.CIPChirality.CIPAtom, this, null).create(atom, null, false, false, false) : cipAtom)).isSP3) {
return 0;
}}if (cipAtom.setNode()) {
for (this.currentRule = 1; this.currentRule <= 9; this.currentRule++) {
var nPrioritiesPrev = cipAtom.nPriorities;
switch (this.currentRule) {
case 3:
if (cipAtom.rule6refIndex >= 0) this.bsNeedRule.set(3);
break;
case 4:
this.isAux = true;
this.doTrack = false;
this.havePseudoAuxiliary = false;
cipAtom.createAuxiliaryDescriptors(null, null);
this.doTrack = this.data.isTracker();
this.isAux = false;
break;
case 5:
if (!this.bsNeedRule.get(5)) {
this.currentRule = 8;
continue;
}case 6:
case 7:
cipAtom.sortSubstituents(-2147483648);
this.bsNeedRule.set(this.currentRule);
break;
case 8:
if (this.havePseudoAuxiliary) cipAtom.clearRule4Lists();
cipAtom.sortSubstituents(-2147483648);
this.bsNeedRule.set(this.currentRule);
break;
case 9:
this.bsNeedRule.setBitTo(9, (cipAtom.rule6refIndex < 0 && (rs = cipAtom.getRule6Descriptor(false)) != 0));
break;
}
if (!this.bsNeedRule.get(this.currentRule)) continue;
if (rs == 0 && cipAtom.sortSubstituents(0)) {
if (JU.Logger.debuggingHigh && cipAtom.h1Count < 2) {
for (var i = 0; i < cipAtom.bondCount; i++) {
if (cipAtom.atoms[i] != null) this.logInfo(cipAtom.atoms[i] + " " + cipAtom.priorities[i]);
}
}if (isAlkeneEndCheck) return cipAtom.getEneTop();
rs = this.data.checkHandedness(cipAtom);
if (this.currentRule == 8) {
if (cipAtom.nPriorities == 4 && nPrioritiesPrev == 2) cipAtom.isRule5Pseudo = !cipAtom.isRule5Pseudo;
if (cipAtom.isRule5Pseudo) rs |= 8;
}if (JU.Logger.debugging) this.logInfo(atom + " " + JV.JC.getCIPChiralityName(rs) + " by Rule " + this.getRuleName(this.currentRule) + "\n----------------------------------");
return rs;
}}
}} catch (e) {
System.out.println(e + " in CIPChirality " + this.currentRule);
{
alert(e);
}return 3;
}
return rs;
}, "JU.SimpleNode,JS.CIPChirality.CIPAtom,JU.SimpleNode");
Clazz.defineMethod(c$, "getBondChiralityLimited", 
function(bond, a){
if (a == null) a = bond.getOtherNode(null);
if (this.data.couldBeChiralAlkene(a, bond) == -1) return 0;
var nSP2 =  Clazz.newIntArray (1, 0);
var parents =  new Array(2);
var b = this.getLastCumuleneAtom(bond, a, nSP2, parents);
var isAxial = nSP2[0] % 2 == 1;
if (!isAxial && this.data.bsAromatic.get(a.getIndex())) return -1;
var c = this.setBondChirality(a, parents[0], parents[1], b, isAxial);
if (JU.Logger.debugging) this.logInfo("get Bond Chirality " + JV.JC.getCIPChiralityName(c) + " " + bond);
return c;
}, "JU.SimpleEdge,JU.SimpleNode");
Clazz.defineMethod(c$, "setBondChirality", 
function(a, pa, pb, b, isAxial){
var a1 = Clazz.innerTypeInstance(JS.CIPChirality.CIPAtom, this, null).create(a, null, true, false, false);
var b2 = Clazz.innerTypeInstance(JS.CIPChirality.CIPAtom, this, null).create(b, null, true, false, false);
var atop = this.getAtomChiralityLimited(null, a1, pa) - 1;
var ruleA = this.currentRule;
var btop = this.getAtomChiralityLimited(null, b2, pb) - 1;
var ruleB = this.currentRule;
if (isAxial && a1.nRootDuplicates > 3 && atop < 0 && btop < 0) {
ruleA = ruleB = this.currentRule = 9;
b2.rule6refIndex = a1.atoms[atop = a1.getEneTop() - 1].atomIndex;
if (b2.sortSubstituents(0)) btop = b2.getEneTop() - 1;
}var c = (atop >= 0 && btop >= 0 ? this.getEneChirality(b2.atoms[btop], b2, a1, a1.atoms[atop], isAxial, true) : 0);
if (c != 0 && (isAxial || !this.data.bsAtropisomeric.get(a.getIndex()) && !this.data.bsAtropisomeric.get(b.getIndex()))) {
if (isAxial == (ruleA == 8) == (ruleB == 8)) c &= -9;
 else c |= 8;
a.setCIPChirality(c | ((ruleA - 1) << 5));
b.setCIPChirality(c | ((ruleB - 1) << 5));
if (JU.Logger.debugging) this.logInfo(a + "-" + b + " " + JV.JC.getCIPChiralityName(c));
}return c;
}, "JU.SimpleNode,JU.SimpleNode,JU.SimpleNode,JU.SimpleNode,~B");
Clazz.defineMethod(c$, "getEneChirality", 
function(winner1, end1, end2, winner2, isAxial, allowPseudo){
return (winner1 == null || winner2 == null || winner1.atom == null || winner2.atom == null ? 0 : isAxial ? this.data.isPositiveTorsion(winner1, end1, end2, winner2) : this.data.isCis(winner1, end1, end2, winner2));
}, "JS.CIPChirality.CIPAtom,JS.CIPChirality.CIPAtom,JS.CIPChirality.CIPAtom,JS.CIPChirality.CIPAtom,~B,~B");
Clazz.defineMethod(c$, "logInfo", 
function(msg){
JU.Logger.info(msg);
}, "~S");
c$.$CIPChirality$CIPAtom$ = function(){
})();
};
c$.ruleNames =  Clazz.newArray(-1, ["", "1a", "1b", "2", "3", "4a", "4b", "4c", "5", "6"]);
});
;//5.0.1-v7 Sat Feb 21 18:17:38 CST 2026
