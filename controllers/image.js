const Image = require('../models/image');

exports.getRandomImage = (req, res, next) => {
	Image.find({}, (err, docs) => {
	    if (docs.length) {
    		const image = docs[Math.floor(Math.random()*docs.length)].toObject().image;
    		res.end(image.buffer, 'binary');
	    } else {
	        res.status(404).end('Not found');
	    }
	});
};

exports.getUserImage = (req, res, next) => {
	Image.findOne({
	    user: req.params.username,
	    url: req.params.url
	}, (err, doc) => {
	    if (doc) {
    		const image = doc.toObject().image;
    		res.end(image.buffer, 'binary');
	    } else {
	        res.status(404).end('Not found');
	    }
	});
};

exports.getUserImageData = (req, res, next) => {
	Image.findOne({ user: req.params.username, url: req.params.url })
		.exec((err, doc) => {
		    if (doc) {
	    		res.send({
					user: doc.user,
					url: doc.url,
					timestamp: calcTime(doc.timestamp, -8)
				});
		    } else {
		        res.status(404).end('Not found');
		    }
	});
};

exports.getUserImages = (req, res, next) => {
	Image.find({ user: req.params.username })
		.sort({ unix: -1 })
		.exec((err, docs) => {
		    if (docs.length) {
		    	let images = [];
		    	
				docs.forEach((doc) => {
					images.push({
						user: doc.user,
						url: doc.url,
						timestamp: calcTime(doc.timestamp, -8)
					});
				});
				
	    		res.send(images);
		    } else {
		        res.status(404).end('Not found');
		    }
	});
};

exports.getLatestImages = (req, res, next) => {
	Image.find()
		.sort({ unix: -1 })
		.limit(20)
		.exec((err, docs) => {
			if (docs.length) {
		    	let images = [];
		    	
				docs.forEach((doc) => {
					images.push({
						user: doc.user,
						url: doc.url,
						timestamp: calcTime(doc.timestamp, -8)
					});
				});
				
	    		res.send(images);
		    } else {
		        res.status(404).end('Not found');
		    }
		});
};

function calcTime(time, offset) {
	const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
	
    const d = new Date(time);
	const timezone = new Date(d.getTime() + (3600000 * offset));
	
    return timezone.toLocaleDateString('en-US', options);
}
