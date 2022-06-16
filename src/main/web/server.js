const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');


const app = express();
const port = process.env.PORT ?? 3000;

// Serving static files from folder 'resources'
app.use(express.static(path.join(__dirname, "files/structuring")));
app.use(express.static(path.join(__dirname, "files/styling")));
app.use(express.static(path.join(__dirname, "files/scripting")));
app.use(express.static(path.join(__dirname, "files/resources")));


const wheelchairRouter = require('./api/routes/wheelchair-router');


// Parse urlencoded bodies (for form data)
app.use(bodyParser.urlencoded({extended: true}));

// Parse JSON bodies (from requests)
app.use(bodyParser.json());

// Include the wheelchair routes
app.use('/api', wheelchairRouter);

app.listen(port, (error) => {
    if (error) {
        console.log(error);
    } else {
        console.log(`Server listening at http://localhost:${port}`)
    }
});