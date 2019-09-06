const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/User");
const bcrypt = require("bcryptjs");

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

passport.use(
  new LocalStrategy({ usernameField: "email" }, (username, password, done) => {
    User.findOne({ email: username }, async (err, user) => {
      if (!user) {
        return done(null, false, { message: "Invalid Username or password" });
      } else {
        const isSame = await bcrypt.compare(password, user.password);
        if (isSame) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      }
    });
  })
);

module.exports = passport;
