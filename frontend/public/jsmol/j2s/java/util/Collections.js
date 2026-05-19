Clazz.load(["java.util.AbstractList", "$.AbstractMap", "$.AbstractSet", "$.Collection", "$.Enumeration", "$.Iterator", "$.List", "$.ListIterator", "$.Map", "$.RandomAccess", "$.Set", "$.SortedMap", "$.SortedSet", "java.lang.reflect.Array"], "java.util.Collections", ["java.util.ArrayList", "$.Arrays", "java.util.Map.Entry", "java.util.Random"], function(){
var c$ = Clazz.declareType(java.util, "Collections", null);
c$.emptyEnumeration = Clazz.defineMethod(c$, "emptyEnumeration", 
function(){
if (java.util.Collections.EMPTY_ENUMERATION == null) java.util.Collections.EMPTY_ENUMERATION =  new java.util.Collections.EmptyEnumeration();
return java.util.Collections.EMPTY_ENUMERATION;
});
c$.emptyIterator = Clazz.defineMethod(c$, "emptyIterator", 
function(){
if (java.util.Collections.EMPTY_ITERATOR == null) {
java.util.Collections.EMPTY_ITERATOR =  new java.util.Collections.EmptyIterator();
}return java.util.Collections.EMPTY_ITERATOR;
});
c$.binarySearch = Clazz.defineMethod(c$, "binarySearch", 
function(list, object){
if (list == null) {
throw  new NullPointerException();
}if (list.isEmpty()) {
return -1;
}var key = object;
if (!(Clazz.instanceOf(list,"java.util.RandomAccess"))) {
var it = list.listIterator();
while (it.hasNext()) {
var result;
if ((result = key.compareTo(it.next())) <= 0) {
if (result == 0) {
return it.previousIndex();
}return -it.previousIndex() - 1;
}}
return -list.size() - 1;
}var low = 0;
var mid = list.size();
var high = mid - 1;
var result = -1;
while (low <= high) {
mid = (low + high) >> 1;
if ((result = key.compareTo(list.get(mid))) > 0) {
low = mid + 1;
} else if (result == 0) {
return mid;
} else {
high = mid - 1;
}}
return -mid - (result < 0 ? 1 : 2);
}, "java.util.List,~O");
c$.binarySearch = Clazz.defineMethod(c$, "binarySearch", 
function(list, object, comparator){
if (comparator == null) {
return java.util.Collections.binarySearch(list, object);
}if (!(Clazz.instanceOf(list,"java.util.RandomAccess"))) {
var it = list.listIterator();
while (it.hasNext()) {
var result;
if ((result = comparator.compare(object, it.next())) <= 0) {
if (result == 0) {
return it.previousIndex();
}return -it.previousIndex() - 1;
}}
return -list.size() - 1;
}var low = 0;
var mid = list.size();
var high = mid - 1;
var result = -1;
while (low <= high) {
mid = (low + high) >> 1;
if ((result = comparator.compare(object, list.get(mid))) > 0) {
low = mid + 1;
} else if (result == 0) {
return mid;
} else {
high = mid - 1;
}}
return -mid - (result < 0 ? 1 : 2);
}, "java.util.List,~O,java.util.Comparator");
c$.copy = Clazz.defineMethod(c$, "copy", 
function(destination, source){
if (destination.size() < source.size()) {
throw  new ArrayIndexOutOfBoundsException();
}var srcIt = source.iterator();
var destIt = destination.listIterator();
while (srcIt.hasNext()) {
try {
destIt.next();
} catch (e) {
if (Clazz.exceptionOf(e,"java.util.NoSuchElementException")){
throw  new ArrayIndexOutOfBoundsException();
} else {
throw e;
}
}
destIt.set(srcIt.next());
}
}, "java.util.List,java.util.List");
c$.enumeration = Clazz.defineMethod(c$, "enumeration", 
function(collection){
var c = collection;
return ((Clazz.isClassDefined("java.util.Collections$1") ? 0 : java.util.Collections.$Collections$1$ ()), Clazz.innerTypeInstance(java.util.Collections$1, this, Clazz.cloneFinals("c", c)));
}, "java.util.Collection");
c$.fill = Clazz.defineMethod(c$, "fill", 
function(list, object){
var it = list.listIterator();
while (it.hasNext()) {
it.next();
it.set(object);
}
}, "java.util.List,~O");
c$.max = Clazz.defineMethod(c$, "max", 
function(collection){
var it = collection.iterator();
var max = it.next();
while (it.hasNext()) {
var next = it.next();
if (max.compareTo(next) < 0) {
max = next;
}}
return max;
}, "java.util.Collection");
c$.max = Clazz.defineMethod(c$, "max", 
function(collection, comparator){
var it = collection.iterator();
var max = it.next();
while (it.hasNext()) {
var next = it.next();
if (comparator.compare(max, next) < 0) {
max = next;
}}
return max;
}, "java.util.Collection,java.util.Comparator");
c$.min = Clazz.defineMethod(c$, "min", 
function(collection){
var it = collection.iterator();
var min = it.next();
while (it.hasNext()) {
var next = it.next();
if (min.compareTo(next) > 0) {
min = next;
}}
return min;
}, "java.util.Collection");
c$.min = Clazz.defineMethod(c$, "min", 
function(collection, comparator){
var it = collection.iterator();
var min = it.next();
while (it.hasNext()) {
var next = it.next();
if (comparator.compare(min, next) > 0) {
min = next;
}}
return min;
}, "java.util.Collection,java.util.Comparator");
c$.nCopies = Clazz.defineMethod(c$, "nCopies", 
function(length, object){
return  new java.util.Collections.CopiesList(length, object);
}, "~N,~O");
c$.reverse = Clazz.defineMethod(c$, "reverse", 
function(list){
var size = list.size();
var front = list.listIterator();
var back = list.listIterator(size);
for (var i = 0; i < Clazz.doubleToInt(size / 2); i++) {
var frontNext = front.next();
var backPrev = back.previous();
front.set(backPrev);
back.set(frontNext);
}
}, "java.util.List");
c$.reverseOrder = Clazz.defineMethod(c$, "reverseOrder", 
function(){
return  new java.util.Collections.ReverseComparator();
});
c$.reverseOrder = Clazz.defineMethod(c$, "reverseOrder", 
function(c){
if (c == null) {
return java.util.Collections.reverseOrder();
}return  new java.util.Collections.ReverseComparatorWithComparator(c);
}, "java.util.Comparator");
c$.shuffle = Clazz.defineMethod(c$, "shuffle", 
function(list){
java.util.Collections.shuffle(list,  new java.util.Random());
}, "java.util.List");
c$.shuffle = Clazz.defineMethod(c$, "shuffle", 
function(list, random){
if (!(Clazz.instanceOf(list,"java.util.RandomAccess"))) {
var array = list.toArray();
for (var i = array.length - 1; i > 0; i--) {
var index = random.nextInt() % (i + 1);
if (index < 0) {
index = -index;
}var temp = array[i];
array[i] = array[index];
array[index] = temp;
}
var i = 0;
var it = list.listIterator();
while (it.hasNext()) {
it.next();
it.set(array[i++]);
}
} else {
var rawList = list;
for (var i = rawList.size() - 1; i > 0; i--) {
var index = random.nextInt() % (i + 1);
if (index < 0) {
index = -index;
}rawList.set(index, rawList.set(i, rawList.get(index)));
}
}}, "java.util.List,java.util.Random");
c$.singleton = Clazz.defineMethod(c$, "singleton", 
function(object){
return  new java.util.Collections.SingletonSet(object);
}, "~O");
c$.singletonList = Clazz.defineMethod(c$, "singletonList", 
function(object){
return  new java.util.Collections.SingletonList(object);
}, "~O");
c$.singletonMap = Clazz.defineMethod(c$, "singletonMap", 
function(key, value){
return  new java.util.Collections.SingletonMap(key, value);
}, "~O,~O");
c$.sort = Clazz.defineMethod(c$, "sort", 
function(list){
var array = list.toArray();
java.util.Arrays.sort(array);
var i = 0;
var it = list.listIterator();
while (it.hasNext()) {
it.next();
it.set(array[i++]);
}
}, "java.util.List");
c$.sort = Clazz.defineMethod(c$, "sort", 
function(list, comparator){
var array = list.toArray( new Array(list.size()));
java.util.Arrays.sort(array, comparator);
var i = 0;
var it = list.listIterator();
while (it.hasNext()) {
it.next();
it.set(array[i++]);
}
}, "java.util.List,java.util.Comparator");
c$.swap = Clazz.defineMethod(c$, "swap", 
function(list, index1, index2){
if (list == null) {
throw  new NullPointerException();
}if (index1 == index2) {
return;
}var rawList = list;
rawList.set(index2, rawList.set(index1, rawList.get(index2)));
}, "java.util.List,~N,~N");
c$.replaceAll = Clazz.defineMethod(c$, "replaceAll", 
function(list, obj, obj2){
var index;
var found = false;
while ((index = list.indexOf(obj)) > -1) {
found = true;
list.set(index, obj2);
}
return found;
}, "java.util.List,~O,~O");
c$.rotate = Clazz.defineMethod(c$, "rotate", 
function(lst, dist){
var list = lst;
var size = list.size();
if (size == 0) {
return;
}var normdist;
if (dist > 0) {
normdist = dist % size;
} else {
normdist = size - ((dist % size) * (-1));
}if (normdist == 0 || normdist == size) {
return;
}if (Clazz.instanceOf(list,"java.util.RandomAccess")) {
var temp = list.get(0);
var index = 0;
var beginIndex = 0;
for (var i = 0; i < size; i++) {
index = (index + normdist) % size;
temp = list.set(index, temp);
if (index == beginIndex) {
index = ++beginIndex;
temp = list.get(beginIndex);
}}
} else {
var divideIndex = (size - normdist) % size;
var sublist1 = list.subList(0, divideIndex);
var sublist2 = list.subList(divideIndex, size);
java.util.Collections.reverse(sublist1);
java.util.Collections.reverse(sublist2);
java.util.Collections.reverse(list);
}}, "java.util.List,~N");
c$.indexOfSubList = Clazz.defineMethod(c$, "indexOfSubList", 
function(list, sublist){
var size = list.size();
var sublistSize = sublist.size();
if (sublistSize > size) {
return -1;
}if (sublistSize == 0) {
return 0;
}var firstObj = sublist.get(0);
var index = list.indexOf(firstObj);
if (index == -1) {
return -1;
}while (index < size && (size - index >= sublistSize)) {
var listIt = list.listIterator(index);
if ((firstObj == null) ? listIt.next() == null : firstObj.equals(listIt.next())) {
var sublistIt = sublist.listIterator(1);
var difFound = false;
while (sublistIt.hasNext()) {
var element = sublistIt.next();
if (!listIt.hasNext()) {
return -1;
}if ((element == null) ? listIt.next() != null : !element.equals(listIt.next())) {
difFound = true;
break;
}}
if (!difFound) {
return index;
}}index++;
}
return -1;
}, "java.util.List,java.util.List");
c$.lastIndexOfSubList = Clazz.defineMethod(c$, "lastIndexOfSubList", 
function(list, sublist){
var sublistSize = sublist.size();
var size = list.size();
if (sublistSize > size) {
return -1;
}if (sublistSize == 0) {
return size;
}var lastObj = sublist.get(sublistSize - 1);
var index = list.lastIndexOf(lastObj);
while ((index > -1) && (index + 1 >= sublistSize)) {
var listIt = list.listIterator(index + 1);
if ((lastObj == null) ? listIt.previous() == null : lastObj.equals(listIt.previous())) {
var sublistIt = sublist.listIterator(sublistSize - 1);
var difFound = false;
while (sublistIt.hasPrevious()) {
var element = sublistIt.previous();
if (!listIt.hasPrevious()) {
return -1;
}if ((element == null) ? listIt.previous() != null : !element.equals(listIt.previous())) {
difFound = true;
break;
}}
if (!difFound) {
return listIt.nextIndex();
}}index--;
}
return -1;
}, "java.util.List,java.util.List");
c$.list = Clazz.defineMethod(c$, "list", 
function(enumeration){
var list =  new java.util.ArrayList();
while (enumeration.hasMoreElements()) {
list.add(enumeration.nextElement());
}
return list;
}, "java.util.Enumeration");
c$.synchronizedCollection = Clazz.defineMethod(c$, "synchronizedCollection", 
function(collection){
if (collection == null) {
throw  new NullPointerException();
}return  new java.util.Collections.SynchronizedCollection(collection);
}, "java.util.Collection");
c$.synchronizedList = Clazz.defineMethod(c$, "synchronizedList", 
function(list){
if (list == null) {
throw  new NullPointerException();
}if (Clazz.instanceOf(list,"java.util.RandomAccess")) {
return  new java.util.Collections.SynchronizedRandomAccessList(list);
}return  new java.util.Collections.SynchronizedList(list);
}, "java.util.List");
c$.synchronizedMap = Clazz.defineMethod(c$, "synchronizedMap", 
function(map){
if (map == null) {
throw  new NullPointerException();
}return  new java.util.Collections.SynchronizedMap(map);
}, "java.util.Map");
c$.synchronizedSet = Clazz.defineMethod(c$, "synchronizedSet", 
function(set){
if (set == null) {
throw  new NullPointerException();
}return  new java.util.Collections.SynchronizedSet(set);
}, "java.util.Set");
c$.synchronizedSortedMap = Clazz.defineMethod(c$, "synchronizedSortedMap", 
function(map){
if (map == null) {
throw  new NullPointerException();
}return  new java.util.Collections.SynchronizedSortedMap(map);
}, "java.util.SortedMap");
c$.synchronizedSortedSet = Clazz.defineMethod(c$, "synchronizedSortedSet", 
function(set){
if (set == null) {
throw  new NullPointerException();
}return  new java.util.Collections.SynchronizedSortedSet(set);
}, "java.util.SortedSet");
c$.unmodifiableCollection = Clazz.defineMethod(c$, "unmodifiableCollection", 
function(collection){
if (collection == null) {
throw  new NullPointerException();
}return  new java.util.Collections.UnmodifiableCollection(collection);
}, "java.util.Collection");
c$.unmodifiableList = Clazz.defineMethod(c$, "unmodifiableList", 
function(list){
if (list == null) {
throw  new NullPointerException();
}if (Clazz.instanceOf(list,"java.util.RandomAccess")) {
return  new java.util.Collections.UnmodifiableRandomAccessList(list);
}return  new java.util.Collections.UnmodifiableList(list);
}, "java.util.List");
c$.unmodifiableMap = Clazz.defineMethod(c$, "unmodifiableMap", 
function(map){
if (map == null) {
throw  new NullPointerException();
}return  new java.util.Collections.UnmodifiableMap(map);
}, "java.util.Map");
c$.unmodifiableSet = Clazz.defineMethod(c$, "unmodifiableSet", 
function(set){
if (set == null) {
throw  new NullPointerException();
}return  new java.util.Collections.UnmodifiableSet(set);
}, "java.util.Set");
c$.unmodifiableSortedMap = Clazz.defineMethod(c$, "unmodifiableSortedMap", 
function(map){
if (map == null) {
throw  new NullPointerException();
}return  new java.util.Collections.UnmodifiableSortedMap(map);
}, "java.util.SortedMap");
c$.unmodifiableSortedSet = Clazz.defineMethod(c$, "unmodifiableSortedSet", 
function(set){
if (set == null) {
throw  new NullPointerException();
}return  new java.util.Collections.UnmodifiableSortedSet(set);
}, "java.util.SortedSet");
c$.frequency = Clazz.defineMethod(c$, "frequency", 
function(c, o){
if (c == null) {
throw  new NullPointerException();
}if (c.isEmpty()) {
return 0;
}var result = 0;
var itr = c.iterator();
while (itr.hasNext()) {
var e = itr.next();
if (o == null ? e == null : o.equals(e)) {
result++;
}}
return result;
}, "java.util.Collection,~O");
c$.emptyList = Clazz.defineMethod(c$, "emptyList", 
function(){
return java.util.Collections.EMPTY_LIST;
});
c$.emptySet = Clazz.defineMethod(c$, "emptySet", 
function(){
return java.util.Collections.EMPTY_SET;
});
c$.emptyMap = Clazz.defineMethod(c$, "emptyMap", 
function(){
return java.util.Collections.EMPTY_MAP;
});
c$.checkedCollection = Clazz.defineMethod(c$, "checkedCollection", 
function(c, type){
return  new java.util.Collections.CheckedCollection(c, type);
}, "java.util.Collection,Class");
c$.checkedMap = Clazz.defineMethod(c$, "checkedMap", 
function(m, keyType, valueType){
return  new java.util.Collections.CheckedMap(m, keyType, valueType);
}, "java.util.Map,Class,Class");
c$.checkedList = Clazz.defineMethod(c$, "checkedList", 
function(list, type){
if (Clazz.instanceOf(list,"java.util.RandomAccess")) {
return  new java.util.Collections.CheckedRandomAccessList(list, type);
}return  new java.util.Collections.CheckedList(list, type);
}, "java.util.List,Class");
c$.checkedSet = Clazz.defineMethod(c$, "checkedSet", 
function(s, type){
return  new java.util.Collections.CheckedSet(s, type);
}, "java.util.Set,Class");
c$.checkedSortedMap = Clazz.defineMethod(c$, "checkedSortedMap", 
function(m, keyType, valueType){
return  new java.util.Collections.CheckedSortedMap(m, keyType, valueType);
}, "java.util.SortedMap,Class,Class");
c$.checkedSortedSet = Clazz.defineMethod(c$, "checkedSortedSet", 
function(s, type){
return  new java.util.Collections.CheckedSortedSet(s, type);
}, "java.util.SortedSet,Class");
c$.addAll = Clazz.defineMethod(c$, "addAll", 
function(c, a){
var modified = false;
for (var i = 0; i < a.length; i++) {
modified = new Boolean (modified | c.add(a[i])).valueOf();
}
return modified;
}, "java.util.Collection,~A");
c$.disjoint = Clazz.defineMethod(c$, "disjoint", 
function(c1, c2){
if ((Clazz.instanceOf(c1,"java.util.Set")) && !(Clazz.instanceOf(c2,"java.util.Set")) || (c2.size()) > c1.size()) {
var tmp = c1;
c1 = c2;
c2 = tmp;
}var it = c1.iterator();
while (it.hasNext()) {
if (c2.contains(it.next())) {
return false;
}}
return true;
}, "java.util.Collection,java.util.Collection");
c$.checkType = Clazz.defineMethod(c$, "checkType", 
function(obj, type){
if (!type.isInstance(obj)) {
throw  new ClassCastException("Attempt to insert " + obj.getClass() + " element into collection with element type " + type);
}return obj;
}, "~O,Class");
c$.$Collections$1$=function(){
})();
};
})();
})();
})();
})();
;(function(){
var c$ = Clazz.declareAnonymous(java.util, "Collections$EmptySet$1", null, java.util.Iterator);
Clazz.overrideMethod(c$, "hasNext", 
function(){
return false;
});
Clazz.overrideMethod(c$, "next", 
function(){
throw  new java.util.NoSuchElementException();
});
Clazz.overrideMethod(c$, "remove", 
function(){
throw  new UnsupportedOperationException();
});
})();
})();
})();
})();
;(function(){
var c$ = Clazz.decorateAsClass(function(){
Clazz.prepareCallback(this, arguments);
this.$hasNext = true;
Clazz.instantialize(this, arguments);}, java.util, "Collections$SingletonSet$1", null, java.util.Iterator);
Clazz.overrideMethod(c$, "hasNext", 
function(){
return this.$hasNext;
});
Clazz.overrideMethod(c$, "next", 
function(){
if (this.$hasNext) {
this.$hasNext = false;
return this.b$["java.util.Collections.SingletonSet"].element;
}throw  new java.util.NoSuchElementException();
});
Clazz.overrideMethod(c$, "remove", 
function(){
throw  new UnsupportedOperationException();
});
})();
})();
;(function(){
var c$ = Clazz.declareAnonymous(java.util, "Collections$SingletonMap$1", java.util.AbstractSet);
Clazz.overrideMethod(c$, "contains", 
function(object){
if (Clazz.instanceOf(object,"java.util.Map.Entry")) {
var entry = object;
return this.b$["java.util.Collections.SingletonMap"].containsKey(entry.getKey()) && this.b$["java.util.Collections.SingletonMap"].containsValue(entry.getValue());
}return false;
}, "~O");
Clazz.overrideMethod(c$, "size", 
function(){
return 1;
});
Clazz.overrideMethod(c$, "iterator", 
function(){
return ((Clazz.isClassDefined("java.util.Collections$SingletonMap$1$1") ? 0 : java.util.Collections.$Collections$SingletonMap$1$1$ ()), Clazz.innerTypeInstance(java.util.Collections$SingletonMap$1$1, this, null));
});
;(function(){
var c$ = Clazz.decorateAsClass(function(){
Clazz.prepareCallback(this, arguments);
this.$hasNext = true;
Clazz.instantialize(this, arguments);}, java.util, "Collections$SingletonMap$1$1", null, java.util.Iterator);
Clazz.overrideMethod(c$, "hasNext", 
function(){
return this.$hasNext;
});
Clazz.overrideMethod(c$, "next", 
function(){
if (this.$hasNext) {
this.$hasNext = false;
return ((Clazz.isClassDefined("java.util.Collections$SingletonMap$1$1$1") ? 0 : java.util.Collections.$Collections$SingletonMap$1$1$1$ ()), Clazz.innerTypeInstance(java.util.Collections$SingletonMap$1$1$1, this, null));
}throw  new java.util.NoSuchElementException();
});
Clazz.overrideMethod(c$, "remove", 
function(){
throw  new UnsupportedOperationException();
});
;(function(){
var c$ = Clazz.declareAnonymous(java.util, "Collections$SingletonMap$1$1$1", null, java.util.Map.Entry);
Clazz.overrideMethod(c$, "equals", 
function(object){
return this.b$["java.util.Collections$SingletonMap$1"].contains(object);
}, "~O");
Clazz.overrideMethod(c$, "getKey", 
function(){
return this.b$["java.util.Collections.SingletonMap"].k;
});
Clazz.overrideMethod(c$, "getValue", 
function(){
return this.b$["java.util.Collections.SingletonMap"].v;
});
Clazz.overrideMethod(c$, "hashCode", 
function(){
return (this.b$["java.util.Collections.SingletonMap"].k == null ? 0 : this.b$["java.util.Collections.SingletonMap"].k.hashCode()) ^ (this.b$["java.util.Collections.SingletonMap"].v == null ? 0 : this.b$["java.util.Collections.SingletonMap"].v.hashCode());
});
Clazz.overrideMethod(c$, "setValue", 
function(value){
throw  new UnsupportedOperationException();
}, "~O");
})();
})();
})();
})();
})();
})();
})();
})();
;(function(){
var c$ = Clazz.decorateAsClass(function(){
Clazz.prepareCallback(this, arguments);
this.iterator = null;
Clazz.instantialize(this, arguments);}, java.util, "Collections$UnmodifiableCollection$1", null, java.util.Iterator);
Clazz.prepareFields (c$, function(){
this.iterator = this.b$["java.util.Collections.UnmodifiableCollection"].c.iterator();
});
Clazz.defineMethod(c$, "hasNext", 
function(){
return this.iterator.hasNext();
});
Clazz.defineMethod(c$, "next", 
function(){
return this.iterator.next();
});
Clazz.overrideMethod(c$, "remove", 
function(){
throw  new UnsupportedOperationException();
});
})();
})();
;(function(){
var c$ = Clazz.decorateAsClass(function(){
Clazz.prepareCallback(this, arguments);
this.iterator = null;
Clazz.instantialize(this, arguments);}, java.util, "Collections$UnmodifiableList$1", null, java.util.ListIterator);
Clazz.prepareFields (c$, function(){
this.iterator = this.b$["java.util.Collections.UnmodifiableList"].list.listIterator(this.f$.location);
});
Clazz.overrideMethod(c$, "add", 
function(object){
throw  new UnsupportedOperationException();
}, "~O");
Clazz.defineMethod(c$, "hasNext", 
function(){
return this.iterator.hasNext();
});
Clazz.defineMethod(c$, "hasPrevious", 
function(){
return this.iterator.hasPrevious();
});
Clazz.defineMethod(c$, "next", 
function(){
return this.iterator.next();
});
Clazz.defineMethod(c$, "nextIndex", 
function(){
return this.iterator.nextIndex();
});
Clazz.defineMethod(c$, "previous", 
function(){
return this.iterator.previous();
});
Clazz.defineMethod(c$, "previousIndex", 
function(){
return this.iterator.previousIndex();
});
Clazz.overrideMethod(c$, "remove", 
function(){
throw  new UnsupportedOperationException();
});
Clazz.overrideMethod(c$, "set", 
function(object){
throw  new UnsupportedOperationException();
}, "~O");
})();
;(function(){
var c$ = Clazz.declareType(java.util.Collections.UnmodifiableMap, "UnmodifiableEntrySet", java.util.Collections.UnmodifiableSet);
Clazz.overrideMethod(c$, "iterator", 
function(){
return ((Clazz.isClassDefined("java.util.Collections$UnmodifiableMap$UnmodifiableEntrySet$1") ? 0 : java.util.Collections.UnmodifiableMap.UnmodifiableEntrySet.$Collections$UnmodifiableMap$UnmodifiableEntrySet$1$ ()), Clazz.innerTypeInstance(java.util.Collections$UnmodifiableMap$UnmodifiableEntrySet$1, this, null));
});
Clazz.defineMethod(c$, "toArray", 
function(){
var length = this.c.size();
var result =  new Array(length);
var it = this.iterator();
for (var i = length; --i >= 0; ) {
result[i] = it.next();
}
return result;
});
Clazz.defineMethod(c$, "toArray", 
function(contents){
var size = this.c.size();
var index = 0;
var it = this.iterator();
if (size > contents.length) {
var ct = contents.getClass().getComponentType();
contents = java.lang.reflect.Array.newInstance(ct, size);
}while (index < size) {
contents[index++] = it.next();
}
if (index < contents.length) {
contents[index] = null;
}return contents;
}, "~A");
c$.$Collections$UnmodifiableMap$UnmodifiableEntrySet$1$=function(){
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
;(function(){
var c$ = Clazz.decorateAsClass(function(){
this.e = null;
this.valueType = null;
Clazz.instantialize(this, arguments);}, java.util.Collections.CheckedMap, "CheckedEntry", null, java.util.Map.Entry);
Clazz.makeConstructor(c$, 
function(e, valueType){
if (e == null) {
throw  new NullPointerException();
}this.e = e;
this.valueType = valueType;
}, "java.util.Map.Entry,Class");
Clazz.defineMethod(c$, "getKey", 
function(){
return this.e.getKey();
});
Clazz.defineMethod(c$, "getValue", 
function(){
return this.e.getValue();
});
Clazz.defineMethod(c$, "setValue", 
function(obj){
return this.e.setValue(java.util.Collections.checkType(obj, this.valueType));
}, "~O");
Clazz.defineMethod(c$, "equals", 
function(obj){
return this.e.equals(obj);
}, "~O");
Clazz.defineMethod(c$, "hashCode", 
function(){
return this.e.hashCode();
});
;(function(){
var c$ = Clazz.decorateAsClass(function(){
this.s = null;
this.valueType = null;
Clazz.instantialize(this, arguments);}, java.util.Collections.CheckedMap, "CheckedEntrySet", null, java.util.Set);
Clazz.makeConstructor(c$, 
function(s, valueType){
this.s = s;
this.valueType = valueType;
}, "java.util.Set,Class");
Clazz.defineMethod(c$, "iterator", 
function(){
return  new java.util.Collections.CheckedMap.CheckedEntrySet.CheckedEntryIterator(this.s.iterator(), this.valueType);
});
Clazz.defineMethod(c$, "toArray", 
function(){
var thisSize = this.size();
var array =  new Array(thisSize);
var it = this.iterator();
for (var i = 0; i < thisSize; i++) {
array[i] = it.next();
}
return array;
});
Clazz.defineMethod(c$, "toArray", 
function(array){
var thisSize = this.size();
if (array.length < thisSize) {
var ct = array.getClass().getComponentType();
array = java.lang.reflect.Array.newInstance(ct, thisSize);
}var it = this.iterator();
for (var i = 0; i < thisSize; i++) {
array[i] = it.next();
}
if (thisSize < array.length) {
array[thisSize] = null;
}return array;
}, "~A");
Clazz.defineMethod(c$, "retainAll", 
function(c){
return this.s.retainAll(c);
}, "java.util.Collection");
Clazz.defineMethod(c$, "removeAll", 
function(c){
return this.s.removeAll(c);
}, "java.util.Collection");
Clazz.defineMethod(c$, "containsAll", 
function(c){
return this.s.containsAll(c);
}, "java.util.Collection");
Clazz.overrideMethod(c$, "addAll", 
function(c){
throw  new UnsupportedOperationException();
}, "java.util.Collection");
Clazz.defineMethod(c$, "remove", 
function(o){
return this.s.remove(o);
}, "~O");
Clazz.defineMethod(c$, "contains", 
function(o){
return this.s.contains(o);
}, "~O");
Clazz.overrideMethod(c$, "add", 
function(o){
throw  new UnsupportedOperationException();
}, "java.util.Map.Entry");
Clazz.defineMethod(c$, "isEmpty", 
function(){
return this.s.isEmpty();
});
Clazz.defineMethod(c$, "clear", 
function(){
this.s.clear();
});
Clazz.defineMethod(c$, "size", 
function(){
return this.s.size();
});
Clazz.defineMethod(c$, "hashCode", 
function(){
return this.s.hashCode();
});
Clazz.defineMethod(c$, "equals", 
function(object){
return this.s.equals(object);
}, "~O");
})();
})();
})();
})();
c$.EMPTY_ENUMERATION = null;
c$.EMPTY_ITERATOR = null;
c$.EMPTY_LIST =  new java.util.Collections.EmptyList();
c$.EMPTY_SET =  new java.util.Collections.EmptySet();
c$.EMPTY_MAP =  new java.util.Collections.EmptyMap();
});
;//5.0.1-v7 Mon May 12 23:42:45 CDT 2025
