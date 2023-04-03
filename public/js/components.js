class Button {
    constructor(id, label, input, output, type, width, height, posX, posY, angle, offColour, onColour){
        this.id         = id;                                                                                           // Button's unique identification code
        this.label      = label;                                                                                        // Button's name and prompted tag
        this.input      = input;                                                                                        // Button's monitored variable state
        this.output     = output;                                                                                       // Button's commanded variable signal
        this.type       = type;                                                                                         // Button's type (0: Momentary, 1: Toggle)
        this.width      = width;                                                                                        // Button's width
        this.height     = height;                                                                                       // Button's height
        this.posX       = posX;                                                                                         // Button's X offset
        this.posY       = posY;                                                                                         // Button's Y offset
        this.angle      = angle;                                                                                        // Button's rotation
        this.offColour  = onColour;                                                                                     // Button's colour when OFF
        this.onColour   = offColour;                                                                                    // Button's colour when ON
        this.status;
    }
    clickMe(canvas, event){                                                                                             // Determines object's reaction to an interaction

        // Initialize variables
        let isClicked;
        let withinBoundaries;
        let withinX = 0;
        let withinY = 0;

        // Get data from system
        let clickPos = getClickPositon(canvas, event);
        let eventType = event[0];
        let buttonType = this.type;
        let previousState = this.output;
        let pixel = getCanvasPixel(canvas);
    
        // Calculate proportional dimentions
        let objX = Math.floor((this.posX * pixel) * 1000) / 1000;
        let objY = Math.floor((this.posY * pixel) * 1000) / 1000;
        let objW = Math.floor((this.width * pixel) * 1000) / 1000;
        let objH = Math.floor((this.height * pixel) * 1000) / 1000;
    
        // Assign coordinates
        let clickX = clickPos[0];
        let clickY = clickPos[1];
    
        // Verify boundaries
        let clickableX = objX + objW;
        let clickableY = objY + objH;
    
        // Check if click is within the boundaries
        withinX = Number((clickX >= objX) && (clickX < clickableX));
        withinY = Number((clickY >= objY) && (clickY < clickableY));
        withinBoundaries = Number(withinX && withinY);

        // Select behaviour depeding on button's type
        if(buttonType == "toggle" || buttonType == "1"){
            if(withinBoundaries && (event[0] == "mousedown")){
                isClicked = Number(!previousState);
            } else {
                isClicked = Number(previousState);
            }
        } else if(buttonType == "momentary" || buttonType == "0"){
            if(withinBoundaries){
                if(eventType == "mousedown"){
                    isClicked = 1;
                } else {
                    isClicked = 0;
                }
            } else {
                isClicked = 0;
            }
        }

        this.status = isClicked;

        if((withinBoundaries == 1) && (eventType == "mousedown")){
            sendMessage(this);
        }

        return isClicked;
    }
    drawMe(canvas){

        // Get data from target canvas
        const c = document.getElementById(canvas);
        const ctx = c.getContext("2d");

        // Initialize internal variables
        let backgroundColor;
        let radius = Math.min(this.width, this.height) / 10;

        // Set background colour based on status
        switch(this.input){
            case 0:
                backgroundColor = this.onColour;
                break;
            case 1:
                backgroundColor = this.offColour;
                break;
            default:
                backgroundColor = this.onColour;
                break;
        }

        // Start drawing
        ctx.lineWidth = 1;
        ctx.fillStyle = backgroundColor;
        ctx.beginPath();
        roundedRect(ctx, this.posX, this.posY, this.width, this.height, radius);
        ctx.fill();
        ctx.stroke();
    }
}

class display{
    constructor(id, label, input, type, decimals, width, height, posX, posY, backgroundColour, textColour){
        this.id         = id;
        this.label      = label; 
        this.input      = input;
        this.output     = output;
        this.type       = type;
        this.width      = width;
        this.height     = height;
        this.posX       = posX;
        this.posY       = posY;
        this.angle      = angle;
        this.offColour  = onColour;
        this.onColour   = offColour;
        this.status;
    }
}

function roundedRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x, y + r);
    ctx.arcTo(x, y + h, x + r, y + h, r);
    ctx.arcTo(x + w, y + h, x + w, y + h - r, r);
    ctx.arcTo(x + w, y, x + w - r, y, r);
    ctx.arcTo(x, y, x, y + r, r);
    ctx.stroke();
  }