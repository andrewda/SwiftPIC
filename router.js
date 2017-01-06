const passport = require('passport');

const passportService = require('./services/passport');
const Authentication = require('./controllers/authentication');
const Upload = require('./controllers/upload');
const Image = require('./controllers/image');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

module.exports = (app) => {
	app.post('/upload', requireAuth, Upload.uploadImage);
	
	app.get('/api/posts/random', Image.getRandomImage);
	app.get('/api/posts/latest', Image.getLatestImages);
	app.get('/api/posts/:username', Image.getUserImages);
	app.get('/api/posts/:username/:url', Image.getUserImage);
	app.get('/api/posts/data/:username/:url', Image.getUserImageData);

	app.post('/signin', requireSignin, Authentication.signin);
	app.post('/signup', Authentication.signup);
	
	app.get('/*', (req, res) => {
		res.sendFile(__dirname + '/public/index.html');
	});
};
