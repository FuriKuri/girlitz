var app = angular.module("app", []);

app.config(function($routeProvider) {
    $routeProvider.
        when('/', { templateUrl: '/partial/articles.html', controller: ArticlesController }).
        when('/about', { templateUrl: '/partial/about.html', controller: AboutController }).
        when('/auth', { templateUrl: '/partial/auth.html', controller: AuthController }).
        when('/login', { templateUrl: '/html/login.html', controller: AboutController, access : { isFree: true} }).
        when('/callback', { templateUrl: '/partial/about.html', controller: CallbackController }).
        otherwise({ redirectTo: '/'});
});

app.run(function($rootScope, $location, $window) {
  $rootScope.$on( "$routeChangeStart", function(event, next, current) {
    if ( $window.sessionStorage.loggedUser == null  || $window.sessionStorage.token == null ) {
      if ( next.templateUrl == "/partials/login.html" || next.templateUrl == "/partial/auth.html" ) {
      } else {
        $location.path( "/login" );
      }
    }
  });
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