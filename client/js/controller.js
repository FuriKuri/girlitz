function CartsController($scope, Cart) {
  $scope.cart = Cart;
}

function AboutController($scope, $window) {
  $scope.par = $window.sessionStorage.loggedUser + " " + $window.sessionStorage.token;
}

function AuthController($scope, $routeParams, $http, $location, $window) {
  $http.get('/app/login/github?code=' + $routeParams.code)
  .success(function (data, status, headers, config) {
        $window.sessionStorage.loggedUser = data.username;
        $window.sessionStorage.token = data.token;
        $location.path('/');
  })
  .error(function (data, status, headers, config) {
        //$scope.par = data;
        // display error?
        $location.path('/login');
      });
}


function CallbackController($scope, $routeParams) {
  $scope.par = $routeParams.code;
}

function ArticlesController($scope, $http, Cart) {
  $scope.cart = Cart;
  $http.get('articles.json').then(function(articlesResponse) {
    $scope.articles = articlesResponse.data;
  });
}