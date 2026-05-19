Clazz.load(["java.util.HashMap"], "java.util.LinkedHashMap", ["java.util.AbstractCollection", "$.AbstractSet", "java.util.MapEntry.Type"], function(){
var c$ = Clazz.decorateAsClass(function(){
this.accessOrder = false;
this.head = null;
this.tail = null;
Clazz.instantialize(this, arguments);}, java.util, "LinkedHashMap", java.util.HashMap);
Clazz.makeConstructor(c$, 
function(){
this.construct (16, 0.75, false);
});
Clazz.makeConstructor(c$, 
function(s){
this.construct (s, 0.75, false);
}, "~N");
Clazz.makeConstructor(c$, 
function(s, lf){
this.construct (s, lf, false);
}, "~N,~N");
Clazz.makeConstructor(c$, 
function(s, lf, order){
Clazz.superConstructor(this, java.util.LinkedHashMap, [s, lf]);
this.accessOrder = order;
this.head = null;
this.tail = null;
}, "~N,~N,~B");
Clazz.makeConstructor(c$, 
function(m){
Clazz.superConstructor (this, java.util.LinkedHashMap, []);
this.accessOrder = false;
this.head = null;
this.tail = null;
this.putAll(m);
}, "java.util.Map");
Clazz.overrideMethod(c$, "newElementArray", 
function(s){
return  new Array(s);
}, "~N");
Clazz.overrideMethod(c$, "get", 
function(key){
var m = this.getJavaEntry(key);
if (m == null) {
return null;
}if (this.accessOrder && this.tail !== m) {
var p = m.chainBackward;
var n = m.chainForward;
n.chainBackward = p;
if (p != null) {
p.chainForward = n;
} else {
this.head = n;
}m.chainForward = null;
m.chainBackward = this.tail;
this.tail.chainForward = m;
this.tail = m;
}return m.value;
}, "~O");
Clazz.overrideMethod(c$, "createEntry", 
function(key, index, value){
var m =  new java.util.LinkedHashMap.LinkedHashMapEntry(key, value);
m.next = this.elementData[index];
this.elementData[index] = m;
this.linkEntry(m);
return m;
}, "~O,~N,~O");
Clazz.overrideMethod(c$, "put", 
function(key, value){
var index = this.getModuloHash(key);
var m = this.findJavaEntry(key, index);
if (m == null) {
this.modCount++;
if (++this.elementCount > this.threshold) {
this.rehash();
index = key == null ? 0 : (key.hashCode() & 0x7FFFFFFF) % this.elementData.length;
}m = this.createEntry(key, index, null);
} else {
this.linkEntry(m);
}var result = m.value;
m.value = value;
if (this.removeEldestEntry(this.head)) {
this.remove(this.head.key);
}return result;
}, "~O,~O");
Clazz.defineMethod(c$, "linkEntry", 
function(m){
if (this.tail === m) {
return;
}if (this.head == null) {
this.head = this.tail = m;
return;
}var p = m.chainBackward;
var n = m.chainForward;
if (p == null) {
if (n != null) {
if (this.accessOrder) {
this.head = n;
n.chainBackward = null;
m.chainBackward = this.tail;
m.chainForward = null;
this.tail.chainForward = m;
this.tail = m;
}} else {
m.chainBackward = this.tail;
m.chainForward = null;
this.tail.chainForward = m;
this.tail = m;
}return;
}if (n == null) {
return;
}if (this.accessOrder) {
p.chainForward = n;
n.chainBackward = p;
m.chainForward = null;
m.chainBackward = this.tail;
this.tail.chainForward = m;
this.tail = m;
}}, "java.util.LinkedHashMap.LinkedHashMapEntry");
Clazz.overrideMethod(c$, "entrySet", 
function(){
return  new java.util.LinkedHashMap.LinkedHashMapEntrySet(this);
});
Clazz.overrideMethod(c$, "keySet", 
function(){
if (this.$keySet == null) {
this.$keySet = ((Clazz.isClassDefined("java.util.LinkedHashMap$1") ? 0 : java.util.LinkedHashMap.$LinkedHashMap$1$ ()), Clazz.innerTypeInstance(java.util.LinkedHashMap$1, this, null));
}return this.$keySet;
});
Clazz.overrideMethod(c$, "values", 
function(){
if (this.$values == null) {
this.$values = ((Clazz.isClassDefined("java.util.LinkedHashMap$2") ? 0 : java.util.LinkedHashMap.$LinkedHashMap$2$ ()), Clazz.innerTypeInstance(java.util.LinkedHashMap$2, this, null));
}return this.$values;
});
Clazz.overrideMethod(c$, "remove", 
function(key){
var m = this.removeJavaEntry(key);
if (m == null) {
return null;
}var p = m.chainBackward;
var n = m.chainForward;
if (p != null) {
p.chainForward = n;
} else {
this.head = n;
}if (n != null) {
n.chainBackward = p;
} else {
this.tail = p;
}return m.value;
}, "~O");
Clazz.defineMethod(c$, "removeEldestEntry", 
function(eldest){
return false;
}, "java.util.Map.Entry");
Clazz.defineMethod(c$, "clear", 
function(){
Clazz.superCall(this, java.util.LinkedHashMap, "clear", []);
this.head = this.tail = null;
});
Clazz.defineMethod(c$, "clone", 
function(){
var map = Clazz.superCall(this, java.util.LinkedHashMap, "clone", []);
map.clear();
for (var entry, $entry = this.entrySet().iterator (); $entry.hasNext()&& ((entry = $entry.next ()) || true);) {
map.put(entry.getKey(), entry.getValue());
}
return map;
});
Clazz.overrideMethod(c$, "__setJS", 
function(){
this.__m = null;
});
c$.$LinkedHashMap$1$=function(){
})();
};
c$.$LinkedHashMap$1$1$=function(){
})();
};
c$.$LinkedHashMap$2$=function(){
})();
};
c$.$LinkedHashMap$2$1$=function(){
})();
};
})();
;(function(){
var c$ = Clazz.declareAnonymous(java.util, "LinkedHashMap$LinkedHashMapEntrySet$1", null, java.util.MapEntry.Type);
Clazz.overrideMethod(c$, "get", 
function(entry){
return entry;
}, "java.util.MapEntry");
})();
})();
});
;//5.0.1-v7 Mon May 12 23:42:45 CDT 2025
