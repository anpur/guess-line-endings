var assert = require("chai").assert;
var GuessLineEndings = require('../guess-line-endings.js'); 

describe("GuessLineEndings tests", function () {

    var getLineEnd = GuessLineEndings.prototype.getLineEnd; // (buffer, start, end, isEof) : position
    var a = 'a'.charCodeAt(0);
    var r = '\r'.charCodeAt(0);
    var n = '\n'.charCodeAt(0);   
    var z = 0; 
    var chunkSize = 6;    
  
    it("none", function() {        
        var buffer = [a, a, a, a, a, a, a];
        assert.equal(getLineEnd(buffer, 0, buffer.length, false), undefined);
    });
    it("LF", function() {        
        var buffer = [a, a, n, a, a, a, a];
        assert.equal(getLineEnd(buffer, 0, buffer.length, false), 2);
        var buffer = [a, a, a, a, a, a, n];
        assert.equal(getLineEnd(buffer, 0, buffer.length, false), 6);        
    });
    it("CRLF", function() {        
        var buffer = [a, r, n, a, a, a, a];
        assert.equal(getLineEnd(buffer, 0, buffer.length, false), 2);  
        buffer = [a, a, a, a, a, r, n];
        assert.equal(getLineEnd(buffer, 0, buffer.length, false), 6);        
    });
    it("CR", function() {
        var buffer = [a, a, r, a, a, a, a];
        assert.equal(getLineEnd(buffer, 0, buffer.length, false), 2);
        assert.equal(getLineEnd(buffer, 0, buffer.length, true), 2);
        buffer = [a, a, a, a, a, a, r];
        assert.equal(getLineEnd(buffer, 0, buffer.length, false), undefined);
        assert.equal(getLineEnd(buffer, 0, buffer.length, true), 6);
    });
    it("start", function() {        
        var buffer = [r, n, a, r, n, a, a];
        assert.equal(getLineEnd(buffer, 2, buffer.length, false), 4);
    });
    it("end", function() {        
        var buffer = [a, a, a, a, a, r, n];
        assert.equal(getLineEnd(buffer, 0, 4, false), undefined);
    });

    it("utf16le LF", function() {        
        var buffer = [a, z, a, z, n, z, a, z, a, z, a, z, a, z];
        assert.equal(getLineEnd(buffer, 0, buffer.length, false), 4);
        var buffer = [a, z, a, z, a, z, a, z, a, z, a, z, n, z];
        assert.equal(getLineEnd(buffer, 0, buffer.length, false), 12);        
    });
    it("utf16le CRLF", function() {        
        var buffer = [a, z, r, z, n, z, a, z, a, z, a, z, a, z];
        assert.equal(getLineEnd(buffer, 0, buffer.length, false), 4);  
        buffer = [a, z, a, z, a, z, a, z, a, z, r, z, n, z];
        assert.equal(getLineEnd(buffer, 0, buffer.length, false), 12);        
    });
    it("utf16le CR", function() {
        var buffer = [a, z, a, z, r, z, a, z, a, z, a, z, a, z];
        assert.equal(getLineEnd(buffer, 0, buffer.length, false), 4);
        assert.equal(getLineEnd(buffer, 0, buffer.length, true), 4);
        buffer = [a, z, a, z, a, z, a, z, a, z, a, z, r, z];
        assert.equal(getLineEnd(buffer, 0, buffer.length, false), undefined);
        assert.equal(getLineEnd(buffer, 0, buffer.length, true), 12);
    });
    it("utf16le start", function() {        
        var buffer = [r, z, n, z, a, z, r, z, n, z, a, z, a, z];
        assert.equal(getLineEnd(buffer, 2, buffer.length, false), 8);
    });
    it("utf16le end", function() {        
        var buffer = [a, z, a, z, a, z, a, z, a, z, r, z, n, z];
        assert.equal(getLineEnd(buffer, 0, 4, false), undefined);
    });

});