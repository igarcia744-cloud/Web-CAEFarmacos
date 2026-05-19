Clazz.declarePackage("J.io");
Clazz.load(["J.api.JmolFilesReaderInterface"], "J.io.FilesReader", ["JU.Rdr", "J.api.Interface", "J.io.FileReader", "JU.Logger"], function(){
var c$ = Clazz.decorateAsClass(function(){
this.fm = null;
this.vwr = null;
this.fullPathNamesIn = null;
this.namesAsGivenIn = null;
this.fileTypesIn = null;
this.atomSetCollection = null;
this.dataReaders = null;
this.htParams = null;
this.isAppend = false;
Clazz.instantialize(this, arguments);}, J.io, "FilesReader", null, J.api.JmolFilesReaderInterface);
