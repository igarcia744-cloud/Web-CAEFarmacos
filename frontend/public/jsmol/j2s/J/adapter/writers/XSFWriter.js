Clazz.declarePackage("J.adapter.writers");
Clazz.load(["J.api.JmolWriter"], "J.adapter.writers.XSFWriter", ["JU.PT"], function(){
var c$ = Clazz.decorateAsClass(function(){
this.vwr = null;
this.oc = null;
this.uc = null;
this.len = 0;
Clazz.instantialize(this, arguments);}, J.adapter.writers, "XSFWriter", null, J.api.JmolWriter);
