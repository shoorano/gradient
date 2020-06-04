//Assign required variables.
var css = document.querySelector("h3");
var color1 = document.querySelector(".color1");
var color2 = document.querySelector(".color2");
var body = document.getElementById("gradient");
var randomizer = document.getElementById("randomizer");
var clipboard = document.getElementById("clipboard");

/*
THINGS TO ADD:
- Add a text box around the color string generated. [Done]
- Add a copy button to copy the style string. [Reaserch how]
*/


//Get initial colors string for conversion to hex.
function parseRGB() {
  //return just the rgb components from string using regex.
  return getComputedStyle(body).background.match(/rgb[\(\d, ]+\)/g);
};

//Figure this one out.
function RGBToHex(rgb) {
  // if rgb can have entries separated by , or space.
  let sep = rgb.indexOf(",") > -1 ? "," : " ";
  // Turn "rgb(r,g,b)" into [r,g,b]
  rgb = rgb.substr(4).split(")")[0].split(sep);
  //+sign converts string to number so we can use toString hexadecimal conversion.
  let r = (Number(rgb[0])).toString(16),
      g = (Number(rgb[1])).toString(16),
      b = (Number(rgb[2])).toString(16);

  //pads r,g,b with a zero as it's require for hex.
  if (r.length == 1)
    r = "0" + r;
  if (g.length == 1)
    g = "0" + g;
  if (b.length == 1)
    b = "0" + b;

  return "#" + r + g + b;
};

//Random rgb generator
function randomRGB() {
  return 'rgb(' +
  (Math.random()*255).toString() + ',' +
  (Math.random()*255).toString() + ',' +
  (Math.random()*255).toString() + ')'
};

//Set body background color using randomRGB colors.
function setRandomColor() {

  body.style.background =
  "linear-gradient(to right,"
  + randomRGB()
  + ", "
  + randomRGB()
  + ")";

  randomizer.style.background = body.style.background;
  clipboard.style.background = body.style.background;

  css.textContent = body.style.background + ";";
};

//Takes color1 and color2 values and parses body background to change colour.
function inputColorChange() {
    body.style.background =
    "linear-gradient(to right,"
    + color1.value
    + ", "
    + color2.value
    + ")";

    randomizer.style.background = body.style.background;
    clipboard.style.background = body.style.background;

    css.textContent = body.style.background + ";";
  };

//When copy button clicked concole log current style.
const copy = (style) => console.log(css.textContent);

//Add event listeners
color1.addEventListener("input", inputColorChange);

color2.addEventListener("input", inputColorChange);

randomizer.addEventListener("click", setRandomColor);

clipboard.addEventListener("click", copy);

//INITIALISE

//Set initial background color randomly
setRandomColor();

// Load initially set colors into input buttons.
color1.value = RGBToHex(parseRGB()[0]);
color2.value = RGBToHex(parseRGB()[1]);
//Update the text to the input colors. (the regex trims the getComputedStyle output)
css.textContent = getComputedStyle(body).background.match(/lin[a-z-\( ,\d\)]+\)/g)[0].slice(0,-1) + ";";
//Set randomizer button color randomly at the start.
randomizer.style.background =   "linear-gradient(to right,"
  + randomRGB()
  + ", "
  + randomRGB()
  + ")";
