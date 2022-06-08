"use strict";

require("chai").should();

var methods = require("../index.js");
var instatags = methods.instatags;
var underline = methods.underline;
var mocks = require('./mocks.js');

describe('Instatags', function () {
  
});

describe("Underline", function () {
  describe("max", function () {
    it("passed an array of numbers, returns the highest", () => {
      underline.max([1, 2, 3, 4, 5]).should.equal(5);
    });

    it("passed an object and iteratee, should use the iteratee", () => {
      underline
        .max(
          [
            { name: "moe", age: 40 },
            { name: "larry", age: 50 },
            { name: "curly", age: 60 },
          ],
          (obj) => {
            return obj.age;
          }
        )
        .should.equal(60);
    });

    it("should return -infinity if array is empty", () => {
      underline.max([]).should.equal(-Infinity);
    });
    it("should return -infinity if object is empty", () => {
      underline.max({}).should.equal(-Infinity);
    });
  });

  describe("min", function () {
    it("passed an array of numbers, returns the smallest", () => {
      underline.min([1, 2, 3, 4, 5]).should.equal(1);
    });

    it("passed an object and iteratee, should use the iteratee", () => {
      underline
        .min(
          [
            { name: "moe", age: 40 },
            { name: "larry", age: 50 },
            { name: "curly", age: 60 },
          ],
          (obj) => {
            return obj.age;
          }
        )
        .should.equal(40);
    });

    it("should return Infinity if array is empty", () => {
      underline.min([]).should.equal(Infinity);
    });
    it("should return Infinity if object is empty", () => {
      underline.min({}).should.equal(Infinity);
    });
  });

  describe("size", function () {
    it("given an array, returns array size", () => {
      underline.size([]).should.equal(0);
      underline.size([1, 2, 3, 4, 5]).should.equal(5);
      underline
        .size([
          { name: "moe", age: 40 },
          { name: "larry", age: 50 },
          { name: "curly", age: 60 },
        ])
        .should.equal(3);
    });
    it("given an object, returns object size", () => {
      underline.size({}).should.equal(0);
      underline.size({ name: "moe", age: 40 }).should.equal(2);
    });
    it("given a string, returns string size", () => {
      underline.size("ciao").should.equal(4);
      underline.size("").should.equal(0);
    });
  });
});
