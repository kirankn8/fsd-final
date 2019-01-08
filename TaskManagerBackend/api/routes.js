const express = require('express');
const router = express.Router();

const user = require('./controllers/user.controller');
const project = require('./controllers/project.controller');
const task = require('./controllers/task.controller');

router.get('/', (req, res) => {
    res.send('The app is up and running!');
});

// User routes
router.get('/users', user.list_users);
router.post('/user', user.save_user);
router.get('/user/:id', user.get_user);
router.put('/user/:id', user.update_user);
router.delete('/user/:id', user.delete_user);

// Project routes
router.get('/projects', project.list_projects);
router.post('/project', project.save_project);
router.get('/project/:id', project.get_project);
router.put('/project/:id', project.update_project);
router.delete('/project/:id', project.delete_project);

// Task routes 
router.post('/project/:id/task', task.set_project_parenttask);
router.put('/project/:id/task/:parentTaskId', task.update_project_parenttask);
router.delete('/project/:id/task/:parentTaskId', task.delete_project_parenttask);
router.post('/project/:id/task/:parentTaskId', task.set_project_parent_childtask);
router.put('/project/:id/task/:parentTaskId/child/:childTaskId', task.update_project_parent_childtask);
router.delete('/project/:id/task/:parentTaskId/child/:childTaskId', task.delete_project_parent_childtask);

router.put('/project/:id/task/:parentTaskId/child/:childTaskId/completed', task.mark_project_task_completed);

module.exports = router