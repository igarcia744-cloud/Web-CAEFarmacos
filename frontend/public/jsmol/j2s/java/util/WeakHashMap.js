Clazz.load(["java.lang.ref.WeakReference", "java.util.AbstractMap", "$.Iterator", "$.Map"], "java.util.WeakHashMap", ["java.lang.ref.ReferenceQueue", "java.util.AbstractCollection", "$.AbstractSet", "$.Arrays"], function(){
var c$ = Clazz.decorateAsClass(function(){
this.referenceQueue = null;
this.elementCount = 0;
this.elementData = null;
this.loadFactor = 0;
this.threshold = 0;
this.modCount = 0;
if (!Clazz.isClassDefined("java.util.WeakHashMap.HashIterator")) {
java.util.WeakHashMap.$WeakHashMap$HashIterator$ ();
}
Clazz.instantialize(this, arguments);}, java.util, "WeakHashMap", java.util.AbstractMap, java.util.Map);
Clazz.makeConstructor(c$, 
function(){
this.construct (16);
});
Clazz.makeConstructor(c$, 
function(capacity){
Clazz.superConstructor (this, java.util.WeakHashMap, []);
if (capacity >= 0) {
this.elementCount = 0;
this.elementData = java.util.WeakHashMap.newEntryArray(capacity == 0 ? 1 : capacity);
this.loadFactor = 7500;
this.computeMaxSize();
this.referenceQueue =  new java.lang.ref.ReferenceQueue();
} else {
throw  new IllegalArgumentException();
}}, "~N");
Clazz.makeConstructor(c$, 
function(capacity, loadFactor){
Clazz.superConstructor (this, java.util.WeakHashMap, []);
if (capacity >= 0 && loadFactor > 0) {
this.elementCount = 0;
this.elementData = java.util.WeakHashMap.newEntryArray(capacity == 0 ? 1 : capacity);
this.loadFactor = Clazz.floatToInt(loadFactor * 10000);
this.computeMaxSize();
this.referenceQueue =  new java.lang.ref.ReferenceQueue();
} else {
throw  new IllegalArgumentException();
}}, "~N,~N");
Clazz.makeConstructor(c$, 
function(map){
this.construct (map.size() < 6 ? 11 : map.size() * 2);
this.putAllImpl(map);
}, "java.util.Map");
c$.newEntryArray = Clazz.defineMethod(c$, "newEntryArray", 
function(size){
return  new Array(size);
}, "~N");
Clazz.overrideMethod(c$, "clear", 
function(){
if (this.elementCount > 0) {
this.elementCount = 0;
java.util.Arrays.fill(this.elementData, null);
this.modCount++;
while (this.referenceQueue.poll() != null) {
}
}});
Clazz.defineMethod(c$, "computeMaxSize", 
function(){
this.threshold = (Clazz.doubleToInt(this.elementData.length * this.loadFactor / 10000));
});
Clazz.overrideMethod(c$, "containsKey", 
function(key){
return this.getEntry(key) != null;
}, "~O");
Clazz.overrideMethod(c$, "entrySet", 
function(){
this.poll();
return ((Clazz.isClassDefined("java.util.WeakHashMap$1") ? 0 : java.util.WeakHashMap.$WeakHashMap$1$ ()), Clazz.innerTypeInstance(java.util.WeakHashMap$1, this, null));
});
Clazz.overrideMethod(c$, "keySet", 
function(){
this.poll();
if (this.$keySet == null) {
this.$keySet = ((Clazz.isClassDefined("java.util.WeakHashMap$2") ? 0 : java.util.WeakHashMap.$WeakHashMap$2$ ()), Clazz.innerTypeInstance(java.util.WeakHashMap$2, this, null));
}return this.$keySet;
});
Clazz.overrideMethod(c$, "values", 
function(){
this.poll();
if (this.$values == null) {
this.$values = ((Clazz.isClassDefined("java.util.WeakHashMap$3") ? 0 : java.util.WeakHashMap.$WeakHashMap$3$ ()), Clazz.innerTypeInstance(java.util.WeakHashMap$3, this, null));
}return this.$values;
});
Clazz.overrideMethod(c$, "get", 
function(key){
this.poll();
if (key != null) {
var index = (key.hashCode() & 0x7FFFFFFF) % this.elementData.length;
var entry = this.elementData[index];
while (entry != null) {
if (key.equals(entry.get())) {
return entry.value;
}entry = entry.$next;
}
return null;
}var entry = this.elementData[0];
while (entry != null) {
if (entry.isNull) {
return entry.value;
}entry = entry.$next;
}
return null;
}, "~O");
Clazz.defineMethod(c$, "getEntry", 
function(key){
this.poll();
if (key != null) {
var index = (key.hashCode() & 0x7FFFFFFF) % this.elementData.length;
var entry = this.elementData[index];
while (entry != null) {
if (key.equals(entry.get())) {
return entry;
}entry = entry.$next;
}
return null;
}var entry = this.elementData[0];
while (entry != null) {
if (entry.isNull) {
return entry;
}entry = entry.$next;
}
return null;
}, "~O");
Clazz.overrideMethod(c$, "containsValue", 
function(value){
this.poll();
if (value != null) {
for (var i = this.elementData.length; --i >= 0; ) {
var entry = this.elementData[i];
while (entry != null) {
var key = entry.get();
if ((key != null || entry.isNull) && value.equals(entry.value)) {
return true;
}entry = entry.$next;
}
}
} else {
for (var i = this.elementData.length; --i >= 0; ) {
var entry = this.elementData[i];
while (entry != null) {
var key = entry.get();
if ((key != null || entry.isNull) && entry.value == null) {
return true;
}entry = entry.$next;
}
}
}return false;
}, "~O");
Clazz.overrideMethod(c$, "isEmpty", 
function(){
return this.size() == 0;
});
Clazz.defineMethod(c$, "poll", 
function(){
var toRemove;
while ((toRemove = this.referenceQueue.poll()) != null) {
this.removeEntry(toRemove);
}
});
Clazz.defineMethod(c$, "removeEntry", 
function(toRemove){
var entry;
var last = null;
var index = (toRemove.hash & 0x7FFFFFFF) % this.elementData.length;
entry = this.elementData[index];
while (entry != null) {
if (toRemove === entry) {
this.modCount++;
if (last == null) {
this.elementData[index] = entry.$next;
} else {
last.$next = entry.$next;
}this.elementCount--;
break;
}last = entry;
entry = entry.$next;
}
}, "java.util.WeakHashMap.Entry");
Clazz.overrideMethod(c$, "put", 
function(key, value){
this.poll();
var index = 0;
var entry;
if (key != null) {
index = (key.hashCode() & 0x7FFFFFFF) % this.elementData.length;
entry = this.elementData[index];
while (entry != null && !key.equals(entry.get())) {
entry = entry.$next;
}
} else {
entry = this.elementData[0];
while (entry != null && !entry.isNull) {
entry = entry.$next;
}
}if (entry == null) {
this.modCount++;
if (++this.elementCount > this.threshold) {
this.rehash();
index = key == null ? 0 : (key.hashCode() & 0x7FFFFFFF) % this.elementData.length;
}entry =  new java.util.WeakHashMap.Entry(key, value, this.referenceQueue);
entry.$next = this.elementData[index];
this.elementData[index] = entry;
return null;
}var result = entry.value;
entry.value = value;
return result;
}, "~O,~O");
Clazz.defineMethod(c$, "rehash", 
function(){
var length = this.elementData.length << 1;
if (length == 0) {
length = 1;
}var newData = java.util.WeakHashMap.newEntryArray(length);
for (var i = 0; i < this.elementData.length; i++) {
var entry = this.elementData[i];
while (entry != null) {
var index = entry.isNull ? 0 : (entry.hash & 0x7FFFFFFF) % length;
var next = entry.$next;
entry.$next = newData[index];
newData[index] = entry;
entry = next;
}
}
this.elementData = newData;
this.computeMaxSize();
});
Clazz.overrideMethod(c$, "putAll", 
function(map){
this.putAllImpl(map);
}, "java.util.Map");
Clazz.overrideMethod(c$, "remove", 
function(key){
this.poll();
var index = 0;
var entry;
var last = null;
if (key != null) {
index = (key.hashCode() & 0x7FFFFFFF) % this.elementData.length;
entry = this.elementData[index];
while (entry != null && !key.equals(entry.get())) {
last = entry;
entry = entry.$next;
}
} else {
entry = this.elementData[0];
while (entry != null && !entry.isNull) {
last = entry;
entry = entry.$next;
}
}if (entry != null) {
this.modCount++;
if (last == null) {
this.elementData[index] = entry.$next;
} else {
last.$next = entry.$next;
}this.elementCount--;
return entry.value;
}return null;
}, "~O");
Clazz.overrideMethod(c$, "size", 
function(){
this.poll();
return this.elementCount;
});
Clazz.defineMethod(c$, "putAllImpl", 
function(map){
if (map.entrySet() != null) {
Clazz.superCall(this, java.util.WeakHashMap, "putAll", [map]);
}}, "java.util.Map");
c$.$WeakHashMap$HashIterator$ = function(){
})();
};
c$.$WeakHashMap$1$=function(){
})();
};
c$.$WeakHashMap$1$1$=function(){
})();
};
c$.$WeakHashMap$2$=function(){
})();
};
c$.$WeakHashMap$2$1$=function(){
})();
};
c$.$WeakHashMap$3$=function(){
})();
};
c$.$WeakHashMap$3$1$=function(){
})();
};
})();
});
;//5.0.1-v7 Mon May 12 23:42:45 CDT 2025
