function BookHandler() {
  "use strict";

  this.list = function (req, res) {
    "use strict";
    res.json([
      {
        "id": 1,
        "name": "Book",
        "price": 11
      },
      {
        "id": 2,
        "name": "Paper!",
        "price": 22}
    ]);
  }
}
module.exports = BookHandler;