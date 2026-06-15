const express = require('express');
const router = express.Router();
const Project = require('../models/Project'); //Import the model

//Get all projects
// URL: http://localhost:5000/api/projects
router.get('/', async (req, res) => {
    try {
        const projects = await Project.find(); //Fetch all from MongoDB
        res.json(projects); //send them to the frontend
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

//Post a new project (to add data)
// URL: http://localhost:5000/api/projects
router.post('/', async (req, res) =>{
    const project = new Project({
        title: req.body.title,
        description: req.body.description,
        tags: req.body.tags,
        codeLink: req.body.codeLink,
        demoLink: req.body.demoLink
    });

    try {
        const newProject = await project.save(); //save to MongoDB
        res.status(201).json(newProject);
    } catch(err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;