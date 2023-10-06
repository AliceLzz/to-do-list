const express = require("express"); // Express module to create a server application
const cors = require("cors"); // Cors module to handle Preflight requests
const bodyParser = require("body-parser"); // Body-parser module to parse JSON objects

const app = express(); // instance of an Express object
const port = 5500; // the port the server will be listening on
const textBodyParser = bodyParser.text({
    limit: "20Mb",
    defaultCharset: "utf-8",
});

app.use(
    cors({
        origin: "http://127.0.0.1:5501", // enable CORS for localhost:3000
    })
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const { writeFileJson, readFileJson } = require("./modules/todo");

//Previous request
app.options("/", (req, res) => {
    res.header("Access-Control-Allow-Origin", "http://127.0.0.1:5501");
    res.header("Access-Control-Allow-Headers", "task"); // Allow the 'task 'header
    res.header("Access-Control-Allow-Methods", "GET"); // Allow the GET method
    res.header("Access-Control-Allow-Methods", "POST"); // Allow the POST method
    res.sendStatus(200);
});

app.get("/", function (req, res) {
    let tasks = readFileJson();
    console.log(tasks)
    res.status(200).json(tasks);
    res.end();
});

app.put("/save", textBodyParser, async function (req, res) {
    let data = JSON.parse(req.body);
    console.log(data); //print the HTTP Request Headers
    console.log(data[0]); //print the HTTP Request Headers
    writeFileJson(data);
    res.status(200);
    res.end();
});

//Initialize the Server, and Listen to connection requests
app.listen(port, (err) => {
    if (err) {
        console.log("There was a problem ", err);
    }
    console.log(`Server listening on http://localhost:${port}`);
});
