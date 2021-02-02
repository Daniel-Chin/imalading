const MSPF = 16;
const PERIOD = 20 * 1000;

const TEXTS = [
  [50, 'Ask me!'], 
  // [45, 'I am LA.'], 
  [45, 'Inter Lab'], 
  [30, 'Tap this phone for a *DING*'], 
];
const TEXT_TIME = 5000;

let bodyDiv;
let theSpan;
let text_i = 0;
let ding;

const colorLoop = (t) => {
  let x = t / PERIOD;
  let c = [];
  for (let _ = 0; _ < 3; _ ++) {
    x = (x + 1/3) % 1;
    if (x < 1/3) {
      c.push(Math.floor((x * 3) * 255))
    } else if (x < 2/3) {
      c.push(256);
    } else {
      c.push(Math.floor((3 - x * 3) * 255))
    }
  }
  bodyDiv.style.backgroundColor = `rgb(${c[2]},${c[1]},${c[0]})`;
  setTimeout(colorLoop.bind(null, (t + MSPF) % PERIOD), MSPF);
};

const textLoop = () => {
  text_i = (text_i + 1) % TEXTS.length;
  const [ fontsize, text ] = TEXTS[text_i];
  theSpan.innerHTML = text;
  theSpan.style.fontSize = `${fontsize}vh`;
  setTimeout(textLoop, TEXT_TIME);
};

const onClick = () => {
  ding.play();
};

window.onload = () => {
  bodyDiv = document.getElementById('body-div');
  theSpan = document.getElementById('the-span');
  ding = new Audio('ding.mp3');
  colorLoop(0);
  textLoop();
  bodyDiv.onclick = onClick;
};
