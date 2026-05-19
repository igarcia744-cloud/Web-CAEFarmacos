Clazz.declarePackage("J.shapesurface");
Clazz.load(null, "J.shapesurface.PLYWriter", ["JU.BS", "JU.C", "JV.Viewer"], function(){
var c$ = Clazz.decorateAsClass(function(){
this.imesh = null;
this.isBinary = false;
this.writeShorts = false;
this.oc = null;
this.polygonIndexes = null;
this.selectedPolyOnly = false;
this.bsPolygons = null;
this.haveBsDisplay = false;
this.vertexCount = 0;
this.mapJmolToPLY = null;
this.mapPLYToJmol = null;
Clazz.instantialize(this, arguments);}, J.shapesurface, "PLYWriter", null);
