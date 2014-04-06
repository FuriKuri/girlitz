function AuthController($routeParams, $http, $location, $window) {
  $http.get('/app/login/github?code=' + $routeParams.code)
      .success(function (data, status, headers, config) {
        $window.sessionStorage.loggedUser = data.username;
        $window.sessionStorage.token = data.token;
        $location.url('/');
      })
      .error(function (data, status, headers, config) {
        $location.path('/login');
      });
}

function LoginController($scope) {
  $scope.login = {
    username: '',
    password: ''
  };

  $scope.registration = {
    username: '',
    password: '',
    password_verify: '',
    verify: function() {
      return this.username.length > 0
          && this.password.length > 4
          && this.password == this.password_verify;
    },
    check: true
  };
}

function LogoutController($window, $location) {
  $window.sessionStorage.removeItem('loggedUser');
  $window.sessionStorage.removeItem('token');
  $location.path('/login');
}

function BookListController($scope, $http, $location, $window, BookList) {
  $scope.bookList = BookList;
  $scope.username = $window.sessionStorage.loggedUser;
  $http.get('/api/books').then(
      function (articlesResponse) {
        BookList.addAll(articlesResponse.data);
      },
      function () {
        $location.path('/login');
      });
}

function BookController($scope, $http) {
  $scope.book = {};

  $scope.searchBook = function(isbn) {
    if (isbn.length == 10) {
      $http.get('https://www.googleapis.com/books/v1/volumes?q=isbn:' + isbn)
          .success(function (data, status, headers, config) {
            if (data.items) {
              $scope.book.name = data.items[0].volumeInfo.title;
            } else {
              $scope.book.name = undefined;
            }
          });
    } else {
      $scope.book.name = undefined;
    }
  }
}