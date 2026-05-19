Clazz.load(["java.util.AbstractCollection", "$.AbstractMap", "$.AbstractSet", "$.Iterator", "$.MapEntry", "$.Set", "$.SortedMap"], "java.util.TreeMap", null, function(){
var c$ = Clazz.decorateAsClass(function(){
this.$size = 0;
this.root = null;
this.$comparator = null;
this.modCount = 0;
this.$entrySet = null;
Clazz.instantialize(this, arguments);}, java.util, "TreeMap", java.util.AbstractMap, [java.util.SortedMap, Cloneable, java.io.Serializable]);
Clazz.makeConstructor(c$, 
function(comparator){
Clazz.superConstructor (this, java.util.TreeMap, []);
this.$comparator = comparator;
}, "java.util.Comparator");
Clazz.makeConstructor(c$, 
function(map){
this.construct ();
this.putAll(map);
}, "java.util.Map");
Clazz.makeConstructor(c$, 
function(map){
this.construct (map.comparator());
var it = map.entrySet().iterator();
if (it.hasNext()) {
var entry = it.next();
var last =  new java.util.TreeMap.Entry(entry.getKey(), entry.getValue());
this.root = last;
this.$size = 1;
while (it.hasNext()) {
entry = it.next();
var x =  new java.util.TreeMap.Entry(entry.getKey(), entry.getValue());
x.parent = last;
last.right = x;
this.$size++;
this.balance(x);
last = x;
}
}}, "java.util.SortedMap");
c$.toComparable = Clazz.defineMethod(c$, "toComparable", 
function(obj){
return obj;
}, "~O");
Clazz.defineMethod(c$, "balance", 
function(x){
var y;
x.color = true;
while (x !== this.root && x.parent.color) {
if (x.parent === x.parent.parent.left) {
y = x.parent.parent.right;
if (y != null && y.color) {
x.parent.color = false;
y.color = false;
x.parent.parent.color = true;
x = x.parent.parent;
} else {
if (x === x.parent.right) {
x = x.parent;
this.leftRotate(x);
}x.parent.color = false;
x.parent.parent.color = true;
this.rightRotate(x.parent.parent);
}} else {
y = x.parent.parent.left;
if (y != null && y.color) {
x.parent.color = false;
y.color = false;
x.parent.parent.color = true;
x = x.parent.parent;
} else {
if (x === x.parent.left) {
x = x.parent;
this.rightRotate(x);
}x.parent.color = false;
x.parent.parent.color = true;
this.leftRotate(x.parent.parent);
}}}
this.root.color = false;
}, "java.util.TreeMap.Entry");
Clazz.overrideMethod(c$, "clear", 
function(){
this.root = null;
this.$size = 0;
this.modCount++;
});
Clazz.defineMethod(c$, "clone", 
function(){
try {
var clone = Clazz.superCall(this, java.util.TreeMap, "clone", []);
clone.$entrySet = null;
if (this.root != null) {
clone.root = this.root.clone(null);
}return clone;
} catch (e) {
if (Clazz.exceptionOf(e,"CloneNotSupportedException")){
return null;
} else {
throw e;
}
}
});
Clazz.overrideMethod(c$, "comparator", 
function(){
return this.$comparator;
});
Clazz.overrideMethod(c$, "containsKey", 
function(key){
return this.find(key) != null;
}, "~O");
Clazz.defineMethod(c$, "containsValue", 
function(value){
if (this.root != null) {
return this.containsValue(this.root, value);
}return false;
}, "~O");
Clazz.defineMethod(c$, "containsValue", 
function(node, value){
if (value == null ? node.value == null : value.equals(node.value)) {
return true;
}if (node.left != null) {
if (this.containsValue(node.left, value)) {
return true;
}}if (node.right != null) {
if (this.containsValue(node.right, value)) {
return true;
}}return false;
}, "java.util.TreeMap.Entry,~O");
Clazz.overrideMethod(c$, "entrySet", 
function(){
if (this.$entrySet == null) {
this.$entrySet = ((Clazz.isClassDefined("java.util.TreeMap$1") ? 0 : java.util.TreeMap.$TreeMap$1$ ()), Clazz.innerTypeInstance(java.util.TreeMap$1, this, null));
}return this.$entrySet;
});
Clazz.defineMethod(c$, "find", 
function(keyObj){
var result;
var key = keyObj;
var object = null;
if (this.$comparator == null) {
object = java.util.TreeMap.toComparable(key);
}var x = this.root;
while (x != null) {
result = object != null ? object.compareTo(x.key) : this.$comparator.compare(key, x.key);
if (result == 0) {
return x;
}x = result < 0 ? x.left : x.right;
}
return null;
}, "~O");
Clazz.defineMethod(c$, "findAfter", 
function(keyObj){
var key = keyObj;
var result;
var object = null;
if (this.$comparator == null) {
object = java.util.TreeMap.toComparable(key);
}var x = this.root;
var last = null;
while (x != null) {
result = object != null ? object.compareTo(x.key) : this.$comparator.compare(key, x.key);
if (result == 0) {
return x;
}if (result < 0) {
last = x;
x = x.left;
} else {
x = x.right;
}}
return last;
}, "~O");
Clazz.defineMethod(c$, "findBefore", 
function(key){
var result;
var object = null;
if (this.$comparator == null) {
object = java.util.TreeMap.toComparable(key);
}var x = this.root;
var last = null;
while (x != null) {
result = object != null ? object.compareTo(x.key) : this.$comparator.compare(key, x.key);
if (result <= 0) {
x = x.left;
} else {
last = x;
x = x.right;
}}
return last;
}, "~O");
Clazz.overrideMethod(c$, "firstKey", 
function(){
if (this.root != null) {
return java.util.TreeMap.minimum(this.root).key;
}throw  new java.util.NoSuchElementException();
});
Clazz.defineMethod(c$, "fixup", 
function(x){
var w;
while (x !== this.root && !x.color) {
if (x === x.parent.left) {
w = x.parent.right;
if (w == null) {
x = x.parent;
continue;
}if (w.color) {
w.color = false;
x.parent.color = true;
this.leftRotate(x.parent);
w = x.parent.right;
if (w == null) {
x = x.parent;
continue;
}}if ((w.left == null || !w.left.color) && (w.right == null || !w.right.color)) {
w.color = true;
x = x.parent;
} else {
if (w.right == null || !w.right.color) {
w.left.color = false;
w.color = true;
this.rightRotate(w);
w = x.parent.right;
}w.color = x.parent.color;
x.parent.color = false;
w.right.color = false;
this.leftRotate(x.parent);
x = this.root;
}} else {
w = x.parent.left;
if (w == null) {
x = x.parent;
continue;
}if (w.color) {
w.color = false;
x.parent.color = true;
this.rightRotate(x.parent);
w = x.parent.left;
if (w == null) {
x = x.parent;
continue;
}}if ((w.left == null || !w.left.color) && (w.right == null || !w.right.color)) {
w.color = true;
x = x.parent;
} else {
if (w.left == null || !w.left.color) {
w.right.color = false;
w.color = true;
this.leftRotate(w);
w = x.parent.left;
}w.color = x.parent.color;
x.parent.color = false;
w.left.color = false;
this.rightRotate(x.parent);
x = this.root;
}}}
x.color = false;
}, "java.util.TreeMap.Entry");
Clazz.overrideMethod(c$, "get", 
function(key){
var node = this.find(key);
if (node != null) {
return node.value;
}return null;
}, "~O");
Clazz.overrideMethod(c$, "headMap", 
function(endKey){
if (this.$comparator == null) {
java.util.TreeMap.toComparable(endKey).compareTo(endKey);
} else {
this.$comparator.compare(endKey, endKey);
}return  new java.util.TreeMap.SubMap(this, endKey);
}, "~O");
Clazz.overrideMethod(c$, "keySet", 
function(){
if (this.$keySet == null) {
this.$keySet = ((Clazz.isClassDefined("java.util.TreeMap$2") ? 0 : java.util.TreeMap.$TreeMap$2$ ()), Clazz.innerTypeInstance(java.util.TreeMap$2, this, null));
}return this.$keySet;
});
Clazz.overrideMethod(c$, "lastKey", 
function(){
if (this.root != null) {
return java.util.TreeMap.maximum(this.root).key;
}throw  new java.util.NoSuchElementException();
});
Clazz.defineMethod(c$, "leftRotate", 
function(x){
var y = x.right;
x.right = y.left;
if (y.left != null) {
y.left.parent = x;
}y.parent = x.parent;
if (x.parent == null) {
this.root = y;
} else {
if (x === x.parent.left) {
x.parent.left = y;
} else {
x.parent.right = y;
}}y.left = x;
x.parent = y;
}, "java.util.TreeMap.Entry");
c$.maximum = Clazz.defineMethod(c$, "maximum", 
function(x){
while (x.right != null) {
x = x.right;
}
return x;
}, "java.util.TreeMap.Entry");
c$.minimum = Clazz.defineMethod(c$, "minimum", 
function(x){
while (x.left != null) {
x = x.left;
}
return x;
}, "java.util.TreeMap.Entry");
c$.predecessor = Clazz.defineMethod(c$, "predecessor", 
function(x){
if (x.left != null) {
return java.util.TreeMap.maximum(x.left);
}var y = x.parent;
while (y != null && x === y.left) {
x = y;
y = y.parent;
}
return y;
}, "java.util.TreeMap.Entry");
Clazz.overrideMethod(c$, "put", 
function(key, value){
var entry = this.rbInsert(key);
var result = entry.value;
entry.value = value;
return result;
}, "~O,~O");
Clazz.defineMethod(c$, "rbDelete", 
function(z){
var y = z.left == null || z.right == null ? z : java.util.TreeMap.successor(z);
var x = y.left != null ? y.left : y.right;
if (x != null) {
x.parent = y.parent;
}if (y.parent == null) {
this.root = x;
} else if (y === y.parent.left) {
y.parent.left = x;
} else {
y.parent.right = x;
}this.modCount++;
if (y !== z) {
z.key = y.key;
z.value = y.value;
}if (!y.color && this.root != null) {
if (x == null) {
this.fixup(y.parent);
} else {
this.fixup(x);
}}this.$size--;
}, "java.util.TreeMap.Entry");
Clazz.defineMethod(c$, "rbInsert", 
function(object){
var result = 0;
var y = null;
if (this.$size != 0) {
var key = null;
if (this.$comparator == null) {
key = java.util.TreeMap.toComparable(object);
}var x = this.root;
while (x != null) {
y = x;
result = key != null ? key.compareTo(x.key) : this.$comparator.compare(object, x.key);
if (result == 0) {
return x;
}x = result < 0 ? x.left : x.right;
}
}this.$size++;
this.modCount++;
var z =  new java.util.TreeMap.Entry(object);
if (y == null) {
return this.root = z;
}z.parent = y;
if (result < 0) {
y.left = z;
} else {
y.right = z;
}this.balance(z);
return z;
}, "~O");
Clazz.overrideMethod(c$, "remove", 
function(key){
var node = this.find(key);
if (node == null) {
return null;
}var result = node.value;
this.rbDelete(node);
return result;
}, "~O");
Clazz.defineMethod(c$, "rightRotate", 
function(x){
var y = x.left;
x.left = y.right;
if (y.right != null) {
y.right.parent = x;
}y.parent = x.parent;
if (x.parent == null) {
this.root = y;
} else {
if (x === x.parent.right) {
x.parent.right = y;
} else {
x.parent.left = y;
}}y.right = x;
x.parent = y;
}, "java.util.TreeMap.Entry");
Clazz.overrideMethod(c$, "size", 
function(){
return this.$size;
});
Clazz.overrideMethod(c$, "subMap", 
function(startKey, endKey){
if (this.$comparator == null) {
if (java.util.TreeMap.toComparable(startKey).compareTo(endKey) <= 0) {
return  new java.util.TreeMap.SubMap(startKey, this, endKey);
}} else {
if (this.$comparator.compare(startKey, endKey) <= 0) {
return  new java.util.TreeMap.SubMap(startKey, this, endKey);
}}throw  new IllegalArgumentException();
}, "~O,~O");
c$.successor = Clazz.defineMethod(c$, "successor", 
function(x){
if (x.right != null) {
return java.util.TreeMap.minimum(x.right);
}var y = x.parent;
while (y != null && x === y.right) {
x = y;
y = y.parent;
}
return y;
}, "java.util.TreeMap.Entry");
Clazz.overrideMethod(c$, "tailMap", 
function(startKey){
if (this.$comparator == null) {
java.util.TreeMap.toComparable(startKey).compareTo(startKey);
} else {
this.$comparator.compare(startKey, startKey);
}return  new java.util.TreeMap.SubMap(startKey, this);
}, "~O");
Clazz.overrideMethod(c$, "values", 
function(){
if (this.$values == null) {
this.$values = ((Clazz.isClassDefined("java.util.TreeMap$3") ? 0 : java.util.TreeMap.$TreeMap$3$ ()), Clazz.innerTypeInstance(java.util.TreeMap$3, this, null));
}return this.$values;
});
c$.$TreeMap$1$=function(){
})();
};
c$.$TreeMap$2$=function(){
})();
};
c$.$TreeMap$3$=function(){
})();
};
})();
})();
})();
})();
})();
})();
})();
})();
})();
})();
})();
})();
})();
})();
})();
})();
})();
});
;//5.0.1-v7 Mon May 12 23:42:45 CDT 2025
