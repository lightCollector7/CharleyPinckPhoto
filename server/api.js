var express = require('express');
var ctrlCategories = require('./controllers/categories.ctrl');
var ctrlUsers = require('./controllers/users.ctrl');
var ctrlPosts = require('./controllers/posts.ctrl');
var ctrlDonations = require('./controllers/donations.ctrl');
var ctrlEngagementPhotos = require('./controllers/engagementPhotos.ctrl');
var ctrlPortraitPhotos = require('./controllers/portraitPhotos.ctrl');
var ctrlPlacesThings = require('./controllers/placesThings.ctrl');
var ctrlLiveMusicPhotos = require('./controllers/liveMusicPhotos.ctrl');
var ctrlContact = require('./controllers/contact.ctrl');
var marked = require('marked');




var router = express.Router();

router
    .use('/categories', ctrlCategories)
    .use('/users', ctrlUsers)
    .use('/posts', ctrlPosts)
    .use('/donations', ctrlDonations)
    .use('/photos/engagements', ctrlEngagementPhotos)
    .use('/photos/portraits', ctrlPortraitPhotos)
    .use('/photos/placesThings', ctrlPlacesThings)
    .use('/photos/LiveMusic', ctrlLiveMusicPhotos)
    .use('/contact', ctrlContact);

module.exports = router;