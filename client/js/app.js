var app = angular.module("app", ['ngRoute']);

app.config(function($routeProvider) {
    $routeProvider.
        when('/', { templateUrl: '/partial/books.html', controller: ArticlesController }).
        when('/auth', { templateUrl: '/partial/auth.html', controller: AuthController }).
        when('/login', { templateUrl: '/partial/login.html' }).
        when('/logout', { templateUrl: '/html/login.html', controller: LogoutController }).
        when('/callback', { templateUrl: '/partial/about.html', controller: CallbackController }).
        otherwise({ redirectTo: '/'});
});

app.run(function($rootScope, $location, $window) {
  $rootScope.$on( "$routeChangeStart", function(event, next, current) {
    if ($window.sessionStorage.loggedUser == null || $window.sessionStorage.token == null) {
      if (!next.templateUrl == "/partials/login.html" && !next.templateUrl == "/partial/auth.html") {
        $location.path( "/login" );
      }
    }
  });
});

app.factory('authInterceptor', function ($rootScope, $location, $q, $window) {
  return {
    request: function (config) {
      config.headers = config.headers || {};
      if ($window.sessionStorage.token && config.url.indexOf("/api") == 0) {
        config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
      } else {
        config.headers.Authorization = undefined;
      }
      return config;
    },
    response: function (response) {
      if (response.status === 401) {
        // error message
        console.log("Error");
        $location.path( "/login" );
      }
      return response || $q.when(response);
    }
  };
});

app.config(function ($httpProvider) {
  $httpProvider.interceptors.push('authInterceptor');
});

app.factory('BookList', function() {
    var items = [];

    return {
        items: items,
        add: function(book) {
            items.push(book);
        },
        remove: function(book) {
            return items.splice(items.indexOf(book),1);
        }
    };
});