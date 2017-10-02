angular.module('p2.services', [])
.service('UserService', ['$http', '$location', function($http, $location) {

    var user;

    this.isLoggedIn = function() {
        if (user) {
            return true;
        } else {
            return false;
        }
    }

    this.requireLogin = function() {
        if (!this.isLoggedIn()) {
            var current = $location.path();
            $location.path('/login').search('p', current).replace();
        }
    }


    this.isAdmin = function() {
        // if (user && user.role === 'admin') {
        //     return true;
        // } else {
        //     return false;
        // }
        return this.me().then(function(me) {
            if (me.role === 'admin') {
                return true;
            } else {
                return false;
            }
        })
    }

    this.requireAdmin = function() {
        return this.isAdmin().then(function(userIsAnAdmin) {
            if (!userIsAnAdmin) { // if the user is not an admin
                alert('You must be an admin to access this page.');
                $location.path('/posts').replace();
            }
        }, function(err) { // if there was an error getting 'me' (AKA, the user is not logged in with a session on the server)
            alert('You must be an admin to access this page.');
            $location.path('/posts').replace();
        });

        // if(!this.isAdmin()) {
        //     $location.path('/posts').replace();
        // }
    }

    this.login = function(e, p) {
        return $http({
            method: 'POST',
            url: '/api/users/login',
            data: {
                email: e,
                password: p
            }
        }).then(function(success) {
            user = success.data;
            console.log(user);
            return success.data;
            })
    }

    this.logout = function() {
        return $http({
            method: 'GET',
            url: '/api/users/logout'
        }).then(function(success) {
            user = undefined;
        });
    }


    this.me = function() {
            if (user) {
                return Promise.resolve(user);
            } else {
                return $http({
                    method: 'GET',
                    url: '/api/users/me'
                }).then(function(success) {
                    user = success.data;
                    return success.data;
                })
            }
        }



}]);