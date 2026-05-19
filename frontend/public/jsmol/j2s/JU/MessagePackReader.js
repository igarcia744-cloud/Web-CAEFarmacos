Clazz.declarePackage("JU");
Clazz.load(null, "JU.MessagePackReader", ["java.util.Hashtable", "JU.BC", "$.BinaryDocument", "$.SB"], function(){
var c$ = Clazz.decorateAsClass(function(){
this.doc = null;
this.isHomo = false;
Clazz.instantialize(this, arguments);}, JU, "MessagePackReader", null);
Clazz.makeConstructor(c$, 
function(binaryDoc, isHomogeneousArrays){
this.isHomo = isHomogeneousArrays;
this.doc = binaryDoc;
}, "javajs.api.GenericBinaryDocumentReader,~B");
