const multer = require('multer');

// File storage config
const storage = multer.diskStorage({
	// File storage destination
	destination: (req, file, cb) => {
		cb(null, 'uploads/');
	},
	// Specify filename and file extension
	filename: (req, file, cb) => {
		cb(null, file.fieldname + '-' + Date.now() + '.png');
	}
});

const upload = multer({ storage });

module.exports = upload;
