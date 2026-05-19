(function(Clazz
,Clazz_getClassName
,Clazz_newLongArray
,Clazz_doubleToByte
,Clazz_doubleToInt
,Clazz_doubleToLong
,Clazz_declarePackage
,Clazz_instanceOf
,Clazz_load
,Clazz_instantialize
,Clazz_decorateAsClass
,Clazz_floatToInt
,Clazz_floatToLong
,Clazz_makeConstructor
,Clazz_defineEnumConstant
,Clazz_exceptionOf
,Clazz_newIntArray
,Clazz_newFloatArray
,Clazz_declareType
,Clazz_prepareFields
,Clazz_superConstructor
,Clazz_newByteArray
,Clazz_declareInterface
,Clazz_newShortArray
,Clazz_innerTypeInstance
,Clazz_isClassDefined
,Clazz_prepareCallback
,Clazz_newArray
,Clazz_castNullAs
,Clazz_floatToShort
,Clazz_superCall
,Clazz_decorateAsType
,Clazz_newBooleanArray
,Clazz_newCharArray
,Clazz_implementOf
,Clazz_newDoubleArray
,Clazz_overrideConstructor
,Clazz_clone
,Clazz_doubleToShort
,Clazz_getInheritedLevel
,Clazz_getParamsType
,Clazz_isAF
,Clazz_isAB
,Clazz_isAI
,Clazz_isAS
,Clazz_isASS
,Clazz_isAP
,Clazz_isAFloat
,Clazz_isAII
,Clazz_isAFF
,Clazz_isAFFF
,Clazz_tryToSearchAndExecute
,Clazz_getStackTrace
,Clazz_inheritArgs
,Clazz_alert
,Clazz_defineMethod
,Clazz_overrideMethod
,Clazz_declareAnonymous
,Clazz_cloneFinals
){
var $t$;
Jmol.___JmolDate="$Date: 2026-03-20 10:03:31 -0500 (Fri, 20 Mar 2026) $"
Jmol.___fullJmolProperties="src/org/jmol/viewer/Jmol.properties"
Jmol.___JmolVersion="16.3.53" // (legacy) also 16.3.54 (swingJS) 
 




;(function(Clazz) {


	Clazz._Loader.registerPackages("java", [ "io", "lang", "lang.reflect", "util" ]);

  var sJU = "java.util";


  var javautil = java.util;

	Clazz._Loader.ignore([
		"net.sf.j2s.ajax.HttpRequest",
		sJU + ".MapEntry.Type",
		"java.net.UnknownServiceException", // unnecessary for Jmol
		"java.lang.Runtime",
		"java.security.AccessController",
		"java.security.PrivilegedExceptionAction",
		"java.io.File",
		"java.io.FileInputStream",
		"java.io.FileWriter",
		"java.io.OutputStreamWriter",
		sJU + ".concurrent.Executors"
	])

Math.rint = Math.round;

Math.log10||(Math.log10=function(a){return Math.log(a)/2.302585092994046});

Math.signum||(Math.signum=function(d){return(d==0.0||isNaN(d))?d:d < 0 ? -1 : 1});

if(Clazz._supportsNativeObject){
	for(var i=0;i<Clazz._extendedObjectMethods.length - 2;i++){
		var p=Clazz._extendedObjectMethods[i];
		Array.prototype[p] = Clazz._O.prototype[p];
		Number.prototype[p] = Clazz._O.prototype[p];
	}
}

java.lang.Number=Number;
Number.__CLASS_NAME__="Number";
Clazz_implementOf(Number,java.io.Serializable);
Number.equals=Clazz._innerFunctions.equals;
Number.getName=Clazz._innerFunctions.getName;
Number.prototype.compareTo = function(x) { var a = this.value, b = x.value; return (a < b ? -1 : a == b ? 0 : 1) };

Clazz_defineMethod(Number,"shortValue",
function(){
var x = Math.round(this)&0xffff;
return (this < 0 && x > 0 ? x - 0x10000 : x);
});

Clazz_defineMethod(Number,"byteValue",
function(){
var x = Math.round(this)&0xff;
return (this < 0 && x > 0 ? x - 0x100 : x);
});

Clazz_defineMethod(Number,"intValue",
function(){
return Math.round(this)&0xffffffff;
});

Clazz_defineMethod(Number,"longValue",
function(){
return Math.round(this);
});

Clazz_defineMethod(Number,"floatValue",
function(){
return this.valueOf();
});
Clazz_defineMethod(Number,"doubleValue",
function(){
return parseFloat(this.valueOf());
});

Clazz_overrideMethod(Number,"hashCode",
function(){
return this.valueOf();
});

java.lang.Integer=Integer=function(){
Clazz_instantialize(this,arguments);
};
Clazz_decorateAsType(Integer,"Integer",Number,Comparable,null,true);
Integer.prototype.valueOf=function(){return 0;};
Integer.toString=Integer.prototype.toString=function(){
if(arguments.length!=0){
return""+arguments[0];
} else if(this===Integer){
return"class java.lang.Integer";
}
return""+this.valueOf();
};



Clazz_overrideConstructor(Integer, function(v){
 v == null && (v = 0);
 if (typeof v != "number")
	v = Integer.parseIntRadix(v, 10);
 this.valueOf=function(){return v;};
}); //BH
Integer.MIN_VALUE=Integer.prototype.MIN_VALUE=-0x80000000;
Integer.MAX_VALUE=Integer.prototype.MAX_VALUE=0x7fffffff;
Integer.TYPE=Integer.prototype.TYPE=Integer;


Integer.compare = Clazz_defineMethod(Integer,"compare",
function(i,j) {
  return (i < j ? -1 : i > j ? 1 : 0);
},"Number,Number");

Clazz_defineMethod(Integer,"bitCount",
function(i) {
	i = i - ((i >>> 1) & 0x55555555);
	i = (i & 0x33333333) + ((i >>> 2) & 0x33333333);
	i = (i + (i >>> 4)) & 0x0f0f0f0f;
	i = i + (i >>> 8);
	i = i + (i >>> 16);
	return i & 0x3f;
},"Number");
Integer.bitCount=Integer.prototype.bitCount;

Clazz_defineMethod(Integer,"numberOfLeadingZeros",
function(i) {
 if (i == 0) return 32;
 var n = 1;
 if (i >>> 16 == 0) { n += 16; i <<= 16; }
 if (i >>> 24 == 0) { n +=  8; i <<=  8; }
 if (i >>> 28 == 0) { n +=  4; i <<=  4; }
 if (i >>> 30 == 0) { n +=  2; i <<=  2; }
 n -= i >>> 31;
 return n;
},"Number");
Integer.numberOfLeadingZeros=Integer.prototype.numberOfLeadingZeros;

Clazz_defineMethod(Integer,"numberOfTrailingZeros",
function(i) {
	if (i == 0) return 32;
	var n = 31;
	var y = i <<16; if (y != 0) { n = n -16; i = y; }
	y = i << 8; if (y != 0) { n = n - 8; i = y; }
	y = i << 4; if (y != 0) { n = n - 4; i = y; }
	y = i << 2; if (y != 0) { n = n - 2; i = y; }
	return n - ((i << 1) >>> 31);
},"Number");
Integer.numberOfTrailingZeros=Integer.prototype.numberOfTrailingZeros;

Clazz_defineMethod(Integer,"parseIntRadix",
function(s,radix){
if(s==null){
throw new NumberFormatException("null");
}if(radix<2){
throw new NumberFormatException("radix "+radix+" less than Character.MIN_RADIX");
}if(radix>36){
throw new NumberFormatException("radix "+radix+" greater than Character.MAX_RADIX");
}
if (radix == 10) {
	for (var i = s.length; --i >= 0;) {
		var c = s.charCodeAt(i);
		if (c >= 48 && c <= 57) continue;
		if (i > 0 || c != 43 && c != 45)
			throw new NumberFormatException("Not a Number : "+s);

	}
}
var i=parseInt(s,radix);
if(isNaN(i)){
throw new NumberFormatException("Not a Number : "+s);
}
return i;
},"String, Number");
Integer.parseIntRadix=Integer.prototype.parseIntRadix;

Clazz_defineMethod(Integer,"parseInt",
function(s){
return Integer.parseIntRadix(s,10);
},"String");
Integer.parseInt=Integer.prototype.parseInt;


Clazz_overrideMethod(Integer,"$valueOf",
function(s){
return new Integer(s);
});


Integer.$valueOf=Integer.prototype.$valueOf;


Clazz_overrideMethod(Integer,"equals",
function(s){
if(s==null||!Clazz_instanceOf(s,Integer)){
return false;
}
return s.valueOf()==this.valueOf();
},"Object");
Integer.toHexString=Integer.prototype.toHexString=function(d){
if(d.valueOf)d=d.valueOf();
if (d < 0) {
var b = d & 0xFFFFFF;
var c = ((d>>24)&0xFF);
return c._numberToString(16) + (b = "000000" + b._numberToString(16)).substring(b.length - 6);
}
return d._numberToString(16);};
Integer.toOctalString=Integer.prototype.toOctalString=function(d){if(d.valueOf)d=d.valueOf();return d._numberToString(8);};
Integer.toBinaryString=Integer.prototype.toBinaryString=function(d){if(d.valueOf)d=d.valueOf();return d._numberToString(2);};

Integer.decodeRaw=Clazz_defineMethod(Integer,"decodeRaw", function(n){
if (n.indexOf(".") >= 0)n = "";
var i = (n.startsWith("-") ? 1 : 0);
n = n.replace(/\#/, "0x").toLowerCase();
var radix=(n.startsWith("0x", i) ? 16 : n.startsWith("0", i) ? 8 : 10);
n = Number(n) & 0xFFFFFFFF;
return (radix == 8 ? parseInt(n, 8) : n);
},"~S");

Integer.decode=Clazz_defineMethod(Integer,"decode", function(n){
	n = Integer.decodeRaw(n);
	if (isNaN(n) || n < Integer.MIN_VALUE|| n > Integer.MAX_VALUE)
	throw new NumberFormatException("Invalid Integer");
	return new Integer(n);
},"~S");

Clazz_overrideMethod(Integer,"hashCode",
function(){
return this.valueOf();
});


java.lang.Long=Long=function(){
Clazz_instantialize(this,arguments);
};
Clazz_decorateAsType(Long,"Long",Number,Comparable,null,true);
Long.prototype.valueOf=function(){return 0;};
Long.toString=Long.prototype.toString=function(){
if(arguments.length!=0){
return""+arguments[0];
}else if(this===Long){
return"class java.lang.Long";
}
return""+this.valueOf();
};

Clazz_overrideConstructor(Long, function(v){
 v == null && (v = 0);
 v = (typeof v == "number" ? Math.round(v) : Integer.parseIntRadix(v, 10));
this.valueOf=function(){return v;};
});

Long.TYPE=Long.prototype.TYPE=Long;

Clazz_defineMethod(Long,"parseLong",
function(s,radix){
 return Integer.parseInt(s, radix || 10);
});

Long.parseLong=Long.prototype.parseLong;

Clazz_overrideMethod(Long,"$valueOf",
function(s){
return new Long(s);
});
Long.$valueOf=Long.prototype.$valueOf;
Clazz_overrideMethod(Long,"equals",
function(s){
if(s==null||!Clazz_instanceOf(s,Long)){
return false;
}
return s.valueOf()==this.valueOf();
},"Object");
Long.toHexString=Long.prototype.toHexString=function(i){
return i.toString(16);
};
Long.toOctalString=Long.prototype.toOctalString=function(i){
return i.toString(8);
};
Long.toBinaryString=Long.prototype.toBinaryString=function(i){
return i.toString(2);
};


Long.decode=Clazz_defineMethod(Long,"decode",
function(n){
	n = Integer.decodeRaw(n);
	if (isNaN(n))
		throw new NumberFormatException("Invalid Long");
	return new Long(n);
},"~S");

java.lang.Short = Short = function () {
Clazz_instantialize (this, arguments);
};
Clazz_decorateAsType (Short, "Short", Number, Comparable, null, true);
Short.prototype.valueOf = function () { return 0; };
Short.toString = Short.prototype.toString = function () {
	if (arguments.length != 0) {
		return "" + arguments[0];
	} else if (this === Short) {
		return "class java.lang.Short"; // Short.class.toString
	}
	return "" + this.valueOf ();
};

Clazz_overrideConstructor(Short,
function (v) {
 v == null && (v = 0);
 if (typeof v != "number")
	v = Integer.parseIntRadix(v, 10);
 v = v.shortValue();
 this.valueOf = function () {return v;};
});


Short.MIN_VALUE = Short.prototype.MIN_VALUE = -32768;
Short.MAX_VALUE = Short.prototype.MAX_VALUE = 32767;
Short.TYPE = Short.prototype.TYPE = Short;

Clazz_defineMethod(Short, "parseShortRadix",
function (s, radix) {
return Integer.parseIntRadix(s, radix).shortValue();
}, "String, Number");
Short.parseShortRadix = Short.prototype.parseShortRadix;

Clazz_defineMethod(Short, "parseShort",
function (s) {
return Short.parseShortRadix (s, 10);
}, "String");

Short.parseShort = Short.prototype.parseShort;


Clazz_overrideMethod(Short, "$valueOf",
function (s) {
return new Short(s);
});


Short.$valueOf = Short.prototype.$valueOf;
Clazz_overrideMethod(Short, "equals",
function (s) {
if(s == null || !Clazz_instanceOf(s, Short) ){
	return false;
}
return s.valueOf()  == this.valueOf();
}, "Object");
Short.toHexString = Short.prototype.toHexString = function (i) {
	return i.toString (16);
};
Short.toOctalString = Short.prototype.toOctalString = function (i) {
	return i.toString (8);
};
Short.toBinaryString = Short.prototype.toBinaryString = function (i) {
	return i.toString (2);
};
Short.decode = Clazz_defineMethod(Short, "decode",
function(n){
	n = Integer.decodeRaw(n);
	if (isNaN(n) || n < -32768|| n > 32767)
		throw new NumberFormatException("Invalid Short");
	return new Short(n);
}, "~S");

java.lang.Byte=Byte=function(){
Clazz_instantialize(this,arguments);
};
Clazz_decorateAsType(Byte,"Byte",Number,Comparable,null,true);
Byte.prototype.valueOf=function(){return 0;};
Byte.toString=Byte.prototype.toString=function(){
if(arguments.length!=0){
return""+arguments[0];
}else if(this===Byte){
return"class java.lang.Byte";
}
return""+this.valueOf();
};
Clazz_makeConstructor(Byte,
function(v){
 if (typeof v != "number")
	 v = Integer.parseIntRadix(v, 10);
 v = v.byteValue();
this.valueOf=function(){
return v;
};
});

Byte.serialVersionUID=Byte.prototype.serialVersionUID=-7183698231559129828;
Byte.MIN_VALUE=Byte.prototype.MIN_VALUE=-128;
Byte.MAX_VALUE=Byte.prototype.MAX_VALUE=127;
Byte.SIZE=Byte.prototype.SIZE=8;
Byte.TYPE=Byte.prototype.TYPE=Byte;

Clazz_defineMethod(Byte,"parseByteRadix",
function(s,radix){
 return Integer.parseIntRadix(s, radix).byteValue();
},"String, Number");
Byte.parseByteRadix=Byte.prototype.parseByteRadix;

Clazz_defineMethod(Byte,"parseByte",
function(s){
return Byte.parseByte(s,10);
},"String");

Byte.parseByte=Byte.prototype.parseByte;

Clazz_overrideMethod(Byte, "$valueOf",
function (s) {
return new Byte(s);
});

Byte.$valueOf=Byte.prototype.$valueOf;
Clazz_overrideMethod(Byte,"equals",
function(s){
if(s==null||!Clazz_instanceOf(s,Byte)){
return false;
}
return s.valueOf()==this.valueOf();
},"Object");
Byte.toHexString=Byte.prototype.toHexString=function(i){
return i.toString(16);
};
Byte.toOctalString=Byte.prototype.toOctalString=function(i){
return i.toString(8);
};
Byte.toBinaryString=Byte.prototype.toBinaryString=function(i){
return i.toString(2);
};
Byte.decode=Clazz_defineMethod(Byte,"decode",
function(n){
	n = Integer.decodeRaw(n);
	if (isNaN(n) || n < -128|| n > 127)
		throw new NumberFormatException("Invalid Byte");
return new Byte(n);
},"~S");

Clazz._floatToString = function(f) {
 var s = ""+f
 if (s.indexOf(".") < 0 && s.indexOf("e") < 0 && s != "NaN")
 	 s += ".0";
 return s;
}

java.lang.Float=Float=function(){
Clazz_instantialize(this,arguments);
};
Clazz_decorateAsType(Float,"Float",Number,Comparable,null,true);
Float.prototype.valueOf=function(){return 0;};
Float.toString=Float.prototype.toString=function(){
if(arguments.length!=0){
return Clazz._floatToString(arguments[0]);
}else if(this===Float){
return"class java.lang.Float";
}
return Clazz._floatToString(this.valueOf());
};

Clazz._a32 = null;

Float.floatToIntBits = function(f) {
var a = Clazz._a32 || (Clazz._a32 = new Float32Array(1));
a[0] = f;
return new Int32Array(a.buffer)[0]; 
}

Clazz_overrideConstructor(Float, function(v){
 v == null && (v = 0);
 if (typeof v != "number") 
	v = Number(v);
 this.valueOf=function(){return v;}
});

Float.serialVersionUID=Float.prototype.serialVersionUID=-2671257302660747028;
Float.MIN_VALUE=Float.prototype.MIN_VALUE=1.4e-45;
Float.MAX_VALUE=Float.prototype.MAX_VALUE=3.4028235e+38;
Float.NEGATIVE_INFINITY=Number.NEGATIVE_INFINITY;
Float.POSITIVE_INFINITY=Number.POSITIVE_INFINITY;
Float.NaN=Number.NaN;
Float.TYPE=Float.prototype.TYPE=Float;

Clazz_defineMethod(Float,"parseFloat",
function(s){
if(s==null){
throw new NumberFormatException("null");
}
if (typeof s == "number")return s;  // important -- typeof NaN is "number" and is OK here
var floatVal=Number(s);
if(isNaN(floatVal)){
throw new NumberFormatException("Not a Number : "+s);
}
return floatVal;
},"String");
Float.parseFloat=Float.prototype.parseFloat;

Clazz_overrideMethod(Float,"$valueOf",
function(s){
return new Float(s);
});

Float.$valueOf=Float.prototype.$valueOf;

Clazz_defineMethod(Float,"isNaN",
function(num){
return isNaN(arguments.length == 1 ? num : this.valueOf());
},"Number");
Float.isNaN=Float.prototype.isNaN;
Clazz_defineMethod(Float,"isInfinite",
function(num){
return!isFinite(arguments.length == 1 ? num : this.valueOf());
},"Number");
Float.isInfinite=Float.prototype.isInfinite;

Clazz_overrideMethod(Float,"equals",
function(s){
if(s==null||!Clazz_instanceOf(s,Float)){
return false;
}
return s.valueOf()==this.valueOf();
},"Object");

java.lang.Double=Double=function(){
Clazz_instantialize(this,arguments);
};
Clazz_decorateAsType(Double,"Double",Number,Comparable,null,true);
Double.prototype.valueOf=function(){return 0;};
Double.toString=Double.prototype.toString=function(){
if(arguments.length!=0){
return Clazz._floatToString(arguments[0]);
}else if(this===Double){
return"class java.lang.Double";
}
return Clazz._floatToString(this.valueOf());
};

Clazz_overrideConstructor(Double, function(v){
 v == null && (v = 0);
 if (typeof v != "number") 
	v = Double.parseDouble(v);
 this.valueOf=function(){return v;};
}); // BH

Double.serialVersionUID=Double.prototype.serialVersionUID=-9172774392245257468;
Double.MIN_VALUE=Double.prototype.MIN_VALUE=4.9e-324;
Double.MAX_VALUE=Double.prototype.MAX_VALUE=1.7976931348623157e+308;
Double.NEGATIVE_INFINITY=Number.NEGATIVE_INFINITY;
Double.POSITIVE_INFINITY=Number.POSITIVE_INFINITY;
Double.NaN=Number.NaN;
Double.TYPE=Double.prototype.TYPE=Double;

Clazz_defineMethod(Double,"isNaN",
function(num){
return isNaN(arguments.length == 1 ? num : this.valueOf());
},"Number");
Double.isNaN=Double.prototype.isNaN;
Clazz_defineMethod(Double,"isInfinite",
function(num){
return!isFinite(arguments.length == 1 ? num : this.valueOf());
},"Number");
Double.isInfinite=Double.prototype.isInfinite;

Clazz_defineMethod(Double,"parseDouble",
function(s){
if(s==null){
throw new NumberFormatException("null");
}
if (typeof s == "number")return s;  // important -- typeof NaN is "number" and is OK here
var doubleVal=Number(s);
if(isNaN(doubleVal)){
throw new NumberFormatException("Not a Number : "+s);
}
return doubleVal;
},"String");
Double.parseDouble=Double.prototype.parseDouble;


Clazz_defineMethod(Double,"$valueOf",
function(v){
return new Double(v);
},"Number");

Double.$valueOf=Double.prototype.$valueOf;

Clazz_overrideMethod(Double,"equals",
function(s){
if(s==null||!Clazz_instanceOf(s,Double)){
return false;
}
return s.valueOf()==this.valueOf();
},"Object");


Boolean = java.lang.Boolean = Boolean || function () {Clazz_instantialize (this, arguments);};
if (Clazz._supportsNativeObject) {
	for (var i = 0; i < Clazz._extendedObjectMethods.length; i++) {
		var p = Clazz._extendedObjectMethods[i];
		Boolean.prototype[p] = Clazz._O.prototype[p];
	}
}
Boolean.__CLASS_NAME__="Boolean";
Clazz_implementOf(Boolean,[java.io.Serializable,java.lang.Comparable]);
Boolean.equals=Clazz._innerFunctions.equals;
Boolean.getName=Clazz._innerFunctions.getName;
Boolean.serialVersionUID=Boolean.prototype.serialVersionUID=-3665804199014368530;


Clazz_overrideConstructor(Boolean,
function(s){
	var b = ((typeof s == "string" ? Boolean.toBoolean(s) : s) ? true : false);
	this.valueOf=function(){return b;};
},"~O");

Boolean.parseBoolean=Clazz_defineMethod(Boolean,"parseBoolean",
function(s){
return Boolean.toBoolean(s);
},"~S");
Clazz_defineMethod(Boolean,"booleanValue",
function(){
return this.valueOf();
});
Boolean.$valueOf=Clazz_overrideMethod(Boolean,"$valueOf",
function(b){
return((typeof b == "string"? "true".equalsIgnoreCase(b) : b)?Boolean.TRUE:Boolean.FALSE);
});


Clazz_overrideMethod(Boolean,"toString",
function(){
return this.valueOf()?"true":"false";
});
Clazz_overrideMethod(Boolean,"hashCode",
function(){
return this.valueOf()?1231:1237;
});
Clazz_overrideMethod(Boolean,"equals",
function(obj){
if(Clazz_instanceOf(obj,Boolean)){
return this.booleanValue()==obj.booleanValue();
}return false;
},"~O");
Boolean.getBoolean=Clazz_defineMethod(Boolean,"getBoolean",
function(name){
var result=false;
try{
result=Boolean.toBoolean(System.getProperty(name));
}catch(e){
if(Clazz_instanceOf(e,IllegalArgumentException)){
}else if(Clazz_instanceOf(e,NullPointerException)){
}else{
throw e;
}
}
return result;
},"~S");
Clazz_overrideMethod(Boolean,"compareTo",
function(b){
return(b.value==this.value?0:(this.value?1:-1));
},"Boolean");
Boolean.toBoolean=Clazz_defineMethod(Boolean,"toBoolean",
($fz=function(name){
return((name!=null)&&name.equalsIgnoreCase("true"));
},$fz.isPrivate=true,$fz),"~S");
Boolean.TRUE=Boolean.prototype.TRUE=new Boolean(true);
Boolean.FALSE=Boolean.prototype.FALSE=new Boolean(false);
Boolean.TYPE=Boolean.prototype.TYPE=Boolean;


Clazz._Encoding=new Object();

(function(Encoding) {

Encoding.UTF8="utf-8";
Encoding.UTF16="utf-16";
Encoding.ASCII="ascii";


Encoding.guessEncoding=function(str){
if(str.charCodeAt(0)==0xEF&&str.charCodeAt(1)==0xBB&&str.charCodeAt(2)==0xBF){
return Encoding.UTF8;
}else if(str.charCodeAt(0)==0xFF&&str.charCodeAt(1)==0xFE){
return Encoding.UTF16;
}else{
return Encoding.ASCII;
}
};

Encoding.guessEncodingArray=function(a){
if(a[0]==0xEF&&a[1]==0xBB&&a[2]==0xBF){
return Encoding.UTF8;
}else if(a[0]==0xFF&&a[1]==0xFE){
return Encoding.UTF16;
}else{
return Encoding.ASCII;
}
};

Encoding.readUTF8=function(str){
if (typeof str != "string") return Encoding.readUTF8Array(str);
var encoding=Encoding.guessEncoding(str);
var startIdx=0;
if(encoding==Encoding.UTF8){
startIdx=3;
}else if(encoding==Encoding.UTF16){
startIdx=2;
}
var arrs=new Array();
for(var i=startIdx;i<str.length;i++){
var charCode=str.charCodeAt(i);
if(charCode<0x80){
arrs[arrs.length]=str.charAt(i);
}else if(charCode>0xc0&&charCode<0xe0){
var c1=charCode&0x1f;
i++;
var c2=str.charCodeAt(i)&0x3f;
var c=(c1<<6)+c2;
arrs[arrs.length]=String.fromCharCode(c);
}else if(charCode>=0xe0){
var c1=charCode&0x0f;
i++;
var c2=str.charCodeAt(i)&0x3f;
i++;
var c3=str.charCodeAt(i)&0x3f;
var c=(c1<<12)+(c2<<6)+c3;
arrs[arrs.length]=String.fromCharCode(c);
}
}
return arrs.join('');
};

Encoding.readUTF8Array=function(a){
var encoding=Encoding.guessEncodingArray(a);
var startIdx=0;
if(encoding==Encoding.UTF8){
startIdx=3;
}else if(encoding==Encoding.UTF16){
startIdx=2;
}
var arrs=new Array();
for(var i=startIdx;i<a.length;i++){
var charCode=a[i];
if(charCode<0x80){
arrs[arrs.length]=String.fromCharCode(charCode);
}else if(charCode>0xc0&&charCode<0xe0){
var c1=charCode&0x1f;
var c2=a[++i]&0x3f;
var c=(c1<<6)+c2;
arrs[arrs.length]=String.fromCharCode(c);
}else if(charCode>=0xe0){
var c1=charCode&0x0f;
var c2=a[++i]&0x3f;
var c3=a[++i]&0x3f;
var c=(c1<<12)+(c2<<6)+c3;
arrs[arrs.length]=String.fromCharCode(c);
}
}
return arrs.join('');
};

Encoding.convert2UTF8=function(str){
var encoding=this.guessEncoding(str);
var startIdx=0;
if(encoding==Encoding.UTF8){
return str;
}else if(encoding==Encoding.UTF16){
startIdx=2;
}

var offset=0;
var arrs=new Array(offset+str.length-startIdx);

for(var i=startIdx;i<str.length;i++){
var charCode=str.charCodeAt(i);
if(charCode<0x80){
arrs[offset+i-startIdx]=str.charAt(i);
}else if(charCode<=0x07ff){
var c1=0xc0+((charCode&0x07c0)>>6);
var c2=0x80+(charCode&0x003f);
arrs[offset+i-startIdx]=String.fromCharCode(c1)+String.fromCharCode(c2);
}else{
var c1=0xe0+((charCode&0xf000)>>12);
var c2=0x80+((charCode&0x0fc0)>>6);
var c3=0x80+(charCode&0x003f);
arrs[offset+i-startIdx]=String.fromCharCode(c1)+String.fromCharCode(c2)+String.fromCharCode(c3);
}
}
return arrs.join('');
};
Encoding.base64Chars=new Array(
'A','B','C','D','E','F','G','H',
'I','J','K','L','M','N','O','P',
'Q','R','S','T','U','V','W','X',
'Y','Z','a','b','c','d','e','f',
'g','h','i','j','k','l','m','n',
'o','p','q','r','s','t','u','v',
'w','x','y','z','0','1','2','3',
'4','5','6','7','8','9','+','/'
);
Encoding.encodeBase64=function(str){
if(str==null||str.length==0)return str;
var b64=Encoding.base64Chars;
var length=str.length;
var index=0;
var buf=[];
var c0,c1,c2;
while(index<length){
c0=str.charCodeAt(index++);
buf[buf.length]=b64[c0>>2];
if(index<length){
c1=str.charCodeAt(index++);
buf[buf.length]=b64[((c0<<4)&0x30)|(c1>>4)];
if(index<length){
c2=str.charCodeAt(index++);
buf[buf.length]=b64[((c1<<2)&0x3c)|(c2>>6)];
buf[buf.length]=b64[c2&0x3F];
}else{
buf[buf.length]=b64[((c1<<2)&0x3c)];
buf[buf.length]='=';
}
}else{
buf[buf.length]=b64[(c0<<4)&0x30];
buf[buf.length]='=';
buf[buf.length]='=';
}
}
return buf.join('');
};
Encoding.decodeBase64=function(str){
if(str==null||str.length==0)return str;
var b64=Encoding.base64Chars;
var xb64=Encoding.xBase64Chars;
if(Encoding.xBase64Chars==null){
xb64=new Object();
for(var i=0;i<b64.length;i++){
xb64[b64[i]]=i;
}
Encoding.xBase64Chars=xb64;
}
var length=str.length;
var index=0;
var buf=[];
var c0,c1,c2,c3;
var c=0;
while(index<length&&c++<60000){
c0=xb64[str.charAt(index++)];
c1=xb64[str.charAt(index++)];
c2=xb64[str.charAt(index++)];
c3=xb64[str.charAt(index++)];
buf[buf.length]=String.fromCharCode(((c0<<2)&0xff)|c1>>4);
if(c2!=null){
buf[buf.length]=String.fromCharCode(((c1<<4)&0xff)|c2>>2);
if(c3!=null){
buf[buf.length]=String.fromCharCode(((c2<<6)&0xff)|c3);
}
}
}
return buf.join('');
};

if(String.prototype.$replace==null){
java.lang.String=String;
Clazz._setDeclared("String", String);

if(Clazz._supportsNativeObject){
for(var i=0;i<Clazz._extendedObjectMethods.length;i++){
var p=Clazz._extendedObjectMethods[i];
if("to$tring"==p||"toString"==p||"equals"==p||"hashCode"==p){
continue;
}
String.prototype[p]=Clazz._O.prototype[p];
}
}

Clazz_implementOf(String,[java.io.Serializable,CharSequence,Comparable]);

String.getName=Clazz._innerFunctions.getName;

String.serialVersionUID=String.prototype.serialVersionUID=-6849794470754667710;


;(function(sp) {

sp.$replace=function(c1,c2){
	if (c1 == c2 || this.indexOf (c1) < 0) return "" + this;
	if (c1.length == 1) {
		if ("\\$.*+|?^{}()[]".indexOf(c1) >= 0) 	c1 = "\\" + c1;
	} else {    
		c1=c1.replace(/([\\\$\.\*\+\|\?\^\{\}\(\)\[\]])/g,function($0,$1){return"\\"+$1;});
	}
	return this.replace(new RegExp(c1,"gm"),c2);
};
sp.$generateExpFunction=function(str){
var arr=[];
var orders=[];
var idx=0;
arr[0]="";
var i=0;
for(;i<str.length;i++){
var ch=str.charAt(i);
if(i!=str.length-1&&ch=='\\'){
i++;
var c=str.charAt(i);
if(c=='\\'){
arr[idx]+='\\';
}
arr[idx]+=c;
}else if(i!=str.length-1&&ch=='$'){
i++;
orders[idx]=parseInt(str.charAt(i));
idx++;
arr[idx]="";
}else if(ch=='\r'){
arr[idx]+="\\r";
}else if(ch=='\n'){
arr[idx]+="\\n";
}else if(ch=='\t'){
arr[idx]+="\\t";
}else if(ch=='\"'){
arr[idx]+="\\\"";
}else{
arr[idx]+=ch;
}
}
var funStr="f = function (";
var max=Math.max.apply({},orders);
for(i=0;i<=max;i++){
funStr+="$"+i;
if(i!=max){
funStr+=", ";
}
}
funStr+=") { return ";
for(i=0;i<arr.length-1;i++){
funStr+="\""+arr[i]+"\" + $"+orders[i]+" + ";
}
funStr+="\""+arr[i]+"\"; }";
return eval(funStr);
};

sp.replaceAll=function(exp,str){
var regExp=new RegExp(exp,"gm");
return this.replace(regExp,this.$generateExpFunction(str));
};
sp.replaceFirst=function(exp,str){
var regExp=new RegExp(exp,"m");
return this.replace(regExp,this.$generateExpFunction(str));
};
sp.matches=function(exp){
if(exp!=null){
exp="^("+exp+")$";
}
var regExp=new RegExp(exp,"gm");
var m=this.match(regExp);
return m!=null&&m.length!=0;
};
sp.regionMatches=function(ignoreCase,toffset,
other,ooffset,len){

if(typeof ignoreCase=="number"
||(ignoreCase!=true&&ignoreCase!=false)){
len=ooffset;
ooffset=other;
other=toffset;
toffset=ignoreCase;
ignoreCase=false;
}
var to=toffset;
var po=ooffset;

if((ooffset<0)||(toffset<0)||(toffset>this.length-len)||
(ooffset>other.length-len)){
return false;
}
var s1=this.substring(toffset,toffset+len);
var s2=other.substring(ooffset,ooffset+len);
if(ignoreCase){
s1=s1.toLowerCase();
s2=s2.toLowerCase();
}
return s1==s2;
};



sp.$plit=function(regex,limit){
if (!limit && regex == " ")
	return this.split(regex);

if(limit!=null&&limit>0){
if(limit==1){
return this;
}
var regExp=new RegExp("("+regex+")","gm");
var count=1;
var s=this.replace(regExp,function($0,$1){
count++;
if(count==limit){
return"@@_@@";
}else if(count>limit){
return $0;
}else{
return $0;
}
});
regExp=new RegExp(regex,"gm");
var arr=this.split(regExp);
if(arr.length>limit){
arr[limit-1]=s.substring(s.indexOf("@@_@@")+5);
arr.length=limit;
}
return arr;
}else{
var regExp=new RegExp(regex,"gm");
return this.split(regExp);
}
};

if (!sp.trim)
sp.trim=function(){
return this.replace(/^\s+/g,'').replace(/\s+$/g,'');
};

if (!sp.startsWith || !sp.endsWith) {
var sn=function(s, prefix,toffset){
var to=toffset;
var po=0;
var pc=prefix.length;

if((toffset<0)||(toffset>s.length-pc)){
return false;
}
while(--pc>=0){
if(s.charAt(to++)!=prefix.charAt(po++)){
return false;
}
}
return true;
};

sp.startsWith=function(prefix){
if(arguments.length==1){
return sn(this,arguments[0],0);
}else if(arguments.length==2){
return sn(this,arguments[0],arguments[1]);
}else{
return false;
}
};

sp.endsWith=function(suffix){
return sn(this, suffix,this.length-suffix.length);
};

}

sp.equals=function(anObject){
return this.valueOf()==anObject;
};

sp.equalsIgnoreCase=function(anotherString){
return(anotherString==null)?false:(this==anotherString
||this.toLowerCase()==anotherString.toLowerCase());
};


sp.hash=0;

sp.hashCode=function(){
var h=this.hash;
if(h==0){
var off=0;
var len=this.length;
for(var i=0;i<len;i++){
h=31*h+this.charCodeAt(off++);
h&=0xffffffff;
}
this.hash=h;
}
return h;
};

sp.getBytes=function(){
if(arguments.length==4){
return this.getChars(arguments[0],arguments[1],arguments[2],arguments[3]);
}
var s=this;
if(arguments.length==1){
var cs=arguments[0].toString().toLowerCase();
var charset=[
"utf-8","UTF8","us-ascii","iso-8859-1","8859_1","gb2312","gb18030","gbk"
];
var existed=false;
for(var i=0;i<charset.length;i++){
if(charset[i]==cs){
existed=true;
break;
}
}
if(!existed){
throw new java.io.UnsupportedEncodingException();
}
if(cs=="utf-8"||cs=="utf8"){
s=Encoding.convert2UTF8(this);
}
}
var arrs=new Array(s.length);
var c=0,ii=0;
for(var i=0;i<s.length;i++){
c=s.charCodeAt(i);
if(c>255){
arrs[ii]=0x1a;
arrs[ii+1]=c&0xff;
arrs[ii+2]=(c&0xff00)>>8;
ii+=2;
}else{
arrs[ii]=c;
}
ii++;
}
return Clazz_newByteArray(arrs);
};


sp.contains = function(a) {return this.indexOf(a) >= 0}  // bh added
sp.compareTo = function(a){return this > a ? 1 : this < a ? -1 : 0} // bh added



sp.toCharArray=function(){
var result=new Array(this.length);
for(var i=0;i<this.length;i++){
result[i]=this.charAt(i);
}
return result;
};
String.value0f=String.valueOf;
String.valueOf=function(o){
if(o=="undefined"){
return String.value0f();
}
if(o instanceof Array){
if(arguments.length==1){
return o.join('');
}else{
var off=arguments[1];
var len=arguments[2];
var oo=new Array(len);
for(var i=0;i<len;i++){
oo[i]=o[off+i];
}
return oo.join('');
}
}
return""+o;
};

sp.subSequence=function(beginIndex,endIndex){
return this.substring(beginIndex,endIndex);
};

sp.compareToIgnoreCase=function(str){
if(str==null){
throw new NullPointerException();
}
var s1=this.toUpperCase();
var s2=str.toUpperCase();
if(s1==s2){
return 0;
}else{
var s1=this.toLowerCase();
var s2=str.toLowerCase();
if(s1==s2){
return 0;
}else if(s1>s2){
return 1;
}else{
return-1;
}
}
};

sp.contentEquals=function(sb){
if(this.length!=sb.length()){
return false;
}
var v=sb.getValue();
var i=0;
var j=0;
var n=this.length;
while(n--!=0){
if(this.charCodeAt(i++)!=v[j++]){
return false;
}
}
return true;
};

sp.getChars=function(srcBegin,srcEnd,dst,dstBegin){
if(srcBegin<0){
throw new StringIndexOutOfBoundsException(srcBegin);
}
if(srcEnd>this.length){
throw new StringIndexOutOfBoundsException(srcEnd);
}
if(srcBegin>srcEnd){
throw new StringIndexOutOfBoundsException(srcEnd-srcBegin);
}
if(dst==null){
throw new NullPointerException();
}
for(var i=0;i<srcEnd-srcBegin;i++){
dst[dstBegin+i]=this.charAt(srcBegin+i);
}
};

sp.$lastIndexOf=sp.lastIndexOf;
sp.lastIndexOf=function(s,last){
if(last!=null&&last+this.length<=0){
return-1;
}
if(last!=null){
return this.$lastIndexOf(s,last);
}else{
return this.$lastIndexOf(s);
}
};

sp.intern=function(){
return this.valueOf();
};
String.copyValueOf=sp.copyValueOf=function(){
if(arguments.length==1){
return String.instantialize(arguments[0]);
}else{
return String.instantialize(arguments[0],arguments[1],arguments[2]);
}
};

sp.codePointAt || (sp.codePointAt = sp.charCodeAt); // Firefox only


})(String.prototype);

var textDecoder = new TextDecoder();

String.instantialize=function(){
switch (arguments.length) {
case 0:
	return new String();
case 1:
	var x=arguments[0];
  if (x.BYTES_PER_ELEMENT) {
		return (x.length == 0 ? "" : typeof x[0]=="number" ? textDecoder.decode(x) : x.join(''));
  }
  if (x instanceof Array){
		return (x.length == 0 ? "" : typeof x[0]=="number" ? textDecoder.decode(new Uint8Array(x)) : x.join(''));
  }
	if(typeof x=="string"||x instanceof String){
		return new String(x);
	}
	return""+x;
case 2:	
	var x=arguments[0];
	var hibyte=arguments[1];
	if(typeof hibyte=="string"){
		return String.instantialize(x,0,x.length,hibyte);
	}
	return String.instantialize(x,hibyte,0,x.length);
case 3:
	var bytes=arguments[0];
	var offset=arguments[1];
	var length=arguments[2];
	if(arguments[2]instanceof Array){
		bytes=arguments[2];
		offset=arguments[0];
		length=arguments[1];
	}
	var arr=new Array(length);
	if(offset<0||length+offset>bytes.length){
		throw new IndexOutOfBoundsException();
	}
	if(length>0){
		var isChar=(bytes[offset].length!=null);
		if(isChar){
			for(var i=0;i<length;i++){
				arr[i]=bytes[offset+i];
			}
		}else{
			for(var i=0;i<length;i++){
				arr[i]=String.fromCharCode(bytes[offset+i]);
			}
		}
	}
	return arr.join('');
case 4:
	var bytes=arguments[0];
	var y=arguments[3];
	if(typeof y=="string"||y instanceof String){
		var offset=arguments[1];
		var length=arguments[2];
		var arr=new Uint8Array(length);
		for(var i=0;i<length;i++){
			arr[i]=bytes[offset+i];
		}
		return textDecoder.decode(arr);
	}
	var count=arguments[3];
	var offset=arguments[2];
	var hibyte=arguments[1];
	var value=new Array(count);
	if(hibyte==0){
		for(var i=count;i-->0;){
			value[i]=String.fromCharCode(bytes[i+offset]&0xff);
		}
	}else{
		hibyte<<=8;
		for(var i=count;i-->0;){
			value[i]=String.fromCharCode(hibyte|(bytes[i+offset]&0xff));
		}
	}
	return value.join('');
default:
	var s="";
	for(var i=0;i<arguments.length;i++){
		s+=arguments[i];
	}
	return s;
}
};

if(navigator.userAgent.toLowerCase().indexOf("chrome")!=-1){
	String.prototype.toString=function(){return this.valueOf();};
}

}

})(Clazz._Encoding);

var c$;

c$=Clazz_decorateAsClass(function(){
this.value=0;
Clazz_instantialize(this,arguments);
},java.lang,"Character",null,[java.io.Serializable,Comparable]);
Clazz_makeConstructor(c$,
function(value){
this.value=value;
},"~N");
Clazz_defineMethod(c$,"charValue",
function(){
return this.value;
});
Clazz_overrideMethod(c$,"hashCode",
function(){
return(this.value).charCodeAt(0);
});
Clazz_overrideMethod(c$,"equals",
function(obj){
if(Clazz_instanceOf(obj,Character)){
return(this.value).charCodeAt(0)==((obj).charValue()).charCodeAt(0);
}return false;
},"~O");
Clazz_overrideMethod(c$,"compareTo",
function(c){
return(this.value).charCodeAt(0)-(c.value).charCodeAt(0);
},"Character");
c$.toLowerCase=Clazz_defineMethod(c$,"toLowerCase",
function(c){
return(""+c).toLowerCase().charAt(0);
},"~N");
c$.toUpperCase=Clazz_defineMethod(c$,"toUpperCase",
function(c){
return(""+c).toUpperCase().charAt(0);
},"~N");
c$.isDigit=Clazz_defineMethod(c$,"isDigit",
function(c){
c = c.charCodeAt(0);
return (48 <= c && c <= 57);
},"~N");
c$.isUpperCase=Clazz_defineMethod(c$,"isUpperCase",
function(c){
c = c.charCodeAt(0);
return (65 <= c && c <= 90);
},"~N");
c$.isLowerCase=Clazz_defineMethod(c$,"isLowerCase",
function(c){
c = c.charCodeAt(0);
return (97 <= c && c <= 122);
},"~N");
c$.isWhitespace=Clazz_defineMethod(c$,"isWhitespace",
function(c){
c = (c).charCodeAt(0);
return (c >= 0x1c && c <= 0x20 || c >= 0x9 && c <= 0xd || c == 0x1680
	|| c >= 0x2000 && c != 0x2007 && (c <= 0x200b || c == 0x2028 || c == 0x2029 || c == 0x3000));
},"~N");
c$.isLetter=Clazz_defineMethod(c$,"isLetter",
function(c){
c = c.charCodeAt(0);
return (65 <= c && c <= 90 || 97 <= c && c <= 122);
},"~N");
c$.isLetterOrDigit=Clazz_defineMethod(c$,"isLetterOrDigit",
function(c){
c = c.charCodeAt(0);
return (65 <= c && c <= 90 || 97 <= c && c <= 122 || 48 <= c && c <= 57);
},"~N");
c$.isSpaceChar=Clazz_defineMethod(c$,"isSpaceChar",
function(c){
 var i = c.charCodeAt(0);
if(i==0x20||i==0xa0||i==0x1680)return true;
if(i<0x2000)return false;
return i<=0x200b||i==0x2028||i==0x2029||i==0x202f||i==0x3000;
},"~N");
c$.digit=Clazz_defineMethod(c$,"digit",
function(c,radix){
var i = c.charCodeAt(0);
if(radix >= 2 && radix <= 36){
	if(i < 128){
		var result = -1;
		if(48 <= i && i <= 57){
		result = i - 48;
		}else if(97 <= i && i <= 122){
		result = i - 87;
		}else if(65 <= i && i <= 90){
		result=i-(55);
		}
		return (result < radix ? result : -1);
	}
}
return -1;
},"~N,~N");
Clazz_overrideMethod(c$,"toString",
function(){
var buf=[this.value];
return String.valueOf(buf);
});
c$.toString=Clazz_overrideMethod(c$,"toString",
function(c){
{
if(this===Character){
return"class java.lang.Character";
}
}return String.valueOf(c);
},"~N");
c$.TYPE=c$;



Clazz._ArrayWrapper = function(a, type) {
 return {
   a: a,
   __CLASS_NAME__:"Array",
   superClazz: Array,
   getComponentType: function() {return type},
   instanceOf: function(o) { return  Clazz_instanceOf(type, o) },
   getName: function() { return this.__CLASS_NAME__ }
 };
}
c$=Clazz_declareType(java.lang.reflect,"Array");
c$.newInstance=Clazz_defineMethod(c$,"newInstance",
function(componentType,size){
var a = Clazz_newArray(size);
 a.getClass = function() { return new Clazz._ArrayWrapper(this, componentType);};
return a;
},"Class,~N");

c$.getLength = function(o){return o.length};
c$.get = function(o, i){return o[i]};

javautil.Date=Date;
Date.TYPE="javautil.Date";
Date.__CLASS_NAME__="Date";
Clazz._setDeclared("java.util.Date", Date);
Clazz._setDeclared("Date", Date);
Clazz_implementOf(Date,[java.io.Serializable,java.lang.Comparable]);
Clazz_defineMethod(javautil.Date,"clone",
function(){
return new Date(this.getTime());
});

Clazz_defineMethod(javautil.Date,"before",
function(when){
return this.getTime()<when.getTime();
},"javautil.Date");
Clazz_defineMethod(javautil.Date,"after",
function(when){
return this.getTime()>when.getTime();
},"javautil.Date");
Clazz_defineMethod(javautil.Date,"equals",
function(obj){
return Clazz_instanceOf(obj,javautil.Date)&&this.getTime()==(obj).getTime();
},"Object");
Clazz_defineMethod(javautil.Date,"compareTo",
function(anotherDate){
if (anotherDate == null)return 1;
var thisTime=this.getTime();
var anotherTime=anotherDate.getTime();
return(thisTime<anotherTime?-1:(thisTime==anotherTime?0:1));
},"Object");
Clazz_overrideMethod(javautil.Date,"hashCode",
function(){
var ht=this.getTime();
return parseInt(ht)^parseInt((ht>>32));
});

c$=Clazz_decorateAsClass(function(){
this.source=null;
Clazz_instantialize(this,arguments);
},javautil,"EventObject",null,java.io.Serializable);
Clazz_makeConstructor(c$,
function(source){
if(source!=null)this.source=source;
else throw new IllegalArgumentException();
},"~O");
Clazz_defineMethod(c$,"getSource",
function(){
return this.source;
});
Clazz_overrideMethod(c$,"toString",
function(){
return this.getClass().getName()+"[source="+String.valueOf(this.source)+']';
});
Clazz_declareInterface(javautil,"EventListener");

c$=Clazz_decorateAsClass(function(){
this.listener=null;
Clazz_instantialize(this,arguments);
},javautil,"EventListenerProxy",null,javautil.EventListener);
Clazz_makeConstructor(c$,
function(listener){
this.listener=listener;
},"javautil.EventListener");
Clazz_defineMethod(c$,"getListener",
function(){
return this.listener;
});
Clazz_declareInterface(javautil,"Iterator");

Clazz_declareInterface(javautil,"ListIterator",javautil.Iterator);
Clazz_declareInterface(javautil,"Enumeration");
Clazz_declareInterface(javautil,"Collection",Iterable);

Clazz_declareInterface(javautil,"Set",javautil.Collection);
Clazz_declareInterface(javautil,"Map");
Clazz_declareInterface(javautil.Map,"Entry");

Clazz_declareInterface(javautil,"List",javautil.Collection);

Clazz_declareInterface(javautil,"Queue",javautil.Collection);
Clazz_declareInterface(javautil,"RandomAccess");
c$=Clazz_decorateAsClass(function(){
this.detailMessage=null;
this.cause=null;
this.stackTrace=null;
Clazz_instantialize(this,arguments);
},java.lang,"Throwable",null,java.io.Serializable);
Clazz_prepareFields(c$,function(){
this.cause=this;
});
Clazz_makeConstructor(c$,
function(){
this.fillInStackTrace();
});
Clazz_makeConstructor(c$,
function(message,cause){
this.fillInStackTrace();
if (!cause && typeof message == "object") {
	cause = message;
	message = cause.toString();
}
cause && (this.cause=cause);
this.detailMessage=message;
},"~S,Throwable");




Clazz_defineMethod(c$,"getMessage",
function(){
return (this.message || this.detailMessage || this.toString());
});
Clazz_defineMethod(c$,"getLocalizedMessage",
function(){
return this.getMessage();
});
Clazz_defineMethod(c$,"getCause",
function(){
return(this.cause===this?null:this.cause);
});
Clazz_defineMethod(c$,"initCause",
function(cause){
if(this.cause!==this)throw new IllegalStateException("Can't overwrite cause");
if(cause===this)throw new IllegalArgumentException("Self-causation not permitted");
this.cause=cause;
return this;
},"Throwable");
Clazz_overrideMethod(c$,"toString",
function(){
var s=this.getClass().getName();
var message=this.message || this.detailMessage;
return(message ? s+": "+message : s);
});
Clazz_defineMethod(c$,"printStackTrace",
function(){
System.err.println(this.getStackTrace ? this.getStackTrace() : this.message + " " + Clazz_getStackTrace());
});

Clazz_defineMethod(c$,"getStackTrace",
function(){
var s = "" + this + "\n";
for(var i=0;i<this.stackTrace.length;i++){
 var t=this.stackTrace[i];
	var x=t.methodName.indexOf("(");
	var n=t.methodName.substring(0,x).replace(/\s+/g,"");
	if(n!="construct"||t.nativeClazz==null
		 ||Clazz_getInheritedLevel(t.nativeClazz,Throwable)<0){
				s += t + "\n";
	}
}
return s;
});


Clazz_defineMethod(c$,"printStackTrace",
function(s){
this.printStackTrace();
},"java.io.PrintStream");
Clazz_defineMethod(c$,"printStackTrace",
function(s){
this.printStackTrace();
},"java.io.PrintWriter");
Clazz_defineMethod(c$,"fillInStackTrace",
function(){
this.stackTrace=new Array();
var caller=arguments.callee.caller;
var superCaller=null;
var callerList=new Array();
var index=Clazz._callingStackTraces.length-1;
var noLooping=true;
while(index>-1||caller!=null){
var clazzName=null;
var nativeClass=null;
if(!noLooping||caller==Clazz_tryToSearchAndExecute||caller==Clazz_superCall||caller==null){
if(index<0){
break;
}
noLooping=true;
superCaller=Clazz._callingStackTraces[index].caller;
nativeClass=Clazz._callingStackTraces[index].owner;
index--;
}else{
superCaller=caller;
if(superCaller.claxxOwner!=null){
nativeClass=superCaller.claxxOwner;
}else if(superCaller.exClazz!=null){
nativeClass=superCaller.exClazz;
}
}
var st=new StackTraceElement(
((nativeClass!=null&&nativeClass.__CLASS_NAME__.length!=0)?
nativeClass.__CLASS_NAME__:"anonymous"),
((superCaller.exName==null)?"anonymous":superCaller.exName)
+" ("+Clazz_getParamsType(superCaller.arguments)+")",
null,-1);
st.nativeClazz=nativeClass;
this.stackTrace[this.stackTrace.length]=st;
for(var i=0;i<callerList.length;i++){
if(callerList[i]==superCaller){

var st=new StackTraceElement("lost","missing",null,-3);
st.nativeClazz=null;
this.stackTrace[this.stackTrace.length]=st;
noLooping=false;

}
}
if(superCaller!=null){
callerList[callerList.length]=superCaller;
}
caller=superCaller.arguments.callee.caller;
}
Clazz._initializingException=false;
return this;
});
Clazz_defineMethod(c$,"setStackTrace",
function(stackTrace){
var defensiveCopy=stackTrace.clone();
for(var i=0;i<defensiveCopy.length;i++)if(defensiveCopy[i]==null)throw new NullPointerException("stackTrace["+i+"]");

this.stackTrace=defensiveCopy;
},"~A");

c$=Clazz_decorateAsClass(function(){
this.declaringClass=null;
this.methodName=null;
this.fileName=null;
this.lineNumber=0;
Clazz_instantialize(this,arguments);
},java.lang,"StackTraceElement",null,java.io.Serializable);
Clazz_makeConstructor(c$,
function(cls,method,file,line){
if(cls==null||method==null){
throw new NullPointerException();
}this.declaringClass=cls;
this.methodName=method;
this.fileName=file;
this.lineNumber=line;
},"~S,~S,~S,~N");
Clazz_overrideMethod(c$,"equals",
function(obj){
if(!(Clazz_instanceOf(obj,StackTraceElement))){
return false;
}var castObj=obj;
if((this.methodName==null)||(castObj.methodName==null)){
return false;
}if(!this.getMethodName().equals(castObj.getMethodName())){
return false;
}if(!this.getClassName().equals(castObj.getClassName())){
return false;
}var localFileName=this.getFileName();
if(localFileName==null){
if(castObj.getFileName()!=null){
return false;
}}else{
if(!localFileName.equals(castObj.getFileName())){
return false;
}}if(this.getLineNumber()!=castObj.getLineNumber()){
return false;
}return true;
},"~O");
Clazz_defineMethod(c$,"getClassName",
function(){
return(this.declaringClass==null)?"<unknown class>":this.declaringClass;
});
Clazz_defineMethod(c$,"getFileName",
function(){
return this.fileName;
});
Clazz_defineMethod(c$,"getLineNumber",
function(){
return this.lineNumber;
});
Clazz_defineMethod(c$,"getMethodName",
function(){
return(this.methodName==null)?"<unknown method>":this.methodName;
});
Clazz_overrideMethod(c$,"hashCode",
function(){
if(this.methodName==null){
return 0;
}return this.methodName.hashCode()^this.declaringClass.hashCode();
});
Clazz_defineMethod(c$,"isNativeMethod",
function(){
return this.lineNumber==-2;
});
Clazz_overrideMethod(c$,"toString",
function(){
var buf = this.getClassName() + "." + this.getMethodName();
if(this.isNativeMethod()){
buf += ("(Native Method)");
}else{
var fName=this.getFileName();
if(fName==null){
buf += ("(Unknown Source)");
}else{
var lineNum=this.getLineNumber();
buf += ('(');
buf += (fName);
if(lineNum>=0){
buf += (':');
buf = buf + lineNum;
}buf += (')');
}}return buf;
});
TypeError.prototype.getMessage || (TypeError.prototype.getMessage = function(){ return (this.message || this.toString()) + (this.getStackTrace ? this.getStackTrace() : Clazz_getStackTrace())});


Clazz_Error = Error;

Clazz_declareTypeError = function (prefix, name, clazzParent, interfacez, 
		parentClazzInstance, _declareType) {
	var f = function () {
		Clazz_instantialize (this, arguments);
    return Clazz_Error();
	};
	return Clazz_decorateAsClass (f, prefix, name, clazzParent, interfacez, 
			parentClazzInstance);
};

Clazz._Error || (Clazz._Error = Error);
Clazz_decorateAsClass (function (){Clazz_instantialize(this, arguments);return Clazz._Error();}, java.lang, "Error", Throwable);



c$=Clazz_declareType(java.lang,"LinkageError",Error);

c$=Clazz_declareType(java.lang,"IncompatibleClassChangeError",LinkageError);

c$=Clazz_declareType(java.lang,"AbstractMethodError",IncompatibleClassChangeError);

c$=Clazz_declareType(java.lang,"AssertionError",Error);
Clazz_makeConstructor(c$,
function(detailMessage){
Clazz_superConstructor(this,AssertionError,["" + detailMessage,(Clazz_instanceOf(detailMessage,Throwable)?detailMessage:null)]);
},"~O");

c$=Clazz_declareType(java.lang,"ClassCircularityError",LinkageError);

c$=Clazz_declareType(java.lang,"ClassFormatError",LinkageError);

c$=Clazz_decorateAsClass(function(){
this.exception=null;
Clazz_instantialize(this,arguments);
},java.lang,"ExceptionInInitializerError",LinkageError);
Clazz_makeConstructor(c$,
function(){
Clazz_superConstructor(this,ExceptionInInitializerError);
this.initCause(null);
});
Clazz_makeConstructor(c$,
function(detailMessage){
Clazz_superConstructor(this,ExceptionInInitializerError,[detailMessage]);
this.initCause(null);
},"~S");
Clazz_makeConstructor(c$,
function(exception){
Clazz_superConstructor(this,ExceptionInInitializerError);
this.exception=exception;
this.initCause(exception);
},"Throwable");
Clazz_defineMethod(c$,"getException",
function(){
return this.exception;
});
Clazz_overrideMethod(c$,"getCause",
function(){
return this.exception;
});

c$=Clazz_declareType(java.lang,"IllegalAccessError",IncompatibleClassChangeError);

c$=Clazz_declareType(java.lang,"InstantiationError",IncompatibleClassChangeError);

c$=Clazz_declareType(java.lang,"VirtualMachineError",Error);

c$=Clazz_declareType(java.lang,"InternalError",VirtualMachineError);

c$=Clazz_declareType(java.lang,"NoClassDefFoundError",LinkageError);

c$=Clazz_declareType(java.lang,"NoSuchFieldError",IncompatibleClassChangeError);

c$=Clazz_declareType(java.lang,"NoSuchMethodError",IncompatibleClassChangeError);

c$=Clazz_declareType(java.lang,"OutOfMemoryError",VirtualMachineError);

c$=Clazz_declareType(java.lang,"StackOverflowError",VirtualMachineError);

c$=Clazz_declareType(java.lang,"UnknownError",VirtualMachineError);

c$=Clazz_declareType(java.lang,"UnsatisfiedLinkError",LinkageError);

c$=Clazz_declareType(java.lang,"UnsupportedClassVersionError",ClassFormatError);

c$=Clazz_declareType(java.lang,"VerifyError",LinkageError);

c$=Clazz_declareType(java.lang,"ThreadDeath",Error);
Clazz_makeConstructor(c$,
function(){
Clazz_superConstructor(this,ThreadDeath,[]);
});

c$=Clazz_declareType(java.lang,"Exception",Throwable);

c$=Clazz_declareType(java.lang,"RuntimeException",Exception);

c$=Clazz_declareType(java.lang,"ArithmeticException",RuntimeException);

c$=Clazz_declareType(java.lang,"IndexOutOfBoundsException",RuntimeException);

c$=Clazz_declareType(java.lang,"ArrayIndexOutOfBoundsException",IndexOutOfBoundsException);
Clazz_makeConstructor(c$,
function(index){
Clazz_superConstructor(this,ArrayIndexOutOfBoundsException,["Array index out of range: "+index]);
},"~N");

c$=Clazz_declareType(java.lang,"ArrayStoreException",RuntimeException);

c$=Clazz_declareType(java.lang,"ClassCastException",RuntimeException);

c$=Clazz_decorateAsClass(function(){
this.ex=null;
Clazz_instantialize(this,arguments);
},java.lang,"ClassNotFoundException",Exception);
Clazz_makeConstructor(c$,
function(){
Clazz_superConstructor(this,ClassNotFoundException,[Clazz_castNullAs("Throwable")]);
});
Clazz_makeConstructor(c$,
function(detailMessage){
Clazz_superConstructor(this,ClassNotFoundException,[detailMessage,null]);
},"~S");
Clazz_makeConstructor(c$,
function(detailMessage,exception){
Clazz_superConstructor(this,ClassNotFoundException,[detailMessage]);
this.ex=exception;
},"~S,Throwable");
Clazz_defineMethod(c$,"getException",
function(){
return this.ex;
});
Clazz_overrideMethod(c$,"getCause",
function(){
return this.ex;
});

c$=Clazz_declareType(java.lang,"CloneNotSupportedException",Exception);

c$=Clazz_declareType(java.lang,"IllegalAccessException",Exception);

c$=Clazz_declareType(java.lang,"IllegalArgumentException",RuntimeException);
Clazz_makeConstructor(c$,
function(cause){
Clazz_superConstructor(this,IllegalArgumentException,[(cause==null?null:cause.toString()),cause]);
},"Throwable");

c$=Clazz_declareType(java.lang,"IllegalMonitorStateException",RuntimeException);

c$=Clazz_declareType(java.lang,"IllegalStateException",RuntimeException);
Clazz_makeConstructor(c$,
function(cause){
Clazz_superConstructor(this,IllegalStateException,[(cause==null?null:cause.toString()),cause]);
},"Throwable");

c$=Clazz_declareType(java.lang,"IllegalThreadStateException",IllegalArgumentException);

c$=Clazz_declareType(java.lang,"InstantiationException",Exception);

c$=Clazz_declareType(java.lang,"InterruptedException",Exception);

c$=Clazz_declareType(java.lang,"NegativeArraySizeException",RuntimeException);

c$=Clazz_declareType(java.lang,"NoSuchFieldException",Exception);

c$=Clazz_declareType(java.lang,"NoSuchMethodException",Exception);

c$=Clazz_declareType(java.lang,"NullPointerException",RuntimeException);

c$=Clazz_declareType(java.lang,"NumberFormatException",IllegalArgumentException);

c$=Clazz_declareType(java.lang,"SecurityException",RuntimeException);
Clazz_makeConstructor(c$,
function(cause){
Clazz_superConstructor(this,SecurityException,[(cause==null?null:cause.toString()),cause]);
},"Throwable");

c$=Clazz_declareType(java.lang,"StringIndexOutOfBoundsException",IndexOutOfBoundsException);
Clazz_makeConstructor(c$,
function(index){
Clazz_superConstructor(this,StringIndexOutOfBoundsException,["String index out of range: "+index]);
},"~N");

c$=Clazz_declareType(java.lang,"UnsupportedOperationException",RuntimeException);
Clazz_makeConstructor(c$,
function(){
Clazz_superConstructor(this,UnsupportedOperationException,[]);
});
Clazz_makeConstructor(c$,
function(cause){
Clazz_superConstructor(this,UnsupportedOperationException,[(cause==null?null:cause.toString()),cause]);
},"Throwable");

c$=Clazz_decorateAsClass(function(){
this.target=null;
Clazz_instantialize(this,arguments);
},java.lang.reflect,"InvocationTargetException",Exception);
Clazz_makeConstructor(c$,
function(){
Clazz_superConstructor(this,java.lang.reflect.InvocationTargetException,[Clazz_castNullAs("Throwable")]);
});
Clazz_makeConstructor(c$,
function(exception){
Clazz_superConstructor(this,java.lang.reflect.InvocationTargetException,[null,exception]);
this.target=exception;
},"Throwable");
Clazz_makeConstructor(c$,
function(exception,detailMessage){
Clazz_superConstructor(this,java.lang.reflect.InvocationTargetException,[detailMessage,exception]);
this.target=exception;
},"Throwable,~S");
Clazz_defineMethod(c$,"getTargetException",
function(){
return this.target;
});
Clazz_overrideMethod(c$,"getCause",
function(){
return this.target;
});

c$=Clazz_decorateAsClass(function(){
this.undeclaredThrowable=null;
Clazz_instantialize(this,arguments);
},java.lang.reflect,"UndeclaredThrowableException",RuntimeException);
Clazz_makeConstructor(c$,
function(exception){
Clazz_superConstructor(this,java.lang.reflect.UndeclaredThrowableException);
this.undeclaredThrowable=exception;
this.initCause(exception);
},"Throwable");
Clazz_makeConstructor(c$,
function(exception,detailMessage){
Clazz_superConstructor(this,java.lang.reflect.UndeclaredThrowableException,[detailMessage]);
this.undeclaredThrowable=exception;
this.initCause(exception);
},"Throwable,~S");
Clazz_defineMethod(c$,"getUndeclaredThrowable",
function(){
return this.undeclaredThrowable;
});
Clazz_overrideMethod(c$,"getCause",
function(){
return this.undeclaredThrowable;
});

c$=Clazz_declareType(java.io,"IOException",Exception);


c$=Clazz_declareType(java.io,"CharConversionException",java.io.IOException);

c$=Clazz_declareType(java.io,"EOFException",java.io.IOException);

c$=Clazz_declareType(java.io,"FileNotFoundException",java.io.IOException);

c$=Clazz_decorateAsClass(function(){
this.bytesTransferred=0;
Clazz_instantialize(this,arguments);
},java.io,"InterruptedIOException",java.io.IOException);

c$=Clazz_declareType(java.io,"SyncFailedException",java.io.IOException);

c$=Clazz_declareType(java.io,"UnsupportedEncodingException",java.io.IOException);

c$=Clazz_declareType(java.io,"UTFDataFormatException",java.io.IOException);


Clazz_defineMethod(c$,"getMessage",
function(){
var msg=Clazz_superCall(this,java.io.WriteAbortedException,"getMessage",[]);
return (this.detail ? msg + "; "+this.detail.toString() : msg);
});
Clazz_overrideMethod(c$,"getCause",
function(){
return this.detail;
});

c$=Clazz_declareType(javautil,"ConcurrentModificationException",RuntimeException);
Clazz_makeConstructor(c$,
function(){
Clazz_superConstructor(this,javautil.ConcurrentModificationException,[]);
});

c$=Clazz_declareType(javautil,"EmptyStackException",RuntimeException);

c$=Clazz_decorateAsClass(function(){
this.className=null;
this.key=null;
Clazz_instantialize(this,arguments);
},javautil,"MissingResourceException",RuntimeException);
Clazz_makeConstructor(c$,
function(detailMessage,className,resourceName){
Clazz_superConstructor(this,javautil.MissingResourceException,[detailMessage]);
this.className=className;
this.key=resourceName;
},"~S,~S,~S");
Clazz_defineMethod(c$,"getClassName",
function(){
return this.className;
});
Clazz_defineMethod(c$,"getKey",
function(){
return this.key;
});

c$=Clazz_declareType(javautil,"NoSuchElementException",RuntimeException);

c$=Clazz_declareType(javautil,"TooManyListenersException",Exception);

c$=Clazz_declareType(java.lang,"Void");
c$.TYPE = c$;

Clazz_declareInterface(java.lang.reflect,"GenericDeclaration");
Clazz_declareInterface(java.lang.reflect,"AnnotatedElement");

c$=Clazz_declareType(java.lang.reflect,"AccessibleObject",null,java.lang.reflect.AnnotatedElement);
Clazz_makeConstructor(c$,
function(){
});
Clazz_defineMethod(c$,"isAccessible",
function(){
return false;
});
c$.setAccessible=Clazz_defineMethod(c$,"setAccessible",
function(objects,flag){
return;
},"~A,~B");
Clazz_defineMethod(c$,"setAccessible",
function(flag){
return;
},"~B");
Clazz_overrideMethod(c$,"isAnnotationPresent",
function(annotationType){
return false;
},"Class");
Clazz_overrideMethod(c$,"getDeclaredAnnotations",
function(){
return new Array(0);
});
Clazz_overrideMethod(c$,"getAnnotations",
function(){
return new Array(0);
});
Clazz_overrideMethod(c$,"getAnnotation",
function(annotationType){
return null;
},"Class");
c$.marshallArguments=Clazz_defineMethod(c$,"marshallArguments",
function(parameterTypes,args){
return null;
},"~A,~A");
Clazz_defineMethod(c$,"invokeV",
function(receiver,args){
return;
},"~O,~A");
Clazz_defineMethod(c$,"invokeL",
function(receiver,args){
return null;
},"~O,~A");
Clazz_defineMethod(c$,"invokeI",
function(receiver,args){
return 0;
},"~O,~A");
Clazz_defineMethod(c$,"invokeJ",
function(receiver,args){
return 0;
},"~O,~A");
Clazz_defineMethod(c$,"invokeF",
function(receiver,args){
return 0.0;
},"~O,~A");
Clazz_defineMethod(c$,"invokeD",
function(receiver,args){
return 0.0;
},"~O,~A");
c$.emptyArgs=c$.prototype.emptyArgs=new Array(0);
Clazz_declareInterface(java.lang.reflect,"InvocationHandler");
c$=Clazz_declareInterface(java.lang.reflect,"Member");
c$=Clazz_declareType(java.lang.reflect,"Modifier");

Clazz_makeConstructor(c$,
function(){
});
c$.isAbstract=Clazz_defineMethod(c$,"isAbstract",
function(modifiers){
return((modifiers&1024)!=0);
},"~N");
c$.isFinal=Clazz_defineMethod(c$,"isFinal",
function(modifiers){
return((modifiers&16)!=0);
},"~N");
c$.isInterface=Clazz_defineMethod(c$,"isInterface",
function(modifiers){
return((modifiers&512)!=0);
},"~N");
c$.isNative=Clazz_defineMethod(c$,"isNative",
function(modifiers){
return((modifiers&256)!=0);
},"~N");
c$.isPrivate=Clazz_defineMethod(c$,"isPrivate",
function(modifiers){
return((modifiers&2)!=0);
},"~N");
c$.isProtected=Clazz_defineMethod(c$,"isProtected",
function(modifiers){
return((modifiers&4)!=0);
},"~N");
c$.isPublic=Clazz_defineMethod(c$,"isPublic",
function(modifiers){
return((modifiers&1)!=0);
},"~N");
c$.isStatic=Clazz_defineMethod(c$,"isStatic",
function(modifiers){
return((modifiers&8)!=0);
},"~N");
c$.isStrict=Clazz_defineMethod(c$,"isStrict",
function(modifiers){
return((modifiers&2048)!=0);
},"~N");
c$.isSynchronized=Clazz_defineMethod(c$,"isSynchronized",
function(modifiers){
return((modifiers&32)!=0);
},"~N");
c$.isTransient=Clazz_defineMethod(c$,"isTransient",
function(modifiers){
return((modifiers&128)!=0);
},"~N");
c$.isVolatile=Clazz_defineMethod(c$,"isVolatile",
function(modifiers){
return((modifiers&64)!=0);
},"~N");
c$.toString=Clazz_defineMethod(c$,"toString",
function(modifiers){
var sb=new Array(0);
if(java.lang.reflect.Modifier.isPublic(modifiers))sb[sb.length]="public";
if(java.lang.reflect.Modifier.isProtected(modifiers))sb[sb.length]="protected";
if(java.lang.reflect.Modifier.isPrivate(modifiers))sb[sb.length]="private";
if(java.lang.reflect.Modifier.isAbstract(modifiers))sb[sb.length]="abstract";
if(java.lang.reflect.Modifier.isStatic(modifiers))sb[sb.length]="static";
if(java.lang.reflect.Modifier.isFinal(modifiers))sb[sb.length]="final";
if(java.lang.reflect.Modifier.isTransient(modifiers))sb[sb.length]="transient";
if(java.lang.reflect.Modifier.isVolatile(modifiers))sb[sb.length]="volatile";
if(java.lang.reflect.Modifier.isSynchronized(modifiers))sb[sb.length]="synchronized";
if(java.lang.reflect.Modifier.isNative(modifiers))sb[sb.length]="native";
if(java.lang.reflect.Modifier.isStrict(modifiers))sb[sb.length]="strictfp";
if(java.lang.reflect.Modifier.isInterface(modifiers))sb[sb.length]="interface";
if(sb.length>0){
return sb.join(" ");
}return"";
},"~N");

c$=Clazz_decorateAsClass(function(){
this.clazz=null;
this.parameterTypes=null;
this.exceptionTypes=null;
this.modifiers=0;
Clazz_instantialize(this,arguments);
},java.lang.reflect,"Constructor",java.lang.reflect.AccessibleObject,[java.lang.reflect.GenericDeclaration,java.lang.reflect.Member]);
Clazz_makeConstructor(c$,
function(declaringClass,parameterTypes,checkedExceptions,modifiers){
Clazz_superConstructor(this,java.lang.reflect.Constructor,[]);
this.clazz=declaringClass;
this.parameterTypes=parameterTypes;
this.exceptionTypes=checkedExceptions;
this.modifiers=modifiers;
},"Class,~A,~A,~N");
Clazz_overrideMethod(c$,"getTypeParameters",
function(){
return null;
});
Clazz_defineMethod(c$,"toGenericString",
function(){
return null;
});
Clazz_defineMethod(c$,"getGenericParameterTypes",
function(){
return null;
});
Clazz_defineMethod(c$,"getGenericExceptionTypes",
function(){
return null;
});
Clazz_defineMethod(c$,"getParameterAnnotations",
function(){
return null;
});
Clazz_defineMethod(c$,"isVarArgs",
function(){
return false;
});
Clazz_overrideMethod(c$,"isSynthetic",
function(){
return false;
});
Clazz_overrideMethod(c$,"equals",
function(object){
if(object!=null&&Clazz_instanceOf(object,java.lang.reflect.Constructor)){
var other=object;
if(this.getDeclaringClass()===other.getDeclaringClass()){
var params1=this.parameterTypes;
var params2=other.parameterTypes;
if(params1.length==params2.length){
for(var i=0;i<params1.length;i++){
if(params1[i]!==params2[i])return false;
}
return true;
}}}return false;
},"~O");
Clazz_overrideMethod(c$,"getDeclaringClass",
function(){
return this.clazz;
});
Clazz_defineMethod(c$,"getExceptionTypes",
function(){
return this.exceptionTypes;
});
Clazz_overrideMethod(c$,"getModifiers",
function(){
return this.modifiers;
});
Clazz_overrideMethod(c$,"getName",
function(){
return this.getDeclaringClass().getName();
});
Clazz_defineMethod(c$,"getParameterTypes",
function(){
return this.parameterTypes;
});
Clazz_overrideMethod(c$,"hashCode",
function(){
return this.getDeclaringClass().getName().hashCode();
});
Clazz_defineMethod(c$,"newInstance",
function(args){
var instance=new this.clazz(Clazz_inheritArgs);
Clazz_instantialize(instance,args);
return instance;
},"~A");
Clazz_overrideMethod(c$,"toString",
function(){
return null;
});

c$=Clazz_declareType(java.lang.reflect,"Field",java.lang.reflect.AccessibleObject,java.lang.reflect.Member);
Clazz_overrideMethod(c$,"isSynthetic",
function(){
return false;
});
Clazz_defineMethod(c$,"toGenericString",
function(){
return null;
});
Clazz_defineMethod(c$,"isEnumConstant",
function(){
return false;
});
Clazz_defineMethod(c$,"getGenericType",
function(){
return null;
});
Clazz_overrideMethod(c$,"equals",
function(object){
return false;
},"~O");
Clazz_overrideMethod(c$,"getDeclaringClass",
function(){
return null;
});
Clazz_overrideMethod(c$,"getName",
function(){
return null;
});
Clazz_defineMethod(c$,"getType",
function(){
return null;
});
Clazz_overrideMethod(c$,"hashCode",
function(){
return 0;
});
Clazz_overrideMethod(c$,"toString",
function(){
return null;
});

c$=Clazz_decorateAsClass(function(){
this.clazz=null;
this.name=null;
this.returnType=null;
this.parameterTypes=null;
this.exceptionTypes=null;
this.modifiers=0;
Clazz_instantialize(this,arguments);
},java.lang.reflect,"Method",java.lang.reflect.AccessibleObject,[java.lang.reflect.GenericDeclaration,java.lang.reflect.Member]);
Clazz_makeConstructor(c$,
function(declaringClass,name,parameterTypes,returnType,checkedExceptions,modifiers){
Clazz_superConstructor(this,java.lang.reflect.Method,[]);
this.clazz=declaringClass;
this.name=name;
this.parameterTypes=parameterTypes;
this.returnType=returnType;
this.exceptionTypes=checkedExceptions;
this.modifiers=modifiers;
},"Class,~S,~A,Class,~A,~N");
Clazz_overrideMethod(c$,"getTypeParameters",
function(){
return null;
});
Clazz_defineMethod(c$,"toGenericString",
function(){
return null;
});
Clazz_defineMethod(c$,"getGenericParameterTypes",
function(){
return null;
});
Clazz_defineMethod(c$,"getGenericExceptionTypes",
function(){
return null;
});
Clazz_defineMethod(c$,"getGenericReturnType",
function(){
return null;
});
Clazz_defineMethod(c$,"getParameterAnnotations",
function(){
return null;
});
Clazz_defineMethod(c$,"isVarArgs",
function(){
return false;
});
Clazz_defineMethod(c$,"isBridge",
function(){
return false;
});
Clazz_overrideMethod(c$,"isSynthetic",
function(){
return false;
});
Clazz_defineMethod(c$,"getDefaultValue",
function(){
return null;
});
Clazz_overrideMethod(c$,"equals",
function(object){
if(object!=null&&Clazz_instanceOf(object,java.lang.reflect.Method)){
var other=object;
if((this.getDeclaringClass()===other.getDeclaringClass())&&(this.getName()===other.getName())){
var params1=this.parameterTypes;
var params2=other.parameterTypes;
if(params1.length==params2.length){
for(var i=0;i<params1.length;i++){
if(params1[i]!==params2[i])return false;
}
return true;
}}}return false;
},"~O");
Clazz_overrideMethod(c$,"getDeclaringClass",
function(){
return this.clazz;
});
Clazz_defineMethod(c$,"getExceptionTypes",
function(){
return this.exceptionTypes;
});
Clazz_overrideMethod(c$,"getModifiers",
function(){
return this.modifiers;
});
Clazz_overrideMethod(c$,"getName",
function(){
return this.name;
});
Clazz_defineMethod(c$,"getParameterTypes",
function(){
return this.parameterTypes; 
});
Clazz_defineMethod(c$,"getReturnType",
function(){
return this.returnType;
});
Clazz_overrideMethod(c$,"hashCode",
function(){
return this.getDeclaringClass().getName().hashCode()^this.getName().hashCode();
});
Clazz_defineMethod(c$,"invoke",
function(receiver,args){
var m=this.clazz.prototype[this.getName()];
if(m==null){
m=this.clazz[this.getName()];
}
if(m!=null){
m.apply(receiver,args);
}else{

}
},"~O,~A");
Clazz_overrideMethod(c$,"toString",
function(){
return null;
});

})(Clazz);
;(function() {

if (Jmol._debugCode)return;

(function(){
var c$ = Clazz_decorateAsClass(function(){
this.$name = null;
this.$ordinal = 0;
Clazz_instantialize(this, arguments);}, java.lang, "Enum", null, [Comparable, java.io.Serializable]);
Clazz_makeConstructor(c$, 
function(name, ordinal){
this.$name = name;
this.$ordinal = ordinal;
}, "~S,~N");
Clazz_defineMethod(c$, "name", 
function(){
return this.$name;
});
Clazz_defineMethod(c$, "ordinal", 
function(){
return this.$ordinal;
});
Clazz_overrideMethod(c$, "toString", 
function(){
return this.$name;
});
Clazz_overrideMethod(c$, "equals", 
function(other){
return this === other;
}, "~O");
Clazz_overrideMethod(c$, "clone", 
function(){
throw  new CloneNotSupportedException();
});
Clazz_overrideMethod(c$, "compareTo", 
function(o){
var other = o;
var self = this;
if (self.getClass() !== other.getClass() && self.getDeclaringClass() !== other.getDeclaringClass()) throw  new ClassCastException();
return self.$ordinal - other.$ordinal;
}, "~O");
Clazz_defineMethod(c$, "getDeclaringClass", 
function(){
var clazz = this.getClass();
var zuper = clazz.getSuperclass();
return ((zuper === Enum) ? clazz : zuper);
});
c$.$valueOf = Clazz_defineMethod(c$, "$valueOf", 
function(enumType, name){
var result = null;
{
result = enumType.$clazz$[name];
}if (result != null) return result;
if (name == null) throw  new NullPointerException("Name is null");
throw  new IllegalArgumentException("No enum const " + enumType + "." + name);
}, "Class,~S");
Clazz_overrideMethod(c$, "finalize", 
function(){
});
})();
;//5.0.1-v7 Mon May 12 23:42:45 CDT 2025
Clazz_load(null, "java.lang.Thread", ["java.util.Date"], function(){
var c$ = Clazz_decorateAsClass(function(){
this.target = null;
this.group = null;
this.name = null;
this.priority = 0;
Clazz_instantialize(this, arguments);}, java.lang, "Thread", null, Runnable);
Clazz_overrideMethod(c$, "add", 
function(object){
throw  new UnsupportedOperationException();
}, "~O");
Clazz_overrideMethod(c$, "addAll", 
function(collection){
var result = false;
var it = collection.iterator();
while (it.hasNext()) {
if (this.add(it.next())) {
result = true;
}}
return result;
}, "java.util.Collection");
Clazz_overrideMethod(c$, "clear", 
function(){
var it = this.iterator();
while (it.hasNext()) {
it.next();
it.remove();
}
});
Clazz_overrideMethod(c$, "contains", 
function(object){
var it = this.iterator();
if (object != null) {
while (it.hasNext()) {
if (object.equals(it.next())) {
return true;
}}
} else {
while (it.hasNext()) {
if (it.next() == null) {
return true;
}}
}return false;
}, "~O");
Clazz_overrideMethod(c$, "containsAll", 
function(collection){
var it = collection.iterator();
while (it.hasNext()) {
if (!this.contains(it.next())) {
return false;
}}
return true;
}, "java.util.Collection");
Clazz_overrideMethod(c$, "isEmpty", 
function(){
return this.size() == 0;
});
Clazz_overrideMethod(c$, "remove", 
function(object){
var it = this.iterator();
if (object != null) {
while (it.hasNext()) {
if (object.equals(it.next())) {
it.remove();
return true;
}}
} else {
while (it.hasNext()) {
if (it.next() == null) {
it.remove();
return true;
}}
}return false;
}, "~O");
Clazz_overrideMethod(c$, "removeAll", 
function(collection){
var result = false;
var it = this.iterator();
while (it.hasNext()) {
if (collection.contains(it.next())) {
it.remove();
result = true;
}}
return result;
}, "java.util.Collection");
Clazz_overrideMethod(c$, "retainAll", 
function(collection){
var result = false;
var it = this.iterator();
while (it.hasNext()) {
if (!collection.contains(it.next())) {
it.remove();
result = true;
}}
return result;
}, "java.util.Collection");
Clazz_defineMethod(c$, "toArray", 
function(){
var size = this.size();
var index = 0;
var it = this.iterator();
var array =  new Array(size);
while (index < size) {
array[index++] = it.next();
}
return array;
});
Clazz_defineMethod(c$, "toArray", 
function(contents){
var size = this.size();
var index = 0;
if (size > contents.length) {
var ct = contents.getClass().getComponentType();
contents = java.lang.reflect.Array.newInstance(ct, size);
}for (var entry, $entry = this.iterator (); $entry.hasNext()&& ((entry = $entry.next ()) || true);) {
contents[index++] = entry;
}
if (index < contents.length) {
contents[index] = null;
}return contents;
}, "~A");
Clazz_overrideMethod(c$, "toString", 
function(){
if (this.isEmpty()) {
return "[]";
}var buffer = "[";
var it = this.iterator();
while (it.hasNext()) {
var next = it.next();
if (next !== this) {
buffer += next;
} else {
buffer += ("(this Collection)");
}if (it.hasNext()) {
buffer += (", ");
}}
buffer += (']');
return buffer;
});
});
;//5.0.1-v7 Mon May 12 23:42:45 CDT 2025
Clazz_load(["java.util.AbstractCollection", "$.Iterator", "$.List", "$.ListIterator", "$.RandomAccess"], "java.util.AbstractList", null, function(){
var c$ = Clazz_decorateAsClass(function(){
this.modCount = 0;
Clazz_instantialize(this, arguments);}, java.util, "AbstractList", java.util.AbstractCollection, java.util.List);
Clazz_defineMethod(c$, "add", 
function(location, object){
throw  new UnsupportedOperationException();
}, "~N,~O");
Clazz_defineMethod(c$, "add", 
function(object){
this.add(this.size(), object);
return true;
}, "~O");
Clazz_defineMethod(c$, "addAll", 
function(location, collection){
var it = collection.iterator();
while (it.hasNext()) {
this.add(location++, it.next());
}
return !collection.isEmpty();
}, "~N,java.util.Collection");
Clazz_overrideMethod(c$, "clear", 
function(){
this.removeRange(0, this.size());
});
Clazz_overrideMethod(c$, "equals", 
function(object){
if (this === object) {
return true;
}if (Clazz_instanceOf(object,"java.util.List")) {
var list = object;
if (list.size() != this.size()) {
return false;
}var it1 = this.iterator();
var it2 = list.iterator();
while (it1.hasNext()) {
var e1 = it1.next();
var e2 = it2.next();
if (!(e1 == null ? e2 == null : e1.equals(e2))) {
return false;
}}
return true;
}return false;
}, "~O");
Clazz_overrideMethod(c$, "hashCode", 
function(){
var result = 1;
var it = this.iterator();
while (it.hasNext()) {
var object = it.next();
result = (31 * result) + (object == null ? 0 : object.hashCode());
}
return result;
});
Clazz_overrideMethod(c$, "indexOf", 
function(object){
var it = this.listIterator();
if (object != null) {
while (it.hasNext()) {
if (object.equals(it.next())) {
return it.previousIndex();
}}
} else {
while (it.hasNext()) {
if (it.next() == null) {
return it.previousIndex();
}}
}return -1;
}, "~O");
Clazz_overrideMethod(c$, "iterator", 
function(){
return  new java.util.AbstractList.SimpleListIterator(this);
});
Clazz_overrideMethod(c$, "lastIndexOf", 
function(object){
var it = this.listIterator(this.size());
if (object != null) {
while (it.hasPrevious()) {
if (object.equals(it.previous())) {
return it.nextIndex();
}}
} else {
while (it.hasPrevious()) {
if (it.previous() == null) {
return it.nextIndex();
}}
}return -1;
}, "~O");
Clazz_defineMethod(c$, "listIterator", 
function(){
return this.listIterator(0);
});
Clazz_defineMethod(c$, "listIterator", 
function(location){
return  new java.util.AbstractList.FullListIterator(this, location);
}, "~N");
Clazz_defineMethod(c$, "remove", 
function(location){
throw  new UnsupportedOperationException();
}, "~N");
Clazz_defineMethod(c$, "removeRange", 
function(start, end){
var it = this.listIterator(start);
for (var i = start; i < end; i++) {
it.next();
it.remove();
}
}, "~N,~N");
Clazz_overrideMethod(c$, "set", 
function(location, object){
throw  new UnsupportedOperationException();
}, "~N,~O");
Clazz_overrideMethod(c$, "subList", 
function(start, end){
if (0 <= start && end <= this.size()) {
if (start <= end) {
if (Clazz_instanceOf(this,"java.util.RandomAccess")) {
return  new java.util.AbstractList.SubAbstractListRandomAccess(this, start, end);
}return  new java.util.AbstractList.SubAbstractList(this, start, end);
}throw  new IllegalArgumentException();
}throw  new IndexOutOfBoundsException();
}, "~N,~N");
})();
})();
})();
;(function(){
var c$ = Clazz_decorateAsClass(function(){
this.subList = null;
this.iterator = null;
this.start = 0;
this.end = 0;
Clazz_instantialize(this, arguments);}, java.util.AbstractList.SubAbstractList, "SubAbstractListIterator", null, java.util.ListIterator);
Clazz_makeConstructor(c$, 
function(it, list, offset, length){
this.iterator = it;
this.subList = list;
this.start = offset;
this.end = this.start + length;
}, "java.util.ListIterator,java.util.AbstractList.SubAbstractList,~N,~N");
Clazz_defineMethod(c$, "add", 
function(object){
this.iterator.add(object);
this.subList.sizeChanged(true);
this.end++;
}, "~O");
Clazz_overrideMethod(c$, "hasNext", 
function(){
return this.iterator.nextIndex() < this.end;
});
Clazz_overrideMethod(c$, "hasPrevious", 
function(){
return this.iterator.previousIndex() >= this.start;
});
Clazz_defineMethod(c$, "next", 
function(){
if (this.iterator.nextIndex() < this.end) {
return this.iterator.next();
}throw  new java.util.NoSuchElementException();
});
Clazz_defineMethod(c$, "nextIndex", 
function(){
return this.iterator.nextIndex() - this.start;
});
Clazz_defineMethod(c$, "previous", 
function(){
if (this.iterator.previousIndex() >= this.start) {
return this.iterator.previous();
}throw  new java.util.NoSuchElementException();
});
Clazz_defineMethod(c$, "previousIndex", 
function(){
var previous = this.iterator.previousIndex();
if (previous >= this.start) {
return previous - this.start;
}return -1;
});
Clazz_defineMethod(c$, "remove", 
function(){
this.iterator.remove();
this.subList.sizeChanged(false);
this.end--;
});
Clazz_defineMethod(c$, "set", 
function(object){
this.iterator.set(object);
}, "~O");
})();
});
;//5.0.1-v7 Mon May 12 23:42:45 CDT 2025
Clazz_load(["java.util.Map"], "java.util.AbstractMap", ["java.util.AbstractCollection", "$.AbstractSet", "$.Iterator"], function(){
var c$ = Clazz_decorateAsClass(function(){
this.$keySet = null;
this.$values = null;
Clazz_instantialize(this, arguments);}, java.util, "AbstractMap", null, java.util.Map);
Clazz_overrideMethod(c$, "clear", 
function(){
this.entrySet().clear();
});
Clazz_overrideMethod(c$, "containsKey", 
function(key){
var it = this.entrySet().iterator();
if (key != null) {
while (it.hasNext()) {
if (key.equals(it.next().getKey())) {
return true;
}}
} else {
while (it.hasNext()) {
if (it.next().getKey() == null) {
return true;
}}
}return false;
}, "~O");
Clazz_overrideMethod(c$, "containsValue", 
function(value){
var it = this.entrySet().iterator();
if (value != null) {
while (it.hasNext()) {
if (value.equals(it.next().getValue())) {
return true;
}}
} else {
while (it.hasNext()) {
if (it.next().getValue() == null) {
return true;
}}
}return false;
}, "~O");
Clazz_overrideMethod(c$, "equals", 
function(object){
if (this === object) {
return true;
}if (Clazz_instanceOf(object,"java.util.Map")) {
var map = object;
if (this.size() != map.size()) {
return false;
}var objectSet = map.entrySet();
var it = this.entrySet().iterator();
while (it.hasNext()) {
if (!objectSet.contains(it.next())) {
return false;
}}
return true;
}return false;
}, "~O");
Clazz_overrideMethod(c$, "get", 
function(key){
var it = this.entrySet().iterator();
if (key != null) {
while (it.hasNext()) {
var entry = it.next();
if (key.equals(entry.getKey())) {
return entry.getValue();
}}
} else {
while (it.hasNext()) {
var entry = it.next();
if (entry.getKey() == null) {
return entry.getValue();
}}
}return null;
}, "~O");
Clazz_overrideMethod(c$, "hashCode", 
function(){
var result = 0;
var it = this.entrySet().iterator();
while (it.hasNext()) {
result += it.next().hashCode();
}
return result;
});
Clazz_overrideMethod(c$, "isEmpty", 
function(){
return this.size() == 0;
});
Clazz_overrideMethod(c$, "keySet", 
function(){
if (this.$keySet == null) {
this.$keySet = ((Clazz_isClassDefined("java.util.AbstractMap$1") ? 0 : java.util.AbstractMap.$AbstractMap$1$ ()), Clazz_innerTypeInstance(java.util.AbstractMap$1, this, null));
}return this.$keySet;
});
Clazz_overrideMethod(c$, "put", 
function(key, value){
throw  new UnsupportedOperationException();
}, "~O,~O");
Clazz_overrideMethod(c$, "putAll", 
function(map){
this.putAllAM(map);
}, "java.util.Map");
Clazz_defineMethod(c$, "putAllAM", 
function(map){
if (!map.isEmpty()) for (var entry, $entry = map.entrySet().iterator (); $entry.hasNext()&& ((entry = $entry.next ()) || true);) {
this.put(entry.getKey(), entry.getValue());
}
}, "java.util.Map");
Clazz_overrideMethod(c$, "remove", 
function(key){
var it = this.entrySet().iterator();
if (key != null) {
while (it.hasNext()) {
var entry = it.next();
if (key.equals(entry.getKey())) {
it.remove();
return entry.getValue();
}}
} else {
while (it.hasNext()) {
var entry = it.next();
if (entry.getKey() == null) {
it.remove();
return entry.getValue();
}}
}return null;
}, "~O");
Clazz_overrideMethod(c$, "size", 
function(){
return this.entrySet().size();
});
Clazz_overrideMethod(c$, "toString", 
function(){
if (this.isEmpty()) {
return "{}";
}var buffer = "{";
var it = this.entrySet().iterator();
while (it.hasNext()) {
var entry = it.next();
var key = entry.getKey();
if (key !== this) {
buffer += (key);
} else {
buffer += ("(this Map)");
}buffer += ('=');
var value = entry.getValue();
if (value !== this) {
buffer += (value);
} else {
buffer += ("(this Map)");
}if (it.hasNext()) {
buffer += (", ");
}}
buffer += ('}');
return buffer;
});
Clazz_overrideMethod(c$, "values", 
function(){
if (this.$values == null) {
this.$values = ((Clazz_isClassDefined("java.util.AbstractMap$2") ? 0 : java.util.AbstractMap.$AbstractMap$2$ ()), Clazz_innerTypeInstance(java.util.AbstractMap$2, this, null));
}return this.$values;
});
Clazz_defineMethod(c$, "clone", 
function(){
return this.cloneAM();
});
Clazz_defineMethod(c$, "cloneAM", 
function(){
var result;
{
result = Clazz_clone(this);
}result.$keySet = null;
result.$values = null;
return result;
});
c$.$AbstractMap$1$=function(){
})();
};
c$.$AbstractMap$1$1$=function(){
})();
};
c$.$AbstractMap$2$=function(){
})();
};
c$.$AbstractMap$2$1$=function(){
})();
};
});
;//5.0.1-v7 Mon May 12 23:42:45 CDT 2025
Clazz_load(["java.util.AbstractCollection", "$.Set"], "java.util.AbstractSet", null, function(){
var c$ = Clazz_declareType(java.util, "AbstractSet", java.util.AbstractCollection, java.util.Set);
Clazz_overrideMethod(c$, "equals", 
function(object){
if (this === object) {
return true;
}if (Clazz_instanceOf(object,"java.util.Set")) {
var s = object;
return this.size() == s.size() && this.containsAll(s);
}return false;
}, "~O");
Clazz_overrideMethod(c$, "hashCode", 
function(){
var result = 0;
var it = this.iterator();
while (it.hasNext()) {
var next = it.next();
result += next == null ? 0 : next.hashCode();
}
return result;
});
Clazz_overrideMethod(c$, "removeAll", 
function(collection){
var result = false;
if (this.size() <= collection.size()) {
var it = this.iterator();
while (it.hasNext()) {
if (collection.contains(it.next())) {
it.remove();
result = true;
}}
} else {
var it = collection.iterator();
while (it.hasNext()) {
result = this.remove(it.next()) || result;
}
}return result;
}, "java.util.Collection");
});
;//5.0.1-v7 Mon May 12 23:42:45 CDT 2025
Clazz_load(["java.util.AbstractList", "$.List", "$.RandomAccess"], "java.util.ArrayList", ["java.util.Arrays"], function(){
var c$ = Clazz_decorateAsClass(function(){
this.firstIndex = 0;
this.lastIndex = 0;
this.array = null;
Clazz_instantialize(this, arguments);}, java.util, "ArrayList", java.util.AbstractList, [java.util.List, Cloneable, java.io.Serializable, java.util.RandomAccess]);
Clazz_makeConstructor(c$, 
function(){
Clazz_superConstructor (this, java.util.ArrayList, []);
this.setCapacity(0);
});
Clazz_makeConstructor(c$, 
function(capacity){
Clazz_superConstructor (this, java.util.ArrayList, []);
this.setCapacity(capacity);
}, "~N");
Clazz_makeConstructor(c$, 
function(collection){
this.firstIndex = this.lastIndex = 0;
var n = -1;
{
if (!collection) {
n = 0;
} else if (typeof collection == "number") {
n = collection;
}
}if (n >= 0) {
this.setCapacity(n);
return;
}var size = collection.size();
this.array = this.newElementArray(size + (Clazz_doubleToInt(size / 10)));
this.addAll(collection);
}, "java.util.Collection");
Clazz_defineMethod(c$, "setCapacity", 
function(capacity){
try {
this.array = this.newElementArray(capacity);
} catch (e) {
if (Clazz_exceptionOf(e,"NegativeArraySizeException")){
throw  new IllegalArgumentException();
} else {
throw e;
}
}
}, "~N");
Clazz_defineMethod(c$, "newElementArray", 
function(size){
return  new Array(size);
}, "~N");
Clazz_defineMethod(c$, "add", 
function(location, object){
this.add2(location, object);
}, "~N,~O");
Clazz_defineMethod(c$, "add2", 
function(location, object){
var size = this.size();
if (0 < location && location < size) {
if (this.firstIndex == 0 && this.lastIndex == this.array.length) {
this.growForInsert(location, 1);
} else if ((location < Clazz_doubleToInt(size / 2) && this.firstIndex > 0) || this.lastIndex == this.array.length) {
System.arraycopy(this.array, this.firstIndex, this.array, --this.firstIndex, location);
} else {
var index = location + this.firstIndex;
System.arraycopy(this.array, index, this.array, index + 1, size - location);
this.lastIndex++;
}this.array[location + this.firstIndex] = object;
} else if (location == 0) {
if (this.firstIndex == 0) {
this.growAtFront(1);
}this.array[--this.firstIndex] = object;
} else if (location == size) {
if (this.lastIndex == this.array.length) {
this.growAtEnd(1);
}this.array[this.lastIndex++] = object;
} else {
throw  new IndexOutOfBoundsException();
}this.modCount++;
}, "~N,~O");
Clazz_defineMethod(c$, "add", 
function(object){
return this.add1(object);
}, "~O");
Clazz_defineMethod(c$, "add1", 
function(object){
if (this.lastIndex == this.array.length) {
this.growAtEnd(1);
}this.array[this.lastIndex++] = object;
this.modCount++;
return true;
}, "~O");
Clazz_defineMethod(c$, "addAll", 
function(location, collection){
var size = this.size();
if (location < 0 || location > size) {
throw  new IndexOutOfBoundsException();
}var growSize = collection.size();
if (0 < location && location < size) {
if (this.array.length - size < growSize) {
this.growForInsert(location, growSize);
} else if ((location < Clazz_doubleToInt(size / 2) && this.firstIndex > 0) || this.lastIndex > this.array.length - growSize) {
var newFirst = this.firstIndex - growSize;
if (newFirst < 0) {
var index = location + this.firstIndex;
System.arraycopy(this.array, index, this.array, index - newFirst, size - location);
this.lastIndex -= newFirst;
newFirst = 0;
}System.arraycopy(this.array, this.firstIndex, this.array, newFirst, location);
this.firstIndex = newFirst;
} else {
var index = location + this.firstIndex;
System.arraycopy(this.array, index, this.array, index + growSize, size - location);
this.lastIndex += growSize;
}} else if (location == 0) {
this.growAtFront(growSize);
this.firstIndex -= growSize;
} else if (location == size) {
if (this.lastIndex > this.array.length - growSize) {
this.growAtEnd(growSize);
}this.lastIndex += growSize;
}if (growSize > 0) {
var it = collection.iterator();
var index = location + this.firstIndex;
var end = index + growSize;
while (index < end) {
this.array[index++] = it.next();
}
this.modCount++;
return true;
}return false;
}, "~N,java.util.Collection");
Clazz_defineMethod(c$, "addAll", 
function(collection){
var growSize = collection.size();
if (growSize > 0) {
if (this.lastIndex > this.array.length - growSize) {
this.growAtEnd(growSize);
}var it = collection.iterator();
var end = this.lastIndex + growSize;
while (this.lastIndex < end) {
this.array[this.lastIndex++] = it.next();
}
this.modCount++;
return true;
}return false;
}, "java.util.Collection");
Clazz_overrideMethod(c$, "clear", 
function(){
if (this.firstIndex != this.lastIndex) {
java.util.Arrays.fill(this.array, this.firstIndex, this.lastIndex, null);
this.firstIndex = this.lastIndex = 0;
this.modCount++;
}});
Clazz_defineMethod(c$, "clone", 
function(){
try {
var newList = Clazz_superCall(this, java.util.ArrayList, "clone", []);
newList.array = this.array.clone();
return newList;
} catch (e) {
if (Clazz_exceptionOf(e,"CloneNotSupportedException")){
return null;
} else {
throw e;
}
}
});
Clazz_overrideMethod(c$, "contains", 
function(object){
if (object != null) {
for (var i = this.firstIndex; i < this.lastIndex; i++) {
if (object.equals(this.array[i])) {
return true;
}}
} else {
for (var i = this.firstIndex; i < this.lastIndex; i++) {
if (this.array[i] == null) {
return true;
}}
}return false;
}, "~O");
Clazz_defineMethod(c$, "ensureCapacity", 
function(minimumCapacity){
if (this.array.length < minimumCapacity) {
if (this.firstIndex > 0) {
this.growAtFront(minimumCapacity - this.array.length);
} else {
this.growAtEnd(minimumCapacity - this.array.length);
}}}, "~N");
Clazz_overrideMethod(c$, "get", 
function(location){
if (0 <= location && location < this.size()) {
return this.array[this.firstIndex + location];
}throw  new IndexOutOfBoundsException();
}, "~N");
Clazz_defineMethod(c$, "growAtEnd", 
function(required){
var size = this.size();
if (this.firstIndex >= required - (this.array.length - this.lastIndex)) {
var newLast = this.lastIndex - this.firstIndex;
if (size > 0) {
System.arraycopy(this.array, this.firstIndex, this.array, 0, size);
var start = newLast < this.firstIndex ? this.firstIndex : newLast;
java.util.Arrays.fill(this.array, start, this.array.length, null);
}this.firstIndex = 0;
this.lastIndex = newLast;
} else {
var increment = Clazz_doubleToInt(size / 2);
if (required > increment) {
increment = required;
}if (increment < 12) {
increment = 12;
}var newArray = this.newElementArray(size + increment);
if (size > 0) {
System.arraycopy(this.array, this.firstIndex, newArray, this.firstIndex, size);
}this.array = newArray;
}}, "~N");
Clazz_defineMethod(c$, "growAtFront", 
function(required){
var size = this.size();
if (this.array.length - this.lastIndex >= required) {
var newFirst = this.array.length - size;
if (size > 0) {
System.arraycopy(this.array, this.firstIndex, this.array, newFirst, size);
var length = this.firstIndex + size > newFirst ? newFirst : this.firstIndex + size;
java.util.Arrays.fill(this.array, this.firstIndex, length, null);
}this.firstIndex = newFirst;
this.lastIndex = this.array.length;
} else {
var increment = Clazz_doubleToInt(size / 2);
if (required > increment) {
increment = required;
}if (increment < 12) {
increment = 12;
}var newArray = this.newElementArray(size + increment);
if (size > 0) {
System.arraycopy(this.array, this.firstIndex, newArray, newArray.length - size, size);
}this.firstIndex = newArray.length - size;
this.lastIndex = newArray.length;
this.array = newArray;
}}, "~N");
Clazz_defineMethod(c$, "growForInsert", 
function(location, required){
var size = this.size();
var increment = Clazz_doubleToInt(size / 2);
if (required > increment) {
increment = required;
}if (increment < 12) {
increment = 12;
}var newArray = this.newElementArray(size + increment);
if (location < Clazz_doubleToInt(size / 2)) {
var newFirst = newArray.length - (size + required);
System.arraycopy(this.array, location, newArray, location + increment, size - location);
System.arraycopy(this.array, this.firstIndex, newArray, newFirst, location);
this.firstIndex = newFirst;
this.lastIndex = newArray.length;
} else {
System.arraycopy(this.array, this.firstIndex, newArray, 0, location);
System.arraycopy(this.array, location, newArray, location + required, size - location);
this.firstIndex = 0;
this.lastIndex += required;
}this.array = newArray;
}, "~N,~N");
Clazz_overrideMethod(c$, "indexOf", 
function(object){
if (object != null) {
for (var i = this.firstIndex; i < this.lastIndex; i++) {
if (object.equals(this.array[i])) {
return i - this.firstIndex;
}}
} else {
for (var i = this.firstIndex; i < this.lastIndex; i++) {
if (this.array[i] == null) {
return i - this.firstIndex;
}}
}return -1;
}, "~O");
Clazz_overrideMethod(c$, "isEmpty", 
function(){
return this.lastIndex == this.firstIndex;
});
Clazz_overrideMethod(c$, "lastIndexOf", 
function(object){
if (object != null) {
for (var i = this.lastIndex - 1; i >= this.firstIndex; i--) {
if (object.equals(this.array[i])) {
return i - this.firstIndex;
}}
} else {
for (var i = this.lastIndex - 1; i >= this.firstIndex; i--) {
if (this.array[i] == null) {
return i - this.firstIndex;
}}
}return -1;
}, "~O");
Clazz_defineMethod(c$, "remove", 
function(location){
{
}return this._removeItemAt(location);
}, "~N");
Clazz_defineMethod(c$, "_removeObject", 
function(o){
var i = this.indexOf(o);
if (i < 0) return false;
this._removeItemAt(i);
return true;
}, "~O");
Clazz_defineMethod(c$, "_removeItemAt", 
function(location){
var result;
var size = this.size();
if (0 <= location && location < size) {
if (location == size - 1) {
result = this.array[--this.lastIndex];
this.array[this.lastIndex] = null;
} else if (location == 0) {
result = this.array[this.firstIndex];
this.array[this.firstIndex++] = null;
} else {
var elementIndex = this.firstIndex + location;
result = this.array[elementIndex];
if (location < Clazz_doubleToInt(size / 2)) {
System.arraycopy(this.array, this.firstIndex, this.array, this.firstIndex + 1, location);
this.array[this.firstIndex++] = null;
} else {
System.arraycopy(this.array, elementIndex + 1, this.array, elementIndex, size - location - 1);
this.array[--this.lastIndex] = null;
}}} else {
throw  new IndexOutOfBoundsException();
}this.modCount++;
return result;
}, "~N");
Clazz_overrideMethod(c$, "removeRange", 
function(start, end){
if (start >= 0 && start <= end && end <= this.size()) {
if (start == end) {
return;
}var size = this.size();
if (end == size) {
java.util.Arrays.fill(this.array, this.firstIndex + start, this.lastIndex, null);
this.lastIndex = this.firstIndex + start;
} else if (start == 0) {
java.util.Arrays.fill(this.array, this.firstIndex, this.firstIndex + end, null);
this.firstIndex += end;
} else {
System.arraycopy(this.array, this.firstIndex + end, this.array, this.firstIndex + start, size - end);
var newLast = this.lastIndex + start - end;
java.util.Arrays.fill(this.array, newLast, this.lastIndex, null);
this.lastIndex = newLast;
}this.modCount++;
} else {
throw  new IndexOutOfBoundsException();
}}, "~N,~N");
Clazz_overrideMethod(c$, "set", 
function(location, object){
if (0 <= location && location < this.size()) {
var result = this.array[this.firstIndex + location];
this.array[this.firstIndex + location] = object;
return result;
}throw  new IndexOutOfBoundsException();
}, "~N,~O");
Clazz_overrideMethod(c$, "size", 
function(){
return this.lastIndex - this.firstIndex;
});
Clazz_overrideMethod(c$, "toArray", 
function(contents){
var size = this.size();
if (contents == null || size > contents.length) {
{
return this.array.slice(this.firstIndex, this.firstIndex + size);
}}System.arraycopy(this.array, this.firstIndex, contents, 0, size);
if (size < contents.length) {
contents[size] = null;
}return contents;
}, "~A");
Clazz_defineMethod(c$, "trimToSize", 
function(){
var size = this.size();
var newArray = this.newElementArray(size);
System.arraycopy(this.array, this.firstIndex, newArray, 0, size);
this.array = newArray;
this.firstIndex = 0;
this.lastIndex = this.array.length;
});
});
;//5.0.1-v7 Mon May 12 23:42:45 CDT 2025
Clazz_load(["java.util.AbstractList", "$.RandomAccess"], "java.util.Arrays", null, function(){
var c$ = Clazz_declareType(java.util, "Arrays", null);
c$.fill = Clazz_defineMethod(c$, "fill", 
function(a, fromIndex, toIndex, val){
{
if (arguments.length == 2) {
val = arguments[1];
fromIndex = 0;
toIndex = a.length;
}
}java.util.Arrays.rangeCheck(a.length, fromIndex, toIndex);
for (var i = fromIndex; i < toIndex; i++) a[i] = val;

}, "~A,~N,~N,~O");
c$.asList = Clazz_defineMethod(c$, "asList", 
function(a){
return  new java.util.Arrays.ArrayList(a);
}, "~A");
c$.rangeCheck = Clazz_defineMethod(c$, "rangeCheck", 
function(arrayLen, fromIndex, toIndex){
if (fromIndex > toIndex) throw  new IllegalArgumentException("fromIndex(" + fromIndex + ") > toIndex(" + toIndex + ")");
if (fromIndex < 0) throw  new ArrayIndexOutOfBoundsException(fromIndex);
if (toIndex > arrayLen) throw  new ArrayIndexOutOfBoundsException(toIndex);
}, "~N,~N,~N");
c$.binarySearch = Clazz_defineMethod(c$, "binarySearch", 
function(a, key){
var low = 0;
var high = a.length - 1;
while (low <= high) {
var mid = (low + high) >> 1;
var midVal = a[mid];
if (midVal < key) low = mid + 1;
 else if (midVal > key) high = mid - 1;
 else return mid;
}
return -(low + 1);
}, "~A,~N");
c$.binarySearch = Clazz_defineMethod(c$, "binarySearch", 
function(a, key){
var low = 0;
var high = a.length - 1;
while (low <= high) {
var mid = (low + high) >> 1;
var midVal = a[mid];
var cmp = (midVal).compareTo(key);
if (cmp < 0) low = mid + 1;
 else if (cmp > 0) high = mid - 1;
 else return mid;
}
return -(low + 1);
}, "~A,~O");
c$.binarySearch = Clazz_defineMethod(c$, "binarySearch", 
function(a, key, c){
if (c == null) return java.util.Arrays.binarySearch(a, key);
var low = 0;
var high = a.length - 1;
while (low <= high) {
var mid = (low + high) >> 1;
var midVal = a[mid];
var cmp = c.compare(midVal, key);
if (cmp < 0) low = mid + 1;
 else if (cmp > 0) high = mid - 1;
 else return mid;
}
return -(low + 1);
}, "~A,~O,java.util.Comparator");
c$.equals = Clazz_defineMethod(c$, "equals", 
function(a, a2){
if (a === a2) return true;
if (a == null || a2 == null) return false;
var length = a.length;
if (a2.length != length) return false;
for (var i = 0; i < length; i++) {
var o1 = a[i];
var o2 = a2[i];
{
if(!(o1==null?o2==null:(o1.equals==null?o1==o2:o1.equals(o2))))return false;
}}
return true;
}, "~A,~A");
c$.sort = Clazz_defineMethod(c$, "sort", 
function(a, fromIndex, toIndex, c){
if (a.length < 2) return;
var n = 0;
var p = null;
{
n = arguments.length; p = fromIndex;
}var temp = a;
var ret = null;
switch (n) {
case 1:
p = null;
case 2:
fromIndex = 0;
toIndex = a.length;
break;
case 3:
c = null;
case 4:
p = c;
if (fromIndex == 0 && toIndex == a.length) {
temp = a;
} else {
{
temp = a.slice(fromIndex, toIndex);
}ret = a;
}break;
}
java.util.Arrays.rangeCheck(a.length, fromIndex, toIndex);
if (p == null) p = java.util.Arrays.comp;
c = p;
{
temp.sort(function(a,b){return c.compare(a,b)});
}if (ret != null) {
System.arraycopy(temp, 0, ret, fromIndex, toIndex);
}}, "~A,~N,~N,java.util.Comparator");
})();
c$.comp = null;
{
c$.comp = {compare: function (o1, o2) {
return (o1 == null ? (o2 == null ? 0 : -1) : o2 == null ? 1
: typeof o1 == "number" ? o1 - o2 : o1.compareTo(o2))}};
}});
;//5.0.1-v7 Mon May 12 23:47:55 CDT 2025
Clazz_load(["java.util.AbstractList", "$.AbstractMap", "$.AbstractSet", "$.Collection", "$.Enumeration", "$.Iterator", "$.List", "$.ListIterator", "$.Map", "$.RandomAccess", "$.Set", "$.SortedMap", "$.SortedSet", "java.lang.reflect.Array"], "java.util.Collections", ["java.util.ArrayList", "$.Arrays", "java.util.Map.Entry", "java.util.Random"], function(){
var c$ = Clazz_declareType(java.util, "Collections", null);
c$.emptyEnumeration = Clazz_defineMethod(c$, "emptyEnumeration", 
function(){
if (java.util.Collections.EMPTY_ENUMERATION == null) java.util.Collections.EMPTY_ENUMERATION =  new java.util.Collections.EmptyEnumeration();
return java.util.Collections.EMPTY_ENUMERATION;
});
c$.emptyIterator = Clazz_defineMethod(c$, "emptyIterator", 
function(){
if (java.util.Collections.EMPTY_ITERATOR == null) {
java.util.Collections.EMPTY_ITERATOR =  new java.util.Collections.EmptyIterator();
}return java.util.Collections.EMPTY_ITERATOR;
});
c$.binarySearch = Clazz_defineMethod(c$, "binarySearch", 
function(list, object){
if (list == null) {
throw  new NullPointerException();
}if (list.isEmpty()) {
return -1;
}var key = object;
if (!(Clazz_instanceOf(list,"java.util.RandomAccess"))) {
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
c$.binarySearch = Clazz_defineMethod(c$, "binarySearch", 
function(list, object, comparator){
if (comparator == null) {
return java.util.Collections.binarySearch(list, object);
}if (!(Clazz_instanceOf(list,"java.util.RandomAccess"))) {
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
c$.copy = Clazz_defineMethod(c$, "copy", 
function(destination, source){
if (destination.size() < source.size()) {
throw  new ArrayIndexOutOfBoundsException();
}var srcIt = source.iterator();
var destIt = destination.listIterator();
while (srcIt.hasNext()) {
try {
destIt.next();
} catch (e) {
if (Clazz_exceptionOf(e,"java.util.NoSuchElementException")){
throw  new ArrayIndexOutOfBoundsException();
} else {
throw e;
}
}
destIt.set(srcIt.next());
}
}, "java.util.List,java.util.List");
c$.enumeration = Clazz_defineMethod(c$, "enumeration", 
function(collection){
var c = collection;
return ((Clazz_isClassDefined("java.util.Collections$1") ? 0 : java.util.Collections.$Collections$1$ ()), Clazz_innerTypeInstance(java.util.Collections$1, this, Clazz_cloneFinals("c", c)));
}, "java.util.Collection");
c$.fill = Clazz_defineMethod(c$, "fill", 
function(list, object){
var it = list.listIterator();
while (it.hasNext()) {
it.next();
it.set(object);
}
}, "java.util.List,~O");
c$.max = Clazz_defineMethod(c$, "max", 
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
c$.max = Clazz_defineMethod(c$, "max", 
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
c$.min = Clazz_defineMethod(c$, "min", 
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
c$.min = Clazz_defineMethod(c$, "min", 
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
c$.nCopies = Clazz_defineMethod(c$, "nCopies", 
function(length, object){
return  new java.util.Collections.CopiesList(length, object);
}, "~N,~O");
c$.reverse = Clazz_defineMethod(c$, "reverse", 
function(list){
var size = list.size();
var front = list.listIterator();
var back = list.listIterator(size);
for (var i = 0; i < Clazz_doubleToInt(size / 2); i++) {
var frontNext = front.next();
var backPrev = back.previous();
front.set(backPrev);
back.set(frontNext);
}
}, "java.util.List");
c$.reverseOrder = Clazz_defineMethod(c$, "reverseOrder", 
function(){
return  new java.util.Collections.ReverseComparator();
});
c$.reverseOrder = Clazz_defineMethod(c$, "reverseOrder", 
function(c){
if (c == null) {
return java.util.Collections.reverseOrder();
}return  new java.util.Collections.ReverseComparatorWithComparator(c);
}, "java.util.Comparator");
c$.shuffle = Clazz_defineMethod(c$, "shuffle", 
function(list){
java.util.Collections.shuffle(list,  new java.util.Random());
}, "java.util.List");
c$.shuffle = Clazz_defineMethod(c$, "shuffle", 
function(list, random){
if (!(Clazz_instanceOf(list,"java.util.RandomAccess"))) {
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
c$.singleton = Clazz_defineMethod(c$, "singleton", 
function(object){
return  new java.util.Collections.SingletonSet(object);
}, "~O");
c$.singletonList = Clazz_defineMethod(c$, "singletonList", 
function(object){
return  new java.util.Collections.SingletonList(object);
}, "~O");
c$.singletonMap = Clazz_defineMethod(c$, "singletonMap", 
function(key, value){
return  new java.util.Collections.SingletonMap(key, value);
}, "~O,~O");
c$.sort = Clazz_defineMethod(c$, "sort", 
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
c$.sort = Clazz_defineMethod(c$, "sort", 
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
c$.swap = Clazz_defineMethod(c$, "swap", 
function(list, index1, index2){
if (list == null) {
throw  new NullPointerException();
}if (index1 == index2) {
return;
}var rawList = list;
rawList.set(index2, rawList.set(index1, rawList.get(index2)));
}, "java.util.List,~N,~N");
c$.replaceAll = Clazz_defineMethod(c$, "replaceAll", 
function(list, obj, obj2){
var index;
var found = false;
while ((index = list.indexOf(obj)) > -1) {
found = true;
list.set(index, obj2);
}
return found;
}, "java.util.List,~O,~O");
c$.rotate = Clazz_defineMethod(c$, "rotate", 
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
}if (Clazz_instanceOf(list,"java.util.RandomAccess")) {
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
c$.indexOfSubList = Clazz_defineMethod(c$, "indexOfSubList", 
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
c$.lastIndexOfSubList = Clazz_defineMethod(c$, "lastIndexOfSubList", 
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
c$.list = Clazz_defineMethod(c$, "list", 
function(enumeration){
var list =  new java.util.ArrayList();
while (enumeration.hasMoreElements()) {
list.add(enumeration.nextElement());
}
return list;
}, "java.util.Enumeration");
c$.synchronizedCollection = Clazz_defineMethod(c$, "synchronizedCollection", 
function(collection){
if (collection == null) {
throw  new NullPointerException();
}return  new java.util.Collections.SynchronizedCollection(collection);
}, "java.util.Collection");
c$.synchronizedList = Clazz_defineMethod(c$, "synchronizedList", 
function(list){
if (list == null) {
throw  new NullPointerException();
}if (Clazz_instanceOf(list,"java.util.RandomAccess")) {
return  new java.util.Collections.SynchronizedRandomAccessList(list);
}return  new java.util.Collections.SynchronizedList(list);
}, "java.util.List");
c$.synchronizedMap = Clazz_defineMethod(c$, "synchronizedMap", 
function(map){
if (map == null) {
throw  new NullPointerException();
}return  new java.util.Collections.SynchronizedMap(map);
}, "java.util.Map");
c$.synchronizedSet = Clazz_defineMethod(c$, "synchronizedSet", 
function(set){
if (set == null) {
throw  new NullPointerException();
}return  new java.util.Collections.SynchronizedSet(set);
}, "java.util.Set");
c$.synchronizedSortedMap = Clazz_defineMethod(c$, "synchronizedSortedMap", 
function(map){
if (map == null) {
throw  new NullPointerException();
}return  new java.util.Collections.SynchronizedSortedMap(map);
}, "java.util.SortedMap");
c$.synchronizedSortedSet = Clazz_defineMethod(c$, "synchronizedSortedSet", 
function(set){
if (set == null) {
throw  new NullPointerException();
}return  new java.util.Collections.SynchronizedSortedSet(set);
}, "java.util.SortedSet");
c$.unmodifiableCollection = Clazz_defineMethod(c$, "unmodifiableCollection", 
function(collection){
if (collection == null) {
throw  new NullPointerException();
}return  new java.util.Collections.UnmodifiableCollection(collection);
}, "java.util.Collection");
c$.unmodifiableList = Clazz_defineMethod(c$, "unmodifiableList", 
function(list){
if (list == null) {
throw  new NullPointerException();
}if (Clazz_instanceOf(list,"java.util.RandomAccess")) {
return  new java.util.Collections.UnmodifiableRandomAccessList(list);
}return  new java.util.Collections.UnmodifiableList(list);
}, "java.util.List");
c$.unmodifiableMap = Clazz_defineMethod(c$, "unmodifiableMap", 
function(map){
if (map == null) {
throw  new NullPointerException();
}return  new java.util.Collections.UnmodifiableMap(map);
}, "java.util.Map");
c$.unmodifiableSet = Clazz_defineMethod(c$, "unmodifiableSet", 
function(set){
if (set == null) {
throw  new NullPointerException();
}return  new java.util.Collections.UnmodifiableSet(set);
}, "java.util.Set");
c$.unmodifiableSortedMap = Clazz_defineMethod(c$, "unmodifiableSortedMap", 
function(map){
if (map == null) {
throw  new NullPointerException();
}return  new java.util.Collections.UnmodifiableSortedMap(map);
}, "java.util.SortedMap");
c$.unmodifiableSortedSet = Clazz_defineMethod(c$, "unmodifiableSortedSet", 
function(set){
if (set == null) {
throw  new NullPointerException();
}return  new java.util.Collections.UnmodifiableSortedSet(set);
}, "java.util.SortedSet");
c$.frequency = Clazz_defineMethod(c$, "frequency", 
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
c$.emptyList = Clazz_defineMethod(c$, "emptyList", 
function(){
return java.util.Collections.EMPTY_LIST;
});
c$.emptySet = Clazz_defineMethod(c$, "emptySet", 
function(){
return java.util.Collections.EMPTY_SET;
});
c$.emptyMap = Clazz_defineMethod(c$, "emptyMap", 
function(){
return java.util.Collections.EMPTY_MAP;
});
c$.checkedCollection = Clazz_defineMethod(c$, "checkedCollection", 
function(c, type){
return  new java.util.Collections.CheckedCollection(c, type);
}, "java.util.Collection,Class");
c$.checkedMap = Clazz_defineMethod(c$, "checkedMap", 
function(m, keyType, valueType){
return  new java.util.Collections.CheckedMap(m, keyType, valueType);
}, "java.util.Map,Class,Class");
c$.checkedList = Clazz_defineMethod(c$, "checkedList", 
function(list, type){
if (Clazz_instanceOf(list,"java.util.RandomAccess")) {
return  new java.util.Collections.CheckedRandomAccessList(list, type);
}return  new java.util.Collections.CheckedList(list, type);
}, "java.util.List,Class");
c$.checkedSet = Clazz_defineMethod(c$, "checkedSet", 
function(s, type){
return  new java.util.Collections.CheckedSet(s, type);
}, "java.util.Set,Class");
c$.checkedSortedMap = Clazz_defineMethod(c$, "checkedSortedMap", 
function(m, keyType, valueType){
return  new java.util.Collections.CheckedSortedMap(m, keyType, valueType);
}, "java.util.SortedMap,Class,Class");
c$.checkedSortedSet = Clazz_defineMethod(c$, "checkedSortedSet", 
function(s, type){
return  new java.util.Collections.CheckedSortedSet(s, type);
}, "java.util.SortedSet,Class");
c$.addAll = Clazz_defineMethod(c$, "addAll", 
function(c, a){
var modified = false;
for (var i = 0; i < a.length; i++) {
modified = new Boolean (modified | c.add(a[i])).valueOf();
}
return modified;
}, "java.util.Collection,~A");
c$.disjoint = Clazz_defineMethod(c$, "disjoint", 
function(c1, c2){
if ((Clazz_instanceOf(c1,"java.util.Set")) && !(Clazz_instanceOf(c2,"java.util.Set")) || (c2.size()) > c1.size()) {
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
c$.checkType = Clazz_defineMethod(c$, "checkType", 
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
var c$ = Clazz_declareAnonymous(java.util, "Collections$EmptySet$1", null, java.util.Iterator);
Clazz_overrideMethod(c$, "hasNext", 
function(){
return false;
});
Clazz_overrideMethod(c$, "next", 
function(){
throw  new java.util.NoSuchElementException();
});
Clazz_overrideMethod(c$, "remove", 
function(){
throw  new UnsupportedOperationException();
});
})();
})();
})();
})();
;(function(){
var c$ = Clazz_decorateAsClass(function(){
Clazz_prepareCallback(this, arguments);
this.$hasNext = true;
Clazz_instantialize(this, arguments);}, java.util, "Collections$SingletonSet$1", null, java.util.Iterator);
Clazz_overrideMethod(c$, "hasNext", 
function(){
return this.$hasNext;
});
Clazz_overrideMethod(c$, "next", 
function(){
if (this.$hasNext) {
this.$hasNext = false;
return this.b$["java.util.Collections.SingletonSet"].element;
}throw  new java.util.NoSuchElementException();
});
Clazz_overrideMethod(c$, "remove", 
function(){
throw  new UnsupportedOperationException();
});
})();
})();
;(function(){
var c$ = Clazz_declareAnonymous(java.util, "Collections$SingletonMap$1", java.util.AbstractSet);
Clazz_overrideMethod(c$, "contains", 
function(object){
if (Clazz_instanceOf(object,"java.util.Map.Entry")) {
var entry = object;
return this.b$["java.util.Collections.SingletonMap"].containsKey(entry.getKey()) && this.b$["java.util.Collections.SingletonMap"].containsValue(entry.getValue());
}return false;
}, "~O");
Clazz_overrideMethod(c$, "size", 
function(){
return 1;
});
Clazz_overrideMethod(c$, "iterator", 
function(){
return ((Clazz_isClassDefined("java.util.Collections$SingletonMap$1$1") ? 0 : java.util.Collections.$Collections$SingletonMap$1$1$ ()), Clazz_innerTypeInstance(java.util.Collections$SingletonMap$1$1, this, null));
});
;(function(){
var c$ = Clazz_decorateAsClass(function(){
Clazz_prepareCallback(this, arguments);
this.$hasNext = true;
Clazz_instantialize(this, arguments);}, java.util, "Collections$SingletonMap$1$1", null, java.util.Iterator);
Clazz_overrideMethod(c$, "hasNext", 
function(){
return this.$hasNext;
});
Clazz_overrideMethod(c$, "next", 
function(){
if (this.$hasNext) {
this.$hasNext = false;
return ((Clazz_isClassDefined("java.util.Collections$SingletonMap$1$1$1") ? 0 : java.util.Collections.$Collections$SingletonMap$1$1$1$ ()), Clazz_innerTypeInstance(java.util.Collections$SingletonMap$1$1$1, this, null));
}throw  new java.util.NoSuchElementException();
});
Clazz_overrideMethod(c$, "remove", 
function(){
throw  new UnsupportedOperationException();
});
;(function(){
var c$ = Clazz_declareAnonymous(java.util, "Collections$SingletonMap$1$1$1", null, java.util.Map.Entry);
Clazz_overrideMethod(c$, "equals", 
function(object){
return this.b$["java.util.Collections$SingletonMap$1"].contains(object);
}, "~O");
Clazz_overrideMethod(c$, "getKey", 
function(){
return this.b$["java.util.Collections.SingletonMap"].k;
});
Clazz_overrideMethod(c$, "getValue", 
function(){
return this.b$["java.util.Collections.SingletonMap"].v;
});
Clazz_overrideMethod(c$, "hashCode", 
function(){
return (this.b$["java.util.Collections.SingletonMap"].k == null ? 0 : this.b$["java.util.Collections.SingletonMap"].k.hashCode()) ^ (this.b$["java.util.Collections.SingletonMap"].v == null ? 0 : this.b$["java.util.Collections.SingletonMap"].v.hashCode());
});
Clazz_overrideMethod(c$, "setValue", 
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
var c$ = Clazz_decorateAsClass(function(){
Clazz_prepareCallback(this, arguments);
this.iterator = null;
Clazz_instantialize(this, arguments);}, java.util, "Collections$UnmodifiableCollection$1", null, java.util.Iterator);
Clazz_prepareFields (c$, function(){
this.iterator = this.b$["java.util.Collections.UnmodifiableCollection"].c.iterator();
});
Clazz_defineMethod(c$, "hasNext", 
function(){
return this.iterator.hasNext();
});
Clazz_defineMethod(c$, "next", 
function(){
return this.iterator.next();
});
Clazz_overrideMethod(c$, "remove", 
function(){
throw  new UnsupportedOperationException();
});
})();
})();
;(function(){
var c$ = Clazz_decorateAsClass(function(){
Clazz_prepareCallback(this, arguments);
this.iterator = null;
Clazz_instantialize(this, arguments);}, java.util, "Collections$UnmodifiableList$1", null, java.util.ListIterator);
Clazz_prepareFields (c$, function(){
this.iterator = this.b$["java.util.Collections.UnmodifiableList"].list.listIterator(this.f$.location);
});
Clazz_overrideMethod(c$, "add", 
function(object){
throw  new UnsupportedOperationException();
}, "~O");
Clazz_defineMethod(c$, "hasNext", 
function(){
return this.iterator.hasNext();
});
Clazz_defineMethod(c$, "hasPrevious", 
function(){
return this.iterator.hasPrevious();
});
Clazz_defineMethod(c$, "next", 
function(){
return this.iterator.next();
});
Clazz_defineMethod(c$, "nextIndex", 
function(){
return this.iterator.nextIndex();
});
Clazz_defineMethod(c$, "previous", 
function(){
return this.iterator.previous();
});
Clazz_defineMethod(c$, "previousIndex", 
function(){
return this.iterator.previousIndex();
});
Clazz_overrideMethod(c$, "remove", 
function(){
throw  new UnsupportedOperationException();
});
Clazz_overrideMethod(c$, "set", 
function(object){
throw  new UnsupportedOperationException();
}, "~O");
})();
;(function(){
var c$ = Clazz_declareType(java.util.Collections.UnmodifiableMap, "UnmodifiableEntrySet", java.util.Collections.UnmodifiableSet);
Clazz_overrideMethod(c$, "iterator", 
function(){
return ((Clazz_isClassDefined("java.util.Collections$UnmodifiableMap$UnmodifiableEntrySet$1") ? 0 : java.util.Collections.UnmodifiableMap.UnmodifiableEntrySet.$Collections$UnmodifiableMap$UnmodifiableEntrySet$1$ ()), Clazz_innerTypeInstance(java.util.Collections$UnmodifiableMap$UnmodifiableEntrySet$1, this, null));
});
Clazz_defineMethod(c$, "toArray", 
function(){
var length = this.c.size();
var result =  new Array(length);
var it = this.iterator();
for (var i = length; --i >= 0; ) {
result[i] = it.next();
}
return result;
});
Clazz_defineMethod(c$, "toArray", 
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
var c$ = Clazz_decorateAsClass(function(){
this.e = null;
this.valueType = null;
Clazz_instantialize(this, arguments);}, java.util.Collections.CheckedMap, "CheckedEntry", null, java.util.Map.Entry);
Clazz_makeConstructor(c$, 
function(e, valueType){
if (e == null) {
throw  new NullPointerException();
}this.e = e;
this.valueType = valueType;
}, "java.util.Map.Entry,Class");
Clazz_defineMethod(c$, "getKey", 
function(){
return this.e.getKey();
});
Clazz_defineMethod(c$, "getValue", 
function(){
return this.e.getValue();
});
Clazz_defineMethod(c$, "setValue", 
function(obj){
return this.e.setValue(java.util.Collections.checkType(obj, this.valueType));
}, "~O");
Clazz_defineMethod(c$, "equals", 
function(obj){
return this.e.equals(obj);
}, "~O");
Clazz_defineMethod(c$, "hashCode", 
function(){
return this.e.hashCode();
});
;(function(){
var c$ = Clazz_decorateAsClass(function(){
this.s = null;
this.valueType = null;
Clazz_instantialize(this, arguments);}, java.util.Collections.CheckedMap, "CheckedEntrySet", null, java.util.Set);
Clazz_makeConstructor(c$, 
function(s, valueType){
this.s = s;
this.valueType = valueType;
}, "java.util.Set,Class");
Clazz_defineMethod(c$, "iterator", 
function(){
return  new java.util.Collections.CheckedMap.CheckedEntrySet.CheckedEntryIterator(this.s.iterator(), this.valueType);
});
Clazz_defineMethod(c$, "toArray", 
function(){
var thisSize = this.size();
var array =  new Array(thisSize);
var it = this.iterator();
for (var i = 0; i < thisSize; i++) {
array[i] = it.next();
}
return array;
});
Clazz_defineMethod(c$, "toArray", 
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
Clazz_defineMethod(c$, "retainAll", 
function(c){
return this.s.retainAll(c);
}, "java.util.Collection");
Clazz_defineMethod(c$, "removeAll", 
function(c){
return this.s.removeAll(c);
}, "java.util.Collection");
Clazz_defineMethod(c$, "containsAll", 
function(c){
return this.s.containsAll(c);
}, "java.util.Collection");
Clazz_overrideMethod(c$, "addAll", 
function(c){
throw  new UnsupportedOperationException();
}, "java.util.Collection");
Clazz_defineMethod(c$, "remove", 
function(o){
return this.s.remove(o);
}, "~O");
Clazz_defineMethod(c$, "contains", 
function(o){
return this.s.contains(o);
}, "~O");
Clazz_overrideMethod(c$, "add", 
function(o){
throw  new UnsupportedOperationException();
}, "java.util.Map.Entry");
Clazz_defineMethod(c$, "isEmpty", 
function(){
return this.s.isEmpty();
});
Clazz_defineMethod(c$, "clear", 
function(){
this.s.clear();
});
Clazz_defineMethod(c$, "size", 
function(){
return this.s.size();
});
Clazz_defineMethod(c$, "hashCode", 
function(){
return this.s.hashCode();
});
Clazz_defineMethod(c$, "equals", 
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
(function(){
var c$ = Clazz_declareType(java.util, "Dictionary", null);
})();
;//5.0.1-v7 Mon May 12 23:42:45 CDT 2025
Clazz_load(["java.util.AbstractCollection", "$.AbstractSet", "$.Dictionary", "$.Enumeration", "$.Iterator", "$.Map"], "java.util.Hashtable", ["java.util.Collections"], function(){
var c$ = Clazz_decorateAsClass(function(){
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
Clazz_instantialize(this, arguments);}, java.util, "Hashtable", java.util.Dictionary, [java.util.Map, Cloneable]);
Clazz_makeConstructor(c$, 
function(){
this.initHT();
});
Clazz_defineMethod(c$, "initHT", 
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
this.threshold = Clazz_floatToInt(Math.min(capacity * loadFactor, 2147483640));
this.__setJS();
if (map != null) this.putAll(map);
});
Clazz_overrideMethod(c$, "size", 
function(){
var c = this.count;
{
c = this.__m && this.__m.size || c;
}return c;
});
Clazz_overrideMethod(c$, "isEmpty", 
function(){
return this.size() == 0;
});
Clazz_overrideMethod(c$, "keys", 
function(){
return this.getEnumeration(0);
});
Clazz_overrideMethod(c$, "elements", 
function(){
return this.getEnumeration(1);
});
Clazz_defineMethod(c$, "contains", 
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
Clazz_overrideMethod(c$, "containsValue", 
function(value){
return this.contains(value);
}, "~O");
Clazz_overrideMethod(c$, "containsKey", 
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
Clazz_overrideMethod(c$, "get", 
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
Clazz_defineMethod(c$, "rehash", 
function(){
var oldCapacity = this.table.length;
var oldMap = this.table;
var newCapacity = (oldCapacity << 1) + 1;
if (newCapacity - 2147483639 > 0) {
if (oldCapacity == 2147483639) return;
newCapacity = 2147483639;
}var newMap =  new Array(newCapacity);
this.modCount++;
this.threshold = Clazz_floatToInt(Math.min(newCapacity * this.loadFactor, 2147483640));
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
Clazz_defineMethod(c$, "addEntry", 
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
Clazz_overrideMethod(c$, "put", 
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
Clazz_overrideMethod(c$, "remove", 
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
Clazz_overrideMethod(c$, "putAll", 
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
Clazz_overrideMethod(c$, "clear", 
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
Clazz_defineMethod(c$, "clone", 
function(){
try {
var t = Clazz_superCall(this, java.util.Hashtable, "clone", []);
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
if (Clazz_exceptionOf(e,"CloneNotSupportedException")){
throw  new InternalError(e);
} else {
throw e;
}
}
});
Clazz_overrideMethod(c$, "toString", 
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
Clazz_overrideMethod(c$, "equals", 
function(o){
if (o === this) return true;
if (!(Clazz_instanceOf(o,"java.util.Map"))) return false;
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
if (Clazz_exceptionOf(e$$,"ClassCastException")){
var unused = e$$;
{
return false;
}
} else if (Clazz_exceptionOf(e$$, NullPointerException)){
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
Clazz_overrideMethod(c$, "hashCode", 
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
Clazz_defineMethod(c$, "getEnumeration", 
function(type){
if (this.size() == 0) {
return java.util.Collections.emptyEnumeration();
} else {
return  new java.util.Hashtable.Enumerator(this, type, false);
}}, "~N");
Clazz_defineMethod(c$, "getIterator", 
function(type){
if (this.size() == 0) {
return java.util.Collections.emptyIterator();
} else {
return  new java.util.Hashtable.Enumerator(this, type, true);
}}, "~N");
Clazz_overrideMethod(c$, "keySet", 
function(){
if (this.$keySet == null) this.$keySet =  new java.util.Hashtable.KeySet(this);
return this.$keySet;
});
Clazz_overrideMethod(c$, "entrySet", 
function(){
if (this.$entrySet == null) this.$entrySet =  new java.util.Hashtable.EntrySet(this);
return this.$entrySet;
});
Clazz_overrideMethod(c$, "values", 
function(){
if (this.$values == null) this.$values =  new java.util.Hashtable.ValueCollection(this);
return this.$values;
});
Clazz_defineMethod(c$, "__setJS", 
function(){
if (this.__allowJS && java.util.Hashtable.USE_SIMPLE) {
var m = null;
{
m = new Map();
}this.__m = m;
} else {
this.__m = null;
}});
c$.__get = Clazz_defineMethod(c$, "__get", 
function(map, key){
{
return map.__m.get(key == null ? null : key + "")
}}, "~O,~O");
c$.__set = Clazz_defineMethod(c$, "__set", 
function(map, key, value){
{
map.__m.set(key == null ? null : key + "", value)
}}, "java.util.Map,~O,~O");
c$.__hasKey = Clazz_defineMethod(c$, "__hasKey", 
function(map, key){
{
return (!map.__m ? 0 : key != null && typeof key != "string"
? 1 : map.__m.has(key) ? 3 : 2);
}}, "java.util.Map,~O");
c$.__isSimple = Clazz_defineMethod(c$, "__isSimple", 
function(map){
{
return !!map.__m;
}}, "java.util.Map");
c$.__ensureJavaMap = Clazz_defineMethod(c$, "__ensureJavaMap", 
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
var c$ = Clazz_declareAnonymous(java.util, "Hashtable$Enumerator$1", java.util.Hashtable.Entry);
Clazz_overrideMethod(c$, "setValue", 
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
Clazz_load(["java.util.Map"], "java.util.MapEntry", null, function(){
var c$ = Clazz_decorateAsClass(function(){
this.key = null;
this.value = null;
Clazz_instantialize(this, arguments);}, java.util, "MapEntry", null, [java.util.Map.Entry, Cloneable]);
Clazz_makeConstructor(c$, 
function(theKey){
this.key = theKey;
}, "~O");
Clazz_makeConstructor(c$, 
function(theKey, theValue){
this.key = theKey;
this.value = theValue;
}, "~O,~O");
Clazz_defineMethod(c$, "clone", 
function(){
try {
return Clazz_superCall(this, java.util.MapEntry, "clone", []);
} catch (e) {
if (Clazz_exceptionOf(e,"CloneNotSupportedException")){
return null;
} else {
throw e;
}
}
});
Clazz_overrideMethod(c$, "equals", 
function(object){
if (this === object) {
return true;
}if (Clazz_instanceOf(object,"java.util.Map.Entry")) {
var entry = object;
return (this.key == null ? entry.getKey() == null : this.key.equals(entry.getKey())) && (this.value == null ? entry.getValue() == null : this.value.equals(entry.getValue()));
}return false;
}, "~O");
Clazz_overrideMethod(c$, "getKey", 
function(){
return this.key;
});
Clazz_overrideMethod(c$, "getValue", 
function(){
return this.value;
});
Clazz_overrideMethod(c$, "hashCode", 
function(){
return (this.key == null ? 0 : this.key.hashCode()) ^ (this.value == null ? 0 : this.value.hashCode());
});
Clazz_overrideMethod(c$, "setValue", 
function(object){
var result = this.value;
this.value = object;
return result;
}, "~O");
Clazz_overrideMethod(c$, "toString", 
function(){
return this.key + "=" + this.value;
});
Clazz_declareInterface(java.util.MapEntry, "Type");
});
;//5.0.1-v7 Mon May 12 23:42:45 CDT 2025
Clazz_load(["java.util.Hashtable"], "java.util.Properties", null, function(){
var c$ = Clazz_decorateAsClass(function(){
this.builder = null;
this.defaults = null;
Clazz_instantialize(this, arguments);}, java.util, "Properties", java.util.Hashtable);
Clazz_makeConstructor(c$, 
function(){
Clazz_superConstructor (this, java.util.Properties, []);
});
Clazz_makeConstructor(c$, 
function(properties){
this.initHT();
this.defaults = (properties == null ? null : properties);
}, "java.util.Properties");
Clazz_defineMethod(c$, "dumpString", 
function(buffer, string, key){
var i = 0;
if (!key && i < string.length && string.charAt(i) == ' ') {
buffer += ("\\ ");
i++;
}for (; i < string.length; i++) {
var ch = string.charAt(i);
switch ((ch).charCodeAt(0)) {
case 9:
buffer += ("\\t");
break;
case 10:
buffer += ("\\n");
break;
case 12:
buffer += ("\\f");
break;
case 13:
buffer += ("\\r");
break;
default:
if ("\\#!=:".indexOf(ch) >= 0 || (key && ch == ' ')) {
buffer += ('\\');
}if (ch >= ' ' && ch <= '~') {
buffer += (ch);
} else {
var hex = Integer.toHexString(ch.charCodeAt(0));
buffer += ("\\u");
for (var j = 0; j < 4 - hex.length; j++) {
buffer += ("0");
}
buffer += (hex);
}}
}
return buffer;
}, "~S,~S,~B");
Clazz_defineMethod(c$, "getProperty", 
function(name){
var result = this.get(name);
var property = (typeof(result)=='string') ? result : null;
if (property == null && this.defaults != null) {
property = this.defaults.getProperty(name);
}return property;
}, "~S");
Clazz_defineMethod(c$, "getProperty", 
function(name, defaultValue){
var result = this.get(name);
var property = (typeof(result)=='string') ? result : null;
if (property == null && this.defaults != null) {
property = this.defaults.getProperty(name);
}if (property == null) {
return defaultValue;
}return property;
}, "~S,~S");
Clazz_defineMethod(c$, "list", 
function(out){
if (out == null) {
throw  new NullPointerException();
}var buffer = "";
var keys = this.propertyNames();
while (keys.hasMoreElements()) {
var key = keys.nextElement();
buffer += (key);
buffer += ('=');
var property = this.get(key);
var def = this.defaults;
while (property == null) {
property = def.get(key);
def = def.defaults;
}
if (property.length > 40) {
buffer += (property.substring(0, 37));
buffer += ("...");
} else {
buffer += (property);
}out.println(buffer.toString());
buffer = "";
}
}, "java.io.PrintStream");
Clazz_defineMethod(c$, "list", 
function(writer){
if (writer == null) {
throw  new NullPointerException();
}var buffer = "";
var keys = this.propertyNames();
while (keys.hasMoreElements()) {
var key = keys.nextElement();
buffer += (key);
buffer += ('=');
var property = this.get(key);
var def = this.defaults;
while (property == null) {
property = def.get(key);
def = def.defaults;
}
if (property.length > 40) {
buffer += (property.substring(0, 37));
buffer += ("...");
} else {
buffer += (property);
}writer.println(buffer.toString());
buffer = "";
}
}, "java.io.PrintWriter");
Clazz_defineMethod(c$, "load", 
function($in){

}, "java.io.InputStream");
Clazz_defineMethod(c$, "propertyNames", 
function(){
if (this.defaults == null) {
return this.keys();
}var set =  new java.util.Hashtable(this.defaults.size() + this.size());
var keys = this.defaults.propertyNames();
while (keys.hasMoreElements()) {
set.put(keys.nextElement(), set);
}
keys = this.keys();
while (keys.hasMoreElements()) {
set.put(keys.nextElement(), set);
}
return set.keys();
});
Clazz_defineMethod(c$, "save", 
function(out, comment){
try {
this.store(out, comment);
} catch (e) {
if (Clazz_exceptionOf(e,"java.io.IOException")){
} else {
throw e;
}
}
}, "java.io.OutputStream,~S");
Clazz_defineMethod(c$, "setProperty", 
function(name, value){
return this.put(name, value);
}, "~S,~S");
Clazz_defineMethod(c$, "store", 
function(out, comment){

}, "java.io.OutputStream,~S");
Clazz_defineMethod(c$, "loadFromXML", 
function($in){

}, "java.io.InputStream");
Clazz_defineMethod(c$, "storeToXML", 
function(os, comment){

}, "java.io.OutputStream,~S");
Clazz_defineMethod(c$, "storeToXML", 
function(os, comment, encoding){

}, "java.io.OutputStream,~S,~S");
Clazz_defineMethod(c$, "substitutePredefinedEntries", 
function(s){
return s.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll("\u0027", "&apos;").replaceAll("\"", "&quot;");
}, "~S");
c$.lineSeparator = null;
});
;//5.0.1-v7 Mon May 12 23:42:45 CDT 2025
Clazz_declareInterface(java.util, "SortedMap", java.util.Map);
;//5.0.1-v7 Mon May 12 23:42:45 CDT 2025
Clazz_declareInterface(java.util, "SortedSet", java.util.Set);
;//5.0.1-v7 Mon May 12 23:42:45 CDT 2025
Clazz_load(["java.util.Enumeration"], "java.util.StringTokenizer", null, function(){
var c$ = Clazz_decorateAsClass(function(){
this.string = null;
this.delimiters = null;
this.returnDelimiters = false;
this.position = 0;
Clazz_instantialize(this, arguments);}, java.util, "StringTokenizer", null, java.util.Enumeration);
Clazz_makeConstructor(c$, 
function(string, delimiters, returnDelimiters){
{
switch (arguments.length) {
case 1: delimiters = " \t\n\r\f";
case 2: returnDelimiters = false;
}
}if (string == null) throw  new NullPointerException();
this.string = string;
this.delimiters = delimiters;
this.returnDelimiters = returnDelimiters;
this.position = 0;
}, "~S,~S,~B");
Clazz_defineMethod(c$, "countTokens", 
function(){
var count = 0;
var inToken = false;
for (var i = this.position, length = this.string.length; i < length; i++) {
if (this.delimiters.indexOf(this.string.charAt(i), 0) >= 0) {
if (this.returnDelimiters) count++;
if (inToken) {
count++;
inToken = false;
}} else {
inToken = true;
}}
if (inToken) count++;
return count;
});
Clazz_overrideMethod(c$, "hasMoreElements", 
function(){
return this.hasMoreTokens();
});
Clazz_defineMethod(c$, "hasMoreTokens", 
function(){
var length = this.string.length;
if (this.position < length) {
if (this.returnDelimiters) return true;
for (var i = this.position; i < length; i++) if (this.delimiters.indexOf(this.string.charAt(i), 0) == -1) return true;

}return false;
});
Clazz_overrideMethod(c$, "nextElement", 
function(){
return this.nextToken();
});
Clazz_defineMethod(c$, "nextToken", 
function(){
{
(arguments.length == 1) && (this.delimiters = arguments[0]);
}var i = this.position;
var length = this.string.length;
if (i < length) {
if (this.returnDelimiters) {
if (this.delimiters.indexOf(this.string.charAt(this.position), 0) >= 0) return String.valueOf(this.string.charAt(this.position++));
for (this.position++; this.position < length; this.position++) if (this.delimiters.indexOf(this.string.charAt(this.position), 0) >= 0) return this.string.substring(i, this.position);

return this.string.substring(i);
}while (i < length && this.delimiters.indexOf(this.string.charAt(i), 0) >= 0) i++;

this.position = i;
if (i < length) {
for (this.position++; this.position < length; this.position++) if (this.delimiters.indexOf(this.string.charAt(this.position), 0) >= 0) return this.string.substring(i, this.position);

return this.string.substring(i);
}}throw  new java.util.NoSuchElementException();
});
});
;//5.0.1-v7 Mon May 12 23:42:45 CDT 2025
Clazz_declarePackage("javajs.api");
Clazz_declareInterface(javajs.api, "BytePoster");
;//5.0.1-v7 Sat Feb 21 18:17:38 CST 2026
Clazz_declarePackage("javajs.api");
Clazz_declareInterface(javajs.api, "GenericColor");
;//5.0.1-v7 Sat Feb 21 18:17:38 CST 2026
Clazz_declarePackage("J.api");
Clazz_declareInterface(J.api, "GenericFileInterface");
;//5.0.1-v7 Sat Feb 21 18:17:38 CST 2026
Clazz_declarePackage("javajs.api");
Clazz_declareInterface(javajs.api, "GenericOutputChannel");
;//5.0.1-v7 Sat Feb 21 18:17:38 CST 2026
Clazz_declarePackage("javajs.api");
Clazz_declareInterface(javajs.api, "JSInterface");
;//5.0.1-v7 Sat Feb 21 18:17:38 CST 2026
Clazz_declarePackage("javajs.api");
Clazz_declareInterface(javajs.api, "JSONEncodable");
;//5.0.1-v7 Sat Feb 21 18:17:38 CST 2026
Clazz_declarePackage("javajs.api");
Clazz_declareInterface(javajs.api, "ZInputStream");
;//5.0.1-v7 Sat Feb 21 18:17:38 CST 2026
Clazz_declarePackage("javajs.api.js");
Clazz_declareInterface(javajs.api.js, "J2SObjectInterface");
;//5.0.1-v7 Sat Feb 21 18:17:38 CST 2026
Clazz_declarePackage("J.api");
Clazz_declareInterface(J.api, "GenericMouseInterface");
;//5.0.1-v7 Sat Feb 21 18:17:38 CST 2026
Clazz_declarePackage("J.api");
Clazz_load(["J.api.FontManager"], "J.api.GenericPlatform", null, function(){
var c$ = Clazz_declareInterface(J.api, "GenericPlatform", J.api.FontManager);
});
;//5.0.1-v7 Sat Feb 21 18:17:38 CST 2026
Clazz_declarePackage("J.api");
Clazz_declareInterface(J.api, "PlatformViewer");
;//5.0.1-v7 Sat Feb 21 18:17:38 CST 2026
Clazz_declarePackage("J.api");
Clazz_declareInterface(J.api, "EventManager");
;//5.0.1-v7 Sat Feb 21 18:17:38 CST 2026
Clazz_declarePackage("J.api");
Clazz_declareInterface(J.api, "FontManager");
;//5.0.1-v7 Sat Feb 21 18:17:38 CST 2026
Clazz_declarePackage("JU");
Clazz_load(null, "JU.Font", ["JU.AU"], function(){
var c$ = Clazz_decorateAsClass(function(){
this.fid = 0;
this.fontFace = null;
this.fontStyle = null;
this.fontSizeNominal = 0;
this.idFontFace = 0;
this.idFontStyle = 0;
this.fontSize = 0;
this.font = null;
this.fontMetrics = null;
this.manager = null;
this.ascent = 0;
this.descent = 0;
this.isBold = false;
this.isItalic = false;
this.fontSizeAngstroms = 0;
Clazz_instantialize(this, arguments);}, JU, "Font", null);
Clazz_makeConstructor(c$, 
function(manager, fid, idFontFace, idFontStyle, fontSize, fontSizeNominal, fontSizeAngstroms, graphics){
this.manager = manager;
this.fid = fid;
this.fontFace = JU.Font.fontFaces[idFontFace];
this.fontStyle = JU.Font.fontStyles[idFontStyle];
this.idFontFace = idFontFace;
this.idFontStyle = idFontStyle;
this.fontSize = fontSize;
this.fontSizeAngstroms = fontSizeAngstroms;
this.isBold = (idFontStyle & 1) == 1;
this.isItalic = (idFontStyle & 2) == 2;
this.fontSizeNominal = fontSizeNominal;
this.font = manager.newFont(JU.Font.fontFaces[idFontFace], this.isBold, this.isItalic, fontSize);
this.fontMetrics = manager.getFontMetrics(this, graphics);
this.descent = manager.getFontDescent(this.fontMetrics);
this.ascent = manager.getFontAscent(this.fontMetrics);
}, "J.api.FontManager,~N,~N,~N,~N,~N,~N,~O");
c$.getFont3D = Clazz_defineMethod(c$, "getFont3D", 
function(fontID){
return JU.Font.font3ds[fontID];
}, "~N");
c$.createFont3D = Clazz_defineMethod(c$, "createFont3D", 
function(fontface, fontstyle, fontsize, fontsizeNominal, fontSizeAngstroms, manager, graphicsForMetrics){
if (fontsize > 0xFF) fontsize = 0xFF;
if (fontsize < 0) {
fontSizeAngstroms = -fontsize;
fontsizeNominal = fontsize = 10;
}var fontsizeX16 = (Clazz_floatToInt(fontsize)) << 4;
var fontkey = ((fontface & 3) | ((fontstyle & 3) << 2) | (fontsizeX16 << 4));
for (var i = JU.Font.fontkeyCount; --i > 0; ) if (fontkey == JU.Font.fontkeys[i] && JU.Font.font3ds[i].fontSizeNominal == fontsizeNominal) return JU.Font.font3ds[i];

var fontIndexNext = JU.Font.fontkeyCount++;
if (fontIndexNext == JU.Font.fontkeys.length) {
JU.Font.fontkeys = JU.AU.arrayCopyI(JU.Font.fontkeys, fontIndexNext + 8);
JU.Font.font3ds = JU.AU.arrayCopyObject(JU.Font.font3ds, fontIndexNext + 8);
}var font3d =  new JU.Font(manager, fontIndexNext, fontface, fontstyle, fontsize, fontsizeNominal, fontSizeAngstroms, graphicsForMetrics);
JU.Font.font3ds[fontIndexNext] = font3d;
JU.Font.fontkeys[fontIndexNext] = fontkey;
return font3d;
}, "~N,~N,~N,~N,~N,J.api.FontManager,~O");
c$.getFontFaceID = Clazz_defineMethod(c$, "getFontFaceID", 
function(fontface){
return ("Monospaced".equalsIgnoreCase(fontface) ? 2 : "Serif".equalsIgnoreCase(fontface) ? 1 : 0);
}, "~S");
c$.getFontStyleID = Clazz_defineMethod(c$, "getFontStyleID", 
function(fontstyle){
for (var i = 4; --i >= 0; ) if (JU.Font.fontStyles[i].equalsIgnoreCase(fontstyle)) return i;

return -1;
}, "~S");
Clazz_defineMethod(c$, "getAscent", 
function(){
return this.ascent;
});
Clazz_defineMethod(c$, "getDescent", 
function(){
return this.descent;
});
Clazz_defineMethod(c$, "getHeight", 
function(){
return this.getAscent() + this.getDescent();
});
Clazz_defineMethod(c$, "getFontMetrics", 
function(){
return this.fontMetrics;
});
Clazz_defineMethod(c$, "stringWidth", 
function(text){
return this.manager.fontStringWidth(this, text);
}, "~S");
Clazz_defineMethod(c$, "getInfo", 
function(){
return (this.fontSizeAngstroms > 0 ? -this.fontSizeAngstroms : this.fontSizeNominal) + " " + this.fontFace + " " + this.fontStyle;
});
Clazz_overrideMethod(c$, "toString", 
function(){
return "[" + this.getInfo() + "]";
});
c$.fontkeyCount = 1;
c$.fontkeys =  Clazz_newIntArray (8, 0);
c$.font3ds =  new Array(8);
c$.fontFaces =  Clazz_newArray(-1, ["SansSerif", "Serif", "Monospaced", ""]);
c$.fontStyles =  Clazz_newArray(-1, ["Plain", "Bold", "Italic", "BoldItalic"]);
});
;//5.0.1-v7 Sat Feb 21 18:17:38 CST 2026
Clazz_declarePackage("JS");
Clazz_load(["javajs.api.GenericColor"], "JS.Color", null, function(){
var c$ = Clazz_decorateAsClass(function(){
this.argb = 0;
Clazz_instantialize(this, arguments);}, JS, "Color", null, javajs.api.GenericColor);
Clazz_overrideMethod(c$, "addAlpha", 
function(a){
if (this.getOpacity255() != 0xFF) return this;
var c =  new JS.Color();
c.argb = (this.argb & 0xFFFFFF) | (a << 24);
return c;
}, "~N");
Clazz_overrideMethod(c$, "getRGB", 
function(){
return this.argb & 0x00FFFFFF;
});
Clazz_overrideMethod(c$, "getOpacity255", 
function(){
return ((this.argb >> 24) & 0xFF);
});
c$.get1 = Clazz_defineMethod(c$, "get1", 
function(rgb){
var c =  new JS.Color();
c.argb = rgb | 0xFF000000;
return c;
}, "~N");
c$.get3 = Clazz_defineMethod(c$, "get3", 
function(r, g, b){
return  new JS.Color().set4(r, g, b, 0xFF);
}, "~N,~N,~N");
c$.get4 = Clazz_defineMethod(c$, "get4", 
function(r, g, b, a){
return  new JS.Color().set4(r, g, b, a);
}, "~N,~N,~N,~N");
Clazz_defineMethod(c$, "set4", 
function(r, g, b, a){
this.argb = ((a << 24) | (r << 16) | (g << 8) | b) & 0xFFFFFFFF;
return this;
}, "~N,~N,~N,~N");
Clazz_overrideMethod(c$, "toString", 
function(){
var s = ("00000000" + Integer.toHexString(this.argb));
return "[0x" + s.substring(s.length - 8, s.length) + "]";
});
});
;//5.0.1-v7 Sat Feb 21 18:17:38 CST 2026
Clazz_declarePackage("JS");
(function(){
var c$ = Clazz_decorateAsClass(function(){
this.width = 0;
this.height = 0;
Clazz_instantialize(this, arguments);}, JS, "Dimension", null);
Clazz_makeConstructor(c$, 
function(w, h){
this.set(w, h);
}, "~N,~N");
Clazz_defineMethod(c$, "set", 
function(w, h){
this.width = w;
this.height = h;
return this;
}, "~N,~N");
})();
;//5.0.1-v7 Sat Feb 21 18:17:38 CST 2026
Clazz_declarePackage("J.awtjs");
(function(){
var c$ = Clazz_declareType(J.awtjs, "Event", null);
})();
;//5.0.1-v7 Sat Feb 21 18:17:38 CST 2026
Clazz_declarePackage("J.api");
Clazz_declareInterface(J.api, "GenericMenuInterface");
;//5.0.1-v7 Sat Feb 21 18:17:38 CST 2026
Clazz_declarePackage("JU");
Clazz_load(["JU.P3"], "JU.A4", ["JU.T3"], function(){
var c$ = Clazz_decorateAsClass(function(){
this.angle = 0;
Clazz_instantialize(this, arguments);}, JU, "A4", JU.P3);
Clazz_makeConstructor(c$, 
function(){
Clazz_superConstructor (this, JU.A4, []);
this.z = 1.0;
});
c$.new4 = Clazz_defineMethod(c$, "new4", 
function(x, y, z, angle){
var a =  new JU.A4();
a.set4(x, y, z, angle);
return a;
}, "~N,~N,~N,~N");
c$.newAA = Clazz_defineMethod(c$, "newAA", 
function(a1){
var a =  new JU.A4();
a.set4(a1.x, a1.y, a1.z, a1.angle);
return a;
}, "JU.A4");
c$.newVA = Clazz_defineMethod(c$, "newVA", 
function(axis, angle){
var a =  new JU.A4();
a.setVA(axis, angle);
return a;
}, "JU.V3,~N");
Clazz_defineMethod(c$, "setVA", 
function(axis, angle){
this.x = axis.x;
this.y = axis.y;
this.z = axis.z;
this.angle = angle;
}, "JU.V3,~N");
Clazz_defineMethod(c$, "set4", 
function(x, y, z, angle){
this.x = x;
this.y = y;
this.z = z;
this.angle = angle;
}, "~N,~N,~N,~N");
Clazz_defineMethod(c$, "setAA", 
function(a){
this.x = a.x;
this.y = a.y;
this.z = a.z;
this.angle = a.angle;
}, "JU.A4");
Clazz_defineMethod(c$, "setM", 
function(m1){
this.setFromMat(m1.m00, m1.m01, m1.m02, m1.m10, m1.m11, m1.m12, m1.m20, m1.m21, m1.m22);
}, "JU.M3");
Clazz_defineMethod(c$, "setFromMat", 
function(m00, m01, m02, m10, m11, m12, m20, m21, m22){
var cos = (m00 + m11 + m22 - 1.0) * 0.5;
this.x = (m21 - m12);
this.y = (m02 - m20);
this.z = (m10 - m01);
var sin = 0.5 * Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
if (sin == 0 && cos == 1) {
this.x = this.y = 0;
this.z = 1;
this.angle = 0;
} else {
this.angle = Math.atan2(sin, cos);
}}, "~N,~N,~N,~N,~N,~N,~N,~N,~N");
Clazz_overrideMethod(c$, "hashCode", 
function(){
return JU.T3.floatToIntBits(this.x) ^ JU.T3.floatToIntBits(this.y) ^ JU.T3.floatToIntBits(this.z) ^ JU.T3.floatToIntBits(this.angle);
});
Clazz_overrideMethod(c$, "equals", 
function(o){
if (!(Clazz_instanceOf(o,"JU.A4"))) return false;
var a1 = o;
return this.x == a1.x && this.y == a1.y && this.z == a1.z && this.angle == a1.angle;
}, "~O");
Clazz_overrideMethod(c$, "toString", 
function(){
return "(" + this.x + ", " + this.y + ", " + this.z + ", " + this.angle + ")";
});
Clazz_overrideMethod(c$, "toJSON", 
function(){
return "[" + this.x + "," + this.y + "," + this.z + "," + (this.angle * 180.0 / 3.141592653589793) + "]";
});
});
;//5.0.1-v7 Sat Feb 21 18:17:38 CST 2026
Clazz_declarePackage("JU");
Clazz_load(["java.net.URLConnection"], "JU.AjaxURLConnection", ["JU.AU", "$.Rdr"], function(){
var c$ = Clazz_decorateAsClass(function(){
this.bytesOut = null;
this.postOut = "";
Clazz_instantialize(this, arguments);}, JU, "AjaxURLConnection", java.net.URLConnection);
Clazz_defineMethod(c$, "doAjax", 
function(){
var jmol = null;
{
jmol = Jmol;
}return jmol.doAjax(this.url, this.postOut, this.bytesOut, false);
});
Clazz_overrideMethod(c$, "connect", 
function(){
});
Clazz_defineMethod(c$, "outputBytes", 
function(bytes){
this.bytesOut = bytes;
}, "~A");
Clazz_defineMethod(c$, "outputString", 
function(post){
this.postOut = post;
}, "~S");
Clazz_overrideMethod(c$, "getInputStream", 
function(){
var is = null;
var o = this.doAjax();
if (JU.AU.isAB(o)) is = JU.Rdr.getBIS(o);
 else if (Clazz_instanceOf(o,"JU.SB")) is = JU.Rdr.getBIS(JU.Rdr.getBytesFromSB(o));
 else if ((typeof(o)=='string')) is = JU.Rdr.getBIS((o).getBytes());
return is;
});
Clazz_defineMethod(c$, "getContents", 
function(){
return this.doAjax();
});
});
;//5.0.1-v7 Sat Feb 21 18:17:38 CST 2026
Clazz_declarePackage("JU");
Clazz_load(["java.net.URLStreamHandler"], "JU.AjaxURLStreamHandler", ["JU.AjaxURLConnection", "$.SB"], function(){
var c$ = Clazz_decorateAsClass(function(){
this.protocol = null;
Clazz_instantialize(this, arguments);}, JU, "AjaxURLStreamHandler", java.net.URLStreamHandler);
Clazz_makeConstructor(c$, 
function(protocol){
Clazz_superConstructor (this, JU.AjaxURLStreamHandler, []);
this.protocol = protocol;
}, "~S");
Clazz_defineMethod(c$, "openConnection", 
function(url){
return  new JU.AjaxURLConnection(url);
}, "java.net.URL");
Clazz_overrideMethod(c$, "toExternalForm", 
function(u){
var result =  new JU.SB();
result.append(u.getProtocol());
result.append(":");
if (u.getAuthority() != null && u.getAuthority().length > 0) {
result.append("//");
result.append(u.getAuthority());
}if (u.getPath() != null) {
result.append(u.getPath());
}if (u.getQuery() != null) {
result.append("?");
result.append(u.getQuery());
}if (u.getRef() != null) {
result.append("#");
result.append(u.getRef());
}return result.toString();
}, "java.net.URL");
});
;//5.0.1-v7 Sat Feb 21 18:17:38 CST 2026
Clazz_declarePackage("JU");
Clazz_load(["java.net.URLStreamHandlerFactory", "java.util.Hashtable"], "JU.AjaxURLStreamHandlerFactory", ["JU.AjaxURLStreamHandler"], function(){
var c$ = Clazz_decorateAsClass(function(){
this.htFactories = null;
Clazz_instantialize(this, arguments);}, JU, "AjaxURLStreamHandlerFactory", null, java.net.URLStreamHandlerFactory);
Clazz_prepareFields (c$, function(){
this.htFactories =  new java.util.Hashtable();
});
Clazz_overrideMethod(c$, "createURLStreamHandler", 
function(protocol){
var fac = this.htFactories.get(protocol);
if (fac == null) this.htFactories.put(protocol, fac =  new JU.AjaxURLStreamHandler(protocol));
return (fac.protocol == null ? null : fac);
}, "~S");
});
;//5.0.1-v7 Sat Feb 21 18:17:38 CST 2026
Clazz_declarePackage("JU");
Clazz_load(null, "JU.AU", ["java.lang.reflect.Array", "java.util.Arrays", "JU.Lst"], function(){
var c$ = Clazz_declareType(JU, "AU", null);
c$.ensureLength = Clazz_defineMethod(c$, "ensureLength", 
function(array, minimumLength){
return (array != null && JU.AU.getLength(array) >= minimumLength ? array : JU.AU.arrayCopyObject(array, minimumLength));
}, "~O,~N");
c$.ensureLengthS = Clazz_defineMethod(c$, "ensureLengthS", 
function(array, minimumLength){
return (array != null && array.length >= minimumLength ? array : JU.AU.arrayCopyS(array, minimumLength));
}, "~A,~N");
c$.ensureLengthA = Clazz_defineMethod(c$, "ensureLengthA", 
function(array, minimumLength){
return (array != null && array.length >= minimumLength ? array : JU.AU.arrayCopyF(array, minimumLength));
}, "~A,~N");
c$.ensureLengthI = Clazz_defineMethod(c$, "ensureLengthI", 
function(array, minimumLength){
return (array != null && array.length >= minimumLength ? array : JU.AU.arrayCopyI(array, minimumLength));
}, "~A,~N");
c$.ensureLengthShort = Clazz_defineMethod(c$, "ensureLengthShort", 
function(array, minimumLength){
return (array != null && array.length >= minimumLength ? array : JU.AU.arrayCopyShort(array, minimumLength));
}, "~A,~N");
c$.ensureLengthByte = Clazz_defineMethod(c$, "ensureLengthByte", 
function(array, minimumLength){
return (array != null && array.length >= minimumLength ? array : JU.AU.arrayCopyByte(array, minimumLength));
}, "~A,~N");
c$.doubleLength = Clazz_defineMethod(c$, "doubleLength", 
function(array){
return JU.AU.arrayCopyObject(array, (array == null ? 16 : 2 * JU.AU.getLength(array)));
}, "~O");
c$.doubleLengthS = Clazz_defineMethod(c$, "doubleLengthS", 
function(array){
return JU.AU.arrayCopyS(array, (array == null ? 16 : 2 * array.length));
}, "~A");
c$.doubleLengthF = Clazz_defineMethod(c$, "doubleLengthF", 
function(array){
return JU.AU.arrayCopyF(array, (array == null ? 16 : 2 * array.length));
}, "~A");
c$.doubleLengthI = Clazz_defineMethod(c$, "doubleLengthI", 
function(array){
return JU.AU.arrayCopyI(array, (array == null ? 16 : 2 * array.length));
}, "~A");
c$.doubleLengthShort = Clazz_defineMethod(c$, "doubleLengthShort", 
function(array){
return JU.AU.arrayCopyShort(array, (array == null ? 16 : 2 * array.length));
}, "~A");
c$.doubleLengthByte = Clazz_defineMethod(c$, "doubleLengthByte", 
function(array){
return JU.AU.arrayCopyByte(array, (array == null ? 16 : 2 * array.length));
}, "~A");
c$.doubleLengthBool = Clazz_defineMethod(c$, "doubleLengthBool", 
function(array){
return JU.AU.arrayCopyBool(array, (array == null ? 16 : 2 * array.length));
}, "~A");
c$.deleteElements = Clazz_defineMethod(c$, "deleteElements", 
function(array, firstElement, nElements){
if (nElements == 0 || array == null) return array;
var oldLength = JU.AU.getLength(array);
if (firstElement >= oldLength) return array;
var n = oldLength - (firstElement + nElements);
if (n < 0) n = 0;
var t = JU.AU.newInstanceO(array, firstElement + n);
if (firstElement > 0) System.arraycopy(array, 0, t, 0, firstElement);
if (n > 0) System.arraycopy(array, firstElement + nElements, t, firstElement, n);
return t;
}, "~O,~N,~N");
c$.arrayCopyObject = Clazz_defineMethod(c$, "arrayCopyObject", 
function(array, newLength){
var oldLength = (array == null ? -1 : JU.AU.getLength(array));
if (newLength < 0) newLength = oldLength;
if (newLength == oldLength) return array;
{
if (newLength < oldLength) return Clazz_newArray(-1, array, 0, newLength);
}var t = JU.AU.newInstanceO(array, newLength);
if (oldLength > 0) System.arraycopy(array, 0, t, 0, oldLength < newLength ? oldLength : newLength);
return t;
}, "~O,~N");
c$.newInstanceO = Clazz_defineMethod(c$, "newInstanceO", 
function(array, n){
if (JU.AU.isAI(array)) return  Clazz_newIntArray (n, 0);
{
if (!array.getClass || !array.getClass().getComponentType)
return new Array(n);
}return java.lang.reflect.Array.newInstance(array.getClass().getComponentType(), n);
}, "~O,~N");
c$.getLength = Clazz_defineMethod(c$, "getLength", 
function(array){
{
return array.length
}}, "~O");
c$.arrayCopyS = Clazz_defineMethod(c$, "arrayCopyS", 
function(array, newLength){
var oldLength = (array == null ? -1 : array.length);
if (newLength < 0) newLength = oldLength;
{
if (newLength < oldLength) return Clazz_newArray(-1, array, 0, newLength);
}var t =  new Array(newLength);
if (array != null) {
System.arraycopy(array, 0, t, 0, oldLength < newLength ? oldLength : newLength);
}return t;
}, "~A,~N");
c$.arrayCopyII = Clazz_defineMethod(c$, "arrayCopyII", 
function(array, newLength){
var t = JU.AU.newInt2(newLength);
if (array != null) {
var oldLength = array.length;
System.arraycopy(array, 0, t, 0, oldLength < newLength ? oldLength : newLength);
}return t;
}, "~A,~N");
c$.arrayCopyPt = Clazz_defineMethod(c$, "arrayCopyPt", 
function(array, newLength){
if (newLength < 0) newLength = array.length;
var t =  new Array(newLength);
if (array != null) {
var oldLength = array.length;
System.arraycopy(array, 0, t, 0, oldLength < newLength ? oldLength : newLength);
}return t;
}, "~A,~N");
c$.arrayCopyF = Clazz_defineMethod(c$, "arrayCopyF", 
function(array, newLength){
var oldLength = (array == null ? -1 : array.length);
if (newLength < 0) newLength = oldLength;
{
if (newLength < oldLength) return Clazz_newArray(-1, array, 0, newLength);
}var t =  Clazz_newFloatArray (newLength, 0);
if (array != null) {
System.arraycopy(array, 0, t, 0, oldLength < newLength ? oldLength : newLength);
}return t;
}, "~A,~N");
c$.arrayCopyI = Clazz_defineMethod(c$, "arrayCopyI", 
function(array, newLength){
var oldLength = (array == null ? -1 : array.length);
if (newLength < 0) newLength = oldLength;
{
if (newLength < oldLength) return Clazz_newArray(-1, array, 0, newLength);
}var t =  Clazz_newIntArray (newLength, 0);
if (array != null) {
System.arraycopy(array, 0, t, 0, oldLength < newLength ? oldLength : newLength);
}return t;
}, "~A,~N");
c$.arrayCopyRangeI = Clazz_defineMethod(c$, "arrayCopyRangeI", 
function(array, i0, n){
if (array == null) return null;
var oldLength = array.length;
if (n == -1) n = oldLength;
if (n == -2) n = Clazz_doubleToInt(oldLength / 2);
{
return Clazz_newArray(-1, array, i0, n);
}}, "~A,~N,~N");
c$.arrayCopyRangeRevI = Clazz_defineMethod(c$, "arrayCopyRangeRevI", 
function(array, i0, n){
if (array == null) return null;
{
return Clazz_newArray(-1, array, i0, n).reverse();
}}, "~A,~N,~N");
c$.arrayCopyShort = Clazz_defineMethod(c$, "arrayCopyShort", 
function(array, newLength){
var oldLength = (array == null ? -1 : array.length);
if (newLength < 0) newLength = oldLength;
{
if (newLength < oldLength) return Clazz_newArray(-1, array, 0, newLength);
}var t =  Clazz_newShortArray (newLength, 0);
if (array != null) {
System.arraycopy(array, 0, t, 0, oldLength < newLength ? oldLength : newLength);
}return t;
}, "~A,~N");
c$.arrayCopyByte = Clazz_defineMethod(c$, "arrayCopyByte", 
function(array, newLength){
var oldLength = (array == null ? -1 : array.length);
if (newLength < 0) newLength = oldLength;
{
if (newLength < oldLength) return Clazz_newArray(-1, array, 0, newLength);
}var t =  Clazz_newByteArray (newLength, 0);
if (array != null) {
System.arraycopy(array, 0, t, 0, oldLength < newLength ? oldLength : newLength);
}return t;
}, "~A,~N");
c$.arrayCopyBool = Clazz_defineMethod(c$, "arrayCopyBool", 
function(array, newLength){
var oldLength = (array == null ? -1 : array.length);
if (newLength < 0) newLength = oldLength;
{
if (newLength < oldLength) return Clazz_newArray(-1, array, 0, newLength);
}var t =  Clazz_newBooleanArray(newLength, false);
if (array != null) {
System.arraycopy(array, 0, t, 0, oldLength < newLength ? oldLength : newLength);
}return t;
}, "~A,~N");
c$.swapInt = Clazz_defineMethod(c$, "swapInt", 
function(array, indexA, indexB){
var t = array[indexA];
array[indexA] = array[indexB];
array[indexB] = t;
}, "~A,~N,~N");
c$.dumpArray = Clazz_defineMethod(c$, "dumpArray", 
function(msg, A, x1, x2, y1, y2){
var s = "dumpArray: " + msg + "\n";
for (var x = x1; x <= x2; x++) s += "\t*" + x + "*";

for (var y = y2; y >= y1; y--) {
s += "\n*" + y + "*";
for (var x = x1; x <= x2; x++) s += "\t" + (x < A.length && y < A[x].length ? A[x][y] : NaN);

}
return s;
}, "~S,~A,~N,~N,~N,~N");
c$.dumpIntArray = Clazz_defineMethod(c$, "dumpIntArray", 
function(A, n){
var str = "";
for (var i = 0; i < n; i++) str += " " + A[i];

return str;
}, "~A,~N");
c$.sortedItem = Clazz_defineMethod(c$, "sortedItem", 
function(v, n){
if (v.size() == 0) return null;
if (v.size() == 1) return v.get(0);
var keys = v.toArray( new Array(v.size()));
java.util.Arrays.sort(keys);
return keys[n % keys.length];
}, "JU.Lst,~N");
c$.createArrayOfArrayList = Clazz_defineMethod(c$, "createArrayOfArrayList", 
function(size){
return  new Array(size);
}, "~N");
c$.createArrayOfHashtable = Clazz_defineMethod(c$, "createArrayOfHashtable", 
function(size){
return  new Array(size);
}, "~N");
c$.swap = Clazz_defineMethod(c$, "swap", 
function(o, i, j){
var oi = o[i];
o[i] = o[j];
o[j] = oi;
}, "~A,~N,~N");
c$.newFloat2 = Clazz_defineMethod(c$, "newFloat2", 
function(n){
{
return Clazz_newArray(n, null);
}}, "~N");
c$.newInt2 = Clazz_defineMethod(c$, "newInt2", 
function(n){
{
return Clazz_newArray(n, null);
}}, "~N");
c$.newInt3 = Clazz_defineMethod(c$, "newInt3", 
function(nx, ny){
{
return Clazz_newArray(nx, null);
}}, "~N,~N");
c$.newFloat3 = Clazz_defineMethod(c$, "newFloat3", 
function(nx, ny){
{
return Clazz_newArray(nx, null);
}}, "~N,~N");
c$.newInt4 = Clazz_defineMethod(c$, "newInt4", 
function(n){
{
return Clazz_newArray(n, null);
}}, "~N");
c$.newShort2 = Clazz_defineMethod(c$, "newShort2", 
function(n){
{
return Clazz_newArray(n, null);
}}, "~N");
c$.newByte2 = Clazz_defineMethod(c$, "newByte2", 
function(n){
{
return Clazz_newArray(n, null);
}}, "~N");
c$.newDouble2 = Clazz_defineMethod(c$, "newDouble2", 
function(n){
{
return Clazz_newArray(n, null);
}}, "~N");
c$.newDouble3n = Clazz_defineMethod(c$, "newDouble3n", 
function(n){
return  Clazz_newDoubleArray (n, 0);
}, "~N");
c$.removeMapKeys = Clazz_defineMethod(c$, "removeMapKeys", 
function(map, root){
var list =  new JU.Lst();
for (var key, $key = map.keySet().iterator (); $key.hasNext()&& ((key = $key.next ()) || true);) if (key.startsWith(root)) list.addLast(key);

for (var i = list.size(); --i >= 0; ) map.remove(list.get(i));

return list.size();
}, "java.util.Map,~S");
c$.isAS = Clazz_defineMethod(c$, "isAS", 
function(x){
{
return Clazz_isAS(x);
}}, "~O");
c$.isASS = Clazz_defineMethod(c$, "isASS", 
function(x){
{
return Clazz_isASS(x);
}}, "~O");
c$.isAP = Clazz_defineMethod(c$, "isAP", 
function(x){
{
return Clazz_isAP(x);
}}, "~O");
c$.isAF = Clazz_defineMethod(c$, "isAF", 
function(x){
{
return Clazz_isAF(x);
}}, "~O");
c$.isAFloat = Clazz_defineMethod(c$, "isAFloat", 
function(x){
{
return Clazz_isAFloat(x);
}}, "~O");
c$.isAD = Clazz_defineMethod(c$, "isAD", 
function(x){
{
return Clazz_isAF(x);
}}, "~O");
c$.isADD = Clazz_defineMethod(c$, "isADD", 
function(x){
{
return Clazz_isAFF(x);
}}, "~O");
c$.isADDD = Clazz_defineMethod(c$, "isADDD", 
function(x){
{
return Clazz_isAFFF(x);
}}, "~O");
c$.isAB = Clazz_defineMethod(c$, "isAB", 
function(x){
{
return Clazz_isAB(x);
}}, "~O");
c$.isAI = Clazz_defineMethod(c$, "isAI", 
function(x){
{
return Clazz_isAI(x);
}}, "~O");
c$.isAII = Clazz_defineMethod(c$, "isAII", 
function(x){
{
return Clazz_isAII(x);
}}, "~O");
c$.isAFF = Clazz_defineMethod(c$, "isAFF", 
function(x){
{
return Clazz_isAFF(x);
}}, "~O");
c$.isAFFF = Clazz_defineMethod(c$, "isAFFF", 
function(x){
{
return Clazz_isAFFF(x);
}}, "~O");
c$.ensureSignedBytes = Clazz_defineMethod(c$, "ensureSignedBytes", 
function(b){
if (b != null) {
{
for (var i = b.length; --i >= 0;) { var j = b[i] & 0xFF; if
(j >= 0x80) j -= 0x100; b[i] = j; }
}}return b;
}, "~A");
});
;//5.0.1-v7 Sat Feb 21 18:17:38 CST 2026
Clazz_declarePackage("JU");
Clazz_load(null, "JU.Base64", ["JU.SB"], function(){
var c$ = Clazz_declareType(JU, "Base64", null);
c$.getBytes64 = Clazz_defineMethod(c$, "getBytes64", 
function(bytes){
return JU.Base64.getBase64(bytes).toBytes(0, -1);
}, "~A");
c$.getBase64 = Clazz_defineMethod(c$, "getBase64", 
function(bytes){
var nBytes = bytes.length;
var sout =  new JU.SB();
if (nBytes == 0) return sout;
for (var i = 0, nPad = 0; i < nBytes && nPad == 0; ) {
if (i % 75 == 0 && i != 0) sout.append("\r\n");
nPad = (i + 2 == nBytes ? 1 : i + 1 == nBytes ? 2 : 0);
var outbytes = ((bytes[i++] << 16) & 0xFF0000) | ((nPad == 2 ? 0 : bytes[i++] << 8) & 0x00FF00) | ((nPad >= 1 ? 0 : bytes[i++]) & 0x0000FF);
sout.appendC(JU.Base64.base64.charAt((outbytes >> 18) & 0x3F));
sout.appendC(JU.Base64.base64.charAt((outbytes >> 12) & 0x3F));
sout.appendC(nPad == 2 ? '=' : JU.Base64.base64.charAt((outbytes >> 6) & 0x3F));
sout.appendC(nPad >= 1 ? '=' : JU.Base64.base64.charAt(outbytes & 0x3F));
}
return sout;
}, "~A");
c$.decodeBase64 = Clazz_defineMethod(c$, "decodeBase64", 
function(strBase64){
var nBytes = 0;
var ch;
var pt0 = strBase64.indexOf(";base64,") + 1;
if (pt0 > 0) pt0 += 7;
var chars64 = strBase64.toCharArray();
var len64 = chars64.length;
if (len64 == 0) return  Clazz_newByteArray (0, 0);
for (var i = len64; --i >= pt0; ) nBytes += ((ch = (chars64[i]).charCodeAt(0) & 0x7F) == 65 || JU.Base64.decode64[ch] > 0 ? 3 : 0);

nBytes = nBytes >> 2;
var bytes =  Clazz_newByteArray (nBytes, 0);
var offset = 18;
for (var i = pt0, pt = 0, b = 0; i < len64; i++) {
if (JU.Base64.decode64[ch = (chars64[i]).charCodeAt(0) & 0x7F] > 0 || ch == 65 || ch == 61) {
b |= JU.Base64.decode64[ch] << offset;
offset -= 6;
if (offset < 0) {
bytes[pt++] = ((b & 0xFF0000) >> 16);
if (pt < nBytes) bytes[pt++] = ((b & 0xFF00) >> 8);
if (pt < nBytes) bytes[pt++] = (b & 0xFF);
offset = 18;
b = 0;
}}}
return bytes;
}, "~S");
c$.base64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
c$.decode64 =  Clazz_newIntArray(-1, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 62, 0, 62, 0, 63, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 0, 0, 0, 0, 63, 0, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 0, 0, 0, 0, 0]);
});
;//5.0.1-v7 Sat Feb 21 18:17:38 CST 2026
Clazz_declarePackage("JU");
Clazz_load(["javajs.api.JSONEncodable"], "JU.BS", ["JU.PT", "$.SB"], function(){
var c$ = Clazz_decorateAsClass(function(){
this.words = null;
this.wordsInUse = 0;
this.sizeIsSticky = false;
Clazz_instantialize(this, arguments);}, JU, "BS", null, [Cloneable, javajs.api.JSONEncodable]);
Clazz_makeConstructor(c$, 
function(){
this.initWords(32);
this.sizeIsSticky = false;
});
c$.wordIndex = Clazz_defineMethod(c$, "wordIndex", 
function(bitIndex){
return bitIndex >> 5;
}, "~N");
Clazz_defineMethod(c$, "recalculateWordsInUse", 
function(){
var i;
for (i = this.wordsInUse - 1; i >= 0; i--) if (this.words[i] != 0) break;

this.wordsInUse = i + 1;
});
c$.newN = Clazz_defineMethod(c$, "newN", 
function(nbits){
var bs =  new JU.BS();
bs.init(nbits);
return bs;
}, "~N");
Clazz_defineMethod(c$, "init", 
function(nbits){
if (nbits < 0) throw  new NegativeArraySizeException("nbits < 0: " + nbits);
this.initWords(nbits);
this.sizeIsSticky = true;
}, "~N");
Clazz_defineMethod(c$, "initWords", 
function(nbits){
this.words =  Clazz_newIntArray (JU.BS.wordIndex(nbits - 1) + 1, 0);
}, "~N");
Clazz_defineMethod(c$, "ensureCapacity", 
function(wordsRequired){
if (this.words.length < wordsRequired) {
var request = Math.max(2 * this.words.length, wordsRequired);
this.setLength(request);
this.sizeIsSticky = false;
}}, "~N");
Clazz_defineMethod(c$, "expandTo", 
function(wordIndex){
var wordsRequired = wordIndex + 1;
if (this.wordsInUse < wordsRequired) {
this.ensureCapacity(wordsRequired);
this.wordsInUse = wordsRequired;
}}, "~N");
Clazz_defineMethod(c$, "set", 
function(bitIndex){
if (bitIndex < 0) throw  new IndexOutOfBoundsException("bitIndex < 0: " + bitIndex);
var wordIndex = JU.BS.wordIndex(bitIndex);
this.expandTo(wordIndex);
this.words[wordIndex] |= (1 << bitIndex);
}, "~N");
Clazz_defineMethod(c$, "setBitTo", 
function(bitIndex, value){
if (value) this.set(bitIndex);
 else this.clear(bitIndex);
}, "~N,~B");
Clazz_defineMethod(c$, "setBits", 
function(fromIndex, toIndex){
if (fromIndex == toIndex) return;
var startWordIndex = JU.BS.wordIndex(fromIndex);
var endWordIndex = JU.BS.wordIndex(toIndex - 1);
this.expandTo(endWordIndex);
var firstWordMask = -1 << fromIndex;
var lastWordMask = -1 >>> -toIndex;
if (startWordIndex == endWordIndex) {
this.words[startWordIndex] |= (firstWordMask & lastWordMask);
} else {
this.words[startWordIndex] |= firstWordMask;
for (var i = startWordIndex + 1; i < endWordIndex; i++) this.words[i] = -1;

this.words[endWordIndex] |= lastWordMask;
}}, "~N,~N");
Clazz_defineMethod(c$, "clear", 
function(bitIndex){
if (bitIndex < 0) throw  new IndexOutOfBoundsException("bitIndex < 0: " + bitIndex);
var wordIndex = JU.BS.wordIndex(bitIndex);
if (wordIndex >= this.wordsInUse) return;
this.words[wordIndex] &= ~(1 << bitIndex);
this.recalculateWordsInUse();
}, "~N");
Clazz_defineMethod(c$, "clearBits", 
function(fromIndex, toIndex){
if (fromIndex == toIndex) return;
var startWordIndex = JU.BS.wordIndex(fromIndex);
if (startWordIndex >= this.wordsInUse) return;
var endWordIndex = JU.BS.wordIndex(toIndex - 1);
if (endWordIndex >= this.wordsInUse) {
toIndex = this.length();
endWordIndex = this.wordsInUse - 1;
}var firstWordMask = -1 << fromIndex;
var lastWordMask = -1 >>> -toIndex;
if (startWordIndex == endWordIndex) {
this.words[startWordIndex] &= ~(firstWordMask & lastWordMask);
} else {
this.words[startWordIndex] &= ~firstWordMask;
for (var i = startWordIndex + 1; i < endWordIndex; i++) this.words[i] = 0;

this.words[endWordIndex] &= ~lastWordMask;
}this.recalculateWordsInUse();
}, "~N,~N");
Clazz_defineMethod(c$, "clearAll", 
function(){
while (this.wordsInUse > 0) this.words[--this.wordsInUse] = 0;

});
Clazz_defineMethod(c$, "get", 
function(bitIndex){
if (bitIndex < 0) throw  new IndexOutOfBoundsException("bitIndex < 0: " + bitIndex);
var wordIndex = JU.BS.wordIndex(bitIndex);
return (wordIndex < this.wordsInUse) && ((this.words[wordIndex] & (1 << bitIndex)) != 0);
}, "~N");
Clazz_defineMethod(c$, "nextSetBit", 
function(fromIndex){
if (fromIndex < 0) throw  new IndexOutOfBoundsException("fromIndex < 0: " + fromIndex);
var u = JU.BS.wordIndex(fromIndex);
if (u >= this.wordsInUse) return -1;
var word = this.words[u] & (-1 << fromIndex);
while (true) {
if (word != 0) return (u * 32) + Integer.numberOfTrailingZeros(word);
if (++u == this.wordsInUse) return -1;
word = this.words[u];
}
}, "~N");
Clazz_defineMethod(c$, "nextClearBit", 
function(fromIndex){
if (fromIndex < 0) throw  new IndexOutOfBoundsException("fromIndex < 0: " + fromIndex);
var u = JU.BS.wordIndex(fromIndex);
if (u >= this.wordsInUse) return fromIndex;
var word = ~this.words[u] & (-1 << fromIndex);
while (true) {
if (word != 0) return (u * 32) + Integer.numberOfTrailingZeros(word);
if (++u == this.wordsInUse) return this.wordsInUse * 32;
word = ~this.words[u];
}
}, "~N");
Clazz_defineMethod(c$, "length", 
function(){
if (this.wordsInUse == 0) return 0;
return 32 * (this.wordsInUse - 1) + (32 - Integer.numberOfLeadingZeros(this.words[this.wordsInUse - 1]));
});
Clazz_defineMethod(c$, "isEmpty", 
function(){
return this.wordsInUse == 0;
});
Clazz_defineMethod(c$, "intersects", 
function(set){
for (var i = Math.min(this.wordsInUse, set.wordsInUse) - 1; i >= 0; i--) if ((this.words[i] & set.words[i]) != 0) return true;

return false;
}, "JU.BS");
Clazz_defineMethod(c$, "cardinality", 
function(){
var sum = 0;
for (var i = 0; i < this.wordsInUse; i++) sum += Integer.bitCount(this.words[i]);

return sum;
});
Clazz_defineMethod(c$, "and", 
function(set){
if (this === set) return;
while (this.wordsInUse > set.wordsInUse) this.words[--this.wordsInUse] = 0;

for (var i = 0; i < this.wordsInUse; i++) this.words[i] &= set.words[i];

this.recalculateWordsInUse();
}, "JU.BS");
Clazz_defineMethod(c$, "or", 
function(set){
if (this === set) return;
var wordsInCommon = Math.min(this.wordsInUse, set.wordsInUse);
if (this.wordsInUse < set.wordsInUse) {
this.ensureCapacity(set.wordsInUse);
this.wordsInUse = set.wordsInUse;
}for (var i = 0; i < wordsInCommon; i++) this.words[i] |= set.words[i];

if (wordsInCommon < set.wordsInUse) System.arraycopy(set.words, wordsInCommon, this.words, wordsInCommon, this.wordsInUse - wordsInCommon);
}, "JU.BS");
Clazz_defineMethod(c$, "xor", 
function(set){
var wordsInCommon = Math.min(this.wordsInUse, set.wordsInUse);
if (this.wordsInUse < set.wordsInUse) {
this.ensureCapacity(set.wordsInUse);
this.wordsInUse = set.wordsInUse;
}for (var i = 0; i < wordsInCommon; i++) this.words[i] ^= set.words[i];

if (wordsInCommon < set.wordsInUse) System.arraycopy(set.words, wordsInCommon, this.words, wordsInCommon, set.wordsInUse - wordsInCommon);
this.recalculateWordsInUse();
}, "JU.BS");
Clazz_defineMethod(c$, "andNot", 
function(set){
for (var i = Math.min(this.wordsInUse, set.wordsInUse) - 1; i >= 0; i--) this.words[i] &= ~set.words[i];

this.recalculateWordsInUse();
}, "JU.BS");
Clazz_overrideMethod(c$, "hashCode", 
function(){
var h = 1234;
for (var i = this.wordsInUse; --i >= 0; ) h ^= this.words[i] * (i + 1);

return ((h >> 32) ^ h);
});
Clazz_defineMethod(c$, "size", 
function(){
return this.words.length * 32;
});
Clazz_overrideMethod(c$, "equals", 
function(obj){
if (!(Clazz_instanceOf(obj,"JU.BS"))) return false;
if (this === obj) return true;
var set = obj;
if (this.wordsInUse != set.wordsInUse) return false;
for (var i = 0; i < this.wordsInUse; i++) if (this.words[i] != set.words[i]) return false;

return true;
}, "~O");
Clazz_overrideMethod(c$, "clone", 
function(){
if (!this.sizeIsSticky && this.wordsInUse != this.words.length) this.setLength(this.wordsInUse);
return JU.BS.copy(this);
});
Clazz_defineMethod(c$, "setLength", 
function(n){
{
if (n == this.words.length) return;
if (n == this.wordsInUse) {
this.words = Clazz_newArray(-1, this.words, 0, n);
return;
}
}var a =  Clazz_newIntArray (n, 0);
System.arraycopy(this.words, 0, a, 0, this.wordsInUse);
this.words = a;
}, "~N");
Clazz_overrideMethod(c$, "toString", 
function(){
return JU.BS.escape(this, '(', ')');
});
c$.copy = Clazz_defineMethod(c$, "copy", 
function(bitsetToCopy){
var bs;
{
bs = Clazz_clone(bitsetToCopy);
}var wordCount = bitsetToCopy.wordsInUse;
if (wordCount == 0) {
bs.words = JU.BS.emptyBitmap;
} else {
{
bs.words = Clazz_newArray(-1, bitsetToCopy.words, 0, bs.wordsInUse = wordCount);
}}return bs;
}, "JU.BS");
Clazz_defineMethod(c$, "cardinalityN", 
function(max){
var n = this.cardinality();
for (var i = this.length(); --i >= max; ) if (this.get(i)) n--;

return n;
}, "~N");
Clazz_overrideMethod(c$, "toJSON", 
function(){
var numBits = (this.wordsInUse > 128 ? this.cardinality() : this.wordsInUse * 32);
var b = JU.SB.newN(6 * numBits + 2);
b.appendC('[');
var i = this.nextSetBit(0);
if (i != -1) {
b.appendI(i);
for (i = this.nextSetBit(i + 1); i >= 0; i = this.nextSetBit(i + 1)) {
var endOfRun = this.nextClearBit(i);
do {
b.append(", ").appendI(i);
} while (++i < endOfRun);
}
}b.appendC(']');
return b.toString();
});
c$.escape = Clazz_defineMethod(c$, "escape", 
function(bs, chOpen, chClose){
if (bs == null) return chOpen + "{}" + chClose;
var s =  new JU.SB();
s.append(chOpen + "{");
var imax = bs.length();
var iLast = -1;
var iFirst = -2;
var i = -1;
while (++i <= imax) {
var isSet = bs.get(i);
if (i == imax || iLast >= 0 && !isSet) {
if (iLast >= 0 && iFirst != iLast) s.append((iFirst == iLast - 1 ? " " : ":") + iLast);
if (i == imax) break;
iLast = -1;
}if (bs.get(i)) {
if (iLast < 0) {
s.append((iFirst == -2 ? "" : " ") + i);
iFirst = i;
}iLast = i;
}}
s.append("}").appendC(chClose);
return s.toString();
}, "JU.BS,~S,~S");
c$.unescape = Clazz_defineMethod(c$, "unescape", 
function(str){
var ch;
var len;
if (str == null || (len = (str = str.trim()).length) < 4 || str.equalsIgnoreCase("({null})") || (ch = str.charAt(0)) != '(' && ch != '[' || str.charAt(len - 1) != (ch == '(' ? ')' : ']') || str.charAt(1) != '{' || str.indexOf('}') != len - 2) return null;
len -= 2;
for (var i = len; --i >= 2; ) if (!JU.PT.isDigit(ch = str.charAt(i)) && ch != ' ' && ch != '\t' && ch != ':') return null;

var lastN = len;
while (JU.PT.isDigit(str.charAt(--lastN))) {
}
if (++lastN == len) lastN = 0;
 else try {
lastN = Integer.parseInt(str.substring(lastN, len));
} catch (e) {
if (Clazz_exceptionOf(e,"NumberFormatException")){
return null;
} else {
throw e;
}
}
var bs = JU.BS.newN(lastN);
lastN = -1;
var iPrev = -1;
var iThis = -2;
for (var i = 2; i <= len; i++) {
switch ((ch = str.charAt(i)).charCodeAt(0)) {
case 9:
case 32:
case 125:
if (iThis < 0) break;
if (iThis < lastN) return null;
lastN = iThis;
if (iPrev < 0) iPrev = iThis;
bs.setBits(iPrev, iThis + 1);
iPrev = -1;
iThis = -2;
break;
case 58:
iPrev = lastN = iThis;
iThis = -2;
break;
default:
if (JU.PT.isDigit(ch)) {
if (iThis < 0) iThis = 0;
iThis = (iThis * 10) + (ch.charCodeAt(0) - 48);
}}
}
return (iPrev >= 0 ? null : bs);
}, "~S");
c$.emptyBitmap =  Clazz_newIntArray (0, 0);
});
;//5.0.1-v7 Sat Feb 21 18:17:38 CST 2026
Clazz_declarePackage("JU");
Clazz_load(["java.util.Hashtable"], "JU.CU", ["JU.P3", "$.PT"], function(){
var c$ = Clazz_declareType(JU, "CU", null);
c$.toRGBHexString = Clazz_defineMethod(c$, "toRGBHexString", 
function(c){
var rgb = c.getRGB();
if (rgb == 0) return "000000";
var r = "00" + Integer.toHexString((rgb >> 16) & 0xFF);
r = r.substring(r.length - 2);
var g = "00" + Integer.toHexString((rgb >> 8) & 0xFF);
g = g.substring(g.length - 2);
var b = "00" + Integer.toHexString(rgb & 0xFF);
b = b.substring(b.length - 2);
return r + g + b;
}, "javajs.api.GenericColor");
c$.toCSSString = Clazz_defineMethod(c$, "toCSSString", 
function(c){
var opacity = c.getOpacity255();
if (opacity == 255) return "#" + JU.CU.toRGBHexString(c);
var rgb = c.getRGB();
return "rgba(" + ((rgb >> 16) & 0xFF) + "," + ((rgb >> 8) & 0xff) + "," + (rgb & 0xff) + "," + opacity / 255 + ")";
}, "javajs.api.GenericColor");
c$.getArgbFromString = Clazz_defineMethod(c$, "getArgbFromString", 
function(strColor){
var len = 0;
if (strColor == null || (len = strColor.length) == 0) return 0;
strColor = strColor.toLowerCase();
if (strColor.charAt(0) == '[' && strColor.charAt(len - 1) == ']') {
var check;
if (strColor.indexOf(",") >= 0) {
var tokens = JU.PT.split(strColor.substring(1, strColor.length - 1), ",");
if (tokens.length != 3) return 0;
var red = JU.PT.parseFloat(tokens[0]);
var grn = JU.PT.parseFloat(tokens[1]);
var blu = JU.PT.parseFloat(tokens[2]);
return JU.CU.colorTriadToFFRGB(red, grn, blu);
}switch (len) {
case 9:
check = "x";
break;
case 10:
check = "0x";
break;
default:
return 0;
}
if (strColor.indexOf(check) != 1) return 0;
strColor = "#" + strColor.substring(len - 7, len - 1);
len = 7;
}if (len == 7 && strColor.charAt(0) == '#') {
try {
return JU.PT.parseIntRadix(strColor.substring(1, 7), 16) | 0xFF000000;
} catch (e) {
if (Clazz_exceptionOf(e, Exception)){
return 0;
} else {
throw e;
}
}
}var boxedArgb = JU.CU.mapJavaScriptColors.get(strColor);
return (boxedArgb == null ? 0 : boxedArgb.intValue());
}, "~S");
c$.colorTriadToFFRGB = Clazz_defineMethod(c$, "colorTriadToFFRGB", 
function(x, y, z){
if (x <= 1 && y <= 1 && z <= 1) {
if (x > 0) x = x * 256 - 1;
if (y > 0) y = y * 256 - 1;
if (z > 0) z = z * 256 - 1;
}return JU.CU.rgb(Clazz_floatToInt(x), Clazz_floatToInt(y), Clazz_floatToInt(z));
}, "~N,~N,~N");
c$.rgb = Clazz_defineMethod(c$, "rgb", 
function(red, grn, blu){
return 0xFF000000 | (red << 16) | (grn << 8) | blu;
}, "~N,~N,~N");
c$.colorPtFromString = Clazz_defineMethod(c$, "colorPtFromString", 
function(colorName){
return JU.CU.colorPtFromInt(JU.CU.getArgbFromString(colorName), null);
}, "~S");
c$.colorPtFromInt = Clazz_defineMethod(c$, "colorPtFromInt", 
function(color, pt){
if (pt == null) pt =  new JU.P3();
pt.set((color >> 16) & 0xFF, (color >> 8) & 0xFF, color & 0xFF);
return pt;
}, "~N,JU.P3");
c$.colorPtToFFRGB = Clazz_defineMethod(c$, "colorPtToFFRGB", 
function(pt){
return JU.CU.colorTriadToFFRGB(pt.x, pt.y, pt.z);
}, "JU.T3");
c$.toRGB3f = Clazz_defineMethod(c$, "toRGB3f", 
function(c, f){
f[0] = ((c >> 16) & 0xFF) / 255;
f[1] = ((c >> 8) & 0xFF) / 255;
f[2] = (c & 0xFF) / 255;
}, "~N,~A");
c$.toFFGGGfromRGB = Clazz_defineMethod(c$, "toFFGGGfromRGB", 
function(rgb){
var grey = (Clazz_doubleToInt(((2989 * ((rgb >> 16) & 0xFF)) + (5870 * ((rgb >> 8) & 0xFF)) + (1140 * (rgb & 0xFF)) + 5000) / 10000)) & 0xFFFFFF;
return JU.CU.rgb(grey, grey, grey);
}, "~N");
c$.rgbToHSL = Clazz_defineMethod(c$, "rgbToHSL", 
function(rgb, doRound){
var r = rgb.x / 255;
var g = rgb.y / 255;
var b = rgb.z / 255;
var min = Math.min(r, Math.min(g, b));
var max = Math.max(r, Math.max(g, b));
var p = (max + min);
var q = (max - min);
var h = (60 * ((q == 0 ? 0 : max == r ? ((g - b) / q + 6) : max == g ? (b - r) / q + 2 : (r - g) / q + 4))) % 360;
var s = q / (q == 0 ? 1 : p <= 1 ? p : 2 - p);
return (doRound ? JU.P3.new3(Math.round(h * 10) / 10, Math.round(s * 1000) / 10, Math.round(p * 500) / 10) : JU.P3.new3(h, s * 100, p * 50));
}, "JU.P3,~B");
c$.hslToRGB = Clazz_defineMethod(c$, "hslToRGB", 
function(hsl){
var h = Math.max(0, Math.min(360, hsl.x)) / 60;
var s = Math.max(0, Math.min(100, hsl.y)) / 100;
var l = Math.max(0, Math.min(100, hsl.z)) / 100;
var p = l - (l < 0.5 ? l : 1 - l) * s;
var q = 2 * (l - p);
var r = JU.CU.toRGB(p, q, h + 2);
var g = JU.CU.toRGB(p, q, h);
var b = JU.CU.toRGB(p, q, h - 2);
return JU.P3.new3(Math.round(r * 255), Math.round(g * 255), Math.round(b * 255));
}, "JU.P3");
c$.toRGB = Clazz_defineMethod(c$, "toRGB", 
function(p, q, h){
return ((h = (h + (h < 0 ? 6 : h > 6 ? -6 : 0))) < 1 ? p + q * h : h < 3 ? p + q : h < 4 ? p + q * (4 - h) : p);
}, "~N,~N,~N");
c$.colorNames =  Clazz_newArray(-1, ["contrast", "black", "pewhite", "pecyan", "pepurple", "pegreen", "peblue", "peviolet", "pebrown", "pepink", "peyellow", "pedarkgreen", "peorange", "pelightblue", "pedarkcyan", "pedarkgray", "aliceblue", "antiquewhite", "aqua", "aquamarine", "azure", "beige", "bisque", "blanchedalmond", "blue", "blueviolet", "brown", "burlywood", "cadetblue", "chartreuse", "chocolate", "coral", "cornflowerblue", "cornsilk", "crimson", "cyan", "darkblue", "darkcyan", "darkgoldenrod", "darkgray", "darkgreen", "darkkhaki", "darkmagenta", "darkolivegreen", "darkorange", "darkorchid", "darkred", "darksalmon", "darkseagreen", "darkslateblue", "darkslategray", "darkturquoise", "darkviolet", "deeppink", "deepskyblue", "dimgray", "dodgerblue", "firebrick", "floralwhite", "forestgreen", "fuchsia", "gainsboro", "ghostwhite", "gold", "goldenrod", "gray", "green", "greenyellow", "honeydew", "hotpink", "indianred", "indigo", "ivory", "khaki", "lavender", "lavenderblush", "lawngreen", "lemonchiffon", "lightblue", "lightcoral", "lightcyan", "lightgoldenrodyellow", "lightgreen", "lightgrey", "lightgray", "lightpink", "lightsalmon", "lightseagreen", "lightskyblue", "lightslategray", "lightsteelblue", "lightyellow", "lime", "limegreen", "linen", "magenta", "maroon", "mediumaquamarine", "mediumblue", "mediumorchid", "mediumpurple", "mediumseagreen", "mediumslateblue", "mediumspringgreen", "mediumturquoise", "mediumvioletred", "midnightblue", "mintcream", "mistyrose", "moccasin", "navajowhite", "navy", "oldlace", "olive", "olivedrab", "orange", "orangered", "orchid", "palegoldenrod", "palegreen", "paleturquoise", "palevioletred", "papayawhip", "peachpuff", "peru", "pink", "plum", "powderblue", "purple", "red", "rosybrown", "royalblue", "saddlebrown", "salmon", "sandybrown", "seagreen", "seashell", "sienna", "silver", "skyblue", "slateblue", "slategray", "snow", "springgreen", "steelblue", "tan", "teal", "thistle", "tomato", "turquoise", "violet", "wheat", "white", "whitesmoke", "yellow", "yellowgreen", "bluetint", "greenblue", "greentint", "grey", "gray", "pinktint", "redorange", "yellowtint"]);
c$.colorArgbs =  Clazz_newIntArray(-1, [0xFFfedcba, 0xFF000000, 0xFFffffff, 0xFF00ffff, 0xFFd020ff, 0xFF00ff00, 0xFF6060ff, 0xFFff80c0, 0xFFa42028, 0xFFffd8d8, 0xFFffff00, 0xFF00c000, 0xFFffb000, 0xFFb0b0ff, 0xFF00a0a0, 0xFF606060, 0xFFF0F8FF, 0xFFFAEBD7, 0xFF00FFFF, 0xFF7FFFD4, 0xFFF0FFFF, 0xFFF5F5DC, 0xFFFFE4C4, 0xFFFFEBCD, 0xFF0000FF, 0xFF8A2BE2, 0xFFA52A2A, 0xFFDEB887, 0xFF5F9EA0, 0xFF7FFF00, 0xFFD2691E, 0xFFFF7F50, 0xFF6495ED, 0xFFFFF8DC, 0xFFDC143C, 0xFF00FFFF, 0xFF00008B, 0xFF008B8B, 0xFFB8860B, 0xFFA9A9A9, 0xFF006400, 0xFFBDB76B, 0xFF8B008B, 0xFF556B2F, 0xFFFF8C00, 0xFF9932CC, 0xFF8B0000, 0xFFE9967A, 0xFF8FBC8F, 0xFF483D8B, 0xFF2F4F4F, 0xFF00CED1, 0xFF9400D3, 0xFFFF1493, 0xFF00BFFF, 0xFF696969, 0xFF1E90FF, 0xFFB22222, 0xFFFFFAF0, 0xFF228B22, 0xFFFF00FF, 0xFFDCDCDC, 0xFFF8F8FF, 0xFFFFD700, 0xFFDAA520, 0xFF808080, 0xFF008000, 0xFFADFF2F, 0xFFF0FFF0, 0xFFFF69B4, 0xFFCD5C5C, 0xFF4B0082, 0xFFFFFFF0, 0xFFF0E68C, 0xFFE6E6FA, 0xFFFFF0F5, 0xFF7CFC00, 0xFFFFFACD, 0xFFADD8E6, 0xFFF08080, 0xFFE0FFFF, 0xFFFAFAD2, 0xFF90EE90, 0xFFD3D3D3, 0xFFD3D3D3, 0xFFFFB6C1, 0xFFFFA07A, 0xFF20B2AA, 0xFF87CEFA, 0xFF778899, 0xFFB0C4DE, 0xFFFFFFE0, 0xFF00FF00, 0xFF32CD32, 0xFFFAF0E6, 0xFFFF00FF, 0xFF800000, 0xFF66CDAA, 0xFF0000CD, 0xFFBA55D3, 0xFF9370DB, 0xFF3CB371, 0xFF7B68EE, 0xFF00FA9A, 0xFF48D1CC, 0xFFC71585, 0xFF191970, 0xFFF5FFFA, 0xFFFFE4E1, 0xFFFFE4B5, 0xFFFFDEAD, 0xFF000080, 0xFFFDF5E6, 0xFF808000, 0xFF6B8E23, 0xFFFFA500, 0xFFFF4500, 0xFFDA70D6, 0xFFEEE8AA, 0xFF98FB98, 0xFFAFEEEE, 0xFFDB7093, 0xFFFFEFD5, 0xFFFFDAB9, 0xFFCD853F, 0xFFFFC0CB, 0xFFDDA0DD, 0xFFB0E0E6, 0xFF800080, 0xFFFF0000, 0xFFBC8F8F, 0xFF4169E1, 0xFF8B4513, 0xFFFA8072, 0xFFF4A460, 0xFF2E8B57, 0xFFFFF5EE, 0xFFA0522D, 0xFFC0C0C0, 0xFF87CEEB, 0xFF6A5ACD, 0xFF708090, 0xFFFFFAFA, 0xFF00FF7F, 0xFF4682B4, 0xFFD2B48C, 0xFF008080, 0xFFD8BFD8, 0xFFFF6347, 0xFF40E0D0, 0xFFEE82EE, 0xFFF5DEB3, 0xFFFFFFFF, 0xFFF5F5F5, 0xFFFFFF00, 0xFF9ACD32, 0xFFAFD7FF, 0xFF2E8B57, 0xFF98FFB3, 0xFF808080, 0xFF808080, 0xFFFFABBB, 0xFFFF4500, 0xFFF6F675]);
c$.mapJavaScriptColors =  new java.util.Hashtable();
{
for (var i = JU.CU.colorNames.length; --i >= 0; ) JU.CU.mapJavaScriptColors.put(JU.CU.colorNames[i], Integer.$valueOf(JU.CU.colorArgbs[i]));

}});
;//5.0.1-v7 Sat Feb 21 18:17:38 CST 2026
Clazz_declarePackage("JU");
Clazz_load(null, "JU.DF", ["JU.PT", "$.SB"], function(){
var c$ = Clazz_declareType(JU, "DF", null);
c$.setUseNumberLocalization = Clazz_defineMethod(c$, "setUseNumberLocalization", 
function(TF){
JU.DF.useNumberLocalization[0] = (TF ? Boolean.TRUE : Boolean.FALSE);
}, "~B");
c$.formatDecimalDbl = Clazz_defineMethod(c$, "formatDecimalDbl", 
function(value, decimalDigits){
if (decimalDigits == 2147483647 || value == -Infinity || value == Infinity || Double.isNaN(value)) return "" + value;
return JU.DF.formatDecimal(value, decimalDigits);
}, "~N,~N");
c$.formatDecimal = Clazz_defineMethod(c$, "formatDecimal", 
function(value, decimalDigits){
if (value == -Infinity || value == Infinity || Double.isNaN(value)) return "" + value;
if (decimalDigits == 2147483647) return "" + value;
var isNeg = (value < 0);
if (isNeg) value = -value;
var n;
if (decimalDigits < 0) {
decimalDigits = -decimalDigits;
if (decimalDigits > JU.DF.formattingStrings.length) decimalDigits = JU.DF.formattingStrings.length;
if (value == 0) return JU.DF.formattingStrings[decimalDigits - 1] + "E+0";
n = 0;
var d;
if (Math.abs(value) < 1) {
n = 100;
d = value * 1e-100;
} else {
n = -100;
d = value * 1e100;
}var s = ("" + d).toUpperCase();
var i1 = s.indexOf("E");
var sf;
if (i1 < 0) {
sf = "" + value;
} else {
n = JU.PT.parseInt(s.substring(i1 + (s.indexOf("E+") == i1 ? 2 : 1))) + n;
var f = JU.PT.parseFloat(s.substring(0, i1));
sf = JU.DF.formatDecimal(f, decimalDigits - 1);
if (sf.startsWith("10.")) {
sf = JU.DF.formatDecimal(1, decimalDigits - 1);
n++;
}}return (isNeg ? "-" : "") + sf + "E" + (n >= 0 ? "+" : "") + n;
}if (decimalDigits >= JU.DF.formattingStrings.length) decimalDigits = JU.DF.formattingStrings.length - 1;
var s1 = ("" + value).toUpperCase();
var pt = s1.indexOf(".");
if (pt < 0) return (isNeg ? "-" : "") + s1 + JU.DF.formattingStrings[decimalDigits].substring(1);
var pt1 = s1.indexOf("E-");
if (pt1 > 0) {
n = JU.PT.parseInt(s1.substring(pt1 + 1));
s1 = "0." + "0000000000000000000000000000000000000000".substring(0, -n - 1) + s1.substring(0, 1) + s1.substring(2, pt1);
pt = 1;
}pt1 = s1.indexOf("E");
if (pt1 > 0) {
n = JU.PT.parseInt(s1.substring(pt1 + 1));
s1 = s1.substring(0, 1) + s1.substring(2, pt1) + "0000000000000000000000000000000000000000";
s1 = s1.substring(0, n + 1) + "." + s1.substring(n + 1);
pt = s1.indexOf(".");
}var len = s1.length;
var pt2 = decimalDigits + pt + 1;
if (pt2 < len && s1.charAt(pt2) >= '5') {
return JU.DF.formatDecimal((isNeg ? -1 : 1) * (value + JU.DF.formatAdds[decimalDigits]), decimalDigits);
}var s0 = s1.substring(0, (decimalDigits == 0 ? pt : ++pt));
var sb = JU.SB.newS(s0);
if (isNeg && s0.equals("0.") && decimalDigits + 2 <= len && s1.substring(2, 2 + decimalDigits).equals("0000000000000000000000000000000000000000".substring(0, decimalDigits))) isNeg = false;
for (var i = 0; i < decimalDigits; i++, pt++) {
if (pt < len) sb.appendC(s1.charAt(pt));
 else sb.appendC('0');
}
s1 = (isNeg ? "-" : "") + sb;
return (Boolean.TRUE.equals(JU.DF.useNumberLocalization[0]) ? s1 : s1.$replace(',', '.'));
}, "~N,~N");
c$.formatDecimalTrimmed = Clazz_defineMethod(c$, "formatDecimalTrimmed", 
function(x, precision){
var str = JU.DF.formatDecimalDbl(x, precision);
var m = str.length - 1;
var zero = '0';
while (m >= 0 && str.charAt(m) == zero) m--;

return str.substring(0, m + 1);
}, "~N,~N");
c$.formatDecimalTrimmed0 = Clazz_defineMethod(c$, "formatDecimalTrimmed0", 
function(x, precision){
var str = JU.DF.formatDecimalDbl(x, precision);
var m = str.length - 1;
var pt = str.indexOf(".") + 1;
while (m > pt && str.charAt(m) == '0') m--;

return str.substring(0, m + 1);
}, "~N,~N");
c$.formattingStrings =  Clazz_newArray(-1, ["0", "0.0", "0.00", "0.000", "0.0000", "0.00000", "0.000000", "0.0000000", "0.00000000", "0.000000000", "0.0000000000", "0.00000000000", "0.000000000000"]);
c$.formatAdds =  Clazz_newDoubleArray(-1, [0.5, 0.05, 0.005, 0.0005, 0.00005, 0.000005, 0.0000005, 0.00000005, 0.000000005, 0.0000000005, 0.00000000005, 0.000000000005, 0.0000000000005]);
c$.useNumberLocalization =  Clazz_newArray(-1, [Boolean.TRUE]);
});
;//5.0.1-v7 Sat Feb 21 18:17:38 CST 2026
Clazz_declarePackage("JU");
Clazz_load(["java.lang.Enum"], "JU.Encoding", null, function(){
var c$ = Clazz_declareType(JU, "Encoding", Enum);
Clazz_defineEnumConstant(c$, "NONE", 0, []);
Clazz_defineEnumConstant(c$, "UTF8", 1, []);
Clazz_defineEnumConstant(c$, "UTF_16BE", 2, []);
Clazz_defineEnumConstant(c$, "UTF_16LE", 3, []);
Clazz_defineEnumConstant(c$, "UTF_32BE", 4, []);
Clazz_defineEnumConstant(c$, "UTF_32LE", 5, []);
});
;//5.0.1-v7 Sat Feb 21 18:17:38 CST 2026
Clazz_declarePackage("JU");
Clazz_load(["java.util.ArrayList"], "JU.Lst", null, function(){
var c$ = Clazz_declareType(JU, "Lst", java.util.ArrayList);
Clazz_defineMethod(c$, "addLast", 
function(v){
{
return this.add1(v);
}}, "~O");
Clazz_overrideMethod(c$, "add", 
function(pos, v){
{
return this.add2(pos, v);
}}, "~N,~O");
Clazz_defineMethod(c$, "removeItemAt", 
function(location){
{
return this._removeItemAt(location);
}}, "~N");
Clazz_defineMethod(c$, "removeObj", 
function(v){
{
return this._removeObject(v);
}}, "~O");
});
;//5.0.1-v7 Sat Feb 21 18:17:38 CST 2026
Clazz_declarePackage("JU");
(function(){
var c$ = Clazz_decorateAsClass(function(){
this.m00 = 0;
this.m01 = 0;
this.m02 = 0;
this.m10 = 0;
this.m11 = 0;
this.m12 = 0;
this.m20 = 0;
this.m21 = 0;
this.m22 = 0;
Clazz_instantialize(this, arguments);}, JU, "M34", null);
Clazz_defineMethod(c$, "setAA33", 
function(a){
var x = a.x;
var y = a.y;
var z = a.z;
var angle = a.angle;
var n = Math.sqrt(x * x + y * y + z * z);
n = 1 / n;
x *= n;
y *= n;
z *= n;
var c = Math.cos(angle);
var s = Math.sin(angle);
var omc = 1.0 - c;
this.m00 = (c + x * x * omc);
this.m11 = (c + y * y * omc);
this.m22 = (c + z * z * omc);
var tmp1 = x * y * omc;
var tmp2 = z * s;
this.m01 = (tmp1 - tmp2);
this.m10 = (tmp1 + tmp2);
tmp1 = x * z * omc;
tmp2 = y * s;
this.m02 = (tmp1 + tmp2);
this.m20 = (tmp1 - tmp2);
tmp1 = y * z * omc;
tmp2 = x * s;
this.m12 = (tmp1 - tmp2);
this.m21 = (tmp1 + tmp2);
}, "JU.A4");
Clazz_defineMethod(c$, "rotate", 
function(t){
this.rotate2(t, t);
}, "JU.T3");
Clazz_defineMethod(c$, "rotate2", 
function(t, result){
result.set(this.m00 * t.x + this.m01 * t.y + this.m02 * t.z, this.m10 * t.x + this.m11 * t.y + this.m12 * t.z, this.m20 * t.x + this.m21 * t.y + this.m22 * t.z);
}, "JU.T3,JU.T3");
Clazz_defineMethod(c$, "setM33", 
function(m1){
this.m00 = m1.m00;
this.m01 = m1.m01;
this.m02 = m1.m02;
this.m10 = m1.m10;
this.m11 = m1.m11;
this.m12 = m1.m12;
this.m20 = m1.m20;
this.m21 = m1.m21;
this.m22 = m1.m22;
}, "JU.M34");
Clazz_defineMethod(c$, "clear33", 
function(){
this.m00 = this.m01 = this.m02 = this.m10 = this.m11 = this.m12 = this.m20 = this.m21 = this.m22 = 0.0;
});
Clazz_defineMethod(c$, "set33", 
function(row, col, v){
switch (row) {
case 0:
switch (col) {
case 0:
this.m00 = v;
return;
case 1:
this.m01 = v;
return;
case 2:
this.m02 = v;
return;
}
break;
case 1:
switch (col) {
case 0:
this.m10 = v;
return;
case 1:
this.m11 = v;
return;
case 2:
this.m12 = v;
return;
}
break;
case 2:
switch (col) {
case 0:
this.m20 = v;
return;
case 1:
this.m21 = v;
return;
case 2:
this.m22 = v;
return;
}
break;
}
this.err();
}, "~N,~N,~N");
Clazz_defineMethod(c$, "get33", 
function(row, col){
switch (row) {
case 0:
switch (col) {
case 0:
return this.m00;
case 1:
return this.m01;
case 2:
return this.m02;
}
break;
case 1:
switch (col) {
case 0:
return this.m10;
case 1:
return this.m11;
case 2:
return this.m12;
}
break;
case 2:
switch (col) {
case 0:
return this.m20;
case 1:
return this.m21;
case 2:
return this.m22;
}
break;
}
this.err();
return 0;
}, "~N,~N");
Clazz_defineMethod(c$, "setRow33", 
function(row, v){
switch (row) {
case 0:
this.m00 = v[0];
this.m01 = v[1];
this.m02 = v[2];
return;
case 1:
this.m10 = v[0];
this.m11 = v[1];
this.m12 = v[2];
return;
case 2:
this.m20 = v[0];
this.m21 = v[1];
this.m22 = v[2];
return;
default:
this.err();
}
}, "~N,~A");
Clazz_defineMethod(c$, "getRow33", 
function(row, v){
switch (row) {
case 0:
v[0] = this.m00;
v[1] = this.m01;
v[2] = this.m02;
return;
case 1:
v[0] = this.m10;
v[1] = this.m11;
v[2] = this.m12;
return;
case 2:
v[0] = this.m20;
v[1] = this.m21;
v[2] = this.m22;
return;
}
this.err();
}, "~N,~A");
Clazz_defineMethod(c$, "setColumn33", 
function(column, v){
switch (column) {
case 0:
this.m00 = v[0];
this.m10 = v[1];
this.m20 = v[2];
break;
case 1:
this.m01 = v[0];
this.m11 = v[1];
this.m21 = v[2];
break;
case 2:
this.m02 = v[0];
this.m12 = v[1];
this.m22 = v[2];
break;
default:
this.err();
}
}, "~N,~A");
Clazz_defineMethod(c$, "getColumn33", 
function(column, v){
switch (column) {
case 0:
v[0] = this.m00;
v[1] = this.m10;
v[2] = this.m20;
break;
case 1:
v[0] = this.m01;
v[1] = this.m11;
v[2] = this.m21;
break;
case 2:
v[0] = this.m02;
v[1] = this.m12;
v[2] = this.m22;
break;
default:
this.err();
}
}, "~N,~A");
Clazz_defineMethod(c$, "add33", 
function(m1){
this.m00 += m1.m00;
this.m01 += m1.m01;
this.m02 += m1.m02;
this.m10 += m1.m10;
this.m11 += m1.m11;
this.m12 += m1.m12;
this.m20 += m1.m20;
this.m21 += m1.m21;
this.m22 += m1.m22;
}, "JU.M34");
Clazz_defineMethod(c$, "sub33", 
function(m1){
this.m00 -= m1.m00;
this.m01 -= m1.m01;
this.m02 -= m1.m02;
this.m10 -= m1.m10;
this.m11 -= m1.m11;
this.m12 -= m1.m12;
this.m20 -= m1.m20;
this.m21 -= m1.m21;
this.m22 -= m1.m22;
}, "JU.M34");
Clazz_defineMethod(c$, "mul33", 
function(x){
this.m00 *= x;
this.m01 *= x;
this.m02 *= x;
this.m10 *= x;
this.m11 *= x;
this.m12 *= x;
this.m20 *= x;
this.m21 *= x;
this.m22 *= x;
}, "~N");
Clazz_defineMethod(c$, "transpose33", 
function(){
var tmp = this.m01;
this.m01 = this.m10;
this.m10 = tmp;
tmp = this.m02;
this.m02 = this.m20;
this.m20 = tmp;
tmp = this.m12;
this.m12 = this.m21;
this.m21 = tmp;
});
Clazz_defineMethod(c$, "setXRot", 
function(angle){
var c = Math.cos(angle);
var s = Math.sin(angle);
this.m00 = 1.0;
this.m01 = 0.0;
this.m02 = 0.0;
this.m10 = 0.0;
this.m11 = c;
this.m12 = -s;
this.m20 = 0.0;
this.m21 = s;
this.m22 = c;
}, "~N");
Clazz_defineMethod(c$, "setYRot", 
function(angle){
var c = Math.cos(angle);
var s = Math.sin(angle);
this.m00 = c;
this.m01 = 0.0;
this.m02 = s;
this.m10 = 0.0;
this.m11 = 1.0;
this.m12 = 0.0;
this.m20 = -s;
this.m21 = 0.0;
this.m22 = c;
}, "~N");
Clazz_defineMethod(c$, "setZRot", 
function(angle){
var c = Math.cos(angle);
var s = Math.sin(angle);
this.m00 = c;
this.m01 = -s;
this.m02 = 0.0;
this.m10 = s;
this.m11 = c;
this.m12 = 0.0;
this.m20 = 0.0;
this.m21 = 0.0;
this.m22 = 1.0;
}, "~N");
Clazz_defineMethod(c$, "determinant3", 
function(){
return this.m00 * (this.m11 * this.m22 - this.m21 * this.m12) - this.m01 * (this.m10 * this.m22 - this.m20 * this.m12) + this.m02 * (this.m10 * this.m21 - this.m20 * this.m11);
});
Clazz_defineMethod(c$, "err", 
function(){
throw  new ArrayIndexOutOfBoundsException("matrix column/row out of bounds");
});
})();
;//5.0.1-v7 Sat Feb 21 18:17:38 CST 2026
Clazz_declarePackage("JU");
Clazz_load(["JU.M34"], "JU.M3", ["JU.T3"], function(){
var c$ = Clazz_declareType(JU, "M3", JU.M34, java.io.Serializable);
c$.newA9 = Clazz_defineMethod(c$, "newA9", 
function(v){
var m =  new JU.M3();
m.setA(v);
return m;
}, "~A");
c$.newM3 = Clazz_defineMethod(c$, "newM3", 
function(m1){
var m =  new JU.M3();
if (m1 == null) {
m.setScale(1);
return m;
}m.m00 = m1.m00;
m.m01 = m1.m01;
m.m02 = m1.m02;
m.m10 = m1.m10;
m.m11 = m1.m11;
m.m12 = m1.m12;
m.m20 = m1.m20;
m.m21 = m1.m21;
m.m22 = m1.m22;
return m;
}, "JU.M3");
Clazz_defineMethod(c$, "setScale", 
function(scale){
this.clear33();
this.m00 = this.m11 = this.m22 = scale;
}, "~N");
Clazz_defineMethod(c$, "setM3", 
function(m1){
this.setM33(m1);
}, "JU.M34");
Clazz_defineMethod(c$, "setA", 
function(m){
this.m00 = m[0];
this.m01 = m[1];
this.m02 = m[2];
this.m10 = m[3];
this.m11 = m[4];
this.m12 = m[5];
this.m20 = m[6];
this.m21 = m[7];
this.m22 = m[8];
}, "~A");
Clazz_defineMethod(c$, "setElement", 
function(row, col, v){
this.set33(row, col, v);
}, "~N,~N,~N");
Clazz_defineMethod(c$, "getElement", 
function(row, col){
return this.get33(row, col);
}, "~N,~N");
Clazz_defineMethod(c$, "setRow", 
function(row, x, y, z){
switch (row) {
case 0:
this.m00 = x;
this.m01 = y;
this.m02 = z;
return;
case 1:
this.m10 = x;
this.m11 = y;
this.m12 = z;
return;
case 2:
this.m20 = x;
this.m21 = y;
this.m22 = z;
return;
default:
this.err();
}
}, "~N,~N,~N,~N");
Clazz_defineMethod(c$, "setRowV", 
function(row, v){
switch (row) {
case 0:
this.m00 = v.x;
this.m01 = v.y;
this.m02 = v.z;
return;
case 1:
this.m10 = v.x;
this.m11 = v.y;
this.m12 = v.z;
return;
case 2:
this.m20 = v.x;
this.m21 = v.y;
this.m22 = v.z;
return;
default:
this.err();
}
}, "~N,JU.T3");
Clazz_defineMethod(c$, "setRowA", 
function(row, v){
this.setRow33(row, v);
}, "~N,~A");
Clazz_overrideMethod(c$, "getRow", 
function(row, v){
this.getRow33(row, v);
}, "~N,~A");
Clazz_defineMethod(c$, "setColumn3", 
function(column, x, y, z){
switch (column) {
case 0:
this.m00 = x;
this.m10 = y;
this.m20 = z;
break;
case 1:
this.m01 = x;
this.m11 = y;
this.m21 = z;
break;
case 2:
this.m02 = x;
this.m12 = y;
this.m22 = z;
break;
default:
this.err();
}
}, "~N,~N,~N,~N");
Clazz_defineMethod(c$, "setColumnV", 
function(column, v){
switch (column) {
case 0:
this.m00 = v.x;
this.m10 = v.y;
this.m20 = v.z;
break;
case 1:
this.m01 = v.x;
this.m11 = v.y;
this.m21 = v.z;
break;
case 2:
this.m02 = v.x;
this.m12 = v.y;
this.m22 = v.z;
break;
default:
this.err();
}
}, "~N,JU.T3");
Clazz_defineMethod(c$, "getColumnV", 
function(column, v){
switch (column) {
case 0:
v.x = this.m00;
v.y = this.m10;
v.z = this.m20;
break;
case 1:
v.x = this.m01;
v.y = this.m11;
v.z = this.m21;
break;
case 2:
v.x = this.m02;
v.y = this.m12;
v.z = this.m22;
break;
default:
this.err();
}
}, "~N,JU.T3");
Clazz_defineMethod(c$, "setColumnA", 
function(column, v){
this.setColumn33(column, v);
}, "~N,~A");
Clazz_defineMethod(c$, "getColumn", 
function(column, v){
this.getColumn33(column, v);
}, "~N,~A");
Clazz_defineMethod(c$, "add", 
function(m1){
this.add33(m1);
}, "JU.M3");
Clazz_defineMethod(c$, "sub", 
function(m1){
this.sub33(m1);
}, "JU.M3");
Clazz_defineMethod(c$, "transpose", 
function(){
this.transpose33();
});
Clazz_defineMethod(c$, "transposeM", 
function(m1){
this.setM33(m1);
this.transpose33();
}, "JU.M3");
Clazz_defineMethod(c$, "invertM", 
function(m1){
this.setM33(m1);
this.invert();
}, "JU.M3");
Clazz_defineMethod(c$, "invert", 
function(){
var s = this.determinant3();
if (s == 0.0) return;
s = 1 / s;
this.set9(this.m11 * this.m22 - this.m12 * this.m21, this.m02 * this.m21 - this.m01 * this.m22, this.m01 * this.m12 - this.m02 * this.m11, this.m12 * this.m20 - this.m10 * this.m22, this.m00 * this.m22 - this.m02 * this.m20, this.m02 * this.m10 - this.m00 * this.m12, this.m10 * this.m21 - this.m11 * this.m20, this.m01 * this.m20 - this.m00 * this.m21, this.m00 * this.m11 - this.m01 * this.m10);
this.scale(s);
});
Clazz_defineMethod(c$, "setAsXRotation", 
function(angle){
this.setXRot(angle);
return this;
}, "~N");
Clazz_defineMethod(c$, "setAsYRotation", 
function(angle){
this.setYRot(angle);
return this;
}, "~N");
Clazz_defineMethod(c$, "setAsZRotation", 
function(angle){
this.setZRot(angle);
return this;
}, "~N");
Clazz_defineMethod(c$, "scale", 
function(scalar){
this.mul33(scalar);
}, "~N");
Clazz_defineMethod(c$, "mul", 
function(m1){
this.mul2(this, m1);
}, "JU.M3");
Clazz_defineMethod(c$, "mul2", 
function(m1, m2){
this.set9(m1.m00 * m2.m00 + m1.m01 * m2.m10 + m1.m02 * m2.m20, m1.m00 * m2.m01 + m1.m01 * m2.m11 + m1.m02 * m2.m21, m1.m00 * m2.m02 + m1.m01 * m2.m12 + m1.m02 * m2.m22, m1.m10 * m2.m00 + m1.m11 * m2.m10 + m1.m12 * m2.m20, m1.m10 * m2.m01 + m1.m11 * m2.m11 + m1.m12 * m2.m21, m1.m10 * m2.m02 + m1.m11 * m2.m12 + m1.m12 * m2.m22, m1.m20 * m2.m00 + m1.m21 * m2.m10 + m1.m22 * m2.m20, m1.m20 * m2.m01 + m1.m21 * m2.m11 + m1.m22 * m2.m21, m1.m20 * m2.m02 + m1.m21 * m2.m12 + m1.m22 * m2.m22);
}, "JU.M3,JU.M3");
Clazz_overrideMethod(c$, "equals", 
function(o){
if (!(Clazz_instanceOf(o,"JU.M3"))) return false;
var m = o;
return this.m00 == m.m00 && this.m01 == m.m01 && this.m02 == m.m02 && this.m10 == m.m10 && this.m11 == m.m11 && this.m12 == m.m12 && this.m20 == m.m20 && this.m21 == m.m21 && this.m22 == m.m22;
}, "~O");
Clazz_overrideMethod(c$, "hashCode", 
function(){
return JU.T3.floatToIntBits(this.m00) ^ JU.T3.floatToIntBits(this.m01) ^ JU.T3.floatToIntBits(this.m02) ^ JU.T3.floatToIntBits(this.m10) ^ JU.T3.floatToIntBits(this.m11) ^ JU.T3.floatToIntBits(this.m12) ^ JU.T3.floatToIntBits(this.m20) ^ JU.T3.floatToIntBits(this.m21) ^ JU.T3.floatToIntBits(this.m22);
});
Clazz_defineMethod(c$, "setZero", 
function(){
this.clear33();
});
Clazz_defineMethod(c$, "set9", 
function(m00, m01, m02, m10, m11, m12, m20, m21, m22){
this.m00 = m00;
this.m01 = m01;
this.m02 = m02;
this.m10 = m10;
this.m11 = m11;
this.m12 = m12;
this.m20 = m20;
this.m21 = m21;
this.m22 = m22;
}, "~N,~N,~N,~N,~N,~N,~N,~N,~N");
Clazz_overrideMethod(c$, "toString", 
function(){
return "[[" + this.m00 + "\t" + this.m01 + "\t" + this.m02 + "]" + "\n  [" + this.m10 + "\t" + this.m11 + "\t" + this.m12 + "]" + "\n  [" + this.m20 + "\t" + this.m21 + "\t" + this.m22 + "]]";
});
Clazz_defineMethod(c$, "setAA", 
function(a){
this.setAA33(a);
return this;
}, "JU.A4");
Clazz_defineMethod(c$, "setAsBallRotation", 
function(responseFactor, dx, dy){
var r = Math.sqrt(dx * dx + dy * dy);
var th = r * responseFactor;
if (th == 0) {
this.setScale(1);
return false;
}var c = Math.cos(th);
var s = Math.sin(th);
var nx = -dy / r;
var ny = dx / r;
var c1 = c - 1;
this.m00 = 1 + c1 * nx * nx;
this.m01 = this.m10 = c1 * nx * ny;
this.m20 = -(this.m02 = s * nx);
this.m11 = 1 + c1 * ny * ny;
this.m21 = -(this.m12 = s * ny);
this.m22 = c;
return true;
}, "~N,~N,~N");
Clazz_defineMethod(c$, "isRotation", 
function(){
return (Math.abs(this.determinant3() - 1) < 0.001);
});
});
;//5.0.1-v7 Sat Feb 21 18:17:38 CST 2026
Clazz_declarePackage("JU");
Clazz_load(["JU.M34"], "JU.M4", ["JU.T3"], function(){
var c$ = Clazz_decorateAsClass(function(){
this.m03 = 0;
this.m13 = 0;
this.m23 = 0;
this.m30 = 0;
this.m31 = 0;
this.m32 = 0;
this.m33 = 0;
Clazz_instantialize(this, arguments);}, JU, "M4", JU.M34);
c$.newA16 = Clazz_defineMethod(c$, "newA16", 
function(v){
var m =  new JU.M4();
m.m00 = v[0];
m.m01 = v[1];
m.m02 = v[2];
m.m03 = v[3];
m.m10 = v[4];
m.m11 = v[5];
m.m12 = v[6];
m.m13 = v[7];
m.m20 = v[8];
m.m21 = v[9];
m.m22 = v[10];
m.m23 = v[11];
m.m30 = v[12];
m.m31 = v[13];
m.m32 = v[14];
m.m33 = v[15];
return m;
}, "~A");
c$.newM4 = Clazz_defineMethod(c$, "newM4", 
function(m1){
var m =  new JU.M4();
if (m1 == null) {
m.setIdentity();
return m;
}m.setToM3(m1);
m.m03 = m1.m03;
m.m13 = m1.m13;
m.m23 = m1.m23;
m.m30 = m1.m30;
m.m31 = m1.m31;
m.m32 = m1.m32;
m.m33 = m1.m33;
return m;
}, "JU.M4");
c$.newMV = Clazz_defineMethod(c$, "newMV", 
function(m1, t){
var m =  new JU.M4();
m.setMV(m1, t);
return m;
}, "JU.M3,JU.T3");
Clazz_defineMethod(c$, "setZero", 
function(){
this.clear33();
this.m03 = this.m13 = this.m23 = this.m30 = this.m31 = this.m32 = this.m33 = 0.0;
});
Clazz_defineMethod(c$, "setIdentity", 
function(){
this.setZero();
this.m00 = this.m11 = this.m22 = this.m33 = 1.0;
});
Clazz_defineMethod(c$, "setM4", 
function(m1){
this.setM33(m1);
this.m03 = m1.m03;
this.m13 = m1.m13;
this.m23 = m1.m23;
this.m30 = m1.m30;
this.m31 = m1.m31;
this.m32 = m1.m32;
this.m33 = m1.m33;
return this;
}, "JU.M4");
Clazz_defineMethod(c$, "setMV", 
function(m1, t){
this.setM33(m1);
this.setTranslation(t);
this.m33 = 1;
}, "JU.M3,JU.T3");
Clazz_defineMethod(c$, "setToM3", 
function(m1){
this.setM33(m1);
this.m03 = this.m13 = this.m23 = this.m30 = this.m31 = this.m32 = 0.0;
this.m33 = 1.0;
}, "JU.M34");
Clazz_defineMethod(c$, "setToAA", 
function(a){
this.setIdentity();
this.setAA33(a);
}, "JU.A4");
Clazz_defineMethod(c$, "setA", 
function(m){
this.m00 = m[0];
this.m01 = m[1];
this.m02 = m[2];
this.m03 = m[3];
this.m10 = m[4];
this.m11 = m[5];
this.m12 = m[6];
this.m13 = m[7];
this.m20 = m[8];
this.m21 = m[9];
this.m22 = m[10];
this.m23 = m[11];
this.m30 = m[12];
this.m31 = m[13];
this.m32 = m[14];
this.m33 = m[15];
}, "~A");
Clazz_defineMethod(c$, "setTranslation", 
function(trans){
this.m03 = trans.x;
this.m13 = trans.y;
this.m23 = trans.z;
}, "JU.T3");
Clazz_defineMethod(c$, "setElement", 
function(row, col, v){
if (row < 3 && col < 3) {
this.set33(row, col, v);
return;
}if (row > 3 || col > 3) this.err();
switch (row) {
case 0:
this.m03 = v;
return;
case 1:
this.m13 = v;
return;
case 2:
this.m23 = v;
return;
}
switch (col) {
case 0:
this.m30 = v;
return;
case 1:
this.m31 = v;
return;
case 2:
this.m32 = v;
return;
case 3:
this.m33 = v;
return;
}
}, "~N,~N,~N");
Clazz_defineMethod(c$, "getElement", 
function(row, col){
if (row < 3 && col < 3) return this.get33(row, col);
if (row > 3 || col > 3) {
this.err();
return 0;
}switch (row) {
case 0:
return this.m03;
case 1:
return this.m13;
case 2:
return this.m23;
default:
switch (col) {
case 0:
return this.m30;
case 1:
return this.m31;
case 2:
return this.m32;
default:
return this.m33;
}
}
}, "~N,~N");
Clazz_defineMethod(c$, "getTranslation", 
function(trans){
trans.x = this.m03;
trans.y = this.m13;
trans.z = this.m23;
}, "JU.T3");
Clazz_defineMethod(c$, "getRotationScale", 
function(m1){
m1.m00 = this.m00;
m1.m01 = this.m01;
m1.m02 = this.m02;
m1.m10 = this.m10;
m1.m11 = this.m11;
m1.m12 = this.m12;
m1.m20 = this.m20;
m1.m21 = this.m21;
m1.m22 = this.m22;
}, "JU.M3");
Clazz_defineMethod(c$, "setRotationScale", 
function(m1){
this.m00 = m1.m00;
this.m01 = m1.m01;
this.m02 = m1.m02;
this.m10 = m1.m10;
this.m11 = m1.m11;
this.m12 = m1.m12;
this.m20 = m1.m20;
this.m21 = m1.m21;
this.m22 = m1.m22;
}, "JU.M3");
Clazz_defineMethod(c$, "setRowA", 
function(row, v){
if (row < 3) this.setRow33(row, v);
switch (row) {
case 0:
this.m03 = v[3];
return;
case 1:
this.m13 = v[3];
return;
case 2:
this.m23 = v[3];
return;
case 3:
this.m30 = v[0];
this.m31 = v[1];
this.m32 = v[2];
this.m33 = v[3];
return;
}
this.err();
}, "~N,~A");
Clazz_overrideMethod(c$, "getRow", 
function(row, v){
if (row < 3) this.getRow33(row, v);
switch (row) {
case 0:
v[3] = this.m03;
return;
case 1:
v[3] = this.m13;
return;
case 2:
v[3] = this.m23;
return;
case 3:
v[0] = this.m30;
v[1] = this.m31;
v[2] = this.m32;
v[3] = this.m33;
return;
}
this.err();
}, "~N,~A");
Clazz_defineMethod(c$, "setColumn4", 
function(column, x, y, z, w){
if (column == 0) {
this.m00 = x;
this.m10 = y;
this.m20 = z;
this.m30 = w;
} else if (column == 1) {
this.m01 = x;
this.m11 = y;
this.m21 = z;
this.m31 = w;
} else if (column == 2) {
this.m02 = x;
this.m12 = y;
this.m22 = z;
this.m32 = w;
} else if (column == 3) {
this.m03 = x;
this.m13 = y;
this.m23 = z;
this.m33 = w;
} else {
this.err();
}}, "~N,~N,~N,~N,~N");
Clazz_defineMethod(c$, "setColumnA", 
function(column, v){
if (column < 3) this.setColumn33(column, v);
switch (column) {
case 0:
this.m30 = v[3];
return;
case 1:
this.m31 = v[3];
return;
case 2:
this.m32 = v[3];
return;
case 3:
this.m03 = v[0];
this.m13 = v[1];
this.m23 = v[2];
this.m33 = v[3];
return;
default:
this.err();
}
}, "~N,~A");
Clazz_defineMethod(c$, "getColumn", 
function(column, v){
if (column < 3) this.getColumn33(column, v);
switch (column) {
case 0:
v[3] = this.m30;
return;
case 1:
v[3] = this.m31;
return;
case 2:
v[3] = this.m32;
return;
case 3:
v[0] = this.m03;
v[1] = this.m13;
v[2] = this.m23;
v[3] = this.m33;
return;
default:
this.err();
}
}, "~N,~A");
Clazz_defineMethod(c$, "sub", 
function(m1){
this.sub33(m1);
this.m03 -= m1.m03;
this.m13 -= m1.m13;
this.m23 -= m1.m23;
this.m30 -= m1.m30;
this.m31 -= m1.m31;
this.m32 -= m1.m32;
this.m33 -= m1.m33;
}, "JU.M4");
Clazz_defineMethod(c$, "add", 
function(pt){
this.m03 += pt.x;
this.m13 += pt.y;
this.m23 += pt.z;
}, "JU.T3");
Clazz_defineMethod(c$, "transpose", 
function(){
this.transpose33();
var tmp = this.m03;
this.m03 = this.m30;
this.m30 = tmp;
tmp = this.m13;
this.m13 = this.m31;
this.m31 = tmp;
tmp = this.m23;
this.m23 = this.m32;
this.m32 = tmp;
});
Clazz_defineMethod(c$, "invert", 
function(){
var s = this.determinant4();
if (s == 0.0) return this;
s = 1 / s;
this.set(this.m11 * (this.m22 * this.m33 - this.m23 * this.m32) + this.m12 * (this.m23 * this.m31 - this.m21 * this.m33) + this.m13 * (this.m21 * this.m32 - this.m22 * this.m31), this.m21 * (this.m02 * this.m33 - this.m03 * this.m32) + this.m22 * (this.m03 * this.m31 - this.m01 * this.m33) + this.m23 * (this.m01 * this.m32 - this.m02 * this.m31), this.m31 * (this.m02 * this.m13 - this.m03 * this.m12) + this.m32 * (this.m03 * this.m11 - this.m01 * this.m13) + this.m33 * (this.m01 * this.m12 - this.m02 * this.m11), this.m01 * (this.m13 * this.m22 - this.m12 * this.m23) + this.m02 * (this.m11 * this.m23 - this.m13 * this.m21) + this.m03 * (this.m12 * this.m21 - this.m11 * this.m22), this.m12 * (this.m20 * this.m33 - this.m23 * this.m30) + this.m13 * (this.m22 * this.m30 - this.m20 * this.m32) + this.m10 * (this.m23 * this.m32 - this.m22 * this.m33), this.m22 * (this.m00 * this.m33 - this.m03 * this.m30) + this.m23 * (this.m02 * this.m30 - this.m00 * this.m32) + this.m20 * (this.m03 * this.m32 - this.m02 * this.m33), this.m32 * (this.m00 * this.m13 - this.m03 * this.m10) + this.m33 * (this.m02 * this.m10 - this.m00 * this.m12) + this.m30 * (this.m03 * this.m12 - this.m02 * this.m13), this.m02 * (this.m13 * this.m20 - this.m10 * this.m23) + this.m03 * (this.m10 * this.m22 - this.m12 * this.m20) + this.m00 * (this.m12 * this.m23 - this.m13 * this.m22), this.m13 * (this.m20 * this.m31 - this.m21 * this.m30) + this.m10 * (this.m21 * this.m33 - this.m23 * this.m31) + this.m11 * (this.m23 * this.m30 - this.m20 * this.m33), this.m23 * (this.m00 * this.m31 - this.m01 * this.m30) + this.m20 * (this.m01 * this.m33 - this.m03 * this.m31) + this.m21 * (this.m03 * this.m30 - this.m00 * this.m33), this.m33 * (this.m00 * this.m11 - this.m01 * this.m10) + this.m30 * (this.m01 * this.m13 - this.m03 * this.m11) + this.m31 * (this.m03 * this.m10 - this.m00 * this.m13), this.m03 * (this.m11 * this.m20 - this.m10 * this.m21) + this.m00 * (this.m13 * this.m21 - this.m11 * this.m23) + this.m01 * (this.m10 * this.m23 - this.m13 * this.m20), this.m10 * (this.m22 * this.m31 - this.m21 * this.m32) + this.m11 * (this.m20 * this.m32 - this.m22 * this.m30) + this.m12 * (this.m21 * this.m30 - this.m20 * this.m31), this.m20 * (this.m02 * this.m31 - this.m01 * this.m32) + this.m21 * (this.m00 * this.m32 - this.m02 * this.m30) + this.m22 * (this.m01 * this.m30 - this.m00 * this.m31), this.m30 * (this.m02 * this.m11 - this.m01 * this.m12) + this.m31 * (this.m00 * this.m12 - this.m02 * this.m10) + this.m32 * (this.m01 * this.m10 - this.m00 * this.m11), this.m00 * (this.m11 * this.m22 - this.m12 * this.m21) + this.m01 * (this.m12 * this.m20 - this.m10 * this.m22) + this.m02 * (this.m10 * this.m21 - this.m11 * this.m20));
this.scale(s);
return this;
});
Clazz_defineMethod(c$, "set", 
function(m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33){
this.m00 = m00;
this.m01 = m01;
this.m02 = m02;
this.m03 = m03;
this.m10 = m10;
this.m11 = m11;
this.m12 = m12;
this.m13 = m13;
this.m20 = m20;
this.m21 = m21;
this.m22 = m22;
this.m23 = m23;
this.m30 = m30;
this.m31 = m31;
this.m32 = m32;
this.m33 = m33;
}, "~N,~N,~N,~N,~N,~N,~N,~N,~N,~N,~N,~N,~N,~N,~N,~N");
Clazz_defineMethod(c$, "determinant4", 
function(){
return (this.m00 * this.m11 - this.m01 * this.m10) * (this.m22 * this.m33 - this.m23 * this.m32) - (this.m00 * this.m12 - this.m02 * this.m10) * (this.m21 * this.m33 - this.m23 * this.m31) + (this.m00 * this.m13 - this.m03 * this.m10) * (this.m21 * this.m32 - this.m22 * this.m31) + (this.m01 * this.m12 - this.m02 * this.m11) * (this.m20 * this.m33 - this.m23 * this.m30) - (this.m01 * this.m13 - this.m03 * this.m11) * (this.m20 * this.m32 - this.m22 * this.m30) + (this.m02 * this.m13 - this.m03 * this.m12) * (this.m20 * this.m31 - this.m21 * this.m30);
});
Clazz_defineMethod(c$, "scale", 
function(scalar){
this.mul33(scalar);
this.m03 *= scalar;
this.m13 *= scalar;
this.m23 *= scalar;
this.m30 *= scalar;
this.m31 *= scalar;
this.m32 *= scalar;
this.m33 *= scalar;
}, "~N");
Clazz_defineMethod(c$, "mul", 
function(m1){
this.mul2(this, m1);
}, "JU.M4");
Clazz_defineMethod(c$, "mul2", 
function(m1, m2){
this.set(m1.m00 * m2.m00 + m1.m01 * m2.m10 + m1.m02 * m2.m20 + m1.m03 * m2.m30, m1.m00 * m2.m01 + m1.m01 * m2.m11 + m1.m02 * m2.m21 + m1.m03 * m2.m31, m1.m00 * m2.m02 + m1.m01 * m2.m12 + m1.m02 * m2.m22 + m1.m03 * m2.m32, m1.m00 * m2.m03 + m1.m01 * m2.m13 + m1.m02 * m2.m23 + m1.m03 * m2.m33, m1.m10 * m2.m00 + m1.m11 * m2.m10 + m1.m12 * m2.m20 + m1.m13 * m2.m30, m1.m10 * m2.m01 + m1.m11 * m2.m11 + m1.m12 * m2.m21 + m1.m13 * m2.m31, m1.m10 * m2.m02 + m1.m11 * m2.m12 + m1.m12 * m2.m22 + m1.m13 * m2.m32, m1.m10 * m2.m03 + m1.m11 * m2.m13 + m1.m12 * m2.m23 + m1.m13 * m2.m33, m1.m20 * m2.m00 + m1.m21 * m2.m10 + m1.m22 * m2.m20 + m1.m23 * m2.m30, m1.m20 * m2.m01 + m1.m21 * m2.m11 + m1.m22 * m2.m21 + m1.m23 * m2.m31, m1.m20 * m2.m02 + m1.m21 * m2.m12 + m1.m22 * m2.m22 + m1.m23 * m2.m32, m1.m20 * m2.m03 + m1.m21 * m2.m13 + m1.m22 * m2.m23 + m1.m23 * m2.m33, m1.m30 * m2.m00 + m1.m31 * m2.m10 + m1.m32 * m2.m20 + m1.m33 * m2.m30, m1.m30 * m2.m01 + m1.m31 * m2.m11 + m1.m32 * m2.m21 + m1.m33 * m2.m31, m1.m30 * m2.m02 + m1.m31 * m2.m12 + m1.m32 * m2.m22 + m1.m33 * m2.m32, m1.m30 * m2.m03 + m1.m31 * m2.m13 + m1.m32 * m2.m23 + m1.m33 * m2.m33);
}, "JU.M4,JU.M4");
Clazz_defineMethod(c$, "transform", 
function(vec){
this.transform2(vec, vec);
}, "JU.T4");
Clazz_defineMethod(c$, "transform2", 
function(vec, vecOut){
vecOut.set4(this.m00 * vec.x + this.m01 * vec.y + this.m02 * vec.z + this.m03 * vec.w, this.m10 * vec.x + this.m11 * vec.y + this.m12 * vec.z + this.m13 * vec.w, this.m20 * vec.x + this.m21 * vec.y + this.m22 * vec.z + this.m23 * vec.w, this.m30 * vec.x + this.m31 * vec.y + this.m32 * vec.z + this.m33 * vec.w);
}, "JU.T4,JU.T4");
Clazz_defineMethod(c$, "rotTrans", 
function(point){
this.rotTrans2(point, point);
}, "JU.T3");
Clazz_defineMethod(c$, "rotTrans2", 
function(point, pointOut){
pointOut.set(this.m00 * point.x + this.m01 * point.y + this.m02 * point.z + this.m03, this.m10 * point.x + this.m11 * point.y + this.m12 * point.z + this.m13, this.m20 * point.x + this.m21 * point.y + this.m22 * point.z + this.m23);
return pointOut;
}, "JU.T3,JU.T3");
Clazz_defineMethod(c$, "setAsXYRotation", 
function(angle){
this.setIdentity();
var c = Math.cos(angle);
var s = Math.sin(angle);
this.m22 = c;
this.m23 = -s;
this.m32 = s;
this.m33 = c;
return this;
}, "~N");
Clazz_defineMethod(c$, "setAsYZRotation", 
function(angle){
this.setIdentity();
var c = Math.cos(angle);
var s = Math.sin(angle);
this.m00 = c;
this.m03 = -s;
this.m30 = s;
this.m33 = c;
return this;
}, "~N");
Clazz_defineMethod(c$, "setAsXZRotation", 
function(angle){
this.setIdentity();
var c = Math.cos(angle);
var s = Math.sin(angle);
this.m11 = c;
this.m13 = -s;
this.m31 = s;
this.m33 = c;
return this;
}, "~N");
Clazz_overrideMethod(c$, "equals", 
function(o){
if (!(Clazz_instanceOf(o,"JU.M4"))) return false;
var m = o;
return (this.m00 == m.m00 && this.m01 == m.m01 && this.m02 == m.m02 && this.m03 == m.m03 && this.m10 == m.m10 && this.m11 == m.m11 && this.m12 == m.m12 && this.m13 == m.m13 && this.m20 == m.m20 && this.m21 == m.m21 && this.m22 == m.m22 && this.m23 == m.m23 && this.m30 == m.m30 && this.m31 == m.m31 && this.m32 == m.m32 && this.m33 == m.m33);
}, "~O");
Clazz_overrideMethod(c$, "hashCode", 
function(){
return JU.T3.floatToIntBits(this.m00) ^ JU.T3.floatToIntBits(this.m01) ^ JU.T3.floatToIntBits(this.m02) ^ JU.T3.floatToIntBits(this.m03) ^ JU.T3.floatToIntBits(this.m10) ^ JU.T3.floatToIntBits(this.m11) ^ JU.T3.floatToIntBits(this.m12) ^ JU.T3.floatToIntBits(this.m13) ^ JU.T3.floatToIntBits(this.m20) ^ JU.T3.floatToIntBits(this.m21) ^ JU.T3.floatToIntBits(this.m22) ^ JU.T3.floatToIntBits(this.m23) ^ JU.T3.floatToIntBits(this.m30) ^ JU.T3.floatToIntBits(this.m31) ^ JU.T3.floatToIntBits(this.m32) ^ JU.T3.floatToIntBits(this.m33);
});
Clazz_overrideMethod(c$, "toString", 
function(){
return "[[" + this.m00 + "\t" + this.m01 + "\t" + this.m02 + "\t" + this.m03 + "]" + "\n  [" + this.m10 + "\t" + this.m11 + "\t" + this.m12 + "\t" + this.m13 + "]" + "\n  [" + this.m20 + "\t" + this.m21 + "\t" + this.m22 + "\t" + this.m23 + "]" + "\n  [" + this.m30 + "\t" + this.m31 + "\t" + this.m32 + "\t" + this.m33 + "]]";
});
Clazz_defineMethod(c$, "round", 
function(f){
this.m00 = this.rnd(this.m00, f);
this.m01 = this.rnd(this.m01, f);
this.m02 = this.rnd(this.m02, f);
this.m03 = this.rnd(this.m03, f);
this.m10 = this.rnd(this.m10, f);
this.m11 = this.rnd(this.m11, f);
this.m12 = this.rnd(this.m12, f);
this.m13 = this.rnd(this.m13, f);
this.m20 = this.rnd(this.m20, f);
this.m21 = this.rnd(this.m21, f);
this.m22 = this.rnd(this.m22, f);
this.m23 = this.rnd(this.m23, f);
this.m30 = this.rnd(this.m30, f);
this.m31 = this.rnd(this.m31, f);
this.m32 = this.rnd(this.m32, f);
this.m33 = this.rnd(this.m33, f);
return this;
}, "~N");
Clazz_defineMethod(c$, "rnd", 
function(n, f){
return (Math.abs(n) < f ? 0 : n);
}, "~N,~N");
});
;//5.0.1-v7 Sat Feb 21 18:17:38 CST 2026
Clazz_declarePackage("JU");
Clazz_load(["java.io.OutputStream", "javajs.api.GenericOutputChannel"], "JU.OC", ["java.io.BufferedWriter", "$.ByteArrayOutputStream", "$.OutputStreamWriter", "JU.Base64", "$.SB"], function(){
var c$ = Clazz_decorateAsClass(function(){
this.bytePoster = null;
this.fileName = null;
this.bw = null;
this.isLocalFile = false;
this.byteCount = 0;
this.isCanceled = false;
this.closed = false;
this.os = null;
this.sb = null;
this.type = null;
this.$isBase64 = false;
this.os0 = null;
this.bytes = null;
this.bigEndian = true;
Clazz_instantialize(this, arguments);}, JU, "OC", java.io.OutputStream, javajs.api.GenericOutputChannel);
Clazz_makeConstructor(c$, 
function(){
Clazz_superConstructor (this, JU.OC, []);
});
Clazz_makeConstructor(c$, 
function(fileName){
Clazz_superConstructor (this, JU.OC, []);
this.setParams(null, fileName, false, null);
}, "~S");
Clazz_defineMethod(c$, "setParams", 
function(bytePoster, fileName, asWriter, os){
this.bytePoster = bytePoster;
this.$isBase64 = ";base64,".equals(fileName);
if (this.$isBase64) {
fileName = null;
this.os0 = os;
os = null;
}this.fileName = fileName;
this.os = os;
this.isLocalFile = (fileName != null && !JU.OC.isRemote(fileName));
if (asWriter && !this.$isBase64 && os != null) this.bw =  new java.io.BufferedWriter( new java.io.OutputStreamWriter(os));
return this;
}, "javajs.api.BytePoster,~S,~B,java.io.OutputStream");
Clazz_overrideMethod(c$, "isBigEndian", 
function(){
return this.bigEndian;
});
Clazz_defineMethod(c$, "setBigEndian", 
function(TF){
this.bigEndian = TF;
}, "~B");
Clazz_defineMethod(c$, "setBytes", 
function(b){
this.bytes = b;
return this;
}, "~A");
Clazz_defineMethod(c$, "getFileName", 
function(){
return this.fileName;
});
Clazz_defineMethod(c$, "getName", 
function(){
return (this.fileName == null ? null : this.fileName.substring(this.fileName.lastIndexOf("/") + 1));
});
Clazz_defineMethod(c$, "getByteCount", 
function(){
return this.byteCount;
});
Clazz_defineMethod(c$, "setType", 
function(type){
this.type = type;
}, "~S");
Clazz_defineMethod(c$, "getType", 
function(){
return this.type;
});
Clazz_defineMethod(c$, "append", 
function(s){
try {
if (this.bw != null) {
this.bw.write(s);
} else if (this.os == null) {
if (this.sb == null) this.sb =  new JU.SB();
this.sb.append(s);
} else {
var b = s.getBytes();
this.os.write(b, 0, b.length);
this.byteCount += b.length;
return this;
}} catch (e) {
if (Clazz_exceptionOf(e,"java.io.IOException")){
} else {
throw e;
}
}
this.byteCount += s.length;
return this;
}, "~S");
Clazz_overrideMethod(c$, "reset", 
function(){
this.sb = null;
this.initOS();
});
Clazz_defineMethod(c$, "initOS", 
function(){
if (this.sb != null) {
var s = this.sb.toString();
this.reset();
this.append(s);
return;
}try {
{
this.os = null;
}if (this.os == null) this.os =  new java.io.ByteArrayOutputStream();
if (this.bw != null) {
this.bw.close();
this.bw =  new java.io.BufferedWriter( new java.io.OutputStreamWriter(this.os));
}} catch (e) {
if (Clazz_exceptionOf(e, Exception)){
System.out.println(e.toString());
} else {
throw e;
}
}
this.byteCount = 0;
});
Clazz_overrideMethod(c$, "writeByteAsInt", 
function(b){
if (this.os == null) this.initOS();
{
this.os.writeByteAsInt(b);
}this.byteCount++;
}, "~N");
Clazz_overrideMethod(c$, "write", 
function(buf, i, len){
if (this.os == null) this.initOS();
if (len < 0) len = buf.length - i;
try {
this.os.write(buf, i, len);
} catch (e) {
if (Clazz_exceptionOf(e,"java.io.IOException")){
} else {
throw e;
}
}
this.byteCount += len;
}, "~A,~N,~N");
Clazz_overrideMethod(c$, "writeShort", 
function(i){
if (this.isBigEndian()) {
this.writeByteAsInt(i >> 8);
this.writeByteAsInt(i);
} else {
this.writeByteAsInt(i);
this.writeByteAsInt(i >> 8);
}}, "~N");
Clazz_overrideMethod(c$, "writeLong", 
function(b){
if (this.isBigEndian()) {
this.writeInt(((b >> 32) & 0xFFFFFFFF));
this.writeInt((b & 0xFFFFFFFF));
} else {
this.writeByteAsInt((b >> 56));
this.writeByteAsInt((b >> 48));
this.writeByteAsInt((b >> 40));
this.writeByteAsInt((b >> 32));
this.writeByteAsInt((b >> 24));
this.writeByteAsInt((b >> 16));
this.writeByteAsInt((b >> 8));
this.writeByteAsInt(b);
}}, "~N");
Clazz_defineMethod(c$, "cancel", 
function(){
this.isCanceled = true;
this.closeChannel();
});
Clazz_overrideMethod(c$, "closeChannel", 
function(){
if (this.closed) return null;
try {
if (this.bw != null) {
this.bw.flush();
this.bw.close();
} else if (this.os != null) {
this.os.flush();
this.os.close();
}if (this.os0 != null && this.isCanceled) {
this.os0.flush();
this.os0.close();
}} catch (e) {
if (Clazz_exceptionOf(e, Exception)){
} else {
throw e;
}
}
if (this.isCanceled) {
this.closed = true;
return null;
}if (this.fileName == null) {
if (this.$isBase64) {
var s = this.getBase64();
if (this.os0 != null) {
this.os = this.os0;
this.append(s);
}this.sb =  new JU.SB();
this.sb.append(s);
this.$isBase64 = false;
return this.closeChannel();
}return (this.sb == null ? null : this.sb.toString());
}this.closed = true;
if (!this.isLocalFile) {
var ret = this.postByteArray();
if (ret == null || ret.startsWith("java.net")) this.byteCount = -1;
return ret;
}var jmol = null;
var _function = null;
{
jmol = self.J2S || Jmol; _function = (typeof this.fileName ==
"function" ? this.fileName : null);
}if (jmol != null) {
var data = (this.sb == null ? this.toByteArray() : this.sb.toString());
if (_function == null) jmol.doAjax(this.fileName, null, data, this.sb == null);
 else jmol.applyFunc(this.fileName, data);
}return null;
});
Clazz_defineMethod(c$, "isBase64", 
function(){
return this.$isBase64;
});
Clazz_defineMethod(c$, "getBase64", 
function(){
return JU.Base64.getBase64(this.toByteArray()).toString();
});
Clazz_defineMethod(c$, "toByteArray", 
function(){
return (this.bytes != null ? this.bytes : Clazz_instanceOf(this.os,"java.io.ByteArrayOutputStream") ? (this.os).toByteArray() : null);
});
Clazz_defineMethod(c$, "close", 
function(){
this.closeChannel();
});
Clazz_overrideMethod(c$, "toString", 
function(){
if (this.bw != null) try {
this.bw.flush();
} catch (e) {
if (Clazz_exceptionOf(e,"java.io.IOException")){
} else {
throw e;
}
}
if (this.sb != null) return this.closeChannel();
return this.byteCount + " bytes";
});
Clazz_defineMethod(c$, "postByteArray", 
function(){
var bytes = (this.sb == null ? this.toByteArray() : this.sb.toString().getBytes());
return this.bytePoster.postByteArray(this.fileName, bytes);
});
c$.isRemote = Clazz_defineMethod(c$, "isRemote", 
function(fileName){
if (fileName == null) return false;
var itype = JU.OC.urlTypeIndex(fileName);
return (itype >= 0 && itype < 4);
}, "~S");
c$.isLocal = Clazz_defineMethod(c$, "isLocal", 
function(fileName){
return (fileName != null && !JU.OC.isRemote(fileName));
}, "~S");
c$.urlTypeIndex = Clazz_defineMethod(c$, "urlTypeIndex", 
function(name){
if (name == null) return -2;
for (var i = 0; i < JU.OC.urlPrefixes.length; ++i) {
if (name.startsWith(JU.OC.urlPrefixes[i])) {
return i;
}}
return -1;
}, "~S");
Clazz_overrideMethod(c$, "writeInt", 
function(i){
if (this.bigEndian) {
this.writeByteAsInt(i >> 24);
this.writeByteAsInt(i >> 16);
this.writeByteAsInt(i >> 8);
this.writeByteAsInt(i);
} else {
this.writeByteAsInt(i);
this.writeByteAsInt(i >> 8);
this.writeByteAsInt(i >> 16);
this.writeByteAsInt(i >> 24);
}}, "~N");
Clazz_defineMethod(c$, "writeFloat", 
function(x){
this.writeInt(x == 0 ? 0 : Float.floatToIntBits(x));
}, "~N");
c$.urlPrefixes =  Clazz_newArray(-1, ["http:", "https:", "sftp:", "ftp:", "file:", "cache:"]);
});
;//5.0.1-v7 Sat Feb 21 18:17:38 CST 2026
Clazz_declarePackage("JU");
Clazz_load(["JU.T3"], "JU.P3", null, function(){
var c$ = Clazz_declareType(JU, "P3", JU.T3);
c$.newP = Clazz_defineMethod(c$, "newP", 
function(t){
var p =  new JU.P3();
p.x = t.x;
p.y = t.y;
p.z = t.z;
return p;
}, "JU.T3");
c$.getUnlikely = Clazz_defineMethod(c$, "getUnlikely", 
function(){
return (JU.P3.unlikely == null ? JU.P3.unlikely = JU.P3.new3(3.141592653589793, 2.718281828459045, (8.539734222673566)) : JU.P3.unlikely);
});
c$.new3 = Clazz_defineMethod(c$, "new3", 
function(x, y, z){
var p =  new JU.P3();
p.x = x;
p.y = y;
p.z = z;
return p;
}, "~N,~N,~N");
c$.newA = Clazz_defineMethod(c$, "newA", 
function(a){
return JU.P3.new3(a[0], a[1], a[2]);
}, "~A");
c$.unlikely = null;
});
;//5.0.1-v7 Sat Feb 21 18:17:38 CST 2026
Clazz_declarePackage("JU");
Clazz_load(["JU.T3i"], "JU.P3i", null, function(){
var c$ = Clazz_declareType(JU, "P3i", JU.T3i);
c$.new3 = Clazz_defineMethod(c$, "new3", 
function(x, y, z){
var pt =  new JU.P3i();
pt.x = x;
pt.y = y;
pt.z = z;
return pt;
}, "~N,~N,~N");
});
;//5.0.1-v7 Sat Feb 21 18:17:38 CST 2026
Clazz_declarePackage("JU");
Clazz_load(["JU.T4"], "JU.P4", null, function(){
var c$ = Clazz_declareType(JU, "P4", JU.T4);
c$.new4 = Clazz_defineMethod(c$, "new4", 
function(x, y, z, w){
var pt =  new JU.P4();
pt.set4(x, y, z, w);
return pt;
}, "~N,~N,~N,~N");
c$.newPt = Clazz_defineMethod(c$, "newPt", 
function(value){
var pt =  new JU.P4();
pt.set4(value.x, value.y, value.z, value.w);
return pt;
}, "JU.P4");
Clazz_defineMethod(c$, "distance4", 
function(p1){
var dx = this.x - p1.x;
var dy = this.y - p1.y;
var dz = this.z - p1.z;
var dw = this.w - p1.w;
return Math.sqrt(dx * dx + dy * dy + dz * dz + dw * dw);
}, "JU.P4");
});
;//5.0.1-v7 Sat Feb 21 18:17:38 CST 2026
Clazz_declarePackage("JU");
Clazz_load(null, "JU.PT", ["java.util.Arrays", "JU.AU", "$.DF", "$.SB"], function(){
var c$ = Clazz_declareType(JU, "PT", null);
c$.parseInt = Clazz_defineMethod(c$, "parseInt", 
function(str){
return JU.PT.parseIntNext(str,  Clazz_newIntArray(-1, [0]));
}, "~S");
c$.parseIntNext = Clazz_defineMethod(c$, "parseIntNext", 
function(str, next){
var cch = str.length;
if (next[0] < 0 || next[0] >= cch) return -2147483648;
return JU.PT.parseIntChecked(str, cch, next);
}, "~S,~A");
c$.parseIntChecked = Clazz_defineMethod(c$, "parseIntChecked", 
function(str, ichMax, next){
var digitSeen = false;
var value = 0;
var ich = next[0];
if (ich < 0) return -2147483648;
var ch;
while (ich < ichMax && JU.PT.isWhiteSpace(str, ich)) ++ich;

var negative = false;
if (ich < ichMax && (str.charAt(ich)).charCodeAt(0) == 45) {
negative = true;
++ich;
}while (ich < ichMax && (ch = (str.charAt(ich)).charCodeAt(0)) >= 48 && ch <= 57) {
value = value * 10 + (ch - 48);
digitSeen = true;
++ich;
}
if (!digitSeen) value = -2147483648;
 else if (negative) value = -value;
next[0] = ich;
return value;
}, "~S,~N,~A");
c$.isWhiteSpace = Clazz_defineMethod(c$, "isWhiteSpace", 
function(str, ich){
var ch;
return (ich >= 0 && ((ch = str.charAt(ich)) == ' ' || ch == '\t' || ch == '\n'));
}, "~S,~N");
c$.parseFloatChecked = Clazz_defineMethod(c$, "parseFloatChecked", 
function(str, ichMax, next, isStrict){
var digitSeen = false;
var ich = next[0];
if (isStrict && str.indexOf('\n') != str.lastIndexOf('\n')) return NaN;
while (ich < ichMax && JU.PT.isWhiteSpace(str, ich)) ++ich;

var negative = false;
if (ich < ichMax && str.charAt(ich) == '-') {
++ich;
negative = true;
}var ch = 0;
var ival = 0;
var ival2 = 0;
while (ich < ichMax && (ch = (str.charAt(ich)).charCodeAt(0)) >= 48 && ch <= 57) {
ival = (ival * 10) + (ch - 48) * 1;
++ich;
digitSeen = true;
}
var isDecimal = false;
var iscale = 0;
var nzero = (ival == 0 ? -1 : 0);
if (ch == 46) {
isDecimal = true;
while (++ich < ichMax && (ch = (str.charAt(ich)).charCodeAt(0)) >= 48 && ch <= 57) {
digitSeen = true;
if (nzero < 0) {
if (ch == 48) {
nzero--;
continue;
}nzero = -nzero;
}if (iscale < JU.PT.decimalScale.length) {
ival2 = (ival2 * 10) + (ch - 48) * 1;
iscale++;
}}
}var value;
if (!digitSeen) {
value = NaN;
} else if (ival2 > 0) {
value = ival2 * JU.PT.decimalScale[iscale - 1];
if (nzero > 1) {
if (nzero - 2 < JU.PT.decimalScale.length) {
value *= JU.PT.decimalScale[nzero - 2];
} else {
value *= Math.pow(10, 1 - nzero);
}} else {
value += ival;
}} else {
value = ival;
}var isExponent = false;
if (ich < ichMax && (ch == 69 || ch == 101 || ch == 68)) {
isExponent = true;
if (++ich >= ichMax) return NaN;
ch = (str.charAt(ich)).charCodeAt(0);
if ((ch == 43) && (++ich >= ichMax)) return NaN;
next[0] = ich;
var exponent = JU.PT.parseIntChecked(str, ichMax, next);
if (exponent == -2147483648) return NaN;
if (exponent > 0 && exponent <= JU.PT.tensScale.length) value *= JU.PT.tensScale[exponent - 1];
 else if (exponent < 0 && -exponent <= JU.PT.decimalScale.length) value *= JU.PT.decimalScale[-exponent - 1];
 else if (exponent != 0) value *= Math.pow(10, exponent);
} else {
next[0] = ich;
}if (negative) value = -value;
if (value == Infinity) value = 3.4028235E38;
return (!isStrict || (!isExponent || isDecimal) && JU.PT.checkTrailingText(str, next[0], ichMax) ? value : NaN);
}, "~S,~N,~A,~B");
c$.checkTrailingText = Clazz_defineMethod(c$, "checkTrailingText", 
function(str, ich, ichMax){
var ch;
while (ich < ichMax && (JU.PT.isWhitespace(ch = str.charAt(ich)) || ch == ';')) ++ich;

return (ich == ichMax);
}, "~S,~N,~N");
c$.parseFloatArray = Clazz_defineMethod(c$, "parseFloatArray", 
function(str){
return JU.PT.parseFloatArrayNext(str,  Clazz_newIntArray (1, 0), null, null, null);
}, "~S");
c$.parseFloatArrayInfested = Clazz_defineMethod(c$, "parseFloatArrayInfested", 
function(tokens, data){
var len = data.length;
var nTokens = tokens.length;
var n = 0;
var max = 0;
for (var i = 0; i >= 0 && i < len && n < nTokens; i++) {
var f;
while (Float.isNaN(f = JU.PT.parseFloat(tokens[n++])) && n < nTokens) {
}
if (!Float.isNaN(f)) data[(max = i)] = f;
if (n == nTokens) break;
}
return max + 1;
}, "~A,~A");
c$.parseFloatArrayNext = Clazz_defineMethod(c$, "parseFloatArrayNext", 
function(str, next, f, strStart, strEnd){
var n = 0;
var pt = next[0];
if (pt >= 0) {
if (strStart != null) {
var p = str.indexOf(strStart, pt);
if (p >= 0) next[0] = p + strStart.length;
}str = str.substring(next[0]);
pt = (strEnd == null ? -1 : str.indexOf(strEnd));
if (pt < 0) pt = str.length;
 else str = str.substring(0, pt);
next[0] += pt + 1;
var tokens = JU.PT.getTokens(str);
if (f == null) f =  Clazz_newFloatArray (tokens.length, 0);
n = JU.PT.parseFloatArrayInfested(tokens, f);
}if (f == null) return  Clazz_newFloatArray (0, 0);
for (var i = n; i < f.length; i++) f[i] = NaN;

return f;
}, "~S,~A,~A,~S,~S");
c$.parseFloatRange = Clazz_defineMethod(c$, "parseFloatRange", 
function(str, ichMax, next){
var cch = str.length;
if (ichMax > cch) ichMax = cch;
if (next[0] < 0 || next[0] >= ichMax) return NaN;
return JU.PT.parseFloatChecked(str, ichMax, next, false);
}, "~S,~N,~A");
c$.parseFloatNext = Clazz_defineMethod(c$, "parseFloatNext", 
function(str, next){
var cch = (str == null ? -1 : str.length);
return (next[0] < 0 || next[0] >= cch ? NaN : JU.PT.parseFloatChecked(str, cch, next, false));
}, "~S,~A");
c$.parseFloatStrict = Clazz_defineMethod(c$, "parseFloatStrict", 
function(str){
var cch = str.length;
if (cch == 0) return NaN;
return JU.PT.parseFloatChecked(str, cch,  Clazz_newIntArray(-1, [0]), true);
}, "~S");
c$.parseFloat = Clazz_defineMethod(c$, "parseFloat", 
function(str){
return JU.PT.parseFloatNext(str,  Clazz_newIntArray(-1, [0]));
}, "~S");
c$.parseIntRadix = Clazz_defineMethod(c$, "parseIntRadix", 
function(s, i){
{
return Integer.parseIntRadix(s, i);
}}, "~S,~N");
c$.getTokens = Clazz_defineMethod(c$, "getTokens", 
function(line){
return JU.PT.getTokensAt(line, 0);
}, "~S");
c$.parseToken = Clazz_defineMethod(c$, "parseToken", 
function(str){
return JU.PT.parseTokenNext(str,  Clazz_newIntArray(-1, [0]));
}, "~S");
c$.parseTrimmed = Clazz_defineMethod(c$, "parseTrimmed", 
function(str){
return JU.PT.parseTrimmedRange(str, 0, str.length);
}, "~S");
c$.parseTrimmedAt = Clazz_defineMethod(c$, "parseTrimmedAt", 
function(str, ichStart){
return JU.PT.parseTrimmedRange(str, ichStart, str.length);
}, "~S,~N");
c$.parseTrimmedRange = Clazz_defineMethod(c$, "parseTrimmedRange", 
function(str, ichStart, ichMax){
var cch = str.length;
if (ichMax < cch) cch = ichMax;
if (cch < ichStart) return "";
return JU.PT.parseTrimmedChecked(str, ichStart, cch);
}, "~S,~N,~N");
c$.getTokensAt = Clazz_defineMethod(c$, "getTokensAt", 
function(line, ich){
if (line == null) return null;
var cchLine = line.length;
if (ich < 0 || ich > cchLine) return null;
var tokenCount = JU.PT.countTokens(line, ich);
var tokens =  new Array(tokenCount);
var next =  Clazz_newIntArray (1, 0);
next[0] = ich;
for (var i = 0; i < tokenCount; ++i) tokens[i] = JU.PT.parseTokenChecked(line, cchLine, next);

return tokens;
}, "~S,~N");
c$.countChar = Clazz_defineMethod(c$, "countChar", 
function(line, c){
var n = 0;
for (var i = line.lastIndexOf(c) + 1; --i >= 0; ) if (line.charAt(i) == c) n++;

return n;
}, "~S,~S");
c$.countTokens = Clazz_defineMethod(c$, "countTokens", 
function(line, ich){
var tokenCount = 0;
if (line != null) {
var ichMax = line.length;
while (true) {
while (ich < ichMax && JU.PT.isWhiteSpace(line, ich)) ++ich;

if (ich == ichMax) break;
++tokenCount;
do {
++ich;
} while (ich < ichMax && !JU.PT.isWhiteSpace(line, ich));
}
}return tokenCount;
}, "~S,~N");
c$.parseTokenNext = Clazz_defineMethod(c$, "parseTokenNext", 
function(str, next){
var cch = str.length;
return (next[0] < 0 || next[0] >= cch ? null : JU.PT.parseTokenChecked(str, cch, next));
}, "~S,~A");
c$.parseTokenRange = Clazz_defineMethod(c$, "parseTokenRange", 
function(str, ichMax, next){
var cch = str.length;
if (ichMax > cch) ichMax = cch;
return (next[0] < 0 || next[0] >= ichMax ? null : JU.PT.parseTokenChecked(str, ichMax, next));
}, "~S,~N,~A");
c$.parseTokenChecked = Clazz_defineMethod(c$, "parseTokenChecked", 
function(str, ichMax, next){
var ich = next[0];
while (ich < ichMax && JU.PT.isWhiteSpace(str, ich)) ++ich;

var ichNonWhite = ich;
while (ich < ichMax && !JU.PT.isWhiteSpace(str, ich)) ++ich;

next[0] = ich;
return (ichNonWhite == ich ? null : str.substring(ichNonWhite, ich));
}, "~S,~N,~A");
c$.parseTrimmedChecked = Clazz_defineMethod(c$, "parseTrimmedChecked", 
function(str, ich, ichMax){
while (ich < ichMax && JU.PT.isWhiteSpace(str, ich)) ++ich;

var ichLast = ichMax - 1;
while (ichLast >= ich && JU.PT.isWhiteSpace(str, ichLast)) --ichLast;

return (ichLast < ich ? "" : str.substring(ich, ichLast + 1));
}, "~S,~N,~N");
c$.dVal = Clazz_defineMethod(c$, "dVal", 
function(s){
{
if(s==null)
throw new NumberFormatException("null");
var d=parseFloat(s);
if(isNaN(d))
throw new NumberFormatException("Not a Number : "+s);
return d
}}, "~S");
c$.fVal = Clazz_defineMethod(c$, "fVal", 
function(s){
{
return this.dVal(s);
}}, "~S");
c$.parseIntRange = Clazz_defineMethod(c$, "parseIntRange", 
function(str, ichMax, next){
var cch = str.length;
if (ichMax > cch) ichMax = cch;
return (next[0] < 0 || next[0] >= ichMax ? -2147483648 : JU.PT.parseIntChecked(str, ichMax, next));
}, "~S,~N,~A");
c$.parseFloatArrayData = Clazz_defineMethod(c$, "parseFloatArrayData", 
function(tokens, data){
JU.PT.parseFloatArrayDataN(tokens, data, data.length);
}, "~A,~A");
c$.parseFloatArrayDataN = Clazz_defineMethod(c$, "parseFloatArrayDataN", 
function(tokens, data, nData){
for (var i = nData; --i >= 0; ) data[i] = (i >= tokens.length ? NaN : JU.PT.parseFloat(tokens[i]));

}, "~A,~A,~N");
c$.split = Clazz_defineMethod(c$, "split", 
function(text, run){
if (text.length == 0) return  new Array(0);
var n = 1;
var i = text.indexOf(run);
var lines;
var runLen = run.length;
if (i < 0 || runLen == 0) {
lines =  new Array(1);
lines[0] = text;
return lines;
}var len = text.length - runLen;
for (; i >= 0 && i < len; n++) i = text.indexOf(run, i + runLen);

lines =  new Array(n);
i = 0;
var ipt = 0;
var pt = 0;
for (; (ipt = text.indexOf(run, i)) >= 0 && pt + 1 < n; ) {
lines[pt++] = text.substring(i, ipt);
i = ipt + runLen;
}
if (text.indexOf(run, len) != len) len += runLen;
lines[pt] = text.substring(i, len);
return lines;
}, "~S,~S");
c$.getQuotedStringAt = Clazz_defineMethod(c$, "getQuotedStringAt", 
function(line, ipt0){
var next =  Clazz_newIntArray(-1, [ipt0]);
return JU.PT.getQuotedStringNext(line, next);
}, "~S,~N");
c$.getQuotedStringNext = Clazz_defineMethod(c$, "getQuotedStringNext", 
function(line, next){
var i = next[0];
if (i < 0 || (i = line.indexOf("\"", i)) < 0) return "";
var pt = i + 1;
var len = line.length;
while (++i < len && line.charAt(i) != '"') if (line.charAt(i) == '\\') i++;

next[0] = i + 1;
return line.substring(pt, i);
}, "~S,~A");
c$.getQuotedOrUnquotedAttribute = Clazz_defineMethod(c$, "getQuotedOrUnquotedAttribute", 
function(line, key){
if (line == null || key == null) return null;
var pt = line.toLowerCase().indexOf(key.toLowerCase() + "=");
if (pt < 0 || (pt = pt + key.length + 1) >= line.length) return "";
var c = line.charAt(pt);
switch ((c).charCodeAt(0)) {
case 39:
case 34:
pt++;
break;
default:
c = ' ';
line += " ";
}
var pt1 = line.indexOf(c, pt);
return (pt1 < 0 ? null : line.substring(pt, pt1));
}, "~S,~S");
c$.getCSVString = Clazz_defineMethod(c$, "getCSVString", 
function(line, next){
var i = next[1];
if (i < 0 || (i = line.indexOf("\"", i)) < 0) return null;
var pt = next[0] = i;
var len = line.length;
var escaped = false;
var haveEscape = false;
while (++i < len && (line.charAt(i) != '"' || (escaped = (i + 1 < len && line.charAt(i + 1) == '"')))) if (escaped) {
escaped = false;
haveEscape = true;
i++;
}
if (i >= len) {
next[1] = -1;
return null;
}next[1] = i + 1;
var s = line.substring(pt + 1, i);
return (haveEscape ? JU.PT.rep(JU.PT.rep(s, "\"\"", "\0"), "\0", "\"") : s);
}, "~S,~A");
c$.isOneOf = Clazz_defineMethod(c$, "isOneOf", 
function(key, semiList){
if (semiList.length == 0 || key.indexOf(";") >= 0) return false;
if (semiList.charAt(0) != ';') semiList = ";" + semiList + ";";
return semiList.indexOf(';' + key + ';') >= 0;
}, "~S,~S");
c$.getQuotedAttribute = Clazz_defineMethod(c$, "getQuotedAttribute", 
function(info, name){
var i = info.indexOf(name + "=");
return (i < 0 ? null : JU.PT.getQuotedStringAt(info, i));
}, "~S,~S");
c$.approx = Clazz_defineMethod(c$, "approx", 
function(f, n){
return Math.round(f * n) / n;
}, "~N,~N");
c$.rep = Clazz_defineMethod(c$, "rep", 
function(str, strFrom, strTo){
if (str == null || strFrom.length == 0 || str.indexOf(strFrom) < 0) return str;
var isOnce = (strTo.indexOf(strFrom) >= 0);
do {
str = str.$replace(strFrom, strTo);
} while (!isOnce && str.indexOf(strFrom) >= 0);
return str;
}, "~S,~S,~S");
c$.formatF = Clazz_defineMethod(c$, "formatF", 
function(value, width, precision, alignLeft, zeroPad){
return JU.PT.formatS(JU.DF.formatDecimal(value, precision), width, 0, alignLeft, zeroPad);
}, "~N,~N,~N,~B,~B");
c$.formatD = Clazz_defineMethod(c$, "formatD", 
function(value, width, precision, alignLeft, zeroPad){
return JU.PT.formatS(JU.DF.formatDecimal(value, -1 - precision), width, 0, alignLeft, zeroPad);
}, "~N,~N,~N,~B,~B");
c$.formatS = Clazz_defineMethod(c$, "formatS", 
function(value, width, precision, alignLeft, zeroPad){
if (value == null) return "";
var len = value.length;
if (precision != 2147483647 && precision > 0 && precision < len) value = value.substring(0, precision);
 else if (precision < 0 && len + precision >= 0) value = value.substring(len + precision + 1);
var padLength = width - value.length;
if (padLength <= 0) return value;
var isNeg = (zeroPad && !alignLeft && value.charAt(0) == '-');
var padChar = (zeroPad ? '0' : ' ');
var padChar0 = (isNeg ? '-' : padChar);
var sb =  new JU.SB();
if (alignLeft) sb.append(value);
sb.appendC(padChar0);
for (var i = padLength; --i > 0; ) sb.appendC(padChar);

if (!alignLeft) sb.append(isNeg ? padChar + value.substring(1) : value);
return sb.toString();
}, "~S,~N,~N,~B,~B");
c$.replaceWithCharacter = Clazz_defineMethod(c$, "replaceWithCharacter", 
function(str, strFrom, chTo){
if (str == null) return null;
for (var i = strFrom.length; --i >= 0; ) str = str.$replace(strFrom.charAt(i), chTo);

return str;
}, "~S,~S,~S");
c$.replaceAllCharacters = Clazz_defineMethod(c$, "replaceAllCharacters", 
function(str, strFrom, strTo){
for (var i = strFrom.length; --i >= 0; ) {
var chFrom = strFrom.substring(i, i + 1);
str = JU.PT.rep(str, chFrom, strTo);
}
return str;
}, "~S,~S,~S");
c$.trim = Clazz_defineMethod(c$, "trim", 
function(str, chars){
if (str == null || str.length == 0) return str;
if (chars.length == 0) return str.trim();
var len = str.length;
var k = 0;
while (k < len && chars.indexOf(str.charAt(k)) >= 0) k++;

var m = str.length - 1;
while (m > k && chars.indexOf(str.charAt(m)) >= 0) m--;

return str.substring(k, m + 1);
}, "~S,~S");
c$.trimQuotes = Clazz_defineMethod(c$, "trimQuotes", 
function(value){
return (value != null && value.length > 1 && value.startsWith("\"") && value.endsWith("\"") ? value.substring(1, value.length - 1) : value);
}, "~S");
c$.isNonStringPrimitive = Clazz_defineMethod(c$, "isNonStringPrimitive", 
function(info){
{
if(typeof info == "number" || typeof info == "boolean") {
return true;
}
}return Clazz_instanceOf(info, Number) || Clazz_instanceOf(info, Boolean);
}, "~O");
c$.toJSON = Clazz_defineMethod(c$, "toJSON", 
function(infoType, info){
if (info == null) return JU.PT.packageJSON(infoType, null);
if (JU.PT.isNonStringPrimitive(info)) return JU.PT.packageJSON(infoType, info.toString());
var s = null;
var sb = null;
while (true) {
if ((typeof(info)=='string')) {
s = info;
{
if (typeof s == "undefined") s = "null"
}if (s.indexOf("{\"") != 0) {
s = JU.PT.esc(s);
}break;
}if (Clazz_instanceOf(info,"javajs.api.JSONEncodable")) {
if ((s = (info).toJSON()) == null) s = "null";
break;
}sb =  new JU.SB();
if (Clazz_instanceOf(info,"java.util.Map")) {
sb.append("{ ");
var sep = "";
var keys = (info).keySet();
var skeys = keys.toArray( new Array(keys.size()));
java.util.Arrays.sort(skeys);
for (var i = 0, n = skeys.length; i < n; i++) {
var key = skeys[i];
if (key == null) key = "null";
sb.append(sep).append(JU.PT.packageJSON(key, JU.PT.toJSON(null, (info).get(key))));
sep = ",";
}
sb.append(" }");
break;
}if (Clazz_instanceOf(info,"JU.Lst")) {
sb.append("[ ");
var n = (info).size();
for (var i = 0; i < n; i++) {
if (i > 0) sb.appendC(',');
sb.append(JU.PT.toJSON(null, (info).get(i)));
}
sb.append(" ]");
break;
}if (Clazz_instanceOf(info,"JU.M34")) {
var len = (Clazz_instanceOf(info,"JU.M4") ? 4 : 3);
var x =  Clazz_newFloatArray (len, 0);
var m = info;
sb.appendC('[');
for (var i = 0; i < len; i++) {
if (i > 0) sb.appendC(',');
m.getRow(i, x);
sb.append(JU.PT.toJSON(null, x));
}
sb.appendC(']');
break;
}s = JU.PT.nonArrayString(info);
if (s == null) {
sb.append("[");
var n = JU.AU.getLength(info);
var o = null;
{
o = info[0];
typeof o != "number" && typeof 0 != "boolean" && (o = null);
}if (o != null) {
sb.appendO(info);
} else {
for (var i = 0; i < n; i++) {
if (i > 0) sb.appendC(',');
sb.append(JU.PT.toJSON(null, JU.PT.arrayGet(info, i)));
}
}sb.append("]");
break;
}info = info.toString();
}
return JU.PT.packageJSON(infoType, (s == null ? sb.toString() : s));
}, "~S,~O");
c$.arrayGet = Clazz_defineMethod(c$, "arrayGet", 
function(info, i){
{
return info[i];
}}, "~O,~N");
c$.nonArrayString = Clazz_defineMethod(c$, "nonArrayString", 
function(x){
{
return (x.constructor == Array || x.BYTES_PER_ELEMENT ? null : x.toString());
}}, "~O");
c$.byteArrayToJSON = Clazz_defineMethod(c$, "byteArrayToJSON", 
function(data){
var sb =  new JU.SB();
sb.append("[");
var n = data.length;
for (var i = 0; i < n; i++) {
if (i > 0) sb.appendC(',');
sb.appendI(data[i] & 0xFF);
}
sb.append("]");
return sb.toString();
}, "~A");
c$.packageJSON = Clazz_defineMethod(c$, "packageJSON", 
function(infoType, info){
return (infoType == null ? info : "\"" + infoType + "\": " + info);
}, "~S,~S");
c$.escapeUrl = Clazz_defineMethod(c$, "escapeUrl", 
function(url){
url = JU.PT.rep(url, "\n", "");
url = JU.PT.rep(url, "%", "%25");
url = JU.PT.rep(url, "#", "%23");
url = JU.PT.rep(url, "[", "%5B");
url = JU.PT.rep(url, "\\", "%5C");
url = JU.PT.rep(url, "]", "%5D");
url = JU.PT.rep(url, " ", "%20");
return url;
}, "~S");
c$.esc = Clazz_defineMethod(c$, "esc", 
function(str){
if (str == null || str.length == 0) return "\"\"";
var haveEscape = false;
var i = 0;
for (; i < "\\\\\tt\rr\nn\"\"".length; i += 2) if (str.indexOf("\\\\\tt\rr\nn\"\"".charAt(i)) >= 0) {
haveEscape = true;
break;
}
if (haveEscape) while (i < "\\\\\tt\rr\nn\"\"".length) {
var pt = -1;
var ch = "\\\\\tt\rr\nn\"\"".charAt(i++);
var ch2 = "\\\\\tt\rr\nn\"\"".charAt(i++);
var sb =  new JU.SB();
var pt0 = 0;
while ((pt = str.indexOf(ch, pt + 1)) >= 0) {
sb.append(str.substring(pt0, pt)).appendC('\\').appendC(ch2);
pt0 = pt + 1;
}
sb.append(str.substring(pt0, str.length));
str = sb.toString();
}
return "\"" + JU.PT.escUnicode(str) + "\"";
}, "~S");
c$.escUnicode = Clazz_defineMethod(c$, "escUnicode", 
function(str){
for (var i = str.length; --i >= 0; ) if ((str.charAt(i)).charCodeAt(0) > 0x7F) {
var s = "0000" + Integer.toHexString(str.charAt(i).charCodeAt(0));
str = str.substring(0, i) + "\\u" + s.substring(s.length - 4) + str.substring(i + 1);
}
return str;
}, "~S");
c$.escF = Clazz_defineMethod(c$, "escF", 
function(f){
var sf = "" + f;
{
if (sf.indexOf(".") < 0 && sf.indexOf("e") < 0 && sf.indexOf("N") < 0 && sf.indexOf("n") < 0)
sf += ".0";
}return sf;
}, "~N");
c$.join = Clazz_defineMethod(c$, "join", 
function(s, c, i0){
if (s.length < i0) return null;
var sb =  new JU.SB();
sb.append(s[i0++]);
for (var i = i0; i < s.length; i++) sb.appendC(c).append(s[i]);

return sb.toString();
}, "~A,~S,~N");
c$.isLike = Clazz_defineMethod(c$, "isLike", 
function(a, b){
var areEqual = a.equals(b);
if (areEqual) return true;
var isStart = b.startsWith("*");
var isEnd = b.endsWith("*");
return (!isStart && !isEnd) ? areEqual : isStart && isEnd ? b.length == 1 || a.contains(b.substring(1, b.length - 1)) : isStart ? a.endsWith(b.substring(1)) : a.startsWith(b.substring(0, b.length - 1));
}, "~S,~S");
c$.getMapValueNoCase = Clazz_defineMethod(c$, "getMapValueNoCase", 
function(h, key){
if ("this".equals(key)) return h;
var val = h.get(key);
if (val == null) for (var e, $e = h.entrySet().iterator (); $e.hasNext()&& ((e = $e.next ()) || true);) if (e.getKey().equalsIgnoreCase(key)) return e.getValue();

return val;
}, "java.util.Map,~S");
c$.clean = Clazz_defineMethod(c$, "clean", 
function(s){
return JU.PT.rep(JU.PT.replaceAllCharacters(s, " \t\n\r", " "), "  ", " ").trim();
}, "~S");
c$.fdup = Clazz_defineMethod(c$, "fdup", 
function(f, pt, n){
var ch;
var count = 0;
for (var i = pt; --i >= 1; ) {
if (JU.PT.isDigit(ch = f.charAt(i))) continue;
switch ((ch).charCodeAt(0)) {
case 46:
if (count++ != 0) return f;
continue;
case 45:
if (i != 1 && f.charAt(i - 1) != '.') return f;
continue;
default:
return f;
}
}
var s = f.substring(0, pt + 1);
var sb =  new JU.SB();
for (var i = 0; i < n; i++) sb.append(s);

sb.append(f.substring(pt + 1));
return sb.toString();
}, "~S,~N,~N");
c$.formatString = Clazz_defineMethod(c$, "formatString", 
function(strFormat, key, strT, floatT, doubleT, doOne){
if (strFormat == null) return null;
if ("".equals(strFormat)) return "";
var len = key.length;
if (strFormat.indexOf("%") < 0 || len == 0 || strFormat.indexOf(key) < 0) return strFormat;
var strLabel = "";
var ich;
var ichPercent;
var ichKey;
for (ich = 0; (ichPercent = strFormat.indexOf('%', ich)) >= 0 && (ichKey = strFormat.indexOf(key, ichPercent + 1)) >= 0; ) {
if (ich != ichPercent) strLabel += strFormat.substring(ich, ichPercent);
ich = ichPercent + 1;
if (ichKey > ichPercent + 6) {
strLabel += '%';
continue;
}try {
var alignLeft = false;
if (strFormat.charAt(ich) == '-') {
alignLeft = true;
++ich;
}var zeroPad = false;
if (strFormat.charAt(ich) == '0') {
zeroPad = true;
++ich;
}var ch;
var width = 0;
while ((ch = strFormat.charAt(ich)) >= '0' && (ch <= '9')) {
width = (10 * width) + (ch.charCodeAt(0) - 48);
++ich;
}
var precision = 2147483647;
var isExponential = false;
if (strFormat.charAt(ich) == '.') {
++ich;
if ((ch = strFormat.charAt(ich)) == '-') {
isExponential = true;
++ich;
}if ((ch = strFormat.charAt(ich)) >= '0' && ch <= '9') {
precision = ch.charCodeAt(0) - 48;
++ich;
if ((ch = strFormat.charAt(ich)) >= '0' && ch <= '9') {
precision = 10 * precision + (ch.charCodeAt(0) - 48);
++ich;
}}if (isExponential) precision = -precision;
}var st = strFormat.substring(ich, ich + len);
if (!st.equals(key)) {
ich = ichPercent + 1;
strLabel += '%';
continue;
}ich += len;
if (!Float.isNaN(floatT)) strLabel += JU.PT.formatF(floatT, width, precision, alignLeft, zeroPad);
 else if (strT != null) strLabel += JU.PT.formatS(strT, width, precision < 0 ? precision - 1 : precision, alignLeft, zeroPad);
 else if (!Double.isNaN(doubleT)) strLabel += JU.PT.formatD(doubleT, width, precision - 1, alignLeft, zeroPad);
if (doOne) break;
} catch (ioobe) {
if (Clazz_exceptionOf(ioobe,"IndexOutOfBoundsException")){
ich = ichPercent;
break;
} else {
throw ioobe;
}
}
}
strLabel += strFormat.substring(ich);
return strLabel;
}, "~S,~S,~S,~N,~N,~B");
c$.formatStringS = Clazz_defineMethod(c$, "formatStringS", 
function(strFormat, key, strT){
return JU.PT.formatString(strFormat, key, strT, NaN, NaN, false);
}, "~S,~S,~S");
c$.formatStringF = Clazz_defineMethod(c$, "formatStringF", 
function(strFormat, key, floatT){
return JU.PT.formatString(strFormat, key, null, floatT, NaN, false);
}, "~S,~S,~N");
c$.formatStringI = Clazz_defineMethod(c$, "formatStringI", 
function(strFormat, key, intT){
return JU.PT.formatString(strFormat, key, "" + intT, NaN, NaN, false);
}, "~S,~S,~N");
c$.sprintf = Clazz_defineMethod(c$, "sprintf", 
function(strFormat, list, values){
if (values == null) return strFormat;
var n = list.length;
if (n == values.length) try {
for (var o = 0; o < n; o++) {
if (values[o] == null) continue;
switch ((list.charAt(o)).charCodeAt(0)) {
case 115:
strFormat = JU.PT.formatString(strFormat, "s", values[o], NaN, NaN, true);
break;
case 102:
strFormat = JU.PT.formatString(strFormat, "f", null, (values[o]).floatValue(), NaN, true);
break;
case 105:
strFormat = JU.PT.formatString(strFormat, "d", "" + values[o], NaN, NaN, true);
strFormat = JU.PT.formatString(strFormat, "i", "" + values[o], NaN, NaN, true);
break;
case 100:
strFormat = JU.PT.formatString(strFormat, "e", null, NaN, (values[o]).doubleValue(), true);
break;
case 112:
var pVal = values[o];
strFormat = JU.PT.formatString(strFormat, "p", null, pVal.x, NaN, true);
strFormat = JU.PT.formatString(strFormat, "p", null, pVal.y, NaN, true);
strFormat = JU.PT.formatString(strFormat, "p", null, pVal.z, NaN, true);
break;
case 113:
var qVal = values[o];
strFormat = JU.PT.formatString(strFormat, "q", null, qVal.x, NaN, true);
strFormat = JU.PT.formatString(strFormat, "q", null, qVal.y, NaN, true);
strFormat = JU.PT.formatString(strFormat, "q", null, qVal.z, NaN, true);
strFormat = JU.PT.formatString(strFormat, "q", null, qVal.w, NaN, true);
break;
case 83:
var sVal = values[o];
for (var i = 0; i < sVal.length; i++) strFormat = JU.PT.formatString(strFormat, "s", sVal[i], NaN, NaN, true);

break;
case 70:
var fVal = values[o];
for (var i = 0; i < fVal.length; i++) strFormat = JU.PT.formatString(strFormat, "f", null, fVal[i], NaN, true);

break;
case 73:
var iVal = values[o];
for (var i = 0; i < iVal.length; i++) strFormat = JU.PT.formatString(strFormat, "d", "" + iVal[i], NaN, NaN, true);

for (var i = 0; i < iVal.length; i++) strFormat = JU.PT.formatString(strFormat, "i", "" + iVal[i], NaN, NaN, true);

break;
case 68:
var dVal = values[o];
for (var i = 0; i < dVal.length; i++) strFormat = JU.PT.formatString(strFormat, "e", null, NaN, dVal[i], true);

}
}
return JU.PT.rep(strFormat, "%%", "%");
} catch (e) {
if (Clazz_exceptionOf(e, Exception)){
} else {
throw e;
}
}
System.out.println("TextFormat.sprintf error " + list + " " + strFormat);
return JU.PT.rep(strFormat, "%", "?");
}, "~S,~S,~A");
c$.formatCheck = Clazz_defineMethod(c$, "formatCheck", 
function(strFormat){
if (strFormat == null || strFormat.indexOf('p') < 0 && strFormat.indexOf('q') < 0) return strFormat;
strFormat = JU.PT.rep(strFormat, "%%", "\1");
strFormat = JU.PT.rep(strFormat, "%p", "%6.2p");
strFormat = JU.PT.rep(strFormat, "%q", "%6.2q");
var format = JU.PT.split(strFormat, "%");
var sb =  new JU.SB();
sb.append(format[0]);
for (var i = 1; i < format.length; i++) {
var f = "%" + format[i];
var pt;
if (f.length >= 3) {
if ((pt = f.indexOf('p')) >= 0) f = JU.PT.fdup(f, pt, 3);
if ((pt = f.indexOf('q')) >= 0) f = JU.PT.fdup(f, pt, 4);
}sb.append(f);
}
return sb.toString().$replace('\1', '%');
}, "~S");
c$.leftJustify = Clazz_defineMethod(c$, "leftJustify", 
function(s, s1, s2){
s.append(s2);
var n = s1.length - s2.length;
if (n > 0) s.append(s1.substring(0, n));
}, "JU.SB,~S,~S");
c$.rightJustify = Clazz_defineMethod(c$, "rightJustify", 
function(s, s1, s2){
var n = s1.length - s2.length;
if (n > 0) s.append(s1.substring(0, n));
s.append(s2);
}, "JU.SB,~S,~S");
c$.safeTruncate = Clazz_defineMethod(c$, "safeTruncate", 
function(f, n){
if (f > -0.001 && f < 0.001) f = 0;
return (f + "         ").substring(0, n);
}, "~N,~N");
c$.isWild = Clazz_defineMethod(c$, "isWild", 
function(s){
return s != null && (s.indexOf("*") >= 0 || s.indexOf("?") >= 0);
}, "~S");
c$.isMatch = Clazz_defineMethod(c$, "isMatch", 
function(search, match, checkStar, allowInitialStar){
if (search.equals(match)) return true;
var mLen = match.length;
if (mLen == 0) return false;
var isStar0 = (checkStar && allowInitialStar ? match.charAt(0) == '*' : false);
if (mLen == 1 && isStar0) return true;
var isStar1 = (checkStar && match.endsWith("*"));
var haveQ = (match.indexOf('?') >= 0);
if (!haveQ) {
if (isStar0) return (isStar1 ? (mLen < 3 || search.indexOf(match.substring(1, mLen - 1)) >= 0) : search.endsWith(match.substring(1)));
 else if (isStar1) return search.startsWith(match.substring(0, mLen - 1));
}var sLen = search.length;
var qqqq = "????";
var nq = 4;
while (nq < sLen) {
qqqq += qqqq;
nq *= 2;
}
if (checkStar) {
if (isStar0) {
match = qqqq + match.substring(1);
mLen += nq - 1;
}if (isStar1) {
match = match.substring(0, mLen - 1) + qqqq;
mLen += nq - 1;
}}if (mLen < sLen) return false;
var ich = 0;
while (mLen > sLen) {
if (allowInitialStar && match.charAt(ich) == '?') {
++ich;
} else if (match.charAt(ich + mLen - 1) != '?') {
return false;
}--mLen;
}
for (var i = sLen; --i >= 0; ) {
var chm = match.charAt(ich + i);
if (chm == '?') continue;
var chs = search.charAt(i);
if (chm != chs && (chm != '\1' || chs != '?')) return false;
}
return true;
}, "~S,~S,~B,~B");
c$.replaceQuotedStrings = Clazz_defineMethod(c$, "replaceQuotedStrings", 
function(s, list, newList){
var n = list.size();
for (var i = 0; i < n; i++) {
var name = list.get(i);
var newName = newList.get(i);
if (!newName.equals(name)) s = JU.PT.rep(s, "\"" + name + "\"", "\"" + newName + "\"");
}
return s;
}, "~S,JU.Lst,JU.Lst");
c$.replaceStrings = Clazz_defineMethod(c$, "replaceStrings", 
function(s, list, newList){
var n = list.size();
for (var i = 0; i < n; i++) {
var name = list.get(i);
var newName = newList.get(i);
if (!newName.equals(name)) s = JU.PT.rep(s, name, newName);
}
return s;
}, "~S,JU.Lst,JU.Lst");
c$.isDigit = Clazz_defineMethod(c$, "isDigit", 
function(ch){
var c = (ch).charCodeAt(0);
return (48 <= c && c <= 57);
}, "~S");
c$.isUpperCase = Clazz_defineMethod(c$, "isUpperCase", 
function(ch){
var c = (ch).charCodeAt(0);
return (65 <= c && c <= 90);
}, "~S");
c$.isLowerCase = Clazz_defineMethod(c$, "isLowerCase", 
function(ch){
var c = (ch).charCodeAt(0);
return (97 <= c && c <= 122);
}, "~S");
c$.isLetter = Clazz_defineMethod(c$, "isLetter", 
function(ch){
var c = (ch).charCodeAt(0);
return (65 <= c && c <= 90 || 97 <= c && c <= 122);
}, "~S");
c$.isLetterOrDigit = Clazz_defineMethod(c$, "isLetterOrDigit", 
function(ch){
var c = (ch).charCodeAt(0);
return (65 <= c && c <= 90 || 97 <= c && c <= 122 || 48 <= c && c <= 57);
}, "~S");
c$.isWhitespace = Clazz_defineMethod(c$, "isWhitespace", 
function(ch){
var c = (ch).charCodeAt(0);
return (c >= 0x1c && c <= 0x20 || c >= 0x9 && c <= 0xd);
}, "~S");
c$.fixPtFloats = Clazz_defineMethod(c$, "fixPtFloats", 
function(pt, f){
pt.x = Math.round(pt.x * f) / f;
pt.y = Math.round(pt.y * f) / f;
pt.z = Math.round(pt.z * f) / f;
}, "JU.T3,~N");
c$.fixFloat = Clazz_defineMethod(c$, "fixFloat", 
function(d, f){
return (Math.round(d * f) / f);
}, "~N,~N");
c$.fixDouble = Clazz_defineMethod(c$, "fixDouble", 
function(d, f){
return Math.round((d * f)) / f;
}, "~N,~N");
c$.parseFloatFraction = Clazz_defineMethod(c$, "parseFloatFraction", 
function(s){
var pt = s.indexOf("/");
return (pt < 0 ? JU.PT.parseFloat(s) : JU.PT.parseFloat(s.substring(0, pt)) / JU.PT.parseFloat(s.substring(pt + 1)));
}, "~S");
c$.tensScale =  Clazz_newFloatArray(-1, [10, 100, 1000, 10000, 100000, 1000000]);
c$.decimalScale =  Clazz_newFloatArray(-1, [0.1, 0.01, 0.001, 0.0001, 0.00001, 0.000001, 0.0000001, 0.00000001, 0.000000001, 0.0000000001, 0.00000000001, 0.000000000001, 0.0000000000001, 0.00000000000001, 0.000000000000001]);
});
;//5.0.1-v7 Sat Feb 21 18:17:38 CST 2026
Clazz_declarePackage("JU");
(function(){
var c$ = Clazz_decorateAsClass(function(){
this.sb = null;
this.s = null;
Clazz_instantialize(this, arguments);}, JU, "SB", null);
Clazz_makeConstructor(c$, 
function(){
{
this.s = "";
}});
c$.newN = Clazz_defineMethod(c$, "newN", 
function(n){
{
return new JU.SB();
}}, "~N");
c$.newS = Clazz_defineMethod(c$, "newS", 
function(s){
{
var sb = new JU.SB();
sb.s = s;
return sb;
}}, "~S");
Clazz_defineMethod(c$, "append", 
function(s){
{
this.s += s
}return this;
}, "~S");
Clazz_defineMethod(c$, "appendC", 
function(c){
{
this.s += c;
}return this;
}, "~S");
Clazz_defineMethod(c$, "appendI", 
function(i){
{
this.s += i
}return this;
}, "~N");
Clazz_defineMethod(c$, "appendB", 
function(b){
{
this.s += b
}return this;
}, "~B");
Clazz_defineMethod(c$, "appendF", 
function(f){
{
var sf = "" + f;
if (sf.indexOf(".") < 0 && sf.indexOf("e") < 0)
sf += ".0" ;
this.s += sf;
}return this;
}, "~N");
Clazz_defineMethod(c$, "appendD", 
function(d){
{
var sf = "" + d;
if (sf.indexOf(".") < 0 && sf.indexOf("e") < 0)
sf += ".0" ;
this.s += sf;
}return this;
}, "~N");
Clazz_defineMethod(c$, "appendSB", 
function(buf){
{
this.s += buf.s;
}return this;
}, "JU.SB");
Clazz_defineMethod(c$, "appendO", 
function(data){
if (data != null) {
{
this.s += data.toString();
}}return this;
}, "~O");
Clazz_defineMethod(c$, "appendCB", 
function(cb, off, len){
{
this.s += cb.slice(off,off+len).join("");
}}, "~A,~N,~N");
Clazz_overrideMethod(c$, "toString", 
function(){
{
return this.s;
}});
Clazz_defineMethod(c$, "length", 
function(){
{
return this.s.length;
}});
Clazz_defineMethod(c$, "indexOf", 
function(s){
{
return this.s.indexOf(s);
}}, "~S");
Clazz_defineMethod(c$, "charAt", 
function(i){
{
return this.s.charAt(i);
}}, "~N");
Clazz_defineMethod(c$, "charCodeAt", 
function(i){
{
return this.s.charCodeAt(i);
}}, "~N");
Clazz_defineMethod(c$, "setLength", 
function(n){
{
this.s = this.s.substring(0, n);
}}, "~N");
Clazz_defineMethod(c$, "lastIndexOf", 
function(s){
{
return this.s.lastIndexOf(s);
}}, "~S");
Clazz_defineMethod(c$, "indexOf2", 
function(s, i){
{
return this.s.indexOf(s, i);
}}, "~S,~N");
Clazz_defineMethod(c$, "substring", 
function(i){
{
return this.s.substring(i);
}}, "~N");
Clazz_defineMethod(c$, "substring2", 
function(i, j){
{
return this.s.substring(i, j);
}}, "~N,~N");
Clazz_defineMethod(c$, "toBytes", 
function(off, len){
if (len == 0) return  Clazz_newByteArray (0, 0);
var cs;
{
cs = "UTF-8";
}return (len > 0 ? this.substring2(off, off + len) : off == 0 ? this.toString() : this.substring2(off, this.length() - off)).getBytes(cs);
}, "~N,~N");
Clazz_defineMethod(c$, "replace", 
function(start, end, str){
{
this.s = this.s.substring(0, start) + str + this.s.substring(end);
}}, "~N,~N,~S");
Clazz_defineMethod(c$, "insert", 
function(offset, str){
this.replace(offset, offset, str);
}, "~N,~S");
})();
;//5.0.1-v7 Sat Feb 21 18:17:38 CST 2026
Clazz_declarePackage("JU");
Clazz_load(["javajs.api.JSONEncodable"], "JU.T3", null, function(){
var c$ = Clazz_decorateAsClass(function(){
this.x = 0;
this.y = 0;
this.z = 0;
Clazz_instantialize(this, arguments);}, JU, "T3", null, [javajs.api.JSONEncodable, java.io.Serializable]);
Clazz_defineMethod(c$, "set", 
function(x, y, z){
this.x = x;
this.y = y;
this.z = z;
}, "~N,~N,~N");
Clazz_defineMethod(c$, "setA", 
function(t){
this.x = t[0];
this.y = t[1];
this.z = t[2];
}, "~A");
Clazz_defineMethod(c$, "setT", 
function(t1){
this.x = t1.x;
this.y = t1.y;
this.z = t1.z;
}, "JU.T3");
Clazz_defineMethod(c$, "add2", 
function(t1, t2){
this.x = t1.x + t2.x;
this.y = t1.y + t2.y;
this.z = t1.z + t2.z;
}, "JU.T3,JU.T3");
Clazz_defineMethod(c$, "add", 
function(t1){
this.x += t1.x;
this.y += t1.y;
this.z += t1.z;
}, "JU.T3");
Clazz_defineMethod(c$, "distanceSquared", 
function(p1){
var dx = this.x - p1.x;
var dy = this.y - p1.y;
var dz = this.z - p1.z;
return (dx * dx + dy * dy + dz * dz);
}, "JU.T3");
Clazz_defineMethod(c$, "distance", 
function(p1){
return Math.sqrt(this.distanceSquared(p1));
}, "JU.T3");
Clazz_defineMethod(c$, "sub2", 
function(t1, t2){
this.x = t1.x - t2.x;
this.y = t1.y - t2.y;
this.z = t1.z - t2.z;
}, "JU.T3,JU.T3");
Clazz_defineMethod(c$, "sub", 
function(t1){
this.x -= t1.x;
this.y -= t1.y;
this.z -= t1.z;
}, "JU.T3");
Clazz_defineMethod(c$, "scale", 
function(s){
this.x *= s;
this.y *= s;
this.z *= s;
}, "~N");
Clazz_defineMethod(c$, "add3", 
function(a, b, c){
this.x += a;
this.y += b;
this.z += c;
}, "~N,~N,~N");
Clazz_defineMethod(c$, "scaleT", 
function(p){
this.x *= p.x;
this.y *= p.y;
this.z *= p.z;
}, "JU.T3");
Clazz_defineMethod(c$, "scaleAdd2", 
function(s, t1, t2){
this.x = s * t1.x + t2.x;
this.y = s * t1.y + t2.y;
this.z = s * t1.z + t2.z;
}, "~N,JU.T3,JU.T3");
Clazz_defineMethod(c$, "ave", 
function(a, b){
this.x = (a.x + b.x) / 2;
this.y = (a.y + b.y) / 2;
this.z = (a.z + b.z) / 2;
}, "JU.T3,JU.T3");
Clazz_defineMethod(c$, "dot", 
function(v){
return this.x * v.x + this.y * v.y + this.z * v.z;
}, "JU.T3");
Clazz_defineMethod(c$, "lengthSquared", 
function(){
return this.x * this.x + this.y * this.y + this.z * this.z;
});
Clazz_defineMethod(c$, "length", 
function(){
return Math.sqrt(this.lengthSquared());
});
Clazz_defineMethod(c$, "normalize", 
function(){
var d = this.length();
this.x /= d;
this.y /= d;
this.z /= d;
});
Clazz_defineMethod(c$, "cross", 
function(v1, v2){
this.set(v1.y * v2.z - v1.z * v2.y, v1.z * v2.x - v1.x * v2.z, v1.x * v2.y - v1.y * v2.x);
}, "JU.T3,JU.T3");
Clazz_overrideMethod(c$, "hashCode", 
function(){
var bits = 1;
bits = 31 * bits + JU.T3.floatToIntBits(this.x);
bits = 31 * bits + JU.T3.floatToIntBits(this.y);
bits = 31 * bits + JU.T3.floatToIntBits(this.z);
return (bits ^ (bits >> 32));
});
c$.floatToIntBits = Clazz_defineMethod(c$, "floatToIntBits", 
function(x){
return (x == 0 ? 0 : Float.floatToIntBits(x));
}, "~N");
Clazz_overrideMethod(c$, "equals", 
function(t1){
if (!(Clazz_instanceOf(t1,"JU.T3"))) return false;
var t2 = t1;
return (this.x == t2.x && this.y == t2.y && this.z == t2.z);
}, "~O");
Clazz_overrideMethod(c$, "toString", 
function(){
return "{" + this.x + ", " + this.y + ", " + this.z + "}";
});
Clazz_overrideMethod(c$, "toJSON", 
function(){
return "[" + this.x + "," + this.y + "," + this.z + "]";
});
Clazz_defineMethod(c$, "setP", 
function(t){
this.set(t.x, t.y, t.z);
return this;
}, "JU.T3");
Clazz_defineMethod(c$, "putP", 
function(t){
t.set(this.x, this.y, this.z);
return t;
}, "JU.T3");
});
;//5.0.1-v7 Sat Feb 21 18:17:38 CST 2026
Clazz_declarePackage("JU");
(function(){
var c$ = Clazz_decorateAsClass(function(){
this.x = 0;
this.y = 0;
this.z = 0;
Clazz_instantialize(this, arguments);}, JU, "T3i", null, java.io.Serializable);
c$.newV = Clazz_defineMethod(c$, "newV", 
function(t){
return JU.V3.new3(t.x, t.y, t.z);
}, "JU.T3");
c$.newVsub = Clazz_defineMethod(c$, "newVsub", 
function(t1, t2){
return JU.V3.new3(t1.x - t2.x, t1.y - t2.y, t1.z - t2.z);
}, "JU.T3,JU.T3");
c$.new3 = Clazz_defineMethod(c$, "new3", 
function(x, y, z){
var v =  new JU.V3();
v.x = x;
v.y = y;
v.z = z;
return v;
}, "~N,~N,~N");
Clazz_defineMethod(c$, "angle", 
function(v1){
var xx = this.y * v1.z - this.z * v1.y;
var yy = this.z * v1.x - this.x * v1.z;
var zz = this.x * v1.y - this.y * v1.x;
var cross = Math.sqrt(xx * xx + yy * yy + zz * zz);
return Math.abs(Math.atan2(cross, this.dot(v1)));
}, "JU.V3");
});
;//5.0.1-v7 Sat Feb 21 18:17:38 CST 2026
Clazz_load(["java.util.AbstractMap", "$.AbstractSet", "$.Iterator", "$.Map", "$.MapEntry"], "java.util.HashMap", ["java.util.AbstractCollection", "$.Arrays", "java.util.MapEntry.Type"], function(){
var c$ = Clazz_decorateAsClass(function(){
this.elementCount = 0;
this.elementData = null;
this.loadFactor = 0;
this.threshold = 0;
this.modCount = 0;
this.$entrySet = null;
this.__m = null;
this.__allowJS = false;
Clazz_instantialize(this, arguments);}, java.util, "HashMap", java.util.AbstractMap, [java.util.Map, Cloneable, java.io.Serializable]);
Clazz_makeConstructor(c$, 
function(){
var size = 16;
var loadFactor = 0.75;
{
size = (arguments[0] || size); loadFactor = (arguments[1] ||
0.75);
}this.initHM(size, loadFactor);
});
Clazz_defineMethod(c$, "newElementArray", 
function(s){
return  new Array(s);
}, "~N");
Clazz_defineMethod(c$, "initHM", 
function(capacity, loadFactor){
var map = null;
{
if (typeof capacity == "object") { map = capacity; this.__allowJS =
map.__allowJS; capacity = (map.size() < 6 ? 11 : map.size() * 2); }
else { this.__allowJS = true; } !capacity && (capacity = 0);
!loadFactor && (loadFactor = 0.75);
}if (capacity == 0) capacity = 16;
if (capacity >= 0) {
this.elementCount = 0;
this.elementData = this.newElementArray(capacity == 0 ? 1 : capacity);
this.loadFactor = loadFactor;
this.computeMaxSize();
} else {
throw  new IllegalArgumentException();
}this.__setJS();
if (map != null) {
this.putAll(map);
}}, "~N,~N");
Clazz_defineMethod(c$, "putMapEntries", 
function(mOriginal, evict){
var n = mOriginal.size();
if (n == 0) return;
var key = null;
var value = null;
if (java.util.HashMap.__isSimple(this) && java.util.HashMap.__isSimple(mOriginal)) {
var me = this;
var hash = 0;
var mode = java.util.HashMap.__hasKey(me, key);
{
mOriginal.__m.forEach(function(value, key) {
me.putJSVal(hash, key, value, false, evict, mode);
});
}return;
}if (java.util.HashMap.__isSimple(mOriginal)) {
var me = this;
{
mOriginal.__m.forEach(function(value, key) {
me.putJavaValue(key, value);
});
}return;
}this.__m = null;
for (var e, $e = mOriginal.entrySet().iterator (); $e.hasNext()&& ((e = $e.next ()) || true);) {
key = e.getKey();
value = e.getValue();
this.putJavaValue(key, value);
}
}, "java.util.Map,~B");
Clazz_defineMethod(c$, "reinitialize", 
function(){
this.elementData = null;
this.$entrySet = null;
this.$keySet = null;
this.$values = null;
this.modCount = 0;
this.threshold = 0;
this.elementCount = 0;
this.__setJS();
});
Clazz_overrideMethod(c$, "clear", 
function(){
this.modCount++;
if (java.util.HashMap.__isSimple(this)) {
{
this.__m.clear();
}}this.__setJS();
if (this.elementCount > 0) {
this.elementCount = 0;
java.util.Arrays.fill(this.elementData, null);
this.modCount++;
}});
Clazz_defineMethod(c$, "clone", 
function(){
var result;
try {
result = Clazz_superCall(this, java.util.HashMap, "clone", []);
} catch (e) {
if (Clazz_exceptionOf(e,"CloneNotSupportedException")){
return null;
} else {
throw e;
}
}
result.reinitialize();
result.putMapEntries(this, false);
return result;
});
Clazz_defineMethod(c$, "computeMaxSize", 
function(){
this.threshold = Clazz_floatToInt(this.elementData.length * this.loadFactor);
});
Clazz_overrideMethod(c$, "containsKey", 
function(key){
switch (java.util.HashMap.__hasKey(this, key)) {
case 0:
break;
case 1:
java.util.HashMap.__ensureJavaMap(this);
break;
case 2:
return false;
case 3:
return true;
}
return (this.getJavaEntry(key) != null);
}, "~O");
Clazz_defineMethod(c$, "keysEqual", 
function(k1, entry){
var k1Hash = k1 == null ? 0 : k1.hashCode();
if (k1Hash != entry.origKeyHash) {
return false;
}if (k1 == null && entry.key == null) {
return true;
}return k1.equals(entry.key);
}, "~O,java.util.HashMap.Entry");
Clazz_overrideMethod(c$, "containsValue", 
function(value){
if (java.util.HashMap.__isSimple(this)) {
var m = this.__m;
{
var iter = m.values();
for (var n = iter.next(); !n.done; n = iter.next()) {
if (n.value == value || n.value.equals$O(value)) {
return true;
}
}
}} else if (value != null) {
for (var i = this.elementData.length; --i >= 0; ) {
var entry = this.elementData[i];
while (entry != null) {
if (value.equals(entry.value)) {
return true;
}entry = entry.next;
}
}
} else {
for (var i = this.elementData.length; --i >= 0; ) {
var entry = this.elementData[i];
while (entry != null) {
if (entry.value == null) {
return true;
}entry = entry.next;
}
}
}return false;
}, "~O");
Clazz_overrideMethod(c$, "entrySet", 
function(){
var es;
return (es = this.$entrySet) == null ? (this.$entrySet =  new java.util.HashMap.HashMapEntrySet(this)) : es;
});
Clazz_overrideMethod(c$, "get", 
function(key){
switch (java.util.HashMap.__hasKey(this, key)) {
case 0:
break;
case 1:
java.util.HashMap.__ensureJavaMap(this);
break;
case 2:
return null;
case 3:
var v = null;
{
v = this.__m.get(key);
}return v;
}
var m = this.getJavaEntry(key);
return (m == null ? null : m.value);
}, "~O");
Clazz_defineMethod(c$, "getJavaEntry", 
function(key){
var index = this.getModuloHash(key);
return this.findJavaEntry(key, index);
}, "~O");
Clazz_defineMethod(c$, "getModuloHash", 
function(key){
if (key == null) {
return 0;
}return (key.hashCode() & 0x7FFFFFFF) % this.elementData.length;
}, "~O");
Clazz_defineMethod(c$, "findJavaEntry", 
function(key, index){
var m;
m = this.elementData[index];
if (key != null) {
while (m != null && !this.keysEqual(key, m)) {
m = m.next;
}
} else {
while (m != null && m.key != null) {
m = m.next;
}
}return m;
}, "~O,~N");
Clazz_overrideMethod(c$, "isEmpty", 
function(){
return this.size() == 0;
});
Clazz_overrideMethod(c$, "keySet", 
function(){
if (this.$keySet == null) {
this.$keySet = ((Clazz_isClassDefined("java.util.HashMap$1") ? 0 : java.util.HashMap.$HashMap$1$ ()), Clazz_innerTypeInstance(java.util.HashMap$1, this, null));
}return this.$keySet;
});
Clazz_overrideMethod(c$, "put", 
function(key, value){
var type = java.util.HashMap.__hasKey(this, key);
switch (type) {
case 0:
break;
case 1:
java.util.HashMap.__ensureJavaMap(this);
break;
case 2:
case 3:
return this.putJSVal(1, key, value, false, true, type);
}
return this.putJavaValue(key, value);
}, "~O,~O");
Clazz_defineMethod(c$, "putJavaValue", 
function(key, value){
var index = this.getModuloHash(key);
var entry = this.findJavaEntry(key, index);
if (entry == null) {
this.modCount++;
if (++this.elementCount > this.threshold) {
this.rehash();
index = key == null ? 0 : (key.hashCode() & 0x7FFFFFFF) % this.elementData.length;
}entry = this.createEntry(key, index, value);
return null;
}var result = entry.value;
entry.value = value;
return result;
}, "~O,~O");
Clazz_defineMethod(c$, "createEntry", 
function(key, index, value){
var entry =  new java.util.HashMap.Entry(key, value);
entry.next = this.elementData[index];
this.elementData[index] = entry;
return entry;
}, "~O,~N,~O");
Clazz_overrideMethod(c$, "putAll", 
function(map){
if (!map.isEmpty()) for (var entry, $entry = map.entrySet().iterator (); $entry.hasNext()&& ((entry = $entry.next ()) || true);) {
this.put(entry.getKey(), entry.getValue());
}
}, "java.util.Map");
Clazz_defineMethod(c$, "putJSVal", 
function(hash, key, value, onlyIfAbsent, evict, mode){
var v0 = null;
switch (mode) {
case 2:
{
this.__m.set(key, value);
}++this.modCount;
break;
case 3:
if (hash != 0) {
{
v0 = this.__m.get(key) || null;
}}if (!onlyIfAbsent || v0 == null) {
{
this.__m.set(key, value);
}}break;
}
return v0;
}, "~N,~O,~O,~B,~B,~N");
Clazz_defineMethod(c$, "rehashImpl", 
function(capacity){
var length = (capacity == 0 ? 1 : capacity << 1);
var newData = this.newElementArray(length);
for (var i = 0; i < this.elementData.length; i++) {
var entry = this.elementData[i];
while (entry != null) {
var key = entry.key;
var index = key == null ? 0 : (key.hashCode() & 0x7FFFFFFF) % length;
var next = entry.next;
entry.next = newData[index];
newData[index] = entry;
entry = next;
}
}
this.elementData = newData;
this.computeMaxSize();
}, "~N");
Clazz_defineMethod(c$, "rehash", 
function(){
this.rehashImpl(this.elementData.length);
});
Clazz_overrideMethod(c$, "remove", 
function(key){
switch (java.util.HashMap.__hasKey(this, key)) {
case 0:
break;
case 1:
java.util.HashMap.__ensureJavaMap(this);
break;
case 2:
return null;
case 3:
return this.removeJSNode(1, key, null, false, true);
}
var entry = this.removeJavaEntry(key);
return (entry == null ? null : entry.value);
}, "~O");
Clazz_defineMethod(c$, "removeJSNode", 
function(hash, key, value, matchValue, movable){
var v = null;
if (hash == 1 || matchValue) {
{
v = this.__m.get(key) || null;
}}if (!matchValue || v === value || (value != null && value.equals(v))) {
{
this.__m["delete"](key);
}++this.modCount;
switch (hash) {
case 1:
return v;
case 3:
return "true";
}
}return null;
}, "~N,~O,~O,~B,~B");
Clazz_defineMethod(c$, "removeJavaEntry", 
function(key){
var index = 0;
var entry;
var last = null;
if (key != null) {
index = (key.hashCode() & 0x7FFFFFFF) % this.elementData.length;
entry = this.elementData[index];
while (entry != null && !this.keysEqual(key, entry)) {
last = entry;
entry = entry.next;
}
} else {
entry = this.elementData[0];
while (entry != null && entry.key != null) {
last = entry;
entry = entry.next;
}
}if (entry == null) {
return null;
}if (last == null) {
this.elementData[index] = entry.next;
} else {
last.next = entry.next;
}this.modCount++;
this.elementCount--;
return entry;
}, "~O");
Clazz_overrideMethod(c$, "size", 
function(){
{
if (this.__m)
return this.__m.size;
}return this.elementCount;
});
Clazz_overrideMethod(c$, "values", 
function(){
if (this.$values == null) {
this.$values = ((Clazz_isClassDefined("java.util.HashMap$2") ? 0 : java.util.HashMap.$HashMap$2$ ()), Clazz_innerTypeInstance(java.util.HashMap$2, this, null));
}return this.$values;
});
Clazz_defineMethod(c$, "__setJS", 
function(){
if (this.__allowJS && java.util.HashMap.USE_SIMPLE) {
var m = null;
{
m = new Map();
}this.__m = m;
} else {
this.__m = null;
}});
c$.__get = Clazz_defineMethod(c$, "__get", 
function(map, key){
{
return map.__m.get(key == null ? null : key + "");
}}, "~O,~O");
c$.__set = Clazz_defineMethod(c$, "__set", 
function(map, key, value){
{
map.__m.set(key == null ? null : key + "", value);
}}, "java.util.Map,~O,~O");
c$.__hasKey = Clazz_defineMethod(c$, "__hasKey", 
function(map, key){
{
return (!map.__m ? 0 : key != null && typeof key != "string" ? 1 :
map.__m.has(key) ? 3 : 2);
}}, "java.util.Map,~O");
c$.__isSimple = Clazz_defineMethod(c$, "__isSimple", 
function(map){
{
return !!map.__m;
}}, "java.util.Map");
c$.__ensureJavaMap = Clazz_defineMethod(c$, "__ensureJavaMap", 
function(map){
{
if (map.__m) { var m = map.__m; map.__m = null;
m.forEach(function(value, key){map.put(key, value);}); m.clear();
}
}}, "java.util.Map");
c$.$HashMap$1$=function(){
})();
};
c$.$HashMap$1$1$=function(){
})();
};
c$.$HashMap$2$=function(){
})();
};
c$.$HashMap$2$1$=function(){
})();
};
})();
})();
;(function(){
var c$ = Clazz_declareAnonymous(java.util, "HashMap$HashMapEntrySet$1", null, java.util.MapEntry.Type);
Clazz_overrideMethod(c$, "get", 
function(entry){
if (java.util.HashMap.__isSimple(this.b$["java.util.HashMap.HashMapEntrySet"].associatedMap)) {
var key = null;
var value = null;
{
key = entry.value[0];
value = entry.value[1];
}return  new java.util.HashMap.Entry(key, value);
}return entry;
}, "java.util.MapEntry");
})();
c$.USE_SIMPLE = true;
});
;//5.0.1-v7 Mon May 12 23:42:45 CDT 2025
Clazz_load(["java.util.HashMap"], "java.util.LinkedHashMap", ["java.util.AbstractCollection", "$.AbstractSet", "java.util.MapEntry.Type"], function(){
var c$ = Clazz_decorateAsClass(function(){
this.accessOrder = false;
this.head = null;
this.tail = null;
Clazz_instantialize(this, arguments);}, java.util, "LinkedHashMap", java.util.HashMap);
Clazz_makeConstructor(c$, 
function(){
this.construct (16, 0.75, false);
});
Clazz_makeConstructor(c$, 
function(s){
this.construct (s, 0.75, false);
}, "~N");
Clazz_makeConstructor(c$, 
function(s, lf){
this.construct (s, lf, false);
}, "~N,~N");
Clazz_makeConstructor(c$, 
function(s, lf, order){
Clazz_superConstructor(this, java.util.LinkedHashMap, [s, lf]);
this.accessOrder = order;
this.head = null;
this.tail = null;
}, "~N,~N,~B");
Clazz_makeConstructor(c$, 
function(m){
Clazz_superConstructor (this, java.util.LinkedHashMap, []);
this.accessOrder = false;
this.head = null;
this.tail = null;
this.putAll(m);
}, "java.util.Map");
Clazz_overrideMethod(c$, "newElementArray", 
function(s){
return  new Array(s);
}, "~N");
Clazz_overrideMethod(c$, "get", 
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
Clazz_overrideMethod(c$, "createEntry", 
function(key, index, value){
var m =  new java.util.LinkedHashMap.LinkedHashMapEntry(key, value);
m.next = this.elementData[index];
this.elementData[index] = m;
this.linkEntry(m);
return m;
}, "~O,~N,~O");
Clazz_overrideMethod(c$, "put", 
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
Clazz_defineMethod(c$, "linkEntry", 
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
Clazz_overrideMethod(c$, "entrySet", 
function(){
return  new java.util.LinkedHashMap.LinkedHashMapEntrySet(this);
});
Clazz_overrideMethod(c$, "keySet", 
function(){
if (this.$keySet == null) {
this.$keySet = ((Clazz_isClassDefined("java.util.LinkedHashMap$1") ? 0 : java.util.LinkedHashMap.$LinkedHashMap$1$ ()), Clazz_innerTypeInstance(java.util.LinkedHashMap$1, this, null));
}return this.$keySet;
});
Clazz_overrideMethod(c$, "values", 
function(){
if (this.$values == null) {
this.$values = ((Clazz_isClassDefined("java.util.LinkedHashMap$2") ? 0 : java.util.LinkedHashMap.$LinkedHashMap$2$ ()), Clazz_innerTypeInstance(java.util.LinkedHashMap$2, this, null));
}return this.$values;
});
Clazz_overrideMethod(c$, "remove", 
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
Clazz_defineMethod(c$, "removeEldestEntry", 
function(eldest){
return false;
}, "java.util.Map.Entry");
Clazz_defineMethod(c$, "clear", 
function(){
Clazz_superCall(this, java.util.LinkedHashMap, "clear", []);
this.head = this.tail = null;
});
Clazz_defineMethod(c$, "clone", 
function(){
var map = Clazz_superCall(this, java.util.LinkedHashMap, "clone", []);
map.clear();
for (var entry, $entry = this.entrySet().iterator (); $entry.hasNext()&& ((entry = $entry.next ()) || true);) {
map.put(entry.getKey(), entry.getValue());
}
return map;
});
Clazz_overrideMethod(c$, "__setJS", 
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
var c$ = Clazz_declareAnonymous(java.util, "LinkedHashMap$LinkedHashMapEntrySet$1", null, java.util.MapEntry.Type);
Clazz_overrideMethod(c$, "get", 
function(entry){
return entry;
}, "java.util.MapEntry");
})();
})();
});
;//5.0.1-v7 Mon May 12 23:42:45 CDT 2025
Clazz_declarePackage("J.api");
Clazz_declareInterface(J.api, "JmolJDXMOLParser");
;//5.0.1-v7 Sat Feb 21 18:17:38 CST 2026
Clazz_declarePackage("J.api");
Clazz_declareInterface(J.api, "JmolJDXMOLReader");
;//5.0.1-v7 Sat Feb 21 18:17:38 CST 2026
Clazz_declarePackage("J.api");
Clazz_declareInterface(J.api, "GenericGraphics");
;//5.0.1-v7 Sat Feb 21 18:17:38 CST 2026
Clazz_declarePackage("J.jsv");
Clazz_load(["J.api.JmolJDXMOLParser", "java.util.Hashtable"], "J.jsv.JDXMOLParser", ["JU.BS", "$.Lst", "$.PT", "$.SB", "JU.Logger"], function(){
var c$ = Clazz_decorateAsClass(function(){
this.line = null;
this.lastModel = "";
this.thisModelID = null;
this.baseModel = null;
this.vibScale = 0;
this.peakXLabel = null;
this.peakYLabel = null;
this.loader = null;
this.peakIndex = null;
this.peakFilePath = null;
this.firstModelWithPeaks = null;
this.mapDup = null;
Clazz_instantialize(this, arguments);}, J.jsv, "JDXMOLParser", null, J.api.JmolJDXMOLParser);
Clazz_prepareFields (c$, function(){
this.mapDup =  new java.util.Hashtable();
});
Clazz_makeConstructor(c$, 
function(){
});
Clazz_overrideMethod(c$, "set", 
function(loader, filePath, htParams){
this.loader = loader;
this.peakFilePath = filePath;
this.peakIndex =  Clazz_newIntArray (1, 0);
if (htParams != null) {
htParams.remove("modelNumber");
if (htParams.containsKey("zipSet")) {
this.peakIndex = htParams.get("peakIndex");
if (this.peakIndex == null) {
this.peakIndex =  Clazz_newIntArray (1, 0);
htParams.put("peakIndex", this.peakIndex);
}if (!htParams.containsKey("subFileName")) this.peakFilePath = JU.PT.split(filePath, "|")[0];
}}return this;
}, "J.api.JmolJDXMOLReader,~S,java.util.Map");
Clazz_overrideMethod(c$, "getAttribute", 
function(line, tag){
var attr = JU.PT.getQuotedAttribute(line, tag);
return (attr == null ? "" : attr);
}, "~S,~S");
Clazz_overrideMethod(c$, "getRecord", 
function(key){
if (this.line == null || this.line.indexOf(key) < 0) return null;
var s = this.line;
while (s.indexOf(">") < 0) s += " " + this.readLine();

return this.line = s;
}, "~S");
Clazz_overrideMethod(c$, "readModels", 
function(){
if (!this.findRecord("Models")) return false;
this.line = "";
this.thisModelID = "";
var isFirst = true;
while (true) {
this.line = this.loader.discardLinesUntilNonBlank();
if (this.getRecord("<ModelData") == null) break;
this.getModelData(isFirst);
isFirst = false;
}
return true;
});
Clazz_overrideMethod(c$, "readACDMolFile", 
function(){
var sb =  new JU.SB();
sb.append(this.line.substring(this.line.indexOf("=") + 1)).appendC('\n');
while (this.readLine() != null && !this.line.contains("$$$$")) sb.append(this.line).appendC('\n');

return JU.PT.rep(sb.toString(), "  $$ Empty String", "");
});
Clazz_overrideMethod(c$, "readACDAssignments", 
function(nPoints, isPeakAssignment, list){
var overflow = false;
try {
if (this.line == null || this.line.indexOf("#") >= 0) this.readLine();
if (nPoints < 0) nPoints = 2147483647;
for (var i = 0; i < nPoints; i++) {
var s = this.readLine();
if (s == null || s.indexOf("#") == 0) {
overflow = true;
break;
}if (isPeakAssignment) {
while (s.indexOf(">") < 0) s += " " + this.readLine();

s = s.trim();
}s = JU.PT.replaceAllCharacters(s, "()<>", " ").trim();
if (s.length == 0) break;
var pt = s.indexOf("'");
if (pt >= 0) {
var pt2 = s.indexOf("'", pt + 1);
s = s.substring(0, pt) + JU.PT.rep(s.substring(pt + 1, pt2), ",", ";") + s.substring(pt2 + 1);
}JU.Logger.info("Peak Assignment: " + s);
var tokens = JU.PT.split(s, ",");
list.addLast(tokens);
}
} catch (e) {
if (Clazz_exceptionOf(e, Exception)){
JU.Logger.error("Error reading peak assignments at " + this.line + ": " + e);
} else {
throw e;
}
}
return !overflow;
}, "~N,~B,JU.Lst");
Clazz_overrideMethod(c$, "setACDAssignments", 
function(model, mytype, peakCount, acdlist, molFile){
try {
if (peakCount >= 0) this.peakIndex =  Clazz_newIntArray(-1, [peakCount]);
var isMS = (mytype.indexOf("MASS") == 0);
var file = " file=" + JU.PT.esc(this.peakFilePath.$replace('\\', '/'));
model = " model=" + JU.PT.esc(model + " (assigned)");
this.peakXLabel = "";
this.peakYLabel = "";
var dx = this.getACDPeakWidth(mytype) / 2;
var htSets =  new java.util.Hashtable();
var list =  new JU.Lst();
var zzcMap = null;
var ptx;
var pta;
var nAtoms = 0;
if (isMS) {
zzcMap =  new java.util.Hashtable();
var tokens = JU.PT.split(molFile, "M  ZZC");
for (var i = tokens.length; --i >= 1; ) {
var ab = JU.PT.getTokens(tokens[i]);
nAtoms = Math.max(nAtoms, JU.PT.parseInt(ab[0]));
zzcMap.put(ab[1], ab[0]);
}
ptx = 4;
pta = 0;
} else if (mytype.indexOf("NMR") >= 0) {
ptx = 0;
pta = 3;
} else {
ptx = 0;
pta = 2;
}var nPeaks = acdlist.size();
for (var i = 0; i < nPeaks; i++) {
var data = acdlist.get(i);
var x = JU.PT.parseFloat(data[ptx]);
var a = data[pta];
if (isMS) a = this.fixACDAtomList(a, zzcMap, nAtoms);
 else a = a.$replace(';', ',');
if (a.indexOf("select") >= 0) {
var pt = a.indexOf("select atomno=");
if (pt < 0) continue;
a = JU.PT.split(a.substring(pt + 14), " ")[0];
}var title = (isMS ? "m/z=" + Math.round(x) + ": " + data[2] + " (" + data[1] + ")" : pta == 2 ? "" + (Math.round(x * 10) / 10) : null);
this.getStringInfo(file, title, mytype, model, a, htSets, "" + x, list, " atoms=\"%ATOMS%\" xMin=\"" + (x - dx) + "\" xMax=\"" + (x + dx) + "\">");
}
return this.setPeakData(list, 0);
} catch (e) {
if (Clazz_exceptionOf(e, Exception)){
return 0;
} else {
throw e;
}
}
}, "~S,~S,~N,JU.Lst,~S");
Clazz_defineMethod(c$, "fixACDAtomList", 
function(atoms, zzcMap, nAtoms){
atoms = atoms.trim();
var tokens = JU.PT.getTokens(atoms.$replace(';', ' '));
var bs =  new JU.BS();
var isM = false;
for (var i = 0; i < tokens.length; i++) {
var a = tokens[i];
isM = (a.indexOf("M") >= 0);
if (isM) a = "1-" + nAtoms;
var pt = a.indexOf('-');
if (pt >= 0) {
var i1 = JU.PT.parseInt(a.substring(0, pt));
var i2 = JU.PT.parseInt(a.substring(pt + 1)) + 1;
for (var k = i1; k < i2; k++) bs.set(isM ? k : JU.PT.parseInt(zzcMap.get("" + k)));

} else {
bs.set(JU.PT.parseInt(zzcMap.get(a)));
}}
var s = bs.toJSON();
return s.substring(1, s.length - 1);
}, "~S,java.util.Map,~N");
Clazz_defineMethod(c$, "getACDPeakWidth", 
function(type){
return (type.indexOf("HNMR") >= 0 ? 0.05 : type.indexOf("CNMR") >= 0 ? 1 : type.indexOf("MASS") >= 0 ? 1 : 10);
}, "~S");
Clazz_overrideMethod(c$, "readPeaks", 
function(isSignals, peakCount){
try {
if (peakCount >= 0) this.peakIndex =  Clazz_newIntArray(-1, [peakCount]);
var offset = (isSignals ? 1 : 0);
var tag1 = (isSignals ? "Signals" : "Peaks");
var tag2 = (isSignals ? "<Signal" : "<PeakData");
if (!this.findRecord(tag1)) return 0;
var file = " file=" + JU.PT.esc(this.peakFilePath.$replace('\\', '/'));
var model = JU.PT.getQuotedAttribute(this.line, "model");
model = this.fixModel(model, true);
model = " model=" + JU.PT.esc(model == null ? this.thisModelID : model);
var mytype = JU.PT.getQuotedAttribute(this.line, "type");
this.peakXLabel = JU.PT.getQuotedAttribute(this.line, "xLabel");
this.peakYLabel = JU.PT.getQuotedAttribute(this.line, "yLabel");
var htSets =  new java.util.Hashtable();
var list =  new JU.Lst();
while (this.readLine() != null && !(this.line = this.line.trim()).startsWith("</" + tag1)) {
if (this.line.startsWith(tag2)) {
this.getRecord(tag2);
JU.Logger.info(this.line);
var title = JU.PT.getQuotedAttribute(this.line, "title");
if (mytype == null) mytype = JU.PT.getQuotedAttribute(this.line, "type");
var atoms = JU.PT.getQuotedAttribute(this.line, "atoms");
var key = (Clazz_floatToInt(JU.PT.parseFloat(JU.PT.getQuotedAttribute(this.line, "xMin")) * 100)) + "_" + (Clazz_floatToInt(JU.PT.parseFloat(JU.PT.getQuotedAttribute(this.line, "xMax")) * 100));
var peakModel = JU.PT.getQuotedAttribute(this.line, "model");
var newID = this.fixModel(peakModel, true);
if (this.firstModelWithPeaks == null) this.firstModelWithPeaks = newID;
if (newID != null && !newID.equals(peakModel)) {
this.line = JU.PT.rep(this.line, "model=\"" + peakModel + "\"", "model=\"" + newID + "\"");
JU.Logger.error("peak model changed from " + peakModel + " for " + this.line);
}var more = this.line.substring(tag2.length).trim();
this.getStringInfo(file, title, mytype, (peakModel == null ? model : ""), atoms, htSets, key, list, more);
}}
return this.setPeakData(list, offset);
} catch (e) {
if (Clazz_exceptionOf(e, Exception)){
return 0;
} else {
throw e;
}
}
}, "~B,~N");
Clazz_defineMethod(c$, "checkDuplicateModelID", 
function(){
if (false) return;
var idup = this.mapDup.get(this.thisModelID);
if (idup == null) {
this.mapDup.put(this.thisModelID, Integer.$valueOf(1));
} else {
idup = Integer.$valueOf(idup.intValue() + 1);
var newID = this.thisModelID + idup;
JU.Logger.error("duplicate model id " + this.thisModelID + " now " + newID);
this.mapDup.put(this.thisModelID, idup);
this.thisModelID = newID;
}});
Clazz_defineMethod(c$, "fixModel", 
function(model, andIncrement){
if (model != null && JU.PT.parseInt(model) != -2147483648) model = "_" + model;
if (false) return model;
var idup = (model == null || !andIncrement ? null : this.mapDup.get(model));
if (idup != null && idup.intValue() > 1) {
model = this.thisModelID;
}return model;
}, "~S,~B");
Clazz_defineMethod(c$, "setPeakData", 
function(list, offset){
var nH = 0;
var n = list.size();
for (var i = 0; i < n; i++) {
var o = list.get(i);
var info = JU.PT.rep(o[0], "%INDEX%", "" + (++this.peakIndex[0]));
var bs = o[1];
if (bs != null) {
var s = "";
for (var j = bs.nextSetBit(0); j >= 0; j = bs.nextSetBit(j + 1)) s += "," + (j + offset);

var na = bs.cardinality();
nH += na;
info = JU.PT.rep(info, "%ATOMS%", s.substring(1));
info = JU.PT.rep(info, "%S%", (na == 1 ? "" : "s"));
info = JU.PT.rep(info, "%NATOMS%", "" + na);
}JU.Logger.info("adding PeakData " + info);
this.loader.addPeakData(info);
}
this.loader.setSpectrumPeaks(nH, this.peakXLabel, this.peakYLabel);
return n;
}, "JU.Lst,~N");
Clazz_defineMethod(c$, "getStringInfo", 
function(file, title, mytype, model, atoms, htSets, key, list, more){
if ("HNMR".equals(mytype)) mytype = "1HNMR";
 else if ("CNMR".equals(mytype)) mytype = "13CNMR";
var type = (mytype == null ? "" : " type=" + JU.PT.esc(mytype));
if (title == null) title = ("1HNMR".equals(mytype) ? "atom%S%: %ATOMS%; integration: %NATOMS%" : "");
title = " title=" + JU.PT.esc(title);
var stringInfo = "<PeakData " + file + " index=\"%INDEX%\"" + title + type + model + " " + more;
if (atoms != null) stringInfo = JU.PT.rep(stringInfo, "atoms=\"" + atoms + "\"", "atoms=\"%ATOMS%\"");
var o = htSets.get(key);
if (o == null) {
o =  Clazz_newArray(-1, [stringInfo, (atoms == null ? null :  new JU.BS())]);
htSets.put(key, o);
list.addLast(o);
}if (atoms != null) {
var bs = o[1];
atoms = atoms.$replace(',', ' ');
if (atoms.equals("*")) atoms = "0:1000";
bs.or(JU.BS.unescape("({" + atoms + "})"));
}}, "~S,~S,~S,~S,~S,java.util.Map,~S,JU.Lst,~S");
Clazz_defineMethod(c$, "getModelData", 
function(isFirst){
this.baseModel = this.fixModel(this.getAttribute(this.line, "baseModel"), true);
this.lastModel = this.thisModelID;
this.thisModelID = this.fixModel(this.getAttribute(this.line, "id"), false);
this.checkDuplicateModelID();
while (this.line.indexOf(">") < 0 && this.line.indexOf("type") < 0) this.readLine();

var modelType = this.getAttribute(this.line, "type").toLowerCase();
this.vibScale = JU.PT.parseFloat(this.getAttribute(this.line, "vibrationScale"));
if (modelType.equals("xyzvib")) modelType = "xyz";
 else if (modelType.length == 0) modelType = null;
var sb =  new JU.SB();
while (this.readLine() != null && !this.line.contains("</ModelData>")) sb.append(this.line).appendC('\n');

this.loader.processModelData(sb.toString(), this.thisModelID, modelType, this.baseModel, this.lastModel, NaN, this.vibScale, isFirst);
}, "~B");
Clazz_defineMethod(c$, "findRecord", 
function(tag){
if (this.line == null) this.readLine();
if (this.line != null && this.line.indexOf("<" + tag) < 0) this.line = this.loader.discardLinesUntilContains2("<" + tag, "##");
return (this.line != null && this.line.indexOf("<" + tag) >= 0);
}, "~S");
Clazz_defineMethod(c$, "readLine", 
function(){
return this.line = this.loader.rd();
});
Clazz_overrideMethod(c$, "setLine", 
function(s){
this.line = s;
}, "~S");
Clazz_overrideMethod(c$, "getFirstModelWithPeaks", 
function(){
return this.firstModelWithPeaks;
});
});
;//5.0.1-v7 Sat Feb 21 18:17:38 CST 2026
Clazz_declarePackage("J.jsv");
Clazz_load(["J.api.JmolJSpecView"], "J.jsv.JSV", ["java.util.Hashtable", "JU.BS", "$.Lst", "$.PT", "JU.Escape", "$.Logger", "JV.FileManager"], function(){
var c$ = Clazz_decorateAsClass(function(){
this.vwr = null;
Clazz_instantialize(this, arguments);}, J.jsv, "JSV", null, J.api.JmolJSpecView);
Clazz_overrideMethod(c$, "setViewer", 
function(vwr){
this.vwr = vwr;
return this;
}, "JV.Viewer");
Clazz_overrideMethod(c$, "atomPicked", 
function(atomIndex){
if (atomIndex < 0) return;
var peak = this.getPeakAtomRecord(atomIndex);
if (peak != null) this.sendJSpecView(peak + " src=\"JmolAtomSelect\"");
}, "~N");
Clazz_defineMethod(c$, "getPeakAtomRecord", 
function(atomIndex){
var atoms = this.vwr.ms.at;
var iModel = atoms[atomIndex].mi;
var type = null;
switch (atoms[atomIndex].getElementNumber()) {
case 1:
type = "1HNMR";
break;
case 6:
type = "13CNMR";
break;
default:
return null;
}
var peaks = this.vwr.ms.getInfo(iModel, "jdxAtomSelect" + "_" + type);
if (peaks == null) return null;
this.vwr.ms.htPeaks =  new java.util.Hashtable();
var htPeaks = this.vwr.ms.htPeaks;
for (var i = 0; i < peaks.size(); i++) {
var peak = peaks.get(i);
System.out.println("Jmol JSpecView.java peak=" + peak);
var bsPeak = htPeaks.get(peak);
System.out.println("Jmol JSpecView.java bspeak=" + bsPeak);
if (bsPeak == null) {
htPeaks.put(peak, bsPeak =  new JU.BS());
var satoms = JU.PT.getQuotedAttribute(peak, "atoms");
var select = JU.PT.getQuotedAttribute(peak, "select");
System.out.println("Jmol JSpecView.java satoms select " + satoms + " " + select);
var script = "";
if (satoms != null) script += "visible & (atomno=" + JU.PT.rep(satoms, ",", " or atomno=") + ")";
 else if (select != null) script += "visible & (" + select + ")";
System.out.println("Jmol JSpecView.java script : " + script);
bsPeak.or(this.vwr.getAtomBitSet(script));
}System.out.println("Jmol JSpecView bsPeak now : " + bsPeak + " " + atomIndex);
if (bsPeak.get(atomIndex)) return peak;
}
return null;
}, "~N");
Clazz_defineMethod(c$, "sendJSpecView", 
function(peak){
var msg = JU.PT.getQuotedAttribute(peak, "title");
if (msg != null) this.vwr.scriptEcho(JU.Logger.debugging ? peak : msg);
peak = this.vwr.fullName + "JSpecView:" + " " + peak;
JU.Logger.info("Jmol>JSV " + peak);
this.vwr.sm.syncSend(peak, ">", 0);
}, "~S");
Clazz_overrideMethod(c$, "setModel", 
function(modelIndex){
var startJSV = this.vwr.ms.getInfoM("_startJSpecView");
var syncMode = (startJSV === Boolean.TRUE ? 1 : this.vwr.sm.getSyncMode());
if (syncMode != 1) return;
var peak = this.vwr.ms.getInfo(modelIndex, "jdxModelSelect");
if (peak != null) this.sendJSpecView(peak + " src=\"Jmol\"");
}, "~N");
Clazz_overrideMethod(c$, "getBaseModelIndex", 
function(modelIndex){
var baseModel = this.vwr.ms.getInfo(modelIndex, "jdxBaseModel");
if (baseModel != null) for (var i = this.vwr.ms.mc; --i >= 0; ) if (baseModel.equals(this.vwr.ms.getInfo(i, "jdxModelID"))) return i;

return modelIndex;
}, "~N");
Clazz_overrideMethod(c$, "processSync", 
function(script, jsvMode){
if (JU.Logger.debugging) JU.Logger.info("J.jsv.JSV jsvMode=" + jsvMode + " script=" + script);
System.out.println("JSV processSync " + script + " " + jsvMode);
switch (jsvMode) {
case 0:
case 77:
case 28:
case 35:
if (!script.startsWith("JSpecView:")) script = "JSpecView:" + script;
script = this.vwr.fullName + script;
this.vwr.sm.syncSend(script, ">", 0);
return null;
}
switch (jsvMode) {
default:
return null;
case 21:
if (this.vwr.isApplet) return null;
return null;
case 14:
var filename = JU.PT.getQuotedAttribute(script, "file");
var isSimulation = (filename != null && filename.startsWith(JV.FileManager.SIMULATION_PROTOCOL));
var id = (!isSimulation || this.vwr.isApplet ? "" : JU.PT.getQuotedAttribute(filename.$replace('\'', '"'), "id"));
if (isSimulation && !this.vwr.isApplet && (filename.startsWith(JV.FileManager.SIMULATION_PROTOCOL + "C13/MOL=") || filename.startsWith(JV.FileManager.SIMULATION_PROTOCOL + "H1/MOL="))) filename = null;
 else filename = JU.PT.rep(filename, "#molfile", "");
var modelID = (isSimulation ? "molfile" : JU.PT.getQuotedAttribute(script, "model"));
var baseModel = JU.PT.getQuotedAttribute(script, "baseModel");
var atoms = JU.PT.getQuotedAttribute(script, "atoms");
var select = JU.PT.getQuotedAttribute(script, "select");
var script2 = JU.PT.getQuotedAttribute(script, "script");
if (id == null || id.length == 0) id = (modelID == null ? null : (filename == null ? "" : filename + "#") + modelID);
if ("".equals(baseModel)) id += ".baseModel";
var modelIndex = (id == null ? -3 : this.vwr.getModelIndexFromId(id));
if (modelIndex == -2) return null;
if (modelIndex != -1 || filename == null) {
script = "";
} else if (isSimulation && !this.vwr.isApplet) {
return null;
} else {
if (isSimulation) filename += "#molfile";
script = (modelIndex >= 0 ? "" : "load " + JU.PT.esc(filename));
}if (id != null) script += ";model " + JU.PT.esc(id);
if (atoms != null) script += ";select visible & (@" + JU.PT.rep(atoms, ",", " or @") + ")";
 else if (select != null) script += ";select visible & (" + select + ")";
if (script2 != null) script += ";" + script2;
return script;
case 7:
var list = JU.Escape.unescapeStringArray(script.substring(7));
var peaks =  new JU.Lst();
var type = "1HNMR";
for (var i = 0; i < list.length; i++) {
if (i == 0 && list[i].indexOf(JV.FileManager.SIMULATION_PROTOCOL + "C13/") >= 0) type = "13CNMR";
peaks.addLast(list[i]);
}
this.vwr.ms.setInfo(this.vwr.am.cmi, "jdxAtomSelect" + "_" + type, peaks);
return null;
}
}, "~S,~N");
});
;//5.0.1-v7 Sat Feb 21 18:17:38 CST 2026
Clazz_declarePackage("JSV.api");
Clazz_declareInterface(JSV.api, "AnnotationData");
;//5.0.1-v7 Sat Feb 21 18:17:38 CST 2026
Clazz_declarePackage("JSV.api");
Clazz_declareInterface(JSV.api, "AppletFrame");
;//5.0.1-v7 Sat Feb 21 18:17:38 CST 2026
Clazz_declarePackage("JSV.api");
Clazz_declareInterface(JSV.api, "JSVAppInterface", JSV.api.JSVAppletInterface);
;//5.0.1-v7 Sat Feb 21 18:17:38 CST 2026
Clazz_declarePackage("JSV.api");
Clazz_declareInterface(JSV.api, "JSVAppletInterface");
;//5.0.1-v7 Sat Feb 21 18:17:38 CST 2026
Clazz_declarePackage("JSV.api");
Clazz_declareInterface(JSV.api, "JSVFileHelper");
;//5.0.1-v7 Sat Feb 21 18:17:38 CST 2026
Clazz_declarePackage("JSV.api");
Clazz_declareInterface(JSV.api, "JSVMainPanel", JSV.api.JSVViewPanel);
;//5.0.1-v7 Sat Feb 21 18:17:38 CST 2026
Clazz_declarePackage("JSV.api");
Clazz_declareInterface(JSV.api, "JSVPanel", JSV.api.JSVViewPanel);
;//5.0.1-v7 Sat Feb 21 18:17:38 CST 2026
Clazz_declarePackage("JSV.api");
Clazz_declareInterface(JSV.api, "JSVTree");
;//5.0.1-v7 Sat Feb 21 18:17:38 CST 2026
Clazz_declarePackage("JSV.api");
Clazz_declareInterface(JSV.api, "JSVTreeNode");
;//5.0.1-v7 Sat Feb 21 18:17:38 CST 2026
Clazz_declarePackage("JSV.api");
Clazz_declareInterface(JSV.api, "JSVTreePath");
;//5.0.1-v7 Sat Feb 21 18:17:38 CST 2026
Clazz_declarePackage("JSV.api");
Clazz_declareInterface(JSV.api, "JSVViewPanel");
;//5.0.1-v7 Sat Feb 21 18:17:38 CST 2026
Clazz_declarePackage("JSV.api");
Clazz_declareInterface(JSV.api, "JSVZipReader");
;//5.0.1-v7 Sat Feb 21 18:17:38 CST 2026
Clazz_declarePackage("JSV.api");
Clazz_declareInterface(JSV.api, "PanelListener");
;//5.0.1-v7 Sat Feb 21 18:17:38 CST 2026
Clazz_declarePackage("JSV.api");
Clazz_declareInterface(JSV.api, "ScriptInterface");
;//5.0.1-v7 Sat Feb 21 18:17:38 CST 2026
Clazz_declarePackage("JSV.app");
Clazz_load(["JSV.api.JSVAppInterface", "$.PanelListener", "$.ScriptInterface"], "JSV.app.JSVApp", ["JU.Lst", "$.PT", "JSV.common.Coordinate", "$.JSVFileManager", "$.JSVersion", "$.JSViewer", "$.ScriptToken", "JU.Logger"], function(){
var c$ = Clazz_decorateAsClass(function(){
this.appletFrame = null;
this.isNewWindow = false;
this.appletReadyCallbackFunctionName = null;
this.coordCallbackFunctionName = null;
this.loadFileCallbackFunctionName = null;
this.peakCallbackFunctionName = null;
this.syncCallbackFunctionName = null;
this.vwr = null;
this.prevPanel = null;
Clazz_instantialize(this, arguments);}, JSV.app, "JSVApp", null, [JSV.api.PanelListener, JSV.api.JSVAppInterface, JSV.api.ScriptInterface]);
Clazz_makeConstructor(c$, 
function(appletFrame, isJS){
this.appletFrame = appletFrame;
this.vwr =  new JSV.common.JSViewer(this, true, isJS, true);
appletFrame.setDropTargetListener(this.isSigned(), this.vwr);
var path = appletFrame.getDocumentBase();
JSV.common.JSVFileManager.setDocumentBase(this.vwr, path);
this.initParams(appletFrame.getParameter("script"));
}, "JSV.api.AppletFrame,~B");
Clazz_overrideMethod(c$, "isPro", 
function(){
return this.isSigned();
});
Clazz_overrideMethod(c$, "isSigned", 
function(){
{
return true;
}});
Clazz_defineMethod(c$, "getAppletFrame", 
function(){
return this.appletFrame;
});
Clazz_defineMethod(c$, "dispose", 
function(){
try {
this.vwr.dispose();
} catch (e) {
if (Clazz_exceptionOf(e, Exception)){
e.printStackTrace();
} else {
throw e;
}
}
});
Clazz_overrideMethod(c$, "getPropertyAsJavaObject", 
function(key){
return this.vwr.getPropertyAsJavaObject(key);
}, "~S");
Clazz_overrideMethod(c$, "getPropertyAsJSON", 
function(key){
return JU.PT.toJSON(null, this.getPropertyAsJavaObject(key));
}, "~S");
Clazz_overrideMethod(c$, "getCoordinate", 
function(){
return this.vwr.getCoordinate();
});
Clazz_overrideMethod(c$, "loadInline", 
function(data){
this.siOpenDataOrFile(data, "[inline]", null, null, -1, -1, true, null, null);
this.appletFrame.validateContent(3);
}, "~S");
Clazz_overrideMethod(c$, "exportSpectrum", 
function(type, n){
return this.vwr.$export(type, n);
}, "~S,~N");
Clazz_overrideMethod(c$, "setFilePath", 
function(tmpFilePath){
this.runScript("load " + JU.PT.esc(tmpFilePath));
}, "~S");
Clazz_overrideMethod(c$, "setSpectrumNumber", 
function(n){
this.runScript(JSV.common.ScriptToken.SPECTRUMNUMBER + " " + n);
}, "~N");
Clazz_overrideMethod(c$, "reversePlot", 
function(){
this.toggle(JSV.common.ScriptToken.REVERSEPLOT);
});
Clazz_overrideMethod(c$, "toggleGrid", 
function(){
this.toggle(JSV.common.ScriptToken.GRIDON);
});
Clazz_overrideMethod(c$, "toggleCoordinate", 
function(){
this.toggle(JSV.common.ScriptToken.COORDINATESON);
});
Clazz_overrideMethod(c$, "togglePointsOnly", 
function(){
this.toggle(JSV.common.ScriptToken.POINTSONLY);
});
Clazz_overrideMethod(c$, "toggleIntegration", 
function(){
this.toggle(JSV.common.ScriptToken.INTEGRATE);
});
Clazz_defineMethod(c$, "toggle", 
function(st){
if (this.vwr.selectedPanel != null) this.runScript(st + " TOGGLE");
}, "JSV.common.ScriptToken");
Clazz_overrideMethod(c$, "addHighlight", 
function(x1, x2, r, g, b, a){
this.runScript("HIGHLIGHT " + x1 + " " + x2 + " " + r + " " + g + " " + b + " " + a);
}, "~N,~N,~N,~N,~N,~N");
Clazz_overrideMethod(c$, "removeHighlight", 
function(x1, x2){
this.runScript("HIGHLIGHT " + x1 + " " + x2 + " OFF");
}, "~N,~N");
Clazz_overrideMethod(c$, "removeAllHighlights", 
function(){
this.runScript("HIGHLIGHT OFF");
});
Clazz_overrideMethod(c$, "syncScript", 
function(peakScript){
this.vwr.syncScript(peakScript);
}, "~S");
Clazz_overrideMethod(c$, "writeStatus", 
function(msg){
JU.Logger.info(msg);
}, "~S");
Clazz_defineMethod(c$, "initParams", 
function(params){
this.vwr.parseInitScript(params);
this.newAppletPanel();
this.vwr.setPopupMenu(this.vwr.allowMenu, this.vwr.parameters.getBoolean(JSV.common.ScriptToken.ENABLEZOOM));
if (this.vwr.allowMenu) {
this.vwr.closeSource(null);
}this.runScriptNow(params);
}, "~S");
Clazz_defineMethod(c$, "newAppletPanel", 
function(){
JU.Logger.info("newAppletPanel");
this.appletFrame.createMainPanel(this.vwr);
});
Clazz_overrideMethod(c$, "repaint", 
function(){
var applet = (this.vwr == null ? null : this.vwr.html5Applet);
if (JSV.common.JSViewer.jsmolObject == null) {
this.appletFrame.repaint();
} else if (applet != null) {
JSV.common.JSViewer.jsmolObject.repaint(applet, true);
}});
Clazz_defineMethod(c$, "updateJS", 
function(width, height){
}, "~N,~N");
Clazz_overrideMethod(c$, "runScriptNow", 
function(params){
return this.vwr.runScriptNow(params);
}, "~S");
Clazz_defineMethod(c$, "checkCallbacks", 
function(){
if (this.coordCallbackFunctionName == null && this.peakCallbackFunctionName == null) return;
var coord =  new JSV.common.Coordinate();
var actualCoord = (this.peakCallbackFunctionName == null ? null :  new JSV.common.Coordinate());
if (!this.vwr.pd().getPickedCoordinates(coord, actualCoord)) return;
var iSpec = this.vwr.mainPanel.getCurrentPanelIndex();
if (actualCoord == null) this.appletFrame.callToJavaScript(this.coordCallbackFunctionName,  Clazz_newArray(-1, [Double.$valueOf(coord.getXVal()), Double.$valueOf(coord.getYVal()), Integer.$valueOf(iSpec + 1)]));
 else this.appletFrame.callToJavaScript(this.peakCallbackFunctionName,  Clazz_newArray(-1, [Double.$valueOf(coord.getXVal()), Double.$valueOf(coord.getYVal()), Double.$valueOf(actualCoord.getXVal()), Double.$valueOf(actualCoord.getYVal()), Integer.$valueOf(iSpec + 1)]));
});
Clazz_defineMethod(c$, "doAdvanced", 
function(filePath){
}, "~S");
Clazz_overrideMethod(c$, "panelEvent", 
function(eventObj){
if (Clazz_instanceOf(eventObj,"JSV.common.PeakPickEvent")) {
this.vwr.processPeakPickEvent(eventObj, false);
} else if (Clazz_instanceOf(eventObj,"JSV.common.ZoomEvent")) {
} else if (Clazz_instanceOf(eventObj,"JSV.common.SubSpecChangeEvent")) {
}}, "~O");
Clazz_overrideMethod(c$, "getSolnColour", 
function(){
return this.vwr.getSolutionColorStr(true);
});
Clazz_defineMethod(c$, "updateJSView", 
function(msg){
var applet = this.vwr.html5Applet;
var panel = (applet == null ? null : this.vwr.selectedPanel);
{
if (!applet || applet._viewSet == null) return;
}applet._updateView(panel, msg);
}, "~S");
Clazz_overrideMethod(c$, "syncToJmol", 
function(msg){
this.updateJSView(msg);
if (this.syncCallbackFunctionName == null) return;
JU.Logger.info("JSVApp.syncToJmol JSV>Jmol " + msg);
this.appletFrame.callToJavaScript(this.syncCallbackFunctionName,  Clazz_newArray(-1, [this.vwr.fullName, msg]));
}, "~S");
Clazz_overrideMethod(c$, "setVisible", 
function(b){
this.appletFrame.setPanelVisible(b);
}, "~B");
Clazz_overrideMethod(c$, "setCursor", 
function(id){
this.vwr.apiPlatform.setCursor(id, this.appletFrame);
}, "~N");
Clazz_overrideMethod(c$, "runScript", 
function(script){
this.vwr.runScript(script);
}, "~S");
Clazz_overrideMethod(c$, "getScriptQueue", 
function(){
return this.vwr.scriptQueue;
});
Clazz_overrideMethod(c$, "siSetCurrentSource", 
function(source){
this.vwr.currentSource = source;
}, "JSV.source.JDXSource");
Clazz_overrideMethod(c$, "siSendPanelChange", 
function(){
if (this.vwr.selectedPanel === this.prevPanel) return;
this.prevPanel = this.vwr.selectedPanel;
this.vwr.sendPanelChange();
});
Clazz_overrideMethod(c$, "siNewWindow", 
function(isSelected, fromFrame){
this.isNewWindow = isSelected;
if (fromFrame) {
if (this.vwr.jsvpPopupMenu != null) this.vwr.jsvpPopupMenu.setSelected("Window", false);
} else {
this.appletFrame.newWindow(isSelected);
}}, "~B,~B");
Clazz_overrideMethod(c$, "siValidateAndRepaint", 
function(isAll){
var pd = this.vwr.pd();
if (pd != null) pd.setTaintedAll();
this.appletFrame.validate();
this.repaint();
}, "~B");
Clazz_overrideMethod(c$, "siSyncLoad", 
function(filePath){
this.newAppletPanel();
JU.Logger.info("JSVP syncLoad reading " + filePath);
this.siOpenDataOrFile(null, null, null, filePath, -1, -1, false, null, null);
this.appletFrame.validateContent(3);
}, "~S");
Clazz_overrideMethod(c$, "siOpenDataOrFile", 
function(data, name, specs, url, firstSpec, lastSpec, isAppend, script, id){
switch (this.vwr.openDataOrFile(data, name, specs, url, firstSpec, lastSpec, isAppend, id)) {
case 0:
if (script != null) this.runScript(script);
break;
case -1:
return;
default:
this.siSetSelectedPanel(null);
return;
}
JU.Logger.info(this.appletFrame.getAppletInfo() + " File " + this.vwr.currentSource.getFilePath() + " Loaded Successfully");
}, "~O,~S,JU.Lst,~S,~N,~N,~B,~S,~S");
Clazz_overrideMethod(c$, "siProcessCommand", 
function(scriptItem){
this.vwr.runScriptNow(scriptItem);
}, "~S");
Clazz_overrideMethod(c$, "siSetSelectedPanel", 
function(jsvp){
this.vwr.mainPanel.setSelectedPanel(this.vwr, jsvp, this.vwr.panelNodes);
this.vwr.spectraTree.setSelectedPanel(this, jsvp);
if (jsvp == null) {
jsvp = this.appletFrame.getJSVPanel(this.vwr, null);
this.vwr.mainPanel.setSelectedPanel(this.vwr, jsvp, null);
}this.appletFrame.validate();
if (jsvp != null) {
jsvp.setEnabled(true);
jsvp.setFocusable(true);
}}, "JSV.api.JSVPanel");
Clazz_overrideMethod(c$, "siExecSetCallback", 
function(st, value){
switch (st) {
case JSV.common.ScriptToken.APPLETREADYCALLBACKFUNCTIONNAME:
this.appletReadyCallbackFunctionName = value;
break;
case JSV.common.ScriptToken.LOADFILECALLBACKFUNCTIONNAME:
this.loadFileCallbackFunctionName = value;
break;
case JSV.common.ScriptToken.PEAKCALLBACKFUNCTIONNAME:
this.peakCallbackFunctionName = value;
break;
case JSV.common.ScriptToken.SYNCCALLBACKFUNCTIONNAME:
this.syncCallbackFunctionName = value;
break;
case JSV.common.ScriptToken.COORDCALLBACKFUNCTIONNAME:
this.coordCallbackFunctionName = value;
break;
}
}, "JSV.common.ScriptToken,~S");
Clazz_overrideMethod(c$, "siLoaded", 
function(value){
if (this.loadFileCallbackFunctionName != null) this.appletFrame.callToJavaScript(this.loadFileCallbackFunctionName,  Clazz_newArray(-1, [this.vwr.appletName, value]));
this.updateJSView(null);
return null;
}, "~S");
Clazz_overrideMethod(c$, "siExecHidden", 
function(b){
}, "~B");
Clazz_overrideMethod(c$, "siExecScriptComplete", 
function(msg, isOK){
if (!isOK) this.vwr.showMessage(msg);
this.siValidateAndRepaint(false);
}, "~S,~B");
Clazz_overrideMethod(c$, "siUpdateBoolean", 
function(st, TF){
}, "JSV.common.ScriptToken,~B");
Clazz_overrideMethod(c$, "siCheckCallbacks", 
function(title){
this.checkCallbacks();
}, "~S");
Clazz_overrideMethod(c$, "siNodeSet", 
function(panelNode){
this.appletFrame.validateContent(2);
this.siValidateAndRepaint(false);
}, "JSV.common.PanelNode");
Clazz_overrideMethod(c$, "siSourceClosed", 
function(source){
}, "JSV.source.JDXSource");
Clazz_overrideMethod(c$, "siGetNewJSVPanel", 
function(spec){
if (spec == null) {
this.vwr.initialEndIndex = this.vwr.initialStartIndex = -1;
return null;
}var specs =  new JU.Lst();
specs.addLast(spec);
var jsvp = this.appletFrame.getJSVPanel(this.vwr, specs);
jsvp.getPanelData().addListener(this);
this.vwr.parameters.setFor(jsvp, null, true);
return jsvp;
}, "JSV.common.Spectrum");
Clazz_overrideMethod(c$, "siGetNewJSVPanel2", 
function(specs){
if (specs == null) {
this.vwr.initialEndIndex = this.vwr.initialStartIndex = -1;
return this.appletFrame.getJSVPanel(this.vwr, null);
}var jsvp = this.appletFrame.getJSVPanel(this.vwr, specs);
this.vwr.initialEndIndex = this.vwr.initialStartIndex = -1;
jsvp.getPanelData().addListener(this);
this.vwr.parameters.setFor(jsvp, null, true);
return jsvp;
}, "JU.Lst");
Clazz_overrideMethod(c$, "siSetPropertiesFromPreferences", 
function(jsvp, includeMeasures){
this.vwr.checkAutoIntegrate();
}, "JSV.api.JSVPanel,~B");
Clazz_overrideMethod(c$, "siSetLoaded", 
function(fileName, filePath){
}, "~S,~S");
Clazz_overrideMethod(c$, "siSetMenuEnables", 
function(node, isSplit){
}, "JSV.common.PanelNode,~B");
Clazz_overrideMethod(c$, "siUpdateRecentMenus", 
function(filePath){
}, "~S");
Clazz_overrideMethod(c$, "siExecTest", 
function(value){
var data = "";
this.loadInline(data);
}, "~S");
Clazz_overrideMethod(c$, "print", 
function(fileName){
return this.vwr.print(fileName);
}, "~S");
Clazz_overrideMethod(c$, "checkScript", 
function(script){
return this.vwr.checkScript(script);
}, "~S");
c$.getAppletInfo = Clazz_defineMethod(c$, "getAppletInfo", 
function(){
return "JSpecView Applet " + JSV.common.JSVersion.VERSION + "\n\n" + "Authors:\nProf. Robert M. Hanson,\nD. Facey, K. Bryan, C. Walters, Prof. Robert J. Lancashire and\nvolunteer developers through sourceforge.";
});
});
;//5.0.1-v7 Sat Feb 21 18:17:38 CST 2026
Clazz_declarePackage("JSV.app");
Clazz_load(["J.api.GenericMouseInterface"], "JSV.app.GenericMouse", ["JU.Logger"], function(){
var c$ = Clazz_decorateAsClass(function(){
this.pd = null;
this.jsvp = null;
this.xWhenPressed = 0;
this.yWhenPressed = 0;
this.modifiersWhenPressed10 = 0;
this.isMouseDown = false;
this.disposed = false;
Clazz_instantialize(this, arguments);}, JSV.app, "GenericMouse", null, J.api.GenericMouseInterface);
Clazz_makeConstructor(c$, 
function(jsvp){
this.jsvp = jsvp;
this.pd = jsvp.getPanelData();
}, "JSV.api.JSVPanel");
Clazz_overrideMethod(c$, "clear", 
function(){
});
Clazz_overrideMethod(c$, "processEvent", 
function(id, x, y, modifiers, time){
if (this.pd == null) {
if (!this.disposed && id == 501 && (modifiers & 4) != 0) this.jsvp.showMenu(x, y);
return true;
}if (id != 507) modifiers = JSV.app.GenericMouse.applyLeftMouse(modifiers);
switch (id) {
case 507:
this.wheeled(time, x, modifiers | 32);
break;
case 501:
this.xWhenPressed = x;
this.yWhenPressed = y;
this.modifiersWhenPressed10 = modifiers;
this.pressed(time, x, y, modifiers, false);
break;
case 506:
this.dragged(time, x, y, modifiers);
break;
case 504:
this.entered(time, x, y);
break;
case 505:
this.exited(time, x, y);
break;
case 503:
this.moved(time, x, y, modifiers);
break;
case 502:
this.released(time, x, y, modifiers);
if (x == this.xWhenPressed && y == this.yWhenPressed && modifiers == this.modifiersWhenPressed10) {
this.clicked(time, x, y, modifiers, 1);
}break;
default:
return false;
}
return true;
}, "~N,~N,~N,~N,~N");
Clazz_defineMethod(c$, "mouseEntered", 
function(e){
this.entered(e.getWhen(), e.getX(), e.getY());
}, "java.awt.event.MouseEvent");
Clazz_defineMethod(c$, "mouseExited", 
function(e){
this.exited(e.getWhen(), e.getX(), e.getY());
}, "java.awt.event.MouseEvent");
Clazz_defineMethod(c$, "mouseMoved", 
function(e){
this.moved(e.getWhen(), e.getX(), e.getY(), e.getModifiers());
}, "java.awt.event.MouseEvent");
Clazz_defineMethod(c$, "mousePressed", 
function(e){
this.pressed(e.getWhen(), e.getX(), e.getY(), e.getModifiers(), e.isPopupTrigger());
}, "java.awt.event.MouseEvent");
Clazz_defineMethod(c$, "mouseDragged", 
function(e){
var modifiers = e.getModifiers();
if ((modifiers & 28) == 0) modifiers |= 16;
this.dragged(e.getWhen(), e.getX(), e.getY(), modifiers);
}, "java.awt.event.MouseEvent");
Clazz_defineMethod(c$, "mouseReleased", 
function(e){
this.released(e.getWhen(), e.getX(), e.getY(), e.getModifiers());
}, "java.awt.event.MouseEvent");
Clazz_defineMethod(c$, "mouseClicked", 
function(e){
this.clicked(e.getWhen(), e.getX(), e.getY(), e.getModifiers(), e.getClickCount());
}, "java.awt.event.MouseEvent");
Clazz_defineMethod(c$, "mouseWheelMoved", 
function(e){
e.consume();
this.wheeled(e.getWhen(), e.getWheelRotation(), e.getModifiers() | 32);
}, "java.awt.event.MouseWheelEvent");
Clazz_defineMethod(c$, "keyTyped", 
function(ke){
if (this.pd == null) return;
var ch = ke.getKeyChar();
var modifiers = ke.getModifiers();
if (JU.Logger.debuggingHigh || true) JU.Logger.info("MouseManager keyTyped: " + ch + " " + (0 + ch.charCodeAt(0)) + " " + modifiers);
if (this.pd.keyTyped(ch.charCodeAt(0), modifiers)) ke.consume();
}, "java.awt.event.KeyEvent");
Clazz_defineMethod(c$, "keyPressed", 
function(ke){
if (this.pd != null && this.pd.keyPressed(ke.getKeyCode(), ke.getModifiers())) ke.consume();
}, "java.awt.event.KeyEvent");
Clazz_defineMethod(c$, "keyReleased", 
function(ke){
if (this.pd != null) this.pd.keyReleased(ke.getKeyCode());
}, "java.awt.event.KeyEvent");
Clazz_overrideMethod(c$, "processKeyEvent", 
function(event){
var e = event;
switch (e.getID()) {
case 401:
this.keyPressed(e);
break;
case 402:
this.keyReleased(e);
break;
case 400:
this.keyTyped(e);
break;
}
}, "~O");
Clazz_defineMethod(c$, "entered", 
function(time, x, y){
if (this.pd != null) this.pd.mouseEnterExit(time, x, y, false);
}, "~N,~N,~N");
Clazz_defineMethod(c$, "exited", 
function(time, x, y){
if (this.pd != null) this.pd.mouseEnterExit(time, x, y, true);
}, "~N,~N,~N");
Clazz_defineMethod(c$, "clicked", 
function(time, x, y, modifiers, clickCount){
if (this.pd != null) this.pd.mouseAction(2, time, x, y, 1, modifiers);
}, "~N,~N,~N,~N,~N");
Clazz_defineMethod(c$, "moved", 
function(time, x, y, modifiers){
if (this.pd == null) return;
if (this.isMouseDown) this.pd.mouseAction(1, time, x, y, 0, JSV.app.GenericMouse.applyLeftMouse(modifiers));
 else this.pd.mouseAction(0, time, x, y, 0, modifiers & -29);
}, "~N,~N,~N,~N");
Clazz_defineMethod(c$, "wheeled", 
function(time, rotation, modifiers){
if (this.pd != null) this.pd.mouseAction(3, time, 0, rotation, 0, modifiers);
}, "~N,~N,~N");
Clazz_defineMethod(c$, "pressed", 
function(time, x, y, modifiers, isPopupTrigger){
if (this.pd == null) {
if (!this.disposed) this.jsvp.showMenu(x, y);
return;
}this.isMouseDown = true;
this.pd.mouseAction(4, time, x, y, 0, modifiers);
}, "~N,~N,~N,~N,~B");
Clazz_defineMethod(c$, "released", 
function(time, x, y, modifiers){
if (this.pd == null) return;
this.isMouseDown = false;
this.pd.mouseAction(5, time, x, y, 0, modifiers);
}, "~N,~N,~N,~N");
Clazz_defineMethod(c$, "dragged", 
function(time, x, y, modifiers){
if (this.pd == null) return;
if ((modifiers & 20) == 20) modifiers = modifiers & -5 | 2;
this.pd.mouseAction(1, time, x, y, 0, modifiers);
}, "~N,~N,~N,~N");
c$.applyLeftMouse = Clazz_defineMethod(c$, "applyLeftMouse", 
function(modifiers){
return ((modifiers & 28) == 0) ? (modifiers | 16) : modifiers;
}, "~N");
Clazz_overrideMethod(c$, "processTwoPointGesture", 
function(touches){
}, "~A");
Clazz_overrideMethod(c$, "dispose", 
function(){
this.pd = null;
this.jsvp = null;
this.disposed = true;
});
});
;//5.0.1-v7 Sat Feb 21 18:17:38 CST 2026
Clazz_declarePackage("JSV.appletjs");
Clazz_load(["javajs.api.JSInterface", "JSV.api.AppletFrame", "$.JSVAppletInterface"], "JSV.appletjs.JSVApplet", ["java.net.URL", "java.util.Hashtable", "JU.PT", "JSV.app.JSVApp", "JSV.js2d.JsMainPanel", "$.JsPanel", "JU.Logger"], function(){
var c$ = Clazz_decorateAsClass(function(){
this.app = null;
this.viewer = null;
this.isStandalone = false;
this.viewerOptions = null;
this.htParams = null;
Clazz_instantialize(this, arguments);}, JSV.appletjs, "JSVApplet", null, [JSV.api.JSVAppletInterface, JSV.api.AppletFrame, javajs.api.JSInterface]);
Clazz_makeConstructor(c$, 
function(viewerOptions){
if (viewerOptions == null) viewerOptions =  new java.util.Hashtable();
this.viewerOptions = viewerOptions;
this.htParams =  new java.util.Hashtable();
for (var entry, $entry = viewerOptions.entrySet().iterator (); $entry.hasNext()&& ((entry = $entry.next ()) || true);) this.htParams.put(entry.getKey().toLowerCase(), entry.getValue());

this.init();
}, "java.util.Map");
Clazz_defineMethod(c$, "init", 
function(){
this.app =  new JSV.app.JSVApp(this, true);
this.initViewer();
if (this.app.appletReadyCallbackFunctionName != null && this.viewer.fullName != null) this.callToJavaScript(this.app.appletReadyCallbackFunctionName,  Clazz_newArray(-1, [this.viewer.appletName, this.viewer.fullName, Boolean.TRUE, this]));
});
Clazz_defineMethod(c$, "initViewer", 
function(){
this.viewer = this.app.vwr;
this.setLogging();
this.viewerOptions.remove("debug");
var o = this.viewerOptions.get("display");
{
o = document.getElementById(o);
}this.viewer.setDisplay(o);
JU.Logger.info(this.getAppletInfo());
});
Clazz_defineMethod(c$, "setLogging", 
function(){
var iLevel = ((this.getValue("logLevel", (this.getBooleanValue("debug", false) ? "5" : "4"))).charAt(0)).charCodeAt(0) - 48;
if (iLevel != 4) System.out.println("setting logLevel=" + iLevel + " -- To change, use script \"set logLevel [0-5]\"");
JU.Logger.setLogLevel(iLevel);
});
Clazz_defineMethod(c$, "getParameter", 
function(paramName){
var o = this.htParams.get(paramName.toLowerCase());
return (o == null ? null : o.toString());
}, "~S");
Clazz_defineMethod(c$, "getBooleanValue", 
function(propertyName, defaultValue){
var value = this.getValue(propertyName, defaultValue ? "true" : "");
return (value.equalsIgnoreCase("true") || value.equalsIgnoreCase("on") || value.equalsIgnoreCase("yes"));
}, "~S,~B");
Clazz_defineMethod(c$, "getValue", 
function(propertyName, defaultValue){
var stringValue = this.getParameter(propertyName);
System.out.println("getValue " + propertyName + " = " + stringValue);
if (stringValue != null) return stringValue;
return defaultValue;
}, "~S,~S");
Clazz_overrideMethod(c$, "isPro", 
function(){
return this.app.isPro();
});
Clazz_overrideMethod(c$, "isSigned", 
function(){
return this.app.isSigned();
});
Clazz_overrideMethod(c$, "destroy", 
function(){
this.app.dispose();
this.app = null;
});
Clazz_defineMethod(c$, "getParameter", 
function(key, def){
return this.isStandalone ? System.getProperty(key, def) : (this.getParameter(key) != null ? this.getParameter(key) : def);
}, "~S,~S");
Clazz_overrideMethod(c$, "getAppletInfo", 
function(){
return JSV.app.JSVApp.getAppletInfo();
});
Clazz_overrideMethod(c$, "getSolnColour", 
function(){
return this.app.getSolnColour();
});
Clazz_overrideMethod(c$, "getCoordinate", 
function(){
return this.app.getCoordinate();
});
Clazz_overrideMethod(c$, "loadInline", 
function(data){
this.app.loadInline(data);
}, "~S");
Clazz_defineMethod(c$, "$export", 
function(type, n){
return this.app.exportSpectrum(type, n);
}, "~S,~N");
Clazz_overrideMethod(c$, "exportSpectrum", 
function(type, n){
return this.app.exportSpectrum(type, n);
}, "~S,~N");
Clazz_overrideMethod(c$, "setFilePath", 
function(tmpFilePath){
this.app.setFilePath(tmpFilePath);
}, "~S");
Clazz_overrideMethod(c$, "setSpectrumNumber", 
function(i){
this.app.setSpectrumNumber(i);
}, "~N");
Clazz_overrideMethod(c$, "toggleGrid", 
function(){
this.app.toggleGrid();
});
Clazz_overrideMethod(c$, "toggleCoordinate", 
function(){
this.app.toggleCoordinate();
});
Clazz_overrideMethod(c$, "togglePointsOnly", 
function(){
this.app.togglePointsOnly();
});
Clazz_overrideMethod(c$, "toggleIntegration", 
function(){
this.app.toggleIntegration();
});
Clazz_overrideMethod(c$, "addHighlight", 
function(x1, x2, r, g, b, a){
this.app.addHighlight(x1, x2, r, g, b, a);
}, "~N,~N,~N,~N,~N,~N");
Clazz_overrideMethod(c$, "removeAllHighlights", 
function(){
this.app.removeAllHighlights();
});
Clazz_overrideMethod(c$, "removeHighlight", 
function(x1, x2){
this.app.removeHighlight(x1, x2);
}, "~N,~N");
Clazz_overrideMethod(c$, "reversePlot", 
function(){
this.app.reversePlot();
});
Clazz_defineMethod(c$, "script", 
function(script){
this.app.initParams(script);
}, "~S");
Clazz_overrideMethod(c$, "runScript", 
function(script){
this.app.runScript(script);
}, "~S");
Clazz_overrideMethod(c$, "syncScript", 
function(peakScript){
this.app.syncScript(peakScript);
}, "~S");
Clazz_overrideMethod(c$, "writeStatus", 
function(msg){
this.app.writeStatus(msg);
}, "~S");
Clazz_overrideMethod(c$, "getPropertyAsJavaObject", 
function(key){
return this.app.getPropertyAsJavaObject(key);
}, "~S");
Clazz_overrideMethod(c$, "getPropertyAsJSON", 
function(key){
return this.app.getPropertyAsJSON(key);
}, "~S");
Clazz_overrideMethod(c$, "runScriptNow", 
function(script){
return this.app.runScriptNow(script);
}, "~S");
Clazz_overrideMethod(c$, "print", 
function(fileName){
return this.app.print(fileName);
}, "~S");
Clazz_overrideMethod(c$, "setDropTargetListener", 
function(isSigned, viewer){
}, "~B,JSV.common.JSViewer");
Clazz_overrideMethod(c$, "validateContent", 
function(mode){
}, "~N");
Clazz_overrideMethod(c$, "createMainPanel", 
function(viewer){
viewer.mainPanel =  new JSV.js2d.JsMainPanel();
}, "JSV.common.JSViewer");
Clazz_overrideMethod(c$, "newWindow", 
function(isSelected){
}, "~B");
Clazz_overrideMethod(c$, "callToJavaScript", 
function(callback, data){
var tokens = JU.PT.split(callback, ".");
{
try{
var o = window[tokens[0]]
for (var i = 1; i < tokens.length; i++){
o = o[tokens[i]]
}
return o(data[0],data[1],data[2],data[3],data[4],data[5],data[6],data[7],data[8],data[9]);
} catch (e) {
System.out.println(callback + " failed " + e);
}
}}, "~S,~A");
Clazz_overrideMethod(c$, "setPanelVisible", 
function(b){
}, "~B");
Clazz_overrideMethod(c$, "getJSVPanel", 
function(viewer, specs){
return (specs == null ? JSV.js2d.JsPanel.getEmptyPanel(viewer) : JSV.js2d.JsPanel.getPanelMany(viewer, specs));
}, "JSV.common.JSViewer,JU.Lst");
Clazz_overrideMethod(c$, "getDocumentBase", 
function(){
try {
return  new java.net.URL(Clazz_castNullAs("java.net.URL"), this.viewerOptions.get("documentBase"), null);
} catch (e) {
if (Clazz_exceptionOf(e,"java.net.MalformedURLException")){
return null;
} else {
throw e;
}
}
});
Clazz_overrideMethod(c$, "repaint", 
function(){
});
Clazz_overrideMethod(c$, "validate", 
function(){
});
Clazz_overrideMethod(c$, "doExitJmol", 
function(){
});
Clazz_overrideMethod(c$, "getApp", 
function(){
return this.app;
});
Clazz_overrideMethod(c$, "setStatusDragDropped", 
function(mode, x, y, fileName, retType){
return true;
}, "~N,~N,~N,~S,~A");
Clazz_overrideMethod(c$, "cacheFileByName", 
function(fileName, isAdd){
return 0;
}, "~S,~B");
Clazz_overrideMethod(c$, "cachePut", 
function(key, data){
}, "~S,~O");
Clazz_overrideMethod(c$, "getFullName", 
function(){
return this.app.vwr.fullName;
});
Clazz_overrideMethod(c$, "processMouseEvent", 
function(id, x, y, modifiers, time){
return this.app.vwr.processMouseEvent(id, x, y, modifiers, time);
}, "~N,~N,~N,~N,~N");
Clazz_overrideMethod(c$, "setDisplay", 
function(canvas){
this.app.vwr.setDisplay(canvas);
}, "~O");
Clazz_overrideMethod(c$, "startHoverWatcher", 
function(enable){
}, "~B");
Clazz_overrideMethod(c$, "update", 
function(){
this.app.vwr.updateJS();
});
Clazz_defineMethod(c$, "openFile", 
function(fileName){
this.app.vwr.openFile(fileName, true);
return null;
}, "~S");
Clazz_overrideMethod(c$, "openFileAsyncSpecial", 
function(fileName, flags){
this.app.vwr.openFileAsyncSpecial(fileName, flags);
}, "~S,~N");
Clazz_overrideMethod(c$, "openFileAsyncSpecialType", 
function(fileName, flags, type){
this.openFileAsyncSpecial(fileName, flags);
}, "~S,~N,~S");
Clazz_overrideMethod(c$, "processTwoPointGesture", 
function(touches){
this.app.vwr.processTwoPointGesture(touches);
}, "~A");
Clazz_overrideMethod(c$, "setScreenDimension", 
function(width, height){
this.app.vwr.setScreenDimension(width, height);
}, "~N,~N");
Clazz_overrideMethod(c$, "checkScript", 
function(script){
var s = this.app.checkScript(script);
if (s != null) System.out.println(s);
return s;
}, "~S");
Clazz_overrideMethod(c$, "processKeyEvent", 
function(event){
}, "~O");
});
;//5.0.1-v7 Sat Feb 21 18:17:38 CST 2026
Clazz_declarePackage("JSV.common");
Clazz_load(["java.lang.Enum", "JSV.common.Coordinate"], "JSV.common.Annotation", ["JU.CU"], function(){
var c$ = Clazz_decorateAsClass(function(){
this.text = "";
this.$isPixels = false;
this.is2D = false;
this.offsetX = 0;
this.offsetY = 0;
this.spec = null;
Clazz_instantialize(this, arguments);}, JSV.common, "Annotation", JSV.common.Coordinate);
Clazz_defineMethod(c$, "setA", 
function(x, y, spec, text, isPixels, is2D, offsetX, offsetY){
this.set(x, y);
this.spec = spec;
this.text = text;
this.$isPixels = isPixels;
this.is2D = is2D;
this.offsetX = offsetX;
this.offsetY = offsetY;
return this;
}, "~N,~N,JSV.common.Spectrum,~S,~B,~B,~N,~N");
Clazz_defineMethod(c$, "setSpec", 
function(spec){
this.spec = spec;
return this;
}, "JSV.common.Spectrum");
Clazz_defineMethod(c$, "addSpecShift", 
function(dx){
this.setXVal(this.getXVal() + dx);
}, "~N");
Clazz_defineMethod(c$, "isPixels", 
function(){
return this.$isPixels;
});
Clazz_overrideMethod(c$, "toString", 
function(){
return "[" + this.getXVal() + ", " + this.getYVal() + "," + this.text + "]";
});
c$.getColoredAnnotation = Clazz_defineMethod(c$, "getColoredAnnotation", 
function(g2d, spec, args, lastAnnotation){
var arg;
var xPt = 0;
var yPt = 1;
var colorPt = 2;
var textPt = 3;
var nArgs = args.size();
try {
switch (nArgs) {
default:
return null;
case 1:
arg = args.get(0);
xPt = yPt = -1;
if (arg.charAt(0) == '\"') {
textPt = 0;
colorPt = -1;
} else {
colorPt = 0;
textPt = -1;
}break;
case 2:
xPt = yPt = -1;
arg = args.get(0);
if (arg.charAt(0) == '\"') {
textPt = 0;
colorPt = 1;
} else {
colorPt = 0;
textPt = 1;
}break;
case 3:
case 4:
arg = args.get(2);
if (arg.charAt(0) == '\"') {
textPt = 2;
colorPt = (nArgs == 4 ? 3 : -1);
} else {
colorPt = 2;
textPt = (nArgs == 4 ? 3 : -1);
}arg = args.get(2);
if (arg.charAt(0) == '\"') {
textPt = 2;
colorPt = -1;
} else {
colorPt = 2;
textPt = -1;
}}
if (lastAnnotation == null && (xPt < 0 || yPt < 0 || textPt < 0 || colorPt < 0)) return null;
var x = (xPt < 0 ? lastAnnotation.getXVal() : Double.$valueOf(args.get(xPt)).doubleValue());
var y = (yPt < 0 ? lastAnnotation.getYVal() : Double.$valueOf(args.get(yPt)).doubleValue());
var color = (colorPt < 0 ? (lastAnnotation).getColor() : g2d.getColor1(JU.CU.getArgbFromString(args.get(colorPt))));
var text;
if (textPt < 0) {
text = lastAnnotation.text;
} else {
text = args.get(textPt);
if (text.charAt(0) == '\"') text = text.substring(1, text.length - 1);
}return  new JSV.common.ColoredAnnotation().setCA(x, y, spec, text, color, false, false, 0, 0);
} catch (e) {
if (Clazz_exceptionOf(e, Exception)){
return null;
} else {
throw e;
}
}
}, "J.api.GenericGraphics,JSV.common.Spectrum,JU.Lst,JSV.common.Annotation");
})();
});
;//5.0.1-v7 Sat Feb 21 18:17:38 CST 2026
Clazz_declarePackage("JSV.common");
Clazz_load(["JSV.common.Annotation"], "JSV.common.ColoredAnnotation", null, function(){
var c$ = Clazz_decorateAsClass(function(){
this.color = null;
Clazz_instantialize(this, arguments);}, JSV.common, "ColoredAnnotation", JSV.common.Annotation);
Clazz_makeConstructor(c$, 
function(){
Clazz_superConstructor (this, JSV.common.ColoredAnnotation, []);
});
Clazz_defineMethod(c$, "getColor", 
function(){
return this.color;
});
Clazz_defineMethod(c$, "setCA", 
function(x, y, spec, text, color, isPixels, is2D, offsetX, offsetY){
this.setA(x, y, spec, text, isPixels, is2D, offsetX, offsetY);
this.color = color;
return this;
}, "~N,~N,JSV.common.Spectrum,~S,javajs.api.GenericColor,~B,~B,~N,~N");
});
;//5.0.1-v7 Sat Feb 21 18:17:38 CST 2026
Clazz_declarePackage("JSV.common");
Clazz_load(["JSV.common.Parameters"], "JSV.common.ColorParameters", ["java.util.Hashtable", "$.StringTokenizer", "JU.CU", "$.Lst", "JSV.common.ScriptToken"], function(){
var c$ = Clazz_decorateAsClass(function(){
this.titleFontName = null;
this.displayFontName = null;
this.elementColors = null;
this.plotColors = null;
this.isDefault = false;
Clazz_instantialize(this, arguments);}, JSV.common, "ColorParameters", JSV.common.Parameters);
Clazz_makeConstructor(c$, 
function(){
Clazz_superConstructor (this, JSV.common.ColorParameters, []);
JSV.common.ColorParameters.BLACK = this.getColor3(0, 0, 0);
JSV.common.ColorParameters.RED = this.getColor3(255, 0, 0);
JSV.common.ColorParameters.LIGHT_GRAY = this.getColor3(200, 200, 200);
JSV.common.ColorParameters.DARK_GRAY = this.getColor3(80, 80, 80);
JSV.common.ColorParameters.BLUE = this.getColor3(0, 0, 255);
JSV.common.ColorParameters.WHITE = this.getColor3(255, 255, 255);
this.elementColors =  new java.util.Hashtable();
this.setColor(JSV.common.ScriptToken.TITLECOLOR, JSV.common.ColorParameters.BLACK);
this.setColor(JSV.common.ScriptToken.UNITSCOLOR, JSV.common.ColorParameters.RED);
this.setColor(JSV.common.ScriptToken.SCALECOLOR, JSV.common.ColorParameters.BLACK);
this.setColor(JSV.common.ScriptToken.COORDINATESCOLOR, JSV.common.ColorParameters.RED);
this.setColor(JSV.common.ScriptToken.GRIDCOLOR, JSV.common.ColorParameters.LIGHT_GRAY);
this.setColor(JSV.common.ScriptToken.PLOTCOLOR, JSV.common.ColorParameters.BLUE);
this.setColor(JSV.common.ScriptToken.PLOTAREACOLOR, JSV.common.ColorParameters.WHITE);
this.setColor(JSV.common.ScriptToken.BACKGROUNDCOLOR, this.getColor3(192, 192, 192));
this.setColor(JSV.common.ScriptToken.INTEGRALPLOTCOLOR, JSV.common.ColorParameters.RED);
this.setColor(JSV.common.ScriptToken.PEAKTABCOLOR, JSV.common.ColorParameters.RED);
this.setColor(JSV.common.ScriptToken.PEAKOVERCOLOR, JSV.common.ColorParameters.RED);
this.setColor(JSV.common.ScriptToken.HIGHLIGHTCOLOR, JSV.common.ColorParameters.DARK_GRAY);
for (var i = 0; i < 8; i++) JSV.common.ColorParameters.defaultPlotColors[i] = this.getColorFromString(JSV.common.ColorParameters.defaultPlotColorNames[i]);

this.plotColors =  new Array(8);
System.arraycopy(JSV.common.ColorParameters.defaultPlotColors, 0, this.plotColors, 0, 8);
});
Clazz_defineMethod(c$, "setFor", 
function(jsvp, ds, includeMeasures){
if (ds == null) ds = this;
if (includeMeasures) jsvp.getPanelData().setBooleans(ds, null);
var pd = jsvp.getPanelData();
if (pd.getCurrentPlotColor(1) != null) pd.setPlotColors(this.plotColors);
pd.setColorOrFont(ds, null);
}, "JSV.api.JSVPanel,JSV.common.ColorParameters,~B");
Clazz_defineMethod(c$, "set", 
function(pd, st, value){
var param = null;
switch (st) {
default:
this.setP(pd, st, value);
return;
case JSV.common.ScriptToken.PLOTCOLORS:
if (pd == null) this.getPlotColors(value);
 else pd.setPlotColors(this.getPlotColors(value));
return;
case JSV.common.ScriptToken.BACKGROUNDCOLOR:
case JSV.common.ScriptToken.COORDINATESCOLOR:
case JSV.common.ScriptToken.GRIDCOLOR:
case JSV.common.ScriptToken.HIGHLIGHTCOLOR:
case JSV.common.ScriptToken.INTEGRALPLOTCOLOR:
case JSV.common.ScriptToken.PEAKOVERCOLOR:
case JSV.common.ScriptToken.PEAKTABCOLOR:
case JSV.common.ScriptToken.PLOTAREACOLOR:
case JSV.common.ScriptToken.PLOTCOLOR:
case JSV.common.ScriptToken.SCALECOLOR:
case JSV.common.ScriptToken.TITLECOLOR:
case JSV.common.ScriptToken.UNITSCOLOR:
param = this.setColorFromString(st, value);
break;
case JSV.common.ScriptToken.TITLEFONTNAME:
case JSV.common.ScriptToken.DISPLAYFONTNAME:
param = this.getFontName(st, value);
break;
}
if (pd == null) return;
if (param != null) pd.setColorOrFont(this, st);
}, "JSV.common.PanelData,JSV.common.ScriptToken,~S");
Clazz_defineMethod(c$, "getElementColor", 
function(st){
return this.elementColors.get(st);
}, "JSV.common.ScriptToken");
Clazz_defineMethod(c$, "setColor", 
function(st, color){
if (color != null) this.elementColors.put(st, color);
return color;
}, "JSV.common.ScriptToken,javajs.api.GenericColor");
Clazz_defineMethod(c$, "copy", 
function(){
return this.copy(this.name);
});
Clazz_defineMethod(c$, "setElementColors", 
function(p){
this.displayFontName = p.displayFontName;
for (var entry, $entry = p.elementColors.entrySet().iterator (); $entry.hasNext()&& ((entry = $entry.next ()) || true);) this.setColor(entry.getKey(), entry.getValue());

return this;
}, "JSV.common.ColorParameters");
Clazz_defineMethod(c$, "getColorFromString", 
function(name){
return this.getColor1(JU.CU.getArgbFromString(name));
}, "~S");
Clazz_defineMethod(c$, "getPlotColors", 
function(plotColorsStr){
if (plotColorsStr == null) {
this.plotColors[0] = this.getElementColor(JSV.common.ScriptToken.PLOTCOLOR);
return this.plotColors;
}var st =  new java.util.StringTokenizer(plotColorsStr, ",;.- ");
var colors =  new JU.Lst();
try {
while (st.hasMoreTokens()) colors.addLast(this.getColorFromString(st.nextToken()));

} catch (e) {
if (Clazz_exceptionOf(e, Exception)){
return null;
} else {
throw e;
}
}
return colors.toArray( new Array(colors.size()));
}, "~S");
Clazz_defineMethod(c$, "setColorFromString", 
function(st, value){
return this.setColor(st, this.getColorFromString(value));
}, "JSV.common.ScriptToken,~S");
Clazz_defineMethod(c$, "getFontName", 
function(st, value){
var isValid = this.isValidFontName(value);
switch (st) {
case JSV.common.ScriptToken.TITLEFONTNAME:
return (isValid ? this.titleFontName = value : this.titleFontName);
case JSV.common.ScriptToken.DISPLAYFONTNAME:
return (isValid ? this.displayFontName = value : this.displayFontName);
}
return null;
}, "JSV.common.ScriptToken,~S");
c$.BLACK = null;
c$.RED = null;
c$.LIGHT_GRAY = null;
c$.DARK_GRAY = null;
c$.BLUE = null;
c$.WHITE = null;
c$.defaultPlotColors =  new Array(8);
c$.defaultPlotColorNames =  Clazz_newArray(-1, ["black", "darkGreen", "darkred", "orange", "magenta", "cyan", "maroon", "darkGray"]);
});
;//5.0.1-v7 Sat Feb 21 18:17:38 CST 2026
Clazz_declarePackage("JSV.common");
(function(){
var c$ = Clazz_declareType(JSV.common, "CoordComparator", null, java.util.Comparator);
Clazz_overrideMethod(c$, "compare", 
function(c1, c2){
return (c1.getXVal() > c2.getXVal() ? 1 : c1.getXVal() < c2.getXVal() ? -1 : 0);
}, "JSV.common.Coordinate,JSV.common.Coordinate");
})();
;//5.0.1-v7 Sat Feb 21 18:17:38 CST 2026
Clazz_declarePackage("JSV.common");
Clazz_load(["JSV.common.CoordComparator"], "JSV.common.Coordinate", ["java.util.Arrays", "$.StringTokenizer", "JU.Lst"], function(){
var c$ = Clazz_decorateAsClass(function(){
this.xVal = 0;
this.yVal = 0;
Clazz_instantialize(this, arguments);}, JSV.common, "Coordinate", null);
;(function(){
var c$ = Clazz_decorateAsClass(function(){
Clazz_prepareCallback(this, arguments);
this.x1 = 0;
this.x2 = 0;
this.color = null;
this.spectrum = null;
Clazz_instantialize(this, arguments);}, JSV.common.GraphSet, "Highlight", null);
Clazz_makeConstructor(c$, 
function(x1, x2, spec, color){
this.x1 = x1;
this.x2 = x2;
this.color = color;
this.spectrum = spec;
}, "~N,~N,JSV.common.Spectrum,javajs.api.GenericColor");
Clazz_overrideMethod(c$, "toString", 
function(){
return "highlight " + this.x1 + " " + this.x2 + " " + this.spectrum;
});
Clazz_overrideMethod(c$, "equals", 
function(obj){
if (!(Clazz_instanceOf(obj,"JSV.common.GraphSet.Highlight"))) return false;
var hl = obj;
return ((hl.x1 == this.x1) && (hl.x2 == this.x2));
}, "~O");
Clazz_overrideMethod(c$, "hashCode", 
function(){
return Clazz_doubleToInt(this.x1 * 1000 + this.x2 * 1000000);
});
;(function(){
var c$ = Clazz_declareType(JSV.common.IntegralData, "IntMode", Enum);
c$.getMode = Clazz_defineMethod(c$, "getMode", 
function(value){
for (var mode, $mode = 0, $$mode = JSV.common.IntegralData.IntMode.values(); $mode < $$mode.length && ((mode = $$mode[$mode]) || true); $mode++) if (value.startsWith(mode.name())) return mode;

return JSV.common.IntegralData.IntMode.NA;
}, "~S");
Clazz_defineEnumConstant(c$, "OFF", 0, []);
Clazz_defineEnumConstant(c$, "ON", 1, []);
Clazz_defineEnumConstant(c$, "TOGGLE", 2, []);
Clazz_defineEnumConstant(c$, "AUTO", 3, []);
Clazz_defineEnumConstant(c$, "LIST", 4, []);
Clazz_defineEnumConstant(c$, "MARK", 5, []);
Clazz_defineEnumConstant(c$, "MIN", 6, []);
Clazz_defineEnumConstant(c$, "UPDATE", 7, []);
Clazz_defineEnumConstant(c$, "CLEAR", 8, []);
Clazz_defineEnumConstant(c$, "NA", 9, []);
;(function(){
var c$ = Clazz_declareType(JSV.common.Spectrum, "IRMode", Enum);
c$.getMode = Clazz_defineMethod(c$, "getMode", 
function(value){
switch ((value == null ? 'I' : value.toUpperCase().charAt(0)).charCodeAt(0)) {
case 65:
return JSV.common.Spectrum.IRMode.TO_ABS;
case 84:
return (value.equalsIgnoreCase("TOGGLE") ? JSV.common.Spectrum.IRMode.TOGGLE : JSV.common.Spectrum.IRMode.TO_TRANS);
case 78:
return JSV.common.Spectrum.IRMode.NO_CONVERT;
default:
return JSV.common.Spectrum.IRMode.TOGGLE;
}
}, "~S");
Clazz_defineEnumConstant(c$, "NO_CONVERT", 0, []);
Clazz_defineEnumConstant(c$, "TO_TRANS", 1, []);
Clazz_defineEnumConstant(c$, "TO_ABS", 2, []);
Clazz_defineEnumConstant(c$, "TOGGLE", 3, []);
;(function(){
var c$ = Clazz_declareType(JSV.common.PanelData, "LinkMode", Enum);
c$.getMode = Clazz_defineMethod(c$, "getMode", 
function(abc){
if (abc.equals("*")) return JSV.common.PanelData.LinkMode.ALL;
for (var mode, $mode = 0, $$mode = JSV.common.PanelData.LinkMode.values(); $mode < $$mode.length && ((mode = $$mode[$mode]) || true); $mode++) if (mode.name().equalsIgnoreCase(abc)) return mode;

return JSV.common.PanelData.LinkMode.NONE;
}, "~S");
Clazz_defineEnumConstant(c$, "ALL", 0, []);
Clazz_defineEnumConstant(c$, "NONE", 1, []);
Clazz_defineEnumConstant(c$, "AB", 2, []);
Clazz_defineEnumConstant(c$, "ABC", 3, []);
;(function(){
var c$ = Clazz_declareType(JSV.common.PanelData, "Mouse", Enum);
Clazz_defineEnumConstant(c$, "UP", 0, []);
Clazz_defineEnumConstant(c$, "DOWN", 1, []);
Clazz_makeConstructor(c$, 
function(s){
if (s == null) return;
this.stringInfo = s;
this.type = JU.PT.getQuotedAttribute(s, "type");
if (this.type == null) this.type = "";
this.type = this.type.toUpperCase();
var pt = this.type.indexOf('/');
this.type2 = (pt < 0 ? "" : JSV.common.PeakInfo.fixType(this.type.substring(this.type.indexOf('/') + 1)));
if (pt >= 0) this.type = JSV.common.PeakInfo.fixType(this.type.substring(0, pt)) + "/" + this.type2;
 else this.type = JSV.common.PeakInfo.fixType(this.type);
this.id = JU.PT.getQuotedAttribute(s, "id");
this.index = JU.PT.getQuotedAttribute(s, "index");
this.file = JU.PT.getQuotedAttribute(s, "file");
System.out.println("PeakInfo file=" + this.file);
this.filePathForwardSlash = (this.file == null ? null : this.file.$replace('\\', '/'));
this.model = JU.PT.getQuotedAttribute(s, "model");
var isBaseModel = s.contains("baseModel=\"\"");
if (!isBaseModel) this.atoms = JU.PT.getQuotedAttribute(s, "atoms");
this.atomKey = "," + this.atoms + ",";
this.title = JU.PT.getQuotedAttribute(s, "title");
this._match = JU.PT.getQuotedAttribute(s, "_match");
this.xMax = JU.PT.parseFloat(JU.PT.getQuotedAttribute(s, "xMax"));
this.xMin = JU.PT.parseFloat(JU.PT.getQuotedAttribute(s, "xMin"));
this.yMax = JU.PT.parseFloat(JU.PT.getQuotedAttribute(s, "yMax"));
this.yMin = JU.PT.parseFloat(JU.PT.getQuotedAttribute(s, "yMin"));
}, "~S");
Clazz_defineMethod(c$, "isClearAll", 
function(){
return (this.spectrum == null);
});
Clazz_defineMethod(c$, "getType", 
function(){
return this.type;
});
Clazz_defineMethod(c$, "getAtoms", 
function(){
return this.atoms;
});
Clazz_defineMethod(c$, "getXMax", 
function(){
return this.xMax;
});
Clazz_defineMethod(c$, "getXMin", 
function(){
return this.xMin;
});
Clazz_defineMethod(c$, "getYMin", 
function(){
return this.yMin;
});
Clazz_defineMethod(c$, "getYMax", 
function(){
return this.yMax;
});
Clazz_defineMethod(c$, "getX", 
function(){
return (this.xMax + this.xMin) / 2;
});
Clazz_defineMethod(c$, "getMatch", 
function(){
return this._match;
});
c$.fixType = Clazz_defineMethod(c$, "fixType", 
function(type){
return (type.equals("HNMR") ? "1HNMR" : type.equals("CNMR") ? "13CNMR" : type);
}, "~S");
Clazz_overrideMethod(c$, "toString", 
function(){
return this.stringInfo;
});
Clazz_defineMethod(c$, "getIndex", 
function(){
return this.index;
});
Clazz_defineMethod(c$, "getTitle", 
function(){
return this.title;
});
Clazz_defineMethod(c$, "checkFileIndex", 
function(filePath, sIndex, sAtomKey){
return (sAtomKey != null ? this.atomKey.indexOf(sAtomKey) >= 0 : sIndex.equals(this.index) && (filePath.equals(this.file) || filePath.equals(this.filePathForwardSlash)));
}, "~S,~S,~S");
Clazz_defineMethod(c$, "checkFileTypeModel", 
function(filePath, type, model){
return filePath.equals(this.file) && this.checkModel(model) && this.type.endsWith(type);
}, "~S,~S,~S");
Clazz_defineMethod(c$, "checkTypeModel", 
function(type, model){
return this.checkType(type) && this.checkModel(model);
}, "~S,~S");
Clazz_defineMethod(c$, "checkModel", 
function(model){
return (model != null && model.equals(this.model));
}, "~S");
Clazz_defineMethod(c$, "checkType", 
function(type){
return (type.endsWith(this.type));
}, "~S");
Clazz_defineMethod(c$, "checkTypeMatch", 
function(pi){
return (this.checkType(pi.type) && (this.checkId(pi._match) || this.checkModel(pi._match) || this.title.toUpperCase().indexOf(pi._match) >= 0));
}, "JSV.common.PeakInfo");
Clazz_defineMethod(c$, "checkId", 
function(match){
if (match == null) return false;
return (this.id != null && match.toUpperCase().startsWith("ID=") && match.substring(3).equals(this.id) || (match = match.toUpperCase()).startsWith("INDEX=") && match.equals("INDEX=" + this.index) || match.startsWith("#=") && match.equals("#=" + this.index));
}, "~S");
Clazz_defineMethod(c$, "getModel", 
function(){
return this.model;
});
Clazz_defineMethod(c$, "getFilePath", 
function(){
return this.file;
});
Clazz_defineMethod(c$, "autoSelectOnLoad", 
function(){
return (this.type.startsWith("GC"));
});
Clazz_defineMethod(c$, "setPixelRange", 
function(x0, x1){
this.px0 = x0;
this.px1 = x1;
}, "~N,~N");
Clazz_defineMethod(c$, "checkRange", 
function(xPixel, xVal){
if (xPixel != 2147483647 ? (this.px0 <= xPixel && this.px1 >= xPixel) : xVal >= this.xMin && xVal <= this.xMax) {
return Math.abs(xVal - this.getX());
}return 1e100;
}, "~N,~N");
Clazz_defineMethod(c$, "getXPixel", 
function(){
return Clazz_doubleToInt((this.px0 + this.px1) / 2);
});
});
;//5.0.1-v7 Sat Feb 21 18:17:38 CST 2026
Clazz_declarePackage("JSV.common");
Clazz_load(["JSV.common.Measurement"], "JSV.common.PeakPick", null, function(){
var c$ = Clazz_declareType(JSV.common, "PeakPick", JSV.common.Measurement);
Clazz_defineMethod(c$, "setValue", 
function(x, y, spec, text, value){
if (text == null) {
this.set(x, y);
this.setPt2(spec, false);
} else {
this.setA(x, y, spec, text, false, false, 0, 6);
this.value = value;
this.setPt2(this.getXVal(), this.getYVal());
}return this;
}, "~N,~N,JSV.common.Spectrum,~S,~N");
});
;//5.0.1-v7 Sat Feb 21 18:17:38 CST 2026
Clazz_declarePackage("JSV.common");
Clazz_load(["java.util.EventObject"], "JSV.common.PeakPickEvent", null, function(){
var c$ = Clazz_decorateAsClass(function(){
this.coord = null;
this.peakInfo = null;
Clazz_instantialize(this, arguments);}, JSV.common, "PeakPickEvent", java.util.EventObject);
Clazz_makeConstructor(c$, 
function(source, coord, peakInfo){
Clazz_superConstructor(this, JSV.common.PeakPickEvent, [source]);
this.coord = coord;
this.peakInfo = (peakInfo == null ? null : peakInfo);
}, "~O,JSV.common.Coordinate,JSV.common.PeakInfo");
Clazz_defineMethod(c$, "getCoord", 
function(){
return this.coord;
});
Clazz_defineMethod(c$, "getPeakInfo", 
function(){
return this.peakInfo;
});
Clazz_overrideMethod(c$, "toString", 
function(){
return (this.peakInfo == null ? null : this.peakInfo.toString());
});
});
;//5.0.1-v7 Sat Feb 21 18:17:38 CST 2026
Clazz_declarePackage("JSV.common");
Clazz_load(["JSV.common.Coordinate", "$.ScriptToken"], "JSV.common.PlotWidget", null, function(){
var c$ = Clazz_decorateAsClass(function(){
this.xPixel0 = 0;
this.yPixel0 = 0;
this.xPixel1 = 0;
this.yPixel1 = 0;
this.isPin = false;
this.isPinOrCursor = false;
this.isXtype = false;
this.is2D = false;
this.is2Donly = false;
this.isEnabled = true;
this.isVisible = false;
this.name = null;
this.color = null;
Clazz_instantialize(this, arguments);}, JSV.common, "PlotWidget", JSV.common.Coordinate);
Clazz_prepareFields (c$, function(){
this.color = JSV.common.ScriptToken.PLOTCOLOR;
});
Clazz_makeConstructor(c$, 
function(name){
Clazz_superConstructor (this, JSV.common.PlotWidget, []);
this.name = name;
this.isPin = (name.charAt(0) == 'p');
this.isPinOrCursor = (name.charAt(0) != 'z');
this.isXtype = (name.indexOf("x") >= 0);
this.is2D = (name.indexOf("2D") >= 0);
this.is2Donly = (this.is2D && name.charAt(0) == 'p');
}, "~S");
Clazz_overrideMethod(c$, "toString", 
function(){
return this.name + (!this.isPinOrCursor ? "" + this.xPixel0 + " " + this.yPixel0 + " / " + this.xPixel1 + " " + this.yPixel1 : " x=" + this.getXVal() + "/" + this.xPixel0 + " y=" + this.getYVal() + "/" + this.yPixel0);
});
Clazz_defineMethod(c$, "selected", 
function(xPixel, yPixel){
return (this.isVisible && Math.abs(xPixel - this.xPixel0) < 5 && Math.abs(yPixel - this.yPixel0) < 5);
}, "~N,~N");
Clazz_defineMethod(c$, "setX", 
function(x, xPixel){
this.setXVal(x);
this.xPixel0 = this.xPixel1 = xPixel;
}, "~N,~N");
Clazz_defineMethod(c$, "setY", 
function(y, yPixel){
this.setYVal(y);
this.yPixel0 = this.yPixel1 = yPixel;
}, "~N,~N");
Clazz_defineMethod(c$, "getValue", 
function(){
return (this.isXtype ? this.getXVal() : this.getYVal());
});
Clazz_defineMethod(c$, "setEnabled", 
function(enabled){
this.isEnabled = enabled;
}, "~B");
});
;//5.0.1-v7 Sat Feb 21 18:17:38 CST 2026
Clazz_declarePackage("JSV.common");
(function(){
var c$ = Clazz_decorateAsClass(function(){
this.imageableX = 0;
this.imageableY = 0;
this.paperHeight = 0;
this.paperWidth = 0;
this.imageableHeight = 0;
this.imageableWidth = 0;
this.layout = "landscape";
this.position = "fit to page";
this.showGrid = true;
this.showXScale = true;
this.showYScale = true;
this.showTitles = true;
this.font = "Helvetica";
this.paper = null;
this.asPDF = true;
this.title = null;
this.date = null;
Clazz_instantialize(this, arguments);}, JSV.common, "PrintLayout", null);
Clazz_prepareFields (c$, function(){
this.paperHeight = Clazz_floatToInt(Math.min(11, 11.69) * 72);
this.paperWidth = Clazz_floatToInt(Math.min(8.5, 8.27) * 72);
this.imageableHeight = this.paperHeight;
this.imageableWidth = this.paperWidth;
});
Clazz_makeConstructor(c$, 
function(pd){
if (pd != null) {
this.asPDF = true;
pd.setDefaultPrintOptions(this);
}}, "JSV.common.PanelData");
})();
;//5.0.1-v7 Sat Feb 21 18:17:38 CST 2026
Clazz_declarePackage("JSV.common");
Clazz_load(null, "JSV.common.RepaintManager", ["JSV.common.JSViewer"], function(){
var c$ = Clazz_decorateAsClass(function(){
this.repaintPending = false;
this.vwr = null;
Clazz_instantialize(this, arguments);}, JSV.common, "RepaintManager", null);
Clazz_makeConstructor(c$, 
function(viewer){
this.vwr = viewer;
}, "JSV.common.JSViewer");
Clazz_defineMethod(c$, "refresh", 
function(){
if (this.repaintPending) {
return false;
}this.repaintPending = true;
var applet = this.vwr.html5Applet;
var jmol = (JSV.common.JSViewer.isJS && !JSV.common.JSViewer.isSwingJS ? JSV.common.JSViewer.jsmolObject : null);
if (jmol == null) {
this.vwr.selectedPanel.repaint();
} else {
jmol.repaint(applet, false);
this.repaintDone();
}return true;
});
Clazz_defineMethod(c$, "repaintDone", 
function(){
this.repaintPending = false;
this.notify();
});
});
;//5.0.1-v7 Sat Feb 21 18:17:38 CST 2026
Clazz_declarePackage("JSV.common");
Clazz_load(null, "JSV.common.ScaleData", ["JSV.common.Coordinate"], function(){
var c$ = Clazz_decorateAsClass(function(){
this.initMinYOnScale = 0;
this.initMaxYOnScale = 0;
this.initMinY = 0;
this.initMaxY = 0;
this.startDataPointIndex = 0;
this.endDataPointIndex = 0;
this.pointCount = 0;
this.minX = 0;
this.maxX = 0;
this.firstX = NaN;
this.minXOnScale = 0;
this.maxXOnScale = 0;
this.specShift = 0;
this.precision = null;
this.exportPrecision = null;
this.steps = null;
this.minorTickCounts = null;
this.minYOnScale = 0;
this.maxYOnScale = 0;
this.minY = 0;
this.maxY = 0;
this.isShiftZoomedY = false;
this.spectrumScaleFactor = 1;
this.spectrumYRef = 0;
this.userYFactor = 1;
this.firstY = 0;
this.minY2D = 0;
this.maxY2D = 0;
this.xFactorForScale = 0;
this.yFactorForScale = 0;
Clazz_instantialize(this, arguments);}, JSV.common, "ScaleData", null);
Clazz_prepareFields (c$, function(){
this.precision =  Clazz_newIntArray (2, 0);
this.exportPrecision =  Clazz_newIntArray (2, 0);
this.steps =  Clazz_newDoubleArray (2, 0);
this.minorTickCounts =  Clazz_newIntArray (2, 0);
});
Clazz_makeConstructor(c$, 
function(){
});
Clazz_makeConstructor(c$, 
function(iStart, iEnd){
this.startDataPointIndex = iStart;
this.endDataPointIndex = iEnd;
this.pointCount = this.endDataPointIndex - this.startDataPointIndex + 1;
}, "~N,~N");
Clazz_makeConstructor(c$, 
function(coords, start, end, isContinuous, isInverted){
this.minX = JSV.common.Coordinate.getMinX(coords, start, end);
this.maxX = JSV.common.Coordinate.getMaxX(coords, start, end);
this.minY = JSV.common.Coordinate.getMinY(coords, start, end);
if (this.minY > 0 && !isContinuous) this.minY = 0;
this.maxY = JSV.common.Coordinate.getMaxY(coords, start, end);
this.setScale(isContinuous, isInverted);
}, "~A,~N,~N,~B,~B");
Clazz_defineMethod(c$, "setScale", 
function(isContinuous, isInverted){
this.setXScale();
if (!isContinuous) this.maxXOnScale += this.steps[0] / 2;
this.setYScale(this.minY, this.maxY, true, isInverted);
}, "~B,~B");
Clazz_defineMethod(c$, "setXScale", 
function(){
var xStep = this.setScaleParams(this.minX, this.maxX, 0);
this.firstX = Math.floor(this.minX / xStep) * xStep;
if (Math.abs((this.minX - this.firstX) / xStep) > 0.0001) this.firstX += xStep;
this.minXOnScale = this.minX;
this.maxXOnScale = this.maxX;
});
Clazz_defineMethod(c$, "isYZeroOnScale", 
function(){
return (this.minYOnScale < this.spectrumYRef && this.maxYOnScale > this.spectrumYRef);
});
Clazz_defineMethod(c$, "setYScale", 
function(minY, maxY, setScaleMinMax, isInverted){
if (minY == 0 && maxY == 0) maxY = 1;
if (this.isShiftZoomedY) {
minY = this.minYOnScale;
maxY = this.maxYOnScale;
}var yStep = this.setScaleParams(minY, maxY, 1);
var dy = (isInverted ? yStep / 2 : yStep / 4);
var dy2 = (isInverted ? yStep / 4 : yStep / 2);
if (!this.isShiftZoomedY) {
this.minYOnScale = (minY == 0 ? 0 : setScaleMinMax ? dy * Math.floor(minY / dy) : minY);
this.maxYOnScale = (setScaleMinMax ? dy2 * Math.ceil(maxY * 1.05 / dy2) : maxY);
}this.firstY = (minY == 0 ? 0 : Math.floor(minY / dy) * dy);
if (this.minYOnScale < 0 && this.maxYOnScale > 0) {
this.firstY = 0;
while (this.firstY - yStep > this.minYOnScale) this.firstY -= yStep;

} else if (this.minYOnScale != 0 && Math.abs((minY - this.firstY) / dy) > 0.0001) {
this.firstY += dy;
}if (setScaleMinMax) {
this.initMinYOnScale = this.minYOnScale;
this.initMaxYOnScale = this.maxYOnScale;
this.initMinY = minY;
this.initMaxY = maxY;
}}, "~N,~N,~B,~B");
Clazz_defineMethod(c$, "scale2D", 
function(f){
var dy = this.maxY - this.minY;
if (f == 1) {
this.maxY = this.initMaxY;
this.minY = this.initMinY;
return;
}this.maxY = this.minY + dy / f;
}, "~N");
Clazz_defineMethod(c$, "setXRange", 
function(x1, x2){
this.minX = x1;
this.maxX = x2;
this.setXScale();
}, "~N,~N");
c$.getXRange = Clazz_defineMethod(c$, "getXRange", 
function(i, xyCoords, initX, finalX, iStart, iEnd, startIndices, endIndices){
var index = 0;
var ptCount = 0;
for (index = iStart; index <= iEnd; index++) {
if (xyCoords[index].getXVal() >= initX) {
startIndices[i] = index;
ptCount = 1;
break;
}}
while (++index <= iEnd && xyCoords[index].getXVal() <= finalX) {
ptCount++;
}
endIndices[i] = startIndices[i] + ptCount - 1;
return ptCount;
}, "~N,~A,~N,~N,~N,~N,~A,~A");
Clazz_defineMethod(c$, "setScaleParams", 
function(min, max, i){
var dx = (max == min ? 1 : Math.abs(max - min) / 14);
var log = Math.log10(Math.abs(dx));
var exp = Clazz_doubleToInt(Math.floor(log));
this.exportPrecision[i] = exp;
this.precision[i] = (exp <= 0 ? Math.min(8, 1 - exp) : exp > 3 ? -2 : 0);
var j = 0;
var dec = Math.pow(10, log - exp);
while (dec > JSV.common.ScaleData.NTICKS[j]) {
j++;
}
this.steps[i] = Math.pow(10, exp) * JSV.common.ScaleData.NTICKS[j];
log = Math.log10(Math.abs(this.steps[i] * 1.0001e5));
var mantissa = log - Math.floor(log);
var n = 0;
for (j = 0; j < JSV.common.ScaleData.NTICKS.length; j++) if (Math.abs(mantissa - JSV.common.ScaleData.LOGTICKS[j]) < 0.001) {
n = JSV.common.ScaleData.NTICKS[j];
break;
}
this.minorTickCounts[i] = n;
return this.steps[i];
}, "~N,~N,~N");
Clazz_defineMethod(c$, "isInRangeX", 
function(x){
return (x >= this.minX && x <= this.maxX);
}, "~N");
Clazz_defineMethod(c$, "addSpecShift", 
function(dx){
this.specShift += dx;
this.minX += dx;
this.maxX += dx;
this.minXOnScale += dx;
this.maxXOnScale += dx;
this.firstX += dx;
}, "~N");
Clazz_defineMethod(c$, "getInfo", 
function(info){
info.put("specShift", Double.$valueOf(this.specShift));
info.put("minX", Double.$valueOf(this.minX));
info.put("maxX", Double.$valueOf(this.maxX));
info.put("minXOnScale", Double.$valueOf(this.minXOnScale));
info.put("maxXOnScale", Double.$valueOf(this.maxXOnScale));
info.put("minY", Double.$valueOf(this.minY));
info.put("maxY", Double.$valueOf(this.maxY));
info.put("minYOnScale", Double.$valueOf(this.minYOnScale));
info.put("maxYOnScale", Double.$valueOf(this.maxYOnScale));
info.put("minorTickCountX", Integer.$valueOf(this.minorTickCounts[0]));
info.put("xStep", Double.$valueOf(this.steps[0]));
return info;
}, "java.util.Map");
Clazz_defineMethod(c$, "setMinMax", 
function(minX, maxX, minY, maxY){
this.minX = minX;
this.maxX = maxX;
this.minY = minY;
this.maxY = maxY;
}, "~N,~N,~N,~N");
Clazz_defineMethod(c$, "toX", 
function(xPixel, xPixel1, drawXAxisLeftToRight){
return this.toXScaled(xPixel, xPixel1, drawXAxisLeftToRight, this.xFactorForScale);
}, "~N,~N,~B");
Clazz_defineMethod(c$, "toX0", 
function(xPixel, xPixel0, xPixel1, drawXAxisLeftToRight){
return this.toXScaled(xPixel, xPixel1, drawXAxisLeftToRight, (this.maxXOnScale - this.minXOnScale) / (xPixel1 - xPixel0));
}, "~N,~N,~N,~B");
Clazz_defineMethod(c$, "toXScaled", 
function(xPixel, xPixel1, drawXAxisLeftToRight, factor){
return (drawXAxisLeftToRight ? this.maxXOnScale - (xPixel1 - xPixel) * factor : this.minXOnScale + (xPixel1 - xPixel) * factor);
}, "~N,~N,~B,~N");
Clazz_defineMethod(c$, "toPixelX", 
function(dx, xPixel0, xPixel1, drawXAxisLeftToRight){
return this.toPixelXScaled(dx, xPixel0, xPixel1, drawXAxisLeftToRight, this.xFactorForScale);
}, "~N,~N,~N,~B");
Clazz_defineMethod(c$, "toPixelX0", 
function(dx, xPixel0, xPixel1, drawXAxisLeftToRight){
return this.toPixelXScaled(dx, xPixel0, xPixel1, drawXAxisLeftToRight, (this.maxXOnScale - this.minXOnScale) / (xPixel1 - xPixel0));
}, "~N,~N,~N,~B");
Clazz_defineMethod(c$, "toPixelXScaled", 
function(dx, xPixel0, xPixel1, drawXAxisLeftToRight, factor){
var x = Clazz_doubleToInt((dx - this.minXOnScale) / factor);
return (drawXAxisLeftToRight ? xPixel0 + x : xPixel1 - x);
}, "~N,~N,~N,~B,~N");
Clazz_defineMethod(c$, "toY", 
function(yPixel, yPixel0){
return this.maxYOnScale + (yPixel0 - yPixel) * this.yFactorForScale;
}, "~N,~N");
Clazz_defineMethod(c$, "toY0", 
function(yPixel, yPixel0, yPixel1){
var factor = (this.maxYOnScale - this.minYOnScale) / (yPixel1 - yPixel0);
var y = this.maxYOnScale + (yPixel0 - yPixel) * factor;
return Math.max(this.minYOnScale, Math.min(y, this.maxYOnScale));
}, "~N,~N,~N");
Clazz_defineMethod(c$, "toPixelY", 
function(yVal, yPixel1){
return (Double.isNaN(yVal) ? -2147483648 : yPixel1 - Clazz_doubleToInt(((yVal - this.spectrumYRef) * this.userYFactor + this.spectrumYRef - this.minYOnScale) / this.yFactorForScale));
}, "~N,~N");
Clazz_defineMethod(c$, "toPixelY0", 
function(y, yPixel0, yPixel1){
var factor = (this.maxYOnScale - this.minYOnScale) / (yPixel1 - yPixel0);
return Clazz_doubleToInt(yPixel0 + (this.maxYOnScale - y) / factor);
}, "~N,~N,~N");
Clazz_defineMethod(c$, "setXYScale", 
function(xPixels, yPixels, isInverted){
var yRef = this.spectrumYRef;
var f = this.spectrumScaleFactor;
var useInit = (f != 1 || this.isShiftZoomedY);
var minY = (useInit ? this.initMinYOnScale : this.minY);
var maxY = (useInit ? this.initMaxYOnScale : this.maxY);
if (useInit && yRef < minY) yRef = minY;
if (useInit && yRef > maxY) yRef = maxY;
this.setYScale((minY - yRef) / f + yRef, (maxY - yRef) / f + yRef, f == 1, isInverted);
this.xFactorForScale = (this.maxXOnScale - this.minXOnScale) / (xPixels - 1);
this.yFactorForScale = (this.maxYOnScale - this.minYOnScale) / (yPixels - 1);
}, "~N,~N,~B");
c$.copyScaleFactors = Clazz_defineMethod(c$, "copyScaleFactors", 
function(sdFrom, sdTo){
for (var i = 0; i < sdFrom.length; i++) {
sdTo[i].spectrumScaleFactor = sdFrom[i].spectrumScaleFactor;
sdTo[i].spectrumYRef = sdFrom[i].spectrumYRef;
sdTo[i].userYFactor = sdFrom[i].userYFactor;
sdTo[i].specShift = sdFrom[i].specShift;
sdTo[i].isShiftZoomedY = sdFrom[i].isShiftZoomedY;
}
}, "~A,~A");
c$.copyYScales = Clazz_defineMethod(c$, "copyYScales", 
function(sdFrom, sdTo){
for (var i = 0; i < sdFrom.length; i++) {
sdTo[i].initMinYOnScale = sdFrom[i].initMinYOnScale;
sdTo[i].initMaxYOnScale = sdFrom[i].initMaxYOnScale;
sdTo[i].minY = sdFrom[i].minY;
sdTo[i].maxY = sdFrom[i].maxY;
if (sdFrom[i].isShiftZoomedY) {
sdTo[i].isShiftZoomedY = true;
sdTo[i].minYOnScale = sdFrom[i].minYOnScale;
sdTo[i].maxYOnScale = sdFrom[i].maxYOnScale;
}}
}, "~A,~A");
c$.setDataPointIndices = Clazz_defineMethod(c$, "setDataPointIndices", 
function(graphsTemp, initX, finalX, minPoints, startIndices, endIndices){
var nSpectraOK = 0;
var nSpectra = graphsTemp.size();
for (var i = 0; i < nSpectra; i++) {
var xyCoords = graphsTemp.get(i).getXYCoords();
if (JSV.common.ScaleData.getXRange(i, xyCoords, initX, finalX, 0, xyCoords.length - 1, startIndices, endIndices) >= minPoints) nSpectraOK++;
}
return (nSpectraOK == nSpectra);
}, "JU.Lst,~N,~N,~N,~A,~A");
c$.fixScale = Clazz_defineMethod(c$, "fixScale", 
function(map){
if (map.isEmpty()) return;
while (true) {
for (var entry, $entry = map.entrySet().iterator (); $entry.hasNext()&& ((entry = $entry.next ()) || true);) {
var s = entry.getValue();
var pt = s.indexOf("E");
if (pt >= 0) s = s.substring(0, pt);
if (s.indexOf(".") < 0) return;
if (!s.endsWith("0") && !s.endsWith(".")) return;
}
for (var entry, $entry = map.entrySet().iterator (); $entry.hasNext()&& ((entry = $entry.next ()) || true);) {
var s = entry.getValue();
var pt = s.indexOf("E");
if (pt >= 0) entry.setValue(s.substring(0, pt - 1) + s.substring(pt));
 else entry.setValue(s.substring(0, s.length - 1));
}
}
}, "java.util.Map");
Clazz_defineMethod(c$, "scaleBy", 
function(f){
if (this.isShiftZoomedY) {
var center = (this.isYZeroOnScale() ? this.spectrumYRef : (this.minYOnScale + this.maxYOnScale) / 2);
this.minYOnScale = center - (center - this.minYOnScale) / f;
this.maxYOnScale = center - (center - this.maxYOnScale) / f;
} else {
this.spectrumScaleFactor *= f;
}}, "~N");
c$.NTICKS =  Clazz_newIntArray(-1, [2, 5, 10, 10]);
c$.LOGTICKS =  Clazz_newDoubleArray(-1, [Math.log10(2), Math.log10(5), 0, 1]);
});
;//5.0.1-v7 Sat Feb 21 18:17:38 CST 2026
Clazz_declarePackage("JSV.common");
Clazz_load(["java.lang.Enum"], "JSV.common.ScriptToken", ["java.util.Hashtable", "JU.Lst", "$.PT", "$.SB", "JSV.common.ScriptTokenizer"], function(){
var c$ = Clazz_decorateAsClass(function(){
this.tip = null;
this.description = null;
Clazz_instantialize(this, arguments);}, JSV.common, "ScriptToken", Enum);
Clazz_defineMethod(c$, "getTip", 
function(){
return "  " + (this.tip === "T" ? "TRUE/FALSE/TOGGLE" : this.tip === "TF" ? "TRUE or FALSE" : this.tip === "C" ? "COLOR" : this.tip);
});
Clazz_makeConstructor(c$, 
function(){
});
Clazz_makeConstructor(c$, 
function(tip){
this.tip = tip;
this.description = "";
}, "~S");
Clazz_makeConstructor(c$, 
function(tip, description){
this.tip = tip;
this.description = "-- " + description;
}, "~S,~S");
c$.getParams = Clazz_defineMethod(c$, "getParams", 
function(){
if (JSV.common.ScriptToken.htParams == null) {
JSV.common.ScriptToken.htParams =  new java.util.Hashtable();
for (var item, $item = 0, $$item = JSV.common.ScriptToken.values(); $item < $$item.length && ((item = $$item[$item]) || true); $item++) JSV.common.ScriptToken.htParams.put(item.name(), item);

}return JSV.common.ScriptToken.htParams;
});
c$.getScriptToken = Clazz_defineMethod(c$, "getScriptToken", 
function(name){
var st = JSV.common.ScriptToken.getParams().get(name.toUpperCase());
return (st == null ? JSV.common.ScriptToken.UNKNOWN : st);
}, "~S");
c$.getScriptTokenList = Clazz_defineMethod(c$, "getScriptTokenList", 
function(name, isExact){
if (name != null) name = name.toUpperCase();
var list =  new JU.Lst();
if (isExact) {
var st = JSV.common.ScriptToken.getScriptToken(name);
if (st != null) list.addLast(st);
} else {
for (var entry, $entry = JSV.common.ScriptToken.getParams().entrySet().iterator (); $entry.hasNext()&& ((entry = $entry.next ()) || true);) if ((name == null || entry.getKey().startsWith(name)) && entry.getValue().tip != null) list.addLast(entry.getValue());

}return list;
}, "~S,~B");
c$.getValue = Clazz_defineMethod(c$, "getValue", 
function(st, params, cmd){
if (!params.hasMoreTokens()) return "";
switch (st) {
default:
return JSV.common.ScriptTokenizer.nextStringToken(params, true);
case JSV.common.ScriptToken.CLOSE:
case JSV.common.ScriptToken.GETPROPERTY:
case JSV.common.ScriptToken.INTEGRATION:
case JSV.common.ScriptToken.INTEGRATE:
case JSV.common.ScriptToken.JMOL:
case JSV.common.ScriptToken.LABEL:
case JSV.common.ScriptToken.LOAD:
case JSV.common.ScriptToken.PEAK:
case JSV.common.ScriptToken.PLOTCOLORS:
case JSV.common.ScriptToken.YSCALE:
case JSV.common.ScriptToken.WRITE:
return JSV.common.ScriptToken.removeCommandName(cmd);
case JSV.common.ScriptToken.SELECT:
case JSV.common.ScriptToken.OVERLAY:
case JSV.common.ScriptToken.VIEW:
case JSV.common.ScriptToken.ZOOM:
return JSV.common.ScriptToken.removeCommandName(cmd).$replace(',', ' ').trim();
}
}, "JSV.common.ScriptToken,JSV.common.ScriptTokenizer,~S");
c$.removeCommandName = Clazz_defineMethod(c$, "removeCommandName", 
function(cmd){
var pt = cmd.indexOf(" ");
if (pt < 0) return "";
return cmd.substring(pt).trim();
}, "~S");
c$.getKey = Clazz_defineMethod(c$, "getKey", 
function(eachParam){
var key = eachParam.nextToken();
if (key.startsWith("#") || key.startsWith("//")) return null;
if (key.equalsIgnoreCase("SET")) key = eachParam.nextToken();
return key.toUpperCase();
}, "JSV.common.ScriptTokenizer");
c$.getTokens = Clazz_defineMethod(c$, "getTokens", 
function(value){
if (value.startsWith("'") && value.endsWith("'")) value = "\"" + JU.PT.trim(value, "'") + "\"";
var tokens =  new JU.Lst();
var st =  new JSV.common.ScriptTokenizer(value, false);
while (st.hasMoreTokens()) {
var s = JSV.common.ScriptTokenizer.nextStringToken(st, false);
if (s.startsWith("//") || s.startsWith("#")) break;
tokens.addLast(s);
}
return tokens;
}, "~S");
c$.getNameList = Clazz_defineMethod(c$, "getNameList", 
function(list){
if (list.size() == 0) return "";
var sb =  new JU.SB();
for (var i = 0; i < list.size(); i++) sb.append(",").append(list.get(i).toString());

return sb.toString().substring(1);
}, "JU.Lst");
Clazz_defineMethod(c$, "getDescription", 
function(){
return this.description;
});
c$.htParams = null;
Clazz_defineEnumConstant(c$, "UNKNOWN", 0, []);
Clazz_defineEnumConstant(c$, "APPLETID", 1, []);
Clazz_defineEnumConstant(c$, "APPLETREADYCALLBACKFUNCTIONNAME", 2, []);
Clazz_defineEnumConstant(c$, "AUTOINTEGRATE", 3, ["TF", "automatically integrate an NMR spectrum"]);
Clazz_defineEnumConstant(c$, "BACKGROUNDCOLOR", 4, ["C", "set the background color"]);
Clazz_defineEnumConstant(c$, "CLOSE", 5, ["spectrumId or fileName or ALL or VIEWS or SIMULATIONS", "close one or more views or simulations"]);
Clazz_defineEnumConstant(c$, "COMPOUNDMENUON", 6, []);
Clazz_defineEnumConstant(c$, "COORDCALLBACKFUNCTIONNAME", 7, []);
Clazz_defineEnumConstant(c$, "COORDINATESCOLOR", 8, ["C", "set the color of the coordinates shown in the upper right-hand corner"]);
Clazz_defineEnumConstant(c$, "COORDINATESON", 9, ["T", "turn on or off the coordinates shown in the upper right-hand corner"]);
Clazz_defineEnumConstant(c$, "DEBUG", 10, ["TF", "turn debugging on and off"]);
Clazz_defineEnumConstant(c$, "DEFAULTLOADSCRIPT", 11, ["\"script...\"", "set the script to be run after each file is loaded"]);
Clazz_defineEnumConstant(c$, "DEFAULTNMRNORMALIZATION", 12, ["maxYvalue", "set the value to be given the largest peak in an HMR spectrum"]);
Clazz_defineEnumConstant(c$, "DISPLAYFONTNAME", 13, []);
Clazz_defineEnumConstant(c$, "DISPLAY1D", 14, ["T", "turn on or off display of 1D spectra when 1D and 2D spectra are loaded"]);
Clazz_defineEnumConstant(c$, "DISPLAY2D", 15, ["T", "turn on or off display of the 2D spectrum when 1D and 2D spectra are loaded"]);
Clazz_defineEnumConstant(c$, "ENABLEZOOM", 16, ["T", "allow or disallow zooming"]);
Clazz_defineEnumConstant(c$, "ENDINDEX", 17, []);
Clazz_defineEnumConstant(c$, "FINDX", 18, ["value", "move the vertical-line cursor to a specific x-axis value"]);
Clazz_defineEnumConstant(c$, "GETPROPERTY", 19, ["[propertyName] or ALL or NAMES", "get a property value or all property values as key/value pairs, or a list of names"]);
Clazz_defineEnumConstant(c$, "GETSOLUTIONCOLOR", 20, [" FILL or FILLNONE or FILLALL or FILLALLNONE", "estimate the solution color for UV/VIS spectra"]);
Clazz_defineEnumConstant(c$, "GRIDCOLOR", 21, ["C", "color of the grid"]);
Clazz_defineEnumConstant(c$, "GRIDON", 22, ["T", "turn the grid lines on or off"]);
Clazz_defineEnumConstant(c$, "HELP", 23, ["[command]", "get this listing or help for a specific command"]);
Clazz_defineEnumConstant(c$, "HIDDEN", 24, []);
Clazz_defineEnumConstant(c$, "HIGHLIGHTCOLOR", 25, ["C", "set the highlight color"]);
Clazz_defineEnumConstant(c$, "HIGHLIGHT", 26, ["OFF or X1 X2 [OFF] or X1 X2 r g b [a]", "turns on or off a highlight color, possibily setting its color, where r g b a are 0-255 or 0.0-1.0"]);
Clazz_defineEnumConstant(c$, "INTEGRALOFFSET", 27, ["percent", "sets the integral offset from baseline"]);
Clazz_defineEnumConstant(c$, "INTEGRALRANGE", 28, ["percent", "sets the height of the total integration"]);
Clazz_defineEnumConstant(c$, "INTEGRATE", 29, ["", "see INTEGRATION"]);
Clazz_defineEnumConstant(c$, "INTEGRATION", 30, ["ON/OFF/TOGGLE/AUTO/CLEAR/MIN value/MARK ppm1-ppm2:norm,ppm3-ppm4,...", "show/hide integration or set integrals (1D 1H NMR only)"]);
Clazz_defineEnumConstant(c$, "INTEGRALPLOTCOLOR", 31, ["C", "color of the integration line"]);
Clazz_defineEnumConstant(c$, "INTEGRATIONRATIOS", 32, ["'x:value,x:value,..'", "annotate the spectrum with numbers or text at specific x values"]);
Clazz_defineEnumConstant(c$, "INTERFACE", 33, ["SINGLE or OVERLAY", "set how multiple spectra are displayed"]);
Clazz_defineEnumConstant(c$, "INVERTY", 34, ["", "invert the Y axis"]);
Clazz_defineEnumConstant(c$, "IRMODE", 35, ["A or T or TOGGLE", "set the IR mode to absorption or transmission"]);
Clazz_defineEnumConstant(c$, "JMOL", 36, ["...Jmol command...", "send a command to Jmol (if present)"]);
Clazz_defineEnumConstant(c$, "JSV", 37, []);
Clazz_defineEnumConstant(c$, "LABEL", 38, ["x y [color and/or \"text\"]", "add a text label"]);
Clazz_defineEnumConstant(c$, "LINK", 39, ["AB or ABC or NONE or ALL", "synchronize the crosshair of a 2D spectrum with 1D cursors"]);
Clazz_defineEnumConstant(c$, "LOAD", 40, ["[APPEND] \"fileName\" [first] [last]; use \"\" for current file; $H1/name or $C13/name for simulation", "load a specturm"]);
Clazz_defineEnumConstant(c$, "LOADFILECALLBACKFUNCTIONNAME", 41, []);
Clazz_defineEnumConstant(c$, "LOADIMAGINARY", 42, ["TF", "set TRUE to load imaginary NMR component"]);
Clazz_defineEnumConstant(c$, "MENUON", 43, []);
Clazz_defineEnumConstant(c$, "OBSCURE", 44, []);
Clazz_defineEnumConstant(c$, "OVERLAY", 45, []);
Clazz_defineEnumConstant(c$, "OVERLAYSTACKED", 46, ["TF", "whether viewed spectra are shown separately, in a stack"]);
Clazz_defineEnumConstant(c$, "PEAK", 47, ["[IR,CNMR,HNMR,MS] [#nnn or ID=xxx or text] [ALL], for example: PEAK HNMR #3", "highlights a peak based on its number or title text, optionally checking all loade spectra"]);
Clazz_defineEnumConstant(c$, "PEAKCALLBACKFUNCTIONNAME", 48, []);
Clazz_defineEnumConstant(c$, "PEAKLIST", 49, ["[THRESHOLD=n] [INTERPOLATE=PARABOLIC or NONE]", "creates a peak list based on a threshold value and parabolic or no interpolation"]);
Clazz_defineEnumConstant(c$, "PEAKOVERCOLOR", 50, ["C", "sets the color of peak backgrounds when moused over"]);
Clazz_defineEnumConstant(c$, "PEAKTABCOLOR", 51, ["C", "sets the color of peak marks for a peak listing"]);
Clazz_defineEnumConstant(c$, "PEAKTABSON", 52, ["T", "show peak tabs for simulated spectra"]);
Clazz_defineEnumConstant(c$, "PLOTAREACOLOR", 53, ["C", "sets the color of the plot background"]);
Clazz_defineEnumConstant(c$, "PLOTCOLOR", 54, ["C", "sets the color of the graph line"]);
Clazz_defineEnumConstant(c$, "PLOTCOLORS", 55, ["color,color,color,...", "sets the colors of multiple plots"]);
Clazz_defineEnumConstant(c$, "POINTSONLY", 56, ["TF", "show points only for all data"]);
Clazz_defineEnumConstant(c$, "PRINT", 57, ["", "prints the current spectrum"]);
Clazz_defineEnumConstant(c$, "REVERSEPLOT", 58, ["T", "reverses the x-axis of a spectrum"]);
Clazz_defineEnumConstant(c$, "SCALEBY", 59, ["factor", "multiplies the y-scale of the spectrum by a factor"]);
Clazz_defineEnumConstant(c$, "SCALECOLOR", 60, ["C", "sets the color of the x-axis and y-axis scales"]);
Clazz_defineEnumConstant(c$, "SCRIPT", 61, ["filename.jsv", "runs a script from a file"]);
Clazz_defineEnumConstant(c$, "SELECT", 62, ["spectrumID, spectrumID,...", "selects one or more spectra based on IDs"]);
Clazz_defineEnumConstant(c$, "SETPEAK", 63, ["xNew, xOld xNew, ?, or NONE", "sets nearest peak to xOld ppm to a new value; NONE resets (1D NMR only)"]);
Clazz_defineEnumConstant(c$, "SETX", 64, ["xNew, xOld xNew, ?, or NONE", "sets an old ppm position in the spectrum to a new value; NONE resets (1D NMR only)"]);
Clazz_defineEnumConstant(c$, "SHIFTX", 65, ["dx or NONE", "shifts the x-axis of a 1D NMR spectrum by the given ppm; NONE resets (1D NMR only)"]);
Clazz_defineEnumConstant(c$, "SHOWERRORS", 66, ["shows recent errors"]);
Clazz_defineEnumConstant(c$, "SHOWINTEGRATION", 67, ["T", "shows an integration listing"]);
Clazz_defineEnumConstant(c$, "SHOWMEASUREMENTS", 68, ["T", "shows a listing of measurements"]);
Clazz_defineEnumConstant(c$, "SHOWMENU", 69, ["displays the popup menu"]);
Clazz_defineEnumConstant(c$, "SHOWPEAKLIST", 70, ["T", "shows a listing for peak picking"]);
Clazz_defineEnumConstant(c$, "SHOWPROPERTIES", 71, ["displays the header information of a JDX file"]);
Clazz_defineEnumConstant(c$, "SHOWSOURCE", 72, ["displays the source JDX file associated with the selected data"]);
Clazz_defineEnumConstant(c$, "SPECTRUM", 73, ["id", "displays a specific spectrum, where id is a number 1, 2, 3... or a file.spectrum number such as 2.1"]);
Clazz_defineEnumConstant(c$, "SPECTRUMNUMBER", 74, ["n", "displays the nth spectrum loaded"]);
Clazz_defineEnumConstant(c$, "STACKOFFSETY", 75, ["percent", "sets the y-axis offset of stacked spectra"]);
Clazz_defineEnumConstant(c$, "STARTINDEX", 76, []);
Clazz_defineEnumConstant(c$, "SYNCCALLBACKFUNCTIONNAME", 77, []);
Clazz_defineEnumConstant(c$, "SYNCID", 78, []);
Clazz_defineEnumConstant(c$, "TEST", 79, []);
Clazz_defineEnumConstant(c$, "TITLEON", 80, ["T", "turns the title in the bottom left corner on or off"]);
Clazz_defineEnumConstant(c$, "TITLEBOLDON", 81, ["T", "makes the title bold"]);
Clazz_defineEnumConstant(c$, "TITLECOLOR", 82, ["C", "sets the color of the title"]);
Clazz_defineEnumConstant(c$, "TITLEFONTNAME", 83, ["fontName", "sets the title font"]);
Clazz_defineEnumConstant(c$, "UNITSCOLOR", 84, ["C", "sets the color of the x-axis and y-axis units"]);
Clazz_defineEnumConstant(c$, "VERSION", 85, []);
Clazz_defineEnumConstant(c$, "VIEW", 86, ["spectrumID, spectrumID, ... Example: VIEW 3.1, 3.2  or  VIEW \"acetophenone\"", "creates a view of one or more spectra"]);
Clazz_defineEnumConstant(c$, "XSCALEON", 87, ["T", "set FALSE to turn off the x-axis scale"]);
Clazz_defineEnumConstant(c$, "XUNITSON", 88, ["T", "set FALSE to turn off the x-axis units"]);
Clazz_defineEnumConstant(c$, "YSCALE", 89, ["[ALL] lowValue highValue"]);
Clazz_defineEnumConstant(c$, "YSCALEON", 90, ["T", "set FALSE to turn off the y-axis scale"]);
Clazz_defineEnumConstant(c$, "YUNITSON", 91, ["T", "set FALSE to turn off the y-axis units"]);
Clazz_defineEnumConstant(c$, "WINDOW", 92, []);
Clazz_defineEnumConstant(c$, "WRITE", 93, ["[XY,DIF,DIFDUP,PAC,FIX,SQZ,AML,CML,JPG,PDF,PNG,SVG] \"filename\"", "writes a file in the specified format"]);
Clazz_defineEnumConstant(c$, "ZOOM", 94, ["OUT or PREVIOUS or NEXT or x1,x2 or x1,y1 x2,y2", "sets the zoom"]);
Clazz_defineEnumConstant(c$, "ZOOMBOXCOLOR", 95, []);
Clazz_defineEnumConstant(c$, "ZOOMBOXCOLOR2", 96, []);
});
;//5.0.1-v7 Sat Feb 21 18:17:38 CST 2026
Clazz_declarePackage("JSV.common");
Clazz_load(null, "JSV.common.ScriptTokenizer", ["JU.PT"], function(){
var c$ = Clazz_decorateAsClass(function(){
this.str = null;
this.pt = -1;
this.len = 0;
this.isCmd = false;
this.doCheck = true;
Clazz_instantialize(this, arguments);}, JSV.common, "ScriptTokenizer", null);
Clazz_makeConstructor(c$, 
function(str, isCmd){
this.str = str;
this.len = str.length;
this.isCmd = isCmd;
}, "~S,~B");
c$.nextStringToken = Clazz_defineMethod(c$, "nextStringToken", 
function(eachParam, removeQuotes){
var s = eachParam.nextToken();
return (removeQuotes && s.charAt(0) == '"' && s.endsWith("\"") && s.length > 1 ? JU.PT.trimQuotes(s) : s);
}, "JSV.common.ScriptTokenizer,~B");
Clazz_defineMethod(c$, "nextToken", 
function(){
if (this.doCheck) this.hasMoreTokens();
var pt0 = this.pt;
var inQuote = (this.str.charAt(this.pt) == '"');
while (++this.pt < this.len) {
switch ((this.str.charAt(this.pt)).charCodeAt(0)) {
case 34:
if (inQuote) {
if (this.isCmd) {
inQuote = false;
continue;
}this.pt++;
break;
}if (this.isCmd) inQuote = true;
continue;
case 32:
if (!this.isCmd && !inQuote) break;
continue;
case 59:
case 10:
if (this.isCmd && !inQuote) break;
continue;
default:
continue;
}
break;
}
this.doCheck = true;
return this.str.substring(pt0, this.pt);
});
Clazz_defineMethod(c$, "hasMoreTokens", 
function(){
while (++this.pt < this.len) {
switch ((this.str.charAt(this.pt)).charCodeAt(0)) {
case 32:
case 59:
case 10:
continue;
}
break;
}
this.doCheck = false;
return (this.pt < this.len);
});
Clazz_defineMethod(c$, "getRemainingScript", 
function(){
return this.str.substring(this.pt);
});
});
;//5.0.1-v7 Sat Feb 21 18:17:38 CST 2026
Clazz_declarePackage("JSV.common");
(function(){
var c$ = Clazz_decorateAsClass(function(){
this.isub = 0;
this.title = null;
Clazz_instantialize(this, arguments);}, JSV.common, "SubSpecChangeEvent", null);
Clazz_makeConstructor(c$, 
function(isub, title){
this.isub = isub;
this.title = title;
}, "~N,~S");
Clazz_defineMethod(c$, "isValid", 
function(){
return (this.title != null);
});
Clazz_defineMethod(c$, "getSubIndex", 
function(){
return this.isub;
});
Clazz_overrideMethod(c$, "toString", 
function(){
return this.title;
});
})();
;//5.0.1-v7 Sat Feb 21 18:17:38 CST 2026
Clazz_declarePackage("JSV.common");
Clazz_load(null, "JSV.common.SyncManager", ["JU.PT", "$.SB", "JSV.common.PanelNode", "JU.Logger"], function(){
var c$ = Clazz_declareType(JSV.common, "SyncManager", null);
c$.syncToJmol = Clazz_defineMethod(c$, "syncToJmol", 
function(vwr, pi){
vwr.peakInfoModelSentToJmol = pi.getModel();
vwr.si.syncToJmol(JSV.common.SyncManager.jmolSelect(vwr.pd(), pi));
}, "JSV.common.JSViewer,JSV.common.PeakInfo");
c$.syncFromJmol = Clazz_defineMethod(c$, "syncFromJmol", 
function(vwr, peakScript){
if (peakScript.equals("TEST")) peakScript = JSV.common.SyncManager.testScript;
if (peakScript.indexOf("<PeakData") < 0) {
if (peakScript.startsWith("JSVSTR:")) {
vwr.si.syncToJmol(peakScript);
return;
}vwr.runScriptNow(peakScript);
if (peakScript.indexOf("#SYNC_PEAKS") >= 0) JSV.common.SyncManager.syncToJmolPeaksAfterSyncScript(vwr);
return;
}var sourceID = JU.PT.getQuotedAttribute(peakScript, "sourceID");
var type;
var model;
var file;
var jmolSource;
var index;
var atomKey;
if (sourceID == null) {
file = JU.PT.getQuotedAttribute(peakScript, "file");
index = JU.PT.getQuotedAttribute(peakScript, "index");
if (file == null || index == null) return;
file = JU.PT.rep(file, "#molfile", "");
model = JU.PT.getQuotedAttribute(peakScript, "model");
jmolSource = JU.PT.getQuotedAttribute(peakScript, "src");
var modelSent = (jmolSource != null && jmolSource.startsWith("Jmol") ? null : vwr.peakInfoModelSentToJmol);
if (model != null && modelSent != null && !model.equals(modelSent)) {
JU.Logger.info("JSV ignoring model " + model + "; should be " + modelSent);
return;
}vwr.peakInfoModelSentToJmol = null;
if (vwr.panelNodes.size() == 0 || !vwr.checkFileAlreadyLoaded(file)) {
JU.Logger.info("file " + file + " not found -- JSViewer closing all and reopening");
vwr.si.siSyncLoad(file);
}type = JU.PT.getQuotedAttribute(peakScript, "type");
atomKey = null;
} else {
file = null;
index = model = sourceID;
atomKey = "," + JU.PT.getQuotedAttribute(peakScript, "atom") + ",";
type = "ID";
jmolSource = sourceID;
}var pi = JSV.common.SyncManager.selectPanelByPeak(vwr, file, index, atomKey);
var pd = vwr.pd();
pd.selectSpectrum(file, type, model, true);
vwr.si.siSendPanelChange();
pd.addPeakHighlight(pi);
vwr.repaint(true);
if (jmolSource == null || (pi != null && pi.getAtoms() != null)) vwr.si.syncToJmol(JSV.common.SyncManager.jmolSelect(vwr.pd(), pi));
}, "JSV.common.JSViewer,~S");
c$.syncToJmolPeaksAfterSyncScript = Clazz_defineMethod(c$, "syncToJmolPeaksAfterSyncScript", 
function(vwr){
var source = vwr.currentSource;
if (source == null) return;
try {
var file = "file=" + JU.PT.esc(source.getFilePath());
var spectra = source.getSpectra();
var peaks = spectra.get(spectra.size() - 1).getPeakList();
var sb =  new JU.SB();
sb.append("[");
var n = peaks.size();
for (var i = 0; i < n; i++) {
var s = peaks.get(i).toString();
s = s + " " + file;
sb.append(JU.PT.esc(s));
if (i > 0) sb.append(",");
}
sb.append("]");
vwr.si.syncToJmol("Peaks: " + sb);
} catch (e) {
if (Clazz_exceptionOf(e, Exception)){
} else {
throw e;
}
}
}, "JSV.common.JSViewer");
c$.selectPanelByPeak = Clazz_defineMethod(c$, "selectPanelByPeak", 
function(vwr, file, index, atomKey){
var panelNodes = vwr.panelNodes;
if (panelNodes == null) return null;
var pi = null;
for (var i = panelNodes.size(); --i >= 0; ) panelNodes.get(i).pd().addPeakHighlight(null);

pi = vwr.pd().selectPeakByFileIndex(file, index, atomKey);
if (pi != null) {
vwr.setNode(JSV.common.PanelNode.findNode(vwr.selectedPanel, panelNodes));
} else {
for (var i = panelNodes.size(); --i >= 0; ) {
var node = panelNodes.get(i);
if ((pi = node.pd().selectPeakByFileIndex(file, index, atomKey)) != null) {
vwr.setNode(node);
break;
}}
}return pi;
}, "JSV.common.JSViewer,~S,~S,~S");
c$.jmolSelect = Clazz_defineMethod(c$, "jmolSelect", 
function(pd, pi){
var script = ("IR".equals(pi.getType()) || "RAMAN".equals(pi.getType()) ? "vibration ON; selectionHalos OFF;" : "vibration OFF; selectionhalos " + (pi.getAtoms() == null ? "OFF" : "ON"));
return "Select: " + pi + " script=\"" + script + " \" sourceID=\"" + pd.getSpectrum().sourceID + "\"";
}, "JSV.common.PanelData,JSV.common.PeakInfo");
c$.testScript = "<PeakData  index=\"1\" title=\"\" model=\"~1.1\" type=\"1HNMR\" xMin=\"3.2915\" xMax=\"3.2965\" atoms=\"15,16,17,18,19,20\" multiplicity=\"\" integral=\"1\"> src=\"JPECVIEW\" file=\"http://SIMULATION/$caffeine\"";
});
;//5.0.1-v7 Sat Feb 21 18:17:38 CST 2026
Clazz_declarePackage("JSV.common");
Clazz_load(null, "JSV.common.ViewData", ["JSV.common.Coordinate", "$.ScaleData"], function(){
var c$ = Clazz_decorateAsClass(function(){
this.scaleData = null;
this.thisScale = null;
this.nSpectra = 0;
this.iThisScale = 0;
this.spectra = null;
Clazz_instantialize(this, arguments);}, JSV.common, "ViewData", null);
Clazz_makeConstructor(c$, 
function(spectra, yPt1, yPt2, startList, endList, isContinuous, is2D){
this.nSpectra = (is2D ? 1 : spectra.size());
this.scaleData =  new Array(this.nSpectra);
for (var j = 0; j < this.nSpectra; j++) this.scaleData[j] =  new JSV.common.ScaleData(startList[j], endList[j]);

this.init(spectra, yPt1, yPt2, isContinuous);
}, "JU.Lst,~N,~N,~A,~A,~B,~B");
Clazz_makeConstructor(c$, 
function(spectra, yPt1, yPt2, isContinuous){
this.nSpectra = spectra.size();
var n = spectra.get(0).getXYCoords().length;
this.scaleData =  new Array(1);
this.scaleData[0] =  new JSV.common.ScaleData(0, n - 1);
this.init(spectra, yPt1, yPt2, isContinuous);
}, "JU.Lst,~N,~N,~B");
Clazz_defineMethod(c$, "getScaleData", 
function(){
return this.scaleData;
});
Clazz_defineMethod(c$, "getScale", 
function(){
return this.thisScale;
});
Clazz_defineMethod(c$, "init", 
function(spectra, yPt1, yPt2, isContinuous){
if (spectra == null) spectra = this.spectra;
 else this.spectra = spectra;
this.thisScale = this.scaleData[this.iThisScale = 0];
for (var i = 0; i < this.scaleData.length; i++) {
this.scaleData[i].userYFactor = spectra.get(i).getUserYFactor();
this.scaleData[i].spectrumYRef = spectra.get(i).getYRef();
}
this.resetScaleFactors();
var minX = JSV.common.Coordinate.getMinX(spectra, this);
var maxX = JSV.common.Coordinate.getMaxX(spectra, this);
var minY = JSV.common.Coordinate.getMinYUser(spectra, this);
var maxY = JSV.common.Coordinate.getMaxYUser(spectra, this);
if (yPt1 != yPt2) {
minY = yPt1;
maxY = yPt2;
if (minY > maxY) {
var t = minY;
minY = maxY;
maxY = t;
}}var isInverted = spectra.get(0).isInverted();
for (var i = 0; i < this.scaleData.length; i++) {
this.scaleData[i].setMinMax(minX, maxX, minY, maxY);
this.scaleData[i].setScale(isContinuous, isInverted);
}
}, "JU.Lst,~N,~N,~B");
Clazz_defineMethod(c$, "newSpectrum", 
function(spectra){
this.init(spectra, 0, 0, false);
}, "JU.Lst");
Clazz_defineMethod(c$, "setXRangeForSubSpectrum", 
function(xyCoords){
this.setXRange(0, xyCoords, this.scaleData[0].minX, this.scaleData[0].maxX, 0, xyCoords.length - 1);
}, "~A");
Clazz_defineMethod(c$, "setXRange", 
function(i, xyCoords, initX, finalX, iStart, iEnd){
var index = 0;
var ptCount = 0;
for (index = iStart; index <= iEnd; index++) {
var x = xyCoords[index].getXVal();
if (x >= initX) {
this.scaleData[i % this.scaleData.length].startDataPointIndex = index;
break;
}}
for (; index <= iEnd; index++) {
var x = xyCoords[index].getXVal();
ptCount++;
if (x >= finalX) {
break;
}}
this.scaleData[i % this.scaleData.length].endDataPointIndex = index;
return ptCount;
}, "~N,~A,~N,~N,~N,~N");
Clazz_defineMethod(c$, "getStartingPointIndex", 
function(i){
return this.scaleData[i % this.scaleData.length].startDataPointIndex;
}, "~N");
Clazz_defineMethod(c$, "getEndingPointIndex", 
function(i){
return this.scaleData[i % this.scaleData.length].endDataPointIndex;
}, "~N");
Clazz_defineMethod(c$, "areYScalesSame", 
function(i, j){
i %= this.scaleData.length;
j %= this.scaleData.length;
return (this.scaleData[i].minYOnScale == this.scaleData[j].minYOnScale && this.scaleData[i].maxYOnScale == this.scaleData[j].maxYOnScale);
}, "~N,~N");
Clazz_defineMethod(c$, "setScale", 
function(i, xPixels, yPixels, isInverted){
this.iThisScale = i % this.scaleData.length;
this.thisScale = this.scaleData[this.iThisScale];
this.thisScale.setXYScale(xPixels, yPixels, isInverted);
}, "~N,~N,~N,~B");
Clazz_defineMethod(c$, "resetScaleFactors", 
function(){
for (var i = 0; i < this.scaleData.length; i++) this.scaleData[i].spectrumScaleFactor = 1;

});
Clazz_defineMethod(c$, "scaleSpectrum", 
function(i, f){
if (f <= 0 || i >= this.nSpectra) return;
if (i == -2) {
this.thisScale.scale2D(f);
return;
}if (i < 0) for (i = 0; i < this.scaleData.length; i++) this.scaleData[i].scaleBy(f);

 else this.scaleData[i % this.scaleData.length].scaleBy(f);
}, "~N,~N");
Clazz_defineMethod(c$, "getNewScales", 
function(iSelected, isXOnly, y1, y2){
if (isXOnly) return this.scaleData;
iSelected %= this.scaleData.length;
var f1 = (y1 - this.thisScale.minYOnScale) / (this.thisScale.maxYOnScale - this.thisScale.minYOnScale);
var f2 = (y2 - this.thisScale.minYOnScale) / (this.thisScale.maxYOnScale - this.thisScale.minYOnScale);
var sd =  new Array(this.scaleData.length);
for (var i = 0; i < this.scaleData.length; i++) sd[i] = (iSelected >= 0 && i != iSelected ? this.scaleData[i] :  new JSV.common.ScaleData());

JSV.common.ScaleData.copyScaleFactors(this.scaleData, sd);
JSV.common.ScaleData.copyYScales(this.scaleData, sd);
for (var i = 0; i < this.scaleData.length; i++) {
if (iSelected >= 0 && i != iSelected) continue;
sd[i].isShiftZoomedY = true;
sd[i].minYOnScale = this.scaleData[i].minYOnScale * (1 - f1) + f1 * this.scaleData[i].maxYOnScale;
sd[i].maxYOnScale = this.scaleData[i].minYOnScale * (1 - f2) + f2 * this.scaleData[i].maxYOnScale;
}
return sd;
}, "~N,~B,~N,~N");
});
;//5.0.1-v7 Sat Feb 21 18:17:38 CST 2026
Clazz_declarePackage("JSV.common");
Clazz_declareInterface(JSV.common, "XYScaleConverter");
;//5.0.1-v7 Sat Feb 21 18:17:38 CST 2026
Clazz_declarePackage("JSV.common");
(function(){
var c$ = Clazz_declareType(JSV.common, "ZoomEvent", null);
Clazz_overrideMethod(c$, "set", 
function(viewer){
this.vwr = viewer;
return this;
}, "JSV.common.JSViewer");
Clazz_overrideMethod(c$, "getFile", 
function(fileName, panelOrFrame, isSave){
var f = null;
fileName = JU.PT.rep(fileName, "=", "_");
{
f = prompt("Enter a file name:", fileName);
}return (f == null ? null :  new JSV.js2d.JsFile(f));
}, "~S,~O,~B");
Clazz_overrideMethod(c$, "setDirLastExported", 
function(name){
return name;
}, "~S");
Clazz_overrideMethod(c$, "setFileChooser", 
function(pdf){
}, "JSV.common.ExportType");
Clazz_overrideMethod(c$, "showFileOpenDialog", 
function(panelOrFrame, userData){
JSV.common.JSViewer.jsmolObject.loadFileAsynchronously(this, this.vwr.html5Applet, "?", userData);
return null;
}, "~O,~A");
Clazz_defineMethod(c$, "setData", 
function(fileName, data, userInfo){
if (fileName == null) return;
if (data == null) {
this.vwr.selectedPanel.showMessage(fileName, "File Open Error");
return;
}var script = (userInfo == null ? null : "");
var isAppend = false;
{
isAppend = userInfo[0];
script = userInfo[1];
}this.vwr.si.siOpenDataOrFile( String.instantialize(data), "cache://" + fileName, null, null, -1, -1, isAppend, null, null);
if (script != null) this.vwr.runScript(script);
}, "~S,~O,~A");
Clazz_overrideMethod(c$, "getUrlFromDialog", 
function(info, msg){
{
return prompt(info, msg);
}}, "~S,~S");
});
;//5.0.1-v7 Sat Feb 21 18:17:38 CST 2026
Clazz_declarePackage("JSV.js2d");
(function(){
var c$ = Clazz_declareType(JSV.js2d, "JsFont", null);
c$.newFont = Clazz_defineMethod(c$, "newFont", 
function(fontFace, isBold, isItalic, fontSize, type){
fontFace = (fontFace.equals("Monospaced") ? "Courier" : fontFace.startsWith("Sans") ? "Sans-Serif" : "Serif");
return (isBold ? "bold " : "") + (isItalic ? "italic " : "") + fontSize + type + " " + fontFace;
}, "~S,~B,~B,~N,~S");
c$.getFontMetrics = Clazz_defineMethod(c$, "getFontMetrics", 
function(font, context){
{
if (context.font != font.font) {
context.font = font.font;
font.font = context.font;
context._fontAscent = Math.ceil(font.fontSize); //pt, not px
context._fontDescent = Math.ceil(font.fontSize * 0.25);//approx
}
}return context;
}, "JU.Font,~O");
c$.getAscent = Clazz_defineMethod(c$, "getAscent", 
function(context){
{
return Math.ceil(context._fontAscent);
}}, "~O");
c$.getDescent = Clazz_defineMethod(c$, "getDescent", 
function(context){
{
return Math.ceil(context._fontDescent);
}}, "~O");
c$.stringWidth = Clazz_defineMethod(c$, "stringWidth", 
function(font, text){
{
font.fontMetrics.font = font.font;
return Math.ceil(font.fontMetrics.measureText(text).width);
}}, "JU.Font,~S");
})();
;//5.0.1-v7 Sat Feb 21 18:17:38 CST 2026
Clazz_declarePackage("JSV.js2d");
Clazz_load(["J.api.GenericGraphics"], "JSV.js2d.JsG2D", ["JU.CU", "JSV.common.JSViewer", "JS.Color"], function(){
var c$ = Clazz_decorateAsClass(function(){
this.windowWidth = 0;
this.windowHeight = 0;
this.isShifted = false;
this.inPath = false;
Clazz_instantialize(this, arguments);}, JSV.js2d, "JsG2D", null, J.api.GenericGraphics);
;(function(){
var c$ = Clazz_decorateAsClass(function(){
this.table = null;
this.map = null;
Clazz_instantialize(this, arguments);}, JSV.source.JDXHeader, "DataLDRTable", null);
Clazz_makeConstructor(c$, 
function(){
this.table =  new JU.Lst();
this.map =  new java.util.Hashtable();
});
Clazz_defineMethod(c$, "addHeader", 
function(label, value){
var pt = this.map.get(label);
if (pt == null) {
pt = Integer.$valueOf(this.table.size());
this.table.addLast( Clazz_newArray(-1, [label, value, JSV.source.JDXSourceStreamTokenizer.cleanLabel(label)]));
this.map.put(label, pt);
} else {
var entry = this.table.get(pt.intValue());
entry[1] = value;
}}, "~S,~S");
