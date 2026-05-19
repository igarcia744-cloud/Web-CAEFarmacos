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
Clazz_declarePackage("J.adapter.readers.pdb");
Clazz_load(["J.adapter.smarter.AtomSetCollectionReader", "java.util.Hashtable"], "J.adapter.readers.pdb.PdbReader", ["JU.Lst", "$.M4", "$.P3", "$.PT", "$.SB", "J.adapter.smarter.Atom", "$.Structure", "J.api.JmolAdapter", "J.c.STR", "JU.Escape", "$.Logger"], function(){
var c$ = Clazz_decorateAsClass(function(){
this.serMode = 0;
this.seqMode = 0;
this.serial = 0;
this.lineLength = 0;
this.pdbHeader = null;
this.applySymmetry = false;
this.getTlsGroups = false;
this.isMultiModel = false;
this.haveMappedSerials = false;
this.isConnectStateBug = false;
this.isLegacyModelType = false;
this.gromacsWideFormat = false;
this.htFormul = null;
this.htHetero = null;
this.htSites = null;
this.htElementsInCurrentGroup = null;
this.htMolIds = null;
this.vCompnds = null;
this.vBiomolecules = null;
this.vTlsModels = null;
this.sbTlsErrors = null;
this.biomtChainAtomCounts = null;
this.sbIgnored = null;
this.sbSelected = null;
this.sbConect = null;
this.sb = null;
this.ac = 0;
this.maxSerial = 0;
this.nUNK = 0;
this.nRes = 0;
this.currentCompnd = null;
this.currentGroup3 = null;
this.currentKey = null;
this.currentResno = -2147483648;
this.configurationPtr = -2147483648;
this.resetKey = true;
this.$compnd = null;
this.conformationIndex = 0;
this.fileAtomIndex = 0;
this.lastAltLoc = '\0';
this.lastGroup = -2147483648;
this.lastInsertion = '\0';
this.lastSourceSerial = -2147483648;
this.lastTargetSerial = -2147483648;
this.tlsGroupID = 0;
this.atomTypePt0 = 0;
this.atomTypeLen = 0;
this.isCourseGrained = false;
this.isbiomol = false;
this.$cryst1 = 0;
this.fileSgName = null;
this.htGroup1 = null;
this.maxLength = 80;
this.pdbID = null;
this.haveDoubleBonds = false;
this.dataT = null;
this.tlsU = null;
this.vConnect = null;
this.connectNextAtomIndex = 0;
this.connectNextAtomSet = 0;
this.connectLast = null;
Clazz_instantialize(this, arguments);}, J.adapter.readers.pdb, "PdbReader", J.adapter.smarter.AtomSetCollectionReader);
Clazz_prepareFields (c$, function(){
this.htFormul =  new java.util.Hashtable();
this.dataT =  Clazz_newFloatArray (8, 0);
});
Clazz_overrideMethod(c$, "initializeReader", 
function(){
this.allowPDBFilter = true;
this.pdbHeader = (this.getHeader ?  new JU.SB() : null);
this.applySymmetry = !this.checkFilterKey("NOSYMMETRY");
if (this.isDSSP1) this.asc.setInfo("isDSSP1", Boolean.TRUE);
this.getTlsGroups = this.checkFilterKey("TLS");
if (this.checkFilterKey("ASSEMBLY")) this.filter = JU.PT.rep(this.filter, "ASSEMBLY", "BIOMOLECULE");
this.isbiomol = this.checkFilterKey("BIOMOLECULE");
if (this.isbiomol) this.filter = this.filter.$replace(':', ' ');
var byChain = this.isbiomol && this.checkFilterKey("BYCHAIN");
var bySymop = this.isbiomol && this.checkFilterKey("BYSYMOP");
this.isCourseGrained = byChain || bySymop;
if (!this.isCourseGrained) this.setIsPDB();
this.isConcatenated = new Boolean (this.isConcatenated | this.filePath.endsWith(".dssr")).valueOf();
if (this.htParams.containsKey("vTlsModels")) {
this.vTlsModels = this.htParams.remove("vTlsModels");
}var s = this.getFilter("TYPE ");
if (s != null) {
var tokens = JU.PT.getTokens(s.$replace(',', ' '));
this.atomTypePt0 = Integer.parseInt(tokens[0]) - 1;
var pt = tokens[1].indexOf("=");
if (pt >= 0) {
this.setFilterAtomTypeStr(tokens[1].substring(pt + 1).toUpperCase());
} else {
pt = tokens[1].length;
}this.atomTypeLen = Integer.parseInt(tokens[1].substring(0, pt));
}var conf = this.getFilter("CONF ");
if (conf != null) {
this.configurationPtr = this.parseIntStr(conf);
this.sbIgnored =  new JU.SB();
this.sbSelected =  new JU.SB();
}this.isLegacyModelType = (this.stateScriptVersionInt < 120000);
this.isConnectStateBug = (this.stateScriptVersionInt >= 120151 && this.stateScriptVersionInt <= 120220 || this.stateScriptVersionInt >= 120300 && this.stateScriptVersionInt <= 120320);
});
Clazz_overrideMethod(c$, "checkLine", 
function(){
var ptOption = ((this.lineLength = this.line.length) < 6 ? -1 : "ATOM    HETATM  MODEL   CONECT  HELIX   SHEET   TURN    HET     HETNAM  ANISOU  SITE    CRYST1  SCALE1  SCALE2  SCALE3  EXPDTA  FORMUL  REMARK  HEADER  COMPND  SOURCE  TITLE   SEQADV  ".indexOf(this.line.substring(0, 6))) >> 3;
var isAtom = (ptOption == 0 || ptOption == 1);
var isModel = (ptOption == 2);
this.serial = (isAtom ? this.getSerial(6, 11) : 0);
var forceNewModel = ((this.isTrajectory || this.isSequential) && !this.isMultiModel && isAtom && this.serial == 1);
if (this.getHeader) {
if (isAtom || isModel) this.getHeader = false;
 else this.readHeader(false);
}if (isModel || forceNewModel) {
this.isMultiModel = isModel;
this.getHeader = false;
var modelNo = (forceNewModel ? this.modelNumber + 1 : this.getModelNumber());
var modelName = this.getModelName();
this.modelNumber = (this.useFileModelNumbers ? modelNo : this.modelNumber + 1);
if (!this.doGetModel(this.modelNumber, null)) {
this.handleTlsMissingModels();
var isOK = this.checkLastModel();
if (!isOK && this.isConcatenated) isOK = this.continuing = true;
return isOK;
}if (!this.isCourseGrained) this.connectAll(this.maxSerial, this.isConnectStateBug);
if (this.ac > 0) this.applySymmetryAndSetTrajectory();
this.model(modelNo, modelName);
if (this.isLegacyModelType || !isAtom) return true;
}if (this.isMultiModel && !this.doProcessLines) {
return true;
}if (isAtom) {
this.getHeader = false;
this.atom();
return true;
}switch (ptOption) {
case 3:
this.conect();
return true;
case 4:
case 5:
case 6:
if (!this.ignoreStructure) this.structure();
return true;
case 7:
this.het();
return true;
case 8:
this.hetnam();
return true;
case 9:
this.anisou();
return true;
case 10:
this.site();
return true;
case 11:
this.cryst1();
return true;
case 12:
case 13:
case 14:
this.scale(ptOption - 11);
return true;
case 15:
this.expdta();
return true;
case 16:
this.formul();
return true;
case 17:
if (this.line.startsWith("REMARK 285")) return this.remark285();
if (this.line.startsWith("REMARK 350")) return this.remark350();
if (this.line.startsWith("REMARK 290")) return this.remark290();
if (this.line.contains("This file does not adhere to the PDB standard")) {
this.gromacsWideFormat = true;
}if (this.getTlsGroups) {
if (this.line.indexOf("TLS DETAILS") > 0) return this.remarkTls();
}this.checkRemark();
return true;
case 18:
this.header();
return true;
case 19:
case 20:
this.compnd(ptOption == 20);
return true;
case 21:
this.title();
return true;
case 22:
this.seqAdv();
return true;
}
return true;
});
Clazz_defineMethod(c$, "checkRemark", 
function(){
this.checkCurrentLineForScript();
});
Clazz_defineMethod(c$, "seqAdv", 
function(){
var g1 = this.line.substring(39, 42).trim().toLowerCase();
if (g1.length != 1) return;
if (this.htGroup1 == null) this.asc.setInfo("htGroup1", this.htGroup1 =  new java.util.Hashtable());
var g3 = this.line.substring(12, 15).trim();
this.htGroup1.put(g3, g1);
});
Clazz_defineMethod(c$, "readHeader", 
function(getLine){
if (getLine) {
this.rd();
if (!this.getHeader) return this.line;
}this.pdbHeader.append(this.line).appendC('\n');
return this.line;
}, "~B");
Clazz_overrideMethod(c$, "finalizeSubclassReader", 
function(){
this.finalizeReaderPDB();
});
Clazz_defineMethod(c$, "finalizeReaderPDB", 
function(){
this.checkNotPDB();
if (this.pdbID != null && this.pdbID.length > 0) {
if (!this.isMultiModel) this.asc.setAtomSetName(this.pdbID);
this.asc.setCurrentModelInfo("pdbID", this.pdbID);
}this.checkUnitCellParams();
if (!this.isCourseGrained) this.connectAll(this.maxSerial, this.isConnectStateBug);
var symmetry;
if (this.vBiomolecules != null && this.vBiomolecules.size() > 0 && this.asc.ac > 0) {
this.asc.setCurrentModelInfo("biomolecules", this.vBiomolecules);
this.setBiomoleculeAtomCounts();
if (this.thisBiomolecule != null && this.applySymmetry) {
this.asc.getXSymmetry().applySymmetryBio(this.thisBiomolecule, this.applySymmetryToBonds, this.filter);
this.vTlsModels = null;
this.asc.xtalSymmetry = null;
}}if (this.vTlsModels != null) {
symmetry = this.asc.newFileSymmetry();
var n = this.asc.atomSetCount;
if (n == this.vTlsModels.size()) {
for (var i = n; --i >= 0; ) this.setTlsGroups(i, i, symmetry);

} else {
JU.Logger.info(n + " models but " + this.vTlsModels.size() + " TLS descriptions");
if (this.vTlsModels.size() == 1) {
JU.Logger.info(" -- assuming all models have the same TLS description -- check REMARK 3 for details.");
for (var i = n; --i >= 0; ) this.setTlsGroups(0, i, symmetry);

}}this.checkForResidualBFactors(symmetry);
}if (this.sbTlsErrors != null) {
this.asc.setInfo("tlsErrors", this.sbTlsErrors.toString());
this.appendLoadNote(this.sbTlsErrors.toString());
}this.doCheckUnitCell = new Boolean (this.doCheckUnitCell &(this.iHaveUnitCell && this.doApplySymmetry)).valueOf();
if (this.doCheckUnitCell && this.isbiomol) {
this.ignoreFileSpaceGroupName = true;
this.sgName = this.fileSgName;
this.fractionalizeCoordinates(true);
this.asc.setModelInfoForSet("bioSymmetry", null, this.asc.iSet);
this.checkNearAtoms = false;
}if (this.latticeCells != null && this.latticeCells[0] != 0) this.addJmolScript("unitcell;axes on;axes unitcell;");
this.finalizeReaderASCR();
if (this.vCompnds != null) {
this.asc.setInfo("compoundSource", this.vCompnds);
for (var i = this.asc.iSet + 1; --i >= 0; ) this.asc.setModelInfoForSet("compoundSource", this.vCompnds, i);

}if (this.htSites != null) {
this.addSites(this.htSites);
}if (this.pdbHeader != null) this.asc.setInfo("fileHeader", this.pdbHeader.toString());
if (this.configurationPtr > 0) {
JU.Logger.info(this.sbSelected.toString());
JU.Logger.info(this.sbIgnored.toString());
}});
Clazz_defineMethod(c$, "checkUnitCellParams", 
function(){
if (this.isbiomol && (this.unitCellParams == null || Double.isNaN(this.unitCellParams[0]))) {
this.setUnitCell(1, 1, 1, 90, 90, 90);
this.addSpaceGroupName("P1");
}if (this.iHaveUnitCell) {
this.asc.setCurrentModelInfo("unitCellParams", this.unitCellParams);
if (this.sgName != null) this.asc.setCurrentModelInfo("spaceGroup", this.sgName);
}});
Clazz_defineMethod(c$, "checkForResidualBFactors", 
function(symmetry){
var atoms = this.asc.atoms;
var isResidual = false;
for (var i = this.asc.ac; --i >= 0; ) {
var anisou = this.tlsU.get(atoms[i]);
if (anisou == null) continue;
var resid = anisou[7] - (anisou[0] + anisou[1] + anisou[2]) / 3;
if (resid < 0 || Float.isNaN(resid)) {
isResidual = true;
break;
}}
JU.Logger.info("TLS analysis suggests Bfactors are " + (isResidual ? "" : "NOT") + " residuals");
for (var entry, $entry = this.tlsU.entrySet().iterator (); $entry.hasNext()&& ((entry = $entry.next ()) || true);) {
var anisou = entry.getValue();
var resid = anisou[7];
if (resid == 0) continue;
if (!isResidual) resid -= (anisou[0] + anisou[1] + anisou[2]) / 3;
anisou[0] += resid;
anisou[1] += resid;
anisou[2] += resid;
entry.getKey().addTensor(symmetry.getTensor(this.vwr, anisou).setType(null), "TLS-R", false);
JU.Logger.info("TLS-U:  " + JU.Escape.eAF(anisou));
anisou = (entry.getKey().anisoBorU);
if (anisou != null) JU.Logger.info("ANISOU: " + JU.Escape.eAF(anisou));
}
this.tlsU = null;
}, "J.adapter.smarter.XtalSymmetry.FileSymmetry");
Clazz_defineMethod(c$, "header", 
function(){
if (this.lineLength < 8) return;
this.appendLoadNote(this.line.substring(7).trim());
if (this.lineLength == 80) this.maxLength = 72;
this.pdbID = (this.lineLength >= 66 ? this.line.substring(62, 66).trim() : "");
if (this.pdbID.length == 4) {
this.asc.setCollectionName(this.pdbID);
this.asc.setInfo("havePDBHeaderName", Boolean.TRUE);
}if (this.lineLength > 50) this.line = this.line.substring(0, 50);
this.asc.setInfo("CLASSIFICATION", this.line.substring(7).trim());
});
Clazz_defineMethod(c$, "title", 
function(){
if (this.lineLength > 10) this.appendLoadNote(this.line.substring(10, Math.min(this.maxLength, this.line.length)).trim());
});
Clazz_defineMethod(c$, "compnd", 
function(isSource){
if (!isSource) {
if (this.$compnd == null) this.$compnd = "";
 else this.$compnd += " ";
var s = this.line;
if (this.lineLength > 62) s = s.substring(0, 62);
this.$compnd += s.substring(10).trim();
this.asc.setInfo("COMPND", this.$compnd);
}if (this.vCompnds == null) {
if (isSource) return;
this.vCompnds =  new JU.Lst();
this.htMolIds =  new java.util.Hashtable();
this.currentCompnd =  new java.util.Hashtable();
this.currentCompnd.put("select", "(*)");
this.currentKey = "MOLECULE";
this.htMolIds.put("", this.currentCompnd);
}if (isSource && this.resetKey) {
this.resetKey = false;
this.currentKey = "SOURCE";
this.currentCompnd = this.htMolIds.get("");
}this.line = this.line.substring(10, Math.min(this.lineLength, 72)).trim();
var pt = this.line.indexOf(":");
if (pt < 0 || pt > 0 && this.line.charAt(pt - 1) == '\\') pt = this.line.length;
var key = this.line.substring(0, pt).trim();
var value = (pt < this.line.length ? this.line.substring(pt + 1).trim() : null);
if (key.equals("MOL_ID")) {
if (value == null) return;
if (isSource) {
this.currentCompnd = this.htMolIds.remove(value);
return;
}this.currentCompnd =  new java.util.Hashtable();
this.vCompnds.addLast(this.currentCompnd);
this.htMolIds.put(value, this.currentCompnd);
}if (this.currentCompnd == null) return;
if (value == null) {
value = this.currentCompnd.get(this.currentKey);
if (value == null) value = "";
value += key;
if (this.vCompnds.size() == 0) this.vCompnds.addLast(this.currentCompnd);
} else {
this.currentKey = key;
}if (value.endsWith(";")) value = value.substring(0, value.length - 1);
this.currentCompnd.put(this.currentKey, value);
if (this.currentKey.equals("CHAIN")) this.currentCompnd.put("select", "(:" + JU.PT.rep(JU.PT.rep(value, ", ", ",:"), " ", "") + ")");
}, "~B");
Clazz_defineMethod(c$, "setBiomoleculeAtomCounts", 
function(){
for (var i = this.vBiomolecules.size(); --i >= 0; ) {
var biomolecule = this.vBiomolecules.get(i);
var biomts = biomolecule.get("biomts");
var biomtchains = biomolecule.get("chains");
var nTransforms = biomts.size();
var nAtoms = 0;
for (var k = nTransforms; --k >= 0; ) {
var chains = biomtchains.get(k);
for (var j = chains.length - 1; --j >= 0; ) if (chains.charAt(j) == ':') nAtoms += this.biomtChainAtomCounts[0 + (chains.charAt(j + 1)).charCodeAt(0)];

}
biomolecule.put("atomCount", Integer.$valueOf(nAtoms));
}
});
Clazz_defineMethod(c$, "remark350", 
function(){
var biomts = null;
var biomtchains = null;
this.vBiomolecules =  new JU.Lst();
this.biomtChainAtomCounts =  Clazz_newIntArray (255, 0);
var title = "";
var chainlist = "";
var id = "";
var needLine = true;
var info = null;
var nBiomt = 0;
var mIdent = JU.M4.newM4(null);
while (true) {
if (needLine) this.readHeader(true);
 else needLine = true;
if (this.line == null || !this.line.startsWith("REMARK 350")) break;
try {
if (this.line.startsWith("REMARK 350 BIOMOLECULE:")) {
if (nBiomt > 0) JU.Logger.info("biomolecule " + id + ": number of transforms: " + nBiomt);
info =  new java.util.Hashtable();
id = this.line.substring(this.line.indexOf(":") + 1).trim();
title = this.line.trim();
info.put("name", "biomolecule " + id);
info.put("molecule", id.length == 3 ? id : Integer.$valueOf(this.parseIntStr(id)));
info.put("title", title);
info.put("chains", biomtchains =  new JU.Lst());
info.put("biomts", biomts =  new JU.Lst());
this.vBiomolecules.addLast(info);
nBiomt = 0;
}if (this.line.indexOf("APPLY THE FOLLOWING TO CHAINS:") >= 0) {
if (info == null) {
needLine = false;
this.line = "REMARK 350 BIOMOLECULE: 1  APPLY THE FOLLOWING TO CHAINS:";
continue;
}var list = this.line.substring(41).trim();
this.appendLoadNote("found biomolecule " + id + ": " + list);
chainlist = ":" + list.$replace(',', ';').$replace(' ', ':');
needLine = false;
while (this.readHeader(true) != null && this.line.indexOf("BIOMT") < 0 && this.line.indexOf("350") == 7) chainlist += ":" + this.line.substring(11).trim().$replace(',', ';').$replace(' ', ':');

chainlist += ";";
if (this.checkFilterKey("BIOMOLECULE " + id + ";") || this.checkFilterKey("BIOMOLECULE=" + id + ";")) {
this.setFilter(this.filterCased + chainlist);
JU.Logger.info("filter set to \"" + this.filter + "\"");
this.thisBiomolecule = info;
this.haveMappedSerials = this.applySymmetry;
}continue;
}if (this.line.startsWith("REMARK 350   BIOMT1 ")) {
nBiomt++;
var mat =  Clazz_newFloatArray (16, 0);
for (var i = 0; i < 12; ) {
var tokens = this.getTokens();
mat[i++] = this.parseFloatStr(tokens[4]);
mat[i++] = this.parseFloatStr(tokens[5]);
mat[i++] = this.parseFloatStr(tokens[6]);
mat[i++] = this.parseFloatStr(tokens[7]);
if (i == 4 || i == 8) this.readHeader(true);
}
mat[15] = 1;
var m4 =  new JU.M4();
m4.setA(mat);
if (m4.equals(mIdent)) {
biomts.add(0, m4);
biomtchains.add(0, chainlist);
} else {
biomts.addLast(m4);
biomtchains.addLast(chainlist);
}continue;
}} catch (e) {
if (Clazz_exceptionOf(e, Exception)){
this.thisBiomolecule = null;
this.vBiomolecules = null;
return false;
} else {
throw e;
}
}
}
if (nBiomt > 0) JU.Logger.info("biomolecule " + id + ": number of transforms: " + nBiomt);
return false;
});
Clazz_defineMethod(c$, "remark285", 
function(){
return true;
});
Clazz_defineMethod(c$, "remark290", 
function(){
while (this.readHeader(true) != null && this.line.startsWith("REMARK 290")) {
if (this.line.indexOf("NNNMMM   OPERATOR") >= 0) {
while (this.readHeader(true) != null) {
var tokens = this.getTokens();
if (tokens.length < 4) break;
if (this.doApplySymmetry || this.isbiomol) this.setSymmetryOperator(tokens[3]);
}
}}
return false;
});
Clazz_defineMethod(c$, "getSerial", 
function(i, j){
var c = this.line.charAt(i);
var isBase10 = (c == ' ' || this.line.charAt(j - 1) == ' ');
switch (this.serMode) {
default:
case 0:
if (isBase10) return this.parseIntRange(this.line, i, j);
try {
return this.serial = Integer.parseInt(this.line.substring(i, j));
} catch (e) {
if (Clazz_exceptionOf(e, Exception)){
this.serMode = (JU.PT.isDigit(c) ? 1 : 2);
return this.getSerial(i, j);
} else {
throw e;
}
}
case 2:
return (isBase10 || JU.PT.isDigit(c) ? this.parseIntRange(this.line, i, j) : JU.PT.parseIntRadix(this.line.substring(i, j), 36) + (JU.PT.isUpperCase(c) ? -16696160 : 26973856));
case 1:
if (!isBase10) return this.serial = JU.PT.parseIntRadix(this.line.substring(i, j), 16);
this.serMode = 0;
return this.getSerial(i, j);
}
}, "~N,~N");
Clazz_defineMethod(c$, "getSeqNo", 
function(i, j){
var c = this.line.charAt(i);
var isBase10 = (c == ' ' || this.line.charAt(j - 1) == ' ');
switch (this.seqMode) {
default:
case 0:
if (isBase10) return this.parseIntRange(this.line, i, j);
try {
return Integer.parseInt(this.line.substring(i, j));
} catch (e) {
if (Clazz_exceptionOf(e, Exception)){
this.seqMode = (JU.PT.isDigit(c) ? 1 : 2);
return this.getSeqNo(i, j);
} else {
throw e;
}
}
case 2:
return (isBase10 || JU.PT.isDigit(c) ? this.parseIntRange(this.line, i, j) : JU.PT.parseIntRadix(this.line.substring(i, j), 36) + (JU.PT.isUpperCase(c) ? -456560 : 756496));
case 1:
if (!isBase10) return JU.PT.parseIntRadix(this.line.substring(i, j), 16);
this.seqMode = 0;
return this.getSeqNo(i, j);
}
}, "~N,~N");
Clazz_defineMethod(c$, "processAtom", 
function(atom, name, altID, group3, chainID, seqNo, insCode, isHetero, sym){
atom.atomName = name;
if (altID != ' ') atom.altLoc = altID;
atom.group3 = (group3 == null ? "UNK" : group3);
atom.chainID = chainID;
if (this.biomtChainAtomCounts != null) this.biomtChainAtomCounts[chainID % 256]++;
atom.sequenceNumber = seqNo;
atom.insertionCode = J.api.JmolAdapter.canonizeInsertionCode(insCode);
atom.isHetero = isHetero;
atom.elementSymbol = sym;
return atom;
}, "J.adapter.smarter.Atom,~S,~S,~S,~N,~N,~S,~B,~S");
Clazz_defineMethod(c$, "processAtom2", 
function(atom, serial, x, y, z, charge){
atom.atomSerial = serial;
if (serial > this.maxSerial) this.maxSerial = serial;
if (atom.group3 == null) {
if (this.currentGroup3 != null) {
this.currentGroup3 = null;
this.currentResno = -2147483648;
this.htElementsInCurrentGroup = null;
}} else if (!atom.group3.equals(this.currentGroup3) || atom.sequenceNumber != this.currentResno) {
this.currentGroup3 = atom.group3;
this.currentResno = atom.sequenceNumber;
this.htElementsInCurrentGroup = this.htFormul.get(atom.group3);
this.nRes++;
if (atom.group3.equals("UNK")) this.nUNK++;
}this.setAtomCoordXYZ(atom, x, y, z);
atom.formalCharge = charge;
if (this.haveMappedSerials) this.asc.addAtomWithMappedSerialNumber(atom);
 else this.asc.addAtom(atom);
this.setAdditionalAtomParameters(atom);
if (this.ac++ == 0 && !this.isCourseGrained) this.setModelPDB(true);
if (atom.isHetero) {
if (this.htHetero != null) {
this.asc.setCurrentModelInfo("hetNames", this.htHetero);
this.htHetero = null;
}}}, "J.adapter.smarter.Atom,~N,~N,~N,~N,~N");
Clazz_defineMethod(c$, "atom", 
function(){
var isHetero = this.line.startsWith("HETATM");
var atom = this.processAtom( new J.adapter.smarter.Atom(), this.line.substring(12, 16).trim(), this.line.charAt(16), this.parseTokenRange(this.line, 17, 20), this.vwr.getChainID(this.line.substring(21, 22), true), this.getSeqNo(22, 26), this.line.charAt(26), isHetero, this.deduceElementSymbol(isHetero));
if (this.atomTypeLen > 0) {
var s = this.line.substring(this.atomTypePt0, this.atomTypePt0 + this.atomTypeLen).trim();
if (s.length > 0) atom.atomName += "\0" + s;
}if (!this.filterPDBAtom(atom, this.fileAtomIndex++)) return;
var charge = 0;
var x;
var y;
var z;
if (this.gromacsWideFormat) {
x = this.parseFloatRange(this.line, 30, 40);
y = this.parseFloatRange(this.line, 40, 50);
z = this.parseFloatRange(this.line, 50, 60);
} else {
if (this.lineLength >= 80) {
var chMagnitude = this.line.charAt(78);
var chSign = this.line.charAt(79);
if (chSign >= '0' && chSign <= '7') {
var chT = chSign;
chSign = chMagnitude;
chMagnitude = chT;
}if ((chSign == '+' || chSign == '-' || chSign == ' ') && chMagnitude >= '0' && chMagnitude <= '7') {
charge = chMagnitude.charCodeAt(0) - 48;
if (chSign == '-') charge = -charge;
}}x = this.parseFloatRange(this.line, 30, 38);
y = this.parseFloatRange(this.line, 38, 46);
z = this.parseFloatRange(this.line, 46, 54);
}this.processAtom2(atom, this.serial, x, y, z, charge);
});
Clazz_defineMethod(c$, "filterPDBAtom", 
function(atom, iAtom){
if (!this.filterAtom(atom, iAtom)) return false;
if (this.configurationPtr > 0) {
if (atom.sequenceNumber != this.lastGroup || atom.insertionCode != this.lastInsertion) {
this.conformationIndex = this.configurationPtr - 1;
this.lastGroup = atom.sequenceNumber;
this.lastInsertion = atom.insertionCode;
this.lastAltLoc = '\0';
}if (atom.altLoc != '\0') {
var msg = " atom [" + atom.group3 + "]" + atom.sequenceNumber + (atom.insertionCode == '\0' ? "" : "^" + atom.insertionCode) + (atom.chainID == 0 ? "" : ":" + this.vwr.getChainIDStr(atom.chainID)) + "." + atom.atomName + "%" + atom.altLoc + "\n";
if (this.conformationIndex >= 0 && atom.altLoc != this.lastAltLoc) {
this.lastAltLoc = atom.altLoc;
this.conformationIndex--;
}if (this.conformationIndex < 0 && atom.altLoc != this.lastAltLoc) {
this.sbIgnored.append("ignoring").append(msg);
return false;
}this.sbSelected.append("loading").append(msg);
}}return true;
}, "J.adapter.smarter.Atom,~N");
Clazz_defineMethod(c$, "setAdditionalAtomParameters", 
function(atom){
var floatOccupancy;
if (this.gromacsWideFormat) {
floatOccupancy = this.parseFloatRange(this.line, 60, 68);
atom.bfactor = J.adapter.readers.pdb.PdbReader.fixRadius(this.parseFloatRange(this.line, 68, 76));
} else {
floatOccupancy = this.parseFloatRange(this.line, 54, 60);
atom.bfactor = this.parseFloatRange(this.line, 60, 66);
}atom.foccupancy = (Float.isNaN(floatOccupancy) ? 1 : floatOccupancy);
}, "J.adapter.smarter.Atom");
Clazz_defineMethod(c$, "deduceElementSymbol", 
function(isHetero){
if (this.lineLength >= 78) {
var ch76 = this.line.charAt(76);
var ch77 = this.line.charAt(77);
if (ch76 == ' ' && J.adapter.smarter.Atom.isValidSym1(ch77)) return "" + ch77;
if (J.adapter.smarter.Atom.isValidSymNoCase(ch76, ch77)) return "" + ch76 + ch77;
}var ch12 = this.line.charAt(12);
var ch13 = this.line.charAt(13);
if ((this.htElementsInCurrentGroup == null || this.htElementsInCurrentGroup.get(this.line.substring(12, 14)) != null) && J.adapter.smarter.Atom.isValidSymNoCase(ch12, ch13)) return (isHetero || ch12 != 'H' ? "" + ch12 + ch13 : "H");
if (ch12 == 'H') return "H";
if ((this.htElementsInCurrentGroup == null || this.htElementsInCurrentGroup.get("" + ch13) != null) && J.adapter.smarter.Atom.isValidSym1(ch13)) return "" + ch13;
if (ch12 != ' ' && (this.htElementsInCurrentGroup == null || this.htElementsInCurrentGroup.get("" + ch12) != null) && J.adapter.smarter.Atom.isValidSym1(ch12)) return "" + ch12;
var ch14 = this.line.charAt(14);
if (ch12 == ' ' && ch13 != 'X' && (this.htElementsInCurrentGroup == null || this.htElementsInCurrentGroup.get(this.line.substring(13, 15)) != null) && J.adapter.smarter.Atom.isValidSymNoCase(ch13, ch14)) return "" + ch13 + ch14;
return "Xx";
}, "~B");
Clazz_defineMethod(c$, "conect", 
function(){
if (this.sbConect == null) {
this.sbConect =  new JU.SB();
this.sb =  new JU.SB();
} else {
this.sb.setLength(0);
}var sourceSerial = this.getSerial(6, 11);
if (sourceSerial < 0) return;
var order = 1;
var pt1 = this.line.trim().length;
if (pt1 > 56) pt1 = this.line.substring(0, 56).trim().length;
for (var pt = 11; pt < pt1; pt += 5) {
switch (pt) {
case 31:
order = 2048;
break;
case 41:
continue;
}
var targetSerial = this.getSerial(pt, pt + 5);
if (targetSerial < 0) continue;
var isDoubleBond = (sourceSerial == this.lastSourceSerial && targetSerial == this.lastTargetSerial);
if (isDoubleBond) this.haveDoubleBonds = true;
this.lastSourceSerial = sourceSerial;
this.lastTargetSerial = targetSerial;
var isSwapped = (targetSerial < sourceSerial);
var i1;
if (isSwapped) {
i1 = targetSerial;
targetSerial = sourceSerial;
} else {
i1 = sourceSerial;
}var st = ";" + i1 + " " + targetSerial + ";";
if (this.sbConect.indexOf(st) >= 0 && !isDoubleBond) continue;
if (this.haveDoubleBonds) {
var st1 = "--" + st;
if (this.sbConect.indexOf(st1) >= 0) continue;
this.sb.append(st1);
}this.sbConect.append(st);
this.addConnection( Clazz_newIntArray(-1, [i1, targetSerial, order]));
}
this.sbConect.appendSB(this.sb);
});
Clazz_defineMethod(c$, "structure", 
function(){
var structureType = J.c.STR.NONE;
var substructureType = J.c.STR.NONE;
var startChainIDIndex;
var startIndex;
var endChainIDIndex;
var endIndex;
var strandCount = 0;
if (this.line.startsWith("HELIX ")) {
structureType = J.c.STR.HELIX;
startChainIDIndex = 19;
startIndex = 21;
endChainIDIndex = 31;
endIndex = 33;
if (this.line.length >= 40) substructureType = J.adapter.smarter.Structure.getHelixType(this.parseIntRange(this.line, 38, 40));
} else if (this.line.startsWith("SHEET ")) {
structureType = J.c.STR.SHEET;
startChainIDIndex = 21;
startIndex = 22;
endChainIDIndex = 32;
endIndex = 33;
strandCount = this.parseIntRange(this.line, 14, 16);
} else if (this.line.startsWith("TURN  ")) {
structureType = J.c.STR.TURN;
startChainIDIndex = 19;
startIndex = 20;
endChainIDIndex = 30;
endIndex = 31;
} else return;
if (this.lineLength < endIndex + 4) return;
var structureID = this.line.substring(11, 15).trim();
var strandID = this.line.substring(7, 10).trim();
var startChainID = this.vwr.getChainID(this.line.substring(startChainIDIndex, startChainIDIndex + 1), true);
var startSequenceNumber = this.parseIntRange(this.line, startIndex, startIndex + 4);
var startInsertionCode = this.line.charAt(startIndex + 4);
var endChainID = this.vwr.getChainID(this.line.substring(endChainIDIndex, endChainIDIndex + 1), true);
var endSequenceNumber = this.parseIntRange(this.line, endIndex, endIndex + 4);
var endInsertionCode = ' ';
if (this.lineLength > endIndex + 4) endInsertionCode = this.line.charAt(endIndex + 4);
if (substructureType === J.c.STR.NONE) substructureType = structureType;
var structure =  new J.adapter.smarter.Structure(-1, structureType, substructureType, structureID, strandID, strandCount, null);
structure.set(startChainID, startSequenceNumber, startInsertionCode, endChainID, endSequenceNumber, endInsertionCode, 0, 0);
this.asc.addStructure(structure);
});
Clazz_defineMethod(c$, "getModelNumber", 
function(){
var startModelColumn = 6;
var endModelColumn = 14;
if (endModelColumn > this.lineLength) endModelColumn = this.lineLength;
var iModel = this.parseIntRange(this.line, startModelColumn, endModelColumn);
return (iModel == -2147483648 ? 0 : iModel);
});
Clazz_defineMethod(c$, "getModelName", 
function(){
if (this.lineLength < 16) return null;
if (this.line.startsWith("ATOM")) return "";
var name = this.line.substring(15, this.lineLength).trim();
return (name.length == 0 ? null : name);
});
Clazz_defineMethod(c$, "model", 
function(modelNumber, name){
this.checkNotPDB();
if (name == null) name = this.pdbID;
this.haveMappedSerials = (this.thisBiomolecule != null && this.applySymmetry);
this.sbConect = null;
this.asc.newAtomSet();
this.asc.setCurrentModelInfo("pdbID", this.pdbID);
if (this.asc.iSet == 0 || this.isTrajectory) this.asc.setAtomSetName(this.pdbID);
this.asc.setCurrentModelInfo("name", name);
this.checkUnitCellParams();
if (!this.isCourseGrained) this.setModelPDB(true);
this.asc.setCurrentAtomSetNumber(modelNumber);
if (this.isCourseGrained) this.asc.setCurrentModelInfo("courseGrained", Boolean.TRUE);
}, "~N,~S");
Clazz_defineMethod(c$, "checkNotPDB", 
function(){
var isPDB = (!this.isCourseGrained && (this.nRes == 0 || this.nUNK != this.nRes));
this.checkNearAtoms = !isPDB;
this.setModelPDB(isPDB);
this.nUNK = this.nRes = 0;
this.currentGroup3 = null;
});
Clazz_defineMethod(c$, "cryst1", 
function(){
var a = this.$cryst1 = this.getFloat(6, 9);
if (a == 1) a = NaN;
this.setUnitCell(a, this.getFloat(15, 9), this.getFloat(24, 9), this.getFloat(33, 7), this.getFloat(40, 7), this.getFloat(47, 7));
this.addSpaceGroupName(JU.PT.parseTrimmedRange(this.line, 55, 66));
});
Clazz_defineMethod(c$, "addSpaceGroupName", 
function(name){
if (this.isbiomol) this.doConvertToFractional = false;
if (this.sgName == null || this.sgName.equals("unspecified!")) this.setSpaceGroupName(name);
this.fileSgName = this.sgName;
}, "~S");
Clazz_defineMethod(c$, "getFloat", 
function(ich, cch){
return this.parseFloatRange(this.line, ich, ich + cch);
}, "~N,~N");
Clazz_defineMethod(c$, "scale", 
function(n){
if (this.unitCellParams == null) return;
var pt = n * 4 + 2;
this.unitCellParams[0] = this.$cryst1;
this.setUnitCellItem(pt++, this.getFloat(10, 10));
this.setUnitCellItem(pt++, this.getFloat(20, 10));
this.setUnitCellItem(pt++, this.getFloat(30, 10));
this.setUnitCellItem(pt++, this.getFloat(45, 10));
if (this.isbiomol) this.doConvertToFractional = false;
}, "~N");
Clazz_defineMethod(c$, "expdta", 
function(){
if (this.line.toUpperCase().indexOf("NMR") >= 0) this.asc.setInfo("isNMRdata", "true");
});
Clazz_defineMethod(c$, "formul", 
function(){
var groupName = this.parseTokenRange(this.line, 12, 15);
var formula = JU.PT.parseTrimmedRange(this.line, 19, 70);
var ichLeftParen = formula.indexOf('(');
if (ichLeftParen >= 0) {
var ichRightParen = formula.indexOf(')');
if (ichRightParen < 0 || ichLeftParen >= ichRightParen || ichLeftParen + 1 == ichRightParen) return;
formula = JU.PT.parseTrimmedRange(formula, ichLeftParen + 1, ichRightParen);
}var htElementsInGroup = this.htFormul.get(groupName);
if (htElementsInGroup == null) this.htFormul.put(groupName, htElementsInGroup =  new java.util.Hashtable());
this.next[0] = 0;
var elementWithCount;
while ((elementWithCount = this.parseTokenNext(formula)) != null) {
if (elementWithCount.length < 2) continue;
var chFirst = elementWithCount.charAt(0);
var chSecond = elementWithCount.charAt(1);
if (J.adapter.smarter.Atom.isValidSymNoCase(chFirst, chSecond)) htElementsInGroup.put("" + chFirst + chSecond, Boolean.TRUE);
 else if (J.adapter.smarter.Atom.isValidSym1(chFirst)) htElementsInGroup.put("" + chFirst, Boolean.TRUE);
}
});
Clazz_defineMethod(c$, "het", 
function(){
if (this.line.length < 30) {
return;
}if (this.htHetero == null) {
this.htHetero =  new java.util.Hashtable();
}var groupName = this.parseTokenRange(this.line, 7, 10);
if (this.htHetero.containsKey(groupName)) {
return;
}var hetName = JU.PT.parseTrimmedRange(this.line, 30, 70);
this.htHetero.put(groupName, hetName);
});
Clazz_defineMethod(c$, "hetnam", 
function(){
if (this.htHetero == null) {
this.htHetero =  new java.util.Hashtable();
}var groupName = this.parseTokenRange(this.line, 11, 14);
var hetName = JU.PT.parseTrimmedRange(this.line, 15, 70);
if (groupName == null) {
JU.Logger.error("ERROR: HETNAM record does not contain a group name: " + this.line);
return;
}var htName = this.htHetero.get(groupName);
if (htName != null) {
hetName = htName + hetName;
}this.htHetero.put(groupName, hetName);
this.appendLoadNote(groupName + " = " + hetName);
});
Clazz_defineMethod(c$, "anisou", 
function(){
var data =  Clazz_newFloatArray (8, 0);
data[6] = 1;
var serial = this.line.substring(6, 11).trim();
if (!this.haveMappedSerials && this.asc.ac > 0) {
for (var i = this.asc.getAtomSetAtomIndex(this.asc.iSet); i < this.asc.ac; i++) {
var atomSerial = this.asc.atoms[i].atomSerial;
if (atomSerial != -2147483648) this.asc.atomSymbolicMap.put("" + atomSerial, this.asc.atoms[i]);
}
this.haveMappedSerials = true;
}var atom = this.asc.getAtomFromName(serial);
if (atom == null) {
return;
}for (var i = 28, pt = 0; i < 70; i += 7, pt++) data[pt] = this.parseFloatRange(this.line, i, i + 7);

for (var i = 0; i < 6; i++) {
if (Float.isNaN(data[i])) {
JU.Logger.error("Bad ANISOU record: " + this.line);
return;
}data[i] /= 10000;
}
this.asc.setAnisoBorU(atom, data, 12);
});
Clazz_defineMethod(c$, "site", 
function(){
if (this.htSites == null) {
this.htSites =  new java.util.Hashtable();
}var nResidues = this.parseIntRange(this.line, 15, 17);
var siteID = JU.PT.parseTrimmedRange(this.line, 11, 14);
var htSite = this.htSites.get(siteID);
if (htSite == null) {
htSite =  new java.util.Hashtable();
htSite.put("nResidues", Integer.$valueOf(nResidues));
htSite.put("groups", "");
this.htSites.put(siteID, htSite);
}var groups = htSite.get("groups");
for (var i = 0; i < 4; i++) {
var pt = 18 + i * 11;
var resName = JU.PT.parseTrimmedRange(this.line, pt, pt + 3);
if (resName.length == 0) break;
var chainID = JU.PT.parseTrimmedRange(this.line, pt + 4, pt + 5);
var seq = JU.PT.parseTrimmedRange(this.line, pt + 5, pt + 9);
var iCode = JU.PT.parseTrimmedRange(this.line, pt + 9, pt + 10);
groups += (groups.length == 0 ? "" : ",") + "[" + resName + "]" + seq;
if (iCode.length > 0) groups += "^" + iCode;
if (chainID.length > 0) groups += ":" + chainID;
htSite.put("groups", groups);
}
});
Clazz_defineMethod(c$, "remarkTls", 
function(){
var nGroups = 0;
var iGroup = 0;
var components = null;
var tlsGroups = null;
var tlsGroup = null;
var ranges = null;
var range = null;
var remark = this.line.substring(0, 11);
while (this.readHeader(true) != null && this.line.startsWith(remark)) {
try {
var tokens = JU.PT.getTokens(this.line.substring(10).$replace(':', ' '));
if (tokens.length < 2) continue;
JU.Logger.info(this.line);
if (tokens[1].equalsIgnoreCase("GROUP")) {
tlsGroup =  new java.util.Hashtable();
ranges =  new JU.Lst();
tlsGroup.put("ranges", ranges);
tlsGroups.addLast(tlsGroup);
this.tlsGroupID = this.parseIntStr(tokens[tokens.length - 1]);
tlsGroup.put("id", Integer.$valueOf(this.tlsGroupID));
} else if (tokens[0].equalsIgnoreCase("NUMBER")) {
if (tokens[2].equalsIgnoreCase("COMPONENTS")) {
} else {
nGroups = this.parseIntStr(tokens[tokens.length - 1]);
if (nGroups < 1) break;
if (this.vTlsModels == null) this.vTlsModels =  new JU.Lst();
tlsGroups =  new JU.Lst();
this.appendLoadNote(this.line.substring(11).trim());
}} else if (tokens[0].equalsIgnoreCase("COMPONENTS")) {
components = this.line;
} else if (tokens[0].equalsIgnoreCase("RESIDUE")) {
range =  new java.util.Hashtable();
var chain1;
var chain2;
var res1;
var res2;
if (tokens.length == 6) {
chain1 = tokens[2].charAt(0);
chain2 = tokens[4].charAt(0);
res1 = this.parseIntStr(tokens[3]);
res2 = this.parseIntStr(tokens[5]);
} else {
var toC = components.indexOf(" C ");
var fromC = components.indexOf(" C ", toC + 4);
chain1 = this.line.charAt(fromC);
chain2 = this.line.charAt(toC);
res1 = this.parseIntRange(this.line, fromC + 1, toC);
res2 = this.parseIntStr(this.line.substring(toC + 1));
}if (chain1 == chain2) {
range.put("chains", "" + chain1 + chain2);
if (res1 <= res2) {
range.put("residues",  Clazz_newIntArray(-1, [res1, res2]));
ranges.addLast(range);
} else {
this.tlsAddError(" TLS group residues are not in order (range ignored)");
}} else {
this.tlsAddError(" TLS group chains are different (range ignored)");
}} else if (tokens[0].equalsIgnoreCase("SELECTION")) {
var chain = '\u0000';
for (var i = 1; i < tokens.length; i++) {
if (tokens[i].toUpperCase().indexOf("CHAIN") >= 0) {
chain = tokens[++i].charAt(0);
continue;
}var resno = this.parseIntStr(tokens[i]);
if (resno == -2147483648) continue;
range =  new java.util.Hashtable();
range.put("residues",  Clazz_newIntArray(-1, [resno, this.parseIntStr(tokens[++i])]));
if (chain != '\0') range.put("chains", "" + chain + chain);
ranges.addLast(range);
}
} else if (tokens[0].equalsIgnoreCase("ORIGIN")) {
var origin =  new JU.P3();
tlsGroup.put("origin", origin);
if (tokens.length == 8) {
origin.set(this.parseFloatStr(tokens[5]), this.parseFloatStr(tokens[6]), this.parseFloatStr(tokens[7]));
} else {
var n = this.line.length;
origin.set(this.parseFloatRange(this.line, n - 27, n - 18), this.parseFloatRange(this.line, n - 18, n - 9), this.parseFloatRange(this.line, n - 9, n));
}if (Float.isNaN(origin.x) || Float.isNaN(origin.y) || Float.isNaN(origin.z)) {
origin.set(NaN, NaN, NaN);
this.tlsAddError("invalid origin: " + this.line);
}} else if (tokens[1].equalsIgnoreCase("TENSOR")) {
var tensorType = tokens[0].charAt(0);
var s = (this.readHeader(true).substring(10) + this.readHeader(true).substring(10) + this.readHeader(true).substring(10)).$replace(tensorType, ' ').$replace(':', ' ');
tokens = JU.PT.getTokens(s);
var data =  Clazz_newFloatArray (3, 3, 0);
tlsGroup.put("t" + tensorType, data);
for (var i = 0; i < tokens.length; i++) {
var ti = (tokens[i].charAt(0)).charCodeAt(0) - 49;
var tj = (tokens[i].charAt(1)).charCodeAt(0) - 49;
data[ti][tj] = this.parseFloatStr(tokens[++i]);
if (ti < tj) data[tj][ti] = data[ti][tj];
}
for (var i = 0; i < 3; i++) for (var j = 0; j < 3; j++) if (Float.isNaN(data[i][j])) this.tlsAddError("invalid tensor: " + JU.Escape.escapeFloatAA(data, false));


if (tensorType == 'S' && ++iGroup == nGroups) {
JU.Logger.info(nGroups + " TLS groups read");
this.readHeader(true);
break;
}}} catch (e) {
if (Clazz_exceptionOf(e, Exception)){
JU.Logger.error(this.line + "\nError in TLS parser: ");
System.out.println(e.getMessage());
tlsGroups = null;
break;
} else {
throw e;
}
}
}
if (tlsGroups != null) {
var tlsModel =  new java.util.Hashtable();
tlsModel.put("groupCount", Integer.$valueOf(nGroups));
tlsModel.put("groups", tlsGroups);
this.vTlsModels.addLast(tlsModel);
}return (nGroups < 1);
});
Clazz_defineMethod(c$, "handleTlsMissingModels", 
function(){
this.vTlsModels = null;
});
Clazz_defineMethod(c$, "setTlsGroups", 
function(iGroup, iModel, symmetry){
JU.Logger.info("TLS model " + (iModel + 1) + " set " + (iGroup + 1));
var tlsGroupInfo = this.vTlsModels.get(iGroup);
var groups = tlsGroupInfo.get("groups");
var index0 = this.asc.getAtomSetAtomIndex(iModel);
var data =  Clazz_newFloatArray (this.asc.getAtomSetAtomCount(iModel), 0);
var indexMax = index0 + data.length;
var atoms = this.asc.atoms;
var nGroups = groups.size();
for (var i = 0; i < nGroups; i++) {
var group = groups.get(i);
var ranges = group.get("ranges");
this.tlsGroupID = (group.get("id")).intValue();
for (var j = ranges.size(); --j >= 0; ) {
var chains = ranges.get(j).get("chains");
var residues = ranges.get(j).get("residues");
var chain0 = 0 + (chains.charAt(0)).charCodeAt(0);
var chain1 = 0 + (chains.charAt(1)).charCodeAt(0);
var res0 = residues[0];
var res1 = residues[1];
var index1 = this.findAtomForRange(index0, indexMax, chain0, res0, false);
var index2 = (index1 >= 0 ? this.findAtomForRange(index1, indexMax, chain1, res1, false) : -1);
if (index2 < 0) {
JU.Logger.info("TLS processing terminated");
return;
}JU.Logger.info("TLS ID=" + this.tlsGroupID + " model atom index range " + index1 + "-" + index2);
var isSameChain = (chain0 == chain1);
for (var iAtom = index0; iAtom < indexMax; iAtom++) {
var atom = atoms[iAtom];
if (isSameChain ? atom.sequenceNumber >= res0 && atom.sequenceNumber <= res1 : atom.chainID > chain0 && atom.chainID < chain1 || atom.chainID == chain0 && atom.sequenceNumber >= res0 || atom.chainID == chain1 && atom.sequenceNumber <= res1) {
data[iAtom - index0] = this.tlsGroupID;
this.setTlsTensor(atom, group, symmetry);
}}
}
}
this.asc.setAtomProperties("tlsGroup", data, iModel, true);
this.asc.setModelInfoForSet("TLS", tlsGroupInfo, iModel);
this.asc.setTensors();
}, "~N,~N,J.adapter.smarter.XtalSymmetry.FileSymmetry");
Clazz_defineMethod(c$, "findAtomForRange", 
function(atom1, atom2, chain, resno, isLast){
var iAtom = this.findAtom(atom1, atom2, chain, resno, true);
return (isLast && iAtom >= 0 ? this.findAtom(iAtom, atom2, chain, resno, false) : iAtom);
}, "~N,~N,~N,~N,~B");
Clazz_defineMethod(c$, "findAtom", 
function(atom1, atom2, chain, resno, isTrue){
var atoms = this.asc.atoms;
for (var i = atom1; i < atom2; i++) {
var atom = atoms[i];
if ((atom.chainID == chain && atom.sequenceNumber == resno) == isTrue) return i;
}
if (isTrue) {
JU.Logger.warn("PdbReader findAtom chain=" + chain + " resno=" + resno + " not found");
this.tlsAddError("atom not found: chain=" + chain + " resno=" + resno);
}return (isTrue ? -1 : atom2);
}, "~N,~N,~N,~N,~B");
Clazz_defineMethod(c$, "setTlsTensor", 
function(atom, group, symmetry){
var origin = group.get("origin");
if (Float.isNaN(origin.x)) return;
var T = group.get("tT");
var L = group.get("tL");
var S = group.get("tS");
if (T == null || L == null || S == null) return;
var x = ((atom.x - origin.x) * 0.017453292519943295);
var y = ((atom.y - origin.y) * 0.017453292519943295);
var z = ((atom.z - origin.z) * 0.017453292519943295);
var xx = x * x;
var yy = y * y;
var zz = z * z;
var xy = x * y;
var xz = x * z;
var yz = y * z;
this.dataT[0] = T[0][0];
this.dataT[1] = T[1][1];
this.dataT[2] = T[2][2];
this.dataT[3] = T[0][1];
this.dataT[4] = T[0][2];
this.dataT[5] = T[1][2];
this.dataT[6] = 12;
var anisou =  Clazz_newFloatArray (8, 0);
var bresidual = (Float.isNaN(atom.bfactor) ? 0 : (atom.bfactor / 78.95683520871486));
anisou[0] = this.dataT[0] + L[1][1] * zz + L[2][2] * yy - 2 * L[1][2] * yz + 2 * S[1][0] * z - 2 * S[2][0] * y;
anisou[1] = this.dataT[1] + L[0][0] * zz + L[2][2] * xx - 2 * L[2][0] * xz - 2 * S[0][1] * z + 2 * S[2][1] * x;
anisou[2] = this.dataT[2] + L[0][0] * yy + L[1][1] * xx - 2 * L[0][1] * xy - 2 * S[1][2] * x + 2 * S[0][2] * y;
anisou[3] = this.dataT[3] - L[2][2] * xy + L[1][2] * xz + L[2][0] * yz - L[0][1] * zz - S[0][0] * z + S[1][1] * z + S[2][0] * x - S[2][1] * y;
anisou[4] = this.dataT[4] - L[1][1] * xz + L[1][2] * xy - L[2][0] * yy + L[0][1] * yz + S[0][0] * y - S[2][2] * y + S[1][2] * z - S[1][0] * x;
anisou[5] = this.dataT[5] - L[0][0] * yz - L[1][2] * xx + L[2][0] * xy + L[0][1] * xz - S[1][1] * x + S[2][2] * x + S[0][1] * y - S[0][2] * z;
anisou[6] = 12;
anisou[7] = bresidual;
if (this.tlsU == null) this.tlsU =  new java.util.Hashtable();
this.tlsU.put(atom, anisou);
atom.addTensor(symmetry.getTensor(this.vwr, this.dataT).setType(null), "TLS-U", false);
}, "J.adapter.smarter.Atom,java.util.Map,J.adapter.smarter.XtalSymmetry.FileSymmetry");
Clazz_defineMethod(c$, "tlsAddError", 
function(error){
if (this.sbTlsErrors == null) this.sbTlsErrors =  new JU.SB();
this.sbTlsErrors.append(this.fileName).appendC('\t').append("TLS group ").appendI(this.tlsGroupID).appendC('\t').append(error).appendC('\n');
}, "~S");
c$.fixRadius = Clazz_defineMethod(c$, "fixRadius", 
function(r){
return (r < 0.9 ? 1 : r);
}, "~N");
Clazz_defineMethod(c$, "addConnection", 
function(is){
if (this.vConnect == null) {
this.connectLast = null;
this.vConnect =  new JU.Lst();
}if (this.connectLast != null) {
if (is[0] == this.connectLast[0] && is[1] == this.connectLast[1] && is[2] != 2048) {
this.connectLast[2]++;
return;
}}this.vConnect.addLast(this.connectLast = is);
}, "~A");
Clazz_defineMethod(c$, "connectAllBad", 
function(maxSerial){
var firstAtom = this.connectNextAtomIndex;
for (var i = this.connectNextAtomSet; i < this.asc.atomSetCount; i++) {
var count = this.asc.getAtomSetAtomCount(i);
this.asc.setModelInfoForSet("PDB_CONECT_firstAtom_count_max",  Clazz_newIntArray(-1, [firstAtom, count, maxSerial]), i);
if (this.vConnect != null) {
this.asc.setModelInfoForSet("PDB_CONECT_bonds", this.vConnect, i);
this.asc.setGlobalBoolean(3);
}firstAtom += count;
}
this.vConnect = null;
this.connectNextAtomSet = this.asc.iSet + 1;
this.connectNextAtomIndex = firstAtom;
}, "~N");
Clazz_defineMethod(c$, "connectAll", 
function(maxSerial, isConnectStateBug){
var a = this.asc;
var index = a.iSet;
if (index < 0) return;
if (isConnectStateBug) {
this.connectAllBad(maxSerial);
return;
}a.setCurrentModelInfo("PDB_CONECT_firstAtom_count_max",  Clazz_newIntArray(-1, [a.getAtomSetAtomIndex(index), a.getAtomSetAtomCount(index), maxSerial]));
if (this.vConnect == null) return;
var firstAtom = this.connectNextAtomIndex;
for (var i = a.atomSetCount; --i >= this.connectNextAtomSet; ) {
a.setModelInfoForSet("PDB_CONECT_bonds", this.vConnect, i);
a.setGlobalBoolean(3);
firstAtom += a.getAtomSetAtomCount(i);
}
this.vConnect = null;
this.connectNextAtomSet = index + 1;
this.connectNextAtomIndex = firstAtom;
}, "~N,~B");
});
;//5.0.1-v7 Tue Mar 17 09:56:02 CDT 2026
Clazz_declarePackage("J.adapter.smarter");
Clazz_load(null, "J.adapter.smarter.Structure", ["J.c.STR"], function(){
var c$ = Clazz_decorateAsClass(function(){
this.structureType = null;
this.substructureType = null;
this.structureID = null;
this.strandID = null;
this.strandCount = 0;
this.startSequenceNumber = 0;
this.startChainID = 0;
this.startInsertionCode = '\0';
this.endSequenceNumber = 0;
this.endChainID = 0;
this.endInsertionCode = '\0';
this.atomStartEnd = null;
this.modelStartEnd = null;
this.bsAll = null;
Clazz_instantialize(this, arguments);}, J.adapter.smarter, "Structure", null, Cloneable);
Clazz_prepareFields (c$, function(){
this.atomStartEnd =  Clazz_newIntArray (2, 0);
this.modelStartEnd =  Clazz_newIntArray(-1, [-1, -1]);
});
Clazz_makeConstructor(c$, 
function(modelIndex, structureType, substructureType, structureID, strandID, strandCount, bsAll){
if (bsAll != null) {
this.modelStartEnd =  Clazz_newIntArray(-1, [0, modelIndex]);
this.bsAll = bsAll;
return;
}this.structureType = structureType;
this.substructureType = substructureType;
if (structureID == null) return;
this.modelStartEnd[0] = this.modelStartEnd[1] = modelIndex;
this.structureID = structureID;
this.strandCount = strandCount;
this.strandID = strandID;
}, "~N,J.c.STR,J.c.STR,~S,~S,~N,~A");
c$.getHelixType = Clazz_defineMethod(c$, "getHelixType", 
function(type){
switch (type) {
case 1:
return J.c.STR.HELIXALPHA;
case 3:
return J.c.STR.HELIXPI;
case 5:
return J.c.STR.HELIX310;
}
return J.c.STR.HELIX;
}, "~N");
Clazz_defineMethod(c$, "set", 
function(startChainID, startSequenceNumber, startInsertionCode, endChainID, endSequenceNumber, endInsertionCode, istart, iend){
this.startChainID = startChainID;
this.startSequenceNumber = startSequenceNumber;
this.startInsertionCode = startInsertionCode;
this.endChainID = endChainID;
this.endSequenceNumber = endSequenceNumber;
this.endInsertionCode = endInsertionCode;
this.atomStartEnd[0] = istart;
this.atomStartEnd[1] = iend;
}, "~N,~N,~S,~N,~N,~S,~N,~N");
Clazz_defineMethod(c$, "clone", 
function(){
var s = null;
try {
s = Clazz_superCall(this, J.adapter.smarter.Structure, "clone", []);
} catch (e) {
if (Clazz_exceptionOf(e,"CloneNotSupportedException")){
} else {
throw e;
}
}
return s;
});
});
;//5.0.1-v7 Sat Feb 21 18:17:38 CST 2026
Clazz_declarePackage("JM");
Clazz_load(["JM.Group"], "JM.Monomer", ["JU.Measure", "$.P3", "$.Quat", "J.c.STR", "JM.BioResolver", "JU.Escape", "$.Logger", "JV.JC"], function(){
var c$ = Clazz_decorateAsClass(function(){
this.bioPolymer = null;
this.offsets = null;
this.monomerIndex = -1;
this.phi = NaN;
this.psi = NaN;
this.omega = NaN;
this.straightness = NaN;
this.mu = NaN;
this.theta = NaN;
this.backboneBlockVis = false;
Clazz_instantialize(this, arguments);}, JM, "Monomer", JM.Group);
Clazz_makeConstructor(c$, 
function(){
Clazz_superConstructor (this, JM.Monomer, []);
});
c$.have = Clazz_defineMethod(c$, "have", 
function(offsets, n){
return (offsets[n] & 0xFF) != 0xFF;
}, "~A,~N");
Clazz_defineMethod(c$, "set2", 
function(chain, group3, seqcode, firstAtomIndex, lastAtomIndex, interestingAtomOffsets){
this.setGroup(chain, group3, seqcode, firstAtomIndex, lastAtomIndex);
this.offsets = interestingAtomOffsets;
this.setLeadAtomIndex();
return this;
}, "JM.Chain,~S,~N,~N,~N,~A");
Clazz_defineMethod(c$, "setLeadAtomIndex", 
function(){
var offset = this.offsets[0] & 0xFF;
if (offset != 255) this.leadAtomIndex = this.firstAtomIndex + offset;
});
Clazz_defineMethod(c$, "setBioPolymer", 
function(polymer, index){
this.bioPolymer = polymer;
this.monomerIndex = index;
}, "JM.BioPolymer,~N");
Clazz_overrideMethod(c$, "getSelectedMonomerCount", 
function(){
return (this.bioPolymer == null ? 0 : this.bioPolymer.getSelectedMonomerCount());
});
Clazz_overrideMethod(c$, "getSelectedMonomerIndex", 
function(){
return (this.bioPolymer == null || !this.bioPolymer.isMonomerSelected(this.monomerIndex) ? -1 : this.monomerIndex);
});
Clazz_overrideMethod(c$, "getBioPolymerLength", 
function(){
return (this.bioPolymer == null ? 0 : this.bioPolymer.monomerCount);
});
Clazz_defineMethod(c$, "getMonomerIndex", 
function(){
return this.monomerIndex;
});
Clazz_overrideMethod(c$, "getAtomIndex", 
function(name, offset){
if (this.bioPolymer != null) {
var groups = this.bioPolymer.monomers;
var ipt = this.monomerIndex + offset;
if (ipt >= 0 && ipt < groups.length) {
var m = groups[ipt];
if (offset == 1 && !m.isConnectedPrevious()) return -1;
if ("\0".equals(name)) return m.leadAtomIndex;
var atoms = this.chain.model.ms.at;
for (var i = m.firstAtomIndex; i <= m.lastAtomIndex; i++) if (atoms[i] != null && (name == null || name.equalsIgnoreCase(atoms[i].getAtomName()))) return i;

}}return -1;
}, "~S,~N");
Clazz_defineMethod(c$, "getBioPolymerIndexInModel", 
function(){
return (this.bioPolymer == null ? -1 : this.bioPolymer.bioPolymerIndexInModel);
});
c$.scanForOffsets = Clazz_defineMethod(c$, "scanForOffsets", 
function(firstAtomIndex, specialAtomIndexes, interestingAtomIDs){
var interestingCount = interestingAtomIDs.length;
var offsets =  Clazz_newByteArray (interestingCount, 0);
for (var i = interestingCount; --i >= 0; ) {
var atomIndex;
var atomID = interestingAtomIDs[i];
if (atomID < 0) {
atomIndex = specialAtomIndexes[~atomID];
} else {
atomIndex = specialAtomIndexes[atomID];
if (atomIndex < 0) return null;
}var offset;
if (atomIndex < 0) offset = 255;
 else {
offset = atomIndex - firstAtomIndex;
if (offset < 0 || offset > 254) {
JU.Logger.warn("Monomer.scanForOffsets i=" + i + " atomID=" + atomID + " atomIndex:" + atomIndex + " firstAtomIndex:" + firstAtomIndex + " offset out of 0-254 range. Groups aren't organized correctly. Is this really a protein?: " + offset);
if (atomID < 0) {
offset = 255;
} else {
}}}offsets[i] = offset;
}
return offsets;
}, "~N,~A,~A");
Clazz_overrideMethod(c$, "getProteinStructureType", 
function(){
return J.c.STR.NONE;
});
Clazz_defineMethod(c$, "isHelix", 
function(){
return false;
});
Clazz_defineMethod(c$, "isSheet", 
function(){
return false;
});
Clazz_overrideMethod(c$, "setStrucNo", 
function(id){
}, "~N");
Clazz_defineMethod(c$, "getAtomFromOffsetIndex", 
function(offsetIndex){
if (offsetIndex > this.offsets.length) return null;
var offset = this.offsets[offsetIndex] & 0xFF;
return (offset == 255 ? null : this.chain.model.ms.at[this.firstAtomIndex + offset]);
}, "~N");
Clazz_defineMethod(c$, "getSpecialAtom", 
function(interestingIDs, specialAtomID){
for (var i = interestingIDs.length; --i >= 0; ) {
var interestingID = interestingIDs[i];
if (interestingID < 0) interestingID = -interestingID;
if (specialAtomID == interestingID) {
var offset = this.offsets[i] & 0xFF;
return (offset == 255 ? null : this.chain.model.ms.at[this.firstAtomIndex + offset]);
}}
return null;
}, "~A,~N");
Clazz_defineMethod(c$, "getSpecialAtomPoint", 
function(interestingIDs, specialAtomID){
for (var i = interestingIDs.length; --i >= 0; ) {
var interestingID = interestingIDs[i];
if (interestingID < 0) interestingID = -interestingID;
if (specialAtomID == interestingID) {
var offset = this.offsets[i] & 0xFF;
return (offset == 255 ? null : this.chain.model.ms.at[this.firstAtomIndex + offset]);
}}
return null;
}, "~A,~N");
Clazz_overrideMethod(c$, "isLeadAtom", 
function(atomIndex){
return atomIndex == this.leadAtomIndex;
}, "~N");
Clazz_overrideMethod(c$, "getLeadAtom", 
function(){
return this.getAtomFromOffsetIndex(0);
});
Clazz_defineMethod(c$, "getWingAtom", 
function(){
return this.getAtomFromOffsetIndex(1);
});
Clazz_defineMethod(c$, "getInitiatorAtom", 
function(){
return this.getLeadAtom();
});
Clazz_defineMethod(c$, "getTerminatorAtom", 
function(){
return this.getLeadAtom();
});
Clazz_defineMethod(c$, "findNearestAtomIndex", 
function(x, y, closest, madBegin, madEnd){
}, "~N,~N,~A,~N,~N");
Clazz_defineMethod(c$, "getMyInfo", 
function(ptTemp){
var info = this.getGroupInfo(this.groupIndex, ptTemp);
info.put("chain", this.chain.getIDStr());
var seqNum = this.getResno();
if (seqNum > 0) info.put("sequenceNumber", Integer.$valueOf(seqNum));
var insCode = this.getInsertionCode();
if (insCode.charCodeAt(0) != 0) info.put("insertionCode", "" + insCode);
var f = this.getGroupParameter(1111490569);
if (!Float.isNaN(f)) info.put("phi", Float.$valueOf(f));
f = this.getGroupParameter(1111490570);
if (!Float.isNaN(f)) info.put("psi", Float.$valueOf(f));
f = this.getGroupParameter(1111490565);
if (!Float.isNaN(f)) info.put("mu", Float.$valueOf(f));
f = this.getGroupParameter(1111490576);
if (!Float.isNaN(f)) info.put("theta", Float.$valueOf(f));
var structure = this.getStructure();
if (Clazz_instanceOf(structure,"JM.ProteinStructure")) {
info.put("structureId", Integer.$valueOf((structure).strucNo));
info.put("structureType", (structure).type.getBioStructureTypeName(false));
}info.put("shapeVisibilityFlags", Integer.$valueOf(this.shapeVisibilityFlags));
return info;
}, "JU.P3");
Clazz_overrideMethod(c$, "getStructureId", 
function(){
var structure = this.getStructure();
return (Clazz_instanceOf(structure,"JM.ProteinStructure") ? (structure).type.getBioStructureTypeName(false) : "");
});
Clazz_defineMethod(c$, "updateOffsetsForAlternativeLocations", 
function(atoms, bsSelected){
var updated = false;
for (var offsetIndex = this.offsets.length; --offsetIndex >= 0; ) {
var offset = this.offsets[offsetIndex] & 0xFF;
if (offset == 255) continue;
var iThis = this.firstAtomIndex + offset;
var atom = atoms[iThis];
var thisID = atom.atomID;
if (atom.altloc.charCodeAt(0) == 0) continue;
var nScan = this.lastAtomIndex - this.firstAtomIndex;
for (var i = 1; i <= nScan; i++) {
var iNew = iThis + i;
if (iNew > this.lastAtomIndex) iNew -= nScan + 1;
var offsetNew = iNew - this.firstAtomIndex;
if (offsetNew < 0 || offsetNew > 255 || iNew == iThis || !bsSelected.get(iNew)) continue;
var atomID = atoms[iNew].atomID;
if (atomID != thisID || atomID == 0 && !atoms[iNew].getAtomName().equals(atom.getAtomName())) continue;
this.offsets[offsetIndex] = offsetNew;
atoms[iNew].nBackbonesDisplayed = atom.nBackbonesDisplayed;
updated = true;
break;
}
}
this.setLeadAtomIndex();
return updated;
}, "~A,JU.BS");
Clazz_defineMethod(c$, "getMonomerSequenceAtoms", 
function(bsInclude, bsResult){
this.setAtomBits(bsResult);
bsResult.and(bsInclude);
}, "JU.BS,JU.BS");
c$.checkOptional = Clazz_defineMethod(c$, "checkOptional", 
function(offsets, atom, firstAtomIndex, index){
if (JM.Monomer.have(offsets, atom)) return true;
if (index < 0) return false;
offsets[atom] = (index - firstAtomIndex);
return true;
}, "~A,~N,~N,~N");
Clazz_defineMethod(c$, "getQuaternionFrameCenter", 
function(qtype){
return null;
}, "~S");
Clazz_defineMethod(c$, "getHelixData2", 
function(tokType, qType, mStep){
if (this.monomerIndex < 0) return null;
var iPrev = this.monomerIndex - mStep;
var prev = (mStep < 1 || this.monomerIndex <= 0 ? null : this.bioPolymer.monomers[iPrev]);
var q2 = this.getQuaternion(qType);
var q1 = (mStep < 1 ? JU.Quat.getQuaternionFrameV(JV.JC.axisX, JV.JC.axisY, JV.JC.axisZ, false) : prev == null ? null : prev.getQuaternion(qType));
if (q1 == null || q2 == null) return Clazz_superCall(this, JM.Monomer, "getHelixData", [tokType, qType, mStep]);
var a = (mStep < 1 ? JU.P3.new3(0, 0, 0) : prev.getQuaternionFrameCenter(qType));
var b = this.getQuaternionFrameCenter(qType);
return (a == null || b == null ? this.getHelixData(tokType, qType, mStep) : JU.Escape.escapeHelical((tokType == 135176 ? "helixaxis" + this.getUniqueID() : null), tokType, a, b, JU.Measure.computeHelicalAxis(a, b, q2.div(q1))));
}, "~N,~S,~N");
Clazz_defineMethod(c$, "getUniqueID", 
function(){
var cid = this.chain.chainID;
var a = this.getLeadAtom();
var id = (a == null ? "" : "_" + a.mi) + "_" + this.getResno() + (cid == 0 ? "" : "_" + cid);
var aid = (a == null ? '\0' : this.getLeadAtom().altloc);
if (aid != '\0') id += "_" + aid;
return id;
});
Clazz_overrideMethod(c$, "isCrossLinked", 
function(g){
for (var i = this.firstAtomIndex; i <= this.lastAtomIndex; i++) if (this.getCrossLinkGroup(i, null, g, true, true, false)) return true;

return false;
}, "JM.Group");
Clazz_overrideMethod(c$, "getCrossLinkVector", 
function(vReturn, crosslinkCovalent, crosslinkHBond){
var isNotCheck = (vReturn == null);
for (var i = this.firstAtomIndex; i <= this.lastAtomIndex; i++) if (this.getCrossLinkGroup(i, vReturn, null, crosslinkCovalent, crosslinkHBond, isNotCheck) && isNotCheck) return true;

return !isNotCheck && vReturn.size() > 0;
}, "JU.Lst,~B,~B");
Clazz_defineMethod(c$, "getCrossLinkGroup", 
function(i, vReturn, group, crosslinkCovalent, crosslinkHBond, isNotCheck){
var atom = this.chain.model.ms.at[i];
var bonds = atom.bonds;
var ibp = this.getBioPolymerIndexInModel();
if (ibp < 0 || bonds == null) return false;
var haveCrossLink = false;
var checkPrevious = (!isNotCheck && vReturn == null && group == null);
for (var j = 0; j < bonds.length; j++) {
var b = bonds[j];
if (b.isCovalent() ? !crosslinkCovalent : !crosslinkHBond) continue;
var a = b.getOtherAtom(atom);
var g = a.group;
if (group != null && g !== group) continue;
var iPolymer = g.getBioPolymerIndexInModel();
var igroup = g.getMonomerIndex();
if (checkPrevious) {
if (iPolymer == ibp && igroup == this.monomerIndex - 1) return true;
} else if (iPolymer >= 0 && igroup >= 0 && (iPolymer != ibp || igroup < this.monomerIndex - 1 || igroup > this.monomerIndex + 1)) {
haveCrossLink = true;
if (group != null || vReturn == null) break;
vReturn.addLast(Integer.$valueOf(i));
vReturn.addLast(Integer.$valueOf(a.i));
vReturn.addLast(Integer.$valueOf(g.leadAtomIndex));
}}
return haveCrossLink;
}, "~N,JU.Lst,JM.Group,~B,~B,~B");
Clazz_defineMethod(c$, "isConnectedPrevious", 
function(){
return true;
});
Clazz_defineMethod(c$, "setGroupParameter", 
function(tok, f){
switch (tok) {
case 1111490569:
this.phi = f;
break;
case 1111490570:
this.psi = f;
break;
case 1111490568:
this.omega = f;
break;
case 1111490565:
this.mu = f;
break;
case 1111490576:
this.theta = f;
break;
case 1111490574:
this.straightness = f;
break;
}
}, "~N,~N");
Clazz_overrideMethod(c$, "getGroupParameter", 
function(tok){
if (this.bioPolymer == null) return 0;
if (!this.bioPolymer.haveParameters) this.bioPolymer.calcParameters();
switch (tok) {
case 1094713361:
return 1;
case 1111490568:
return this.omega;
case 1111490569:
return this.phi;
case 1111490570:
return this.psi;
case 1111490565:
return this.mu;
case 1111490576:
return this.theta;
case 1111490574:
return this.straightness;
}
return NaN;
}, "~N");
Clazz_overrideMethod(c$, "getGroup1", 
function(){
return (this.groupID < JM.BioResolver.predefinedGroup1Names.length ? JM.BioResolver.predefinedGroup1Names[this.groupID] : this.group1.charCodeAt(0) > 1 ? this.group1 : this.group1.charCodeAt(0) == 1 ? '?' : (this.group1 = this.getGroup1b()));
});
Clazz_defineMethod(c$, "getGroup1b", 
function(){
return '?';
});
Clazz_overrideMethod(c$, "setGroupID", 
function(group3){
this.groupID = JM.BioResolver.getGroupIdFor(group3);
}, "~S");
Clazz_overrideMethod(c$, "toString", 
function(){
return "[" + this.getGroup3() + "-" + this.getSeqcodeString() + " " + this.getStructure() + "]";
});
});
;//5.0.1-v7 Sat Feb 28 09:57:53 CST 2026
Clazz_declarePackage("JM");
Clazz_load(["JM.Monomer"], "JM.AlphaMonomer", ["JU.Quat", "$.V3", "J.c.STR", "JM.Helix", "$.Sheet", "$.Turn"], function(){
var c$ = Clazz_decorateAsClass(function(){
this.proteinStructure = null;
this.nitrogenHydrogenPoint = null;
Clazz_instantialize(this, arguments);}, JM, "AlphaMonomer", JM.Monomer);
Clazz_overrideConstructor(c$, 
function(){
});
Clazz_overrideMethod(c$, "isProtein", 
function(){
return true;
});
c$.validateAndAllocateA = Clazz_defineMethod(c$, "validateAndAllocateA", 
function(chain, group3, seqcode, firstIndex, lastIndex, specialAtomIndexes){
return (specialAtomIndexes[2] != firstIndex ? null :  new JM.AlphaMonomer().set2(chain, group3, seqcode, firstIndex, lastIndex,  Clazz_newByteArray (1, 0)));
}, "JM.Chain,~S,~N,~N,~N,~A");
Clazz_defineMethod(c$, "isAlphaMonomer", 
function(){
return true;
});
Clazz_overrideMethod(c$, "getStructure", 
function(){
return this.proteinStructure;
});
Clazz_defineMethod(c$, "setStructure", 
function(ps){
if ((this.proteinStructure = ps) == null) this.nitrogenHydrogenPoint = null;
}, "JM.ProteinStructure");
Clazz_overrideMethod(c$, "setStrucNo", 
function(n){
if (this.proteinStructure != null) this.proteinStructure.strucNo = n;
}, "~N");
Clazz_overrideMethod(c$, "getProteinStructureType", 
function(){
return this.proteinStructure == null ? J.c.STR.NONE : this.proteinStructure.type;
});
Clazz_overrideMethod(c$, "getProteinStructureSubType", 
function(){
return this.proteinStructure == null ? J.c.STR.NONE : this.proteinStructure.subtype;
});
Clazz_overrideMethod(c$, "getStrucNo", 
function(){
return this.proteinStructure != null ? this.proteinStructure.strucNo : 0;
});
Clazz_overrideMethod(c$, "isHelix", 
function(){
return this.proteinStructure != null && this.proteinStructure.type === J.c.STR.HELIX;
});
Clazz_overrideMethod(c$, "isSheet", 
function(){
return this.proteinStructure != null && this.proteinStructure.type === J.c.STR.SHEET;
});
Clazz_overrideMethod(c$, "setProteinStructureType", 
function(type, monomerIndexCurrent){
if (this.proteinStructure != null) this.proteinStructure.removeMonomer(this.monomerIndex);
if (monomerIndexCurrent < 0 || monomerIndexCurrent > 0 && this.monomerIndex == 0) {
switch (type) {
case J.c.STR.HELIX:
case J.c.STR.HELIXALPHA:
case J.c.STR.HELIX310:
case J.c.STR.HELIXPI:
this.setStructure( new JM.Helix(this.bioPolymer, this.monomerIndex, 1, type));
break;
case J.c.STR.SHEET:
this.setStructure( new JM.Sheet(this.bioPolymer, this.monomerIndex, 1, type));
break;
case J.c.STR.TURN:
this.setStructure( new JM.Turn(this.bioPolymer, this.monomerIndex, 1));
break;
case J.c.STR.NONE:
this.setStructure(null);
}
} else {
this.setStructure(this.bioPolymer.getProteinStructure(monomerIndexCurrent));
if (this.proteinStructure != null) this.proteinStructure.addMonomer(this.monomerIndex);
}return this.monomerIndex;
}, "J.c.STR,~N");
Clazz_defineMethod(c$, "getAtom", 
function(specialAtomID){
return (specialAtomID == 2 ? this.getLeadAtom() : null);
}, "~N");
Clazz_defineMethod(c$, "getAtomPoint", 
function(specialAtomID){
return (specialAtomID == 2 ? this.getLeadAtom() : null);
}, "~N");
Clazz_overrideMethod(c$, "isConnectedAfter", 
function(possiblyPreviousMonomer){
if (possiblyPreviousMonomer == null) return true;
var atom1 = this.getLeadAtom();
var atom2 = possiblyPreviousMonomer.getLeadAtom();
return atom1.isBonded(atom2) || atom1.distance(atom2) <= 4.5;
}, "JM.Monomer");
Clazz_overrideMethod(c$, "getQuaternionFrameCenter", 
function(qType){
return this.getQuaternionFrameCenterAlpha(qType);
}, "~S");
Clazz_overrideMethod(c$, "isWithinStructure", 
function(type){
return (this.proteinStructure != null && this.proteinStructure.type === type && this.proteinStructure.isWithin(this.monomerIndex));
}, "J.c.STR");
Clazz_defineMethod(c$, "getQuaternionFrameCenterAlpha", 
function(qType){
switch ((qType).charCodeAt(0)) {
case 98:
case 99:
case 67:
case 120:
return this.getLeadAtom();
default:
case 97:
case 110:
case 112:
case 80:
case 113:
return null;
}
}, "~S");
Clazz_overrideMethod(c$, "getHelixData", 
function(tokType, qType, mStep){
return this.getHelixData2(tokType, qType, mStep);
}, "~N,~S,~N");
Clazz_overrideMethod(c$, "getQuaternion", 
function(qType){
return this.getQuaternionAlpha(qType);
}, "~S");
Clazz_defineMethod(c$, "getQuaternionAlpha", 
function(qType){
if (this.monomerIndex < 0) return null;
var vA =  new JU.V3();
var vB =  new JU.V3();
var vC = null;
switch ((qType).charCodeAt(0)) {
default:
case 97:
case 110:
case 112:
case 113:
return null;
case 98:
case 99:
case 120:
if (this.monomerIndex == 0 || this.monomerIndex == this.bioPolymer.monomerCount - 1) return null;
var ptCa = this.getLeadAtom();
var ptCaNext = this.bioPolymer.getLeadPoint(this.monomerIndex + 1);
var ptCaPrev = this.bioPolymer.getLeadPoint(this.monomerIndex - 1);
vA.sub2(ptCaNext, ptCa);
vB.sub2(ptCaPrev, ptCa);
break;
}
return JU.Quat.getQuaternionFrameV(vA, vB, vC, false);
}, "~S");
});
;//5.0.1-v7 Sat Feb 28 10:50:05 CST 2026
Clazz_declarePackage("JM");
Clazz_load(["JM.Structure"], "JM.ProteinStructure", ["java.util.Hashtable", "JU.P3", "$.V3", "JU.Logger"], function(){
var c$ = Clazz_decorateAsClass(function(){
this.type = null;
this.subtype = null;
this.structureID = null;
this.strucNo = 0;
this.serialID = null;
this.strandCount = 1;
this.id = 0;
this.nRes = 0;
this.apolymer = null;
this.monomerIndexFirst = 0;
this.monomerIndexLast = 0;
this.axisA = null;
this.axisB = null;
this.axisUnitVector = null;
this.vectorProjection = null;
this.segments = null;
this.resMap = null;
Clazz_instantialize(this, arguments);}, JM, "ProteinStructure", null, JM.Structure);
Clazz_makeConstructor(c$, 
function(){
this.incrementID();
});
Clazz_defineMethod(c$, "incrementID", 
function(){
this.id = ++JM.ProteinStructure.ids;
});
Clazz_defineMethod(c$, "setupPS", 
function(apolymer, type, monomerIndex, monomerCount){
this.strucNo = ++JM.ProteinStructure.globalStrucNo;
this.apolymer = apolymer;
this.type = type;
this.vectorProjection =  new JU.V3();
this.monomerIndexFirst = monomerIndex;
this.addMonomer(monomerIndex + monomerCount - 1);
if (JU.Logger.debugging) JU.Logger.info("Creating ProteinStructure " + this.strucNo + " " + type.getBioStructureTypeName(false) + " from " + apolymer.monomers[this.monomerIndexFirst] + " through " + apolymer.monomers[this.monomerIndexLast] + " in polymer " + apolymer);
}, "JM.AlphaPolymer,J.c.STR,~N,~N");
Clazz_defineMethod(c$, "addMonomer", 
function(index){
this.resMap = null;
this.resetAxes();
this.monomerIndexFirst = Math.min(this.monomerIndexFirst, index);
this.monomerIndexLast = Math.max(this.monomerIndexLast, index);
this.nRes = this.monomerIndexLast - this.monomerIndexFirst + 1;
}, "~N");
Clazz_defineMethod(c$, "removeMonomer", 
function(index){
this.resMap = null;
this.resetAxes();
if (index > this.monomerIndexLast || index < this.monomerIndexFirst) return;
if (index == this.monomerIndexFirst) {
this.monomerIndexFirst++;
this.nRes--;
} else if (index == this.monomerIndexLast) {
this.monomerIndexLast--;
this.nRes--;
} else {
var n = this.monomerIndexLast - index;
this.monomerIndexLast = index - 1;
this.nRes = index - this.monomerIndexFirst;
var monomers = this.apolymer.monomers;
var type = monomers[++index].getProteinStructureType();
var mLast = -1;
for (var i = 0, pt = index; i < n; i++, pt++) {
(monomers[pt]).setStructure(null);
mLast = monomers[pt].setProteinStructureType(type, mLast);
}
}}, "~N");
Clazz_defineMethod(c$, "calcAxis", 
function(){
});
Clazz_defineMethod(c$, "isWithin", 
function(monomerIndex){
return (monomerIndex > this.monomerIndexFirst && monomerIndex < this.monomerIndexLast);
}, "~N");
Clazz_defineMethod(c$, "getIndex", 
function(monomer){
if (this.resMap == null) {
this.resMap =  new java.util.Hashtable();
for (var i = this.nRes; --i >= 0; ) this.resMap.put(this.apolymer.monomers[this.monomerIndexFirst + i], Integer.$valueOf(i));

}var ii = this.resMap.get(monomer);
return (ii == null ? -1 : ii.intValue());
}, "JM.Monomer");
Clazz_defineMethod(c$, "getSegments", 
function(){
if (this.segments == null) this.calcSegments();
return this.segments;
});
Clazz_defineMethod(c$, "getStructureMidPoint", 
function(index){
if (this.segments == null) this.calcSegments();
return this.segments[index];
}, "~N");
Clazz_defineMethod(c$, "calcSegments", 
function(){
if (this.segments != null) return;
this.calcAxis();
this.segments =  new Array(this.nRes + 1);
this.segments[this.nRes] = this.axisB;
this.segments[0] = this.axisA;
var axis = JU.V3.newV(this.axisUnitVector);
axis.scale(this.axisB.distance(this.axisA) / this.nRes);
for (var i = 1; i < this.nRes; i++) {
var point = this.segments[i] =  new JU.P3();
point.add2(this.segments[i - 1], axis);
}
});
Clazz_defineMethod(c$, "getAxisStartPoint", 
function(){
this.calcAxis();
return this.axisA;
});
Clazz_defineMethod(c$, "getAxisEndPoint", 
function(){
this.calcAxis();
return this.axisB;
});
Clazz_defineMethod(c$, "resetAxes", 
function(){
this.axisA = null;
this.segments = null;
});
Clazz_overrideMethod(c$, "setAtomBits", 
function(bs){
var ms = this.apolymer.monomers;
for (var i = this.monomerIndexFirst; i <= this.monomerIndexLast; i++) ms[i].setAtomBits(bs);

}, "JU.BS");
Clazz_overrideMethod(c$, "setAtomBitsAndClear", 
function(bs, bsOut){
var ms = this.apolymer.monomers;
for (var i = this.monomerIndexFirst; i <= this.monomerIndexLast; i++) ms[i].setAtomBitsAndClear(bs, bsOut);

}, "JU.BS,JU.BS");
Clazz_defineMethod(c$, "findMonomer", 
function(bsAtoms, isFirst){
var ms = this.apolymer.monomers;
if (this.monomerIndexFirst < 0) return null;
if (isFirst) {
for (var i = this.monomerIndexFirst; i <= this.monomerIndexLast; i++) if (bsAtoms == null || bsAtoms.get(ms[i].leadAtomIndex)) return ms[i];

} else {
for (var i = this.monomerIndexLast; i >= this.monomerIndexFirst; --i) if (bsAtoms == null || bsAtoms.get(ms[i].leadAtomIndex)) return ms[i];

}return null;
}, "JU.BS,~B");
Clazz_overrideMethod(c$, "toString", 
function(){
return "[" + this.id + " " + this.type + (this.subtype == null ? "" : " " + this.subtype) + " (" + this.monomerIndexFirst + "-" + this.monomerIndexLast + ")]";
});
c$.ids = 0;
c$.globalStrucNo = 1000;
});
;//5.0.1-v7 Sat Feb 28 10:50:06 CST 2026
Clazz_declarePackage("JM");
Clazz_load(["JM.ProteinStructure"], "JM.Helix", ["JU.Measure", "$.P3", "$.V3", "J.c.STR"], function(){
var c$ = Clazz_declareType(JM, "Helix", JM.ProteinStructure);
Clazz_makeConstructor(c$, 
function(apolymer, monomerIndex, monomerCount, subtype){
Clazz_superConstructor (this, JM.Helix, []);
this.setupPS(apolymer, J.c.STR.HELIX, monomerIndex, monomerCount);
this.subtype = subtype;
}, "JM.AlphaPolymer,~N,~N,J.c.STR");
Clazz_overrideMethod(c$, "calcAxis", 
function(){
if (this.axisA != null) return;
var points =  new Array(this.nRes + 1);
for (var i = 0; i <= this.nRes; i++) this.apolymer.getLeadMidPoint(this.monomerIndexFirst + i, points[i] =  new JU.P3());

this.axisA =  new JU.P3();
this.axisUnitVector =  new JU.V3();
JU.Measure.calcBestAxisThroughPoints(points, points.length, this.axisA, this.axisUnitVector, this.vectorProjection, 4);
this.axisB = JU.P3.newP(points[this.nRes]);
JU.Measure.projectOntoAxis(this.axisB, this.axisA, this.axisUnitVector, this.vectorProjection);
});
});
;//5.0.1-v7 Sat Feb 21 18:17:38 CST 2026
Clazz_declarePackage("JM");
Clazz_load(["JM.ProteinStructure"], "JM.Sheet", ["JU.Measure", "$.P3", "$.V3", "J.c.STR"], function(){
var c$ = Clazz_decorateAsClass(function(){
this.widthUnitVector = null;
this.heightUnitVector = null;
Clazz_instantialize(this, arguments);}, JM, "Sheet", JM.ProteinStructure);
Clazz_makeConstructor(c$, 
function(apolymer, monomerIndex, monomerCount, subtype){
Clazz_superConstructor (this, JM.Sheet, []);
this.incrementID();
this.setupPS(apolymer, J.c.STR.SHEET, monomerIndex, monomerCount);
this.subtype = subtype;
}, "JM.AlphaPolymer,~N,~N,J.c.STR");
Clazz_overrideMethod(c$, "calcAxis", 
function(){
if (this.axisA != null) return;
if (this.nRes == 2) {
this.axisA = this.apolymer.getLeadPoint(this.monomerIndexFirst);
this.axisB = this.apolymer.getLeadPoint(this.monomerIndexFirst + 1);
} else {
this.axisA =  new JU.P3();
this.apolymer.getLeadMidPoint(this.monomerIndexFirst + 1, this.axisA);
this.axisB =  new JU.P3();
this.apolymer.getLeadMidPoint(this.monomerIndexFirst + this.nRes - 1, this.axisB);
}this.axisUnitVector =  new JU.V3();
this.axisUnitVector.sub2(this.axisB, this.axisA);
this.axisUnitVector.normalize();
var tempA =  new JU.P3();
this.apolymer.getLeadMidPoint(this.monomerIndexFirst, tempA);
if (this.notHelixOrSheet(this.monomerIndexFirst - 1)) JU.Measure.projectOntoAxis(tempA, this.axisA, this.axisUnitVector, this.vectorProjection);
var tempB =  new JU.P3();
this.apolymer.getLeadMidPoint(this.monomerIndexFirst + this.nRes, tempB);
if (this.notHelixOrSheet(this.monomerIndexFirst + this.nRes)) JU.Measure.projectOntoAxis(tempB, this.axisA, this.axisUnitVector, this.vectorProjection);
this.axisA = tempA;
this.axisB = tempB;
});
Clazz_defineMethod(c$, "notHelixOrSheet", 
function(i){
return (i < 0 || i >= this.apolymer.monomerCount || !this.apolymer.monomers[i].isHelix() && !this.apolymer.monomers[i].isSheet());
}, "~N");
Clazz_defineMethod(c$, "calcSheetUnitVectors", 
function(){
if (!(Clazz_instanceOf(this.apolymer,"JM.AminoPolymer"))) return;
if (this.widthUnitVector == null) {
var vectorCO =  new JU.V3();
var vectorCOSum =  new JU.V3();
var amino = this.apolymer.monomers[this.monomerIndexFirst];
vectorCOSum.sub2(amino.getCarbonylOxygenAtom(), amino.getCarbonylCarbonAtom());
for (var i = this.nRes; --i > this.monomerIndexFirst; ) {
amino = this.apolymer.monomers[i];
vectorCO.sub2(amino.getCarbonylOxygenAtom(), amino.getCarbonylCarbonAtom());
if (vectorCOSum.angle(vectorCO) < 1.5707964) vectorCOSum.add(vectorCO);
 else vectorCOSum.sub(vectorCO);
}
this.heightUnitVector = vectorCO;
this.heightUnitVector.cross(this.axisUnitVector, vectorCOSum);
this.heightUnitVector.normalize();
this.widthUnitVector = vectorCOSum;
this.widthUnitVector.cross(this.axisUnitVector, this.heightUnitVector);
}});
Clazz_defineMethod(c$, "setBox", 
function(w, h, pt, vW, vH, ptC, scale){
if (this.heightUnitVector == null) this.calcSheetUnitVectors();
vW.setT(this.widthUnitVector);
vW.scale(scale * w);
vH.setT(this.heightUnitVector);
vH.scale(scale * h);
ptC.ave(vW, vH);
ptC.sub2(pt, ptC);
}, "~N,~N,JU.P3,JU.V3,JU.V3,JU.P3,~N");
});
;//5.0.1-v7 Sat Feb 28 09:57:54 CST 2026
Clazz_declarePackage("JM");
Clazz_load(["JM.ProteinStructure"], "JM.Turn", ["J.c.STR"], function(){
var c$ = Clazz_declareType(JM, "Turn", JM.ProteinStructure);
Clazz_makeConstructor(c$, 
function(apolymer, monomerIndex, monomerCount){
Clazz_superConstructor (this, JM.Turn, []);
this.setupPS(apolymer, J.c.STR.TURN, monomerIndex, monomerCount);
this.subtype = J.c.STR.TURN;
}, "JM.AlphaPolymer,~N,~N");
});
;//5.0.1-v7 Sat Feb 21 18:17:38 CST 2026
Clazz_declarePackage("JM");
Clazz_load(["JM.Structure", "JU.V3"], "JM.BioPolymer", ["JU.BS", "$.P3"], function(){
var c$ = Clazz_decorateAsClass(function(){
this.model = null;
this.monomers = null;
this.hasStructure = false;
this.leadMidpoints = null;
this.leadPoints = null;
this.controlPoints = null;
this.wingVectors = null;
this.leadAtomIndices = null;
this.type = 0;
this.bioPolymerIndexInModel = 0;
this.monomerCount = 0;
this.cyclicFlag = 0;
this.invalidLead = false;
this.invalidControl = false;
this.sheetSmoothing = 0;
this.hasWingPoints = false;
this.reversed = null;
this.twistedSheets = false;
this.unitVectorX = null;
this.selectedMonomerCount = 0;
this.bsSelectedMonomers = null;
this.haveParameters = false;
Clazz_instantialize(this, arguments);}, JM, "BioPolymer", null, JM.Structure);
Clazz_prepareFields (c$, function(){
this.unitVectorX = JU.V3.new3(1, 0, 0);
});
Clazz_makeConstructor(c$, 
function(monomers, hasStructure){
this.monomers = monomers;
this.hasStructure = hasStructure;
this.monomerCount = monomers.length;
for (var i = this.monomerCount; --i >= 0; ) monomers[i].setBioPolymer(this, i);

this.model = monomers[0].getModel();
}, "~A,~B");
Clazz_overrideMethod(c$, "setAtomBits", 
function(bs){
this.getRange(bs, true);
}, "JU.BS");
Clazz_overrideMethod(c$, "setAtomBitsAndClear", 
function(bs, bsOut){
for (var i = this.monomerCount; --i >= 0; ) this.monomers[i].setAtomBitsAndClear(bs, bsOut);

}, "JU.BS,JU.BS");
Clazz_defineMethod(c$, "getRange", 
function(bs, isMutated){
if (this.monomerCount == 0) return;
if (isMutated) {
for (var i = this.monomerCount; --i >= 0; ) this.monomers[i].setAtomBits(bs);

} else {
bs.setBits(this.monomers[0].firstAtomIndex, this.monomers[this.monomerCount - 1].lastAtomIndex + 1);
}}, "JU.BS,~B");
Clazz_defineMethod(c$, "clearStructures", 
function(){
});
Clazz_defineMethod(c$, "getLeadAtomIndices", 
function(){
if (this.leadAtomIndices == null) {
this.leadAtomIndices =  Clazz_newIntArray (this.monomerCount, 0);
this.invalidLead = true;
}if (this.invalidLead) {
for (var i = this.monomerCount; --i >= 0; ) this.leadAtomIndices[i] = this.monomers[i].leadAtomIndex;

this.invalidLead = false;
}return this.leadAtomIndices;
});
Clazz_defineMethod(c$, "getIndex", 
function(chainID, seqcode, istart, iend){
var i;
for (i = this.monomerCount; --i >= 0; ) {
var m = this.monomers[i];
if (m.chain.chainID == chainID && m.seqcode == seqcode && (istart < 0 || istart == m.firstAtomIndex || iend == m.lastAtomIndex)) break;
}
return i;
}, "~N,~N,~N,~N");
Clazz_defineMethod(c$, "getLeadPoint", 
function(monomerIndex){
return this.monomers[monomerIndex].getLeadAtom();
}, "~N");
Clazz_defineMethod(c$, "getInitiatorPoint", 
function(){
return this.monomers[0].getInitiatorAtom();
});
Clazz_defineMethod(c$, "getTerminatorPoint", 
function(){
return this.monomers[this.monomerCount - 1].getTerminatorAtom();
});
Clazz_defineMethod(c$, "getLeadMidPoint", 
function(i, midPoint){
if (i == this.monomerCount) {
--i;
} else if (i > 0) {
midPoint.ave(this.getLeadPoint(i), this.getLeadPoint(i - 1));
return;
}midPoint.setT(this.getLeadPoint(i));
}, "~N,JU.P3");
Clazz_defineMethod(c$, "getWingPoint", 
function(polymerIndex){
return this.monomers[polymerIndex].getWingAtom();
}, "~N");
Clazz_defineMethod(c$, "setConformation", 
function(bsSelected){
var atoms = this.model.ms.at;
var updated = false;
for (var i = this.monomerCount; --i >= 0; ) if (this.monomers[i].updateOffsetsForAlternativeLocations(atoms, bsSelected)) updated = true;

if (updated) {
this.recalculateLeadMidpointsAndWingVectors();
for (var i = 9; i < 16; i++) {
var s = this.model.ms.vwr.shm.shapes[i];
if (s == null) continue;
for (var b = s.bioShapes.length; --b >= 0; ) {
var bi = s.bioShapes[b];
if (bi.bioPolymer === this) bi.falsifyMesh();
}
}
}}, "JU.BS");
Clazz_defineMethod(c$, "recalculateLeadMidpointsAndWingVectors", 
function(){
this.invalidLead = this.invalidControl = true;
this.getLeadAtomIndices();
this.resetHydrogenPoints();
this.calcLeadMidpointsAndWingVectors();
});
Clazz_defineMethod(c$, "resetHydrogenPoints", 
function(){
});
Clazz_defineMethod(c$, "getLeadMidpoints", 
function(){
if (this.leadMidpoints == null) this.calcLeadMidpointsAndWingVectors();
return this.leadMidpoints;
});
Clazz_defineMethod(c$, "getLeadPoints", 
function(){
if (this.leadPoints == null) this.calcLeadMidpointsAndWingVectors();
return this.leadPoints;
});
Clazz_defineMethod(c$, "getControlPoints", 
function(isTraceAlpha, sheetSmoothing, invalidate){
if (invalidate) this.invalidControl = true;
return (!isTraceAlpha ? this.leadMidpoints : sheetSmoothing == 0 ? this.leadPoints : this.getControlPoints2(sheetSmoothing));
}, "~B,~N,~B");
Clazz_defineMethod(c$, "getControlPoints2", 
function(sheetSmoothing){
if (!this.invalidControl && sheetSmoothing == this.sheetSmoothing) return this.controlPoints;
this.getLeadPoints();
var v =  new JU.V3();
if (this.controlPoints == null) this.controlPoints =  new Array(this.monomerCount + 1);
if (!Float.isNaN(sheetSmoothing)) this.sheetSmoothing = sheetSmoothing;
for (var i = 0; i < this.monomerCount; i++) this.controlPoints[i] = this.getControlPoint(i, v);

this.controlPoints[this.monomerCount] = this.getTerminatorPoint();
this.invalidControl = false;
return this.controlPoints;
}, "~N");
Clazz_defineMethod(c$, "getControlPoint", 
function(i, v){
return this.leadPoints[i];
}, "~N,JU.V3");
Clazz_defineMethod(c$, "getWingVectors", 
function(){
if (this.leadMidpoints == null) this.calcLeadMidpointsAndWingVectors();
return this.wingVectors;
});
Clazz_defineMethod(c$, "calcLeadMidpointsAndWingVectors", 
function(){
if (this.leadMidpoints == null) {
this.leadMidpoints =  new Array(this.monomerCount + 1);
this.leadPoints =  new Array(this.monomerCount + 1);
this.wingVectors =  new Array(this.monomerCount + 1);
this.sheetSmoothing = 1.4E-45;
}if (this.reversed == null) this.reversed = JU.BS.newN(this.monomerCount);
 else this.reversed.clearAll();
this.twistedSheets = this.model.ms.vwr.getBoolean(603979968);
var vectorA =  new JU.V3();
var vectorB =  new JU.V3();
var vectorC =  new JU.V3();
var vectorD =  new JU.V3();
var leadPointPrev;
var leadPoint;
this.leadMidpoints[0] = this.getInitiatorPoint();
this.leadPoints[0] = leadPoint = this.getLeadPoint(0);
var previousVectorD = null;
for (var i = 1; i < this.monomerCount; ++i) {
leadPointPrev = leadPoint;
leadPoint = this.getLeadPoint(i);
if (leadPoint == null) {
return;
}this.leadPoints[i] = leadPoint;
var midpoint =  new JU.P3();
midpoint.ave(leadPoint, leadPointPrev);
this.leadMidpoints[i] = midpoint;
if (this.hasWingPoints) {
vectorA.sub2(leadPoint, leadPointPrev);
vectorB.sub2(leadPointPrev, this.getWingPoint(i - 1));
vectorC.cross(vectorA, vectorB);
vectorD.cross(vectorA, vectorC);
vectorD.normalize();
if (!this.twistedSheets && previousVectorD != null && previousVectorD.angle(vectorD) > 1.5707963267948966) {
this.reversed.set(i);
vectorD.scale(-1);
}previousVectorD = this.wingVectors[i] = JU.V3.newV(vectorD);
}}
this.leadPoints[this.monomerCount] = this.leadMidpoints[this.monomerCount] = this.getTerminatorPoint();
if (!this.hasWingPoints) {
if (this.monomerCount < 3) {
this.wingVectors[1] = this.unitVectorX;
} else {
var previousVectorC = null;
for (var i = 1; i < this.monomerCount; ++i) {
vectorA.sub2(this.leadMidpoints[i], this.leadPoints[i]);
vectorB.sub2(this.leadPoints[i], this.leadMidpoints[i + 1]);
if (vectorB.length() == 0) {
vectorC = previousVectorC;
} else {
vectorC.cross(vectorA, vectorB);
vectorC.normalize();
if (previousVectorC != null && previousVectorC.angle(vectorC) > 1.5707963267948966) vectorC.scale(-1);
}previousVectorC = this.wingVectors[i] = JU.V3.newV(vectorC);
}
}}this.wingVectors[0] = this.wingVectors[1];
this.wingVectors[this.monomerCount] = this.wingVectors[this.monomerCount - 1];
});
Clazz_defineMethod(c$, "findNearestAtomIndex", 
function(xMouse, yMouse, closest, mads, myVisibilityFlag, bsNot){
for (var i = this.monomerCount; --i >= 0; ) {
if ((this.monomers[i].shapeVisibilityFlags & myVisibilityFlag) == 0) continue;
var a = this.monomers[i].getLeadAtom();
if (!a.checkVisible() || bsNot != null && bsNot.get(a.i)) continue;
if (mads[i] > 0 || mads[i + 1] > 0) this.monomers[i].findNearestAtomIndex(xMouse, yMouse, closest, mads[i], mads[i + 1]);
}
}, "~N,~N,~A,~A,~N,JU.BS");
Clazz_defineMethod(c$, "getSelectedMonomerCount", 
function(){
return this.selectedMonomerCount;
});
Clazz_defineMethod(c$, "calcSelectedMonomersCount", 
function(bsSelected){
this.selectedMonomerCount = 0;
if (this.bsSelectedMonomers == null) this.bsSelectedMonomers =  new JU.BS();
this.bsSelectedMonomers.clearAll();
for (var i = 0; i < this.monomerCount; i++) {
if (this.monomers[i].isSelected(bsSelected)) {
++this.selectedMonomerCount;
this.bsSelectedMonomers.set(i);
}}
}, "JU.BS");
Clazz_defineMethod(c$, "isMonomerSelected", 
function(i){
return (i >= 0 && this.bsSelectedMonomers.get(i));
}, "~N");
Clazz_defineMethod(c$, "getPolymerPointsAndVectors", 
function(last, bs, vList, isTraceAlpha, sheetSmoothing){
var points = this.getControlPoints(isTraceAlpha, sheetSmoothing, false);
var vectors = this.getWingVectors();
var count = this.monomerCount;
for (var j = 0; j < count; j++) if (bs.get(this.monomers[j].leadAtomIndex)) {
vList.addLast( Clazz_newArray(-1, [points[j], JU.P3.newP(vectors[j])]));
last = j;
} else if (last != 2147483646) {
vList.addLast( Clazz_newArray(-1, [points[j], JU.P3.newP(vectors[j])]));
last = 2147483646;
}
if (last + 1 < count) vList.addLast( Clazz_newArray(-1, [points[last + 1], JU.P3.newP(vectors[last + 1])]));
return last;
}, "~N,JU.BS,JU.Lst,~B,~N");
Clazz_defineMethod(c$, "getSequence", 
function(){
var buf =  Clazz_newCharArray (this.monomerCount, '\0');
for (var i = 0; i < this.monomerCount; i++) buf[i] = this.monomers[i].getGroup1();

return String.valueOf(buf);
});
Clazz_defineMethod(c$, "getPolymerSequenceAtoms", 
function(group1, nGroups, bsInclude, bsResult){
for (var i = Math.min(this.monomerCount, group1 + nGroups); --i >= group1; ) this.monomers[i].getMonomerSequenceAtoms(bsInclude, bsResult);

}, "~N,~N,JU.BS,JU.BS");
Clazz_defineMethod(c$, "getProteinStructure", 
function(monomerIndex){
return null;
}, "~N");
Clazz_defineMethod(c$, "calcParameters", 
function(){
this.haveParameters = true;
return this.calcEtaThetaAngles() || this.calcPhiPsiAngles();
});
Clazz_defineMethod(c$, "calcEtaThetaAngles", 
function(){
return false;
});
Clazz_defineMethod(c$, "calcPhiPsiAngles", 
function(){
return false;
});
Clazz_defineMethod(c$, "calculateRamachandranHelixAngle", 
function(m, qtype){
return NaN;
}, "~N,~S");
Clazz_defineMethod(c$, "isNucleic", 
function(){
return (this.monomerCount > 0 && Clazz_instanceOf(this,"JM.NucleicPolymer"));
});
Clazz_defineMethod(c$, "getRangeGroups", 
function(nResidues, bsAtoms, bsResult){
var bsTemp =  new JU.BS();
for (var i = 0; i < this.monomerCount; i++) {
if (!this.monomers[i].isSelected(bsAtoms)) continue;
bsTemp.setBits(Math.max(0, i - nResidues), i + nResidues + 1);
i += nResidues - 1;
}
for (var i = bsTemp.nextSetBit(0); i >= 0 && i < this.monomerCount; i = bsTemp.nextSetBit(i + 1)) this.monomers[i].setAtomBits(bsResult);

}, "~N,JU.BS,JU.BS");
Clazz_defineMethod(c$, "calcRasmolHydrogenBonds", 
function(polymer, bsA, bsB, vHBonds, nMaxPerResidue, min, checkDistances, dsspIgnoreHydrogens){
}, "JM.BioPolymer,JU.BS,JU.BS,JU.Lst,~N,~A,~B,~B");
Clazz_defineMethod(c$, "getType", 
function(){
return this.type;
});
Clazz_defineMethod(c$, "isCyclic", 
function(){
return ((this.cyclicFlag == 0 ? (this.cyclicFlag = (this.monomerCount >= 4 && this.monomers[0].isConnectedAfter(this.monomers[this.monomerCount - 1])) ? 1 : -1) : this.cyclicFlag) == 1);
});
Clazz_overrideMethod(c$, "toString", 
function(){
return "[Polymer type " + this.type + " n=" + this.monomerCount + " " + (this.monomerCount > 0 ? this.monomers[0] + " " + this.monomers[this.monomerCount - 1] : "") + "]";
});
});
;//5.0.1-v7 Sat Feb 28 09:57:54 CST 2026
Clazz_declarePackage("JM");
Clazz_load(["java.lang.Enum", "JM.BioPolymer"], "JM.AlphaPolymer", ["JU.Measure", "$.P3", "J.c.STR", "JM.Helix", "$.Sheet", "$.Turn", "JU.Logger"], function(){
var c$ = Clazz_decorateAsClass(function(){
this.pt0 = 0;
Clazz_instantialize(this, arguments);}, JM, "AlphaPolymer", JM.BioPolymer);
Clazz_makeConstructor(c$, 
function(monomers, pt0){
Clazz_superConstructor(this, JM.AlphaPolymer, [monomers, true]);
this.pt0 = pt0;
}, "~A,~N");
Clazz_overrideMethod(c$, "getProteinStructure", 
function(monomerIndex){
return this.monomers[monomerIndex].getStructure();
}, "~N");
Clazz_overrideMethod(c$, "getControlPoint", 
function(i, v){
if (!this.monomers[i].isSheet()) return this.leadPoints[i];
v.sub2(this.leadMidpoints[i], this.leadPoints[i]);
v.scale(this.sheetSmoothing);
var pt = JU.P3.newP(this.leadPoints[i]);
pt.add(v);
return pt;
}, "~N,JU.V3");
Clazz_defineMethod(c$, "addStructure", 
function(type, structureID, serialID, strandCount, startChainID, startSeqcode, endChainID, endSeqcode, istart, iend, bsAssigned){
var i0 = -1;
var i1 = -1;
if (istart < iend) {
if (this.monomers[0].firstAtomIndex > iend || this.monomers[this.monomerCount - 1].lastAtomIndex < istart) return;
i0 = istart;
i1 = iend;
}var indexStart;
var indexEnd;
if ((indexStart = this.getIndex(startChainID, startSeqcode, i0, i1)) == -1 || (indexEnd = this.getIndex(endChainID, endSeqcode, i0, i1)) == -1) return;
if (istart >= 0) {
istart = this.monomers[indexStart].firstAtomIndex;
iend = this.monomers[indexEnd].lastAtomIndex;
var pt = bsAssigned.nextSetBit(istart);
if (pt >= 0 && pt < iend) return;
}if (this.addStructureProtected(type, structureID, serialID, strandCount, indexStart, indexEnd) && istart >= 0) bsAssigned.setBits(istart, iend + 1);
}, "J.c.STR,~S,~S,~N,~N,~N,~N,~N,~N,~N,JU.BS");
Clazz_defineMethod(c$, "addStructureProtected", 
function(type, structureID, serialID, strandCount, indexStart, indexEnd){
if (indexEnd < indexStart) {
JU.Logger.error("AlphaPolymer:addSecondaryStructure error:  indexStart:" + indexStart + " indexEnd:" + indexEnd);
return false;
}var structureCount = indexEnd - indexStart + 1;
var ps = null;
switch (type) {
case J.c.STR.HELIX:
case J.c.STR.HELIXALPHA:
case J.c.STR.HELIX310:
case J.c.STR.HELIXPI:
ps =  new JM.Helix(this, indexStart, structureCount, type);
break;
case J.c.STR.SHEET:
ps =  new JM.Sheet(this, indexStart, structureCount, type);
break;
case J.c.STR.TURN:
ps =  new JM.Turn(this, indexStart, structureCount);
break;
default:
JU.Logger.error("unrecognized secondary structure type");
return false;
}
ps.structureID = structureID;
ps.serialID = serialID;
ps.strandCount = strandCount;
for (var i = indexStart; i <= indexEnd; ++i) (this.monomers[i]).setStructure(ps);

return true;
}, "J.c.STR,~S,~S,~N,~N,~N");
Clazz_overrideMethod(c$, "clearStructures", 
function(){
for (var i = 0; i < this.monomerCount; i++) (this.monomers[i]).setStructure(null);

});
Clazz_defineMethod(c$, "calculateStructures", 
function(alphaOnly){
if (this.monomerCount < 4) return;
var angles = this.calculateAnglesInDegrees();
var codes = this.calculateCodes(angles);
this.checkBetaSheetAlphaHelixOverlap(codes, angles);
var tags = this.calculateRunsFourOrMore(codes);
this.extendRuns(tags);
this.searchForTurns(codes, angles, tags);
this.addStructuresFromTags(tags);
}, "~B");
Clazz_defineMethod(c$, "calculateAnglesInDegrees", 
function(){
var angles =  Clazz_newFloatArray (this.monomerCount, 0);
for (var i = this.monomerCount - 1; --i >= 2; ) angles[i] = JU.Measure.computeTorsion(this.monomers[i - 2].getLeadAtom(), this.monomers[i - 1].getLeadAtom(), this.monomers[i].getLeadAtom(), this.monomers[i + 1].getLeadAtom(), true);

return angles;
});
Clazz_defineMethod(c$, "calculateCodes", 
function(angles){
var codes =  new Array(this.monomerCount);
for (var i = this.monomerCount - 1; --i >= 2; ) {
var degrees = angles[i];
codes[i] = ((degrees >= 10 && degrees < 120) ? JM.AlphaPolymer.Code.RIGHT_HELIX : ((degrees >= 120 || degrees < -90) ? JM.AlphaPolymer.Code.BETA_SHEET : ((degrees >= -90 && degrees < 0) ? JM.AlphaPolymer.Code.LEFT_HELIX : JM.AlphaPolymer.Code.NADA)));
}
return codes;
}, "~A");
Clazz_defineMethod(c$, "checkBetaSheetAlphaHelixOverlap", 
function(codes, angles){
for (var i = this.monomerCount - 2; --i >= 2; ) if (codes[i] === JM.AlphaPolymer.Code.BETA_SHEET && angles[i] <= 140 && codes[i - 2] === JM.AlphaPolymer.Code.RIGHT_HELIX && codes[i - 1] === JM.AlphaPolymer.Code.RIGHT_HELIX && codes[i + 1] === JM.AlphaPolymer.Code.RIGHT_HELIX && codes[i + 2] === JM.AlphaPolymer.Code.RIGHT_HELIX) codes[i] = JM.AlphaPolymer.Code.RIGHT_HELIX;

}, "~A,~A");
Clazz_defineMethod(c$, "calculateRunsFourOrMore", 
function(codes){
var tags =  new Array(this.monomerCount);
var tag = J.c.STR.NONE;
var code = JM.AlphaPolymer.Code.NADA;
var runLength = 0;
for (var i = 0; i < this.monomerCount; ++i) {
if (codes[i] === code && code !== JM.AlphaPolymer.Code.NADA) {
++runLength;
if (runLength == 4) {
tag = (code === JM.AlphaPolymer.Code.BETA_SHEET ? J.c.STR.SHEET : J.c.STR.HELIX);
for (var j = 4; --j >= 0; ) tags[i - j] = tag;

} else if (runLength > 4) tags[i] = tag;
} else {
runLength = 1;
code = codes[i];
}}
return tags;
}, "~A");
Clazz_defineMethod(c$, "extendRuns", 
function(tags){
for (var i = 1; i < this.monomerCount - 4; ++i) if (tags[i] === J.c.STR.NONE && tags[i + 1] !== J.c.STR.NONE) tags[i] = tags[i + 1];

tags[0] = tags[1];
tags[this.monomerCount - 1] = tags[this.monomerCount - 2];
}, "~A");
Clazz_defineMethod(c$, "searchForTurns", 
function(codes, angles, tags){
for (var i = this.monomerCount - 1; --i >= 2; ) {
codes[i] = JM.AlphaPolymer.Code.NADA;
if (tags[i] == null || tags[i] === J.c.STR.NONE) {
var angle = angles[i];
if (angle >= -90 && angle < 0) codes[i] = JM.AlphaPolymer.Code.LEFT_TURN;
 else if (angle >= 0 && angle < 90) codes[i] = JM.AlphaPolymer.Code.RIGHT_TURN;
}}
for (var i = this.monomerCount - 1; --i >= 0; ) {
if (codes[i] !== JM.AlphaPolymer.Code.NADA && codes[i + 1] === codes[i] && tags[i] === J.c.STR.NONE) tags[i] = J.c.STR.TURN;
}
}, "~A,~A,~A");
Clazz_defineMethod(c$, "addStructuresFromTags", 
function(tags){
var i = 0;
while (i < this.monomerCount) {
var tag = tags[i];
if (tag == null || tag === J.c.STR.NONE) {
++i;
continue;
}var iMax;
for (iMax = i + 1; iMax < this.monomerCount && tags[iMax] === tag; ++iMax) {
}
this.addStructureProtected(tag, null, null, 0, i, iMax - 1);
i = iMax;
}
}, "~A");
Clazz_defineMethod(c$, "setStructureBS", 
function(count, dsspType, type, bs, doOffset){
var offset = (doOffset ? this.pt0 : 0);
for (var pt = 0, i = bs.nextSetBit(offset), i2 = 0, n = this.monomerCount + offset; i >= 0 && i < n; i = bs.nextSetBit(i2 + 1)) {
if ((i2 = bs.nextClearBit(i)) < 0 || i2 > n) i2 = n;
this.addStructureProtected(type, JM.AlphaPolymer.dsspTypes[dsspType] + (++pt), "" + count++, (dsspType == 3 ? 1 : 0), i - offset, i2 - 1 - offset);
}
return count;
}, "~N,~N,J.c.STR,JU.BS,~B");
})();
c$.dsspTypes =  Clazz_newArray(-1, ["H", null, "H", "S", "H", null, "T"]);
});
;//5.0.1-v7 Sat Feb 28 10:50:06 CST 2026
Clazz_declarePackage("JM");
Clazz_load(["JM.AlphaMonomer"], "JM.AminoMonomer", ["JU.A4", "$.BS", "$.M3", "$.P3", "$.PT", "$.Quat", "$.V3", "J.c.STR", "JU.Escape", "$.Logger"], function(){
var c$ = Clazz_decorateAsClass(function(){
this.nhChecked = false;
this.ptTemp = null;
Clazz_instantialize(this, arguments);}, JM, "AminoMonomer", JM.AlphaMonomer);
Clazz_overrideConstructor(c$, 
function(){
});
c$.validateAndAllocate = Clazz_defineMethod(c$, "validateAndAllocate", 
function(chain, group3, seqcode, firstAtomIndex, lastAtomIndex, specialAtomIndexes, atoms){
var offsets = JM.Monomer.scanForOffsets(firstAtomIndex, specialAtomIndexes, JM.AminoMonomer.interestingAminoAtomIDs);
if (offsets == null) return null;
JM.Monomer.checkOptional(offsets, 1, firstAtomIndex, specialAtomIndexes[5]);
if (atoms[firstAtomIndex].isHetero() && !JM.AminoMonomer.isBondedCorrectly(firstAtomIndex, offsets, atoms)) return null;
return  new JM.AminoMonomer().set2(chain, group3, seqcode, firstAtomIndex, lastAtomIndex, offsets);
}, "JM.Chain,~S,~N,~N,~N,~A,~A");
c$.isBondedCorrectlyRange = Clazz_defineMethod(c$, "isBondedCorrectlyRange", 
function(offset1, offset2, firstAtomIndex, offsets, atoms){
var atomIndex1 = firstAtomIndex + (offsets[offset1] & 0xFF);
var atomIndex2 = firstAtomIndex + (offsets[offset2] & 0xFF);
return (atomIndex1 != atomIndex2 && atoms[atomIndex1].isBonded(atoms[atomIndex2]));
}, "~N,~N,~N,~A,~A");
c$.isBondedCorrectly = Clazz_defineMethod(c$, "isBondedCorrectly", 
function(firstAtomIndex, offsets, atoms){
return (JM.AminoMonomer.isBondedCorrectlyRange(2, 0, firstAtomIndex, offsets, atoms) && JM.AminoMonomer.isBondedCorrectlyRange(0, 3, firstAtomIndex, offsets, atoms) && (!JM.Monomer.have(offsets, 1) || JM.AminoMonomer.isBondedCorrectlyRange(3, 1, firstAtomIndex, offsets, atoms)));
}, "~N,~A,~A");
Clazz_overrideMethod(c$, "getNitrogenAtom", 
function(){
return this.getAtomFromOffsetIndex(2);
});
Clazz_defineMethod(c$, "getCarbonylCarbonAtom", 
function(){
return this.getAtomFromOffsetIndex(3);
});
Clazz_overrideMethod(c$, "getCarbonylOxygenAtom", 
function(){
return this.getWingAtom();
});
Clazz_overrideMethod(c$, "getInitiatorAtom", 
function(){
return this.getNitrogenAtom();
});
Clazz_overrideMethod(c$, "getTerminatorAtom", 
function(){
return this.getAtomFromOffsetIndex(JM.Monomer.have(this.offsets, 4) ? 4 : 3);
});
Clazz_defineMethod(c$, "hasOAtom", 
function(){
return JM.Monomer.have(this.offsets, 1);
});
Clazz_overrideMethod(c$, "isConnectedAfter", 
function(possiblyPreviousMonomer){
if (possiblyPreviousMonomer == null) return true;
var other = possiblyPreviousMonomer;
return other.getCarbonylCarbonAtom().isBonded(this.getNitrogenAtom());
}, "JM.Monomer");
Clazz_overrideMethod(c$, "findNearestAtomIndex", 
function(x, y, closest, madBegin, madEnd){
var competitor = closest[0];
var nitrogen = this.getNitrogenAtom();
var marBegin = (Clazz_doubleToInt(madBegin / 2));
if (marBegin < 1200) marBegin = 1200;
if (nitrogen.sZ == 0) return;
var radiusBegin = Clazz_floatToInt(this.scaleToScreen(nitrogen.sZ, marBegin));
if (radiusBegin < 4) radiusBegin = 4;
var ccarbon = this.getCarbonylCarbonAtom();
var marEnd = (Clazz_doubleToInt(madEnd / 2));
if (marEnd < 1200) marEnd = 1200;
var radiusEnd = Clazz_floatToInt(this.scaleToScreen(nitrogen.sZ, marEnd));
if (radiusEnd < 4) radiusEnd = 4;
var alpha = this.getLeadAtom();
if (this.isCursorOnTopOf(alpha, x, y, Clazz_doubleToInt((radiusBegin + radiusEnd) / 2), competitor) || this.isCursorOnTopOf(nitrogen, x, y, radiusBegin, competitor) || this.isCursorOnTopOf(ccarbon, x, y, radiusEnd, competitor)) closest[0] = alpha;
}, "~N,~N,~A,~N,~N");
Clazz_defineMethod(c$, "resetHydrogenPoint", 
function(){
this.nhChecked = false;
this.nitrogenHydrogenPoint = null;
});
Clazz_defineMethod(c$, "getNitrogenHydrogenPoint", 
function(){
if (this.nitrogenHydrogenPoint == null && !this.nhChecked) {
this.nhChecked = true;
this.nitrogenHydrogenPoint = this.getExplicitNH();
}return this.nitrogenHydrogenPoint;
});
Clazz_defineMethod(c$, "getExplicitNH", 
function(){
var nitrogen = this.getNitrogenAtom();
var h = null;
var bonds = nitrogen.bonds;
if (bonds != null) for (var i = 0; i < bonds.length; i++) if ((h = bonds[i].getOtherAtom(nitrogen)).getElementNumber() == 1) return h;

return null;
});
Clazz_defineMethod(c$, "getNHPoint", 
function(aminoHydrogenPoint, vNH, jmolHPoint, dsspIgnoreHydrogens){
if (this.monomerIndex <= 0 || this.groupID == 15) return false;
var nitrogenPoint = this.getNitrogenAtom();
var nhPoint = this.getNitrogenHydrogenPoint();
if (nhPoint != null && !dsspIgnoreHydrogens) {
vNH.sub2(nhPoint, nitrogenPoint);
aminoHydrogenPoint.setT(nhPoint);
return true;
}var prev = this.bioPolymer.monomers[this.monomerIndex - 1];
if (jmolHPoint) {
vNH.sub2(nitrogenPoint, this.getLeadAtom());
vNH.normalize();
var v = JU.V3.newVsub(nitrogenPoint, prev.getCarbonylCarbonAtom());
v.normalize();
vNH.add(v);
} else {
var oxygen = prev.getCarbonylOxygenAtom();
if (oxygen == null) return false;
vNH.sub2(prev.getCarbonylCarbonAtom(), oxygen);
}vNH.normalize();
aminoHydrogenPoint.add2(nitrogenPoint, vNH);
this.nitrogenHydrogenPoint = JU.P3.newP(aminoHydrogenPoint);
if (JU.Logger.debugging) JU.Logger.debug("draw ID \"pta" + this.monomerIndex + "_" + nitrogenPoint.i + "\" " + JU.Escape.eP(nitrogenPoint) + JU.Escape.eP(aminoHydrogenPoint) + " # " + nitrogenPoint);
return true;
}, "JU.P3,JU.V3,~B,~B");
Clazz_overrideMethod(c$, "getQuaternionFrameCenter", 
function(qType){
if (this.monomerIndex < 0) return null;
switch ((qType).charCodeAt(0)) {
default:
case 97:
case 98:
case 99:
case 67:
return this.getQuaternionFrameCenterAlpha(qType);
case 110:
return this.getNitrogenAtom();
case 112:
case 80:
return this.getCarbonylCarbonAtom();
case 113:
if (this.monomerIndex == this.bioPolymer.monomerCount - 1) return null;
var mNext = (this.bioPolymer.monomers[this.monomerIndex + 1]);
var pt =  new JU.P3();
pt.ave(this.getCarbonylCarbonAtom(), mNext.getNitrogenAtom());
return pt;
}
}, "~S");
Clazz_overrideMethod(c$, "getQuaternion", 
function(qType){
if (this.monomerIndex < 0) return null;
var ptC = this.getCarbonylCarbonAtom();
var ptCa = this.getLeadAtom();
var vA =  new JU.V3();
var vB =  new JU.V3();
var vC = null;
switch ((qType).charCodeAt(0)) {
case 97:
case 110:
if (this.monomerIndex == 0 || this.groupID == 15) return null;
vC =  new JU.V3();
if (this.ptTemp == null) this.ptTemp =  new JU.P3();
this.getNHPoint(this.ptTemp, vC, true, false);
vB.sub2(ptCa, this.getNitrogenAtom());
vB.cross(vC, vB);
 new JU.M3().setAA(JU.A4.newVA(vB, -0.29670596)).rotate(vC);
vA.cross(vB, vC);
break;
case 98:
return this.getQuaternionAlpha('b');
case 99:
vA.sub2(ptC, ptCa);
vB.sub2(this.getNitrogenAtom(), ptCa);
break;
case 112:
case 120:
if (this.monomerIndex == this.bioPolymer.monomerCount - 1) return null;
vA.sub2(ptCa, ptC);
vB.sub2((this.bioPolymer.monomers[this.monomerIndex + 1]).getNitrogenAtom(), ptC);
break;
case 113:
if (this.monomerIndex == this.bioPolymer.monomerCount - 1) return null;
var mNext = (this.bioPolymer.monomers[this.monomerIndex + 1]);
vB.sub2(mNext.getLeadAtom(), mNext.getNitrogenAtom());
vA.sub2(ptCa, ptC);
break;
default:
return null;
}
return JU.Quat.getQuaternionFrameV(vA, vB, vC, false);
}, "~S");
Clazz_overrideMethod(c$, "getStructureId", 
function(){
if (this.proteinStructure == null || this.proteinStructure.structureID == null) return "";
return this.proteinStructure.structureID;
});
Clazz_overrideMethod(c$, "getProteinStructureTag", 
function(){
if (this.proteinStructure == null || this.proteinStructure.structureID == null) return null;
var tag = "%3N %3ID";
tag = JU.PT.formatStringS(tag, "N", this.proteinStructure.serialID);
tag = JU.PT.formatStringS(tag, "ID", this.proteinStructure.structureID);
if (this.proteinStructure.type === J.c.STR.SHEET) tag += JU.PT.formatStringI("%2SC", "SC", this.proteinStructure.strandCount);
return tag;
});
Clazz_overrideMethod(c$, "getBSSideChain", 
function(){
var bs =  new JU.BS();
this.setAtomBits(bs);
this.clear(bs, this.getLeadAtom(), true);
this.clear(bs, this.getCarbonylCarbonAtom(), false);
this.clear(bs, this.getCarbonylOxygenAtom(), false);
this.clear(bs, this.getNitrogenAtom(), true);
return bs;
});
Clazz_defineMethod(c$, "clear", 
function(bs, a, andH){
if (a == null) return;
bs.clear(a.i);
if (!andH) return;
var b = a.bonds;
var h;
for (var j = b.length; --j >= 0; ) if ((h = b[j].getOtherAtom(a)).getElementNumber() == 1) bs.clear(h.i);

}, "JU.BS,JM.Atom,~B");
c$.interestingAminoAtomIDs =  Clazz_newByteArray(-1, [2, -5, 1, 3, -65]);
});
;//5.0.1-v7 Sat Feb 28 10:50:19 CST 2026
Clazz_declarePackage("JM");
Clazz_load(["JM.AlphaPolymer"], "JM.AminoPolymer", ["JU.Measure", "$.P3", "$.V3", "J.c.STR", "JM.HBond", "JU.Logger"], function(){
var c$ = Clazz_decorateAsClass(function(){
this.structureList = null;
Clazz_instantialize(this, arguments);}, JM, "AminoPolymer", JM.AlphaPolymer);
Clazz_makeConstructor(c$, 
function(monomers, pt0){
Clazz_superConstructor(this, JM.AminoPolymer, [monomers, pt0]);
this.type = 1;
for (var i = 0; i < this.monomerCount; ++i) if (!(monomers[i]).hasOAtom()) return;

this.hasWingPoints = true;
}, "~A,~N");
Clazz_overrideMethod(c$, "resetHydrogenPoints", 
function(){
var ps;
var psLast = null;
for (var i = 0; i < this.monomerCount; i++) {
if ((ps = this.getProteinStructure(i)) != null && ps !== psLast) (psLast = ps).resetAxes();
(this.monomers[i]).resetHydrogenPoint();
}
});
Clazz_overrideMethod(c$, "calcPhiPsiAngles", 
function(){
for (var i = 0; i < this.monomerCount - 1; ++i) this.calcPhiPsiAngles2(this.monomers[i], this.monomers[i + 1]);

return true;
});
Clazz_defineMethod(c$, "calcPhiPsiAngles2", 
function(residue1, residue2){
var nitrogen1 = residue1.getNitrogenAtom();
var alphacarbon1 = residue1.getLeadAtom();
var carbon1 = residue1.getCarbonylCarbonAtom();
var nitrogen2 = residue2.getNitrogenAtom();
var alphacarbon2 = residue2.getLeadAtom();
var carbon2 = residue2.getCarbonylCarbonAtom();
residue2.setGroupParameter(1111490569, JU.Measure.computeTorsion(carbon1, nitrogen2, alphacarbon2, carbon2, true));
residue1.setGroupParameter(1111490570, JU.Measure.computeTorsion(nitrogen1, alphacarbon1, carbon1, nitrogen2, true));
residue1.setGroupParameter(1111490568, JU.Measure.computeTorsion(alphacarbon1, carbon1, nitrogen2, alphacarbon2, true));
}, "JM.AminoMonomer,JM.AminoMonomer");
Clazz_overrideMethod(c$, "calculateRamachandranHelixAngle", 
function(m, qtype){
var psiLast = (m == 0 ? NaN : this.monomers[m - 1].getGroupParameter(1111490570));
var psi = this.monomers[m].getGroupParameter(1111490570);
var phi = this.monomers[m].getGroupParameter(1111490569);
var phiNext = (m == this.monomerCount - 1 ? NaN : this.monomers[m + 1].getGroupParameter(1111490569));
var psiNext = (m == this.monomerCount - 1 ? NaN : this.monomers[m + 1].getGroupParameter(1111490570));
switch ((qtype).charCodeAt(0)) {
default:
case 112:
case 114:
case 80:
var dPhi = ((phiNext - phi) / 2 * 3.141592653589793 / 180);
var dPsi = ((psiNext - psi) / 2 * 3.141592653589793 / 180);
return (57.29577951308232 * 2 * Math.acos(Math.cos(dPsi) * Math.cos(dPhi) - Math.sin(dPsi) * Math.sin(dPhi) / 3));
case 99:
case 67:
return (psi - psiLast + phiNext - phi);
}
}, "~N,~S");
Clazz_overrideMethod(c$, "calcRasmolHydrogenBonds", 
function(polymer, bsA, bsB, vHBonds, nMaxPerResidue, min, checkDistances, dsspIgnoreHydrogens){
if (polymer == null) polymer = this;
if (!(Clazz_instanceOf(polymer,"JM.AminoPolymer"))) return;
var pt =  new JU.P3();
var vNH =  new JU.V3();
var source;
var min1 = (min == null ?  Clazz_newIntArray (2, 3, 0) : null);
for (var i = 1; i < this.monomerCount; ++i) {
if (min == null) {
min1[0][0] = min1[1][0] = this.bioPolymerIndexInModel;
min1[0][1] = min1[1][1] = -2147483648;
min1[0][2] = min1[1][2] = 0;
} else {
min1 = min[i];
}if ((source = (this.monomers[i])).getNHPoint(pt, vNH, checkDistances, dsspIgnoreHydrogens)) {
var isInA = (bsA == null || bsA.get(source.getNitrogenAtom().i));
if (!isInA) continue;
if (!checkDistances && source.getCarbonylOxygenAtom() == null) continue;
this.checkRasmolHydrogenBond(source, polymer, i, pt, (isInA ? bsB : bsA), vHBonds, min1, checkDistances);
}}
}, "JM.BioPolymer,JU.BS,JU.BS,JU.Lst,~N,~A,~B,~B");
Clazz_defineMethod(c$, "checkRasmolHydrogenBond", 
function(source, polymer, indexDonor, hydrogenPoint, bsB, vHBonds, min, checkDistances){
var sourceAlphaPoint = source.getLeadAtom();
var sourceNitrogenPoint = source.getNitrogenAtom();
var nitrogen = source.getNitrogenAtom();
var m;
for (var i = polymer.monomerCount; --i >= 0; ) {
if (polymer === this && (i == indexDonor || i + 1 == indexDonor)) continue;
var target = polymer.monomers[i];
var oxygen = target.getCarbonylOxygenAtom();
if (oxygen == null || bsB != null && !bsB.get(oxygen.i)) continue;
var targetAlphaPoint = target.getLeadAtom();
var dist2 = sourceAlphaPoint.distanceSquared(targetAlphaPoint);
if (dist2 >= 81.0) continue;
var energy = this.calcHbondEnergy(sourceNitrogenPoint, hydrogenPoint, target, checkDistances);
if (energy < min[0][2]) {
m = min[1];
min[1] = min[0];
min[0] = m;
} else if (energy < min[1][2]) {
m = min[1];
} else {
continue;
}m[0] = polymer.bioPolymerIndexInModel;
m[1] = (energy < -500 ? i : -1 - i);
m[2] = energy;
}
if (vHBonds != null) for (var i = 0; i < 2; i++) if (min[i][1] >= 0) this.addResidueHydrogenBond(nitrogen, ((polymer).monomers[min[i][1]]).getCarbonylOxygenAtom(), (polymer === this ? indexDonor : -99), min[i][1], min[i][2] / 1000, vHBonds);

}, "JM.AminoMonomer,JM.BioPolymer,~N,JU.P3,JU.BS,JU.Lst,~A,~B");
Clazz_defineMethod(c$, "calcHbondEnergy", 
function(nitrogenPoint, hydrogenPoint, target, checkDistances){
var targetOxygenPoint = target.getCarbonylOxygenAtom();
if (targetOxygenPoint == null) return 0;
var distON2 = targetOxygenPoint.distanceSquared(nitrogenPoint);
if (distON2 < 0.25) return 0;
var distOH2 = targetOxygenPoint.distanceSquared(hydrogenPoint);
if (distOH2 < 0.25) return 0;
var targetCarbonPoint = target.getCarbonylCarbonAtom();
var distCH2 = targetCarbonPoint.distanceSquared(hydrogenPoint);
if (distCH2 < 0.25) return 0;
var distCN2 = targetCarbonPoint.distanceSquared(nitrogenPoint);
if (distCN2 < 0.25) return 0;
var distOH = Math.sqrt(distOH2);
var distCH = Math.sqrt(distCH2);
var distCN = Math.sqrt(distCN2);
var distON = Math.sqrt(distON2);
var energy = JM.HBond.calcEnergy(distOH, distCH, distCN, distON);
var isHbond = (energy < -500 && (!checkDistances || distCN > distCH && distOH <= 3.0));
return (!isHbond && checkDistances || energy < -9900 ? 0 : energy);
}, "JU.P3,JU.P3,JM.AminoMonomer,~B");
Clazz_defineMethod(c$, "addResidueHydrogenBond", 
function(nitrogen, oxygen, indexAminoGroup, indexCarbonylGroup, energy, vHBonds){
var order;
switch (indexAminoGroup - indexCarbonylGroup) {
case 2:
order = 6144;
break;
case 3:
order = 8192;
break;
case 4:
order = 10240;
break;
case 5:
order = 12288;
break;
case -3:
order = 14336;
break;
case -4:
order = 16384;
break;
default:
order = 4096;
}
vHBonds.addLast( new JM.HBond(nitrogen, oxygen, order, 1, 0, energy));
}, "JM.Atom,JM.Atom,~N,~N,~N,JU.Lst");
Clazz_overrideMethod(c$, "calculateStructures", 
function(alphaOnly){
if (alphaOnly) return;
if (this.structureList == null) this.structureList = this.model.ms.getStructureList();
var structureTags =  Clazz_newCharArray (this.monomerCount, '\0');
for (var i = 0; i < this.monomerCount - 1; ++i) {
var leadingResidue = this.monomers[i];
var trailingResidue = this.monomers[i + 1];
var phi = trailingResidue.getGroupParameter(1111490569);
var psi = leadingResidue.getGroupParameter(1111490570);
if (this.isHelix(psi, phi)) {
structureTags[i] = (phi < 0 && psi < 25 ? '4' : '3');
} else if (this.isSheet(psi, phi)) {
structureTags[i] = 's';
} else if (this.isTurn(psi, phi)) {
structureTags[i] = 't';
} else {
structureTags[i] = 'n';
}if (JU.Logger.debugging) JU.Logger.debug((0 + this.monomers[0].chain.chainID) + " aminopolymer:" + i + " " + trailingResidue.getGroupParameter(1111490569) + "," + leadingResidue.getGroupParameter(1111490570) + " " + structureTags[i]);
}
for (var start = 0; start < this.monomerCount; ++start) {
if (structureTags[start] == '4') {
var end;
for (end = start + 1; end < this.monomerCount && structureTags[end] == '4'; ++end) {
}
end--;
if (end >= start + 3) {
this.addStructureProtected(J.c.STR.HELIX, null, null, 0, start, end);
}start = end;
}}
for (var start = 0; start < this.monomerCount; ++start) {
if (structureTags[start] == '3') {
var end;
for (end = start + 1; end < this.monomerCount && structureTags[end] == '3'; ++end) {
}
end--;
if (end >= start + 3) {
this.addStructureProtected(J.c.STR.HELIX, null, null, 0, start, end);
}start = end;
}}
for (var start = 0; start < this.monomerCount; ++start) {
if (structureTags[start] == 's') {
var end;
for (end = start + 1; end < this.monomerCount && structureTags[end] == 's'; ++end) {
}
end--;
if (end >= start + 2) {
this.addStructureProtected(J.c.STR.SHEET, null, null, 0, start, end);
}start = end;
}}
for (var start = 0; start < this.monomerCount; ++start) {
if (structureTags[start] == 't') {
var end;
for (end = start + 1; end < this.monomerCount && structureTags[end] == 't'; ++end) {
}
end--;
if (end >= start + 2) {
this.addStructureProtected(J.c.STR.TURN, null, null, 0, start, end);
}start = end;
}}
}, "~B");
Clazz_defineMethod(c$, "isTurn", 
function(psi, phi){
return JM.AminoPolymer.checkPhiPsi(this.structureList.get(J.c.STR.TURN), psi, phi);
}, "~N,~N");
Clazz_defineMethod(c$, "isSheet", 
function(psi, phi){
return JM.AminoPolymer.checkPhiPsi(this.structureList.get(J.c.STR.SHEET), psi, phi);
}, "~N,~N");
Clazz_defineMethod(c$, "isHelix", 
function(psi, phi){
return JM.AminoPolymer.checkPhiPsi(this.structureList.get(J.c.STR.HELIX), psi, phi);
}, "~N,~N");
c$.checkPhiPsi = Clazz_defineMethod(c$, "checkPhiPsi", 
function(list, psi, phi){
for (var i = 0; i < list.length; i += 4) if (phi >= list[i] && phi <= list[i + 1] && psi >= list[i + 2] && psi <= list[i + 3]) return true;

return false;
}, "~A,~N,~N");
Clazz_defineMethod(c$, "setStructureList", 
function(structureList){
this.structureList = structureList;
}, "java.util.Map");
});
;//5.0.1-v7 Sat Feb 28 10:50:06 CST 2026
Clazz_declarePackage("JM");
Clazz_load(null, "JM.BioModelSet", ["java.util.Hashtable", "JU.AU", "$.BS", "$.Lst", "$.PT", "$.SB", "J.api.Interface", "J.c.STR", "JM.Group", "JM.BioResolver", "JS.T", "JU.BSUtil", "$.Escape", "$.Logger"], function(){
var c$ = Clazz_decorateAsClass(function(){
this.vwr = null;
this.ms = null;
this.ext = null;
this.unitIdSets = null;
Clazz_instantialize(this, arguments);}, JM, "BioModelSet", null);
Clazz_defineMethod(c$, "getBioExt", 
function(){
return (this.ext == null ? (this.ext = (J.api.Interface.getInterface("JM.BioExt", this.vwr, "script"))).set(this.vwr, this.vwr.ms) : this.ext);
});
Clazz_defineMethod(c$, "set", 
function(vwr, ms){
this.vwr = vwr;
this.ms = ms;
this.unitIdSets = null;
if (this.ext != null) this.ext.set(vwr, ms);
return this;
}, "JV.Viewer,JM.ModelSet");
Clazz_defineMethod(c$, "calcAllRasmolHydrogenBonds", 
function(bsA, bsB, vHBonds, nucleicOnly, nMax, dsspIgnoreHydrogens, bsHBonds, dsspVersion){
var am = this.ms.am;
if (vHBonds == null) {
var bsAtoms = bsA;
if (bsB != null && !bsA.equals(bsB)) (bsAtoms = JU.BSUtil.copy(bsA)).or(bsB);
var bsDelete =  new JU.BS();
var bsOK =  new JU.BS();
var models = this.ms.am;
var bonds = this.ms.bo;
for (var i = this.ms.bondCount; --i >= 0; ) {
var bond = bonds[i];
if (bond == null || (bond.order & 28672) == 0) continue;
if (bsAtoms.get(bond.atom1.i)) bsDelete.set(i);
 else bsOK.set(models[bond.atom1.mi].trajectoryBaseIndex);
}
for (var i = this.ms.mc; --i >= 0; ) if (models[i].isBioModel) models[i].hasRasmolHBonds = bsOK.get(i);

if (bsDelete.nextSetBit(0) >= 0) this.ms.deleteBonds(bsDelete, false);
}for (var i = this.ms.mc; --i >= 0; ) if (am[i].isBioModel && !this.ms.isTrajectorySubFrame(i)) (am[i]).getRasmolHydrogenBonds(bsA, bsB, vHBonds, nucleicOnly, nMax, dsspIgnoreHydrogens, bsHBonds, dsspVersion);

}, "JU.BS,JU.BS,JU.Lst,~B,~N,~B,JU.BS,~N");
Clazz_defineMethod(c$, "calcSelectedMonomersCount", 
function(){
var bsSelected = this.vwr.bsA();
for (var i = this.ms.mc; --i >= 0; ) if (this.ms.am[i].isBioModel) {
var m = this.ms.am[i];
for (var j = m.bioPolymerCount; --j >= 0; ) m.bioPolymers[j].calcSelectedMonomersCount(bsSelected);

}
});
Clazz_defineMethod(c$, "calculateAllPolymers", 
function(groups, groupCount, baseGroupIndex, modelsExcluded){
var checkConnections = !this.vwr.getBoolean(603979896);
if (groupCount < 0) groupCount = groups.length;
if (modelsExcluded != null) for (var j = 0; j < groupCount; ++j) {
var group = groups[j];
if (Clazz_instanceOf(group,"JM.Monomer")) {
if ((group).bioPolymer != null && (!modelsExcluded.get(group.chain.model.modelIndex))) (group).setBioPolymer(null, -1);
}}
for (var i = 0, mc = this.ms.mc; i < mc; i++) if ((modelsExcluded == null || !modelsExcluded.get(i)) && this.ms.am[i].isBioModel) {
for (var pt = 0, j = baseGroupIndex; j < groupCount; ++j, pt++) {
var g = groups[j];
var model = g.getModel();
if (!model.isBioModel || !(Clazz_instanceOf(g,"JM.Monomer")) || g.getLeadAtom() == null) continue;
var doCheck = checkConnections && !this.ms.isJmolDataFrame(this.ms.at[g.getLeadAtom().i].mi);
var bp = ((g).bioPolymer == null ? JM.BioResolver.allocateBioPolymer(groups, j, doCheck, pt) : null);
if (bp == null || bp.monomerCount == 0) continue;
var n = (model).addBioPolymer(bp);
j += n - 1;
pt += n - 1;
}
}
}, "~A,~N,~N,JU.BS");
Clazz_defineMethod(c$, "calculateAllStructuresExcept", 
function(alreadyDefined, asDSSP, doReport, dsspIgnoreHydrogen, setStructure, includeAlpha, version){
var ret = "";
var bsModels = JU.BSUtil.copyInvert(alreadyDefined, this.ms.mc);
if (setStructure) this.setAllDefaultStructure(bsModels);
for (var i = bsModels.nextSetBit(0); i >= 0; i = bsModels.nextSetBit(i + 1)) if (this.ms.am[i].isBioModel) ret += (this.ms.am[i]).calculateStructures(asDSSP, doReport, dsspIgnoreHydrogen, setStructure, includeAlpha, version);

if (setStructure) this.ms.setStructureIndexes();
return ret;
}, "JU.BS,~B,~B,~B,~B,~B,~N");
Clazz_defineMethod(c$, "calculateAllStuctures", 
function(bsAtoms, asDSSP, doReport, dsspIgnoreHydrogen, setStructure, version){
if (version <= 0) version = 2;
var bsAllAtoms =  new JU.BS();
var bsModelsExcluded = JU.BSUtil.copyInvert(this.modelsOf(bsAtoms, bsAllAtoms), this.ms.mc);
if (!setStructure) return this.ms.calculateStructuresAllExcept(bsModelsExcluded, asDSSP, doReport, dsspIgnoreHydrogen, false, false, version);
this.ms.recalculatePolymers(bsModelsExcluded);
var ret = this.ms.calculateStructuresAllExcept(bsModelsExcluded, asDSSP, doReport, dsspIgnoreHydrogen, true, false, version);
this.vwr.shm.resetBioshapes(bsAllAtoms);
this.ms.setStructureIndexes();
return ret;
}, "JU.BS,~B,~B,~B,~B,~N");
Clazz_defineMethod(c$, "calculateStraightnessAll", 
function(){
this.getBioExt().calculateStraightnessAll();
});
Clazz_defineMethod(c$, "calculateStruts", 
function(bs1, bs2){
return this.getBioExt().calculateAllstruts(this.vwr, this.ms, bs1, bs2);
}, "JU.BS,JU.BS");
Clazz_defineMethod(c$, "getAllDefaultStructures", 
function(bsAtoms, bsModified){
var bsModels = this.modelsOf(bsAtoms, bsModified);
var ret =  new JU.SB();
for (var i = bsModels.nextSetBit(0); i >= 0; i = bsModels.nextSetBit(i + 1)) if (this.ms.am[i].isBioModel && (this.ms.am[i]).defaultStructure != null) ret.append((this.ms.am[i]).defaultStructure);

return ret.toString();
}, "JU.BS,JU.BS");
Clazz_defineMethod(c$, "getAllHeteroList", 
function(modelIndex){
var htFull =  new java.util.Hashtable();
var ok = false;
for (var i = this.ms.mc; --i >= 0; ) if (modelIndex < 0 || i == modelIndex) {
var ht = this.ms.getInfo(i, "hetNames");
if (ht == null) continue;
ok = true;
for (var entry, $entry = ht.entrySet().iterator (); $entry.hasNext()&& ((entry = $entry.next ()) || true);) {
var key = entry.getKey();
htFull.put(key, entry.getValue());
}
}
return (ok ? htFull : null);
}, "~N");
Clazz_defineMethod(c$, "getAllPolymerInfo", 
function(bs, info){
this.getBioExt().getAllPolymerInfo(bs, info);
}, "JU.BS,java.util.Map");
Clazz_defineMethod(c$, "getAllPolymerPointsAndVectors", 
function(bs, vList, isTraceAlpha, sheetSmoothing){
for (var i = 0; i < this.ms.mc; ++i) if (this.ms.am[i].isBioModel) {
var m = this.ms.am[i];
var last = 2147483646;
for (var ip = 0; ip < m.bioPolymerCount; ip++) last = m.bioPolymers[ip].getPolymerPointsAndVectors(last, bs, vList, isTraceAlpha, sheetSmoothing);

}
}, "JU.BS,JU.Lst,~B,~N");
Clazz_defineMethod(c$, "getAllSequenceBits", 
function(specInfo, bsAtoms, bsResult){
if (specInfo.length > 0) {
if (bsAtoms == null) bsAtoms = this.vwr.getAllAtoms();
if (specInfo.indexOf('|') < specInfo.lastIndexOf('|')) return this.getAllUnitIds(specInfo, bsAtoms, bsResult);
var am = this.ms.am;
for (var i = this.ms.mc; --i >= 0; ) if (am[i].isBioModel) {
var m = am[i];
var lenInfo = specInfo.length;
for (var ip = 0; ip < m.bioPolymerCount; ip++) {
var sequence = m.bioPolymers[ip].getSequence();
var j = -1;
while ((j = sequence.indexOf(specInfo, ++j)) >= 0) m.bioPolymers[ip].getPolymerSequenceAtoms(j, lenInfo, bsAtoms, bsResult);

}
}
}return bsResult;
}, "~S,JU.BS,JU.BS");
Clazz_defineMethod(c$, "getAtomBitsBS", 
function(tokType, bsInfo, bs){
var at = this.ms.at;
var ac = this.ms.ac;
var i = 0;
var g;
switch (tokType) {
case 136314895:
case 2097184:
var type = (tokType == 136314895 ? J.c.STR.HELIX : J.c.STR.SHEET);
for (i = ac; --i >= 0; ) {
if (at[i] == null) continue;
if ((g = at[i].group).isWithinStructure(type)) g.setAtomBits(bs);
i = g.firstAtomIndex;
}
break;
case 2097188:
for (i = ac; --i >= 0; ) {
if (at[i] == null) continue;
if ((g = at[i].group).isCarbohydrate()) g.setAtomBits(bs);
i = g.firstAtomIndex;
}
break;
case 2097156:
for (i = ac; --i >= 0; ) {
if (at[i] == null) continue;
if ((g = at[i].group).isDna()) g.setAtomBits(bs);
i = g.firstAtomIndex;
}
break;
case 2097166:
for (i = ac; --i >= 0; ) {
if (at[i] == null) continue;
if ((g = at[i].group).isNucleic()) g.setAtomBits(bs);
i = g.firstAtomIndex;
}
break;
case 2097168:
for (i = ac; --i >= 0; ) {
if (at[i] == null) continue;
if ((g = at[i].group).isProtein()) g.setAtomBits(bs);
i = g.firstAtomIndex;
}
break;
case 2097170:
for (i = ac; --i >= 0; ) {
if (at[i] == null) continue;
if ((g = at[i].group).isPurine()) g.setAtomBits(bs);
i = g.firstAtomIndex;
}
break;
case 2097172:
for (i = ac; --i >= 0; ) {
if (at[i] == null) continue;
if ((g = at[i].group).isPyrimidine()) g.setAtomBits(bs);
i = g.firstAtomIndex;
}
break;
case 2097174:
for (i = ac; --i >= 0; ) {
if (at[i] == null) continue;
if ((g = at[i].group).isRna()) g.setAtomBits(bs);
i = g.firstAtomIndex;
}
break;
}
if (i < 0) return bs;
var i0 = bsInfo.nextSetBit(0);
if (i0 < 0) return bs;
i = 0;
switch (tokType) {
case 1094713362:
for (i = i0; i >= 0; i = bsInfo.nextSetBit(i + 1)) {
var iPolymer = at[i].group.getBioPolymerIndexInModel();
if (iPolymer >= 0) (at[i].group).bioPolymer.setAtomBitsAndClear(bs, bsInfo);
}
break;
case 1639976963:
for (i = i0; i >= 0; i = bsInfo.nextSetBit(i + 1)) {
var structure = at[i].group.getStructure();
if (structure != null) structure.setAtomBitsAndClear(bs, bsInfo);
}
break;
}
if (i == 0) JU.Logger.error("MISSING getAtomBits entry for " + JS.T.nameOf(tokType));
return bs;
}, "~N,JU.BS,JU.BS");
Clazz_defineMethod(c$, "getAtomBitsStr", 
function(tokType, specInfo, bs){
switch (tokType) {
default:
return  new JU.BS();
case 1073741925:
return this.getAnnotationBits("domains", 1073741925, specInfo);
case 1073742189:
return this.getAnnotationBits("validation", 1073742189, specInfo);
case 1073742128:
return this.getAnnotationBits("rna3d", 1073742128, specInfo);
case 1073741863:
var s = specInfo;
bs =  new JU.BS();
return (s.length % 2 != 0 ? bs : this.ms.getAtomBitsMDa(1086324742, this.getAllBasePairBits(s), bs));
case 1111490587:
return this.getAnnotationBits("dssr", 1111490587, specInfo);
case 1086324744:
return this.getAllSequenceBits(specInfo, null, bs);
}
}, "~N,~S,JU.BS");
Clazz_defineMethod(c$, "getBioPolymerCountInModel", 
function(modelIndex){
if (modelIndex < 0) {
var polymerCount = 0;
for (var i = this.ms.mc; --i >= 0; ) if (!this.ms.isTrajectorySubFrame(i) && this.ms.am[i].isBioModel) polymerCount += (this.ms.am[i]).getBioPolymerCount();

return polymerCount;
}return (this.ms.isTrajectorySubFrame(modelIndex) || !this.ms.am[modelIndex].isBioModel ? 0 : (this.ms.am[modelIndex]).getBioPolymerCount());
}, "~N");
Clazz_defineMethod(c$, "getFullProteinStructureState", 
function(bsAtoms, mode){
var taintedOnly = (mode == 1073742327);
if (taintedOnly && !this.ms.proteinStructureTainted) return "";
var scriptMode = (mode == 1073742158 || mode == 1073742327);
var atoms = this.ms.at;
var at0 = (bsAtoms == null ? this.vwr.getAllAtoms() : bsAtoms).nextSetBit(0);
if (at0 < 0) return "";
if (bsAtoms != null && mode == 4138) {
bsAtoms = JU.BSUtil.copy(bsAtoms);
for (var i = this.ms.ac; --i >= 0; ) if (atoms[i] == null || Float.isNaN(atoms[i].group.getGroupParameter(1111490569)) || Float.isNaN(atoms[i].group.getGroupParameter(1111490570))) bsAtoms.clear(i);

}var at1 = (bsAtoms == null ? this.vwr.getAllAtoms() : bsAtoms).length() - 1;
var im0 = atoms[at0].mi;
var im1 = atoms[at1].mi;
var lstStr =  new JU.Lst();
var map =  new java.util.Hashtable();
var cmd =  new JU.SB();
for (var im = im0; im <= im1; im++) {
if (!this.ms.am[im].isBioModel) continue;
var m = this.ms.am[im];
if (taintedOnly && !m.structureTainted) continue;
var bsA =  new JU.BS();
bsA.or(m.bsAtoms);
bsA.andNot(m.bsAtomsDeleted);
var i0 = bsA.nextSetBit(0);
if (i0 < 0) continue;
if (scriptMode) {
cmd.append("  structure none ").append(JU.Escape.eBS(this.ms.getModelAtomBitSetIncludingDeleted(im, false))).append("    \t# model=" + this.ms.getModelNumberDotted(im)).append(";\n");
}var ps;
for (var i = i0; i >= 0; i = bsA.nextSetBit(i + 1)) {
var a = atoms[i];
if (a == null || !(Clazz_instanceOf(a.group,"JM.AlphaMonomer")) || (ps = (a.group).proteinStructure) == null || map.containsKey(ps)) continue;
lstStr.addLast(ps);
map.put(ps, Boolean.TRUE);
}
}
this.getStructureLines(bsAtoms, cmd, lstStr, J.c.STR.HELIX, scriptMode, mode);
this.getStructureLines(bsAtoms, cmd, lstStr, J.c.STR.SHEET, scriptMode, mode);
this.getStructureLines(bsAtoms, cmd, lstStr, J.c.STR.TURN, scriptMode, mode);
return cmd.toString();
}, "JU.BS,~N");
Clazz_defineMethod(c$, "getGroupsWithinAll", 
function(nResidues, bs){
var bsResult =  new JU.BS();
var bsCheck = this.ms.getIterativeModels(false);
for (var iModel = this.ms.mc; --iModel >= 0; ) if (bsCheck.get(iModel) && this.ms.am[iModel].isBioModel) {
var m = this.ms.am[iModel];
for (var i = m.bioPolymerCount; --i >= 0; ) m.bioPolymers[i].getRangeGroups(nResidues, bs, bsResult);

}
return bsResult;
}, "~N,JU.BS");
Clazz_defineMethod(c$, "getIdentifierOrNull", 
function(identifier){
var len = identifier.length;
var pt = 0;
while (pt < len && JU.PT.isLetter(identifier.charAt(pt))) ++pt;

var bs = this.ms.getSpecNameOrNull(identifier.substring(0, pt), false);
if (pt == len) return bs;
if (bs == null) bs =  new JU.BS();
var pt0 = pt;
while (pt < len && JU.PT.isDigit(identifier.charAt(pt))) ++pt;

if (pt == pt0) return null;
var seqNumber = 0;
try {
seqNumber = Integer.parseInt(identifier.substring(pt0, pt));
} catch (nfe) {
if (Clazz_exceptionOf(nfe,"NumberFormatException")){
return null;
} else {
throw nfe;
}
}
var insertionCode = ' ';
if (pt < len && identifier.charAt(pt) == '^') if (++pt < len) insertionCode = identifier.charAt(pt);
var seqcode = JM.Group.getSeqcodeFor(seqNumber, insertionCode);
var bsInsert = this.ms.getSeqcodeBits(seqcode, false);
if (bsInsert == null) {
if (insertionCode != ' ') bsInsert = this.ms.getSeqcodeBits(Character.toUpperCase(identifier.charAt(pt)).charCodeAt(0), false);
if (bsInsert == null) return null;
pt++;
}bs.and(bsInsert);
if (pt >= len) return bs;
if (pt != len - 1) return null;
bs.and(this.ms.getChainBits(identifier.charAt(pt).charCodeAt(0)));
return bs;
}, "~S");
Clazz_defineMethod(c$, "mutate", 
function(bs, group, sequence, alphaType, phipsi){
return this.getBioExt().mutate(this.vwr, bs, group, sequence, alphaType, phipsi);
}, "JU.BS,~S,~A,~S,~A");
Clazz_defineMethod(c$, "recalculateAllPolymers", 
function(bsModelsExcluded, groups){
for (var i = 0; i < this.ms.mc; i++) if (this.ms.am[i].isBioModel && !bsModelsExcluded.get(i)) (this.ms.am[i]).clearBioPolymers();

this.calculateAllPolymers(groups, -1, 0, bsModelsExcluded);
}, "JU.BS,~A");
Clazz_defineMethod(c$, "recalculatePoints", 
function(modelIndex){
if (modelIndex < 0) {
for (var i = this.ms.mc; --i >= 0; ) if (!this.ms.isTrajectorySubFrame(i) && this.ms.am[i].isBioModel) (this.ms.am[i]).recalculateLeadMidpointsAndWingVectors();

return;
}if (!this.ms.isTrajectorySubFrame(modelIndex) && this.ms.am[modelIndex].isBioModel) (this.ms.am[modelIndex]).recalculateLeadMidpointsAndWingVectors();
}, "~N");
Clazz_defineMethod(c$, "setAllConformation", 
function(bsAtoms){
this.vwr.ms.recalculatePositionDependentQuantities(bsAtoms, null);
var bsModels = this.ms.getModelBS(bsAtoms, false);
for (var i = bsModels.nextSetBit(0); i >= 0; i = bsModels.nextSetBit(i + 1)) if (this.ms.am[i].isBioModel) {
var m = this.ms.am[i];
if (m.altLocCount > 0) for (var j = m.bioPolymerCount; --j >= 0; ) m.bioPolymers[j].setConformation(bsAtoms);

}
}, "JU.BS");
Clazz_defineMethod(c$, "setAllProteinType", 
function(bs, type){
var monomerIndexCurrent = -1;
var bsModels = this.ms.getModelBS(bs, false);
this.setAllDefaultStructure(bsModels);
var groups = this.ms.getGroups();
var lastStrucNo = 0;
var lastResNo = -2147483648;
var lastPolymer = null;
var lastModel = null;
var isNone = (type === J.c.STR.NONE);
for (var i = 0; i < groups.length; i++) {
var g = groups[i];
if (g.getBioPolymerLength() == 0 || !bs.get(g.firstAtomIndex)) continue;
var m = g.getModel();
if (!isNone) {
if (m !== lastModel) {
lastModel = m;
lastStrucNo = 0;
lastPolymer = null;
}if (lastPolymer !== (g).bioPolymer) {
lastResNo = -2147483648;
lastPolymer = (g).bioPolymer;
}var resno = g.getResno();
if (resno != lastResNo + 1) {
monomerIndexCurrent = -1;
}lastResNo = resno;
}monomerIndexCurrent = g.setProteinStructureType(type, monomerIndexCurrent);
if (g.getStrucNo() > 1000) g.setStrucNo(++lastStrucNo);
this.ms.proteinStructureTainted = m.structureTainted = true;
}
}, "JU.BS,J.c.STR");
Clazz_defineMethod(c$, "setAllStructureList", 
function(structureList){
for (var iModel = this.ms.mc; --iModel >= 0; ) if (this.ms.am[iModel].isBioModel) {
var m = this.ms.am[iModel];
m.bioPolymers = JU.AU.arrayCopyObject(m.bioPolymers, m.bioPolymerCount);
for (var i = m.bioPolymerCount; --i >= 0; ) {
var bp = m.bioPolymers[i];
if (Clazz_instanceOf(bp,"JM.AminoPolymer")) (bp).setStructureList(structureList);
}
}
}, "java.util.Map");
Clazz_defineMethod(c$, "getAllBasePairBits", 
function(specInfo){
var bsA = null;
var bsB = null;
var vHBonds =  new JU.Lst();
if (specInfo.length == 0) {
bsA = bsB = this.vwr.getAllAtoms();
this.calcAllRasmolHydrogenBonds(bsA, bsB, vHBonds, true, 1, false, null, 0);
} else {
for (var i = 0; i < specInfo.length; ) {
bsA = this.ms.getSequenceBits(specInfo.substring(i, ++i), null,  new JU.BS());
if (bsA.nextSetBit(0) < 0) continue;
bsB = this.ms.getSequenceBits(specInfo.substring(i, ++i), null,  new JU.BS());
if (bsB.nextSetBit(0) < 0) continue;
this.calcAllRasmolHydrogenBonds(bsA, bsB, vHBonds, true, 1, false, null, 0);
}
}var bsAtoms =  new JU.BS();
for (var i = vHBonds.size(); --i >= 0; ) {
var b = vHBonds.get(i);
bsAtoms.set(b.atom1.i);
bsAtoms.set(b.atom2.i);
}
return bsAtoms;
}, "~S");
Clazz_defineMethod(c$, "getAllUnitIds", 
function(specInfo, bsSelected, bsResult){
var maps = this.unitIdSets;
if (maps == null) {
maps = this.unitIdSets =  new Array(7);
for (var i = 0; i < 7; i++) maps[i] =  new java.util.Hashtable();

for (var i = this.ms.mc; --i >= 0; ) {
var m = this.ms.am[i];
if (!m.isBioModel) continue;
if (this.ms.isTrajectory(i)) m = this.ms.am[i = m.trajectoryBaseIndex];
var num = "|" + this.ms.getInfo(i, "modelNumber");
this.checkMap(maps[0], this.ms.getInfo(i, "modelName") + num, m.bsAtoms);
this.checkMap(maps[0], num, m.bsAtoms);
}
}var bsModelChain = null;
var lastModelChain = null;
var bsTemp =  new JU.BS();
var units = JU.PT.getTokens(JU.PT.replaceAllCharacters(specInfo, ", \t\n[]\"=", " "));
var ptrs =  Clazz_newIntArray (8, 0);
for (var i = units.length; --i >= 0; ) {
var unit = units[i] + "|";
if (unit.length < 5) continue;
var bsPtr = 0;
for (var j = 0, n = 0, pt = unit.lastIndexOf('|') + 1; j < pt && n < 8; j++) {
if (unit.charAt(j) == '|') ptrs[n++] = j;
 else bsPtr |= 1 << n;
}
if ((bsPtr & 0x16) != 0x16) continue;
bsTemp.clearAll();
bsTemp.or(bsSelected);
var mchain = unit.substring(0, ptrs[2]);
if (lastModelChain != null && lastModelChain.equals(mchain)) {
bsTemp.and(bsModelChain);
} else {
if (!this.addUnit(1094717454, unit.substring(0, ptrs[1]).toUpperCase(), bsTemp, maps[0]) || !this.addUnit(1073742357, unit.substring(ptrs[1] + 1, ptrs[2]), bsTemp, maps[1])) continue;
bsModelChain = JU.BSUtil.copy(bsTemp);
lastModelChain = mchain;
}var haveAtom = ((bsPtr & (32)) != 0);
var haveAlt = ((bsPtr & (64)) != 0);
if (!this.addUnit(1094715412, unit.substring(ptrs[3] + 1, ptrs[4]), bsTemp, maps[2]) || !this.addUnit(5, ((bsPtr & (128)) == 0 ? "\0" : unit.substring(ptrs[6] + 1, ptrs[7])), bsTemp, maps[3]) || (haveAtom ? !this.addUnit(1086326786, unit.substring(ptrs[4] + 1, ptrs[5]).toUpperCase(), bsTemp, maps[4]) || !this.addUnit(1073742355, unit.substring(ptrs[5] + 1, ptrs[6]), bsTemp, maps[5]) : haveAlt && !this.addUnit(1094717448, unit.substring(ptrs[5] + 1, ptrs[6]), bsTemp, maps[6]))) continue;
bsResult.or(bsTemp);
}
return bsResult;
}, "~S,JU.BS,JU.BS");
Clazz_defineMethod(c$, "checkMap", 
function(map, key, bsAtoms){
var bs = JU.BSUtil.copy(bsAtoms);
var bs0 = map.get(key);
if (bs0 == null) map.put(key, bs0 = bs);
 else bs0.or(bs);
return bs0;
}, "java.util.Map,~S,JU.BS");
Clazz_defineMethod(c$, "addUnit", 
function(tok, key, bsTemp, map){
var bs = map.get(key);
if (bs == null) {
var o;
switch (tok) {
default:
return false;
case 1073742357:
o = Integer.$valueOf(this.vwr.getChainID(key, false));
break;
case 1094715412:
o = Integer.$valueOf(JU.PT.parseInt(key));
break;
case 5:
o = Integer.$valueOf(key.charAt(0).charCodeAt(0));
break;
case 1094717448:
bs = this.ms.getAtomBitsMDa(tok = 1073742355, null,  new JU.BS());
case 1086326786:
o = key;
break;
case 1073742355:
o = (key.length == 0 ? null : key);
break;
}
map.put(key, bs = this.ms.getAtomBitsMDa(tok, o, (bs == null ?  new JU.BS() : bs)));
}bsTemp.and(bs);
return (bsTemp.nextSetBit(0) >= 0);
}, "~N,~S,JU.BS,java.util.Map");
Clazz_defineMethod(c$, "getAnnotationBits", 
function(name, tok, specInfo){
var bs =  new JU.BS();
var pa = this.vwr.getAnnotationParser(name.equals("dssr"));
var ann;
for (var i = this.ms.mc; --i >= 0; ) if ((ann = this.ms.getInfo(i, name)) != null) bs.or(pa.getAtomBits(this.vwr, specInfo, (this.ms.am[i]).getCachedAnnotationMap(name + " V ", ann), this.ms.am[i].dssrCache, tok, i, this.ms.am[i].bsAtoms));

return bs;
}, "~S,~N,~S");
Clazz_defineMethod(c$, "getStructureLines", 
function(bsAtoms, cmd, lstStr, type, scriptMode, mode){
var showMode = (mode == 134222350);
var nHelix = 0;
var nSheet = 0;
var nTurn = 0;
var sid = null;
var bs =  new JU.BS();
var n = 0;
for (var i = 0, ns = lstStr.size(); i < ns; i++) {
var ps = lstStr.get(i);
if (ps.type !== type) continue;
var m1 = ps.findMonomer(bsAtoms, true);
var m2 = ps.findMonomer(bsAtoms, false);
if (m1 == null || m2 == null) continue;
var iModel = ps.apolymer.model.modelIndex;
var comment = (scriptMode ? "    \t# model=" + this.ms.getModelNumberDotted(iModel) : null);
var res1 = m1.getResno();
var res2 = m2.getResno();
var subtype = ps.subtype;
switch (type) {
case J.c.STR.HELIX:
case J.c.STR.TURN:
case J.c.STR.SHEET:
n++;
if (scriptMode) {
bs.clearAll();
ps.setAtomBits(bs);
var stype = subtype.getBioStructureTypeName(false);
cmd.append("  structure ").append(stype).append(" ").append(JU.Escape.eBS(bs)).append(comment).append(" & (" + res1 + " - " + res2 + ")").append(";\n");
} else {
var str;
var nx;
switch (type) {
case J.c.STR.HELIX:
nx = ++nHelix;
sid = JU.PT.formatStringI("%3N %3N", "N", nx);
str = "HELIX  %ID %3GROUPA %1CA %4RESA  %3GROUPB %1CB %4RESB";
var stype = null;
switch (subtype) {
case J.c.STR.HELIX:
case J.c.STR.HELIXALPHA:
stype = "  1";
break;
case J.c.STR.HELIX310:
stype = "  5";
break;
case J.c.STR.HELIXPI:
stype = "  3";
break;
}
if (stype != null) str += stype;
break;
case J.c.STR.SHEET:
nx = ++nSheet;
sid = JU.PT.formatStringI("%3N %3A 0", "N", nx);
sid = JU.PT.formatStringS(sid, "A", "S" + nx);
str = "SHEET  %ID %3GROUPA %1CA%4RESA  %3GROUPB %1CB%4RESB";
break;
case J.c.STR.TURN:
default:
nx = ++nTurn;
sid = JU.PT.formatStringI("%3N %3N", "N", nx);
str = "TURN   %ID %3GROUPA %1CA%4RESA  %3GROUPB %1CB%4RESB";
break;
}
str = JU.PT.formatStringS(str, "ID", sid);
str = JU.PT.formatStringS(str, "GROUPA", m1.getGroup3());
str = JU.PT.formatStringS(str, "CA", m1.getLeadAtom().getChainIDStr());
str = JU.PT.formatStringI(str, "RESA", res1);
str = JU.PT.formatStringS(str, "GROUPB", m2.getGroup3());
str = JU.PT.formatStringS(str, "CB", m2.getLeadAtom().getChainIDStr());
str = JU.PT.formatStringI(str, "RESB", res2);
cmd.append(str);
if (showMode) cmd.append(" strucno= ").appendI(ps.strucNo);
cmd.append("\n");
}}
}
if (n > 0) cmd.append("\n");
return n;
}, "JU.BS,JU.SB,JU.Lst,J.c.STR,~B,~N");
Clazz_defineMethod(c$, "modelsOf", 
function(bsAtoms, bsAtomsRet){
var bsModels = JU.BS.newN(this.ms.mc);
var isAll = (bsAtoms == null);
var i0 = (isAll ? this.ms.ac - 1 : bsAtoms.nextSetBit(0));
for (var i = i0; i >= 0; i = (isAll ? i - 1 : bsAtoms.nextSetBit(i + 1))) {
if (this.ms.at[i] == null) continue;
var modelIndex = this.ms.am[this.ms.at[i].mi].trajectoryBaseIndex;
if (this.ms.isJmolDataFrame(modelIndex)) continue;
bsModels.set(modelIndex);
bsAtomsRet.set(i);
}
return bsModels;
}, "JU.BS,JU.BS");
Clazz_defineMethod(c$, "setAllDefaultStructure", 
function(bsModels){
for (var i = bsModels.nextSetBit(0); i >= 0; i = bsModels.nextSetBit(i + 1)) if (this.ms.am[i].isBioModel) {
var m = this.ms.am[i];
if (m.defaultStructure == null) m.defaultStructure = this.getFullProteinStructureState(m.bsAtoms, 1073742158);
}
}, "JU.BS");
Clazz_defineMethod(c$, "getAminoAcidValenceAndCharge", 
function(s, atomName, aaRet){
return this.getBioExt().getAminoAcidValenceAndCharge(s, atomName, aaRet);
}, "~S,~S,~A");
});
;//5.0.1-v7 Sat Feb 28 10:50:06 CST 2026
Clazz_declarePackage("JM");
Clazz_load(["JM.Model"], "JM.BioModel", ["java.util.Hashtable", "JU.AU", "$.BS", "$.Lst", "$.SB", "J.api.Interface", "JU.Escape"], function(){
var c$ = Clazz_decorateAsClass(function(){
this.vwr = null;
this.bioPolymerCount = 0;
this.bioPolymers = null;
this.isMutated = false;
this.defaultStructure = null;
Clazz_instantialize(this, arguments);}, JM, "BioModel", JM.Model);
Clazz_defineMethod(c$, "setBioModel", 
function(modelSet, modelIndex, trajectoryBaseIndex, jmolData, properties, auxiliaryInfo){
this.setupArrays();
this.vwr = modelSet.vwr;
this.set(modelSet, modelIndex, trajectoryBaseIndex, jmolData, properties, auxiliaryInfo);
this.isBioModel = true;
this.vwr.getJBR().getBioModelSet(modelSet);
this.clearBioPolymers();
modelSet.am[modelIndex] = this;
this.pdbID = auxiliaryInfo.get("name");
return this;
}, "JM.ModelSet,~N,~N,java.util.Map,java.util.Properties,java.util.Map");
Clazz_defineMethod(c$, "addBioPolymer", 
function(polymer){
if (this.bioPolymers.length == 0) this.clearBioPolymers();
if (this.bioPolymerCount == this.bioPolymers.length) this.bioPolymers = JU.AU.doubleLength(this.bioPolymers);
polymer.bioPolymerIndexInModel = this.bioPolymerCount;
this.bioPolymers[this.bioPolymerCount++] = polymer;
return polymer.monomerCount;
}, "JM.BioPolymer");
Clazz_defineMethod(c$, "addSecondaryStructure", 
function(type, structureID, serialID, strandCount, startChainID, startSeqcode, endChainID, endSeqcode, istart, iend, bsAssigned){
for (var i = this.bioPolymerCount; --i >= 0; ) if (Clazz_instanceOf(this.bioPolymers[i],"JM.AlphaPolymer")) (this.bioPolymers[i]).addStructure(type, structureID, serialID, strandCount, startChainID, startSeqcode, endChainID, endSeqcode, istart, iend, bsAssigned);

}, "J.c.STR,~S,~S,~N,~N,~N,~N,~N,~N,~N,JU.BS");
Clazz_defineMethod(c$, "addStructureByBS", 
function(count, dsspType, type, bs){
for (var i = this.bioPolymerCount; --i >= 0; ) {
var b = this.bioPolymers[i];
if (Clazz_instanceOf(b,"JM.AlphaPolymer")) count = (this.bioPolymers[i]).setStructureBS(++count, dsspType, type, bs, true);
}
}, "~N,~N,J.c.STR,JU.BS");
Clazz_defineMethod(c$, "calculateDssx", 
function(vHBonds, doReport, dsspIgnoreHydrogen, setStructure, version){
var haveProt = false;
var haveNucl = false;
for (var i = 0; i < this.bioPolymerCount && !(haveProt && haveNucl); i++) {
if (this.bioPolymers[i].isNucleic()) haveNucl = true;
 else if (Clazz_instanceOf(this.bioPolymers[i],"JM.AminoPolymer")) haveProt = true;
}
var s = "";
if (haveProt) s += (J.api.Interface.getOption("dssx.DSSP", this.vwr, "ms")).calculateDssp(this.bioPolymers, this.bioPolymerCount, vHBonds, doReport, dsspIgnoreHydrogen, setStructure, version);
if (haveNucl && this.auxiliaryInfo.containsKey("dssr") && vHBonds != null) s += this.vwr.getAnnotationParser(true).getHBonds(this.ms, this.modelIndex, vHBonds, doReport);
return s;
}, "JU.Lst,~B,~B,~B,~N");
Clazz_defineMethod(c$, "calculateStructures", 
function(asDSSP, doReport, dsspIgnoreHydrogen, setStructure, includeAlpha, version){
if (this.bioPolymerCount == 0 || !setStructure && !asDSSP) return "";
this.ms.proteinStructureTainted = this.structureTainted = true;
if (setStructure) for (var i = this.bioPolymerCount; --i >= 0; ) if (!asDSSP || this.bioPolymers[i].monomers[0].getNitrogenAtom() != null) this.bioPolymers[i].clearStructures();

if (!asDSSP || includeAlpha) for (var i = this.bioPolymerCount; --i >= 0; ) if (Clazz_instanceOf(this.bioPolymers[i],"JM.AlphaPolymer")) (this.bioPolymers[i]).calculateStructures(includeAlpha);

return (asDSSP ? this.calculateDssx(null, doReport, dsspIgnoreHydrogen, setStructure, version) : "");
}, "~B,~B,~B,~B,~B,~N");
Clazz_defineMethod(c$, "clearBioPolymers", 
function(){
this.bioPolymers =  new Array(8);
this.bioPolymerCount = 0;
});
Clazz_overrideMethod(c$, "fixIndices", 
function(modelIndex, nAtomsDeleted, bsDeleted){
this.fixIndicesM(modelIndex, nAtomsDeleted, bsDeleted);
this.recalculateLeadMidpointsAndWingVectors();
}, "~N,~N,JU.BS");
Clazz_overrideMethod(c$, "freeze", 
function(){
this.freezeM();
this.bioPolymers = JU.AU.arrayCopyObject(this.bioPolymers, this.bioPolymerCount);
return true;
});
Clazz_defineMethod(c$, "getBioBranches", 
function(biobranches){
var bsBranch;
for (var j = 0; j < this.bioPolymerCount; j++) {
bsBranch =  new JU.BS();
this.bioPolymers[j].getRange(bsBranch, this.isMutated);
var iAtom = bsBranch.nextSetBit(0);
if (iAtom >= 0) {
if (biobranches == null) biobranches =  new JU.Lst();
biobranches.addLast(bsBranch);
}}
return biobranches;
}, "JU.Lst");
Clazz_defineMethod(c$, "getBioPolymerCount", 
function(){
return this.bioPolymerCount;
});
Clazz_defineMethod(c$, "getCachedAnnotationMap", 
function(key, ann){
var cache = (this.dssrCache == null && ann != null ? this.dssrCache =  new java.util.Hashtable() : this.dssrCache);
if (cache == null) return null;
var annotv = cache.get(key);
if (annotv == null && ann != null) {
annotv = (Clazz_instanceOf(ann,"JS.SV") || Clazz_instanceOf(ann,"java.util.Hashtable") ? ann : this.vwr.parseJSONMap(ann));
cache.put(key, annotv);
}return (Clazz_instanceOf(annotv,"JS.SV") || Clazz_instanceOf(annotv,"java.util.Hashtable") ? annotv : null);
}, "~S,~O");
Clazz_defineMethod(c$, "getConformation", 
function(conformationIndex0, doSet, bsAtoms, bsRet){
var isConfig0 = (conformationIndex0 == 0);
if (this.altLocCount == 0) {
if (isConfig0) bsRet.or(bsAtoms);
return;
}var isFirst = (conformationIndex0 <= 0);
var atoms = this.ms.at;
var isSpace = (conformationIndex0 == -32);
var thisAltLoc = (isFirst && !isSpace ? String.fromCharCode(-conformationIndex0) : '\0');
if (isFirst) {
var lastChain = -2147483648;
var lastIns = '\u0000';
var lastRes = -2147483648;
var map =  new java.util.Hashtable();
for (var i = bsAtoms.nextSetBit(0); i >= 0; i = bsAtoms.nextSetBit(i + 1)) {
var atom = atoms[i];
var chain = atom.getChainID();
var res = atom.getResno();
var ins = atom.getInsertionCode();
if (res != lastRes || ins != lastIns || chain != lastChain) {
lastChain = chain;
lastRes = res;
lastIns = ins;
map.clear();
}var name = atom.getAtomName();
var locs = map.get(name);
if (locs == null) map.put(name, locs =  Clazz_newIntArray (1, 0));
var i0 = locs[0] - 1;
if (i0 < 0) {
if (i0 == -2) {
bsAtoms.clear(i);
continue;
}if (isSpace) {
if (atom.altloc != '\0') {
bsAtoms.clear(i);
}} else {
locs[0] = i + 1;
}continue;
}if (isConfig0) {
bsAtoms.clear(i);
locs[0] = -1;
} else if (atom.altloc == thisAltLoc) {
locs[0] = -1;
} else {
i0 = i;
}bsAtoms.clear(i0);
}
} else {
conformationIndex0--;
var g = null;
var ch = '\u0000';
var conformationIndex = conformationIndex0;
var bsFound =  new JU.BS();
for (var i = bsAtoms.nextSetBit(0); i >= 0; i = bsAtoms.nextSetBit(i + 1)) {
var atom = atoms[i];
var altloc = atom.altloc;
if (altloc == '\0') continue;
if (atom.group !== g) {
g = atom.group;
ch = '\0';
conformationIndex = conformationIndex0;
bsFound.clearAll();
}if (conformationIndex >= 0 && altloc != ch && !bsFound.get(altloc.charCodeAt(0))) {
ch = altloc;
conformationIndex--;
bsFound.set(altloc.charCodeAt(0));
}if (conformationIndex >= 0 || altloc != ch) bsAtoms.clear(i);
}
}if (bsAtoms.nextSetBit(0) >= 0) {
bsRet.or(bsAtoms);
if (doSet) for (var j = this.bioPolymerCount; --j >= 0; ) this.bioPolymers[j].setConformation(bsAtoms);

}}, "~N,~B,JU.BS,JU.BS");
Clazz_defineMethod(c$, "getDefaultLargePDBRendering", 
function(sb, maxAtoms){
var bs =  new JU.BS();
if (this.getBondCount() == 0) bs = this.bsAtoms;
if (bs !== this.bsAtoms) for (var i = 0; i < this.bioPolymerCount; i++) this.bioPolymers[i].getRange(bs, this.isMutated);

if (bs.nextSetBit(0) < 0) return;
var bs2 =  new JU.BS();
if (bs === this.bsAtoms) {
bs2 = bs;
} else {
for (var i = 0; i < this.bioPolymerCount; i++) if (this.bioPolymers[i].getType() == 0) this.bioPolymers[i].getRange(bs2, this.isMutated);

}if (bs2.nextSetBit(0) >= 0) sb.append("select ").append(JU.Escape.eBS(bs2)).append(";backbone only;");
if (this.act <= maxAtoms) return;
sb.append("select ").append(JU.Escape.eBS(bs)).append(" & connected; wireframe only;");
if (bs !== this.bsAtoms) {
bs2.clearAll();
bs2.or(this.bsAtoms);
bs2.andNot(bs);
if (bs2.nextSetBit(0) >= 0) sb.append("select " + JU.Escape.eBS(bs2) + " & !connected;stars 0.5;spacefill off;");
}}, "JU.SB,~N");
Clazz_defineMethod(c$, "getFullPDBHeader", 
function(){
if (this.modelIndex < 0) return "";
var info = this.auxiliaryInfo.get("fileHeader");
if (info != null) return info;
return this.ms.bioModelset.getBioExt().getFullPDBHeader(this.auxiliaryInfo);
});
Clazz_defineMethod(c$, "getPdbData", 
function(type, ctype, isDraw, bsSelected, out, tokens, pdbCONECT, bsWritten){
this.ms.bioModelset.getBioExt().getPdbDataM(this, this.vwr, type, ctype, isDraw, bsSelected, out, tokens, pdbCONECT, bsWritten);
}, "~S,~S,~B,JU.BS,JU.OC,~A,JU.SB,JU.BS");
Clazz_defineMethod(c$, "getRasmolHydrogenBonds", 
function(bsA, bsB, vHBonds, nucleicOnly, nMax, dsspIgnoreHydrogens, bsHBonds, version){
var doAdd = (vHBonds == null);
if (doAdd) vHBonds =  new JU.Lst();
if (nMax < 0) nMax = 2147483647;
var asDSSX = (bsB == null);
var bp;
var bp1;
if (asDSSX && this.bioPolymerCount > 0) {
this.calculateDssx(vHBonds, false, dsspIgnoreHydrogens, false, version);
} else {
for (var i = this.bioPolymerCount; --i >= 0; ) {
bp = this.bioPolymers[i];
if (bp.monomerCount == 0) continue;
var type = bp.getType();
var isRNA = false;
switch (type) {
case 1:
if (nucleicOnly) continue;
bp.calcRasmolHydrogenBonds(null, bsA, bsB, vHBonds, nMax, null, true, false);
break;
case 2:
isRNA = bp.monomers[0].isRna();
break;
default:
continue;
}
for (var j = this.bioPolymerCount; --j >= 0; ) {
if ((bp1 = this.bioPolymers[j]) != null && (isRNA || i != j) && type == bp1.getType()) {
bp1.calcRasmolHydrogenBonds(bp, bsA, bsB, vHBonds, nMax, null, true, false);
}}
}
}if (vHBonds.size() == 0 || !doAdd) return;
this.hasRasmolHBonds = true;
for (var i = 0; i < vHBonds.size(); i++) {
var bond = vHBonds.get(i);
var atom1 = bond.atom1;
var atom2 = bond.atom2;
if (atom1.isBonded(atom2)) continue;
var index = this.ms.addHBond(atom1, atom2, bond.order, bond.getEnergy());
if (bsHBonds != null) bsHBonds.set(index);
}
}, "JU.BS,JU.BS,JU.Lst,~B,~N,~B,JU.BS,~N");
Clazz_defineMethod(c$, "getUnitID", 
function(atom, flags){
var sb =  new JU.SB();
var m = atom.group;
var noTrim = ((flags & 16) != 16);
var ch = ((flags & 8) == 8 ? m.getInsertionCode() : '\0');
var isAll = (ch != '\0');
if ((flags & 1) == 1 && (this.pdbID != null)) sb.append(this.pdbID);
sb.append("|").appendO(this.ms.getInfo(this.modelIndex, "modelNumber")).append("|").append(this.vwr.getChainIDStr(m.chain.chainID)).append("|").append(m.getGroup3()).append("|").appendI(m.getResno());
if ((flags & 4) == 4) {
sb.append("|").append(atom.getAtomName());
if (atom.altloc != '\0') sb.append("|").appendC(atom.altloc);
 else if (noTrim || isAll) sb.append("|");
} else if (noTrim || isAll) {
sb.append("||");
}if (isAll) sb.append("|").appendC(ch);
 else if (noTrim) sb.append("|");
if (noTrim) sb.append("|");
return sb.toString();
}, "JM.Atom,~N");
Clazz_defineMethod(c$, "recalculateLeadMidpointsAndWingVectors", 
function(){
for (var ip = 0; ip < this.bioPolymerCount; ip++) this.bioPolymers[ip].recalculateLeadMidpointsAndWingVectors();

});
Clazz_defineMethod(c$, "resetRasmolBonds", 
function(bs, dsspVersion){
var bsDelete =  new JU.BS();
this.hasRasmolHBonds = false;
var am = this.ms.am;
var bo = this.ms.bo;
for (var i = this.ms.bondCount; --i >= 0; ) {
var bond = bo[i];
if (bond != null && (bond.order & 28672) != 0 && am[bond.atom1.mi].trajectoryBaseIndex == this.modelIndex) bsDelete.set(i);
}
if (bsDelete.nextSetBit(0) >= 0) this.ms.deleteBonds(bsDelete, false);
this.getRasmolHydrogenBonds(bs, bs, null, false, 2147483647, false, null, dsspVersion);
}, "JU.BS,~N");
Clazz_defineMethod(c$, "getAtomicDSSRData", 
function(dssrData, dataType){
if (this.auxiliaryInfo.containsKey("dssr")) this.vwr.getAnnotationParser(true).getAtomicDSSRData(this.ms, this.modelIndex, dssrData, dataType);
}, "~A,~S");
});
;//5.0.1-v7 Sat Feb 28 09:57:54 CST 2026
Clazz_declarePackage("JM");
Clazz_load(["java.util.Hashtable", "J.c.STR"], "JM.BioResolver", ["java.util.Arrays", "JU.AU", "$.BS", "$.Measure", "$.P3", "$.P4", "$.PT", "$.SB", "$.V3", "JM.Group", "JM.AlphaMonomer", "$.AlphaPolymer", "$.AminoMonomer", "$.AminoPolymer", "$.BioModel", "$.BioModelSet", "$.CarbohydrateMonomer", "$.CarbohydratePolymer", "$.NucleicMonomer", "$.NucleicPolymer", "$.PhosphorusMonomer", "$.PhosphorusPolymer", "JU.BSUtil", "$.Logger", "JV.JC"], function(){
var c$ = Clazz_decorateAsClass(function(){
this.vwr = null;
this.vAB = null;
this.vNorm = null;
this.plane = null;
this.ml = null;
this.ms = null;
this.bsAddedMask = null;
this.haveHsAlready = false;
this.bsAddedHydrogens = null;
this.bsAtomsForHs = null;
this.htBondMap = null;
this.htGroupBonds = null;
this.hNames = null;
this.baseBondIndex = 0;
this.hasCONECT = false;
this.bsAssigned = null;
this.carbohydrates = null;
Clazz_instantialize(this, arguments);}, JM, "BioResolver", null, java.util.Comparator);
c$.add = Clazz_defineMethod(c$, "add", 
function(info, g1, g2){
if (g1 == null || g2 == null) return null;
var bp =  new JM.BasePair();
bp.info = info;
(bp.g1 = g1).addBasePair(bp);
(bp.g2 = g2).addBasePair(bp);
return bp;
}, "java.util.Map,JM.NucleicMonomer,JM.NucleicMonomer");
Clazz_defineMethod(c$, "getPartnerAtom", 
function(g){
return (g === this.g1 ? this.g2 : this.g1).getLeadAtom().i;
}, "JM.NucleicMonomer");
Clazz_defineMethod(c$, "toString", 
function(){
return this.info.toString();
});
})();
;//5.0.1-v7 Sat Feb 28 09:58:50 CST 2026
Clazz_declarePackage("JM");
Clazz_load(["JM.PhosphorusMonomer"], "JM.NucleicMonomer", ["JU.A4", "$.Lst", "$.M3", "$.P3", "$.Quat", "$.V3", "J.c.STR", "JM.Group", "JM.NucleicPolymer"], function(){
var c$ = Clazz_decorateAsClass(function(){
this.$isPurine = false;
this.$isPyrimidine = false;
this.hasRnaO2Prime = false;
this.baseCenter = null;
this.bps = null;
this.dssrBox = null;
this.dssrBoxHeight = 0;
this.dssrFrame = null;
Clazz_instantialize(this, arguments);}, JM, "NucleicMonomer", JM.PhosphorusMonomer);
Clazz_overrideConstructor(c$, 
function(){
});
c$.validateAndAllocate = Clazz_defineMethod(c$, "validateAndAllocate", 
function(chain, group3, seqcode, firstAtomIndex, lastAtomIndex, specialAtomIndexes){
var offsets = JM.Monomer.scanForOffsets(firstAtomIndex, specialAtomIndexes, JM.NucleicMonomer.interestingNucleicAtomIDs);
if (offsets == null) return null;
if (!JM.Monomer.checkOptional(offsets, 19, firstAtomIndex, specialAtomIndexes[73])) return null;
JM.Monomer.checkOptional(offsets, 20, firstAtomIndex, specialAtomIndexes[89]);
JM.Monomer.checkOptional(offsets, 18, firstAtomIndex, specialAtomIndexes[90]);
JM.Monomer.checkOptional(offsets, 23, firstAtomIndex, specialAtomIndexes[75]);
JM.Monomer.checkOptional(offsets, 24, firstAtomIndex, specialAtomIndexes[77]);
return ( new JM.NucleicMonomer()).set4(chain, group3, seqcode, firstAtomIndex, lastAtomIndex, offsets);
}, "JM.Chain,~S,~N,~N,~N,~A");
Clazz_defineMethod(c$, "set4", 
function(chain, group3, seqcode, firstAtomIndex, lastAtomIndex, offsets){
this.set2(chain, group3, seqcode, firstAtomIndex, lastAtomIndex, offsets);
if (!JM.Monomer.have(offsets, 15)) {
offsets[0] = offsets[19];
this.setLeadAtomIndex();
}this.hasRnaO2Prime = JM.Monomer.have(offsets, 2);
this.$isPyrimidine = JM.Monomer.have(offsets, 8);
this.$isPurine = JM.Monomer.have(offsets, 9) && JM.Monomer.have(offsets, 10) && JM.Monomer.have(offsets, 11);
return this;
}, "JM.Chain,~S,~N,~N,~N,~A");
Clazz_overrideMethod(c$, "isNucleicMonomer", 
function(){
return true;
});
Clazz_overrideMethod(c$, "isDna", 
function(){
return !this.hasRnaO2Prime;
});
Clazz_overrideMethod(c$, "isRna", 
function(){
return this.hasRnaO2Prime;
});
Clazz_overrideMethod(c$, "isPurine", 
function(){
return this.$isPurine || !this.$isPyrimidine && this.isPurineByID();
});
Clazz_overrideMethod(c$, "isPyrimidine", 
function(){
return this.$isPyrimidine || !this.$isPurine && this.isPyrimidineByID();
});
Clazz_defineMethod(c$, "isGuanine", 
function(){
return JM.Monomer.have(this.offsets, 17);
});
Clazz_overrideMethod(c$, "getProteinStructureType", 
function(){
return (this.hasRnaO2Prime ? J.c.STR.RNA : J.c.STR.DNA);
});
Clazz_defineMethod(c$, "getP", 
function(){
return this.getAtomFromOffsetIndex(0);
});
Clazz_defineMethod(c$, "getC1P", 
function(){
return this.getAtomFromOffsetIndex(25);
});
Clazz_defineMethod(c$, "getC2", 
function(){
return this.getAtomFromOffsetIndex(5);
});
Clazz_defineMethod(c$, "getC5", 
function(){
return this.getAtomFromOffsetIndex(3);
});
Clazz_defineMethod(c$, "getC6", 
function(){
return this.getAtomFromOffsetIndex(1);
});
Clazz_defineMethod(c$, "getC8", 
function(){
return this.getAtomFromOffsetIndex(10);
});
Clazz_defineMethod(c$, "getC4P", 
function(){
return this.getAtomFromOffsetIndex(27);
});
Clazz_defineMethod(c$, "getN1", 
function(){
return this.getAtomFromOffsetIndex(4);
});
Clazz_defineMethod(c$, "getN3", 
function(){
return this.getAtomFromOffsetIndex(6);
});
Clazz_defineMethod(c$, "getN2", 
function(){
return this.getAtomFromOffsetIndex(17);
});
Clazz_defineMethod(c$, "getN4", 
function(){
return this.getAtomFromOffsetIndex(14);
});
Clazz_defineMethod(c$, "getN6", 
function(){
return this.getAtomFromOffsetIndex(16);
});
Clazz_defineMethod(c$, "getO2", 
function(){
return this.getAtomFromOffsetIndex(8);
});
Clazz_defineMethod(c$, "getO4", 
function(){
return this.getAtomFromOffsetIndex(12);
});
Clazz_defineMethod(c$, "getO6", 
function(){
return this.getAtomFromOffsetIndex(13);
});
Clazz_overrideMethod(c$, "getTerminatorAtom", 
function(){
return this.getAtomFromOffsetIndex(JM.Monomer.have(this.offsets, 20) ? 20 : 21);
});
Clazz_defineMethod(c$, "getBaseRing6Points", 
function(pts){
this.getPoints(JM.NucleicMonomer.ring6OffsetIndexes, pts);
}, "~A");
Clazz_defineMethod(c$, "getPoints", 
function(a, pts){
for (var i = a.length; --i >= 0; ) pts[i] = this.getAtomFromOffsetIndex(a[i]);

}, "~A,~A");
Clazz_defineMethod(c$, "maybeGetBaseRing5Points", 
function(pts){
if (this.$isPurine) this.getPoints(JM.NucleicMonomer.ring5OffsetIndexes, pts);
return this.$isPurine;
}, "~A");
Clazz_defineMethod(c$, "getRiboseRing5Points", 
function(pts){
this.getPoints(JM.NucleicMonomer.riboseOffsetIndexes, pts);
}, "~A");
Clazz_overrideMethod(c$, "isConnectedAfter", 
function(possiblyPreviousMonomer){
if (possiblyPreviousMonomer == null) return true;
var myPhosphorusAtom = this.getAtomFromOffsetIndex(15);
if (myPhosphorusAtom == null) return false;
return ((possiblyPreviousMonomer).getAtomFromOffsetIndex(21).isBonded(myPhosphorusAtom) || this.isCA2(possiblyPreviousMonomer));
}, "JM.Monomer");
Clazz_overrideMethod(c$, "findNearestAtomIndex", 
function(x, y, closest, madBegin, madEnd){
var competitor = closest[0];
var lead = this.getLeadAtom();
var o5prime = this.getAtomFromOffsetIndex(19);
var c3prime = this.getAtomFromOffsetIndex(22);
var mar = (Clazz_doubleToInt(madBegin / 2));
if (mar < 1900) mar = 1900;
var radius = Clazz_floatToInt(this.scaleToScreen(lead.sZ, mar));
if (radius < 4) radius = 4;
if (this.isCursorOnTopOf(lead, x, y, radius, competitor) || this.isCursorOnTopOf(o5prime, x, y, radius, competitor) || this.isCursorOnTopOf(c3prime, x, y, radius, competitor)) closest[0] = lead;
}, "~N,~N,~A,~N,~N");
Clazz_defineMethod(c$, "setRingsVisible", 
function(isVisible){
for (var i = 6; --i >= 0; ) this.getAtomFromOffsetIndex(JM.NucleicMonomer.ring6OffsetIndexes[i]).setShapeVisibility(32768, isVisible);

if (this.$isPurine) for (var i = 4; --i >= 1; ) this.getAtomFromOffsetIndex(JM.NucleicMonomer.ring5OffsetIndexes[i]).setShapeVisibility(32768, isVisible);

}, "~B");
Clazz_defineMethod(c$, "setRingsClickable", 
function(){
for (var i = 6; --i >= 0; ) this.getAtomFromOffsetIndex(JM.NucleicMonomer.ring6OffsetIndexes[i]).setClickable(32768);

if (this.$isPurine) for (var i = 4; --i >= 1; ) this.getAtomFromOffsetIndex(JM.NucleicMonomer.ring5OffsetIndexes[i]).setClickable(32768);

});
Clazz_defineMethod(c$, "getN0", 
function(){
return (this.getAtomFromOffsetIndex(this.$isPurine ? 11 : 4));
});
Clazz_overrideMethod(c$, "getHelixData", 
function(tokType, qType, mStep){
return this.getHelixData2(tokType, qType, mStep);
}, "~N,~S,~N");
Clazz_overrideMethod(c$, "getQuaternionFrameCenter", 
function(qType){
switch ((qType).charCodeAt(0)) {
case 120:
case 97:
case 98:
case 112:
return this.getP();
case 99:
if (this.baseCenter == null) {
var n = 0;
this.baseCenter =  new JU.P3();
for (var i = 0; i < JM.NucleicMonomer.heavyAtomIndexes.length; i++) {
var a = this.getAtomFromOffsetIndex(JM.NucleicMonomer.heavyAtomIndexes[i]);
if (a == null) continue;
this.baseCenter.add(a);
n++;
}
this.baseCenter.scale(1 / n);
}return this.baseCenter;
case 110:
default:
return this.getN0();
}
}, "~S");
Clazz_overrideMethod(c$, "getQuaternion", 
function(qType){
if (this.bioPolymer == null) return null;
var ptA = null;
var ptB = null;
var ptNorP;
var yBased = false;
var reverseY = false;
switch ((qType).charCodeAt(0)) {
case 97:
ptNorP = this.getP();
if (this.monomerIndex == 0 || ptNorP == null) return null;
yBased = true;
ptA = (this.bioPolymer.monomers[this.monomerIndex - 1]).getC4P();
ptB = this.getC4P();
break;
case 120:
ptNorP = this.getP();
if (this.monomerIndex == this.bioPolymer.monomerCount - 1 || ptNorP == null) return null;
ptA = (this.bioPolymer.monomers[this.monomerIndex + 1]).getP();
ptB = this.getC4P();
break;
case 98:
return this.getQuaternionP();
case 99:
case 110:
ptNorP = this.getN0();
if (ptNorP == null) return null;
yBased = true;
reverseY = true;
ptA = this.getAtomFromOffsetIndex(5);
ptB = this.getAtomFromOffsetIndex(25);
break;
case 112:
ptNorP = this.getP();
if (ptNorP == null) return null;
var p1 = this.getAtomFromOffsetIndex(23);
var p2 = this.getAtomFromOffsetIndex(24);
var bonds = ptNorP.bonds;
if (bonds == null) return null;
var g = ptNorP.group;
for (var i = 0; i < bonds.length; i++) {
var atom = bonds[i].getOtherAtom(ptNorP);
if (p1 != null && atom.i == p1.i) continue;
if (p2 != null && atom.i == p2.i) continue;
if (atom.group === g) ptB = atom;
 else ptA = atom;
}
break;
case 113:
return null;
default:
ptNorP = this.getN0();
if (ptNorP == null) return null;
if (this.$isPurine) {
ptA = this.getAtomFromOffsetIndex(5);
ptB = this.getAtomFromOffsetIndex(9);
} else {
ptA = this.getAtomFromOffsetIndex(6);
ptB = this.getAtomFromOffsetIndex(1);
}break;
}
if (ptA == null || ptB == null) return null;
var vA = JU.V3.newVsub(ptA, ptNorP);
var vB = JU.V3.newVsub(ptB, ptNorP);
if (reverseY) vB.scale(-1);
return JU.Quat.getQuaternionFrameV(vA, vB, null, yBased);
}, "~S");
Clazz_overrideMethod(c$, "isCrossLinked", 
function(g){
if (!(Clazz_instanceOf(g,"JM.NucleicMonomer")) || this.$isPurine == g.isPurine()) return false;
var otherNucleotide = (this.$isPurine ? g : this);
var myNucleotide = (this.$isPurine ? this : g);
var myN1 = myNucleotide.getN1();
var otherN3 = otherNucleotide.getN3();
return (myN1.isBonded(otherN3));
}, "JM.Group");
Clazz_overrideMethod(c$, "getCrossLinkVector", 
function(vReturn, crosslinkCovalent, crosslinkHBond){
if (!crosslinkHBond) return false;
var N = (this.$isPurine ? this.getN1() : this.getN3());
var bonds = N.bonds;
if (bonds == null) return false;
for (var i = 0; i < bonds.length; i++) {
if (bonds[i].isHydrogen()) {
var N2 = bonds[i].getOtherAtom(N);
var g = N2.group;
if (!(Clazz_instanceOf(g,"JM.NucleicMonomer"))) continue;
var m = g;
if ((this.$isPurine ? m.getN3() : m.getN1()) === N2) {
if (vReturn == null) return true;
vReturn.addLast(Integer.$valueOf(N.i));
vReturn.addLast(Integer.$valueOf(N2.i));
vReturn.addLast(Integer.$valueOf(m.leadAtomIndex));
}}}
return vReturn != null && vReturn.size() > 0;
}, "JU.Lst,~B,~B");
Clazz_defineMethod(c$, "getEdgePoints", 
function(pts){
pts[0] = this.getLeadAtom();
pts[1] = this.getC4P();
pts[2] = pts[5] = this.getC1P();
switch ((this.getGroup1()).charCodeAt(0)) {
case 67:
pts[3] = this.getO2();
pts[4] = this.getN4();
return true;
case 65:
pts[3] = this.getC2();
pts[4] = this.getN6();
return true;
case 71:
case 73:
pts[3] = this.getC2();
pts[4] = this.getO6();
return true;
case 84:
case 85:
pts[3] = this.getO2();
pts[4] = this.getO4();
return true;
default:
return false;
}
}, "~A");
Clazz_defineMethod(c$, "addBasePair", 
function(bp){
if (this.bps == null) this.bps =  new JU.Lst();
this.bps.addLast(bp);
}, "JM.BasePair");
Clazz_defineMethod(c$, "setGroup1", 
function(g){
if (this.group1 == '\0') this.group1 = g;
}, "~S");
Clazz_defineMethod(c$, "getBasePairs", 
function(){
if (this.bioPolymer != null && !(this.bioPolymer).isDssrSet) this.bioPolymer.model.ms.vwr.getAnnotationParser(true).getBasePairs(this.bioPolymer.model.ms.vwr, this.bioPolymer.model.modelIndex);
return this.bps;
});
Clazz_overrideMethod(c$, "getGroup1b", 
function(){
var g3 = JM.Group.group3Names[this.groupID];
var g1 = (JM.NucleicPolymer.htGroup1 == null ? null : JM.NucleicPolymer.htGroup1.get(g3));
return (g1 == null ? Character.toLowerCase(g3.charAt(g3.length - 1)) : g1.charAt(0));
});
Clazz_defineMethod(c$, "getDSSRFrame", 
function(vwr){
if (this.dssrFrame != null) return this.dssrFrame;
if (this.dssrNT != null) return this.dssrFrame = vwr.getAnnotationParser(true).getDSSRFrame(this.dssrNT);
var oxyz = this.dssrFrame =  new Array(4);
for (var i = 4; --i >= 0; ) oxyz[i] =  new JU.P3();

if (this.isPurine()) {
var v85 = JU.P3.newP(this.getC5());
v85.sub(this.getC8());
v85.normalize();
oxyz[2].setT(v85);
oxyz[2].scale(-1);
oxyz[0].scaleAdd2(4.9, v85, this.getC8());
var v89 = JU.P3.newP(this.getN0());
v89.sub(this.getC8());
oxyz[3].cross(v89, v85);
oxyz[3].normalize();
} else {
var v61 = JU.P3.newP(this.getN0());
v61.sub(this.getC6());
var v65 = JU.P3.newP(this.getC5());
v65.sub(this.getC6());
oxyz[3].cross(v61, v65);
oxyz[3].normalize();
oxyz[2].setT(v61);
oxyz[2].normalize();
var aa = JU.A4.new4(oxyz[3].x, oxyz[3].y, oxyz[3].z, (1.1623892818282233));
var m3 =  new JU.M3();
m3.setAA(aa);
m3.rotate(oxyz[2]);
oxyz[0].scaleAdd2(5.1, oxyz[2], this.getC6());
oxyz[2].scale(-1);
}oxyz[1].cross(oxyz[2], oxyz[3]);
return this.dssrFrame;
}, "JV.Viewer");
c$.interestingNucleicAtomIDs =  Clazz_newByteArray(-1, [-14, 37, -80, 36, 32, 33, 34, 35, -39, -40, -41, -42, -48, -47, -43, -14, -45, -44, -73, -7, -89, 10, 9, -75, -77, -13, -12, -9, -79, -8]);
c$.ring6OffsetIndexes =  Clazz_newByteArray(-1, [3, 1, 4, 5, 6, 7]);
c$.ring5OffsetIndexes =  Clazz_newByteArray(-1, [3, 9, 10, 11, 7]);
c$.riboseOffsetIndexes =  Clazz_newByteArray(-1, [25, 26, 22, 27, 28, 21, 29, 19, 0]);
c$.heavyAtomIndexes =  Clazz_newByteArray(-1, [3, 1, 4, 5, 6, 7, 11, 10, 9, 16, 14, 8, 12, 17, 13]);
});
;//5.0.1-v7 Sat Feb 28 09:58:50 CST 2026
Clazz_declarePackage("JM");
Clazz_load(["JM.PhosphorusPolymer"], "JM.NucleicPolymer", ["JU.Measure", "$.P4", "$.V3", "JM.HBond"], function(){
var c$ = Clazz_decorateAsClass(function(){
this.isDssrSet = false;
Clazz_instantialize(this, arguments);}, JM, "NucleicPolymer", JM.PhosphorusPolymer);
Clazz_makeConstructor(c$, 
function(monomers){
Clazz_superConstructor(this, JM.NucleicPolymer, [monomers]);
this.type = 2;
this.hasWingPoints = true;
}, "~A");
Clazz_defineMethod(c$, "getNucleicPhosphorusAtom", 
function(monomerIndex){
return this.monomers[monomerIndex].getLeadAtom();
}, "~N");
Clazz_overrideMethod(c$, "calcEtaThetaAngles", 
function(){
var eta = NaN;
for (var i = 0; i < this.monomerCount - 2; ++i) {
var m1 = this.monomers[i];
var m2 = this.monomers[i + 1];
var p1 = m1.getP();
var c41 = m1.getC4P();
var p2 = m2.getP();
var c42 = m2.getC4P();
if (i > 0) {
var m0 = this.monomers[i - 1];
var c40 = m0.getC4P();
eta = JU.Measure.computeTorsion(c40, p1, c41, p2, true);
}var theta = JU.Measure.computeTorsion(p1, c41, p2, c42, true);
if (eta < 0) eta += 360;
if (theta < 0) theta += 360;
m1.setGroupParameter(1111490565, eta);
m1.setGroupParameter(1111490576, theta);
}
return true;
});
Clazz_overrideMethod(c$, "calcRasmolHydrogenBonds", 
function(polymer, bsA, bsB, vAtoms, nMaxPerResidue, min, checkDistances, dsspIgnoreHydrogens){
var other = polymer;
var vNorm =  new JU.V3();
var vAB =  new JU.V3();
for (var i = this.monomerCount; --i >= 0; ) {
var myNucleotide = this.monomers[i];
if (!myNucleotide.isPurine()) continue;
var myN3 = myNucleotide.getN3();
var isInA = bsA.get(myN3.i);
if (!isInA && !bsB.get(myN3.i)) continue;
var myN1 = myNucleotide.getN1();
var myN9 = myNucleotide.getN0();
var plane = JU.Measure.getPlaneThroughPoints(myN3, myN1, myN9, vNorm, vAB,  new JU.P4());
var bestN3 = null;
var minDist2 = 25;
var bestNucleotide = null;
for (var j = other.monomerCount; --j >= 0; ) {
var otherNucleotide = other.monomers[j];
if (!otherNucleotide.$isPyrimidine) continue;
var otherN3 = otherNucleotide.getN3();
if (isInA ? !bsB.get(otherN3.i) : !bsA.get(otherN3.i)) continue;
var otherN1 = otherNucleotide.getN0();
var dist2 = myN1.distanceSquared(otherN3);
if (dist2 < minDist2 && myN9.distanceSquared(otherN1) > 50 && Math.abs(JU.Measure.distanceToPlane(plane, otherN3)) < 1) {
bestNucleotide = otherNucleotide;
bestN3 = otherN3;
minDist2 = dist2;
}}
var n = 0;
if (bestN3 != null) {
n += JM.NucleicPolymer.addHydrogenBond(vAtoms, myN1, bestN3);
if (n >= nMaxPerResidue) continue;
if (myNucleotide.isGuanine()) {
n += JM.NucleicPolymer.addHydrogenBond(vAtoms, myNucleotide.getN2(), bestNucleotide.getO2());
if (n >= nMaxPerResidue) continue;
n += JM.NucleicPolymer.addHydrogenBond(vAtoms, myNucleotide.getO6(), bestNucleotide.getN4());
if (n >= nMaxPerResidue) continue;
} else {
n += JM.NucleicPolymer.addHydrogenBond(vAtoms, myNucleotide.getN6(), bestNucleotide.getO4());
}}}
}, "JM.BioPolymer,JU.BS,JU.BS,JU.Lst,~N,~A,~B,~B");
c$.addHydrogenBond = Clazz_defineMethod(c$, "addHydrogenBond", 
function(vAtoms, atom1, atom2){
if (atom1 == null || atom2 == null) return 0;
vAtoms.addLast( new JM.HBond(atom1, atom2, 18432, 1, 0, 0));
return 1;
}, "JU.Lst,JM.Atom,JM.Atom");
c$.htGroup1 = null;
});
;//5.0.1-v7 Sat Feb 28 09:58:50 CST 2026
Clazz_declarePackage("JM");
(function(){
var c$ = Clazz_decorateAsClass(function(){
this.info = null;
this.g1 = null;
this.g2 = null;
Clazz_instantialize(this, arguments);}, JM, "BasePair", null);
