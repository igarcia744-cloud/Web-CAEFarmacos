Clazz.declarePackage("JM");
Clazz.load(["J.api.AtomIndexIterator"], "JM.AtomIteratorWithinModel", ["J.atomdata.RadiusData"], function(){
var c$ = Clazz.decorateAsClass(function(){
this.cubeIterator = null;
this.bspf = null;
this.threadSafe = false;
this.hemisphereOnly = false;
this.isZeroBased = false;
this.modelIndex = 2147483647;
this.atomIndex = -1;
this.zeroBase = 0;
this.distanceSquared = 0;
this.bsSelected = null;
this.isGreaterOnly = false;
this.checkGreater = false;
this.radiusData = null;
this.vdw1 = 0;
this.isVdw = false;
this.atoms = null;
this.vwr = null;
this.iNext = 0;
Clazz.instantialize(this, arguments);}, JM, "AtomIteratorWithinModel", null, J.api.AtomIndexIterator);
