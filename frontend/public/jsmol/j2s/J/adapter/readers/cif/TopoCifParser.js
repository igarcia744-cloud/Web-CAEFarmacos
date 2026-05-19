Clazz.declarePackage("J.adapter.readers.cif");
Clazz.load(["J.adapter.readers.cif.CifReader", "J.adapter.smarter.Atom", "$.Bond", "JU.Lst", "$.P3"], "J.adapter.readers.cif.TopoCifParser", ["java.util.Hashtable", "JU.BS", "J.adapter.readers.cif.Cif2DataParser", "J.api.JmolAdapter", "JS.SymmetryOperation", "JU.JmolMolecule"], function(){
var c$ = Clazz.decorateAsClass(function(){
this.reader = null;
this.atoms = null;
this.nodes = null;
this.links = null;
this.nets = null;
this.singleNet = null;
this.netCount = 0;
this.linkCount = 0;
this.atomCount = 0;
this.temp1 = null;
this.temp2 = null;
this.ac0 = -1;
this.bc0 = 0;
this.cifParser = null;
this.failed = null;
this.ops = null;
this.i0 = 0;
this.b0 = 0;
this.allowedTypes = null;
this.netNotes = "";
this.sym = null;
this.selectedNet = null;
if (!Clazz.isClassDefined("J.adapter.readers.cif.TopoCifParser.TNet")) {
J.adapter.readers.cif.TopoCifParser.$TopoCifParser$TNet$ ();
}
if (!Clazz.isClassDefined("J.adapter.readers.cif.TopoCifParser.TAtom")) {
J.adapter.readers.cif.TopoCifParser.$TopoCifParser$TAtom$ ();
}
if (!Clazz.isClassDefined("J.adapter.readers.cif.TopoCifParser.TNode")) {
J.adapter.readers.cif.TopoCifParser.$TopoCifParser$TNode$ ();
}
if (!Clazz.isClassDefined("J.adapter.readers.cif.TopoCifParser.TLink")) {
J.adapter.readers.cif.TopoCifParser.$TopoCifParser$TLink$ ();
}
Clazz.instantialize(this, arguments);}, J.adapter.readers.cif, "TopoCifParser", null, J.adapter.readers.cif.CifReader.Parser);
Clazz.prepareFields (c$, function(){
this.atoms =  new JU.Lst();
this.nodes =  new JU.Lst();
this.links =  new JU.Lst();
this.nets =  new JU.Lst();
this.temp1 =  new JU.P3();
this.temp2 =  new JU.P3();
});
Clazz.makeConstructor(c$, 
function(){
});
c$.getBondType = Clazz.defineMethod(c$, "getBondType", 
function(type, order){
if (type == null) return 0;
type = type.toUpperCase();
if (type.equals("V")) return (order == 0 ? 1 : order);
if (type.equals("sb")) type = "?";
switch ((type.charAt(0)).charCodeAt(0)) {
case 86:
return 14;
}
if (type.length > 3) type = type.substring(0, 3);
return Math.max(1, Clazz.doubleToInt(J.adapter.readers.cif.TopoCifParser.linkTypes.indexOf(type) / 3));
}, "~S,~N");
Clazz.overrideMethod(c$, "setReader", 
function(reader){
if (!reader.checkFilterKey("TOPOL")) {
reader.appendLoadNote("This file has Topology analysis records.\nUse LOAD \"\" {1 1 1} FILTER \"TOPOL\"  to load the topology.");
return this;
}this.reader = reader;
var net = reader.getFilter("TOPOLNET=");
this.selectedNet = net;
var types = reader.getFilter("TOPOS_TYPES=");
if (types == null) types = reader.getFilter("TOPOS_TYPE=");
if (types != null && types.length > 0) {
types = "+" + types.toLowerCase() + "+";
this.allowedTypes = types;
}this.i0 = reader.baseAtomIndex;
this.b0 = reader.baseBondIndex;
return this;
}, "J.adapter.readers.cif.CifReader");
Clazz.overrideMethod(c$, "ProcessRecord", 
function(key, data){
if (this.reader == null || this.failed != null) {
return;
}var pt = key.indexOf(".");
if (pt < 0) {
pt = key.indexOf('_', key.indexOf('_', 1) + 1);
if (pt < 0) return;
key = key.substring(0, pt) + '.' + key.substring(pt + 1);
}this.processBlock(key);
}, "~S,~S");
Clazz.overrideMethod(c$, "processBlock", 
function(key){
if (this.reader == null || this.failed != null) {
return false;
}if (this.ac0 < 0) {
this.reader.asc.firstAtomToBond = this.reader.asc.getAtomSetAtomIndex(this.reader.asc.iSet);
this.ac0 = this.reader.asc.ac;
this.bc0 = this.reader.asc.bondCount;
}if (this.reader.ucItems != null) {
this.reader.allow_a_len_1 = true;
for (var i = 0; i < 6; i++) this.reader.setUnitCellItem(i, this.reader.ucItems[i]);

}this.reader.parseLoopParameters(J.adapter.readers.cif.TopoCifParser.topolFields);
this.cifParser = this.reader.cifParser;
if (key.startsWith("_topol_net")) {
this.processNets();
} else if (key.startsWith("_topol_link")) {
this.processLinks();
} else if (key.startsWith("_topol_node")) {
this.processNodes();
} else if (key.startsWith("_topol_atom")) {
this.processAtoms();
} else {
return false;
}return true;
}, "~S");
Clazz.defineMethod(c$, "processNets", 
function(){
while (this.cifParser.getData()) {
var id = this.getDataValue(0);
var netLabel = this.getDataValue(1);
if (id == null) id = "" + (this.netCount + 1);
var net = this.getNetFor(id, netLabel, true);
net.specialDetails = this.getDataValue(2);
net.line = this.reader.line;
}
});
Clazz.defineMethod(c$, "processLinks", 
function(){
while (this.cifParser.getData()) {
var t = this.getDataValue(18);
var type = (t == null ? null : t.toLowerCase());
if (this.allowedTypes != null && (type == null || this.allowedTypes.indexOf("+" + type + "+") < 0)) continue;
var link = Clazz.innerTypeInstance(J.adapter.readers.cif.TopoCifParser.TLink, this, null);
link.type = type;
var t1 =  Clazz.newIntArray (3, 0);
var t2 =  Clazz.newIntArray (3, 0);
var n = this.cifParser.getColumnCount();
for (var i = 0; i < n; ++i) {
var p = this.reader.fieldProperty(i);
var field = this.reader.field;
switch (p) {
case 3:
link.id = field;
break;
case 4:
link.netID = field;
break;
case 5:
link.nodeIds[0] = field;
break;
case 6:
link.nodeIds[1] = field;
break;
case 56:
link.nodeLabels[0] = field;
break;
case 57:
link.nodeLabels[1] = field;
break;
case 46:
case 7:
link.symops[0] = this.getInt(field) - 1;
break;
case 50:
case 12:
link.symops[1] = this.getInt(field) - 1;
break;
case 21:
link.topoOrder = this.getInt(field);
break;
case 54:
case 47:
case 48:
case 49:
case 8:
case 9:
case 10:
case 11:
t1 = this.processTranslation(p, t1, field);
break;
case 55:
case 51:
case 52:
case 53:
case 13:
case 14:
case 15:
case 16:
t2 = this.processTranslation(p, t2, field);
break;
case 17:
link.cartesianDistance = this.getFloat(field);
break;
case 19:
link.multiplicity = this.getInt(field);
break;
case 20:
link.voronoiAngle = this.getFloat(field);
}
}
if (!link.setLink(t1, t2, this.reader.line)) {
this.failed = "invalid link! " + link;
return;
}this.links.addLast(link);
}
});
Clazz.defineMethod(c$, "processNodes", 
function(){
while (this.cifParser.getData()) {
var node = Clazz.innerTypeInstance(J.adapter.readers.cif.TopoCifParser.TNode, this, null);
var t =  Clazz.newIntArray (3, 0);
var n = this.cifParser.getColumnCount();
for (var i = 0; i < n; ++i) {
var p = this.reader.fieldProperty(i);
var field = this.reader.field;
switch (p) {
case 22:
node.id = field;
break;
case 24:
node.label = field;
break;
case 23:
node.netID = field;
break;
case 25:
node.symop = this.getInt(field) - 1;
break;
case 26:
case 27:
case 28:
case 29:
t = this.processTranslation(p, t, field);
break;
case 30:
node.x = this.getFloat(field);
break;
case 31:
node.y = this.getFloat(field);
break;
case 32:
node.z = this.getFloat(field);
break;
}
}
if (node.setNode(t, this.reader.line)) this.nodes.addLast(node);
}
});
Clazz.defineMethod(c$, "processAtoms", 
function(){
while (this.cifParser.getData()) {
var atom = Clazz.innerTypeInstance(J.adapter.readers.cif.TopoCifParser.TAtom, this, null);
var t =  Clazz.newIntArray (3, 0);
var n = this.cifParser.getColumnCount();
for (var i = 0; i < n; ++i) {
var p = this.reader.fieldProperty(i);
var field = this.reader.field;
switch (p) {
case 33:
atom.id = field;
break;
case 34:
atom.atomLabel = field;
break;
case 35:
atom.nodeID = field;
break;
case 36:
atom.linkID = field;
break;
case 37:
atom.symop = this.getInt(field) - 1;
break;
case 38:
case 39:
case 40:
case 41:
t = this.processTranslation(p, t, field);
break;
case 42:
atom.x = this.getFloat(field);
break;
case 43:
atom.y = this.getFloat(field);
break;
case 44:
atom.z = this.getFloat(field);
break;
case 45:
atom.elementSymbol = field;
break;
}
}
if (atom.setAtom(t, this.reader.line)) this.atoms.addLast(atom);
}
});
Clazz.defineMethod(c$, "processTranslation", 
function(p, t, field){
switch (p) {
case 54:
case 55:
case 8:
case 13:
case 26:
case 38:
t = J.adapter.readers.cif.Cif2DataParser.getIntArrayFromStringList(field, 3);
break;
case 47:
case 51:
case 9:
case 14:
case 27:
case 39:
t[0] = this.getInt(field);
break;
case 48:
case 52:
case 10:
case 15:
case 28:
case 40:
t[1] = this.getInt(field);
break;
case 49:
case 53:
case 11:
case 16:
case 29:
case 41:
t[2] = this.getInt(field);
break;
}
return t;
}, "~N,~A,~S");
Clazz.overrideMethod(c$, "finalizeReader", 
function(){
if (this.reader == null || this.reader.symops == null) return false;
this.cifParser = null;
this.reader.applySymmetryToBonds = true;
var symops = this.reader.symops;
var nOps = symops.size();
this.ops =  new Array(nOps);
var v =  Clazz.newFloatArray (16, 0);
for (var i = 0; i < nOps; i++) {
this.ops[i] = JS.SymmetryOperation.getMatrixFromXYZ("!" + symops.get(i), v, true);
}
for (var i = 0; i < this.atoms.size(); i++) {
this.atoms.get(i).finalizeAtom();
}
this.sym = this.reader.getSymmetry();
for (var i = 0; i < this.links.size(); i++) {
this.links.get(i).finalizeLink();
}
for (var i = this.links.size(); --i >= 0; ) {
if (!this.links.get(i).finalized) this.links.removeItemAt(i);
}
if (this.reader.doApplySymmetry) {
this.reader.applySymmetryAndSetTrajectory();
}if (this.selectedNet != null) this.selectNet();
return true;
});
Clazz.defineMethod(c$, "selectNet", 
function(){
var net = this.getNetFor(null, this.selectedNet, false);
if (net == null) {
net = this.getNetFor(this.selectedNet, null, false);
}if (net == null) return;
var bsAtoms = this.reader.asc.getBSAtoms(-1);
var atoms = this.reader.asc.atoms;
for (var i = this.reader.asc.ac; --i >= 0; ) {
var a = atoms[i];
if (!(Clazz.instanceOf(a,"J.adapter.readers.cif.TopoCifParser.TPoint")) || (a).getNet() !== net) {
bsAtoms.clear(i);
}}
});
Clazz.overrideMethod(c$, "finalizeSymmetry", 
function(haveSymmetry){
if (this.reader == null || !haveSymmetry || this.links.size() == 0) return;
var bsConnected =  new JU.BS();
var bsAtoms =  new JU.BS();
var nLinks = this.processAssociations(bsConnected, bsAtoms);
var bsExclude = J.adapter.readers.cif.TopoCifParser.shiftBits(bsAtoms, bsConnected);
if (!bsConnected.isEmpty()) {
this.reader.asc.bsAtoms = bsAtoms;
this.reader.asc.atomSetInfo.put("bsExcludeBonding", bsExclude);
}this.reader.appendLoadNote("TopoCifParser created " + bsConnected.cardinality() + " nodes and " + nLinks + " links");
var info =  new JU.Lst();
for (var i = 0, n = this.links.size(); i < n; i++) {
info.addLast(this.links.get(i).getLinkInfo());
}
this.reader.asc.setCurrentModelInfo("topology", info);
var script = "if (autobond) {delete !connected && !(atomName LIKE \'*_Link*\' or atomName LIKE \'*_Node*\')}; display displayed or " + this.nets.get(0).label + "__*";
this.reader.addJmolScript(script);
for (var i = 0; i < this.nets.size(); i++) {
this.nets.get(i).finalizeNet();
}
}, "~B");
c$.shiftBits = Clazz.defineMethod(c$, "shiftBits", 
function(bsAtoms, bs){
var bsNew =  new JU.BS();
for (var pt = 0, i = bsAtoms.nextSetBit(0); i >= 0; i = bsAtoms.nextSetBit(i + 1)) {
while (bsAtoms.get(i)) {
bsNew.setBitTo(pt++, bs.get(i++));
}
}
return bsNew;
}, "JU.BS,JU.BS");
Clazz.defineMethod(c$, "processAssociations", 
function(bsConnected, bsAtoms){
var nlinks = 0;
var bsAtoms0 = this.reader.asc.bsAtoms;
var atoms = this.reader.asc.atoms;
for (var i = this.reader.asc.ac; --i >= this.ac0; ) {
var a = atoms[i];
if (bsAtoms0 != null && !bsAtoms0.get(i)) continue;
var idx = (Clazz.instanceOf(a,"J.adapter.readers.cif.TopoCifParser.TAtom") ? (a).idx1 : 0);
if (idx == -2147483648 || idx == 0) continue;
if (idx > 0) {
var node = this.getAssociatedNodeByIdx(idx - 1);
if (node.bsAtoms == null) node.bsAtoms =  new JU.BS();
node.bsAtoms.set(this.i0 + a.index);
} else {
var link = this.getAssoiatedLinkByIdx(-idx - 1);
if (link != null) {
if (link.bsAtoms == null) link.bsAtoms =  new JU.BS();
link.bsAtoms.set(this.i0 + a.index);
}}bsAtoms.set(a.index);
}
var checkDistance = this.reader.doPackUnitCell;
var distance;
var bonds = this.reader.asc.bonds;
for (var i = this.reader.asc.bondCount; --i >= this.bc0; ) {
var b = bonds[i];
if (b.order >= 33554432) {
bonds[i] = null;
} else if (b.order >= 16777216) {
if (bsAtoms0 != null && (!bsAtoms0.get(b.atomIndex1) || !bsAtoms0.get(b.atomIndex2))) {
bonds[i] = null;
continue;
}b.order -= 16777216;
var link = this.getAssoiatedLinkByIdx(b.order >> 4);
if (checkDistance && Math.abs((distance = this.calculateDistance(atoms[b.atomIndex1], atoms[b.atomIndex2])) - link.distance) >= J.adapter.readers.cif.TopoCifParser.ERROR_TOLERANCE) {
System.err.println("Distance error! removed! distance=" + distance + " for " + link + link.linkNodes[0] + link.linkNodes[1]);
bonds[i] = null;
continue;
}if (link.bsBonds == null) link.bsBonds =  new JU.BS();
link.bsBonds.set(this.b0 + i);
switch (b.order & 0xF) {
default:
b.order = 1;
break;
case 2:
b.order = 2;
break;
case 3:
b.order = 3;
break;
case 4:
b.order = 4;
break;
case 5:
b.order = 5;
break;
case 6:
b.order = 6;
break;
case 10:
b.order = 1;
break;
case 11:
case 12:
b.order = 515;
break;
case 13:
b.order = 2048;
break;
case 14:
b.order = 33;
break;
}
bsConnected.set(b.atomIndex1);
bsConnected.set(b.atomIndex2);
nlinks++;
}}
bsAtoms.or(bsConnected);
if (bsAtoms0 != null) bsAtoms.and(bsAtoms0);
for (var i = this.nodes.size(); --i >= 0; ) {
var node = this.nodes.get(i);
if (node.bsAtoms != null) {
node.bsAtoms = J.adapter.readers.cif.TopoCifParser.shiftBits(bsAtoms, node.bsAtoms);
}}
for (var i = this.links.size(); --i >= 0; ) {
var link = this.links.get(i);
if (link.bsAtoms != null) {
link.bsAtoms = J.adapter.readers.cif.TopoCifParser.shiftBits(bsAtoms, link.bsAtoms);
}}
return nlinks;
}, "JU.BS,JU.BS");
c$.isEqualD = Clazz.defineMethod(c$, "isEqualD", 
function(p1, p2, d){
return (Double.isNaN(d) || Math.abs(p1.distance(p2) - d) < J.adapter.readers.cif.TopoCifParser.ERROR_TOLERANCE);
}, "JU.T3,JU.T3,~N");
Clazz.defineMethod(c$, "getDataValue", 
function(key){
var f = this.reader.getFieldString(key);
return ("\0".equals(f) ? null : f);
}, "~N");
Clazz.defineMethod(c$, "getInt", 
function(f){
return (f == null ? -2147483648 : this.reader.parseIntStr(f));
}, "~S");
Clazz.defineMethod(c$, "getFloat", 
function(f){
return (f == null ? NaN : this.reader.parseFloatStr(f));
}, "~S");
c$.getMF = Clazz.defineMethod(c$, "getMF", 
function(tatoms){
var n = tatoms.size();
if (n < 2) return (n == 0 ? "" : tatoms.get(0).elementSymbol);
var atNos =  Clazz.newIntArray (n, 0);
for (var i = 0; i < n; i++) {
atNos[i] = J.api.JmolAdapter.getElementNumber(tatoms.get(i).getElementSymbol());
}
var m =  new JU.JmolMolecule();
m.atNos = atNos;
return m.getMolecularFormula(false, null, false);
}, "JU.Lst");
c$.setTAtom = Clazz.defineMethod(c$, "setTAtom", 
function(a, b){
b.setT(a);
b.formalCharge = a.formalCharge;
b.bondingRadius = a.bondingRadius;
}, "J.adapter.smarter.Atom,J.adapter.smarter.Atom");
c$.setElementSymbol = Clazz.defineMethod(c$, "setElementSymbol", 
function(a, sym){
var name = a.atomName;
if (sym == null) {
a.atomName = (a.atomName == null ? "X" : a.atomName.substring(a.atomName.indexOf('_') + 1));
} else {
a.atomName = sym;
}a.getElementSymbol();
a.atomName = name;
}, "J.adapter.smarter.Atom,~S");
c$.applySymmetry = Clazz.defineMethod(c$, "applySymmetry", 
function(a, ops, op, t){
if (op >= 0) {
if (op >= 1 || t.x != 0 || t.y != 0 || t.z != 0) {
if (op >= 1) ops[op].rotTrans(a);
a.add(t);
}}}, "J.adapter.smarter.Atom,~A,~N,JU.T3");
Clazz.defineMethod(c$, "getNetByID", 
function(id){
for (var i = this.nets.size(); --i >= 0; ) {
var n = this.nets.get(i);
if (n.id.equalsIgnoreCase(id)) return n;
}
var n = Clazz.innerTypeInstance(J.adapter.readers.cif.TopoCifParser.TNet, this, null, this.netCount++, id, "Net" + id, null);
this.nets.addLast(n);
return n;
}, "~S");
Clazz.defineMethod(c$, "getAtomFromName", 
function(atomLabel){
return (atomLabel == null ? null : this.reader.asc.getAtomFromName(atomLabel));
}, "~S");
Clazz.defineMethod(c$, "calculateDistance", 
function(p1, p2){
this.temp1.setT(p1);
this.temp2.setT(p2);
this.sym.toCartesian(this.temp1, true);
this.sym.toCartesian(this.temp2, true);
return this.temp1.distance(this.temp2);
}, "JU.P3,JU.P3");
Clazz.defineMethod(c$, "getNetFor", 
function(id, label, forceNew){
var net = null;
if (id != null) {
net = this.getNetByID(id);
if (net != null && label != null && forceNew) net.label = label;
} else if (label != null) {
for (var i = this.nets.size(); --i >= 0; ) {
var n = this.nets.get(i);
if (n.label.equalsIgnoreCase(label)) {
net = n;
break;
}}
}if (net == null) {
if (!forceNew) return null;
net = this.getNetByID(id == null ? "1" : id);
}if (net != null && label != null && forceNew) net.label = label;
return net;
}, "~S,~S,~B");
Clazz.defineMethod(c$, "getAssociatedNodeByIdx", 
function(idx){
for (var i = this.nodes.size(); --i >= 0; ) {
var n = this.nodes.get(i);
if (n.idx == idx) return n;
}
return null;
}, "~N");
Clazz.defineMethod(c$, "getAssoiatedLinkByIdx", 
function(idx){
for (var i = this.links.size(); --i >= 0; ) {
var l = this.links.get(i);
if (l.idx == idx) return l;
}
return null;
}, "~N");
Clazz.defineMethod(c$, "findNode", 
function(nodeID, op, trans){
for (var i = this.nodes.size(); --i >= 0; ) {
var n = this.nodes.get(i);
if (n.id.equals(nodeID) && (op < 0 && n.linkSymop == 0 && n.linkTrans.equals(J.adapter.readers.cif.TopoCifParser.ZERO) || n.linkSymop == op && n.linkTrans.equals(trans))) return n;
}
return null;
}, "~S,~N,JU.P3");
c$.$TopoCifParser$TNet$ = function(){
})();
};
c$.$TopoCifParser$TAtom$ = function(){
})();
};
c$.$TopoCifParser$TNode$ = function(){
})();
};
c$.$TopoCifParser$TLink$ = function(){
})();
};
Clazz.declareInterface(J.adapter.readers.cif.TopoCifParser, "TPoint");
c$.linkTypes = "?  SINDOUTRIQUAQUISEXSEPOCTAROPOLDELPI HBOVDW";
c$.ERROR_TOLERANCE = 0.001;
c$.topolFields =  Clazz.newArray(-1, ["_topol_net_id", "_topol_net_label", "_topol_net_special_details", "_topol_link_id", "_topol_link_net_id", "_topol_link_node_id_1", "_topol_link_node_id_2", "_topol_link_symop_id_1", "_topol_link_translation_1", "_topol_link_translation_1_x", "_topol_link_translation_1_y", "_topol_link_translation_1_z", "_topol_link_symop_id_2", "_topol_link_translation_2", "_topol_link_translation_2_x", "_topol_link_translation_2_y", "_topol_link_translation_2_z", "_topol_link_distance", "_topol_link_type", "_topol_link_multiplicity", "_topol_link_voronoi_solidangle", "_topol_link_order", "_topol_node_id", "_topol_node_net_id", "_topol_node_label", "_topol_node_symop_id", "_topol_node_translation", "_topol_node_translation_x", "_topol_node_translation_y", "_topol_node_translation_z", "_topol_node_fract_x", "_topol_node_fract_y", "_topol_node_fract_z", "_topol_atom_id", "_topol_atom_atom_label", "_topol_atom_node_id", "_topol_atom_link_id", "_topol_atom_symop_id", "_topol_atom_translation", "_topol_atom_translation_x", "_topol_atom_translation_y", "_topol_atom_translation_z", "_topol_atom_fract_x", "_topol_atom_fract_y", "_topol_atom_fract_z", "_topol_atom_element_symbol", "_topol_link_site_symmetry_symop_1", "_topol_link_site_symmetry_translation_1_x", "_topol_link_site_symmetry_translation_1_y", "_topol_link_site_symmetry_translation_1_z", "_topol_link_site_symmetry_symop_2", "_topol_link_site_symmetry_translation_2_x", "_topol_link_site_symmetry_translation_2_y", "_topol_link_site_symmetry_translation_2_z", "_topol_link_site_symmetry_translation_1", "_topol_link_site_symmetry_translation_2", "_topol_link_node_label_1", "_topol_link_node_label_2", "_topol_link_atom_label_1", "_topol_link_atom_label_2"]);
c$.ZERO =  new JU.P3();
});
;//5.0.1-v7 Wed Mar 25 00:33:43 CDT 2026
