// Initialize Objects
var button1 = new Button(
    /* ID:          */  "button1",      // Button's id
    /* Label:       */  "button1",      // Component's unique name                
    /* Input:       */  0,              // PLC address inspected (0: off, 1: on)
    /* Ouput:       */  0,              // PLC address commanded (0: power off, 1: power on)
    /* Type:        */  "toggle",       // Button type (0: Momentary, 1: Toggle)
    /* Width:       */  100,            // Object's width (relative to the size of the canvas)
    /* Height:      */  100,            // Object's length (relative to the size of the canvas)
    /* PosX:        */  50,             // Object's offset X (relative to the left border)
    /* PosY:        */  50,             // Object's offset Y (relative to the top border)
    /* Angle:       */  0,              // Object's rotation in degree (count clockwise)
    /* OffColour:   */  "#008000",      // Colour when input is low
    /* OnColour:    */  "#00FF00"       // Colour when input is high
);

var button2 = new Button(
    /* ID:          */  "button2",      // Button's id
    /* Label:       */  "button2",      // Component's unique name                
    /* Input:       */  0,              // PLC address inspected (0: off, 1: on)
    /* Ouput:       */  0,              // PLC address commanded (0: power off, 1: power on)
    /* Type:        */  "toggle",       // Button type (0: Momentary, 1: Toggle)
    /* Width:       */  100,            // Object's width (relative to the size of the canvas)
    /* Height:      */  100,            // Object's length (relative to the size of the canvas)
    /* PosX:        */  50,             // Object's offset X (relative to the left border)
    /* PosY:        */  200,            // Object's offset Y (relative to the top border)
    /* Angle:       */  0,              // Object's rotation in degree (count clockwise)
    /* OffColour:   */  "#800000",      // Colour when input is low
    /* OnColour:    */  "#FF0000"       // Colour when input is high
);

var button3 = new Button(
    /* ID:          */  "button3",      // Button's id
    /* Label:       */  "button3",      // Component's unique name                
    /* Input:       */  0,              // PLC address inspected (0: off, 1: on)
    /* Ouput:       */  0,              // PLC address commanded (0: power off, 1: power on)
    /* Type:        */  "toggle",       // Button type (0: Momentary, 1: Toggle)
    /* Width:       */  100,            // Object's width (relative to the size of the canvas)
    /* Height:      */  100,            // Object's length (relative to the size of the canvas)
    /* PosX:        */  200,            // Object's offset X (relative to the left border)
    /* PosY:        */  50,             // Object's offset Y (relative to the top border)
    /* Angle:       */  0,              // Object's rotation in degree (count clockwise)
    /* OffColour:   */  "#000080",      // Colour when input is low
    /* OnColour:    */  "#0000FF"       // Colour when input is high
);
