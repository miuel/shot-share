var express = require('express');
var aws = require('aws-sdk');
var multer  = require('multer');
var multerS3 = require('multer-s3');
var ext = require('file-extension');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressSession = require('express-session');
var passport = require('passport');
var shshClient = require('shsh-client');
var auth = require('./auth');

var config = require('./config');

var client = shshClient.createClient(config.client);

var s3 = new aws.S3({
	accessKeyId: config.aws.accessKey,
	secretAccessKey: config.aws.secretKey
})

var storage = multerS3({
	s3: s3,
	bucket: 'shot-share',
	acl: 'public-read',
	metadata: function(req, file, cb) {
		cb(null, {fieldName: file.fieldname})
	},
	key: function(req, file, cb) {
		cb(null, +Date.now() + '.' + ext(file.originalname))
	}
})


// ----- USANDO UN VARIABLE COMO BBDD
// var storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, './uploads')
//   },
//   filename: function (req, file, cb) {
//     cb(null, +Date.now() + '.' + ext(file.originalname))
//   }
// })
 
var upload = multer({ storage: storage }).single('picture');

var app = express();

app.set(bodyParser.json());
app.set(bodyParser.urlencoded({ extended: false }));
app.set(cookieParser());
app.use(expressSession({
	secret: config.secret,
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.set('view engine', 'pug');
app.use(express.static('public'));

passport.use(auth.localStrategy);
passport.deserializeUser(auth.deserializeUser);
passport.serializeUser(auth.serializeUser);	

app.get('/', function (req, res) {
	res.render('index', { title: 'Shot & Share' });
})

app.get('/signup', function (req, res) {
  res.render('index', { title: 'Shot & Share - SignUp' });
})

app.post('/signup', function (req, res) {
  var user = req.body;
  client.saveUser(user, function (err, usr) {
    if (err) return res.status(500).send(err.message);

    res.redirect('/signin');
  });
});

app.get('/signin', function (req, res) {
  res.render('index', { title: 'Shot & Share - SignIn' });
});

app.post('/login', passport.authenticate('local', {
  successRedirect: '/', 
  failureRedirect: '/signin'
}))

function ensureAuth (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.status(401).send({ error: 'not authenticated'})
}

app.get('/api/pictures', function (req, res, next) {

	var pictures = [
		{
			user: {
				username: 'maikol',
				avatar: 'https://scontent-mad1-1.xx.fbcdn.net/v/t1.0-9/11200573_1016420901704389_7835703089441918444_n.jpg?oh=2c3329c76a9f4a15278b659a37706a93&oe=5834F272'
			},
			url: 'office.jpg',
			likes: 0,
			liked: false,
			createdAt: +new Date()
		},
		{
			user: {
				username: 'maikol',
				avatar: 'https://scontent-mad1-1.xx.fbcdn.net/v/t1.0-9/11200573_1016420901704389_7835703089441918444_n.jpg?oh=2c3329c76a9f4a15278b659a37706a93&oe=5834F272'
			},
			url: 'office.jpg',
			likes: 1,
			liked: true,
			createdAt: new Date().setDate(new Date().getDate() - 10)
		}
	];

		res.send(pictures);
});

app.post('/api/pictures', ensureAuth, function (req, res) {
	upload(req, res, function(err) {
		if (err) {
			return res.send(500, "Error uploading file");
		}
		res.send('File uploaded successfully');
	})
})

app.get('/api/user/:username', (req, res) => {
	const user = {
		username: 'maikol',
		avatar: 'https://pbs.twimg.com/profile_images/756271621057421312/MdelTtR7_400x400.jpg',
		pictures: [
			{
				id: 1,
				src: 'https://scontent.fmad3-1.fna.fbcdn.net/v/t1.0-9/13654194_1212856408727503_6747884864396589481_n.jpg?oh=bc27ac97e4a209ae6c5e02d1c92d293f&oe=5859CD21',
				likes: 100
			},
			{
				id: 2,
				src: 'https://scontent.fmad3-1.fna.fbcdn.net/v/t1.0-9/12509734_1089568247722987_5753816057248819451_n.jpg?oh=ed8494d95a7b4e144617766d11d569af&oe=581A8D1D',
				likes: 2
			},
			{
				id: 3,
				src: 'https://scontent.fmad3-1.fna.fbcdn.net/v/t1.0-9/13615040_10209548792813852_5194406708333536178_n.jpg?oh=9577bdad5c38f5bf1507d01efdf11c56&oe=5813336C',
				likes: 328
			},
			{
				id: 4,
				src: 'https://scontent.fmad3-1.fna.fbcdn.net/v/t1.0-9/13654194_1212856408727503_6747884864396589481_n.jpg?oh=bc27ac97e4a209ae6c5e02d1c92d293f&oe=5859CD21',
				likes: 0
			},
			{
				id: 5,
				src: 'https://scontent.fmad3-1.fna.fbcdn.net/v/t1.0-9/11888077_1013846848628461_8446238325464540045_n.jpg?oh=5afe189ec17f245065b69767e46e180d&oe=58278228',
				likes: 23
			},
			{
				id: 6,
				src: 'https://scontent.fmad3-1.fna.fbcdn.net/v/t1.0-9/11057219_933180870028393_6931365629414083379_n.jpg?oh=2968eced498c8e3c321accac8fcd1044&oe=581355DE',
				likes: 1001
			},
			{
				id: 7,
				src: 'https://scontent.fmad3-1.fna.fbcdn.net/v/t1.0-9/13631458_1200606336619177_5019364385711577068_n.jpg?oh=e6afc313b3481768cb2a1d80a89370ff&oe=585A8377',
				likes: 11
			},
			{
				id: 8,
				src: 'https://scontent.fmad3-1.fna.fbcdn.net/v/t1.0-9/13466377_1187344137945397_1492533851961130126_n.jpg?oh=1ad5798586ea1b467e11458f4e843824&oe=58216F21',
				likes: 92
			},
			{
				id: 9,
				src: 'https://scontent.fmad3-1.fna.fbcdn.net/v/t1.0-9/12650808_1094231807256631_2574317295131813805_n.jpg?oh=1a62291bb7246865cfcef1204261422b&oe=582B3556',
				likes: 1
			},
		]
	}
	res.send(user);
})

// aqui declarar la nueva pagina de un usuario:
app.get('/:username', function (req, res) {
	res.render('index', { title: `Shot & Share - ${req.params.username}` });
})

app.get('/:username/:id', function (req, res) {
	res.render('index', { title: `Shot & Share - ${req.params.username}` });
})

app.listen(3000, function(err){
	if (err) return console.log('hubo un error'),  process.exit(1);

	console.log('Shot & Share escuchando en el puerto 3000');
})