Clazz.declarePackage("J.atomdata");
Clazz.load(null, "J.atomdata.AtomData", ["JU.P3", "JU.BSUtil"], function(){
var c$ = Clazz.decorateAsClass(function(){
this.programInfo = null;
this.fileName = null;
this.modelName = null;
this.modelIndex = 0;
this.bsSelected = null;
this.bsIgnored = null;
this.bsMolecules = null;
this.radiusData = null;
this.firstAtomIndex = 0;
this.firstModelIndex = 0;
this.lastModelIndex = 0;
this.hAtomRadius = 0;
this.atomIndex = null;
this.atoms = null;
this.xyz = null;
this.atomRadius = null;
this.atomicNumber = null;
this.atomMolecule = null;
this.hAtoms = null;
this.ac = 0;
this.hydrogenAtomCount = 0;
this.adpMode = 0;
Clazz.instantialize(this, arguments);}, J.atomdata, "AtomData", null);
