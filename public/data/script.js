// Initialize Objects
var button1 = new Button(
    /* ID:           */  "button1",    // Button's id
    /* Label:      */  "button1",    // Component's unique name                
    /* Input:       */  0,               // PLC address inspected
    /* Ouput:     */  0,               // PLC address commanded
    /* Type:       */  "toggle",      // Button type (0: Momentary, 1: Toggle)
    /* Width:      */  100,           // Object's width
    /* Height:     */  100,           // Object's length 
    /* PosX:      */  50,              // Object's offset X (relative to the left border)
    /* PosY:      */  50,              // Object's offset Y (relative to the top border)
    /* Angle:      */  0,               // Object's rotation in degree (count clockwise)
    /* OffColour: */  "#008000",  // Colour when input is low
    /* OnColour: */  "#00FF00"  // Colour when input is high
);

var button2 = new Button("button2", "button2", 0, 0, "toggle", 100, 100, 200, 50, 0,"#800000","#FF0000");

var button3 = new Button("button3", "button3", 0, 0, "toggle", 100, 100, 50, 200, 0,"#000080","#0000FF");


// *** MAIN FUNCTION *** //
function main(event){
 
    // Initialize application
    clearCanvas("componentViewer");

    // Assign object's I/O
    button1.output = button1.clickMe("componentViewer", event);
    button1.input = button1.status;
    button2.output = button2.clickMe("componentViewer", event);
    button2.input = button2.output;
    button3.output = button3.clickMe("componentViewer", event);
    button3.input = button3.output;

    // *** PRINT ALL OBJECTS IN THE SCREEN) *** /
    button1.drawMe("componentViewer");
    button2.drawMe("componentViewer");
    button3.drawMe("componentViewer");
}