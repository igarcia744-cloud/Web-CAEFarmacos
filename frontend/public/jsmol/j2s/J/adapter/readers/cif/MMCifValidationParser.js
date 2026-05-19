Clazz.declarePackage("J.adapter.readers.cif");
Clazz.load(null, "J.adapter.readers.cif.MMCifValidationParser", ["java.util.Hashtable", "JU.Lst", "$.PT", "JS.SV", "JU.Logger"], function(){
var c$ = Clazz.decorateAsClass(function(){
this.asResidues = false;
this.reader = null;
this.resMap = null;
this.atomMap = null;
Clazz.instantialize(this, arguments);}, J.adapter.readers.cif, "MMCifValidationParser", null);
