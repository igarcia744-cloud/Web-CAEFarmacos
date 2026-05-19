Clazz.declarePackage("JSV.source");
Clazz.load(null, "JSV.source.XMLParser", ["java.util.Hashtable", "JU.SB"], function(){
var c$ = Clazz.decorateAsClass(function(){
this.thisEvent = null;
this.buffer = null;
if (!Clazz.isClassDefined("JSV.source.XMLParser.DataBuffer")) {
JSV.source.XMLParser.$XMLParser$DataBuffer$ ();
}
if (!Clazz.isClassDefined("JSV.source.XMLParser.DataString")) {
JSV.source.XMLParser.$XMLParser$DataString$ ();
}
if (!Clazz.isClassDefined("JSV.source.XMLParser.XmlEvent")) {
JSV.source.XMLParser.$XMLParser$XmlEvent$ ();
}
if (!Clazz.isClassDefined("JSV.source.XMLParser.Tag")) {
JSV.source.XMLParser.$XMLParser$Tag$ ();
}
Clazz.instantialize(this, arguments);}, JSV.source, "XMLParser", null);
Clazz.prepareFields (c$, function(){
this.thisEvent = Clazz.innerTypeInstance(JSV.source.XMLParser.XmlEvent, this, null, 0);
});
Clazz.makeConstructor(c$, 
function(br){
if (br == null) return;
this.buffer = Clazz.innerTypeInstance(JSV.source.XMLParser.DataBuffer, this, null, br);
}, "java.io.BufferedReader");
Clazz.defineMethod(c$, "getBufferData", 
function(){
return (this.buffer == null ? null : this.buffer.data.toString().substring(0, this.buffer.ptr));
});
Clazz.defineMethod(c$, "thisValue", 
function(){
return this.buffer.nextEvent().toString().trim();
});
Clazz.defineMethod(c$, "qualifiedValue", 
function(){
this.buffer.nextTag();
var value = this.buffer.nextEvent().toString().trim();
this.buffer.nextTag();
return value;
});
Clazz.defineMethod(c$, "peek", 
function(){
this.thisEvent = this.buffer.peek();
return this.thisEvent.getEventType();
});
Clazz.defineMethod(c$, "hasNext", 
function(){
return this.buffer.hasNext();
});
Clazz.defineMethod(c$, "nextTag", 
function(){
while ((this.thisEvent = this.buffer.nextTag()).eventType == 6) {
}
});
Clazz.defineMethod(c$, "nextEvent", 
function(){
this.thisEvent = this.buffer.nextEvent();
return this.thisEvent.getEventType();
});
Clazz.defineMethod(c$, "nextStartTag", 
function(){
this.thisEvent = this.buffer.nextTag();
while (!this.thisEvent.isStartElement()) this.thisEvent = this.buffer.nextTag();

});
Clazz.defineMethod(c$, "getTagName", 
function(){
return this.thisEvent.getTagName();
});
Clazz.defineMethod(c$, "getTagType", 
function(){
return this.thisEvent.getTagType();
});
Clazz.defineMethod(c$, "getEndTag", 
function(){
return this.thisEvent.getTagName();
});
Clazz.defineMethod(c$, "nextValue", 
function(){
this.buffer.nextTag();
return this.buffer.nextEvent().toString().trim();
});
Clazz.defineMethod(c$, "getAttributeList", 
function(){
return this.thisEvent.toString().toLowerCase();
});
Clazz.defineMethod(c$, "getAttrValueLC", 
function(key){
return this.getAttrValue(key).toLowerCase();
}, "~S");
Clazz.defineMethod(c$, "getAttrValue", 
function(name){
var a = this.thisEvent.getAttributeByName(name);
return (a == null ? "" : a);
}, "~S");
Clazz.defineMethod(c$, "getCharacters", 
function(){
var sb =  new JU.SB();
this.thisEvent = this.buffer.peek();
var eventType = this.thisEvent.getEventType();
while (eventType != 4) this.thisEvent = this.buffer.nextEvent();

while (eventType == 4) {
this.thisEvent = this.buffer.nextEvent();
eventType = this.thisEvent.getEventType();
if (eventType == 4) sb.append(this.thisEvent.toString());
}
return sb.toString();
});
Clazz.defineMethod(c$, "getOuterXML", 
function(){
var pt = this.buffer.pt0;
var myName = this.thisEvent.getTagName();
this.thisEvent = this.buffer.peek();
while (this.thisEvent.getEventType() != 2 || !this.thisEvent.getTagName().equals(myName)) {
this.thisEvent = this.buffer.newXmlEvent();
}
return this.buffer.data.substring2(pt, this.buffer.ptEnd);
});
Clazz.defineMethod(c$, "getInnerXML", 
function(){
var pt = this.buffer.data.length();
var pt1 = pt;
var pt2 = pt;
var myName = this.thisEvent.getTagName();
this.thisEvent = this.buffer.peek();
while (this.thisEvent.getEventType() != 2 || !this.thisEvent.getTagName().equals(myName)) {
pt2 = pt1;
pt1 = this.buffer.data.length();
this.thisEvent = this.buffer.newXmlEvent();
}
return this.buffer.data.substring2(pt, pt2);
});
Clazz.defineMethod(c$, "requiresEndTag", 
function(){
var tagType = this.thisEvent.getTagType();
return tagType != 3 && tagType != 6;
});
c$.$XMLParser$DataBuffer$ = function(){
})();
};
c$.$XMLParser$DataString$ = function(){
})();
};
c$.$XMLParser$XmlEvent$ = function(){
})();
};
c$.$XMLParser$Tag$ = function(){
Clazz.makeConstructor(c$, 
function(fulltag){
this.text = fulltag;
this.tagType = (fulltag.startsWith("<!--") ? 6 : fulltag.charAt(1) == '/' ? 2 : fulltag.charAt(fulltag.length - 2) == '/' ? 3 : 1);
}, "~S");
Clazz.defineMethod(c$, "getName", 
function(){
if (this.name != null) return this.name;
var ptTemp = (this.tagType == 2 ? 2 : 1);
var n = this.text.length - (this.tagType == 3 ? 2 : 1);
while (ptTemp < n && Character.isWhitespace(this.text.charAt(ptTemp))) ptTemp++;

var pt0 = ptTemp;
while (ptTemp < n && !Character.isWhitespace(this.text.charAt(ptTemp))) ptTemp++;

return this.name = this.text.substring(pt0, ptTemp).toLowerCase().trim();
});
Clazz.defineMethod(c$, "getAttributeByName", 
function(attrName){
if (this.attributes == null) this.getAttributes();
return this.attributes.get(attrName.toLowerCase());
}, "~S");
Clazz.defineMethod(c$, "getAttributes", 
function(){
this.attributes =  new java.util.Hashtable();
var d = Clazz.innerTypeInstance(JSV.source.XMLParser.DataString, this, null,  new JU.SB().append(this.text));
try {
if (d.skipTo(' ', false) < 0) return;
var pt0;
while ((pt0 = ++d.ptr) >= 0) {
if (d.skipTo('=', false) < 0) return;
var name = d.substring(pt0, d.ptr).trim().toLowerCase();
d.skipTo('"', false);
pt0 = ++d.ptr;
d.skipTo('"', true);
var attr = d.substring(pt0, d.ptr);
this.attributes.put(name, attr);
var pt1 = name.indexOf(":");
if (pt1 >= 0) {
name = name.substring(pt1).trim();
this.attributes.put(name, attr);
}}
} catch (e) {
if (Clazz.exceptionOf(e, Exception)){
} else {
throw e;
}
}
});
