const crypto = require('crypto');
const sharp = require('sharp');

const Image = require('../models/image');

exports.uploadImage = (req, res, next) => {
	const buffer = new Buffer(req.body.image.split(',')[1], 'base64');

	sharp(buffer)
		.resize(720, 480)
		.min()
		.toBuffer()
		.then((data) => {
			console.log(data)
			const shasum = crypto.createHash('sha1');
			shasum.update(data + Date.now());
			
			const image = new Image({
				user: req.user.username,
				url: shasum.digest('hex'),
				image: data,
				unix: (new Date()).getTime()
			});
			
			image.save();
			
			const imageData = image.toObject();
			delete imageData['image']
			
			res.send(imageData);
		});
};
