/* *** COMMS *** */
const request = new XMLHttpRequest();       // This is the method used to communicate with the server

/* *** SCADA UI *** */
const webBody = document.getElementById("body");
const webContainer = document.getElementsByClassName("container");

/* UI Elements */
class pushButton{
    constructor(id, cmd, sts){
        this.id  = id;
        this.cmd = cmd;
        this.sts = sts;
    }
    draw(){
        // Define height, length, color, borders, position etc;
    }
    write(id, cmd){
        // do something;
    }
    read(id){
        // do something else
    }
}

class boolIndicator{
    constructor(id, cmd, sts){
        this.id  = id;
        this.cmd = cmd;
        this.sts = sts;
    }
    draw(){
        // Define height, length, color, borders, position etc;
    }
    read(id){
        // do something else
    }
}

/* *** SCADA OBJECTS *** */
const cmdON = document.getElementById("cmdON");
const cmdOFF = document.getElementById("cmdOFF");

const indicator = document.getElementsByClassName("indicator");
const startMonitoring = document.getElementById("startMonitoring");
const stopMonitoring = document.getElementById("stopMonitoring");

const clearbutton = document.getElementById("clear");

// Button ON (TEST1 ~ M20.0)
cmdON.onmousedown = function(){

    //This is the data to be sent
    let data = {
        id:    "TEST1",
        cmd:   true
    };

    let message = JSON.stringify(data);
    console.log("Sending the message: " + message);
    request.open("POST", "/write");
    request.setRequestHeader("Content-type", "application/json");
    request.send(message);
}

cmdON.onmouseup = function(){

    //This is the data to be sent
    let data = {
        id:    "TEST1",
        cmd:   false
    };
    let message = JSON.stringify(data);
    console.log("Sending the message: " + message);
    request.open("POST", "/write");
    request.setRequestHeader("Content-type", "application/json");
    request.send(message);
}

// Button OFF (TEST2 ~ M20.1)
cmdOFF.onmousedown = function(){

    //This is the data to be sent
    let data = {
        id:    "TEST2",
        cmd:   true
    };
    let message = JSON.stringify(data);
    console.log("Sending the message: " + message);
    request.open("POST", "/write");
    request.setRequestHeader("Content-type", "application/json");
    request.send(message);
}

cmdOFF.onmouseup = function(){

    //This is the data to be sent
    let data = {
        id:    "TEST2",
        cmd:   false
    };
    let message = JSON.stringify(data);
    console.log("Sending the message: " + message);
    request.open("POST", "/write");
    request.setRequestHeader("Content-type", "application/json");
    request.send(message);
}

startMonitoring.onmouseup = function(){
    let data = {
        id:    "TEST3",
        cmd:    false
    };
    let message = JSON.stringify(data);
    request.open("POST", "/read");
    request.setRequestHeader("content-type", "application/json");
    request.send(message);
}

// Monitor Output (TEST3 ~ Q0.0)
/*setInterval(function(){
    //This is the data to be sent
    let data = {
        id:    "TEST3",
        cmd:   false
    };
    let message = JSON.stringify(data);

    console.log("Reading outputs");

    request.open("POST", "/read");
    request.setRequestHeader("content-type", "application/json");
    request.send(message);
}, 5000);*/

// Catch response
request.onloadend = function(){
    let response = request.response;

    console.log("This is the response received from server: " + String(response));
}

// Clear Console
clearbutton.onmouseup = function(){
    console.clear();
    request.open("POST", "/clear");
    request.send();
}