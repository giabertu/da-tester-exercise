"use strict";

require("chai").should();

const { expect } = require("chai");
var methods = require("../index.js");
var instatags = methods.instatags;
var underline = methods.underline;
var mocks = require("./mocks.js");

describe("Instatags", function () {
  describe("evalHashtagFrequency", function () {
    it("should be an array", function () {
      methods.instatags.evalHashtagFrequency([]).should.be.a("array");
    });
  });

  describe("filterTags", function () {
    it("given an array of tags, return tags that have the mimimum frequency", function () {
      instatags
        .filterTags(
          [
            { tagId: "bootcamp", freq: 10 },
            { tagId: "student", freq: 21 },
            { tagId: "coffee", freq: 27 },
          ],
          15
        )
        .should.eql([
          { tagId: "student", freq: 21 },
          { tagId: "coffee", freq: 27 },
        ]);
    });
    it("should work on an empty array", function () {
      methods.instatags.filterTags([], 15).should.eql([]);
    });
    it("if not passed an array, throws error", function () {
      methods.instatags.filterTags
        .bind(({ tagId: "bootcamp", freq: 10 }, 15))
        .should.throw(TypeError);
    });
  });
  describe("filterMedia", function () {
    it("given an array of media, return medias that have a specific tag", function () {
      expect(
        methods.instatags.filterMedia(
          [
            {
              tags: [
                { tagId: "bootcamp", freq: 10 },
                { tagId: "student", freq: 21 },
                { tagId: "coffee", freq: 27 },
              ],
            },
            {
              tags: [
                { tagId: "bootcamp", freq: 10 },
                { tagId: "education", freq: 30 },
                { tagId: "health", freq: 80 },
              ],
            },
            {
              tags: [
                { tagId: "food", freq: 10 },
                { tagId: "drink", freq: 21 },
                { tagId: "computer", freq: 27 },
              ],
            },
          ],
          { tagId: "bootcamp", freq: 10 }
        ) ==
          [
            {
              tags: [
                { tagId: "bootcamp", freq: 10 },
                { tagId: "student", freq: 21 },
                { tagId: "coffee", freq: 27 },
              ],
            },
            {
              tags: [
                { tagId: "bootcamp", freq: 10 },
                { tagId: "education", freq: 30 },
                { tagId: "health", freq: 80 },
              ],
            },
          ]
      );
    });
    it("should work on an empty array", function () {
      methods.instatags.filterMedia([], 15).should.eql([]);
    });
    it("if not passed an array, throws error", function () {
      methods.instatags.filterMedia
        .bind(({ tagId: "bootcamp", freq: 10 }, 15))
        .should.throw(TypeError);
    });
  });
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
