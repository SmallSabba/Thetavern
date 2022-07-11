const fs = require("fs");
const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const sessions = require('express-session');
const cookieParser = require('cookie-parser');
const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        clearDirectory(req.session.user);
        cb(null, 'files/resources/uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, "user" + req.session.user + " - " + Date.now() + path.extname(file.originalname)) //Appending extension
    }
})
const upload = multer(
    {
        limits: {
            fieldNameSize: 100,
            fileSize: 60000000
        },
        storage: storage
    });

const app = express();
const port = process.env.PORT ?? 3000;

const wheelchairRouter = require('./api/routes/wheelchair-router');
const accountRouter = require('./api/routes/account-router');

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

app.post("/uploadFiles", upload.single("file"), sendFileUrl);
app.delete("/deleteUserFile", deleteUserUpload);
app.get("/readLibrary", sendImgLibrary);

app.listen(port, (error) => {
    if (error) {
        console.log(error);
    } else {
        //added "/index.html" at the end so that document location pathname could be used to determine what the current page is
        console.log(`Server listening at http://localhost:${port}`)
    }
});

function clearDirectory(user) {

    const directory = "files/resources/uploads";
    fs.readdir(directory, (err, files) => {
        if (err) throw err;

        for (const file of files) {

            if (file.includes(user)) {
                fs.unlink(path.join(directory, file), err => {
                    if (err) throw err;
                });
            }
        }
    });
}

function sendFileUrl(req, res) {

    let url = req.file.path.split("resources").pop();

    res.status(200).send({url: url});
}

function deleteUserUpload(req, res) {

    try {
        clearDirectory(req.session.user)

        setTimeout(() => res.send({bo: true}), 20);

    } catch (e) {

        res.status(500).send({bo: null});
    }
}

function sendImgLibrary(req, res) {

    const rootDirectory = "files/resources";
    let array = [];

    fs.readdir(`${rootDirectory}/uploads`, (err, files) => {
        if (err) throw err;

        for (const file of files) {

            let filePath = `/uploads/:${file}`
            array.push(filePath)
        }

    });

    fs.readdir(`${rootDirectory}/wheelchairs`, (err, subDir) => {
        if (err) throw err;

        for (const dir of subDir) {

            fs.readdir(`${rootDirectory}/wheelchairs/${dir}`, (err, files) => {
                if (err) throw err;

                for (const file of files) {

                    let filePath = `/wheelchairs/${dir}/:${file}`
                    array.push(filePath)
                }

            });
        }
    });
    setTimeout(() => res.send({array: array}), 20);
}