const express = require('express');
const server = express();
const projects = [];

server.use(express.json());

//MIDDLEWARES

function isProjectId(req, res, next){
    const {id} = req.params;

    function isProject(e){
        return e.id == id;
    }

    let project = projects.find(isProject);

    if (!project){
        return res.status(404).send("The specified ID was not found");
    }

    req.project = project;

    return next();
}

//Route 1 - POST /projects

server.post('/projects', (req, res) =>{
    const {id, title} = req.body;

    let project = {id: id, title: title, tasks:[]};

    projects.push(project);

    return res.json(projects);

})

//Route 2 - GET /projects

server.get('/projects', (req, res) =>{
    return res.json(projects);
})


//Route 3 - PUT /projects/:id

server.put('/projects/:id', isProjectId , (req, res) =>{
    const {id} = req.params;
    const {title} = req.body;


    let project = req.project;

    
    project.title = title;
    
    return res.json(projects);
})



//Route 4 - DELETE /projects/:id

server.delete('/projects/:id', isProjectId , (req, res)=>{
    const {id} = req.params;
    let project = req.project;

    let projectIndex = projects.indexOf(project);
    projects.splice(projectIndex,1);
    

    return res.send();
})



//Route 5 - POST TASK /projects/:id/tasks

server.post('/projects/:id/tasks', isProjectId , (req, res) =>{
    const {id} = req.params;
    const {title} = req.body;
    let project = req.project;

    project.tasks.push(title);
    
    return res.json(projects);
})






server.listen(3000);