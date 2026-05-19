Clazz.declarePackage("JM");
Clazz.load(null, "JM.LabelToken", ["java.util.Hashtable", "JU.AU", "$.PT", "$.SB", "JS.SV", "$.T", "JU.Edge", "JV.JC"], function(){
var c$ = Clazz.decorateAsClass(function(){
this.text = null;
this.key = null;
this.data = null;
this.tok = 0;
this.pt = -1;
this.ch1 = '\0';
this.width = 0;
this.precision = 2147483647;
this.alignLeft = false;
this.zeroPad = false;
this.intAsFloat = false;
Clazz.instantialize(this, arguments);}, JM, "LabelToken", null);
