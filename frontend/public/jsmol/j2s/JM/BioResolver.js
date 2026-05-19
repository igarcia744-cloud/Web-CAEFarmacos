Clazz.declarePackage("JM");
Clazz.load(["java.util.Hashtable", "J.c.STR"], "JM.BioResolver", ["java.util.Arrays", "JU.AU", "$.BS", "$.Measure", "$.P3", "$.P4", "$.PT", "$.SB", "$.V3", "JM.Group", "JM.AlphaMonomer", "$.AlphaPolymer", "$.AminoMonomer", "$.AminoPolymer", "$.BioModel", "$.BioModelSet", "$.CarbohydrateMonomer", "$.CarbohydratePolymer", "$.NucleicMonomer", "$.NucleicPolymer", "$.PhosphorusMonomer", "$.PhosphorusPolymer", "JU.BSUtil", "$.Logger", "JV.JC"], function(){
var c$ = Clazz.decorateAsClass(function(){
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
Clazz.instantialize(this, arguments);}, JM, "BioResolver", null, java.util.Comparator);
