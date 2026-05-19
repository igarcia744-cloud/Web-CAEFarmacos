Clazz.declarePackage("JM");
Clazz.load(["JM.Structure", "java.lang.Short", "JV.JC"], "JM.Group", ["java.util.Hashtable", "JU.BS", "$.Quat", "J.c.STR", "JU.BSUtil", "$.Escape", "$.Logger", "$.Point3fi"], function(){
var c$ = Clazz.decorateAsClass(function(){
this.chain = null;
this.groupIndex = 0;
this.group1 = '\0';
this.firstAtomIndex = -1;
this.leadAtomIndex = -1;
this.lastAtomIndex = 0;
this.bsAdded = null;
this.seqcode = 0;
this.groupID = 0;
this.selectedIndex = 0;
this.shapeVisibilityFlags = 0;
this.dssrNT = null;
this.strutPoint = null;
Clazz.instantialize(this, arguments);}, JM, "Group", null, JM.Structure);
