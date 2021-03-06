window.onload = function () {
    var x, y;
    var px, py;
    px = py = 0;
    var cursor = document.getElementById("cursor"); // image of cursor
    var b1 = document.getElementById("b1"); // button 1
    var b2 = document.getElementById("b2"); // button 2

    /* mutex is used to avoid multiple click event from firing at the same time due to different position
     * of image cursor and actual cursor 
     * Using mutex avoid any conflicts if original cursor and image cursor are both on a clickable element
     * This makes sure only 1 click event is triggered at a time*/
    var mutex = false;

    /*
     The following event is selects the element on the image cursor and fires click() on it.
     The following event is triggered only when mouse is pressed.
     */
    window.addEventListener("mouseup", function (e) {
        var tmp = document.elementFromPoint(x + px, y + py); // gets the object on image cursor position
        mutex = true;
        tmp.click();
        cursor.style.left = (px + x) + "px";
        cursor.style.top = (py + y) + "px";
    })

    /*
     The following event listener moves the image pointer with respect to the actual mouse cursor
     The function is triggered every time mouse is moved
     */
    window.addEventListener("mousemove", function (e) {

        // Gets the x,y position of the mouse cursor
        x = e.clientX;
        y = e.clientY;

       // sets the image cursor to new relative position
        cursor.style.left = (px + x) + "px";
        cursor.style.top = (py + y) + "px";

    });

    /*
     the following function re-calculates px,py with respect to new position
     Clicking on b1 moves the pointer to b2
     Clicking on b2 moves the pointer to b1
    */

    b1.onclick = function () {
        if (mutex) {
            mutex = false;
            px = b2.offsetLeft - x;
            py = b2.offsetTop - y;
        }
    }

    b2.onclick = function () {
        if (mutex) {
            mutex = false;
            px = b1.offsetLeft - x;
            py = b1.offsetTop - y;
        }
    }

}