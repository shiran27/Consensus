function Agent(x,y) {

    this.id = agents.length;

    this.position = new Point2(x,y);
    this.initialPosition = this.position;
    this.nextPositionToBe = this.position;

    this.neighbors = [];

    this.graphicSizeParameter = 20;



    this.showInitial = function(){

        noStroke();

        // initial position
        fill(0,128);
        ellipse(this.initialPosition.x,this.initialPosition.y,this.graphicSizeParameter,this.graphicSizeParameter);
        
        // label of the initial position
        fill(255);
        rectMode(CENTER);
        textAlign(CENTER,CENTER);
        text((this.id+1).toString(),this.initialPosition.x,this.initialPosition.y,this.graphicSizeParameter,this.graphicSizeParameter);

    }


    this.show = function(){

        noStroke();

        // state of the agent 
        fill(0,0,255);
        ellipse(this.position.x,this.position.y,this.graphicSizeParameter/1.5,this.graphicSizeParameter/1.5);

         // label of the current position
        fill(255);
        rectMode(CENTER);
        textAlign(CENTER,CENTER);
        text((this.id+1).toString(),this.position.x,this.position.y,this.graphicSizeParameter,this.graphicSizeParameter);


    }

    this.clicked = function(){

        var mouseP = new Point2(mouseX,mouseY);
        var d = distP2(mouseP, this.position);
        if (d < this.graphicSizeParameter) {
            return true;
        }
        else{
            return false;
        }

    }

    this.clickedOnInitial = function(){
        var mouseP = new Point2(mouseX,mouseY);
        var d = distP2(mouseP, this.initialPosition);
        if (d < this.graphicSizeParameter) {
            return true;
        }
        else{
            return false;
        }
    }



    this.computeUpdate = function(){
        
        var stepSize = this.computeStepSize();

        var gradientDirection = this.computeGradient();
        derivativeSumForConvergenceCheck = derivativeSumForConvergenceCheck + dotP2(gradientDirection,gradientDirection);

        this.nextPositionToBe = plusP2(this.position,productP2(gradientDirection,stepSize));

    }

    this.executeUpdate = function(){
        this.position = this.nextPositionToBe;
    }



    this.computeGradient = function(){
        var sumDirection = new Point2(0,0);
        for(var i = 0; i<this.neighbors.length; i++){
            var neighborID = this.neighbors[i];
            var directionComponent = new Point2(agents[neighborID].position.x - this.position.x, agents[neighborID].position.y - this.position.y);
            sumDirection = plusP2(sumDirection,directionComponent);
        }
        return sumDirection;
    }

    this.computeCrossGradient = function(neighborIndex){
        var d_ij = new Point2(agents[neighborIndex].position.x - this.position.x, agents[neighborIndex].position.y - this.position.y);
        return d_ij;
    }

    this.computeStepSize = function(){
        var stepSize; 
        if(stepSizeSelectionMethod==true){//variable step method
            
            var localLipschitzConstant = 2*this.neighbors.length;
            if(localLipschitzConstant == 0){// when no neighbors are there!
                stepSize = 1;
                return stepSize;
            }

            var sumOfLipschitzConstants = localLipschitzConstant;
            var d_i = this.computeGradient();
            var sum_d_ij = d_i;
            for(var i =0; i<this.neighbors.length; i++){
                var neighborIndex = this.neighbors[i];
                var neighborLipschitzConstant = 2*agents[neighborIndex].neighbors.length;
                sumOfLipschitzConstants = sumOfLipschitzConstants + neighborLipschitzConstant;
                var d_ij = this.computeCrossGradient(neighborIndex);
                // if(dotP2(d_i,d_ij)>0){
                //     sum_d_ij = plusP2(sum_d_ij, d_ij);    
                // }
                sum_d_ij = plusP2(sum_d_ij, d_ij);
                
            }
            stepSize = dotP2(d_i,sum_d_ij)/(sumOfLipschitzConstants*dotP2(d_i,d_i));
            
        }else{
            var localLipschitzConstant = 2*this.neighbors.length;
            if(localLipschitzConstant!=0){
                stepSize = 1/localLipschitzConstant;
            }else{// when no neighbors are ther!
                stepSize = 1;
            }
        }
        return stepSize;
    }




    this.getTotalSensingCapability = function(){
        var sum = 0;
        for(var i = 0; i<this.neighbors.length; i++){
            var neighborIndex = this.neighbors[i];
            sum = sum + this.getSensingCapability(neighborIndex);
        }
        return 0.5*sum;
    }

    this.getSensingCapability = function(neighborIndex){
        return sq(distP2(this.position,agents[neighborIndex].position));
    }


}

function updateAgentNeighbors(){
    var r = communicationRange;

    for(var i = 0; i<agents.length; i++){
        agents[i].neighbors = [];
        for(var j = 0; j<agents.length; j++){
            if( j!=i && distP2(agents[i].initialPosition,agents[j].initialPosition)<=r){
                agents[i].neighbors.push(j);
            }
        }
    }
}


function addAnAgent(){

    var x = Math.round(600*Math.random()); 
    var y = Math.round(600*Math.random()); 
    agents.push(new Agent(x,y));
    consolePrint("Agent "+(agents.length)+" added at (x,y) = ("+x+","+y+").");
    
    updateAgentNeighbors();

}


function removeAnAgent(){

    agents.pop();
    consolePrint("Agent "+(agents.length)+" removed.");
    
    updateAgentNeighbors();

}    
