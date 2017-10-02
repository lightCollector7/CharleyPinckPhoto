angular.module('p2.controllers', ['ui.bootstrap'])

.controller('UserListController', ['$scope', 'UserFactory', 'UserService', function($scope, UserFactory, UserService){
    UserService.requireLogin();
    $scope.users = UserFactory.query();
}])

.controller('LoginController', ['$scope', '$location', 'UserService', function($scope, $location, UserService) {
    UserService.me().then(function(me) {
        redirect();
    });
    function redirect() {
        var dest = $location.search().p;
        if (!dest) {
            dest = '/compose';
        }
        $location.path(dest).search('p', null).replace();
    }
    $scope.login = function() {
        UserService.login($scope.email, $scope.password)
        .then(function() {
            redirect();
        }, function(err) {
            console.log(err);
        });
    }
}])


.controller('allPostsController', ['$scope', 'blogPost', 'UserFactory', 'UserService','$route', function($scope, blogPost, UserFactory, UserService, $route) {
    UserService.isLoggedIn();
    $scope.loggedIn = false;
    UserService.me().then(function(me){
        $scope.ME = me;
        $scope.loggedIn = true;
    });
    $scope.logout = function () {
        UserService.logout().then(function(){
        $route.reload();
        });
    }

    
    function getPosts() {
        
        $scope.posts = blogPost.query();
        console.log($scope.posts) 
    }
    getPosts();
   
    
    

}])

.controller('singlePostController',['$scope','blogPost', 'UserFactory', 'UserService', '$routeParams', '$location', '$route', function($scope, blogPost, UserFactory, UserService, $routeParams, $location, $route){
    UserService.isLoggedIn();
    $scope.loggedIn = false;
    UserService.me().then(function(me){
        $scope.ME = me;
        $scope.loggedIn = true;
    })
    $scope.logout = function () {
        UserService.logout().then(function(){
        $route.reload();
        });
    }
    
    var singleId = $routeParams.id;
    console.log(singleId);
    $scope.post = blogPost.get( {id: singleId} ); 
        
    // console.log($scope);
    console.log($scope.post);
    // console.log(post);
    // console.log(marked($scope.post))
   
    $scope.goToUpdate = function() {
        $location.path('/' + singleId + '/update');
    }     
            
  
    $scope.goHome = function() {
        $location.path('/posts');
    }

}])

.controller('ComposePostController',[ '$scope', 'blogPost', 'UserFactory', 'UserService', 'CategoryFactory', '$location', function($scope, blogPost, UserFactory, UserService, CategoryFactory, $location){
    UserService.requireLogin();
    UserService.isLoggedIn();
    
    UserService.me().then(function(me){
        $scope.ME = me;
    })

    $scope.logout = function () {
        UserService.logout()
        $location.path('/posts');
    }

    $scope.categories = CategoryFactory.query();

    $scope.submitBlogPost = function(){
            UserService.me().then(function(me) {
                
                var data = {
                title: $scope.post.title,
                userid: me.id,
                categoryid: $scope.post.categoryid,
                content: $scope.post.content,
                }

                var blogPostToCreate = new blogPost(data);
                blogPostToCreate.$save(function(success){
                console.log('post saved successfully')
                $location.path('/posts');
                });
               
             });

        }
    $scope.goBack = function() {
        $location.path('/posts' );
        }
}])


.controller('EditPostController',['$scope', 'CategoryFactory', 'UserService', 'blogPost', '$routeParams', '$location', function($scope, CategoryFactory, UserService, blogPost, $routeParams, $location){
     UserService.requireLogin();
     UserService.isLoggedIn();


//--------------------------------------NAV BAR
    $scope.loggedIn = false;
    $scope.ifAdmin = false;
    UserService.me().then(function(me){
        $scope.ME = me;
        $scope.loggedIn = true;
        if (me.role === 'admin') {
            $scope.ifAdmin = true;
        }
    });
    $scope.logout = function () {
        UserService.logout().then(function(){
        $route.reload();
        });
    }
//------------------------------------------


     $scope.categories = CategoryFactory.query();
     console.log($scope.categories)
    
    var id = $routeParams.id;
    $scope.post = blogPost.get({ id: id}, function() {
        var catIdString = String($scope.post.categoryid);
        $scope.post.categoryid = catIdString;
    });


    $scope.update = function() {
        $scope.post.$update(function(success) {
            $location.path('/' + id );
        });  
    }
    $scope.promptDelete = function() {
        var shouldDelete = confirm('Are you sure you want to delete this entry?');
        if (shouldDelete) {
            $scope.post.$delete(function(success) {
                $location.path('/posts');
            });
        }
    }
    $scope.cancelupdate = function() {
        $location.path('/' + id );
    }
}])

.controller('UserListController',['$scope', 'UserService', 'UserFactory', '$location', function($scope, UserService, UserFactory, $location){
        UserService.requireLogin();
        UserService.isLoggedIn();

        UserService.me().then(function(me){
            $scope.ME = me;
        })

        $scope.logout = function () {
            UserService.logout()
            $location.path('/posts');
    }
}])

.controller('UserPageController',['$scope', 'blogPost', 'UserService', 'UserFactory', '$location', '$http', function($scope, blogPost, UserService, UserFactory, $location, $http){
    UserService.requireLogin();
    UserService.isLoggedIn();

    $scope.loggedIn = false;
    UserService.me().then(function(me){
        $scope.ME = me;
        $scope.loggedIn = true;
       
    });
     $scope.logout = function () {
            UserService.logout()
            $location.path('/posts');
    }  

    function getUsers(){
        $scope.users= UserFactory.query();
        console.log($scope.users);
    }
    getUsers();

    UserService.me().then(function(me){  // TO GET POSTS BY LOGGED IN USER
        var ME = me;
        var myUserId = ME.id;
        console.log("this is my user id: " + myUserId);
        $http({
            method: 'GET',
            url: '/api/posts/user/' + myUserId
        }).then(function(success) {
            $scope.myPosts = success.data;
            console.log($scope.myPosts);
        }, function(err) {
            console.log(err);
        });
    })
}])

.controller('UserMGMTController', ['$scope', 'UserService', 'UserFactory', '$location', '$route', function($scope, UserService, UserFactory, $location, $route){
    UserService.requireAdmin();
//--------------------------------------NAV BAR
    $scope.loggedIn = false;
    $scope.ifAdmin = false;

    UserService.me().then(function(me){
        $scope.ME = me;
        $scope.loggedIn = true;
        if (me.role === 'admin') {
            $scope.ifAdmin = true;
        }
    });

    $scope.logout = function () {
        UserService.logout().then(function(){
             $location.path('/posts');
        });
    }
    
//----------------------------
    
    $scope.submitNewUser = function() {
        var data = {
            firstname: $scope.user.firstname,
            lastname: $scope.user.lastname,
            email: $scope.user.email,
            password: $scope.user.password,
            role: $scope.user.role,
        }
        var userToCreate = new UserFactory(data); 

        console.log(userToCreate);
        userToCreate.$save(function(success){
            alert("user added!")
            $route.reload();   
        }, function(err) {
            alert("unsuccessful")
            console.log(err);
        })
    }
    $scope.updateRedirect = function(user){
        $location.path('/editUser/' + user.id )
    };
    $scope.promptDeleteUser = function(user){
       var confirmDelete = confirm('Delete this User?');
       if(confirmDelete){
           user.$delete(function(){
               console.log('user deleted');
               console.log(user);
               $route.reload();
           }, function(err) {
               alert("Cannot Delete: User may have articles posted")
           })
       }
   };
    $scope.users = UserFactory.query();
}])

.controller('EditUserController', ['$scope', 'UserService', 'UserFactory', '$routeParams', '$location', function($scope, UserService, UserFactory, $routeParams, $location){
     UserService.requireAdmin();

     var id = $routeParams.id;
     $scope.user = UserFactory.get({ id: id});
     console.log($scope.user);
     
     $scope.update = function() {
        $scope.user.$update(function(success) {
            console.log(success);
            $location.path('/adminOnly');
        });  
    }
    $scope.cancelupdate = function() {
        $location.path('/adminOnly');
    }

}])

.controller('DonationController', ['$scope', 'DonationFactory', function($scope, DonationFactory){
    $scope.chargeCard = function() {
        Stripe.card.createToken({
            number: $scope.cardNumber,
            cvc: $scope.cvc,
            exp_month: $scope.expMonth,
            exp_year: $scope.expYear,
        }, function(status, response) {
            if (response.error) {
                console.lg(error);
            } else {
                // everything is okay. Stripe generated a token for the card
                var stripeToken = response.id;
                var data = {
                    amount:$scope.amount,
                    token: stripeToken
                }
                var donation = new DonationFactory(data);
                donation.$save(function(){
                    console.log('it worked!')  // or "donation accepted" ?
                })
            }
        
        });
    }
}])


// ======================== GALLERY CONTROLLERS =======================

.controller('EngagementsController', ['$scope', '$http', 'PhotoFactory', function($scope, $http, PhotoFactory){

            
            // $scope.PortraitsPhotoSlides = [];
            // $scope.BWPhotoSlides = [];
            // $scope.musicPhotoSlides = [];
            $scope.engagementPhotoSlides = [];

            $http({
            method: 'GET',
            url: '/api/photos/engagements'   
        }).then(function (success) {
            // console.log(success.data);
            $scope.engagementPhotosArray = success.data;
            // console.log('this is adArray2: ');
            // console.log($scope.adArray2);
            //setting up ad carousel 2==================
            for (i = 0; i < $scope.engagementPhotosArray.length; i++) {
                var displayedEngagementPhoto = $scope.engagementPhotosArray[i];
                console.log('check it:')
                console.log($scope.engagementPhotosArray[i]);
                var photoSlide = {
                    image: displayedEngagementPhoto.imageURL,
                    
                };
                $scope.engagementPhotoSlides.push(photoSlide);
            }
            console.log($scope.engagementPhotoSlides);
        }, function (err) {
            console.log(err);
        });
    
}])

.controller('PortraitsController', ['$scope', '$http', 'PhotoFactory', function($scope, $http, PhotoFactory){

            
            $scope.portraitPhotoSlides = [];
           
            $http({
            method: 'GET',
            url: '/api/photos/portraits'   
        }).then(function (success) {
            // console.log(success.data);
            $scope.portraitPhotosArray = success.data;
            // console.log('this is adArray2: ');
            // console.log($scope.adArray2);
            //setting up ad carousel 2==================
            for (i = 0; i < $scope.portraitPhotosArray.length; i++) {
                var displayedPortraitPhoto = $scope.portraitPhotosArray[i];
                console.log('check it:')
                console.log($scope.portraitPhotosArray[i]);
                var photoSlide = {
                    image: displayedPortraitPhoto.imageURL,
                    
                };
                $scope.portraitPhotoSlides.push(photoSlide);
            }
            console.log($scope.portraitPhotoSlides);
        }, function (err) {
            console.log(err);
        });
    
}])

.controller('PlacesThingsController', ['$scope', '$http', 'PhotoFactory', function($scope, $http, PhotoFactory){

            $scope.placesThingsPhotoSlides = [];
           
            $http({
            method: 'GET',
            url: '/api/photos/placesThings'   
        }).then(function (success) {
            // console.log(success.data);
            $scope.placesThingsPhotosArray = success.data;
            // console.log('this is adArray2: ');
            // console.log($scope.adArray2);
            //setting up ad carousel 2==================
            for (i = 0; i < $scope.placesThingsPhotosArray.length; i++) {
                var displayedPlacesThingsPhoto = $scope.placesThingsPhotosArray[i];
                console.log('check it:')
                console.log($scope.placesThingsPhotosArray[i]);
                var photoSlide = {
                    image: displayedPlacesThingsPhoto.imageURL,
                    
                };
                $scope.placesThingsPhotoSlides.push(photoSlide);
            }
            console.log($scope.placesThingsPhotoSlides);
        }, function (err) {
            console.log(err);
        });
    
}])

.controller('LiveMusicController', ['$scope', '$http', 'PhotoFactory', function($scope, $http, PhotoFactory){

            
            $scope.liveMusicPhotoSlides = [];
           
            $http({
            method: 'GET',
            url: '/api/photos/LiveMusic'   
        }).then(function (success) {
            // console.log(success.data);
            $scope.liveMusicPhotosArray = success.data;
            // console.log('this is adArray2: ');
            // console.log($scope.adArray2);
            //setting up ad carousel 2==================
            for (i = 0; i < $scope.liveMusicPhotosArray.length; i++) {
                var displayedLiveMusicPhoto = $scope.liveMusicPhotosArray[i];
                console.log('check it:')
                console.log($scope.liveMusicPhotosArray[i]);
                var photoSlide = {
                    image: displayedLiveMusicPhoto.imageURL,
                    
                };
                $scope.liveMusicPhotoSlides.push(photoSlide);
            }
            console.log($scope.liveMusicPhotoSlides);
        }, function (err) {
            console.log(err);
        });
    
}])

.controller('EmailController', ['$scope', '$location', '$http', 'Contact', function ($scope, $location, $http, Contact) {
        console.log('email Controller');


      $scope.sendMessage = function () {
            console.log('inside contact controller');
            var contactInfo = {
                fromEmail: $scope.fromEmail,
                subject: $scope.subject,
                content: $scope.content
            }
            var contact = new Contact(contactInfo);
            contact.$save(function () {
                console.log('Email send ok');
                $location.path('/gallery');
            }, function (err) {
                console.log(err);
            });
        }
    }])


