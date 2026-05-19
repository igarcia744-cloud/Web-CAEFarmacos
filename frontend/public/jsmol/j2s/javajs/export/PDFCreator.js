Clazz.declarePackage("javajs.export");
Clazz.load(null, "javajs.export.PDFCreator", ["java.util.Hashtable", "javajs.export.PDFObject", "JU.Lst", "$.SB"], function(){
var c$ = Clazz.decorateAsClass(function(){
this.os = null;
this.indirectObjects = null;
this.root = null;
this.graphics = null;
this.pt = 0;
this.xrefPt = 0;
this.count = 0;
this.height = 0;
this.width = 0;
this.fonts = null;
this.images = null;
Clazz.instantialize(this, arguments);}, javajs["export"], "PDFCreator", null);
