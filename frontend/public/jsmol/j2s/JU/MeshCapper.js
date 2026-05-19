Clazz.declarePackage("JU");
Clazz.load(["JU.T3"], "JU.MeshCapper", ["java.util.Arrays", "$.Hashtable", "JU.AU", "$.Lst", "$.M3", "$.P3", "$.Quat", "$.V3", "JU.Logger"], function(){
var c$ = Clazz.decorateAsClass(function(){
this.slicer = null;
this.dumping = false;
this.capMap = null;
this.vertices = null;
this.lstRegions = null;
this.nTriangles = 0;
this.nRegions = 0;
this.lstTriangles = null;
this.nPoints = 0;
this.m3 = null;
this.m3inv = null;
if (!Clazz.isClassDefined("JU.MeshCapper.MeshCapperSorter")) {
JU.MeshCapper.$MeshCapper$MeshCapperSorter$ ();
}
if (!Clazz.isClassDefined("JU.MeshCapper.CapVertex")) {
JU.MeshCapper.$MeshCapper$CapVertex$ ();
}
Clazz.instantialize(this, arguments);}, JU, "MeshCapper", null);
" + p0 + p1 + p2 + " color " + color);
}, "~N,JU.MeshCapper.CapVertex,JU.MeshCapper.CapVertex,JU.MeshCapper.CapVertex,~S");
c$.$MeshCapper$MeshCapperSorter$ = function(){
})();
};
c$.$MeshCapper$CapVertex$ = function(){
})();
};
});
;//5.0.1-v7 Sat Feb 21 18:17:38 CST 2026
