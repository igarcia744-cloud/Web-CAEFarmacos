Clazz.declarePackage("JU");
Clazz.load(["JU.P3"], "JU.BZone", ["java.util.Hashtable", "JU.Lst", "$.Measure", "$.P4", "$.V3", "J.bspt.PointIterator", "JU.TempArray"], function(){
var c$ = Clazz.decorateAsClass(function(){
this.ret = null;
this.bz = null;
this.id = null;
this.index = 0;
this.color = null;
this.center = null;
this.subzones = null;
this.newLatticePts = null;
this.newPlanes = null;
this.volume = 0;
Clazz.instantialize(this, arguments);}, JU, "BZone", null);
Clazz.prepareFields (c$, function(){
this.ret =  new Array(1);
});
Clazz.makeConstructor(c$, 
function(){
});
Clazz.defineMethod(c$, "createBZ", 
function(vwr, n, array, isK, id, scale, foffset, offset){
var bz =  new JU.BZone.BZ(vwr, id, n);
bz.createAllZones(scale, foffset, offset);
}, "JV.Viewer,~N,~A,~B,~S,~N,~N,JU.P3");
Clazz.defineMethod(c$, "create", 
function(zonePrev){
this.getNewLatticePoints();
this.getSubzones(zonePrev);
for (var i = 0; i < this.subzones.size(); i++) {
var subzone = this.subzones.get(i);
if (subzone.getPmeshes()) subzone.createSubzonePolyhedron(this.id);
}
this.finalizeZone();
}, "JU.BZone");
Clazz.defineMethod(c$, "getSubzones", 
function(zonePrev){
this.subzones =  new JU.Lst();
if (this.index == 1) {
 new JU.BZone.Subzone(this, "", 1);
return;
}var len = zonePrev.id.length;
for (var i = 0; i < zonePrev.subzones.size(); i++) {
var prev = zonePrev.subzones.get(i);
var id = prev.id.substring(len);
var isZone2 = (zonePrev.index == 1);
for (var j = (isZone2 ? 0 : 1); j < prev.planes.size(); j++) {
if (!isZone2 && JU.BZone.within(1.0E-4, prev.faceCenters.get(j), this.bz.bzFaceCenters).size() > 1) continue;
var subzone =  new JU.BZone.Subzone(this, id, isZone2 ? j + 1 : j);
subzone.addPlanes(prev.planes, prev.latticePts, j);
subzone.addPlanes(prev.planesUnused, prev.ptsUnused, -1);
subzone.addPlanes(this.newPlanes, this.newLatticePts, -1);
}
}
}, "JU.BZone");
Clazz.defineMethod(c$, "getNewLatticePoints", 
function(){
this.newLatticePts =  new JU.Lst();
this.newPlanes =  new JU.Lst();
var unusedPts =  new JU.Lst();
var unusedLatticePts =  new JU.Lst();
for (var i = 0; i < this.bz.bzPlanePts.size(); i++) {
var p = this.bz.bzPlanePts.get(i);
var center = JU.P3.newP(p);
center.scale(0.5);
var radius = 0.501 * p.length();
var inSphere = JU.BZone.within(radius, center, this.bz.bzPlanePts);
var al;
if (inSphere.size() == 1) {
al = this.newLatticePts;
this.newPlanes.addLast(JU.BZone.newLatticePlane(p, 1, this.bz.bzGamma));
} else {
unusedPts.addLast(p);
al = unusedLatticePts;
}al.addLast(this.bz.bzLatticePts.get(i));
}
this.bz.bzPlanePts = unusedPts;
this.bz.bzLatticePts = unusedLatticePts;
});
c$.newLatticePlane = Clazz.defineMethod(c$, "newLatticePlane", 
function(pt2, f, bzGamma){
var norm = JU.V3.newVsub(pt2, bzGamma);
var pt3 =  new JU.P3();
pt3.scaleAdd2(f, norm, bzGamma);
norm.normalize();
var plane =  new JU.P4();
JU.Measure.getPlaneThroughPoint(pt3, norm, plane);
return plane;
}, "JU.P3,~N,JU.P3");
c$.within = Clazz.defineMethod(c$, "within", 
function(radius, center, pts){
var ret =  new JU.Lst();
var r2 = radius * radius;
for (var i = 0, n = pts.size(); i < n; i++) {
var pt = pts.get(i);
if (center.distanceSquared(pt) < r2) ret.addLast(pt);
}
return ret;
}, "~N,JU.P3,JU.Lst");
Clazz.defineMethod(c$, "finalizeZone", 
function(){
this.volume = 0;
for (var i = this.subzones.size(); --i >= 0; ) {
var subzone = this.subzones.get(i);
if (subzone.isValid) {
this.volume += subzone.volume;
if (subzone.volume < 0.05) {
System.out.println("draw id d" + subzone.id + " points " + JU.BZone.esc(subzone.faceCenters) + ";draw id " + "dc" + subzone.id + " width 0.1 color red " + subzone.center);
}} else {
this.subzones.removeItemAt(i);
}}
});
c$.esc = Clazz.defineMethod(c$, "esc", 
function(pts){
var s = "[";
var sep = "";
for (var i = pts.size(); --i >= 0; ) {
s += sep + pts.get(i).toString();
sep = " ";
}
return s + "]";
}, "JU.Lst");
Clazz.defineMethod(c$, "drawHKL", 
function(vwr, id, plane, pts){
this.bz =  new JU.BZone.BZ(vwr, id, -2);
this.bz.drawMillerPlanes(plane, pts);
}, "JV.Viewer,~S,JU.P4,~A");
})();
})();
})();
c$.ptInner = JU.P3.new3(NaN, 0, 0);
c$.bzColors =  Clazz.newArray(-1, ["red", "green", "skyblue", "orange", "yellow", "blue", "violet"]);
});
;//5.0.1-v7 Mon Mar 16 22:19:28 CDT 2026
