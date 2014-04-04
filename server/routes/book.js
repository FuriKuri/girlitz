function BookHandler() {
  "use strict";

  this.list = function (req, res) {
    "use strict";
    console.log("User is " + req.user.id);
    res.json([
      {
        "isbn": 1,
        "name": "Book"
      },
      {
        "isbn": 2,
        "name": "Paper!"
      }
    ]);
  }
}
module.exports = BookHandler;