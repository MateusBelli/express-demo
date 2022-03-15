const express = require('express');
const router = express.Router();

const courses = [
    { id: 1, name: 'Course 1' },
    { id: 2, name: 'Course 2' },
    { id: 3, name: 'Course 3' }
];

function validateCourse(data) {
    // Validate
    // If invalid, return 400 - Bad request
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });

    return schema.validate(data);
}

router.get('/', (req, res) => {
    res.send(courses);
});

router.post('/', (req, res) => {
    const { value, error } = validateCourse(req.body);

    if (error) {
        var errorMessage = [];
        error.details.forEach(detail => {
            errorMessage.push(detail.message)
        });

        return res.status(400).json(errorMessage);
    }

    const course = {
        id: courses.length + 1,
        name: value.name
    }

    courses.push(course);

    res.send(course);
});

router.get('/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with the given ID was invalid');
    
    res.send(course);
});

router.put('/:id', (req, res) => {
    // Look up the course
    // If not existing, return 404
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with the given ID was invalid');

    // const result = validateCourse(req.body);
    const { error } = validateCourse(req.body);

    if (error) {
        var errorMessage = [];
        error.details.forEach(detail => {
            errorMessage.push(detail.message)
        });

        return res.status(400).json(errorMessage);
    }

    // Update course
    course.name = result.name;

    // Return updated course
    res.send(course);
});

router.delete('/:id', (req, res) => {
    // Look up the course
    // If not existing, return 404
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with the given ID was invalid');

    // Delete
    const index = courses.indexOf(course);
    courses.splice(index, 1);

    // Return the deleted course
    res.send(course);
});

module.exports = router;