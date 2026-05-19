Clazz.declarePackage("JU");
(function(){
var c$ = Clazz.decorateAsClass(function(){
this.a = null;
this.m = 0;
this.n = 0;
if (!Clazz.isClassDefined("JU.Matrix.LUDecomp")) {
JU.Matrix.$Matrix$LUDecomp$ ();
}
Clazz.instantialize(this, arguments);}, JU, "Matrix", null, Cloneable);
Clazz.makeConstructor(c$, 
function(a, m, n){
this.a = (a == null ?  Clazz.newDoubleArray (m, n, 0) : a);
this.m = m;
this.n = n;
}, "~A,~N,~N");
Clazz.defineMethod(c$, "getRowDimension", 
function(){
return this.m;
});
Clazz.defineMethod(c$, "getColumnDimension", 
function(){
return this.n;
});
Clazz.defineMethod(c$, "getArray", 
function(){
return this.a;
});
Clazz.defineMethod(c$, "getArrayCopy", 
function(){
var x =  Clazz.newDoubleArray (this.m, this.n, 0);
for (var i = this.m; --i >= 0; ) for (var j = this.n; --j >= 0; ) x[i][j] = this.a[i][j];


return x;
});
Clazz.defineMethod(c$, "copy", 
function(){
var x =  new JU.Matrix(null, this.m, this.n);
var c = x.a;
for (var i = this.m; --i >= 0; ) for (var j = this.n; --j >= 0; ) c[i][j] = this.a[i][j];


return x;
});
Clazz.overrideMethod(c$, "clone", 
function(){
return this.copy();
});
Clazz.defineMethod(c$, "getSubmatrix", 
function(i0, j0, nrows, ncols){
var x =  new JU.Matrix(null, nrows, ncols);
var xa = x.a;
for (var i = nrows; --i >= 0; ) for (var j = ncols; --j >= 0; ) xa[i][j] = this.a[i0 + i][j0 + j];


return x;
}, "~N,~N,~N,~N");
Clazz.defineMethod(c$, "getMatrixSelected", 
function(r, n){
var x =  new JU.Matrix(null, r.length, n);
var xa = x.a;
for (var i = r.length; --i >= 0; ) {
var b = this.a[r[i]];
for (var j = n; --j >= 0; ) xa[i][j] = b[j];

}
return x;
}, "~A,~N");
Clazz.defineMethod(c$, "transpose", 
function(){
var x =  new JU.Matrix(null, this.n, this.m);
var c = x.a;
for (var i = this.m; --i >= 0; ) for (var j = this.n; --j >= 0; ) c[j][i] = this.a[i][j];


return x;
});
Clazz.defineMethod(c$, "add", 
function(b){
return this.scaleAdd(b, 1);
}, "JU.Matrix");
Clazz.defineMethod(c$, "sub", 
function(b){
return this.scaleAdd(b, -1);
}, "JU.Matrix");
Clazz.defineMethod(c$, "scaleAdd", 
function(b, scale){
var x =  new JU.Matrix(null, this.m, this.n);
var xa = x.a;
var ba = b.a;
for (var i = this.m; --i >= 0; ) for (var j = this.n; --j >= 0; ) xa[i][j] = ba[i][j] * scale + this.a[i][j];


return x;
}, "JU.Matrix,~N");
Clazz.defineMethod(c$, "mul", 
function(b){
if (b.m != this.n) return null;
var x =  new JU.Matrix(null, this.m, b.n);
var xa = x.a;
var ba = b.a;
for (var j = b.n; --j >= 0; ) for (var i = this.m; --i >= 0; ) {
var arowi = this.a[i];
var s = 0;
for (var k = this.n; --k >= 0; ) s += arowi[k] * ba[k][j];

xa[i][j] = s;
}

return x;
}, "JU.Matrix");
Clazz.defineMethod(c$, "inverse", 
function(){
return Clazz.innerTypeInstance(JU.Matrix.LUDecomp, this, null, this.m, this.n).solve(JU.Matrix.identity(this.m, this.m), this.n);
});
Clazz.defineMethod(c$, "trace", 
function(){
var t = 0;
for (var i = Math.min(this.m, this.n); --i >= 0; ) t += this.a[i][i];

return t;
});
c$.identity = Clazz.defineMethod(c$, "identity", 
function(m, n){
var x =  new JU.Matrix(null, m, n);
var xa = x.a;
for (var i = Math.min(m, n); --i >= 0; ) xa[i][i] = 1;

return x;
}, "~N,~N");
Clazz.defineMethod(c$, "getRotation", 
function(){
return this.getSubmatrix(0, 0, this.m - 1, this.n - 1);
});
Clazz.defineMethod(c$, "getTranslation", 
function(){
return this.getSubmatrix(0, this.n - 1, this.m - 1, 1);
});
c$.newT = Clazz.defineMethod(c$, "newT", 
function(r, asColumn){
return (asColumn ?  new JU.Matrix( Clazz.newArray(-1, [ Clazz.newDoubleArray(-1, [r.x]),  Clazz.newDoubleArray(-1, [r.y]),  Clazz.newDoubleArray(-1, [r.z])]), 3, 1) :  new JU.Matrix( Clazz.newArray(-1, [ Clazz.newDoubleArray(-1, [r.x, r.y, r.z])]), 1, 3));
}, "JU.T3,~B");
Clazz.overrideMethod(c$, "toString", 
function(){
var s = "[\n";
for (var i = 0; i < this.m; i++) {
s += "  [";
for (var j = 0; j < this.n; j++) s += " " + this.a[i][j];

s += "]\n";
}
s += "]";
return s;
});
c$.$Matrix$LUDecomp$ = function(){
})();
};
})();
;//5.0.1-v7 Sat Feb 21 18:17:38 CST 2026
