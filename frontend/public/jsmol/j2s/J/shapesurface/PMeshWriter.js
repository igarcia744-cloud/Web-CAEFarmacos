Clazz.declarePackage("J.shapesurface");
Clazz.load(null, "J.shapesurface.PMeshWriter", ["JU.BS", "JU.C"], function(){
var c$ = Clazz.decorateAsClass(function(){
this.imesh = null;
this.isBinary = false;
this.oc = null;
this.i0 = 0;
this.polygonIndexes = null;
this.selectedPolyOnly = false;
this.bsPolygons = null;
this.haveBsDisplay = false;
this.colorSolid = false;
this.colorArrayed = false;
this.cx = 0;
this.vertexColixes = null;
this.noColor = false;
this.contourColixes = null;
this.vertexValues = null;
this.vertexCount = 0;
this.imap = null;
Clazz.instantialize(this, arguments);}, J.shapesurface, "PMeshWriter", null);
