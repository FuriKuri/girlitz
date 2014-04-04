function ContentHandler() {
    "use strict";
    this.displayMainPage = function(req, res) {
        "use strict";
        res.render('login', {
            github: 'https://github.com/login/oauth/authorize?client_id=' + process.env['CLIENT_ID']
        });
    }
}
module.exports = ContentHandler;
