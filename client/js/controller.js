function AuthController($routeParams, $http, $location, $window, $scope) {
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

function LogoutController($window, $location) {
  $window.sessionStorage.removeItem('loggedUser');
  $window.sessionStorage.removeItem('token');
  $location.path('/login');
}

function ArticlesController($scope, $http, $location, $window, BookList) {
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

function BookController($scope, $http, BookList) {
  $scope.book = {};

  $scope.addBook = function(book) {
    if (!BookList.contains(book)) {
      BookList.add(book);
      $scope.book = {};
      $http.put('/api/book/' + book.isbn, book).then(
          function (message) {
            console.log(message);
          }
      );
    }
  };

  $scope.searchBook = function(isbn) {
    if (isbn.length == 10) {
      $http.get('https://www.googleapis.com/books/v1/volumes?q=isbn:' + isbn)
          .success(function (data, status, headers, config) {
            $scope.book.name = data.items[0].volumeInfo.title;
            $scope.showBook = true;
          });
    } else {
      $scope.showBook = false;
    }
  }
}