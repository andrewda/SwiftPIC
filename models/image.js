const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Define model
const imageSchema = new Schema({
    user: String,
    url: String,
    timestamp: { type: String, default: new Date() }
}, { strict: false });

// Create model class
const ModelClass = mongoose.model('Image', imageSchema);

// Export model
module.exports = ModelClass;
