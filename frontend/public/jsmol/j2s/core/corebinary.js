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
Clazz_load(["java.io.FilterInputStream"], "java.io.PushbackInputStream", null, function(){
var c$ = Clazz_decorateAsClass(function(){
this.buf = null;
this.pos = 0;
Clazz_instantialize(this, arguments);}, java.io, "PushbackInputStream", java.io.FilterInputStream);
Clazz_makeConstructor(c$, 
function($in, size){
Clazz_superConstructor(this, java.io.PushbackInputStream, [$in]);
if (size <= 0) {
throw  new IllegalArgumentException("size <= 0");
}this.buf =  Clazz_newByteArray (size, 0);
this.pos = size;
}, "java.io.InputStream,~N");
Clazz_defineMethod(c$, "ensureOpen", 
function(){
if (this.$in == null) throw  new java.io.IOException("Stream closed");
});
Clazz_overrideMethod(c$, "readByteAsInt", 
function(){
this.ensureOpen();
if (this.pos < this.buf.length) {
return this.buf[this.pos++] & 0xff;
}return this.$in.readByteAsInt();
});
Clazz_defineMethod(c$, "read", 
function(b, off, len){
this.ensureOpen();
if (b == null) {
throw  new NullPointerException();
} else if (off < 0 || len < 0 || len > b.length - off) {
throw  new IndexOutOfBoundsException();
} else if (len == 0) {
return 0;
}var avail = this.buf.length - this.pos;
if (avail > 0) {
if (len < avail) {
avail = len;
}System.arraycopy(this.buf, this.pos, b, off, avail);
this.pos += avail;
off += avail;
len -= avail;
}if (len > 0) {
len = this.$in.read(b, off, len);
if (len == -1) {
return avail == 0 ? -1 : avail;
}return avail + len;
}return avail;
}, "~A,~N,~N");
Clazz_defineMethod(c$, "unreadByte", 
function(b){
this.ensureOpen();
if (this.pos == 0) {
throw  new java.io.IOException("Push back buffer is full");
}this.buf[--this.pos] = b;
}, "~N");
Clazz_defineMethod(c$, "unread", 
function(b, off, len){
this.ensureOpen();
if (len > this.pos) {
throw  new java.io.IOException("Push back buffer is full");
}this.pos -= len;
System.arraycopy(b, off, this.buf, this.pos, len);
}, "~A,~N,~N");
Clazz_overrideMethod(c$, "available", 
function(){
this.ensureOpen();
var n = this.buf.length - this.pos;
var avail = this.$in.available();
return n > (2147483647 - avail) ? 2147483647 : n + avail;
});
Clazz_overrideMethod(c$, "skip", 
function(n){
this.ensureOpen();
if (n <= 0) {
return 0;
}var pskip = this.buf.length - this.pos;
if (pskip > 0) {
if (n < pskip) {
pskip = n;
}this.pos += pskip;
n -= pskip;
}if (n > 0) {
pskip += this.$in.skip(n);
}return pskip;
}, "~N");
Clazz_overrideMethod(c$, "markSupported", 
function(){
return false;
});
Clazz_overrideMethod(c$, "mark", 
function(readlimit){
}, "~N");
Clazz_overrideMethod(c$, "reset", 
function(){
throw  new java.io.IOException("mark/reset not supported");
});
Clazz_overrideMethod(c$, "close", 
function(){
if (this.$in == null) return;
this.$in.close();
this.$in = null;
this.buf = null;
});
});
;//5.0.1-v7 Mon May 12 23:42:45 CDT 2025
Clazz_load(["java.io.DataInput", "$.FilterInputStream"], "java.io.DataInputStream", ["java.io.PushbackInputStream"], function(){
var c$ = Clazz_decorateAsClass(function(){
this.bytearr = null;
this.chararr = null;
this.readBuffer = null;
this.lineBuffer = null;
Clazz_instantialize(this, arguments);}, java.io, "DataInputStream", java.io.FilterInputStream, java.io.DataInput);
Clazz_prepareFields (c$, function(){
this.bytearr =  Clazz_newByteArray (80, 0);
this.chararr = String.fromCharCode( Clazz_newCharArray (80, '\0'));
this.readBuffer =  Clazz_newByteArray (8, 0);
});
Clazz_overrideMethod(c$, "read", 
function(b, off, len){
return this.$in.read(b, off, len);
}, "~A,~N,~N");
Clazz_defineMethod(c$, "readDIS", 
function(b, off, len){
var is = this.$in;
{
if (is.readBIS) return is.readBIS(b, off, len);
if (is.readBAIS)
return is.readBAIS(b, off, len);
}return is.read(b, off, len);
}, "~A,~N,~N");
Clazz_defineMethod(c$, "readFully", 
function(b, off, len){
if (len < 0) throw  new IndexOutOfBoundsException();
var n = 0;
while (n < len) {
var count = this.$in.read(b, off + n, len - n);
if (count < 0) throw  new java.io.EOFException();
n += count;
}
}, "~A,~N,~N");
Clazz_overrideMethod(c$, "skipBytes", 
function(n){
var total = 0;
var cur = 0;
while ((total < n) && ((cur = this.$in.skip(n - total)) > 0)) {
total += cur;
}
return total;
}, "~N");
Clazz_overrideMethod(c$, "readBoolean", 
function(){
var ch = this.$in.readByteAsInt();
if (ch < 0) throw  new java.io.EOFException();
return (ch != 0);
});
Clazz_overrideMethod(c$, "readByte", 
function(){
var ch = this.$in.readByteAsInt();
if (ch < 0) throw  new java.io.EOFException();
return (ch);
});
Clazz_overrideMethod(c$, "readUnsignedByte", 
function(){
var ch = this.$in.readByteAsInt();
if (ch < 0) throw  new java.io.EOFException();
return ch;
});
Clazz_overrideMethod(c$, "readShort", 
function(){
var ch1 = this.$in.readByteAsInt();
var ch2 = this.$in.readByteAsInt();
if ((ch1 | ch2) < 0) throw  new java.io.EOFException();
var n = ((ch1 << 8) + (ch2 << 0));
{
return (n > 0x7FFF ? n - 0x10000 : n);
}});
Clazz_defineMethod(c$, "readUnsignedShort", 
function(){
var ch1 = this.$in.readByteAsInt();
var ch2 = this.$in.readByteAsInt();
if ((ch1 | ch2) < 0) throw  new java.io.EOFException();
return (ch1 << 8) + (ch2 << 0);
});
Clazz_overrideMethod(c$, "readChar", 
function(){
var ch1 = this.$in.readByteAsInt();
var ch2 = this.$in.readByteAsInt();
if ((ch1 | ch2) < 0) throw  new java.io.EOFException();
return String.fromCharCode((ch1 << 8) + (ch2 << 0));
});
Clazz_overrideMethod(c$, "readInt", 
function(){
var ch1 = this.$in.readByteAsInt();
var ch2 = this.$in.readByteAsInt();
var ch3 = this.$in.readByteAsInt();
var ch4 = this.$in.readByteAsInt();
if ((ch1 | ch2 | ch3 | ch4) < 0) throw  new java.io.EOFException();
var n = ((ch1 << 24) + (ch2 << 16) + (ch3 << 8) + (ch4 << 0));
{
return (n > 0x7FFFFFFF ? n - 0x100000000 : n);
}});
Clazz_overrideMethod(c$, "readLong", 
function(){
this.readFully(this.readBuffer, 0, 8);
return ((this.readBuffer[0] << 56) + ((this.readBuffer[1] & 255) << 48) + ((this.readBuffer[2] & 255) << 40) + ((this.readBuffer[3] & 255) << 32) + ((this.readBuffer[4] & 255) << 24) + ((this.readBuffer[5] & 255) << 16) + ((this.readBuffer[6] & 255) << 8) + ((this.readBuffer[7] & 255) << 0));
});
Clazz_overrideMethod(c$, "readFloat", 
function(){
return Float.intBitsToFloat(this.readInt());
});
Clazz_overrideMethod(c$, "readDouble", 
function(){
return Double.longBitsToDouble(this.readLong());
});
Clazz_overrideMethod(c$, "readLine", 
function(){
var buf = this.lineBuffer;
if (buf == null) {
buf = this.lineBuffer =  Clazz_newCharArray (128, '\0');
}var room = buf.length;
var offset = 0;
var c;
loop : while (true) {
switch (c = this.$in.readByteAsInt()) {
case -1:
case 10:
break loop;
case 13:
var c2 = this.$in.readByteAsInt();
if ((c2 != 10) && (c2 != -1)) {
if (!(Clazz_instanceOf(this.$in,"java.io.PushbackInputStream"))) {
this.$in =  new java.io.PushbackInputStream(this.$in, 1);
}(this.$in).unreadByte(c2);
}break loop;
default:
if (--room < 0) {
buf =  Clazz_newCharArray (offset + 128, '\0');
room = buf.length - offset - 1;
System.arraycopy(this.lineBuffer, 0, buf, 0, offset);
this.lineBuffer = buf;
}buf[offset++] = String.fromCharCode(c);
break;
}
}
if ((c == -1) && (offset == 0)) {
return null;
}return String.copyValueOf(buf, 0, offset);
});
Clazz_overrideMethod(c$, "readUTF", 
function(){
return java.io.DataInputStream.readUTFBytes(this, -1);
});
c$.readUTFBytes = Clazz_defineMethod(c$, "readUTFBytes", 
function($in, utflen){
var isByteArray = (utflen >= 0);
if (!isByteArray) utflen = $in.readUnsignedShort();
var bytearr = null;
var chararr = null;
if (Clazz_instanceOf($in,"java.io.DataInputStream")) {
var dis = $in;
if (dis.bytearr.length < utflen) {
dis.bytearr =  Clazz_newByteArray (isByteArray ? utflen : utflen * 2, 0);
dis.chararr =  Clazz_newCharArray (dis.bytearr.length, '\0');
}chararr = dis.chararr;
bytearr = dis.bytearr;
} else {
bytearr =  Clazz_newByteArray (utflen, 0);
chararr =  Clazz_newCharArray (utflen, '\0');
}var c;
var char2;
var char3;
var count = 0;
var chararr_count = 0;
$in.readFully(bytearr, 0, utflen);
while (count < utflen) {
c = bytearr[count] & 0xff;
if (c > 127) break;
count++;
chararr[chararr_count++] = String.fromCharCode(c);
}
while (count < utflen) {
c = bytearr[count] & 0xff;
switch (c >> 4) {
case 0:
case 1:
case 2:
case 3:
case 4:
case 5:
case 6:
case 7:
count++;
chararr[chararr_count++] = String.fromCharCode(c);
break;
case 12:
case 13:
count += 2;
if (count > utflen) throw  new java.io.UTFDataFormatException("malformed input: partial character at end");
char2 = bytearr[count - 1];
if ((char2 & 0xC0) != 0x80) throw  new java.io.UTFDataFormatException("malformed input around byte " + count);
chararr[chararr_count++] = String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
break;
case 14:
count += 3;
if (count > utflen) throw  new java.io.UTFDataFormatException("malformed input: partial character at end");
char2 = bytearr[count - 2];
char3 = bytearr[count - 1];
if (((char2 & 0xC0) != 0x80) || ((char3 & 0xC0) != 0x80)) throw  new java.io.UTFDataFormatException("malformed input around byte " + (count - 1));
chararr[chararr_count++] = String.fromCharCode(((c & 0x0F) << 12) | ((char2 & 0x3F) << 6) | ((char3 & 0x3F) << 0));
break;
default:
throw  new java.io.UTFDataFormatException("malformed input around byte " + count);
}
}
return  String.instantialize(chararr, 0, chararr_count);
}, "java.io.DataInput,~N");
});
;//5.0.1-v7 Mon May 12 23:42:45 CDT 2025
Clazz_declarePackage("JU");
(function(){
var c$ = Clazz_declareType(JU, "BC", null);
