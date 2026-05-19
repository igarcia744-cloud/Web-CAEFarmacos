Clazz.declarePackage("JU");
Clazz.load(null, "JU.MeshSlicer", ["java.util.Hashtable", "JU.AU", "$.BS", "$.Measure", "$.P3", "$.P4", "$.SB", "$.V3", "J.api.Interface", "JU.BSUtil", "$.BoxInfo", "$.C", "$.Escape", "$.MeshSurface"], function(){
var c$ = Clazz.decorateAsClass(function(){
this.m = null;
this.doCap = false;
this.doClear = false;
this.doGhost = false;
this.iD = 0;
this.iE = 0;
this.sources = null;
this.pts = null;
this.norm = null;
this.dPlane = 0;
this.values = null;
this.fracs = null;
this.capper = null;
this.wPlane = 0;
Clazz.instantialize(this, arguments);}, JU, "MeshSlicer", null);
