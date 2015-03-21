var express     = require('express'),
  logger        = require('morgan'),
  bodyParser    = require('body-parser'),
  cookieParser  = require('cookie-parser'),
  path          = require('path'),
  flash         = require('connect-flash'),
  app           = express(),
  session       = require('express-session'),
  passport      = require('passport'),
  connection    = require('express-myconnection'),
  LocalStrategy = require('passport-local'),
  mysql 				= require('mysql'),
  config				= require('./config');

app.use(
    connection(mysql,{
		  host     : config.database.host,
		  user     : config.database.user,
		  password : config.database.password,
		  database : config.database.database
    }, 'request')
);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cookieParser());
app.use(bodyParser());
app.use(logger('combined'));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));
app.use('/static',  express.static(__dirname + '/static'));
app.use(flash());
//app.use(express.static('static'));
app.use(session({ secret: 'keyboard cat' }));
app.use(passport.initialize());
app.use(passport.session());

var users = [
    { id: 1, username: 'mrogalla', password: 'secret', email: 'm.j.rogalla@student.tudelft.nl', courses: [1,2,3,4,5] }
  , { id: 2, username: 'svanbekhoven', password: 'secret', email: 's.j.a.vanbekhoven@student.tudelft.nl', courses: [87,137,19,3,5] }
  , { id: 3, username: 'joe', password: 'birthday', email: 'joe@example.com' }
];

function findByUsername(username, fn) {
  for (var i = 0, len = users.length; i < len; i++) {
    var user = users[i];
    if (user.username === username) {
      return fn(null, user);
    }
  }
  return fn(null, null);
}

function findById(id, fn) {
  var idx = id - 1;
  if (users[idx]) {
    fn(null, users[idx]);
  } else {
    fn(new Error('User ' + id + ' does not exist'));
  }
}

passport.use(new LocalStrategy(
  function(username, password, done) {
    // Find the user by username.  If there is no user with the given
    // username, or the password is not correct, set the user to `false` to
    // indicate failure and set a flash message.  Otherwise, return the
    // authenticated `user`.
    findByUsername(username, function(err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false, { message: 'Unknown user ' + username }); }
      if (user.password != password) { return done(null, false, { message: 'Invalid password' }); }
      return done(null, user);
    })
  }
));

var index = require('./routes/index');
var course = require('./routes/course');
var keyword = require('./routes/keyword');
var search = require('./routes/search');

app.get('/course', ensureAuthenticated, course.index);
app.get('/course/:id', ensureAuthenticated, course.course);

app.get('/keyword', ensureAuthenticated, keyword.index);
app.get('/keyword/:id', ensureAuthenticated, keyword.keyword);

app.post('/search', ensureAuthenticated, search.result);

app.get('/', ensureAuthenticated, index.index);
app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

app.get('/login', index.login);
app.post('/login',
  passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/login',
                                   failureFlash: true }),
  function(req, res) {
		res.redirect('/');
	}
); 

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  findById(id, function (err, user) {
    done(err, user);
  });
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login')
}

var server = app.listen(3000, function () {
  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)
});
