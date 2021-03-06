//const INCH_TO_OUNCES = 0.5541125541126; //conversion constant
const CUBIC_INCHES = 38.74630939427411;
//const PINT = 16; //fluid ounces
const TOP_RADIUS = 2; //inches
const HEIGHT = 4; //inches
const BOTTOM_RADIUS = 1.5; //inches

/*function inToOz(cubicInches) {
    return cubicInches * INCH_TO_OUNCES; 
}*/

function volumeEaten(depth /* inches */) {
    let greaterConeHeight = TOP_RADIUS * HEIGHT / (TOP_RADIUS - BOTTOM_RADIUS); //inches
    let lesserConeHeight = greaterConeHeight - depth; //inches

    let intermediateRadius = TOP_RADIUS - depth * (TOP_RADIUS - BOTTOM_RADIUS) / HEIGHT; //inches

    let greaterConeVolume = Math.PI * Math.pow(TOP_RADIUS, 2) * greaterConeHeight / 3; //inches cubed
    let lesserConeVolume = Math.PI * Math.pow(intermediateRadius, 2) * lesserConeHeight / 3; //inches cubed

    let volumeEaten = greaterConeVolume - lesserConeVolume; //cubic inches
    return volumeEaten;
}

function calcPercent(volume /* cubic inches */) {
    return 100 * volume / CUBIC_INCHES;
}

function ICPPC() {
    let depth = prompt("How deep are you into the ice cream pint, in inches?");
    depth = parseFloat(depth);

    if (isNaN(depth)) {
        alert("Please enter a real number.");
        return;
    }

    if (depth < 0 || depth > 4) {
        alert("Maybe you're eating out of a weird pint of ice cream, but I can't work with the number " + depth + ". Try again?");
        return;
    }
    
    console.log(depth)

    let percent = calcPercent(volumeEaten(depth));

    alert("You are about " + Math.trunc(percent) + "% of the way through your pint.");
}