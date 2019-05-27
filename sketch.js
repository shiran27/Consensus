/*
// Dedicated to all the victims of Easter Bombings - Sri Lanka. 
// 21 April 2019
*/

var canvas;
var width;
var height;

var agentDraggingMode = 0;
var agentDragging;


function setup() {
  	
  	pixelDensity(1);
    const canvasHolder = select('#canvasHolder');
    width  = canvasHolder.width;
    height = canvasHolder.height;
    canvas = createCanvas(width, height);
    canvas.parent('canvasHolder');

    frameRate(1/deltaT);

    Math.seedrandom('27');

    initializeInterface();

    
}

function draw() {
	

	background(225);
    strokeWeight(4);
    noFill();
    stroke(0);
    rect(0,0,width,height);

    updateInterface();

    // display
    showCommunicationLinks();
    for(var i = 0; i<agents.length; i++){
        agents[i].showInitial();
    }


    if(simulationMode==1){
        for(var i = 0; i<agents.length; i++){
            agents[i].computeUpdate();
        }
        for(var i = 0; i<agents.length; i++){
            agents[i].executeUpdate();
        }
    }

    for(var i = 0; i<agents.length; i++){
        agents[i].show();
    }



}



function showCommunicationLinks(){
    
    for(var i = 0; i<agents.length; i++){
        for(var j = 0; j<agents.length; j++){
            if(j>i && agents[i].neighbors.includes(j)){
                //print("Com. link between "+(i+1)+" and "+(j+1)+".")
                stroke(0,128);
                line(agents[i].initialPosition.x,agents[i].initialPosition.y,agents[j].initialPosition.x,agents[j].initialPosition.y);
            }
        }
    }
}



function mouseDragged(){
    if(agentDraggingMode==1){
        agents[agentDragging].initialPosition = new Point2(mouseX,mouseY);
        agents[agentDragging].position = agents[agentDragging].initialPosition;
        updateAgentNeighbors();
    }else if(agentDraggingMode==2){
        agents[agentDragging].position = new Point2(mouseX,mouseY);
    }else{
        for(var i = 0; i<agents.length; i++){
            if(agents[i].clickedOnInitial()){
                agentDragging = i;
                agentDraggingMode = 1;
            }else if(agents[i].clicked()){
                agentDragging = i;
                agentDraggingMode = 2;
            }
        }    
    }
    
}




function mouseReleased(){

    if(agentDraggingMode==1){
        agents[agentDragging].initialPosition = new Point2(mouseX,mouseY);
        agents[agentDragging].position = agents[agentDragging].initialPosition;
        updateAgentNeighbors();
        agentDraggingMode = 0;
        consolePrint("Agent "+(agentDragging+1)+"(initial) dragging finished.");
    }else if(agentDraggingMode==2){
        agents[agentDragging].position = new Point2(mouseX,mouseY);
        agentDraggingMode = 0;
        consolePrint("Agent "+(agentDragging+1)+" dragging finished.");
    }
    
}
