Clazz.load(["java.util.ResourceBundle"], "java.util.ListResourceBundle", ["java.util.Enumeration", "$.Hashtable"], function(){
var c$ = Clazz.decorateAsClass(function(){
this.table = null;
Clazz.instantialize(this, arguments);}, java.util, "ListResourceBundle", java.util.ResourceBundle);
Clazz.defineMethod(c$, "getKeys", 
function(){
if (this.table == null) {
this.initializeTable();
}if (this.parent == null) {
return this.table.keys();
}return ((Clazz.isClassDefined("java.util.ListResourceBundle$1") ? 0 : java.util.ListResourceBundle.$ListResourceBundle$1$ ()), Clazz.innerTypeInstance(java.util.ListResourceBundle$1, this, null));
});
Clazz.overrideMethod(c$, "handleGetObject", 
function(key){
if (this.table == null) {
this.initializeTable();
}return this.table.get(key);
}, "~S");
Clazz.defineMethod(c$, "initializeTable", 
function(){
if (this.table == null) {
var contents = this.getContents();
this.table =  new java.util.Hashtable(Clazz.doubleToInt(contents.length / 3) * 4 + 3);
for (var i = 0; i < contents.length; i++) {
this.table.put(contents[i][0], contents[i][1]);
}
}});
c$.$ListResourceBundle$1$=function(){
})();
};
});
;//5.0.1-v7 Mon May 12 23:42:45 CDT 2025
