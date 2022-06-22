const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const sessions = require('express-session');
const cookieParser = require('cookie-parser');

const app = express();
const port = process.env.PORT ?? 3000;

const wheelchairRouter = require('./api/routes/wheelchair-router');
const accountRouter = require('./api/routes/account-router');

/**
 * short session management tutorial
 * https://www.section.io/engineering-education/session-management-in-nodejs-using-expressjs-and-express-session/
 */

//const oneDay = 1000 * 60 * 60 * 24;
const oneHour = 1000 * 60 * 60;
app.use(sessions({
    secret: "thisisjustarandomstring2022preferablyratherlongG2usedtoauthenticateasessionTXandwhichisnotexposedtothepublic",
    saveUninitialized: true,
    cookie: {
        maxAge: oneHour
    },
    resave: false
}));

// Serving static files from folder 'files'
app.use(express.static(path.join(__dirname, "files/structuring")));
app.use(express.static(path.join(__dirname, "files/styling")));
app.use(express.static(path.join(__dirname, "files/scripting")));
app.use(express.static(path.join(__dirname, "files/resources")));

// Parse urlencoded bodies (for form data)
app.use(bodyParser.urlencoded({extended: true}));

// Parse JSON bodies (from requests)
app.use(bodyParser.json());

// cookie parser middleware
app.use(cookieParser());

// Enables all requests specified in wheelchair and account-router
app.use('/api', wheelchairRouter);
app.use('/api', accountRouter);

app.listen(port, (error) => {
    if (error) {
        console.log(error);
    } else {
        console.log(`Server listening at http://localhost:${port}`)
    }
});