Clazz.declarePackage("JU");
Clazz.load(["J.api.JmolAudioPlayer"], "JU.JmolAudio", ["JU.Logger", "JV.Viewer"], function(){
var c$ = Clazz.decorateAsClass(function(){
this.params = null;
this.myClip = null;
this.fileName = null;
this.vwr = null;
this.id = null;
this.autoClose = false;
Clazz.instantialize(this, arguments);}, JU, "JmolAudio", null, [J.api.JmolAudioPlayer]);
