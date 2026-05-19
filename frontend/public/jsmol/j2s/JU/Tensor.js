Clazz.declarePackage("JU");
Clazz.load(null, "JU.Tensor", ["java.util.Arrays", "$.Hashtable", "JU.Eigen", "$.M3", "$.P3", "$.PT", "$.Quat", "$.V3", "JU.EigenSort", "$.Escape"], function(){
var c$ = Clazz.decorateAsClass(function(){
this.id = null;
this.type = null;
this.iType = -1;
this.asymMatrix = null;
this.symMatrix = null;
this.eigenVectors = null;
this.eigenValues = null;
this.parBorU = null;
this.altType = null;
this.isIsotropic = false;
this.forThermalEllipsoid = false;
this.eigenSignMask = 7;
this.typeFactor = 1;
this.sortIso = false;
this.modelIndex = 0;
this.atomIndex1 = -1;
this.atomIndex2 = -1;
this.isModulated = false;
this.isUnmodulated = false;
Clazz.instantialize(this, arguments);}, JU, "Tensor", null);
