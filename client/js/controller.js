function CartsController($scope, Cart) {
  $scope.cart = Cart;
}

function AboutController($scope, $window) {
  $scope.login = true;
  $scope.par = $window.sessionStorage.loggedUser + " " + $window.sessionStorage.token;
}

function LoginController() {
}

function AuthController($routeParams, $http, $location, $window) {
  $http.get('/app/login/github?code=' + $routeParams.code)
      .success(function (data, status, headers, config) {
        $window.sessionStorage.loggedUser = data.username;
        $window.sessionStorage.token = data.token;
        $location.path('/main');
      })
      .error(function (data, status, headers, config) {
        //$scope.par = data;
        // display error?
        $location.path('/login');
      });
}

function LogoutController($window, $location) {
  $window.sessionStorage.removeItem('loggedUser');
  $window.sessionStorage.removeItem('token');
  $location.path('/login');
}

function CallbackController($scope, $routeParams) {
  $scope.par = $routeParams.code;
}

function ArticlesController($scope, $http, $location, Cart) {
  $scope.cart = Cart;
  $http.get('/api/books')
      .then(function (articlesResponse) {
        $scope.articles = articlesResponse.data;
      }, function () {
        console.log("Redirect to login page");
        $location.path('/login');

      });
}