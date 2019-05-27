

function initializeInterface(){
	consolePrint("Simulation Started.");
	communicationRange = Number(document.getElementById('communicationRange').value);

	generateProblem(5,communicationRange);
}


function updateInterface(){
    
    plotData();
    document.getElementById('communicationRangeDisplay').innerHTML = document.getElementById('communicationRange').value;
    document.getElementById('numberOfAgentsDisplay').innerHTML = agents.length;

}


function consolePrint(consoleText){
	document.getElementById("consoleText").innerHTML += ">> "+consoleText+"<br>";
	document.getElementById("consoleText").scrollTop = document.getElementById("consoleText").scrollHeight;
}





function communicationRangeChanged(){
	communicationRange = Number(document.getElementById('communicationRange').value);
	updateAgentNeighbors();
	consolePrint("Communication range chcanged to "+communicationRange);
}