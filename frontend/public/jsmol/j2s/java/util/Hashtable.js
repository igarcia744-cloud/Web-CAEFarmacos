Clazz.load(["java.util.AbstractCollection", "$.AbstractSet", "$.Dictionary", "$.Enumeration", "$.Iterator", "$.Map"], "java.util.Hashtable", ["java.util.Collections"], function(){
var c$ = Clazz.decorateAsClass(function(){
this.table = null;
this.count = 0;
this.threshold = 0;
this.loadFactor = 0;
this.modCount = 0;
this.$keySet = null;
this.$entrySet = null;
this.$values = null;
this.__m = null;
this.__allowJS = false;
Clazz.instantialize(this, arguments);}, java.util, "Hashtable", java.util.Dictionary, [java.util.Map, Cloneable]);
Clazz.makeConstructor(c$, 
function(){
this.initHT();
});
Clazz.defineMethod(c$, "initHT", 
function(){
var map = null;
var capacity = 11;
var loadFactor = 0.75;
{
capacity = arguments[0];
loadFactor = arguments[1];
if (typeof capacity == "object") {
map = capacity;
capacity = Math.max(2*t.size(), 11);
this.__allowJS = map.__allowJS;
} else {
this.__allowJS = true;
}
capacity = (capacity || 11);
loadFactor = (loadFactor || 0.75);
}if (capacity < 0) throw  new IllegalArgumentException("Illegal Capacity: " + capacity);
if (loadFactor <= 0 || Float.isNaN(loadFactor)) throw  new IllegalArgumentException("Illegal Load: " + loadFactor);
if (capacity == 0) capacity = 1;
this.loadFactor = loadFactor;
this.table =  new Array(capacity);
this.threshold = Clazz.floatToInt(Math.min(capacity * loadFactor, 2147483640));
this.__setJS();
if (map != null) this.putAll(map);
});
Clazz.overrideMethod(c$, "size", 
function(){
var c = this.count;
{
c = this.__m && this.__m.size || c;
}return c;
});
Clazz.overrideMethod(c$, "isEmpty", 
function(){
return this.size() == 0;
});
Clazz.overrideMethod(c$, "keys", 
function(){
return this.getEnumeration(0);
});
Clazz.overrideMethod(c$, "elements", 
function(){
return this.getEnumeration(1);
});
Clazz.defineMethod(c$, "contains", 
function(value){
if (value == null) {
throw  new NullPointerException();
}if (this.size() == 0) return false;
if (java.util.Hashtable.__isSimple(this)) {
var m = this.__m;
{
var iter = m.values();
for (var n = iter.next(); !n.done; n = iter.next()) {
if (n.value == value || n.value.equals(value)) {
return true;
}
}
}} else {
var tab = this.table;
for (var i = tab.length; i-- > 0; ) {
for (var e = tab[i]; e != null; e = e.next_) {
if (e.value.equals(value)) {
return true;
}}
}
}return false;
}, "~O");
Clazz.overrideMethod(c$, "containsValue", 
function(value){
return this.contains(value);
}, "~O");
Clazz.overrideMethod(c$, "containsKey", 
function(key){
switch (java.util.Hashtable.__hasKey(this, key)) {
case 0:
break;
case 1:
java.util.Hashtable.__ensureJavaMap(this);
break;
case 2:
return false;
case 3:
return true;
}
var tab = this.table;
var hash = key.hashCode();
var index = (hash & 0x7FFFFFFF) % tab.length;
for (var e = tab[index]; e != null; e = e.next_) {
if ((e.hash == hash) && e.key.equals(key)) {
return true;
}}
return false;
}, "~O");
Clazz.overrideMethod(c$, "get", 
function(key){
if (key == null) return null;
switch (java.util.Hashtable.__hasKey(this, key)) {
case 0:
break;
case 1:
java.util.Hashtable.__ensureJavaMap(this);
break;
case 2:
return null;
case 3:
var v = null;
{
v = this.__m.get(key);
}return v;
}
var tab = this.table;
var hash = key.hashCode();
var index = (hash & 0x7FFFFFFF) % tab.length;
for (var e = tab[index]; e != null; e = e.next_) {
if ((e.hash == hash) && e.key.equals(key)) {
return e.value;
}}
return null;
}, "~O");
Clazz.defineMethod(c$, "rehash", 
function(){
var oldCapacity = this.table.length;
var oldMap = this.table;
var newCapacity = (oldCapacity << 1) + 1;
if (newCapacity - 2147483639 > 0) {
if (oldCapacity == 2147483639) return;
newCapacity = 2147483639;
}var newMap =  new Array(newCapacity);
this.modCount++;
this.threshold = Clazz.floatToInt(Math.min(newCapacity * this.loadFactor, 2147483640));
this.table = newMap;
for (var i = oldCapacity; i-- > 0; ) {
for (var old = oldMap[i]; old != null; ) {
var e = old;
old = old.next_;
var index = (e.hash & 0x7FFFFFFF) % newCapacity;
e.next_ = newMap[index];
newMap[index] = e;
}
}
});
Clazz.defineMethod(c$, "addEntry", 
function(hash, key, value, index){
this.modCount++;
var tab = this.table;
if (this.count >= this.threshold) {
this.rehash();
tab = this.table;
hash = key.hashCode();
index = (hash & 0x7FFFFFFF) % tab.length;
}var e = tab[index];
tab[index] =  new java.util.Hashtable.Entry(hash, key, value, e);
this.count++;
}, "~N,~O,~O,~N");
Clazz.overrideMethod(c$, "put", 
function(key, value){
if (value == null) {
throw  new NullPointerException();
}switch (java.util.Hashtable.__hasKey(this, key)) {
case 0:
break;
case 1:
java.util.Hashtable.__ensureJavaMap(this);
break;
case 2:
{
this.__m.set(key, value);
}++this.modCount;
return null;
case 3:
var v0 = null;
{
v0 = this.__m.get(key);
this.__m.set(key, value);
}++this.modCount;
return v0;
}
var tab = this.table;
var hash = key.hashCode();
var index = (hash & 0x7FFFFFFF) % tab.length;
var entry = tab[index];
for (; entry != null; entry = entry.next_) {
if ((entry.hash == hash) && entry.key.equals(key)) {
var old = entry.value;
entry.value = value;
return old;
}}
this.addEntry(hash, key, value, index);
return null;
}, "~O,~O");
Clazz.overrideMethod(c$, "remove", 
function(key){
if (key == null) throw  new NullPointerException("Hashtable key may not be null");
switch (java.util.Hashtable.__hasKey(this, key)) {
case 0:
break;
case 1:
java.util.Hashtable.__ensureJavaMap(this);
break;
case 2:
return null;
case 3:
var v0 = null;
{
v0 = this.__m.get(key); this.__m["delete"](key);
}++this.modCount;
return v0;
}
var tab = this.table;
var hash = key.hashCode();
var index = (hash & 0x7FFFFFFF) % tab.length;
var e = tab[index];
for (var prev = null; e != null; prev = e, e = e.next_) {
if ((e.hash == hash) && e.key.equals(key)) {
this.modCount++;
if (prev != null) {
prev.next_ = e.next_;
} else {
tab[index] = e.next_;
}this.count--;
var oldValue = e.value;
e.value = null;
return oldValue;
}}
return null;
}, "~O");
Clazz.overrideMethod(c$, "putAll", 
function(t){
var key = null;
var value = null;
if (java.util.Hashtable.__isSimple(t)) {
var me = this;
{
t.__m.forEach(function(value, key) { me.put(key, value); })
}return;
}for (var e, $e = t.entrySet().iterator (); $e.hasNext()&& ((e = $e.next ()) || true);) this.put(e.getKey(), e.getValue());

}, "java.util.Map");
Clazz.overrideMethod(c$, "clear", 
function(){
var tab = this.table;
this.modCount++;
if (java.util.Hashtable.__isSimple(this)) {
{
this.__m.clear();
}}this.__setJS();
for (var index = tab.length; --index >= 0; ) tab[index] = null;

this.count = 0;
});
Clazz.defineMethod(c$, "clone", 
function(){
try {
var t = Clazz.superCall(this, java.util.Hashtable, "clone", []);
t.table =  new Array(this.table.length);
for (var i = this.table.length; i-- > 0; ) {
t.table[i] = (this.table[i] != null) ? this.table[i].clone() : null;
}
t.$keySet = null;
t.$entrySet = null;
t.$values = null;
t.modCount = 0;
if (java.util.Hashtable.__isSimple(this)) {
t.__setJS();
var me = this;
{
me.__m.forEach(function(value, key) {
t.__m.set(key, value); t.modCount++;
});
}} else {
t.__m = null;
}return t;
} catch (e) {
if (Clazz.exceptionOf(e,"CloneNotSupportedException")){
throw  new InternalError(e);
} else {
throw e;
}
}
});
Clazz.overrideMethod(c$, "toString", 
function(){
var max = this.size() - 1;
if (max == -1) return "{}";
var it = this.entrySet().iterator();
var sb = "{";
for (var i = 0; ; i++) {
var e = it.next();
var key = e.getKey();
var value = e.getValue();
sb += (key === this ? "(this Map)" : key.toString());
sb += "=";
sb += (value === this ? "(this Map)" : value.toString());
if (i == max) return sb + '}';
sb += ", ";
}
});
Clazz.overrideMethod(c$, "equals", 
function(o){
if (o === this) return true;
if (!(Clazz.instanceOf(o,"java.util.Map"))) return false;
var t = o;
if (t.size() != this.size()) return false;
try {
var i = this.entrySet().iterator();
while (i.hasNext()) {
var e = i.next();
var key = e.getKey();
var value = e.getValue();
if (value == null) {
if (!(t.get(key) == null && t.containsKey(key))) return false;
} else {
if (!value.equals(t.get(key))) return false;
}}
} catch (e$$) {
if (Clazz.exceptionOf(e$$,"ClassCastException")){
var unused = e$$;
{
return false;
}
} else if (Clazz.exceptionOf(e$$, NullPointerException)){
var unused = e$$;
{
return false;
}
} else {
throw e$$;
}
}
return true;
}, "~O");
Clazz.overrideMethod(c$, "hashCode", 
function(){
var h = 0;
if (this.count == 0 || this.loadFactor < 0) return h;
this.loadFactor = -this.loadFactor;
var tab = this.table;
for (var entry, $entry = 0, $$entry = tab; $entry < $$entry.length && ((entry = $$entry[$entry]) || true); $entry++) {
while (entry != null) {
h += entry.hashCode();
entry = entry.next_;
}
}
this.loadFactor = -this.loadFactor;
return h;
});
Clazz.defineMethod(c$, "getEnumeration", 
function(type){
if (this.size() == 0) {
return java.util.Collections.emptyEnumeration();
} else {
return  new java.util.Hashtable.Enumerator(this, type, false);
}}, "~N");
Clazz.defineMethod(c$, "getIterator", 
function(type){
if (this.size() == 0) {
return java.util.Collections.emptyIterator();
} else {
return  new java.util.Hashtable.Enumerator(this, type, true);
}}, "~N");
Clazz.overrideMethod(c$, "keySet", 
function(){
if (this.$keySet == null) this.$keySet =  new java.util.Hashtable.KeySet(this);
return this.$keySet;
});
Clazz.overrideMethod(c$, "entrySet", 
function(){
if (this.$entrySet == null) this.$entrySet =  new java.util.Hashtable.EntrySet(this);
return this.$entrySet;
});
Clazz.overrideMethod(c$, "values", 
function(){
if (this.$values == null) this.$values =  new java.util.Hashtable.ValueCollection(this);
return this.$values;
});
Clazz.defineMethod(c$, "__setJS", 
function(){
if (this.__allowJS && java.util.Hashtable.USE_SIMPLE) {
var m = null;
{
m = new Map();
}this.__m = m;
} else {
this.__m = null;
}});
c$.__get = Clazz.defineMethod(c$, "__get", 
function(map, key){
{
return map.__m.get(key == null ? null : key + "")
}}, "~O,~O");
c$.__set = Clazz.defineMethod(c$, "__set", 
function(map, key, value){
{
map.__m.set(key == null ? null : key + "", value)
}}, "java.util.Map,~O,~O");
c$.__hasKey = Clazz.defineMethod(c$, "__hasKey", 
function(map, key){
{
return (!map.__m ? 0 : key != null && typeof key != "string"
? 1 : map.__m.has(key) ? 3 : 2);
}}, "java.util.Map,~O");
c$.__isSimple = Clazz.defineMethod(c$, "__isSimple", 
function(map){
{
return !!map.__m;
}}, "java.util.Map");
c$.__ensureJavaMap = Clazz.defineMethod(c$, "__ensureJavaMap", 
function(map){
{
if (map.__m) {
var m = map.__m;
map.__m = null;
m.forEach(function(value, key){map.put(key, value);});
m.clear();
}
}}, "java.util.Map");
})();
})();
})();
})();
;(function(){
var c$ = Clazz.declareAnonymous(java.util, "Hashtable$Enumerator$1", java.util.Hashtable.Entry);
Clazz.overrideMethod(c$, "setValue", 
function(value){
var m = this.b$["java.util.Hashtable.Enumerator"].ht.modCount;
var v = this.b$["java.util.Hashtable.Enumerator"].ht.put(this.getKey(), value);
this.b$["java.util.Hashtable.Enumerator"].ht.modCount = m;
return v;
}, "~O");
})();
c$.USE_SIMPLE = true;
});
;//5.0.1-v7 Mon May 12 23:42:45 CDT 2025
