Clazz.declarePackage("J.adapter.writers");
Clazz.load(["J.api.JmolWriter"], "J.adapter.writers.PDBWriter", ["java.util.Arrays", "$.Date", "$.Hashtable", "JU.Lst", "$.P3", "$.PT", "JM.LabelToken", "JV.Viewer"], function(){
var c$ = Clazz.decorateAsClass(function(){
this.vwr = null;
this.oc = null;
this.isPQR = false;
this.doTransform = false;
this.allTrajectories = false;
Clazz.instantialize(this, arguments);}, J.adapter.writers, "PDBWriter", null, J.api.JmolWriter);
