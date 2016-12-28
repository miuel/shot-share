var page = require('page');
var empty = require('empty-element');
var template = require('./template');
var title = require('title');
var request = require('superagent');
var header = require('../header');
var picture = require('../picture-card');
var axios = require('axios');
var io = require('socket.io-client');
var utils = require('../utils');

var socket = io.connect('http://ws.shotandshare.com')

page('/', utils.loadAuth, header, asyncLoad, function (ctx, next) {
  title('Shot & Share');
  var main = document.getElementById('main-container');

  empty(main).appendChild(template(ctx.pictures));
})

socket.on('image', function (image) {
  var picturesEl = document.getElementById('pictures-container');
  var first = picturesEl.firstChild;
  var img = picture(image);
  picturesEl.insertBefore(img, first);
});

async function asyncLoad(ctx, next) {
  try {
    ctx.pictures = await fetch('/api/pictures').then(res => res.json());
    next();
  } catch (err) {
    return console.log(err);
  }
}

// UTILIZANDO promesas con Fetch

// function loadPicturesFetch (ctx, next) {
//  fetch('/api/pictures')
//    .then(function (res) {
//      return res.json();
//    })
//    .then(function (pictures) {
//      ctx.pictures = pictures;  
//      next();
//    })
//    .catch(function(err) {
//      console.log(err);
//    })
// }


// ESTAS SON OTROS TIPOS DE PROMESAS QUE SE PUEDEN USAR

// UTILIZANDO promesas con superagent

// function loadPictures (ctx, next) {
//  request
//    .get('/api/pictures')
//    .end(function(err, res) {
//      if (err) return console.log(err);

//      ctx.pictures = res.body;  
//      next();
//    })
// }


// UTILIZANDO promesas con axios

// function loadPicturesAxios (ctx, next) {
//  axios
//    .get('/api/pictures')
//    .then(function(res) {
//      ctx.pictures = res.data;  
//      next();
//    })
//    .catch(function(err) {
//      console.log(err);
//    })
// }