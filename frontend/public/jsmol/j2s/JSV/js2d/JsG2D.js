Clazz.declarePackage("JSV.js2d");
Clazz.load(["J.api.GenericGraphics"], "JSV.js2d.JsG2D", ["JU.CU", "JSV.common.JSViewer", "JS.Color"], function(){
var c$ = Clazz.decorateAsClass(function(){
this.windowWidth = 0;
this.windowHeight = 0;
this.isShifted = false;
this.inPath = false;
Clazz.instantialize(this, arguments);}, JSV.js2d, "JsG2D", null, J.api.GenericGraphics);
