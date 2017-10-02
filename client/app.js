angular.module('p2',['ngRoute','ngResource', 'p2.controllers', 'p2.factories', 'p2.services', 'p2.Directives'])
.config(['$locationProvider', '$routeProvider',function($locationProvider, $routeProvider){
    
    $locationProvider.html5Mode(true);
    $routeProvider
    .when('/', {
        templateUrl: 'views/photoWelcome.html',
        controller: ''
    })
     .when('/resume', {
        templateUrl: 'views/resume.html',
        controller: ''
    })
    .when('/gallery', {
        templateUrl: 'views/photoGallery.html',
        controller: ''
    })
    .when('/galleries/Portraits',{
        templateUrl: 'views/portraitGallery.html',
        controller: 'PortraitsController'
    })
     .when('/galleries/PlacesThings',{
        templateUrl: 'views/placesThingsGallery.html',
        controller: 'PlacesThingsController'
    })
     .when('/galleries/LiveMusic',{
        templateUrl: 'views/LiveMusicGallery.html',
        controller: 'LiveMusicController'
    })
     .when('/galleries/Engagements',{
        templateUrl: 'views/EngagementsGallery.html',
        controller: 'EngagementsController'
    })
    .when('/contact', {
        templateUrl: 'views/contactMe.html',
        controller: 'EmailController'
    })
    .when('/photocode', {
        templateUrl: 'views/blogWelcome.html',
        controller: ''
    })
    
    .when('/login', {
        templateUrl:'views/login.html',
        controller:'LoginController'
    })
    .when('/posts',{
        templateUrl:'views/allPosts.html',
        controller:'allPostsController'
    })
    .when('/adminOnly', {
        templateUrl: 'views/userMGMT.html',
        controller:'UserMGMTController'
    })
    .when('/users',{
        templateUrl: 'views/userPage.html',
        controller: 'UserPageController'
    })
    .when('/editUser/:id',{
        templateUrl: 'views/editUser.html',
        controller: 'EditUserController'
    })
    .when('/compose', {
        templateUrl: 'views/composePost.html',
        controller: 'ComposePostController'
    })
    .when('/donate',{
        templateUrl: 'views/donate.html',
        controller: 'DonationController'
    })
    .when('/:id/update', {
        templateUrl: 'views/editPost.html',
        controller: 'EditPostController'
    })
    .when('/:id', {
        templateUrl: 'views/singlePost.html',
        controller: 'singlePostController'
    })
   
    .otherwise({
        redirectTo: '/'
    });
}])