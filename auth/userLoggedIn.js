// user logging persitence across all endpoints for JWT authentication
var userLoggedIn = {
    id: null,
    username: null,
    getId: function() {
        return this.id;
    },
    setId: function(id) {
        this.id = id;
    }
};
module.exports = userLoggedIn;