// Later on, add the behaviour functions here for cross-usage with the main application.

// 1. The programmer will create a file containing the declaration of the components that should be displayed in the screen.
// 2. The main program will read this file and build a screen do display these objects.
// 3. The user can interact with the objects contining inputs, such as buttons.
// 4. The state of the objects will be stored in a JSON file within the server.
// 5. The server will read the statuses of the matching objects on the controller and update the SCADA.

const xhttp = new XMLHttpRequest();       // This is the method used to communicate with the server

// Get the position of the click within the canvas
function getClickPositon(canvasName, event){

    let canvas = document.getElementById(canvasName);

    let leftDistance = canvas.offsetLeft;                                                                               // Canvas' distance from the leftmost boundary of the viewport
    let topDistance = canvas.offsetTop;                                                                                 // Canvas' distance from the topmost boundary of the viewport
    let clickX = event[1] - leftDistance;
    let clickY = event[2] - topDistance;
    let clickArr = [0, 0];

    if(event[0] == "mouseup" || event[0] == "mousedown"){
        clickArr = [clickX, clickY];
    } else{
        clickArr = [-1, -1];
    }

    return clickArr;
}

// Calculate canvas minimal subdivision
function getCanvasPixel(canvasName){
    let canvas = document.getElementById(canvasName);
    let side = Math.min(canvas.offsetHeight, canvas.offsetWidth);
    let pixel = side / 1000;

    //console.log("The canvas pixel is: " + pixel);

    return pixel;
}

// Draw elements
function drawElements(canvas, element){

    // Get data from target canvas
    const c = document.getElementById(canvas);
    const ctx = c.getContext("2d");

    // Abstract dimenions by applying canvasPixel ratio
    element.drawMe(canvas);
}

function clearCanvas(canvasName){
    const c = document.getElementById(canvasName);
    const ctx = c.getContext("2d");
    ctx.clearRect(0, 0, c.width, c.height);
}

// Display click position on the 
var mouseXval = document.getElementById("mouseXval");
var mouseYval = document.getElementById("mouseYval");

function sendMessage(data){
    let message = JSON.stringify(data);
    //console.log("Sending the message: " + message);
    xhttp.open("POST", "/toPLC");
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(message);

    xhttp.onloadend = function(){
        let response = xhttp.response;
        //console.log("This is the response received from server: " + String(response));
    }
}