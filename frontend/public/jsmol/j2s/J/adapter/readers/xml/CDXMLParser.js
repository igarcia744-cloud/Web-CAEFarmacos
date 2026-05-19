Clazz.declarePackage("J.adapter.readers.xml");
Clazz.load(["java.util.HashMap", "JU.BS", "$.Lst"], "J.adapter.readers.xml.CDXMLParser", null, function(){
var c$ = Clazz.decorateAsClass(function(){
this.minX = 3.4028235E38;
this.minY = 3.4028235E38;
this.minZ = 3.4028235E38;
this.maxZ = -3.4028235E38;
this.maxY = -3.4028235E38;
this.maxX = -3.4028235E38;
this.idnext = 100000;
this.bsAtoms = null;
this.bsBonds = null;
this.atoms = null;
this.bonds = null;
this.bondIDMap = null;
this.bracketedGroups = null;
this.rdr = null;
this.mapCloned = null;
if (!Clazz.isClassDefined("J.adapter.readers.xml.CDXMLParser.CDNode")) {
J.adapter.readers.xml.CDXMLParser.$CDXMLParser$CDNode$ ();
}
if (!Clazz.isClassDefined("J.adapter.readers.xml.CDXMLParser.CDBond")) {
J.adapter.readers.xml.CDXMLParser.$CDXMLParser$CDBond$ ();
}
if (!Clazz.isClassDefined("J.adapter.readers.xml.CDXMLParser.BracketedGroup")) {
J.adapter.readers.xml.CDXMLParser.$CDXMLParser$BracketedGroup$ ();
}
this.fragments = null;
this.thisFragmentID = null;
this.thisNode = null;
this.thisAtom = null;
this.ignoreText = false;
this.nodes = null;
this.nostereo = null;
this.objectsByID = null;
this.textBuffer = null;
Clazz.instantialize(this, arguments);}, J.adapter.readers.xml, "CDXMLParser", null);
Clazz.prepareFields (c$, function(){
this.bsAtoms =  new JU.BS();
this.bsBonds =  new JU.BS();
this.atoms =  new JU.Lst();
this.bonds =  new JU.Lst();
this.bondIDMap =  new java.util.HashMap();
this.fragments =  new JU.Lst();
this.nodes =  new JU.Lst();
this.nostereo =  new JU.Lst();
this.objectsByID =  new java.util.HashMap();
});
Clazz.makeConstructor(c$, 
function(reader){
this.rdr = reader;
}, "J.adapter.readers.xml.CDXMLParser.CDXReaderI");
Clazz.defineMethod(c$, "processStartElement", 
function(localName, atts){
var id = atts.get("id");
switch (localName) {
case "n":
this.objectsByID.put(id, this.setNode(id, atts));
break;
case "b":
this.objectsByID.put(id, this.setBond(id, atts));
break;
case "t":
this.textBuffer = "";
break;
case "s":
this.rdr.setKeepChars(true);
break;
case "fragment":
this.objectsByID.put(id, this.setFragment(id, atts));
break;
case "objecttag":
switch (atts.get("name")) {
case "parameterizedBracketLabel":
case "bracketusage":
this.ignoreText = true;
break;
}
break;
case "bracketedgroup":
this.setBracketedGroup(id, atts);
break;
case "crossingbond":
var bg = (this.bracketedGroups == null || this.bracketedGroups.isEmpty() ? null : this.bracketedGroups.get(this.bracketedGroups.size() - 1));
if (bg != null && bg.repeatCount > 0) {
bg.addCrossing(atts.get("inneratomid"), atts.get("bondid"));
}break;
}
}, "~S,java.util.Map");
Clazz.defineMethod(c$, "nextID", 
function(){
return "" + (this.idnext++);
});
c$.getBondKey = Clazz.defineMethod(c$, "getBondKey", 
function(atomIndex1, atomIndex2){
return Math.min(atomIndex1, atomIndex2) + "_" + Math.max(atomIndex1, atomIndex2);
}, "~N,~N");
Clazz.defineMethod(c$, "getBond", 
function(a, b){
return this.bondIDMap.get(J.adapter.readers.xml.CDXMLParser.getBondKey(a.index, b.index));
}, "J.adapter.readers.xml.CDXMLParser.CDNode,J.adapter.readers.xml.CDXMLParser.CDNode");
Clazz.defineMethod(c$, "processEndElement", 
function(localName, chars){
switch (localName) {
case "fragment":
this.thisFragmentID = this.fragments.removeItemAt(this.fragments.size() - 1);
return;
case "objecttag":
this.ignoreText = false;
return;
case "n":
this.thisNode = (this.nodes.size() == 0 ? null : this.nodes.removeItemAt(this.nodes.size() - 1));
return;
case "bracketedgroup":
break;
case "s":
this.textBuffer += chars.toString();
break;
case "t":
if (this.ignoreText) {
} else if (this.thisNode == null) {
System.out.println("CDXReader unassigned text: " + this.textBuffer);
} else {
this.thisNode.text = this.textBuffer;
if (this.thisAtom.elementNumber == 0) {
System.err.println("XmlChemDrawReader: Problem with \"" + this.textBuffer + "\"");
}if (this.thisNode.warning != null) this.rdr.warn("Warning: " + this.textBuffer + " " + this.thisNode.warning);
}this.textBuffer = "";
break;
}
this.rdr.setKeepChars(false);
}, "~S,~S");
Clazz.defineMethod(c$, "getTokens", 
function(s){
return s.$plit("\\s");
}, "~S");
Clazz.defineMethod(c$, "split", 
function(s, p){
return s.$plit(p);
}, "~S,~S");
Clazz.defineMethod(c$, "parseInt", 
function(s){
try {
return Integer.parseInt(s);
} catch (e) {
if (Clazz.exceptionOf(e, Exception)){
return -2147483648;
} else {
throw e;
}
}
}, "~S");
Clazz.defineMethod(c$, "parseFloat", 
function(s){
try {
return Float.parseFloat(s);
} catch (e) {
if (Clazz.exceptionOf(e, Exception)){
return NaN;
} else {
throw e;
}
}
}, "~S");
Clazz.defineMethod(c$, "setNode", 
function(id, atts){
var nodeType = atts.get("nodetype");
if (this.thisNode != null) this.nodes.addLast(this.thisNode);
if ("_".equals(nodeType)) {
this.thisAtom = this.thisNode = null;
return null;
}this.thisAtom = this.thisNode = Clazz.innerTypeInstance(J.adapter.readers.xml.CDXMLParser.CDNode, this, null, this.atoms.size(), id, nodeType, this.thisFragmentID, this.thisNode);
this.addAtom(this.thisNode);
var w = atts.get("warning");
if (w != null) {
this.thisNode.warning = w.$replace("&apos;", "'");
this.thisNode.isValid = (w.indexOf("ChemDraw can't interpret") < 0);
}var element = atts.get("element");
var s = atts.get("genericnickname");
if (s != null) {
element = s;
}this.thisAtom.element = element;
this.thisAtom.elementNumber = Math.max(0, (!this.checkWarningOK(w) ? 0 : element == null ? 6 : this.parseInt(element)));
this.thisAtom.isotope = atts.get("isotope");
s = atts.get("charge");
if (s != null) {
this.thisAtom.formalCharge = this.parseInt(s);
}this.rdr.handleCoordinates(atts);
s = atts.get("attachments");
if (s != null) {
this.thisNode.setMultipleAttachments(this.split(s.trim(), " "));
}s = atts.get("bondordering");
if (s != null) {
this.thisNode.setBondOrdering(this.split(s.trim(), " "));
}return this.thisNode;
}, "~S,java.util.Map");
Clazz.defineMethod(c$, "checkWarningOK", 
function(warning){
return (warning == null || warning.indexOf("valence") >= 0 || warning.indexOf("very close") >= 0 || warning.indexOf("two identical colinear bonds") >= 0);
}, "~S");
Clazz.defineMethod(c$, "setFragment", 
function(id, atts){
this.fragments.addLast(this.thisFragmentID = id);
var fragmentNode = (this.thisNode == null || !this.thisNode.isFragment ? null : this.thisNode);
if (fragmentNode != null) {
fragmentNode.setInnerFragmentID(id);
}var s = atts.get("connectionorder");
if (s != null) {
this.thisNode.setConnectionOrder(s.trim().$plit(" "));
}return fragmentNode;
}, "~S,java.util.Map");
Clazz.defineMethod(c$, "setBond", 
function(id, atts){
var atom1 = atts.get("b");
var atom2 = atts.get("e");
var a = atts.get("beginattach");
var beginAttach = (a == null ? 0 : this.parseInt(a));
a = atts.get("endattach");
var endAttach = (a == null ? 0 : this.parseInt(a));
var s = atts.get("order");
var disp = atts.get("display");
var disp2 = atts.get("display2");
var order = this.rdr.getBondOrder("null");
var invertEnds = false;
if (disp == null) {
if (s == null) {
order = 1;
} else if (s.equals("1.5")) {
order = this.rdr.getBondOrder("delocalized");
} else {
if (s.indexOf(".") > 0 && !"Dash".equals(disp2)) {
s = s.substring(0, s.indexOf("."));
}order = this.rdr.getBondOrder(s);
}} else if (disp.equals("WedgeBegin")) {
order = this.rdr.getBondOrder("up");
} else if (disp.equals("Hash") || disp.equals("WedgedHashBegin")) {
order = this.rdr.getBondOrder("down");
} else if (disp.equals("WedgeEnd")) {
invertEnds = true;
order = this.rdr.getBondOrder("up");
} else if (disp.equals("WedgedHashEnd")) {
invertEnds = true;
order = this.rdr.getBondOrder("down");
} else if (disp.equals("Bold")) {
order = this.rdr.getBondOrder("single");
} else if (disp.equals("Wavy")) {
order = this.rdr.getBondOrder("either");
}if (order == this.rdr.getBondOrder("null")) {
System.err.println("XmlChemDrawReader ignoring bond type " + s);
return null;
}var b = (invertEnds ? Clazz.innerTypeInstance(J.adapter.readers.xml.CDXMLParser.CDBond, this, null, id, atom2, atom1, order) : Clazz.innerTypeInstance(J.adapter.readers.xml.CDXMLParser.CDBond, this, null, id, atom1, atom2, order));
var node1 = this.getAtom(b.atomIndex1);
var node2 = this.getAtom(b.atomIndex2);
if (order == this.rdr.getBondOrder("either")) {
if (!this.nostereo.contains(node1)) this.nostereo.addLast(node1);
if (!this.nostereo.contains(node2)) this.nostereo.addLast(node2);
}if (node1.hasMultipleAttachments) {
node1.attachedAtom = node2;
return b;
} else if (node2.hasMultipleAttachments) {
node2.attachedAtom = node1;
return b;
}if (node1.isFragment && beginAttach == 0) beginAttach = 1;
if (node2.isFragment && endAttach == 0) endAttach = 1;
if (beginAttach > 0) {
(invertEnds ? node2 : node1).addAttachedAtom(b, beginAttach);
}if (endAttach > 0) {
(invertEnds ? node1 : node2).addAttachedAtom(b, endAttach);
}if (node1.isExternalPt) {
node1.setInternalAtom(node2);
}if (node2.isExternalPt) {
node2.setInternalAtom(node1);
}this.addBond(b);
return b;
}, "~S,java.util.Map");
Clazz.defineMethod(c$, "setBracketedGroup", 
function(id, atts){
var usage = atts.get("bracketusage");
if (this.bracketedGroups == null) this.bracketedGroups =  new JU.Lst();
if ("MultipleGroup".equals(usage)) {
var ids = this.getTokens(atts.get("bracketedobjectids"));
var repeatCount = this.parseInt(atts.get("repeatcount"));
this.bracketedGroups.addLast(Clazz.innerTypeInstance(J.adapter.readers.xml.CDXMLParser.BracketedGroup, this, null, id, ids, repeatCount));
}}, "~S,java.util.Map");
Clazz.defineMethod(c$, "setAtom", 
function(key, atts){
var xyz = atts.get(key);
var tokens = this.getTokens(xyz);
var x = this.parseFloat(tokens[0]);
var y = -this.parseFloat(tokens[1]);
var z = (key === "xyz" ? this.parseFloat(tokens[2]) : 0);
if (x < this.minX) this.minX = x;
if (x > this.maxX) this.maxX = x;
if (y < this.minY) this.minY = y;
if (y > this.maxY) this.maxY = y;
if (z < this.minZ) this.minZ = z;
if (z > this.maxZ) this.maxZ = z;
this.thisAtom.set(x, y, z);
}, "~S,java.util.Map");
Clazz.defineMethod(c$, "fixInvalidAtoms", 
function(){
for (var i = this.getAtomCount(); --i >= 0; ) {
var a = this.getAtom(i);
a.intID = -2147483648;
if (a.isFragment || a.isExternalPt || !a.isConnected && (!a.isValid || a.elementNumber < 10)) {
this.bsAtoms.clear(a.index);
}}
this.reserializeAtoms();
this.bsBonds.clearAll();
for (var i = this.getBondCount(); --i >= 0; ) {
var b = this.getBond(i);
if (b.isValid()) {
this.bsBonds.set(i);
} else {
}}
});
Clazz.defineMethod(c$, "reserializeAtoms", 
function(){
for (var p = 0, i = this.bsAtoms.nextSetBit(0); i >= 0; i = this.bsAtoms.nextSetBit(i + 1)) {
this.getAtom(i).intID = ++p;
}
});
Clazz.defineMethod(c$, "reindexAtomsAndBonds", 
function(){
this.reserializeAtoms();
for (var p = 0, i = this.bsAtoms.nextSetBit(0); i >= 0; i = this.bsAtoms.nextSetBit(i + 1)) {
this.getAtom(i).index = p++;
}
for (var i = this.bsBonds.nextSetBit(0); i >= 0; i = this.bsBonds.nextSetBit(i + 1)) {
var b = this.getBond(i);
b.atomIndex1 = b.atom1.index;
b.atomIndex2 = b.atom2.index;
}
});
Clazz.defineMethod(c$, "fixConnections", 
function(){
for (var i = this.getAtomCount(); --i >= 0; ) {
var a = this.getAtom(i);
if (a.isFragment || a.hasMultipleAttachments) a.fixAttachments();
}
for (var i = 0, n = this.getBondCount(); i < n; i++) {
var b = this.getBond(i);
if (b == null) {
continue;
}var a1 = b.atom1;
var a2 = b.atom2;
a1.isConnected = true;
a2.isConnected = true;
if (this.nostereo.contains(a1) != this.nostereo.contains(a2)) {
b.order = 1;
}}
});
Clazz.defineMethod(c$, "fixBracketedGroups", 
function(){
if (this.bracketedGroups == null) return;
for (var i = this.bracketedGroups.size(); --i >= 0; ) {
this.bracketedGroups.removeItemAt(i).process();
}
});
Clazz.defineMethod(c$, "dumpGraph", 
function(){
for (var i = 0, n = this.getAtomCount(); i < n; i++) {
var a = this.getAtom(i);
System.out.println("CDXMLP " + i + " id=" + a.id + a.bsConnections + " cid=" + a.clonedIndex + " fa=" + a.bsFragmentAtoms + " xp=" + a.isExternalPt + " ifd=" + a.innerFragmentID + " ofd= " + a.outerFragmentID);
}
for (var i = 0, n = this.getBondCount(); i < n; i++) {
var b = this.getBond(i);
System.out.println("CDXMLP bond " + i + " " + b.atomIndex1 + " " + b.atomIndex2 + b);
}
System.out.println(this.bondIDMap);
return;
});
Clazz.defineMethod(c$, "centerAndScale", 
function(){
if (this.minX > this.maxX) return;
var sum = 0;
var n = 0;
var lenH = 1;
for (var i = this.getBondCount(); --i >= 0; ) {
var b = this.getBond(i);
var a1 = b.atom1;
var a2 = b.atom2;
var d = a1.distance(a2);
if (a1.elementNumber > 1 && a2.elementNumber > 1) {
sum += d;
n++;
} else {
lenH = d;
}}
var f = (sum > 0 ? 1.45 * n / sum : lenH > 0 ? 1 / lenH : 1);
if (f > 0.5) f = 1;
var cx = (this.maxX + this.minX) / 2;
var cy = (this.maxY + this.minY) / 2;
var cz = (this.maxZ + this.minZ) / 2;
for (var i = this.getAtomCount(); --i >= 0; ) {
var a = this.getAtom(i);
a.x = (a.x - cx) * f;
a.y = (a.y - cy) * f;
a.z = (a.z - cz) * f;
}
});
Clazz.defineMethod(c$, "getAtom", 
function(i){
return this.atoms.get(i);
}, "~N");
Clazz.defineMethod(c$, "addAtom", 
function(atom){
this.atoms.addLast(atom);
this.bsAtoms.set(atom.index);
return atom;
}, "J.adapter.readers.xml.CDXMLParser.CDNode");
Clazz.defineMethod(c$, "getAtomCount", 
function(){
return this.atoms.size();
});
Clazz.defineMethod(c$, "addBond", 
function(b){
this.bsBonds.set(b.index = this.getBondCount());
this.bonds.addLast(b);
return b;
}, "J.adapter.readers.xml.CDXMLParser.CDBond");
Clazz.defineMethod(c$, "getBond", 
function(i){
return this.bonds.get(i);
}, "~N");
Clazz.defineMethod(c$, "getBondCount", 
function(){
return this.bonds.size();
});
Clazz.defineMethod(c$, "finalizeParsing", 
function(){
this.fixConnections();
this.fixInvalidAtoms();
this.fixBracketedGroups();
this.centerAndScale();
this.reindexAtomsAndBonds();
});
c$.$CDXMLParser$CDNode$ = function(){
})();
};
c$.$CDXMLParser$CDBond$ = function(){
})();
};
c$.$CDXMLParser$BracketedGroup$ = function(){
})();
};
Clazz.declareInterface(J.adapter.readers.xml.CDXMLParser, "CDXReaderI");
});
;//5.0.1-v7 Sat Feb 21 18:17:38 CST 2026
