const fs = require("fs");
function readFileJson() {
    let data = fs.readFileSync("./data/todo.json");
    data = JSON.parse(data);
    return data;
}

function writeFileJson(task) {
    let newData = JSON.stringify(task);
    fs.writeFile(`./data/todo.json`, newData, function (err) {
        if (err) throw err;
        console.log("Replaced!");
    });
}

module.exports = {
    writeFileJson,
    readFileJson,
};
