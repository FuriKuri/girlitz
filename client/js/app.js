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

app.factory('Cart', function() {
    var items = [];

    return {
        items: items,
        addArticle: function(article) {
            items.push(article);
        },
        copyItem: function(item) {
            return items.splice(items.indexOf(item), 0, item);
        },
        removeItem: function(item) {
            return items.splice(items.indexOf(item),1);
        },
        sum: function() {
            return items.reduce(function(total, article) { return total + article.price; }, 0);
        }
    };
});