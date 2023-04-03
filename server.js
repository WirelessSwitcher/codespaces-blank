// Initialize required libraries:
const express = require("express")
const path = require("path");
const fs = require("fs");
const bodyParser = require("body-parser");
const database = require("mime-db");
const { json } = require("body-parser");

// Initialize App:
const app = express();
const port = process.env.PORT || 3000;

// Set path for public directory
const static_path = path.join(__dirname, "public");
app.use(express.static(static_path));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Initialize databases
var database0 = [];     // This database collects data sent from first load
var database1 = [];     // This database collects data from user interactions
var database2 = [];     // This database returns the updated values to the clients

// Server Setup
app.listen(port, () => {
	//console.clear();
	console.log(`Server is running at ${port}\n`);
});

// Receive data from Client
app.post("/toPLC", function(req, res){

    // Search object in the database
    let index = getIndex(req.body, database1);
    let notfound = -1;

    if(index == notfound){
        // add new object to database
        database1 = addObject(req.body, database1);
    }else{
        // update object values in the database
        database1[index] = req.body;
    }

    let response = getObject(req.body, database1);

    console.log("Sending response...");
    res.send(response);
});

// Save user's code
app.post("/submitCode", function(req, res){

    // Transfrom the request into text
    let code = req.body.code;
    //let name = req.body.name;
    let response;

    // Write code into file
    //fs.writeFile("./public/data/" + name + ".js", code, "utf8", err => {
    fs.writeFile("./public/data/script.js", code, "utf8", err => {
        if(err){
            console.log("Error writing on file, code " + err);
            response = err;
        } else {
            response = "Writing succesfull!";
            console.log(response);
        }
    });

    // Send confirmation of the response
    res.send(response);
});

// Add an object to the current database
function addObject(object, database){
    //console.log("Adding " + object.id + " to index " + database.length);
    database[database.length] = object;
    //console.log("New database length is: " + database.length);
    return database;
}

// Search for a specific object in the current database
function getIndex(object, database){
    let index = -1;
    for(let i = 0; i < database.length; i++){
        if(database[i].id == object.id){
            index = i;
            //console.log("Found! It's index is: " + i);
            break;
        } else {
            //console.log("Searching " + object.id + " in index " + i + ", " + database[i].id + " doesn't match");
        }
    }

    return index;
}

function getObject(object, database){
    let index = getIndex(object,database);
    return database[index];
}

/* *** NodeS7 *** */
/*
const nodes7 =  require("nodes7");                                       // Adds the driver to the applicaiton
const { stringify } = require("querystring");
const conn = new nodes7;
var doneReading = false;
var doneWriting = false;

// Declare variable table
var variables = {
    TEST1: "M20.0",         // Bit at M20.0
    TEST2: "M20.1",         // Bit at M20.1
    TEST3: "Q0.0"           // Output Q0.0
}

// Make a buffer to read variables
var readBuffer = {};

// Start comms
conn.initiateConnection({ port: 102, host: "172.16.1.11", rack: 0, slot: 1 }, connected); // slot 2 for 300/400, slot 1 for 1200/1500
// conn.initiateConnection({port: 102, host: "192.168.0.2", localTSAP: 0x0100, remoteTSAP: 0x0200, timeout: 8000, doNotOptimize: true}, connected);
// local and remote TSAP can also be directly specified instead. The timeout option specifies the TCP timeout.

function connected(err) {
    if (typeof(err) !== "undefined") {
        // We have an error. Maybe the PLC is not reachable.
        console.log(err);
        process.exit();
    }
    conn.setTranslationCB(function(tag) {
        return variables[tag];
    });
}

function valuesReady(anythingBad, values) {
    if (anythingBad) { console.log("SOMETHING WENT WRONG READING VALUES!!!!"); }
    readBuffer = values;
    console.log("The values are: " + values);
    doneReading = true;

    process.nextTick(function(){
        conn.readAllItems(valuesReady);
    });

    if(doneReading){
        return;
    }
}  

function valuesWritten(anythingBad) {
    if (anythingBad){
        console.log("SOMETHING WENT WRONG WRITING VALUES!!!!");
    }

    console.log("Done writing.");
    doneWriting = true;

    if (doneReading){ 
        return; 
    }
}
*/

/* *** SENDING TO PLC *** */

// Route commands from client to PLC
/*
app.post("/write", function(req){
    let reqID =   req.body.id;
    console.log("\n\nWrite in " + req.body.id + "\n\n");

    conn.addItems(req.body.id);
    conn.writeItems(req.body.id, req.body.cmd, valuesWritten);
    conn.removeItems(req.body.id);
});

// Retrieves data from PLC and sends back to client
app.post("/read", function(req, res){

    let element = req.body.id;
    console.log("\nElement is " + element);
    
    //conn.removeItems(element);
    let response = readFromPLC(element);
    console.log("\nThe value of "+ String(element) + " is " + String(response));

    res.send(response);
});

app.post("/clear", function(){
    console.clear();
});

function readFromPLC(element){
    conn.addItems(element);
    conn.readAllItems(valuesReady);
    console.log("\n" + element);
    console.log("\n" + readBuffer);
    return readBuffer;
}

setInterval(function(){
    conn.addItems("TEST3");
    conn.readAllItems(valuesReady);
    console.log("Values is: "+ readBuffer);
}, 2000); */