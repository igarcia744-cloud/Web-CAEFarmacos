Clazz.declarePackage("JSV.export");
Clazz.load(["JSV.api.JSVExporter"], "JSV.export.JDXExporter", ["JU.DF", "$.PT", "JSV.common.Coordinate", "$.ExportType", "JSV.export.JDXCompressor", "JSV.source.JDXReader"], function(){
var c$ = Clazz.decorateAsClass(function(){
this.out = null;
this.type = null;
this.spectrum = null;
this.vwr = null;
Clazz.instantialize(this, arguments);}, JSV["export"], "JDXExporter", null, JSV.api.JSVExporter);
