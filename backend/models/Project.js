const mongoose = require('mongoose');

// 1. Define the Schema (The blueprint) for what our project lookslike
const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true //every project must have a title
    },
    description: {
        type: String,
        required: true
    },
    tags: {
        type: [String], //An array of strings (e.g., ["React", "Node"])
        default: []
    },
    codeLink: {
    type: String,
    default: "#"
    },
    demoLink: {
        type: String,
        default: "#"
    },
     supportLink: {
        type: String,
        default: "#"
     },
    // Optional: Add an image URL if you want screenshots later
    image: {
        type: String,
        default: "" 
    }
    }, { timestamps: true }); // Automatically adds 'createdAt' and 'updatedAt' times

// 2. Export the Model
// This creates the collection "projects" in your database automatically
module.exports = mongoose.model('Project', projectSchema);