//------------------------------------------------//
//  Clouds routes                                 //
//------------------------------------------------//
var express = require('express');
var router = express.Router();
var WordCloud = require('../models/wordclouds');

function authenticate(req, res, next) {
  if(!req.isAuthenticated()) {
    res.redirect('/');
  }
  else {
    next();
  }
}

/*//New
router.get('/new', function(req,res,next){
  res.send('new');
});*/

// Clouds INDEX
router.get('/', authenticate, function(req, res, next) {
  // get all the todos and render the index view
  WordCloud.find({ private: false })
  .then(function(clouds) {
    res.render('clouds/index.ejs', { clouds: clouds, loggedIn: currentUser } );
  }, function(err) {
    return next(err);
  });
});

//------------------------------------------------//
//  Show a cloud from Gallery                     //
//------------------------------------------------//
router.get('/:id',function(req,res,next){
  WordCloud.findById(req.params.id)
  .then (function(wordCloud){
    if (!wordCloud) return next(makeError(res, "ID not found",404));
      res.render('clouds/cloudshow.ejs', {cloud: wordCloud, loggedIn: currentUser});
    },
    function(err){
      return next(err);
    });
});

/*
// CREATE
router.post('/', authenticate, function(req, res, next) {
  var wordCloud = new WordCloud({
    name: req.body.name,
    // tags: req.body.text
    tags: [
      { text: 'Tag1', weight: 1 },
      { text: 'Tag2', weight: 2 },
      { text: 'Tag3', weight: 3 }
    ],
    palette: 1,     // Number,
    private: true,  // Boolean,
    image: '',      // String,
    mask: ''        // String
  });
  wordCloud.save()
  .then(function(saved) {
    res.redirect('/');
  }, function(err) {
    return next(err);
  });
});



// UPDATE (reviewed)
router.put('/:id', authenticate,function(req, res, next) {
  WordCloud.findById(req.params.id)
  .then(function(wordCloud) {
    if (!wordCloud) return next(makeError(res, 'not found word', 404));
    wordCloud.name = req.body.name;

    return wordCloud.save(); //wordCloud is an instance of an Model thus lower case like snoopyu is a Dog
  })
  .then(function(saved) {
    res.redirect('/');
  }, function(err) {
    return next(err);
  });
});

// EDIT
router.get('/:id/edit', authenticate, function(req, res, next) {
  WordCloud.findById(req.params.id)
  .then(function(wordCloud) {
    if (!wordCloud) return next(makeError(res, 'Document not found', 404));
    //res.render('todos/edit', { todo: todo });
    res.send("editing wordCloud");
  }, function(err) {
    return next(err);
  });
});


// DESTROY
router.delete('/:id', authenticate, function(req, res, next) {
  WordCloud.findByIdAndRemove(req.params.id)
  .then(function() {
    res.redirect('/words');
  }, function(err) {
    return next(err);
  });
});*/


module.exports = router;
