(function(Clazz
,Clazz_getClassName
,Clazz_newLongArray
,Clazz_doubleToByte
,Clazz_doubleToInt
,Clazz_doubleToLong
,Clazz_declarePackage
,Clazz_instanceOf
,Clazz_load
,Clazz_instantialize
,Clazz_decorateAsClass
,Clazz_floatToInt
,Clazz_floatToLong
,Clazz_makeConstructor
,Clazz_defineEnumConstant
,Clazz_exceptionOf
,Clazz_newIntArray
,Clazz_newFloatArray
,Clazz_declareType
,Clazz_prepareFields
,Clazz_superConstructor
,Clazz_newByteArray
,Clazz_declareInterface
,Clazz_newShortArray
,Clazz_innerTypeInstance
,Clazz_isClassDefined
,Clazz_prepareCallback
,Clazz_newArray
,Clazz_castNullAs
,Clazz_floatToShort
,Clazz_superCall
,Clazz_decorateAsType
,Clazz_newBooleanArray
,Clazz_newCharArray
,Clazz_implementOf
,Clazz_newDoubleArray
,Clazz_overrideConstructor
,Clazz_clone
,Clazz_doubleToShort
,Clazz_getInheritedLevel
,Clazz_getParamsType
,Clazz_isAF
,Clazz_isAB
,Clazz_isAI
,Clazz_isAS
,Clazz_isASS
,Clazz_isAP
,Clazz_isAFloat
,Clazz_isAII
,Clazz_isAFF
,Clazz_isAFFF
,Clazz_tryToSearchAndExecute
,Clazz_getStackTrace
,Clazz_inheritArgs
,Clazz_alert
,Clazz_defineMethod
,Clazz_overrideMethod
,Clazz_declareAnonymous
,Clazz_cloneFinals
){
var $t$;
Clazz_declarePackage("J.adapter.smarter");
Clazz_load(["JS.Symmetry", "JU.P3", "$.SB"], "J.adapter.smarter.XtalSymmetry", ["java.util.Hashtable", "JU.A4", "$.BS", "$.Lst", "$.M3", "$.M4", "$.P3i", "$.PT", "$.V3", "J.adapter.smarter.Atom", "JS.SpaceGroup", "$.SymmetryOperation", "$.UnitCell", "JU.BSUtil", "$.Logger", "$.SimpleUnitCell"], function(){
var c$ = Clazz_decorateAsClass(function(){
this.acr = null;
this.applySymmetryToBonds = false;
this.asc = null;
this.baseSymmetry = null;
this.bondCount0 = 0;
this.bondsFound = null;
this.centroidPacked = false;
this.checkAll = false;
this.checkNearAtoms = false;
this.crystalReaderLatticeOpsOnly = false;
this.disorderMap = null;
this.disorderMapMax = 0;
this.doCentroidUnitCell = false;
this.doNormalize = true;
this.doPackUnitCell = false;
this.filterSymop = null;
this.firstAtom = 0;
this.latticeCells = null;
this.latticeOp = 0;
this.mident = null;
this.minXYZ = null;
this.maxXYZ = null;
this.minXYZ0 = null;
this.maxXYZ0 = null;
this.mTemp = null;
this.ndims = 3;
this.noSymmetryCount = 0;
this.packingRange = 0;
this.ptOffset = null;
this.ptTemp = null;
this.rmin = null;
this.rmax = null;
this.symmetry = null;
this.symmetryRange = 0;
this.trajectoryUnitCells = null;
this.unitCellParams = null;
this.unitCellTranslations = null;
Clazz_instantialize(this, arguments);}, J.adapter.smarter, "XtalSymmetry", null);
Clazz_prepareFields (c$, function(){
this.bondsFound =  new JU.SB();
this.ptOffset =  new JU.P3();
});
Clazz_makeConstructor(c$, 
function(){
});
Clazz_defineMethod(c$, "addRotatedTensor", 
function(a, t, iSym, reset, symmetry){
if (this.ptTemp == null) {
this.ptTemp =  new JU.P3();
this.mTemp =  new JU.M3();
}return a.addTensor((this.acr.getInterface("JU.Tensor")).setFromEigenVectors(symmetry.rotateAxes(iSym, t.eigenVectors, this.ptTemp, this.mTemp), t.eigenValues, t.isIsotropic ? "iso" : t.type, t.id, t), null, reset);
}, "J.adapter.smarter.Atom,JU.Tensor,~N,~B,J.adapter.smarter.XtalSymmetry.FileSymmetry");
Clazz_defineMethod(c$, "applySymmetryBio", 
function(thisBiomolecule, applySymmetryToBonds, filter){
var biomts = thisBiomolecule.get("biomts");
var len = biomts.size();
if (this.mident == null) {
this.mident =  new JU.M4();
this.mident.setIdentity();
}this.acr.lstNCS = null;
this.setLatticeCells();
var lc = (this.latticeCells != null && this.latticeCells[0] != 0 ?  Clazz_newIntArray (3, 0) : null);
if (lc != null) for (var i = 0; i < 3; i++) lc[i] = this.latticeCells[i];

this.latticeCells = null;
var sep = "";
var bmChains = this.acr.getFilterWithCase("BMCHAINS");
var fixBMChains = -1;
if (bmChains != null && (bmChains = bmChains.trim()).length > 0) {
if (bmChains.charAt(0) == '=') bmChains = bmChains.substring(1).trim();
if (bmChains.equals("_")) {
sep = "_";
fixBMChains = 0;
} else {
fixBMChains = (bmChains.length == 0 ? 0 : JU.PT.parseInt(bmChains));
if (fixBMChains == -2147483648) {
fixBMChains = -(bmChains.charAt(0)).charCodeAt(0);
}}}var particleMode = (filter.indexOf("BYCHAIN") >= 0 ? 1 : filter.indexOf("BYSYMOP") >= 0 ? 2 : 0);
this.doNormalize = false;
var biomtchains = thisBiomolecule.get("chains");
(this.symmetry =  new J.adapter.smarter.XtalSymmetry.FileSymmetry()).setSpaceGroup(this.doNormalize);
this.addSpaceGroupOperation("x,y,z", false);
var name = thisBiomolecule.get("name");
this.setAtomSetSpaceGroupName(this.acr.sgName = name);
this.applySymmetryToBonds = applySymmetryToBonds;
this.bondCount0 = this.asc.bondCount;
this.firstAtom = this.asc.getLastAtomSetAtomIndex();
var atomMax = this.asc.ac;
var ht =  new java.util.Hashtable();
var nChain = 0;
var atoms = this.asc.atoms;
var addBonds = (this.bondCount0 > this.asc.bondIndex0 && applySymmetryToBonds);
switch (particleMode) {
case 1:
for (var i = atomMax; --i >= this.firstAtom; ) {
var id = Integer.$valueOf(atoms[i].chainID);
var bs = ht.get(id);
if (bs == null) {
nChain++;
ht.put(id, bs =  new JU.BS());
}bs.set(i);
}
this.asc.bsAtoms =  new JU.BS();
for (var i = 0; i < nChain; i++) {
this.asc.bsAtoms.set(atomMax + i);
var a =  new J.adapter.smarter.Atom();
a.set(0, 0, 0);
a.radius = 16;
this.asc.addAtom(a);
}
var ichain = 0;
for (var e, $e = ht.entrySet().iterator (); $e.hasNext()&& ((e = $e.next ()) || true);) {
var a = atoms[atomMax + ichain++];
var bs = e.getValue();
for (var i = bs.nextSetBit(0); i >= 0; i = bs.nextSetBit(i + 1)) a.add(atoms[i]);

a.scale(1 / bs.cardinality());
a.atomName = "Pt" + ichain;
a.chainID = e.getKey().intValue();
}
this.firstAtom = atomMax;
atomMax += nChain;
addBonds = false;
break;
case 2:
this.asc.bsAtoms =  new JU.BS();
this.asc.bsAtoms.set(atomMax);
var a = atoms[atomMax] =  new J.adapter.smarter.Atom();
a.set(0, 0, 0);
for (var i = atomMax; --i >= this.firstAtom; ) a.add(atoms[i]);

a.scale(1 / (atomMax - this.firstAtom));
a.atomName = "Pt";
a.radius = 16;
this.asc.addAtom(a);
this.firstAtom = atomMax++;
addBonds = false;
break;
}
var assemblyIdAtoms = thisBiomolecule.get("asemblyIdAtoms");
if (filter.indexOf("#<") >= 0) {
len = Math.min(len, JU.PT.parseInt(filter.substring(filter.indexOf("#<") + 2)) - 1);
filter = JU.PT.rep(filter, "#<", "_<");
}var maxChain = 0;
for (var iAtom = this.firstAtom; iAtom < atomMax; iAtom++) {
atoms[iAtom].bsSymmetry =  new JU.BS();
var chainID = atoms[iAtom].chainID;
if (chainID > maxChain) maxChain = chainID;
}
var bsAtoms = this.asc.bsAtoms;
var atomMap = (addBonds ?  Clazz_newIntArray (this.asc.ac, 0) : null);
for (var imt = (biomtchains == null ? 1 : 0); imt < len; imt++) {
if (filter.indexOf("!#") >= 0) {
if (filter.indexOf("!#" + (imt + 1) + ";") >= 0) continue;
} else if (filter.indexOf("#") >= 0 && filter.indexOf("#" + (imt + 1) + ";") < 0) {
continue;
}var mat = biomts.get(imt);
var notIdentity = !mat.equals(this.mident);
var chains = (biomtchains == null ? null : biomtchains.get(imt));
if (chains != null && assemblyIdAtoms != null) {
bsAtoms =  new JU.BS();
for (var e, $e = assemblyIdAtoms.entrySet().iterator (); $e.hasNext()&& ((e = $e.next ()) || true);) if (chains.indexOf(":" + e.getKey() + ";") >= 0) bsAtoms.or(e.getValue());

if (this.asc.bsAtoms != null) bsAtoms.and(this.asc.bsAtoms);
chains = null;
}var lastID = -1;
var id;
var skipping = false;
for (var iAtom = this.firstAtom; iAtom < atomMax; iAtom++) {
if (bsAtoms != null) {
skipping = !bsAtoms.get(iAtom);
} else if (chains != null && (id = atoms[iAtom].chainID) != lastID) {
skipping = (chains.indexOf(":" + this.acr.vwr.getChainIDStr(lastID = id) + ";") < 0);
}if (skipping) continue;
try {
var atomSite = atoms[iAtom].atomSite;
var atom1;
if (addBonds) atomMap[atomSite] = this.asc.ac;
atom1 = this.asc.newCloneAtom(atoms[iAtom]);
atom1.bondingRadius = imt;
this.asc.atomSymbolicMap.put("" + atom1.atomSerial, atom1);
if (this.asc.bsAtoms != null) this.asc.bsAtoms.set(atom1.index);
atom1.atomSite = atomSite;
if (notIdentity) mat.rotTrans(atom1);
atom1.bsSymmetry = JU.BSUtil.newAndSetBit(imt);
} catch (e) {
if (Clazz_exceptionOf(e, Exception)){
this.asc.errorMessage = "appendAtomCollection error: " + e;
} else {
throw e;
}
}
}
if (notIdentity) this.symmetry.addBioMoleculeOperation(mat, false);
if (addBonds) {
for (var bondNum = this.asc.bondIndex0; bondNum < this.bondCount0; bondNum++) {
var bond = this.asc.bonds[bondNum];
var iAtom1 = atomMap[atoms[bond.atomIndex1].atomSite];
var iAtom2 = atomMap[atoms[bond.atomIndex2].atomSite];
this.asc.addNewBondWithOrder(iAtom1, iAtom2, bond.order);
}
}}
if (biomtchains != null) {
if (this.asc.bsAtoms == null) this.asc.bsAtoms = JU.BSUtil.newBitSet2(0, this.asc.ac);
this.asc.bsAtoms.clearBits(this.firstAtom, atomMax);
if (particleMode == 0) {
if (fixBMChains != -1) {
var assignABC = (fixBMChains != 0);
var bsChains = (assignABC ?  new JU.BS() : null);
atoms = this.asc.atoms;
var firstNew = 0;
if (assignABC) {
firstNew = (fixBMChains < 0 ? Math.max(-fixBMChains, maxChain + 1) : Math.max(maxChain + fixBMChains, 65));
bsChains.setBits(0, firstNew - 1);
bsChains.setBits(91, 97);
bsChains.setBits(123, 200);
}var bsAll = (this.asc.structureCount == 1 ? this.asc.structures[0].bsAll : null);
var chainMap =  new java.util.Hashtable();
var knownMap =  new java.util.Hashtable();
var knownAtomMap = (bsAll == null ? null :  new java.util.Hashtable());
var lastKnownAtom = null;
for (var i = atomMax, n = this.asc.ac; i < n; i++) {
var ic = atoms[i].chainID;
var isym = atoms[i].bsSymmetry.nextSetBit(0);
var ch0 = this.acr.vwr.getChainIDStr(ic);
var ch = (isym == 0 ? ch0 : ch0 + sep + isym);
var known = chainMap.get(ch);
if (known == null) {
if (assignABC && isym != 0) {
var pt = (firstNew < 200 ? bsChains.nextClearBit(firstNew) : 200);
if (pt < 200) {
bsChains.set(pt);
known = Integer.$valueOf(this.acr.vwr.getChainID("" + String.fromCharCode(pt), true));
firstNew = pt;
} else {
}}if (known == null) known = Integer.$valueOf(this.acr.vwr.getChainID(ch, true));
if (ch !== ch0) {
knownMap.put(known, Integer.$valueOf(ic));
if (bsAll != null) {
if (lastKnownAtom != null) lastKnownAtom[1] = i;
knownAtomMap.put(known, lastKnownAtom =  Clazz_newIntArray(-1, [i, n]));
}}chainMap.put(ch, known);
}atoms[i].chainID = known.intValue();
}
if (this.asc.structureCount > 0) {
var strucs = this.asc.structures;
var nStruc = this.asc.structureCount;
for (var e, $e = knownMap.entrySet().iterator (); $e.hasNext()&& ((e = $e.next ()) || true);) {
var known = e.getKey();
var ch1 = known.intValue();
var ch0 = e.getValue().intValue();
for (var i = 0; i < nStruc; i++) {
var s = strucs[i];
if (s.bsAll != null) {
} else if (s.startChainID == s.endChainID) {
if (s.startChainID == ch0) {
var s1 = s.clone();
s1.startChainID = s1.endChainID = ch1;
this.asc.addStructure(s1);
}} else {
System.err.println("XtalSymmetry not processing biomt chain structure " + this.acr.vwr.getChainIDStr(ch0) + " to " + this.acr.vwr.getChainIDStr(ch1));
}}
}
}}var vConnect = this.asc.getAtomSetAuxiliaryInfoValue(-1, "PDB_CONECT_bonds");
if (!addBonds && vConnect != null) {
for (var i = vConnect.size(); --i >= 0; ) {
var bond = vConnect.get(i);
var a = this.asc.getAtomFromName("" + bond[0]);
var b = this.asc.getAtomFromName("" + bond[1]);
if (a != null && b != null && a.bondingRadius != b.bondingRadius && (bsAtoms == null || bsAtoms.get(a.index) && bsAtoms.get(b.index)) && a.distanceSquared(b) > 25.0) {
vConnect.removeItemAt(i);
System.out.println("XtalSymmetry: long interchain bond removed for @" + a.atomSerial + "-@" + b.atomSerial);
}}
}}for (var i = atomMax, n = this.asc.ac; i < n; i++) {
this.asc.atoms[i].bondingRadius = NaN;
}
}this.noSymmetryCount = atomMax - this.firstAtom;
this.finalizeSymmetry(this.symmetry);
this.setCurrentModelInfo(len, null, null);
this.reset();
}, "java.util.Map,~B,~S");
Clazz_defineMethod(c$, "getBaseSymmetry", 
function(){
return (this.baseSymmetry == null ? this.symmetry : this.baseSymmetry);
});
Clazz_defineMethod(c$, "getOverallSpan", 
function(){
return (this.maxXYZ0 == null ? JU.V3.new3(this.maxXYZ.x - this.minXYZ.x, this.maxXYZ.y - this.minXYZ.y, this.maxXYZ.z - this.minXYZ.z) : JU.V3.newVsub(this.maxXYZ0, this.minXYZ0));
});
Clazz_defineMethod(c$, "getSymmetry", 
function(){
return (this.symmetry == null ? (this.symmetry =  new J.adapter.smarter.XtalSymmetry.FileSymmetry()) : this.symmetry);
});
c$.isWithinSupercell = Clazz_defineMethod(c$, "isWithinSupercell", 
function(ndims, pt, minX, maxX, minY, maxY, minZ, maxZ, slop){
return (pt.x > minX - slop && pt.x < maxX + slop && (ndims < 2 || pt.y > minY - slop && pt.y < maxY + slop) && (ndims < 3 || pt.z > minZ - slop && pt.z < maxZ + slop));
}, "~N,JU.P3,~N,~N,~N,~N,~N,~N,~N");
Clazz_defineMethod(c$, "set", 
function(reader){
this.acr = reader;
this.asc = reader.asc;
this.getSymmetry();
return this;
}, "J.adapter.smarter.AtomSetCollectionReader");
Clazz_defineMethod(c$, "setLatticeParameter", 
function(latt){
this.symmetry.setSpaceGroup(this.doNormalize);
this.symmetry.setLattice(latt);
}, "~N");
Clazz_defineMethod(c$, "addSpaceGroupOperation", 
function(xyz, andSetLattice){
this.symmetry.setSpaceGroup(this.doNormalize);
if (andSetLattice && this.symmetry.getSpaceGroupOperationCount() == 1) this.setLatticeCells();
return this.symmetry.addSpaceGroupOperation(xyz, 0);
}, "~S,~B");
Clazz_defineMethod(c$, "setSymmetryFromAuditBlock", 
function(symmetry){
return (this.symmetry = symmetry);
}, "J.adapter.smarter.XtalSymmetry.FileSymmetry");
Clazz_defineMethod(c$, "applySymmetryFromReader", 
function(readerSymmetry){
this.asc.setCoordinatesAreFractional(this.acr.iHaveFractionalCoordinates);
this.setAtomSetSpaceGroupName(this.acr.sgName);
this.symmetryRange = this.acr.symmetryRange;
this.asc.setInfo("symmetryRange", Float.$valueOf(this.symmetryRange));
if (this.acr.doConvertToFractional || this.acr.fileCoordinatesAreFractional) {
this.setLatticeCells();
var doApplySymmetry = true;
if (this.acr.ignoreFileSpaceGroupName || !this.acr.iHaveSymmetryOperators) {
if (!this.acr.merging || readerSymmetry == null) readerSymmetry =  new J.adapter.smarter.XtalSymmetry.FileSymmetry();
if (this.acr.unitCellParams[0] == 0 && this.acr.unitCellParams[2] == 0) {
JU.SimpleUnitCell.fillParams(null, null, null, this.acr.unitCellParams);
}doApplySymmetry = readerSymmetry.createSpaceGroup(this.acr.desiredSpaceGroupIndex, (this.acr.sgName.indexOf("!") >= 0 ? "P1" : this.acr.sgName), this.acr.unitCellParams, this.acr.modDim);
} else {
this.acr.doPreSymmetry(doApplySymmetry);
readerSymmetry = null;
}this.packingRange = this.acr.getPackingRangeValue(0);
if (doApplySymmetry) {
if (readerSymmetry != null) this.getSymmetry().setSpaceGroupTo(readerSymmetry.getSpaceGroup());
this.applySymmetryLattice();
if (readerSymmetry != null && this.filterSymop == null) this.setAtomSetSpaceGroupName(readerSymmetry.getSpaceGroupName());
} else {
this.setUnitCellSafely();
}}if (this.acr.iHaveFractionalCoordinates && this.acr.merging && readerSymmetry != null) {
var atoms = this.asc.atoms;
for (var i = this.asc.getLastAtomSetAtomIndex(), n = this.asc.ac; i < n; i++) readerSymmetry.toCartesian(atoms[i], true);

this.asc.setCoordinatesAreFractional(false);
this.acr.addVibrations = false;
}return this.symmetry;
}, "J.adapter.smarter.XtalSymmetry.FileSymmetry");
Clazz_defineMethod(c$, "finalizeMoments", 
function(spinFrame, spinFrameExt){
this.getSymmetry().preSymmetryFinalizeMoments(this.acr, this.asc, spinFrame, spinFrameExt);
}, "~S,~S");
Clazz_defineMethod(c$, "setMagneticMoments", 
function(isCartesian){
return (this.asc.iSet < 0 || !this.acr.vibsFractional ? 0 : this.getBaseSymmetry().postSymmetrySetMagneticMoments(this.asc, isCartesian));
}, "~B");
Clazz_defineMethod(c$, "setTensors", 
function(){
var n = this.asc.ac;
for (var i = this.asc.getLastAtomSetAtomIndex(); i < n; i++) {
var a = this.asc.atoms[i];
if (a.anisoBorU == null) continue;
a.addTensor(this.symmetry.getTensor(this.acr.vwr, a.anisoBorU), null, false);
if (Float.isNaN(a.bfactor)) a.bfactor = a.anisoBorU[7] * 100;
a.anisoBorU = null;
}
});
Clazz_defineMethod(c$, "adjustRangeMinMax", 
function(oabc){
this.symmetry.adjustRangeMinMax(oabc, (this.acr.forcePacked ? this.packingRange : NaN), this.minXYZ, this.maxXYZ, this.rmin, this.rmax, this.minXYZ, this.maxXYZ);
}, "~A");
Clazz_defineMethod(c$, "applyAllSymmetry", 
function(ms, bsAtoms){
if (this.asc.ac == 0 || bsAtoms != null && bsAtoms.isEmpty()) return;
var n = this.noSymmetryCount = this.asc.baseSymmetryAtomCount > 0 ? this.asc.baseSymmetryAtomCount : bsAtoms == null ? this.asc.getLastAtomSetAtomCount() : this.asc.ac - bsAtoms.nextSetBit(this.asc.getLastAtomSetAtomIndex());
this.asc.setTensors();
this.applySymmetryToBonds = this.acr.applySymmetryToBonds;
this.doPackUnitCell = this.acr.doPackUnitCell && !this.applySymmetryToBonds;
this.bondCount0 = this.asc.bondCount;
this.ndims = JU.SimpleUnitCell.getDimensionFromParams(this.acr.unitCellParams);
this.finalizeSymmetry(this.symmetry);
var operationCount = this.symmetry.getSpaceGroupOperationCount();
var excludedOps = (this.acr.thisBiomolecule == null ? null :  new JU.BS());
this.checkNearAtoms = this.acr.checkNearAtoms || excludedOps != null;
JU.SimpleUnitCell.setMinMaxLatticeParameters(this.ndims, this.minXYZ, this.maxXYZ, 0);
this.latticeOp = this.symmetry.getLatticeOp();
this.crystalReaderLatticeOpsOnly = (this.asc.crystalReaderLatticeOpsOnly && this.latticeOp >= 0);
if (this.doCentroidUnitCell) this.asc.setInfo("centroidMinMax",  Clazz_newIntArray(-1, [this.minXYZ.x, this.minXYZ.y, this.minXYZ.z, this.maxXYZ.x, this.maxXYZ.y, this.maxXYZ.z, (this.centroidPacked ? Clazz_floatToInt(this.packingRange * 100) : 0)]));
if (this.doCentroidUnitCell || this.acr.doPackUnitCell || this.symmetryRange != 0 && this.maxXYZ.x - this.minXYZ.x == 1 && this.maxXYZ.y - this.minXYZ.y == 1 && this.maxXYZ.z - this.minXYZ.z == 1) {
this.minXYZ0 = JU.P3.new3(this.minXYZ.x, this.minXYZ.y, this.minXYZ.z);
this.maxXYZ0 = JU.P3.new3(this.maxXYZ.x, this.maxXYZ.y, this.maxXYZ.z);
if (ms != null) {
ms.setMinMax0(this.minXYZ0, this.maxXYZ0);
this.minXYZ.set(Clazz_floatToInt(this.minXYZ0.x), Clazz_floatToInt(this.minXYZ0.y), Clazz_floatToInt(this.minXYZ0.z));
this.maxXYZ.set(Clazz_floatToInt(this.maxXYZ0.x), Clazz_floatToInt(this.maxXYZ0.y), Clazz_floatToInt(this.maxXYZ0.z));
}switch (this.ndims) {
case 3:
this.minXYZ.z--;
this.maxXYZ.z++;
case 2:
this.minXYZ.y--;
this.maxXYZ.y++;
case 1:
this.minXYZ.x--;
this.maxXYZ.x++;
}
}var nCells = (this.maxXYZ.x - this.minXYZ.x) * (this.maxXYZ.y - this.minXYZ.y) * (this.maxXYZ.z - this.minXYZ.z);
var nsym = n * (this.crystalReaderLatticeOpsOnly ? 4 : operationCount);
var cartesianCount = (this.checkNearAtoms || this.acr.thisBiomolecule != null ? nsym * nCells : this.symmetryRange > 0 ? nsym : 1);
var cartesians =  new Array(cartesianCount);
var atoms = this.asc.atoms;
for (var i = 0; i < n; i++) atoms[this.firstAtom + i].bsSymmetry = JU.BS.newN(operationCount * (nCells + 1));

var pt = 0;
this.unitCellTranslations =  new Array(nCells);
var iCell = 0;
var cell555Count = 0;
var absRange = Math.abs(this.symmetryRange);
var checkCartesianRange = (this.symmetryRange != 0);
var checkRangeNoSymmetry = (this.symmetryRange < 0);
var checkRange111 = (this.symmetryRange > 0);
if (checkCartesianRange) {
this.rmin.x = this.rmin.y = this.rmin.z = 3.4028235E38;
this.rmax.x = this.rmax.y = this.rmax.z = -3.4028235E38;
}var sym = this.symmetry;
var lastSymmetry = sym;
this.checkAll = (this.crystalReaderLatticeOpsOnly || this.asc.atomSetCount == 1 && this.checkNearAtoms && this.latticeOp >= 0);
var lstNCS = this.acr.lstNCS;
if (lstNCS != null && lstNCS.get(0).m33 == 0) {
var nOp = sym.getSpaceGroupOperationCount();
var nn = lstNCS.size();
for (var i = nn; --i >= 0; ) {
var m = lstNCS.get(i);
m.m33 = 1;
sym.toFractionalM(m);
}
for (var i = 1; i < nOp; i++) {
var m1 = sym.getSpaceGroupOperation(i);
for (var j = 0; j < nn; j++) {
var m = JU.M4.newM4(lstNCS.get(j));
m.mul2(m1, m);
if (this.doNormalize && this.noSymmetryCount > 0) JS.SymmetryOperation.normalizeOperationToCentroid(3, m, atoms, this.firstAtom, this.noSymmetryCount);
lstNCS.addLast(m);
}
}
}var pttemp = null;
var op = sym.getSpaceGroupOperation(0);
if (this.doPackUnitCell) {
pttemp =  new JU.P3();
this.ptOffset.set(0, 0, 0);
}var atomMap = (this.bondCount0 > this.asc.bondIndex0 && this.applySymmetryToBonds ?  Clazz_newIntArray (n, 0) : null);
var unitCells =  Clazz_newIntArray (nCells, 0);
for (var tx = this.minXYZ.x; tx < this.maxXYZ.x; tx++) {
for (var ty = this.minXYZ.y; ty < this.maxXYZ.y; ty++) {
for (var tz = this.minXYZ.z; tz < this.maxXYZ.z; tz++) {
this.unitCellTranslations[iCell] = JU.V3.new3(tx, ty, tz);
unitCells[iCell++] = 555 + tx * 100 + ty * 10 + tz;
if (tx != 0 || ty != 0 || tz != 0 || cartesians.length == 0) continue;
for (pt = 0; pt < n; pt++) {
var atom = atoms[this.firstAtom + pt];
if (ms != null) {
sym = ms.getAtomSymmetry(atom, this.symmetry);
if (sym !== lastSymmetry) {
if (sym.getSpaceGroupOperationCount() == 0) this.finalizeSymmetry(sym);
lastSymmetry = sym;
op = sym.getSpaceGroupOperation(0);
}}var c = JU.P3.newP(atom);
op.rotTrans(c);
sym.toCartesian(c, false);
if (this.doPackUnitCell) {
sym.toUnitCellRnd(c, this.ptOffset);
pttemp.setT(c);
sym.toFractional(pttemp, false);
System.out.println(pttemp + "\n-" + JU.P3.newP(atom));
this.acr.fixFloatPt(pttemp, 100000.0);
if (bsAtoms == null) atom.setT(pttemp);
 else if (atom.distance(pttemp) < 1.0E-4) bsAtoms.set(atom.index);
 else {
bsAtoms.clear(atom.index);
continue;
}}if (bsAtoms != null) atom.bsSymmetry.clearAll();
atom.bsSymmetry.set(iCell * operationCount);
atom.bsSymmetry.set(0);
if (checkCartesianRange) JS.UnitCell.setSymmetryMinMax(c, this.rmin, this.rmax);
if (pt < cartesianCount) cartesians[pt] = c;
}
if (checkRangeNoSymmetry) {
this.rmin.x -= absRange;
this.rmin.y -= absRange;
this.rmin.z -= absRange;
this.rmax.x += absRange;
this.rmax.y += absRange;
this.rmax.z += absRange;
}cell555Count = pt = this.symmetryAddAtoms(0, 0, 0, 0, pt, iCell * operationCount, cartesians, ms, excludedOps, atomMap);
}
}
}
if (checkRange111) {
this.rmin.x -= absRange;
this.rmin.y -= absRange;
this.rmin.z -= absRange;
this.rmax.x += absRange;
this.rmax.y += absRange;
this.rmax.z += absRange;
}iCell = 0;
for (var tx = this.minXYZ.x; tx < this.maxXYZ.x; tx++) {
for (var ty = this.minXYZ.y; ty < this.maxXYZ.y; ty++) {
for (var tz = this.minXYZ.z; tz < this.maxXYZ.z; tz++) {
iCell++;
if (tx != 0 || ty != 0 || tz != 0) pt = this.symmetryAddAtoms(tx, ty, tz, cell555Count, pt, iCell * operationCount, cartesians, ms, excludedOps, atomMap);
}
}
}
if (iCell * n == this.asc.ac - this.firstAtom) this.duplicateAtomProperties(iCell);
this.setCurrentModelInfo(n, sym, unitCells);
this.unitCellParams = null;
this.reset();
}, "J.adapter.smarter.MSInterface,JU.BS");
Clazz_defineMethod(c$, "applyRangeSymmetry", 
function(bsAtoms){
var range = this.acr.fillRange;
bsAtoms = this.updateBSAtoms();
this.acr.forcePacked = true;
this.doPackUnitCell = false;
var minXYZ2 = JU.P3i.new3(this.minXYZ.x, this.minXYZ.y, this.minXYZ.z);
var maxXYZ2 = JU.P3i.new3(this.maxXYZ.x, this.maxXYZ.y, this.maxXYZ.z);
var oabc =  new Array(4);
for (var i = 0; i < 4; i++) oabc[i] = JU.P3.newP(range[i]);

this.setUnitCellSafely();
this.adjustRangeMinMax(oabc);
var superSymmetry =  new J.adapter.smarter.XtalSymmetry.FileSymmetry();
superSymmetry.getUnitCell(this.acr.fillRange, false, null);
this.applyAllSymmetry(this.acr.ms, bsAtoms);
var pt0 =  new JU.P3();
var atoms = this.asc.atoms;
for (var i = this.asc.ac; --i >= this.firstAtom; ) {
pt0.setT(atoms[i]);
this.symmetry.toCartesian(pt0, false);
superSymmetry.toFractional(pt0, false);
if (this.acr.noPack ? !J.adapter.smarter.XtalSymmetry.removePacking(this.ndims, pt0, minXYZ2.x, maxXYZ2.x, minXYZ2.y, maxXYZ2.y, minXYZ2.z, maxXYZ2.z, this.packingRange) : !J.adapter.smarter.XtalSymmetry.isWithinSupercell(this.ndims, pt0, minXYZ2.x, maxXYZ2.x, minXYZ2.y, maxXYZ2.y, minXYZ2.z, maxXYZ2.z, this.packingRange)) bsAtoms.clear(i);
}
}, "JU.BS");
Clazz_defineMethod(c$, "applySuperSymmetry", 
function(supercell, bsAtoms, iAtomFirst, oabc, pt0, vabc, slop){
this.asc.setGlobalBoolean(7);
var doPack0 = this.doPackUnitCell;
this.doPackUnitCell = doPack0;
this.applyAllSymmetry(this.acr.ms, null);
this.doPackUnitCell = doPack0;
var atoms = this.asc.atoms;
var atomCount = this.asc.ac;
for (var i = iAtomFirst; i < atomCount; i++) {
this.symmetry.toCartesian(atoms[i], true);
bsAtoms.set(i);
}
this.asc.setCurrentModelInfo("unitcell_conventional", this.symmetry.getV0abc("a,b,c", null));
var va = vabc[0];
var vb = vabc[1];
var vc = vabc[2];
this.symmetry =  new J.adapter.smarter.XtalSymmetry.FileSymmetry();
this.setUnitCell( Clazz_newFloatArray(-1, [0, 0, 0, 0, 0, 0, va.x, va.y, va.z, vb.x, vb.y, vb.z, vc.x, vc.y, vc.z, 0, 0, 0, 0, 0, 0, NaN, NaN, NaN, NaN, NaN, slop]), null, null);
var name = oabc == null || supercell == null ? "P1" : "cell=" + supercell;
this.setAtomSetSpaceGroupName(name);
this.symmetry.setSpaceGroupName(name);
this.symmetry.setSpaceGroup(this.doNormalize);
this.symmetry.addSpaceGroupOperation("x,y,z", 0);
if (pt0 != null && pt0.length() == 0) pt0 = null;
if (pt0 != null) this.symmetry.toFractional(pt0, true);
for (var i = iAtomFirst; i < atomCount; i++) {
this.symmetry.toFractional(atoms[i], true);
if (pt0 != null) atoms[i].sub(pt0);
}
this.asc.haveAnisou = false;
this.asc.setCurrentModelInfo("matUnitCellOrientation", null);
}, "~S,JU.BS,~N,~A,JU.P3,~A,~N");
Clazz_defineMethod(c$, "applySymmetryLattice", 
function(){
if (!this.asc.coordinatesAreFractional || this.symmetry.getSpaceGroup() == null) return;
var maxX = this.latticeCells[0];
var maxY = this.latticeCells[1];
var maxZ = Math.abs(this.latticeCells[2]);
var kcode = this.latticeCells[3];
this.firstAtom = this.asc.getLastAtomSetAtomIndex();
var bsAtoms = this.asc.bsAtoms;
if (bsAtoms != null) {
this.updateBSAtoms();
this.firstAtom = bsAtoms.nextSetBit(this.firstAtom);
}this.rmin = JU.P3.new3(3.4028235E38, 3.4028235E38, 3.4028235E38);
this.rmax = JU.P3.new3(-3.4028235E38, -3.4028235E38, -3.4028235E38);
if (this.acr.latticeType == null) this.acr.latticeType = "" + this.symmetry.getLatticeType();
if (this.acr.isPrimitive) {
this.asc.setCurrentModelInfo("isprimitive", Boolean.TRUE);
if (!"P".equals(this.acr.latticeType) || this.acr.primitiveToCrystal != null) {
this.asc.setCurrentModelInfo("unitcell_conventional", this.symmetry.getConventionalUnitCell(this.acr.latticeType, this.acr.primitiveToCrystal));
}}this.setUnitCellSafely();
this.asc.setCurrentModelInfo("f2c", this.symmetry.getUnitCellF2C());
var s = this.symmetry.getSpaceGroupTitle();
if (s.indexOf("--") < 0) this.asc.setCurrentModelInfo("f2cTitle", s);
this.asc.setCurrentModelInfo("f2cParams", this.symmetry.getUnitCellParams());
if (this.acr.latticeType != null) {
this.asc.setCurrentModelInfo("latticeType", this.acr.latticeType);
if ((typeof(this.acr.fillRange)=='string')) {
var range = this.setLatticeRange(this.acr.latticeType, this.acr.fillRange);
if (range == null) {
this.acr.appendLoadNote(this.acr.fillRange + " symmetry could not be implemented");
this.acr.fillRange = null;
} else {
this.acr.fillRange = range;
}}}this.baseSymmetry = this.symmetry;
if (this.acr.fillRange != null) {
this.setMinMax(this.ndims, kcode, maxX, maxY, maxZ);
this.applyRangeSymmetry(bsAtoms);
return;
}var oabc = null;
var slop = 1e-6;
this.baseSymmetry.nSpins = 0;
var supercell = this.acr.strSupercell;
var isSuper = (supercell != null && supercell.indexOf(",") >= 0);
var matSuper = null;
var pt0 = null;
var vabc =  new Array(3);
if (isSuper) {
matSuper =  new JU.M4();
if (this.mident == null) this.mident =  new JU.M4();
this.setUnitCellSafely();
oabc = this.symmetry.getV0abc(supercell, matSuper);
matSuper.transpose33();
if (oabc != null && !matSuper.equals(this.mident)) {
this.setMinMax(this.ndims, kcode, maxX, maxY, maxZ);
pt0 = JU.P3.newP(oabc[0]);
vabc[0] = JU.V3.newV(oabc[1]);
vabc[1] = JU.V3.newV(oabc[2]);
vabc[2] = JU.V3.newV(oabc[3]);
this.adjustRangeMinMax(oabc);
}}var iAtomFirst = this.asc.getLastAtomSetAtomIndex();
if (bsAtoms != null) iAtomFirst = bsAtoms.nextSetBit(iAtomFirst);
if (this.rmin.x == 3.4028235E38) {
supercell = null;
oabc = null;
} else {
bsAtoms = this.updateBSAtoms();
slop = this.symmetry.getPrecision();
this.applySuperSymmetry(supercell, bsAtoms, iAtomFirst, oabc, pt0, vabc, slop);
}this.setMinMax(this.ndims, kcode, maxX, maxY, maxZ);
if (oabc == null) {
this.applyAllSymmetry(this.acr.ms, bsAtoms);
if (!this.acr.noPack && (!this.applySymmetryToBonds || !this.acr.doPackUnitCell)) {
return;
}this.setMinMax(this.ndims, kcode, maxX, maxY, maxZ);
}if (this.acr.forcePacked || this.acr.doPackUnitCell || this.acr.noPack) {
this.trimToUnitCell(iAtomFirst);
}this.updateSupercellAtomSites(matSuper, bsAtoms, slop);
});
Clazz_defineMethod(c$, "duplicateAtomProperties", 
function(nTimes){
var p = this.asc.getAtomSetAuxiliaryInfoValue(-1, "atomProperties");
if (p != null) for (var entry, $entry = p.entrySet().iterator (); $entry.hasNext()&& ((entry = $entry.next ()) || true);) {
var key = entry.getKey();
var val = entry.getValue();
if ((typeof(val)=='string')) {
var data = val;
var s =  new JU.SB();
for (var i = nTimes; --i >= 0; ) s.append(data);

p.put(key, s.toString());
} else {
var f = val;
var fnew =  Clazz_newFloatArray (f.length * nTimes, 0);
for (var i = nTimes; --i >= 0; ) System.arraycopy(f, 0, fnew, i * f.length, f.length);

}}
}, "~N");
Clazz_defineMethod(c$, "finalizeSymmetry", 
function(symmetry){
var name = this.asc.getAtomSetAuxiliaryInfoValue(-1, "spaceGroup");
symmetry.setFinalOperations(this.ndims, name, this.asc.atoms, this.firstAtom, this.noSymmetryCount, this.doNormalize, this.filterSymop);
if (this.filterSymop != null || name == null || name.equals("unspecified!")) {
this.setAtomSetSpaceGroupName(symmetry.getUnitCellDisplayName());
}if (this.unitCellParams != null || Float.isNaN(this.acr.unitCellParams[0])) return;
if (symmetry.fixUnitCell(this.acr.unitCellParams)) {
this.acr.appendLoadNote("Unit cell parameters were adjusted to match space group!");
}this.setUnitCellSafely();
}, "J.adapter.smarter.XtalSymmetry.FileSymmetry");
c$.removePacking = Clazz_defineMethod(c$, "removePacking", 
function(ndims, pt, minX, maxX, minY, maxY, minZ, maxZ, slop){
return (pt.x > minX - slop && pt.x < maxX - slop && (ndims < 2 || pt.y > minY - slop && pt.y < maxY - slop) && (ndims < 3 || pt.z > minZ - slop && pt.z < maxZ - slop));
}, "~N,JU.P3,~N,~N,~N,~N,~N,~N,~N");
Clazz_defineMethod(c$, "reset", 
function(){
this.asc.coordinatesAreFractional = false;
this.asc.setCurrentModelInfo("hasSymmetry", Boolean.TRUE);
this.asc.setGlobalBoolean(1);
});
Clazz_defineMethod(c$, "setAtomSetSpaceGroupName", 
function(spaceGroupName){
this.symmetry.setSpaceGroupName(spaceGroupName);
var s = spaceGroupName + "";
this.asc.setCurrentModelInfo("f2cTitle", s);
this.asc.setCurrentModelInfo("spaceGroup", s);
}, "~S");
Clazz_defineMethod(c$, "setCurrentModelInfo", 
function(n, sym, unitCells){
if (sym == null) {
this.asc.setCurrentModelInfo("presymmetryAtomCount", Integer.$valueOf(this.noSymmetryCount));
this.asc.setCurrentModelInfo("biosymmetryCount", Integer.$valueOf(n));
this.asc.setCurrentModelInfo("bioSymmetry", this.symmetry);
} else {
this.asc.setCurrentModelInfo("fileSymmetry", this.symmetry);
this.asc.setCurrentModelInfo("presymmetryAtomCount", Integer.$valueOf(n));
this.asc.setCurrentModelInfo("latticeDesignation", sym.getLatticeDesignation());
this.asc.setCurrentModelInfo("ML_unitCellRange", unitCells);
if (this.acr.isSUPERCELL) this.asc.setCurrentModelInfo("supercell", this.acr.strSupercell);
}this.asc.setCurrentModelInfo("presymmetryAtomIndex", Integer.$valueOf(this.firstAtom));
var operationCount = this.symmetry.getSpaceGroupOperationCount();
if (operationCount > 0) {
this.asc.setCurrentModelInfo("symmetryOperations", this.symmetry.getSymopList(this.doNormalize));
this.asc.setCurrentModelInfo("symOpsTemp", this.symmetry.getSymmetryOperations());
}this.asc.setCurrentModelInfo("symmetryCount", Integer.$valueOf(operationCount));
this.asc.setCurrentModelInfo("latticeType", this.acr.latticeType == null ? "P" : this.acr.latticeType);
this.asc.setCurrentModelInfo("intlTableNo", this.symmetry.getIntTableNumber());
this.asc.setCurrentModelInfo("intlTableIndex", this.symmetry.getSpaceGroupInfoObj("itaIndex", null, false, false));
this.asc.setCurrentModelInfo("intlTableTransform", this.symmetry.getSpaceGroupInfoObj("itaTransform", null, false, false));
this.asc.setCurrentModelInfo("intlTableJmolId", this.symmetry.getSpaceGroupJmolId());
this.asc.setCurrentModelInfo("spaceGroupIndex", Integer.$valueOf(this.symmetry.getSpaceGroupIndex()));
this.asc.setCurrentModelInfo("spaceGroupTitle", this.symmetry.getSpaceGroupTitle());
if (this.acr.sgName == null || this.acr.sgName.indexOf("?") >= 0 || this.acr.sgName.indexOf("!") >= 0) this.setAtomSetSpaceGroupName(this.acr.sgName = this.symmetry.getSpaceGroupName());
}, "~N,J.adapter.smarter.XtalSymmetry.FileSymmetry,~A");
Clazz_defineMethod(c$, "setCurrentModelUCInfo", 
function(unitCellParams, unitCellOffset, matUnitCellOrientation){
if (unitCellParams != null) this.asc.setCurrentModelInfo("unitCellParams", unitCellParams);
if (unitCellOffset != null) this.asc.setCurrentModelInfo("unitCellOffset", unitCellOffset);
if (matUnitCellOrientation != null) this.asc.setCurrentModelInfo("matUnitCellOrientation", matUnitCellOrientation);
}, "~A,JU.P3,JU.M3");
Clazz_defineMethod(c$, "setLatticeCells", 
function(){
this.latticeCells = this.acr.latticeCells;
var isLatticeRange = (this.latticeCells[0] <= 555 && this.latticeCells[1] >= 555 && (this.latticeCells[2] == 0 || this.latticeCells[2] == 1 || this.latticeCells[2] == -1));
this.doNormalize = this.latticeCells[0] != 0 && (!isLatticeRange || this.latticeCells[2] == 1);
this.applySymmetryToBonds = this.acr.applySymmetryToBonds;
this.doPackUnitCell = this.acr.doPackUnitCell && !this.applySymmetryToBonds;
this.doCentroidUnitCell = this.acr.doCentroidUnitCell;
this.centroidPacked = this.acr.centroidPacked;
this.filterSymop = this.acr.filterSymop;
});
Clazz_defineMethod(c$, "setLatticeRange", 
function(latticetype, rangeType){
var range = null;
var isRhombohedral = "R".equals(latticetype);
if (rangeType.equals("conventional")) {
range = this.symmetry.getConventionalUnitCell(latticetype, this.acr.primitiveToCrystal);
} else if (rangeType.equals("primitive")) {
range = this.symmetry.getUnitCellVectors();
this.symmetry.toFromPrimitive(true, latticetype.charAt(0), range, this.acr.primitiveToCrystal);
} else if (isRhombohedral && rangeType.equals("rhombohedral")) {
if (this.symmetry.getUnitCellInfoType(8) == 1) {
rangeType = "2/3a+1/3b+1/3c,-1/3a+1/3b+1/3c,-1/3a-2/3b+1/3c";
} else {
rangeType = null;
}} else if (isRhombohedral && rangeType.equals("trigonal")) {
if (this.symmetry.getUnitCellInfoType(9) == 1) {
rangeType = "a-b,b-c,a+b+c";
} else {
rangeType = null;
}} else if (rangeType.equals("spin")) {
rangeType = this.getBaseSymmetry().spinFrameStr;
} else if (rangeType.startsWith("unitcell_")) {
rangeType = this.asc.getAtomSetAuxiliaryInfoValue(-1, rangeType);
} else if (rangeType.indexOf(",") < 0 || rangeType.indexOf("a") < 0 || rangeType.indexOf("b") < 0 || rangeType.indexOf("c") < 0) {
rangeType = null;
}if (rangeType != null && range == null && (range = this.symmetry.getV0abc(rangeType, null)) == null) {
rangeType = null;
}if (rangeType == null) return null;
this.acr.addJmolScript("unitcell " + JU.PT.esc(rangeType));
return range;
}, "~S,~S");
Clazz_defineMethod(c$, "setMinMax", 
function(dim, kcode, maxX, maxY, maxZ){
this.minXYZ =  new JU.P3i();
this.maxXYZ = JU.P3i.new3(maxX, maxY, maxZ);
JU.SimpleUnitCell.setMinMaxLatticeParameters(dim, this.minXYZ, this.maxXYZ, kcode);
}, "~N,~N,~N,~N,~N");
Clazz_defineMethod(c$, "setUnitCell", 
function(info, matUnitCellOrientation, unitCellOffset){
this.unitCellParams =  Clazz_newFloatArray (info.length, 0);
for (var i = 0; i < info.length; i++) this.unitCellParams[i] = info[i];

this.asc.haveUnitCell = true;
if (this.asc.isTrajectory) {
if (this.trajectoryUnitCells == null) {
this.trajectoryUnitCells =  new JU.Lst();
this.asc.setInfo("unitCells", this.trajectoryUnitCells);
}this.trajectoryUnitCells.addLast(this.unitCellParams);
}this.asc.setGlobalBoolean(2);
this.getSymmetry().setUnitCellFromParams(this.unitCellParams, false, this.acr.cellSlop);
if (unitCellOffset != null) this.symmetry.setOffsetPt(unitCellOffset);
if (matUnitCellOrientation != null) this.symmetry.initializeOrientation(matUnitCellOrientation);
this.setCurrentModelUCInfo(this.unitCellParams, unitCellOffset, matUnitCellOrientation);
}, "~A,JU.M3,JU.P3");
Clazz_defineMethod(c$, "setUnitCellSafely", 
function(){
if (this.unitCellParams == null) this.setUnitCell(this.acr.unitCellParams, this.acr.matUnitCellOrientation, this.acr.unitCellOffset);
});
Clazz_defineMethod(c$, "symmetryAddAtoms", 
function(transX, transY, transZ, baseCount, pt, iCellOpPt, cartesians, ms, excludedOps, atomMap){
var isBaseCell = (baseCount == 0);
var addBonds = (atomMap != null);
if (this.doPackUnitCell) this.ptOffset.set(transX, transY, transZ);
var range2 = this.symmetryRange * this.symmetryRange;
var checkRangeNoSymmetry = (this.symmetryRange < 0);
var checkRange111 = (this.symmetryRange > 0);
var checkSymmetryMinMax = (isBaseCell && checkRange111);
checkRange111 = new Boolean (checkRange111 & !isBaseCell).valueOf();
var nOp = this.symmetry.getSpaceGroupOperationCount();
var lstNCS = this.acr.lstNCS;
var nNCS = (lstNCS == null ? 0 : lstNCS.size());
var nOperations = nOp + nNCS;
nNCS = Clazz_doubleToInt(nNCS / nOp);
var checkNearAtoms = (this.checkNearAtoms && (nOperations > 1 || this.doPackUnitCell));
var checkSymmetryRange = (checkRangeNoSymmetry || checkRange111);
var checkDistances = (checkNearAtoms || checkSymmetryRange);
var checkOps = (excludedOps != null);
var addCartesian = (checkNearAtoms || checkSymmetryMinMax);
var bsAtoms = (this.acr.isMolecular ? null : this.asc.bsAtoms);
var sym = this.symmetry;
if (checkRangeNoSymmetry) baseCount = this.noSymmetryCount;
var atomMax = this.firstAtom + this.noSymmetryCount;
var bondAtomMin = (this.asc.firstAtomToBond < 0 ? atomMax : this.asc.firstAtomToBond);
var pttemp =  new JU.P3();
var code = null;
var minCartDist2 = (checkOps ? 0.01 : 1.0E-4);
var subSystemId = '\u0000';
var j00 = (bsAtoms == null ? this.firstAtom : bsAtoms.nextSetBit(this.firstAtom));
out : for (var iSym = 0; iSym < nOperations; iSym++) {
if (isBaseCell && iSym == 0 || this.crystalReaderLatticeOpsOnly && iSym > 0 && (iSym % this.latticeOp) != 0 || excludedOps != null && excludedOps.get(iSym)) continue;
var pt0 = this.firstAtom + (checkNearAtoms ? pt : checkRange111 ? baseCount : 0);
var timeReversal = (iSym >= nOp ? 0 : this.asc.vibScale == 0 ? sym.getSpinOp(iSym) : this.asc.vibScale);
var i0 = Math.max(this.firstAtom, (bsAtoms == null ? 0 : bsAtoms.nextSetBit(0)));
var checkDistance = checkDistances;
var spt = (iSym >= nOp ? Clazz_doubleToInt((iSym - nOp) / nNCS) : iSym);
var cpt = spt + iCellOpPt;
for (var i = i0; i < atomMax; i++) {
var a = this.asc.atoms[i];
if (bsAtoms != null && !bsAtoms.get(i)) continue;
if (ms == null) {
sym.newSpaceGroupPoint(a, iSym, (iSym >= nOp ? lstNCS.get(iSym - nOp) : null), transX, transY, transZ, pttemp);
} else {
sym = ms.getAtomSymmetry(a, this.symmetry);
sym.newSpaceGroupPoint(a, iSym, null, transX, transY, transZ, pttemp);
code = sym.getSpaceGroupOperationCode(iSym);
if (code != null) {
subSystemId = code.charAt(0);
sym = ms.getSymmetryFromCode(code);
if (sym.getSpaceGroupOperationCount() == 0) this.finalizeSymmetry(sym);
}}this.acr.fixFloatPt(pttemp, 100000.0);
var c = JU.P3.newP(pttemp);
sym.toCartesian(c, false);
if (this.doPackUnitCell) {
sym.toUnitCellRnd(c, this.ptOffset);
pttemp.setT(c);
sym.toFractional(pttemp, false);
this.acr.fixFloatPt(pttemp, 100000.0);
if (!J.adapter.smarter.XtalSymmetry.isWithinSupercell(this.ndims, pttemp, this.minXYZ0.x, this.maxXYZ0.x, this.minXYZ0.y, this.maxXYZ0.y, this.minXYZ0.z, this.maxXYZ0.z, this.packingRange)) {
continue;
}}if (checkSymmetryMinMax) JS.UnitCell.setSymmetryMinMax(c, this.rmin, this.rmax);
var special = null;
if (checkDistance) {
if (checkSymmetryRange && (c.x < this.rmin.x || c.y < this.rmin.y || c.z < this.rmin.z || c.x > this.rmax.x || c.y > this.rmax.y || c.z > this.rmax.z)) continue;
var minDist2 = 3.4028235E38;
var j0 = (this.checkAll ? this.asc.ac : pt0);
var name = a.atomName;
var id = (code == null ? a.altLoc : subSystemId);
for (var j = j00; j < j0; j++) {
if (bsAtoms != null && !bsAtoms.get(j)) continue;
var pc = cartesians[j - this.firstAtom];
if (pc == null) continue;
var d2 = c.distanceSquared(pc);
if (checkNearAtoms && d2 < minCartDist2) {
if (checkOps) {
excludedOps.set(iSym);
continue out;
}special = this.asc.atoms[j];
if ((special.atomName == null || special.atomName.equals(name)) && special.altLoc == id) break;
special = null;
}if (checkRange111 && j < baseCount && d2 < minDist2) minDist2 = d2;
}
if (checkRange111 && minDist2 > range2) continue;
}if (checkOps) {
checkDistance = false;
}var atomSite = a.atomSite;
if (special != null) {
if (addBonds) atomMap[atomSite] = special.index;
special.bsSymmetry.set(cpt);
special.bsSymmetry.set(spt);
} else {
if (addBonds) atomMap[atomSite] = this.asc.ac;
var atom1 = a.copyTo(pttemp, this.asc);
if (this.asc.bsAtoms != null) this.asc.bsAtoms.set(atom1.index);
if (timeReversal != 0 && atom1.vib != null) {
(sym.getSpaceGroupOperation(iSym)).rotateSpin(atom1.vib);
}if (atom1.part < 0) {
var key = Integer.$valueOf(iSym * 1000 + 500 + atom1.part);
if (this.disorderMap == null) this.disorderMap =  new java.util.Hashtable();
var ch = this.disorderMap.get(key);
if (ch == null) {
var ia = Integer.$valueOf(atom1.part);
var isNew = (this.disorderMap.get(ia) == null);
if (this.disorderMapMax == 0 || this.disorderMapMax == 122) {
this.disorderMapMax = 64;
} else if (this.disorderMapMax == 90) {
this.disorderMapMax = 96;
}ch =  new Character(isNew ? atom1.altLoc : String.fromCharCode(++this.disorderMapMax));
this.disorderMap.put(key, ch);
if (isNew) this.disorderMap.put(ia, ch);
}atom1.altLoc = ch.charValue();
}atom1.atomSite = atomSite;
if (code != null) atom1.altLoc = subSystemId;
atom1.bsSymmetry = JU.BSUtil.newAndSetBit(cpt);
atom1.bsSymmetry.set(spt);
if (addCartesian) cartesians[pt++] = c;
var tensors = a.tensors;
if (tensors != null) {
atom1.tensors = null;
for (var j = tensors.size(); --j >= 0; ) {
var t = tensors.get(j);
if (t == null) continue;
if (nOp == 1) atom1.addTensor(t.copyTensor(), null, false);
 else this.addRotatedTensor(atom1, t, iSym, false, sym);
}
}}}
if (addBonds) {
var bonds = this.asc.bonds;
var atoms = this.asc.atoms;
var key;
for (var bondNum = this.asc.bondIndex0; bondNum < this.bondCount0; bondNum++) {
var bond = bonds[bondNum];
var atom1 = atoms[bond.atomIndex1];
var atom2 = atoms[bond.atomIndex2];
if (atom1 == null || atom2 == null || atom2.atomSetIndex < atom1.atomSetIndex) continue;
var ia1 = atomMap[atom1.atomSite];
var ia2 = atomMap[atom2.atomSite];
if (ia1 > ia2) {
var i = ia1;
ia1 = ia2;
ia2 = i;
}if ((ia1 != ia2 && (ia1 >= bondAtomMin || ia2 >= bondAtomMin)) && this.bondsFound.indexOf(key = "-" + ia1 + "," + ia2) < 0) {
this.bondsFound.append(key);
this.asc.addNewBondWithOrder(ia1, ia2, bond.order);
}}
}}
return pt;
}, "~N,~N,~N,~N,~N,~N,~A,J.adapter.smarter.MSInterface,JU.BS,~A");
Clazz_defineMethod(c$, "setPartProperty", 
function(){
for (var iset = this.asc.atomSetCount; --iset >= 0; ) {
var parts =  Clazz_newFloatArray (this.asc.getAtomSetAtomCount(iset), 0);
for (var i = 0, ia = this.asc.getAtomSetAtomIndex(iset), n = parts.length; i < n; i++) {
var a = this.asc.atoms[ia++];
parts[i] = a.part;
}
this.asc.setAtomProperties("part", parts, iset, false);
}
});
Clazz_defineMethod(c$, "trimToUnitCell", 
function(iAtomFirst){
var atoms = this.asc.atoms;
var bs = this.updateBSAtoms();
if (this.acr.noPack) {
for (var i = bs.nextSetBit(iAtomFirst); i >= 0; i = bs.nextSetBit(i + 1)) {
if (!J.adapter.smarter.XtalSymmetry.removePacking(this.ndims, atoms[i], this.minXYZ.x, this.maxXYZ.x, this.minXYZ.y, this.maxXYZ.y, this.minXYZ.z, this.maxXYZ.z, this.packingRange)) bs.clear(i);
}
} else {
for (var i = bs.nextSetBit(iAtomFirst); i >= 0; i = bs.nextSetBit(i + 1)) {
if (!J.adapter.smarter.XtalSymmetry.isWithinSupercell(this.ndims, atoms[i], this.minXYZ.x, this.maxXYZ.x, this.minXYZ.y, this.maxXYZ.y, this.minXYZ.z, this.maxXYZ.z, this.packingRange)) bs.clear(i);
}
}}, "~N");
Clazz_defineMethod(c$, "updateBSAtoms", 
function(){
var bs = this.asc.bsAtoms;
if (bs == null) bs = this.asc.bsAtoms = JU.BSUtil.newBitSet2(0, this.asc.ac);
if (bs.nextSetBit(this.firstAtom) < 0) bs.setBits(this.firstAtom, this.asc.ac);
return bs;
});
Clazz_defineMethod(c$, "updateSupercellAtomSites", 
function(matSuper, bsAtoms, slop){
var n = bsAtoms.cardinality();
var baseAtoms =  new Array(n);
var nbase = 0;
var slop2 = slop * slop;
for (var i = bsAtoms.nextSetBit(0); i >= 0; i = bsAtoms.nextSetBit(i + 1)) {
var a = this.asc.atoms[i];
var p =  new J.adapter.smarter.Atom();
p.setT(a);
if (matSuper != null) {
matSuper.rotTrans(p);
JU.SimpleUnitCell.unitizeDimRnd(3, p, slop);
}p.atomSerial = a.atomSite;
p.atomSite = a.atomSite;
this.symmetry.unitize(p);
var found = false;
for (var ib = 0; ib < nbase; ib++) {
var b = baseAtoms[ib];
if (p.atomSerial == b.atomSerial && p.distanceSquared(b) < slop2) {
found = true;
a.atomSite = b.atomSite;
break;
}}
if (!found) {
a.atomSite = p.atomSite = nbase;
baseAtoms[nbase++] = p;
}}
}, "JU.M4,JU.BS,~N");
Clazz_defineMethod(c$, "newFileSymmetry", 
function(){
return  new J.adapter.smarter.XtalSymmetry.FileSymmetry();
});
})();
});
;//5.0.1-v7 Wed Mar 25 10:37:51 CDT 2026
Clazz_declarePackage("JS");
Clazz_load(["J.api.SymmetryInterface"], "JS.Symmetry", ["java.util.Hashtable", "JU.AU", "$.BS", "$.JSJSONParser", "$.Lst", "$.M4", "$.P3", "$.PT", "$.Quat", "$.Rdr", "$.SB", "J.api.Interface", "J.bspt.Bspt", "JS.PointGroup", "$.SpaceGroup", "$.SymmetryInfo", "$.SymmetryOperation", "$.UnitCell", "JU.BSUtil", "$.Escape", "$.Logger", "$.SimpleUnitCell", "JV.FileManager"], function(){
var c$ = Clazz_decorateAsClass(function(){
this.spaceGroup = null;
this.unitCell = null;
this.$isBio = false;
this.id = null;
this.vwr = null;
this.spinSym = null;
this.pointGroup = null;
this.cip = null;
this.symmetryInfo = null;
this.desc = null;
this.transformMatrix = null;
this.spinFrameToCartXYZ = null;
Clazz_instantialize(this, arguments);}, JS, "Symmetry", null, J.api.SymmetryInterface);
;(function(){
var c$ = Clazz_decorateAsClass(function(){
Clazz_prepareCallback(this, arguments);
this.operator = null;
this.drawID = null;
this.drawStr = null;
this.isTrivial = false;
this.typeName = null;
this.type = 0;
Clazz_instantialize(this, arguments);}, JS.PointGroup, "Operation", null);
Clazz_makeConstructor(c$, 
function(o){
this.operator = o;
this.type = (o == null ? 3 : o.type);
this.typeName = (o == null ? "Ci" : o.schName);
this.isTrivial = this.checkTrivial();
}, "JS.PointGroup.Operator");
Clazz_defineMethod(c$, "checkTrivial", 
function(){
var tol = this.b$["JS.PointGroup"].distanceTolerance;
for (var i = this.b$["JS.PointGroup"].points.length; --i >= 0; ) {
var d;
switch (this.type) {
case 0:
case 2:
case 1:
d = this.operator.distance(this.b$["JS.PointGroup"].points[i]);
break;
default:
case 3:
d = this.b$["JS.PointGroup"].points[i].length();
break;
}
if (d > tol) {
return false;
}}
System.out.println(this + " is trivial");
return true;
});
Clazz_overrideMethod(c$, "toString", 
function(){
return "[op " + this.typeName + " " + this.drawID + " " + this.isTrivial + "]";
});
;(function(){
var c$ = Clazz_decorateAsClass(function(){
Clazz_prepareCallback(this, arguments);
this.type = 0;
this.index = 0;
this.normalOrAxis = null;
this.mat = null;
this.order = 0;
this.axisArrayIndex = 0;
this.schName = null;
this.uvws = null;
this.uniqueMats = null;
this.mats = null;
this.operation = null;
this.uniqueUVWs = null;
Clazz_instantialize(this, arguments);}, JS.PointGroup, "Operator", null);
Clazz_makeConstructor(c$, 
function(index, v, arrayIndex){
this.index = index;
if (v == null) {
this.type = 3;
this.axisArrayIndex = 1;
this.order = 2;
this.schName = "Ci";
this.mat = JS.PointGroup.mInv;
} else {
this.normalOrAxis = JU.Quat.newVA(v, 180).getNormal();
if (arrayIndex == -1) {
this.type = 0;
this.axisArrayIndex = 0;
this.order = 2;
this.schName = "Cs";
} else {
this.type = (arrayIndex < 20 ? 2 : 1);
this.axisArrayIndex = arrayIndex;
this.order = arrayIndex % 20;
this.schName = (this.type == 2 ? "S" : "C") + this.order;
}}if (JU.Logger.debugging) JU.Logger.debug("new operation -- " + index + " " + this.schName + (this.normalOrAxis == null ? "" : " " + this.normalOrAxis));
}, "~N,JU.V3,~N");
Clazz_defineMethod(c$, "getM3", 
function(){
if (this.mat != null) return this.mat;
var m = JU.M3.newM3(JS.PointGroup.getQuaternion(this.normalOrAxis, this.axisArrayIndex).getMatrix());
if (this.type == 0 || this.type == 2) m.mul(JS.PointGroup.mInv);
this.cleanMatrix(m);
return this.mat = m;
});
Clazz_defineMethod(c$, "distance", 
function(pt){
var p = JU.P3.newP(pt);
this.getM3().rotate(p);
return p.distance(pt);
}, "JU.T3");
Clazz_defineMethod(c$, "cleanMatrix", 
function(m){
for (var i = 0; i < 3; i++) for (var j = 0; j < 3; j++) m.setElement(i, j, this.approx0(m.getElement(i, j)));


}, "JU.M3");
Clazz_defineMethod(c$, "approx0", 
function(v){
return (v > 1e-15 || v < -1.0E-15 ? v : 0);
}, "~N");
Clazz_defineMethod(c$, "getMatrices", 
function(uniqueOnly){
if (uniqueOnly && this.uniqueMats != null) return this.uniqueMats;
if (!uniqueOnly && this.mats != null) return this.mats;
var matrices =  new JU.Lst();
var m =  new JU.M3();
m.m00 = m.m11 = m.m22 = 1;
var bs = (uniqueOnly ? JS.PointGroup.getUniqueFractions(this.order) : null);
for (var i = 1; i < this.order; i++) {
m.mul(this.getM3());
if (!uniqueOnly || bs.get(i)) matrices.addLast(JU.M3.newM3(m));
}
if (uniqueOnly) this.uniqueMats = matrices;
 else this.mats = matrices;
return matrices;
}, "~B");
Clazz_overrideMethod(c$, "toString", 
function(){
return this.schName + " " + this.normalOrAxis;
});
Clazz_defineMethod(c$, "setInfo", 
function(vinfo, minfo, e){
if (vinfo != null) {
vinfo.addLast(this.normalOrAxis);
minfo.addLast(this.getM3());
}e.put("order", Integer.$valueOf(this.order));
e.put("typeSch", this.schName);
e.put("typeHM", JS.PointGroup.getHMfromSFName(this.schName));
if (this.normalOrAxis != null) e.put("direction", this.normalOrAxis);
var mats = this.getMatrices(true);
e.put("uniqueOperations", mats);
e.put("uniqueOperationUVWs", this.getUVWs(mats, true));
if (mats.size() != this.order - 1) e.put("matrixIndices", JS.PointGroup.bsUnique.get(Integer.$valueOf(this.order)));
mats = this.getMatrices(false);
e.put("operations", mats);
e.put("operationUVWs", this.getUVWs(mats, false));
}, "JU.Lst,JU.Lst,java.util.Map");
Clazz_defineMethod(c$, "getUVWs", 
function(mats, isUnique){
var uvws = (isUnique ? this.uniqueUVWs : this.uvws);
if (uvws != null) return uvws;
var list =  new JU.Lst();
for (var i = 0; i < mats.size(); i++) {
list.addLast(JS.SymmetryOperation.staticConvertOperation(null, mats.get(i), "uvw"));
}
if (isUnique) this.uniqueUVWs = list;
 else uvws = list;
return list;
}, "JU.Lst,~B");
Clazz_defineMethod(c$, "isUVW", 
function(uvw){
var uvws = this.getUVWs(this.getMatrices(true), true);
for (var i = 0, n = uvws.size(); i < n; i++) {
if (uvws.get(i).equals(uvw)) return true;
}
return false;
}, "~S");
;(function(){
var c$ = Clazz_decorateAsClass(function(){
this.a = 0;
this.b = 0;
this.c = 0;
this.alpha = 0;
this.beta = 0;
this.gamma = 0;
this.acsame = false;
Clazz_instantialize(this, arguments);}, JS.SpaceGroup, "ParamCheck", null);
Clazz_makeConstructor(c$, 
function(params, allowSame, checkC){
this.a = params[0];
this.b = params[1];
this.c = params[2];
this.alpha = params[3];
this.beta = params[4];
this.gamma = params[5];
if (!allowSame) this.checkParams(checkC);
}, "~A,~B,~B");
Clazz_defineMethod(c$, "checkParams", 
function(checkC){
if (this.b > 0 && this.a > this.b) {
var d = this.a;
this.a = this.b;
this.b = d;
}var bcsame = checkC && this.c > 0 && JU.SimpleUnitCell.approx0(this.b - this.c);
if (bcsame) this.c = this.b * 1.5;
var absame = JU.SimpleUnitCell.approx0(this.a - this.b);
if (absame) this.b = this.a * 1.2;
if (JU.SimpleUnitCell.approx0(this.gamma - 90)) {
this.gamma = 130;
}if (!checkC) return;
this.acsame = this.c > 0 && JU.SimpleUnitCell.approx0(this.c - this.a);
if (this.acsame) this.c = this.a * 1.1;
if (JU.SimpleUnitCell.approx0(this.alpha - 90)) {
this.alpha = 80;
}if (JU.SimpleUnitCell.approx0(this.beta - 90)) {
this.beta = 100;
}if (this.alpha > this.beta) {
var d = this.alpha;
this.alpha = this.beta;
this.beta = d;
}var albesame = JU.SimpleUnitCell.approx0(this.alpha - this.beta);
var begasame = JU.SimpleUnitCell.approx0(this.beta - this.gamma);
var algasame = JU.SimpleUnitCell.approx0(this.gamma - this.alpha);
if (albesame) {
this.beta = this.alpha * 1.2;
}if (begasame) {
this.gamma = this.beta * 1.3;
}if (algasame) {
this.gamma = this.alpha * 1.4;
}}, "~B");
Clazz_defineMethod(c$, "checkNew", 
function(params, newParams){
var isNew = !(this.a == params[0] && this.b == params[1] && this.c == params[2] && this.alpha == params[3] && this.beta == params[4] && this.gamma == params[5]);
newParams[0] = this.a;
newParams[1] = this.b;
newParams[2] = this.c;
newParams[3] = this.alpha;
newParams[4] = this.beta;
newParams[5] = this.gamma;
return isNew;
}, "~A,~A");
;(function(){
var c$ = Clazz_decorateAsClass(function(){
Clazz_prepareCallback(this, arguments);
this.typeAndOcc = 0;
this.index = 0;
this.name = null;
Clazz_instantialize(this, arguments);}, JS.SpaceGroupFinder, "SGAtom", JU.P3);
Clazz_makeConstructor(c$, 
function(type, index, name, occupancy){
Clazz_superConstructor (this, JS.SpaceGroupFinder.SGAtom, []);
this.typeAndOcc = type + 1000 * occupancy;
this.index = index;
this.name = name;
}, "~N,~N,~S,~N");
;(function(){
var c$ = Clazz_declareAnonymous(JS, "SpaceGroupFinder$1", null, java.util.Comparator);
Clazz_overrideMethod(c$, "compare", 
function(sg1, sg2){
return (sg1.itaNo != sg2.itaNo ? sg1.itaNo - sg2.itaNo : sg2.setNo - sg1.setNo);
}, "JS.SpaceGroup,JS.SpaceGroup");
;(function(){
var c$ = Clazz_decorateAsClass(function(){
this.rotCode = null;
this.seitzMatrix = null;
this.seitzMatrixInv = null;
Clazz_instantialize(this, arguments);}, JS.HallInfo, "HallRotation", null);
Clazz_prepareFields (c$, function(){
this.seitzMatrix =  new JU.M4();
this.seitzMatrixInv =  new JU.M4();
});
Clazz_makeConstructor(c$, 
function(code, matrixData){
this.rotCode = code;
var data =  Clazz_newFloatArray (16, 0);
var dataInv =  Clazz_newFloatArray (16, 0);
data[15] = dataInv[15] = 1;
for (var i = 0, ipt = 0; ipt < 11; i++) {
var value = 0;
switch ((matrixData.charAt(i)).charCodeAt(0)) {
case 32:
ipt++;
continue;
case 43:
case 49:
value = 1;
break;
case 45:
value = -1;
break;
}
data[ipt] = value;
dataInv[ipt] = -value;
ipt++;
}
this.seitzMatrix.setA(data);
this.seitzMatrixInv.setA(dataInv);
}, "~S,~S");
c$.lookup = Clazz_defineMethod(c$, "lookup", 
function(code){
for (var i = JS.HallInfo.HallRotation.getHallTerms().length; --i >= 0; ) if (JS.HallInfo.HallRotation.hallRotationTerms[i].rotCode.equals(code)) return JS.HallInfo.HallRotation.hallRotationTerms[i];

return null;
}, "~S");
c$.getHallTerms = Clazz_defineMethod(c$, "getHallTerms", 
function(){
return (JS.HallInfo.HallRotation.hallRotationTerms == null ? JS.HallInfo.HallRotation.hallRotationTerms =  Clazz_newArray(-1, [ new JS.HallInfo.HallRotation("1_", "+00 0+0 00+"),  new JS.HallInfo.HallRotation("2x", "+00 0-0 00-"),  new JS.HallInfo.HallRotation("2y", "-00 0+0 00-"),  new JS.HallInfo.HallRotation("2z", "-00 0-0 00+"),  new JS.HallInfo.HallRotation("2'", "0-0 -00 00-"),  new JS.HallInfo.HallRotation("2\"", "0+0 +00 00-"),  new JS.HallInfo.HallRotation("2x'", "-00 00- 0-0"),  new JS.HallInfo.HallRotation("2x\"", "-00 00+ 0+0"),  new JS.HallInfo.HallRotation("2y'", "00- 0-0 -00"),  new JS.HallInfo.HallRotation("2y\"", "00+ 0-0 +00"),  new JS.HallInfo.HallRotation("2z'", "0-0 -00 00-"),  new JS.HallInfo.HallRotation("2z\"", "0+0 +00 00-"),  new JS.HallInfo.HallRotation("3x", "+00 00- 0+-"),  new JS.HallInfo.HallRotation("3y", "-0+ 0+0 -00"),  new JS.HallInfo.HallRotation("3z", "0-0 +-0 00+"),  new JS.HallInfo.HallRotation("3*", "00+ +00 0+0"),  new JS.HallInfo.HallRotation("4x", "+00 00- 0+0"),  new JS.HallInfo.HallRotation("4y", "00+ 0+0 -00"),  new JS.HallInfo.HallRotation("4z", "0-0 +00 00+"),  new JS.HallInfo.HallRotation("6x", "+00 0+- 0+0"),  new JS.HallInfo.HallRotation("6y", "00+ 0+0 -0+"),  new JS.HallInfo.HallRotation("6z", "+-0 +00 00+")]) : JS.HallInfo.HallRotation.hallRotationTerms);
});
c$.hallRotationTerms = null;
;(function(){
var c$ = Clazz_decorateAsClass(function(){
this.translationCode = '\0';
this.rotationOrder = 0;
this.rotationShift12ths = 0;
this.vectorShift12ths = null;
Clazz_instantialize(this, arguments);}, JS.HallInfo, "HallTranslation", null);
Clazz_makeConstructor(c$, 
function(translationCode, params){
this.translationCode = translationCode;
if (params != null) {
if (params.z >= 0) {
this.vectorShift12ths = params;
return;
}this.rotationOrder = params.x;
this.rotationShift12ths = params.y;
}this.vectorShift12ths =  new JU.P3i();
}, "~S,JU.P3i");
c$.getLatticeIndex = Clazz_defineMethod(c$, "getLatticeIndex", 
function(latt){
for (var i = 1, ipt = 3; i <= JS.HallInfo.HallTranslation.nLatticeTypes; i++, ipt += 3) if (JS.HallInfo.HallTranslation.latticeTranslationData[ipt].charAt(0) == latt) return i;

return 0;
}, "~S");
c$.getLatticeCode = Clazz_defineMethod(c$, "getLatticeCode", 
function(latt){
if (latt < 0) latt = -latt;
return (latt == 0 ? '\0' : latt > JS.HallInfo.HallTranslation.nLatticeTypes ? JS.HallInfo.HallTranslation.getLatticeCode(JS.HallInfo.HallTranslation.getLatticeIndex(String.fromCharCode(latt))) : JS.HallInfo.HallTranslation.latticeTranslationData[latt * 3].charAt(0));
}, "~N");
c$.getLatticeDesignation = Clazz_defineMethod(c$, "getLatticeDesignation", 
function(latt){
var isCentrosymmetric = (latt > 0);
var str = (isCentrosymmetric ? "-" : "");
if (latt < 0) latt = -latt;
if (latt == 0 || latt > JS.HallInfo.HallTranslation.nLatticeTypes) return "";
return str + JS.HallInfo.HallTranslation.getLatticeCode(latt) + ": " + (isCentrosymmetric ? "centrosymmetric " : "") + JS.HallInfo.HallTranslation.latticeTranslationData[latt * 3 + 1];
}, "~N");
c$.getLatticeDesignation2 = Clazz_defineMethod(c$, "getLatticeDesignation2", 
function(latticeCode, isCentrosymmetric){
var latt = JS.HallInfo.HallTranslation.getLatticeIndex(latticeCode);
if (!isCentrosymmetric) latt = -latt;
return JS.HallInfo.HallTranslation.getLatticeDesignation(latt);
}, "~S,~B");
c$.getLatticeExtension = Clazz_defineMethod(c$, "getLatticeExtension", 
function(latt, isCentrosymmetric){
for (var i = 1, ipt = 3; i <= JS.HallInfo.HallTranslation.nLatticeTypes; i++, ipt += 3) if (JS.HallInfo.HallTranslation.latticeTranslationData[ipt].charAt(0) == latt) return JS.HallInfo.HallTranslation.latticeTranslationData[ipt + 2] + (isCentrosymmetric ? " -1" : "");

return "";
}, "~S,~B");
c$.getHallTerms = Clazz_defineMethod(c$, "getHallTerms", 
function(){
return (JS.HallInfo.HallTranslation.hallTranslationTerms == null ? JS.HallInfo.HallTranslation.hallTranslationTerms =  Clazz_newArray(-1, [ new JS.HallInfo.HallTranslation('a', JU.P3i.new3(6, 0, 0)),  new JS.HallInfo.HallTranslation('b', JU.P3i.new3(0, 6, 0)),  new JS.HallInfo.HallTranslation('c', JU.P3i.new3(0, 0, 6)),  new JS.HallInfo.HallTranslation('n', JU.P3i.new3(6, 6, 6)),  new JS.HallInfo.HallTranslation('u', JU.P3i.new3(3, 0, 0)),  new JS.HallInfo.HallTranslation('v', JU.P3i.new3(0, 3, 0)),  new JS.HallInfo.HallTranslation('w', JU.P3i.new3(0, 0, 3)),  new JS.HallInfo.HallTranslation('d', JU.P3i.new3(3, 3, 3)),  new JS.HallInfo.HallTranslation('1', JU.P3i.new3(2, 6, -1)),  new JS.HallInfo.HallTranslation('1', JU.P3i.new3(3, 4, -1)),  new JS.HallInfo.HallTranslation('2', JU.P3i.new3(3, 8, -1)),  new JS.HallInfo.HallTranslation('1', JU.P3i.new3(4, 3, -1)),  new JS.HallInfo.HallTranslation('3', JU.P3i.new3(4, 9, -1)),  new JS.HallInfo.HallTranslation('1', JU.P3i.new3(6, 2, -1)),  new JS.HallInfo.HallTranslation('2', JU.P3i.new3(6, 4, -1)),  new JS.HallInfo.HallTranslation('4', JU.P3i.new3(6, 8, -1)),  new JS.HallInfo.HallTranslation('5', JU.P3i.new3(6, 10, -1)),  new JS.HallInfo.HallTranslation('r', JU.P3i.new3(4, 8, 8)),  new JS.HallInfo.HallTranslation('s', JU.P3i.new3(8, 8, 4)),  new JS.HallInfo.HallTranslation('t', JU.P3i.new3(8, 4, 8))]) : JS.HallInfo.HallTranslation.hallTranslationTerms);
});
c$.getHallTranslation = Clazz_defineMethod(c$, "getHallTranslation", 
function(translationCode, order){
var ht = null;
for (var i = JS.HallInfo.HallTranslation.getHallTerms().length; --i >= 0; ) {
var h = JS.HallInfo.HallTranslation.hallTranslationTerms[i];
if (h.translationCode == translationCode) {
if (h.rotationOrder == 0 || h.rotationOrder == order) {
ht =  new JS.HallInfo.HallTranslation(translationCode, null);
ht.translationCode = translationCode;
ht.rotationShift12ths = h.rotationShift12ths;
ht.vectorShift12ths = h.vectorShift12ths;
return ht;
}}}
return ht;
}, "~S,~N");
c$.latticeTranslationData =  Clazz_newArray(-1, ["\0", "unknown", "", "P", "primitive", "", "I", "body-centered", " 1n", "R", "rhombohedral", " 1r 1r", "F", "face-centered", " 1ab 1bc 1ac", "A", "A-centered", " 1bc", "B", "B-centered", " 1ac", "C", "C-centered", " 1ab", "S", "rhombohedral(S)", " 1s 1s", "T", "rhombohedral(T)", " 1t 1t"]);
c$.nLatticeTypes = Clazz_doubleToInt(JS.HallInfo.HallTranslation.latticeTranslationData.length / 3) - 1;
c$.hallTranslationTerms = null;
;(function(){
var c$ = Clazz_decorateAsClass(function(){
this.primitiveCode = null;
this.seitzMatrix12ths = null;
this.order = 0;
this.axisType = '\0';
this.inputCode = null;
this.lookupCode = null;
this.translationString = null;
this.rotation = null;
this.translation = null;
this.isImproper = false;
this.diagonalReferenceAxis = '\0';
this.allPositive = true;
Clazz_instantialize(this, arguments);}, JS.HallInfo, "HallRotationTerm", null);
Clazz_prepareFields (c$, function(){
this.seitzMatrix12ths =  new JU.M4();
});
Clazz_makeConstructor(c$, 
function(hallInfo, code, prevOrder, prevAxisType){
this.inputCode = code;
code += "   ";
if (code.charAt(0) == '-') {
this.isImproper = true;
code = code.substring(1);
}this.primitiveCode = "";
this.order = (code.charAt(0)).charCodeAt(0) - 48;
this.diagonalReferenceAxis = '\0';
this.axisType = '\0';
var ptr = 2;
var c;
switch ((c = code.charAt(1)).charCodeAt(0)) {
case 120:
case 121:
case 122:
switch ((code.charAt(2)).charCodeAt(0)) {
case 39:
case 34:
this.diagonalReferenceAxis = c;
c = code.charAt(2);
ptr++;
}
case 42:
this.axisType = c;
break;
case 39:
case 34:
this.axisType = c;
switch ((code.charAt(2)).charCodeAt(0)) {
case 120:
case 121:
case 122:
this.diagonalReferenceAxis = code.charAt(2);
ptr++;
break;
default:
this.diagonalReferenceAxis = prevAxisType;
}
break;
default:
this.axisType = (this.order == 1 ? '_' : hallInfo.nRotations == 0 ? 'z' : hallInfo.nRotations == 2 ? '*' : prevOrder == 2 || prevOrder == 4 ? 'x' : '\'');
code = code.substring(0, 1) + this.axisType + code.substring(1);
}
this.primitiveCode += (this.axisType == '_' ? "1" : code.substring(0, 2));
if (this.diagonalReferenceAxis != '\0') {
code = code.substring(0, 1) + this.diagonalReferenceAxis + this.axisType + code.substring(ptr);
this.primitiveCode += this.diagonalReferenceAxis;
ptr = 3;
}this.lookupCode = code.substring(0, ptr);
this.rotation = JS.HallInfo.HallRotation.lookup(this.lookupCode);
if (this.rotation == null) {
JU.Logger.error("Rotation lookup could not find " + this.inputCode + " ? " + this.lookupCode);
return;
}this.translation =  new JS.HallInfo.HallTranslation('\0', null);
this.translationString = "";
var len = code.length;
for (var i = ptr; i < len; i++) {
var translationCode = code.charAt(i);
var t = JS.HallInfo.HallTranslation.getHallTranslation(translationCode, this.order);
if (t != null) {
this.translationString += "" + t.translationCode;
this.translation.rotationShift12ths += t.rotationShift12ths;
this.translation.vectorShift12ths.add(t.vectorShift12ths);
}}
this.primitiveCode = (this.isImproper ? "-" : "") + this.primitiveCode + this.translationString;
this.seitzMatrix12ths.setM4(this.isImproper ? this.rotation.seitzMatrixInv : this.rotation.seitzMatrix);
this.seitzMatrix12ths.m03 = this.translation.vectorShift12ths.x;
this.seitzMatrix12ths.m13 = this.translation.vectorShift12ths.y;
this.seitzMatrix12ths.m23 = this.translation.vectorShift12ths.z;
switch ((this.axisType).charCodeAt(0)) {
case 120:
this.seitzMatrix12ths.m03 += this.translation.rotationShift12ths;
break;
case 121:
this.seitzMatrix12ths.m13 += this.translation.rotationShift12ths;
break;
case 122:
this.seitzMatrix12ths.m23 += this.translation.rotationShift12ths;
break;
}
if (hallInfo.vectorCode.length > 0) {
var m1 = JU.M4.newM4(null);
var m2 = JU.M4.newM4(null);
var v = hallInfo.vector12ths;
m1.m03 = v.x;
m1.m13 = v.y;
m1.m23 = v.z;
m2.m03 = -v.x;
m2.m13 = -v.y;
m2.m23 = -v.z;
this.seitzMatrix12ths.mul2(m1, this.seitzMatrix12ths);
this.seitzMatrix12ths.mul(m2);
}if (JU.Logger.debugging) {
JU.Logger.debug("code = " + code + "; primitive code =" + this.primitiveCode + "\n Seitz Matrix(12ths):" + this.seitzMatrix12ths);
}}, "JS.HallInfo,~S,~N,~S");
Clazz_defineMethod(c$, "dumpInfo", 
function(vectorCode){
var sb =  new JU.SB();
sb.append("\ninput code: ").append(this.inputCode).append("; primitive code: ").append(this.primitiveCode).append("\norder: ").appendI(this.order).append(this.isImproper ? " (improper axis)" : "");
if (this.axisType != '_') {
sb.append("; axisType: ").appendC(this.axisType);
if (this.diagonalReferenceAxis != '\0') sb.appendC(this.diagonalReferenceAxis);
}if (this.translationString.length > 0) sb.append("; translation: ").append(this.translationString);
if (vectorCode.length > 0) sb.append("; vector offset: ").append(vectorCode);
if (this.rotation != null) sb.append("\noperator: ").append(this.getXYZ(this.allPositive)).append("\nSeitz matrix:\n").append(JS.SymmetryOperation.dumpSeitz(this.seitzMatrix12ths, false));
return sb.toString();
}, "~S");
Clazz_defineMethod(c$, "getXYZ", 
function(allPositive){
return JS.SymmetryOperation.getXYZFromMatrix(this.seitzMatrix12ths, true, allPositive, true);
}, "~B");
Clazz_defineMethod(c$, "set", 
function(modelSet){
this.modelSet = modelSet;
return this;
}, "JM.ModelSet");
Clazz_defineMethod(c$, "getSymopInfoForPoints", 
function(sym, modelIndex, symOp, translation, pt1, pt2, drawID, stype, scaleFactor, nth, options, bsInfo){
var asString = (bsInfo.get(22) || bsInfo.get(3) && bsInfo.cardinality() == 3);
bsInfo.clear(22);
var ret = (asString ? "" : null);
var sginfo = this.getSpaceGroupInfo(sym, modelIndex, null, symOp, pt1, pt2, drawID, scaleFactor, nth, false, true, options, null, bsInfo);
if (sginfo == null) return ret;
var infolist = sginfo.get("operations");
if (infolist == null) return ret;
var sb = (asString ?  new JU.SB() : null);
symOp--;
var isAll = (!asString && symOp < 0);
var strOperations = sginfo.get("symmetryInfo");
var strOpNote = sginfo.get("spaceGroupNote");
strOperations += (strOpNote == null ? "" : "\n" + strOpNote.$replace(':', ' '));
var labelOnly = "label".equals(stype);
var n = 0;
for (var i = 0; i < infolist.length; i++) {
if (infolist[i] == null || symOp >= 0 && symOp != i) continue;
if (!asString) {
if (!isAll) return infolist[i];
infolist[n++] = infolist[i];
continue;
}if (drawID != null) return (infolist[i][3]) + "\nprint " + JU.PT.esc(strOperations);
if (sb.length() > 0) sb.appendC('\n');
if (!labelOnly) {
if (symOp < 0) sb.appendI(i + 1).appendC('\t');
sb.append(infolist[i][0]).appendC('\t');
}sb.append(infolist[i][2]);
}
if (!asString) {
var a =  new Array(n);
for (var i = 0; i < n; i++) a[i] = infolist[i];

return a;
}if (sb.length() == 0) return (drawID != null ? "draw ID \"" + drawID + "*\" delete" : ret);
return sb.toString();
}, "J.api.SymmetryInterface,~N,~N,JU.P3,JU.P3,JU.P3,~S,~S,~N,~N,~N,JU.BS");
Clazz_defineMethod(c$, "getDrawID", 
function(id){
return this.drawID + id + "\" ";
}, "~S");
Clazz_defineMethod(c$, "getSymopInfo", 
function(iAtom, xyz, op, translation, pt, pt2, id, type, scaleFactor, nth, options, opList){
if (type == 0) type = JS.SymmetryDesc.getType(id);
var ret = (type == 1153433601 ?  new JU.BS() : "");
this.iModel = (iAtom >= 0 ? this.modelSet.at[iAtom].mi : this.modelSet.vwr.am.cmi);
if (this.iModel < 0) return ret;
this.iModelSpin = this.modelSet.getJmolDataFrameInt(this.iModel, 1095241729);
var uc = this.modelSet.am[this.iModel].biosymmetry;
if (uc == null && (uc = this.modelSet.getUnitCell(this.iModel)) == null) {
uc =  new JS.Symmetry().setUnitCellFromParams(null, false, NaN);
}if (type != 135176 || op != 2147483647 && opList == null) {
return this.getSymmetryInfo(iAtom, uc, xyz, op, translation, pt, pt2, id, type, scaleFactor, nth, options, false);
}if (uc == null) return ret;
var isSpaceGroup = (xyz == null && nth < 0 && opList == null);
var s = "";
var ops = (isSpaceGroup && nth == -2 ? uc.getAdditionalOperations() : uc.getSymmetryOperations());
if (ops != null) {
if (id == null) id = "sg";
var n = ops.length;
if (pt != null && pt2 == null || opList != null) {
if (opList == null) opList = uc.getInvariantSymops(pt, null);
n = opList.length;
for (var i = 0; i < n; i++) {
if (nth > 0 && nth != i + 1) continue;
op = opList[i];
s += this.getSymmetryInfo(iAtom, uc, xyz, op, translation, pt, pt2, id + op, 135176, scaleFactor, nth, options, pt == null);
}
} else {
for (op = 1; op <= n; op++) {
s += this.getSymmetryInfo(iAtom, uc, xyz, op, translation, pt, pt2, id + op, 135176, scaleFactor, nth, options, true);
}
}}return s;
}, "~N,~S,~N,JU.P3,JU.P3,JU.P3,~S,~N,~N,~N,~N,~A");
Clazz_defineMethod(c$, "getSpaceGroupInfo", 
function(sym, modelIndex, sgName, symOp, pt1, pt2, drawID, scaleFactor, nth, isFull, isForModel, options, cellInfo, bsInfo){
if (bsInfo == null) {
bsInfo =  new JU.BS();
bsInfo.setBits(0, JS.SymmetryDesc.keys.length);
bsInfo.clear(19);
}var matrixOnly = (bsInfo.cardinality() == 1 && bsInfo.get(10));
var info = null;
var isStandard = (!matrixOnly && pt1 == null && drawID == null && nth <= 0 && bsInfo.cardinality() >= JS.SymmetryDesc.keys.length);
var isBio = false;
var sgNote = null;
var haveName = (sgName != null && sgName.length > 0);
var haveRawName = (haveName && sgName.indexOf("[--]") >= 0);
if (isForModel || !haveName) {
var saveModelInfo = (isStandard && symOp == 0);
if (matrixOnly) {
cellInfo = sym;
} else {
if (modelIndex < 0) modelIndex = (Clazz_instanceOf(pt1,"JM.Atom") ? (pt1).mi : this.modelSet.vwr.am.cmi);
if (modelIndex < 0) sgNote = "no single current model";
 else if (cellInfo == null && !(isBio = (cellInfo = this.modelSet.am[modelIndex].biosymmetry) != null) && (cellInfo = this.modelSet.getUnitCell(modelIndex)) == null) sgNote = "not applicable";
if (sgNote != null) {
info =  new java.util.Hashtable();
info.put("spaceGroupInfo", "");
info.put("spaceGroupNote", sgNote);
info.put("symmetryInfo", "");
} else if (isStandard) {
info = this.modelSet.getInfo(modelIndex, "spaceGroupInfo");
}if (info != null) return info;
sgName = cellInfo.getSpaceGroupName();
}var nDim = cellInfo.getDimensionality();
info =  new java.util.Hashtable();
var ops = cellInfo.getSymmetryOperations();
var sg = (isBio ? (cellInfo).spaceGroup : null);
var slist = (haveRawName ? "" : null);
var opCount = 0;
if (ops != null) {
sym = J.api.Interface.getSymmetry(null, "desc");
if (!matrixOnly) {
if (isBio) {
sym.setSpaceGroupTo(JS.SpaceGroup.getNull(false, false, false));
} else {
sym.setSpaceGroup(false);
if (cellInfo.getGroupType() != 0) {
var sg0 = cellInfo.getSpaceGroup();
var sg1 = sym.getSpaceGroup();
sg1.nDim = nDim;
sg1.groupType = sg0.groupType;
sg1.setClegId(sg0.getClegId());
}}}var infolist =  new Array(ops.length);
var sops = "";
var i0 = (drawID == null || pt1 == null || pt2 == null && nth < 0 ? 0 : 1);
for (var i = i0, nop = 0; i < ops.length && nop != nth; i++) {
var op = ops[i];
var xyzOriginal = op.xyzOriginal;
var xyzCanonical = op.xyzCanonical;
var spinUOrig = op.spinU;
var timeReversal = op.timeReversal;
var spinIndex = op.spinIndex;
var iop;
if (matrixOnly) {
iop = i;
} else {
var isNewIncomm = (i == 0 && op.xyz.indexOf("x4") >= 0);
iop = (!isNewIncomm && sym.getSpaceGroupOperation(i) != null ? i : isBio ? sym.addBioMoleculeOperation(sg.finalOperations[i], false) : sym.addSpaceGroupOperation("=" + op.xyz, i + 1));
if (iop < 0) continue;
op = sym.getSpaceGroupOperation(i);
if (op == null) continue;
op.xyzOriginal = xyzOriginal;
op.xyzCanonical = xyzCanonical;
op.spinU = spinUOrig;
op.spinIndex = spinIndex;
op.timeReversal = timeReversal;
}if (op.timeReversal != 0 || op.modDim > 0) isStandard = false;
if (slist != null) slist += ";" + op.xyz;
var ret = (symOp > 0 && symOp - 1 != iop ? null : this.createInfoArray(op, cellInfo, pt1, pt2, drawID, scaleFactor, options, false, bsInfo, false, false, nDim));
if (ret != null) {
nop++;
if (nth > 0 && nop != nth) continue;
infolist[i] = ret;
if (!matrixOnly) sops += "\n" + (i + 1) + (drawID != null && nop == 1 ? "*" : "") + "\t" + ret[bsInfo.get(19) ? 19 : nDim == 2 ? 18 : 0] + "\t  " + ret[2];
opCount++;
if (symOp > 0) break;
}}
info.put("operations", infolist);
if (!matrixOnly) info.put("symmetryInfo", (sops.length == 0 ? "" : sops.substring(1)));
}if (matrixOnly) {
return info;
}sgNote = (opCount == 0 ? "\n no symmetry operations" : nth <= 0 && symOp <= 0 ? "\n" + opCount + " symmetry operation" + (opCount == 1 ? ":\n" : "s:\n") : "");
if (slist != null) sgName = slist.substring(slist.indexOf(";") + 1);
if (saveModelInfo) this.modelSet.setInfo(modelIndex, "spaceGroupInfo", info);
} else {
info =  new java.util.Hashtable();
}info.put("spaceGroupName", sgName);
info.put("spaceGroupNote", sgNote == null ? "" : sgNote);
var data;
if (isBio) {
data = sgName;
} else {
if (haveName && !haveRawName) sym.setSpaceGroupName(sgName);
data = sym.getSpaceGroupInfoObj(sgName, (cellInfo == null ? null : cellInfo.getUnitCellParams()), isFull, !isForModel);
if (data == null || data.equals("?")) {
data = "?";
info.put("spaceGroupNote", "could not identify space group from name: " + sgName + "\nformat: show spacegroup \"2\" or \"P 2c\" " + "or \"C m m m\" or \"x, y, z;-x ,-y, -z\"\n");
}}info.put("spaceGroupInfo", data);
return info;
}, "J.api.SymmetryInterface,~N,~S,~N,JU.P3,JU.P3,~S,~N,~N,~B,~B,~N,J.api.SymmetryInterface,JU.BS");
Clazz_defineMethod(c$, "getTransform", 
function(uc, ops, fracA, fracB, best){
JS.SymmetryDesc.pta02.setT(fracB);
JS.SymmetryDesc.vtrans.setT(JS.SymmetryDesc.pta02);
uc.unitize(JS.SymmetryDesc.pta02);
var dmin = 3.4028235E38;
var imin = -1;
for (var i = 0, n = ops.length; i < n; i++) {
var op = ops[i];
JS.SymmetryDesc.pta01.setT(fracA);
op.rotTrans(JS.SymmetryDesc.pta01);
JS.SymmetryDesc.ptemp.setT(JS.SymmetryDesc.pta01);
uc.unitize(JS.SymmetryDesc.pta01);
var d = JS.SymmetryDesc.pta01.distanceSquared(JS.SymmetryDesc.pta02);
if (d < 1.96E-6) {
JS.SymmetryDesc.vtrans.sub(JS.SymmetryDesc.ptemp);
JS.SymmetryOperation.normalize12ths(JS.SymmetryDesc.vtrans);
var m2 = JU.M4.newM4(op);
m2.add(JS.SymmetryDesc.vtrans);
JS.SymmetryDesc.pta01.setT(fracA);
m2.rotTrans(JS.SymmetryDesc.pta01);
uc.unitize(JS.SymmetryDesc.pta01);
d = JS.SymmetryDesc.pta01.distanceSquared(JS.SymmetryDesc.pta02);
if (d >= 1.96E-6) {
continue;
}return m2;
}if (d < dmin) {
dmin = d;
imin = i;
}}
if (best) {
var op = ops[imin];
JS.SymmetryDesc.pta01.setT(fracA);
op.rotTrans(JS.SymmetryDesc.pta01);
uc.unitize(JS.SymmetryDesc.pta01);
}return null;
}, "JS.UnitCell,~A,JU.P3,JU.P3,~B");
c$.getType = Clazz_defineMethod(c$, "getType", 
function(id){
var type;
if (id == null) return 1073742001;
switch (id.toLowerCase()) {
case "xyzcanonical":
return 1111492629;
case "xyzoriginal":
return 1073742078;
case "matrix":
return 12;
case "description":
return 1825200146;
case "axispoint":
return 134217751;
case "time":
return 268441089;
case "info":
return 1275068418;
case "element":
return 1086326789;
case "invariant":
return 36868;
}
type = JS.T.getTokFromName(id);
if (type != 0) return type;
type = JS.SymmetryDesc.getKeyType(id);
return (type < 0 ? type : 1073742327);
}, "~S");
c$.getKeyType = Clazz_defineMethod(c$, "getKeyType", 
function(id){
if ("type".equals(id)) id = "_type";
for (var type = 0; type < JS.SymmetryDesc.keys.length; type++) if (id.equalsIgnoreCase(JS.SymmetryDesc.keys[type])) return -1 - type;

return 0;
}, "~S");
c$.nullReturn = Clazz_defineMethod(c$, "nullReturn", 
function(type){
switch (type) {
case 135176:
return ";draw ID sym* delete;draw ID sg* delete;";
case 1073741961:
case 1825200146:
case 1073741974:
case 1145047049:
case 1145047053:
case 11:
case 1111492629:
case 1073742078:
case 1145045003:
case 1095241729:
return "";
case 1153433601:
return  new JU.BS();
default:
return null;
}
}, "~N");
c$.getInfo = Clazz_defineMethod(c$, "getInfo", 
function(io, type, nDim){
if (io.length == 0) return "";
if (type < 0 && -type <= JS.SymmetryDesc.keys.length && -type <= io.length) return io[-1 - type];
switch (type) {
case 1073742327:
case 1073741982:
return io;
case 1275068418:
var lst =  new java.util.Hashtable();
for (var j = 0, n = io.length; j < n; j++) {
var key = (j == 3 ? "draw" : j == 7 ? "axispoint" : JS.SymmetryDesc.keys[j]);
if (io[j] != null) lst.put(key, io[j]);
}
return lst;
case 1073742001:
return io[16] + "\t" + io[nDim == 2 ? 18 : 0] + "  \t" + io[2];
case 1073741961:
return io[0] + "  \t" + io[2];
case 1145047049:
return io[0];
case 1145047053:
return io[19];
case 1111492629:
return io[18];
case 1073742078:
return io[1];
default:
case 1825200146:
return io[2];
case 134217764:
if (!JU.Logger.debugging) return io[3];
case 135176:
return io[3] + "\nprint " + JU.PT.esc(io[0] + " " + io[2]);
case 1145047050:
return io[4];
case 1073742178:
return io[5];
case 12289:
return io[6];
case 134217751:
return io[7];
case 1095241729:
return io[20];
case 1073741854:
return io[8];
case 134217729:
return io[9];
case 1145045003:
case 12:
return io[10];
case 1814695966:
return io[11];
case 4160:
return io[12];
case 268441089:
return io[13];
case 134217750:
return io[14];
case 1140850696:
return io[15];
case 1073741974:
return io[16];
case 1086326789:
return  Clazz_newArray(-1, [io[6], io[7], io[8], io[14], io[5]]);
case 36868:
return (io[6] != null ? io[6] : io[8] != null ?  Clazz_newArray(-1, [io[7], io[8], io[5]]) : io[5] != null ? "none" : io[14] != null ? io[14] : "identity");
}
}, "~A,~N,~N");
c$.getInfoBS = Clazz_defineMethod(c$, "getInfoBS", 
function(type){
var bsInfo =  new JU.BS();
if (type < 0 && -type <= JS.SymmetryDesc.keys.length) {
bsInfo.set(-1 - type);
return bsInfo;
}switch (type) {
case 0:
case 1153433601:
case 1073742001:
case 1073742327:
case 1073741982:
case 1275068418:
bsInfo.setBits(0, JS.SymmetryDesc.keys.length);
break;
case 1073741961:
bsInfo.set(0);
bsInfo.set(2);
break;
case 1145047049:
bsInfo.set(0);
break;
case 1145047053:
bsInfo.set(19);
break;
case 1111492629:
bsInfo.set(18);
break;
case 1073742078:
bsInfo.set(1);
break;
default:
case 1825200146:
bsInfo.set(2);
break;
case 135176:
bsInfo.set(0);
bsInfo.set(2);
bsInfo.set(3);
break;
case 1145047050:
bsInfo.set(4);
break;
case 1073742178:
bsInfo.set(5);
break;
case 12289:
bsInfo.set(6);
break;
case 134217751:
bsInfo.set(7);
break;
case 1095241729:
bsInfo.set(20);
break;
case 1073741854:
bsInfo.set(8);
break;
case 134217729:
bsInfo.set(9);
break;
case 12:
bsInfo.set(10);
break;
case 1814695966:
bsInfo.set(11);
break;
case 4160:
bsInfo.set(12);
break;
case 268441089:
bsInfo.set(13);
break;
case 134217750:
bsInfo.set(14);
break;
case 1140850696:
bsInfo.set(15);
break;
case 1073741974:
bsInfo.set(16);
break;
case 1086326789:
case 36868:
bsInfo.set(5);
bsInfo.set(6);
bsInfo.set(7);
bsInfo.set(8);
bsInfo.set(14);
bsInfo.set(23);
break;
}
return bsInfo;
}, "~N");
Clazz_defineMethod(c$, "createInfoArray", 
function(op, uc, ptFrom, ptTarget, id, scaleFactor, options, haveTranslation, bsInfo, isSpaceGroup, isSpaceGroupAll, nDim){
op.doFinalize();
var matrixOnly = ( new Boolean (bsInfo.get(10) & (bsInfo.cardinality() == (bsInfo.get(24) ? 2 : 1))).valueOf());
var isTimeReversed = (op.timeReversal == -1);
var isSpinSG = (op.spinU != null);
var isMagnetic = (op.timeReversal != 0 || isSpinSG);
if (scaleFactor == 0) scaleFactor = 1;
JS.SymmetryDesc.vtrans.set(0, 0, 0);
var plane = null;
var pta00 = (ptFrom == null || Float.isNaN(ptFrom.x) ? uc.getCartesianOffset() : ptFrom);
if (ptTarget != null) {
JS.SymmetryDesc.pta01.setT(pta00);
JS.SymmetryDesc.pta02.setT(ptTarget);
uc.toFractional(JS.SymmetryDesc.pta01, false);
uc.toFractional(JS.SymmetryDesc.pta02, false);
op.rotTrans(JS.SymmetryDesc.pta01);
JS.SymmetryDesc.ptemp.setT(JS.SymmetryDesc.pta01);
uc.unitize(JS.SymmetryDesc.pta01);
JS.SymmetryDesc.vtrans.setT(JS.SymmetryDesc.pta02);
uc.unitize(JS.SymmetryDesc.pta02);
if (JS.SymmetryDesc.pta01.distanceSquared(JS.SymmetryDesc.pta02) >= 1.96E-6) return null;
JS.SymmetryDesc.vtrans.sub(JS.SymmetryDesc.ptemp);
}var m2 = JU.M4.newM4(op);
m2.add(JS.SymmetryDesc.vtrans);
if (bsInfo.get(10) && ptTarget != null && pta00.equals(ptTarget)) {
m2.m00 = Math.round(m2.m00);
m2.m01 = Math.round(m2.m01);
m2.m02 = Math.round(m2.m02);
m2.m03 = Math.round(m2.m03);
m2.m10 = Math.round(m2.m10);
m2.m11 = Math.round(m2.m11);
m2.m12 = Math.round(m2.m12);
m2.m13 = Math.round(m2.m13);
m2.m20 = Math.round(m2.m20);
m2.m21 = Math.round(m2.m21);
m2.m22 = Math.round(m2.m22);
m2.m23 = Math.round(m2.m23);
}if (matrixOnly && !isMagnetic) {
var im = JS.SymmetryDesc.getKeyType("matrix");
var o =  new Array(-im);
o[-1 - im] = (bsInfo.get(24) ? JS.SymmetryOperation.matrixToRationalString(m2) : m2);
return o;
}var ftrans =  new JU.V3();
JS.SymmetryDesc.pta01.set(1, 0, 0);
JS.SymmetryDesc.pta02.set(0, 1, 0);
var pta03 = JU.P3.new3(0, 0, 1);
JS.SymmetryDesc.pta01.add(pta00);
JS.SymmetryDesc.pta02.add(pta00);
pta03.add(pta00);
var pt0 = JS.SymmetryDesc.rotTransCart(op, uc, pta00, JS.SymmetryDesc.vtrans);
var pt1 = JS.SymmetryDesc.rotTransCart(op, uc, JS.SymmetryDesc.pta01, JS.SymmetryDesc.vtrans);
var pt2 = JS.SymmetryDesc.rotTransCart(op, uc, JS.SymmetryDesc.pta02, JS.SymmetryDesc.vtrans);
var pt3 = JS.SymmetryDesc.rotTransCart(op, uc, pta03, JS.SymmetryDesc.vtrans);
var vt1 = JU.V3.newVsub(pt1, pt0);
var vt2 = JU.V3.newVsub(pt2, pt0);
var vt3 = JU.V3.newVsub(pt3, pt0);
JS.SymmetryOperation.approx6Pt(JS.SymmetryDesc.vtrans);
var vtemp =  new JU.V3();
vtemp.cross(vt1, vt2);
var haveInversion = (vtemp.dot(vt3) < 0);
if (haveInversion) {
pt1.sub2(pt0, vt1);
pt2.sub2(pt0, vt2);
pt3.sub2(pt0, vt3);
}var q = JU.Quat.getQuaternionFrame(pt0, pt1, pt2).div(JU.Quat.getQuaternionFrame(pta00, JS.SymmetryDesc.pta01, JS.SymmetryDesc.pta02));
var qF = JU.Quat.new4(q.q1, q.q2, q.q3, q.q0);
var info = JU.Measure.computeHelicalAxis(pta00, pt0, qF);
var pa1 = JU.P3.newP(info[0]);
var ax1 = JU.P3.newP(info[1]);
var ang1 = Clazz_floatToInt(Math.abs(JU.PT.approx((info[3]).x, 1)));
var pitch1 = JS.SymmetryOperation.approx((info[3]).y);
if (haveInversion) {
pt1.add2(pt0, vt1);
pt2.add2(pt0, vt2);
pt3.add2(pt0, vt3);
}var trans = JU.V3.newVsub(pt0, pta00);
if (trans.length() < 0.1) trans = null;
var ptinv = null;
var ipt = null;
var ptref = null;
var vShift = null;
var w = 0;
var margin = 0;
var isTranslation = (ang1 == 0);
var isRotation = !isTranslation;
var isInversionOnly = false;
var isMirrorPlane = false;
var isTranslationOnly = !isRotation && !haveInversion;
if (isRotation || haveInversion) {
trans = null;
}var notC = false;
var periodicity = uc.getPeriodicity();
var shiftA = ((periodicity & 0x1) == 0);
var shiftB = ((periodicity & 0x2) == 0);
var shiftC = ((periodicity & 0x4) == 0);
vShift = JU.V3.new3(0, 0, 1);
if (nDim == 3) {
switch (periodicity) {
case 0x1:
vShift = JU.V3.new3(1, 0, 0);
notC = true;
break;
case 0x2:
notC = true;
vShift = JU.V3.new3(0, 1, 0);
break;
case 0x4:
notC = true;
break;
}
}var isPeriodic = !(shiftA || shiftB || shiftC);
var dot = Math.abs(ax1.dot(vShift) / vShift.length() / ax1.length());
if (Math.abs(dot - 1) < 0.001) {
notC = false;
vShift = null;
} else {
isPeriodic = !notC;
}if (haveInversion && isTranslation) {
ipt = JU.P3.newP(pta00);
ipt.add(pt0);
ipt.scale(0.5);
ptinv = pt0;
isInversionOnly = true;
} else if (haveInversion) {
var d = (pitch1 == 0 ?  new JU.V3() : ax1);
var f = 0;
switch (ang1) {
case 60:
f = 0.6666667;
break;
case 120:
f = 2;
break;
case 90:
f = 1;
break;
case 180:
ptref = JU.P3.newP(pta00);
ptref.add(d);
pa1.scaleAdd2(0.5, d, pta00);
if (ptref.distance(pt0) > 0.1) {
trans = JU.V3.newVsub(pt0, ptref);
ftrans.setT(trans);
uc.toFractional(ftrans, true);
} else {
trans = null;
}vtemp.setT(ax1);
vtemp.normalize();
w = -vtemp.x * pa1.x - vtemp.y * pa1.y - vtemp.z * pa1.z;
plane = JU.P4.new4(vtemp.x, vtemp.y, vtemp.z, w);
margin = (Math.abs(w) < 0.01 && vtemp.x * vtemp.y > 0.4 ? 1.30 : 1.05);
isRotation = false;
haveInversion = false;
isMirrorPlane = true;
if (shiftC) {
vShift = JU.V3.newVsub(pta00, pta03);
dot = Math.abs(ax1.dot(vShift) / vShift.length() / ax1.length());
shiftC = (dot < 0.001);
if (shiftC) {
vShift.scale(0.5);
uc.toCartesian(vShift, true);
}}if (shiftB) {
var vs = JU.V3.newVsub(pta00, JS.SymmetryDesc.pta02);
dot = notC ? 0 : Math.abs(ax1.dot(vs) / vs.length() / ax1.length());
shiftB = (dot < 0.001);
if (shiftB) {
vs.scale(0.5);
uc.toCartesian(vs, true);
if (shiftC) {
vShift.add(vs);
} else {
vShift = vs;
}}}if (shiftA) {
var vs = JU.V3.newVsub(pta00, JS.SymmetryDesc.pta01);
dot = notC ? 0 : Math.abs(ax1.dot(vs) / vs.length() / ax1.length());
shiftA = (dot < 0.001);
if (shiftA) {
vs.scale(0.5);
uc.toCartesian(vs, true);
if (shiftB || shiftC) {
vShift.add(vs);
} else {
vShift = vs;
}}}break;
default:
haveInversion = false;
break;
}
if (f != 0) {
vtemp.sub2(pta00, pa1);
vtemp.add(pt0);
vtemp.sub(pa1);
vtemp.sub(d);
vtemp.scale(f);
pa1.add(vtemp);
ipt =  new JU.P3();
ipt.scaleAdd2(0.5, d, pa1);
ptinv =  new JU.P3();
ptinv.scaleAdd2(-2, ipt, pt0);
ptinv.scale(-1);
}} else if (trans != null) {
JS.SymmetryDesc.ptemp.setT(trans);
uc.toFractional(JS.SymmetryDesc.ptemp, false);
ftrans.setT(JS.SymmetryDesc.ptemp);
uc.toCartesian(JS.SymmetryDesc.ptemp, false);
trans.setT(JS.SymmetryDesc.ptemp);
}var ang = ang1;
JS.SymmetryDesc.approx0(ax1);
if (isRotation) {
var ptr =  new JU.P3();
vtemp.setT(ax1);
var ang2 = ang1;
var p0;
if (haveInversion) {
ptr.setT(ptinv);
p0 = ptinv;
} else if (pitch1 == 0) {
p0 = pt0;
ptr.setT(pa1);
} else {
p0 = pt0;
ptr.scaleAdd2(0.5, vtemp, pa1);
}JS.SymmetryDesc.ptemp.add2(pa1, vtemp);
ang2 = Math.round(JU.Measure.computeTorsion(pta00, pa1, JS.SymmetryDesc.ptemp, p0, true));
if (JS.SymmetryOperation.approx(ang2) != 0) {
ang1 = ang2;
if (ang1 < 0) ang1 = 360 + ang1;
}}var info1 = null;
var type = null;
var glideType = String.fromCharCode(0);
var isIrrelevant = op.isIrrelevant;
var order = op.getOpOrder();
op.isIrrelevant = new Boolean (op.isIrrelevant | isIrrelevant).valueOf();
var isccw = op.getOpIsCCW();
var screwDir = 0;
var nrot = 0;
if (bsInfo.get(2) || bsInfo.get(15)) {
info1 = type = "identity";
if (isInversionOnly) {
JS.SymmetryDesc.ptemp.setT(ipt);
uc.toFractional(JS.SymmetryDesc.ptemp, false);
info1 = "Ci: " + JS.SymmetryDesc.strCoord(JS.SymmetryDesc.ptemp, op.isBio);
type = "inversion center";
} else if (isRotation) {
var screwtype = "";
if (isccw != null) {
screwtype = (isccw === Boolean.TRUE ? "(+)" : "(-)");
screwDir = (isccw === Boolean.TRUE ? 1 : -1);
if (haveInversion && screwDir == -1) isIrrelevant = true;
}nrot = Clazz_doubleToInt(360 / ang);
if (haveInversion) {
info1 = nrot + "-bar" + screwtype + " axis";
} else if (pitch1 != 0) {
JS.SymmetryDesc.ptemp.setT(ax1);
uc.toFractional(JS.SymmetryDesc.ptemp, true);
info1 = nrot + screwtype + " (" + JS.SymmetryDesc.strCoord(JS.SymmetryDesc.ptemp, op.isBio) + ") screw axis";
} else {
info1 = nrot + screwtype + " axis";
if (order % 2 == 0) screwDir *= Clazz_doubleToInt(order / 2);
}type = info1;
} else if (trans != null) {
var s = " " + JS.SymmetryDesc.strCoord(ftrans, op.isBio);
if (nDim == 2) s = s.substring(0, s.lastIndexOf(' '));
if (isTranslation) {
type = info1 = "translation";
info1 += ":" + s;
} else if (isMirrorPlane) {
if (isSpaceGroup) {
JS.SymmetryDesc.fixGlideTrans(ftrans);
trans.setT(ftrans);
uc.toCartesian(trans, true);
}s = " " + JS.SymmetryDesc.strCoord(ftrans, op.isBio);
if (nDim == 2) s = s.substring(0, s.lastIndexOf(' '));
glideType = JS.SymmetryOperation.getGlideFromTrans(ftrans, ax1);
type = info1 = glideType + "-glide plane";
info1 += "|translation:" + s;
}} else if (isMirrorPlane) {
type = info1 = "mirror plane";
}if (haveInversion && !isInversionOnly) {
JS.SymmetryDesc.ptemp.setT(ipt);
uc.toFractional(JS.SymmetryDesc.ptemp, false);
info1 += "|at " + JS.SymmetryDesc.strCoord(JS.SymmetryDesc.ptemp, op.isBio);
}if (isTimeReversed) {
info1 += "|time-reversed";
type += " (time-reversed)";
}}var isRightHand = true;
var isScrew = (isRotation && !haveInversion && pitch1 != 0);
if (!isScrew) {
screwDir = 0;
isRightHand = JS.SymmetryDesc.checkHandedness(uc, ax1);
if (!isRightHand) {
ang1 = -ang1;
if (ang1 < 0) ang1 = 360 + ang1;
ax1.scale(-1);
}}var ignore = false;
var cmds = null;
var createSpinDraw = (this.iModelSpin >= 0 && isSpinSG);
while (true) {
if (id == null || !bsInfo.get(3)) break;
if (op.getOpType() == 0 || isSpaceGroupAll && op.isIrrelevant) {
if (JU.Logger.debugging) System.out.println("!!SD irrelevent " + op.getOpTitle() + op.getOpPoint());
cmds = "";
break;
}var opType = null;
this.drawID = "\ndraw ID \"" + id;
var drawSB =  new JU.SB();
drawSB.append(this.getDrawID("*")).append(" delete");
var drawFrameZ = (nDim == 3);
if (!isSpaceGroup) {
this.drawLine(drawSB, "frame1X", 0.15, pta00, JS.SymmetryDesc.pta01, "red");
this.drawLine(drawSB, "frame1Y", 0.15, pta00, JS.SymmetryDesc.pta02, "green");
if (drawFrameZ) this.drawLine(drawSB, "frame1Z", 0.15, pta00, pta03, "blue");
}var color;
var planeCenter = null;
var nPC = 0;
var isSpecial = (pta00.distance(pt0) < 0.2);
var title = (isSpaceGroup ? "<hover>" + id + ": " + (nDim == 2 ? op.xyz.$replace(",z", "") : op.xyz) + "|" + info1 + "</hover>" : null);
if (isRotation) {
color = (nrot == 2 ? "red" : nrot == 3 ? "[xA00040]" : nrot == 4 ? "[x800080]" : "[x4000A0]");
ang = ang1;
var scale = 1;
vtemp.setT(ax1);
var wp = "";
if (isSpaceGroup) {
pa1.setT(op.getOpPoint());
uc.toCartesian(pa1, false);
}var ptr =  new JU.P3();
if (pitch1 != 0 && !haveInversion) {
opType = "screw";
color = (isccw === Boolean.TRUE ? "orange" : isccw === Boolean.FALSE ? "blue" : order == 4 ? "lightgray" : "grey");
if (!isSpaceGroup) {
this.drawLine(drawSB, "rotLine1", 0.1, pta00, pa1, "red");
JS.SymmetryDesc.ptemp.add2(pa1, vtemp);
this.drawLine(drawSB, "rotLine2", 0.1, pt0, JS.SymmetryDesc.ptemp, "red");
ptr.scaleAdd2(0.5, vtemp, pa1);
}} else {
ptr.setT(pa1);
if (!isRightHand) {
if (!isSpecial && !isSpaceGroup) pa1.sub2(pa1, vtemp);
}if (haveInversion) {
opType = "bar";
if (isSpaceGroup) {
vtemp.normalize();
if (isccw === Boolean.TRUE) {
vtemp.scale(-1);
}} else {
if (pitch1 == 0) {
ptr.setT(ipt);
vtemp.scale(3 * scaleFactor);
if (isSpecial) {
JS.SymmetryDesc.ptemp.scaleAdd2(0.25, vtemp, pa1);
pa1.scaleAdd2(-0.24, vtemp, pa1);
ptr.scaleAdd2(0.31, vtemp, ptr);
color = "cyan";
} else {
JS.SymmetryDesc.ptemp.scaleAdd2(-1, vtemp, pa1);
this.drawLine(drawSB, "rotLine1", 0.1, pta00, ipt, "red");
this.drawLine(drawSB, "rotLine2", 0.1, ptinv, ipt, "red");
}} else if (!isSpecial) {
scale = pta00.distance(ptr);
this.drawLine(drawSB, "rotLine1", 0.1, pta00, ptr, "red");
this.drawLine(drawSB, "rotLine2", 0.1, ptinv, ptr, "red");
}}} else {
opType = "rot";
vtemp.scale(3 * scaleFactor);
if (isSpecial) {
} else {
if (!isSpaceGroup) {
this.drawLine(drawSB, "rotLine1", 0.1, pta00, ptr, "red");
this.drawLine(drawSB, "rotLine2", 0.1, pt0, ptr, "red");
}}ptr.setT(pa1);
if (pitch1 == 0 && isSpecial) ptr.scaleAdd2(0.25, vtemp, ptr);
}}if (!isSpaceGroup) {
if (ang > 180) {
ang = 180 - ang;
}JS.SymmetryDesc.ptemp.add2(ptr, vtemp);
drawSB.append(this.getDrawID("rotRotArrow")).append(" arrow width 0.1 scale " + JU.PT.escF(scale) + " arc ").append(JU.Escape.eP(ptr)).append(JU.Escape.eP(JS.SymmetryDesc.ptemp));
JS.SymmetryDesc.ptemp.setT(pta00);
if (JS.SymmetryDesc.ptemp.distance(pt0) < 0.1) JS.SymmetryDesc.ptemp.set(Math.random(), Math.random(), Math.random());
drawSB.append(JU.Escape.eP(JS.SymmetryDesc.ptemp));
JS.SymmetryDesc.ptemp.set(0, ang - 5 * Math.signum(ang), 0);
drawSB.append(JU.Escape.eP(JS.SymmetryDesc.ptemp)).append(" color red");
}var d;
var opTransLength = 0;
if (!op.opIsLong && (isSpaceGroupAll && pitch1 > 0 && !haveInversion)) {
ignore = ((opTransLength = op.getOpTrans().length()) > (order == 2 ? 0.71 : order == 3 ? 0.578 : order == 4 ? 0.51 : 0.51));
}if (ignore && JU.Logger.debugging) {
System.out.println("SD ignoring " + op.getOpTrans().length() + " " + op.getOpTitle() + op.xyz);
}var p2 = null;
if (pitch1 == 0 && !haveInversion) {
JS.SymmetryDesc.ptemp.scaleAdd2(0.5, vtemp, pa1);
pa1.scaleAdd2(isSpaceGroup ? -0.5 : -0.45, vtemp, pa1);
if (isSpaceGroupAll && isPeriodic && (p2 = op.getOpPoint2()) != null) {
ptr.setT(p2);
uc.toCartesian(ptr, false);
ptr.scaleAdd2(-0.5, vtemp, ptr);
}if (isSpaceGroup) {
this.scaleByOrder(vtemp, order, isccw);
}} else if (isSpaceGroupAll && pitch1 != 0 && !haveInversion && (d = op.getOpTrans().length()) > 0.4) {
if (isccw === Boolean.TRUE) {
} else if (isccw == null) {
} else if (d == 0.5) {
ignore = true;
}} else if (isSpaceGroup && haveInversion) {
this.scaleByOrder(vtemp, order, isccw);
wp = "80";
}if (pitch1 > 0 && !haveInversion) {
wp = "" + (90 - Clazz_floatToInt(vtemp.length() / pitch1 * 90));
}if (!ignore) {
if (screwDir != 0) {
switch (order) {
case 2:
break;
case 3:
break;
case 4:
if (opTransLength > 0.49) screwDir = -2;
break;
case 6:
if (opTransLength > 0.49) screwDir = -3;
 else if (opTransLength > 0.33) screwDir *= 2;
break;
}
color = (screwDir < 0 ? "blue" : "orange");
}var name = (isSpaceGroup ? opType + "_" + nrot : "") + "rotvector1";
this.drawOrderVector(drawSB, name, "vector", "0.1" + wp, pa1, nrot, screwDir, haveInversion && isSpaceGroupAll, isccw === Boolean.TRUE, vtemp, isTimeReversed ? "orange" : color, title, isSpaceGroupAll);
if (p2 != null) {
this.drawOrderVector(drawSB, name + "2", "vector", "0.1" + wp, ptr, order, screwDir, haveInversion, isccw === Boolean.TRUE, vtemp, isTimeReversed ? "gray" : color, title, isSpaceGroupAll);
}}} else if (isMirrorPlane) {
JS.SymmetryDesc.ptemp.sub2(ptref, pta00);
if (!isSpaceGroup && pta00.distance(ptref) > 0.2) this.drawVector(drawSB, "planeVector", "vector", "0.05", pta00, JS.SymmetryDesc.ptemp, isTimeReversed ? "gray" : "cyan", null);
opType = "plane";
if (trans == null) {
color = "magenta";
} else {
opType = "glide";
switch ((glideType).charCodeAt(0)) {
case 97:
color = "[x4080ff]";
break;
case 98:
color = "blue";
break;
case 99:
color = "cyan";
break;
case 110:
color = "orange";
break;
case 100:
color = "grey";
break;
case 103:
default:
color = "lightgreen";
break;
}
if (!isSpaceGroup) {
this.drawFrameLine("X", ptref, vt1, 0.15, JS.SymmetryDesc.ptemp, drawSB, "glideframe", "red");
this.drawFrameLine("Y", ptref, vt2, 0.15, JS.SymmetryDesc.ptemp, drawSB, "glideframe", "green");
if (drawFrameZ) this.drawFrameLine("Z", ptref, vt3, 0.15, JS.SymmetryDesc.ptemp, drawSB, "glideframe", "blue");
}}var points = uc.getCanonicalCopy(margin, true);
if ((shiftA || shiftB || shiftC)) {
for (var i = 8; --i >= 0; ) {
points[i].add(vShift);
}
}var v = this.modelSet.vwr.getTriangulator().intersectPlane(plane, points, 3);
if (v != null) {
var iCoincident = (isSpaceGroup ? op.iCoincident : 0);
planeCenter =  new JU.P3();
for (var i = 0, iv = 0, n = v.size(); i < n; i++) {
var pts = v.get(i);
drawSB.append(this.getDrawID((trans == null ? "mirror_" : glideType + "_g") + "planep" + i)).append(JU.Escape.eP(pts[0])).append(JU.Escape.eP(pts[1]));
if (pts.length == 3) {
if (iCoincident == 0 || (iv % 2 == 0) != (iCoincident == 1)) {
drawSB.append(JU.Escape.eP(pts[2]));
}iv++;
} else {
planeCenter.add(pts[0]);
planeCenter.add(pts[1]);
nPC += 2;
}drawSB.append(" color translucent ").append(color);
if (title != null) drawSB.append(" ").append(JU.PT.esc(title));
}
}if (v == null || v.size() == 0) {
if (isSpaceGroupAll) {
ignore = true;
} else {
JS.SymmetryDesc.ptemp.add2(pa1, ax1);
drawSB.append(this.getDrawID("planeCircle")).append(" scale 2.0 circle ").append(JU.Escape.eP(pa1)).append(JU.Escape.eP(JS.SymmetryDesc.ptemp)).append(" color translucent ").append(color).append(" mesh fill");
if (title != null) drawSB.append(" ").append(JU.PT.esc(title));
}}}if (haveInversion) {
opType = "inv";
if (isInversionOnly) {
drawSB.append(this.getDrawID("inv_point")).append(" diameter 0.4 ").append(JU.Escape.eP(ipt));
if (title != null) drawSB.append(" ").append(JU.PT.esc(title));
JS.SymmetryDesc.ptemp.sub2(ptinv, pta00);
if (!isSpaceGroup) {
this.drawVector(drawSB, "Arrow", "vector", "0.05", pta00, JS.SymmetryDesc.ptemp, isTimeReversed ? "gray" : "cyan", null);
}} else {
if (order == 4) {
drawSB.append(this.getDrawID("RotPoint")).append(" diameter 0.3 color red").append(JU.Escape.eP(ipt));
if (title != null) drawSB.append(" ").append(JU.PT.esc(title));
}if (!isSpaceGroup) {
drawSB.append(" color cyan");
if (!isSpecial) {
JS.SymmetryDesc.ptemp.sub2(pt0, ptinv);
this.drawVector(drawSB, "Arrow", "vector", "0.05", ptinv, JS.SymmetryDesc.ptemp, isTimeReversed ? "gray" : "cyan", null);
}if (options != 1073742066) {
vtemp.setT(vt1);
vtemp.scale(-1);
this.drawFrameLine("X", ptinv, vtemp, 0.15, JS.SymmetryDesc.ptemp, drawSB, opType, "red");
vtemp.setT(vt2);
vtemp.scale(-1);
this.drawFrameLine("Y", ptinv, vtemp, 0.15, JS.SymmetryDesc.ptemp, drawSB, opType, "green");
vtemp.setT(vt3);
vtemp.scale(-1);
if (drawFrameZ) this.drawFrameLine("Z", ptinv, vtemp, 0.15, JS.SymmetryDesc.ptemp, drawSB, opType, "blue");
}}}}if (trans != null) {
if (isMirrorPlane && isSpaceGroup) {
if (planeCenter != null) {
ptref = planeCenter;
ptref.scale(1 / nPC);
ptref.scaleAdd2(-0.5, trans, ptref);
}} else if (ptref == null) {
ptref = (isSpaceGroup ? pta00 : JU.P3.newP(pta00));
}if (ptref != null && !ignore) {
var isCentered = (glideType == '\0');
var isGlide = (isSpaceGroup && !isCentered && !isTranslationOnly);
if (isGlide) {
JS.SymmetryDesc.ptemp.scaleAdd2(0.5, trans, ptref);
JS.SymmetryDesc.vtrans.setT(trans);
JS.SymmetryDesc.vtrans.scale(0.5);
} else {
JS.SymmetryDesc.ptemp.setT(ptref);
JS.SymmetryDesc.vtrans.setT(trans);
}color = (isGlide ? (isTimeReversed ? "orange" : "green") : isTimeReversed && (isSpinSG || !haveInversion && !isMirrorPlane && !isRotation) ? "darkgray" : "gold");
this.drawVector(drawSB, (isCentered ? "centering_" : glideType + "_g") + "trans_vector", "vector", (isGlide || isTranslationOnly ? "0.1" : "0.05"), JS.SymmetryDesc.ptemp, JS.SymmetryDesc.vtrans, color, title);
if (isGlide) {
JS.SymmetryDesc.vtrans.scale(-1);
this.drawVector(drawSB, glideType + "_g" + "trans_vector2", "vector", "0.1", JS.SymmetryDesc.ptemp, JS.SymmetryDesc.vtrans, color, title);
}}}if (!isSpaceGroup) {
JS.SymmetryDesc.ptemp2.setT(pt0);
JS.SymmetryDesc.ptemp.sub2(pt1, pt0);
JS.SymmetryDesc.ptemp.scaleAdd2(0.9, JS.SymmetryDesc.ptemp, JS.SymmetryDesc.ptemp2);
this.drawLine(drawSB, "frame2X", 0.2, JS.SymmetryDesc.ptemp2, JS.SymmetryDesc.ptemp, "red");
JS.SymmetryDesc.ptemp.sub2(pt2, pt0);
JS.SymmetryDesc.ptemp.scaleAdd2(0.9, JS.SymmetryDesc.ptemp, JS.SymmetryDesc.ptemp2);
this.drawLine(drawSB, "frame2Y", 0.2, JS.SymmetryDesc.ptemp2, JS.SymmetryDesc.ptemp, "green");
JS.SymmetryDesc.ptemp.sub2(pt3, pt0);
JS.SymmetryDesc.ptemp.scaleAdd2(0.9, JS.SymmetryDesc.ptemp, JS.SymmetryDesc.ptemp2);
if (drawFrameZ) this.drawLine(drawSB, "frame2Z", 0.2, JS.SymmetryDesc.ptemp2, JS.SymmetryDesc.ptemp, "purple");
drawSB.append("\nsym_point = " + JU.Escape.eP(pta00));
drawSB.append("\nvar p0 = " + JU.Escape.eP(JS.SymmetryDesc.ptemp2));
if (Clazz_instanceOf(pta00,"JM.Atom")) {
drawSB.append("\nvar set2 = within(0.2,p0);if(!set2){set2 = within(0.2,p0.uxyz.xyz)}");
drawSB.append("\n set2 &= {_" + (pta00).getElementSymbol() + "}");
} else {
drawSB.append("\nvar set2 = p0.uxyz");
}drawSB.append("\nsym_target = set2;if (set2) {");
if (!isSpecial && options != 1073742066 && ptTarget == null && !haveTranslation) {
drawSB.append(this.getDrawID("offsetFrameX")).append(" diameter 0.20 @{set2.xyz} @{set2.xyz + ").append(JU.Escape.eP(vt1)).append("*0.9} color red");
drawSB.append(this.getDrawID("offsetFrameY")).append(" diameter 0.20 @{set2.xyz} @{set2.xyz + ").append(JU.Escape.eP(vt2)).append("*0.9} color green");
if (drawFrameZ) drawSB.append(this.getDrawID("offsetFrameZ")).append(" diameter 0.20 @{set2.xyz} @{set2.xyz + ").append(JU.Escape.eP(vt3)).append("*0.9} color purple");
}drawSB.append("\n}\n");
}cmds = drawSB.toString();
if (JU.Logger.debugging) JU.Logger.info(cmds);
drawSB = null;
if (createSpinDraw) {
var sym = this.modelSet.getUnitCell(this.iModel);
var a1 = (Clazz_instanceOf(ptFrom,"JM.Atom") ? ptFrom : null);
var a2 = (Clazz_instanceOf(ptTarget,"JM.Atom") ? ptTarget : null);
if (a1 != null && a2 != null) {
var bs = this.modelSet.vwr.getModelUndeletedAtomsBitSet(this.iModelSpin);
a1 = JU.Vibration.find(this.modelSet, bs, this.modelSet.getVibration(a1.i, false));
a2 = JU.Vibration.find(this.modelSet, bs, this.modelSet.getVibration(a2.i, false));
}if (a1 == null || a2 == null) a1 = a2 = null;
var s = (sym).pointGroup.getInfo(this.iModelSpin, (a1 == null ? null : JU.P3.newP(a1)), (a2 == null ? null : JU.P3.newP(a2)), id + "_pg", false, op.getSUVW(), 0, 1);
if (s != null) cmds += ";\n" + s;
}break;
}
if (trans == null) ftrans = null;
if (isScrew) {
trans = JU.V3.newV(ax1);
JS.SymmetryDesc.ptemp.setT(trans);
uc.toFractional(JS.SymmetryDesc.ptemp, false);
ftrans = JU.V3.newV(JS.SymmetryDesc.ptemp);
}if (isMirrorPlane) {
ang1 = 0;
}if (haveInversion) {
if (isInversionOnly) {
pa1 = null;
ax1 = null;
trans = null;
ftrans = null;
}} else if (isTranslation) {
pa1 = null;
ax1 = null;
}if (ax1 != null) ax1.normalize();
var xyzNew = null;
if (bsInfo.get(0) || bsInfo.get(17)) {
xyzNew = (op.isBio ? m2.toString() : op.modDim > 0 ? op.xyzOriginal : JS.SymmetryOperation.getXYZFromMatrix(m2, false, false, false));
if (isMagnetic) xyzNew = op.fixMagneticXYZ(m2, xyzNew);
 else if (nDim == 2) xyzNew = xyzNew.$replace(",z", "");
}var ret =  new Array(21);
for (var i = bsInfo.nextSetBit(0); i >= 0; i = bsInfo.nextSetBit(i + 1)) {
switch (i) {
case 0:
ret[i] = xyzNew;
break;
case 19:
if (ptFrom != null && ptTarget == null && !op.isBio && op.modDim == 0) {
var xyzN;
JS.SymmetryDesc.pta02.setT(ptFrom);
uc.toFractional(JS.SymmetryDesc.pta02, true);
m2.rotTrans(JS.SymmetryDesc.pta02);
JS.SymmetryDesc.ptemp.setT(JS.SymmetryDesc.pta02);
uc.unitize(JS.SymmetryDesc.pta02);
JS.SymmetryDesc.vtrans.sub2(JS.SymmetryDesc.pta02, JS.SymmetryDesc.ptemp);
m2 = JU.M4.newM4(op);
m2.add(JS.SymmetryDesc.vtrans);
xyzN = JS.SymmetryOperation.getXYZFromMatrix(m2, false, false, false);
if (isMagnetic) xyzN = op.fixMagneticXYZ(m2, xyzN);
ret[i] = xyzN;
}break;
case 1:
ret[i] = op.xyzOriginal;
break;
case 2:
ret[i] = info1;
break;
case 3:
ret[i] = cmds;
break;
case 4:
ret[i] = JS.SymmetryDesc.approx0(ftrans);
break;
case 5:
ret[i] = JS.SymmetryDesc.approx0(trans);
break;
case 6:
ret[i] = JS.SymmetryDesc.approx0(ipt);
break;
case 7:
ret[i] = JS.SymmetryDesc.approx0(pa1 != null && bsInfo.get(23) ? pta00 : pa1);
break;
case 8:
ret[i] = (plane == null ? JS.SymmetryDesc.approx0(ax1) : null);
break;
case 9:
ret[i] = (ang1 != 0 ? Integer.$valueOf(ang1) : null);
break;
case 10:
ret[i] = m2;
break;
case 11:
ret[i] = (JS.SymmetryDesc.vtrans.lengthSquared() > 0 ? JS.SymmetryDesc.vtrans : null);
break;
case 12:
ret[i] = op.getCentering();
break;
case 13:
ret[i] = Integer.$valueOf(op.timeReversal);
break;
case 14:
if (plane != null && bsInfo.get(23)) {
var d = JU.Measure.distanceToPlane(plane, pta00);
plane.w -= d;
}ret[i] = plane;
break;
case 20:
ret[i] = op.spinU;
break;
case 15:
ret[i] = type;
break;
case 16:
ret[i] = Integer.$valueOf(op.number);
break;
case 17:
var cift = null;
if (!op.isBio && !xyzNew.equals(op.xyzOriginal)) {
if (op.number > 0) {
var orig = JS.SymmetryOperation.getMatrixFromXYZ(op.xyzOriginal, null, false);
orig.sub(m2);
cift =  new JU.P3();
orig.getTranslation(cift);
}}var cifi = (op.number < 0 ? 0 : op.number);
ret[i] = cifi + (cift == null ? " [0 0 0]" : " [" + Clazz_floatToInt(-cift.x) + " " + Clazz_floatToInt(-cift.y) + " " + Clazz_floatToInt(-cift.z) + "]");
break;
case 18:
var s = op.xyzCanonical;
if (s == null) s = op.xyz;
if (nDim == 2) s = s.$replace(",z", "");
ret[i] = s;
break;
}
}
return ret;
}, "JS.SymmetryOperation,J.api.SymmetryInterface,JU.P3,JU.P3,~S,~N,~N,~B,JU.BS,~B,~B,~N");
c$.fixGlideTrans = Clazz_defineMethod(c$, "fixGlideTrans", 
function(ftrans){
ftrans.x = JS.SymmetryDesc.fixGlideX(ftrans.x);
ftrans.y = JS.SymmetryDesc.fixGlideX(ftrans.y);
ftrans.z = JS.SymmetryDesc.fixGlideX(ftrans.z);
}, "JU.V3");
c$.fixGlideX = Clazz_defineMethod(c$, "fixGlideX", 
function(x){
var n48 = Math.round(x * 48.001);
switch (n48) {
case 36:
return -0.25;
case -36:
return 0.25;
default:
return x;
}
}, "~N");
Clazz_defineMethod(c$, "scaleByOrder", 
function(v, order, isccw){
v.scale(1 + (0.3 / order) + (isccw == null ? 0 : isccw === Boolean.TRUE ? 0.02 : -0.02));
}, "JU.V3,~N,Boolean");
c$.checkHandedness = Clazz_defineMethod(c$, "checkHandedness", 
function(uc, ax1){
var a;
var b;
var c;
JS.SymmetryDesc.ptemp.set(1, 0, 0);
uc.toCartesian(JS.SymmetryDesc.ptemp, false);
a = JS.SymmetryDesc.approx0d(JS.SymmetryDesc.ptemp.dot(ax1));
JS.SymmetryDesc.ptemp.set(0, 1, 0);
uc.toCartesian(JS.SymmetryDesc.ptemp, false);
b = JS.SymmetryDesc.approx0d(JS.SymmetryDesc.ptemp.dot(ax1));
JS.SymmetryDesc.ptemp.set(0, 0, 1);
uc.toCartesian(JS.SymmetryDesc.ptemp, false);
c = JS.SymmetryDesc.approx0d(JS.SymmetryDesc.ptemp.dot(ax1));
return (a == 0 ? (b == 0 ? c > 0 : b > 0) : c == 0 ? a > 0 : (b == 0 ? c > 0 : a * b * c > 0));
}, "J.api.SymmetryInterface,JU.P3");
Clazz_defineMethod(c$, "drawLine", 
function(s, id, diameter, pt0, pt1, color){
s.append(this.getDrawID(id)).append(" diameter ").appendD(diameter).append(JU.Escape.eP(pt0)).append(JU.Escape.eP(pt1)).append(" color ").append(color);
}, "JU.SB,~S,~N,JU.P3,JU.P3,~S");
Clazz_defineMethod(c$, "drawFrameLine", 
function(xyz, pt, v, width, ptemp, sb, key, color){
ptemp.setT(pt);
ptemp.add(v);
this.drawLine(sb, key + "Pt" + xyz, width, pt, ptemp, "translucent " + color);
}, "~S,JU.P3,JU.V3,~N,JU.P3,JU.SB,~S,~S");
Clazz_defineMethod(c$, "drawVector", 
function(sb, label, type, d, pt1, v, color, title){
if (type.equals("vline")) {
JS.SymmetryDesc.ptemp2.add2(pt1, v);
type = "";
v = JS.SymmetryDesc.ptemp2;
}d += " ";
sb.append(this.getDrawID(label)).append(" diameter ").append(d).append(type).append(JU.Escape.eP(pt1)).append(JU.Escape.eP(v)).append(" color ").append(color);
if (title != null) sb.append(" \"" + title + "\"");
}, "JU.SB,~S,~S,~S,JU.T3,JU.T3,~S,~S");
Clazz_defineMethod(c$, "drawOrderVector", 
function(sb, label, type, d, pt, order, screwDir, haveInversion, isCCW, vtemp, color, title, isSpaceGroupAll){
this.drawVector(sb, label, type, d, pt, vtemp, color, title);
if (order == 2 || haveInversion && !isCCW) return;
var poly = JS.SymmetryDesc.getPolygon(order, !haveInversion ? 0 : isCCW ? 1 : -1, haveInversion, pt, vtemp);
var l = poly[0];
sb.append(this.getDrawID(label + "_key")).append(" POLYGON ").appendI(l.size());
for (var i = 0, n = l.size(); i < n; i++) sb.appendO(l.get(i));

sb.append(" color ").append(color);
if (screwDir != 0 && isSpaceGroupAll) {
poly = JS.SymmetryDesc.getPolygon(order, screwDir, haveInversion, pt, vtemp);
sb.append(this.getDrawID(label + "_key2"));
l = poly[0];
sb.append(" POLYGON ").appendI(l.size());
for (var i = 0, n = l.size(); i < n; i++) sb.appendO(l.get(i));

l = poly[1];
sb.appendI(l.size());
for (var i = 0, n = l.size(); i < n; i++) sb.appendO(JU.PT.toJSON(null, l.get(i)));

sb.append(" color ").append(color);
}}, "JU.SB,~S,~S,~S,JU.P3,~N,~N,~B,~B,JU.V3,~S,~S,~B");
c$.getPolygon = Clazz_defineMethod(c$, "getPolygon", 
function(order, screwDir, haveInversion, pt0, v){
var scale = (haveInversion ? 0.6 : 0.4);
var pts =  new JU.Lst();
var faces =  new JU.Lst();
var offset = JU.V3.newV(v);
offset.scale(0);
offset.add(pt0);
var vZ = JU.V3.new3(0, 0, 1);
var vperp =  new JU.V3();
var m =  new JU.M3();
vperp.cross(vZ, v);
if (vperp.length() < 0.01) {
m.m00 = m.m11 = m.m22 = 1;
} else {
vperp.normalize();
var a = vZ.angle(v);
m.setAA(JU.A4.newVA(vperp, a));
}var rad = (6.283185307179586 / order * (screwDir < 0 ? -1 : 1));
var vt =  new JU.V3();
var ptLast = null;
for (var plast = 0, p = 0, i = 0, n = (screwDir == 0 ? order : order + 1); i < n; i++) {
var pt =  new JU.P3();
pt.x = (Math.cos(rad * i) * scale);
pt.y = (Math.sin(rad * i) * scale);
m.rotate(pt);
pt.add(offset);
if (i < order) {
pts.addLast(pt);
}if (!haveInversion && screwDir != 0 && (i % screwDir == 0) && ptLast != null) {
vt.sub2(pt, ptLast);
var p2 = (i < order ? p++ : 0);
var pt1 = JU.P3.newP(pt);
pt1.scaleAdd2(1, pt, pt1);
pt1.scaleAdd2(-1, offset, pt1);
pts.addLast(pt1);
faces.addLast( Clazz_newIntArray(-1, [plast, p++, p2, 0]));
plast = p2;
} else {
plast = p++;
}ptLast = pt;
}
return  Clazz_newArray(-1, [pts, faces]);
}, "~N,~N,~B,JU.P3,JU.V3");
c$.rotTransCart = Clazz_defineMethod(c$, "rotTransCart", 
function(op, uc, pt00, vtrans){
var p0 = JU.P3.newP(pt00);
uc.toFractional(p0, false);
op.rotTrans(p0);
p0.add(vtrans);
uc.toCartesian(p0, false);
return p0;
}, "JS.SymmetryOperation,J.api.SymmetryInterface,JU.P3,JU.V3");
c$.strCoord = Clazz_defineMethod(c$, "strCoord", 
function(p, isBio){
JS.SymmetryDesc.approx0(p);
return (isBio ? "(" + p.x + " " + p.y + " " + p.z + ")" : JS.SymmetryOperation.fcoord(p, " "));
}, "JU.T3,~B");
c$.approx0 = Clazz_defineMethod(c$, "approx0", 
function(pt){
if (pt != null) {
pt.x = JS.SymmetryDesc.approx0d(pt.x);
pt.y = JS.SymmetryDesc.approx0d(pt.y);
pt.z = JS.SymmetryDesc.approx0d(pt.z);
}return pt;
}, "JU.T3");
c$.approx0d = Clazz_defineMethod(c$, "approx0d", 
function(x){
return (Math.abs(x) < 0.0001 ? 0 : x);
}, "~N");
Clazz_defineMethod(c$, "getSymmetryInfo", 
function(iatom, uc, xyz, op, translation, pt, pt2, id, type, scaleFactor, nth, options, isSpaceGroup){
var returnType = 0;
var nullRet = JS.SymmetryDesc.nullReturn(type);
var bsMore = 0;
switch (type) {
case 1073741994:
return "" + uc.getLatticeType();
case 1073742001:
returnType = 1073742001;
break;
case 135176:
returnType = 135176;
break;
case 1145045003:
returnType = JS.SymmetryDesc.getKeyType("matrix");
bsMore = 24;
break;
case 1275068418:
returnType = JS.SymmetryDesc.getType(id);
switch (returnType) {
case 1145045003:
returnType = JS.SymmetryDesc.getKeyType("matrix");
bsMore = 24;
break;
case 1095241729:
case 1153433601:
case 1073741961:
case 1073742001:
case 134217751:
case 1086326789:
case 36868:
case 1111492629:
case 1073742078:
type = returnType;
break;
default:
returnType = JS.SymmetryDesc.getKeyType(id);
break;
}
break;
}
var bsInfo = JS.SymmetryDesc.getInfoBS(returnType);
if (bsMore > 21) bsInfo.set(bsMore);
var isSpaceGroupAll = (nth == -2);
var iop = op;
var iop0 = op;
var offset = (options == 1073742066 && (type == 1153433601 || type == 134217751) ? pt2 : null);
if (offset != null) pt2 = null;
var info = null;
var xyzOriginal = null;
var ops = null;
var nDim = (uc == null ? 3 : uc.getDimensionality());
if (pt2 == null) {
if (xyz == null) {
ops = (isSpaceGroupAll ? uc.getAdditionalOperations() : uc.getSymmetryOperations());
if (ops == null || Math.abs(op) > ops.length) return nullRet;
if (op == 0) return nullRet;
iop = Math.abs(op) - 1;
xyz = (translation == null ? ops[iop].xyz : ops[iop].getxyzTrans(translation));
xyzOriginal = ops[iop].xyzOriginal;
} else {
iop = op = 0;
}var symTemp =  new JS.Symmetry();
symTemp.setSpaceGroup(false);
var isBio = (uc != null && uc.isBio());
var i = (isBio ? symTemp.addBioMoleculeOperation((uc.getSpaceGroup()).finalOperations[iop], op < 0) : symTemp.addSpaceGroupOperation((op < 0 ? "!" : "=") + (xyz.indexOf("x") >= 0 && xyz.indexOf("z") < 0 ? xyz + ",z" : xyz), Math.abs(op)));
if (i < 0) return nullRet;
var opTemp = symTemp.getSpaceGroupOperation(i);
if (isSpaceGroup) {
opTemp.iCoincident = ops[iop].iCoincident;
}if (isSpaceGroupAll) {
opTemp.isIrrelevant = ops[iop].isIrrelevant;
}if (xyzOriginal != null) {
opTemp.xyzOriginal = xyzOriginal;
opTemp.timeReversal = ops[iop].timeReversal;
opTemp.spinU = ops[iop].spinU;
}opTemp.number = (op == 0 ? iop0 : op);
if (!isBio) opTemp.getCentering();
if (pt == null && iatom >= 0) pt = this.modelSet.at[iatom];
if (type == 134217751 || type == 1153433601) {
if (isBio || pt == null) return nullRet;
symTemp.setUnitCell(uc);
JS.SymmetryDesc.ptemp.setT(pt);
uc.toFractional(JS.SymmetryDesc.ptemp, false);
if (Float.isNaN(JS.SymmetryDesc.ptemp.x)) return nullRet;
var sympt =  new JU.P3();
symTemp.newSpaceGroupPoint(JS.SymmetryDesc.ptemp, i, null, 0, 0, 0, sympt);
if (options == 1073742066) {
uc.unitize(sympt);
sympt.add(offset);
}symTemp.toCartesian(sympt, false);
var ret = sympt;
return (type == 1153433601 ? this.getAtom(uc, this.iModel, iatom, ret) : ret);
}info = this.createInfoArray(opTemp, uc, pt, null, (id == null || id.equals("array") ? "sym_" : id), scaleFactor, options, (translation != null), bsInfo, isSpaceGroup, isSpaceGroupAll, nDim);
if (type == 1275068418 && id != null && returnType != -11) {
returnType = JS.SymmetryDesc.getKeyType(id);
}} else {
var stype = "info";
var asString = false;
switch (type) {
case 1275068418:
if (returnType != -11) returnType = JS.SymmetryDesc.getKeyType(id);
id = stype = null;
if (nth == 0) nth = -1;
break;
case 1073742001:
id = stype = null;
if (nth == 0) nth = -1;
asString = true;
bsInfo.set(22);
bsInfo.set(0);
bsInfo.set(19);
break;
case 135176:
if (id == null) id = (isSpaceGroup ? "sg" : "sym_");
stype = "all";
asString = true;
break;
case 1153433601:
id = stype = null;
default:
if (nth == 0) nth = 1;
}
var ret1 = this.getSymopInfoForPoints(uc, this.iModel, op, translation, pt, pt2, id, stype, scaleFactor, nth, options, bsInfo);
if (asString) {
return ret1;
}if ((typeof(ret1)=='string')) return nullRet;
info = ret1;
if (type == 1153433601) {
if (!(Clazz_instanceOf(pt,"JM.Atom")) && !(Clazz_instanceOf(pt2,"JM.Atom"))) iatom = -1;
return (info == null ? nullRet : this.getAtom(uc, this.iModel, iatom, info[7]));
}}if (info == null) return nullRet;
var isList = (info.length > 0 && Clazz_instanceOf(info[0],Array));
if (nth < 0 && op <= 0 && xyz == null && (type == 1275068418 || isList)) {
if (type == 1275068418 && info.length > 0 && !(Clazz_instanceOf(info[0],Array))) info =  Clazz_newArray(-1, [info]);
var lst =  new JU.Lst();
for (var i = 0; i < info.length; i++) lst.addLast(JS.SymmetryDesc.getInfo(info[i], returnType < 0 ? returnType : type, nDim));

return lst;
} else if (returnType < 0 && (nth >= 0 || op > 0 || xyz != null)) {
type = returnType;
}if (nth > 0 && isList) info = info[0];
if (type == 135176 && isSpaceGroup && nth == -2) type = 134217764;
return JS.SymmetryDesc.getInfo(info, type, nDim);
}, "~N,J.api.SymmetryInterface,~S,~N,JU.P3,JU.P3,JU.P3,~S,~N,~N,~N,~N,~B");
Clazz_defineMethod(c$, "getAtom", 
function(uc, iModel, iAtom, sympt){
var bsElement = null;
if (iAtom >= 0) this.modelSet.getAtomBitsMDa(1094715402, Integer.$valueOf(this.modelSet.at[iAtom].getElementNumber()), bsElement =  new JU.BS());
var bsResult =  new JU.BS();
this.modelSet.getAtomsWithin(0.02, sympt, bsResult, iModel);
if (bsElement != null) bsResult.and(bsElement);
if (bsResult.isEmpty()) {
sympt = JU.P3.newP(sympt);
uc.toUnitCell(sympt, null);
uc.toCartesian(sympt, false);
this.modelSet.getAtomsWithin(0.02, sympt, bsResult, iModel);
if (bsElement != null) bsResult.and(bsElement);
}return bsResult;
}, "J.api.SymmetryInterface,~N,~N,JU.T3");
c$.ptemp =  new JU.P3();
c$.ptemp2 =  new JU.P3();
c$.pta01 =  new JU.P3();
c$.pta02 =  new JU.P3();
c$.vtrans =  new JU.V3();
c$.keys =  Clazz_newArray(-1, ["xyz", "xyzOriginal", "label", null, "fractionalTranslation", "cartesianTranslation", "inversionCenter", null, "axisVector", "rotationAngle", "matrix", "unitTranslation", "centeringVector", "timeReversal", "plane", "_type", "id", "cif2", "xyzCanonical", "xyzNormalized", "spin"]);
});
;//5.0.1-v7 Wed Mar 25 00:33:43 CDT 2026
Clazz_declarePackage("JS");
Clazz_load(["JU.SimpleUnitCell", "JU.P3", "JV.JC"], "JS.UnitCell", ["java.util.Hashtable", "JU.AU", "$.Lst", "$.M3", "$.M4", "$.P4", "$.PT", "$.Quat", "$.V3", "J.api.Interface", "JS.Symmetry", "JU.BoxInfo", "$.Escape", "$.Point3fi"], function(){
var c$ = Clazz_decorateAsClass(function(){
this.moreInfo = null;
this.name = "";
this.vertices = null;
this.fractionalOffset = null;
this.allFractionalRelative = false;
this.cartesianOffset = null;
this.unitCellMultiplier = null;
this.unitCellMultiplied = null;
this.f2c = null;
this.spinFrameFromCartXYZ = null;
this.spinFrameToCartXYZ = null;
Clazz_instantialize(this, arguments);}, JS, "UnitCell", JU.SimpleUnitCell, Cloneable);
Clazz_prepareFields (c$, function(){
this.cartesianOffset =  new JU.P3();
});
c$.fromOABC = Clazz_defineMethod(c$, "fromOABC", 
function(oabc, setRelative){
var c =  new JS.UnitCell();
if (oabc.length == 3) oabc =  Clazz_newArray(-1, [ new JU.P3(), oabc[0], oabc[1], oabc[2]]);
var parameters =  Clazz_newFloatArray(-1, [-1, 0, 0, 0, 0, 0, oabc[1].x, oabc[1].y, oabc[1].z, oabc[2].x, oabc[2].y, oabc[2].z, oabc[3].x, oabc[3].y, oabc[3].z]);
c.init(parameters);
c.allFractionalRelative = setRelative;
c.initUnitcellVertices();
c.setCartesianOffset(oabc[0]);
return c;
}, "~A,~B");
c$.fromParams = Clazz_defineMethod(c$, "fromParams", 
function(params, setRelative, slop){
var c =  new JS.UnitCell();
c.init(params);
c.initUnitcellVertices();
c.allFractionalRelative = setRelative;
c.setPrecision(slop);
if (params.length > 26) params[26] = slop;
return c;
}, "~A,~B,~N");
c$.cloneUnitCell = Clazz_defineMethod(c$, "cloneUnitCell", 
function(uc){
var ucnew = null;
try {
ucnew = uc.clone();
} catch (e) {
if (Clazz_exceptionOf(e,"CloneNotSupportedException")){
} else {
throw e;
}
}
return ucnew;
}, "JS.UnitCell");
Clazz_defineMethod(c$, "checkPeriodic", 
function(pt, packing, packing2){
var min;
var max;
if (Float.isNaN(packing)) {
min = -this.slop;
} else {
min = -packing;
}if (Float.isNaN(packing2)) {
max = 1 - this.slop;
} else {
max = 1 + packing2;
}switch (this.dimension) {
case 3:
if (pt.z < min || pt.z > max) return false;
case 2:
if (pt.y < min || pt.y > max) return false;
case 1:
if (pt.x < min || pt.x > max) return false;
}
return true;
}, "JU.P3,~N,~N");
Clazz_defineMethod(c$, "isWithinUnitCell", 
function(a, b, c, packing, pt){
if (Float.isNaN(packing)) packing = this.slop;
switch (this.dimension) {
case 3:
if (pt.z < c - 1 - packing || pt.z > c + packing) return false;
case 2:
if (pt.y < b - 1 - packing || pt.y > b + packing) return false;
case 1:
if (pt.x < a - 1 - packing || pt.x > a + packing) return false;
}
return true;
}, "~N,~N,~N,~N,JU.P3");
Clazz_defineMethod(c$, "dumpInfo", 
function(isDebug, multiplied){
var m = (multiplied ? this.getUnitCellMultiplied() : this);
if (m !== this) return m.dumpInfo(isDebug, false);
return "a=" + this.a + ", b=" + this.b + ", c=" + this.c + ", alpha=" + this.alpha + ", beta=" + this.beta + ", gamma=" + this.gamma + "\noabc=" + JU.Escape.eAP(this.getUnitCellVectors()) + "\nvolume=" + this.volume + (isDebug ? "\nfractional to cartesian: " + this.matrixFractionalToCartesian + "\ncartesian to fractional: " + this.matrixCartesianToFractional : "");
}, "~B,~B");
Clazz_defineMethod(c$, "fix000", 
function(x){
return (Math.abs(x) < 0.001 ? 0 : x);
}, "~N");
Clazz_defineMethod(c$, "fixFloor", 
function(d){
return (d == 1 ? 0 : d);
}, "~N");
Clazz_defineMethod(c$, "getCanonicalCopy", 
function(scale, withOffset){
var pts = this.getScaledCell(withOffset);
return JU.BoxInfo.getCanonicalCopy(pts, scale);
}, "~N,~B");
Clazz_defineMethod(c$, "getCanonicalCopyTrimmed", 
function(frac, scale){
var pts = this.getScaledCellMult(frac, true);
return JU.BoxInfo.getCanonicalCopy(pts, scale);
}, "JU.P3,~N");
Clazz_defineMethod(c$, "getCartesianOffset", 
function(){
return this.cartesianOffset;
});
Clazz_defineMethod(c$, "getCellWeight", 
function(pt){
var f = 1;
if (pt.x <= this.slop || pt.x >= 1 - this.slop) f /= 2;
if (pt.y <= this.slop || pt.y >= 1 - this.slop) f /= 2;
if (pt.z <= this.slop || pt.z >= 1 - this.slop) f /= 2;
return f;
}, "JU.P3");
Clazz_defineMethod(c$, "getConventionalUnitCell", 
function(latticeType, primitiveToCrystal){
var oabc = this.getUnitCellVectors();
if (!latticeType.equals("P") || primitiveToCrystal != null) this.toFromPrimitive(false, latticeType.charAt(0), oabc, primitiveToCrystal);
return oabc;
}, "~S,JU.M3");
Clazz_defineMethod(c$, "getEquivalentPoints", 
function(pt, flags, ops, list, i0, n0, dup0, periodicity, packing){
var fromfractional = (flags.indexOf("fromfractional") >= 0);
var tofractional = (flags.indexOf("tofractional") >= 0);
var adjustA = ((periodicity & 0x1) != 0);
var adjustB = ((periodicity & 0x2) != 0);
var adjustC = ((periodicity & 0x4) != 0);
var haveSpin = (pt.sD >= 0);
var v = (haveSpin ?  new JU.V3() : null);
if (list == null) list =  new JU.Lst();
var n = list.size();
var pf = JU.Point3fi.newPF(pt, pt.i);
if (!fromfractional) this.toFractional(pf, true);
for (var i = 0, nops = ops.length; i < nops; i++) {
var p = JU.Point3fi.newPF(pf, pt.i);
p.mi = i;
ops[i].rotTrans(p);
if (adjustA) p.x = this.fixFloor(p.x - Clazz_doubleToInt(Math.floor(p.x)));
if (adjustB) p.y = this.fixFloor(p.y - Clazz_doubleToInt(Math.floor(p.y)));
if (adjustC) p.z = this.fixFloor(p.z - Clazz_doubleToInt(Math.floor(p.z)));
if (haveSpin) {
v.set(pt.sX, pt.sY, pt.sZ);
(ops[i]).rotateSpin(v);
p.sX = Math.round(v.x);
p.sY = Math.round(v.y);
p.sZ = Math.round(v.z);
p.sD = pt.sD;
}list.addLast(p);
n++;
}
if (packing >= 0) {
if (!adjustC) {
var offset = JU.P3.new3(0, 0, 0.5);
for (var i = n0; i < n; i++) {
list.get(i).add(offset);
}
}if (!adjustB) {
var offset = JU.P3.new3(0, 0.5, 0);
for (var i = n0; i < n; i++) {
list.get(i).add(offset);
}
}if (!adjustA) {
var offset = JU.P3.new3(0.5, 0, 0);
for (var i = n0; i < n; i++) {
list.get(i).add(offset);
}
}for (var i = n0; i < n; i++) {
pf.setPF(pt = list.get(i));
this.unitizeRnd(pf);
if (pf.x == 0) {
list.addLast(JS.UnitCell.newPt(pt, 0, pf.y, pf.z, pf.i));
list.addLast(JS.UnitCell.newPt(pt, 1, pf.y, pf.z, pf.i));
if (pf.y == 0) {
list.addLast(JS.UnitCell.newPt(pt, 1, 1, pf.z, pf.i));
list.addLast(JS.UnitCell.newPt(pt, 0, 0, pf.z, pf.i));
if (pf.z == 0) {
list.addLast(JS.UnitCell.newPt(pt, 1, 1, 1, pf.i));
list.addLast(JS.UnitCell.newPt(pt, 0, 0, 0, pf.i));
}}}if (pf.y == 0) {
list.addLast(JS.UnitCell.newPt(pt, pf.x, 0, pf.z, pf.i));
list.addLast(JS.UnitCell.newPt(pt, pf.x, 1, pf.z, pf.i));
if (pf.z == 0) {
list.addLast(JS.UnitCell.newPt(pt, pf.x, 0, 0, pf.i));
list.addLast(JS.UnitCell.newPt(pt, pf.x, 1, 1, pf.i));
}}if (pf.z == 0) {
list.addLast(JS.UnitCell.newPt(pt, pf.x, pf.y, 0, pf.i));
list.addLast(JS.UnitCell.newPt(pt, pf.x, pf.y, 1, pf.i));
if (pf.x == 0) {
list.addLast(JS.UnitCell.newPt(pt, 0, pf.y, 0, pf.i));
list.addLast(JS.UnitCell.newPt(pt, 1, pf.y, 1, pf.i));
}}}
if (packing > 0) {
if (adjustA) {
n = list.size();
for (var i = n0; i < n; i++) {
pf.setT(pt = list.get(i));
if (pf.x < packing) list.addLast(pt = JS.UnitCell.newPt(pt, pf.x + 1, pf.y, pf.z, pf.i));
if (pf.x > 1 - packing) list.addLast(pt = JS.UnitCell.newPt(pt, pf.x - 1, pf.y, pf.z, pf.i));
}
}if (adjustB) {
n = list.size();
for (var i = n0; i < n; i++) {
pf.setT(list.get(i));
if (pf.y < packing) list.addLast(JS.UnitCell.newPt(pt, pf.x, pf.y + 1, pf.z, pf.i));
if (pf.y > 1 - packing) list.addLast(JS.UnitCell.newPt(pt, pf.x, pf.y - 1, pf.z, pf.i));
}
}if (adjustC) {
n = list.size();
for (var i = n0; i < n; i++) {
pf.setT(list.get(i));
if (pf.z < packing) list.addLast(JS.UnitCell.newPt(pt, pf.x, pf.y, pf.z + 1, pf.i));
if (pf.z > 1 - packing) list.addLast(JS.UnitCell.newPt(pt, pf.x, pf.y, pf.z - 1, pf.i));
}
}}n = list.size();
if (!adjustA) {
var offset = JU.P3.new3(-0.5, 0, 0);
for (var i = n0; i < n; i++) {
list.get(i).add(offset);
}
}if (!adjustB) {
var offset = JU.P3.new3(0, -0.5, 0);
for (var i = n0; i < n; i++) {
list.get(i).add(offset);
}
}if (!adjustC) {
var offset = JU.P3.new3(0, 0, -0.5);
for (var i = n0; i < n; i++) {
list.get(i).add(offset);
}
}}JS.UnitCell.removeDuplicates(list, i0, dup0, -1);
if (!tofractional) {
for (var i = list.size(); --i >= n0; ) this.toCartesian(list.get(i), true);

}return list;
}, "JU.Point3fi,~S,~A,JU.Lst,~N,~N,~N,~N,~N");
c$.newPt = Clazz_defineMethod(c$, "newPt", 
function(pt, x, y, z, i){
var p = JU.Point3fi.new4(x, y, z, i);
p.sX = pt.sX;
p.sY = pt.sY;
p.sZ = pt.sZ;
p.sD = pt.sD;
p.mi = pt.mi;
return p;
}, "JU.Point3fi,~N,~N,~N,~N");
Clazz_defineMethod(c$, "getFractionalOffset", 
function(){
return this.fractionalOffset;
});
Clazz_defineMethod(c$, "getInfo", 
function(){
var m = this.getUnitCellMultiplied();
if (m !== this) return m.getInfo();
var info =  new java.util.Hashtable();
var a =  Clazz_newFloatArray (18, 0);
System.arraycopy(this.getUnitCellAsArray(false), 0, a, 0, 18);
info.put("params", a);
info.put("oabc", this.getUnitCellVectors());
info.put("volume", Float.$valueOf(this.volume));
info.put("matFtoC", this.matrixFractionalToCartesian);
info.put("matCtoF", this.matrixCartesianToFractional);
info.put("dimension", Integer.$valueOf(this.dimension));
info.put("dimensionType", Integer.$valueOf(this.dimensionType));
info.put("isHexagonal", Boolean.$valueOf(this.getInfo(8) != 0));
info.put("isRhombohedral", Boolean.$valueOf(this.getInfo(9) != 0));
if (this.fractionalOffset != null) {
info.put("cartesianOffset", this.cartesianOffset);
info.put("fractionalOffset", this.fractionalOffset);
}if (this.unitCellMultiplier != null) {
info.put("unitCellMultiplier", this.unitCellMultiplier);
}if (this.unitCellMultiplied != null) {
info.put("unitCellMultiplied", this.unitCellMultiplied);
}info.put("slop", Float.$valueOf(this.slop));
return info;
});
Clazz_defineMethod(c$, "getQuaternionRotation", 
function(abc){
var a = JU.V3.newVsub(this.vertices[4], this.vertices[0]);
var b = JU.V3.newVsub(this.vertices[2], this.vertices[0]);
var c = JU.V3.newVsub(this.vertices[1], this.vertices[0]);
var x =  new JU.P3();
var v =  new JU.P3();
var mul = (abc.charAt(0) == '-' ? -1 : 1);
if (mul < 0) abc = abc.substring(1);
var abc0 = abc;
abc = JU.PT.rep(JU.PT.rep(JU.PT.rep(JU.PT.rep(JU.PT.rep(JU.PT.rep(abc, "ab", "A"), "bc", "B"), "ca", "C"), "ba", "D"), "cb", "E"), "ac", "F");
var isFace = !abc0.equals(abc);
var quadrant = (isFace ? 1 : 0);
if (abc.length == 2) {
quadrant = (abc.charAt(1)).charCodeAt(0) - 48;
abc = abc.substring(0, 1);
}var isEven = (quadrant % 2 == 0);
var axis = "abcABCDEF".indexOf(abc);
var v1;
var v2;
var v3;
switch (axis) {
case 7:
mul = -mul;
case 4:
a.cross(c, b);
quadrant = ((5 - quadrant) % 4) + 1;
case 0:
default:
v1 = a;
v2 = c;
v3 = b;
break;
case 8:
mul = -mul;
case 5:
mul = -mul;
b.cross(c, a);
quadrant = ((2 + quadrant) % 4) + 1;
case 1:
v1 = b;
v2 = a;
v3 = c;
mul = -mul;
break;
case 3:
mul = -mul;
case 6:
c.cross(a, b);
if (isEven) quadrant = 6 - quadrant;
case 2:
v1 = c;
v2 = a;
v3 = b;
if (!isFace && quadrant > 0) {
quadrant = 5 - quadrant;
}break;
}
if (quadrant > 0) {
if (mul > 0 != isEven) {
v2 = v3;
v1.scale(-1);
}}switch (quadrant) {
case 0:
default:
case 1:
break;
case 2:
v1.scale(-1);
v2.scale(-1);
break;
case 3:
v2.scale(-1);
break;
case 4:
v1.scale(-1);
break;
}
x.cross(v1, v2);
v.cross(x, v1);
return JU.Quat.getQuaternionFrame(null, v, x).inv();
}, "~S");
Clazz_defineMethod(c$, "getScaledCell", 
function(withOffset){
return this.getScaledCellMult(null, withOffset);
}, "~B");
Clazz_defineMethod(c$, "getScaledCellMult", 
function(mult, withOffset){
var pts =  new Array(8);
var cell0 = null;
var cell1 = null;
var isFrac = (mult != null);
if (!isFrac) mult = this.unitCellMultiplier;
if (withOffset && mult != null && mult.z == 0) {
cell0 =  new JU.P3();
cell1 =  new JU.P3();
JU.SimpleUnitCell.ijkToPoint3f(Clazz_floatToInt(mult.x), cell0, 0, 0);
JU.SimpleUnitCell.ijkToPoint3f(Clazz_floatToInt(mult.y), cell1, 0, 0);
cell1.sub(cell0);
}var scale = (isFrac || mult == null || mult.z == 0 ? 1 : Math.abs(mult.z));
for (var i = 0; i < 8; i++) {
var pt = pts[i] = JU.P3.newP(JU.BoxInfo.unitCubePoints[i]);
if (cell0 != null) {
pts[i].add3(cell0.x + cell1.x * pt.x, cell0.y + cell1.y * pt.y, cell0.z + cell1.z * pt.z);
} else if (isFrac) {
pt.scaleT(mult);
}pts[i].scale(scale);
this.matrixFractionalToCartesian.rotTrans(pt);
if (!withOffset) pt.sub(this.cartesianOffset);
}
return pts;
}, "JU.T3,~B");
Clazz_defineMethod(c$, "getState", 
function(){
var s = "";
if (this.fractionalOffset != null && this.fractionalOffset.lengthSquared() != 0) s += "  unitcell offset " + JU.Escape.eP(this.fractionalOffset) + ";\n";
if (this.unitCellMultiplier != null) s += "  unitcell range " + JU.SimpleUnitCell.escapeMultiplier(this.unitCellMultiplier) + ";\n";
return s;
});
Clazz_defineMethod(c$, "getTensor", 
function(vwr, parBorU){
var t = (J.api.Interface.getUtil("Tensor", vwr, "file"));
if (parBorU[0] == 0 && parBorU[1] == 0 && parBorU[2] == 0) {
var f = parBorU[7];
var eigenValues =  Clazz_newFloatArray(-1, [f, f, f]);
return t.setFromEigenVectors(JS.UnitCell.unitVectors, eigenValues, "iso", "Uiso=" + f, null);
}t.parBorU = parBorU;
var Bcart =  Clazz_newDoubleArray (6, 0);
var ortepType = Clazz_floatToInt(parBorU[6]);
if (ortepType == 12) {
Bcart[0] = parBorU[0] * 19.739208802178716;
Bcart[1] = parBorU[1] * 19.739208802178716;
Bcart[2] = parBorU[2] * 19.739208802178716;
Bcart[3] = parBorU[3] * 19.739208802178716 * 2;
Bcart[4] = parBorU[4] * 19.739208802178716 * 2;
Bcart[5] = parBorU[5] * 19.739208802178716 * 2;
parBorU[7] = (parBorU[0] + parBorU[1] + parBorU[3]) / 3;
} else {
var isFractional = (ortepType == 4 || ortepType == 5 || ortepType == 8 || ortepType == 9);
var cc = 2 - (ortepType % 2);
var dd = (ortepType == 8 || ortepType == 9 || ortepType == 10 ? 19.739208802178716 : ortepType == 4 || ortepType == 5 ? 0.25 : ortepType == 2 || ortepType == 3 ? Math.log(2) : 1);
var B11 = parBorU[0] * dd * (isFractional ? this.a_ * this.a_ : 1);
var B22 = parBorU[1] * dd * (isFractional ? this.b_ * this.b_ : 1);
var B33 = parBorU[2] * dd * (isFractional ? this.c_ * this.c_ : 1);
var B12 = parBorU[3] * dd * (isFractional ? this.a_ * this.b_ : 1) * cc;
var B13 = parBorU[4] * dd * (isFractional ? this.a_ * this.c_ : 1) * cc;
var B23 = parBorU[5] * dd * (isFractional ? this.b_ * this.c_ : 1) * cc;
parBorU[7] = Math.pow(B11 / 19.739208802178716 / this.a_ / this.a_ * B22 / 19.739208802178716 / this.b_ / this.b_ * B33 / 19.739208802178716 / this.c_ / this.c_, 0.3333);
Bcart[0] = this.a * this.a * B11 + this.b * this.b * this.cosGamma * this.cosGamma * B22 + this.c * this.c * this.cosBeta * this.cosBeta * B33 + this.a * this.b * this.cosGamma * B12 + this.b * this.c * this.cosGamma * this.cosBeta * B23 + this.a * this.c * this.cosBeta * B13;
Bcart[1] = this.b * this.b * this.sinGamma * this.sinGamma * B22 + this.c * this.c * this.cA_ * this.cA_ * B33 + this.b * this.c * this.cA_ * this.sinGamma * B23;
Bcart[2] = this.c * this.c * this.cB_ * this.cB_ * B33;
Bcart[3] = 2 * this.b * this.b * this.cosGamma * this.sinGamma * B22 + 2 * this.c * this.c * this.cA_ * this.cosBeta * B33 + this.a * this.b * this.sinGamma * B12 + this.b * this.c * (this.cA_ * this.cosGamma + this.sinGamma * this.cosBeta) * B23 + this.a * this.c * this.cA_ * B13;
Bcart[4] = 2 * this.c * this.c * this.cB_ * this.cosBeta * B33 + this.b * this.c * this.cosGamma * B23 + this.a * this.c * this.cB_ * B13;
Bcart[5] = 2 * this.c * this.c * this.cA_ * this.cB_ * B33 + this.b * this.c * this.cB_ * this.sinGamma * B23;
}return t.setFromThermalEquation(Bcart, JU.Escape.eAF(parBorU));
}, "JV.Viewer,~A");
Clazz_defineMethod(c$, "getUnitCellMultiplied", 
function(){
if (this.unitCellMultiplier == null || this.unitCellMultiplier.z > 0 && this.unitCellMultiplier.z == Clazz_floatToInt(this.unitCellMultiplier.z)) return this;
if (this.unitCellMultiplied == null) {
var pts = JU.BoxInfo.toOABC(this.getScaledCell(true), null);
this.unitCellMultiplied = JS.UnitCell.fromOABC(pts, false);
}return this.unitCellMultiplied;
});
Clazz_defineMethod(c$, "getUnitCellMultiplier", 
function(){
return this.unitCellMultiplier;
});
Clazz_defineMethod(c$, "isStandard", 
function(){
return (this.unitCellMultiplier == null || this.unitCellMultiplier.x == this.unitCellMultiplier.y);
});
Clazz_defineMethod(c$, "getUnitCellVectors", 
function(){
var m = this.matrixFractionalToCartesian;
return  Clazz_newArray(-1, [JU.P3.newP(this.cartesianOffset), JU.P3.new3(this.fix000(m.m00), this.fix000(m.m10), this.fix000(m.m20)), JU.P3.new3(this.fix000(m.m01), this.fix000(m.m11), this.fix000(m.m21)), JU.P3.new3(this.fix000(m.m02), this.fix000(m.m12), this.fix000(m.m22))]);
});
c$.toTrm = Clazz_defineMethod(c$, "toTrm", 
function(transform, trm){
if (trm == null) trm =  new JU.M4();
JS.UnitCell.getMatrixAndUnitCell(null, null, transform, trm);
return trm;
}, "~S,JU.M4");
c$.getMatrixAndUnitCell = Clazz_defineMethod(c$, "getMatrixAndUnitCell", 
function(vwr, uc, def, retMatrix){
if (def == null) def = "a,b,c";
var m;
var pts =  new Array(4);
var pt = pts[0] = JU.P3.new3(0, 0, 0);
pts[1] = JU.P3.new3(1, 0, 0);
pts[2] = JU.P3.new3(0, 1, 0);
pts[3] = JU.P3.new3(0, 0, 1);
var m3 =  new JU.M3();
if (JU.AU.isAD(def)) {
return JU.SimpleUnitCell.setAbcFromParams(def, pts);
}var isString = (typeof(def)=='string');
if (isString && (def).indexOf("(") >= 0) def = JU.SimpleUnitCell.parseSimpleMath(vwr, def);
if (isString && (def).charAt(0) == '[') {
def = JU.Escape.unescapeMatrix(def);
if (Clazz_instanceOf(def,"JU.M3")) {
def = JU.M4.newMV(def,  new JU.P3());
} else if (!(Clazz_instanceOf(def,"JU.M4"))) {
return null;
}if (retMatrix != null) {
retMatrix.setM4(def);
retMatrix = null;
}isString = false;
}if (isString) {
var sdef = def;
var strans;
var strans2 = null;
if (sdef.indexOf("a=") == 0) return JU.SimpleUnitCell.setAbc(sdef, null, pts);
if (sdef.indexOf(">") > 0) {
if (uc != null || retMatrix == null) return null;
var sdefs = sdef.$plit(">");
retMatrix.setIdentity();
var m4 =  new JU.M4();
for (var i = sdefs.length; --i >= 0; ) {
JS.UnitCell.getMatrixAndUnitCell(null, null, sdefs[i], m4);
retMatrix.mul2(m4, retMatrix);
}
return pts;
}var ret =  new Array(1);
var ptc = sdef.indexOf(";");
if (ptc >= 0) {
strans = sdef.substring(ptc + 1).trim();
sdef = sdef.substring(0, ptc);
ret[0] = sdef;
strans2 = JS.UnitCell.fixABC(ret);
if (sdef !== ret[0]) {
sdef = ret[0];
}} else if (sdef.equals("a,b,c")) {
strans = null;
} else {
if (sdef.indexOf("w") > 0) {
sdef = sdef.$replace('u', 'x').$replace('v', 'y').$replace('w', 'z');
}ret[0] = sdef;
strans = JS.UnitCell.fixABC(ret);
sdef = ret[0];
}sdef += ";0,0,0";
while (sdef.startsWith("!!")) sdef = sdef.substring(2);

var isRev = sdef.startsWith("!");
if (isRev) sdef = sdef.substring(1);
if (sdef.equals("r;0,0,0")) sdef = "2/3a+1/3b+1/3c,-1/3a+1/3b+1/3c,-1/3a-2/3b+1/3c" + sdef.substring(1);
 else if (sdef.equals("h;0,0,0")) sdef = "a-b,b-c,a+b+c" + sdef.substring(1);
var isABC = sdef.indexOf("x") < 0 && (sdef.indexOf("a") >= 0 || sdef.indexOf("b") >= 0 || sdef.indexOf("c") >= 0);
if (isABC && sdef.indexOf("*") >= 0 && uc != null) {
var mSpinPp = JU.M4.newM4(null);
var oabc = JS.UnitCell.getMatrixAndUnitCell(vwr, uc, "a,b,c", mSpinPp);
JS.UnitCell.getMatrixAndUnitCell(vwr, null, sdef.$replace('*', ' '), mSpinPp);
var flags =  Clazz_newBooleanArray(-1, [(sdef.indexOf("a*") >= 0), (sdef.indexOf("b*") >= 0), (sdef.indexOf("c*") >= 0)]);
m = JU.M4.newM4(null);
JS.UnitCell.adjustForReciprocal(uc, oabc, mSpinPp, flags, m, pts);
uc = null;
} else {
var symTemp =  new JS.Symmetry();
symTemp.setSpaceGroup(false);
var i = symTemp.addSpaceGroupOperation("=" + sdef, 0);
if (i < 0) return null;
m = symTemp.getSpaceGroupOperation(i);
(m).doFinalize();
var t =  new JU.P3();
JS.UnitCell.addTrans(strans, t);
JS.UnitCell.addTrans(strans2, t);
m.setTranslation(t);
}if (isABC) {
m.transpose33();
}if (isRev) {
m.invert();
}if (retMatrix != null) {
retMatrix.setM4(m);
}if (uc == null) return pts;
} else if (retMatrix != null || uc == null) {
return null;
} else if (Clazz_instanceOf(def,"JU.M3")) {
m = JU.M4.newMV(def,  new JU.P3());
} else if (Clazz_instanceOf(def,"JU.M4")) {
m = def;
} else {
m = (def)[0];
m.getRotationScale(m3);
m.rotTrans(pt);
uc.toCartesian(pt, false);
for (var i = 1; i < 4; i++) {
m3.rotate(pts[i]);
uc.toCartesian(pts[i], true);
}
return pts;
}m.getRotationScale(m3);
m.getTranslation(pt);
uc.toCartesian(pt, false);
for (var i = 1; i < 4; i++) {
m3.rotate(pts[i]);
uc.toCartesian(pts[i], true);
}
return pts;
}, "JV.Viewer,JU.SimpleUnitCell,~O,JU.M4");
c$.adjustForReciprocal = Clazz_defineMethod(c$, "adjustForReciprocal", 
function(uc, oabc, mSpinPp, flags, mRet, pts){
var recipOABC =  new Array(4);
JU.SimpleUnitCell.getReciprocal(oabc, recipOABC, 1);
var t =  new JU.P3();
var abc =  Clazz_newFloatArray (4, 0);
for (var i = 1; i <= 3; i++) {
var vnew =  new JU.P3();
mSpinPp.getColumn(i - 1, abc);
for (var j = 0; j < 3; j++) {
if (abc[j] == 0) continue;
vnew.scaleAdd2(abc[j], (flags[j] ? recipOABC[1 + j] : oabc[1 + j]), vnew);
}
pts[i] = vnew;
t.setP(vnew);
uc.toFractional(t, true);
mRet.setColumn4(i - 1, JS.UnitCell.fixZero(t.x, 1e-10), JS.UnitCell.fixZero(t.y, 1e-10), JS.UnitCell.fixZero(t.z, 1e-10), 0);
}
}, "JU.SimpleUnitCell,~A,JU.M4,~A,JU.M4,~A");
c$.fixZero = Clazz_defineMethod(c$, "fixZero", 
function(x, err){
return (Math.abs(x) < err ? 0 : x);
}, "~N,~N");
c$.addTrans = Clazz_defineMethod(c$, "addTrans", 
function(strans, t){
if (strans == null) return;
var atrans = JU.PT.split(strans, ",");
var ftrans =  Clazz_newFloatArray (3, 0);
if (atrans.length == 3) {
for (var j = 0; j < 3; j++) {
var s = atrans[j];
var sfpt = s.indexOf("/");
if (sfpt >= 0) {
ftrans[j] = JU.PT.parseFloat(s.substring(0, sfpt)) / JU.PT.parseFloat(s.substring(sfpt + 1));
} else {
ftrans[j] = JU.PT.parseFloat(s);
}}
}t.add3(ftrans[0], ftrans[1], ftrans[2]);
}, "~S,JU.P3");
c$.fixABC = Clazz_defineMethod(c$, "fixABC", 
function(ret){
var tokens = JU.PT.split(ret[0], ",");
if (tokens.length != 3) return null;
var trans = "";
var abc = "";
var haveT = false;
for (var i = 0; i < 3; i++) {
var a = tokens[i];
var p;
var n = 0;
for (p = a.length; --p >= 0; ) {
var c = a.charAt(p);
switch ((c).charCodeAt(0)) {
default:
if (c >= 'a') p = 0;
break;
case 43:
n = 1;
case 45:
p = -p;
break;
}
}
p = -1 - p;
if (p == 0) {
trans += ",0";
abc += "," + a;
} else {
haveT = true;
trans += "," + a.substring(p + n);
abc += "," + a.substring(0, p);
}}
ret[0] = abc.substring(1);
return (haveT ? trans.substring(1) : null);
}, "~A");
Clazz_defineMethod(c$, "getVertices", 
function(){
return this.vertices;
});
Clazz_defineMethod(c$, "hasOffset", 
function(){
return (this.fractionalOffset != null && this.fractionalOffset.lengthSquared() != 0);
});
Clazz_defineMethod(c$, "initOrientation", 
function(mat){
if (mat == null) return;
var m =  new JU.M4();
m.setToM3(mat);
this.matrixFractionalToCartesian.mul2(m, this.matrixFractionalToCartesian);
this.matrixCartesianToFractional.setM4(this.matrixFractionalToCartesian).invert();
this.initUnitcellVertices();
}, "JU.M3");
Clazz_defineMethod(c$, "initUnitcellVertices", 
function(){
if (this.matrixFractionalToCartesian == null) return;
this.matrixCtoFNoOffset = JU.M4.newM4(this.matrixCartesianToFractional);
this.matrixFtoCNoOffset = JU.M4.newM4(this.matrixFractionalToCartesian);
this.vertices =  new Array(8);
for (var i = 8; --i >= 0; ) this.vertices[i] = this.matrixFractionalToCartesian.rotTrans2(JU.BoxInfo.unitCubePoints[i],  new JU.P3());

});
Clazz_defineMethod(c$, "isSameAs", 
function(f2c2){
if (f2c2 == null) return false;
var f2c = this.getF2C();
for (var i = 0; i < 3; i++) {
for (var j = 0; j < 4; j++) {
if (!JU.SimpleUnitCell.approx0(f2c[i][j] - f2c2[i][j])) return false;
}
}
return true;
}, "~A");
Clazz_defineMethod(c$, "getF2C", 
function(){
if (this.f2c == null) {
this.f2c =  Clazz_newFloatArray (3, 4, 0);
for (var i = 0; i < 3; i++) this.matrixFractionalToCartesian.getRow(i, this.f2c[i]);

}return this.f2c;
});
Clazz_defineMethod(c$, "setCartesianOffset", 
function(origin){
this.cartesianOffset.setT(origin);
this.matrixFractionalToCartesian.m03 = this.cartesianOffset.x;
this.matrixFractionalToCartesian.m13 = this.cartesianOffset.y;
this.matrixFractionalToCartesian.m23 = this.cartesianOffset.z;
var wasOffset = this.hasOffset();
this.fractionalOffset = JU.P3.newP(this.cartesianOffset);
this.matrixCartesianToFractional.rotate(this.fractionalOffset);
this.matrixCartesianToFractional.m03 = -this.fractionalOffset.x;
this.matrixCartesianToFractional.m13 = -this.fractionalOffset.y;
this.matrixCartesianToFractional.m23 = -this.fractionalOffset.z;
if (this.allFractionalRelative) {
this.matrixCtoFNoOffset.setM4(this.matrixCartesianToFractional);
this.matrixFtoCNoOffset.setM4(this.matrixFractionalToCartesian);
}if (!wasOffset && this.fractionalOffset.lengthSquared() == 0) this.fractionalOffset = null;
this.f2c = null;
}, "JU.T3");
Clazz_defineMethod(c$, "setOffset", 
function(pt){
if (pt == null) return;
this.unitCellMultiplied = null;
var pt4 = (Clazz_instanceOf(pt,"JU.T4") ? pt : null);
var w = (pt4 == null ? 1.4E-45 : pt4.w);
var isCell555P4 = (w > 999999);
if (pt4 != null ? w <= 0 || isCell555P4 : pt.x >= 100 || pt.y >= 100) {
this.unitCellMultiplier = (pt.z == 0 && pt.x == pt.y && !isCell555P4 ? null : isCell555P4 ? JU.P4.newPt(pt4) : JU.P3.newP(pt));
this.unitCellMultiplied = null;
if (pt4 == null || pt4.w == 0 || isCell555P4) return;
}if (this.hasOffset() || pt.lengthSquared() > 0) {
this.fractionalOffset = JU.P3.newP(pt);
}this.matrixCartesianToFractional.m03 = -pt.x;
this.matrixCartesianToFractional.m13 = -pt.y;
this.matrixCartesianToFractional.m23 = -pt.z;
this.cartesianOffset.setT(pt);
this.matrixFractionalToCartesian.rotate(this.cartesianOffset);
this.matrixFractionalToCartesian.m03 = this.cartesianOffset.x;
this.matrixFractionalToCartesian.m13 = this.cartesianOffset.y;
this.matrixFractionalToCartesian.m23 = this.cartesianOffset.z;
if (this.allFractionalRelative) {
this.matrixCtoFNoOffset.setM4(this.matrixCartesianToFractional);
this.matrixFtoCNoOffset.setM4(this.matrixFractionalToCartesian);
}this.f2c = null;
}, "JU.T3");
Clazz_defineMethod(c$, "toFromPrimitive", 
function(toPrimitive, type, uc, primitiveToCrystal){
var offset = uc.length - 3;
var mf = null;
if (type == 'r' || primitiveToCrystal == null) {
switch ((type).charCodeAt(0)) {
default:
return false;
case 114:
JU.SimpleUnitCell.getReciprocal(uc, uc, 1);
return true;
case 80:
toPrimitive = true;
case 65:
case 66:
case 67:
case 82:
case 73:
case 70:
mf = JS.UnitCell.getPrimitiveTransform(type);
break;
}
if (!toPrimitive) mf.invert();
} else {
mf = JU.M3.newM3(primitiveToCrystal);
if (toPrimitive) mf.invert();
}for (var i = uc.length; --i >= offset; ) {
var p = uc[i];
this.toFractional(p, true);
mf.rotate(p);
this.toCartesian(p, true);
}
return true;
}, "~B,~S,~A,JU.M3");
c$.getPrimitiveTransform = Clazz_defineMethod(c$, "getPrimitiveTransform", 
function(type){
switch ((type).charCodeAt(0)) {
case 80:
return JU.M3.newA9( Clazz_newFloatArray(-1, [1, 0, 0, 0, 1, 0, 0, 0, 1]));
case 65:
return JU.M3.newA9( Clazz_newFloatArray(-1, [1, 0, 0, 0, 0.5, 0.5, 0, -0.5, 0.5]));
case 66:
return JU.M3.newA9( Clazz_newFloatArray(-1, [0.5, 0, 0.5, 0, 1, 0, -0.5, 0, 0.5]));
case 67:
return JU.M3.newA9( Clazz_newFloatArray(-1, [0.5, 0.5, 0, -0.5, 0.5, 0, 0, 0, 1]));
case 82:
return JU.M3.newA9( Clazz_newFloatArray(-1, [0.6666667, -0.33333334, -0.33333334, 0.33333334, 0.33333334, -0.6666667, 0.33333334, 0.33333334, 0.33333334]));
case 73:
return JU.M3.newA9( Clazz_newFloatArray(-1, [-0.5, .5, .5, .5, -0.5, .5, .5, .5, -0.5]));
case 70:
return JU.M3.newA9( Clazz_newFloatArray(-1, [0, 0.5, 0.5, 0.5, 0, 0.5, 0.5, 0.5, 0]));
}
return null;
}, "~S");
Clazz_defineMethod(c$, "toUnitCell", 
function(pt, offset){
if (this.matrixCartesianToFractional == null) return;
if (offset == null) {
this.matrixCartesianToFractional.rotTrans(pt);
this.unitize(pt);
this.matrixFractionalToCartesian.rotTrans(pt);
} else {
this.matrixCtoFNoOffset.rotTrans(pt);
this.unitize(pt);
pt.add(offset);
this.matrixFtoCNoOffset.rotTrans(pt);
}}, "JU.T3,JU.T3");
Clazz_defineMethod(c$, "toUnitCellRnd", 
function(pt, offset){
if (this.matrixCartesianToFractional == null) return;
if (offset == null) {
this.matrixCartesianToFractional.rotTrans(pt);
this.unitizeRnd(pt);
this.matrixFractionalToCartesian.rotTrans(pt);
} else {
this.matrixCtoFNoOffset.rotTrans(pt);
this.unitizeRnd(pt);
pt.add(offset);
this.matrixFtoCNoOffset.rotTrans(pt);
}}, "JU.T3,JU.T3");
Clazz_defineMethod(c$, "unitize", 
function(pt){
this.unitizeDim(this.dimension, pt);
}, "JU.T3");
Clazz_defineMethod(c$, "unitizeRnd", 
function(pt){
JU.SimpleUnitCell.unitizeDimRnd(this.dimension, pt, this.slop);
}, "JU.T3");
c$.removeDuplicates = Clazz_defineMethod(c$, "removeDuplicates", 
function(list, i0, n0, n){
if (n < 0) n = list.size();
for (var i = i0; i < n; i++) {
var p = list.get(i);
for (var j = Math.max(i + 1, n0); j < n; j++) {
if (list.get(j).distanceSquared(p) < 1.96E-6) {
list.removeItemAt(j);
n--;
j--;
}}
}
}, "JU.Lst,~N,~N,~N");
Clazz_defineMethod(c$, "getCenter", 
function(periodicity){
var center =  new JU.P3();
var off = this.getCartesianOffset();
var pts = this.getVertices();
var j2;
var jd;
switch (periodicity) {
default:
case 0x7:
j2 = 8;
jd = 1;
break;
case 0x3:
j2 = 8;
jd = 2;
break;
case 0x4:
j2 = 2;
jd = 1;
break;
case 0x2:
j2 = 3;
jd = 2;
break;
case 0x1:
j2 = 8;
jd = 4;
break;
}
var n = 0;
for (var j = 0; j < j2; j += jd) {
center.add(pts[j]);
center.add(off);
n++;
}
center.scale(1 / n);
return center;
}, "~N");
Clazz_defineMethod(c$, "setSpinAxisAngle", 
function(aa){
if (this.moreInfo == null) {
this.moreInfo =  new JU.Lst();
}var s = "rotation_axis_xyz=";
var a = "rotation_angle=";
var ptAxis = -1;
var ptAngle = -1;
for (var i = this.moreInfo.size(); --i >= 0 && (ptAxis < 0 || ptAngle < 0); ) {
var s0 = this.moreInfo.get(i);
if (s0.startsWith(s)) {
ptAxis = i;
} else if (s0.startsWith(a)) {
ptAngle = i;
}}
var q = JU.Quat.newAA(aa);
var v =  new JU.V3();
if (JS.UnitCell.v0 == null) JS.UnitCell.v0 = JU.V3.new3(3.141592653589793, 2.718281828459045, Math.sqrt(2));
v = q.getNormalDirected(JS.UnitCell.v0);
JU.V3.newV(aa);
this.toFractional(v, true);
v.normalize();
var f = this.getAxisMultiplier(v);
s += "" + Math.round(v.x * f) + "," + Math.round(v.y * f) + "," + Math.round(v.z * f);
if (ptAxis < 0) {
this.moreInfo.addLast(s);
if (ptAngle > ptAxis) ptAngle++;
} else {
this.moreInfo.set(ptAxis, s);
}f = Clazz_doubleToInt(Math.round(q.getThetaDirectedV(JS.UnitCell.v0) * 1000) / 1000);
s = a + (f == Math.round(f) ? "" + Math.round(f) : JS.UnitCell.round000(f));
if (ptAngle < 0) {
this.moreInfo.addLast(s);
} else {
this.moreInfo.set(ptAngle, s);
}}, "JU.A4");
Clazz_defineMethod(c$, "getAxisMultiplier", 
function(v){
if (JS.UnitCell.approx00(v.x - Math.round(v.x)) && JS.UnitCell.approx00(v.y - Math.round(v.y)) && JS.UnitCell.approx00(v.z - Math.round(v.z))) {
return 1;
}var d = Math.min(JS.UnitCell.approx00(v.x) ? 10000 : Math.abs(v.x), JS.UnitCell.approx00(v.y) ? 10000 : Math.min(Math.abs(v.y), JS.UnitCell.approx00(v.z) ? 10000 : Math.abs(v.z)));
if (JS.UnitCell.approx01(v.x / d) && JS.UnitCell.approx01(v.y / d) && JS.UnitCell.approx01(v.z / d)) {
return 1 / d;
}return 1000;
}, "JU.V3");
c$.approx01 = Clazz_defineMethod(c$, "approx01", 
function(f){
f = f % 1;
return (JS.UnitCell.approx00(f) || Math.abs(f) > 0.999);
}, "~N");
c$.approx00 = Clazz_defineMethod(c$, "approx00", 
function(f){
return (Math.abs(f) < 0.001);
}, "~N");
c$.round000 = Clazz_defineMethod(c$, "round000", 
function(y){
y = Math.round(y * 1000) / 1000;
return (y == Math.round(y) ? "" + Math.round(y) : "" + y);
}, "~N");
Clazz_defineMethod(c$, "setMoreInfo", 
function(info){
this.moreInfo = info;
}, "JU.Lst");
Clazz_defineMethod(c$, "getMoreInfo", 
function(){
return this.moreInfo;
});
c$.setSymmetryMinMax = Clazz_defineMethod(c$, "setSymmetryMinMax", 
function(c, rmin, rmax){
if (rmin.x > c.x) rmin.x = c.x;
if (rmin.y > c.y) rmin.y = c.y;
if (rmin.z > c.z) rmin.z = c.z;
if (rmax.x < c.x) rmax.x = c.x;
if (rmax.y < c.y) rmax.y = c.y;
if (rmax.z < c.z) rmax.z = c.z;
}, "JU.P3,JU.P3,JU.P3");
Clazz_defineMethod(c$, "adjustRangeMinMax", 
function(oabc, packingRange, minXYZ, maxXYZ, rmin, rmax, newMin, newMax){
if (rmin == null) {
rmin = JU.P3.new3(3.4028235E38, 3.4028235E38, 3.4028235E38);
rmax = JU.P3.new3(-3.4028235E38, -3.4028235E38, -3.4028235E38);
}var pa =  new JU.P3();
var pb =  new JU.P3();
var pc =  new JU.P3();
if (!Float.isNaN(packingRange)) {
pa.setT(oabc[1]);
pb.setT(oabc[2]);
pc.setT(oabc[3]);
pa.scale(packingRange);
pb.scale(packingRange);
pc.scale(packingRange);
}if (minXYZ != null) {
oabc[0].scaleAdd2(minXYZ.x, oabc[1], oabc[0]);
oabc[0].scaleAdd2(minXYZ.y, oabc[2], oabc[0]);
oabc[0].scaleAdd2(minXYZ.z, oabc[3], oabc[0]);
}oabc[0].sub(pa);
oabc[0].sub(pb);
oabc[0].sub(pc);
var pt = JU.P3.newP(oabc[0]);
this.toFractional(pt, true);
JS.UnitCell.setSymmetryMinMax(pt, rmin, rmax);
if (minXYZ != null) {
oabc[1].scale(maxXYZ.x - minXYZ.x);
oabc[2].scale(maxXYZ.y - minXYZ.y);
oabc[3].scale(maxXYZ.z - minXYZ.z);
}oabc[1].scaleAdd2(2, pa, oabc[1]);
oabc[2].scaleAdd2(2, pb, oabc[2]);
oabc[3].scaleAdd2(2, pc, oabc[3]);
for (var i = 0; i < 3; i++) {
for (var j = i + 1; j < 4; j++) {
pt.add2(oabc[i], oabc[j]);
if (i != 0) pt.add(oabc[0]);
this.toFractional(pt, false);
JS.UnitCell.setSymmetryMinMax(pt, rmin, rmax);
}
}
this.toCartesian(pt, false);
pt.add(oabc[1]);
this.toFractional(pt, false);
JS.UnitCell.setSymmetryMinMax(pt, rmin, rmax);
newMin.set(Clazz_doubleToInt(Math.min(0, Math.floor(rmin.x + 0.001))), Clazz_doubleToInt(Math.min(0, Math.floor(rmin.y + 0.001))), Clazz_doubleToInt(Math.min(0, Math.floor(rmin.z + 0.001))));
newMax.set(Clazz_doubleToInt(Math.max(1, Math.ceil(rmax.x - 0.001))), Clazz_doubleToInt(Math.max(1, Math.ceil(rmax.y - 0.001))), Clazz_doubleToInt(Math.max(1, Math.ceil(rmax.z - 0.001))));
}, "~A,~N,JU.P3i,JU.P3i,JU.P3,JU.P3,JU.P3i,JU.P3i");
Clazz_defineMethod(c$, "toFractionalSpin", 
function(v){
if (this.spinFrameToCartXYZ == null) {
this.toFractional(v, true);
return;
}if (this.spinFrameFromCartXYZ == null) {
this.spinFrameFromCartXYZ = JU.M3.newM3(this.spinFrameToCartXYZ);
this.spinFrameFromCartXYZ.invert();
}this.spinFrameFromCartXYZ.rotate(v);
}, "JU.T3");
Clazz_defineMethod(c$, "toCartesianSpin", 
function(v){
if (this.spinFrameFromCartXYZ == null) {
this.toCartesian(v, true);
return;
}this.spinFrameToCartXYZ.rotate(v);
}, "JU.T3");
c$.unitVectors =  Clazz_newArray(-1, [JV.JC.axisX, JV.JC.axisY, JV.JC.axisZ]);
c$.v0 = null;
});
;//5.0.1-v7 Wed Mar 25 10:34:32 CDT 2026
Clazz_declarePackage("JS");
Clazz_load(["J.api.AtomIndexIterator"], "JS.UnitCellIterator", ["JU.Lst", "$.P3", "$.P3i", "JU.BoxInfo", "$.Logger", "$.Point3fi"], function(){
var c$ = Clazz_decorateAsClass(function(){
this.atoms = null;
this.center = null;
this.translation = null;
this.nFound = 0;
this.maxDistance2 = 0;
this.distance2 = 0;
this.unitCell = null;
this.minXYZ = null;
this.maxXYZ = null;
this.t = null;
this.p = null;
this.ipt = -2147483648;
this.unitList = null;
this.done = false;
this.nAtoms = 0;
this.listPt = 0;
Clazz_instantialize(this, arguments);}, JS, "UnitCellIterator", null, J.api.AtomIndexIterator);
Clazz_makeConstructor(c$, 
function(map){
if (map != null) {
var gp = map.get("gp");
this.gpos =  new JU.Lst();
this.gpos.addAll(gp);
var wpos = map.get("wpos");
this.positions = wpos.get("pos");
this.npos = this.positions.size();
var cent = wpos.get("cent");
if (cent != null) {
this.ncent = cent.size();
this.centeringStr =  new Array(this.ncent);
this.centerings =  new Array(this.ncent);
for (var i = this.ncent; --i >= 0; ) {
var s = cent.get(i);
this.centeringStr[i] = s;
this.centerings[i] = JS.SymmetryOperation.toPoint(s, null);
}
}}}, "java.util.Map");
Clazz_defineMethod(c$, "getWyckoffFinder", 
function(vwr, sg){
var cleg = sg.getClegId();
var helper = JS.WyckoffFinder.helpers.get(cleg);
if (helper != null) return helper;
helper = JS.WyckoffFinder.createHelper(vwr, cleg, sg.groupType);
if (helper == null) {
if (JS.WyckoffFinder.nullHelper == null) JS.WyckoffFinder.nullHelper =  new JS.WyckoffFinder(null);
JS.WyckoffFinder.helpers.put(cleg, JS.WyckoffFinder.nullHelper);
} else {
JS.WyckoffFinder.helpers.put(cleg, helper);
}return helper;
}, "JV.Viewer,JS.SpaceGroup");
Clazz_defineMethod(c$, "findPositionFor", 
function(p, letter){
if (this.positions != null) {
var isGeneral = (letter.equals("G"));
for (var i = isGeneral ? 1 : this.npos; --i >= 0; ) {
var map = this.positions.get(i);
var l = map.get("label");
if (isGeneral || l.equals(letter)) {
var coords = map.get("coord");
if (coords != null) JS.WyckoffFinder.getWyckoffCoord(coords, 0, l).project(p);
return p;
}}
}return null;
}, "JU.P3,~S");
Clazz_defineMethod(c$, "getInfo", 
function(uc, p, returnType, withMult, is2d){
var info = this.createInfo(uc, p, returnType, withMult, is2d);
return (info == null ? "?" : info);
}, "JS.UnitCell,JU.P3,~N,~B,~B");
c$.wrap = Clazz_defineMethod(c$, "wrap", 
function(xyz, sb){
return sb.appendC('(').append(xyz).appendC(')');
}, "~S,JU.SB");
Clazz_defineMethod(c$, "createInfo", 
function(uc, p, returnType, withMult, is2d){
switch (returnType) {
case 83:
return this.getCenteringStr(-1, ' ', null).toString().trim();
case 67:
var ret =  new Array(this.centerings.length);
for (var i = ret.length; --i >= 0; ) ret[i] = this.centerings[i];

return ret;
case 42:
var sb =  new JU.SB();
this.getCenteringStr(-1, '+', sb);
for (var i = this.npos; --i >= 0; ) {
var map = this.positions.get(i);
var label = (withMult ? "" + map.get("mult") : "") + map.get("label");
sb.appendC('\n').append(label);
JS.WyckoffFinder.getList(i == 0 ? this.gpos : map.get("coord"), label, sb, (i == 0 ? this.ncent : 0));
}
return sb.toString();
case -4:
var pts =  new Array(this.npos);
for (var i = 0; i < this.npos; i++) {
var map = this.positions.get(i);
pts[i] = this.findPositionFor(JU.P3.newP(p), map.get("label"));
uc.toCartesian(pts[i], false);
}
return  Clazz_newArray(-1, [pts, "AlB C D FeF GaHeI GeK LiMgN OsP CaRhS T U V W XeYbZnAm"]);
case -1:
case -2:
case -3:
for (var i = this.npos; --i >= 0; ) {
var map = this.positions.get(i);
var label = (withMult ? "" + map.get("mult") : "") + map.get("label");
if (i == 0) {
switch (returnType) {
case -1:
return label;
case -2:
return "(x,y,z)";
case -3:
var sbc =  new JU.SB();
sbc.append(label).appendC(' ');
this.getCenteringStr(-1, '+', sbc).appendC(' ');
JS.WyckoffFinder.getList(this.gpos, label, sbc, this.ncent);
return sbc.toString();
}
}var coords = map.get("coord");
for (var c = 0, n = coords.size(); c < n; c++) {
var coord = JS.WyckoffFinder.getWyckoffCoord(coords, c, label);
if (coord.contains(this, uc, p)) {
switch (returnType) {
case -1:
return label;
case -2:
return coord.asString(null, true).toString();
case -3:
var sbc =  new JU.SB();
sbc.append(label).appendC(' ');
this.getCenteringStr(-1, '+', sbc).appendC(' ');
JS.WyckoffFinder.getList(coords, label, sbc, 0);
return sbc.toString();
}
}}
}
break;
case 71:
default:
var letter = "" + String.fromCharCode(returnType);
var isGeneral = (returnType == 71);
var tempP =  new JU.P3();
for (var i = isGeneral ? 1 : this.npos; --i >= 0; ) {
var map = this.positions.get(i);
var label = map.get("label");
if (isGeneral || label.equals(letter)) {
var sbc =  new JU.SB();
if (isGeneral) sbc.append(label).appendC(' ');
var coords = (i == 0 ? this.gpos : map.get("coord"));
JS.WyckoffFinder.getList(coords, (withMult ? map.get("mult") : "") + letter, sbc, 0);
if (i > 0 && this.ncent > 0) {
var tempOp =  new JU.M4();
for (var j = 0; j < this.ncent; j++) {
this.addCentering(coords, this.centerings[j], tempOp, tempP, sbc);
}
}return sbc.toString();
}}
break;
}
return null;
}, "JS.UnitCell,JU.P3,~N,~B,~B");
c$.createHelper = Clazz_defineMethod(c$, "createHelper", 
function(vwr, clegId, groupType){
var sgname = (groupType > 0 ? clegId.substring(2) : clegId);
var pt = sgname.indexOf(":");
var itno = JU.PT.parseInt(pt < 0 ? sgname : sgname.substring(0, pt));
if (!JS.SpaceGroup.isInRange(itno, groupType, false, false)) return null;
var resource = JS.Symmetry.getITJSONResource(vwr, groupType, itno, null);
if (resource == null) return null;
var its = resource.get("its");
var map = null;
var haveMap = false;
for (var i = 0, c = its.size(); i < c; i++) {
map = its.get(i);
if (clegId.equals(map.get("clegId"))) {
haveMap = true;
break;
}}
if (!haveMap || map.containsKey("more")) map = JS.SpaceGroup.fillMoreData(vwr, haveMap ? map : null, clegId, itno, its.get(0));
var helper =  new JS.WyckoffFinder(map);
return helper;
}, "JV.Viewer,~S,~N");
Clazz_defineMethod(c$, "getCenteringStr", 
function(index, sep, sb){
if (sb == null) sb =  new JU.SB();
if (this.ncent == 0) return sb;
if (index >= 0) {
sb.appendC(sep);
return JS.WyckoffFinder.wrap(this.centeringStr[index], sb);
}for (var i = 0; i < this.ncent; i++) {
sb.appendC(sep);
JS.WyckoffFinder.wrap(this.centeringStr[i], sb);
}
return sb;
}, "~N,~S,JU.SB");
c$.getList = Clazz_defineMethod(c$, "getList", 
function(coords, letter, sb, n){
if (sb == null) sb =  new JU.SB();
n = (n == 0 ? coords.size() : Clazz_doubleToInt(coords.size() / (n + 1)));
for (var c = 0; c < n; c++) {
var coord = JS.WyckoffFinder.getWyckoffCoord(coords, c, letter);
sb.append(" ");
coord.asString(sb, false);
}
return sb;
}, "JU.Lst,~S,JU.SB,~N");
Clazz_defineMethod(c$, "addCentering", 
function(coords, centering, tempOp, tempP, sb){
for (var n = coords.size(), c = 0; c < n; c++) {
var coord = coords.get(c);
sb.append(" ");
coord.asStringCentered(centering, tempOp, tempP, sb);
}
}, "JU.Lst,JU.P3,JU.M4,JU.P3,JU.SB");
c$.getWyckoffCoord = Clazz_defineMethod(c$, "getWyckoffCoord", 
function(coords, c, label){
var coord = coords.get(c);
if ((typeof(coord)=='string')) {
coords.set(c, coord =  new JS.WyckoffFinder.WyckoffCoord(coord, label));
}return coord;
}, "JU.Lst,~N,~S");
})();
c$.nullHelper = null;
c$.helpers =  new java.util.Hashtable();
});
;//5.0.1-v7 Wed Mar 25 00:33:43 CDT 2026
Clazz_declarePackage("JS");
Clazz_load(["JU.M4"], "JS.CLEG", ["java.util.Arrays", "JU.AU", "$.BS", "$.P3", "$.PT", "JS.SV", "JS.SpaceGroup", "$.UnitCell", "JV.Viewer"], function(){
var c$ = Clazz_declareType(JS, "CLEG", null);
;(function(){
var c$ = Clazz_decorateAsClass(function(){
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
Clazz_instantialize(this, arguments);}, JS.CLEG, "ClegData", null);
Clazz_prepareFields (c$, function(){
this.trTemp =  new JU.M4();
});
Clazz_makeConstructor(c$, 
function(sym, tokens){
this.tokens = tokens;
this.sym = sym;
}, "J.api.SymmetryInterface,~A");
Clazz_defineMethod(c$, "setSymmetry", 
function(sym){
this.sym = sym;
}, "J.api.SymmetryInterface");
Clazz_defineMethod(c$, "addSGTransform", 
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
Clazz_defineMethod(c$, "abcFor", 
function(trm){
return this.sym.staticGetTransformABC(trm, false);
}, "JU.M4");
Clazz_defineMethod(c$, "matFor", 
function(trm){
return this.sym.convertTransform(trm, (trm.indexOf(">") > 0 ? null : this.trTemp));
}, "~S");
Clazz_defineMethod(c$, "removePrevNodeTrm", 
function(){
if (this.prevNode != null && this.prevNode.myTrm != null && !this.prevNode.disabled) {
this.addSGTransform("!" + this.prevNode.myTrm, "!prevNode.myTrm");
}});
Clazz_defineMethod(c$, "calculate", 
function(trm0){
trm0.invert();
var trm1 = JU.M4.newM4(this.trMat);
trm1.mul(trm0);
return this.sym.convertTransform(null, trm1);
}, "JU.M4");
Clazz_defineMethod(c$, "updateTokens", 
function(node){
var index = node.index;
var s = node.name;
if (s.startsWith("ITA/")) s = s.substring(4);
 else s = (node.myIta == null ? "." : node.myIta) + ":" + node.myTrm;
this.setToken(index, s);
if (node.calculated != null && index > 0) this.setToken(index - 1, node.calculated);
}, "JS.CLEG.ClegNode");
Clazz_defineMethod(c$, "setToken", 
function(index, s){
this.tokens[index] = s;
}, "~N,~S");
Clazz_defineMethod(c$, "addTransformLink", 
function(){
if (this.trLink == null) {
this.trLink =  new JU.M4();
this.trLink.setIdentity();
}this.trLink.mul(this.trTemp);
});
Clazz_defineMethod(c$, "setNodeTransform", 
function(node){
node.myTrm = this.abcFor(this.trMat);
node.setITAName(node.name);
}, "JS.CLEG.ClegNode");
Clazz_defineMethod(c$, "addTransform", 
function(index, transform){
this.addSGTransform(transform, ">t>");
this.addTransformLink();
System.out.println("CLEG.addTransform index=" + index + " trm=" + this.trMat);
}, "~N,~S");
Clazz_defineMethod(c$, "getPrevNode", 
function(){
return this.prevNode;
});
Clazz_defineMethod(c$, "setPrevNode", 
function(node){
return this.prevNode = node;
}, "JS.CLEG.ClegNode");
Clazz_defineMethod(c$, "addPrimitiveTransform", 
function(myIta, myTrm){
var hmName = this.sym.getSpaceGroupInfoObj("hmName", myIta + ":" + myTrm, false, false);
if (hmName == null) return myTrm;
var c = hmName.charAt(0);
if ("ABCFI".indexOf(c) < 0) return myTrm;
var t = JU.M4.newMV(JS.UnitCell.getPrimitiveTransform(c), JU.P3.new3(0, 0, 0));
t.mul(this.matFor(myTrm));
return this.abcFor(t);
}, "~S,~S");
Clazz_defineMethod(c$, "setReturnMap", 
function(ret){
if (ret != null) {
this.asM4 = (ret.get("ASM4") === Boolean.TRUE);
ret.clear();
}this.retMap = ret;
}, "java.util.Map");
Clazz_defineMethod(c$, "setReturnLst", 
function(ret){
if (ret != null) ret.clear();
this.retLst = ret;
}, "JU.Lst");
;(function(){
var c$ = Clazz_decorateAsClass(function(){
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
Clazz_instantialize(this, arguments);}, JS.CLEG, "ClegNode", null);
Clazz_makeConstructor(c$, 
function(data, index, name){
if (name == null) return;
this.index = index;
this.init(data, name);
}, "JS.CLEG.ClegData,~N,~S");
Clazz_defineMethod(c$, "disable", 
function(){
this.disabled = true;
});
Clazz_defineMethod(c$, "checkSpecial", 
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
this.specialType = (Clazz_doubleToInt(itno / 100)) * 100;
this.specialPrefix = JS.SpaceGroup.getGroupTypePrefix(itno);
return "" + (itno - this.specialType) + name.substring(sname.length);
default:
this.specialPrefix = name.substring(0, 2);
return name.substring(2);
}
}, "~S");
Clazz_defineMethod(c$, "init", 
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
Clazz_defineMethod(c$, "setITAName", 
function(name){
return this.name = (".".equals(name) || this.myIta == null ? "." : "ITA/" + this.specialPrefix + this.myIta) + (this.myTrm == null ? "" : ":" + this.myTrm);
}, "~S");
Clazz_defineMethod(c$, "update", 
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
Clazz_defineMethod(c$, "getName", 
function(){
return this.name;
});
Clazz_defineMethod(c$, "getCleanITAName", 
function(){
if (this.name == null) return (this.name = ".");
var s = (this.name.startsWith("ITA/") ? this.name.substring(4) : this.name);
if (this.specialType != 0 && !s.startsWith(this.specialPrefix)) s = this.specialPrefix + s;
return s;
});
Clazz_defineMethod(c$, "isDefaultSetting", 
function(){
return (this.myTrm == null || JS.CLEG.cleanCleg000(this.myTrm).equals("a,b,c"));
});
Clazz_defineMethod(c$, "setCalcNext", 
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
if (Clazz_exceptionOf(e, Exception)){
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
Clazz_overrideMethod(c$, "toString", 
function(){
return "[ClegNode #" + this.index + " " + this.name + "   " + this.myIta + ":" + this.myTrm + (this.disabled ? " disabled" : "") + "]";
});
;(function(){
var c$ = Clazz_decorateAsClass(function(){
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
Clazz_instantialize(this, arguments);}, JS.CLEG, "AssignedSGParams", null);
Clazz_makeConstructor(c$, 
function(vwr, isCurrentSG){
this.vwr = vwr;
this.mkCalcOnly = true;
this.mkIsAssign = false;
this.mkSb = null;
if (isCurrentSG) this.mkSym00 = vwr.getOperativeSymmetry();
}, "JV.Viewer,~B");
Clazz_makeConstructor(c$, 
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
