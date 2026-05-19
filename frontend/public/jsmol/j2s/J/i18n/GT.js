Clazz.declarePackage("J.i18n");
Clazz.load(["J.api.Translator", "java.text.MessageFormat", "java.util.Hashtable", "JU.PT", "J.i18n.Language", "$.Resource"], "J.i18n.GT", ["JU.Logger"], function(){
var c$ = Clazz.decorateAsClass(function(){
this.resources = null;
this.resourceCount = 0;
this.doTranslate = true;
this.language = null;
Clazz.instantialize(this, arguments);}, J.i18n, "GT", null, J.api.Translator);
