Clazz.declarePackage("JS");
Clazz.load(["J.api.SymmetryInterface"], "JS.Symmetry", ["java.util.Hashtable", "JU.AU", "$.BS", "$.JSJSONParser", "$.Lst", "$.M4", "$.P3", "$.PT", "$.Quat", "$.Rdr", "$.SB", "J.api.Interface", "J.bspt.Bspt", "JS.PointGroup", "$.SpaceGroup", "$.SymmetryInfo", "$.SymmetryOperation", "$.UnitCell", "JU.BSUtil", "$.Escape", "$.Logger", "$.SimpleUnitCell", "JV.FileManager"], function(){
var c$ = Clazz.decorateAsClass(function(){
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
Clazz.instantialize(this, arguments);}, JS, "Symmetry", null, J.api.SymmetryInterface);
