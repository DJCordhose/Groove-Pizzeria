function draw() {
    background(230, 237, 233);
    translate(trans, trans);
    timeUnit = ((60/bpmSlider.value())/4);
    stepRatioSetup(testPizza, testPizza2);
    ttlPatternTime = lcm * timeUnit; 
    drawPizzaFunctions(testPizza, testPizza2);
    testPizza.showTotalSteps(lcm, ttlPatternTime);
    drawTimeline(testPizza, testPizza2);
    drawBPM();
    showControlText(testPizza, testPizza2);
}

function stepRatioSetup(...pizzas){
    pizzas.forEach(pizza => {
        pizza.loopTime = timeUnit * pizza.toothSlider.value();
        pizza.stepTime = pizza.loopTime / pizza.sliceSlider.value();
        pizza.stepFrac = (timeUnit * 16) / pizza.stepTime;
    })
    stepRatio = pizzas[1].stepFrac.toFixed(3) / pizzas[0].stepFrac.toFixed(3);
    stepRatio2 = pizzas[0].stepFrac.toFixed(3) / pizzas[1].stepFrac.toFixed(3);
}

function drawPizzaFunctions(...pizzas){

    pizzas[0].syncSpoke(pizzas[0].stepIteratorVar, pizzas[1].stepIteratorVar);
    pizzas[1].syncSpoke(pizzas[0].stepIteratorVar, pizzas[1].stepIteratorVar);

    pizzas.forEach(pizza => {
        pizza.showFace(pizza.testDiam);
        pizza.showSpokes(pizza.sliceSlider.value());
        pizza.showShapes();
        pizza.showTeeth(pizza.toothSlider.value());
        pizza.showPlayHead();
        pizza.timeLineCounter(pizza.tmlnItrtr);
    })
}

function drawTimeline(...pizzas){
    pizzas[0].showTimeline(-trans + (appHeight * 0.017), lcm);
    pizzas[1].showTimeline(-trans + (appHeight * 0.058), lcm);
}

function drawBPM(){
    stroke(170);
    textSize(32);
    fill(bpmFontFill);
    strokeWeight(10);
    text(bpmSlider.value() + " bpm", bpmSliderXpos - trans, bpmSliderYpos - (trans - (appHeight * 0.075)));
}