var lorem = require('lorem-ipsum');
document.body.innerHTML = '<span id="test"></span><span id="content"></span>';
var content = document.getElementById('content');
var testSpan = document.getElementById('test');

var c = document.createElement('canvas');
var ctx = c.getContext("2d");
var letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ.,|[]-+1234567890';
var alphabet = letters.split('');
var txt;
var fontFamilies = [];

var fonts = [
  'Arial',
  'Book Antiqua',
  'Calibri',
  'Geneva',
  'Georgia',
  'Impact',
  'Optima',
  'Palatino',
  'Tahoma',
  'Times New Roman',
  'Verdana'
];

var fontSizes = [8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30];

for (var i = 0, l = fonts.length; i < l - 1; i++) {
  var f = fonts[i];
  for (var j = 0, l = fontSizes.length; j < l; j++) {
    var v = fontSizes[j];
    fontFamilies.push([v, "px", " ", f].join(''));
  }
}

function measureSizes() {
  var sizes = alphabet.reduce(function(prev, c) {
    testSpan.innerText = c;
    prev[c] = testSpan.getBoundingClientRect().width;
    return prev;
  }, {});

  // add space
  testSpan.innerHTML = "&nbsp;";
  sizes[" "] = testSpan.getBoundingClientRect().width;
  return sizes;
}

function setFont(font, cb) {
  ctx.font = font;
  document.body.style = 'font: ' + font;
  cb();
}

function getComputedWidth(str, sizes) {
  var chars = str.split('');
  return chars.reduce(function(prev, thing) {
    return prev + sizes[thing];
  }, 0);
}

function getRectWidth(str) {
  content.innerText = str;
  return content.getBoundingClientRect().width;
}

function getCanvasWidth(str) {
  return ctx.measureText(str).width
}

function getRandWords() {
  return lorem({
      count: Math.floor( Math.random() * 3 )
    , units: 'words'
    , format: 'plain'
    , random: Math.random
  });
}

function measureAll(str, sizes) {
  var computed = getComputedWidth(str, sizes);
  var rect = getRectWidth(str);
  //console.log([computed, rect, getCanvasWidth(str)]);
  console.log('computed/rect', (computed / rect));
}

function measureAtFont(font, words) {
  sizes = measureSizes();
  setFont(font, function() {
    measureAll(words, sizes);
  });
}

fontFamilies.forEach(function(family) {
  var words = getRandWords();
  console.log([family, words])
  measureAtFont(family, words);
});
