const Joi = require('joi');

function coursesApi(app){
    const courses = [
        {id: 1, name: 'course1'},
        {id: 2, name: 'course2'},
        {id: 3, name: 'course3'}
    ];
    
    app.get('/', (req, res) => {
        res.send('Hello World');
    });
    
    app.get('/api/courses', (req, res) => {
        res.send(courses);
    });
    
    app.get('/api/courses/:id', (req,res) => {
        const course = courses.find(course => course.id === parseInt(req.params.id));
        if( !course ){ //404
            return res.status(404).send('The course with the given id was not found');
        }
        res.send(course);
    });
    
    app.post('/api/courses', (req, res) => {
        const result = validateCouse(req);
        console.log('validation result: ');
        console.log(result);
    
        if( result.error ){
            return res.status(400).send(result.error);
        }
        const course = {
            id: courses.length + 1,
            name: req.body.name
        };
        courses.push(course);
        res.send(course);
    });
    
    app.put('/api/courses', (req, res) => {
        const result = validateCouse(req);
        const courseIndex = courses.findIndex((course) => course.id === parseInt(req.body.id));
    
        if( result.error ){
            return res.status(403).send(result.error);
        }
    
        if( courseIndex === -1 ){
            return res.status(404).send('The requested course was not found.');
        }
        let course = courses[courseIndex];
        course.name = req.body.name;
    
        courses.splice(courseIndex, 1, course);
        res.send(course);
    });

    app.delete('/api/courses/:id', (req, res) => {
        const courseIndex = courses.findIndex((course) => course.id === parseInt(req.params.id));
        if( courseIndex === -1 ){
            return res.status(404).send('The requested course was not found.');
        }
        const course = courses.splice(courseIndex, 1);
        res.send(course);
    });
    
    app.get('/api/posts/:year/:month', (req, res) => {
        res.send({pathVariables: req.params, queryParams:req.query});
    });
    const port = process.env.PORT || 3000;
    app.listen(port, () => console.log(`Listening on port ${port}`));
    
}

/* Validation */
function validateCouse(req){
    const courseSchema = Joi.object().keys({
        name: Joi.string().min(3).max(50).required(),
        id: Joi.number().optional()
    });
    return Joi.validate(req.body, courseSchema);       
}

module.exports.api = coursesApi;