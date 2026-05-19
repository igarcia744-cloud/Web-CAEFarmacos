Clazz.declarePackage("J.adapter.writers");
Clazz.load(["J.api.JmolWriter"], "J.adapter.writers.CMLWriter", ["JU.BS", "$.PT", "$.SB", "JU.Edge"], function(){
var c$ = Clazz.decorateAsClass(function(){
this.vwr = null;
this.oc = null;
this.atomsMax = 0;
this.addBonds = false;
this.doTransform = false;
this.allTrajectories = false;
Clazz.instantialize(this, arguments);}, J.adapter.writers, "CMLWriter", null, J.api.JmolWriter);
