const { min } = require("lodash");
var _ = require("lodash");

var methods = {
  instatags: {
    evalHashtagFrequency: function (data) {
      var tags = {};

      data.forEach(function (media) {
        media.tags.forEach(function (tag) {
          if (tags[tag]) tags[tag]++;
          else tags[tag] = 1;
        });
      });

      // Here we transform the tags object into an array, so we'll be able to sort it.
      var sortable = [];
      for (var tag in tags) {
        sortable.push({
          tag: tag,
          freq: tags[tag],
        });
      }

      // Finally we have to sort the array in descending order (higher frequencies first),
      // and return it. Check the "Array.prototype.sort()" docs.
      return sortable.sort(function (a, b) {
        return b.freq - a.freq;
      });
    },

    filterTags: function (tags, minFrequency) {
      var filtered = [];
      console.log(tags, minFrequency);
      tags.forEach(function (tag) {
        console.log(tag);
        console.log(tag.freq >= minFrequency);
        if (tag.freq >= minFrequency) filtered.push(tag);
      });
      console.log(filtered);
      return filtered;
    },

    filterMedia: function (userMedia, tag) {
      console.log(userMedia);
      var filtered = [];
      userMedia.forEach(function (media) {
        console.log(media);
        console.log(tag);
        console.log(media.tags.includes(tag));
        if (media.tags.includes(tag)) filtered.push(media);
      });
      console.log(filtered);
      return filtered;
    },
  },

  underline: {
    max: function (list, iteratee, context) {
      if (!list.length) return -Infinity;
      if (iteratee) {
        var newIteratee = iteratee.bind(context);
        iteratee = newIteratee;
      }
      return Math.max(..._.map(list, iteratee));
    },

    min: function (list, iteratee, context) {
      if (!list.length) return Infinity;
      if (iteratee) {
        var newIteratee = iteratee.bind(context);
        iteratee = newIteratee;
      }
      return Math.min(..._.map(list, iteratee));
    },

    size: function (list) {
      if (!list.length && list instanceof Array) return 0;
      return Object.keys(list).length;
    },
  },
};
module.exports = methods;
methods.instatags.filterTags(
  [
    { tagId: "bootcamp", freq: 10 },
    { tagId: "student", freq: 21 },
    { tagId: "coffee", freq: 27 },
  ],
  15
);

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
);

console.log(
  [
    { tagId: "bootcamp", freq: 10 },
    { tagId: "student", freq: 21 },
    { tagId: "coffee", freq: 27 },
  ].includes({ tagId: "bootcamp", freq: 10 })
);
//array = [1, 2, 3];
//array2 = [1, 2, 3 ];
//testing something else
