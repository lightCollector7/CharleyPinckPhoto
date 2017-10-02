angular.module('p2.factories', [])
.factory('blogPost', ['$resource', function($resource) {
    return $resource('/api/posts/:id', { id: '@id' }, {
        update: { method: 'PUT' }
    });
}])
.factory('UserFactory', ['$resource', function($resource) {
    return $resource('/api/users/:id', { id: '@id' }, {
        update: { method: 'PUT' }
    });      
}])
.factory('CategoryFactory', ['$resource', function($resource){
    return $resource('/api/categories/:id', {id: '@id'});
}])
.factory('DonationFactory', ['$resource', function($resource){
    return $resource('/api/donations/:id');
}])
.factory('PhotoFactory', ['$resource', function($resource){
    return $resource('api/photos/:id', {id: '@id'}, {
        update: { method: 'PUT' }
    });
}])
.factory('Contact', ['$resource', function ($resource) {
        return $resource('/api/contact/:id');
}])