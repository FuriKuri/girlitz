function ContentHandler() {
    "use strict";
    this.displayMainPage = function(req, res) {
        "use strict";
        res.render('index', {
            title: 'welcome',
            link: 'https://github.com/login/oauth/authorize?client_id=' + process.env['CLIENT_ID']
        });
    }
}
module.exports = ContentHandler;
