//270 degrees is bc teeth are offset by quater right turn i.e. 90 degrees
//therefore, 12 o clock is at 270 rather than zero
let toothAngle = 270;
let toothArcLength = 100;

var audioContext = new AudioContext();
let BPM = 120;

//allows to work with PizzaFace as if its center was at (0,0)
let canvasOffset = 600;

///////////////// TALE OF TWO CLOCKS VARS
let startTime = audioContext.currentTime + 0.005;
var scheduleAheadTime = 0.1;
var nextNoteTime = 0.0;

///////////////////////////////////////////////////////////////////// SET UP FUNCTION

function setup() {

  createCanvas(1200, 1200);
  angleMode(DEGREES);

  bpmSlider = createSlider(20, 300, 120);
  bpmSlider.position(10, 10);
  bpmSlider.style('width', '100px');
  bpmSlider.mouseReleased(sketchUpdateBPM);

  greeting = loadSound(
  '/Users/tylerbisson/Desktop/Thesis\ Project/Grooove-Pizzaria/sounds/groovepizzaria.wav', loaded);

  testPizza = new PizzaFace(-300, -250, 16, 16);
  testPizza2 = new PizzaFace(300, -250, 16, 16);

  testPizza.sliceSlider.mouseReleased(sketchUpdateBPM);
  testPizza2.sliceSlider.mouseReleased(sketchUpdateBPM);

  testPizza.sliceSlider.mouseReleased(syncAndTeethTest1);
  testPizza2.sliceSlider.mouseReleased(syncAndTeethTest2);

  testPizza.toothSlider.input(syncAndTeethTest1);
  testPizza2.toothSlider.input(syncAndTeethTest2);

  let schedulerCaller = setInterval(scheduler, 25);
}

///////////////////////////////////////////////////////////////////// INITIAL LOAD & PLAY AUDIO FUNCTION

function loaded() {
  greeting.play();
}

function syncAndTeethTest1(){
  testPizza.numTeeth = testPizza.toothSlider.value();
  testPizza.nextNoteTime = testPizza2.nextNoteTime;
  testPizza.teethTest();
}

function syncAndTeethTest2(){
  testPizza2.numTeeth = testPizza2.toothSlider.value();
  testPizza2.nextNoteTime = testPizza.nextNoteTime;
  testPizza2.teethTest();
}

///////////////////////////////////////////////////////////////////// SET BPM FUNCTION

function sketchUpdateBPM() {

  if (testPizza.secondsPerStep < testPizza2.secondsPerStep) {
      testPizza.nextNoteTime = testPizza2.nextNoteTime;
  }
  else {
    testPizza2.nextNoteTime = testPizza.nextNoteTime;
  }

  BPM = bpmSlider.value();

  testPizza.stepIteratorVar = testPizza.stepAngles.length - 1;
  testPizza2.stepIteratorVar = testPizza2.stepAngles.length - 1;
}

///////////////////////////////////////////////////////////////////// MOUSE PRESSED FUNCTION

function mousePressed() {
    testPizza.clicked(mouseX, mouseY);
    testPizza2.clicked(mouseX, mouseY);
}

///////////////////////////////////////////////////////////////////// SCHEDULER FUNCTION

function scheduler() {
  var currentTime = audioContext.currentTime;
  currentTime -= startTime;

    while (testPizza.nextNoteTime < (currentTime + scheduleAheadTime)) {
          testPizza.incrementSoundLaunch(testPizza.nextNoteTime, 1);
          testPizza.nextNote();
        }

    while  (testPizza2.nextNoteTime < (currentTime + scheduleAheadTime)) {
           testPizza2.incrementSoundLaunch(testPizza2.nextNoteTime, 2);
           testPizza2.nextNote();
        }
}

///////////////////////////////////////////////////////////////////// DRAW FUNCTION

function draw() {

	background(230, 237, 233);
	translate(600,600);

	testPizza.showFace(testPizza.testDiam);
  testPizza.showSpokes(testPizza.sliceSlider.value());
  testPizza.showTeeth(testPizza.toothSlider.value());
  testPizza.showPlayHead();

  testPizza2.showFace(testPizza2.testDiam);
  testPizza2.showSpokes(testPizza2.sliceSlider.value());
  testPizza2.showTeeth(testPizza2.toothSlider.value());
  testPizza2.showPlayHead();
}
