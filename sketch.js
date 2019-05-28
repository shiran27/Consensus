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
        
        derivativeSumForConvergenceCheck = 0; // to check the convergence
        for(var i = 0; i<agents.length; i++){
            agents[i].computeUpdate(); // derivative sum is updated inside as well as the next position to be
        }
        derivativeSumForConvergenceCheck = Math.sqrt(derivativeSumForConvergenceCheck);
        


        if(derivativeSumForConvergenceCheck<simulationAccuracyLevel){
            finishSimulation();
        }else{
            for(var i = 0; i<agents.length; i++){
                agents[i].executeUpdate();
            }
            numberOfIterationsToConvergence++;
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

        for(var i = 0; i<agents.length; i++){// reset all agent positions to the initial position
            agents[i].position = agents[i].initialPosition;
        }
        
        updateAgentNeighbors();
    }else if(agentDraggingMode==2){
        agents[agentDragging].position = new Point2(mouseX,mouseY);
    }else{
        for(var i = 0; i<agents.length; i++){
            if(agents[i].clickedOnInitial()){
                agentDragging = i;
                agentDraggingMode = 1;
                
                if(simulationMode==1){simulationMode=3;}; // temporary halt
                
            }else if(agents[i].clicked()){
                agentDragging = i;
                agentDraggingMode = 2;

                if(simulationMode==1){simulationMode=3;}; // temporary halt
            }
        }    
    }
    
}




function mouseReleased(){

    if(agentDraggingMode==1){// initial position is changed
        agents[agentDragging].initialPosition = new Point2(mouseX,mouseY);
        agents[agentDragging].position = agents[agentDragging].initialPosition;

        for(var i = 0; i<agents.length; i++){// reset all agent positions to the initial position
            agents[i].position = agents[i].initialPosition;
        }

        updateAgentNeighbors();
        agentDraggingMode = 0;
        consolePrint("Agent "+(agentDragging+1)+"(initial) dragging finished.");
        
        if(simulationMode==3){simulationMode=1;numberOfIterationsToConvergence = 0;};
    
    }else if(agentDraggingMode==2){
        agents[agentDragging].position = new Point2(mouseX,mouseY);
        agentDraggingMode = 0;
        consolePrint("Agent "+(agentDragging+1)+" dragging finished.");

        if(simulationMode==3){simulationMode=1;numberOfIterationsToConvergence = 0;};

    }
    
}
