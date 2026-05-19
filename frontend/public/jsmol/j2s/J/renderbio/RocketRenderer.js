Clazz.declarePackage("J.renderbio");
Clazz.load(null, "J.renderbio.RocketRenderer", ["JU.P3", "$.V3", "J.c.STR", "JU.MeshSurface"], function(){
var c$ = Clazz.decorateAsClass(function(){
this.tPending = false;
this.proteinstructurePending = null;
this.startIndexPending = 0;
this.endIndexPending = 0;
this.vtemp = null;
this.screenA = null;
this.screenB = null;
this.screenC = null;
this.colix = 0;
this.mad = 0;
this.rr = null;
this.vwr = null;
this.g3d = null;
this.tm = null;
this.renderArrowHeads = false;
this.isRockets = false;
this.ptC = null;
this.ptTip = null;
this.corners = null;
this.screenCorners = null;
this.vW = null;
this.vH = null;
this.meshSurface = null;
Clazz.instantialize(this, arguments);}, J.renderbio, "RocketRenderer", null);
