var deltaT = 0.01;
var simulationMode = 0;


var queueLengthPlotMode = true;
var eventTimeArray = [2,3,4,5];
var queueLengthArray = [5,6,7,8];


var agents = [];
var communicationRange;



function generateProblem(N,r){

	agents = [];
	for(var i = 0; i<N; i++){
		var x = Math.round(600*Math.random()); 
		var y = Math.round(600*Math.random()); 
		agents.push(new Agent(x,y));
		consolePrint("Agent "+(i+1)+" added at (x,y) = ("+x+","+y+").");
	}

	updateAgentNeighbors();
}



function refreshProblem(){
	var N = agents.length;
	var r = communicationRange;
	generateProblem(N,r);
	consolePrint("Problem configuration refreshed.")
}


function runSimulation(){
	if(simulationMode == 1){
		simulationMode = 0;
		document.getElementById('runSimulationButton').innerHTML = "<i class='fa fa-play'></i>";
		consolePrint("Consensus scheme paused.");
	}else{
		simulationMode = 1;
		document.getElementById('runSimulationButton').innerHTML = "<i class='fa fa-pause'></i>";
		consolePrint("Consensus scheme started.");
	}
}


function stopSimulation(){
	
	simulationMode = 0;
	for(var i = 0; i<agents.length; i++){
		agents[i].position = agents[i].initialPosition;
	}
	document.getElementById('runSimulationButton').innerHTML = "<i class='fa fa-play'></i>";

	consolePrint("Consensus scheme resetted to the initial condition.");
}


function refreshAll(){
	location.reload();
}