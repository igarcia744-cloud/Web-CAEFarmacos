Clazz.declarePackage("JS");
Clazz.load(["J.api.AtomIndexIterator"], "JS.UnitCellIterator", ["JU.Lst", "$.P3", "$.P3i", "JU.BoxInfo", "$.Logger", "$.Point3fi"], function(){
var c$ = Clazz.decorateAsClass(function(){
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
Clazz.instantialize(this, arguments);}, JS, "UnitCellIterator", null, J.api.AtomIndexIterator);
