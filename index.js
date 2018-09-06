const express = require('express');
const coursesApi = require('./courses');

const app = express();
app.use(express.json());

/*Initialize courses api */
coursesApi.api(app);

