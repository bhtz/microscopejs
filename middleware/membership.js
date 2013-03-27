var membership = module.exports = function (passport, LocalStrategy, dbContext) {

    var bcrypt = require('bcrypt-nodejs');

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, next) {
        dbContext.users.find(id).success(function (user) {
            next(null, user);
        });
    });

    // configure passport Strategy
    passport.use(new LocalStrategy(
        {
            usernameField: 'username',
            passwordField: 'password'
        },
        function (username, password, done) {
            dbContext.users.find({ where: { username: username} }).success(function (user) {
                if(bcrypt.compareSync(password, user.password)){
                    return done(null, user);
                }
                else{
                    return done(null, false, { message: 'Incorrect password.' });
                }
            }).error(function (error) {
                return done(error);
            });
        }
    ));
}